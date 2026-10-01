// file: mailer.js   (NEUE DATEI, ins Backend-Repo neben server.js)
// ============================================================
// Transaktions-E-Mails fuer AFCARPARTS
//
//   - Passwort zuruecksetzen (Link)
//   - Bestellbestaetigung an den Kunden (sobald bezahlt)
//   - Neue Bestellung an jeden beteiligten Haendler (sobald bezahlt)
//   - Haendler-Registrierung: Willkommen an Haendler + Hinweis an Admin
//   - Shop freigeschaltet (Admin aktiviert den Shop)
//
// Anbieter per ENV umschaltbar - ohne Key wird nur ins Log geschrieben,
// es bricht also nichts, solange noch kein Anbieter eingerichtet ist.
//
// ENV (Render):
//   MAIL_PROVIDER        'resend' (Default) | 'brevo' | 'log'
//   RESEND_API_KEY       bei MAIL_PROVIDER=resend
//   BREVO_API_KEY        bei MAIL_PROVIDER=brevo
//   MAIL_FROM            z. B.  AFCARPARTS <no-reply@afcarparts.com>
//   MAIL_REPLY_TO        optional, z. B. support@afcarparts.com
//   ADMIN_NOTIFY_EMAIL   optional, erhaelt Hinweise zu neuen Haendlern
//   SITE_URL             Default https://afcarparts.com
//
// Migration (einmal):  GET /api/migrate-mail?secret=MIGRATION_SECRET
//   legt die Tabelle email_log an (verhindert Doppelversand bei
//   Webhook + Rueckkehr-Pruefung und dient als Versandprotokoll).
//
// Admin:
//   POST /api/admin/mail/test   { to }   Testmail senden
//   GET  /api/admin/mail/log            letzte 100 Versendungen
// ============================================================

const crypto = require('crypto');
const { query } = require('./db');

const SITE_URL = () => String(process.env.SITE_URL || 'https://afcarparts.com').replace(/\/+$/, '');
const PROVIDER = () => {
  const p = String(process.env.MAIL_PROVIDER || '').toLowerCase();
  if (p) return p;
  if (process.env.RESEND_API_KEY) return 'resend';
  if (process.env.BREVO_API_KEY) return 'brevo';
  return 'log';
};

/* ------------------------------------------------------------
   TEXTE (9 Sprachen; Lingala nutzt Franzoesisch - in der DR Kongo
   die uebliche Geschaeftssprache fuer schriftliche Mitteilungen)
   ------------------------------------------------------------ */
const T = {
  de: {
    hi: 'Hallo {name},', auto: 'Diese E-Mail wurde automatisch von AFCARPARTS versendet.',
    reset_subj: 'Passwort zurücksetzen', reset_intro: 'Du hast ein neues Passwort für dein AFCARPARTS-Konto angefordert.',
    reset_btn: 'Neues Passwort festlegen', reset_valid: 'Der Link ist nur kurze Zeit gültig und kann einmal verwendet werden.',
    reset_ignore: 'Falls du das nicht warst, ignoriere diese E-Mail. Dein Passwort bleibt unverändert.',
    cust_subj: 'Bestellbestätigung #{id}', cust_intro: 'Danke für deine Bestellung! Deine Zahlung ist eingegangen.',
    cust_next: 'Der Händler versendet die Ware und trägt die Sendungsnummer ein. Den Stand siehst du jederzeit unter „Meine Bestellungen“.',
    cust_btn: 'Bestellung ansehen',
    sell_subj: 'Neue Bestellung #{id} – bitte versenden', sell_intro: 'Du hast eine neue, bereits bezahlte Bestellung erhalten.',
    sell_next: 'Bitte versende die Ware, trage die Sendungsnummer ein und markiere die Sendung als versendet. Dein Anteil wird nach der Zustellung ausgezahlt.',
    sell_btn: 'Zu meinen Sendungen',
    item: 'Artikel', qty: 'Menge', sum: 'Summe', subtotal: 'Zwischensumme', shipping: 'Versand', total: 'Gesamt',
    deliver_to: 'Lieferadresse', station: 'Abholstation', buyer: 'Käufer', phone: 'Telefon', share: 'Dein Anteil (nach Provision)',
    welcome_subj: 'Willkommen bei AFCARPARTS – Registrierung eingegangen',
    welcome_intro: 'Danke für deine Registrierung als Händler. Wir prüfen deinen Shop und schalten ihn in Kürze frei.',
    ready_next: 'Richte im Händler-Dashboard deine Versandtarife und dein Auszahlungskonto ein. Beides ist nötig, damit deine Produkte sichtbar werden.',
    dash_btn: 'Zum Händler-Dashboard',
    appr_subj: 'Dein Shop ist freigeschaltet', appr_intro: 'Gute Nachricht: Dein Shop „{shop}“ ist jetzt auf AFCARPARTS freigeschaltet.',
  },
  en: {
    hi: 'Hello {name},', auto: 'This e-mail was sent automatically by AFCARPARTS.',
    reset_subj: 'Reset your password', reset_intro: 'You requested a new password for your AFCARPARTS account.',
    reset_btn: 'Set a new password', reset_valid: 'The link is only valid for a short time and can be used once.',
    reset_ignore: 'If this wasn’t you, simply ignore this e-mail. Your password stays unchanged.',
    cust_subj: 'Order confirmation #{id}', cust_intro: 'Thank you for your order! Your payment has been received.',
    cust_next: 'The seller ships the goods and adds the tracking number. You can follow the status at any time under “My orders”.',
    cust_btn: 'View order',
    sell_subj: 'New order #{id} – please ship', sell_intro: 'You have received a new order that has already been paid.',
    sell_next: 'Please ship the goods, enter the tracking number and mark the shipment as shipped. Your share is paid out after delivery.',
    sell_btn: 'Go to my shipments',
    item: 'Item', qty: 'Qty', sum: 'Amount', subtotal: 'Subtotal', shipping: 'Shipping', total: 'Total',
    deliver_to: 'Delivery address', station: 'Pickup station', buyer: 'Buyer', phone: 'Phone', share: 'Your share (after commission)',
    welcome_subj: 'Welcome to AFCARPARTS – registration received',
    welcome_intro: 'Thank you for registering as a seller. We are reviewing your shop and will activate it shortly.',
    ready_next: 'Set up your shipping rates and payout account in the seller dashboard. Both are required before your products become visible.',
    dash_btn: 'Open seller dashboard',
    appr_subj: 'Your shop is now live', appr_intro: 'Good news: your shop “{shop}” is now active on AFCARPARTS.',
  },
  fr: {
    hi: 'Bonjour {name},', auto: 'Cet e-mail a été envoyé automatiquement par AFCARPARTS.',
    reset_subj: 'Réinitialiser votre mot de passe', reset_intro: 'Vous avez demandé un nouveau mot de passe pour votre compte AFCARPARTS.',
    reset_btn: 'Choisir un nouveau mot de passe', reset_valid: 'Le lien n’est valable que peu de temps et ne peut être utilisé qu’une fois.',
    reset_ignore: 'Si vous n’êtes pas à l’origine de cette demande, ignorez cet e-mail. Votre mot de passe reste inchangé.',
    cust_subj: 'Confirmation de commande n°{id}', cust_intro: 'Merci pour votre commande ! Votre paiement a bien été reçu.',
    cust_next: 'Le vendeur expédie la marchandise et ajoute le numéro de suivi. Vous pouvez suivre l’état à tout moment dans « Mes commandes ».',
    cust_btn: 'Voir la commande',
    sell_subj: 'Nouvelle commande n°{id} – à expédier', sell_intro: 'Vous avez reçu une nouvelle commande déjà payée.',
    sell_next: 'Veuillez expédier la marchandise, saisir le numéro de suivi et marquer l’envoi comme expédié. Votre part est versée après la livraison.',
    sell_btn: 'Voir mes envois',
    item: 'Article', qty: 'Qté', sum: 'Montant', subtotal: 'Sous-total', shipping: 'Livraison', total: 'Total',
    deliver_to: 'Adresse de livraison', station: 'Point de retrait', buyer: 'Acheteur', phone: 'Téléphone', share: 'Votre part (après commission)',
    welcome_subj: 'Bienvenue sur AFCARPARTS – inscription reçue',
    welcome_intro: 'Merci pour votre inscription en tant que vendeur. Nous vérifions votre boutique et l’activerons rapidement.',
    ready_next: 'Configurez vos tarifs de livraison et votre compte de versement dans le tableau de bord vendeur. Les deux sont nécessaires pour que vos produits soient visibles.',
    dash_btn: 'Ouvrir le tableau de bord',
    appr_subj: 'Votre boutique est activée', appr_intro: 'Bonne nouvelle : votre boutique « {shop} » est maintenant active sur AFCARPARTS.',
  },
  pt: {
    hi: 'Olá {name},', auto: 'Este e-mail foi enviado automaticamente pela AFCARPARTS.',
    reset_subj: 'Redefinir a palavra-passe', reset_intro: 'Pediu uma nova palavra-passe para a sua conta AFCARPARTS.',
    reset_btn: 'Definir nova palavra-passe', reset_valid: 'O link é válido apenas por pouco tempo e só pode ser usado uma vez.',
    reset_ignore: 'Se não foi você, ignore este e-mail. A sua palavra-passe permanece inalterada.',
    cust_subj: 'Confirmação da encomenda n.º {id}', cust_intro: 'Obrigado pela sua encomenda! O seu pagamento foi recebido.',
    cust_next: 'O vendedor envia a mercadoria e adiciona o número de rastreio. Pode acompanhar o estado em “As minhas encomendas”.',
    cust_btn: 'Ver encomenda',
    sell_subj: 'Nova encomenda n.º {id} – por favor envie', sell_intro: 'Recebeu uma nova encomenda já paga.',
    sell_next: 'Envie a mercadoria, introduza o número de rastreio e marque o envio como enviado. A sua parte é paga após a entrega.',
    sell_btn: 'Ver os meus envios',
    item: 'Artigo', qty: 'Qtd.', sum: 'Valor', subtotal: 'Subtotal', shipping: 'Envio', total: 'Total',
    deliver_to: 'Morada de entrega', station: 'Ponto de recolha', buyer: 'Comprador', phone: 'Telefone', share: 'A sua parte (após comissão)',
    welcome_subj: 'Bem-vindo à AFCARPARTS – registo recebido',
    welcome_intro: 'Obrigado pelo seu registo como vendedor. Estamos a analisar a sua loja e vamos ativá-la em breve.',
    ready_next: 'Configure as suas tarifas de envio e a conta de pagamento no painel do vendedor. Ambas são necessárias para que os seus produtos fiquem visíveis.',
    dash_btn: 'Abrir o painel do vendedor',
    appr_subj: 'A sua loja está ativa', appr_intro: 'Boas notícias: a sua loja “{shop}” está agora ativa na AFCARPARTS.',
  },
  es: {
    hi: 'Hola {name}:', auto: 'Este correo ha sido enviado automáticamente por AFCARPARTS.',
    reset_subj: 'Restablecer la contraseña', reset_intro: 'Has solicitado una nueva contraseña para tu cuenta de AFCARPARTS.',
    reset_btn: 'Crear nueva contraseña', reset_valid: 'El enlace solo es válido por poco tiempo y puede usarse una vez.',
    reset_ignore: 'Si no has sido tú, ignora este correo. Tu contraseña no cambia.',
    cust_subj: 'Confirmación del pedido n.º {id}', cust_intro: '¡Gracias por tu pedido! Hemos recibido tu pago.',
    cust_next: 'El vendedor envía la mercancía y añade el número de seguimiento. Puedes ver el estado en “Mis pedidos”.',
    cust_btn: 'Ver pedido',
    sell_subj: 'Nuevo pedido n.º {id} – por favor envíalo', sell_intro: 'Has recibido un nuevo pedido ya pagado.',
    sell_next: 'Envía la mercancía, introduce el número de seguimiento y marca el envío como enviado. Tu parte se paga tras la entrega.',
    sell_btn: 'Ver mis envíos',
    item: 'Artículo', qty: 'Cant.', sum: 'Importe', subtotal: 'Subtotal', shipping: 'Envío', total: 'Total',
    deliver_to: 'Dirección de entrega', station: 'Punto de recogida', buyer: 'Comprador', phone: 'Teléfono', share: 'Tu parte (tras la comisión)',
    welcome_subj: 'Bienvenido a AFCARPARTS – registro recibido',
    welcome_intro: 'Gracias por registrarte como vendedor. Estamos revisando tu tienda y la activaremos pronto.',
    ready_next: 'Configura tus tarifas de envío y tu cuenta de pago en el panel del vendedor. Ambas son necesarias para que tus productos sean visibles.',
    dash_btn: 'Abrir el panel del vendedor',
    appr_subj: 'Tu tienda está activa', appr_intro: 'Buenas noticias: tu tienda “{shop}” ya está activa en AFCARPARTS.',
  },
  ar: {
    hi: 'مرحبًا {name}،', auto: 'تم إرسال هذا البريد تلقائيًا من AFCARPARTS.',
    reset_subj: 'إعادة تعيين كلمة المرور', reset_intro: 'لقد طلبت كلمة مرور جديدة لحسابك في AFCARPARTS.',
    reset_btn: 'تعيين كلمة مرور جديدة', reset_valid: 'الرابط صالح لفترة قصيرة فقط ويمكن استخدامه مرة واحدة.',
    reset_ignore: 'إذا لم تطلب ذلك، تجاهل هذا البريد. تبقى كلمة المرور دون تغيير.',
    cust_subj: 'تأكيد الطلب رقم {id}', cust_intro: 'شكرًا لطلبك! تم استلام الدفع.',
    cust_next: 'يقوم البائع بشحن البضاعة وإضافة رقم التتبع. يمكنك متابعة الحالة في «طلباتي».',
    cust_btn: 'عرض الطلب',
    sell_subj: 'طلب جديد رقم {id} – يرجى الشحن', sell_intro: 'لقد استلمت طلبًا جديدًا مدفوعًا.',
    sell_next: 'يرجى شحن البضاعة وإدخال رقم التتبع ووضع علامة «تم الشحن». يتم دفع حصتك بعد التسليم.',
    sell_btn: 'عرض شحناتي',
    item: 'المنتج', qty: 'الكمية', sum: 'المبلغ', subtotal: 'المجموع الفرعي', shipping: 'الشحن', total: 'الإجمالي',
    deliver_to: 'عنوان التسليم', station: 'نقطة الاستلام', buyer: 'المشتري', phone: 'الهاتف', share: 'حصتك (بعد العمولة)',
    welcome_subj: 'مرحبًا بك في AFCARPARTS – تم استلام التسجيل',
    welcome_intro: 'شكرًا لتسجيلك كبائع. نحن نراجع متجرك وسنقوم بتفعيله قريبًا.',
    ready_next: 'قم بإعداد أسعار الشحن وحساب الدفع في لوحة البائع. كلاهما ضروري لظهور منتجاتك.',
    dash_btn: 'فتح لوحة البائع',
    appr_subj: 'تم تفعيل متجرك', appr_intro: 'خبر سار: متجرك «{shop}» أصبح الآن نشطًا على AFCARPARTS.',
  },
  tr: {
    hi: 'Merhaba {name},', auto: 'Bu e-posta AFCARPARTS tarafından otomatik olarak gönderildi.',
    reset_subj: 'Şifre sıfırlama', reset_intro: 'AFCARPARTS hesabınız için yeni bir şifre talep ettiniz.',
    reset_btn: 'Yeni şifre belirle', reset_valid: 'Bağlantı yalnızca kısa bir süre geçerlidir ve bir kez kullanılabilir.',
    reset_ignore: 'Bu talebi siz yapmadıysanız bu e-postayı dikkate almayın. Şifreniz değişmez.',
    cust_subj: 'Sipariş onayı #{id}', cust_intro: 'Siparişiniz için teşekkürler! Ödemeniz alındı.',
    cust_next: 'Satıcı ürünü gönderir ve takip numarasını ekler. Durumu “Siparişlerim” bölümünden takip edebilirsiniz.',
    cust_btn: 'Siparişi görüntüle',
    sell_subj: 'Yeni sipariş #{id} – lütfen gönderin', sell_intro: 'Ödemesi yapılmış yeni bir sipariş aldınız.',
    sell_next: 'Lütfen ürünü gönderin, takip numarasını girin ve gönderiyi “gönderildi” olarak işaretleyin. Payınız teslimattan sonra ödenir.',
    sell_btn: 'Gönderilerime git',
    item: 'Ürün', qty: 'Adet', sum: 'Tutar', subtotal: 'Ara toplam', shipping: 'Kargo', total: 'Toplam',
    deliver_to: 'Teslimat adresi', station: 'Teslim alma noktası', buyer: 'Alıcı', phone: 'Telefon', share: 'Payınız (komisyon sonrası)',
    welcome_subj: 'AFCARPARTS’a hoş geldiniz – kaydınız alındı',
    welcome_intro: 'Satıcı olarak kaydolduğunuz için teşekkürler. Mağazanızı inceliyoruz ve kısa süre içinde etkinleştireceğiz.',
    ready_next: 'Satıcı panelinde kargo tarifelerinizi ve ödeme hesabınızı ayarlayın. Ürünlerinizin görünmesi için ikisi de gereklidir.',
    dash_btn: 'Satıcı panelini aç',
    appr_subj: 'Mağazanız etkinleştirildi', appr_intro: 'Güzel haber: “{shop}” mağazanız artık AFCARPARTS’ta aktif.',
  },
  sw: {
    hi: 'Habari {name},', auto: 'Barua pepe hii imetumwa kiotomatiki na AFCARPARTS.',
    reset_subj: 'Weka upya nenosiri', reset_intro: 'Umeomba nenosiri jipya kwa akaunti yako ya AFCARPARTS.',
    reset_btn: 'Weka nenosiri jipya', reset_valid: 'Kiungo ni halali kwa muda mfupi tu na kinaweza kutumika mara moja.',
    reset_ignore: 'Kama si wewe, puuza barua pepe hii. Nenosiri lako halitabadilika.',
    cust_subj: 'Uthibitisho wa oda #{id}', cust_intro: 'Asante kwa oda yako! Malipo yako yamepokelewa.',
    cust_next: 'Muuzaji atatuma bidhaa na kuongeza namba ya ufuatiliaji. Unaweza kufuatilia hali kwenye “Oda zangu”.',
    cust_btn: 'Tazama oda',
    sell_subj: 'Oda mpya #{id} – tafadhali tuma', sell_intro: 'Umepokea oda mpya ambayo tayari imelipwa.',
    sell_next: 'Tafadhali tuma bidhaa, weka namba ya ufuatiliaji na uweke alama kuwa imetumwa. Sehemu yako hulipwa baada ya kufikishwa.',
    sell_btn: 'Nenda kwenye usafirishaji wangu',
    item: 'Bidhaa', qty: 'Idadi', sum: 'Kiasi', subtotal: 'Jumla ndogo', shipping: 'Usafirishaji', total: 'Jumla',
    deliver_to: 'Anwani ya kupeleka', station: 'Kituo cha kuchukua', buyer: 'Mnunuzi', phone: 'Simu', share: 'Sehemu yako (baada ya kamisheni)',
    welcome_subj: 'Karibu AFCARPARTS – usajili umepokelewa',
    welcome_intro: 'Asante kwa kujisajili kama muuzaji. Tunakagua duka lako na tutaliwezesha hivi karibuni.',
    ready_next: 'Weka viwango vya usafirishaji na akaunti ya malipo kwenye dashibodi ya muuzaji. Vyote viwili vinahitajika ili bidhaa zako zionekane.',
    dash_btn: 'Fungua dashibodi ya muuzaji',
    appr_subj: 'Duka lako limewezeshwa', appr_intro: 'Habari njema: duka lako “{shop}” sasa liko hai kwenye AFCARPARTS.',
  },
};
function tr(lang) {
  const l = String(lang || '').toLowerCase().slice(0, 2);
  if (l === 'ln') return { lang: 'fr', t: T.fr };
  return T[l] ? { lang: l, t: T[l] } : { lang: 'en', t: T.en };
}
function fill(s, vars) {
  return String(s || '').replace(/\{(\w+)\}/g, (m, k) => (vars && vars[k] != null ? vars[k] : ''));
}
// Anrede; ohne Namen wird aus "Hallo ," sauber "Hallo,"
function greet(t, name) {
  return fill(t.hi, { name: String(name || '').trim() }).replace(/\s+([,:\u060C])/, '$1');
}

// Sprache fuer Haendler aus dem Shop-Land ableiten (Haendler waehlen die Sprache nicht explizit)
const LANG_BY_COUNTRY = {
  CD: 'fr', CG: 'fr', CI: 'fr', SN: 'fr', CM: 'fr', BJ: 'fr', TG: 'fr', GA: 'fr', GN: 'fr', ML: 'fr', NE: 'fr',
  BF: 'fr', TD: 'fr', CF: 'fr', BI: 'fr', DJ: 'fr', KM: 'fr', MG: 'fr', MR: 'fr', MA: 'fr', DZ: 'fr', TN: 'fr', FR: 'fr', BE: 'fr',
  AO: 'pt', MZ: 'pt', GW: 'pt', CV: 'pt', ST: 'pt', PT: 'pt', BR: 'pt',
  GQ: 'es', ES: 'es', EG: 'ar', SD: 'ar', LY: 'ar', AE: 'ar', SA: 'ar', TR: 'tr', DE: 'de', AT: 'de', CH: 'de',
  TZ: 'sw',
};
function langForCountry(iso) { return LANG_BY_COUNTRY[String(iso || '').toUpperCase()] || 'en'; }

/* ------------------------------------------------------------
   HTML-GERUEST
   ------------------------------------------------------------ */
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function money(v, cur) { return (Number(v) || 0).toFixed(2) + ' ' + String(cur || 'USD').toUpperCase(); }

function layout({ lang, title, bodyHtml, auto }) {
  const rtl = lang === 'ar';
  return `<!doctype html><html lang="${lang}" dir="${rtl ? 'rtl' : 'ltr'}"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:#f2f4f7;font-family:Arial,Helvetica,sans-serif;color:#1d2330">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f4f7;padding:24px 0">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden">
<tr><td style="background:#0B0D11;padding:18px 24px;color:#ffffff;font-size:20px;font-weight:bold;letter-spacing:.5px">AFCARPARTS</td></tr>
<tr><td style="padding:24px;font-size:15px;line-height:1.55;text-align:${rtl ? 'right' : 'left'}">${bodyHtml}</td></tr>
<tr><td style="padding:14px 24px;background:#f7f8fa;color:#7a8291;font-size:12px;text-align:${rtl ? 'right' : 'left'}">${esc(auto)}<br>
<a href="${SITE_URL()}" style="color:#7a8291">${SITE_URL().replace(/^https?:\/\//, '')}</a></td></tr>
</table></td></tr></table></body></html>`;
}
function button(href, label) {
  return `<p style="margin:22px 0"><a href="${esc(href)}" style="display:inline-block;background:#3B6CF6;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:bold">${esc(label)}</a></p>`;
}
function p(text) { return `<p style="margin:0 0 12px">${esc(text)}</p>`; }

function itemsTable(t, rows, cur, { withTotals, order, shareTotal } = {}) {
  let h = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:14px 0;font-size:14px">
<tr style="background:#f2f4f7"><th align="left" style="padding:8px">${esc(t.item)}</th><th style="padding:8px">${esc(t.qty)}</th><th align="right" style="padding:8px">${esc(t.sum)}</th></tr>`;
  rows.forEach((r) => {
    h += `<tr><td style="padding:8px;border-bottom:1px solid #e6e8ec">${esc(r.title || '—')}</td>
<td align="center" style="padding:8px;border-bottom:1px solid #e6e8ec">${esc(r.qty)}</td>
<td align="right" style="padding:8px;border-bottom:1px solid #e6e8ec;white-space:nowrap">${esc(money(r.line_total, cur))}</td></tr>`;
  });
  if (withTotals && order) {
    h += `<tr><td colspan="2" style="padding:6px 8px">${esc(t.subtotal)}</td><td align="right" style="padding:6px 8px">${esc(money(order.subtotal, cur))}</td></tr>
<tr><td colspan="2" style="padding:6px 8px">${esc(t.shipping)}</td><td align="right" style="padding:6px 8px">${esc(money(order.shipping, cur))}</td></tr>
<tr><td colspan="2" style="padding:8px;font-weight:bold">${esc(t.total)}</td><td align="right" style="padding:8px;font-weight:bold">${esc(money(order.total, cur))}</td></tr>`;
  }
  if (shareTotal != null) {
    h += `<tr><td colspan="2" style="padding:8px;font-weight:bold">${esc(t.share)}</td><td align="right" style="padding:8px;font-weight:bold">${esc(money(shareTotal, cur))}</td></tr>`;
  }
  return h + '</table>';
}

function textVersion(html) {
  return html
    .replace(/<head[\s\S]*?<\/head>/i, '').replace(/\s*\n\s*/g, ' ')
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([^<]*)<\/a>/g, '$2: $1')
    .replace(/<\/(p|tr|h\d)>/g, '\n').replace(/<br\s*\/?>/g, '\n').replace(/<\/t[dh]>/g, '  ')
    .replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/[ \t]+\n/g, '\n').replace(/\n[ \t]+/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

/* ------------------------------------------------------------
   VERSAND (Resend / Brevo / nur Log)
   ------------------------------------------------------------ */
function parseFrom(from) {
  const m = String(from || '').match(/^\s*(.*?)\s*<([^>]+)>\s*$/);
  return m ? { name: m[1] || 'AFCARPARTS', email: m[2] } : { name: 'AFCARPARTS', email: String(from || '').trim() };
}

async function deliver({ to, subject, html, text }) {
  const provider = PROVIDER();
  const from = process.env.MAIL_FROM || 'AFCARPARTS <no-reply@afcarparts.com>';
  const replyTo = process.env.MAIL_REPLY_TO || null;

  if (provider === 'resend') {
    if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY fehlt');
    const body = { from, to: [to], subject, html, text };
    if (replyTo) body.reply_to = replyTo;
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error('Resend ' + r.status + ': ' + (d.message || d.name || JSON.stringify(d)).slice(0, 200));
    return { provider, id: d.id || null };
  }

  if (provider === 'brevo') {
    if (!process.env.BREVO_API_KEY) throw new Error('BREVO_API_KEY fehlt');
    const body = { sender: parseFrom(from), to: [{ email: to }], subject, htmlContent: html, textContent: text };
    if (replyTo) body.replyTo = { email: replyTo };
    const r = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': process.env.BREVO_API_KEY, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error('Brevo ' + r.status + ': ' + (d.message || JSON.stringify(d)).slice(0, 200));
    return { provider, id: d.messageId || null };
  }

  console.log('[mail:log] An', to, '|', subject, '\n' + text.slice(0, 600));
  return { provider: 'log', id: null };
}

/* ------------------------------------------------------------
   PROTOKOLL + DOPPELVERSAND-SCHUTZ
   Pro (kind, ref, recipient) wird nur einmal erfolgreich gesendet.
   Fehlgeschlagene Mails duerfen beim naechsten Anlauf erneut raus.
   ------------------------------------------------------------ */
let _logTableOk = true;
async function claim(kind, ref, to, subject) {
  if (!_logTableOk) return { id: null, ok: true };
  try {
    const r = await query(
      `INSERT INTO email_log (kind, ref, recipient, subject, status, attempts)
       VALUES ($1,$2,$3,$4,'sending',1)
       ON CONFLICT (kind, ref, recipient) DO UPDATE
         SET status = 'sending', attempts = email_log.attempts + 1, updated_at = now(), subject = EXCLUDED.subject
         WHERE email_log.status = 'failed'
       RETURNING id`,
      [kind, String(ref), to, subject]
    );
    return { id: r.rows[0] ? r.rows[0].id : null, ok: !!r.rows[0] };
  } catch (e) {
    if (/email_log/.test(e.message)) {
      _logTableOk = false;
      console.warn('[mail] Tabelle email_log fehlt - bitte /api/migrate-mail aufrufen. Versand laeuft ohne Protokoll.');
      return { id: null, ok: true };
    }
    throw e;
  }
}
async function finish(id, status, info) {
  if (!id) return;
  await query(
    `UPDATE email_log SET status = $2, provider = $3, provider_id = $4, error = $5, updated_at = now() WHERE id = $1`,
    [id, status, info.provider || null, info.id || null, info.error || null]
  ).catch(() => {});
}

async function send({ kind, ref, to, subject, html }) {
  to = String(to || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return { skipped: 'no_valid_recipient' };
  const c = await claim(kind, ref, to, subject);
  if (!c.ok) return { skipped: 'already_sent' };
  const text = textVersion(html);
  try {
    const info = await deliver({ to, subject, html, text });
    await finish(c.id, 'sent', info);
    return { sent: true, provider: info.provider };
  } catch (e) {
    console.error('[mail]', kind, ref, to, e.message);
    await finish(c.id, 'failed', { error: e.message.slice(0, 500) });
    return { sent: false, error: e.message };
  }
}

/* ------------------------------------------------------------
   E-MAIL-ARTEN
   ------------------------------------------------------------ */
async function sendPasswordReset({ email, token, lang }) {
  let name = '';
  try {
    const u = await query(`SELECT name FROM users WHERE lower(email) = lower($1) LIMIT 1`, [email]);
    name = (u.rows[0] && u.rows[0].name) || '';
  } catch (e) { /* Name ist optional */ }
  const { lang: L, t } = tr(lang);
  const link = SITE_URL() + '/#reset-password?token=' + encodeURIComponent(token);
  const body = p(greet(t, name)) + p(t.reset_intro) + button(link, t.reset_btn)
    + p(t.reset_valid) + p(t.reset_ignore);
  return send({
    kind: 'password_reset', ref: crypto.randomBytes(8).toString('hex'), to: email,
    subject: 'AFCARPARTS – ' + t.reset_subj, html: layout({ lang: L, title: t.reset_subj, bodyHtml: body, auto: t.auto }),
  });
}

async function stationLine(address) {
  const sid = address && parseInt(address.pickup_station_id, 10);
  if (!sid) return null;
  try {
    const r = await query(`SELECT name, address, city, country, opening_hours FROM pickup_stations WHERE id = $1`, [sid]);
    const s = r.rows[0];
    if (!s) return null;
    return [s.name, s.address, [s.city, s.country].filter(Boolean).join(', '), s.opening_hours].filter(Boolean).join(' · ');
  } catch (e) { return null; }
}
function addressLine(a) {
  a = a || {};
  return [a.name, a.addr, [a.city, a.country].filter(Boolean).join(', ')].filter(Boolean).join(' · ');
}

// Bestellung bezahlt -> Kunde + jeder beteiligte Haendler. Idempotent, wirft nie.
async function notifyOrderPaid(orderId) {
  try {
    const or = await query(`SELECT * FROM orders WHERE id = $1`, [orderId]);
    const order = or.rows[0];
    if (!order) return;
    const address = (typeof order.address === 'string' ? JSON.parse(order.address || '{}') : order.address) || {};
    const cur = order.currency || 'USD';
    const station = await stationLine(address);

    const ir = await query(
      `SELECT oi.title, oi.qty, oi.line_total, oi.payout_amount, oi.shop_id,
              p.seller_id,
              s.name AS shop_name, s.email AS shop_email, s.country AS shop_country,
              ou.email AS owner_email, ou.name AS owner_name,
              su.email AS seller_email, su.name AS seller_name
         FROM order_items oi
         LEFT JOIN products p ON p.id = oi.product_id
         LEFT JOIN shops s    ON s.id = oi.shop_id
         LEFT JOIN users ou   ON ou.id = s.owner_id
         LEFT JOIN users su   ON su.id = p.seller_id
        WHERE oi.order_id = $1
        ORDER BY oi.id`,
      [orderId]
    );
    const items = ir.rows;

    // ---- Kunde ----
    if (order.email) {
      const { lang: L, t } = tr(address.lang);
      let body = p(greet(t, address.name)) + p(t.cust_intro);
      body += itemsTable(t, items, cur, { withTotals: true, order });
      if (station) body += `<p style="margin:0 0 8px"><b>${esc(t.station)}:</b> ${esc(station)}</p>`;
      body += `<p style="margin:0 0 12px"><b>${esc(t.deliver_to)}:</b> ${esc(addressLine(address))}</p>`;
      body += p(t.cust_next) + button(SITE_URL() + '/#my-orders', t.cust_btn);
      const subj = fill(t.cust_subj, { id: order.id });
      await send({ kind: 'order_customer', ref: order.id, to: order.email, subject: 'AFCARPARTS – ' + subj,
        html: layout({ lang: L, title: subj, bodyHtml: body, auto: t.auto }) });
    }

    // ---- Haendler (eine Mail pro Shop bzw. Verkaeufer) ----
    const groups = new Map();
    items.forEach((it) => {
      const key = it.shop_id ? 's' + it.shop_id : (it.seller_id ? 'u' + it.seller_id : null);
      if (!key) return;
      if (!groups.has(key)) {
        groups.set(key, {
          to: it.shop_email || it.owner_email || it.seller_email,
          name: it.owner_name || it.seller_name || it.shop_name || '',
          country: it.shop_country, rows: [], share: 0,
        });
      }
      const g = groups.get(key);
      g.rows.push(it);
      g.share += Number(it.payout_amount) || 0;
    });
    for (const [key, g] of groups) {
      if (!g.to) continue;
      const { lang: L, t } = tr(langForCountry(g.country));
      let body = p(greet(t, g.name)) + p(t.sell_intro);
      body += itemsTable(t, g.rows, cur, { shareTotal: g.share });
      body += `<p style="margin:0 0 6px"><b>${esc(t.buyer)}:</b> ${esc(address.name || '—')}</p>`;
      if (address.phone) body += `<p style="margin:0 0 6px"><b>${esc(t.phone)}:</b> ${esc(address.phone)}</p>`;
      if (station) body += `<p style="margin:0 0 6px"><b>${esc(t.station)}:</b> ${esc(station)}</p>`;
      body += `<p style="margin:0 0 12px"><b>${esc(t.deliver_to)}:</b> ${esc(addressLine(address))}</p>`;
      body += p(t.sell_next) + button(SITE_URL() + '/#seller-shipments', t.sell_btn);
      const subj = fill(t.sell_subj, { id: order.id });
      await send({ kind: 'order_seller', ref: order.id + ':' + key, to: g.to, subject: 'AFCARPARTS – ' + subj,
        html: layout({ lang: L, title: subj, bodyHtml: body, auto: t.auto }) });
    }
  } catch (e) {
    console.error('[mail] notifyOrderPaid', orderId, e.message);
  }
}

async function notifySellerRegistered({ userId, email, name, company, country, city, plan }) {
  try {
    const { lang: L, t } = tr(langForCountry(country));
    const body = p(greet(t, name || company)) + p(t.welcome_intro) + p(t.ready_next)
      + button(SITE_URL() + '/#seller-dashboard', t.dash_btn);
    await send({ kind: 'seller_welcome', ref: userId || email, to: email, subject: 'AFCARPARTS – ' + t.welcome_subj,
      html: layout({ lang: L, title: t.welcome_subj, bodyHtml: body, auto: t.auto }) });

    const admin = process.env.ADMIN_NOTIFY_EMAIL;
    if (admin) {
      const rows = [['Firma', company], ['Kontakt', name], ['E-Mail', email], ['Land / Stadt', [country, city].filter(Boolean).join(' / ')], ['Tarif', plan || '—']];
      const tbl = '<table cellpadding="6" style="border-collapse:collapse;font-size:14px">'
        + rows.map((r) => `<tr><td style="color:#7a8291">${esc(r[0])}</td><td><b>${esc(r[1] || '—')}</b></td></tr>`).join('') + '</table>';
      const body2 = p('Ein neuer Händler hat sich registriert und wartet auf Freigabe.') + tbl
        + button(SITE_URL() + '/#admin-shops', 'Zur Händler-Verwaltung');
      await send({ kind: 'admin_new_seller', ref: userId || email, to: admin, subject: 'Neuer Händler: ' + (company || email),
        html: layout({ lang: 'de', title: 'Neuer Händler', bodyHtml: body2, auto: 'Interne Benachrichtigung von AFCARPARTS.' }) });
    }
  } catch (e) {
    console.error('[mail] notifySellerRegistered', e.message);
  }
}

async function notifyShopApproved(shopId) {
  try {
    const r = await query(
      `SELECT s.id, s.name, s.email, s.country, u.email AS owner_email, u.name AS owner_name
         FROM shops s LEFT JOIN users u ON u.id = s.owner_id WHERE s.id = $1`, [shopId]);
    const s = r.rows[0];
    if (!s) return;
    const { lang: L, t } = tr(langForCountry(s.country));
    const body = p(greet(t, s.owner_name || s.name)) + p(fill(t.appr_intro, { shop: s.name || '' }))
      + p(t.ready_next) + button(SITE_URL() + '/#seller-dashboard', t.dash_btn);
    await send({ kind: 'shop_approved', ref: s.id, to: s.email || s.owner_email, subject: 'AFCARPARTS – ' + t.appr_subj,
      html: layout({ lang: L, title: t.appr_subj, bodyHtml: body, auto: t.auto }) });
  } catch (e) {
    console.error('[mail] notifyShopApproved', shopId, e.message);
  }
}

/* ------------------------------------------------------------
   PRODUKT-FREIGABE
   ------------------------------------------------------------ */
const REVIEW_T = {
  de: { ok_s: 'Dein Produkt ist freigegeben', ok_b: 'Dein Produkt „{p}“ wurde geprüft und ist jetzt freigegeben.', no_s: 'Dein Produkt wurde nicht freigegeben', no_b: 'Dein Produkt „{p}“ wurde geprüft und nicht freigegeben.', why: 'Grund', fix: 'Bitte korrigiere die Angaben im Händler-Dashboard. Danach wird das Produkt erneut geprüft.' },
  en: { ok_s: 'Your product is approved', ok_b: 'Your product “{p}” has been reviewed and is now approved.', no_s: 'Your product was not approved', no_b: 'Your product “{p}” has been reviewed and was not approved.', why: 'Reason', fix: 'Please correct the details in your seller dashboard. The product will then be reviewed again.' },
  fr: { ok_s: 'Votre produit est validé', ok_b: 'Votre produit « {p} » a été vérifié et est maintenant validé.', no_s: 'Votre produit n’a pas été validé', no_b: 'Votre produit « {p} » a été vérifié et n’a pas été validé.', why: 'Motif', fix: 'Veuillez corriger les informations dans votre tableau de bord vendeur. Le produit sera ensuite vérifié à nouveau.' },
  pt: { ok_s: 'O seu produto foi aprovado', ok_b: 'O seu produto “{p}” foi verificado e está agora aprovado.', no_s: 'O seu produto não foi aprovado', no_b: 'O seu produto “{p}” foi verificado e não foi aprovado.', why: 'Motivo', fix: 'Corrija os dados no painel do vendedor. O produto será depois verificado novamente.' },
  es: { ok_s: 'Tu producto ha sido aprobado', ok_b: 'Tu producto “{p}” ha sido revisado y ya está aprobado.', no_s: 'Tu producto no ha sido aprobado', no_b: 'Tu producto “{p}” ha sido revisado y no ha sido aprobado.', why: 'Motivo', fix: 'Corrige los datos en tu panel de vendedor. Después, el producto se revisará de nuevo.' },
  ar: { ok_s: 'تمت الموافقة على منتجك', ok_b: 'تمت مراجعة منتجك «{p}» والموافقة عليه.', no_s: 'لم تتم الموافقة على منتجك', no_b: 'تمت مراجعة منتجك «{p}» ولم تتم الموافقة عليه.', why: 'السبب', fix: 'يرجى تصحيح البيانات في لوحة البائع، وبعدها ستتم مراجعة المنتج مرة أخرى.' },
  tr: { ok_s: 'Ürününüz onaylandı', ok_b: '“{p}” ürününüz incelendi ve onaylandı.', no_s: 'Ürününüz onaylanmadı', no_b: '“{p}” ürününüz incelendi ve onaylanmadı.', why: 'Gerekçe', fix: 'Lütfen satıcı panelinde bilgileri düzeltin. Ardından ürün yeniden incelenecektir.' },
  sw: { ok_s: 'Bidhaa yako imeidhinishwa', ok_b: 'Bidhaa yako “{p}” imekaguliwa na sasa imeidhinishwa.', no_s: 'Bidhaa yako haijaidhinishwa', no_b: 'Bidhaa yako “{p}” imekaguliwa na haijaidhinishwa.', why: 'Sababu', fix: 'Tafadhali sahihisha taarifa kwenye dashibodi ya muuzaji. Kisha bidhaa itakaguliwa tena.' },
};

async function productInfo(productId) {
  const r = await query(
    `SELECT p.id, p.price_usd, p.sku, p.brand, p.default_lang,
            (SELECT title FROM product_translations t WHERE t.product_id = p.id
              ORDER BY (t.lang = p.default_lang) DESC LIMIT 1) AS title,
            u.email AS seller_email, u.name AS seller_name,
            s.name AS shop_name, s.email AS shop_email, s.country AS shop_country, s.active AS shop_active
       FROM products p
       LEFT JOIN users u ON u.id = p.seller_id
       LEFT JOIN shops s ON s.owner_id = p.seller_id
      WHERE p.id = $1 LIMIT 1`, [productId]);
  return r.rows[0] || null;
}

// Hinweis an den Admin: neues/geaendertes Produkt wartet auf Freigabe
async function notifyAdminProductReview(productId) {
  try {
    const admin = process.env.ADMIN_NOTIFY_EMAIL;
    if (!admin) return;
    const pr = await productInfo(productId);
    if (!pr) return;
    const rows = [['Produkt', pr.title || ('#' + pr.id)], ['Preis', money(pr.price_usd, 'USD')], ['Artikelnr.', pr.sku || '—'],
      ['Händler', (pr.shop_name || pr.seller_name || '—') + ' · ' + (pr.seller_email || '')],
      ['Shop freigegeben', pr.shop_active ? 'ja' : 'NEIN']];
    const tbl = '<table cellpadding="6" style="border-collapse:collapse;font-size:14px">'
      + rows.map((r) => `<tr><td style="color:#7a8291">${esc(r[0])}</td><td><b>${esc(r[1])}</b></td></tr>`).join('') + '</table>';
    const body = p('Ein Produkt wartet auf deine Freigabe. Es ist erst nach der Freigabe im Shop sichtbar.') + tbl
      + button(SITE_URL() + '/#admin-products', 'Zur Produkt-Freigabe');
    // ref mit Tagesstempel: pro Produkt hoechstens eine Mail pro Tag
    await send({ kind: 'admin_product_review', ref: productId + ':' + new Date().toISOString().slice(0, 10), to: admin,
      subject: 'Freigabe nötig: ' + (pr.title || ('Produkt #' + pr.id)),
      html: layout({ lang: 'de', title: 'Produkt-Freigabe', bodyHtml: body, auto: 'Interne Benachrichtigung von AFCARPARTS.' }) });
  } catch (e) { console.error('[mail] notifyAdminProductReview', e.message); }
}

// Ergebnis der Pruefung an den Haendler
async function notifyProductReviewed(productId, status, note) {
  try {
    const pr = await productInfo(productId);
    if (!pr) return;
    const to = pr.shop_email || pr.seller_email;
    if (!to) return;
    const { lang: L, t } = tr(langForCountry(pr.shop_country));
    const R = REVIEW_T[L] || REVIEW_T.en;
    const name = pr.title || ('#' + pr.id);
    let body = p(greet(t, pr.seller_name || pr.shop_name));
    if (status === 'approved') body += p(fill(R.ok_b, { p: name }));
    else {
      body += p(fill(R.no_b, { p: name }));
      if (note) body += `<p style="margin:0 0 12px"><b>${esc(R.why)}:</b> ${esc(note)}</p>`;
      body += p(R.fix);
    }
    body += button(SITE_URL() + '/#seller-products', t.dash_btn);
    const subj = status === 'approved' ? R.ok_s : R.no_s;
    await send({ kind: 'product_review_' + status, ref: productId + ':' + Date.now(), to,
      subject: 'AFCARPARTS – ' + subj, html: layout({ lang: L, title: subj, bodyHtml: body, auto: t.auto }) });
  } catch (e) { console.error('[mail] notifyProductReviewed', e.message); }
}

/* ------------------------------------------------------------
   ROUTEN
   ------------------------------------------------------------ */
function register(app, { requireAdmin }) {
  app.get('/api/migrate-mail', async (req, res) => {
    if (!process.env.MIGRATION_SECRET) return res.status(503).json({ error: 'MIGRATION_SECRET not set' });
    if (req.query.secret !== process.env.MIGRATION_SECRET) return res.status(401).json({ error: 'Invalid secret' });
    try {
      await query(`
        CREATE TABLE IF NOT EXISTS email_log (
          id BIGSERIAL PRIMARY KEY,
          kind TEXT NOT NULL,
          ref TEXT NOT NULL,
          recipient TEXT NOT NULL,
          subject TEXT,
          status TEXT NOT NULL DEFAULT 'sending' CHECK (status IN ('sending','sent','failed')),
          provider TEXT,
          provider_id TEXT,
          error TEXT,
          attempts INTEGER NOT NULL DEFAULT 1,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          UNIQUE (kind, ref, recipient)
        )`);
      await query(`CREATE INDEX IF NOT EXISTS idx_email_log_created ON email_log (created_at DESC)`);
      _logTableOk = true;
      res.json({ ok: true, message: 'email_log bereit', provider: PROVIDER() });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  });

  app.post('/api/admin/mail/test', requireAdmin, async (req, res) => {
    const to = String((req.body && req.body.to) || '').trim();
    if (!to) return res.status(400).json({ error: 'to fehlt' });
    const lang = (req.body && req.body.lang) || 'de';
    const { lang: L, t } = tr(lang);
    const body = p(greet(t, 'Admin')) + p('Testmail von AFCARPARTS. Wenn du das liest, funktioniert der Versand über „' + PROVIDER() + '“.')
      + button(SITE_URL(), 'afcarparts.com');
    const r = await send({ kind: 'test', ref: Date.now(), to, subject: 'AFCARPARTS – Testmail',
      html: layout({ lang: L, title: 'Testmail', bodyHtml: body, auto: t.auto }) });
    if (r.sent === false) return res.status(502).json({ error: r.error, provider: PROVIDER() });
    res.json({ ok: true, provider: PROVIDER(), result: r });
  });

  app.get('/api/admin/mail/log', requireAdmin, async (req, res) => {
    try {
      const r = await query(
        `SELECT id, kind, ref, recipient, subject, status, provider, error, attempts, created_at, updated_at
           FROM email_log ORDER BY created_at DESC LIMIT 100`);
      res.json({ provider: PROVIDER(), entries: r.rows });
    } catch (err) {
      res.status(500).json({ error: /email_log/.test(err.message) ? 'Migration fehlt: /api/migrate-mail?secret=…' : err.message });
    }
  });

  console.log('[mail] Anbieter:', PROVIDER(), '| Absender:', process.env.MAIL_FROM || '(Standard)');
}

module.exports = {
  register, send, notifyOrderPaid, sendPasswordReset, notifySellerRegistered, notifyShopApproved,
  notifyAdminProductReview, notifyProductReviewed,
  langForCountry,
};
