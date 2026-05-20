// ============================================================
// AFRICARPARTS – Category Seed
// Ablegen in: ~/project/src/seed_categories.js
// Ausführen:  node seed_categories.js
// ============================================================
require('dotenv').config();
const { query } = require('./db');

function makeSlug(text) {
  return String(text || '').toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').substring(0, 80);
}

// ── Kategorien-Daten ─────────────────────────────────────────
// Format: [en, de, fr, pt, es, ar, tr, sw, ln, icon, sort, parentSlug]
// parentSlug = null → Hauptkategorie
const CATS = [

  // ── 1. MOTOR & ANTRIEB ──────────────────────────────────
  ['Engine & Drivetrain','Motor & Antrieb','Moteur & Transmission','Motor & Transmissão','Motor & Transmisión','المحرك والناقل','Motor & Aktarma','Injini & Uendeshaji','Moteur & Entraînement','🔧',10,null],
  ['Engine Block & Components','Motorblock & Komponenten','Bloc Moteur & Composants','Bloco Motor & Componentes','Bloque Motor & Componentes','كتلة المحرك ومكوناتها','Motor Bloğu','Bloku la Injini','Bloka ya Moteur','⚙️',11,'engine-drivetrain'],
  ['Timing','Steuertrieb','Distribution','Distribuição','Distribución','توقيت المحرك','Triger Sistemi','Mfumo wa Wakati','Distribution','⛓️',12,'engine-drivetrain'],
  ['Fuel System','Kraftstoffsystem','Alimentation','Sistema de Combustível','Sistema de Combustible','نظام الوقود','Yakıt Sistemi','Mfumo wa Mafuta','Système Carburant','⛽',13,'engine-drivetrain'],
  ['Air Intake','Luftansaugung','Admission Air','Admissão de Ar','Admisión de Aire','سحب الهواء','Hava Emişi','Uingizaji Hewa','Admission Air','💨',14,'engine-drivetrain'],
  ['Cooling System','Kühlsystem','Refroidissement','Sistema de Arrefecimento','Sistema de Refrigeración','نظام التبريد','Soğutma Sistemi','Mfumo wa Kupoza','Refroidissement','🌡️',15,'engine-drivetrain'],
  ['Lubrication System','Schmiersystem','Lubrification','Sistema de Lubrificação','Sistema de Lubricación','نظام التزليق','Yağlama Sistemi','Mafuta ya Kulinika','Lubrification','🛢️',16,'engine-drivetrain'],
  ['Clutch & Gearbox','Kupplung & Getriebe','Embrayage & Boîte','Embraiagem & Caixa','Embrague & Caja','القابض وصندوق التروس','Debriyaj & Şanzıman','Klachi & Gearbox','Embrayage & Boîte','🔄',17,'engine-drivetrain'],

  // ── 2. BREMSANLAGE ──────────────────────────────────────
  ['Brakes','Bremsanlage','Freinage','Sistema de Travagem','Sistema de Frenos','نظام الفرامل','Fren Sistemi','Mfumo wa Breki','Système Frein','🛑',20,null],
  ['Brake Pads','Bremsbeläge','Plaquettes de Frein','Pastilhas de Travão','Pastillas de Freno','أحذية الفرامل','Fren Balataları','Pedi za Breki','Plaquettes Frein','🔴',21,'brakes'],
  ['Brake Discs','Bremsscheiben','Disques de Frein','Discos de Travão','Discos de Freno','أقراص الفرامل','Fren Diskleri','Diski za Breki','Disques Frein','💿',22,'brakes'],
  ['Brake Calipers','Bremssättel','Étriers & Cylindres','Pinças & Cilindros','Pinzas & Cilindros','ملازم الفرامل','Fren Kaliperleri','Kalipa & Silinda','Étriers & Cylindres','🔩',23,'brakes'],
  ['ABS / ESP Sensors','ABS / ESP Sensorik','Capteurs ABS / ESP','Sensores ABS / ESP','Sensores ABS / ESP','حساسات ABS / ESP','ABS / ESP Sensörleri','Sensa za ABS / ESP','Capteurs ABS / ESP','📡',24,'brakes'],
  ['Brake Lines','Bremsleitungen','Canalisations de Frein','Tubagens de Travão','Tuberías de Freno','أنابيب الفرامل','Fren Boruları','Mabomba ya Breki','Canalisations Frein','〰️',25,'brakes'],
  ['Parking Brake','Handbremse','Frein à Main','Travão de Mão','Freno de Mano','فرامل اليد','El Freni','Breki ya Mkono','Frein à Main','🅿️',26,'brakes'],

  // ── 3. FAHRWERK & LENKUNG ───────────────────────────────
  ['Suspension & Steering','Fahrwerk & Lenkung','Suspension & Direction','Suspensão & Direção','Suspensión & Dirección','التعليق والتوجيه','Süspansiyon & Direksiyon','Kusimamia & Uendeshaji','Suspension & Direction','🔀',30,null],
  ['Shock Absorbers & Springs','Stoßdämpfer & Federung','Amortisseurs & Ressorts','Amortecedores & Molas','Amortiguadores & Muelles','الممتصات والزنبركات','Amortisörler & Yaylar','Vifaa vya Kusimamia','Amortisseurs & Ressorts','🌀',31,'suspension-steering'],
  ['Steering Parts','Lenkung','Direction','Direção','Dirección','نظام التوجيه','Direksiyon','Mfumo wa Uendeshaji','Direction','🎮',32,'suspension-steering'],
  ['Axle Parts','Achsteile','Pièces Train Roulant','Peças de Eixo','Piezas Tren Delantero','أجزاء المحور','Aks Parçaları','Sehemu za Mhimili','Pièces Train Roulant','⚙️',33,'suspension-steering'],
  ['Wheel Bearings','Radlager','Roulements de Roue','Rolamentos de Roda','Rodamientos de Rueda','محامل العجل','Tekerlek Rulmanları','Beari za Gurudumu','Roulements Roue','⭕',34,'suspension-steering'],

  // ── 4. ELEKTRIK & SENSORIK ──────────────────────────────
  ['Electrics & Sensors','Elektrik & Sensorik','Électricité & Capteurs','Elétrica & Sensores','Electricidad & Sensores','الكهرباء والمستشعرات','Elektrik & Sensörler','Umeme & Sensa','Électrique & Capteurs','⚡',40,null],
  ['Battery & Charging','Batterie & Ladung','Batterie & Charge','Bateria & Carregamento','Batería & Carga','البطارية والشحن','Akü & Şarj','Betri & Kuchaji','Batterie & Charge','🔋',41,'electrics-sensors'],
  ['Lighting','Beleuchtung','Éclairage','Iluminação','Iluminación','الإضاءة','Aydınlatma','Taa','Éclairage','💡',42,'electrics-sensors'],
  ['Sensors','Sensoren','Capteurs','Sensores','Sensores','المستشعرات','Sensörler','Sensa','Capteurs','📡',43,'electrics-sensors'],
  ['Control Units','Steuergeräte','Calculateurs','Centralinas','Centralitas','وحدات التحكم','Kontrol Üniteleri','Vitengo vya Kudhibiti','Calculateurs','🖥️',44,'electrics-sensors'],
  ['Switches & Controls','Schalter & Bedienelemente','Commandes & Contacteurs','Interruptores & Comandos','Interruptores & Mandos','المفاتيح والأوامر','Anahtarlar & Kumandalar','Vitufe & Vidhibiti','Commandes & Contacteurs','🔘',45,'electrics-sensors'],

  // ── 5. FILTER ───────────────────────────────────────────
  ['Filters','Filter','Filtres','Filtros','Filtros','الفلاتر','Filtreler','Vichungi','Filtres','🔲',50,null],
  ['Air Filters','Luftfilter','Filtres à Air','Filtros de Ar','Filtros de Aire','فلاتر الهواء','Hava Filtreleri','Vichungi vya Hewa','Filtres Air','💨',51,'filters'],
  ['Oil Filters','Ölfilter','Filtres à Huile','Filtros de Óleo','Filtros de Aceite','فلاتر الزيت','Yağ Filtreleri','Vichungi vya Mafuta','Filtres Huile','🛢️',52,'filters'],
  ['Fuel Filters','Kraftstofffilter','Filtres à Carburant','Filtros de Combustível','Filtros de Combustible','فلاتر الوقود','Yakıt Filtreleri','Vichungi vya Petroli','Filtres Carburant','⛽',53,'filters'],
  ['Cabin Filters','Innenraumfilter','Filtres Habitacle','Filtros de Habitáculo','Filtros de Habitáculo','فلاتر المقصورة','Polen Filtreleri','Vichungi vya Cabin','Filtres Habitacle','🌿',54,'filters'],

  // ── 6. KAROSSERIE & AUSSEN ──────────────────────────────
  ['Body & Exterior','Karosserie & Außen','Carrosserie & Extérieur','Carroçaria & Exterior','Carrocería & Exterior','هيكل الجسم والمظهر','Kaporta & Dış','Mwili wa Gari & Nje','Carrosserie & Extérieur','🚗',60,null],
  ['Bumpers','Stoßfänger','Pare-Chocs','Para-Choques','Parachoques','المصدات','Tamponlar','Bumper','Pare-Chocs','🚧',61,'body-exterior'],
  ['Wings & Panels','Kotflügel & Türen','Ailes & Panneaux','Guarda-Lamas & Painéis','Aletas & Paneles','الأجنحة والألواح','Çamurluğlar & Paneller','Mabawa & Paneli','Ailes & Panneaux','🚪',62,'body-exterior'],
  ['Mirrors','Spiegel','Rétroviseurs','Espelhos','Espejos','المرايا','Aynalar','Vioo','Rétroviseurs','🔍',63,'body-exterior'],
  ['Window Regulators','Fensterheber','Lève-Vitres','Elevadores de Vidro','Elevalunas','رافعات الزجاج','Cam Mekanizmaları','Mifumo ya Glasi','Lève-Vitres','🪟',64,'body-exterior'],
  ['Locks & Closures','Schlösser & Schließsysteme','Serrures & Fermeture','Fechos & Fechaduras','Cierres & Cerraduras','الأقفال وأنظمة الإغلاق','Kilitler & Kapama','Malfungo & Kufunga','Serrures & Fermeture','🔑',65,'body-exterior'],

  // ── 7. INNENRAUM & KOMFORT ──────────────────────────────
  ['Interior & Comfort','Innenraum & Komfort','Intérieur & Confort','Interior & Conforto','Interior & Confort','المقصورة الداخلية','İç Mekan & Konfor','Ndani ya Gari & Starehe','Intérieur & Confort','🪑',70,null],
  ['Seats & Mechanism','Sitze & Mechanik','Sièges & Mécanismes','Bancos & Mecanismos','Asientos & Mecanismos','المقاعد وآلياتها','Koltuklar & Mekanizmalar','Viti & Mifumo','Sièges & Mécanismes','🪑',71,'interior-comfort'],
  ['Dashboard & Trim','Armaturen & Verkleidung','Tableau de Bord & Garnitures','Painel & Estofos','Salpicadero & Guarnecidos','لوحة القيادة والتشطيبات','Gösterge Paneli','Dashibodi & Mapambo','Tableau de Bord','📊',72,'interior-comfort'],
  ['Air Conditioning','Klimaanlage','Climatisation','Ar Condicionado','Climatización','تكييف الهواء','Klima','Kiyoyozi','Climatisation','❄️',73,'interior-comfort'],
  ['Heating','Heizung','Chauffage','Aquecimento','Calefacción','التدفئة','Isıtma','Mfumo wa Joto','Chauffage','🌡️',74,'interior-comfort'],

  // ── 8. ABGASANLAGE ──────────────────────────────────────
  ['Exhaust System','Abgasanlage','Ligne Échappement','Sistema de Escape','Sistema de Escape','نظام العادم','Egzoz Sistemi','Mfumo wa Ekzosti','Ligne Échappement','💨',80,null],
  ['Exhaust Manifold','Krümmer','Collecteur Échappement','Coletor de Escape','Colector de Escape','مشعب العادم','Egzoz Manifoldu','Manifold ya Ekzosti','Collecteur Échappement','🔧',81,'exhaust-system'],
  ['Catalytic Converter','Katalysator','Catalyseur','Catalisador','Catalizador','المحول الحراري','Katalitik Konvertör','Kisafishaji Kemikali','Catalyseur','♻️',82,'exhaust-system'],
  ['Particulate Filter','Partikelfilter','Filtre à Particules','Filtro de Partículas','Filtro de Partículas','فلتر الجسيمات','Partikül Filtresi','Kichungi cha Chembe','Filtre à Particules','🔲',83,'exhaust-system'],
  ['Silencer & Pipes','Endschalldämpfer','Silencieux & Tubes','Silencioso & Tubagens','Silenciador & Tubos','كاتمات الصوت','Susturucu & Borular','Kisimamizi & Mabomba','Silencieux & Tubes','🔇',84,'exhaust-system'],
  ['Lambda Sensors','Lambdasonden','Sondes Lambda','Sondas Lambda','Sondas Lambda','مسابير لامبدا','Lambda Sensörleri','Sensa za Lambda','Sondes Lambda','📡',85,'exhaust-system'],

  // ── 9. RÄDER & REIFEN ───────────────────────────────────
  ['Wheels & Tyres','Räder & Reifen','Roues & Pneumatiques','Rodas & Pneus','Ruedas & Neumáticos','العجلات والإطارات','Tekerlekler & Lastikler','Magurudumu & Matairi','Roues & Pneumatiques','🛞',90,null],
  ['Rims','Felgen','Jantes','Jantes','Llantas','الجنوط','Jantlar','Rimi','Jantes','⭕',91,'wheels-tyres'],
  ['Tyres','Reifen','Pneumatiques','Pneus','Neumáticos','الإطارات','Lastikler','Matairi','Pneumatiques','🛞',92,'wheels-tyres'],
  ['TPMS Sensors','Reifendrucksensoren (RDKS)','Capteurs TPMS','Sensores TPMS','Sensores TPMS','حساسات ضغط الإطار','TPMS Sensörleri','Sensa za TPMS','Capteurs TPMS','📡',93,'wheels-tyres'],
  ['Wheel Bolts & Nuts','Radschrauben & Muttern','Boulons & Écrous Roue','Parafusos & Porcas','Tornillos & Tuercas','براغي وصواميل العجل','Civata & Somunları','Bolti & Nati','Boulons & Écrous','🔩',94,'wheels-tyres'],

  // ── 10. ÖLE & FLÜSSIGKEITEN ─────────────────────────────
  ['Oils, Fluids & Chemicals','Öle, Flüssigkeiten & Chemie','Huiles, Liquides & Chimie','Óleos, Fluidos & Química','Aceites, Líquidos & Química','الزيوت والسوائل','Yağlar, Sıvılar & Kimyasallar','Mafuta, Vinywaji & Kemikali','Huiles, Liquides & Produits','🛢️',100,null],
  ['Engine Oil','Motoröl','Huile Moteur','Óleo de Motor','Aceite de Motor','زيت المحرك','Motor Yağı','Mafuta ya Injini','Huile Moteur','🛢️',101,'oils-fluids-chemicals'],
  ['Gear Oil','Getriebeöl','Huile Boîte','Óleo de Caixa','Aceite de Caja','زيت ناقل الحركة','Şanzıman Yağı','Mafuta ya Gearbox','Huile Boîte','⚙️',102,'oils-fluids-chemicals'],
  ['Brake Fluid','Bremsflüssigkeit','Liquide de Frein','Líquido de Travões','Líquido de Frenos','سائل الفرامل','Fren Hidroliği','Maji ya Breki','Liquide de Frein','🔴',103,'oils-fluids-chemicals'],
  ['Coolant','Kühlmittel','Liquide Refroidissement','Líquido de Arrefecimento','Líquido Refrigerante','سائل التبريد','Antifriz','Kibaridi','Liquide Refroidissement','🌡️',104,'oils-fluids-chemicals'],
  ['Additives & Chemicals','Additive & Chemie','Additifs & Produits','Aditivos & Químicos','Aditivos & Productos','المواد المضافة','Katkı Maddeleri','Vongeza & Kemikali','Additifs & Produits','⚗️',105,'oils-fluids-chemicals'],

  // ── 11. ZUBEHÖR & VERSCHLEISSTEILE ──────────────────────
  ['Accessories & Wear Parts','Zubehör & Verschleißteile','Accessoires & Pièces Usure','Acessórios & Peças Desgaste','Accesorios & Piezas Desgaste','الملحقات وقطع التآكل','Aksesuar & Aşınan Parçalar','Vifaa & Vipande','Accessoires & Pièces Usure','🔧',110,null],
  ['Wiper Blades','Wischerblätter','Balais Essuie-Glace','Palhetas Limpa-Vidros','Escobillas Limpiaparabrisas','مساحات الزجاج','Silecek Lastikleri','Blade za Mfuta','Balais Essuie-Glace','🌧️',111,'accessories-wear-parts'],
  ['Bulbs','Glühbirnen','Ampoules','Lâmpadas','Bombillas','المصابيح','Ampuller','Balbu','Ampoules','💡',112,'accessories-wear-parts'],
  ['Fuses','Sicherungen','Fusibles','Fusíveis','Fusibles','الفيوزات','Sigortalar','Fyuzi','Fusibles','⚡',113,'accessories-wear-parts'],
  ['Belts & Pulleys','Riemen & Rollen','Courroies & Galets','Correias & Polias','Correas & Poleas','السيور والبكرات','Kayışlar & Gergi','Mikanda & Roli','Courroies & Galets','🔄',114,'accessories-wear-parts'],
];

const LANGS = ['en','de','fr','pt','es','ar','tr','sw','ln'];

async function seed() {
  console.log('🚀 Starting category seed...\n');

  // Step 1: Add parent_id column if not exists
  try {
    await query(`ALTER TABLE categories ADD COLUMN IF NOT EXISTS parent_id INTEGER REFERENCES categories(id)`);
    console.log('✅ parent_id column ready');
  } catch(e) {
    console.log('ℹ️  parent_id:', e.message);
  }

  // Step 2: Build slug → id map for parent lookups
  const slugToId = {};
  let inserted = 0, updated = 0, failed = 0;

  for (const row of CATS) {
    const [en,de,fr,pt,es,ar,tr,sw,ln, icon, sortOrder, parentSlug] = row;
    const names = { en,de,fr,pt,es,ar,tr,sw,ln };
    const slug  = makeSlug(en);

    try {
      // Resolve parent_id
      const parentId = parentSlug ? (slugToId[parentSlug] || null) : null;

      // Upsert category
      const res = await query(
        `INSERT INTO categories (slug, icon_url, sort_order, parent_id)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (slug) DO UPDATE
           SET icon_url   = EXCLUDED.icon_url,
               sort_order = EXCLUDED.sort_order,
               parent_id  = EXCLUDED.parent_id
         RETURNING id`,
        [slug, icon, sortOrder, parentId]
      );
      const catId = res.rows[0].id;
      slugToId[slug] = catId;

      // Upsert translations
      for (const lang of LANGS) {
        const name = names[lang];
        if (!name) continue;
        await query(
          `INSERT INTO category_translations (category_id, lang, name)
           VALUES ($1, $2, $3)
           ON CONFLICT (category_id, lang) DO UPDATE SET name = EXCLUDED.name`,
          [catId, lang, name]
        );
      }

      const isNew = res.rows[0].id && !slugToId[slug + '_existed'];
      console.log(`  ✅ [${sortOrder}] ${en} (id:${catId}${parentId ? ', parent:'+parentId : ''})`);
      inserted++;

    } catch(e) {
      console.error(`  ❌ ${en}: ${e.message}`);
      failed++;
    }
  }

  console.log(`\n📊 Result:`);
  console.log(`   Processed : ${inserted + failed}`);
  console.log(`   Success   : ${inserted}`);
  console.log(`   Failed    : ${failed}`);

  // Verify
  const total = await query('SELECT COUNT(*) as c FROM categories');
  const trans = await query('SELECT COUNT(*) as c FROM category_translations');
  console.log(`\n📦 DB now has:`);
  console.log(`   Categories   : ${total.rows[0].c}`);
  console.log(`   Translations : ${trans.rows[0].c}`);
  console.log('\n✅ Seed complete! Restart server to apply.\n');
  process.exit(0);
}

seed().catch(e => { console.error('Fatal:', e); process.exit(1); });
