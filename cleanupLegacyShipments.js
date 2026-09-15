// file: cleanupLegacyShipments.js   (NEUE DATEI, neben migrateShippingV2.js)
// ============================================================
// Entfernt Sendungen aus der ALTEN Welt (eine Zeile je Bestellposition,
// erkennbar an gesetztem order_item_id). Sie haben keinen Versandbetrag
// und wuerden neben den neuen Sendungen doppelt erscheinen.
//
// SICHERHEIT:
//   - Ohne ?confirm=1 wird NICHTS geloescht, sondern nur angezeigt,
//     was betroffen waere. Immer erst so aufrufen.
//   - Sendungen mit label_url (echtes gekauftes Label) werden
//     standardmaessig verschont. Mit ?include_labels=1 auch die.
//
// Einhaengen in server.js (eine Zeile, neben der Migrationsroute):
//   app.get('/api/cleanup-legacy-shipments', require('./cleanupLegacyShipments'));
//
// Aufruf:
//   Vorschau:  GET /api/cleanup-legacy-shipments?secret=MIGRATION_SECRET
//   Loeschen:  GET /api/cleanup-legacy-shipments?secret=MIGRATION_SECRET&confirm=1
// ============================================================

const { query } = require('./db');

module.exports = async function cleanupLegacyShipments(req, res) {
  if (!process.env.MIGRATION_SECRET) {
    return res.status(503).json({ error: 'MIGRATION_SECRET not set' });
  }
  if (req.query.secret !== process.env.MIGRATION_SECRET) {
    return res.status(401).json({ error: 'Invalid secret' });
  }

  const keepLabels = req.query.include_labels !== '1';
  const where = `order_item_id IS NOT NULL` + (keepLabels ? ` AND (label_url IS NULL OR label_url = '')` : '');

  try {
    const preview = await query(
      `SELECT id, order_id, seller_user_id, order_item_id, status,
              carrier, tracking_number, label_url
         FROM shipments
        WHERE ${where}
        ORDER BY order_id, id`
    );

    if (req.query.confirm !== '1') {
      return res.json({
        mode: 'Vorschau - es wurde NICHTS geloescht',
        would_delete: preview.rowCount,
        protected_with_label: keepLabels
          ? 'Sendungen mit gekauftem Label bleiben verschont (include_labels=1 zum Mitloeschen)'
          : 'Auch Sendungen mit Label werden geloescht',
        shipments: preview.rows,
        to_delete: 'Denselben Aufruf mit &confirm=1 wiederholen',
      });
    }

    const del = await query(`DELETE FROM shipments WHERE ${where} RETURNING id, order_id`);
    console.log('[cleanup] Altsendungen geloescht:', del.rowCount);

    const rest = await query(`SELECT COUNT(*)::int AS n FROM shipments`);
    res.json({
      mode: 'geloescht',
      deleted: del.rowCount,
      deleted_ids: del.rows.map((r) => r.id),
      shipments_remaining: rest.rows[0].n,
      next: 'Fuer jede bezahlte Bestellung POST /api/admin/orders/:id/mark-paid aufrufen',
    });
  } catch (err) {
    console.error('[cleanup-legacy-shipments]', err.message);
    res.status(500).json({ error: err.message });
  }
};
