// file: customs.js
// AFCARPARTS - Zoll- und Abgabenlogik
//
// WAS HIER DRINSTEHT UND WARUM:
//
// 1. PREISE SIND NETTO. Der Haendler gibt den Warenwert ohne Steuern an.
//    Das ist die Groesse, die in die Zollanmeldung gehoert (Sachwert),
//    und die einzige, die ueber Laendergrenzen hinweg vergleichbar ist.
//
// 2. WIR ZIEHEN KEINE AUSLAENDISCHE STEUER EIN. Wer Umsatzsteuer eines
//    Landes erhebt, muss sie dort abfuehren - das setzt eine Registrierung
//    in genau diesem Land voraus. Ohne die waere es fremdes Geld, das wir
//    einbehalten. Deshalb ist der Standard DAP: die Einfuhrabgaben erhebt
//    der Zoll des Ziellandes beim Empfaenger.
//
// 3. INLANDSVERKAEUFE SIND KEINE EINFUHR. Verkauft ein Haendler in Lagos
//    an einen Kunden in Lagos, gibt es keinen Zoll und keinen Incoterm.
//    Das erkennt shipmentKind() an den Laendern und nicht an einer Annahme.
//
// 4. DDP (wir zahlen die Abgaben vorab) ist vorbereitet, aber nicht aktiv.
//    Es braucht ein eigenes DHL-Express-Konto in Shippo und eine
//    Kalkulation der Abgaben. Bis dahin waere es ein Versprechen, das
//    wir nicht halten koennen.
//
// ENV:
//   CUSTOMS_INCOTERM   - 'DAP' (Standard) | 'DDU' | 'DDP'
//   CUSTOMS_SIGNER     - Name auf der Zollanmeldung
//   CUSTOMS_DEFAULT_HS - Fallback-Zolltarifnummer, Standard 870899

/* ------------------------------------------------------------
   HS-CODES fuer Kfz-Teile (Kapitel 87.08 und Umfeld).
   Vorschlagsliste fuer das Produktformular - der Haendler waehlt.
   Bewusst KEINE Automatik aus der Kategorie: eine falsche
   Zolltarifnummer fuehrt zum falschen Zollsatz und spaeter zur
   Nachforderung. Die Angabe muss vom Haendler kommen.
   ------------------------------------------------------------ */
const HS_SUGGESTIONS = [
  { code: '870810', label: 'Stoßstangen und Teile davon' },
  { code: '870821', label: 'Sicherheitsgurte' },
  { code: '870829', label: 'Karosserieteile, sonstige (Türen, Hauben, Spiegel)' },
  { code: '870830', label: 'Bremsen, Bremsbeläge, Bremsscheiben' },
  { code: '870840', label: 'Getriebe und Teile' },
  { code: '870850', label: 'Antriebsachsen, Differenziale' },
  { code: '870870', label: 'Räder, Felgen und Teile' },
  { code: '870880', label: 'Stoßdämpfer, Federbeine' },
  { code: '870891', label: 'Kühler und Teile' },
  { code: '870892', label: 'Auspufftöpfe und Auspuffrohre' },
  { code: '870893', label: 'Kupplungen und Teile' },
  { code: '870894', label: 'Lenkräder, Lenksäulen, Lenkgetriebe' },
  { code: '870895', label: 'Airbags mit Aufblasvorrichtung' },
  { code: '870899', label: 'Kfz-Teile, andere (Sammelposition)' },
  { code: '840991', label: 'Motorteile für Ottomotoren (Kolben, Ventile)' },
  { code: '840999', label: 'Motorteile für Dieselmotoren' },
  { code: '851110', label: 'Zündkerzen' },
  { code: '851220', label: 'Beleuchtung, Scheinwerfer' },
  { code: '850710', label: 'Starterbatterien (Blei)' },
  { code: '842123', label: 'Ölfilter, Kraftstofffilter' },
  { code: '842131', label: 'Luftfilter für Motoren' },
  { code: '401110', label: 'Reifen, neu, für PKW' },
  { code: '731815', label: 'Schrauben, Bolzen' },
];

function hsSuggestions() { return HS_SUGGESTIONS; }

function defaultHsCode() {
  return String(process.env.CUSTOMS_DEFAULT_HS || '870899');
}

// Eine Zolltarifnummer ist 6 bis 10 Ziffern. Punkte werden entfernt.
function normalizeHs(v) {
  const s = String(v || '').replace(/[^0-9]/g, '');
  if (s.length < 6 || s.length > 10) return null;
  return s;
}

/* ------------------------------------------------------------
   Welche Art von Sendung ist das?
     'domestic'      - gleiches Land, kein Zoll
     'international' - Laendergrenze, Zollanmeldung noetig
   ------------------------------------------------------------ */
function shipmentKind(fromCountry, toCountry) {
  const f = String(fromCountry || '').toUpperCase();
  const t = String(toCountry || '').toUpperCase();
  if (!f || !t) return 'unknown';
  return (f === t) ? 'domestic' : 'international';
}

/* ------------------------------------------------------------
   Wer traegt die Einfuhrabgaben?

   DAP  - Empfaenger zahlt beim Zoll. Unser Standard.
   DDU  - dasselbe wirtschaftlich; Shippo nutzt DDU, wenn der Carrier
          kein DAP kennt (DAP koennen DHL Express, FedEx, DPD UK).
   DDP  - wir zahlen vorab. Braucht ein eigenes Carrier-Konto.
   ------------------------------------------------------------ */
function incoterm() {
  const v = String(process.env.CUSTOMS_INCOTERM || 'DAP').toUpperCase();
  return ['DAP', 'DDU', 'DDP'].includes(v) ? v : 'DAP';
}

// Zahlt der Kunde die Einfuhrabgaben selbst? Dann MUSS das im Checkout
// stehen - eine Nachforderung an der Haustuer ohne Vorwarnung ist der
// haeufigste Grund fuer verweigerte Annahme.
function recipientPaysImport() {
  return incoterm() !== 'DDP';
}

/* ------------------------------------------------------------
   Vollstaendigkeitspruefung eines Produkts fuer den Auslandsversand.
   Fehlt eines dieser Felder, bleibt die Sendung im Zoll haengen -
   deshalb pruefen wir es beim Speichern und nicht erst beim Label.
   ------------------------------------------------------------ */
function checkProductCustoms(product) {
  const p = product || {};
  const missing = [];
  if (!normalizeHs(p.hs_code)) missing.push('hs_code');
  if (!/^[A-Z]{2}$/.test(String(p.origin_country || '').toUpperCase())) missing.push('origin_country');
  if (!(Number(p.weight_kg) > 0)) missing.push('weight_kg');
  if (!String(p.customs_description || '').trim()) missing.push('customs_description');
  return { ok: missing.length === 0, missing };
}

/* ------------------------------------------------------------
   Zollpositionen fuer eine Sendung bauen (Shippo /customs/items/).
   value_amount ist der NETTO-Warenwert je Position.
   ------------------------------------------------------------ */
function buildCustomsItems(items, currency) {
  return (items || []).map((it) => {
    const qty = Math.max(1, parseInt(it.qty, 10) || 1);
    const unit = Number(it.unit_price_net) || 0;
    const weight = Number(it.weight_kg) > 0 ? Number(it.weight_kg) : 0.5;
    return {
      description: String(it.customs_description || it.title || 'Auto part').slice(0, 120),
      quantity: qty,
      net_weight: (weight * qty).toFixed(3),
      mass_unit: 'kg',
      value_amount: (unit * qty).toFixed(2),
      value_currency: String(currency || 'USD').toUpperCase(),
      origin_country: String(it.origin_country || 'DE').toUpperCase(),
      tariff_number: normalizeHs(it.hs_code) || defaultHsCode(),
    };
  });
}

/* ------------------------------------------------------------
   Kopf der Zollanmeldung (Shippo /customs/declarations/).
   non_delivery_option RETURN: Kommt die Sendung nicht durch, soll sie
   zurueck - nicht vernichtet werden. Bei Kfz-Teilen ist der Warenwert
   die Ruecksendung wert.
   ------------------------------------------------------------ */
function buildDeclaration(customsItemIds, opts) {
  const o = opts || {};
  return {
    contents_type: 'MERCHANDISE',
    contents_explanation: String(o.explanation || 'Automotive spare parts').slice(0, 100),
    non_delivery_option: 'RETURN',
    certify: true,
    certify_signer: String(process.env.CUSTOMS_SIGNER || o.signer || 'AFCARPARTS'),
    incoterm: incoterm(),
    commercial_invoice: true,
    items: customsItemIds,
  };
}

/* ------------------------------------------------------------
   Was der Kunde im Checkout sehen muss.
   Bewusst KEIN Betrag: Die Hoehe legt der Zoll des Ziellandes fest,
   nicht wir. Eine geschaetzte Zahl waere eine Zusage, die wir nicht
   halten koennen - und genau daran scheitern Zustellungen.
   ------------------------------------------------------------ */
function importNotice(lang, kind) {
  if (kind === 'domestic') return null;
  if (!recipientPaysImport()) return null;
  const L = {
    de: 'Zoll und Einfuhrsteuern sind im Preis nicht enthalten. Sie werden bei der Zustellung vom Empfänger erhoben und richten sich nach den Bestimmungen des Ziellandes.',
    en: 'Customs duties and import taxes are not included. They are collected from the recipient on delivery, according to the rules of the destination country.',
    fr: "Les droits de douane et taxes à l'importation ne sont pas inclus. Ils sont perçus auprès du destinataire à la livraison, selon la réglementation du pays de destination.",
    pt: 'Direitos aduaneiros e impostos de importação não estão incluídos. São cobrados ao destinatário na entrega, conforme as regras do país de destino.',
    es: 'Los aranceles e impuestos de importación no están incluidos. Se cobran al destinatario en la entrega, según las normas del país de destino.',
    ar: 'الرسوم الجمركية وضرائب الاستيراد غير مشمولة في السعر. يتم تحصيلها من المستلم عند التسليم وفقاً لأنظمة بلد الوجهة.',
    tr: 'Gümrük vergileri ve ithalat vergileri fiyata dahil değildir. Teslimat sırasında alıcıdan, varış ülkesinin kurallarına göre tahsil edilir.',
    sw: 'Ushuru wa forodha na kodi za uagizaji hazijajumuishwa. Hukusanywa kutoka kwa mpokeaji wakati wa uwasilishaji, kulingana na sheria za nchi lengwa.',
    ln: 'Mpako ya douane na ya kokotisa ezali te na ntalo. Ekofutama na moto azali kozwa colis na ntango ya kokoma, engebene na mibeko ya mboka.',
  };
  return L[lang] || L.en;
}

module.exports = {
  hsSuggestions, defaultHsCode, normalizeHs,
  shipmentKind, incoterm, recipientPaysImport,
  checkProductCustoms, buildCustomsItems, buildDeclaration, importNotice,
};
