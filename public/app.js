/* ============================================================
   AFRICARPARTS - FRONTEND APP
   ============================================================ */

/* ---------- FAHRZEUG-DATEN (zentral, eine Quelle) ----------
   Marke/Modell hier erweitern -> wirkt im Fahrzeug-Filter UND
   im Händler-Formular (Passende Fahrzeuge). */
window.CAR_BRANDS = [
  'Audi','BMW','Chevrolet','Citroen','Daihatsu','Fiat','Ford','Honda','Hyundai','Isuzu',
  'Kia','Mazda','Mercedes-Benz','Mitsubishi','Nissan','Opel','Peugeot','Renault','Seat',
  'Skoda','Suzuki','Tata','Toyota','Volkswagen','Volvo'
];
window.CAR_MODELS = {
  'Toyota':   ['Corolla','Camry','RAV4','Hilux','Land Cruiser','Yaris','Avensis','Fortuner','Prado','Hiace'],
  'BMW':      ['1 Series','3 Series','5 Series','7 Series','X1','X3','X5'],
  'Mercedes-Benz': ['A-Class','C-Class','E-Class','S-Class','GLA','GLC','GLE','Sprinter','Vito'],
  'Audi':     ['A3','A4','A5','A6','A7','A8','Q3','Q5','Q7'],
  'Volkswagen': ['Golf','Polo','Passat','Tiguan','Touareg','Caddy','T-Roc','Amarok'],
  'Ford':     ['Fiesta','Focus','Mondeo','Kuga','Ranger','Transit','EcoSport','Everest'],
  'Hyundai':  ['i10','i20','i30','Tucson','Santa Fe','Kona','Accent','Elantra'],
  'Kia':      ['Picanto','Rio','Ceed','Sportage','Sorento','Stonic','Cerato'],
  'Nissan':   ['Micra','Note','Qashqai','Juke','X-Trail','Navara','Patrol','Almera'],
  'Renault':  ['Clio','Megane','Captur','Kadjar','Trafic','Duster','Logan','Sandero'],
  'Peugeot':  ['208','308','3008','5008','Partner','Boxer','301'],
  'Opel':     ['Corsa','Astra','Insignia','Mokka','Vivaro'],
  'Skoda':    ['Fabia','Octavia','Superb','Kodiaq','Karoq'],
  'Seat':     ['Ibiza','Leon','Ateca','Arona'],
  'Honda':    ['Civic','Jazz','CR-V','HR-V','Accord','City'],
  'Mazda':    ['2','3','6','CX-3','CX-5','BT-50'],
  'Fiat':     ['500','Panda','Punto','Tipo','Doblo'],
  'Citroen':  ['C1','C3','C4','C5','Berlingo','Jumpy'],
  'Suzuki':   ['Swift','Vitara','Jimny','Baleno','Alto','Celerio'],
  'Volvo':    ['XC40','XC60','XC90','S60','V60'],
  'Chevrolet':['Spark','Aveo','Cruze','Captiva','Trailblazer','Optra'],
  'Mitsubishi':['Pajero','L200','Outlander','ASX','Lancer','Canter'],
  'Isuzu':    ['D-Max','MU-X','NPR','NQR'],
  'Daihatsu': ['Terios','Sirion','Gran Max','Hijet'],
  'Tata':     ['Indica','Indigo','Xenon','Super Ace']
};
window.ENGINE_TYPES = ['1.0 Petrol','1.2 Petrol','1.4 Petrol','1.6 Petrol','2.0 Petrol','1.5 Diesel','1.6 Diesel','2.0 Diesel','2.5 Diesel','3.0 Diesel','Hybrid','Electric'];

/* ---------- I18N TRANSLATIONS ---------- */
const I18N = {
  en: {
    meta: {
      title: "AFRICARPARTS - Auto Spare Parts Marketplace Africa",
      description: "Find new, used and wholesale car parts across Africa and China."
    },
    nav: { parts: "Parts", shops: "Shops", china: "Wholesale",
      login: "Sign In", register: "Register", logout: "Sign Out",
      dashboard: "Dashboard", admin: "Admin Panel", orders: "My Orders",
      cart: "Cart", language: "Language", currency: "Currency" },
    home: {
      popular_brands: "Popular Brands",
      hero_badge: "Africa's #1 Auto Parts Marketplace",
      hero_title: "Find Any Car Part -", hero_title_em: "Fast & Reliable",
      hero_sub: "New, used & wholesale spare parts - Verified sellers - Mobile Money payments",
      search_ph: "Part name, OEM number, brand, model...",
      search_btn: "Search Parts",
      search_headline: "Millions of parts. One simple search.",
      pkw_btn: "Car Parts", pkw_title: "Car Spare Parts", pkw_subtitle: "Choose a category to browse",
      pkw_close: "Close", pkw_back: "Back", pkw_choose: "Choose a category", pkw_search_in: "Search in category",
      banner_pl_hero: "Hero (top background)", banner_pl_partner: "Partner slot (mid-page)",
      banner_pl_side_left: "Left side banner", banner_pl_side_right: "Right side banner",
      banner_placement: "Placement", banner_placement_help: "Where on the site this banner appears",
      seo_admin_title: "SEO Texts", seo_admin_sub: "Custom multilingual text blocks",
      seo_add: "+ New SEO Text", seo_slug: "Slug (internal ID)", seo_position: "Position",
      seo_sort: "Sort Order", seo_active: "Active", seo_translations: "Translations",
      seo_title_field: "Title", seo_body_field: "Body (HTML allowed)",
      seo_pl_home_top: "Home Top", seo_pl_home_bottom: "Home Bottom",
      seo_pl_partner: "Partner Section", seo_pl_custom: "Custom",
      seo_save: "Save", seo_cancel: "Cancel", seo_delete: "Delete",
      seo_confirm_delete: "Delete this SEO text?", nav_seo: "SEO Texts",
      stats_parts: "Parts Listed", stats_sellers: "Verified Sellers",
      stats_countries: "Countries", stats_langs: "Languages",
      featured: "Featured Parts", featured_sub: "Most popular",
      view_all: "View all", categories: "Browse by Category",
      wholesale_title: "Wholesale Parts", sell_sub: "List parts free · Reach Africa", learn_more: "Learn more", china_title: "Wholesale Direct",
      wholesale_sub: "Factory prices · Verified suppliers · Ships to Africa", china_sub: "Factory prices - Ships to all Africa",
      why_title: "Why AFRICARPARTS?",
      search_all_cats: "All Categories", vc_cat_btn: "All Categories", vc_tree: [{"l":"Engine & Drivetrain","subs":[{"g":"Engine Block & Components","items":["Crankcase","Cylinder Head","Valve Cover","Oil Sump","Pistons","Piston Rings","Camshaft","Crankshaft"]},{"g":"Timing","items":["Timing Belt","Timing Chain","Chain Tensioner","Idler Pulley","Timing Belt Kit","Timing Chain Kit"]},{"g":"Fuel System","items":["Fuel Injectors","Fuel Pump","High-Pressure Pump","Fuel Filter","Fuel Rail","Pressure Regulator","Fuel Pressure Sensor"]},{"g":"Air Intake","items":["Air Filter","Intake Manifold","Intercooler","Turbocharger","Throttle Body","MAF Sensor","Intake Hose"]},{"g":"Cooling System","items":["Radiator","Thermostat","Water Pump","Expansion Tank","Coolant Hose","Cooling Fan","Viscous Coupling","Coolant Temp Sensor"]},{"g":"Lubrication System","items":["Oil Filter","Oil Pump","Oil Pressure Sensor","Crankcase Breather","Oil Cooler","Oil Dipstick"]},{"g":"Clutch & Gearbox","items":["Clutch Kit","Dual-Mass Flywheel","Gearbox Bearing","Driveshaft","CV Joint","Release Bearing","Gear Linkage","Gearbox Oil Seal"]}]},{"l":"Brakes","subs":[{"g":"Brake Pads","items":["Front Brake Pads","Rear Brake Pads","Sport Brake Pads","Brake Pad Set with Sensor"]},{"g":"Brake Discs","items":["Vented Discs","Solid Discs","Drilled Discs","Sport Discs","Brake Disc Set"]},{"g":"Brake Calipers","items":["Front Caliper","Rear Caliper","Brake Shoes","Wheel Cylinder","Caliper Repair Kit"]},{"g":"ABS / ESP Sensors","items":["ABS Sensor","Wheel Speed Sensor","ABS Control Unit","ABS Pump","ESP Sensor"]},{"g":"Brake Lines","items":["Brake Hoses","Brake Pipes","Distribution Block","Brake Line Set","Brake Fluid Reservoir"]},{"g":"Parking Brake","items":["Handbrake Cable","Handbrake Lever","EPB Motor","Rear Brake Shoes","Brake Drum"]}]},{"l":"Suspension & Steering","subs":[{"g":"Shock Absorbers & Springs","items":["Front Shock Absorbers","Rear Shock Absorbers","Coil Springs","Top Mount","Bump Stop","Dust Cover","Coilover Kit","Air Suspension"]},{"g":"Steering","items":["Track Rod End","Tie Rod","Track Rod","Steering Rack","Power Steering Pump","Steering Boot","Steering Column","Steering Angle Sensor"]},{"g":"Axle Parts","items":["Control Arm","Ball Joint","Stabiliser Bar Bush","Anti-Roll Bar","Drop Link","Stub Axle","Subframe","Rubber Bush"]},{"g":"Wheel Bearings","items":["Front Wheel Bearing","Rear Wheel Bearing","Wheel Hub","Wheel Bearing Kit","Hub Bolt"]}]},{"l":"Electrics & Sensors","subs":[{"g":"Battery & Charging","items":["Car Battery","Alternator","Starter Motor","Voltage Regulator","Charging Cable","Battery Terminal","Battery Sensor"]},{"g":"Lighting","items":["Headlight","Rear Light","Indicator","Fog Light","Daytime Running Light","LED Module","Bulbs","Headlight Washer"]},{"g":"Sensors","items":["MAF Sensor","MAP Sensor","Lambda Sensor","Crankshaft Sensor","Camshaft Sensor","NOx Sensor","Exhaust Temp Sensor","Knock Sensor"]},{"g":"Control Units","items":["Engine ECU","ABS Control Unit","Body Control Module","Airbag Module","Transmission Control Unit"]},{"g":"Switches & Controls","items":["Window Switch","Indicator Stalk","Ignition Switch","Horn","Mirror Switch","Central Locking Module"]}]},{"l":"Filters","subs":[{"g":"Air Filters","items":["Petrol Engine Air Filter","Diesel Air Filter","Sport Air Filter","Panel Filter"]},{"g":"Oil Filters","items":["Cartridge Oil Filter","Spin-On Oil Filter","Oil Filter Housing","Oil Filter Set"]},{"g":"Fuel Filters","items":["Diesel Fuel Filter","Petrol Fuel Filter","Inline Filter","Pre-Filter"]},{"g":"Cabin Filters","items":["Pollen Filter","Activated Carbon Filter","Combi Filter","Cabin Filter Set"]}]},{"l":"Body & Exterior","subs":[{"g":"Bumpers","items":["Front Bumper","Rear Bumper","Bumper Bracket","Bumper Undertray","Tow Eye Cover"]},{"g":"Wings & Panels","items":["Wing / Fender","Bonnet","Tailgate","Door Panel","Sill","Roof Rail"]},{"g":"Mirrors","items":["Mirror Glass","Mirror Housing","Mirror Motor","Heated Mirror Element","Mirror Cover"]},{"g":"Window Regulators","items":["Window Regulator Motor","Window Regulator Mechanism","Window Glass","Window Seal"]},{"g":"Locks & Closures","items":["Door Lock","Central Locking","Door Lock Actuator","Lock Cylinder","Bonnet Cable","Fuel Cap"]}]},{"l":"Interior & Comfort","subs":[{"g":"Seats & Mechanism","items":["Seat Rail","Headrest","Seat Cover","Seat Heating","Seat Adjuster","Backrest Lock"]},{"g":"Dashboard & Trim","items":["Dashboard","Centre Console","Glove Box","Sun Visor","Interior Door Handle","Carpet"]},{"g":"Air Conditioning","items":["AC Compressor","AC Condenser","Evaporator","Expansion Valve","AC Pressure Switch","Dryer / Accumulator","AC Line"]},{"g":"Heating","items":["Heater Matrix","Blower Motor","Blower Resistor","Heater Tap","Heater Hose"]}]},{"l":"Exhaust System","subs":[{"g":"Exhaust Manifold","items":["Exhaust Manifold","Turbo Manifold","Manifold Gasket","Manifold Stud"]},{"g":"Catalytic Converter","items":["Oxidation Catalyst","Three-Way Catalyst","Diesel Oxidation Catalyst","Pre-Cat"]},{"g":"Particulate Filter","items":["DPF Diesel Particulate Filter","OPF Petrol Particulate Filter","DPF Pressure Sensor","DPF Temp Sensor"]},{"g":"Silencer & Pipes","items":["Rear Silencer","Middle Silencer","Centre Pipe","Intermediate Pipe","Flexi Pipe","Exhaust Mount"]},{"g":"Lambda Sensors","items":["Pre-Cat Lambda Sensor","Post-Cat Lambda Sensor","Wideband Lambda Sensor","NOx Sensor","Heated Sensor"]}]},{"l":"Wheels & Tyres","subs":[{"g":"Rims","items":["Alloy Rims","Steel Rims","Chrome Rims","Sport Rims","Winter Rims","Complete Wheel"]},{"g":"Tyres","items":["Summer Tyres","Winter Tyres","All-Season Tyres","Run-Flat","Sport Tyres","SUV Tyres","Off-Road Tyres"]},{"g":"TPMS Sensors","items":["TPMS Sensor","TPMS Valve","TPMS Control Unit","TPMS Programmer"]},{"g":"Wheel Bolts & Nuts","items":["Wheel Bolts","Wheel Nuts","Wheel Studs","Centre Cap","Valve Core","Wheel Spacer"]}]},{"l":"Oils, Fluids & Chemicals","subs":[{"g":"Engine Oil","items":["5W-30","5W-40","10W-40","0W-20","0W-30","Diesel Engine Oil","Fully Synthetic","Semi-Synthetic","Longlife Oil"]},{"g":"Gear Oil","items":["Manual Gearbox Oil","Automatic Transmission Fluid (ATF)","DSG / DCT Oil","Axle Oil","Differential Oil"]},{"g":"Brake Fluid","items":["DOT 4","DOT 5.1","DOT 3","Long Life Brake Fluid"]},{"g":"Coolant","items":["G12 Coolant","G13 Coolant","OAT Coolant","Coolant Concentrate","Ready-Mixed Coolant"]},{"g":"Additives & Chemicals","items":["Oil Additive","Fuel Additive","DPF Cleaner","AC Disinfectant","Brake Cleaner","Chain Lube"]}]},{"l":"Accessories & Wear Parts","subs":[{"g":"Wiper Blades","items":["Flat Blade Wiper","Conventional Wiper","Rear Wiper","Wiper Arm","Washer Jet"]},{"g":"Bulbs","items":["H4 Halogen","H7 Halogen","LED Retrofit Kit","Xenon D1S","Xenon D2S","Interior Bulb","W5W Sidelight"]},{"g":"Fuses","items":["Blade Fuses","Fuse Link","Fuse Box","Relay","Relay Box"]},{"g":"Belts & Pulleys","items":["V-Belt","Ribbed Belt","Poly-V Kit","Tensioner Pulley","Idler Pulley","Alternator Freewheel"]}]}], vc_cta: "Car Parts", vc_cta_sub: "All makes & models →",
      vc: [
        {l:"Truck Parts",      s:"Commercial vehicles",       q:"truck"},
        {l:"Motorcycle Parts", s:"All models",                q:"motorcycle"},
        {l:"Tyres",            s:"Summer · Winter · All-year",q:"tyre"},
        {l:"Rims",             s:"Steel · Alloy · Chrome",    q:"rim"},
        {l:"Tools",            s:"Pro & DIY",                 q:"tool"},
        {l:"Accessories",      s:"Interior & Exterior",       q:"accessory"},
        {l:"Engine Oil",       s:"All viscosities",           q:"oil"},
        {l:"Filters",          s:"Oil · Air · Fuel · Cabin",  q:"filter"},
        {l:"Brakes",           s:"Pads · Discs · Callipers",  q:"brake"}
      ],
      features: [
        ["OEM Search", "Find by OEM number, brand, model & year"],
        ["Mobile Money", "MTN, Airtel, M-Pesa, Bank Transfer, COD"],
        ["Local Logistics", "Bus, motorbike, courier & DHL options"],
        ["Wholesale Direct", "Wholesale from verified suppliers"],
        ["Verified Sellers", "All shops reviewed by our admin team"],
        ["10 Languages", "EN - FR - PT - DE - ES - AR - TR - SW - LN"]
      ]
    },
    product: { add_cart: "Add to Cart", buy_now: "Buy Now", condition: "Condition",
      new: "New", used: "Used", refurbished: "Refurbished",
      brand: "Brand", model: "Model", year: "Year", oem: "OEM No.",
      location: "Location", moq: "Min. Order", stock: "in stock",
      out_stock: "Out of stock", seller: "About the Seller",
      description: "Description", view_shop: "View Shop", added: "Added to cart!" },
    cart: { title: "Shopping Cart", empty: "Your cart is empty.",
      subtotal: "Subtotal", checkout: "Proceed to Checkout",
      continue: "Continue Shopping", clear: "Clear Cart", items: "items" },
    checkout: { title: "Checkout", items: "Order Items",
      shipping: "Shipping Method", payment: "Payment Method",
      address: "Delivery Address", place_order: "Place Order",
      seller_no_payout: "Sorry, an item in your cart isn\u2019t available right now \u2014 the seller hasn\u2019t set up payouts yet. Please remove it or try again later.",
      mobile_money: "Mobile Money", bank: "Bank Transfer", cod: "Cash on Delivery",
      name: "Full Name", city: "City", country: "Country",
      addr: "Address / Delivery Notes", phone: "Phone Number",
      select_ship: "Please fill all fields and select a shipping method.",
      success: "Order placed successfully!" },
    orders: { title: "My Orders", number: "Order #", date: "Date",
      total: "Total", status: "Status", no_orders: "No orders yet.",
      details: "Order Details", payment: "Payment", shipping: "Shipping" },
    auth: { email: "Email address", password: "Password",
      confirm: "Confirm password", name: "Full name",
      phone: "Phone number", country: "Country",
      role: "I want to", buyer: "Buy parts", seller: "Sell parts",
      login_btn: "Sign In", register_btn: "Create Account",
      forgot: "Forgot password?", no_account: "New to AFRICARPARTS?",
      have_account: "Already have an account?",
      china_seller: "Atacadistae supplier / wholesale shop",
      mismatch: "Passwords do not match.",
      fill_all: "Please fill all required fields." },
    seller: { products: "My Products", shop: "My Shop",
      csv_import: "Bulk Import (CSV)", add_product: "Add Product",
      deactivate: "Deactivate", activate: "Activate",
      pending: "Pending Approval", live: "Live",
      shop_saved: "Shop saved!", submitted: "Product submitted for approval!" },
    admin: { overview: "Overview", users: "Users", shops: "Shops",
      products: "Products", orders_all: "All Orders",
      categories: "Categories", approve: "Approve",
      remove: "Remove", delete: "Delete",
      enable: "Enable", disable: "Disable",
      add_cat: "Add Category", cat_name: "Category name",
      cat_slug: "slug-here", cat_icon: "Icon" },
    filter: { all: "All", condition: "Condition", brand: "Brand",
      origin: "Origin", china_only: "Wholesale Only", search: "Search",
      reset: "Reset filters", load_more: "Load more",
      showing: "Showing", of: "of", parts: "parts" },
    shop: { african: "African Sellers", china: "Wholesale Suppliers",
      no_shops: "No shops registered yet.", products_from: "Products from",
      whatsapp: "WhatsApp available", wechat: "WeChat", alibaba: "Alibaba Store",
      pending: "Your shop is pending admin approval.",
      create: "Create Shop", save: "Save Changes" },
    footer: { tagline: "Africa's leading B2B/B2C marketplace for new & used auto spare parts.",
      marketplace: "Marketplace", browse: "Browse Parts",
      sell: "Sell on AFRICARPARTS", china_w: "Wholesale",
      support: "Support", help: "Help Center", shipping_info: "Shipping Info",
      returns: "Returns Policy", contact: "Contact Us", payments: "Payments",
      rights: "All rights reserved.",
      countries: "Ghana - Nigeria - Kenya - DRC - Senegal - Tanzania" },
    errors: { not_found: "Page not found.", no_parts: "No parts found.",
      generic: "Something went wrong." },
    csv: { title: "CSV Bulk Import",
      info: "Upload a CSV to import multiple products at once.",
      cols: "Required CSV columns", download: "Download CSV Template",
      drop: "Click to upload or drag & drop your CSV",
      drop_sub: "Max 5MB - UTF-8 encoding",
      processing: "Processing CSV...", success: "Import complete!" },
    admin_hub: {
      welcome: "Welcome back, ",
      subtitle: "Pick a module. Cards marked \"Soon\" will be activated step by step.",
      active: "ACTIVE", soon: "SOON",
      mod_banner_t: "Banner Management",
      mod_banner_d: "Create, activate, edit and delete homepage banners",
      mod_products_t: "Products & Categories",
      mod_products_d: "Product overview, approvals, categories, bulk import (CSV)",
      mod_orders_t: "Orders",
      mod_orders_d: "Order overview, status tracking, returns, payments",
      mod_shops_t: "Seller Management",
      mod_shops_d: "Seller profiles, verification, performance, payouts",
      mod_users_t: "User Management",
      mod_users_d: "Buyer profiles, roles & permissions, blacklist",
      mod_mod_t: "Moderation & Safety",
      mod_mod_d: "Content moderation, fraud detection, tickets, audit logs",
      mod_analytics_t: "Analytics & Insights",
      mod_analytics_d: "Revenue, traffic, top products, search statistics",
      mod_system_t: "System & Configuration",
      mod_system_d: "CMS pages, email templates, API keys, backup"
    },
    seller_hub: {
      welcome: "Welcome back, ",
      subtitle: "Manage your shop. Cards marked \"Soon\" will be activated step by step.",
      active: "ACTIVE", soon: "SOON",
      prod_count_word: "Products",
      mod_products_t: "Product Management",
      mod_products_d: "Product list, create new items, compatibility, pricing, inventory",
      mod_csv_t: "Bulk Upload (CSV)",
      mod_csv_d: "Import large quantities via CSV/Excel",
      mod_orders_t: "Orders & Shipping",
      mod_orders_d: "Order overview, shipping labels, tracking, returns, disputes",
      mod_finance_t: "Finance & Payouts",
      mod_finance_d: "Revenue, payout status, fees, invoices & receipts",
      mod_kpi_t: "Performance & KPIs",
      mod_kpi_d: "Ratings, shipping time, cancellation/return rate, top products",
      mod_comm_t: "Communication & Support",
      mod_comm_d: "Message center, auto-replies, ticket system",
      mod_profile_t: "Company Profile & Settings",
      mod_profile_d: "Company data, verification, API integrations, notifications"
    },
    seller_prod: {
      back: "< Back", empty_t: "No products yet",
      empty_s: "Create your first product using the form above.",
      col_image: "Image", col_title: "Title", col_brand: "Brand",
      col_price: "Price", col_stock: "Stock", col_actions: "Actions",
      btn_edit: "Edit", btn_delete: "Delete",
      summary_new: "+ Create new product", summary_edit: "Edit product",
      f_title: "Title *", f_desc: "Description",
      f_price: "Price (USD) *", f_stock: "Stock",
      f_brand: "Brand", f_model: "Model",
      f_oem: "OEM Number", f_condition: "Condition",
      f_cat: "Category", f_tags: "Tags", f_images: "Images",
      f_active: "Product active (visible on marketplace)",
      no_cat: "— No category —",
      cond_new: "New", cond_used: "Used", cond_ref: "Refurbished",
      ph_title: "e.g. Front Brake Pads Bosch QuietCast",
      ph_desc: "Details, condition, special features...",
      ph_brand: "e.g. Bosch", ph_model: "e.g. F10",
      ph_oem: "e.g. 34116794917", ph_tags: "brake pads, front, ceramic",
      tags_hint: "comma-separated, max 50 chars per tag",
      images_hint: "max 5, JPG/PNG/WebP, max 2 MB per image",
      images_info: "Stored on Cloudflare R2 under products/.",
      no_images: "No images uploaded yet.",
      btn_upload: "Upload images",
      btn_create: "Create", btn_update: "Update", btn_cancel: "Cancel",
      status_loading: "Loading...", status_uploading: "Uploading...",
      status_saving: "Saving...", status_uploaded: "Uploaded",
      t_created: "Created", t_updated: "Updated", t_deleted: "Deleted",
      err_title_req: "Title is required",
      err_price_invalid: "Invalid price",
      err_load: "Error loading", err_save: "Error saving", err_delete: "Error deleting",
      err_max_5: "Maximum 5 images",
      err_only_n: "Only {n} more image(s) allowed",
      err_only_jpg: "Only JPG, PNG or WebP: {name}",
      err_too_large: "Too large (max 2 MB): {name}",
      err_upload_fail: "Upload failed (HTTP {n})",
      err_upload: "Upload error",
      confirm_delete: "Really delete this product? This action cannot be undone."
    }
  },

  de: {
    meta: { title: "AFRICARPARTS - Kfz-Ersatzteilmarktplatz Afrika",
      description: "Neue, gebrauchte und Grosshandels-Kfz-Ersatzteile in Afrika und China." },
    nav: { parts: "Teile", shops: "Shops", china: "Grosshandel",
      login: "Anmelden", register: "Registrieren", logout: "Abmelden",
      dashboard: "Dashboard", admin: "Admin-Panel", orders: "Meine Bestellungen",
      cart: "Warenkorb", language: "Sprache", currency: "Waehrung" },
    home: { hero_badge: "Afrikas #1 Kfz-Ersatzteilmarktplatz",
      popular_brands: "Beliebte Marken",
      hero_title: "Jedes Autoteil finden -", hero_title_em: "Schnell & Zuverlaessig",
      hero_sub: "Neue, gebrauchte & Grosshandels-Ersatzteile - Verifizierte Verkaeufer",
      search_ph: "Teilename, OEM-Nummer, Marke, Modell...",
      search_btn: "Teile suchen",
      search_headline: "Millionen Teile. Eine einfache Suche.",
      pkw_btn: "PKW-Ersatzteile", pkw_title: "PKW-Ersatzteile", pkw_subtitle: "Wählen Sie eine Kategorie",
      pkw_close: "Schließen", pkw_back: "Zurück", pkw_choose: "Kategorie wählen", pkw_search_in: "In Kategorie suchen",
      banner_pl_hero: "Hero (Hintergrund oben)", banner_pl_partner: "Partner-Slot (Seitenmitte)",
      banner_pl_side_left: "Linker Seitenbanner", banner_pl_side_right: "Rechter Seitenbanner",
      banner_placement: "Platzierung", banner_placement_help: "Wo auf der Seite dieser Banner erscheint",
      seo_admin_title: "SEO Texte", seo_admin_sub: "Eigene mehrsprachige Textblöcke",
      seo_add: "+ Neuer SEO Text", seo_slug: "Slug (interne ID)", seo_position: "Position",
      seo_sort: "Sortierung", seo_active: "Aktiv", seo_translations: "Übersetzungen",
      seo_title_field: "Titel", seo_body_field: "Text (HTML erlaubt)",
      seo_pl_home_top: "Startseite Oben", seo_pl_home_bottom: "Startseite Unten",
      seo_pl_partner: "Partner-Bereich", seo_pl_custom: "Benutzerdefiniert",
      seo_save: "Speichern", seo_cancel: "Abbrechen", seo_delete: "Löschen",
      seo_confirm_delete: "Diesen SEO Text löschen?", nav_seo: "SEO Texte",
      stats_parts: "Teile gelistet",
      stats_sellers: "Verifizierte Verkaeufer", stats_countries: "Laender",
      stats_langs: "Sprachen", featured: "Empfohlene Teile",
      featured_sub: "Beliebteste Teile", view_all: "Alle anzeigen",
      search_all_cats: "Alle Kategorien", vc_cat_btn: "Alle Kategorien", vc_tree: [{"l":"Motor & Antrieb","subs":[{"g":"Motorblock & Komponenten","items":["Kurbelgehäuse","Zylinderkopf","Ventildeckel","Ölwanne","Kolben","Kolbenringe","Nockenwelle","Kurbelwelle"]},{"g":"Steuertrieb","items":["Zahnriemen","Steuerkette","Kettenspanner","Umlenkrolle","Steuerriemen-Kit","Steuerketten-Kit"]},{"g":"Kraftstoffsystem","items":["Einspritzdüsen","Kraftstoffpumpe","Hochdruckpumpe","Kraftstofffilter","Kraftstoff-Rail","Druckregler","Kraftstoffdrucksensor"]},{"g":"Luftansaugung","items":["Luftfilter","Ansaugbrücke","Ladeluftkühler","Turbolader","Drosselklappe","Luftmassenmesser","Ansaugschlauch"]},{"g":"Kühlsystem","items":["Kühler","Thermostat","Wasserpumpe","Ausgleichsbehälter","Kühlerschlauch","Lüfter","Viskokupplung","Kühlmitteltemperatursensor"]},{"g":"Schmiersystem","items":["Ölfilter","Ölpumpe","Öldrucksensor","Ventildeckelentlüftung","Ölkühler","Ölmessstab"]},{"g":"Kupplung & Getriebe","items":["Kupplungssatz","Zweimassenschwungrad","Getriebelager","Antriebswellen","Gleichlaufgelenk","Ausrücklager","Schaltgestänge","Getriebeöldichtung"]}]},{"l":"Bremsanlage","subs":[{"g":"Bremsbeläge","items":["Vorderachs-Beläge","Hinterachs-Beläge","Sportbremsbeläge","Bremsbelagsatz mit Warnkontakt"]},{"g":"Bremsscheiben","items":["Innenbelüftete Scheiben","Massivscheiben","Gelochte Scheiben","Sportbremsscheiben","Bremsscheiben-Set"]},{"g":"Bremssättel","items":["Bremssattel vorne","Bremssattel hinten","Bremsbacken","Radzylinder","Bremssattel Reparatursatz"]},{"g":"ABS / ESP Sensorik","items":["ABS-Sensor","Raddrehzahlsensor","ABS-Steuergerät","ABS-Pumpe","ESP-Sensor"]},{"g":"Bremsleitungen","items":["Bremsschläuche","Bremsleitungen","Verteiler","Bremsleitungsset","Bremsflüssigkeitsbehälter"]},{"g":"Handbremse","items":["Handbremsseil","Handbremshebel","EPB-Stellmotor","Bremsbacken hinten","Bremstrommel"]}]},{"l":"Fahrwerk & Lenkung","subs":[{"g":"Stoßdämpfer & Federung","items":["Stoßdämpfer vorne","Stoßdämpfer hinten","Schraubenfedern","Domlager","Puffer","Faltenbalg","Gewindefahrwerk","Luftfederung"]},{"g":"Lenkung","items":["Spurstangenkopf","Spurstange","Axialgelenk","Lenkgetriebe","Servopumpe","Lenkmanschette","Lenksäule","Lenkwinkelsensor"]},{"g":"Achsteile","items":["Querlenker","Traggelenk","Stabilisatorlager","Stabilisator","Koppelstange","Achsschenkel","Hilfsrahmen","Gummilager"]},{"g":"Radlager","items":["Radlager vorne","Radlager hinten","Radnabe","Radlager-Kit","Radnabenschraube"]}]},{"l":"Elektrik & Sensorik","subs":[{"g":"Batterie & Ladung","items":["Starterbatterie","Lichtmaschine","Anlasser","Spannungsregler","Ladekabel","Batteriepol","Batteriesensor"]},{"g":"Beleuchtung","items":["Scheinwerfer","Rückleuchten","Blinker","Nebelscheinwerfer","Tagfahrlicht","LED-Module","Glühlampen","Scheinwerferwaschanlage"]},{"g":"Sensoren","items":["Luftmassenmesser","MAP-Sensor","Lambdasonde","Kurbelwellensensor","Nockenwellensensor","NOx-Sensor","Abgastemperatursensor","Klopfsensor"]},{"g":"Steuergeräte","items":["Motorsteuergerät","ABS-Steuergerät","Komfortsteuergerät","Airbag-Steuergerät","Getriebesteuergerät"]},{"g":"Schalter & Bedienelemente","items":["Fensterheberschalter","Lenkstockschalter","Zündschloss","Hupe","Außenspiegelschalter","Zentralverriegelungsmodul"]}]},{"l":"Filter","subs":[{"g":"Luftfilter","items":["Luftfilter Benziner","Luftfilter Diesel","Sportluftfilter","Rucksackfilter"]},{"g":"Ölfilter","items":["Ölfilter Patrone","Ölfilter Spin-on","Ölfiltergehäuse","Ölfilter-Set"]},{"g":"Kraftstofffilter","items":["Kraftstofffilter Diesel","Kraftstofffilter Benzin","Inline-Filter","Vorfilter"]},{"g":"Innenraumfilter","items":["Pollenfilter","Aktivkohlefilter","Kombifilter","Cabin-Filter-Set"]}]},{"l":"Karosserie & Außen","subs":[{"g":"Stoßfänger","items":["Frontstoßfänger","Heckstoßfänger","Stoßfängerhalter","Stoßfänger-Unterfahrschutz","Abschleppösenabdeckung"]},{"g":"Kotflügel & Türen","items":["Kotflügel","Motorhaube","Heckklappe","Türverkleidung","Seitenschweller","Dachleiste"]},{"g":"Spiegel","items":["Spiegelglas","Spiegelgehäuse","Spiegelstellmotor","Beheizbares Spiegelelement","Spiegelkappe"]},{"g":"Fensterheber","items":["Fensterheber-Motor","Fensterheber-Mechanik","Fensterscheibe","Fensterdichtung"]},{"g":"Schlösser & Schließsysteme","items":["Türschloss","Zentralverriegelung","Türschlossstellmotor","Schließzylinder","Motorhaubenzug","Tankklappe"]}]},{"l":"Innenraum & Komfort","subs":[{"g":"Sitze & Mechanik","items":["Sitzschiene","Kopfstütze","Sitzbezug","Sitzheizung","Sitzverstellung","Lehnenschloss"]},{"g":"Armaturen & Verkleidung","items":["Armaturenbrett","Mittelkonsole","Handschuhfach","Sonnenblende","Türgriff innen","Teppichboden"]},{"g":"Klimaanlage","items":["Klimakompressor","Klimakondensator","Verdampfer","Expansionsventil","Klimadruckschalter","Trockner / Sammler","Klimaleitung"]},{"g":"Heizung","items":["Wärmetauscher","Gebläsemotor","Gebläseregler","Heizungsventil","Heizungsschlauch"]}]},{"l":"Abgasanlage","subs":[{"g":"Krümmer","items":["Abgaskrümmer","Turboladerkrümmer","Krümmerdichtung","Krümmerbolzen"]},{"g":"Katalysator","items":["Oxidationskatalysator","Dreiwegekatalysator","Dieseloxidationskatalysator","Vorkatalysator"]},{"g":"Partikelfilter","items":["DPF Dieselpartikelfilter","Ottopartikelfilter OPF","DPF-Drucksensor","DPF-Temperatursensor"]},{"g":"Endschalldämpfer","items":["Endschalldämpfer","Mittelschalldämpfer","Mittelrohr","Zwischenrohr","Flexrohr","Abgashalterung"]},{"g":"Lambdasonden","items":["Vor-Kat Lambdasonde","Nach-Kat Lambdasonde","Breitband-Lambdasonde","NOx-Sonde","Heizsonde"]}]},{"l":"Räder & Reifen","subs":[{"g":"Felgen","items":["Alufelgen","Stahlfelgen","Chromfelgen","Sportfelgen","Winterfelgen","Komplettrad"]},{"g":"Reifen","items":["Sommerreifen","Winterreifen","Ganzjahresreifen","Runflat","Sportreifen","SUV-Reifen","Geländereifen"]},{"g":"Reifendrucksensoren (RDKS)","items":["RDKS-Sensor","RDKS-Ventil","RDKS-Steuergerät","RDKS-Programmierwerkzeug"]},{"g":"Radschrauben & Muttern","items":["Radschrauben","Radmuttern","Radbolzen","Nabendeckel","Ventileinsatz","Spurverbreiterung"]}]},{"l":"Öle, Flüssigkeiten & Chemie","subs":[{"g":"Motoröl","items":["5W-30","5W-40","10W-40","0W-20","0W-30","Dieselmotoröl","Vollsynthetisch","Teilsynthetisch","Longlife-Öl"]},{"g":"Getriebeöl","items":["Schaltgetriebeöl","Automatikgetriebeöl (ATF)","DSG/DCT-Öl","Achsgetriebeöl","Differenzialöl"]},{"g":"Bremsflüssigkeit","items":["DOT 4","DOT 5.1","DOT 3","Bremsflüssigkeit Long Life"]},{"g":"Kühlmittel","items":["G12 Kühlmittel","G13 Kühlmittel","OAT Kühlmittel","Kühlmittelkonzentrat","Kühlmittel gebrauchsfertig"]},{"g":"Additive & Chemie","items":["Öladditiv","Kraftstoffadditiv","DPF-Reiniger","Klima-Desinfektion","Bremsreiniger","Kettenfett"]}]},{"l":"Zubehör & Verschleißteile","subs":[{"g":"Wischerblätter","items":["Flachbalkenwischer","Bügel-Wischblatt","Heckwischer","Wischerarm","Waschdüse"]},{"g":"Glühbirnen","items":["H4 Halogen","H7 Halogen","LED-Nachrüstsatz","Xenon D1S","Xenon D2S","Innenraumbirne","W5W Standlicht"]},{"g":"Sicherungen","items":["Flachstecksicherungen","Schmelzsicherung","Sicherungsbox","Relais","Relaisbox"]},{"g":"Riemen & Rollen","items":["Keilriemen","Keilrippenriemen","Rippenriemen-Kit","Spannrolle","Umlenkrolle","Lichtmaschinen-Freilauf"]}]}], vc_cta: "PKW-Ersatzteile", vc_cta_sub: "Alle Marken & Modelle →",
      vc: [
        {l:"LKW-Ersatzteile",      s:"Nutzfahrzeuge",              q:"LKW"},
        {l:"Motorrad-Ersatzteile", s:"Alle Modelle",               q:"Motorrad"},
        {l:"Reifen",               s:"Sommer · Winter · Ganzjahr", q:"Reifen"},
        {l:"Felgen",               s:"Stahl · Alu · Chrom",        q:"Felgen"},
        {l:"Werkzeuge",            s:"Profi & Hobby",              q:"Werkzeuge"},
        {l:"Autozubehör",          s:"Innen & Außen",              q:"Zubehör"},
        {l:"Motoröl",              s:"Alle Viskositäten",          q:"Motoröl"},
        {l:"Filter",               s:"Öl · Luft · Kraftstoff",     q:"Filter"},
        {l:"Bremsen",              s:"Beläge · Scheiben · Sättel", q:"Bremsen"}
      ],
      categories: "Nach Kategorie suchen", sell_sub: "Teile kostenlos listen · Afrika erreichen", learn_more: "Mehr erfahren", sell_sub: "Tia biloko ofele · Koma Afrika", learn_more: "Yeba lisusu", china_title: "Grosshandel Direkt",
      china_sub: "Fabrikpreise - Lieferung nach ganz Afrika",
      why_title: "Warum AFRICARPARTS?",
      features: [
        ["OEM-Suche", "Nach OEM-Nummer, Marke, Modell & Jahr"],
        ["Mobile Money", "MTN, Airtel, M-Pesa, Ueberweisung, Nachnahme"],
        ["Lokale Logistik", "Bus, Motorrad, Kurier & DHL"],
        ["Grosshandel", "Grosshandel von verifizierten chinesischen Lieferanten"],
        ["Verifizierte Verkaeufer", "Alle Shops vom Admin-Team geprueft"],
        ["10 Sprachen", "EN - FR - PT - DE - ES - AR - TR - SW - LN"]
      ] },
    product: { add_cart: "In den Warenkorb", buy_now: "Jetzt kaufen",
      condition: "Zustand", new: "Neu", used: "Gebraucht",
      refurbished: "Aufgearbeitet", brand: "Marke", model: "Modell",
      year: "Jahr", oem: "OEM-Nr.", location: "Standort",
      moq: "Mindestbestellung", stock: "auf Lager",
      out_stock: "Nicht auf Lager", seller: "Ueber den Verkaeufer",
      description: "Beschreibung", view_shop: "Shop ansehen",
      added: "Zum Warenkorb hinzugefuegt!" },
    cart: { title: "Warenkorb", empty: "Ihr Warenkorb ist leer.",
      subtotal: "Zwischensumme", checkout: "Zur Kasse",
      continue: "Weiter einkaufen", clear: "Warenkorb leeren", items: "Artikel" },
    checkout: { title: "Kasse", items: "Bestellartikel",
      shipping: "Versandmethode", payment: "Zahlungsmethode",
      address: "Lieferadresse", place_order: "Bestellung aufgeben",
      seller_no_payout: "Ein Artikel in deinem Warenkorb ist aktuell nicht bestellbar \u2014 der Verk\u00e4ufer hat seine Auszahlung noch nicht eingerichtet. Bitte entferne ihn oder versuche es sp\u00e4ter.",
      mobile_money: "Mobile Money", bank: "Bankueberweisung", cod: "Nachnahme",
      name: "Vollstaendiger Name", city: "Stadt", country: "Land",
      addr: "Adresse", phone: "Telefonnummer",
      select_ship: "Bitte alle Felder ausfuellen.",
      success: "Bestellung aufgegeben!" },
    orders: { title: "Meine Bestellungen", number: "Bestellung #",
      date: "Datum", total: "Gesamt", status: "Status",
      no_orders: "Keine Bestellungen.", details: "Details",
      payment: "Zahlung", shipping: "Versand" },
    auth: { email: "E-Mail", password: "Passwort", confirm: "Bestaetigen",
      name: "Name", phone: "Telefon", country: "Land",
      role: "Ich moechte", buyer: "Teile kaufen", seller: "Teile verkaufen",
      login_btn: "Anmelden", register_btn: "Konto erstellen",
      forgot: "Passwort vergessen?", no_account: "Neu?",
      have_account: "Konto vorhanden?", china_seller: "Grosshändler",
      mismatch: "Passwoerter stimmen nicht ueberein.",
      fill_all: "Alle Pflichtfelder ausfuellen." },
    seller: { products: "Meine Produkte", shop: "Mein Shop",
      csv_import: "Massenimport (CSV)", add_product: "Produkt hinzufuegen",
      deactivate: "Deaktivieren", activate: "Aktivieren",
      pending: "Ausstehend", live: "Aktiv",
      shop_saved: "Gespeichert!", submitted: "Eingereicht!" },
    admin: { overview: "Uebersicht", users: "Benutzer", shops: "Shops",
      products: "Produkte", orders_all: "Bestellungen",
      categories: "Kategorien", approve: "Genehmigen",
      remove: "Entfernen", delete: "Loeschen",
      enable: "Aktivieren", disable: "Deaktivieren",
      add_cat: "Hinzufuegen", cat_name: "Name",
      cat_slug: "slug-hier", cat_icon: "Icon" },
    filter: { all: "Alle", condition: "Zustand", brand: "Marke",
      origin: "Herkunft", china_only: "Nur Grosshandel", search: "Suchen",
      reset: "Zuruecksetzen", load_more: "Mehr laden",
      showing: "Zeige", of: "von", parts: "Teile" },
    shop: { african: "Afrikanische Verkaeufer",
      china: "Grosshandel-Anbieter",
      no_shops: "Keine Shops.", products_from: "Produkte von",
      whatsapp: "WhatsApp", wechat: "WeChat", alibaba: "Alibaba",
      pending: "Ausstehende Genehmigung.",
      create: "Shop erstellen", save: "Speichern" },
    footer: { tagline: "Afrikas fuehrender Marktplatz fuer Kfz-Ersatzteile.",
      marketplace: "Marktplatz", browse: "Durchsuchen",
      sell: "Verkaufen", china_w: "Grosshandel",
      support: "Support", help: "Hilfe", shipping_info: "Versand",
      returns: "Rueckgabe", contact: "Kontakt", payments: "Zahlungen",
      rights: "Alle Rechte vorbehalten.",
      countries: "Ghana - Nigeria - Kenia - DRK - Senegal - Tansania" },
    errors: { not_found: "Seite nicht gefunden.",
      no_parts: "Keine Teile gefunden.", generic: "Fehler." },
    csv: { title: "CSV-Import", info: "CSV hochladen.",
      cols: "Spalten", download: "Vorlage",
      drop: "Klicken zum Hochladen", drop_sub: "Max 5MB",
      processing: "Verarbeitung...", success: "Fertig!" },
    admin_hub: {
      welcome: "Willkommen zurueck, ",
      subtitle: "Waehle ein Modul. Karten mit \"Bald\" werden Schritt fuer Schritt aktiviert.",
      active: "AKTIV", soon: "BALD",
      mod_banner_t: "Banner-Management",
      mod_banner_d: "Startseiten-Banner anlegen, aktivieren, bearbeiten und loeschen",
      mod_products_t: "Produkte & Kategorien",
      mod_products_d: "Produktuebersicht, Freigaben, Kategorien, Bulk-Import (CSV)",
      mod_orders_t: "Bestellungen",
      mod_orders_d: "Bestelluebersicht, Status-Tracking, Retouren, Zahlungen",
      mod_shops_t: "Haendler-Management",
      mod_shops_d: "Haendlerprofile, Verifizierung, Performance, Auszahlungen",
      mod_users_t: "Nutzerverwaltung",
      mod_users_d: "Kaeuferprofile, Rollen & Berechtigungen, Blacklist",
      mod_mod_t: "Moderation & Sicherheit",
      mod_mod_d: "Content-Moderation, Fraud-Detection, Tickets, Audit-Logs",
      mod_analytics_t: "Analytics & Insights",
      mod_analytics_d: "Umsatz, Traffic, Top-Produkte, Suchstatistiken",
      mod_system_t: "System & Konfiguration",
      mod_system_d: "CMS-Seiten, E-Mail-Templates, API-Keys, Backup"
    },
    seller_hub: {
      welcome: "Willkommen zurueck, ",
      subtitle: "Verwalte deinen Shop. Karten mit \"Bald\" werden Schritt fuer Schritt aktiviert.",
      active: "AKTIV", soon: "BALD",
      prod_count_word: "Produkte",
      mod_products_t: "Produktmanagement",
      mod_products_d: "Produktliste, neue Artikel anlegen, Kompatibilitaet, Preise, Lagerbestand",
      mod_csv_t: "Bulk-Upload (CSV)",
      mod_csv_d: "Grosse Produktmengen per CSV/Excel importieren",
      mod_orders_t: "Bestellungen & Versand",
      mod_orders_d: "Bestelluebersicht, Versandlabels, Tracking, Retouren, Streitfaelle",
      mod_finance_t: "Finanzen & Auszahlungen",
      mod_finance_d: "Umsatz, Auszahlungsstatus, Gebuehren, Rechnungen & Belege",
      mod_kpi_t: "Performance & KPIs",
      mod_kpi_d: "Bewertungen, Versandzeit, Storno-/Retourenquote, Top-Produkte",
      mod_comm_t: "Kommunikation & Support",
      mod_comm_d: "Nachrichtencenter, Auto-Antworten, Ticket-System",
      mod_profile_t: "Firmenprofil & Einstellungen",
      mod_profile_d: "Firmendaten, Verifizierung, API-Integrationen, Benachrichtigungen"
    },
    seller_prod: {
      back: "< Zurueck", empty_t: "Noch keine Produkte",
      empty_s: "Lege oben dein erstes Produkt an.",
      col_image: "Bild", col_title: "Titel", col_brand: "Marke",
      col_price: "Preis", col_stock: "Bestand", col_actions: "Aktionen",
      btn_edit: "Bearb.", btn_delete: "Loesch.",
      summary_new: "+ Neues Produkt anlegen", summary_edit: "Produkt bearbeiten",
      f_title: "Titel *", f_desc: "Beschreibung",
      f_price: "Preis (USD) *", f_stock: "Lagerbestand",
      f_brand: "Marke", f_model: "Modell",
      f_oem: "OEM-Nummer", f_condition: "Zustand",
      f_cat: "Kategorie", f_tags: "Tags", f_images: "Bilder",
      f_active: "Produkt aktiv (sichtbar im Marktplatz)",
      no_cat: "— Keine Kategorie —",
      cond_new: "Neu", cond_used: "Gebraucht", cond_ref: "Generalueberholt",
      ph_title: "z.B. Bremsbelag Vorderachse Bosch QuietCast",
      ph_desc: "Details, Zustand, Besonderheiten...",
      ph_brand: "z.B. Bosch", ph_model: "z.B. F10",
      ph_oem: "z.B. 34116794917", ph_tags: "bremsbelag, vorne, keramik",
      tags_hint: "komma-getrennt, max 50 Zeichen pro Tag",
      images_hint: "max 5, JPG/PNG/WebP, max 2 MB pro Bild",
      images_info: "Wird auf Cloudflare R2 unter products/ gespeichert.",
      no_images: "Noch keine Bilder hochgeladen.",
      btn_upload: "Bilder hochladen",
      btn_create: "Anlegen", btn_update: "Aktualisieren", btn_cancel: "Abbrechen",
      status_loading: "Laedt...", status_uploading: "Laedt hoch...",
      status_saving: "Speichern...", status_uploaded: "Hochgeladen",
      t_created: "Angelegt", t_updated: "Aktualisiert", t_deleted: "Geloescht",
      err_title_req: "Titel ist Pflicht",
      err_price_invalid: "Preis ungueltig",
      err_load: "Fehler beim Laden", err_save: "Fehler beim Speichern", err_delete: "Fehler beim Loeschen",
      err_max_5: "Maximal 5 Bilder",
      err_only_n: "Nur noch {n} Bild(er) moeglich",
      err_only_jpg: "Nur JPG, PNG oder WebP: {name}",
      err_too_large: "Zu gross (max 2 MB): {name}",
      err_upload_fail: "Upload fehlgeschlagen (HTTP {n})",
      err_upload: "Upload-Fehler",
      confirm_delete: "Produkt wirklich loeschen? Diese Aktion kann nicht rueckgaengig gemacht werden."
    }
  },

  fr: {
    meta: { title: "AFRICARPARTS - Marche de pieces auto en Afrique" },
    nav: { parts: "Pieces", shops: "Boutiques", china: "Grossiste",
      login: "Connexion", register: "S'inscrire", logout: "Deconnexion",
      dashboard: "Tableau", admin: "Admin", orders: "Commandes",
      cart: "Panier", language: "Langue", currency: "Devise" },
    home: { hero_badge: "N1 de pieces auto en Afrique",
      popular_brands: "Marques populaires",
      hero_title: "Toute piece auto -", hero_title_em: "Rapide et Fiable",
      hero_sub: "Pieces neuves, d'occasion et en gros",
      search_ph: "Nom, OEM...", search_btn: "Rechercher",
      search_headline: "Des millions de pièces. Une seule recherche.",
      pkw_btn: "Pièces Auto", pkw_title: "Pièces de Rechange", pkw_subtitle: "Choisissez une catégorie",
      pkw_close: "Fermer", pkw_back: "Retour", pkw_choose: "Choisir une catégorie", pkw_search_in: "Rechercher dans la catégorie",
      banner_pl_hero: "Hero (fond en haut)", banner_pl_partner: "Slot partenaire (milieu)",
      banner_pl_side_left: "Bannière gauche", banner_pl_side_right: "Bannière droite",
      banner_placement: "Emplacement", banner_placement_help: "Où apparaît la bannière",
      seo_admin_title: "Textes SEO", seo_admin_sub: "Blocs de texte multilingues",
      seo_add: "+ Nouveau texte SEO", seo_slug: "Slug (ID interne)", seo_position: "Position",
      seo_sort: "Ordre", seo_active: "Actif", seo_translations: "Traductions",
      seo_title_field: "Titre", seo_body_field: "Contenu (HTML autorisé)",
      seo_pl_home_top: "Accueil Haut", seo_pl_home_bottom: "Accueil Bas",
      seo_pl_partner: "Section partenaire", seo_pl_custom: "Personnalisé",
      seo_save: "Enregistrer", seo_cancel: "Annuler", seo_delete: "Supprimer",
      seo_confirm_delete: "Supprimer ce texte SEO?", nav_seo: "Textes SEO",
      stats_parts: "Pieces", stats_sellers: "Vendeurs",
      stats_countries: "Pays", stats_langs: "Langues",
      featured: "En vedette", featured_sub: "Les plus populaires",
      view_all: "Voir tout", categories: "Par categorie",
      search_all_cats: "Toutes catégories", vc_cat_btn: "Toutes catégories", vc_tree: [{"l":"Moteur & Transmission","subs":[{"g":"Bloc Moteur & Composants","items":["Carter Moteur","Culasse","Cache Culbuteurs","Carter Huile","Pistons","Segments","Arbre à Cames","Vilebrequin"]},{"g":"Distribution","items":["Courroie Distribution","Chaîne Distribution","Tendeur Chaîne","Galet Enrouleur","Kit Courroie Distrib.","Kit Chaîne Distrib."]},{"g":"Alimentation","items":["Injecteurs","Pompe à Carburant","Pompe Haute Pression","Filtre Carburant","Rail Injecteurs","Régulateur Pression","Capteur Pression Carburant"]},{"g":"Admission Air","items":["Filtre à Air","Collecteur Admission","Échangeur Air","Turbocompresseur","Corps Papillon","Débitmètre","Durite Admission"]},{"g":"Refroidissement","items":["Radiateur","Thermostat","Pompe à Eau","Vase Expansion","Durite Refroidissement","Ventilateur","Visco-coupleur","Sonde Température Eau"]},{"g":"Lubrification","items":["Filtre à Huile","Pompe à Huile","Capteur Pression Huile","Reniflard","Refroidisseur Huile","Jauge Huile"]},{"g":"Embrayage & Boîte de Vitesse","items":["Kit Embrayage","Volant Bi-Masse","Roulement Boîte","Arbre de Transmission","Joint Homocinétique","Butée Embrayage","Tringlerie","Joint Spy Boîte"]}]},{"l":"Freinage","subs":[{"g":"Plaquettes de Frein","items":["Plaquettes Avant","Plaquettes Arrière","Plaquettes Sport","Jeu Plaquettes avec Témoin"]},{"g":"Disques de Frein","items":["Disques Ventilés","Disques Pleins","Disques Percés","Disques Sport","Jeu Disques Frein"]},{"g":"Étriers & Cylindres","items":["Étrier Avant","Étrier Arrière","Mâchoires","Cylindre Roue","Kit Réparation Étrier"]},{"g":"Capteurs ABS / ESP","items":["Capteur ABS","Capteur Vitesse Roue","Calculateur ABS","Pompe ABS","Capteur ESP"]},{"g":"Canalisations de Frein","items":["Flexibles Frein","Tuyaux Frein","Répartiteur","Jeu Canalisations","Bocal Liquide Frein"]},{"g":"Frein à Main","items":["Câble Frein à Main","Levier Frein à Main","Moteur EPB","Mâchoires Arrière","Tambour Frein"]}]},{"l":"Suspension & Direction","subs":[{"g":"Amortisseurs & Ressorts","items":["Amortisseurs Avant","Amortisseurs Arrière","Ressorts Hélicoïdaux","Coupelle Amortisseur","Butée","Soufflet","Kit Suspension Sport","Suspension Pneumatique"]},{"g":"Direction","items":["Rotule Direction","Rotule Axiale","Barre de Direction","Crémaillère","Pompe Direction Assistée","Soufflet Direction","Colonne Direction","Capteur Angle Braquage"]},{"g":"Pièces de Train Roulant","items":["Triangle de Suspension","Rotule de Suspension","Silent Bloc Stabilisateur","Barre Stabilisatrice","Biellette de Barre","Pivot","Berceau","Silentbloc"]},{"g":"Roulements de Roue","items":["Roulement Roue Avant","Roulement Roue Arrière","Moyeu de Roue","Kit Roulement","Ecrou de Moyeu"]}]},{"l":"Électricité & Capteurs","subs":[{"g":"Batterie & Charge","items":["Batterie Automobile","Alternateur","Démarreur","Régulateur Tension","Câble Charge","Cosse Batterie","Capteur Batterie"]},{"g":"Éclairage","items":["Phare","Feu Arrière","Clignotant","Antibrouillard","Feux Diurnes","Module LED","Ampoules","Lave-Phares"]},{"g":"Capteurs","items":["Débitmètre Air","Capteur MAP","Sonde Lambda","Capteur Vilebrequin","Capteur Arbre Cames","Sonde NOx","Capteur Temp. Gaz Échap.","Capteur Cliquetis"]},{"g":"Calculateurs","items":["Calculateur Moteur","Calculateur ABS","Contrôle Habitacle","Module Airbag","Calculateur Boîte de Vitesses"]},{"g":"Commandes & Contacteurs","items":["Commande Lève-Vitre","Commodo Clignotant","Contacteur Démarreur","Klaxon","Commande Rétroviseur","Module Verrouillage"]}]},{"l":"Filtres","subs":[{"g":"Filtres à Air","items":["Filtre Air Essence","Filtre Air Diesel","Filtre Air Sport","Filtre Plat"]},{"g":"Filtres à Huile","items":["Filtre Huile Cartouche","Filtre Huile Vissé","Boîtier Filtre Huile","Kit Filtre Huile"]},{"g":"Filtres à Carburant","items":["Filtre Carburant Diesel","Filtre Carburant Essence","Filtre en Ligne","Pré-Filtre"]},{"g":"Filtres Habitacle","items":["Filtre à Pollen","Filtre à Charbon Actif","Filtre Combiné","Kit Filtre Habitacle"]}]},{"l":"Carrosserie & Extérieur","subs":[{"g":"Pare-Chocs","items":["Pare-Chocs Avant","Pare-Chocs Arrière","Support Pare-Chocs","Soubassement Pare-Chocs","Cache Crochet Remorquage"]},{"g":"Ailes & Panneaux","items":["Aile","Capot","Hayon","Panneau de Porte","Bas de Caisse","Baguette de Toit"]},{"g":"Rétroviseurs","items":["Glace Rétroviseur","Boîtier Rétroviseur","Moteur Rétroviseur","Élément Chauffant","Coque Rétroviseur"]},{"g":"Lève-Vitres","items":["Moteur Lève-Vitre","Mécanisme Lève-Vitre","Vitre","Joint de Vitre"]},{"g":"Serrures & Fermeture","items":["Serrure de Porte","Centralisation","Actionneur Serrure","Barillet","Câble Capot","Trappe à Carburant"]}]},{"l":"Intérieur & Confort","subs":[{"g":"Sièges & Mécanismes","items":["Rail de Siège","Appuie-Tête","Housse de Siège","Chauffage Siège","Réglage Siège","Verrou Dossier"]},{"g":"Tableau de Bord & Garnitures","items":["Tableau de Bord","Console Centrale","Vide-Poches","Pare-Soleil","Poignée Porte Intérieure","Moquette"]},{"g":"Climatisation","items":["Compresseur Clim","Condenseur Clim","Évaporateur","Détendeur","Pressostat","Déshydrateur","Tuyau Clim"]},{"g":"Chauffage","items":["Radiateur de Chauffage","Moto-Ventilateur Chauffage","Résistance Chauffage","Robinet Chauffage","Durite Chauffage"]}]},{"l":"Ligne d'Échappement","subs":[{"g":"Collecteur d'Échappement","items":["Collecteur","Collecteur Turbo","Joint Collecteur","Goujon Collecteur"]},{"g":"Catalyseur","items":["Catalyseur d'Oxydation","Catalyseur Trois Voies","Catalyseur Diesel","Pré-Catalyseur"]},{"g":"Filtre à Particules","items":["FAP Diesel","FAP Essence (OPF)","Capteur Pression FAP","Capteur Temp. FAP"]},{"g":"Silencieux & Tubes","items":["Silencieux Arrière","Silencieux Central","Tube Central","Tube Intermédiaire","Tube Flexible","Support Échappement"]},{"g":"Sondes Lambda","items":["Sonde Lambda Amont","Sonde Lambda Aval","Sonde Wideband","Sonde NOx","Sonde Chauffée"]}]},{"l":"Roues & Pneumatiques","subs":[{"g":"Jantes","items":["Jantes Alliage","Jantes Acier","Jantes Chromées","Jantes Sport","Jantes Hiver","Roue Complète"]},{"g":"Pneumatiques","items":["Pneus Été","Pneus Hiver","Pneus 4 Saisons","Run-Flat","Pneus Sport","Pneus SUV","Pneus Tout-Terrain"]},{"g":"Capteurs TPMS","items":["Capteur TPMS","Valve TPMS","Calculateur TPMS","Outil Programmation TPMS"]},{"g":"Boulons & Écrous de Roue","items":["Boulons de Roue","Écrous de Roue","Goujons","Cache Moyeu","Valve","Élargisseur de Voie"]}]},{"l":"Huiles, Liquides & Chimie","subs":[{"g":"Huile Moteur","items":["5W-30","5W-40","10W-40","0W-20","0W-30","Huile Moteur Diesel","100% Synthétique","Semi-Synthétique","Longlife"]},{"g":"Huile Boîte de Vitesses","items":["Huile Boîte Mécanique","Huile Automatique (ATF)","Huile DSG / DCT","Huile de Pont","Huile Différentiel"]},{"g":"Liquide de Frein","items":["DOT 4","DOT 5.1","DOT 3","Liquide de Frein Long Life"]},{"g":"Liquide de Refroidissement","items":["Liquide G12","Liquide G13","Liquide OAT","Concentré Antigel","Liquide Prêt à l'Emploi"]},{"g":"Additifs & Produits","items":["Additif Huile","Additif Carburant","Nettoyant FAP","Désinfectant Clim","Nettoyant Freins","Lubrifiant Chaîne"]}]},{"l":"Accessoires & Pièces d'Usure","subs":[{"g":"Balais Essuie-Glace","items":["Balai Plat","Balai Traditionnel","Balai Arrière","Bras Essuie-Glace","Gicleur Lave-Glace"]},{"g":"Ampoules","items":["H4 Halogène","H7 Halogène","Kit LED Rétrofit","Xénon D1S","Xénon D2S","Ampoule Habitacle","W5W Veilleuse"]},{"g":"Fusibles","items":["Fusibles Plats","Fusibles Cartouche","Boîtier Fusibles","Relais","Boîtier Relais"]},{"g":"Courroies & Galets","items":["Courroie Trapézoïdale","Courroie Poly-V","Kit Poly-V","Galet Tendeur","Galet Enrouleur","Roue Libre Alternateur"]}]}], vc_cta: "Pièces Auto", vc_cta_sub: "Toutes marques & modèles →",
      vc: [
        {l:"Pièces Camion",    s:"Véhicules utilitaires",     q:"camion"},
        {l:"Pièces Moto",      s:"Tous modèles",              q:"moto"},
        {l:"Pneus",            s:"Été · Hiver · 4 saisons",   q:"pneu"},
        {l:"Jantes",           s:"Acier · Alliage · Chrome",  q:"jante"},
        {l:"Outils",           s:"Pro & Amateur",             q:"outil"},
        {l:"Accessoires",      s:"Intérieur & Extérieur",     q:"accessoire"},
        {l:"Huile Moteur",     s:"Toutes viscosités",         q:"huile"},
        {l:"Filtres",          s:"Huile · Air · Carburant",   q:"filtre"},
        {l:"Freins",           s:"Plaquettes · Disques",      q:"frein"}
      ],
      sell_sub: "Listez gratuitement · Atteignez l'Afrique", learn_more: "En savoir plus", china_title: "Vente en Gros", china_sub: "Prix usine",
      why_title: "Pourquoi ?",
      features: [
        ["OEM", "Par OEM, marque, modele"],
        ["Mobile Money", "MTN, Airtel, M-Pesa"],
        ["Logistique", "Bus, moto, DHL"],
        ["Chine", "Fournisseurs verifies"],
        ["Verifies", "Boutiques examinees"],
        ["10 langues", "EN - FR - PT - DE - ES - AR - TR - SW - LN"]
      ] },
    product: { add_cart: "Ajouter", buy_now: "Acheter", condition: "Etat",
      new: "Neuf", used: "Occasion", refurbished: "Reconditionne",
      brand: "Marque", model: "Modele", year: "Annee", oem: "OEM",
      location: "Lieu", moq: "Qte min.", stock: "en stock",
      out_stock: "Rupture", seller: "Vendeur", description: "Description",
      view_shop: "Voir boutique", added: "Ajoute!" },
    cart: { title: "Panier", empty: "Vide.", subtotal: "Sous-total",
      checkout: "Payer", continue: "Continuer", clear: "Vider", items: "articles" },
    checkout: { title: "Paiement", items: "Articles", shipping: "Livraison",
      payment: "Paiement", address: "Adresse", place_order: "Commander",
      seller_no_payout: "Un article de votre panier n\u2019est pas disponible actuellement \u2014 le vendeur n\u2019a pas encore configur\u00e9 ses versements. Retirez-le ou r\u00e9essayez plus tard.",
      mobile_money: "Mobile Money", bank: "Virement", cod: "A la livraison",
      name: "Nom", city: "Ville", country: "Pays", addr: "Adresse",
      phone: "Telephone", select_ship: "Remplissez tous les champs.",
      success: "Commande passee!" },
    orders: { title: "Commandes", number: "Commande #", date: "Date",
      total: "Total", status: "Statut", no_orders: "Aucune.",
      details: "Details", payment: "Paiement", shipping: "Livraison" },
    auth: { email: "E-mail", password: "Mot de passe", confirm: "Confirmer",
      name: "Nom", phone: "Telephone", country: "Pays", role: "Je veux",
      buyer: "Acheter", seller: "Vendre", login_btn: "Connexion",
      register_btn: "Compte", forgot: "Oublie?", no_account: "Nouveau?",
      have_account: "Compte?", china_seller: "Grossiste",
      mismatch: "Ne correspondent pas.", fill_all: "Remplissez tout." },
    seller: { products: "Produits", shop: "Boutique", csv_import: "CSV",
      add_product: "Ajouter", deactivate: "Desactiver", activate: "Activer",
      pending: "En attente", live: "Actif", shop_saved: "Enregistre!",
      submitted: "Soumis!" },
    admin: { overview: "Apercu", users: "Utilisateurs", shops: "Boutiques",
      products: "Produits", orders_all: "Commandes", categories: "Categories",
      approve: "Approuver", remove: "Retirer", delete: "Supprimer",
      enable: "Activer", disable: "Desactiver", add_cat: "Ajouter",
      cat_name: "Nom", cat_slug: "slug-ici", cat_icon: "Icon" },
    filter: { all: "Tous", condition: "Etat", brand: "Marque",
      origin: "Origine", china_only: "Grossiste", search: "Chercher",
      reset: "Reinitialiser", load_more: "Plus", showing: "Affiche",
      of: "sur", parts: "pieces" },
    shop: { african: "Africains", china: "Grossiste", no_shops: "Aucune.",
      products_from: "Produits de", whatsapp: "WhatsApp", wechat: "WeChat",
      alibaba: "Alibaba", pending: "En attente.", create: "Creer", save: "Enregistrer" },
    footer: { tagline: "Marche B2B/B2C de pieces auto.", marketplace: "Marche",
      browse: "Parcourir", sell: "Vendre", china_w: "Grossiste",
      support: "Aide", help: "Centre", shipping_info: "Livraison",
      returns: "Retours", contact: "Contact", payments: "Paiements",
      rights: "Tous droits reserves.",
      countries: "Ghana - Nigeria - Kenya - RDC - Senegal" },
    errors: { not_found: "Introuvable.", no_parts: "Aucune piece.", generic: "Erreur." },
    csv: { title: "CSV", info: "Telecharger.", cols: "Colonnes",
      download: "Modele", drop: "Cliquer", drop_sub: "Max 5Mo",
      processing: "Traitement...", success: "Termine!" },
    admin_hub: {
      welcome: "Bon retour, ",
      subtitle: "Choisissez un module. Les cartes \"Bientot\" seront activees progressivement.",
      active: "ACTIF", soon: "BIENTOT",
      mod_banner_t: "Gestion des bannieres",
      mod_banner_d: "Creer, activer, modifier et supprimer les bannieres",
      mod_products_t: "Produits & Categories",
      mod_products_d: "Apercu, validations, categories, import en masse (CSV)",
      mod_orders_t: "Commandes",
      mod_orders_d: "Apercu, suivi statut, retours, paiements",
      mod_shops_t: "Gestion des vendeurs",
      mod_shops_d: "Profils, verification, performance, versements",
      mod_users_t: "Gestion des utilisateurs",
      mod_users_d: "Profils acheteurs, roles & autorisations, blacklist",
      mod_mod_t: "Moderation & Securite",
      mod_mod_d: "Moderation du contenu, anti-fraude, tickets, journaux d'audit",
      mod_analytics_t: "Analytics & Insights",
      mod_analytics_d: "Chiffre d'affaires, trafic, produits phares, statistiques de recherche",
      mod_system_t: "Systeme & Configuration",
      mod_system_d: "Pages CMS, modeles d'email, cles API, sauvegarde"
    },
    seller_hub: {
      welcome: "Bon retour, ",
      subtitle: "Gerez votre boutique. Les cartes \"Bientot\" seront activees progressivement.",
      active: "ACTIF", soon: "BIENTOT",
      prod_count_word: "Produits",
      mod_products_t: "Gestion des produits",
      mod_products_d: "Liste, nouveaux articles, compatibilite, prix, stock",
      mod_csv_t: "Import en masse (CSV)",
      mod_csv_d: "Importer de grandes quantites via CSV/Excel",
      mod_orders_t: "Commandes & Expedition",
      mod_orders_d: "Apercu, etiquettes, suivi, retours, litiges",
      mod_finance_t: "Finances & Versements",
      mod_finance_d: "CA, statut des versements, frais, factures & recus",
      mod_kpi_t: "Performance & KPI",
      mod_kpi_d: "Notes, temps d'expedition, taux d'annulation/retour, top produits",
      mod_comm_t: "Communication & Support",
      mod_comm_d: "Centre de messages, reponses auto, systeme de tickets",
      mod_profile_t: "Profil & Parametres",
      mod_profile_d: "Donnees entreprise, verification, integrations API, notifications"
    },
    seller_prod: {
      back: "< Retour", empty_t: "Aucun produit",
      empty_s: "Creez votre premier produit avec le formulaire ci-dessus.",
      col_image: "Image", col_title: "Titre", col_brand: "Marque",
      col_price: "Prix", col_stock: "Stock", col_actions: "Actions",
      btn_edit: "Modifier", btn_delete: "Supprimer",
      summary_new: "+ Creer un nouveau produit", summary_edit: "Modifier le produit",
      f_title: "Titre *", f_desc: "Description",
      f_price: "Prix (USD) *", f_stock: "Stock",
      f_brand: "Marque", f_model: "Modele",
      f_oem: "Numero OEM", f_condition: "Etat",
      f_cat: "Categorie", f_tags: "Mots-cles", f_images: "Images",
      f_active: "Produit actif (visible sur le marche)",
      no_cat: "— Aucune categorie —",
      cond_new: "Neuf", cond_used: "Occasion", cond_ref: "Reconditionne",
      ph_title: "ex. Plaquettes de frein avant Bosch",
      ph_desc: "Details, etat, particularites...",
      ph_brand: "ex. Bosch", ph_model: "ex. F10",
      ph_oem: "ex. 34116794917", ph_tags: "plaquettes, avant, ceramique",
      tags_hint: "separes par virgule, max 50 caracteres par tag",
      images_hint: "max 5, JPG/PNG/WebP, max 2 Mo par image",
      images_info: "Stocke sur Cloudflare R2 sous products/.",
      no_images: "Aucune image telechargee.",
      btn_upload: "Telecharger images",
      btn_create: "Creer", btn_update: "Mettre a jour", btn_cancel: "Annuler",
      status_loading: "Chargement...", status_uploading: "Telechargement...",
      status_saving: "Sauvegarde...", status_uploaded: "Telecharge",
      t_created: "Cree", t_updated: "Mis a jour", t_deleted: "Supprime",
      err_title_req: "Titre obligatoire",
      err_price_invalid: "Prix invalide",
      err_load: "Erreur de chargement", err_save: "Erreur de sauvegarde", err_delete: "Erreur de suppression",
      err_max_5: "Maximum 5 images",
      err_only_n: "Seulement {n} image(s) supplementaire(s)",
      err_only_jpg: "JPG, PNG ou WebP uniquement: {name}",
      err_too_large: "Trop grand (max 2 Mo): {name}",
      err_upload_fail: "Echec du telechargement (HTTP {n})",
      err_upload: "Erreur de telechargement",
      confirm_delete: "Supprimer ce produit? Cette action est irreversible."
    }
  },

  pt: {
    nav: { parts: "Pecas", shops: "Lojas", china: "Atacado",
      login: "Entrar", register: "Registar", logout: "Sair",
      dashboard: "Painel", admin: "Admin", orders: "Pedidos",
      cart: "Carrinho", language: "Idioma", currency: "Moeda" },
    home: { hero_badge: "Mercado 1 de pecas auto", hero_title: "Qualquer peca -",
      popular_brands: "Marcas populares",
      hero_title_em: "Rapido", hero_sub: "Pecas novas, usadas, atacado",
      search_ph: "Nome, OEM...", search_btn: "Pesquisar",
      search_headline: "Milhões de peças. Uma pesquisa simples.",
      pkw_btn: "Peças Auto", pkw_title: "Peças de Reposição", pkw_subtitle: "Escolha uma categoria",
      pkw_close: "Fechar", pkw_back: "Voltar", pkw_choose: "Escolher categoria", pkw_search_in: "Pesquisar na categoria",
      banner_pl_hero: "Hero (fundo no topo)", banner_pl_partner: "Slot parceiro (meio)",
      banner_pl_side_left: "Banner lateral esquerdo", banner_pl_side_right: "Banner lateral direito",
      banner_placement: "Posicionamento", banner_placement_help: "Onde o banner aparece",
      seo_admin_title: "Textos SEO", seo_admin_sub: "Blocos de texto multilíngues",
      seo_add: "+ Novo texto SEO", seo_slug: "Slug (ID interno)", seo_position: "Posição",
      seo_sort: "Ordenação", seo_active: "Ativo", seo_translations: "Traduções",
      seo_title_field: "Título", seo_body_field: "Conteúdo (HTML permitido)",
      seo_pl_home_top: "Página inicial topo", seo_pl_home_bottom: "Página inicial rodapé",
      seo_pl_partner: "Seção parceiro", seo_pl_custom: "Personalizado",
      seo_save: "Salvar", seo_cancel: "Cancelar", seo_delete: "Excluir",
      seo_confirm_delete: "Excluir este texto SEO?", nav_seo: "Textos SEO",
      stats_parts: "Pecas", stats_sellers: "Vendedores",
      stats_countries: "Paises", stats_langs: "Idiomas",
      featured: "Destaque", featured_sub: "Mais populares",
      view_all: "Ver tudo", categories: "Categorias",
      search_all_cats: "Todas categorias", vc_cat_btn: "Todas categorias", vc_tree: [{"l":"Motor & Transmissão","subs":[{"g":"Bloco Motor & Componentes","items":["Bloco Motor","Cabeça de Cilindros","Tampa de Válvulas","Carter de Óleo","Pistões","Anéis de Pistão","Árbol de Cames","Cambota"]},{"g":"Distribuição","items":["Correia de Distribuição","Corrente de Distribuição","Tensor de Corrente","Rolo Guia","Kit Correia Distrib.","Kit Corrente Distrib."]},{"g":"Sistema de Combustível","items":["Injetores","Bomba de Combustível","Bomba de Alta Pressão","Filtro de Combustível","Rail de Combustível","Regulador de Pressão","Sensor de Pressão"]},{"g":"Admissão de Ar","items":["Filtro de Ar","Coletor de Admissão","Intercooler","Turbocompressor","Corpo de Borboleta","Medidor de Caudal","Tubo de Admissão"]},{"g":"Sistema de Arrefecimento","items":["Radiador","Termostato","Bomba de Água","Reservatório de Expansão","Manga de Arrefecimento","Ventilador","Embraiagem Viscosa","Sonda de Temperatura"]},{"g":"Sistema de Lubrificação","items":["Filtro de Óleo","Bomba de Óleo","Sensor de Pressão de Óleo","Respirador","Permutador de Calor Óleo","Vareta de Óleo"]},{"g":"Embraiagem & Caixa","items":["Kit de Embraiagem","Volante Bi-Massa","Rolamento de Caixa","Semieixo","Junta Homocinética","Rolamento de Pressão","Varão de Mudanças","Retentor de Caixa"]}]},{"l":"Sistema de Travagem","subs":[{"g":"Pastilhas de Travão","items":["Pastilhas Dianteiras","Pastilhas Traseiras","Pastilhas Desportivas","Jogo Pastilhas com Sensor"]},{"g":"Discos de Travão","items":["Discos Ventilados","Discos Maciços","Discos Perfurados","Discos Desportivos","Jogo Discos Travão"]},{"g":"Pinças & Cilindros","items":["Pinça Dianteira","Pinça Traseira","Maxilas de Travão","Cilindro de Roda","Kit Reparação Pinça"]},{"g":"Sensores ABS / ESP","items":["Sensor ABS","Sensor de Velocidade da Roda","Módulo ABS","Bomba ABS","Sensor ESP"]},{"g":"Tubagens de Travão","items":["Flexíveis de Travão","Tubagens de Travão","Bloco Distribuidor","Jogo Tubagens","Reservatório de Líquido"]},{"g":"Travão de Mão","items":["Cabo de Travão de Mão","Alavanca de Travão de Mão","Motor EPB","Maxilas Traseiras","Tambor de Travão"]}]},{"l":"Suspensão & Direção","subs":[{"g":"Amortecedores & Molas","items":["Amortecedores Dianteiros","Amortecedores Traseiros","Molas Helicoidais","Coxim Superior","Batente","Coifa","Kit Desportivo","Suspensão Pneumática"]},{"g":"Direção","items":["Rótula de Direção","Rótula Axial","Barra de Direção","Caixa de Direção","Bomba de Direção Assistida","Coifa de Direção","Coluna de Direção","Sensor de Ângulo"]},{"g":"Peças de Eixo","items":["Braço de Suspensão","Rótula de Suspensão","Silentblock da Barra","Barra Estabilizadora","Bieleta","Manga de Eixo","Berceau","Silentblock"]},{"g":"Rolamentos de Roda","items":["Rolamento Dianteiro","Rolamento Traseiro","Cubo de Roda","Kit de Rolamento","Porca de Cubo"]}]},{"l":"Elétrica & Sensores","subs":[{"g":"Bateria & Carregamento","items":["Bateria Automóvel","Alternador","Motor de Arranque","Regulador de Tensão","Cabo de Carga","Terminal de Bateria","Sensor de Bateria"]},{"g":"Iluminação","items":["Farol","Farolim Traseiro","Pisca","Nevoeiro","Luzes de Circulação Diurna","Módulo LED","Lâmpadas","Lavador de Farol"]},{"g":"Sensores","items":["Medidor de Caudal","Sensor MAP","Sonda Lambda","Sensor de Cambota","Sensor Árbol de Cames","Sonda NOx","Sensor Temp. Gases","Sensor de Detonação"]},{"g":"Centralinas","items":["Centralina do Motor","Módulo ABS","Módulo de Conforto","Módulo Airbag","Centralina de Caixa"]},{"g":"Interruptores & Comandos","items":["Comando Eléctrico","Comutador de Coluna","Chave de Ignição","Buzina","Comando de Espelhos","Módulo de Fecho Central"]}]},{"l":"Filtros","subs":[{"g":"Filtros de Ar","items":["Filtro Ar Gasolina","Filtro Ar Diesel","Filtro Ar Desportivo","Filtro Plano"]},{"g":"Filtros de Óleo","items":["Filtro Óleo Cartucho","Filtro Óleo Rosca","Caixa de Filtro Óleo","Jogo Filtro Óleo"]},{"g":"Filtros de Combustível","items":["Filtro Combustível Diesel","Filtro Combustível Gasolina","Filtro em Linha","Pré-Filtro"]},{"g":"Filtros de Habitáculo","items":["Filtro de Pólen","Filtro de Carvão Ativo","Filtro Combinado","Jogo Filtro Habitáculo"]}]},{"l":"Carroçaria & Exterior","subs":[{"g":"Para-Choques","items":["Para-Choques Dianteiro","Para-Choques Traseiro","Suporte Para-Choques","Protecção Inferior","Tampa Gancho Reboque"]},{"g":"Guarda-Lamas & Painéis","items":["Guarda-Lamas","Capô","Mala / Portão Traseiro","Painel de Porta","Soleira","Perfil de Tejadilho"]},{"g":"Espelhos","items":["Vidro de Espelho","Caixa de Espelho","Motor de Espelho","Elemento de Aquecimento","Tampa de Espelho"]},{"g":"Elevadores de Vidro","items":["Motor de Elevador","Mecanismo de Elevador","Vidro","Vedante de Vidro"]},{"g":"Fechos & Fechaduras","items":["Fechadura de Porta","Fecho Central","Actuador de Fechadura","Cilindro de Fecho","Cabo de Capô","Tampa de Combustível"]}]},{"l":"Interior & Conforto","subs":[{"g":"Bancos & Mecanismos","items":["Calha de Banco","Apoio de Cabeça","Capa de Banco","Aquecimento de Banco","Ajuste de Banco","Trinco de Encosto"]},{"g":"Painel & Estofos","items":["Painel de Instrumentos","Consola Central","Porta-Luvas","Pala de Sol","Puxador Interior","Carpete"]},{"g":"Ar Condicionado","items":["Compressor AC","Condensador AC","Evaporador","Válvula de Expansão","Pressostato AC","Desidratador","Tubo AC"]},{"g":"Aquecimento","items":["Radiador de Aquecimento","Motor da Ventilação","Resistência de Ventilação","Torneira de Aquecimento","Manga de Aquecimento"]}]},{"l":"Sistema de Escape","subs":[{"g":"Coletor de Escape","items":["Coletor de Escape","Coletor Turbo","Junta de Coletor","Parafuso de Coletor"]},{"g":"Catalisador","items":["Catalisador de Oxidação","Catalisador de Três Vias","Catalisador Diesel","Pré-Catalisador"]},{"g":"Filtro de Partículas","items":["FAP Diesel","FAP Gasolina (OPF)","Sensor de Pressão FAP","Sensor de Temperatura FAP"]},{"g":"Silencioso & Tubagens","items":["Silencioso Traseiro","Silencioso Central","Tubo Central","Tubo Intermédio","Tubo Flexível","Suporte de Escape"]},{"g":"Sondas Lambda","items":["Sonda Lambda Pré-Cat","Sonda Lambda Pós-Cat","Sonda Wideband","Sonda NOx","Sonda Aquecida"]}]},{"l":"Rodas & Pneus","subs":[{"g":"Jantes","items":["Jantes em Liga Leve","Jantes de Aço","Jantes Cromadas","Jantes Desportivas","Jantes de Inverno","Roda Completa"]},{"g":"Pneus","items":["Pneus de Verão","Pneus de Inverno","Pneus 4 Estações","Run-Flat","Pneus Desportivos","Pneus SUV","Pneus Todo-o-Terreno"]},{"g":"Sensores TPMS","items":["Sensor TPMS","Válvula TPMS","Módulo TPMS","Ferramenta de Programação TPMS"]},{"g":"Parafusos & Porcas de Roda","items":["Parafusos de Roda","Porcas de Roda","Prisioneiros","Tampa de Cubo","Válvula de Pneu","Espaçador de Roda"]}]},{"l":"Óleos, Fluidos & Química","subs":[{"g":"Óleo de Motor","items":["5W-30","5W-40","10W-40","0W-20","0W-30","Óleo Diesel","Sintético Puro","Semi-Sintético","Longlife"]},{"g":"Óleo de Caixa","items":["Óleo Caixa Manual","Fluido ATF Automático","Óleo DSG / DCT","Óleo de Eixo","Óleo Diferencial"]},{"g":"Líquido de Travões","items":["DOT 4","DOT 5.1","DOT 3","Líquido de Travões Long Life"]},{"g":"Líquido de Arrefecimento","items":["Líquido G12","Líquido G13","Líquido OAT","Concentrado Anticongelante","Líquido Pronto a Usar"]},{"g":"Aditivos & Químicos","items":["Aditivo de Óleo","Aditivo de Combustível","Limpador FAP","Desinfetante AC","Limpador de Travões","Lubrificante de Corrente"]}]},{"l":"Acessórios & Peças de Desgaste","subs":[{"g":"Palhetas de Limpa-Vidros","items":["Palheta Plana","Palheta Convencional","Palheta Traseira","Braço Limpa-Vidros","Esguicho"]},{"g":"Lâmpadas","items":["H4 Halogéneo","H7 Halogéneo","Kit LED Retrofit","Xenon D1S","Xenon D2S","Lâmpada Interior","W5W Posição"]},{"g":"Fusíveis","items":["Fusíveis de Faca","Fusíveis em Cartucho","Caixa de Fusíveis","Relé","Caixa de Relés"]},{"g":"Correias & Polias","items":["Correia em V","Correia Poly-V","Kit Poly-V","Polia Tensora","Rolo Guia","Roda Livre do Alternador"]}]}], vc_cta: "Peças Auto", vc_cta_sub: "Todas as marcas & modelos →",
      vc: [
        {l:"Peças Caminhão",   s:"Veículos comerciais",       q:"caminhao"},
        {l:"Peças Moto",       s:"Todos os modelos",          q:"moto"},
        {l:"Pneus",            s:"Verão · Inverno · 4 estações",q:"pneu"},
        {l:"Jantes",           s:"Aço · Liga · Cromo",        q:"jante"},
        {l:"Ferramentas",      s:"Pro & Amador",              q:"ferramenta"},
        {l:"Acessórios",       s:"Interior & Exterior",       q:"acessorio"},
        {l:"Óleo Motor",       s:"Todas viscosidades",        q:"oleo"},
        {l:"Filtros",          s:"Óleo · Ar · Combustível",   q:"filtro"},
        {l:"Travões",          s:"Pastilhas · Discos",        q:"travao"}
      ],
      sell_sub: "Liste peças grátis · Alcance África", learn_more: "Saiba mais", china_title: "Atacado", china_sub: "Precos de fabrica",
      why_title: "Porque?",
      features: [["OEM","OEM, marca"],["Mobile Money","MTN"],
        ["Logistica","DHL"],["China","Direto"],["Verificados","Revistos"],
        ["10 Idiomas","EN - FR - PT - DE - ES - AR - TR - SW - LN"]] },
    product: { add_cart: "Adicionar", buy_now: "Comprar", condition: "Estado",
      new: "Novo", used: "Usado", refurbished: "Recondicionado",
      brand: "Marca", model: "Modelo", year: "Ano", oem: "OEM",
      location: "Local", moq: "Qtd min.", stock: "em stock",
      out_stock: "Sem stock", seller: "Vendedor", description: "Descricao",
      view_shop: "Ver loja", added: "Adicionado!" },
    cart: { title: "Carrinho", empty: "Vazio.", subtotal: "Subtotal",
      checkout: "Finalizar", continue: "Continuar", clear: "Limpar", items: "artigos" },
    checkout: { title: "Finalizar", items: "Artigos", shipping: "Envio",
      payment: "Pagamento", address: "Endereco", place_order: "Fazer pedido",
      seller_no_payout: "Um item no seu carrinho n\u00e3o est\u00e1 dispon\u00edvel no momento \u2014 o vendedor ainda n\u00e3o configurou os pagamentos. Remova-o ou tente mais tarde.",
      mobile_money: "Mobile Money", bank: "Banco", cod: "Na entrega",
      name: "Nome", city: "Cidade", country: "Pais", addr: "Endereco",
      phone: "Telefone", select_ship: "Preencha tudo.", success: "Pedido realizado!" },
    orders: { title: "Pedidos", number: "Pedido #", date: "Data",
      total: "Total", status: "Estado", no_orders: "Sem pedidos.",
      details: "Detalhes", payment: "Pagamento", shipping: "Envio" },
    auth: { email: "Email", password: "Palavra-passe", confirm: "Confirmar",
      name: "Nome", phone: "Telefone", country: "Pais", role: "Quero",
      buyer: "Comprar", seller: "Vender", login_btn: "Entrar",
      register_btn: "Criar", forgot: "Esqueci?", no_account: "Novo?",
      have_account: "Conta?", china_seller: "Atacadista",
      mismatch: "Nao correspondem.", fill_all: "Preencha." },
    seller: { products: "Produtos", shop: "Loja", csv_import: "CSV",
      add_product: "Adicionar", deactivate: "Desativar", activate: "Ativar",
      pending: "Pendente", live: "Ativo", shop_saved: "Guardado!", submitted: "Submetido!" },
    admin: { overview: "Visao", users: "Utilizadores", shops: "Lojas",
      products: "Produtos", orders_all: "Pedidos", categories: "Categorias",
      approve: "Aprovar", remove: "Remover", delete: "Eliminar",
      enable: "Ativar", disable: "Desativar", add_cat: "Adicionar",
      cat_name: "Nome", cat_slug: "slug", cat_icon: "Icon" },
    filter: { all: "Todos", condition: "Estado", brand: "Marca",
      origin: "Origem", china_only: "So Atacado", search: "Pesquisar",
      reset: "Limpar", load_more: "Mais", showing: "Mostrando",
      of: "de", parts: "pecas" },
    shop: { african: "Africanos", china: "Atacadistaes", no_shops: "Nenhuma.",
      products_from: "Produtos de", whatsapp: "WhatsApp", wechat: "WeChat",
      alibaba: "Alibaba", pending: "Aguarda.", create: "Criar", save: "Guardar" },
    footer: { tagline: "Mercado B2B/B2C.", marketplace: "Mercado",
      browse: "Explorar", sell: "Vender", china_w: "Atacado",
      support: "Suporte", help: "Ajuda", shipping_info: "Envio",
      returns: "Devolucoes", contact: "Contacto", payments: "Pagamentos",
      rights: "Todos os direitos.",
      countries: "Gana - Nigeria - Quenia - RDC - Senegal" },
    errors: { not_found: "Nao encontrada.", no_parts: "Sem pecas.", generic: "Erro." },
    csv: { title: "CSV", info: "Carregue CSV.", cols: "Colunas",
      download: "Modelo", drop: "Clique", drop_sub: "Max 5MB",
      processing: "Processando...", success: "Concluido!" },
    seller_hub: {
      welcome: "Bem-vindo de volta, ",
      subtitle: "Faca a gestao da sua loja. Cartoes \"Em breve\" serao ativados gradualmente.",
      active: "ATIVO", soon: "EM BREVE",
      prod_count_word: "Produtos",
      mod_products_t: "Gestao de produtos",
      mod_products_d: "Lista de produtos, novos artigos, compatibilidade, precos, stock",
      mod_csv_t: "Upload em massa (CSV)",
      mod_csv_d: "Importar grandes quantidades via CSV/Excel",
      mod_orders_t: "Pedidos & Envio",
      mod_orders_d: "Vista geral, etiquetas, rastreio, devolucoes, disputas",
      mod_finance_t: "Financas & Pagamentos",
      mod_finance_d: "Receita, estado dos pagamentos, taxas, faturas",
      mod_kpi_t: "Desempenho & KPIs",
      mod_kpi_d: "Avaliacoes, tempo de envio, taxa de cancelamento/devolucao, top produtos",
      mod_comm_t: "Comunicacao & Suporte",
      mod_comm_d: "Centro de mensagens, respostas automaticas, tickets",
      mod_profile_t: "Perfil & Configuracoes",
      mod_profile_d: "Dados da empresa, verificacao, integracoes API, notificacoes"
    },
    seller_prod: {
      back: "< Voltar", empty_t: "Ainda sem produtos",
      empty_s: "Crie o seu primeiro produto com o formulario acima.",
      col_image: "Imagem", col_title: "Titulo", col_brand: "Marca",
      col_price: "Preco", col_stock: "Stock", col_actions: "Acoes",
      btn_edit: "Editar", btn_delete: "Apagar",
      summary_new: "+ Criar novo produto", summary_edit: "Editar produto",
      f_title: "Titulo *", f_desc: "Descricao",
      f_price: "Preco (USD) *", f_stock: "Stock",
      f_brand: "Marca", f_model: "Modelo",
      f_oem: "Numero OEM", f_condition: "Condicao",
      f_cat: "Categoria", f_tags: "Tags", f_images: "Imagens",
      f_active: "Produto ativo (visivel no marketplace)",
      no_cat: "— Sem categoria —",
      cond_new: "Novo", cond_used: "Usado", cond_ref: "Recondicionado",
      ph_title: "ex. Pastilhas de travao dianteiras Bosch",
      ph_desc: "Detalhes, condicao, caracteristicas...",
      ph_brand: "ex. Bosch", ph_model: "ex. F10",
      ph_oem: "ex. 34116794917", ph_tags: "pastilhas, frente, ceramica",
      tags_hint: "separados por virgula, max 50 caracteres por tag",
      images_hint: "max 5, JPG/PNG/WebP, max 2 MB por imagem",
      images_info: "Armazenado no Cloudflare R2 em products/.",
      no_images: "Ainda sem imagens carregadas.",
      btn_upload: "Carregar imagens",
      btn_create: "Criar", btn_update: "Atualizar", btn_cancel: "Cancelar",
      status_loading: "A carregar...", status_uploading: "A enviar...",
      status_saving: "A guardar...", status_uploaded: "Enviado",
      t_created: "Criado", t_updated: "Atualizado", t_deleted: "Apagado",
      err_title_req: "Titulo obrigatorio",
      err_price_invalid: "Preco invalido",
      err_load: "Erro ao carregar", err_save: "Erro ao guardar", err_delete: "Erro ao apagar",
      err_max_5: "Maximo 5 imagens",
      err_only_n: "Apenas mais {n} imagem(s) possivel",
      err_only_jpg: "Apenas JPG, PNG ou WebP: {name}",
      err_too_large: "Demasiado grande (max 2 MB): {name}",
      err_upload_fail: "Falha no upload (HTTP {n})",
      err_upload: "Erro de upload",
      confirm_delete: "Apagar mesmo este produto? Esta acao nao pode ser desfeita."
    }
  },

  es: {
    nav: { parts: "Piezas", shops: "Tiendas", china: "Mayorista",
      login: "Iniciar", register: "Registro", logout: "Cerrar",
      dashboard: "Panel", admin: "Admin", orders: "Pedidos",
      cart: "Carrito", language: "Idioma", currency: "Moneda" },
    home: { hero_badge: "Mercado 1 de repuestos", hero_title: "Cualquier pieza -",
      hero_title_em: "Rapido", hero_sub: "Repuestos nuevos y usados",
      search_ph: "Nombre, OEM...", search_btn: "Buscar",
      pkw_btn: "Piezas Coche", pkw_title: "Piezas de Recambio", pkw_subtitle: "Elige una categoría",
      pkw_close: "Cerrar", pkw_back: "Atrás", pkw_choose: "Elegir categoría", pkw_search_in: "Buscar en categoría",
      banner_pl_hero: "Hero (fondo arriba)", banner_pl_partner: "Slot socio (centro)",
      banner_pl_side_left: "Banner lateral izquierdo", banner_pl_side_right: "Banner lateral derecho",
      banner_placement: "Ubicación", banner_placement_help: "Dónde aparece el banner",
      seo_admin_title: "Textos SEO", seo_admin_sub: "Bloques de texto multilingües",
      seo_add: "+ Nuevo texto SEO", seo_slug: "Slug (ID interno)", seo_position: "Posición",
      seo_sort: "Orden", seo_active: "Activo", seo_translations: "Traducciones",
      seo_title_field: "Título", seo_body_field: "Contenido (HTML permitido)",
      seo_pl_home_top: "Inicio Arriba", seo_pl_home_bottom: "Inicio Abajo",
      seo_pl_partner: "Sección socio", seo_pl_custom: "Personalizado",
      seo_save: "Guardar", seo_cancel: "Cancelar", seo_delete: "Eliminar",
      seo_confirm_delete: "¿Eliminar este texto SEO?", nav_seo: "Textos SEO",
      stats_parts: "Piezas", stats_sellers: "Vendedores",
      stats_countries: "Paises", stats_langs: "Idiomas",
      featured: "Destacadas", featured_sub:"Más populares",
      view_all: "Ver todo", categories: "Categorias",
      search_all_cats: "Todas categorías", vc_cat_btn: "Todas categorías", vc_tree: [{"l":"Motor & Transmisión","subs":[{"g":"Bloque Motor & Componentes","items":["Bloque Motor","Culata","Tapa de Balancines","Cárter de Aceite","Pistones","Segmentos","Árbol de Levas","Cigüeñal"]},{"g":"Distribución","items":["Correa de Distribución","Cadena de Distribución","Tensor de Cadena","Polea Guía","Kit Correa Distrib.","Kit Cadena Distrib."]},{"g":"Sistema de Combustible","items":["Inyectores","Bomba de Combustible","Bomba Alta Presión","Filtro Combustible","Rail de Inyectores","Regulador de Presión","Sensor Presión Combustible"]},{"g":"Admisión de Aire","items":["Filtro de Aire","Colector de Admisión","Intercooler","Turbocompresor","Cuerpo de Mariposa","Caudalímetro","Manguito de Admisión"]},{"g":"Sistema de Refrigeración","items":["Radiador","Termostato","Bomba de Agua","Depósito de Expansión","Manguito Refrigeración","Ventilador","Viscoreductor","Sonda Temperatura Agua"]},{"g":"Sistema de Lubricación","items":["Filtro de Aceite","Bomba de Aceite","Sensor Presión Aceite","Tapa Válvulas Ventilación","Enfriador Aceite","Varilla del Aceite"]},{"g":"Embrague & Caja de Cambios","items":["Kit Embrague","Volante Bimasa","Rodamiento Caja Cambios","Semieje","Junta Homocinética","Cojinete de Empuje","Varillaje Cambio","Retén Caja Cambios"]}]},{"l":"Sistema de Frenos","subs":[{"g":"Pastillas de Freno","items":["Pastillas Delanteras","Pastillas Traseras","Pastillas Deportivas","Juego Pastillas con Sensor"]},{"g":"Discos de Freno","items":["Discos Ventilados","Discos Macizos","Discos Perforados","Discos Deportivos","Juego Discos de Freno"]},{"g":"Pinzas & Cilindros","items":["Pinza Delantera","Pinza Trasera","Zapatas de Freno","Cilindro de Rueda","Kit Reparación Pinza"]},{"g":"Sensores ABS / ESP","items":["Sensor ABS","Sensor Velocidad Rueda","Módulo ABS","Bomba ABS","Sensor ESP"]},{"g":"Tuberías de Freno","items":["Latiguillos Freno","Tuberías Freno","Distribuidor","Juego Tuberías","Depósito Líquido Freno"]},{"g":"Freno de Mano","items":["Cable Freno de Mano","Palanca Freno de Mano","Motor EPB","Zapatas Traseras","Tambor de Freno"]}]},{"l":"Suspensión & Dirección","subs":[{"g":"Amortiguadores & Muelles","items":["Amortiguadores Delanteros","Amortiguadores Traseros","Muelles de Suspensión","Cojinete Superior","Tope","Fuelle","Kit Sport","Suspensión Neumática"]},{"g":"Dirección","items":["Rótula de Dirección","Rótula Axial","Barra de Dirección","Cremallera","Bomba Dirección Asistida","Fuelle Dirección","Columna de Dirección","Sensor Ángulo Dirección"]},{"g":"Piezas de Tren Delantero","items":["Brazo de Suspensión","Rótula de Suspensión","Silent-Block Estabilizador","Barra Estabilizadora","Tirante Estabilizador","Mangueta","Berceau","Silent-Block"]},{"g":"Rodamientos de Rueda","items":["Rodamiento Delantero","Rodamiento Trasero","Maza de Rueda","Kit de Rodamiento","Tuerca de Cubo"]}]},{"l":"Electricidad & Sensores","subs":[{"g":"Batería & Carga","items":["Batería de Coche","Alternador","Motor de Arranque","Regulador de Tensión","Cable de Carga","Terminal de Batería","Sensor de Batería"]},{"g":"Iluminación","items":["Faro","Piloto Trasero","Intermitente","Antiniebla","Luces de Circulación Diurna","Módulo LED","Bombillas","Limpiafaro"]},{"g":"Sensores","items":["Caudalímetro","Sensor MAP","Sonda Lambda","Sensor Cigüeñal","Sensor Árbol de Levas","Sonda NOx","Sensor Temp. Gases","Sensor de Detonación"]},{"g":"Centralitas","items":["Centralita Motor","Centralita ABS","Módulo de Confort","Módulo Airbag","Centralita Caja de Cambios"]},{"g":"Interruptores & Mandos","items":["Mando Elevalunas","Columna de Mandos","Llave de Contacto","Bocina","Mando Retrovisor","Módulo Cierre Centralizado"]}]},{"l":"Filtros","subs":[{"g":"Filtros de Aire","items":["Filtro Aire Gasolina","Filtro Aire Diésel","Filtro Aire Deportivo","Filtro Plano"]},{"g":"Filtros de Aceite","items":["Filtro Aceite Cartucho","Filtro Aceite Rosca","Carcasa Filtro Aceite","Juego Filtro Aceite"]},{"g":"Filtros de Combustible","items":["Filtro Combustible Diésel","Filtro Combustible Gasolina","Filtro en Línea","Prefiltro"]},{"g":"Filtros de Habitáculo","items":["Filtro de Polen","Filtro de Carbón Activo","Filtro Combinado","Juego Filtro Habitáculo"]}]},{"l":"Carrocería & Exterior","subs":[{"g":"Parachoques","items":["Parachoques Delantero","Parachoques Trasero","Soporte Parachoques","Protector Inferior","Tapa Gancho Remolque"]},{"g":"Aletas & Paneles","items":["Aleta","Capó","Portón Trasero","Panel de Puerta","Umbral","Moldura de Techo"]},{"g":"Espejos","items":["Luna Espejo","Carcasa Espejo","Motor Espejo","Elemento Calefactado","Carcasa Exterior"]},{"g":"Elevalunas","items":["Motor Elevalunas","Mecanismo Elevalunas","Luna","Junta de Luna"]},{"g":"Cierres & Cerraduras","items":["Cerradura de Puerta","Cierre Centralizado","Actuador Cerradura","Bombín Cerradura","Cable Capó","Tapa Combustible"]}]},{"l":"Interior & Confort","subs":[{"g":"Asientos & Mecanismos","items":["Guía de Asiento","Reposacabezas","Funda de Asiento","Calefacción Asiento","Ajuste Asiento","Cierre Respaldo"]},{"g":"Salpicadero & Guarnecidos","items":["Salpicadero","Consola Central","Guantera","Parasol","Manilla Interior","Moqueta"]},{"g":"Climatización","items":["Compresor Aire Acondicionado","Condensador AC","Evaporador","Válvula de Expansión","Presostato AC","Filtro Deshidratador","Tubería AC"]},{"g":"Calefacción","items":["Radiador de Calefacción","Motor del Ventilador","Resistencia Ventilador","Llave de Calefacción","Manguito Calefacción"]}]},{"l":"Sistema de Escape","subs":[{"g":"Colector de Escape","items":["Colector de Escape","Colector Turbo","Junta Colector","Espárrago Colector"]},{"g":"Catalizador","items":["Catalizador de Oxidación","Catalizador Tres Vías","Catalizador Diésel","Pre-Catalizador"]},{"g":"Filtro de Partículas","items":["FAP Diésel","FAP Gasolina (OPF)","Sensor Presión FAP","Sensor Temperatura FAP"]},{"g":"Silenciador & Tubos","items":["Silenciador Trasero","Silenciador Central","Tubo Central","Tubo Intermedio","Tubo Flexible","Soporte Escape"]},{"g":"Sondas Lambda","items":["Sonda Lambda Pre-Cat","Sonda Lambda Post-Cat","Sonda Wideband","Sonda NOx","Sonda Calefactada"]}]},{"l":"Ruedas & Neumáticos","subs":[{"g":"Llantas","items":["Llantas de Aleación","Llantas de Acero","Llantas Cromadas","Llantas Sport","Llantas de Invierno","Rueda Completa"]},{"g":"Neumáticos","items":["Neumáticos Verano","Neumáticos Invierno","Neumáticos 4 Estaciones","Run-Flat","Neumáticos Sport","Neumáticos SUV","Todo Terreno"]},{"g":"Sensores TPMS","items":["Sensor TPMS","Válvula TPMS","Módulo TPMS","Herramienta Programación TPMS"]},{"g":"Tornillos & Tuercas de Rueda","items":["Tornillos de Rueda","Tuercas de Rueda","Espárragos de Rueda","Tapacubos","Válvula de Rueda","Separador de Rueda"]}]},{"l":"Aceites, Líquidos & Química","subs":[{"g":"Aceite de Motor","items":["5W-30","5W-40","10W-40","0W-20","0W-30","Aceite Motor Diésel","Sintético Puro","Semisintético","Longlife"]},{"g":"Aceite de Caja de Cambios","items":["Aceite Caja Manual","Líquido ATF Automático","Aceite DSG / DCT","Aceite Diferencial","Aceite de Puente"]},{"g":"Líquido de Frenos","items":["DOT 4","DOT 5.1","DOT 3","Líquido Frenos Long Life"]},{"g":"Líquido Refrigerante","items":["Refrigerante G12","Refrigerante G13","Refrigerante OAT","Concentrado Anticongelante","Refrigerante Listo al Uso"]},{"g":"Aditivos & Productos","items":["Aditivo Aceite","Aditivo Combustible","Limpiador FAP","Desinfectante Aire Acondicionado","Limpiador Frenos","Lubricante Cadena"]}]},{"l":"Accesorios & Piezas de Desgaste","subs":[{"g":"Escobillas Limpiaparabrisas","items":["Escobilla Plana","Escobilla Convencional","Escobilla Trasera","Brazo Limpiaparabrisas","Tobera Lavaparabrisas"]},{"g":"Bombillas","items":["H4 Halógeno","H7 Halógeno","Kit LED Retrofit","Xenón D1S","Xenón D2S","Bombilla Interior","W5W Luz Posición"]},{"g":"Fusibles","items":["Fusibles Planos","Fusibles Cartucho","Caja de Fusibles","Relé","Caja de Relés"]},{"g":"Correas & Poleas","items":["Correa Trapecial","Correa Poly-V","Kit Poly-V","Polea Tensora","Polea Guía","Rueda Libre Alternador"]}]}], vc_cta: "Repuestos Auto", vc_cta_sub: "Todas marcas & modelos →",
      vc: [
        {l:"Repuestos Camión",  s:"Vehículos comerciales",    q:"camion"},
        {l:"Repuestos Moto",    s:"Todos los modelos",        q:"moto"},
        {l:"Neumáticos",        s:"Verano · Invierno · 4 estaciones",q:"neumatico"},
        {l:"Llantas",           s:"Acero · Aleación · Cromo", q:"llanta"},
        {l:"Herramientas",      s:"Pro & Aficionado",         q:"herramienta"},
        {l:"Accesorios",        s:"Interior & Exterior",      q:"accesorio"},
        {l:"Aceite Motor",      s:"Todas viscosidades",       q:"aceite"},
        {l:"Filtros",           s:"Aceite · Aire · Combustible",q:"filtro"},
        {l:"Frenos",            s:"Pastillas · Discos",       q:"freno"}
      ],
      sell_sub: "Lista piezas gratis · Llega a África", learn_more: "Saber más", china_title: "Mayorista", china_sub: "Precios fabrica",
      why_title: "Por que?",
      features: [["OEM","OEM"],["Mobile Money","MTN"],["Logistica","DHL"],
        ["China","Directo"],["Verificados","Revisados"],
        ["10 Idiomas","EN - FR - PT - DE - ES - AR - TR - SW - LN"]] },
    product: { add_cart: "Anadir", buy_now: "Comprar", condition: "Estado",
      new: "Nuevo", used: "Usado", refurbished: "Reacondicionado",
      brand: "Marca", model: "Modelo", year: "Ano", oem: "OEM",
      location: "Ubicacion", moq: "Cant. min.", stock: "en stock",
      out_stock: "Sin stock", seller: "Vendedor", description: "Descripcion",
      view_shop: "Ver tienda", added: "Anadido!" },
    cart: { title: "Carrito", empty: "Vacio.", subtotal: "Subtotal",
      checkout: "Pagar", continue: "Seguir", clear: "Vaciar", items: "articulos" },
    checkout: { title: "Pago", items: "Articulos", shipping: "Envio",
      payment: "Pago", address: "Direccion", place_order: "Pedir",
      mobile_money: "Mobile Money", bank: "Banco", cod: "Contra entrega",
      name: "Nombre", city: "Ciudad", country: "Pais", addr: "Direccion",
      phone: "Telefono", select_ship: "Completa todo.", success: "Realizado!" },
    orders: { title: "Pedidos", number: "Pedido #", date: "Fecha",
      total: "Total", status: "Estado", no_orders: "Sin pedidos.",
      details: "Detalles", payment: "Pago", shipping: "Envio" },
    auth: { email: "Correo", password: "Contrasena", confirm: "Confirmar",
      name: "Nombre", phone: "Telefono", country: "Pais", role: "Quiero",
      buyer: "Comprar", seller: "Vender", login_btn: "Entrar",
      register_btn: "Cuenta", forgot: "Olvidaste?", no_account: "Nuevo?",
      have_account: "Cuenta?", china_seller: "Mayorista",
      mismatch: "No coinciden.", fill_all: "Completa." },
    seller: { products: "Productos", shop: "Tienda", csv_import: "CSV",
      add_product: "Anadir", deactivate: "Desactivar", activate: "Activar",
      pending: "Pendiente", live: "Activo", shop_saved: "Guardado!", submitted: "Enviado!" },
    admin: { overview: "Resumen", users: "Usuarios", shops: "Tiendas",
      products: "Productos", orders_all: "Pedidos", categories: "Categorias",
      approve: "Aprobar", remove: "Eliminar", delete: "Borrar",
      enable: "Activar", disable: "Desactivar", add_cat: "Anadir",
      cat_name: "Nombre", cat_slug: "slug", cat_icon: "Icon" },
    filter: { all: "Todos", condition: "Estado", brand: "Marca",
      origin: "Origen", china_only: "Solo Mayorista", search: "Buscar",
      reset: "Limpiar", load_more: "Mas", showing: "Mostrando",
      of: "de", parts: "piezas" },
    shop: { african: "Africanos", china: "Chinos", no_shops: "Ninguna.",
      products_from: "Productos de", whatsapp: "WhatsApp", wechat: "WeChat",
      alibaba: "Alibaba", pending: "Pendiente.", create: "Crear", save: "Guardar" },
    footer: { tagline: "Mercado B2B/B2C.", marketplace: "Mercado",
      browse: "Explorar", sell: "Vender", china_w: "Mayorista",
      support: "Soporte", help: "Ayuda", shipping_info: "Envio",
      returns: "Devoluciones", contact: "Contacto", payments: "Pagos",
      rights: "Todos los derechos.",
      countries: "Ghana - Nigeria - Kenia - RDC - Senegal" },
    errors: { not_found: "No encontrada.", no_parts: "Sin piezas.", generic: "Error." },
    csv: { title: "CSV", info: "Sube CSV.", cols: "Columnas",
      download: "Plantilla", drop: "Clic", drop_sub: "Max 5MB",
      processing: "Procesando...", success: "Completo!" },
    seller_hub: {
      welcome: "Bienvenido de nuevo, ",
      subtitle: "Gestiona tu tienda. Las tarjetas \"Pronto\" se activaran paso a paso.",
      active: "ACTIVO", soon: "PRONTO",
      prod_count_word: "Productos",
      mod_products_t: "Gestion de productos",
      mod_products_d: "Lista, nuevos articulos, compatibilidad, precios, inventario",
      mod_csv_t: "Carga masiva (CSV)",
      mod_csv_d: "Importar grandes cantidades via CSV/Excel",
      mod_orders_t: "Pedidos & Envio",
      mod_orders_d: "Resumen, etiquetas, seguimiento, devoluciones, disputas",
      mod_finance_t: "Finanzas & Pagos",
      mod_finance_d: "Ingresos, estado de pagos, comisiones, facturas",
      mod_kpi_t: "Rendimiento & KPIs",
      mod_kpi_d: "Valoraciones, tiempo de envio, tasa de cancelacion/devolucion, top productos",
      mod_comm_t: "Comunicacion & Soporte",
      mod_comm_d: "Centro de mensajes, respuestas automaticas, tickets",
      mod_profile_t: "Perfil & Ajustes",
      mod_profile_d: "Datos de empresa, verificacion, integraciones API, notificaciones"
    },
    seller_prod: {
      back: "< Volver", empty_t: "Aun sin productos",
      empty_s: "Crea tu primer producto con el formulario de arriba.",
      col_image: "Imagen", col_title: "Titulo", col_brand: "Marca",
      col_price: "Precio", col_stock: "Stock", col_actions: "Acciones",
      btn_edit: "Editar", btn_delete: "Borrar",
      summary_new: "+ Crear nuevo producto", summary_edit: "Editar producto",
      f_title: "Titulo *", f_desc: "Descripcion",
      f_price: "Precio (USD) *", f_stock: "Stock",
      f_brand: "Marca", f_model: "Modelo",
      f_oem: "Numero OEM", f_condition: "Estado",
      f_cat: "Categoria", f_tags: "Etiquetas", f_images: "Imagenes",
      f_active: "Producto activo (visible en el marketplace)",
      no_cat: "— Sin categoria —",
      cond_new: "Nuevo", cond_used: "Usado", cond_ref: "Reacondicionado",
      ph_title: "ej. Pastillas de freno delanteras Bosch",
      ph_desc: "Detalles, estado, caracteristicas...",
      ph_brand: "ej. Bosch", ph_model: "ej. F10",
      ph_oem: "ej. 34116794917", ph_tags: "pastillas, delantero, ceramica",
      tags_hint: "separadas por comas, max 50 caracteres por etiqueta",
      images_hint: "max 5, JPG/PNG/WebP, max 2 MB por imagen",
      images_info: "Almacenado en Cloudflare R2 en products/.",
      no_images: "Aun sin imagenes subidas.",
      btn_upload: "Subir imagenes",
      btn_create: "Crear", btn_update: "Actualizar", btn_cancel: "Cancelar",
      status_loading: "Cargando...", status_uploading: "Subiendo...",
      status_saving: "Guardando...", status_uploaded: "Subido",
      t_created: "Creado", t_updated: "Actualizado", t_deleted: "Borrado",
      err_title_req: "Titulo obligatorio",
      err_price_invalid: "Precio invalido",
      err_load: "Error al cargar", err_save: "Error al guardar", err_delete: "Error al borrar",
      err_max_5: "Maximo 5 imagenes",
      err_only_n: "Solo {n} imagen(es) mas posible(s)",
      err_only_jpg: "Solo JPG, PNG o WebP: {name}",
      err_too_large: "Demasiado grande (max 2 MB): {name}",
      err_upload_fail: "Fallo en subida (HTTP {n})",
      err_upload: "Error de subida",
      confirm_delete: "Borrar este producto? Esta accion no se puede deshacer."
    }
  },

  ar: {
    nav: { parts: "Al-Qata", shops: "Al-Matajir", china: "Jumla",
      login: "Dukhool", register: "Tasjeel", logout: "Khorooj",
      dashboard: "Lawha", admin: "Idara", orders: "Talabat",
      cart: "Salla", language: "Lugha", currency: "Omala" },
    home: { hero_badge: "Al-Souq Al-Awwal", hero_title: "Ay Qata -",
      hero_title_em: "Bisur'a", hero_sub: "Qata jadida",
      search_ph: "Ism, OEM...", search_btn: "Bahth",
      pkw_btn: "قطع غيار السيارات", pkw_title: "قطع غيار السيارات", pkw_subtitle: "اختر فئة",
      pkw_close: "إغلاق", pkw_back: "رجوع", pkw_choose: "اختر فئة", pkw_search_in: "ابحث في الفئة",
      banner_pl_hero: "Hero (الخلفية في الأعلى)", banner_pl_partner: "فتحة الشريك (الوسط)",
      banner_pl_side_left: "البانر الجانبي الأيسر", banner_pl_side_right: "البانر الجانبي الأيمن",
      banner_placement: "الموضع", banner_placement_help: "أين يظهر البانر",
      seo_admin_title: "نصوص SEO", seo_admin_sub: "كتل نصوص متعددة اللغات",
      seo_add: "+ نص SEO جديد", seo_slug: "Slug", seo_position: "الموضع",
      seo_sort: "الترتيب", seo_active: "نشط", seo_translations: "الترجمات",
      seo_title_field: "العنوان", seo_body_field: "النص (HTML مسموح)",
      seo_pl_home_top: "أعلى الصفحة الرئيسية", seo_pl_home_bottom: "أسفل الصفحة الرئيسية",
      seo_pl_partner: "قسم الشريك", seo_pl_custom: "مخصص",
      seo_save: "حفظ", seo_cancel: "إلغاء", seo_delete: "حذف",
      seo_confirm_delete: "حذف نص SEO هذا؟", nav_seo: "نصوص SEO",
      stats_parts: "Qata", stats_sellers: "Baei",
      stats_countries: "Dawla", stats_langs: "Lugha",
      featured: "Mumayyaza", featured_sub: "Al-akthar mabian",
      view_all: "Al-Kull", categories: "Fiat",
      search_all_cats: "كل الفئات", vc_cat_btn: "Kull al-fiat", vc_tree: [{"l":"المحرك والناقل","subs":[{"g":"كتلة المحرك ومكوناتها","items":["كتلة المحرك","رأس الأسطوانة","غطاء الصمامات","وعاء الزيت","مكابس","حلقات المكبس","عمود الكامة","العمود المرفقي"]},{"g":"توقيت المحرك","items":["سير التوقيت","سلسلة التوقيت","شادّ السلسلة","بكرة التوجيه","طقم سير التوقيت","طقم سلسلة التوقيت"]},{"g":"نظام الوقود","items":["رشاشات الوقود","مضخة الوقود","مضخة الضغط العالي","فلتر الوقود","خط الوقود","منظم الضغط","مستشعر ضغط الوقود"]},{"g":"سحب الهواء","items":["فلتر الهواء","مشعب السحب","مبرد الشحن","الشاحن التوربيني","صمام الخانق","مقياس تدفق الهواء","خرطوم السحب"]},{"g":"نظام التبريد","items":["المبرد","الثرموستات","مضخة المياه","خزان التمدد","خرطوم التبريد","مروحة التبريد","مقرن اللزوجة","مستشعر درجة حرارة الماء"]},{"g":"نظام التزليق","items":["فلتر الزيت","مضخة الزيت","مستشعر ضغط الزيت","تنفيس كارتر","مبرد الزيت","مسطرة قياس الزيت"]},{"g":"القابض وصندوق التروس","items":["طقم القابض","دولاب الحدين","رافعة صندوق التروس","عمود الإدارة","وصلة هوموسيناتيك","رافعة الضغط","ذراع التروس","حلقة إحكام صندوق التروس"]}]},{"l":"نظام الفرامل","subs":[{"g":"أحذية الفرامل","items":["أحذية أمامية","أحذية خلفية","أحذية رياضية","طقم أحذية مع حساس تآكل"]},{"g":"أقراص الفرامل","items":["أقراص مهواة","أقراص صلبة","أقراص مثقوبة","أقراص رياضية","طقم أقراص فرامل"]},{"g":"ملازم وأسطوانات الفرامل","items":["ملزمة أمامية","ملزمة خلفية","أحذية فرامل خلفية","أسطوانة عجلة","طقم إصلاح الملزمة"]},{"g":"حساسات ABS / ESP","items":["حساس ABS","حساس سرعة العجلة","وحدة تحكم ABS","مضخة ABS","حساس ESP"]},{"g":"أنابيب الفرامل","items":["خراطيم الفرامل","أنابيب الفرامل","موزع الفرامل","طقم أنابيب","خزان سائل الفرامل"]},{"g":"فرامل اليد","items":["كابل فرامل اليد","ذراع فرامل اليد","محرك EPB","أحذية خلفية","طبل الفرامل"]}]},{"l":"التعليق والتوجيه","subs":[{"g":"الممتصات والزنبركات","items":["ممتصات أمامية","ممتصات خلفية","زنبركات حلزونية","حامل الممتص","مطاط الإيقاف","جلبة الحماية","نظام الضبط الرياضي","تعليق هوائي"]},{"g":"نظام التوجيه","items":["رأس قضيب التوجيه","قضيب التوجيه","بار التوجيه","علبة التوجيه","مضخة التوجيه","جلبة التوجيه","عمود التوجيه","مستشعر زاوية التوجيه"]},{"g":"أجزاء المحور","items":["ذراع التحكم","كرة الإسناد","مطاط بار الاستقرار","بار الاستقرار","رابط الاستقرار","محور التوجيه","هيكل فرعي","مطاط مطاطي"]},{"g":"محامل العجل","items":["محمل عجل أمامي","محمل عجل خلفي","نابض العجل","طقم محمل","صمولة المحور"]}]},{"l":"الكهرباء والمستشعرات","subs":[{"g":"البطارية والشحن","items":["بطارية السيارة","مولد الكهرباء","موتور الإقلاع","منظم الجهد","كابل الشحن","قطب البطارية","مستشعر البطارية"]},{"g":"الإضاءة","items":["المصابيح الأمامية","المصابيح الخلفية","مؤشر الانعطاف","مصباح الضباب","مصابيح النهار","وحدة LED","لمبات","غسالة الأضواء"]},{"g":"المستشعرات","items":["مقياس تدفق الهواء","حساس MAP","مسبار لامبدا","حساس العمود المرفقي","حساس عمود الكامة","مسبار NOx","حساس درجة حرارة الغازات","حساس الطرق"]},{"g":"وحدات التحكم","items":["وحدة تحكم المحرك ECU","وحدة تحكم ABS","وحدة التحكم بالجسم BCM","وحدة Airbag","وحدة تحكم ناقل الحركة"]},{"g":"المفاتيح والأوامر","items":["مفتاح رافع الزجاج","ذراع الإشارات","مفتاح الإشعال","البوق","مفتاح المرايا","وحدة القفل المركزي"]}]},{"l":"الفلاتر","subs":[{"g":"فلاتر الهواء","items":["فلتر هواء بنزين","فلتر هواء ديزل","فلتر هواء رياضي","فلتر لوحي"]},{"g":"فلاتر الزيت","items":["فلتر زيت خرطوشة","فلتر زيت ملولب","غلاف فلتر الزيت","طقم فلتر زيت"]},{"g":"فلاتر الوقود","items":["فلتر وقود ديزل","فلتر وقود بنزين","فلتر مضمن","فلتر مسبق"]},{"g":"فلاتر المقصورة","items":["فلتر حبوب اللقاح","فلتر الفحم النشط","فلتر مركب","طقم فلتر مقصورة"]}]},{"l":"هيكل الجسم والمظهر الخارجي","subs":[{"g":"المصدات","items":["المصد الأمامي","المصد الخلفي","حامل المصد","الحماية السفلية","غطاء خطاف القطر"]},{"g":"الأجنحة والألواح","items":["الجناح","غطاء المحرك","باب الصندوق","لوح الباب","عتبة الباب","شريح السقف"]},{"g":"المرايا","items":["زجاج المرآة","غطاء المرآة","موتور المرآة","عنصر التسخين","غطاء المرآة الخارجي"]},{"g":"رافعات الزجاج","items":["موتور رافع الزجاج","آلية رافع الزجاج","زجاج النافذة","ختم الزجاج"]},{"g":"الأقفال وأنظمة الإغلاق","items":["قفل الباب","القفل المركزي","محرك قفل الباب","أسطوانة القفل","كابل غطاء المحرك","غطاء خزان الوقود"]}]},{"l":"المقصورة الداخلية والراحة","subs":[{"g":"المقاعد وآلياتها","items":["ريل المقعد","مسند الرأس","غطاء المقعد","تدفئة المقعد","ضبط المقعد","قفل الظهر"]},{"g":"لوحة القيادة والتشطيبات","items":["لوحة القيادة","وحدة التحكم الوسطى","درج القفازات","حاجب الشمس","مقبض الباب الداخلي","السجادة"]},{"g":"تكييف الهواء","items":["ضاغط التكييف","مكثف التكييف","المبخر","صمام التمدد","مفتاح الضغط","المجفف","أنبوب التكييف"]},{"g":"التدفئة","items":["مشعاع التدفئة","موتور مروحة التدفئة","مقاومة المروحة","صنبور التدفئة","خرطوم التدفئة"]}]},{"l":"نظام العادم","subs":[{"g":"مشعب العادم","items":["مشعب العادم","مشعب التوربو","حشية مشعب العادم","مسمار مشعب العادم"]},{"g":"المحول الحراري","items":["محول أكسدة","محول ثلاثي الطرق","محول ديزل","محول مسبق"]},{"g":"فلتر الجسيمات","items":["فلتر جسيمات ديزل DPF","فلتر جسيمات بنزين OPF","مستشعر ضغط DPF","مستشعر حرارة DPF"]},{"g":"كاتمات الصوت والأنابيب","items":["كاتم الصوت الخلفي","كاتم الصوت الأوسط","الأنبوب الأوسط","الأنبوب الوسيط","الأنبوب المرن","حامل العادم"]},{"g":"مسابير لامبدا","items":["مسبار لامبدا قبل المحول","مسبار لامبدا بعد المحول","مسبار عريض النطاق","مسبار NOx","مسبار مسخن"]}]},{"l":"العجلات والإطارات","subs":[{"g":"الجنوط","items":["جنوط ألومنيوم","جنوط فولاذية","جنوط كروم","جنوط رياضية","جنوط شتاء","عجلة كاملة"]},{"g":"الإطارات","items":["إطارات صيفية","إطارات شتوية","إطارات كل الفصول","Run-Flat","إطارات رياضية","إطارات SUV","إطارات وعرة"]},{"g":"حساسات ضغط الإطار TPMS","items":["حساس TPMS","صمام TPMS","وحدة تحكم TPMS","أداة برمجة TPMS"]},{"g":"براغي وصواميل العجل","items":["براغي العجل","صواميل العجل","مسامير العجل","غطاء المحور","صمام الإطار","فاصل العجل"]}]},{"l":"الزيوت والسوائل والمواد الكيميائية","subs":[{"g":"زيت المحرك","items":["5W-30","5W-40","10W-40","0W-20","0W-30","زيت محرك ديزل","كامل الاصطناع","نصف اصطناعي","زيت طويل الأمد"]},{"g":"زيت ناقل الحركة","items":["زيت علبة يدوية","سائل ATF أوتوماتيك","زيت DSG / DCT","زيت المحور","زيت التفاضل"]},{"g":"سائل الفرامل","items":["DOT 4","DOT 5.1","DOT 3","سائل فرامل طويل الأمد"]},{"g":"سائل التبريد","items":["سائل G12","سائل G13","سائل OAT","مركز مانع التجمد","سائل جاهز للاستخدام"]},{"g":"المواد المضافة والكيميائية","items":["مضاف الزيت","مضاف الوقود","منظف DPF","معقم التكييف","منظف الفرامل","مواد التزليق"]}]},{"l":"الملحقات وقطع التآكل","subs":[{"g":"مساحات الزجاج","items":["ماسحة مسطحة","ماسحة تقليدية","ماسحة خلفية","ذراع الماسحة","فوهة الغسيل"]},{"g":"المصابيح","items":["H4 هالوجين","H7 هالوجين","طقم LED بديل","زينون D1S","زينون D2S","مصباح داخلي","W5W ضوء موضع"]},{"g":"الفيوزات","items":["فيوزات شفرة","فيوز خرطوشة","صندوق فيوزات","ريلاي","صندوق ريلاي"]},{"g":"السيور والبكرات","items":["سير V","سير Poly-V","طقم Poly-V","بكرة الشد","بكرة التوجيه","عجلة حرة للمولد"]}]}], vc_cta: "Qata Sayara", vc_cta_sub: "Kull al-marakat →",
      vc: [
        {l:"Qata Shahina",  s:"Sayarat tijariya", q:"shahina"},
        {l:"Qata Daraja",   s:"Kull al-tiraz",    q:"daraja"},
        {l:"Itarat",        s:"Sayfi Shitai",     q:"itar"},
        {l:"Jantaat",       s:"Fulad Alum",       q:"janta"},
        {l:"Adawat",        s:"Ihtirafi",         q:"adawat"},
        {l:"Mulhaqat",      s:"Dakhil Kharij",    q:"mulhaq"},
        {l:"Zayt Muharrik", s:"Kull al-lawazij",  q:"zayt"},
        {l:"Filtar",        s:"Zayt Hawa Waqud",  q:"filtar"},
        {l:"Faramel",       s:"Alwah Aqdab",      q:"faramel"}
      ],
      sell_sub: "أدرج القطع مجاناً · تواصل مع أفريقيا", learn_more: "اعرف المزيد", sell_sub: "Orodhesha bure · Fikia Afrika", learn_more: "Jifunza zaidi", china_title: "Jumla", china_sub: "Asaar",
      why_title: "Limatha?",
      features: [["OEM","OEM"],["Mobile Money","MTN"],["Shahn","DHL"],
        ["Sin","Mubashar"],["Muthaqoon","Muraja"],
        ["10 Lughat","EN - FR - PT - DE - ES - AR - TR - SW - LN"]] },
    product: { add_cart: "Idafa", buy_now: "Ishtari", condition: "Hala",
      new: "Jadid", used: "Musta'mal", refurbished: "Mujaddad",
      brand: "Marka", model: "Model", year: "Sana", oem: "OEM",
      location: "Mawqi", moq: "Hadd", stock: "Mutawaffir",
      out_stock: "Ghayr mutawaffir", seller: "Baei",
      description: "Wasf", view_shop: "Matjar", added: "Tam!" },
    cart: { title: "Salla", empty: "Farigha.", subtotal: "Majmou",
      checkout: "Itmam", continue: "Muwasala", clear: "Ifragh", items: "Anasir" },
    checkout: { title: "Daf", items: "Anasir", shipping: "Shahn",
      payment: "Daf", address: "Unwan", place_order: "Taqdeem",
      mobile_money: "Mobile Money", bank: "Banky", cod: "Istilam",
      name: "Ism", city: "Madina", country: "Balad", addr: "Unwan",
      phone: "Hatif", select_ship: "Mala al-huqool.", success: "Tam!" },
    orders: { title: "Talabat", number: "Talab #", date: "Tarikh",
      total: "Ijmal", status: "Hala", no_orders: "La talabat.",
      details: "Tafasil", payment: "Daf", shipping: "Shahn" },
    auth: { email: "Bareed", password: "Kalima", confirm: "Taqdeeq",
      name: "Ism", phone: "Hatif", country: "Balad", role: "Oreed",
      buyer: "Shira", seller: "Bai", login_btn: "Dukhool",
      register_btn: "Hisab", forgot: "Naseet?", no_account: "Jadeed?",
      have_account: "Hisab?", china_seller: "Jumla",
      mismatch: "Ghayr mutatabiqa.", fill_all: "Mala." },
    seller: { products: "Muntajati", shop: "Matjari", csv_import: "CSV",
      add_product: "Idafa", deactivate: "Ta'teel", activate: "Tafeel",
      pending: "Intithar", live: "Nasit", shop_saved: "Tam!", submitted: "Irsal!" },
    admin: { overview: "Nathra", users: "Mustakhdimoun", shops: "Matajir",
      products: "Muntajat", orders_all: "Talabat", categories: "Fiat",
      approve: "Muwafaqa", remove: "Izala", delete: "Hazf",
      enable: "Tafeel", disable: "Ta'teel", add_cat: "Idafa",
      cat_name: "Ism", cat_slug: "slug", cat_icon: "Icon" },
    filter: { all: "Kull", condition: "Hala", brand: "Marka",
      origin: "Masdar", china_only: "Sin faqat", search: "Bahth",
      reset: "Iaada", load_more: "Tahmeel", showing: "Ard",
      of: "min", parts: "Qata" },
    shop: { african: "Afrikioun", china: "Siniyoun", no_shops: "La matajir.",
      products_from: "Muntajat min", whatsapp: "WhatsApp", wechat: "WeChat",
      alibaba: "Alibaba", pending: "Intithar.", create: "Inshaa", save: "Hifz" },
    footer: { tagline: "Souq.", marketplace: "Souq", browse: "Tasaffuh",
      sell: "Bai", china_w: "Jumla", support: "Daam",
      help: "Mousaada", shipping_info: "Shahn", returns: "Irjaa",
      contact: "Tawasal", payments: "Turuq", rights: "Houqouq.",
      countries: "Ghana - Nigeria - Kenya" },
    errors: { not_found: "Ghayr mawjouda.", no_parts: "La qata.", generic: "Khata." },
    csv: { title: "CSV", info: "Tahmeel.", cols: "Aamida",
      download: "Namothaj", drop: "Anqar", drop_sub: "5MB",
      processing: "Mu'alaja...", success: "Tam!" }
  },

  tr: {
    nav: { parts: "Parcalar", shops: "Magazalar", china: "Cin Toptan",
      login: "Giris", register: "Kayit", logout: "Cikis",
      dashboard: "Panel", admin: "Yonetim", orders: "Siparisler",
      cart: "Sepet", language: "Dil", currency: "Para" },
    home: { hero_badge: "1 Parca Pazaryeri", hero_title: "Parca Bul -",
      hero_title_em: "Hizli", hero_sub: "Yeni ve kullanilmis",
      search_ph: "Parca, OEM...", search_btn: "Ara",
      pkw_btn: "Oto Yedek Parça", pkw_title: "Oto Yedek Parçaları", pkw_subtitle: "Bir kategori seçin",
      pkw_close: "Kapat", pkw_back: "Geri", pkw_choose: "Kategori seçin", pkw_search_in: "Kategoride ara",
      banner_pl_hero: "Hero (üst arka plan)", banner_pl_partner: "Partner alanı (orta)",
      banner_pl_side_left: "Sol yan banner", banner_pl_side_right: "Sağ yan banner",
      banner_placement: "Yerleşim", banner_placement_help: "Banner nerede görünür",
      seo_admin_title: "SEO Metinleri", seo_admin_sub: "Çok dilli metin blokları",
      seo_add: "+ Yeni SEO Metni", seo_slug: "Slug (iç ID)", seo_position: "Konum",
      seo_sort: "Sıralama", seo_active: "Aktif", seo_translations: "Çeviriler",
      seo_title_field: "Başlık", seo_body_field: "İçerik (HTML serbest)",
      seo_pl_home_top: "Ana Sayfa Üst", seo_pl_home_bottom: "Ana Sayfa Alt",
      seo_pl_partner: "Partner Bölümü", seo_pl_custom: "Özel",
      seo_save: "Kaydet", seo_cancel: "İptal", seo_delete: "Sil",
      seo_confirm_delete: "Bu SEO metni silinsin mi?", nav_seo: "SEO Metinleri",
      stats_parts: "Parca", stats_sellers: "Satici",
      stats_countries: "Ulke", stats_langs: "Dil",
      featured: "One Cikan", featured_sub: "En popüler", view_all: "Tumu",
      search_all_cats: "Tüm Kategoriler", vc_cat_btn: "Tum Kategoriler", vc_tree: [{"l":"Motor & Aktarma Organları","subs":[{"g":"Motor Bloğu & Bileşenler","items":["Motor Bloğu","Silindir Kapağı","Subap Kapağı","Yağ Karteri","Pistonlar","Piston Segmanları","Eksantrik Mili","Krank Mili"]},{"g":"Triger Sistemi","items":["Triger Kayışı","Triger Zinciri","Zincir Gergisi","Rölanti Rölesi","Triger Kayışı Kiti","Triger Zinciri Kiti"]},{"g":"Yakıt Sistemi","items":["Yakıt Enjektörleri","Yakıt Pompası","Yüksek Basınçlı Pompa","Yakıt Filtresi","Yakıt Rayı","Basınç Regülatörü","Yakıt Basınç Sensörü"]},{"g":"Hava Emişi","items":["Hava Filtresi","Emme Manifoldu","Ara Soğutucu","Turboşarjer","Gaz Kelebeği","Hava Akış Sensörü","Emme Hortumu"]},{"g":"Soğutma Sistemi","items":["Radyatör","Termostat","Su Pompası","Genleşme Tankı","Soğutma Hortumu","Soğutma Fanı","Viskoz Kavrama","Soğutma Suyu Sıcaklık Sensörü"]},{"g":"Yağlama Sistemi","items":["Yağ Filtresi","Yağ Pompası","Yağ Basınç Sensörü","Karter Havalandırma","Yağ Soğutucu","Yağ Çubuğu"]},{"g":"Debriyaj & Şanzıman","items":["Debriyaj Seti","Çift Kütleli Volan","Şanzıman Rulmanlı","Tahrik Mili","CV Mafsalı","Baskı Rulmanlı","Vites Bağlantısı","Şanzıman Keçesi"]}]},{"l":"Fren Sistemi","subs":[{"g":"Fren Balataları","items":["Ön Fren Balataları","Arka Fren Balataları","Spor Fren Balataları","Uyarı Sensörlü Balata Seti"]},{"g":"Fren Diskleri","items":["Havalandırmalı Diskler","Düz Diskler","Delikli Diskler","Spor Diskler","Fren Disk Seti"]},{"g":"Fren Kaliperleri & Silindirleri","items":["Ön Fren Kaliperi","Arka Fren Kaliperi","Fren Pabuçları","Tekerlek Silindiri","Kaliper Tamir Kiti"]},{"g":"ABS / ESP Sensörleri","items":["ABS Sensörü","Tekerlek Hız Sensörü","ABS Kontrol Ünitesi","ABS Pompası","ESP Sensörü"]},{"g":"Fren Boruları","items":["Fren Hortumları","Fren Boruları","Dağıtıcı Blok","Boru Seti","Fren Hidroliği Haznesi"]},{"g":"El Freni","items":["El Freni Kablosu","El Freni Kolu","EPB Motoru","Arka Fren Pabuçları","Fren Kampanası"]}]},{"l":"Süspansiyon & Direksiyon","subs":[{"g":"Amortisörler & Yaylar","items":["Ön Amortisörler","Arka Amortisörler","Sarmal Yaylar","Üst Taşıyıcı","Tampon","Körük","Spor Süspansiyon Kiti","Hava Süspansiyonu"]},{"g":"Direksiyon","items":["Rot Başı","Rot","Bağlantı Çubuğu","Direksiyon Kutusu","Servo Pompa","Direksiyon Körüğü","Direksiyon Mili","Direksiyon Açı Sensörü"]},{"g":"Aks Parçaları","items":["Salıncak","Rotil","Stabilizatör Burcu","Stabilizatör Çubuğu","Stabilizatör Bağlantısı","Aksiyel Mili","Alt Şasi","Susturucu Burç"]},{"g":"Tekerlek Rulmanları","items":["Ön Tekerlek Rulmanı","Arka Tekerlek Rulmanı","Tekerlek Göbeği","Rulman Kiti","Göbek Somunu"]}]},{"l":"Elektrik & Sensörler","subs":[{"g":"Akü & Şarj","items":["Araç Aküsü","Alternatör","Marş Motoru","Voltaj Regülatörü","Şarj Kablosu","Akü Kutbu","Akü Sensörü"]},{"g":"Aydınlatma","items":["Far","Arka Lamba","Sinyal","Sis Lambası","Gündüz Farları","LED Modül","Ampuller","Far Yıkayıcı"]},{"g":"Sensörler","items":["Hava Akış Sensörü","MAP Sensörü","Lambda Sensörü","Krank Mili Sensörü","Eksantrik Sensörü","NOx Sensörü","Egzoz Gazı Sıcaklık Sensörü","Vuruntu Sensörü"]},{"g":"Kontrol Üniteleri","items":["Motor ECU","ABS Kontrol Ünitesi","Karoser Kontrol Modülü","Airbag Modülü","Şanzıman Kontrol Ünitesi"]},{"g":"Anahtarlar & Kumandalar","items":["Cam Düğmesi","Sinyal Kolu","Kontak Anahtarı","Korna","Ayna Kumandası","Merkezi Kilit Modülü"]}]},{"l":"Filtreler","subs":[{"g":"Hava Filtreleri","items":["Benzinli Motor Hava Filtresi","Dizel Hava Filtresi","Spor Hava Filtresi","Panel Filtre"]},{"g":"Yağ Filtreleri","items":["Kartuş Yağ Filtresi","Vidalı Yağ Filtresi","Yağ Filtre Konut","Yağ Filtre Seti"]},{"g":"Yakıt Filtreleri","items":["Dizel Yakıt Filtresi","Benzin Yakıt Filtresi","Sıralı Filtre","Ön Filtre"]},{"g":"Polen Filtreleri","items":["Polen Filtresi","Aktif Karbonlu Filtre","Kombine Filtre","Kabin Filtre Seti"]}]},{"l":"Kaporta & Dış Mekan","subs":[{"g":"Tamponlar","items":["Ön Tampon","Arka Tampon","Tampon Braketi","Alt Karın Koruma","Çeki Kancası Kapağı"]},{"g":"Çamurluğlar & Paneller","items":["Çamurluk","Kaput","Bagaj Kapağı","Kapı Paneli","Eşik","Tavan Rayı"]},{"g":"Aynalar","items":["Ayna Camı","Ayna Kasası","Ayna Motoru","Isıtma Elemanı","Dış Ayna Kapağı"]},{"g":"Cam Mekanizmaları","items":["Cam Motoru","Cam Mekanizması","Cam","Cam Contası"]},{"g":"Kilitler & Kapama Sistemleri","items":["Kapı Kilidi","Merkezi Kilit","Kapı Kilidi Aktüatörü","Kilit Silindiri","Kaput Kablosu","Yakıt Kapağı"]}]},{"l":"İç Mekan & Konfor","subs":[{"g":"Koltuklar & Mekanizmalar","items":["Koltuk Rayı","Koltuk Başlığı","Koltuk Kılıfı","Koltuk Isıtması","Koltuk Ayarı","Arkalık Kilidi"]},{"g":"Gösterge Paneli & Döşeme","items":["Gösterge Paneli","Orta Konsol","Torpido Gözü","Güneşlik","İç Kapı Kolu","Halı"]},{"g":"Klima","items":["Klima Kompresörü","Klima Kondenseri","Evaporatör","Genleşme Valfi","Klima Basınç Şalteri","Kurutucu","Klima Hattı"]},{"g":"Isıtma","items":["Isıtma Radyatörü","Isıtma Fanı Motoru","Fan Direnci","Isıtma Musluğu","Isıtma Hortumu"]}]},{"l":"Egzoz Sistemi","subs":[{"g":"Egzoz Manifoldu","items":["Egzoz Manifoldu","Turbo Manifoldu","Manifold Contası","Manifold Saplaması"]},{"g":"Katalitik Konvertör","items":["Oksidasyon Katalizatörü","Üç Yollu Katalizatör","Dizel Oksidasyon Katalizatörü","Ön Katalizatör"]},{"g":"Partikül Filtresi","items":["Dizel DPF","Benzinli OPF","DPF Basınç Sensörü","DPF Sıcaklık Sensörü"]},{"g":"Susturucu & Borular","items":["Arka Susturucu","Orta Susturucu","Orta Boru","Ara Boru","Esnek Boru","Egzoz Askısı"]},{"g":"Lambda Sensörleri","items":["Kat Öncesi Lambda","Kat Sonrası Lambda","Geniş Bant Lambda","NOx Sensörü","Isıtmalı Sensör"]}]},{"l":"Tekerlekler & Lastikler","subs":[{"g":"Jantlar","items":["Alüminyum Jant","Çelik Jant","Krom Jant","Spor Jant","Kış Jantı","Komple Tekerlek"]},{"g":"Lastikler","items":["Yaz Lastiği","Kış Lastiği","4 Mevsim Lastiği","Run-Flat","Spor Lastik","SUV Lastik","Arazi Lastiği"]},{"g":"TPMS Sensörleri","items":["TPMS Sensörü","TPMS Valfi","TPMS Kontrol Ünitesi","TPMS Programlama Aleti"]},{"g":"Tekerlek Civata & Somunları","items":["Tekerlek Cıvataları","Tekerlek Somunları","Tekerlek Saplamaları","Göbek Kapağı","Lastik Valfi","Tekerlek Aralayıcı"]}]},{"l":"Yağlar, Sıvılar & Kimyasallar","subs":[{"g":"Motor Yağı","items":["5W-30","5W-40","10W-40","0W-20","0W-30","Dizel Motor Yağı","Tam Sentetik","Yarı Sentetik","Longlife Yağ"]},{"g":"Şanzıman Yağı","items":["Manuel Şanzıman Yağı","Otomatik ATF","DSG / DCT Yağı","Aks Yağı","Diferansiyel Yağı"]},{"g":"Fren Hidroliği","items":["DOT 4","DOT 5.1","DOT 3","Long Life Fren Hidroliği"]},{"g":"Antifriz","items":["G12 Antifriz","G13 Antifriz","OAT Antifriz","Antifriz Konsantresi","Kullanıma Hazır"]},{"g":"Katkı Maddeleri & Kimyasallar","items":["Yağ Katkısı","Yakıt Katkısı","DPF Temizleyici","Klima Dezenfektanı","Fren Temizleyici","Zincir Yağı"]}]},{"l":"Aksesuar & Aşınan Parçalar","subs":[{"g":"Silecek Lastikleri","items":["Düz Silecek","Konvansiyonel Silecek","Arka Silecek","Silecek Kolu","Fıskiye"]},{"g":"Ampuller","items":["H4 Halojen","H7 Halojen","LED Dönüşüm Kiti","Xenon D1S","Xenon D2S","İç Mekan Ampulü","W5W Marker Lambası"]},{"g":"Sigortalar","items":["Bıçak Sigorta","Kartuş Sigorta","Sigorta Kutusu","Röle","Röle Kutusu"]},{"g":"Kayışlar & Gergi Mekanizması","items":["V Kayışı","Kanallı Kayış","Poly-V Seti","Gergi Rölesi","Rölanti Rölesi","Alternatör Freewheel"]}]}], vc_cta: "Oto Yedek Parca", vc_cta_sub: "Tum marka & modeller →",
      vc: [
        {l:"Kamyon Parcasi",  s:"Ticari araclar",    q:"kamyon"},
        {l:"Motosiklet Parcasi",s:"Tum modeller",    q:"motosiklet"},
        {l:"Lastik",          s:"Yaz · Kis · 4 mevsim",q:"lastik"},
        {l:"Jant",            s:"Celik · Aluminyum", q:"jant"},
        {l:"Alet",            s:"Profesyonel & Hobi", q:"alet"},
        {l:"Aksesuar",        s:"Ic & Dis",          q:"aksesuar"},
        {l:"Motor Yagi",      s:"Tum viskoziteler",  q:"yag"},
        {l:"Filtre",          s:"Yag · Hava · Yakit",q:"filtre"},
        {l:"Fren",            s:"Balatalar · Diskler",q:"fren"}
      ],
      categories: "Kategori", sell_sub: "Ücretsiz listele · Afrika'ya ulaş", learn_more: "Daha fazla", china_title: "Toptan", china_sub: "Fabrika fiyatlari",
      why_title: "Neden?",
      features: [["OEM","OEM"],["Mobil Para","MTN"],["Lojistik","DHL"],
        ["Cin","Direkt"],["Onayli","Incelenmis"],
        ["10 Dil","EN - FR - PT - DE - ES - AR - TR - SW - LN"]] },
    product: { add_cart: "Sepete Ekle", buy_now: "Satin Al", condition: "Durum",
      new: "Yeni", used: "Kullanilmis", refurbished: "Yenilenmis",
      brand: "Marka", model: "Model", year: "Yil", oem: "OEM",
      location: "Konum", moq: "Min.", stock: "stokta", out_stock: "Yok",
      seller: "Satici", description: "Aciklama", view_shop: "Magaza", added: "Eklendi!" },
    cart: { title: "Sepet", empty: "Bos.", subtotal: "Ara Toplam",
      checkout: "Odeme", continue: "Devam", clear: "Temizle", items: "urun" },
    checkout: { title: "Odeme", items: "Urunler", shipping: "Kargo",
      payment: "Odeme", address: "Adres", place_order: "Siparis Ver",
      mobile_money: "Mobil Para", bank: "Havale", cod: "Kapida",
      name: "Ad", city: "Sehir", country: "Ulke", addr: "Adres",
      phone: "Telefon", select_ship: "Alanlari doldurun.", success: "Verildi!" },
    orders: { title: "Siparisler", number: "Siparis #", date: "Tarih",
      total: "Toplam", status: "Durum", no_orders: "Yok.",
      details: "Detay", payment: "Odeme", shipping: "Kargo" },
    auth: { email: "E-posta", password: "Sifre", confirm: "Onayla",
      name: "Ad", phone: "Telefon", country: "Ulke", role: "Istiyorum",
      buyer: "Almak", seller: "Satmak", login_btn: "Giris",
      register_btn: "Hesap", forgot: "Unuttum?", no_account: "Yeni?",
      have_account: "Hesap?", china_seller: "Toptanci",
      mismatch: "Eslesmiyor.", fill_all: "Doldurun." },
    seller: { products: "Urunler", shop: "Magaza", csv_import: "CSV",
      add_product: "Ekle", deactivate: "Kapat", activate: "Ac",
      pending: "Bekliyor", live: "Aktif", shop_saved: "Kaydedildi!", submitted: "Gonderildi!" },
    admin: { overview: "Bakis", users: "Kullanicilar", shops: "Magazalar",
      products: "Urunler", orders_all: "Siparisler", categories: "Kategoriler",
      approve: "Onayla", remove: "Kaldir", delete: "Sil",
      enable: "Ac", disable: "Kapat", add_cat: "Ekle",
      cat_name: "Ad", cat_slug: "slug", cat_icon: "Icon" },
    filter: { all: "Tumu", condition: "Durum", brand: "Marka",
      origin: "Koken", china_only: "Toptan", search: "Ara",
      reset: "Sifirla", load_more: "Daha", showing: "Gosterilen",
      of: "/", parts: "parca" },
    shop: { african: "Afrikali", china: "Cinli", no_shops: "Yok.",
      products_from: "Urunler", whatsapp: "WhatsApp", wechat: "WeChat",
      alibaba: "Alibaba", pending: "Bekliyor.", create: "Olustur", save: "Kaydet" },
    footer: { tagline: "Pazaryeri.", marketplace: "Pazar",
      browse: "Gozat", sell: "Sat", china_w: "Toptan", support: "Destek",
      help: "Yardim", shipping_info: "Kargo", returns: "Iade",
      contact: "Iletisim", payments: "Odeme", rights: "Tum haklar saklidir.",
      countries: "Gana - Nijerya - Kenya" },
    errors: { not_found: "Bulunamadi.", no_parts: "Yok.", generic: "Hata." },
    csv: { title: "CSV", info: "Yukle.", cols: "Sutunlar",
      download: "Sablon", drop: "Tikla", drop_sub: "5MB",
      processing: "Isleniyor...", success: "Tamam!" }
  },

  sw: {
    nav: { parts: "Vipande", shops: "Maduka", china: "Jumla China",
      login: "Ingia", register: "Jisajili", logout: "Toka",
      dashboard: "Dashibodi", admin: "Msimamizi", orders: "Maagizo",
      cart: "Kikapu", language: "Lugha", currency: "Sarafu" },
    home: { hero_badge: "Soko 1 la Vipande", hero_title: "Pata Kipande -",
      popular_brands: "Chapa Maarufu",
      hero_title_em: "Haraka", hero_sub: "Vipande vipya",
      search_ph: "Jina, OEM...", search_btn: "Tafuta",
      search_headline: "Mamilioni ya vipuri. Utafutaji mmoja rahisi.",
      pkw_btn: "Vipuri vya Gari", pkw_title: "Vipuri vya Magari", pkw_subtitle: "Chagua kategoria",
      pkw_close: "Funga", pkw_back: "Rudi", pkw_choose: "Chagua kategoria", pkw_search_in: "Tafuta katika kategoria",
      banner_pl_hero: "Hero (asili juu)", banner_pl_partner: "Nafasi ya Mshirika (kati)",
      banner_pl_side_left: "Bango la kushoto", banner_pl_side_right: "Bango la kulia",
      banner_placement: "Mahali", banner_placement_help: "Mahali bango linaonekana",
      seo_admin_title: "Maandishi ya SEO", seo_admin_sub: "Vitalu vya maandishi vya lugha nyingi",
      seo_add: "+ Andiko jipya la SEO", seo_slug: "Slug", seo_position: "Nafasi",
      seo_sort: "Mpangilio", seo_active: "Hai", seo_translations: "Tafsiri",
      seo_title_field: "Kichwa", seo_body_field: "Maandishi (HTML inaruhusiwa)",
      seo_pl_home_top: "Mwanzo Juu", seo_pl_home_bottom: "Mwanzo Chini",
      seo_pl_partner: "Sehemu ya Mshirika", seo_pl_custom: "Maalum",
      seo_save: "Hifadhi", seo_cancel: "Ghairi", seo_delete: "Futa",
      seo_confirm_delete: "Futa andiko hili la SEO?", nav_seo: "Maandishi ya SEO",
      stats_parts: "Vipande", stats_sellers: "Wauzaji",
      stats_countries: "Nchi", stats_langs: "Lugha",
      featured: "Maarufu", featured_sub: "Zinazouzwa zaidi", view_all: "Vyote",
      search_all_cats: "Aina Zote", vc_cat_btn: "Aina Zote", vc_tree: [{"l":"Injini & Mfumo wa Uendeshaji","subs":[{"g":"Bloku la Injini & Vipande","items":["Bloku la Injini","Kichwa cha Silinda","Kifuniko cha Valvu","Bakuli la Mafuta","Pistoni","Pete za Pistoni","Shimba la Kama","Shimba la Krank"]},{"g":"Mfumo wa Wakati","items":["Ukanda wa Wakati","Mnyororo wa Wakati","Msongo wa Mnyororo","Roli ya Mwongozo","Seti ya Ukanda wa Wakati","Seti ya Mnyororo wa Wakati"]},{"g":"Mfumo wa Mafuta","items":["Vinyunyizia Mafuta","Pampu ya Mafuta","Pampu ya Shinikizo Juu","Kichungi cha Mafuta","Rail ya Mafuta","Mdhibiti wa Shinikizo","Sensa ya Shinikizo la Mafuta"]},{"g":"Uingizaji Hewa","items":["Kichungi cha Hewa","Kivuma cha Hewa","Kiimarisha Hewa","Turbo Charger","Valve ya Hewa","Kipimo cha Mtiririko wa Hewa","Hose ya Hewa"]},{"g":"Mfumo wa Kupoza","items":["Radiyeta","Thermostat","Pampu ya Maji","Tanki la Upanuzi","Hose ya Kupoza","Feni ya Kupoza","Umunganisho wa Viscous","Sensa ya Joto la Maji"]},{"g":"Mfumo wa Mafuta ya Kulinika","items":["Kichungi cha Mafuta ya Injini","Pampu ya Mafuta ya Injini","Sensa ya Shinikizo la Mafuta","Mwingizo wa Hewa","Kipoza Mafuta","Kipande cha Kupima Mafuta"]},{"g":"Klachi & Gearbox","items":["Seti ya Klachi","Magurudumu Mawili","Beari ya Gearbox","Shimba la Uendeshaji","Yunitihomosinetic","Beari ya Ukandamizaji","Ufungo wa Gearbox","Muhuri wa Gearbox"]}]},{"l":"Mfumo wa Breki","subs":[{"g":"Pedi za Breki","items":["Pedi za Mbele","Pedi za Nyuma","Pedi za Michezo","Seti ya Pedi na Sensa"]},{"g":"Diski za Breki","items":["Diski Zilizowashwa Upepo","Diski Imara","Diski Zilizopigwa Mashimo","Diski za Michezo","Seti ya Diski"]},{"g":"Kalipa & Silinda","items":["Kalipa ya Mbele","Kalipa ya Nyuma","Viatu vya Breki","Silinda ya Gurudumu","Seti ya Kurekebisha Kalipa"]},{"g":"Sensa za ABS / ESP","items":["Sensa ya ABS","Sensa ya Kasi ya Gurudumu","Kitengo cha Kudhibiti ABS","Pampu ya ABS","Sensa ya ESP"]},{"g":"Mabomba ya Breki","items":["Hose za Breki","Mabomba ya Breki","Bloku la Mgawanyo","Seti ya Mabomba","Hifadhi ya Maji ya Breki"]},{"g":"Breki ya Mkono","items":["Waya wa Breki ya Mkono","Mkono wa Breki","Motor ya EPB","Viatu vya Nyuma","Ngoma ya Breki"]}]},{"l":"Mfumo wa Kusimamia & Uendeshaji","subs":[{"g":"Vifaa vya Kusimamia & Chemchemi","items":["Msimamizi wa Mbele","Msimamizi wa Nyuma","Chemchemi za Helical","Kiti cha Juu","Kizuizi","Kofia ya Ulinzi","Seti ya Kusimamia Michezo","Kusimamia kwa Hewa"]},{"g":"Mfumo wa Uendeshaji","items":["Kichwa cha Fimbo ya Uendeshaji","Fimbo ya Uendeshaji","Fimbo ya Kuunganisha","Rack ya Uendeshaji","Pampu ya Uendeshaji wa Power","Kofia ya Uendeshaji","Nguzo ya Uendeshaji","Sensa ya Pembe ya Uendeshaji"]},{"g":"Sehemu za Mhimili","items":["Mkono wa Kudhibiti","Mpira wa Kuunganisha","Bushi ya Fimbo ya Uthabiti","Fimbo ya Uthabiti","Kiungo cha Uthabiti","Mhimili wa Uendeshaji","Muundo Mdogo","Bushi ya Mpira"]},{"g":"Beari za Gurudumu","items":["Beari ya Gurudumu la Mbele","Beari ya Gurudumu la Nyuma","Kitovu cha Gurudumu","Seti ya Beari","Nati ya Kitovu"]}]},{"l":"Umeme & Sensa","subs":[{"g":"Betri & Kuchaji","items":["Betri ya Gari","Jenereta","Motor ya Kuanzisha","Mdhibiti wa Voltage","Kebo ya Kuchaji","Klapu ya Betri","Sensa ya Betri"]},{"g":"Taa","items":["Taa za Mbele","Taa za Nyuma","Taa za Ishara","Taa za Ukungu","Taa za Mchana","Moduli ya LED","Balbu","Kisafishaji Taa"]},{"g":"Sensa","items":["Sensa ya Mtiririko wa Hewa","Sensa ya MAP","Sensa ya Lambda","Sensa ya Krank","Sensa ya Kama","Sensa ya NOx","Sensa ya Joto la Gesi","Sensa ya Mapigano"]},{"g":"Vitengo vya Kudhibiti","items":["ECU ya Injini","Kitengo cha Kudhibiti ABS","Moduli ya Udhibiti wa Mwili","Moduli ya Airbag","Kitengo cha Kudhibiti Gearbox"]},{"g":"Vitufe & Vidhibiti","items":["Kitufe cha Glasi","Nguzo ya Ishara","Ufunguo wa Kuwasha","Pembe","Kidhibiti cha Kioo","Moduli ya Kufunga Kati"]}]},{"l":"Vichungi","subs":[{"g":"Vichungi vya Hewa","items":["Kichungi cha Hewa cha Benzini","Kichungi cha Hewa cha Dizeli","Kichungi cha Hewa cha Michezo","Kichungi cha Paneli"]},{"g":"Vichungi vya Mafuta ya Injini","items":["Kichungi cha Mafuta cha Cartridge","Kichungi cha Mafuta cha Screwable","Nyumba ya Kichungi cha Mafuta","Seti ya Kichungi cha Mafuta"]},{"g":"Vichungi vya Petroli","items":["Kichungi cha Mafuta cha Dizeli","Kichungi cha Mafuta cha Benzini","Kichungi cha Inline","Kichungi cha Awali"]},{"g":"Vichungi vya Cabin","items":["Kichungi cha Poleni","Kichungi cha Carbon Iliyoanzishwa","Kichungi cha Mchanganyiko","Seti ya Kichungi cha Cabin"]}]},{"l":"Mwili wa Gari & Nje","subs":[{"g":"Bumper","items":["Bumper ya Mbele","Bumper ya Nyuma","Msimamizi wa Bumper","Kinga ya Chini","Kifuniko cha Ndoano ya Kukokota"]},{"g":"Mabawa & Paneli","items":["Bawa","Bonnet","Mlango wa Nyuma","Paneli ya Mlango","Kizingiti","Rail ya Dari"]},{"g":"Vioo","items":["Kioo cha Kioo","Nyumba ya Kioo","Motor ya Kioo","Kipengele cha Joto","Kifuniko cha Kioo cha Nje"]},{"g":"Mifumo ya Kuinua Glasi","items":["Motor ya Kuinua Glasi","Utaratibu wa Kuinua Glasi","Glasi ya Dirisha","Muhuri wa Glasi"]},{"g":"Malfungo & Mifumo ya Kufunga","items":["Kufuli cha Mlango","Kufunga Kati","Actuator ya Kufuli","Silinda ya Kufuli","Kebo ya Bonnet","Kifuniko cha Tanki ya Mafuta"]}]},{"l":"Ndani ya Gari & Starehe","subs":[{"g":"Viti & Mifumo","items":["Rail ya Kiti","Kitegemeo cha Kichwa","Kufunika Kiti","Kupasha Joto Kiti","Kurekebisha Kiti","Kufuli cha Mgongo"]},{"g":"Dashibodi & Mapambo","items":["Dashibodi","Konsol ya Kati","Sanduku la Glavu","Kizuia Jua","Mpini wa Mlango wa Ndani","Zulia"]},{"g":"Kiyoyozi","items":["Kompresori ya AC","Kondensa ya AC","Evaporeta","Valve ya Upanuzi","Swichi ya Shinikizo la AC","Kikausha","Bomba la AC"]},{"g":"Mfumo wa Joto","items":["Radiyeta ya Joto","Motor ya Feni ya Joto","Kipinga cha Feni","Bomba la Joto","Hose ya Joto"]}]},{"l":"Mfumo wa Ekzosti","subs":[{"g":"Manifold ya Ekzosti","items":["Manifold ya Ekzosti","Manifold ya Turbo","Gasket ya Manifold","Pini ya Manifold"]},{"g":"Kisafishaji Kemikali","items":["Kisafishaji cha Oksidi","Kisafishaji cha Njia Tatu","Kisafishaji cha Dizeli","Kisafishaji cha Awali"]},{"g":"Kichungi cha Chembe","items":["DPF ya Dizeli","OPF ya Benzini","Sensa ya Shinikizo la DPF","Sensa ya Joto la DPF"]},{"g":"Kisimamizi & Mabomba","items":["Kisimamizi cha Nyuma","Kisimamizi cha Katikati","Bomba la Katikati","Bomba la Kati","Bomba Linaloinama","Msimamizi wa Ekzosti"]},{"g":"Sensa za Lambda","items":["Lambda Kabla ya Kisafishaji","Lambda Baada ya Kisafishaji","Lambda ya Upana Mpana","Sensa ya NOx","Sensa yenye Joto"]}]},{"l":"Magurudumu & Matairi","subs":[{"g":"Rimi","items":["Rimi za Alum","Rimi za Chuma","Rimi za Krome","Rimi za Michezo","Rimi za Baridi","Gurudumu Kamili"]},{"g":"Matairi","items":["Matairi ya Kiangazi","Matairi ya Baridi","Matairi ya Majira Yote","Run-Flat","Matairi ya Michezo","Matairi ya SUV","Matairi ya Off-Road"]},{"g":"Sensa za TPMS","items":["Sensa ya TPMS","Valve ya TPMS","Kitengo cha Kudhibiti TPMS","Chombo cha Kupanga TPMS"]},{"g":"Bolti & Nati za Gurudumu","items":["Bolti za Gurudumu","Nati za Gurudumu","Viganja vya Gurudumu","Kifuniko cha Kitovu","Valve ya Tairi","Kipanzi cha Gurudumu"]}]},{"l":"Mafuta, Vinywaji & Kemikali","subs":[{"g":"Mafuta ya Injini","items":["5W-30","5W-40","10W-40","0W-20","0W-30","Mafuta ya Injini ya Dizeli","Synthetic Kamili","Semi-Synthetic","Longlife"]},{"g":"Mafuta ya Gearbox","items":["Mafuta ya Gearbox ya Mkono","Mafuta ya ATF ya Otomatiki","Mafuta ya DSG / DCT","Mafuta ya Mhimili","Mafuta ya Differesheli"]},{"g":"Maji ya Breki","items":["DOT 4","DOT 5.1","DOT 3","Maji ya Breki ya Muda Mrefu"]},{"g":"Kibaridi","items":["Kibaridi G12","Kibaridi G13","Kibaridi OAT","Mkusanyiko wa Kibaridi","Kibaridi Tayari Kutumika"]},{"g":"Vongeza & Kemikali","items":["Ongeza la Mafuta","Ongeza la Petroli","Kisafishaji DPF","Dawa ya AC","Kisafishaji Breki","Mafuta ya Mnyororo"]}]},{"l":"Vifaa & Vipande vya Kuchakaa","subs":[{"g":"Blade za Mfuta","items":["Blade Tambarare","Blade ya Kawaida","Blade ya Nyuma","Mkono wa Mfuta","Dawa ya Maji"]},{"g":"Balbu","items":["H4 Halojeni","H7 Halojeni","Seti ya LED ya Ubadilishaji","Xenon D1S","Xenon D2S","Balbu ya Ndani","W5W Mwanga wa Msimamo"]},{"g":"Fyuzi","items":["Fyuzi za Blade","Fyuzi ya Cartridge","Sanduku la Fyuzi","Relay","Sanduku la Relay"]},{"g":"Mikanda & Roli","items":["Ukanda wa V","Ukanda wa Poly-V","Seti ya Poly-V","Roli ya Mvutano","Roli ya Mwongozo","Gurudumu Huru la Jenereta"]}]}], vc_cta: "Vipande Gari", vc_cta_sub: "Aina zote →",
      vc: [
        {l:"Vipande Lori",    s:"Magari ya biashara", q:"lori"},
        {l:"Vipande Piki",    s:"Aina zote",          q:"pikipiki"},
        {l:"Matairi",         s:"Kiangazi · Baridi",  q:"tairi"},
        {l:"Rimi",            s:"Chuma · Alum",       q:"rimi"},
        {l:"Zana",            s:"Kitaalamu & Burudani",q:"zana"},
        {l:"Vifaa",           s:"Ndani & Nje",        q:"vifaa"},
        {l:"Mafuta ya Injini",s:"Viwango vyote",      q:"mafuta"},
        {l:"Vichungi",        s:"Mafuta · Hewa · Mafuta ya Gari",q:"kichungi"},
        {l:"Breki",           s:"Pedi · Diski",       q:"breki"}
      ],
      categories: "Aina", china_title: "Jumla", china_sub: "Bei za kiwanda",
      why_title: "Kwa nini?",
      features: [["OEM","OEM"],["Mobile Money","MTN"],["Usafirishaji","DHL"],
        ["China","Moja kwa moja"],["Walioidhinishwa","Imekaguliwa"],
        ["Lugha 10","EN - FR - PT - DE - ES - AR - TR - SW - LN"]] },
    product: { add_cart: "Ongeza", buy_now: "Nunua", condition: "Hali",
      new: "Kipya", used: "Iliyotumika", refurbished: "Iliyofanyiwa",
      brand: "Chapa", model: "Mfano", year: "Mwaka", oem: "OEM",
      location: "Mahali", moq: "Agizo", stock: "kipo", out_stock: "Haipo",
      seller: "Muuzaji", description: "Maelezo", view_shop: "Duka", added: "Kimeongezwa!" },
    cart: { title: "Kikapu", empty: "Wazi.", subtotal: "Jumla",
      checkout: "Lipa", continue: "Endelea", clear: "Futa", items: "vitu" },
    checkout: { title: "Lipa", items: "Vitu", shipping: "Usafirishaji",
      payment: "Malipo", address: "Anwani", place_order: "Agiza",
      seller_no_payout: "Bidhaa moja kwenye kikapu chako haipatikani kwa sasa \u2014 muuzaji bado hajaweka malipo. Iondoe au jaribu baadaye.",
      mobile_money: "Pesa Simu", bank: "Benki", cod: "Taslimu",
      name: "Jina", city: "Mji", country: "Nchi", addr: "Anwani",
      phone: "Simu", select_ship: "Jaza.", success: "Imewekwa!" },
    orders: { title: "Maagizo", number: "Agizo #", date: "Tarehe",
      total: "Jumla", status: "Hali", no_orders: "Hakuna.",
      details: "Maelezo", payment: "Malipo", shipping: "Usafirishaji" },
    auth: { email: "Barua pepe", password: "Nenosiri", confirm: "Thibitisha",
      name: "Jina", phone: "Simu", country: "Nchi", role: "Nataka",
      buyer: "Kununua", seller: "Kuuza", login_btn: "Ingia",
      register_btn: "Unda", forgot: "Umesahau?", no_account: "Mpya?",
      have_account: "Akaunti?", china_seller: "Jumla",
      mismatch: "Hayafanani.", fill_all: "Jaza." },
    seller: { products: "Bidhaa", shop: "Duka", csv_import: "CSV",
      add_product: "Ongeza", deactivate: "Zima", activate: "Washa",
      pending: "Inasubiri", live: "Inaendesha", shop_saved: "Limehifadhiwa!", submitted: "Imetumwa!" },
    admin: { overview: "Muhtasari", users: "Watumiaji", shops: "Maduka",
      products: "Bidhaa", orders_all: "Maagizo", categories: "Aina",
      approve: "Idhinisha", remove: "Ondoa", delete: "Futa",
      enable: "Washa", disable: "Zima", add_cat: "Ongeza",
      cat_name: "Jina", cat_slug: "slug", cat_icon: "Icon" },
    filter: { all: "Yote", condition: "Hali", brand: "Chapa",
      origin: "Asili", china_only: "Jumla", search: "Tafuta",
      reset: "Weka upya", load_more: "Zaidi", showing: "Inaonyesha",
      of: "kati ya", parts: "vipande" },
    shop: { african: "Afrika", china: "China", no_shops: "Hakuna.",
      products_from: "Bidhaa kutoka", whatsapp: "WhatsApp", wechat: "WeChat",
      alibaba: "Alibaba", pending: "Inasubiri.", create: "Unda", save: "Hifadhi" },
    footer: { tagline: "Soko.", marketplace: "Soko",
      browse: "Tazama", sell: "Uza", china_w: "Jumla",
      support: "Msaada", help: "Kituo", shipping_info: "Usafirishaji",
      returns: "Kurudisha", contact: "Wasiliana", payments: "Malipo",
      rights: "Haki zote.", countries: "Kenya - Tanzania - Uganda" },
    errors: { not_found: "Haupatikani.", no_parts: "Hakuna.", generic: "Hitilafu." },
    csv: { title: "CSV", info: "Pakia.", cols: "Safu",
      download: "Kiolezo", drop: "Bonyeza", drop_sub: "5MB",
      processing: "Inashughulikia...", success: "Imekamilika!" },
    seller_hub: {
      welcome: "Karibu tena, ",
      subtitle: "Simamia duka lako. Kadi za \"Hivi karibuni\" zitawashwa hatua kwa hatua.",
      active: "IMEAMILISHWA", soon: "HIVI KARIBUNI",
      prod_count_word: "Bidhaa",
      mod_products_t: "Usimamizi wa bidhaa",
      mod_products_d: "Orodha, bidhaa mpya, ulinganifu, bei, hifadhi",
      mod_csv_t: "Upakiaji wa wingi (CSV)",
      mod_csv_d: "Leta bidhaa nyingi kupitia CSV/Excel",
      mod_orders_t: "Maagizo & Usafirishaji",
      mod_orders_d: "Muhtasari, lebo, ufuatiliaji, marejesho, mizozo",
      mod_finance_t: "Fedha & Malipo",
      mod_finance_d: "Mapato, hali ya malipo, ada, ankara",
      mod_kpi_t: "Utendaji & KPIs",
      mod_kpi_d: "Ukadiriaji, muda wa usafirishaji, viwango vya kufuta/kurudisha, bidhaa bora",
      mod_comm_t: "Mawasiliano & Msaada",
      mod_comm_d: "Kituo cha ujumbe, majibu ya kiotomatiki, tikiti",
      mod_profile_t: "Wasifu & Mipangilio",
      mod_profile_d: "Data ya kampuni, uthibitisho, ujumuishaji wa API, arifa"
    },
    seller_prod: {
      back: "< Rudi", empty_t: "Hakuna bidhaa bado",
      empty_s: "Tengeneza bidhaa yako ya kwanza kwa fomu hapo juu.",
      col_image: "Picha", col_title: "Kichwa", col_brand: "Chapa",
      col_price: "Bei", col_stock: "Hifadhi", col_actions: "Vitendo",
      btn_edit: "Hariri", btn_delete: "Futa",
      summary_new: "+ Tengeneza bidhaa mpya", summary_edit: "Hariri bidhaa",
      f_title: "Kichwa *", f_desc: "Maelezo",
      f_price: "Bei (USD) *", f_stock: "Hifadhi",
      f_brand: "Chapa", f_model: "Mfano",
      f_oem: "Nambari ya OEM", f_condition: "Hali",
      f_cat: "Kategoria", f_tags: "Lebo", f_images: "Picha",
      f_active: "Bidhaa hai (inaonekana sokoni)",
      no_cat: "— Hakuna kategoria —",
      cond_new: "Mpya", cond_used: "Iliyotumika", cond_ref: "Iliyokarabatiwa",
      ph_title: "mf. Pedi za breki za mbele Bosch",
      ph_desc: "Maelezo, hali, sifa maalum...",
      ph_brand: "mf. Bosch", ph_model: "mf. F10",
      ph_oem: "mf. 34116794917", ph_tags: "pedi, mbele, keramik",
      tags_hint: "tenganisha kwa koma, herufi 50 kwa kila lebo",
      images_hint: "max 5, JPG/PNG/WebP, max 2 MB kwa picha",
      images_info: "Imehifadhiwa kwenye Cloudflare R2 katika products/.",
      no_images: "Hakuna picha zilizopakiwa bado.",
      btn_upload: "Pakia picha",
      btn_create: "Tengeneza", btn_update: "Sasisha", btn_cancel: "Ghairi",
      status_loading: "Inapakia...", status_uploading: "Inapakia...",
      status_saving: "Inahifadhi...", status_uploaded: "Imepakiwa",
      t_created: "Imeundwa", t_updated: "Imesasishwa", t_deleted: "Imefutwa",
      err_title_req: "Kichwa kinahitajika",
      err_price_invalid: "Bei batili",
      err_load: "Hitilafu ya kupakia", err_save: "Hitilafu ya kuhifadhi", err_delete: "Hitilafu ya kufuta",
      err_max_5: "Kiwango cha juu picha 5",
      err_only_n: "Picha {n} tu zaidi zinawezekana",
      err_only_jpg: "JPG, PNG au WebP tu: {name}",
      err_too_large: "Kubwa sana (max 2 MB): {name}",
      err_upload_fail: "Upakiaji umeshindwa (HTTP {n})",
      err_upload: "Hitilafu ya upakiaji",
      confirm_delete: "Futa bidhaa hii? Kitendo hiki hakiwezi kutenduliwa."
    }
  },

  ln: {
    nav: { parts: "Bibelelo", shops: "Mabutiku", china: "Bule Chine",
      login: "Kota", register: "Kokoma", logout: "Bima",
      dashboard: "Tableau", admin: "Admin", orders: "Commandes",
      cart: "Panier", language: "Monoko", currency: "Mbongo" },
    home: { hero_badge: "Zando 1", hero_title: "Libelelo -",
      hero_title_em: "Noki", hero_sub: "Bibelelo ya sika",
      search_ph: "Nkombo, OEM...", search_btn: "Koluka",
      pkw_btn: "Biloko ya Mituka", pkw_title: "Biloko ya Mituka", pkw_subtitle: "Pona catégorie",
      pkw_close: "Kanga", pkw_back: "Zonga", pkw_choose: "Pona catégorie", pkw_search_in: "Luka na catégorie",
      banner_pl_hero: "Hero (sima na likolo)", banner_pl_partner: "Esika ya partenaire",
      banner_pl_side_left: "Bannière ya mwasi", banner_pl_side_right: "Bannière ya mobali",
      banner_placement: "Esika", banner_placement_help: "Esika bannière ekomonana",
      seo_admin_title: "Makomi SEO", seo_admin_sub: "Bablok ya makomi na minoko mingi",
      seo_add: "+ Texte SEO ya sika", seo_slug: "Slug", seo_position: "Esika",
      seo_sort: "Mpangilio", seo_active: "Ya kosalela", seo_translations: "Mabongoli",
      seo_title_field: "Motó", seo_body_field: "Makomi (HTML epesami nzela)",
      seo_pl_home_top: "Likolo ya page", seo_pl_home_bottom: "Nse ya page",
      seo_pl_partner: "Eteni ya partenaire", seo_pl_custom: "Mpo na yo",
      seo_save: "Bomba", seo_cancel: "Tika", seo_delete: "Limwisa",
      seo_confirm_delete: "Limwisa texte oyo?", nav_seo: "Makomi SEO",
      stats_parts: "Bibelelo", stats_sellers: "Babateli",
      stats_countries: "Pays", stats_langs: "Minoko",
      featured: "Malamu", featured_sub: "Elingami mingi", view_all: "Nyonso",
      search_all_cats: "Mitindo Nyonso", vc_cat_btn: "Mitindo Nyonso", vc_tree: [{"l":"Moteur & Système d'Entraînement","subs":[{"g":"Bloka ya Moteur & Bibelelo","items":["Bloka ya Moteur","Culasse","Couvercle Soupapes","Carter Huile","Pistons","Anneaux Piston","Arbre Cames","Vilebrequin"]},{"g":"Distribution","items":["Courroie Distribution","Chaîne Distribution","Tendeur Chaîne","Galet Enrouleur","Kit Courroie Distribution","Kit Chaîne Distribution"]},{"g":"Système Carburant","items":["Injecteurs","Pompe Carburant","Pompe Haute Pression","Filtre Carburant","Rail Injecteurs","Régulateur Pression","Capteur Pression Carburant"]},{"g":"Admission Air","items":["Filtre Air","Collecteur Admission","Intercooler","Turbo","Corps Papillon","Débitmètre Air","Durite Admission"]},{"g":"Refroidissement","items":["Radiateur","Thermostat","Pompe Eau","Vase Expansion","Durite Refroidissement","Ventilateur","Visco-coupleur","Sonde Température Eau"]},{"g":"Lubrification","items":["Filtre Huile","Pompe Huile","Capteur Pression Huile","Reniflard","Refroidisseur Huile","Jauge Huile"]},{"g":"Embrayage & Boîte","items":["Kit Embrayage","Volant Bimasse","Roulement Boîte","Arbre Transmission","Joint Homo","Butée Embrayage","Tringle Vitesses","Joint Boîte"]}]},{"l":"Système Frein","subs":[{"g":"Plaquettes Frein","items":["Plaquettes Avant","Plaquettes Arrière","Plaquettes Sport","Jeu Plaquettes avec Témoin"]},{"g":"Disques Frein","items":["Disques Ventilés","Disques Pleins","Disques Percés","Disques Sport","Jeu Disques Frein"]},{"g":"Étriers & Cylindres","items":["Étrier Avant","Étrier Arrière","Mâchoires","Cylindre Roue","Kit Réparation Étrier"]},{"g":"Capteurs ABS / ESP","items":["Capteur ABS","Capteur Vitesse Roue","Calculateur ABS","Pompe ABS","Capteur ESP"]},{"g":"Canalisations Frein","items":["Flexibles Frein","Tuyaux Frein","Répartiteur","Jeu Canalisations","Bocal Liquide Frein"]},{"g":"Frein à Main","items":["Câble Frein Main","Levier Frein Main","Moteur EPB","Mâchoires Arrière","Tambour Frein"]}]},{"l":"Suspension & Direction","subs":[{"g":"Amortisseurs & Ressorts","items":["Amortisseurs Avant","Amortisseurs Arrière","Ressorts Hélicoïdaux","Coupelle Amortisseur","Butée","Soufflet","Kit Sport","Suspension Pneumatique"]},{"g":"Direction","items":["Rotule Direction","Rotule Axiale","Barre Direction","Crémaillère","Pompe Direction","Soufflet Direction","Colonne Direction","Capteur Angle"]},{"g":"Pièces Train Roulant","items":["Triangle Suspension","Rotule Suspension","Silent Bloc Barre","Barre Stabilisatrice","Biellette","Pivot","Berceau","Silentbloc"]},{"g":"Roulements Roue","items":["Roulement Avant","Roulement Arrière","Moyeu Roue","Kit Roulement","Écrou Moyeu"]}]},{"l":"Électrique & Capteurs","subs":[{"g":"Batterie & Charge","items":["Batterie Auto","Alternateur","Démarreur","Régulateur Tension","Câble Charge","Cosse Batterie","Capteur Batterie"]},{"g":"Éclairage","items":["Phare","Feu Arrière","Clignotant","Antibrouillard","Feux Diurnes","Module LED","Ampoules","Lave-Phare"]},{"g":"Capteurs","items":["Débitmètre Air","Capteur MAP","Sonde Lambda","Capteur Vilebrequin","Capteur Arbre Cames","Sonde NOx","Capteur Temp Gaz","Capteur Cliquetis"]},{"g":"Calculateurs","items":["Calculateur Moteur","Calculateur ABS","Module Confort","Module Airbag","Calculateur Boîte"]},{"g":"Commandes & Contacteurs","items":["Commande Vitre","Commodo","Contacteur Démarrage","Klaxon","Commande Rétroviseur","Module Verrouillage"]}]},{"l":"Filtres","subs":[{"g":"Filtres Air","items":["Filtre Air Essence","Filtre Air Diesel","Filtre Air Sport","Filtre Plat"]},{"g":"Filtres Huile","items":["Filtre Huile Cartouche","Filtre Huile Vissé","Carter Filtre Huile","Kit Filtre Huile"]},{"g":"Filtres Carburant","items":["Filtre Carburant Diesel","Filtre Carburant Essence","Filtre Ligne","Pré-Filtre"]},{"g":"Filtres Habitacle","items":["Filtre Pollen","Filtre Charbon Actif","Filtre Combiné","Kit Filtre Habitacle"]}]},{"l":"Carrosserie & Extérieur","subs":[{"g":"Pare-Chocs","items":["Pare-Chocs Avant","Pare-Chocs Arrière","Support Pare-Chocs","Protection Sous-Caisse","Cache Crochet Remorquage"]},{"g":"Ailes & Panneaux","items":["Aile","Capot","Hayon","Panneau Porte","Bas de Caisse","Baguette Toit"]},{"g":"Rétroviseurs","items":["Glace Rétroviseur","Boîtier Rétroviseur","Moteur Rétroviseur","Élément Chauffant","Coque Extérieure"]},{"g":"Lève-Vitres","items":["Moteur Lève-Vitre","Mécanisme Lève-Vitre","Vitre","Joint Vitre"]},{"g":"Serrures & Fermeture","items":["Serrure Porte","Centralisation","Actionneur Serrure","Barillet","Câble Capot","Trappe Carburant"]}]},{"l":"Intérieur & Confort","subs":[{"g":"Sièges & Mécanismes","items":["Rail Siège","Appuie-Tête","Housse Siège","Chauffage Siège","Réglage Siège","Verrou Dossier"]},{"g":"Tableau de Bord & Garnitures","items":["Tableau de Bord","Console Centrale","Vide-Poches","Pare-Soleil","Poignée Intérieure","Moquette"]},{"g":"Climatisation","items":["Compresseur Clim","Condenseur Clim","Évaporateur","Détendeur","Pressostat","Déshydrateur","Tuyau Clim"]},{"g":"Chauffage","items":["Radiateur Chauffage","Moto-Ventilateur Chauffage","Résistance Ventilateur","Robinet Chauffage","Durite Chauffage"]}]},{"l":"Ligne d'Échappement","subs":[{"g":"Collecteur d'Échappement","items":["Collecteur Échappement","Collecteur Turbo","Joint Collecteur","Goujon Collecteur"]},{"g":"Catalyseur","items":["Catalyseur Oxydation","Catalyseur Trois Voies","Catalyseur Diesel","Pré-Catalyseur"]},{"g":"Filtre à Particules","items":["FAP Diesel","FAP Essence OPF","Capteur Pression FAP","Capteur Temp FAP"]},{"g":"Silencieux & Tubes","items":["Silencieux Arrière","Silencieux Central","Tube Central","Tube Intermédiaire","Tube Flexible","Support Échappement"]},{"g":"Sondes Lambda","items":["Sonde Lambda Amont","Sonde Lambda Aval","Sonde Wideband","Sonde NOx","Sonde Chauffée"]}]},{"l":"Roues & Pneumatiques","subs":[{"g":"Jantes","items":["Jantes Alliage","Jantes Acier","Jantes Chrome","Jantes Sport","Jantes Hiver","Roue Complète"]},{"g":"Pneumatiques","items":["Pneus Été","Pneus Hiver","Pneus 4 Saisons","Run-Flat","Pneus Sport","Pneus SUV","Tout-Terrain"]},{"g":"Capteurs TPMS","items":["Capteur TPMS","Valve TPMS","Calculateur TPMS","Outil Programmation TPMS"]},{"g":"Boulons & Écrous Roue","items":["Boulons Roue","Écrous Roue","Goujons Roue","Cache Moyeu","Valve Pneu","Élargisseur Voie"]}]},{"l":"Huiles, Liquides & Produits","subs":[{"g":"Huile Moteur","items":["5W-30","5W-40","10W-40","0W-20","0W-30","Huile Diesel","100% Synthétique","Semi-Synthétique","Longlife"]},{"g":"Huile Boîte","items":["Huile Boîte Mécanique","Huile ATF Auto","Huile DSG / DCT","Huile de Pont","Huile Différentiel"]},{"g":"Liquide de Frein","items":["DOT 4","DOT 5.1","DOT 3","Liquide Frein Long Life"]},{"g":"Liquide Refroidissement","items":["Liquide G12","Liquide G13","Liquide OAT","Concentré Antigel","Liquide Prêt Emploi"]},{"g":"Additifs & Produits","items":["Additif Huile","Additif Carburant","Nettoyant FAP","Désinfectant Clim","Nettoyant Freins","Lubrifiant Chaîne"]}]},{"l":"Accessoires & Pièces d'Usure","subs":[{"g":"Balais Essuie-Glace","items":["Balai Plat","Balai Traditionnel","Balai Arrière","Bras Essuie-Glace","Gicleur"]},{"g":"Ampoules","items":["H4 Halogène","H7 Halogène","Kit LED Retrofit","Xénon D1S","Xénon D2S","Ampoule Habitacle","W5W Veilleuse"]},{"g":"Fusibles","items":["Fusibles Plats","Fusibles Cartucho","Boîtier Fusibles","Relais","Boîtier Relais"]},{"g":"Courroies & Galets","items":["Courroie Trapézoïdale","Courroie Poly-V","Kit Poly-V","Galet Tendeur","Galet Enrouleur","Roue Libre Alternateur"]}]}], vc_cta: "Bibelelo ya Vwature", vc_cta_sub: "Mitindo nyonso →",
      vc: [
        {l:"Bibelelo Kamio",  s:"Vwature ya mosala",  q:"kamio"},
        {l:"Bibelelo Moto",   s:"Mitindo nyonso",     q:"moto"},
        {l:"Pneu",            s:"Eleko · Mbula",      q:"pneu"},
        {l:"Jante",           s:"Fer · Alim",         q:"jante"},
        {l:"Bisaleli",        s:"Pro & Pamba",        q:"bisaleli"},
        {l:"Biloko",          s:"Kati & Libanda",     q:"biloko"},
        {l:"Mafuta Moteur",   s:"Ndenge nyonso",      q:"mafuta"},
        {l:"Filtre",          s:"Mafuta · Mopepe",    q:"filtre"},
        {l:"Frein",           s:"Pedi · Diski",       q:"frein"}
      ],
      categories: "Mitindo", china_title: "Chine", china_sub: "Prix",
      why_title: "Mpo nini?",
      features: [["OEM","OEM"],["Mobile Money","MTN"],["Logistique","DHL"],
        ["Chine","Direkt"],["Bosolo","Mataliami"],
        ["Minoko 10","EN - FR - PT - DE - ES - AR - TR - SW - LN"]] },
    product: { add_cart: "Tia", buy_now: "Sombela", condition: "Boyo",
      new: "Sika", used: "Kala", refurbished: "Elongolama",
      brand: "Marque", model: "Modele", year: "Mobu", oem: "OEM",
      location: "Esika", moq: "Moke", stock: "ezali", out_stock: "Te",
      seller: "Mobateli", description: "Toli", view_shop: "Boutique", added: "Etiali!" },
    cart: { title: "Panier", empty: "Mpamba.", subtotal: "Moke",
      checkout: "Bakisa", continue: "Kokoba", clear: "Futa", items: "biloko" },
    checkout: { title: "Bakisa", items: "Biloko", shipping: "Komema",
      payment: "Bakisa", address: "Adresse", place_order: "Tinda",
      mobile_money: "Mobile Money", bank: "Banque", cod: "Livraison",
      name: "Nkombo", city: "Ville", country: "Pays", addr: "Adresse",
      phone: "Telephone", select_ship: "Tondela.", success: "Etindami!" },
    orders: { title: "Commandes", number: "Commande #", date: "Mokolo",
      total: "Nyonso", status: "Boyo", no_orders: "Te.",
      details: "Toli", payment: "Bakisa", shipping: "Komema" },
    auth: { email: "Email", password: "Ndeko", confirm: "Sangisa",
      name: "Nkombo", phone: "Telephone", country: "Pays", role: "Nalingi",
      buyer: "Kosomba", seller: "Koteka", login_btn: "Kota",
      register_btn: "Compte", forgot: "Obosana?", no_account: "Sika?",
      have_account: "Compte?", china_seller: "Grossiste",
      mismatch: "Ndenge moko te.", fill_all: "Tondela." },
    seller: { products: "Biloko", shop: "Boutique", csv_import: "CSV",
      add_product: "Fungola", deactivate: "Kanga", activate: "Fungola",
      pending: "Kozela", live: "Mosala", shop_saved: "Ebombami!", submitted: "Etindami!" },
    admin: { overview: "Nyonso", users: "Bato", shops: "Mabutiku",
      products: "Biloko", orders_all: "Commandes", categories: "Mitindo",
      approve: "Akordi", remove: "Longola", delete: "Futa",
      enable: "Fungola", disable: "Kanga", add_cat: "Fungola",
      cat_name: "Nkombo", cat_slug: "slug", cat_icon: "Icon" },
    filter: { all: "Nyonso", condition: "Boyo", brand: "Marque",
      origin: "Esika", china_only: "Grossiste", search: "Koluka",
      reset: "Boyekola", load_more: "Mosusu", showing: "Komonisa",
      of: "ya", parts: "bibelelo" },
    shop: { african: "Afrique", china: "Chine", no_shops: "Te.",
      products_from: "Biloko ya", whatsapp: "WhatsApp", wechat: "WeChat",
      alibaba: "Alibaba", pending: "Ezolela.", create: "Sala", save: "Bomba" },
    footer: { tagline: "Zando.", marketplace: "Zando",
      browse: "Tala", sell: "Teka", china_w: "Bule",
      support: "Lisalisi", help: "Centre", shipping_info: "Komema",
      returns: "Kozonga", contact: "Koyokana", payments: "Bakisa",
      rights: "Makoki.", countries: "RDC - Congo" },
    errors: { not_found: "Te.", no_parts: "Te.", generic: "Nzela." },
    csv: { title: "CSV", info: "Tia CSV.", cols: "Colonnes",
      download: "Modele", drop: "Klike", drop_sub: "5MB",
      processing: "Kolanda...", success: "Ekomi!" }
  }
};

const RTL = ['ar'];

/* ---------- Products Page i18n (Autodoc-style) ---------- */
(function () {
  var PP = {
    en: {
      vehicle_title: "Select your vehicle to find parts",
      select_brand: "Select brand", select_model: "Select model", select_engine: "Select engine type", select_part: "Select car part",
      no_models: "No models listed",
      search: "Search",
      hsn_title: "Search by VIN / Key Number", hsn_4: "4-digit", hsn_3: "3-digit",
      hsn_hint_1: "Field 2.1 of registration", hsn_hint_2: "Field 2.2 of registration",
      hsn_tooltip: "Find your HSN/TSN on the vehicle registration document",
      hsn_enter_both: "Please enter both numbers",
      not_found_link: "Can't find your car in the catalog?",
      loading: "Loading...",
      results_for: "results found for",
      all_parts: "all parts",
      choose_cat: "Choose a category", all_categories: "All Categories",
      items: "items",
      sort_by: "Sort by:", sort_recommended: "Recommended",
      sort_price_asc: "Price: low to high", sort_price_desc: "Price: high to low",
      sort_newest: "Newest first",
      article_num: "Article #:", reviews_word: "Reviews",
      in_stock: "In Stock", out_of_stock: "Out of stock", only_left: "Only {n} left",
      vs_rrp: "vs RRP", incl_vat: "Incl. VAT", ship_at_checkout: "Shipping calculated at checkout",
      sold_by: "Sold by", verified: "AFRICARPARTS Verified", wholesale_supplier: "Wholesale Supplier",
      no_image: "No image",
      spec_condition: "Condition:", spec_brand: "Brand:", spec_model: "Model:",
      spec_year: "Year:", spec_oem: "OEM No.:", spec_location: "Location:",
      spec_moq: "Min. Order:", spec_pcs: "pcs",
      prev: "‹ Prev", next: "Next ›", page: "Page", page_of: "of"
    },
    de: {
      vehicle_title: "Fahrzeug auswählen, um Teile zu finden",
      select_brand: "Marke auswählen", select_model: "Modell auswählen", select_engine: "Motor (Typ) auswählen", select_part: "Autoteil auswählen",
      no_models: "Keine Modelle gelistet",
      search: "Suchen",
      hsn_title: "Ersatzteile per Schlüsselnummer suchen", hsn_4: "4-stellig", hsn_3: "3-stellig",
      hsn_hint_1: "Feld 2.1 des Fahrzeugscheins", hsn_hint_2: "Feld 2.2 des Fahrzeugscheins",
      hsn_tooltip: "HSN/TSN finden Sie im Fahrzeugschein",
      hsn_enter_both: "Bitte beide Nummern eingeben",
      not_found_link: "Sie können Ihr Auto nicht im Katalog finden?",
      loading: "Laden...",
      results_for: "Treffer gefunden für",
      all_parts: "alle Teile",
      choose_cat: "Wählen Sie die gewünschte Kategorie", all_categories: "Alle Kategorien",
      items: "Artikel",
      sort_by: "Sortieren nach:", sort_recommended: "Empfohlen",
      sort_price_asc: "Preis: aufsteigend", sort_price_desc: "Preis: absteigend",
      sort_newest: "Neueste zuerst",
      article_num: "Artikelnr.:", reviews_word: "Bewertungen",
      in_stock: "Auf Lager", out_of_stock: "Nicht auf Lager", only_left: "Nur noch {n}",
      vs_rrp: "ggü. UVP", incl_vat: "Inkl. MwSt.", ship_at_checkout: "Versand bei Kasse berechnet",
      sold_by: "Verkauft von", verified: "AFRICARPARTS Verifiziert", wholesale_supplier: "Großhandelslieferant",
      no_image: "Kein Bild",
      spec_condition: "Zustand:", spec_brand: "Marke:", spec_model: "Modell:",
      spec_year: "Jahr:", spec_oem: "OEM-Nr.:", spec_location: "Standort:",
      spec_moq: "Mindestbestellung:", spec_pcs: "Stück",
      prev: "‹ Zurück", next: "Weiter ›", page: "Seite", page_of: "von"
    },
    fr: {
      vehicle_title: "Sélectionnez votre véhicule pour trouver des pièces",
      select_brand: "Choisir une marque", select_model: "Choisir un modèle", select_engine: "Choisir un type de moteur", select_part: "Choisir une pièce",
      no_models: "Aucun modèle listé",
      search: "Rechercher",
      hsn_title: "Recherche par numéro de clé", hsn_4: "4 chiffres", hsn_3: "3 chiffres",
      hsn_hint_1: "Champ 2.1 de la carte grise", hsn_hint_2: "Champ 2.2 de la carte grise",
      hsn_tooltip: "HSN/TSN se trouve sur la carte grise",
      hsn_enter_both: "Veuillez saisir les deux numéros",
      not_found_link: "Vous ne trouvez pas votre voiture dans le catalogue ?",
      loading: "Chargement...",
      results_for: "résultats trouvés pour",
      all_parts: "toutes les pièces",
      choose_cat: "Choisissez une catégorie", all_categories: "Toutes catégories",
      items: "articles",
      sort_by: "Trier par :", sort_recommended: "Recommandé",
      sort_price_asc: "Prix : croissant", sort_price_desc: "Prix : décroissant",
      sort_newest: "Plus récents d'abord",
      article_num: "Article # :", reviews_word: "Avis",
      in_stock: "En stock", out_of_stock: "Rupture de stock", only_left: "Plus que {n}",
      vs_rrp: "vs PVR", incl_vat: "TVA incluse", ship_at_checkout: "Livraison calculée à la caisse",
      sold_by: "Vendu par", verified: "AFRICARPARTS Vérifié", wholesale_supplier: "Grossiste",
      no_image: "Aucune image",
      spec_condition: "État :", spec_brand: "Marque :", spec_model: "Modèle :",
      spec_year: "Année :", spec_oem: "Réf. OEM :", spec_location: "Lieu :",
      spec_moq: "Cmde min. :", spec_pcs: "pièces",
      prev: "‹ Précédent", next: "Suivant ›", page: "Page", page_of: "sur"
    },
    pt: {
      vehicle_title: "Selecione o seu veículo para encontrar peças",
      select_brand: "Selecionar marca", select_model: "Selecionar modelo", select_engine: "Selecionar tipo de motor", select_part: "Selecionar peça",
      no_models: "Nenhum modelo listado",
      search: "Pesquisar",
      hsn_title: "Pesquisar por número-chave", hsn_4: "4 dígitos", hsn_3: "3 dígitos",
      hsn_hint_1: "Campo 2.1 do registo", hsn_hint_2: "Campo 2.2 do registo",
      hsn_tooltip: "HSN/TSN encontra-se no livrete",
      hsn_enter_both: "Por favor insira ambos os números",
      not_found_link: "Não encontra o seu carro no catálogo?",
      loading: "A carregar...",
      results_for: "resultados encontrados para",
      all_parts: "todas as peças",
      choose_cat: "Escolha uma categoria", all_categories: "Todas as categorias",
      items: "artigos",
      sort_by: "Ordenar por:", sort_recommended: "Recomendado",
      sort_price_asc: "Preço: crescente", sort_price_desc: "Preço: decrescente",
      sort_newest: "Mais recentes primeiro",
      article_num: "Artigo #:", reviews_word: "Avaliações",
      in_stock: "Em stock", out_of_stock: "Sem stock", only_left: "Apenas {n}",
      vs_rrp: "vs PVPR", incl_vat: "IVA incluído", ship_at_checkout: "Envio calculado no checkout",
      sold_by: "Vendido por", verified: "AFRICARPARTS Verificado", wholesale_supplier: "Fornecedor grossista",
      no_image: "Sem imagem",
      spec_condition: "Estado:", spec_brand: "Marca:", spec_model: "Modelo:",
      spec_year: "Ano:", spec_oem: "Nº OEM:", spec_location: "Localização:",
      spec_moq: "Enc. mín.:", spec_pcs: "peças",
      prev: "‹ Anterior", next: "Seguinte ›", page: "Página", page_of: "de"
    },
    es: {
      vehicle_title: "Selecciona tu vehículo para buscar piezas",
      select_brand: "Seleccionar marca", select_model: "Seleccionar modelo", select_engine: "Seleccionar tipo de motor", select_part: "Seleccionar pieza",
      no_models: "Sin modelos listados",
      search: "Buscar",
      hsn_title: "Buscar por número de clave", hsn_4: "4 dígitos", hsn_3: "3 dígitos",
      hsn_hint_1: "Campo 2.1 del permiso", hsn_hint_2: "Campo 2.2 del permiso",
      hsn_tooltip: "Encuentra HSN/TSN en el permiso del vehículo",
      hsn_enter_both: "Por favor ingresa ambos números",
      not_found_link: "¿No encuentras tu coche en el catálogo?",
      loading: "Cargando...",
      results_for: "resultados encontrados para",
      all_parts: "todas las piezas",
      choose_cat: "Elige una categoría", all_categories: "Todas las categorías",
      items: "artículos",
      sort_by: "Ordenar por:", sort_recommended: "Recomendado",
      sort_price_asc: "Precio: ascendente", sort_price_desc: "Precio: descendente",
      sort_newest: "Más recientes primero",
      article_num: "Artículo #:", reviews_word: "Reseñas",
      in_stock: "En stock", out_of_stock: "Sin stock", only_left: "Solo {n}",
      vs_rrp: "vs PVR", incl_vat: "IVA incluido", ship_at_checkout: "Envío calculado al pagar",
      sold_by: "Vendido por", verified: "AFRICARPARTS Verificado", wholesale_supplier: "Proveedor mayorista",
      no_image: "Sin imagen",
      spec_condition: "Estado:", spec_brand: "Marca:", spec_model: "Modelo:",
      spec_year: "Año:", spec_oem: "Nº OEM:", spec_location: "Ubicación:",
      spec_moq: "Pedido mín.:", spec_pcs: "uds.",
      prev: "‹ Anterior", next: "Siguiente ›", page: "Página", page_of: "de"
    },
    ar: {
      vehicle_title: "اختر مركبتك للعثور على القطع",
      select_brand: "اختر العلامة", select_model: "اختر الموديل", select_engine: "اختر نوع المحرك", select_part: "اختر قطعة الغيار",
      no_models: "لا توجد موديلات",
      search: "بحث",
      hsn_title: "البحث برقم المفتاح", hsn_4: "4 خانات", hsn_3: "3 خانات",
      hsn_hint_1: "الحقل 2.1 من الرخصة", hsn_hint_2: "الحقل 2.2 من الرخصة",
      hsn_tooltip: "ابحث عن HSN/TSN في رخصة المركبة",
      hsn_enter_both: "يرجى إدخال كلا الرقمين",
      not_found_link: "لا تجد سيارتك في الكتالوج؟",
      loading: "تحميل...",
      results_for: "نتيجة لـ",
      all_parts: "كل القطع",
      choose_cat: "اختر فئة", all_categories: "كل الفئات",
      items: "منتج",
      sort_by: "ترتيب حسب:", sort_recommended: "موصى به",
      sort_price_asc: "السعر: من الأقل", sort_price_desc: "السعر: من الأعلى",
      sort_newest: "الأحدث أولاً",
      article_num: "رقم القطعة:", reviews_word: "تقييمات",
      in_stock: "متوفر", out_of_stock: "غير متوفر", only_left: "متبقي {n} فقط",
      vs_rrp: "مقابل السعر الموصى", incl_vat: "شامل الضريبة", ship_at_checkout: "يحسب الشحن عند الدفع",
      sold_by: "بائع", verified: "AFRICARPARTS موثق", wholesale_supplier: "مورد جملة",
      no_image: "لا توجد صورة",
      spec_condition: "الحالة:", spec_brand: "الماركة:", spec_model: "الموديل:",
      spec_year: "السنة:", spec_oem: "رقم OEM:", spec_location: "الموقع:",
      spec_moq: "الحد الأدنى:", spec_pcs: "قطعة",
      prev: "‹ السابق", next: "التالي ›", page: "صفحة", page_of: "من"
    },
    tr: {
      vehicle_title: "Parça bulmak için aracınızı seçin",
      select_brand: "Marka seçin", select_model: "Model seçin", select_engine: "Motor tipi seçin", select_part: "Parça seçin",
      no_models: "Model yok",
      search: "Ara",
      hsn_title: "Anahtar numarası ile ara", hsn_4: "4 haneli", hsn_3: "3 haneli",
      hsn_hint_1: "Ruhsat alanı 2.1", hsn_hint_2: "Ruhsat alanı 2.2",
      hsn_tooltip: "HSN/TSN aracın ruhsatında bulunur",
      hsn_enter_both: "Lütfen her iki numarayı girin",
      not_found_link: "Aracınızı katalogda bulamıyor musunuz?",
      loading: "Yükleniyor...",
      results_for: "sonuç bulundu:",
      all_parts: "tüm parçalar",
      choose_cat: "Kategori seçin", all_categories: "Tüm Kategoriler",
      items: "ürün",
      sort_by: "Sırala:", sort_recommended: "Önerilen",
      sort_price_asc: "Fiyat: artan", sort_price_desc: "Fiyat: azalan",
      sort_newest: "En yeni",
      article_num: "Ürün No:", reviews_word: "Değerlendirmeler",
      in_stock: "Stokta", out_of_stock: "Stokta yok", only_left: "Sadece {n} kaldı",
      vs_rrp: "TPF'ye karşı", incl_vat: "KDV dahil", ship_at_checkout: "Kargo ödemede hesaplanır",
      sold_by: "Satıcı", verified: "AFRICARPARTS Onaylı", wholesale_supplier: "Toptan Tedarikçi",
      no_image: "Resim yok",
      spec_condition: "Durum:", spec_brand: "Marka:", spec_model: "Model:",
      spec_year: "Yıl:", spec_oem: "OEM No:", spec_location: "Konum:",
      spec_moq: "Min. sipariş:", spec_pcs: "adet",
      prev: "‹ Önceki", next: "Sonraki ›", page: "Sayfa", page_of: "/"
    },
    sw: {
      vehicle_title: "Chagua gari lako kupata vipuri",
      select_brand: "Chagua chapa", select_model: "Chagua modeli", select_engine: "Chagua aina ya injini", select_part: "Chagua kipuri",
      no_models: "Hakuna modeli",
      search: "Tafuta",
      hsn_title: "Tafuta kwa namba ya ufunguo", hsn_4: "Tarakimu 4", hsn_3: "Tarakimu 3",
      hsn_hint_1: "Sehemu 2.1 ya leseni", hsn_hint_2: "Sehemu 2.2 ya leseni",
      hsn_tooltip: "HSN/TSN inapatikana kwenye leseni ya gari",
      hsn_enter_both: "Tafadhali ingiza namba zote mbili",
      not_found_link: "Huwezi kupata gari lako kwenye katalogi?",
      loading: "Inapakia...",
      results_for: "matokeo yaliyopatikana kwa",
      all_parts: "vipuri vyote",
      choose_cat: "Chagua kategoria", all_categories: "Kategoria Zote",
      items: "vitu",
      sort_by: "Panga kwa:", sort_recommended: "Inapendekezwa",
      sort_price_asc: "Bei: chini-juu", sort_price_desc: "Bei: juu-chini",
      sort_newest: "Mpya kwanza",
      article_num: "Namba ya kipande:", reviews_word: "Tathmini",
      in_stock: "Inapatikana", out_of_stock: "Imeisha", only_left: "Imebaki {n} tu",
      vs_rrp: "vs Bei iliyopendekezwa", incl_vat: "Pamoja na VAT", ship_at_checkout: "Usafirishaji utahesabiwa",
      sold_by: "Inauzwa na", verified: "AFRICARPARTS Imehakikishwa", wholesale_supplier: "Mwuza Jumla",
      no_image: "Hakuna picha",
      spec_condition: "Hali:", spec_brand: "Chapa:", spec_model: "Modeli:",
      spec_year: "Mwaka:", spec_oem: "OEM No.:", spec_location: "Mahali:",
      spec_moq: "Agizo la chini:", spec_pcs: "vipande",
      prev: "‹ Iliyopita", next: "Inayofuata ›", page: "Ukurasa", page_of: "wa"
    },
    ln: {
      vehicle_title: "Pona motuka mpo na koluka biloko",
      select_brand: "Pona marque", select_model: "Pona modèle", select_engine: "Pona type ya moteur", select_part: "Pona eloko ya motuka",
      no_models: "Modèle te",
      search: "Luka",
      hsn_title: "Luka na nimero ya fungola", hsn_4: "Mituya 4", hsn_3: "Mituya 3",
      hsn_hint_1: "Esika 2.1 ya papier", hsn_hint_2: "Esika 2.2 ya papier",
      hsn_tooltip: "HSN/TSN ezali na papier ya motuka",
      hsn_enter_both: "Tia mituya nyonso mibale",
      not_found_link: "Motuka na yo ezali na catalogue te?",
      loading: "Kozela...",
      results_for: "biloko bizwami mpo na",
      all_parts: "biloko nyonso",
      choose_cat: "Pona catégorie", all_categories: "Catégories nyonso",
      items: "biloko",
      sort_by: "Tia na molongo:", sort_recommended: "Lipendekezo",
      sort_price_asc: "Talo: moke-monene", sort_price_desc: "Talo: monene-moke",
      sort_newest: "Ya sika liboso",
      article_num: "Numéro ya eloko:", reviews_word: "Avis",
      in_stock: "Ezali", out_of_stock: "Esili", only_left: "Etikali {n} kaka",
      vs_rrp: "vs Talo ya likolo", incl_vat: "Na TVA", ship_at_checkout: "Kotinda ekokalkulama",
      sold_by: "Etekisami na", verified: "AFRICARPARTS Endimami", wholesale_supplier: "Motekisi ya gros",
      no_image: "Foto te",
      spec_condition: "Lolenge:", spec_brand: "Marque:", spec_model: "Modèle:",
      spec_year: "Mobu:", spec_oem: "OEM No.:", spec_location: "Esika:",
      spec_moq: "Commande ya moke:", spec_pcs: "biloko",
      prev: "‹ Liboso", next: "Sima ›", page: "Lokasa", page_of: "ya"
    }
  };
  Object.keys(PP).forEach(function (lang) {
    if (I18N[lang]) I18N[lang].pp = PP[lang];
  });
})();

/* ---------- HOME SEO LONG-TEXT (i18n) ----------
   Statischer Marketing-Block der Startseite, jetzt mehrsprachig.
   5 Prioritätssprachen gepflegt; übrige Sprachen fallen via t() auf EN zurück.
   (Editierbare SEO-Texte werden separat über Admin -> SEO-Texte verwaltet.) */
(function () {
  var SEOBLK = {
    en: {
      h2: "Buy, sell or wholesale auto spare parts across Africa? AFRICARPARTS!",
      lead: "Discover everything auto on AFRICARPARTS — from cars and motorcycles to e-bikes and trucks — and get an overview of the whole mobility market. Thousands of new parts wait for you every day.",
      h3: "AFRICARPARTS is Africa's largest auto-parts marketplace",
      p_buy: "On AFRICARPARTS you can easily buy or sell car parts — used or new, OEM or aftermarket. Whether small car, SUV or premium, we've got the part you need.",
      p_sell: "Sell your used auto parts and connect with new & used part dealers. Get informed about brands & models, financing and monthly rates, plus wholesale offers from verified suppliers. We also offer useful guides, tests, advice and e-mobility news.",
      tip_label: "Tip:",
      tip_body: "With a customer account you always stay up to date. Access your saved parts from any device, store your searches and receive the latest offers:",
      register: "Register / Login",
      intl_label: "AFRICARPARTS is also international:",
      used_t: "Want to buy used parts?",
      used_d: "Discover thousands of listings, compare them and contact sellers directly — professional dealers or private sellers. Find company surplus or refurbished parts, with warranty and quality seal.",
      used_cta: "Buy used parts",
      new_t: "Want to buy new parts?",
      new_d: "A huge selection of new parts with modern technology, comprehensive warranty and optimal compatibility — for a worry-free experience.",
      new_cta: "Buy new parts",
      whole_t: "Want to buy wholesale?",
      whole_d: "Whether retail or wholesale, you'll find what you need. Search the wholesale offers from our verified suppliers.",
      whole_cta: "Find wholesale offers",
      sell_t: "Want to sell parts?",
      sell_d: "Sell your used parts here for free. Simple and convenient — for maximum price per listing or a fast express sale at an AFRICARPARTS purchase station.",
      sell_cta: "Sell parts"
    },
    de: {
      h2: "Autoersatzteile kaufen, verkaufen oder im Großhandel – in ganz Afrika? AFRICARPARTS!",
      lead: "Entdecke alles rund ums Auto auf AFRICARPARTS – von Pkw und Motorrädern über E-Bikes bis zu Lkw – und verschaffe dir einen Überblick über den gesamten Mobilitätsmarkt. Täglich warten Tausende neue Teile auf dich.",
      h3: "AFRICARPARTS ist Afrikas größter Marktplatz für Autoteile",
      p_buy: "Auf AFRICARPARTS kaufst und verkaufst du Autoteile ganz einfach – gebraucht oder neu, OEM oder Aftermarket. Ob Kleinwagen, SUV oder Premium: Wir haben das passende Teil für dich.",
      p_sell: "Verkaufe deine gebrauchten Autoteile und nimm Kontakt zu Neu- und Gebrauchtteilehändlern auf. Informiere dich über Marken & Modelle, Finanzierung und Monatsraten sowie Großhandelsangebote von geprüften Lieferanten. Außerdem bieten wir nützliche Ratgeber, Tests, Tipps und News zur E-Mobilität.",
      tip_label: "Tipp:",
      tip_body: "Mit einem Kundenkonto bleibst du immer auf dem Laufenden. Greife von jedem Gerät auf deine gespeicherten Teile zu, sichere deine Suchen und erhalte die neuesten Angebote:",
      register: "Registrieren / Anmelden",
      intl_label: "AFRICARPARTS ist auch international:",
      used_t: "Gebrauchtteile kaufen?",
      used_d: "Entdecke Tausende Inserate, vergleiche sie und kontaktiere Verkäufer direkt – Händler oder Privatverkäufer. Finde z. B. Firmenrestposten oder aufbereitete Teile, mit Garantie und Qualitätssiegel.",
      used_cta: "Gebrauchtteile kaufen",
      new_t: "Neuteile kaufen?",
      new_d: "Eine riesige Auswahl an Neuteilen mit moderner Technik, umfassender Garantie und optimaler Kompatibilität – für ein sorgenfreies Erlebnis.",
      new_cta: "Neuteile kaufen",
      whole_t: "Im Großhandel kaufen?",
      whole_d: "Ob Einzel- oder Großhandel – hier findest du, was du brauchst. Durchsuche die Großhandelsangebote unserer geprüften Lieferanten.",
      whole_cta: "Großhandelsangebote finden",
      sell_t: "Teile verkaufen?",
      sell_d: "Verkaufe deine gebrauchten Teile hier kostenlos. Einfach und bequem – für den besten Preis pro Inserat oder einen schnellen Express-Verkauf an einer AFRICARPARTS-Ankaufstation.",
      sell_cta: "Teile verkaufen"
    },
    fr: {
      h2: "Acheter, vendre ou commander en gros des pièces auto à travers l'Afrique ? AFRICARPARTS !",
      lead: "Découvrez tout l'univers auto sur AFRICARPARTS – des voitures et motos aux vélos électriques et camions – et obtenez une vue d'ensemble du marché de la mobilité. Des milliers de pièces neuves vous attendent chaque jour.",
      h3: "AFRICARPARTS est la plus grande marketplace de pièces auto d'Afrique",
      p_buy: "Sur AFRICARPARTS, achetez ou vendez facilement des pièces auto – d'occasion ou neuves, OEM ou aftermarket. Citadine, SUV ou premium : nous avons la pièce qu'il vous faut.",
      p_sell: "Vendez vos pièces d'occasion et contactez des vendeurs de pièces neuves et d'occasion. Informez-vous sur les marques et modèles, le financement et les mensualités, ainsi que sur les offres en gros de fournisseurs vérifiés. Nous proposons aussi des guides, tests, conseils et actualités sur l'e-mobilité.",
      tip_label: "Astuce :",
      tip_body: "Avec un compte client, restez toujours informé. Accédez à vos pièces enregistrées depuis n'importe quel appareil, sauvegardez vos recherches et recevez les dernières offres :",
      register: "S'inscrire / Se connecter",
      intl_label: "AFRICARPARTS est aussi international :",
      used_t: "Acheter des pièces d'occasion ?",
      used_d: "Découvrez des milliers d'annonces, comparez-les et contactez directement les vendeurs – professionnels ou particuliers. Trouvez des surplus d'entreprise ou des pièces reconditionnées, avec garantie et label qualité.",
      used_cta: "Acheter des pièces d'occasion",
      new_t: "Acheter des pièces neuves ?",
      new_d: "Un large choix de pièces neuves avec une technologie moderne, une garantie complète et une compatibilité optimale – pour une expérience sans souci.",
      new_cta: "Acheter des pièces neuves",
      whole_t: "Acheter en gros ?",
      whole_d: "Détail ou gros, vous trouverez ce qu'il vous faut. Parcourez les offres en gros de nos fournisseurs vérifiés.",
      whole_cta: "Voir les offres en gros",
      sell_t: "Vendre des pièces ?",
      sell_d: "Vendez vos pièces d'occasion gratuitement. Simple et pratique – pour le meilleur prix par annonce ou une vente express dans une station d'achat AFRICARPARTS.",
      sell_cta: "Vendre des pièces"
    },
    pt: {
      h2: "Comprar, vender ou adquirir peças auto no atacado em toda a África? AFRICARPARTS!",
      lead: "Descubra tudo sobre automóveis na AFRICARPARTS – de carros e motos a e-bikes e camiões – e tenha uma visão geral de todo o mercado de mobilidade. Milhares de peças novas esperam por si todos os dias.",
      h3: "A AFRICARPARTS é o maior marketplace de peças auto de África",
      p_buy: "Na AFRICARPARTS pode comprar ou vender peças com facilidade – usadas ou novas, OEM ou aftermarket. Seja citadino, SUV ou premium: temos a peça de que precisa.",
      p_sell: "Venda as suas peças usadas e contacte vendedores de peças novas e usadas. Informe-se sobre marcas e modelos, financiamento e prestações mensais, além de ofertas de atacado de fornecedores verificados. Oferecemos também guias, testes, conselhos e notícias sobre e-mobilidade.",
      tip_label: "Dica:",
      tip_body: "Com uma conta de cliente está sempre atualizado. Aceda às suas peças guardadas em qualquer dispositivo, guarde as suas pesquisas e receba as últimas ofertas:",
      register: "Registar / Entrar",
      intl_label: "A AFRICARPARTS também é internacional:",
      used_t: "Quer comprar peças usadas?",
      used_d: "Descubra milhares de anúncios, compare-os e contacte vendedores diretamente – profissionais ou particulares. Encontre excedentes de empresas ou peças recondicionadas, com garantia e selo de qualidade.",
      used_cta: "Comprar peças usadas",
      new_t: "Quer comprar peças novas?",
      new_d: "Uma enorme seleção de peças novas com tecnologia moderna, garantia abrangente e compatibilidade ideal – para uma experiência sem preocupações.",
      new_cta: "Comprar peças novas",
      whole_t: "Quer comprar no atacado?",
      whole_d: "Seja a retalho ou no atacado, encontra o que precisa. Pesquise as ofertas de atacado dos nossos fornecedores verificados.",
      whole_cta: "Ver ofertas de atacado",
      sell_t: "Quer vender peças?",
      sell_d: "Venda as suas peças usadas gratuitamente. Simples e cómodo – pelo melhor preço por anúncio ou uma venda expresso numa estação de compra AFRICARPARTS.",
      sell_cta: "Vender peças"
    },
    sw: {
      h2: "Nunua, uza au pata jumla vipuri vya magari kote Afrika? AFRICARPARTS!",
      lead: "Gundua kila kitu kuhusu magari kwenye AFRICARPARTS – kutoka magari na pikipiki hadi baiskeli za umeme na malori – na upate muhtasari wa soko zima la usafiri. Maelfu ya vipuri vipya vinakusubiri kila siku.",
      h3: "AFRICARPARTS ni soko kubwa zaidi la vipuri vya magari barani Afrika",
      p_buy: "Kwenye AFRICARPARTS unaweza kununua au kuuza vipuri kwa urahisi – vilivyotumika au vipya, OEM au aftermarket. Iwe gari dogo, SUV au la kifahari: tuna kipuri unachohitaji.",
      p_sell: "Uza vipuri vyako vilivyotumika na uwasiliane na wauzaji wa vipuri vipya na vilivyotumika. Pata taarifa kuhusu chapa na miundo, ufadhili na malipo ya kila mwezi, pamoja na ofa za jumla kutoka kwa wasambazaji walioidhinishwa. Pia tunatoa miongozo, majaribio, ushauri na habari za usafiri wa umeme.",
      tip_label: "Kidokezo:",
      tip_body: "Kwa akaunti ya mteja unabaki na taarifa za hivi punde kila wakati. Fikia vipuri vyako vilivyohifadhiwa kutoka kifaa chochote, hifadhi utafutaji wako na upokee ofa mpya:",
      register: "Jisajili / Ingia",
      intl_label: "AFRICARPARTS pia ni ya kimataifa:",
      used_t: "Unataka kununua vipuri vilivyotumika?",
      used_d: "Gundua maelfu ya matangazo, vilinganishe na uwasiliane na wauzaji moja kwa moja – wafanyabiashara au watu binafsi. Pata vipuri vya ziada vya kampuni au vilivyokarabatiwa, vyenye dhamana na muhuri wa ubora.",
      used_cta: "Nunua vipuri vilivyotumika",
      new_t: "Unataka kununua vipuri vipya?",
      new_d: "Uteuzi mkubwa wa vipuri vipya wenye teknolojia ya kisasa, dhamana kamili na ulinganifu bora – kwa uzoefu bila wasiwasi.",
      new_cta: "Nunua vipuri vipya",
      whole_t: "Unataka kununua kwa jumla?",
      whole_d: "Iwe reja reja au jumla, utapata unachohitaji. Tafuta ofa za jumla kutoka kwa wasambazaji wetu walioidhinishwa.",
      whole_cta: "Pata ofa za jumla",
      sell_t: "Unataka kuuza vipuri?",
      sell_d: "Uza vipuri vyako vilivyotumika hapa bila malipo. Rahisi na rahisi kutumia – kwa bei bora kwa kila tangazo au mauzo ya haraka kwenye kituo cha ununuzi cha AFRICARPARTS.",
      sell_cta: "Uza vipuri"
    }
  };
  if (typeof I18N !== "undefined") {
    Object.keys(SEOBLK).forEach(function (lang) {
      if (I18N[lang]) I18N[lang].seoblk = SEOBLK[lang];
    });
  }
})();

/* ---------- FOOTER-CMS i18n (Namespace: footerx) ---------- */
(function () {
  const FOOTERX = {
    en: {
      company: "Company", about: "About us", blog: "Blog", faq: "FAQ", contact: "Contact",
      terms: "Terms & Conditions", privacy: "Privacy", cookies: "Cookies", dealer_terms: "Seller Terms", imprint: "Legal Notice",
      c_title: "Contact us", c_intro: "Questions, feedback or a problem with an order? Write to us - we usually reply within 24 hours.",
      c_name: "Your name", c_email: "Your email", c_msg: "Your message", c_send: "Send message",
      c_hint: "The button opens your email app with the message pre-filled.",
      adm_title: "Footer & Pages", adm_desc: "Edit footer pages (About, Blog, FAQ, Terms, Privacy, Cookies) per language and the contact email",
      adm_page: "Page", adm_lang: "Language", adm_f_title: "Page title", adm_f_body: "Content (blank line = new paragraph)",
      adm_save: "Save page", adm_saved: "Saved", adm_email_t: "Contact email",
      adm_email_d: "The contact form sends messages to this address.", adm_email_save: "Save email"
    },
    de: {
      company: "Unternehmen", about: "Über uns", blog: "Blog", faq: "FAQ", contact: "Kontakt",
      terms: "AGB", privacy: "Datenschutz", cookies: "Cookies", dealer_terms: "Händler-AGB", imprint: "Impressum",
      c_title: "Kontaktiere uns", c_intro: "Fragen, Feedback oder ein Problem mit einer Bestellung? Schreib uns - wir antworten in der Regel innerhalb von 24 Stunden.",
      c_name: "Dein Name", c_email: "Deine E-Mail", c_msg: "Deine Nachricht", c_send: "Nachricht senden",
      c_hint: "Der Button öffnet dein E-Mail-Programm mit der vorausgefüllten Nachricht.",
      adm_title: "Footer & Seiten", adm_desc: "Footer-Seiten (Über uns, Blog, FAQ, AGB, Datenschutz, Cookies) je Sprache und die Kontakt-E-Mail bearbeiten",
      adm_page: "Seite", adm_lang: "Sprache", adm_f_title: "Seitentitel", adm_f_body: "Inhalt (Leerzeile = neuer Absatz)",
      adm_save: "Seite speichern", adm_saved: "Gespeichert", adm_email_t: "Kontakt-E-Mail",
      adm_email_d: "An diese Adresse sendet das Kontaktformular.", adm_email_save: "E-Mail speichern"
    },
    fr: {
      company: "Entreprise", about: "À propos", blog: "Blog", faq: "FAQ", contact: "Contact",
      terms: "CGV", privacy: "Confidentialité", cookies: "Cookies", dealer_terms: "CGV vendeurs", imprint: "Mentions légales",
      c_title: "Contactez-nous", c_intro: "Questions, retours ou problème avec une commande ? Écrivez-nous - nous répondons généralement sous 24 heures.",
      c_name: "Votre nom", c_email: "Votre e-mail", c_msg: "Votre message", c_send: "Envoyer le message",
      c_hint: "Le bouton ouvre votre application e-mail avec le message prérempli.",
      adm_title: "Pied de page & Pages", adm_desc: "Modifier les pages du pied de page par langue et l'e-mail de contact",
      adm_page: "Page", adm_lang: "Langue", adm_f_title: "Titre de la page", adm_f_body: "Contenu (ligne vide = nouveau paragraphe)",
      adm_save: "Enregistrer la page", adm_saved: "Enregistré", adm_email_t: "E-mail de contact",
      adm_email_d: "Le formulaire de contact envoie les messages à cette adresse.", adm_email_save: "Enregistrer l'e-mail"
    },
    pt: {
      company: "Empresa", about: "Sobre nós", blog: "Blog", faq: "FAQ", contact: "Contacto",
      terms: "Termos", privacy: "Privacidade", cookies: "Cookies", dealer_terms: "Termos para vendedores", imprint: "Informação legal",
      c_title: "Contacte-nos", c_intro: "Perguntas, comentários ou um problema com uma encomenda? Escreva-nos - normalmente respondemos em 24 horas.",
      c_name: "O seu nome", c_email: "O seu e-mail", c_msg: "A sua mensagem", c_send: "Enviar mensagem",
      c_hint: "O botão abre a sua aplicação de e-mail com a mensagem preenchida.",
      adm_title: "Rodapé & Páginas", adm_desc: "Editar páginas do rodapé por idioma e o e-mail de contacto",
      adm_page: "Página", adm_lang: "Idioma", adm_f_title: "Título da página", adm_f_body: "Conteúdo (linha em branco = novo parágrafo)",
      adm_save: "Guardar página", adm_saved: "Guardado", adm_email_t: "E-mail de contacto",
      adm_email_d: "O formulário de contacto envia mensagens para este endereço.", adm_email_save: "Guardar e-mail"
    },
    sw: {
      company: "Kampuni", about: "Kuhusu sisi", blog: "Blogu", faq: "Maswali", contact: "Wasiliana",
      terms: "Masharti", privacy: "Faragha", cookies: "Vidakuzi", dealer_terms: "Masharti ya wauzaji", imprint: "Taarifa za kisheria",
      c_title: "Wasiliana nasi", c_intro: "Maswali, maoni au tatizo na agizo? Tuandikie - kwa kawaida tunajibu ndani ya saa 24.",
      c_name: "Jina lako", c_email: "Barua pepe yako", c_msg: "Ujumbe wako", c_send: "Tuma ujumbe",
      c_hint: "Kitufe hufungua programu yako ya barua pepe na ujumbe ukiwa umejazwa.",
      adm_title: "Footer & Kurasa", adm_desc: "Hariri kurasa za footer kwa kila lugha na barua pepe ya mawasiliano",
      adm_page: "Ukurasa", adm_lang: "Lugha", adm_f_title: "Kichwa cha ukurasa", adm_f_body: "Maudhui (mstari tupu = aya mpya)",
      adm_save: "Hifadhi ukurasa", adm_saved: "Imehifadhiwa", adm_email_t: "Barua pepe ya mawasiliano",
      adm_email_d: "Fomu ya mawasiliano hutuma ujumbe kwa anwani hii.", adm_email_save: "Hifadhi barua pepe"
    },
    es: {
      company: "Empresa", about: "Sobre nosotros", blog: "Blog", faq: "Preguntas frecuentes", contact: "Contacto",
      terms: "Términos", privacy: "Privacidad", cookies: "Cookies", dealer_terms: "Condiciones para vendedores", imprint: "Aviso legal"
    },
    ar: {
      company: "الشركة", about: "من نحن", blog: "المدونة", faq: "الأسئلة الشائعة", contact: "اتصل بنا",
      terms: "الشروط والأحكام", privacy: "الخصوصية", cookies: "ملفات تعريف الارتباط", dealer_terms: "شروط البائعين", imprint: "البيانات القانونية"
    },
    tr: {
      company: "Şirket", about: "Hakkımızda", blog: "Blog", faq: "SSS", contact: "İletişim",
      terms: "Şartlar", privacy: "Gizlilik", cookies: "Çerezler", dealer_terms: "Satıcı şartları", imprint: "Künye"
    },
    ln: {
      company: "Kompanyi", about: "Mpo na biso", blog: "Blog", faq: "Mituna", contact: "Kokutana",
      terms: "Mibeko", privacy: "Bosolo ya moto", cookies: "Cookies", dealer_terms: "Mibeko ya bateki", imprint: "Bayebisi ya mibeko"
    }
  };
  if (typeof I18N !== "undefined") {
    Object.keys(FOOTERX).forEach(function (lang) {
      if (I18N[lang]) I18N[lang].footerx = FOOTERX[lang];
    });
  }
})();


/* ---------- CONFIG ---------- */
const API = "https://afcarparts-com.onrender.com/api";

const LANGS = {
  en: 'English', de: 'Deutsch', fr: 'Francais',
  pt: 'Portugues', es: 'Espanol', ar: 'Arabic',
  tr: 'Turkce', sw: 'Swahili', ln: 'Lingala'
};


/* ---------- UEBERSETZUNGS-ERGAENZUNGEN (Wartung 2026-10) ----------
   FILL:  fehlende Texte je Sprache (vorher fiel die Seite dort auf Englisch zurueck)
   FORCE: korrigierte Texte (u. a. SEO-Block ohne unbelegte Werbeaussagen,
          Preisfeld ohne festes "(USD)", weil es jetzt eine Waehrungsauswahl gibt)
   Lingala: wo kein Lingala-Text existiert, wird Franzoesisch verwendet
   (Geschaeftssprache in der DR Kongo) statt Englisch. */
(function () {
  var FILL = {"es": {"meta": {"title": "AFRICARPARTS - Mercado de recambios de automóvil en África", "description": "Encuentra recambios de coche nuevos, usados y al por mayor en África y China."}, "home": {"popular_brands": "Marcas populares", "search_headline": "Millones de piezas. Una búsqueda sencilla.", "wholesale_title": "Recambios al por mayor", "wholesale_sub": "Precios de fábrica · Proveedores verificados · Envíos a África"}, "checkout": {"seller_no_payout": "Lo sentimos, un artículo de tu carrito no está disponible ahora mismo: el vendedor aún no ha configurado sus pagos. Elimínalo o inténtalo más tarde."}, "admin_hub": {"welcome": "Bienvenido de nuevo, ", "subtitle": "Elige un módulo. Las tarjetas marcadas como «Pronto» se activarán paso a paso.", "active": "ACTIVO", "soon": "PRONTO", "mod_banner_t": "Gestión de banners", "mod_banner_d": "Crear, activar, editar y eliminar banners de la página de inicio", "mod_products_t": "Productos y categorías", "mod_products_d": "Resumen de productos, aprobaciones, categorías, importación masiva (CSV)", "mod_orders_t": "Pedidos", "mod_orders_d": "Resumen de pedidos, seguimiento del estado, devoluciones, pagos", "mod_shops_t": "Gestión de vendedores", "mod_shops_d": "Perfiles de vendedores, verificación, rendimiento, pagos", "mod_users_t": "Gestión de usuarios", "mod_users_d": "Perfiles de compradores, roles y permisos, lista negra", "mod_mod_t": "Moderación y seguridad", "mod_mod_d": "Moderación de contenidos, detección de fraude, tickets, registros de auditoría", "mod_analytics_t": "Analítica", "mod_analytics_d": "Ingresos, tráfico, productos más vendidos, estadísticas de búsqueda", "mod_system_t": "Sistema y configuración", "mod_system_d": "Páginas CMS, plantillas de correo, claves API, copias de seguridad"}, "seoblk": {"h2": "¿Comprar, vender o adquirir al por mayor recambios de coche en África? ¡AFRICARPARTS!", "lead": "Descubre todo sobre el motor en AFRICARPARTS: desde coches y motos hasta bicicletas eléctricas y camiones, y obtén una visión general de todo el mercado de la movilidad. Cada día te esperan miles de piezas nuevas.", "h3": "AFRICARPARTS es el mercado de recambios de automóvil para África", "p_buy": "En AFRICARPARTS puedes comprar o vender recambios fácilmente: usados o nuevos, originales o del mercado de recambios. Tanto si tienes un utilitario, un SUV o un coche premium, aquí encontrarás la pieza que necesitas.", "p_sell": "Vende tus recambios usados y conecta con distribuidores de piezas nuevas y usadas. Infórmate sobre marcas y modelos y descubre ofertas al por mayor de proveedores verificados.", "tip_label": "Consejo:", "tip_body": "Con una cuenta de cliente siempre estarás al día. Accede a tus piezas guardadas desde cualquier dispositivo, guarda tus búsquedas y recibe las últimas ofertas:", "register": "Registrarse / Iniciar sesión", "intl_label": "AFRICARPARTS también es internacional:", "used_t": "¿Quieres comprar piezas usadas?", "used_d": "Descubre miles de anuncios, compáralos y contacta directamente con los vendedores, ya sean distribuidores profesionales o particulares. Encuentra excedentes de empresas o piezas reacondicionadas.", "used_cta": "Comprar piezas usadas", "new_t": "¿Quieres comprar piezas nuevas?", "new_d": "Una enorme selección de piezas nuevas con tecnología moderna y compatibilidad óptima, para una experiencia sin preocupaciones.", "new_cta": "Comprar piezas nuevas", "whole_t": "¿Quieres comprar al por mayor?", "whole_d": "Ya sea al por menor o al por mayor, encontrarás lo que necesitas. Busca entre las ofertas mayoristas de nuestros proveedores verificados.", "whole_cta": "Buscar ofertas mayoristas", "sell_t": "¿Quieres vender piezas?", "sell_d": "Vende aquí tus piezas de forma sencilla y cómoda y llega a compradores de toda África.", "sell_cta": "Vender piezas"}, "footerx": {"c_title": "Contáctanos", "c_intro": "¿Preguntas, comentarios o un problema con un pedido? Escríbenos; normalmente respondemos en 24 horas.", "c_name": "Tu nombre", "c_email": "Tu correo electrónico", "c_msg": "Tu mensaje", "c_send": "Enviar mensaje", "c_hint": "El botón abre tu aplicación de correo con el mensaje ya rellenado.", "adm_title": "Pie de página y páginas", "adm_desc": "Editar las páginas del pie (Quiénes somos, Blog, FAQ, Condiciones, Privacidad, Cookies) por idioma y el correo de contacto", "adm_page": "Página", "adm_lang": "Idioma", "adm_f_title": "Título de la página", "adm_f_body": "Contenido (línea en blanco = nuevo párrafo)", "adm_save": "Guardar página", "adm_saved": "Guardado", "adm_email_t": "Correo de contacto", "adm_email_d": "El formulario de contacto envía los mensajes a esta dirección.", "adm_email_save": "Guardar correo"}}, "ar": {"meta": {"title": "AFRICARPARTS - سوق قطع غيار السيارات في أفريقيا", "description": "ابحث عن قطع غيار سيارات جديدة ومستعملة وبالجملة في أفريقيا والصين."}, "home": {"popular_brands": "العلامات التجارية الشائعة", "search_headline": "ملايين القطع. بحث واحد بسيط.", "wholesale_title": "قطع غيار بالجملة", "wholesale_sub": "أسعار المصنع · موردون موثّقون · شحن إلى أفريقيا", "sell_sub": "اعرض قطعك مجانًا · تصل إلى أفريقيا", "learn_more": "اعرف المزيد"}, "checkout": {"seller_no_payout": "عذرًا، أحد المنتجات في سلتك غير متاح حاليًا لأن البائع لم يُعدّ حساب الدفع بعد. يرجى حذفه أو المحاولة لاحقًا."}, "admin_hub": {"welcome": "مرحبًا بعودتك، ", "subtitle": "اختر وحدة. سيتم تفعيل البطاقات المميزة بـ «قريبًا» تدريجيًا.", "active": "نشط", "soon": "قريبًا", "mod_banner_t": "إدارة اللافتات", "mod_banner_d": "إنشاء لافتات الصفحة الرئيسية وتفعيلها وتعديلها وحذفها", "mod_products_t": "المنتجات والفئات", "mod_products_d": "نظرة عامة على المنتجات، الموافقات، الفئات، الاستيراد الجماعي (CSV)", "mod_orders_t": "الطلبات", "mod_orders_d": "نظرة عامة على الطلبات، تتبع الحالة، المرتجعات، المدفوعات", "mod_shops_t": "إدارة البائعين", "mod_shops_d": "ملفات البائعين، التحقق، الأداء، المدفوعات", "mod_users_t": "إدارة المستخدمين", "mod_users_d": "ملفات المشترين، الأدوار والصلاحيات، القائمة السوداء", "mod_mod_t": "الإشراف والأمان", "mod_mod_d": "مراجعة المحتوى، كشف الاحتيال، التذاكر، سجلات التدقيق", "mod_analytics_t": "التحليلات", "mod_analytics_d": "الإيرادات، الزيارات، المنتجات الأكثر مبيعًا، إحصاءات البحث", "mod_system_t": "النظام والإعدادات", "mod_system_d": "صفحات المحتوى، قوالب البريد، مفاتيح API، النسخ الاحتياطي"}, "seoblk": {"h2": "شراء أو بيع قطع غيار السيارات أو شراؤها بالجملة في أفريقيا؟ AFRICARPARTS!", "lead": "اكتشف كل ما يتعلق بالسيارات على AFRICARPARTS — من السيارات والدراجات النارية إلى الدراجات الكهربائية والشاحنات — واحصل على نظرة شاملة على سوق التنقل. آلاف القطع الجديدة بانتظارك كل يوم.", "h3": "AFRICARPARTS هو سوق قطع غيار السيارات لأفريقيا", "p_buy": "على AFRICARPARTS يمكنك بسهولة شراء قطع غيار السيارات أو بيعها — مستعملة أو جديدة، أصلية أو بديلة. سواء كانت سيارة صغيرة أو SUV أو فاخرة، ستجد القطعة التي تحتاجها.", "p_sell": "بِع قطع غيار سيارتك المستعملة وتواصل مع تجار القطع الجديدة والمستعملة. تعرّف على العلامات والطرازات واكتشف عروض الجملة من موردين موثّقين.", "tip_label": "نصيحة:", "tip_body": "مع حساب العميل تبقى دائمًا على اطلاع. يمكنك الوصول إلى قطعك المحفوظة من أي جهاز وحفظ عمليات البحث وتلقي أحدث العروض:", "register": "التسجيل / تسجيل الدخول", "intl_label": "AFRICARPARTS متاح دوليًا أيضًا:", "used_t": "هل تريد شراء قطع مستعملة؟", "used_d": "اكتشف آلاف الإعلانات وقارن بينها وتواصل مباشرة مع البائعين — تجار محترفون أو أفراد. اعثر على فائض الشركات أو القطع المجددة.", "used_cta": "شراء قطع مستعملة", "new_t": "هل تريد شراء قطع جديدة؟", "new_d": "تشكيلة ضخمة من القطع الجديدة بتقنيات حديثة وتوافق مثالي — لتجربة خالية من القلق.", "new_cta": "شراء قطع جديدة", "whole_t": "هل تريد الشراء بالجملة؟", "whole_d": "سواء بالتجزئة أو بالجملة، ستجد ما تحتاجه. ابحث في عروض الجملة من موردينا الموثّقين.", "whole_cta": "البحث عن عروض الجملة", "sell_t": "هل تريد بيع قطع؟", "sell_d": "بِع قطعك هنا بسهولة وراحة وتواصل مع مشترين في جميع أنحاء أفريقيا.", "sell_cta": "بيع القطع"}, "footerx": {"c_title": "تواصل معنا", "c_intro": "لديك سؤال أو ملاحظة أو مشكلة في طلب؟ اكتب لنا — نرد عادةً خلال 24 ساعة.", "c_name": "اسمك", "c_email": "بريدك الإلكتروني", "c_msg": "رسالتك", "c_send": "إرسال الرسالة", "c_hint": "يفتح الزر تطبيق البريد لديك مع الرسالة جاهزة.", "adm_title": "التذييل والصفحات", "adm_desc": "تعديل صفحات التذييل (من نحن، المدونة، الأسئلة الشائعة، الشروط، الخصوصية، ملفات تعريف الارتباط) لكل لغة وبريد التواصل", "adm_page": "الصفحة", "adm_lang": "اللغة", "adm_f_title": "عنوان الصفحة", "adm_f_body": "المحتوى (سطر فارغ = فقرة جديدة)", "adm_save": "حفظ الصفحة", "adm_saved": "تم الحفظ", "adm_email_t": "بريد التواصل", "adm_email_d": "يرسل نموذج التواصل الرسائل إلى هذا العنوان.", "adm_email_save": "حفظ البريد"}, "seller_hub": {"welcome": "مرحبًا بعودتك، ", "subtitle": "أدِر متجرك. سيتم تفعيل البطاقات المميزة بـ «قريبًا» تدريجيًا.", "active": "نشط", "soon": "قريبًا", "prod_count_word": "منتجات", "mod_products_t": "إدارة المنتجات", "mod_products_d": "قائمة المنتجات، إضافة منتجات جديدة، التوافق، الأسعار، المخزون", "mod_csv_t": "الرفع الجماعي (CSV)", "mod_csv_d": "استيراد كميات كبيرة عبر CSV/Excel", "mod_orders_t": "الطلبات والشحن", "mod_orders_d": "نظرة عامة على الطلبات، ملصقات الشحن، التتبع، المرتجعات، النزاعات", "mod_finance_t": "المالية والمدفوعات", "mod_finance_d": "الإيرادات، حالة الدفع، الرسوم، الفواتير والإيصالات", "mod_kpi_t": "الأداء والمؤشرات", "mod_kpi_d": "التقييمات، مدة الشحن، نسبة الإلغاء/الإرجاع، أفضل المنتجات", "mod_comm_t": "التواصل والدعم", "mod_comm_d": "مركز الرسائل، الردود التلقائية، نظام التذاكر", "mod_profile_t": "ملف الشركة والإعدادات", "mod_profile_d": "بيانات الشركة، التحقق، تكاملات API، الإشعارات"}, "seller_prod": {"back": "< رجوع", "empty_t": "لا توجد منتجات بعد", "empty_s": "أنشئ منتجك الأول باستخدام النموذج أعلاه.", "col_image": "الصورة", "col_title": "العنوان", "col_brand": "العلامة", "col_price": "السعر", "col_stock": "المخزون", "col_actions": "إجراءات", "btn_edit": "تعديل", "btn_delete": "حذف", "summary_new": "+ إنشاء منتج جديد", "summary_edit": "تعديل المنتج", "f_title": "العنوان *", "f_desc": "الوصف", "f_price": "السعر *", "f_stock": "المخزون", "f_brand": "العلامة", "f_model": "الطراز", "f_oem": "رقم OEM", "f_condition": "الحالة", "f_cat": "الفئة", "f_tags": "الوسوم", "f_images": "الصور", "f_active": "المنتج نشط (ظاهر في السوق)", "no_cat": "— بدون فئة —", "cond_new": "جديد", "cond_used": "مستعمل", "cond_ref": "مُجدَّد", "ph_title": "مثال: فحمات فرامل أمامية Bosch QuietCast", "ph_desc": "التفاصيل، الحالة، المميزات...", "ph_brand": "مثال: Bosch", "ph_model": "مثال: F10", "ph_oem": "مثال: 34116794917", "ph_tags": "فحمات فرامل، أمامي، سيراميك", "tags_hint": "مفصولة بفواصل، 50 حرفًا كحد أقصى لكل وسم", "images_hint": "5 صور كحد أقصى، JPG/PNG/WebP، حتى 2 ميغابايت للصورة", "images_info": "تُحفظ على Cloudflare R2 ضمن products/.", "no_images": "لم يتم رفع صور بعد.", "btn_upload": "رفع الصور", "btn_create": "إنشاء", "btn_update": "تحديث", "btn_cancel": "إلغاء", "status_loading": "جارٍ التحميل...", "status_uploading": "جارٍ الرفع...", "status_saving": "جارٍ الحفظ...", "status_uploaded": "تم الرفع", "t_created": "تم الإنشاء", "t_updated": "تم التحديث", "t_deleted": "تم الحذف", "err_title_req": "العنوان مطلوب", "err_price_invalid": "سعر غير صالح", "err_load": "خطأ في التحميل", "err_save": "خطأ في الحفظ", "err_delete": "خطأ في الحذف", "err_max_5": "5 صور كحد أقصى", "err_only_n": "يُسمح بـ {n} صورة/صور إضافية فقط", "err_only_jpg": "JPG أو PNG أو WebP فقط: {name}", "err_too_large": "كبير جدًا (الحد 2 ميغابايت): {name}", "err_upload_fail": "فشل الرفع (HTTP {n})", "err_upload": "خطأ في الرفع", "confirm_delete": "هل تريد حذف هذا المنتج فعلًا؟ لا يمكن التراجع عن هذا الإجراء."}}, "tr": {"meta": {"title": "AFRICARPARTS - Afrika'nın Oto Yedek Parça Pazaryeri", "description": "Afrika ve Çin genelinde yeni, ikinci el ve toptan oto yedek parçaları bulun."}, "home": {"popular_brands": "Popüler Markalar", "search_headline": "Milyonlarca parça. Tek basit arama.", "wholesale_title": "Toptan Parçalar", "wholesale_sub": "Fabrika fiyatları · Doğrulanmış tedarikçiler · Afrika'ya gönderim", "sell_sub": "Parçaları ücretsiz listeleyin · Afrika'ya ulaşın", "learn_more": "Daha fazla bilgi"}, "checkout": {"seller_no_payout": "Üzgünüz, sepetinizdeki bir ürün şu anda mevcut değil: satıcı henüz ödeme hesabını ayarlamadı. Lütfen ürünü kaldırın veya daha sonra tekrar deneyin."}, "admin_hub": {"welcome": "Tekrar hoş geldin, ", "subtitle": "Bir modül seç. \"Yakında\" işaretli kartlar adım adım etkinleştirilecek.", "active": "AKTİF", "soon": "YAKINDA", "mod_banner_t": "Banner Yönetimi", "mod_banner_d": "Ana sayfa bannerlarını oluştur, etkinleştir, düzenle ve sil", "mod_products_t": "Ürünler ve Kategoriler", "mod_products_d": "Ürün özeti, onaylar, kategoriler, toplu içe aktarma (CSV)", "mod_orders_t": "Siparişler", "mod_orders_d": "Sipariş özeti, durum takibi, iadeler, ödemeler", "mod_shops_t": "Satıcı Yönetimi", "mod_shops_d": "Satıcı profilleri, doğrulama, performans, ödemeler", "mod_users_t": "Kullanıcı Yönetimi", "mod_users_d": "Alıcı profilleri, roller ve yetkiler, kara liste", "mod_mod_t": "Moderasyon ve Güvenlik", "mod_mod_d": "İçerik moderasyonu, dolandırıcılık tespiti, destek talepleri, denetim kayıtları", "mod_analytics_t": "Analitik", "mod_analytics_d": "Gelir, trafik, en çok satan ürünler, arama istatistikleri", "mod_system_t": "Sistem ve Ayarlar", "mod_system_d": "CMS sayfaları, e-posta şablonları, API anahtarları, yedekleme"}, "seoblk": {"h2": "Afrika'da oto yedek parça almak, satmak veya toptan almak mı istiyorsunuz? AFRICARPARTS!", "lead": "AFRICARPARTS'ta otomobille ilgili her şeyi keşfedin — otomobil ve motosikletten e-bisiklet ve kamyonlara — ve tüm mobilite pazarına genel bir bakış edinin. Her gün binlerce yeni parça sizi bekliyor.", "h3": "AFRICARPARTS, Afrika için oto yedek parça pazaryeridir", "p_buy": "AFRICARPARTS'ta oto yedek parçalarını kolayca alıp satabilirsiniz — ikinci el veya yeni, orijinal veya muadil. İster küçük araç, ister SUV, ister premium olsun, ihtiyacınız olan parça burada.", "p_sell": "İkinci el oto parçalarınızı satın ve yeni ve ikinci el parça satıcılarıyla bağlantı kurun. Markalar ve modeller hakkında bilgi alın, doğrulanmış tedarikçilerin toptan tekliflerini keşfedin.", "tip_label": "İpucu:", "tip_body": "Müşteri hesabıyla her zaman güncel kalırsınız. Kaydettiğiniz parçalara her cihazdan erişin, aramalarınızı kaydedin ve en yeni teklifleri alın:", "register": "Kayıt ol / Giriş yap", "intl_label": "AFRICARPARTS uluslararası da hizmet veriyor:", "used_t": "İkinci el parça mı almak istiyorsunuz?", "used_d": "Binlerce ilanı keşfedin, karşılaştırın ve satıcılarla doğrudan iletişime geçin — profesyonel bayiler veya bireysel satıcılar. Şirket fazlası veya yenilenmiş parçalar bulun.", "used_cta": "İkinci el parça al", "new_t": "Yeni parça mı almak istiyorsunuz?", "new_d": "Modern teknolojiye ve en iyi uyumluluğa sahip çok geniş yeni parça seçkisi — endişesiz bir deneyim için.", "new_cta": "Yeni parça al", "whole_t": "Toptan mı almak istiyorsunuz?", "whole_d": "İster perakende ister toptan, aradığınızı bulursunuz. Doğrulanmış tedarikçilerimizin toptan tekliflerinde arama yapın.", "whole_cta": "Toptan teklifleri bul", "sell_t": "Parça mı satmak istiyorsunuz?", "sell_d": "Parçalarınızı burada kolay ve rahat bir şekilde satın, Afrika genelindeki alıcılara ulaşın.", "sell_cta": "Parça sat"}, "footerx": {"c_title": "Bize ulaşın", "c_intro": "Sorunuz, geri bildiriminiz veya bir siparişle ilgili sorununuz mu var? Bize yazın — genellikle 24 saat içinde yanıt veririz.", "c_name": "Adınız", "c_email": "E-posta adresiniz", "c_msg": "Mesajınız", "c_send": "Mesaj gönder", "c_hint": "Düğme, mesaj önceden doldurulmuş şekilde e-posta uygulamanızı açar.", "adm_title": "Alt Bilgi ve Sayfalar", "adm_desc": "Alt bilgi sayfalarını (Hakkımızda, Blog, SSS, Şartlar, Gizlilik, Çerezler) dil bazında ve iletişim e-postasını düzenle", "adm_page": "Sayfa", "adm_lang": "Dil", "adm_f_title": "Sayfa başlığı", "adm_f_body": "İçerik (boş satır = yeni paragraf)", "adm_save": "Sayfayı kaydet", "adm_saved": "Kaydedildi", "adm_email_t": "İletişim e-postası", "adm_email_d": "İletişim formu mesajları bu adrese gönderir.", "adm_email_save": "E-postayı kaydet"}, "seller_hub": {"welcome": "Tekrar hoş geldin, ", "subtitle": "Mağazanı yönet. \"Yakında\" işaretli kartlar adım adım etkinleştirilecek.", "active": "AKTİF", "soon": "YAKINDA", "prod_count_word": "Ürün", "mod_products_t": "Ürün Yönetimi", "mod_products_d": "Ürün listesi, yeni ürün oluşturma, uyumluluk, fiyatlandırma, stok", "mod_csv_t": "Toplu Yükleme (CSV)", "mod_csv_d": "CSV/Excel ile büyük miktarları içe aktar", "mod_orders_t": "Siparişler ve Kargo", "mod_orders_d": "Sipariş özeti, kargo etiketleri, takip, iadeler, anlaşmazlıklar", "mod_finance_t": "Finans ve Ödemeler", "mod_finance_d": "Gelir, ödeme durumu, ücretler, faturalar ve makbuzlar", "mod_kpi_t": "Performans ve KPI'lar", "mod_kpi_d": "Değerlendirmeler, kargo süresi, iptal/iade oranı, en çok satanlar", "mod_comm_t": "İletişim ve Destek", "mod_comm_d": "Mesaj merkezi, otomatik yanıtlar, destek talebi sistemi", "mod_profile_t": "Şirket Profili ve Ayarlar", "mod_profile_d": "Şirket bilgileri, doğrulama, API entegrasyonları, bildirimler"}, "seller_prod": {"back": "< Geri", "empty_t": "Henüz ürün yok", "empty_s": "Yukarıdaki formu kullanarak ilk ürününü oluştur.", "col_image": "Görsel", "col_title": "Başlık", "col_brand": "Marka", "col_price": "Fiyat", "col_stock": "Stok", "col_actions": "İşlemler", "btn_edit": "Düzenle", "btn_delete": "Sil", "summary_new": "+ Yeni ürün oluştur", "summary_edit": "Ürünü düzenle", "f_title": "Başlık *", "f_desc": "Açıklama", "f_price": "Fiyat *", "f_stock": "Stok", "f_brand": "Marka", "f_model": "Model", "f_oem": "OEM numarası", "f_condition": "Durum", "f_cat": "Kategori", "f_tags": "Etiketler", "f_images": "Görseller", "f_active": "Ürün aktif (pazaryerinde görünür)", "no_cat": "— Kategori yok —", "cond_new": "Yeni", "cond_used": "İkinci el", "cond_ref": "Yenilenmiş", "ph_title": "örn. Ön fren balatası Bosch QuietCast", "ph_desc": "Detaylar, durum, özellikler...", "ph_brand": "örn. Bosch", "ph_model": "örn. F10", "ph_oem": "örn. 34116794917", "ph_tags": "fren balatası, ön, seramik", "tags_hint": "virgülle ayrılmış, etiket başına en fazla 50 karakter", "images_hint": "en fazla 5, JPG/PNG/WebP, görsel başına en fazla 2 MB", "images_info": "Cloudflare R2'de products/ altında saklanır.", "no_images": "Henüz görsel yüklenmedi.", "btn_upload": "Görsel yükle", "btn_create": "Oluştur", "btn_update": "Güncelle", "btn_cancel": "İptal", "status_loading": "Yükleniyor...", "status_uploading": "Yükleniyor...", "status_saving": "Kaydediliyor...", "status_uploaded": "Yüklendi", "t_created": "Oluşturuldu", "t_updated": "Güncellendi", "t_deleted": "Silindi", "err_title_req": "Başlık zorunludur", "err_price_invalid": "Geçersiz fiyat", "err_load": "Yükleme hatası", "err_save": "Kaydetme hatası", "err_delete": "Silme hatası", "err_max_5": "En fazla 5 görsel", "err_only_n": "Yalnızca {n} görsel daha eklenebilir", "err_only_jpg": "Yalnızca JPG, PNG veya WebP: {name}", "err_too_large": "Çok büyük (en fazla 2 MB): {name}", "err_upload_fail": "Yükleme başarısız (HTTP {n})", "err_upload": "Yükleme hatası", "confirm_delete": "Bu ürünü gerçekten silmek istiyor musun? Bu işlem geri alınamaz."}}, "pt": {"meta": {"title": "AFRICARPARTS - Marketplace de peças auto em África", "description": "Encontre peças auto novas, usadas e por grosso em África e na China."}, "home": {"wholesale_title": "Peças por grosso", "wholesale_sub": "Preços de fábrica · Fornecedores verificados · Envio para África"}, "admin_hub": {"welcome": "Bem-vindo de volta, ", "subtitle": "Escolha um módulo. Os cartões marcados com «Em breve» serão ativados passo a passo.", "active": "ATIVO", "soon": "EM BREVE", "mod_banner_t": "Gestão de banners", "mod_banner_d": "Criar, ativar, editar e eliminar banners da página inicial", "mod_products_t": "Produtos e categorias", "mod_products_d": "Visão geral de produtos, aprovações, categorias, importação em massa (CSV)", "mod_orders_t": "Encomendas", "mod_orders_d": "Visão geral de encomendas, estado, devoluções, pagamentos", "mod_shops_t": "Gestão de vendedores", "mod_shops_d": "Perfis de vendedores, verificação, desempenho, pagamentos", "mod_users_t": "Gestão de utilizadores", "mod_users_d": "Perfis de compradores, funções e permissões, lista negra", "mod_mod_t": "Moderação e segurança", "mod_mod_d": "Moderação de conteúdos, deteção de fraude, pedidos de suporte, registos de auditoria", "mod_analytics_t": "Análises", "mod_analytics_d": "Receitas, tráfego, produtos mais vendidos, estatísticas de pesquisa", "mod_system_t": "Sistema e configuração", "mod_system_d": "Páginas CMS, modelos de e-mail, chaves API, cópias de segurança"}}, "sw": {"meta": {"title": "AFRICARPARTS - Soko la vipuri vya magari Afrika", "description": "Pata vipuri vya magari vipya, vilivyotumika na vya jumla kote Afrika na China."}, "home": {"wholesale_title": "Vipuri vya jumla", "wholesale_sub": "Bei za kiwandani · Wasambazaji waliothibitishwa · Usafirishaji hadi Afrika", "sell_sub": "Weka vipuri bure · Fikia Afrika", "learn_more": "Jifunze zaidi"}, "admin_hub": {"welcome": "Karibu tena, ", "subtitle": "Chagua moduli. Kadi zenye alama \"Hivi karibuni\" zitawezeshwa hatua kwa hatua.", "active": "HAI", "soon": "HIVI KARIBUNI", "mod_banner_t": "Usimamizi wa mabango", "mod_banner_d": "Unda, wezesha, hariri na futa mabango ya ukurasa wa mwanzo", "mod_products_t": "Bidhaa na kategoria", "mod_products_d": "Muhtasari wa bidhaa, idhini, kategoria, kupakia kwa wingi (CSV)", "mod_orders_t": "Oda", "mod_orders_d": "Muhtasari wa oda, ufuatiliaji wa hali, marejesho, malipo", "mod_shops_t": "Usimamizi wa wauzaji", "mod_shops_d": "Wasifu wa wauzaji, uthibitisho, utendaji, malipo", "mod_users_t": "Usimamizi wa watumiaji", "mod_users_d": "Wasifu wa wanunuzi, majukumu na ruhusa, orodha ya waliozuiwa", "mod_mod_t": "Udhibiti na usalama", "mod_mod_d": "Udhibiti wa maudhui, kugundua ulaghai, tiketi, kumbukumbu za ukaguzi", "mod_analytics_t": "Takwimu", "mod_analytics_d": "Mapato, wageni, bidhaa zinazouzwa zaidi, takwimu za utafutaji", "mod_system_t": "Mfumo na mipangilio", "mod_system_d": "Kurasa za CMS, violezo vya barua pepe, funguo za API, nakala rudufu"}}, "de": {"home": {"wholesale_title": "Großhandel", "wholesale_sub": "Fabrikpreise · Verifizierte Lieferanten · Versand nach Afrika"}}, "fr": {"meta": {"description": "Trouvez des pièces auto neuves, d'occasion et en gros en Afrique et en Chine."}, "home": {"wholesale_title": "Pièces en gros", "wholesale_sub": "Prix d'usine · Fournisseurs vérifiés · Livraison en Afrique"}}};
  var FORCE = {"en": {"seoblk": {"h3": "AFRICARPARTS is the auto-parts marketplace for Africa", "p_sell": "Sell your used auto parts and connect with new & used part dealers. Get informed about brands & models and discover wholesale offers from verified suppliers.", "used_d": "Discover thousands of listings, compare them and contact sellers directly — professional dealers or private sellers. Find company surplus or refurbished parts.", "new_d": "A huge selection of new parts with modern technology and optimal compatibility — for a worry-free experience.", "sell_d": "Sell your parts here simply and conveniently and reach buyers across Africa."}, "seller_prod": {"f_price": "Price *"}}, "de": {"seoblk": {"h3": "AFRICARPARTS ist der Marktplatz für Autoteile in Afrika", "p_sell": "Verkaufe deine gebrauchten Autoteile und nimm Kontakt zu Neu- und Gebrauchtteilehändlern auf. Informiere dich über Marken & Modelle und entdecke Großhandelsangebote von geprüften Lieferanten.", "used_d": "Entdecke Tausende Inserate, vergleiche sie und kontaktiere Verkäufer direkt – Händler oder Privatverkäufer. Finde z. B. Firmenrestposten oder aufbereitete Teile.", "new_d": "Eine riesige Auswahl an Neuteilen mit moderner Technik und optimaler Kompatibilität – für ein sorgenfreies Erlebnis.", "sell_d": "Verkaufe deine Teile hier einfach und bequem und erreiche Käufer in ganz Afrika."}, "seller_prod": {"f_price": "Preis *"}}, "fr": {"seoblk": {"h3": "AFRICARPARTS est la marketplace de pièces auto pour l'Afrique", "p_sell": "Vendez vos pièces d'occasion et contactez des vendeurs de pièces neuves et d'occasion. Informez-vous sur les marques et modèles et découvrez les offres en gros de fournisseurs vérifiés.", "used_d": "Découvrez des milliers d'annonces, comparez-les et contactez directement les vendeurs – professionnels ou particuliers. Trouvez des surplus d'entreprise ou des pièces reconditionnées.", "new_d": "Un large choix de pièces neuves avec une technologie moderne et une compatibilité optimale – pour une expérience sans souci.", "sell_d": "Vendez vos pièces ici, simplement et facilement, et touchez des acheteurs dans toute l'Afrique."}, "seller_prod": {"f_price": "Prix *"}}, "pt": {"seoblk": {"h3": "A AFRICARPARTS é o marketplace de peças auto para África", "p_sell": "Venda as suas peças usadas e contacte vendedores de peças novas e usadas. Informe-se sobre marcas e modelos e descubra ofertas por grosso de fornecedores verificados.", "used_d": "Descubra milhares de anúncios, compare-os e contacte vendedores diretamente – profissionais ou particulares. Encontre excedentes de empresas ou peças recondicionadas.", "new_d": "Uma enorme seleção de peças novas com tecnologia moderna e compatibilidade ideal – para uma experiência sem preocupações.", "sell_d": "Venda aqui as suas peças de forma simples e cómoda e chegue a compradores em toda a África."}, "seller_prod": {"f_price": "Preço *"}}, "sw": {"seoblk": {"h3": "AFRICARPARTS ni soko la vipuri vya magari kwa Afrika", "p_sell": "Uza vipuri vyako vilivyotumika na uwasiliane na wauzaji wa vipuri vipya na vilivyotumika. Pata taarifa kuhusu chapa na miundo, na ugundue ofa za jumla kutoka kwa wasambazaji waliothibitishwa.", "used_d": "Gundua maelfu ya matangazo, vilinganishe na uwasiliane na wauzaji moja kwa moja – wafanyabiashara au watu binafsi. Pata vipuri vya ziada vya kampuni au vilivyokarabatiwa.", "new_d": "Uteuzi mkubwa wa vipuri vipya wenye teknolojia ya kisasa na ulinganifu bora – kwa uzoefu bila wasiwasi.", "sell_d": "Uza vipuri vyako hapa kwa urahisi na uwafikie wanunuzi kote Afrika."}, "seller_prod": {"f_price": "Bei *"}}, "es": {"seller_prod": {"f_price": "Precio *"}}, "ar": {"seller_prod": {"f_price": "السعر *"}}, "tr": {"seller_prod": {"f_price": "Fiyat *"}}};
  function merge(dst, src, overwrite) {
    Object.keys(src).forEach(function (k) {
      var v = src[k];
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        if (!dst[k] || typeof dst[k] !== 'object') dst[k] = {};
        merge(dst[k], v, overwrite);
      } else if (overwrite || dst[k] === undefined) {
        dst[k] = v;
      }
    });
  }
  Object.keys(FORCE).forEach(function (l) { if (I18N[l]) merge(I18N[l], FORCE[l], true); });
  Object.keys(FILL).forEach(function (l) { if (I18N[l]) merge(I18N[l], FILL[l], false); });
  // Lingala: fehlende Schluessel aus Franzoesisch uebernehmen
  if (I18N.ln && I18N.fr) merge(I18N.ln, JSON.parse(JSON.stringify(I18N.fr)), false);
  if (I18N.ln && I18N.ln.seller_prod) I18N.ln.seller_prod.f_price = I18N.fr.seller_prod.f_price;
})();

/* ---------- WAEHRUNGEN ----------
   Alle Preise sind in der Datenbank in USD gespeichert und werden fuer die
   Anzeige umgerechnet. Die Kurse kommen live vom Server (/api/fx/rates,
   taeglich aktualisiert). Die Werte unten sind nur der Notfall-Fallback,
   falls der Server nicht erreichbar ist.
   Nachkommastellen richten sich nach ISO 4217 (z. B. XOF/XAF/UGX ohne Cent). */
const CURRENCIES = {
  USD: { rate: 1 },      EUR: { rate: 0.92 },   GBP: { rate: 0.79 },
  AED: { rate: 3.6725 }, ZAR: { rate: 18.2 },   NGN: { rate: 1580 },
  GHS: { rate: 15.2 },   KES: { rate: 129 },    TZS: { rate: 2600 },
  UGX: { rate: 3700 },   RWF: { rate: 1400 },   XOF: { rate: 605 },
  XAF: { rate: 605 },    CDF: { rate: 2850 },   AOA: { rate: 910 },
  MZN: { rate: 63.9 },   ZMW: { rate: 26 },     EGP: { rate: 48.5 },
  MAD: { rate: 9.9 },    ETB: { rate: 120 },    CNY: { rate: 7.2 }
};
var FX_STATE = { live: false, updated: null };

// Gespeicherte Live-Kurse sofort uebernehmen (vor dem ersten Rendern)
(function () {
  try {
    var c = JSON.parse(localStorage.getItem('apa_fx') || 'null');
    if (c && c.rates) {
      Object.keys(c.rates).forEach(function (k) { if (CURRENCIES[k] && c.rates[k] > 0) CURRENCIES[k].rate = c.rates[k]; });
      FX_STATE = { live: true, updated: c.updated || null };
    }
  } catch (e) { /* Cache ist optional */ }
})();

// Live-Kurse holen (hoechstens alle 6 Stunden); danach aktuelle Seite neu zeichnen
async function loadFxRates(force) {
  try {
    var c = JSON.parse(localStorage.getItem('apa_fx') || 'null');
    if (!force && c && c.fetched && (Date.now() - c.fetched) < 6 * 3600 * 1000) return;
  } catch (e) {}
  try {
    var r = await fetch(API + '/fx/rates');
    if (!r.ok) return;
    var d = await r.json();
    if (!d || !d.rates) return;
    var changed = false;
    Object.keys(d.rates).forEach(function (k) {
      var v = Number(d.rates[k]);
      if (CURRENCIES[k] && v > 0 && Math.abs(CURRENCIES[k].rate - v) / CURRENCIES[k].rate > 0.0005) { CURRENCIES[k].rate = v; changed = true; }
    });
    FX_STATE = { live: true, updated: d.updated || null };
    localStorage.setItem('apa_fx', JSON.stringify({ rates: d.rates, updated: d.updated || null, fetched: Date.now() }));
    if (changed && S.currency !== 'USD' && S.page) rerenderKeepScroll();
  } catch (e) { /* Fallback-Kurse bleiben aktiv */ }
}

/* ---------- STATE ---------- */
const S = {
  user: JSON.parse(localStorage.getItem('apa_user') || 'null'),
  token: localStorage.getItem('apa_token') || null,
  lang: localStorage.getItem('apa_lang') || 'en',
  currency: localStorage.getItem('apa_currency') || 'USD',
  cart: JSON.parse(localStorage.getItem('apa_cart') || '[]'),
  page: 'home',
  pageParams: {},
  support: null   // Admin Support-Ansicht: { sellerId, shopName } wenn aktiv
};

/* ---------- UTILS ---------- */
const $ = id => document.getElementById(id);

const esc = s =>
  String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Sprache -> Zahlenformat (Tausendertrennzeichen, Dezimalzeichen)
var NUM_LOCALE = { de: 'de-DE', en: 'en-US', fr: 'fr-FR', pt: 'pt-PT', es: 'es-ES', ar: 'ar-EG-u-nu-latn', tr: 'tr-TR', sw: 'sw-KE', ln: 'fr-CD' };
function numLocale() { return NUM_LOCALE[S.lang] || 'en-US'; }
function curCode() { return CURRENCIES[S.currency] ? S.currency : 'USD'; }
function fxRate(cur) { return (CURRENCIES[cur] || CURRENCIES.USD).rate; }

// Betrag in einer bestimmten Waehrung formatieren (ohne Umrechnung)
function fmtIn(amount, cur) {
  var n = Number(amount) || 0;
  try {
    return new Intl.NumberFormat(numLocale(), { style: 'currency', currency: cur, currencyDisplay: 'code' }).format(n);
  } catch (e) { return cur + ' ' + n.toFixed(2); }
}
// Anzahl Nachkommastellen einer Waehrung (ISO 4217, z. B. XOF = 0)
function curDecimals(cur) {
  try { return new Intl.NumberFormat('en', { style: 'currency', currency: cur }).resolvedOptions().maximumFractionDigits; }
  catch (e) { return 2; }
}
// Texte fuer die Waehrungsauswahl im Haendler-Produktformular
var SP_CUR_TXT = {
  de: { label: 'Währung', usd: 'entspricht {x} · gespeichert in USD, Kunden sehen ihre Währung', same: 'Kunden sehen den Preis automatisch in ihrer Währung' },
  en: { label: 'Currency', usd: 'equals {x} · stored in USD, customers see their own currency', same: 'Customers automatically see the price in their currency' },
  fr: { label: 'Devise', usd: 'soit {x} · enregistré en USD, les clients voient leur devise', same: 'Les clients voient automatiquement le prix dans leur devise' },
  pt: { label: 'Moeda', usd: 'equivale a {x} · guardado em USD, os clientes veem a sua moeda', same: 'Os clientes veem o preço automaticamente na sua moeda' },
  es: { label: 'Moneda', usd: 'equivale a {x} · se guarda en USD, los clientes ven su moneda', same: 'Los clientes ven el precio automáticamente en su moneda' },
  ar: { label: 'العملة', usd: 'يعادل {x} · يُحفظ بالدولار ويرى العملاء عملتهم', same: 'يرى العملاء السعر تلقائيًا بعملتهم' },
  tr: { label: 'Para birimi', usd: '{x} eder · USD olarak kaydedilir, müşteriler kendi para birimini görür', same: 'Müşteriler fiyatı otomatik olarak kendi para biriminde görür' },
  sw: { label: 'Sarafu', usd: 'sawa na {x} · huhifadhiwa kwa USD, wateja huona sarafu yao', same: 'Wateja huona bei kiotomatiki kwa sarafu yao' }
};
function spCurTxt() { var l = S.lang === 'ln' ? 'fr' : S.lang; return SP_CUR_TXT[l] || SP_CUR_TXT.en; }
function spPricePreviewText(val, cur) {
  var X = spCurTxt();
  var v = parseFloat(val);
  if (!cur || cur === 'USD' || isNaN(v)) return X.same;
  return X.usd.replace('{x}', fmtIn(v / fxRate(cur), 'USD'));
}
// USD-Betrag in die gewaehlte Anzeigewaehrung umrechnen und formatieren
function fmt(usd) {
  var cur = curCode();
  return fmtIn((parseFloat(usd || 0) || 0) * fxRate(cur), cur);
}
// Wie fmt, aber in Teile zerlegt (fuer die grosse Preisanzeige mit kleinen Cents)
function fmtParts(usd) {
  var cur = curCode();
  var v = (parseFloat(usd || 0) || 0) * fxRate(cur);
  try {
    var parts = new Intl.NumberFormat(numLocale(), { style: 'currency', currency: cur, currencyDisplay: 'code' }).formatToParts(v);
    var intP = '', decP = '';
    parts.forEach(function (p) {
      if (p.type === 'integer' || p.type === 'group' || p.type === 'minusSign') intP += p.value;
      else if (p.type === 'decimal' || p.type === 'fraction') decP += p.value;
    });
    return { int: intP, dec: decP, cur: cur };
  } catch (e) {
    var s = v.toFixed(2).split('.');
    return { int: s[0], dec: '.' + s[1], cur: cur };
  }
}

function t(key) {
  const parts = key.split('.');
  let o = I18N[S.lang] || I18N.en;
  for (const p of parts) {
    o = o && o[p];
    if (o === undefined) {
      let fb = I18N.en;
      for (const fp of parts) { fb = fb && fb[fp]; }
      return fb == null ? parts[parts.length - 1] : fb;
    }
  }
  return o == null ? key.split('.').pop() : o;
}

function setDir(lang) {
  const rtl = RTL.includes(lang);
  document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', lang);
}

function updateMeta() {
  const title = (I18N[S.lang] && I18N[S.lang].meta && I18N[S.lang].meta.title) ||
                I18N.en.meta.title;
  const desc = (I18N[S.lang] && I18N[S.lang].meta && I18N[S.lang].meta.description) ||
               I18N.en.meta.description || '';
  document.title = title;
  if ($('meta-title')) $('meta-title').content = title;
  if ($('meta-desc')) $('meta-desc').content = desc;
  if ($('og-title')) $('og-title').content = title;
  if ($('og-desc')) $('og-desc').content = desc;
}

/* ---------- CART ---------- */
const cc = () => S.cart.reduce((s, i) => s + i.qty, 0);
const ctot = () => S.cart.reduce((s, i) => s + wsUnitPrice(i, i.qty) * i.qty, 0);
const csave = () => localStorage.setItem('apa_cart', JSON.stringify(S.cart));

/* ---------- BILD-ZOOM (Lightbox, mobil-tauglich) ---------- */
function openZoom(src){
  if(!src) return;
  var ov = document.getElementById('imgZoomOverlay');
  if(!ov){
    ov = document.createElement('div');
    ov.id = 'imgZoomOverlay';
    ov.className = 'img-zoom-overlay';
    ov.innerHTML = '<button class="img-zoom-close" aria-label="Close">&times;</button><img class="img-zoom-img" alt=""/>';
    document.body.appendChild(ov);
    var imgEl = ov.querySelector('.img-zoom-img');
    ov.addEventListener('click', function(e){ if(e.target===ov || e.target.classList.contains('img-zoom-close')) closeZoom(); });
    imgEl.addEventListener('click', function(e){ e.stopPropagation(); this.classList.toggle('zoomed'); });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeZoom(); });
  }
  var im = ov.querySelector('.img-zoom-img');
  im.src = src; im.classList.remove('zoomed');
  ov.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeZoom(){
  var ov = document.getElementById('imgZoomOverlay');
  if(ov){ ov.classList.remove('open'); document.body.style.overflow=''; }
}
window.openZoom = openZoom; window.closeZoom = closeZoom;

/* ---------- GROSSHANDEL / MENGENPREIS (Alibaba-Stil) ----------
   Spiegelt die serverseitige Logik: Stueckpreis = Preis der hoechsten
   Staffel, deren min <= qty ist; sonst der normale Einzelpreis.
   Greift nur, wenn das Produkt Grosshandel zulaesst ('wholesale'|'both').
   Der Server bleibt autoritativ; das hier ist die korrekte Vorschau. */
function wsTiers(p) {
  var arr = p && p.price_tiers;
  if (typeof arr === 'string') { try { arr = JSON.parse(arr); } catch (e) { arr = []; } }
  if (!Array.isArray(arr)) return [];
  return arr.map(function (t) {
    return { min: parseInt(t && (t.min != null ? t.min : t.min_qty), 10), price: parseFloat(t && t.price) };
  }).filter(function (t) {
    return isFinite(t.min) && t.min > 1 && isFinite(t.price) && t.price >= 0;
  }).sort(function (a, b) { return a.min - b.min; });
}
// Erstes Produktbild robust ermitteln (gleiche Logik wie pcard / Detailseite).
function pImg(p) {
  var imgs = (p && p.images_array) || [];
  if ((!imgs || !imgs.length) && p && p.images) {
    if (Array.isArray(p.images)) imgs = p.images;
    else if (typeof p.images === 'string') { try { imgs = JSON.parse(p.images); } catch (e) { imgs = []; } }
  }
  if (!Array.isArray(imgs)) imgs = [];
  return imgs[0] || '';
}
function wsIsWholesale(p) {
  var m = p && p.sale_mode;
  return m === 'wholesale' || m === 'both';
}
function wsUnitPrice(p, qty) {
  var base = parseFloat((p && p.price_usd) || 0);
  if (!wsIsWholesale(p)) return base;
  var price = base;
  wsTiers(p).forEach(function (t) { if ((qty || 1) >= t.min) price = t.price; });
  return price;
}
// Mehrsprachige Kurztexte fuer den Grosshandel (Pattern wie beim Gewichtsfeld).
function wsT(key) {
  var M = {
    badge:      { de:'Großhandel möglich', en:'Wholesale available', fr:'Vente en gros possible', pt:'Atacado disponível', es:'Venta al por mayor', sw:'Jumla inapatikana', ar:'متاح بالجملة', tr:'Toptan mevcut', ln:'Grossiste ekoki' },
    tiers_title:{ de:'Mengenpreise (Großhandel)', en:'Wholesale tiers', fr:'Prix par quantité', pt:'Preços por quantidade', es:'Precios por cantidad', sw:'Bei za jumla', ar:'أسعار الجملة', tr:'Toptan fiyatlar', ln:'Ntalo ya motango' },
    from_qty:   { de:'ab {n} Stk', en:'from {n} pcs', fr:'dès {n} pcs', pt:'a partir de {n} un', es:'desde {n} uds', sw:'kuanzia {n} vipande', ar:'من {n} قطعة', tr:'{n} adetten', ln:'banda {n}' },
    per_unit:   { de:'/Stk', en:'/pc', fr:'/pce', pt:'/un', es:'/ud', sw:'/kipande', ar:'/قطعة', tr:'/adet', ln:'/eloko' },
    nav:        { de:'Großhandel', en:'Wholesale', fr:'Vente en gros', pt:'Atacado', es:'Mayorista', sw:'Jumla', ar:'بالجملة', tr:'Toptan', ln:'Grossiste' },
    f_mode:     { de:'Verkaufsart', en:'Sale type', fr:'Type de vente', pt:'Tipo de venda', es:'Tipo de venta', sw:'Aina ya mauzo', ar:'نوع البيع', tr:'Satış türü', ln:'Lolenge ya kotɛka' },
    mode_retail:{ de:'Nur Einzelverkauf', en:'Retail only', fr:'Détail uniquement', pt:'Apenas varejo', es:'Solo minorista', sw:'Rejareja tu', ar:'تجزئة فقط', tr:'Yalnızca perakende', ln:'Mokomoko kaka' },
    mode_wholesale:{ de:'Nur Großhandel', en:'Wholesale only', fr:'Gros uniquement', pt:'Apenas atacado', es:'Solo mayorista', sw:'Jumla tu', ar:'جملة فقط', tr:'Yalnızca toptan', ln:'Grossiste kaka' },
    mode_both:  { de:'Einzel + Großhandel', en:'Retail + wholesale', fr:'Détail + gros', pt:'Varejo + atacado', es:'Minorista + mayorista', sw:'Rejareja + jumla', ar:'تجزئة + جملة', tr:'Perakende + toptan', ln:'Mokomoko + grossiste' },
    f_tiers:    { de:'Staffelpreise', en:'Quantity tiers', fr:'Paliers de quantité', pt:'Faixas de quantidade', es:'Tramos de cantidad', sw:'Madaraja ya wingi', ar:'شرائح الكمية', tr:'Miktar kademeleri', ln:'Biteni ya motango' },
    tier_qty:   { de:'ab Menge', en:'from qty', fr:'dès quantité', pt:'a partir de qtd', es:'desde cant.', sw:'kuanzia idadi', ar:'من الكمية', tr:'miktardan', ln:'banda motango' },
    tier_price: { de:'Preis/Stk (USD)', en:'price/pc (USD)', fr:'prix/pce (USD)', pt:'preço/un (USD)', es:'precio/ud (USD)', sw:'bei/kipande (USD)', ar:'سعر/قطعة (USD)', tr:'fiyat/adet (USD)', ln:'ntalo/eloko (USD)' },
    add_tier:   { de:'+ Stufe', en:'+ tier', fr:'+ palier', pt:'+ faixa', es:'+ tramo', sw:'+ daraja', ar:'+ شريحة', tr:'+ kademe', ln:'+ eteni' },
    tiers_hint: { de:'Preis sinkt ab der jeweiligen Menge (Alibaba-Prinzip). Einzelpreis gilt darunter.', en:'Price drops from each quantity (Alibaba style). Unit price applies below.', fr:'Le prix baisse dès chaque quantité (style Alibaba). Le prix unitaire s\'applique en dessous.', pt:'O preço cai a partir de cada quantidade (estilo Alibaba). Abaixo vale o preço unitário.', es:'El precio baja desde cada cantidad (estilo Alibaba). Debajo aplica el precio unitario.', sw:'Bei hushuka kuanzia kila idadi (mtindo wa Alibaba). Chini ya hapo bei ya kawaida.', ar:'ينخفض السعر من كل كمية (بأسلوب علي بابا). يطبق سعر الوحدة أدناه.', tr:'Fiyat her miktardan itibaren düşer (Alibaba tarzı). Altında birim fiyat geçerli.', ln:'Ntalo ekitaka banda motango (lolenge Alibaba). Na nse, ntalo ya mokomoko.' },
    qty:        { de:'Menge', en:'Quantity', fr:'Quantité', pt:'Quantidade', es:'Cantidad', sw:'Idadi', ar:'الكمية', tr:'Adet', ln:'Motango' },
    dec:        { de:'Menge verringern', en:'Decrease quantity', fr:'Diminuer la quantité', pt:'Diminuir quantidade', es:'Reducir cantidad', sw:'Punguza idadi', ar:'إنقاص الكمية', tr:'Adedi azalt', ln:'Kokitisa motango' },
    inc:        { de:'Menge erhöhen', en:'Increase quantity', fr:'Augmenter la quantité', pt:'Aumentar quantidade', es:'Aumentar cantidad', sw:'Ongeza idadi', ar:'زيادة الكمية', tr:'Adedi artır', ln:'Kobakisa motango' },
    line_total: { de:'Gesamt', en:'Total', fr:'Total', pt:'Total', es:'Total', sw:'Jumla', ar:'الإجمالي', tr:'Toplam', ln:'Mobimba' },
    goods_total:{ de:'Warenwert', en:'Goods total', fr:'Total marchandises', pt:'Valor das mercadorias', es:'Valor de la mercancía', sw:'Thamani ya bidhaa', ar:'قيمة البضائع', tr:'Mal tutarı', ln:'Motuya ya biloko' },
    grand_total:{ de:'Gesamtsumme', en:'Total payable', fr:'Total à payer', pt:'Total a pagar', es:'Total a pagar', sw:'Jumla ya kulipa', ar:'الإجمالي المستحق', tr:'Ödenecek toplam', ln:'Mobimba ya kofuta' },
    each:       { de:'pro Stück', en:'each', fr:'l\'unité', pt:'cada', es:'c/u', sw:'kila moja', ar:'للقطعة', tr:'adet', ln:'eloko moko' },
    remove:     { de:'Entfernen', en:'Remove', fr:'Retirer', pt:'Remover', es:'Quitar', sw:'Ondoa', ar:'إزالة', tr:'Kaldır', ln:'Kolongola' },
    no_image:   { de:'Kein Bild', en:'No image', fr:'Pas d\'image', pt:'Sem imagem', es:'Sin imagen', sw:'Hakuna picha', ar:'لا توجد صورة', tr:'Görsel yok', ln:'Elilingi te' }
  };
  var row = M[key] || {};
  return row[S.lang] || row.en || key;
}

function cadd(p, q) {
  q = q || 1;
  const e = S.cart.find(i => i.id === p.id);
  if (e) e.qty = Math.min(e.qty + q, p.stock_quantity || 99);
  else S.cart.push(Object.assign({}, p, { qty: q }));
  csave();
}

function crem(id) {
  S.cart = S.cart.filter(i => i.id !== id);
  csave();
}

function cupd(id, q) {
  const i = S.cart.find(x => x.id === id);
  if (i) {
    if (q < 1) crem(id);
    else i.qty = q;
    csave();
  }
}
/* ---------- API ---------- */
async function apiReq(path, method, body, auth) {
  method = method || 'GET';

  const h = { 
    'Content-Type': 'application/json', 
    'Accept-Language': S.lang 
  };

  // Dein Backend erwartet KEIN "Bearer", sondern den Token direkt
if (auth && S.token) h['Authorization'] = 'Bearer ' + S.token;

  // Admin Support-Ansicht: als Ziel-Händler handeln
  if (S.support && S.support.sellerId) h['X-View-Seller-Id'] = String(S.support.sellerId);

  const opts = { method: method, headers: h };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(API + path, opts);
  const d = await res.json().catch(() => ({}));

  if (res.status === 401 && auth && S.token) sessionExpired();
  if (!res.ok) throw new Error(d.error || d.message || 'HTTP ' + res.status);
  return d;
}

async function apiForm(path, fd, auth) {
  const h = { 'Accept-Language': S.lang };

  // Auch hier: KEIN Bearer
  if (auth && S.token) h['Authorization'] = 'Bearer ' + S.token;

  // Admin Support-Ansicht: als Ziel-Händler handeln
  if (S.support && S.support.sellerId) h['X-View-Seller-Id'] = String(S.support.sellerId);

  const res = await fetch(API + path, { 
    method: 'POST', 
    headers: h, 
    body: fd 
  });

  const d = await res.json().catch(() => ({}));
  if (res.status === 401 && auth && S.token) sessionExpired();
  if (!res.ok) throw new Error(d.error || 'HTTP ' + res.status);
  return d;
}

/* Abgelaufene Anmeldung (z. B. Admin-Token nach 12 h): einmal sauber
   abmelden und zur Anmeldung leiten, statt Fehlermeldungen zu zeigen. */
var SESSION_TXT = {
  de: 'Deine Sitzung ist abgelaufen. Bitte melde dich erneut an.',
  en: 'Your session has expired. Please log in again.',
  fr: 'Votre session a expiré. Veuillez vous reconnecter.',
  pt: 'A sua sessão expirou. Inicie sessão novamente.',
  es: 'Tu sesión ha caducado. Vuelve a iniciar sesión.',
  ar: 'انتهت جلستك. يرجى تسجيل الدخول مرة أخرى.',
  tr: 'Oturumunuzun süresi doldu. Lütfen tekrar giriş yapın.',
  sw: 'Kipindi chako kimeisha. Tafadhali ingia tena.'
};
var _sessionExpiredShown = false;
function sessionExpired() {
  if (_sessionExpiredShown) return;
  _sessionExpiredShown = true;
  S.user = null; S.token = null; S.support = null;
  localStorage.removeItem('apa_user');
  localStorage.removeItem('apa_token');
  var l = S.lang === 'ln' ? 'fr' : S.lang;
  toast(SESSION_TXT[l] || SESSION_TXT.en, 't-error');
  setTimeout(function () { _sessionExpiredShown = false; render('login'); }, 300);
}

function logout() {
  S.user = null;
  S.token = null;
  S.support = null;
  localStorage.removeItem('apa_user');
  localStorage.removeItem('apa_token');
  render('home');
}

/* ---------- ADMIN SUPPORT-ANSICHT (View as Seller) ----------
   Nur für Admins. Setzt S.support -> alle /api/seller-Aufrufe
   tragen dann den Header X-View-Seller-Id und wirken auf den
   Ziel-Händler. Ein Banner erinnert dauerhaft daran.            */
function startSupport(sellerId, shopName) {
  if (!S.user || S.user.role !== 'admin') { toast('Nur für Admins', 't-error'); return; }
  if (!sellerId) { toast('Keine Händler-ID', 't-error'); return; }
  S.support = { sellerId: String(sellerId), shopName: shopName || ('Händler ' + sellerId) };
  toast('Support-Ansicht aktiv: ' + S.support.shopName);
  render('seller-dashboard');
}
function exitSupport() {
  S.support = null;
  toast('Support-Ansicht beendet');
  render('admin-shops');
}
function renderSupportBanner() {
  var existing = $('support-banner');
  if (!S.support) { if (existing) existing.remove(); return; }
  var html =
    '<div style="display:flex;align-items:center;justify-content:center;gap:.75rem;flex-wrap:wrap;'
    + 'background:linear-gradient(90deg,var(--a400),var(--a300));color:#fff;padding:.5rem 1rem;'
    + 'font-size:.85rem;font-weight:600;box-shadow:0 2px 6px rgba(0,0,0,.15)">'
    + '<span>🛟 Support-Ansicht — du handelst als <b>' + esc(S.support.shopName) + '</b>'
    + ' <span style="opacity:.85;font-weight:500">(Finanzdaten gesperrt)</span></span>'
    + '<button onclick="exitSupport()" style="border:0;cursor:pointer;background:rgba(255,255,255,.2);'
    + 'color:#fff;font-weight:700;font-size:.8rem;padding:.3rem .8rem;border-radius:99px">Beenden ✕</button>'
    + '</div>';
  if (existing) { existing.innerHTML = html; return; }
  var bar = document.createElement('div');
  bar.id = 'support-banner';
  bar.style.cssText = 'position:sticky;top:0;z-index:9999';
  bar.innerHTML = html;
  var app = $('app');
  if (app && app.parentNode) app.parentNode.insertBefore(bar, app);
  else document.body.insertBefore(bar, document.body.firstChild);
}

/* ---------- SELL BUTTON ROUTING ----------
   Smart routing for the "Verkaufen" / "Sell" button.
   - Not logged in        -> registration page
   - Logged in as seller  -> seller dashboard
   - Logged in as buyer   -> friendly message (later: upgrade page)
*/
function goSell() {
  if (!S.user) {
    render('seller-register');
    return;
  }
  if (S.user.role === 'seller' || S.user.role === 'dealer') {
    render('seller-dashboard');
    return;
  }
  // Kundenkonto -> Haendlerformular im Upgrade-Modus (kein zweites Konto noetig)
  render('seller-register');
}
window.goSell = goSell;


/* ---------- ROUTER ---------- */
const routes = {};
function route(name, fn) { routes[name] = fn; }

async function render(name, params, isPopState) {
  params = params || {};
  S.page = name;
  S.pageParams = params;
  
  // Browser-History eintragen (ausser bei Back/Forward-Navigation)
  if (!isPopState) {
    const qs = Object.keys(params).length
      ? '?' + new URLSearchParams(params).toString()
      : '';
    const url = '#' + name + qs;
    if (history.state && history.state.name) {
      history.pushState({ name: name, params: params }, '', url);
    } else {
      history.replaceState({ name: name, params: params }, '', url);
    }
  }
  
  window.scrollTo(0, 0);
  const fn = routes[name];
  $('content').innerHTML = '<div class="loading-wrap"><div class="spinner" role="status"></div></div>';
  if (!fn) {
    $('content').innerHTML =
      '<div class="page-wrap"><div class="section"><div class="alert alert-error">' +
      t('errors.not_found') + '</div></div></div>';
    buildNav();
    buildFooter();
    return;
  }
  try {
    await fn(params);
  } catch (err) {
    console.error(err);
    $('content').innerHTML =
      '<div class="page-wrap"><div class="section"><div class="alert alert-error">' +
      esc(err.message || t('errors.generic')) + '</div></div></div>';
  }
  buildNav();
  buildFooter();
  renderSupportBanner();
  if (typeof renderParta === 'function') renderParta();
}

/* ---------- TOAST ---------- */
function toast(msg, type) {
  type = type || 't-success';
  const ct = $('toast-container');
  if (!ct) return;
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  el.textContent = msg;
  ct.appendChild(el);
  setTimeout(() => {
    el.style.animation = 'toastIn .3s ease reverse';
    setTimeout(() => el.remove(), 300);
  }, 3000);
}

/* ---------- TOPBAR / NAV / FOOTER ---------- */
function buildTopbar() {
  $('topbar').innerHTML = '';
}

function buildNav() {
  buildTopbar();
  const isA = S.user && S.user.role === 'admin';
  const isS = S.user && (S.user.role === 'seller' || S.user.role === 'dealer');
  const nb = $('navbar');

  let html = '';

  // Brand wordmark (kept as-is per request)
  html += '<button class="nav-brand" onclick="render(\'home\')" aria-label="AFRICARPARTS Home">';
  html += 'AFRICAR<span class="dot">P</span>ARTS<span class="tag">Africa</span></button>';

  // Main nav links (centered area)
  html += '<button class="nav-link" onclick="render(\'products\')">' + t('nav.parts') + '</button>';
  html += '<button class="nav-link" onclick="render(\'shops\')">' + t('nav.shops') + '</button>';
  html += '<button class="nav-link" onclick="render(\'products\',{wholesale:\'1\'})">' + t('nav.china') + '</button>';

  if (S.user) {
    if (isS) html += '<button class="nav-link" onclick="render(\'seller-dashboard\')">' + t('nav.dashboard') + '</button>';
    if (isA) html += '<button class="nav-link" onclick="render(\'admin-dashboard\')">' + t('nav.admin') + '</button>';
    html += '<button class="nav-link" onclick="render(\'my-orders\')">' + t('nav.orders') + '</button>';
  }

  html += '<div class="nav-spacer"></div>';

  // Language + Currency selects
  html += '<select class="nav-sel nav-sel-lang" onchange="chLang(this.value)" title="' + t('nav.language') + '">';
  Object.entries(LANGS).forEach(function (e) {
    html += '<option value="' + e[0] + '"' + (S.lang === e[0] ? ' selected' : '') + '>' + e[1] + '</option>';
  });
  html += '</select>';
  html += '<select class="nav-sel nav-sel-curr" onchange="chCurr(this.value)" title="' + t('nav.currency') + '">';
  Object.keys(CURRENCIES).forEach(function (c) {
    html += '<option value="' + c + '"' + (S.currency === c ? ' selected' : '') + '>' + c + '</option>';
  });
  html += '</select>';

  html += '<div class="nav-divider"></div>';

  // Cart button (icon + count)
  html += '<button class="nav-cart-btn" onclick="render(\'cart\')" aria-label="' + t('nav.cart') + '">';
  html += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>';
  html += '<span class="cart-ct">' + cc() + '</span></button>';

  // Sign-in / sign-out (desktop only — mobile: im Burger-Menü)
  if (S.user) {
    html += '<button class="nav-cart-btn nav-auth-btn" style="background:transparent;color:var(--text);border:1px solid var(--border)" onclick="logout()">' + t('nav.logout') + '</button>';
  } else {
    html += '<button class="nav-cart-btn nav-auth-btn" onclick="render(\'login\')">' + t('nav.login') + '</button>';
  }

  // Burger
  html += '<button class="burger" onclick="openMobileNav()" aria-label="Open menu">';
  html += '<span></span><span></span><span></span></button>';

  nb.innerHTML = html;

  // MOBILE NAV — redesigned drawer
  const chev = '<svg class="nm-chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';
  const ic = function (paths) {
    return '<svg class="nm-ic" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + paths + '</svg>';
  };
  const icParts = ic('<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>');
  const icShops = ic('<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>');
  const icWhole = ic('<line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>');
  const icDash = ic('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>');
  const icAdmin = ic('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>');
  const icOrders = ic('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>');
  const icCart = ic('<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>');
  const icUser = ic('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>');

  const nmLink = function (label, action, icon, extra) {
    return '<button class="nm-link' + (extra ? ' ' + extra : '') + '" onclick="' + action + ';closeMobileNav()">' +
      '<span class="nm-link-l">' + icon + '<span>' + label + '</span></span>' + chev + '</button>';
  };

  let mh = '';
  mh += '<div class="nav-mobile-head">';
  mh += '<span class="nm-brand">AFRICAR<span class="dot">P</span>ARTS</span>';
  mh += '<button class="nav-mobile-close" onclick="closeMobileNav()" aria-label="Close menu">✕</button>';
  mh += '</div>';

  mh += '<div class="nm-body">';
  mh += '<div class="nm-section">';
  mh += nmLink(t('nav.parts'), "render('products')", icParts);
  mh += nmLink(t('nav.shops'), "render('shops')", icShops);
  mh += nmLink(t('nav.china'), "render('products',{wholesale:'1'})", icWhole);
  mh += nmLink(t('nav.cart') + ' <span class="nm-badge">' + cc() + '</span>', "render('cart')", icCart);
  mh += '</div>';

  if (S.user) {
    mh += '<div class="nm-section nm-section-top">';
    if (isS) mh += nmLink(t('nav.dashboard'), "render('seller-dashboard')", icDash);
    if (isA) mh += nmLink(t('nav.admin'), "render('admin-dashboard')", icAdmin);
    mh += nmLink(t('nav.orders'), "render('my-orders')", icOrders);
    mh += '</div>';
    mh += '<div class="nm-auth">';
    mh += '<button class="nm-btn nm-btn-outline" onclick="logout();closeMobileNav()">' + t('nav.logout') + '</button>';
    mh += '</div>';
  } else {
    mh += '<div class="nm-auth">';
    mh += '<button class="nm-btn nm-btn-primary" onclick="render(\'login\');closeMobileNav()">' + icUser + t('nav.login') + '</button>';
    mh += '<button class="nm-btn nm-btn-outline" onclick="render(\'signup\');closeMobileNav()">' + t('nav.register') + '</button>';
    mh += '</div>';
  }

  mh += '<div class="nm-section nm-section-top">';
  mh += '<label class="nm-label">' + t('nav.currency') + '</label>';
  mh += '<select class="nm-select" onchange="chCurr(this.value)">';
  Object.keys(CURRENCIES).forEach(function (c) {
    mh += '<option value="' + c + '"' + (S.currency === c ? ' selected' : '') + '>' + c + '</option>';
  });
  mh += '</select></div>';
  mh += '</div>';

  $('nav-mobile').innerHTML = mh;
}

function openMobileNav() {
  let bd = document.getElementById('nm-backdrop');
  if (!bd) {
    bd = document.createElement('div');
    bd.id = 'nm-backdrop';
    bd.className = 'nm-backdrop';
    bd.onclick = closeMobileNav;
    document.body.appendChild(bd);
  }
  bd.classList.add('show');
  $('nav-mobile').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  const bd = document.getElementById('nm-backdrop');
  if (bd) bd.classList.remove('show');
  $('nav-mobile').classList.remove('open');
  document.body.style.overflow = '';
}

function chLang(l) {
  S.lang = l;
  localStorage.setItem('apa_lang', l);
  setDir(l);
  updateMeta();
  render(S.page, S.pageParams);
}

function chCurr(c) {
  if (!CURRENCIES[c]) c = 'USD';
  S.currency = c;
  localStorage.setItem('apa_currency', c);
  rerenderKeepScroll(); // Preise sofort in neuer Waehrung - kein Neuladen noetig
}
// Aktuelle Seite neu zeichnen und die Scroll-Position behalten
function rerenderKeepScroll() {
  var y = window.scrollY || 0;
  Promise.resolve(render(S.page, S.pageParams)).then(function () { window.scrollTo(0, y); });
}

function buildFooter() {
  let h = '<div class="footer-inner">';

  // Brand col with socials + selects
  h += '<div class="footer-brand-col">';
  h += '<div style="font-family:var(--fh);font-weight:800;font-size:1.4rem;color:#fff">AFRICAR<span style="color:var(--brand-orange)">P</span>ARTS</div>';
  h += '<div class="footer-social" aria-label="Social media">';
  h += '<a href="#" aria-label="Facebook"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.3 0-1.7.8-1.7 1.6V12h2.8l-.4 2.9h-2.4v7C18.3 21.1 22 17 22 12z"/></svg></a>';
  h += '<a href="#" aria-label="YouTube"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2s-.2-1.5-.9-2.2c-.9-1-1.9-1-2.4-1.1C16.4 3.7 12 3.7 12 3.7s-4.4 0-7.7.2c-.5.1-1.5.1-2.4 1.1-.7.7-.9 2.2-.9 2.2S.8 9 .8 10.8v1.7C.8 14.3 1 16 1 16s.2 1.5.9 2.2c.9 1 2.1 1 2.6 1.1 1.9.2 8 .2 8 .2s4.4 0 7.7-.2c.5-.1 1.5-.1 2.4-1.1.7-.7.9-2.2.9-2.2s.2-1.8.2-3.5V11C23.2 9.2 23 7.4 23 7.2zM9.8 14.5V8.3l5.7 3.1-5.7 3.1z"/></svg></a>';
  h += '<a href="#" aria-label="Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg></a>';
  h += '<a href="#" aria-label="WhatsApp"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.2-.7.1-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1s-1.3-.5-2.4-1.5c-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6.1-.1.3-.4.5-.5.1-.2.2-.3.3-.5.1-.2 0-.4-.1-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1-1.1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.3 5.3 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.6.2-1.2.2-1.4-.1-.1-.3-.2-.5-.3zM12 2C6.5 2 2 6.5 2 12c0 1.7.4 3.4 1.3 4.8L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg></a>';
  h += '</div>';
  h += '<div class="footer-select-group">';
  h += '<div><label>' + t('nav.language') + '</label>';
  h += '<select onchange="chLang(this.value)" style="width:100%;margin-top:.3rem">';
  Object.entries(LANGS).forEach(function (e) {
    h += '<option value="' + e[0] + '"' + (S.lang === e[0] ? ' selected' : '') + '>' + e[1] + '</option>';
  });
  h += '</select></div>';
  h += '<div><label>' + t('nav.currency') + '</label>';
  h += '<select onchange="chCurr(this.value)" style="width:100%;margin-top:.3rem">';
  Object.keys(CURRENCIES).forEach(function (c) {
    h += '<option value="' + c + '"' + (S.currency === c ? ' selected' : '') + '>' + c + '</option>';
  });
  h += '</select></div>';
  h += '</div>';
  h += '</div>';

  // Col 1: Company
  h += '<div><div class="footer-col-title">' + t('footer.marketplace') + '</div><div class="footer-links">';
  h += '<button class="footer-link" onclick="render(\'products\')">' + t('footer.browse') + '</button>';
  h += '<button class="footer-link" onclick="render(\'shops\')">' + t('nav.shops') + '</button>';
  h += '<button class="footer-link" onclick="render(\'products\',{wholesale:\'1\'})">' + t('footer.china_w') + '</button>';
  h += '<button class="footer-link" onclick="render(\'seller-register\')">' + t('footer.sell') + '</button>';
  h += '</div></div>';

  // Col 2: Support
  h += '<div><div class="footer-col-title">' + t('footer.support') + '</div><div class="footer-links">';
  h += '<button class="footer-link">' + t('footer.help') + '</button>';
  h += '<button class="footer-link" onclick="render(\'page\',{slug:\'shipping\'})">' + t('footer.shipping_info') + '</button>';
  h += '<button class="footer-link" onclick="render(\'page\',{slug:\'returns\'})">' + t('footer.returns') + '</button>';
  h += '<button class="footer-link" onclick="render(\'contact\')">' + t('footer.contact') + '</button>';
  h += '</div></div>';

  // Col 2b: Unternehmen (Footer-CMS)
  h += '<div><div class="footer-col-title">' + t('footerx.company') + '</div><div class="footer-links">';
  h += '<button class="footer-link" onclick="render(\'page\',{slug:\'about\'})">' + t('footerx.about') + '</button>';
  h += '<button class="footer-link" onclick="render(\'page\',{slug:\'blog\'})">' + t('footerx.blog') + '</button>';
  h += '<button class="footer-link" onclick="render(\'page\',{slug:\'faq\'})">' + t('footerx.faq') + '</button>';
  h += '<button class="footer-link" onclick="render(\'contact\')">' + t('footerx.contact') + '</button>';
  h += '</div></div>';

  // Col 3: Account
  h += '<div><div class="footer-col-title">Account</div><div class="footer-links">';
  if (S.user) {
    h += '<button class="footer-link" onclick="render(\'my-orders\')">' + t('nav.orders') + '</button>';
    h += '<button class="footer-link" onclick="render(\'cart\')">' + t('nav.cart') + '</button>';
    h += '<button class="footer-link" onclick="logout()">' + t('nav.logout') + '</button>';
  } else {
    h += '<button class="footer-link" onclick="render(\'login\')">' + t('nav.login') + '</button>';
    h += '<button class="footer-link" onclick="render(\'signup\')">' + t('nav.register') + '</button>';
    h += '<button class="footer-link" onclick="render(\'seller-register\')">' + esc(({de:'Händler werden',en:'Become a seller',fr:'Devenir vendeur',pt:'Tornar-se vendedor',es:'Hazte vendedor',ar:'كن بائعًا',tr:'Satıcı ol',sw:'Kuwa muuzaji',ln:'Devenir vendeur'})[S.lang] || 'Become a seller') + '</button>';
  }
  h += '</div></div>';

  // Col 4: Payment / popular
  h += '<div><div class="footer-col-title">' + t('footer.payments') + '</div>';
  var PAY_LOGOS = [
    ['visa.png', 'Visa'],
    ['mastercard.png', 'Mastercard'],
    ['applepay.png', 'Apple Pay'],
    ['amazonpay.png', 'Amazon Pay'],
    ['paypal.png', 'PayPal'],
    ['mpesa.png', 'M-PESA'],
    ['mtn-momo.png', 'MTN Mobile Money'],
    ['orange-money.png', 'Orange Money'],
    ['unitel-money.png', 'Unitel Money']
  ];
  h += '<div class="footer-pay-logos">';
  PAY_LOGOS.forEach(function (p) {
    h += '<span class="pay-chip"><img src="/img/payments/' + p[0] + '" alt="' + p[1] + '" title="' + p[1] + '" loading="lazy"/></span>';
  });
  h += '</div>';
  h += '<div class="footer-links" style="margin-top:.55rem">';
  h += '<span class="footer-link" style="cursor:default">🏦 ' + t('checkout.bank') + '</span>';
  h += '<span class="footer-link" style="cursor:default">💵 ' + t('checkout.cod') + '</span>';
  h += '</div></div>';

  h += '</div>';

  // Bottom bar
  h += '<div class="footer-bot">';
  h += '<span>© ' + new Date().getFullYear() + ' AFRICARPARTS · ' + t('footer.rights') + '</span>';
  h += '<span class="footer-bot-links">';
  h += '<button class="footer-link" onclick="render(\'page\',{slug:\'terms\'})">' + t('footerx.terms') + '</button>';
  h += '<button class="footer-link" onclick="render(\'page\',{slug:\'dealer-terms\'})">' + t('footerx.dealer_terms') + '</button>';
  h += '<button class="footer-link" onclick="render(\'page\',{slug:\'privacy\'})">' + t('footerx.privacy') + '</button>';
  h += '<button class="footer-link" onclick="render(\'page\',{slug:\'cookies\'})">' + t('footerx.cookies') + '</button>';
  h += '<button class="footer-link" onclick="render(\'page\',{slug:\'imprint\'})">' + t('footerx.imprint') + '</button>';
  h += '</span>';
  h += '</div>';

  $('footer').innerHTML = h;
}

function ticker() {
  return '<div class="ticker"><span class="ticker-lbl">PROMO</span>' +
    '<div class="ticker-scroll">' +
      '<span class="ticker-item">Engine Parts from $12 - Wholesale Direct</span>' +
      '<span class="ticker-item">Toyota/Nissan OEM Parts in stock</span>' +
      '<span class="ticker-item">Bulk orders - MOQ from 1 unit</span>' +
      '<span class="ticker-item">DHL China 5-10 days</span>' +
      '<span class="ticker-item">6 currencies supported</span>' +
      '<span class="ticker-item">Register your shop - free</span>' +
      '<span class="ticker-item">Engine Parts from $12 - Wholesale Direct</span>' +
      '<span class="ticker-item">Toyota/Nissan OEM Parts in stock</span>' +
      '<span class="ticker-item">Bulk orders - MOQ from 1 unit</span>' +
    '</div></div>';
}

function adBanners() {
   async function renderBannerRotator() {
  try {
    const res = await apiReq('/banners', 'GET', null, false);
    const banners = res.data || [];
    if (!banners.length) return '';

    const slides = banners.map(function (b, i) {
      const safeImg = String(b.image_url).replace(/'/g, '%27');
      const aria = esc(b.alt_text || b.title || '');
      const linkOpen  = b.link_url ? '<a href="' + esc(b.link_url) + '" class="banner-slide' + (i===0?' is-active':'') + '" style="background-image:url(\'' + safeImg + '\')" aria-label="' + aria + '">' : '<div class="banner-slide' + (i===0?' is-active':'') + '" style="background-image:url(\'' + safeImg + '\')" role="img" aria-label="' + aria + '">';
      const linkClose = b.link_url ? '</a>' : '</div>';
      return linkOpen + '<span class="visually-hidden">' + aria + '</span>' + linkClose;
    }).join('');

    const dots = banners.length > 1
      ? '<div class="banner-dots">' + banners.map(function (_, i) {
          return '<button class="banner-dot' + (i===0?' is-active':'') + '" data-i="' + i + '" aria-label="Banner ' + (i+1) + '"></button>';
        }).join('') + '</div>'
      : '';

    return '<div class="page-wrap"><section class="banner-rotator" data-count="' + banners.length + '">' + slides + dots + '</section></div>';
  } catch (e) {
    return '';
  }
}

function startBannerRotation(intervalMs) {
  intervalMs = intervalMs || 6000;
  const rotator = document.querySelector('.banner-rotator');
  if (!rotator) return;
  const slides = rotator.querySelectorAll('.banner-slide');
  const dots   = rotator.querySelectorAll('.banner-dot');
  if (slides.length < 2) return;

  let i = 0;
  const show = function (next) {
    slides[i].classList.remove('is-active');
    if (dots[i]) dots[i].classList.remove('is-active');
    i = (next + slides.length) % slides.length;
    slides[i].classList.add('is-active');
    if (dots[i]) dots[i].classList.add('is-active');
  };
  let timer = setInterval(function () { show(i + 1); }, intervalMs);

  dots.forEach(function (d) {
    d.addEventListener('click', function () {
      clearInterval(timer);
      show(parseInt(d.dataset.i, 10));
      timer = setInterval(function () { show(i + 1); }, intervalMs);
    });
  });
  rotator.addEventListener('mouseenter', function () { clearInterval(timer); });
  rotator.addEventListener('mouseleave', function () {
    timer = setInterval(function () { show(i + 1); }, intervalMs);
  });
}
  return '<div class="page-wrap"><div class="ad-grid">' +
    '<a class="ad-card bl" href="javascript:void(0)" onclick="render(\'seller-register\')" style="text-decoration:none">' +
      '<div class="ad-card-tag">AD</div>' +
      '<div><h3 style="color:var(--p700)">' + t('footer.sell') + '</h3>' +
      '<p>List parts free - Reach buyers across Africa</p></div>' +
      '<span class="ad-cta bl">Start &gt;</span></a>' +
    '<div class="ad-card gn" onclick="render(\'products\',{condition:\'new\'})">' +
      '<div class="ad-card-tag">AD</div>' +
      '<div><h3 style="color:var(--green)">New OEM Parts</h3>' +
      '<p>Genuine quality - All major brands</p></div>' +
      '<button class="ad-cta gn">View &gt;</button></div>' +
    '</div></div>';
}

function pcard(p) {
  let imgs = p.images_array || [];
  if (!imgs.length && p.images) {
    if (Array.isArray(p.images)) imgs = p.images;
    else if (typeof p.images === 'string') {
      try { imgs = JSON.parse(p.images); } catch (e) { imgs = []; }
    }
  }
  if (!Array.isArray(imgs)) imgs = [];
  const img = imgs[0];
  const isCn = (p.shop && p.shop.is_china_seller) || p.is_china_seller;
  const cond = p.condition || 'new';
  const showDeal = isCn || cond === 'used';

  let h = '<article class="pcard" onclick="render(\'product-detail\',{id:\'' + p.id + '\'})" role="listitem">';
  h += '<div class="pcard-img">';
  h += '<div class="pcard-badges">';
  if (isCn) h += '<span class="pbadge pbadge-china">WHOLESALE</span>';
  h += '<span class="pbadge pbadge-' + cond + '">' + t('product.' + cond) + '</span>';
  if (wsIsWholesale(p)) h += '<span class="pbadge" style="background:#0a7d36;color:#fff">' + esc(wsT('badge')) + '</span>';
  h += '</div>';
  if (p.moq && p.moq > 1) h += '<span class="pbadge-moq">MOQ ' + p.moq + '</span>';
  // Heart icon (top-right) — non-functional placeholder
  h += '<button class="pcard-heart" onclick="event.stopPropagation()" aria-label="Save">';
  h += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6c-1.5-1.5-4-1.5-5.5 0L12 7.9 8.7 4.6c-1.5-1.5-4-1.5-5.5 0-1.5 1.5-1.5 4 0 5.5l8.8 8.8 8.8-8.8c1.5-1.5 1.5-4 0-5.5z"/></svg>';
  h += '</button>';
  if (img) h += '<img src="' + esc(img) + '" alt="' + esc(p.title) + '" loading="lazy"/>';
  else h += '<span>No image</span>';
  h += '</div>';

  h += '<div class="pcard-body">';
  h += '<div class="pcard-title">' + esc(p.title) + '</div>';
  h += '<div class="pcard-price">' + fmt(p.price_usd) + '<small>' + esc(t('pp.incl_vat')) + '</small></div>';
  h += '<div class="pcard-meta">';
  if (p.brand) h += '<span>' + esc(p.brand) + '</span>';
  if (p.model) h += '<span>' + esc(p.model) + '</span>';
  if (p.oem) h += '<span>OEM ' + esc(p.oem) + '</span>';
  if (p.sku) h += '<span>' + t('pp.article_num') + ' ' + esc(p.sku) + '</span>';
  if (p.ean) h += '<span>EAN ' + esc(p.ean) + '</span>';
  h += '</div>';
  if (showDeal) h += '<span class="pcard-deal">DEAL</span>';
  h += '<div class="pcard-foot">';
  if (p.location) h += '<span class="pcard-loc">📍 ' + esc(p.location) + '</span>';
  else h += '<span></span>';
  h += '<button class="pcard-add" onclick="event.stopPropagation();fastAdd(\'' + p.id + '\')">+ ' + t('product.add_cart') + '</button>';
  h += '</div></div></article>';
  return h;
}

window.fastAdd = async function (id) {
  try {
    const p = await apiReq('/products/' + id, 'GET', null, false);
    cadd(p);
    buildNav();
    toast(t('product.added'));
  } catch (e) {
    render('product-detail', { id: id, autoAdd: true });
  }
};

/* ---------- ROUTE: HOME ---------- */
route('home', async function () {
  let prods = [], cats = [], cnProds = [], shops = [], shopsGeo = {};
  try {
    const arr = await Promise.all([
      apiReq('/products?limit=8&sort=boost', 'GET', null, false).catch(() => ({ data: [] })),
      apiReq('/categories?lang=' + S.lang, 'GET', null, false).catch(() => []),
      apiReq('/products?limit=4&wholesale=1', 'GET', null, false).catch(() => ({ data: [] })),
      apiReq('/shops?near=1&limit=6', 'GET', null, false).catch(() => ({ data: [] }))
    ]);
    prods = arr[0].data || arr[0].products || [];
    cats = Array.isArray(arr[1]) ? arr[1] : (arr[1].data || []);
    cnProds = arr[2].data || arr[2].products || [];
    shopsGeo = (arr[3] && !Array.isArray(arr[3])) ? arr[3] : {};
    shops = arr[3].data || arr[3].shops || arr[3] || [];
    if (!Array.isArray(shops)) shops = [];
  } catch (e) {}

  const features = t('home.features');
  const vcData = t('home.vc') || [];
  const totalCount = (prods.length + cnProds.length) ? ((prods.length + cnProds.length) * 1250) : 12500;
  const fmtNum = function (n) { return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); };

  let h = '';

  // ============= HERO ==============
  h += '<section class="hero" aria-label="' + esc(t('home.hero_badge')) + '">';
  h += '<div id="hero-banner-mount" aria-hidden="true"></div>';
  h += '<div class="hero-card">';
  h += '<div class="hero-left"><div class="hero-inner">';
  h += '<span class="hero-badge">' + esc(t('home.hero_badge')) + '</span>';
  h += '<h1>' + esc(t('home.hero_title')) + ' <em>' + esc(t('home.hero_title_em')) + '</em></h1>';
  h += '<p>' + esc(t('home.hero_sub')) + '</p>';
  h += '</div></div>';
  h += '<div class="hero-right"><span class="hero-mark" aria-hidden="true">P</span></div>';
  h += '</div></section>';

  // ============= PAGE WRAP STACK ==============
  h += '<div class="page-wrap mp-stack">';

  // ----- 1. Search card -----
  h += '<div class="mp-search-card">';
  h += '<h2>' + esc(t('home.search_headline')) + '</h2>';
  h += '<div class="mp-search-row">';
  h += '<button type="button" class="mp-pkw-btn" onclick="pkwOpen()" aria-label="' + esc(t('home.pkw_btn')) + '" title="' + esc(t('home.pkw_btn')) + '">';
  h += '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="11" width="20" height="7" rx="1.5"/><path d="M5 11l2-5h10l2 5"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M9 14h6"/></svg>';
  h += '<span class="mp-pkw-label">' + esc(t('home.pkw_btn')) + '</span>';
  h += '</button>';
  h += '<span class="icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>';
  h += '<input type="search" id="hsearch" autocomplete="off" placeholder="' + esc(t('home.search_ph')) + '" aria-label="' + esc(t('home.search_ph')) + '" onkeydown="if(event.key===\'Enter\')doSearch()"/>';
  h += '<input type="hidden" id="hCat" value=""/>';
  h += '<button class="mp-search-btn" onclick="doSearch()" aria-label="' + esc(t('home.search_btn')) + '">';
  h += '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
  h += '</button>';
  h += '</div></div>';

  // ----- 2. Filter card (vehicle types + brand/model/year/km) -----
  h += '<div class="mp-filter-card">';
  // Left vehicle-type strip
  h += '<div class="mp-vtypes" role="tablist" aria-label="Vehicle types">';
  var vtypes = [
    {q:'', svg:'<rect x="3" y="11" width="18" height="6" rx="1.5"/><path d="M5 11l2-5h10l2 5"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/>'},
    {q:'motorcycle', svg:'<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M12 17l-3-7h6l1-3h2"/>'},
    {q:'bicycle', svg:'<circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><path d="M6 18l6-10h4M10 8l4 10"/>'},
    {q:'truck', svg:'<rect x="1" y="6" width="13" height="10"/><path d="M14 9h4l3 3v4h-7"/><circle cx="5" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>'}
  ];
  vtypes.forEach(function (v, i) {
    h += '<button class="mp-vtype' + (i === 0 ? ' active' : '') + '" onclick="render(\'products\'' + (v.q ? ',{q:\'' + v.q + '\'}' : '') + ')" aria-label="Type ' + (i+1) + '">';
    h += '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + v.svg + '</svg>';
    h += '</button>';
  });
  h += '</div>';

  // Right filter body
  h += '<div class="mp-filter-body">';
  h += '<div class="mp-field"><label>' + esc(t('product.brand')) + '</label>';
  h += '<select id="fBrand"><option value="">Any</option>';
  ['Bosch','Brembo','Mahle','Mann','NGK','Sachs','Valeo','Continental','Denso','Hella'].forEach(function (b) {
    h += '<option>' + b + '</option>';
  });
  h += '</select></div>';

  h += '<div class="mp-field"><label>' + esc(t('product.model')) + '</label>';
  h += '<select id="fModel"><option value="">Any</option>';
  ['Audi A3','BMW 3-Series','Mercedes C-Class','VW Golf','Toyota Corolla','Hyundai Tucson'].forEach(function (m) {
    h += '<option>' + m + '</option>';
  });
  h += '</select></div>';

  h += '<div class="mp-field"><label>' + esc(t('product.year')) + '</label>';
  h += '<select id="fYear"><option value="">Any</option>';
  for (var y = 2025; y >= 2000; y--) h += '<option>' + y + '</option>';
  h += '</select></div>';

  h += '<div class="mp-field"><label>' + esc(t('filter.condition')) + '</label>';
  h += '<select id="fCond"><option value="">Any</option>';
  h += '<option value="new">' + esc(t('product.new')) + '</option>';
  h += '<option value="used">' + esc(t('product.used')) + '</option>';
  h += '<option value="refurbished">' + esc(t('product.refurbished')) + '</option>';
  h += '</select></div>';

  h += '<div class="mp-field"><label>Type</label>';
  h += '<div class="mp-toggle"><button class="active" onclick="this.parentNode.querySelectorAll(\'button\').forEach(b=>b.classList.remove(\'active\'));this.classList.add(\'active\')">Retail</button><button onclick="this.parentNode.querySelectorAll(\'button\').forEach(b=>b.classList.remove(\'active\'));this.classList.add(\'active\')">Wholesale</button></div>';
  h += '</div>';

  h += '<div class="mp-field"><label>OEM No.</label><input type="text" id="fOem" placeholder="e.g. 0986478421"/></div>';

  h += '<div class="mp-field"><label>Location</label><input type="text" id="fLoc" placeholder="City or country"/></div>';

  h += '<div class="mp-field" style="align-self:end">';
  h += '<button class="mp-filter-cta" onclick="doHomeFilter()">';
  h += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
  h += '<span class="count">' + fmtNum(totalCount) + '</span> ' + esc(t('home.featured').replace(/^./, function(c){return c.toUpperCase();}));
  h += '</button>';
  h += '</div>';

  // Foot row
  h += '<div class="mp-filter-foot">';
  h += '<label class="mp-foot-left" style="cursor:pointer"><input type="checkbox" id="fNewOnly" style="width:auto;cursor:pointer"/> Only new parts</label>';
  h += '<div class="mp-foot-right">';
  h += '<a onclick="document.querySelectorAll(\'.mp-filter-body select, .mp-filter-body input\').forEach(function(el){if(el.type===\'checkbox\')el.checked=false;else el.value=\'\'})">↺ ' + esc(t('filter.reset')) + '</a>';
  h += '<a onclick="render(\'products\')">⚙ More filters</a>';
  h += '</div></div>';

  h += '</div></div>'; // /mp-filter-body /mp-filter-card

  // ----- 3. Top Deals (card with horizontal product scroller) -----
  h += '<div class="mp-card">';
  h += '<div class="mp-card-hd">';
  h += '<div class="mp-card-title">' + esc(t('home.featured')) + ' <span style="background:var(--brand-orange-soft);color:var(--brand-orange);font-size:.7rem;padding:.15rem .55rem;border-radius:var(--r-pill);font-weight:800;letter-spacing:.05em;vertical-align:middle;margin-left:.25rem">DEALS</span></div>';
  h += '<a class="mp-card-link" onclick="render(\'products\')">' + esc(t('home.view_all')) + '</a>';
  h += '</div>';
  if (prods.length) {
    h += '<div class="mp-scroller">';
    h += '<div class="mp-scroller-track" id="topDealsTrack">' + prods.map(pcard).join('') + '</div>';
    h += '<button class="mp-scroller-btn right" onclick="document.getElementById(\'topDealsTrack\').scrollBy({left:280,behavior:\'smooth\'})" aria-label="Scroll right">';
    h += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg></button>';
    h += '</div>';
  } else {
    h += '<div class="empty-state"><div class="empty-icon">🛠</div><h3>No products yet</h3></div>';
  }
  h += '</div>';

  // ----- 4. AI helper strip -----
  h += '<div class="mp-card mp-card-tight"><div class="mp-ai-strip">';
  h += '<span class="mp-ai-logo">parta <span class="beta">Beta</span></span>';
  h += '<span class="mp-ai-body">Your personal AI guide for spare parts. Find the right part fast — by VIN, OEM number or symptom.</span>';
  h += '<button class="mp-ai-btn" onclick="render(\'products\')">';
  h += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z"/></svg>';
  h += 'How can I help you?</button>';
  h += '</div></div>';

  // ----- 5. Featured categories (echte Kategorienliste, async geladen) -----
  h += '<div id="featcat-mount"></div>';

  // ----- 6. Popular Brands -----
  // Logo files go in: /brands/{slug}.png on your static host (or change BRAND_LOGO_BASE).
  // Recommended: 200×200 px, transparent PNG. While missing, a styled name fallback shows.
  h += '<div class="mp-card">';
  h += '<div class="mp-card-hd"><div class="mp-card-title">' + esc(t('home.popular_brands')) + '</div></div>';
  h += '<div class="mp-brand-grid">';

  var BRAND_LOGO_BASE = (window.BRAND_LOGO_BASE || '/brands');
  var popBrands = [
    {name:'Toyota',         slug:'toyota'},
    {name:'Nissan',         slug:'nissan'},
    {name:'Volkswagen',     slug:'volkswagen'},
    {name:'Hyundai',        slug:'hyundai'},
    {name:'Ford',           slug:'ford'},
    {name:'Mercedes-Benz',  slug:'mercedes-benz'},
    {name:'Honda',          slug:'honda'},
    {name:'Audi',           slug:'audi'},
    {name:'Sinotruk',       slug:'sinotruk'},
    {name:'FAW Trucks',     slug:'faw'},
    {name:'Changan',        slug:'changan'}
  ];
  popBrands.forEach(function (b) {
    var logoUrl = BRAND_LOGO_BASE + '/' + b.slug + '.png';
    var safeName = b.name.replace(/'/g, "\\'");
    h += '<div class="mp-brand-tile" onclick="render(\'products\',{brand:\'' + safeName + '\'})" title="' + esc(b.name) + '">';
    h += '<div class="mp-brand-logo">';
    h += '<img src="' + esc(logoUrl) + '" alt="' + esc(b.name) + '" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';" />';
    h += '<span class="mp-brand-fallback" style="display:none">' + esc(b.name) + '</span>';
    h += '</div>';
    h += '<div class="mp-brand-name">' + esc(b.name) + '</div>';
    h += '</div>';
  });
  h += '</div></div>';

  // ----- 8. Sponsored partner slot (dynamic from admin) -----
  h += '<div id="partner-slot-mount"></div>';

  // ----- 9. Sell-your-parts promo (dark purple) -----
  h += '<a href="javascript:void(0)" onclick="render(\'seller-register\')" style="text-decoration:none;color:inherit">';
  h += '<div class="mp-sell-promo">';
  h += '<div class="mp-sell-promo-body">';
  var bpMap = {
    en: {q:"How much are your parts worth?", p:"Free listing, no commission until first sale — get your parts in front of buyers across Africa.", brand:"Brand", cat:"Category", any:"Any", btn:"Start selling →"},
    de: {q:"Was sind deine Teile wert?", p:"Kostenlos einstellen, keine Provision bis zum ersten Verkauf — zeig deine Teile Käufern in ganz Afrika.", brand:"Marke", cat:"Kategorie", any:"Alle", btn:"Jetzt verkaufen →"},
    fr: {q:"Combien valent vos pièces ?", p:"Annonce gratuite, aucune commission jusqu'à la première vente — présentez vos pièces aux acheteurs de toute l'Afrique.", brand:"Marque", cat:"Catégorie", any:"Toutes", btn:"Commencer à vendre →"},
    pt: {q:"Quanto valem as suas peças?", p:"Anúncio grátis, sem comissão até à primeira venda — mostre as suas peças a compradores de toda a África.", brand:"Marca", cat:"Categoria", any:"Todas", btn:"Começar a vender →"},
    es: {q:"¿Cuánto valen tus piezas?", p:"Publicación gratis, sin comisión hasta la primera venta: muestra tus piezas a compradores de toda África.", brand:"Marca", cat:"Categoría", any:"Todas", btn:"Empezar a vender →"},
    ar: {q:"كم تساوي قطعك؟", p:"إدراج مجاني، بدون عمولة حتى أول عملية بيع — اعرض قطعك على المشترين في جميع أنحاء أفريقيا.", brand:"الماركة", cat:"الفئة", any:"الكل", btn:"ابدأ البيع →"},
    tr: {q:"Parçalarınız ne kadar değerli?", p:"Ücretsiz ilan, ilk satışa kadar komisyon yok — parçalarınızı tüm Afrika'daki alıcılara ulaştırın.", brand:"Marka", cat:"Kategori", any:"Tümü", btn:"Satışa başla →"},
    sw: {q:"Vipuri vyako vina thamani gani?", p:"Tangaza bila malipo, hakuna kamisheni hadi mauzo ya kwanza — fikisha vipuri vyako kwa wanunuzi kote Afrika.", brand:"Chapa", cat:"Jamii", any:"Zote", btn:"Anza kuuza →"},
    ln: {q:"Biloko na yo ezali na motuya boni?", p:"Kotia bila mbongo, commission te tii vente ya liboso — lakisa biloko na yo na basombi na Afrika mobimba.", brand:"Marque", cat:"Catégorie", any:"Nyonso", btn:"Banda kotɛka →"}
  };
  var bp = bpMap[S.lang] || bpMap.en;
  h += '<h3>' + esc(bp.q) + '</h3>';
  h += '<p>' + esc(bp.p) + '</p>';
  h += '<div class="mp-sell-fields">';
  h += '<div><label>' + esc(bp.brand) + '</label><select onclick="event.preventDefault()"><option>' + esc(bp.any) + '</option><option>Bosch</option><option>Brembo</option><option>Mahle</option></select></div>';
  h += '<div><label>' + esc(bp.cat) + '</label><select onclick="event.preventDefault()"><option>' + esc(bp.any) + '</option><option>Bosch</option><option>Brembo</option><option>Mahle</option></select></div>';
  h += '</div>';
  h += '<button class="mp-sell-btn">' + esc(bp.btn) + '</button>';
  h += '</div>';
  h += '<div class="mp-sell-promo-img"></div>';
  h += '</div></a>';

  // ----- 10. Shops nearby (mit Geo-Erkennung) -----
  var detectedCC = (shopsGeo.detected_country || '').toUpperCase();
  var countryMatch = shopsGeo.country_match === true;
  var countryName = '';
  if (detectedCC) {
    try { countryName = new Intl.DisplayNames([S.lang], { type: 'region' }).of(detectedCC) || detectedCC; }
    catch (e) { countryName = detectedCC; }
  }
  var nearTitles = { en: 'Shops nearby', de: 'Shops in deiner Nähe', fr: 'Boutiques à proximité', pt: 'Lojas próximas', es: 'Tiendas cerca de ti', ar: 'متاجر بالقرب منك', tr: 'Yakındaki mağazalar', sw: 'Maduka karibu nawe', ln: 'Bamagazini pene na yo' };
  var inTitles = {
    en: 'Shops in ' + countryName, de: 'Shops in ' + countryName,
    fr: 'Boutiques · ' + countryName, pt: 'Lojas em ' + countryName,
    es: 'Tiendas · ' + countryName, ar: 'متاجر · ' + countryName,
    tr: countryName + ' mağazaları', sw: 'Maduka · ' + countryName, ln: 'Bamagazini · ' + countryName
  };
  var shopsTitle = (countryMatch && countryName)
    ? (inTitles[S.lang] || inTitles.en)
    : (nearTitles[S.lang] || nearTitles.en);

  h += '<div class="mp-card">';
  h += '<div class="mp-card-hd"><div class="mp-card-title">' + esc(shopsTitle) + '</div></div>';
  h += '<div class="mp-shops-grid">';
  h += '<div class="mp-shops-aside">';
  var da = ({
    en: {q:"Looking for a parts dealer near you?", p:"In our {dir} you'll find verified sellers from across Africa.", dir:"shop directory"},
    de: {q:"Suchst du einen Teilehändler in deiner Nähe?", p:"In unserem {dir} findest du verifizierte Verkäufer aus ganz Afrika.", dir:"Händlerverzeichnis"},
    fr: {q:"Vous cherchez un vendeur de pièces près de chez vous ?", p:"Dans notre {dir}, vous trouverez des vendeurs vérifiés de toute l'Afrique.", dir:"annuaire des boutiques"},
    pt: {q:"Procura um vendedor de peças perto de si?", p:"No nosso {dir} encontra vendedores verificados de toda a África.", dir:"diretório de lojas"},
    es: {q:"¿Buscas un vendedor de piezas cerca de ti?", p:"En nuestro {dir} encontrarás vendedores verificados de toda África.", dir:"directorio de tiendas"},
    ar: {q:"تبحث عن تاجر قطع غيار بالقرب منك؟", p:"في {dir} تجد بائعين موثوقين من جميع أنحاء أفريقيا.", dir:"دليل المتاجر"},
    tr: {q:"Yakınınızda parça satıcısı mı arıyorsunuz?", p:"{dir} sayfamızda tüm Afrika'dan doğrulanmış satıcılar bulabilirsiniz.", dir:"mağaza rehberi"},
    sw: {q:"Unatafuta muuzaji wa vipuri karibu nawe?", p:"Katika {dir} yetu utapata wauzaji walioidhinishwa kutoka kote Afrika.", dir:"orodha ya maduka"},
    ln: {q:"Ozali koluka motɛki ya biloko pene na yo?", p:"Na {dir} na biso okomona batɛki ya solo ya Afrika mobimba.", dir:"liste ya bamagazini"}
  })[S.lang] || null;
  if (!da) da = {q:"Looking for a parts dealer near you?", p:"In our {dir} you'll find verified sellers from across Africa.", dir:"shop directory"};
  var daLink = '<a onclick="render(\'shops\')">' + esc(da.dir) + '</a>';
  h += '<strong>' + esc(da.q) + '</strong>';
  h += '<p>' + esc(da.p).replace('{dir}', daLink) + '</p>';
  h += '</div>';
  h += '<div class="mp-shops-list">';
  if (shops.length) {
    shops.slice(0, 6).forEach(function (s) {
      var name = s.name || s.shop_name || 'Auto Shop';
      var loc = s.city || s.country || s.location || '';
      var logo = s.logo_url || '';
      h += '<div class="mp-shop-item" onclick="render(\'shop\',{id:\'' + s.id + '\'})">';
      if (logo) h += '<div class="mp-shop-logo mp-shop-logo-img"><img src="' + esc(logo) + '" alt="" loading="lazy" onerror="this.parentNode.classList.remove(\'mp-shop-logo-img\');this.parentNode.textContent=' + JSON.stringify(name.charAt(0).toUpperCase()) + '"/></div>';
      else h += '<div class="mp-shop-logo">' + esc(name.charAt(0).toUpperCase()) + '</div>';
      h += '<div class="mp-shop-info">';
      h += '<div class="mp-shop-name">' + esc(name) + '</div>';
      h += '<div class="mp-shop-loc">' + esc(loc) + '</div>';
      h += '</div></div>';
    });
  } else {
    var demoShops = [
      {n:'Accra Auto Parts', l:'Accra, GH'},
      {n:'Lagos Spares', l:'Lagos, NG'},
      {n:'Nairobi Motors', l:'Nairobi, KE'},
      {n:'Dakar Pieces', l:'Dakar, SN'},
      {n:'Kinshasa Auto', l:'Kinshasa, CD'},
      {n:'Abidjan Parts', l:'Abidjan, CI'}
    ];
    demoShops.forEach(function (s) {
      h += '<div class="mp-shop-item" onclick="render(\'shops\')">';
      h += '<div class="mp-shop-logo">' + s.n.charAt(0) + '</div>';
      h += '<div class="mp-shop-info">';
      h += '<div class="mp-shop-name">' + s.n + '</div>';
      h += '<div class="mp-shop-loc">' + s.l + '</div>';
      h += '</div></div>';
    });
  }
  h += '</div></div></div>';

  // ----- 11. Popular Brands grid -----
  h += '<div class="mp-card">';
  var pbt = ({en:"Popular Parts Brands", de:"Beliebte Teile-Marken", fr:"Marques de pièces populaires", pt:"Marcas de peças populares", es:"Marcas de piezas populares", ar:"ماركات قطع الغيار الشائعة", tr:"Popüler Parça Markaları", sw:"Chapa Maarufu za Vipuri", ln:"Bamarque ya biloko oyo elingami"})[S.lang] || "Popular Parts Brands";
  h += '<div class="mp-card-hd"><div class="mp-card-title">' + esc(pbt) + '</div></div>';
  h += '<div class="mp-brands">';
  var brands = ['Bosch','Brembo','Mahle','Mann','NGK','Sachs','Valeo','Continental','Denso','Hella','Febi','LuK'];
  brands.forEach(function (b) {
    h += '<div class="mp-brand" onclick="render(\'products\',{q:\'' + b.toLowerCase() + '\'})">';
    h += '<div class="mp-brand-icon">' + b.charAt(0) + '</div>';
    h += '<div class="mp-brand-name">' + b + '</div>';
    h += '</div>';
  });
  h += '</div></div>';

  // ----- 12. Browse by Brand & Category links -----
  h += '<div class="mp-card">';
  var linkTitle = ({en:"Popular Brands & more on our marketplace", de:"Beliebte Marken & mehr auf unserem Marktplatz", fr:"Marques populaires et plus sur notre marché", pt:"Marcas populares e mais no nosso marketplace", es:"Marcas populares y más en nuestro mercado", ar:"ماركات شائعة والمزيد في سوقنا", tr:"Pazarımızda popüler markalar ve daha fazlası", sw:"Chapa maarufu na zaidi kwenye soko letu", ln:"Bamarque oyo elingami mpe biloko mosusu na marché na biso"})[S.lang] || "Popular Brands & more on our marketplace";
  h += '<div class="mp-card-hd"><div class="mp-card-title">' + esc(linkTitle) + '</div></div>';
  h += '<div class="mp-link-cols">';

  var linkColsByLang = {
    en: [
      {title:'Bosch Parts', items:['Bosch oil filter','Bosch spark plugs','Bosch wiper blades','Bosch starter','Bosch alternator']},
      {title:'Brembo Parts', items:['Brembo brake pads','Brembo discs','Brembo calipers','Brembo brake kit','Brembo sport']},
      {title:'Engine Parts', items:['Timing belt','Timing chain','Water pump','Piston rings','Cylinder head']},
      {title:'Brake Parts', items:['Front brake pads','Rear brake pads','Brake discs','Brake calipers','ABS sensor']},
      {title:'Filters', items:['Oil filter','Air filter','Fuel filter','Cabin filter','DPF filter']},
      {title:'Suspension', items:['Shock absorber','Coil spring','Control arm','Ball joint','Wheel bearing']},
      {title:'Body & Exterior', items:['Front bumper','Headlight','Tail light','Side mirror','Door handle']},
      {title:'Oils & Fluids', items:['5W-30 engine oil','5W-40 engine oil','DOT 4 brake fluid','Coolant G12','Power steering fluid']}
    ],
    de: [
      {title:'Bosch Teile', items:['Bosch Ölfilter','Bosch Zündkerzen','Bosch Wischerblätter','Bosch Anlasser','Bosch Lichtmaschine']},
      {title:'Brembo Teile', items:['Brembo Bremsbeläge','Brembo Bremsscheiben','Brembo Bremssättel','Brembo Bremsen-Kit','Brembo Sport']},
      {title:'Motorteile', items:['Zahnriemen','Steuerkette','Wasserpumpe','Kolbenringe','Zylinderkopf']},
      {title:'Bremsenteile', items:['Bremsbeläge vorne','Bremsbeläge hinten','Bremsscheiben','Bremssättel','ABS-Sensor']},
      {title:'Filter', items:['Ölfilter','Luftfilter','Kraftstofffilter','Innenraumfilter','DPF-Filter']},
      {title:'Fahrwerk', items:['Stoßdämpfer','Fahrwerksfeder','Querlenker','Traggelenk','Radlager']},
      {title:'Karosserie & Außen', items:['Frontstoßstange','Scheinwerfer','Rückleuchte','Außenspiegel','Türgriff']},
      {title:'Öle & Flüssigkeiten', items:['5W-30 Motoröl','5W-40 Motoröl','DOT 4 Bremsflüssigkeit','Kühlmittel G12','Servoöl']}
    ],
    fr: [
      {title:'Pièces Bosch', items:['Filtre à huile Bosch','Bougies Bosch','Balais d\'essuie-glace Bosch','Démarreur Bosch','Alternateur Bosch']},
      {title:'Pièces Brembo', items:['Plaquettes de frein Brembo','Disques Brembo','Étriers Brembo','Kit de freinage Brembo','Brembo Sport']},
      {title:'Pièces moteur', items:['Courroie de distribution','Chaîne de distribution','Pompe à eau','Segments de piston','Culasse']},
      {title:'Pièces de frein', items:['Plaquettes avant','Plaquettes arrière','Disques de frein','Étriers de frein','Capteur ABS']},
      {title:'Filtres', items:['Filtre à huile','Filtre à air','Filtre à carburant','Filtre d\'habitacle','Filtre FAP']},
      {title:'Suspension', items:['Amortisseur','Ressort','Bras de suspension','Rotule de suspension','Roulement de roue']},
      {title:'Carrosserie & extérieur', items:['Pare-chocs avant','Phare','Feu arrière','Rétroviseur','Poignée de porte']},
      {title:'Huiles & liquides', items:['Huile moteur 5W-30','Huile moteur 5W-40','Liquide de frein DOT 4','Liquide de refroidissement G12','Liquide de direction assistée']}
    ],
    pt: [
      {title:'Peças Bosch', items:['Filtro de óleo Bosch','Velas Bosch','Escovas limpa-vidros Bosch','Motor de arranque Bosch','Alternador Bosch']},
      {title:'Peças Brembo', items:['Pastilhas de freio Brembo','Discos Brembo','Pinças Brembo','Kit de freio Brembo','Brembo Sport']},
      {title:'Peças do motor', items:['Correia dentada','Corrente de distribuição','Bomba d\'água','Anéis de pistão','Cabeçote']},
      {title:'Peças de freio', items:['Pastilhas dianteiras','Pastilhas traseiras','Discos de freio','Pinças de freio','Sensor ABS']},
      {title:'Filtros', items:['Filtro de óleo','Filtro de ar','Filtro de combustível','Filtro de cabine','Filtro DPF']},
      {title:'Suspensão', items:['Amortecedor','Mola','Braço de suspensão','Pivô de suspensão','Rolamento de roda']},
      {title:'Carroçaria & exterior', items:['Para-choque dianteiro','Farol','Lanterna traseira','Retrovisor','Maçaneta']},
      {title:'Óleos & fluidos', items:['Óleo 5W-30','Óleo 5W-40','Fluido de freio DOT 4','Líquido de arrefecimento G12','Fluido de direção hidráulica']}
    ],
    es: [
      {title:'Piezas Bosch', items:['Filtro de aceite Bosch','Bujías Bosch','Escobillas Bosch','Motor de arranque Bosch','Alternador Bosch']},
      {title:'Piezas Brembo', items:['Pastillas de freno Brembo','Discos Brembo','Pinzas Brembo','Kit de frenos Brembo','Brembo Sport']},
      {title:'Piezas de motor', items:['Correa de distribución','Cadena de distribución','Bomba de agua','Segmentos de pistón','Culata']},
      {title:'Piezas de freno', items:['Pastillas delanteras','Pastillas traseras','Discos de freno','Pinzas de freno','Sensor ABS']},
      {title:'Filtros', items:['Filtro de aceite','Filtro de aire','Filtro de combustible','Filtro de habitáculo','Filtro FAP/DPF']},
      {title:'Suspensión', items:['Amortiguador','Muelle','Brazo de suspensión','Rótula','Rodamiento de rueda']},
      {title:'Carrocería & exterior', items:['Parachoques delantero','Faro','Piloto trasero','Retrovisor','Manija de puerta']},
      {title:'Aceites & líquidos', items:['Aceite 5W-30','Aceite 5W-40','Líquido de frenos DOT 4','Refrigerante G12','Líquido de dirección asistida']}
    ],
    ar: [
      {title:'قطع Bosch', items:['فلتر زيت Bosch','شمعات إشعال Bosch','مساحات Bosch','بادئ تشغيل Bosch','مولد Bosch']},
      {title:'قطع Brembo', items:['تيل فرامل Brembo','أقراص Brembo','فكوك Brembo','طقم فرامل Brembo','Brembo Sport']},
      {title:'قطع المحرك', items:['سير التوقيت','جنزير التوقيت','مضخة الماء','حلقات المكبس','رأس الأسطوانة']},
      {title:'قطع الفرامل', items:['تيل فرامل أمامي','تيل فرامل خلفي','أقراص فرامل','فكوك فرامل','حساس ABS']},
      {title:'الفلاتر', items:['فلتر زيت','فلتر هواء','فلتر وقود','فلتر مقصورة','فلتر DPF']},
      {title:'التعليق', items:['ممتص صدمات','نابض حلزوني','ذراع تحكم','وصلة كروية','رمان بلي العجلة']},
      {title:'الهيكل والخارج', items:['الصدام الأمامي','مصباح أمامي','مصباح خلفي','مرآة جانبية','مقبض الباب']},
      {title:'الزيوت والسوائل', items:['زيت محرك 5W-30','زيت محرك 5W-40','سائل فرامل DOT 4','سائل تبريد G12','زيت باور']}
    ],
    tr: [
      {title:'Bosch Parçaları', items:['Bosch yağ filtresi','Bosch buji','Bosch silecek','Bosch marş motoru','Bosch alternatör']},
      {title:'Brembo Parçaları', items:['Brembo fren balatası','Brembo disk','Brembo kaliper','Brembo fren kiti','Brembo Sport']},
      {title:'Motor Parçaları', items:['Triger kayışı','Triger zinciri','Devirdaim','Piston segmanı','Silindir kapağı']},
      {title:'Fren Parçaları', items:['Ön fren balatası','Arka fren balatası','Fren diski','Fren kaliperi','ABS sensörü']},
      {title:'Filtreler', items:['Yağ filtresi','Hava filtresi','Yakıt filtresi','Polen filtresi','DPF filtresi']},
      {title:'Süspansiyon', items:['Amortisör','Helezon yay','Salıncak','Rotil','Teker rulmanı']},
      {title:'Kaporta & Dış', items:['Ön tampon','Far','Stop lambası','Yan ayna','Kapı kolu']},
      {title:'Yağlar & Sıvılar', items:['5W-30 motor yağı','5W-40 motor yağı','DOT 4 fren hidroliği','G12 antifriz','Direksiyon hidroliği']}
    ],
    sw: [
      {title:'Vipuri vya Bosch', items:['Kichujio cha mafuta Bosch','Plagi za moto Bosch','Vifuta vya Bosch','Starter ya Bosch','Alternator ya Bosch']},
      {title:'Vipuri vya Brembo', items:['Pedi za breki Brembo','Diski za Brembo','Kaliper za Brembo','Kiti cha breki Brembo','Brembo Sport']},
      {title:'Vipuri vya injini', items:['Mkanda wa timing','Mnyororo wa timing','Pampu ya maji','Pete za pistoni','Kichwa cha silinda']},
      {title:'Vipuri vya breki', items:['Pedi za breki mbele','Pedi za breki nyuma','Diski za breki','Kaliper za breki','Sensa ya ABS']},
      {title:'Vichujio', items:['Kichujio cha mafuta','Kichujio cha hewa','Kichujio cha mafuta ya gari','Kichujio cha kabati','Kichujio cha DPF']},
      {title:'Suspension', items:['Shock absorber','Springi','Control arm','Ball joint','Beringi ya gurudumu']},
      {title:'Mwili & Nje', items:['Bumper ya mbele','Taa ya mbele','Taa ya nyuma','Kioo cha pembeni','Mpini wa mlango']},
      {title:'Mafuta & Majimaji', items:['Mafuta ya injini 5W-30','Mafuta ya injini 5W-40','Maji ya breki DOT 4','Coolant G12','Maji ya usukani']}
    ],
    ln: [
      {title:'Biloko ya Bosch', items:['Filtre ya mafuta Bosch','Bougies Bosch','Essuie-glaces Bosch','Démarreur Bosch','Alternateur Bosch']},
      {title:'Biloko ya Brembo', items:['Plaquettes ya frein Brembo','Disques Brembo','Étriers Brembo','Kit ya frein Brembo','Brembo Sport']},
      {title:'Biloko ya moteur', items:['Courroie ya distribution','Chaîne ya distribution','Pompe ya mai','Segments ya piston','Culasse']},
      {title:'Biloko ya frein', items:['Plaquettes liboso','Plaquettes nsima','Disques ya frein','Étriers ya frein','Capteur ABS']},
      {title:'Filtres', items:['Filtre ya mafuta','Filtre à air','Filtre ya carburant','Filtre ya habitacle','Filtre DPF']},
      {title:'Suspension', items:['Amortisseur','Ressort','Bras ya suspension','Rotule','Roulement ya roue']},
      {title:'Carrosserie & libándá', items:['Pare-chocs liboso','Phare','Feu nsima','Rétroviseur','Poignée ya porte']},
      {title:'Huiles & liquides', items:['Huile moteur 5W-30','Huile moteur 5W-40','Liquide ya frein DOT 4','Liquide de refroidissement G12','Liquide ya direction']}
    ]
  };
  var linkCols = linkColsByLang[S.lang] || linkColsByLang.en;
  linkCols.forEach(function (col) {
    h += '<div class="mp-link-col"><h5>' + esc(col.title) + '</h5><ul>';
    col.items.forEach(function (it) {
      h += '<li onclick="render(\'products\',{q:\'' + esc(it).replace(/\'/g, "") + '\'})">' + esc(it) + '</li>';
    });
    h += '</ul></div>';
  });
  h += '</div></div>';

  // ----- 13. SEO long-text (mehrsprachig via i18n) -----
  h += '<div class="mp-card mp-seo">';
  h += '<h2 style="font-size:1.4rem;margin-bottom:.75rem;font-weight:800">' + esc(t('seoblk.h2')) + '</h2>';
  h += '<p>' + esc(t('seoblk.lead')) + '</p>';
  h += '<h3 style="font-size:1.05rem;font-weight:800">' + esc(t('seoblk.h3')) + '</h3>';
  h += '<p>' + esc(t('seoblk.p_buy')) + '</p>';
  h += '<p>' + esc(t('seoblk.p_sell')) + '</p>';
  h += '<p><strong>' + esc(t('seoblk.tip_label')) + '</strong> ' + esc(t('seoblk.tip_body')) + ' <a onclick="render(\'login\')">' + esc(t('seoblk.register')) + '</a></p>';
  h += '<p>' + esc(t('seoblk.intl_label')) + ' <a>GH</a> | <a>NG</a> | <a>KE</a> | <a>CD</a> | <a>SN</a> | <a>CI</a> | <a>ZA</a></p>';

  h += '<div class="mp-seo-cols">';
  h += '<div><h4>' + esc(t('seoblk.used_t')) + '</h4><p>' + esc(t('seoblk.used_d')) + '</p><a onclick="render(\'products\',{condition:\'used\'})">' + esc(t('seoblk.used_cta')) + '</a></div>';
  h += '<div><h4>' + esc(t('seoblk.new_t')) + '</h4><p>' + esc(t('seoblk.new_d')) + '</p><a onclick="render(\'products\',{condition:\'new\'})">' + esc(t('seoblk.new_cta')) + '</a></div>';
  h += '<div><h4>' + esc(t('seoblk.whole_t')) + '</h4><p>' + esc(t('seoblk.whole_d')) + '</p><a onclick="render(\'products\')">' + esc(t('seoblk.whole_cta')) + '</a></div>';
  h += '<div><h4>' + esc(t('seoblk.sell_t')) + '</h4><p>' + esc(t('seoblk.sell_d')) + '</p><a onclick="render(\'login\')">' + esc(t('seoblk.sell_cta')) + '</a></div>';
  h += '</div></div>';

  h += '<div id="seo-bottom-mount"></div>';

  h += '</div>'; // /page-wrap mp-stack

  $('content').innerHTML = h;

  // Insert SEO-top mount immediately after hero (before the main page-wrap)
  // Note: we inject it via JS to keep the HTML build simple
  setTimeout(function() {
    var hero = document.querySelector('.hero');
    if (hero && !document.getElementById('seo-top-mount')) {
      var div = document.createElement('div');
      div.id = 'seo-top-mount';
      hero.parentNode.insertBefore(div, hero.nextSibling);
    }
    // Side banner mounts (added once globally to body, outside #content)
    if (!document.getElementById('side-banner-left-mount')) {
      var sl = document.createElement('div');
      sl.id = 'side-banner-left-mount';
      sl.className = 'side-banner side-banner-left';
      document.body.appendChild(sl);
    }
    if (!document.getElementById('side-banner-right-mount')) {
      var sr = document.createElement('div');
      sr.id = 'side-banner-right-mount';
      sr.className = 'side-banner side-banner-right';
      document.body.appendChild(sr);
    }
    // Load all dynamic content
    mountHomeDynamic();
  }, 0);
});

// Home-page filter (currently just routes to products with the filled criteria)
window.doHomeFilter = function () {
  var params = {};
  var b = $('fBrand'); if (b && b.value) params.brand = b.value;
  var m = $('fModel'); if (m && m.value) params.model = m.value;
  var y = $('fYear'); if (y && y.value) params.year = y.value;
  var c = $('fCond'); if (c && c.value) params.condition = c.value;
  var o = $('fOem'); if (o && o.value) params.oem = o.value;
  var l = $('fLoc'); if (l && l.value) params.location = l.value;
  var n = $('fNewOnly'); if (n && n.checked) params.condition = 'new';
  render('products', params);
};


async function renderBannerRotator() {
  try {
    const res = await apiReq('/banners', 'GET', null, false);
    const banners = res.data || [];
    if (!banners.length) return '';

    const slides = banners.map(function (b, i) {
      const safeImg = String(b.image_url).replace(/'/g, '%27');
      return '<div class="hero-slide-bg' + (i===0?' is-active':'') + '" style="background-image:url(\'' + safeImg + '\')" aria-hidden="true"></div>';
    }).join('');

    const dots = banners.length > 1
      ? '<div class="hero-dots">' + banners.map(function (_, i) {
          return '<button class="hero-dot' + (i===0?' is-active':'') + '" data-i="' + i + '" aria-label="Banner ' + (i+1) + '"></button>';
        }).join('') + '</div>'
      : '';

    return slides + '<div class="hero-bg-overlay"></div>' + dots;
  } catch (e) {
    console.error('renderBannerRotator', e);
    return '';
  }
}

function startBannerRotation(intervalMs) {
  intervalMs = intervalMs || 6000;
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const slides = hero.querySelectorAll('.hero-slide-bg');
  const dots   = hero.querySelectorAll('.hero-dot');
  if (slides.length < 2) return;

  let i = 0;
  const show = function (next) {
    slides[i].classList.remove('is-active');
    if (dots[i]) dots[i].classList.remove('is-active');
    i = (next + slides.length) % slides.length;
    slides[i].classList.add('is-active');
    if (dots[i]) dots[i].classList.add('is-active');
  };
  let timer = setInterval(function () { show(i + 1); }, intervalMs);

  dots.forEach(function (d) {
    d.addEventListener('click', function () {
      clearInterval(timer);
      show(parseInt(d.dataset.i, 10));
      timer = setInterval(function () { show(i + 1); }, intervalMs);
    });
  });
  hero.addEventListener('mouseenter', function () { clearInterval(timer); });
  hero.addEventListener('mouseleave', function () {
    timer = setInterval(function () { show(i + 1); }, intervalMs);
  });
}

function doSearch() {
  const q = $('hsearch') ? $('hsearch').value.trim() : '';
  const cat = $('hCat') ? $('hCat').value : '';
  const params = {};
  if (q) params.q = q;
  if (cat) params.category_id = cat;
  render('products', params);
}

function vcToggle() {
  var p = $('vc-cat-panel');
  if (!p) return;
  var open = p.style.display !== 'none';
  p.style.display = open ? 'none' : 'block';
  if (!open) {
    // Load DB categories on first open
    if (!window._vcDBLoaded) {
      window._vcDBLoaded = true;
      apiReq('/categories?lang=' + S.lang, 'GET', null, false).then(function(cats) {
        window._vcMainCats = Array.isArray(cats) ? cats : (cats.data || []);
        vcpShow(0);
      }).catch(function() {
        // Fallback to static tree
        if (_VCT && _VCT.length) vcpShow(0);
      });
    } else {
      vcpShow(0);
    }
  }
}

function vcpShow(idx) {
  var titleEl = document.getElementById('vcp-title');
  var bodyEl  = document.getElementById('vcp-body');
  if (!titleEl || !bodyEl) return;

  // Highlight active in left column
  document.querySelectorAll('.vcp-item').forEach(function(el) {
    el.classList.toggle('active', el.dataset.idx == idx);
  });

  // Use DB categories if available
  var mainCats = window._vcMainCats;
  if (mainCats && mainCats[idx]) {
    var cat = mainCats[idx];
    titleEl.textContent = cat.name;
    bodyEl.innerHTML = '<div style="color:var(--text3);font-size:.85rem;padding:.5rem 0">Loading...</div>';

    // Fetch subcategories from DB
    apiReq('/categories/' + cat.id + '/subs?lang=' + S.lang, 'GET', null, false).then(function(subs) {
      var subList = Array.isArray(subs) ? subs : (subs.data || []);
      if (!subList.length) {
        // Fallback: show static tree
        bodyEl.innerHTML = vcpBuildStatic(idx);
        return;
      }
      var html = '<div class="vcp-chips">';
      subList.forEach(function(sub) {
        // Filter by category_id ONLY — no q text-search, otherwise products
        // whose titles use singular ("Bremsbelag") get hidden when the
        // category is plural ("Bremsbeläge"). The relink endpoint already
        // ensures products are correctly linked by category_id.
        html += '<button class="vcp-chip" onclick="render(\'products\',{category_id:\'' + sub.id + '\',category_name:\'' + esc(sub.name).replace(/'/g,'') + '\'});vcToggle()" title="' + esc(sub.name) + '">' + esc(sub.name) + ' <span style="opacity:.35">›</span></button>';
      });
      html += '</div>';
      bodyEl.innerHTML = html;
    }).catch(function() {
      bodyEl.innerHTML = vcpBuildStatic(idx);
    });
  } else if (_VCT && _VCT[idx]) {
    // Fallback to static tree
    titleEl.textContent = _VCT[idx].l;
    bodyEl.innerHTML = vcpBuildStatic(idx);
  }
}

function vcpBuildStatic(idx) {
  if (!_VCT || !_VCT[idx]) return '';
  var cat = _VCT[idx];
  var catEN = (_VCT_EN && _VCT_EN[idx]) || cat;
  var html = '';
  (cat.subs || []).forEach(function(grp, si) {
    var grpEN = (catEN.subs && catEN.subs[si]) || grp;
    html += '<div class="vcp-grp-title">' + grp.g + '</div>';
    html += '<div class="vcp-chips">';
    (grp.items || []).forEach(function(item, ii) {
      var qTerm = (grpEN.items && grpEN.items[ii]) ? grpEN.items[ii] : item;
      var safe = qTerm.replace(/'/g,'').replace(/"/g,'');
      html += '<button class="vcp-chip" onclick="render(\'products\',{q:\'' + safe + '\'});vcToggle()" title="' + safe + '">' + item + '</button>';
    });
    html += '</div>';
  });
  return html;
}

// Close panel on outside click
document.addEventListener('click', function(e) {
  var panel = $('vc-cat-panel');
  var btn   = $('vc-cat-toggle');
  if (panel && btn && !panel.contains(e.target) && !btn.contains(e.target)) {
    panel.style.display = 'none';
  }
});

/* ---------- ROUTE: PRODUCTS (Autodoc-style) ---------- */
route('products', async function (P) {
  P = P || {};

  // Fahrzeug-Listen aus zentraler Quelle (oben definiert)
  var CAR_BRANDS = window.CAR_BRANDS;
  var CAR_MODELS = window.CAR_MODELS;
  var ENGINE_TYPES = window.ENGINE_TYPES;

  var cats = [];
  try {
    var cR = await apiReq('/categories?lang=' + S.lang, 'GET', null, false);
    cats = Array.isArray(cR) ? cR : (cR.data || []);
  } catch (e) {}

  var F = {
    q: P.q || '', category_id: P.category_id || '',
    condition: P.condition || '', brand: P.brand || '',
    wholesale: P.wholesale || '', wholesale_only: P.wholesale_only || '',
    page: parseInt(P.page) || 1, limit: 20,
    sort: P.sort || 'recommended',
    car_brand: P.car_brand || '', car_model: P.car_model || '', engine: P.engine || ''
  };

  // ===== INITIAL LAYOUT =====
  var h = '<div class="products-page">';

  // ---- LEFT SIDEBAR ----
  h += '<aside class="pp-sidebar">';

  // Vehicle selector card
  h += '<div class="pp-vehicle-card">';
  h += '<h3>' + esc(t('pp.vehicle_title')) + '</h3>';

  // Step 1: Brand
  h += '<div class="vs-step" id="vsStep1" onclick="vsToggle(1)">';
  h += '<span class="vs-num">1</span>';
  h += '<span class="vs-label" id="vsLabel1">' + (F.car_brand || t('pp.select_brand')) + '</span>';
  h += '<svg class="vs-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>';
  h += '</div>';
  h += '<div class="vs-dropdown" id="vsDrop1">';
  CAR_BRANDS.forEach(function (b) {
    h += '<div class="vs-option" onclick="vsPick(1,\'' + b + '\')">' + b + '</div>';
  });
  h += '</div>';

  // Step 2: Model
  h += '<div class="vs-step ' + (F.car_brand ? '' : 'disabled') + '" id="vsStep2" onclick="vsToggle(2)">';
  h += '<span class="vs-num">2</span>';
  h += '<span class="vs-label" id="vsLabel2">' + (F.car_model || t('pp.select_model')) + '</span>';
  h += '<svg class="vs-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>';
  h += '</div>';
  h += '<div class="vs-dropdown" id="vsDrop2"></div>';

  // Step 3: Engine
  h += '<div class="vs-step ' + (F.car_model ? '' : 'disabled') + '" id="vsStep3" onclick="vsToggle(3)">';
  h += '<span class="vs-num">3</span>';
  h += '<span class="vs-label" id="vsLabel3">' + (F.engine || t('pp.select_engine')) + '</span>';
  h += '<svg class="vs-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>';
  h += '</div>';
  h += '<div class="vs-dropdown" id="vsDrop3">';
  ENGINE_TYPES.forEach(function (et) {
    h += '<div class="vs-option" onclick="vsPick(3,\'' + et + '\')">' + et + '</div>';
  });
  h += '</div>';

  // Step 4: Autoteil (Kategorie)
  h += '<div class="vs-step" id="vsStep4" onclick="vsToggle(4)">';
  h += '<span class="vs-num">4</span>';
  h += '<span class="vs-label" id="vsLabel4">' + (F.category_id && P.category_name ? esc(P.category_name) : t('pp.select_part')) + '</span>';
  h += '<svg class="vs-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>';
  h += '</div>';
  h += '<div class="vs-dropdown" id="vsDrop4">';
  cats.forEach(function (c) {
    var nm = esc(c['name_' + S.lang] || c.name);
    h += '<div class="vs-option" onclick="vsPickPart(\'' + c.id + '\',\'' + nm.replace(/\'/g, '') + '\')">' + nm + '</div>';
  });
  h += '</div>';

  h += '<button class="vs-search-btn" id="vsSearchBtn" onclick="vsApply()"' + ((F.car_brand || F.category_id) ? '' : ' disabled') + '>';
  h += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
  h += t('pp.search') + '</button>';
  h += '</div>';

  // HSN/TSN card
  h += '<div class="pp-hsn-card">';
  h += '<div class="pp-hsn-hd"><h3>' + t('pp.hsn_title') + '</h3>';
  h += '<span class="pp-hsn-info" title="' + t('pp.hsn_tooltip') + '">i</span></div>';
  h += '<div class="pp-hsn-row">';
  h += '<input type="text" id="hsn" maxlength="4" class="pp-hsn-input" placeholder="' + t('pp.hsn_4') + '"/>';
  h += '<input type="text" id="tsn" maxlength="3" class="pp-hsn-input" placeholder="' + t('pp.hsn_3') + '"/>';
  h += '</div>';
  h += '<div class="pp-hsn-hints">';
  h += '<div class="pp-hsn-hint">' + t('pp.hsn_hint_1') + '</div>';
  h += '<div class="pp-hsn-hint">' + t('pp.hsn_hint_2') + '</div>';
  h += '</div>';
  h += '<button class="vs-search-btn" onclick="hsnSearch()">';
  h += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
  h += t('pp.search') + '</button>';
  h += '<a class="pp-not-found-link" onclick="render(\'shops\')">' + t('pp.not_found_link') + '</a>';
  h += '</div>';

  h += '</aside>';

  // ---- MAIN AREA ----
  h += '<div class="pp-main">';

  // Title
  var titleSearch = F.q ? esc(F.q) : (F.car_brand ? esc(F.car_brand) : (P.category_name ? esc(P.category_name) : 'All Parts'));
  h += '<h1 class="pp-title" id="ppTitle">' + t("pp.loading") + ' <span class="accent">' + titleSearch + '</span></h1>';

  // Category tiles
  h += '<div class="pp-section-title">' + t('pp.choose_cat') + '</div>';
  h += '<div class="pp-cat-scroller">';
  h += '<div class="pp-cat-track" id="ppCatTrack">';
  // "All categories" tile
  h += '<div class="pp-cat-tile ' + (F.category_id ? '' : 'active') + '" onclick="ppPickCat(\'\',\'\')">';
  h += '<div class="pp-cat-img"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></div>';
  h += '<div class="pp-cat-name">' + t('pp.all_categories') + '</div>';
  h += '</div>';
  // Dynamic categories from API
  cats.forEach(function (c) {
    var nm = esc(c['name_' + S.lang] || c.name);
    var isActive = String(F.category_id) === String(c.id);
    h += '<div class="pp-cat-tile ' + (isActive ? 'active' : '') + '" onclick="ppPickCat(\'' + c.id + '\',\'' + nm.replace(/\'/g, '') + '\')">';
    h += '<div class="pp-cat-img">';
    if (c.image) {
      h += '<img src="' + esc(c.image) + '" alt="' + nm + '" style="width:100%;height:100%;object-fit:contain"/>';
    } else {
      h += '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
    }
    h += '</div>';
    h += '<div class="pp-cat-name">' + nm + '</div>';
    h += '</div>';
  });
  h += '</div>';
  h += '<button class="pp-cat-scroll-btn left" onclick="document.getElementById(\'ppCatTrack\').scrollBy({left:-300,behavior:\'smooth\'})" aria-label="Scroll left"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg></button>';
  h += '<button class="pp-cat-scroll-btn right" onclick="document.getElementById(\'ppCatTrack\').scrollBy({left:300,behavior:\'smooth\'})" aria-label="Scroll right"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg></button>';
  h += '</div>';

  // Result bar + list
  h += '<div class="pp-result-bar">';
  h += '<div class="pp-result-count" id="ppCount">' + t('pp.loading') + '</div>';
  h += '<div class="pp-sort">' + t('pp.sort_by') + ' ';
  h += '<select id="ppSort" onchange="applyF()">';
  h += '<option value="recommended"' + (F.sort === 'recommended' ? ' selected' : '') + '>' + t('pp.sort_recommended') + '</option>';
  h += '<option value="price_asc"' + (F.sort === 'price_asc' ? ' selected' : '') + '>' + t('pp.sort_price_asc') + '</option>';
  h += '<option value="price_desc"' + (F.sort === 'price_desc' ? ' selected' : '') + '>' + t('pp.sort_price_desc') + '</option>';
  h += '<option value="newest"' + (F.sort === 'newest' ? ' selected' : '') + '>' + t('pp.sort_newest') + '</option>';
  h += '</select>';
  h += '</div></div>';

  h += '<div id="ppListWrap"><div class="loading-wrap"><div class="spinner"></div></div></div>';

  h += '</div>'; // /pp-main
  h += '</div>'; // /products-page

  $('content').innerHTML = h;

  // ===== STATE FOR DROPDOWNS =====
  window._vsState = { brand: F.car_brand, model: F.car_model, engine: F.engine, category_id: F.category_id || '', category_name: P.category_name || '' };

  window.vsToggle = function (n) {
    var step = document.getElementById('vsStep' + n);
    if (!step || step.classList.contains('disabled')) return;
    // Close other open ones
    [1, 2, 3, 4].forEach(function (i) {
      if (i !== n) document.getElementById('vsStep' + i).classList.remove('open');
    });
    step.classList.toggle('open');
  };

  window.vsPick = function (n, value) {
    document.getElementById('vsStep' + n).classList.remove('open');
    document.getElementById('vsLabel' + n).textContent = value;
    document.getElementById('vsStep' + n).classList.add('done');

    if (n === 1) {
      window._vsState.brand = value;
      window._vsState.model = ''; window._vsState.engine = '';
      // Enable step 2, populate dropdown
      var s2 = document.getElementById('vsStep2'); s2.classList.remove('disabled');
      document.getElementById('vsLabel2').textContent = t('pp.select_model');
      s2.classList.remove('done');
      var d2 = document.getElementById('vsDrop2');
      var models = CAR_MODELS[value] || [];
      d2.innerHTML = models.length ? models.map(function (m) {
        return '<div class="vs-option" onclick="vsPick(2,\'' + m + '\')">' + m + '</div>';
      }).join('') : '<div class="vs-option" style="color:var(--text3)">' + t('pp.no_models') + '</div>';
      // Reset step 3
      var s3 = document.getElementById('vsStep3'); s3.classList.add('disabled'); s3.classList.remove('done');
      document.getElementById('vsLabel3').textContent = t('pp.select_engine');
      document.getElementById('vsSearchBtn').disabled = false;
    } else if (n === 2) {
      window._vsState.model = value;
      window._vsState.engine = '';
      var s3 = document.getElementById('vsStep3'); s3.classList.remove('disabled');
      document.getElementById('vsLabel3').textContent = t('pp.select_engine');
      s3.classList.remove('done');
    } else {
      window._vsState.engine = value;
    }
  };

  window.vsPickPart = function (id, name) {
    var step = document.getElementById('vsStep4');
    step.classList.remove('open');
    document.getElementById('vsLabel4').textContent = name;
    step.classList.add('done');
    window._vsState.category_id = id;
    window._vsState.category_name = name;
    var btn = document.getElementById('vsSearchBtn'); if (btn) btn.disabled = false;
  };

  window.vsApply = function () {
    var st = window._vsState;
    if (!st.brand && !st.category_id) return;
    var params = {};
    if (st.brand) params.car_brand = st.brand;
    if (st.model) params.car_model = st.model;
    if (st.engine) params.engine = st.engine;
    if (st.category_id) { params.category_id = st.category_id; if (st.category_name) params.category_name = st.category_name; }
    if (F.q) params.q = F.q;
    render('products', params);
  };

  window.hsnSearch = function () {
    var h = ($('hsn') && $('hsn').value || '').trim();
    var tn = ($('tsn') && $('tsn').value || '').trim();
    if (!h || !tn) { toast(t('pp.hsn_enter_both')); return; }
    render('products', { q: 'HSN ' + h + ' TSN ' + t });
  };

  window.ppPickCat = function (id, name) {
    var params = {};
    if (id) { params.category_id = id; params.category_name = name; }
    if (F.q) params.q = F.q;
    if (F.car_brand) params.car_brand = F.car_brand;
    if (F.car_model) params.car_model = F.car_model;
    render('products', params);
  };

  // Close vs dropdowns on outside click
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.vs-step') && !e.target.closest('.vs-dropdown')) {
      [1, 2, 3].forEach(function (i) {
        var el = document.getElementById('vsStep' + i);
        if (el) el.classList.remove('open');
      });
    }
  });

  // ===== LOAD PRODUCTS =====
  var load = async function () {
    var qs = Object.keys(F)
      .filter(function (k) { return F[k] !== '' && F[k] !== null && k !== 'sort' && k !== 'car_brand' && k !== 'car_model' && k !== 'engine'; })
      .map(function (k) { return k + '=' + encodeURIComponent(F[k]); })
      .join('&');
    // Fahrzeug-Filter als eigene Parameter (matchen serverseitig gegen fits_vehicles + Text)
    if (F.car_brand) qs += '&car_brand=' + encodeURIComponent(F.car_brand);
    if (F.car_model) qs += '&car_model=' + encodeURIComponent(F.car_model);

    var res = { data: [], pagination: { total: 0, pages: 1 } };
    try {
      res = await apiReq('/products?' + qs + '&currency=' + S.currency, 'GET', null, false);
    } catch (e) {}

    var products = res.data || res.products || [];
    var total = (res.pagination && res.pagination.total) || products.length;
    var pages = (res.pagination && res.pagination.pages) || 1;

    // Apply client-side sort
    if (F.sort === 'price_asc') products.sort(function (a, b) { return (a.price_usd || 0) - (b.price_usd || 0); });
    else if (F.sort === 'price_desc') products.sort(function (a, b) { return (b.price_usd || 0) - (a.price_usd || 0); });
    else if (F.sort === 'newest') products.sort(function (a, b) { return new Date(b.created_at || 0) - new Date(a.created_at || 0); });

    // Update title + count
    var ttl = $('ppTitle');
    var cnt = $('ppCount');
    var srch = F.q || F.car_brand || P.category_name || t('pp.all_parts');
    if (ttl) ttl.innerHTML = total + ' ' + t("pp.results_for") + ' <span class="accent">' + esc(srch) + '</span>';
    if (cnt) cnt.textContent = total + ' ' + t('pp.items');

    var wrap = $('ppListWrap');
    if (!wrap) return;

    if (products.length) {
      var html = '<div class="pp-list">' + products.map(prow).join('') + '</div>';
      // Pagination
      if (pages > 1) {
        html += '<div class="pp-pagination">';
        html += '<button class="pp-page-btn" onclick="moreP(' + Math.max(1, F.page - 1) + ')"' + (F.page <= 1 ? ' disabled' : '') + '>' + t('pp.prev') + '</button>';
        var startPg = Math.max(1, F.page - 2);
        var endPg = Math.min(pages, startPg + 4);
        for (var p = startPg; p <= endPg; p++) {
          html += '<button class="pp-page-btn ' + (p === F.page ? 'active' : '') + '" onclick="moreP(' + p + ')">' + p + '</button>';
        }
        html += '<button class="pp-page-btn" onclick="moreP(' + Math.min(pages, F.page + 1) + ')"' + (F.page >= pages ? ' disabled' : '') + '>' + t('pp.next') + '</button>';
        html += '<span class="pp-page-info">' + t('pp.page') + ' ' + F.page + ' ' + t('pp.page_of') + ' ' + pages + '</span>';
        html += '</div>';
      }
      wrap.innerHTML = html;
    } else {
      wrap.innerHTML = '<div class="pp-list"><div class="empty-state" style="padding:4rem 1rem"><div class="empty-icon">🔍</div><h3>' + t('errors.no_parts') + '</h3><button class="btn-secondary" style="margin-top:1rem" onclick="render(\'products\')">' + t('filter.reset') + '</button></div></div>';
    }
  };

  window.applyF = function () {
    F.sort = ($('ppSort') && $('ppSort').value) || 'recommended';
    F.page = 1;
    load();
  };
  window.moreP = function (pg) {
    F.page = pg;
    load();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  load();
});

/* ---------- PRODUCT ROW (Autodoc-style long row) ---------- */
function prow(p) {
  var imgs = p.images_array || [];
  if (!imgs.length && p.images) {
    if (Array.isArray(p.images)) imgs = p.images;
    else if (typeof p.images === 'string') {
      try { imgs = JSON.parse(p.images); } catch (e) { imgs = []; }
    }
  }
  if (!Array.isArray(imgs)) imgs = [];
  var img = imgs[0];
  var brand = p.brand || 'OEM';
  var cond = p.condition || 'new';

  // UVP-Rabatt nur bei echter UVP aus der Datenbank (rrp_usd). Erfundene
  // Rabatte waeren irrefuehrende Werbung (UWG / Preisangabenverordnung).
  var priceUsd = parseFloat(p.price_usd || 0);
  var rrpUsd = parseFloat(p.rrp_usd || 0);
  var hasDiscount = rrpUsd > priceUsd && priceUsd > 0;
  var discountPct = hasDiscount ? Math.round((1 - priceUsd / rrpUsd) * 100) : 0;
  var oldPrice = hasDiscount ? rrpUsd : 0;

  // Stock state
  var stockQty = p.stock != null ? parseInt(p.stock) : 999;
  var stockClass = 'in', stockText = t('pp.in_stock');
  if (stockQty === 0) { stockClass = 'out'; stockText = t('pp.out_of_stock'); }
  else if (stockQty < 5) { stockClass = 'low'; stockText = t('pp.only_left').replace('{n}', stockQty); }

  // Bewertungen nur anzeigen, wenn es echte gibt (keine erfundenen Sterne)
  var reviews = parseInt(p.reviews_count, 10) || 0;
  var rating = reviews > 0 ? Math.round(parseFloat(p.rating) || 0) : 0;
  var stars = '';
  for (var i = 1; i <= 5; i++) {
    stars += '<span class="' + (i <= rating ? '' : 'empty') + '">★</span>';
  }

  var formatted = fmt(priceUsd);
  var formattedOld = oldPrice ? fmt(oldPrice) : '';

  var sellerName = (p.shop && (p.shop.name || p.shop.shop_name)) || (p.is_china_seller ? t('pp.wholesale_supplier') : t('pp.verified'));

  var html = '<article class="pp-row" onclick="render(\'product-detail\',{id:\'' + p.id + '\'})">';

  // Left col
  html += '<div class="pp-row-left">';
  html += '<div class="pp-row-brand">' + esc(brand) + '</div>';
  html += '<div class="pp-row-img">';
  if (img) html += '<img src="' + esc(img) + '" alt="' + esc(p.title) + '" loading="lazy" class="pp-zoomable" onclick="openZoom(this.src)"/>';
  else html += '<span>' + t('pp.no_image') + '</span>';
  html += '</div></div>';

  // Middle col
  html += '<div class="pp-row-mid">';
  html += '<div class="pp-row-title"><span class="brand-prefix">' + esc(brand.toUpperCase()) + '</span>' + esc(p.title) + '</div>';
  if (p.model) html += '<div class="pp-row-subtitle">' + esc(p.model) + (p.year ? ', ' + esc(p.year) : '') + '</div>';

  html += '<div class="pp-row-meta">';
  if (p.sku) html += '<span class="pp-row-art">' + t('pp.article_num') + ' <strong>' + esc(p.sku) + '</strong></span>';
  else if (p.oem) html += '<span class="pp-row-art">' + t('pp.article_num') + ' <strong>' + esc(p.oem) + '</strong></span>';
  if (p.ean) html += '<span class="pp-row-art">EAN: <strong>' + esc(p.ean) + '</strong></span>';
  if (reviews > 0) {
    html += '<span class="pp-row-stars">' + stars + '</span>';
    html += '<span class="pp-row-reviews">' + t('pp.reviews_word') + ' · ' + reviews + '</span>';
  }
  html += '</div>';

  // Specs table
  html += '<div class="pp-row-specs">';
  html += '<span class="pp-spec-k">' + t('pp.spec_condition') + '</span><span class="pp-spec-v">' + esc(t('product.' + cond)) + '</span>';
  if (p.brand) html += '<span class="pp-spec-k">' + t('pp.spec_brand') + '</span><span class="pp-spec-v">' + esc(p.brand) + '</span>';
  if (p.model) html += '<span class="pp-spec-k">' + t('pp.spec_model') + '</span><span class="pp-spec-v">' + esc(p.model) + '</span>';
  if (p.year) html += '<span class="pp-spec-k">' + t('pp.spec_year') + '</span><span class="pp-spec-v">' + esc(p.year) + '</span>';
  if (p.oem) html += '<span class="pp-spec-k">' + t('pp.spec_oem') + '</span><span class="pp-spec-v">' + esc(p.oem) + '</span>';
  if (p.fits_vehicles) { var pdFitsLbl = ({de:'Passend für:',en:'Fits:',fr:'Compatible :',pt:'Compatível:',es:'Compatible:',sw:'Inafaa:',ar:'يناسب:',tr:'Uygun:',ln:'Ekoki na:'})[S.lang] || 'Fits:'; html += '<span class="pp-spec-k">' + esc(pdFitsLbl) + '</span><span class="pp-spec-v">' + esc(p.fits_vehicles) + '</span>'; }
  if (p.location) html += '<span class="pp-spec-k">' + t('pp.spec_location') + '</span><span class="pp-spec-v">' + esc(p.location) + '</span>';
  if (p.moq && p.moq > 1) html += '<span class="pp-spec-k">' + t('pp.spec_moq') + '</span><span class="pp-spec-v">' + p.moq + ' ' + t('pp.spec_pcs') + '</span>';
  html += '</div>';
  html += '</div>';

  // Right col
  html += '<div class="pp-row-right">';
  html += '<div class="pp-stock ' + stockClass + '">' + stockText + '</div>';
  if (hasDiscount) {
    html += '<div class="pp-discount-badge">-' + discountPct + '% ' + t('pp.vs_rrp') + ' ' + formattedOld + '</div>';
  }
  // Preis gross mit Tausendertrennzeichen, Cents klein, Waehrungscode dahinter
  var pp = fmtParts(priceUsd);
  html += '<div class="pp-price" title="' + esc(formatted) + '">' + esc(pp.int) + '<span class="cents">' + esc(pp.dec) + '</span><span class="currency">' + esc(pp.cur) + '</span></div>';
  html += '<div class="pp-price-info">' + t('pp.incl_vat') + ' · <span>' + t('pp.ship_at_checkout') + '</span></div>';

  html += '<div class="pp-buy-row" onclick="event.stopPropagation()">';
  html += '<div class="pp-qty">';
  html += '<input type="number" min="1" value="1" id="qty_' + p.id + '"/>';
  html += '<div style="display:flex;flex-direction:column">';
  html += '<button class="pp-qty-btn up" onclick="prowQty(\'' + p.id + '\',1)" aria-label="Increase">▲</button>';
  html += '<button class="pp-qty-btn" onclick="prowQty(\'' + p.id + '\',-1)" aria-label="Decrease">▼</button>';
  html += '</div></div>';
  html += '<button class="pp-buy-btn" onclick="prowBuy(\'' + p.id + '\')"' + (stockQty === 0 ? ' disabled' : '') + '>';
  html += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>';
  html += t('product.add_cart') + '</button>';
  html += '</div>';

  html += '<div class="pp-row-seller">' + t('pp.sold_by') + ' <strong>' + esc(sellerName) + '</strong></div>';
  html += '</div>';

  html += '</article>';
  return html;
}

window.prowQty = function (id, delta) {
  var el = document.getElementById('qty_' + id);
  if (!el) return;
  var v = Math.max(1, (parseInt(el.value) || 1) + delta);
  el.value = v;
};

window.prowBuy = async function (id) {
  var el = document.getElementById('qty_' + id);
  var qty = el ? Math.max(1, parseInt(el.value) || 1) : 1;
  try {
    var p = await apiReq('/products/' + id, 'GET', null, false);
    cadd(p, qty);
    buildNav();
    toast(t('product.added'));
  } catch (e) {
    render('product-detail', { id: id, autoAdd: true });
  }
};


/* ---------- ROUTE: PRODUCT DETAIL ---------- */
route('product-detail', async function (P) {
  P = P || {};
  try {
    const p = await apiReq('/products/' + P.id + '?currency=' + S.currency, 'GET', null, false);
    let imgs = p.images_array || [];
    if (!imgs.length && p.images) {
      if (Array.isArray(p.images)) imgs = p.images;
      else if (typeof p.images === 'string') {
        try { imgs = JSON.parse(p.images); } catch (e) { imgs = []; }
      }
    }
    if (!Array.isArray(imgs)) imgs = [];
    const isCn = p.shop && p.shop.is_china_seller;
    const cond = p.condition || 'new';

    let h = '<div class="detail-wrap">';
    h += '<button class="btn btn-ghost btn-sm" onclick="history.length>1?history.back():render(\'products\')" style="margin-bottom:1.25rem">&lt; Back</button>';
    h += '<div class="detail-grid">';

    h += '<div><div class="dimg-main" id="dmain">';
    if (imgs[0]) h += '<img src="' + esc(imgs[0]) + '" alt="' + esc(p.title) + '" id="dmainImg"/>';
    else h += 'Part';
    h += '</div>';
    if (imgs.length > 1) {
      h += '<div class="dthumbs">';
      imgs.forEach(function (u, i) {
        h += '<div class="dthumb' + (i === 0 ? ' active' : '') + '" onclick="swImg(\'' + esc(u) + '\',this)">';
        h += '<img src="' + esc(u) + '" loading="lazy" alt="View ' + (i + 1) + '"/></div>';
      });
      h += '</div>';
    }
    h += '</div>';

    h += '<div class="dinfo">';
    if (isCn) h += '<div style="margin-bottom:.65rem"><span class="badge badge-china">Wholesale Direct</span></div>';
    h += '<h1>' + esc(p.title) + '</h1>';
    h += '<div class="dprice">' + fmt(p.price_usd) + '</div>';
    if (wsIsWholesale(p)) {
      var _wt = wsTiers(p);
      h += '<div style="margin:.4rem 0;display:inline-block;background:#eaf6ee;color:#0a7d36;border:1px solid #b7e3c4;border-radius:6px;padding:.2rem .55rem;font-size:.8rem;font-weight:600">' + esc(wsT('badge')) + '</div>';
      if (_wt.length) {
        h += '<div style="margin:.5rem 0;border:1px solid var(--border,#e2e2e2);border-radius:8px;overflow:hidden;max-width:340px">';
        h += '<div style="background:var(--surface2,#f5f5f5);padding:.4rem .6rem;font-weight:700;font-size:.85rem">' + esc(wsT('tiers_title')) + '</div>';
        h += '<div style="display:flex;justify-content:space-between;padding:.35rem .6rem;font-size:.85rem"><span>1+</span><span>' + fmt(p.price_usd) + esc(wsT('per_unit')) + '</span></div>';
        _wt.forEach(function (tr) {
          h += '<div style="display:flex;justify-content:space-between;padding:.35rem .6rem;border-top:1px solid var(--border,#eee);font-size:.85rem"><span>' + esc(wsT('from_qty').replace('{n}', tr.min)) + '</span><span style="font-weight:700;color:#0a7d36">' + fmt(tr.price) + esc(wsT('per_unit')) + '</span></div>';
        });
        h += '</div>';
      }
    }
    h += '<div style="display:flex;align-items:center;gap:.65rem;flex-wrap:wrap;margin-bottom:.5rem">';
    h += '<span class="badge badge-' + cond + '">' + t('product.' + cond) + '</span>';
    if ((p.stock_quantity || 0) > 0) {
      h += '<span style="color:var(--green);font-size:.83rem">' + p.stock_quantity + ' ' + t('product.stock') + '</span>';
    } else if (p.stock_quantity === 0) {
      h += '<span style="color:var(--red);font-size:.83rem">' + t('product.out_stock') + '</span>';
    }
    h += '</div>';

    h += '<div class="dspecs">';
    [['brand', 'brand'], ['model', 'model'], ['year', 'year'],
     ['oem', 'oem'], ['location', 'location'], ['moq', 'moq']].forEach(function (pair) {
      if (p[pair[0]]) {
        h += '<div class="dspec-row"><span class="dspec-lbl">' + t('product.' + pair[1]) +
             '</span><span class="dspec-val">' + esc(p[pair[0]]) + '</span></div>';
      }
    });
    h += '</div>';

    if (p.description) {
      h += '<div class="ddesc"><h3>' + t('product.description') + '</h3>';
      h += '<p>' + esc(p.description) + '</p></div>';
    }

    var _outOfStock = (p.stock_quantity === 0);
    var _maxQty = (p.stock_quantity && p.stock_quantity > 0) ? p.stock_quantity : 999;
    h += '<div class="dqty-wrap">';
    h += '<span class="dqty-label">' + esc(wsT('qty')) + '</span>';
    h += '<div class="dqty"' + (_outOfStock ? ' aria-disabled="true"' : '') + '>';
    h += '<button type="button" class="dqty-btn" aria-label="' + esc(wsT('dec')) + '" onclick="detailQty(-1)"' + (_outOfStock ? ' disabled' : '') + '>&minus;</button>';
    h += '<input id="dqtyInput" class="dqty-input" type="number" inputmode="numeric" min="1" max="' + _maxQty + '" value="1" aria-label="' + esc(wsT('qty')) + '" oninput="detailQtySync()" onchange="detailQtySync()"' + (_outOfStock ? ' disabled' : '') + '/>';
    h += '<button type="button" class="dqty-btn" aria-label="' + esc(wsT('inc')) + '" onclick="detailQty(1)"' + (_outOfStock ? ' disabled' : '') + '>+</button>';
    h += '</div>';
    h += '<span class="dqty-total" id="dqtyTotal"></span>';
    h += '</div>';

    h += '<div class="dactions">';
    h += '<button class="btn btn-primary dqty-add" onclick="detailAdd(\'' + p.id + '\')"' + (_outOfStock ? ' disabled' : '') + '>+ ' + t('product.add_cart') + '</button>';
    if (p.shop_id) {
      h += '<button class="btn btn-ghost" onclick="render(\'shop\',{id:\'' + p.shop_id + '\'})">' + t('product.view_shop') + '</button>';
    }
    h += '</div>';
    h += '</div>';

    h += '</div></div>';

    $('content').innerHTML = h;

    window.__currentProduct = p;
    detailQtyUpdate();

    if (P.autoAdd) {
      cadd(p);
      buildNav();
      toast(t('product.added'));
    }
  } catch (e) {
    $('content').innerHTML = '<div class="page-wrap"><div class="section"><div class="alert alert-error">' +
      t('errors.not_found') + '</div></div></div>';
  }
});

function detailReadQty() {
  var inp = $('dqtyInput');
  var p = window.__currentProduct;
  var max = (p && p.stock_quantity && p.stock_quantity > 0) ? p.stock_quantity : 999;
  var q = inp ? parseInt(inp.value, 10) : 1;
  if (!isFinite(q) || q < 1) q = 1;
  if (q > max) q = max;
  return q;
}

window.detailQtySync = function () {
  var inp = $('dqtyInput');
  if (!inp) return;
  var q = detailReadQty();
  if (String(q) !== inp.value) inp.value = q;
  detailQtyUpdate();
};

window.detailQty = function (delta) {
  var inp = $('dqtyInput');
  if (!inp || inp.disabled) return;
  inp.value = detailReadQty() + delta;
  detailQtySync();
};

// Aktualisiert Live-Stückpreis (Großhandelsstaffel) + Zeilensumme unter der Mengenwahl.
function detailQtyUpdate() {
  var p = window.__currentProduct;
  var box = $('dqtyTotal');
  if (!p || !box) return;
  var q = detailReadQty();
  var unit = wsUnitPrice(p, q);
  var base = parseFloat(p.price_usd || 0);
  var html = '';
  // Bei Großhandel und aktivem Mengenrabatt: reduzierten Stückpreis hervorheben.
  if (wsIsWholesale(p) && unit < base) {
    html += '<span class="dqty-unit">' + fmt(unit) + esc(wsT('per_unit')) + '</span>';
  }
  html += '<span class="dqty-sum">' + esc(wsT('line_total')) + ': <strong>' + fmt(unit * q) + '</strong></span>';
  box.innerHTML = html;
}
window.detailQtyUpdate = detailQtyUpdate;

window.detailAdd = function () {
  if (window.__currentProduct) {
    cadd(window.__currentProduct, detailReadQty());
    buildNav();
    toast(t('product.added'));
  }
};

window.swImg = function (url, el) {
  const img = $('dmainImg');
  if (img) img.src = url;
  document.querySelectorAll('.dthumb').forEach(function (d) { d.classList.remove('active'); });
  el.classList.add('active');
};

/* ---------- ROUTE: SHOPS ---------- */
route('shops', async function () {
  let shops = [];
  try {
    const res = await apiReq('/shops', 'GET', null, false);
    shops = res.data || res.shops || [];
  } catch (e) {}

  $('content').innerHTML =
    '<div class="page-wrap"><section class="section">' +
    '<div class="sec-hd"><div class="sec-title">' + t('nav.shops') + '</div></div>' +
    ticker() +
    '<div class="shop-tabs">' +
      '<button class="btn btn-ghost" onclick="filterShops(\'all\')">' + t('filter.all') + '</button>' +
      '<button class="btn btn-ghost" onclick="filterShops(\'af\')">' + t('shop.african') + '</button>' +
      '<button class="btn btn-ghost" onclick="filterShops(\'cn\')">' + t('shop.china') + '</button>' +
    '</div>' +
    '<div id="shops-wrap"><div class="loading-wrap"><div class="spinner"></div></div></div>' +
    '</section></div>';

  function renderShops(list) {
    const el = $('shops-wrap');
    if (!el) return;
    if (!list.length) {
      el.innerHTML = '<div class="empty-state"><div class="empty-icon">[S]</div><h3>' +
        t('shop.no_shops') + '</h3></div>';
      return;
    }
    let h = '<div class="pgrid" role="list">';
    list.forEach(function (s) {
      h += '<article class="pcard" role="listitem" onclick="render(\'shop\',{id:\'' + s.id + '\'})">';
      var logo = s.logo_url || '';
      h += '<div class="pcard-logo">';
      if (logo) h += '<img src="' + esc(logo) + '" alt="" loading="lazy" onerror="this.style.display=\'none\';this.parentNode.innerHTML=\'<span>\'+(' + JSON.stringify((s.name || '?').charAt(0).toUpperCase()) + ')+\'</span>\'"/>';
      else h += '<span>' + esc((s.name || '?').charAt(0).toUpperCase()) + '</span>';
      h += '</div>';
      h += '<div class="pcard-body">';
      h += '<div class="pcard-title">' + esc(s.name || '') + '</div>';
      h += '<div class="pcard-meta">';
      if (s.city) h += '<span>' + esc(s.city) + '</span>';
      if (s.country) h += '<span class="loc">' + esc(s.country) + '</span>';
      h += '</div>';
      h += '<div class="pcard-foot">';
      if (s.is_china_seller) h += '<span class="pbadge pbadge-china">CN</span>';
      h += '<span style="font-size:.8rem;color:var(--text2)">' + t('shop.products_from') + ' ' + esc(s.name || '') + '</span>';
      h += '</div></div></article>';
    });
    h += '</div>';
    el.innerHTML = h;
  }

  window.filterShops = function (type) {
    let list = shops;
    if (type === 'af') list = shops.filter(function (s) { return !s.is_china_seller; });
    if (type === 'cn') list = shops.filter(function (s) { return s.is_china_seller; });
    renderShops(list);
  };

  renderShops(shops);
});

/* ---------- ROUTE: SHOP DETAIL ---------- */
route('shop', async function (P) {
  P = P || {};
  try {
    const res = await apiReq('/shops/' + P.id, 'GET', null, false);
    const shop = res.shop || res.data || {};
    const products = res.products || [];

    let h = '<div class="page-wrap"><section class="section">';
    h += '<button class="btn btn-ghost btn-sm" onclick="history.length>1?history.back():render(\'shops\')" style="margin-bottom:1.25rem">&lt; ' + t('nav.shops') + '</button>';
    h += '<div class="shop-header">';
    if (shop.logo_url) h += '<img class="shop-header-logo" src="' + esc(shop.logo_url) + '" alt="" onerror="this.style.display=\'none\'"/>';
    h += '<div class="shop-header-main"><h1>' + esc(shop.name || '') + '</h1>';
    h += '<div class="shop-meta">';
    if (shop.city) h += '<span>' + esc(shop.city) + '</span>';
    if (shop.country) h += '<span class="loc">' + esc(shop.country) + '</span>';
    if (shop.is_china_seller) h += '<span class="badge badge-china">' + t('shop.china') + '</span>';
    h += '</div>';
    if (shop.pending) h += '<div class="alert alert-info">' + t('shop.pending') + '</div>';
    h += '</div></div>';
    h += '<div class="section"><div class="sec-hd"><div class="sec-title">' + t('shop.products_from') + ' ' + esc(shop.name || '') + '</div></div>';
    if (products.length) {
      h += '<div class="pgrid" role="list">' + products.map(pcard).join('') + '</div>';
    } else {
      h += '<div class="empty-state"><div class="empty-icon">[-]</div><h3>' + t('errors.no_parts') + '</h3></div>';
    }
    h += '</div></section></div>';

    $('content').innerHTML = h;
  } catch (e) {
    $('content').innerHTML = '<div class="page-wrap"><div class="section"><div class="alert alert-error">' +
      t('errors.not_found') + '</div></div></div>';
  }
});

/* ---------- ROUTE: CART ---------- */
route('cart', async function () {
  const items = S.cart;
  const total = ctot();

  let h = '<div class="page-wrap"><section class="section">';
  h += '<div class="sec-hd"><div class="sec-title">' + t('cart.title') + '</div></div>';

  if (items.length) {
    h += '<div class="ac-cart">';

    // Linke Spalte: Artikel-Karten
    h += '<div class="ac-items">';
    items.forEach(function (i) {
      var img = pImg(i);
      var unit = wsUnitPrice(i, i.qty);
      var base = parseFloat(i.price_usd || 0);
      var isWs = wsIsWholesale(i) && unit < base;
      var max = (i.stock_quantity && i.stock_quantity > 0) ? i.stock_quantity : 999;

      h += '<div class="ac-row">';

      // Thumbnail
      h += '<div class="ac-thumb">';
      if (img) h += '<img src="' + esc(img) + '" alt="' + esc(i.title) + '" loading="lazy"/>';
      else h += '<span class="ac-noimg">' + esc(wsT('no_image')) + '</span>';
      h += '</div>';

      // Mitte: Titel + Meta
      h += '<div class="ac-main">';
      h += '<div class="ac-title">' + esc(i.title) + '</div>';
      h += '<div class="ac-meta">';
      if (i.brand) h += '<span>' + esc(i.brand) + '</span>';
      if (i.oem) h += '<span>OEM ' + esc(i.oem) + '</span>';
      if (i.sku) h += '<span>' + t('pp.article_num') + ' ' + esc(i.sku) + '</span>';
      if (i.ean) h += '<span>EAN ' + esc(i.ean) + '</span>';
      if (i.location) h += '<span class="loc">' + esc(i.location) + '</span>';
      h += '</div>';
      if (isWs) h += '<div class="ac-ws">' + esc(wsT('badge')) + '</div>';
      // Mengen-Stepper (gleicher Look wie Detailseite)
      h += '<div class="ac-qtybar">';
      h += '<div class="dqty">';
      h += '<button type="button" class="dqty-btn" aria-label="' + esc(wsT('dec')) + '" onclick="cupd(\'' + i.id + '\',' + (i.qty - 1) + ');render(\'cart\')">&minus;</button>';
      h += '<input class="dqty-input" type="number" inputmode="numeric" min="1" max="' + max + '" value="' + i.qty + '" aria-label="' + esc(wsT('qty')) + '" onchange="cupd(\'' + i.id + '\',parseInt(this.value)||1);render(\'cart\')"/>';
      h += '<button type="button" class="dqty-btn" aria-label="' + esc(wsT('inc')) + '" onclick="cupd(\'' + i.id + '\',' + (i.qty + 1) + ');render(\'cart\')">+</button>';
      h += '</div>';
      h += '<button class="ac-remove" onclick="crem(\'' + i.id + '\');render(\'cart\')"><span aria-hidden="true">&times;</span> ' + esc(wsT('remove')) + '</button>';
      h += '</div>';
      h += '</div>';

      // Rechts: Preise
      h += '<div class="ac-price">';
      h += '<div class="ac-line">' + fmt(unit * i.qty) + '</div>';
      h += '<div class="ac-each">' + fmt(unit) + ' ' + esc(wsT('each')) + '</div>';
      h += '</div>';

      h += '</div>';
    });
    h += '</div>';

    // Rechte Spalte: Bestell-Summary (sticky)
    h += '<aside class="ac-summary">';
    h += '<div class="ac-sum-title">' + t('cart.title') + '</div>';
    h += '<div class="ac-sum-row"><span>' + esc(wsT('goods_total')) + '</span><span>' + fmt(total) + '</span></div>';
    h += '<div class="ac-sum-grand"><span>' + esc(wsT('grand_total')) + '</span><span>' + fmt(total) + '</span></div>';
    h += '<button class="btn btn-primary ac-checkout" onclick="render(\'checkout\')">' + t('cart.checkout') + '</button>';
    h += '<button class="btn btn-ghost ac-cont" onclick="render(\'products\')">' + t('cart.continue') + '</button>';
    h += '<button class="ac-clear" onclick="S.cart=[];csave();buildNav();render(\'cart\')">' + t('cart.clear') + '</button>';
    h += '</aside>';

    h += '</div>';
  } else {
    h += '<div class="empty-state"><div class="empty-icon">[ ]</div>';
    h += '<h3>' + t('cart.empty') + '</h3>';
    h += '<button class="btn btn-primary" onclick="render(\'products\')">' + t('cart.continue') + '</button></div>';
  }

  h += '</section></div>';
  $('content').innerHTML = h;
});

/* ---------- ROUTE: CHECKOUT ---------- */
route('checkout', async function () {
  if (!S.cart.length) { render('cart'); return; }

  // === Versand Phase 1: Zielländer (29) + Städte je Land + Namens-Übersetzungen ===
  var SHIP_COUNTRIES = [
    { iso:'NG', cities:['Lagos','Abuja','Kano','Ibadan','Port Harcourt','Benin City','Kaduna','Enugu','Onitsha','Aba','Jos','Ilorin'] },
    { iso:'GH', cities:['Accra','Kumasi','Tamale','Takoradi','Cape Coast','Tema','Sekondi','Sunyani','Koforidua','Ho'] },
    { iso:'KE', cities:['Nairobi','Mombasa','Kisumu','Nakuru','Eldoret','Thika','Malindi','Kitale','Nyeri','Machakos'] },
    { iso:'CD', cities:['Kinshasa','Lubumbashi','Mbuji-Mayi','Kananga','Kisangani','Bukavu','Goma','Matadi','Likasi','Kolwezi'] },
    { iso:'SN', cities:['Dakar','Touba','Thiès','Rufisque','Kaolack','Saint-Louis','Ziguinchor','Diourbel','Mbour'] },
    { iso:'CI', cities:['Abidjan','Bouaké','Daloa','Yamoussoukro','San-Pédro','Korhogo','Man','Gagnoa'] },
    { iso:'CM', cities:['Douala','Yaoundé','Garoua','Bamenda','Maroua','Bafoussam','Ngaoundéré','Bertoua','Kumba'] },
    { iso:'ZA', cities:['Johannesburg','Cape Town','Durban','Pretoria','Gqeberha','Bloemfontein','East London','Pietermaritzburg','Polokwane'] },
    { iso:'TZ', cities:['Dar es Salaam','Mwanza','Dodoma','Arusha','Mbeya','Morogoro','Tanga','Zanzibar City','Moshi'] },
    { iso:'UG', cities:['Kampala','Gulu','Lira','Mbarara','Jinja','Mbale','Masaka','Entebbe','Fort Portal'] },
    { iso:'TG', cities:['Lomé','Sokodé','Kara','Kpalimé','Atakpamé','Dapaong','Tsévié'] },
    { iso:'BJ', cities:['Cotonou','Porto-Novo','Parakou','Djougou','Bohicon','Abomey','Natitingou'] },
    { iso:'AO', cities:['Luanda','Huambo','Lobito','Benguela','Lubango','Kuito','Malanje','Namibe'] },
    { iso:'GN', cities:['Conakry','Nzérékoré','Kankan','Kindia','Labé','Mamou','Boké','Faranah'] },
    { iso:'NE', cities:['Niamey','Zinder','Maradi','Agadez','Tahoua','Dosso','Arlit'] },
    { iso:'ZW', cities:['Harare','Bulawayo','Chitungwiza','Mutare','Gweru','Kwekwe','Kadoma','Masvingo'] },
    { iso:'GA', cities:['Libreville','Port-Gentil','Franceville','Oyem','Moanda','Lambaréné'] },
    { iso:'MA', cities:['Casablanca','Rabat','Marrakesh','Tangier','Fès','Agadir','Meknès','Oujda','Kénitra','Tétouan'] },
    { iso:'DZ', cities:['Algiers','Oran','Constantine','Annaba','Batna','Blida','Sétif','Djelfa','Tlemcen'] },
    { iso:'TN', cities:['Tunis','Sfax','Sousse','Kairouan','Bizerte','Gabès','Ariana','Gafsa'] },
    { iso:'EG', cities:['Cairo','Alexandria','Giza','Shubra El-Kheima','Port Said','Suez','Mansoura','Tanta','Asyut','Luxor'] },
    { iso:'NA', cities:['Windhoek','Walvis Bay','Swakopmund','Rundu','Oshakati','Rehoboth','Katima Mulilo'] },
    { iso:'ML', cities:['Bamako','Sikasso','Mopti','Ségou','Kayes','Koutiala','Gao','Kati'] },
    { iso:'CV', cities:['Praia','Mindelo','Santa Maria','Assomada','Espargos'] },
    { iso:'ST', cities:['São Tomé','Santo Amaro','Neves','Trindade'] },
    { iso:'ET', cities:['Addis Ababa','Dire Dawa','Mekelle','Gondar','Adama','Hawassa','Bahir Dar','Jimma'] },
    { iso:'RW', cities:['Kigali','Huye','Rubavu','Musanze','Muhanga'] },
    { iso:'GW', cities:['Bissau','Bafatá','Gabú','Bissorã','Cacheu'] },
    { iso:'LR', cities:['Monrovia','Gbarnga','Buchanan','Kakata','Ganta','Zwedru'] }
  ];
  var SHIP_CNAMES = {
    NG:{en:'Nigeria',de:'Nigeria',fr:'Nigéria',pt:'Nigéria',es:'Nigeria',ar:'نيجيريا',tr:'Nijerya'},
    GH:{en:'Ghana',de:'Ghana',fr:'Ghana',pt:'Gana',es:'Ghana',ar:'غانا',tr:'Gana'},
    KE:{en:'Kenya',de:'Kenia',fr:'Kenya',pt:'Quénia',es:'Kenia',ar:'كينيا',tr:'Kenya'},
    CD:{en:'DR Congo',de:'DR Kongo',fr:'RD Congo',pt:'RD Congo',es:'RD Congo',ar:'جمهورية الكونغو الديمقراطية',tr:'Demokratik Kongo'},
    SN:{en:'Senegal',de:'Senegal',fr:'Sénégal',pt:'Senegal',es:'Senegal',ar:'السنغال',tr:'Senegal'},
    CI:{en:"Côte d'Ivoire",de:'Elfenbeinküste',fr:"Côte d'Ivoire",pt:'Costa do Marfim',es:'Costa de Marfil',ar:'ساحل العاج',tr:'Fildişi Sahili'},
    CM:{en:'Cameroon',de:'Kamerun',fr:'Cameroun',pt:'Camarões',es:'Camerún',ar:'الكاميرون',tr:'Kamerun'},
    ZA:{en:'South Africa',de:'Südafrika',fr:'Afrique du Sud',pt:'África do Sul',es:'Sudáfrica',ar:'جنوب أفريقيا',tr:'Güney Afrika'},
    TZ:{en:'Tanzania',de:'Tansania',fr:'Tanzanie',pt:'Tanzânia',es:'Tanzania',ar:'تنزانيا',tr:'Tanzanya'},
    UG:{en:'Uganda',de:'Uganda',fr:'Ouganda',pt:'Uganda',es:'Uganda',ar:'أوغندا',tr:'Uganda'},
    TG:{en:'Togo',de:'Togo',fr:'Togo',pt:'Togo',es:'Togo',ar:'توغو',tr:'Togo'},
    BJ:{en:'Benin',de:'Benin',fr:'Bénin',pt:'Benim',es:'Benín',ar:'بنين',tr:'Benin'},
    AO:{en:'Angola',de:'Angola',fr:'Angola',pt:'Angola',es:'Angola',ar:'أنغولا',tr:'Angola'},
    GN:{en:'Guinea',de:'Guinea',fr:'Guinée',pt:'Guiné',es:'Guinea',ar:'غينيا',tr:'Gine'},
    NE:{en:'Niger',de:'Niger',fr:'Niger',pt:'Níger',es:'Níger',ar:'النيجر',tr:'Nijer'},
    ZW:{en:'Zimbabwe',de:'Simbabwe',fr:'Zimbabwe',pt:'Zimbábue',es:'Zimbabue',ar:'زيمبابوي',tr:'Zimbabve'},
    GA:{en:'Gabon',de:'Gabun',fr:'Gabon',pt:'Gabão',es:'Gabón',ar:'الغابون',tr:'Gabon'},
    MA:{en:'Morocco',de:'Marokko',fr:'Maroc',pt:'Marrocos',es:'Marruecos',ar:'المغرب',tr:'Fas'},
    DZ:{en:'Algeria',de:'Algerien',fr:'Algérie',pt:'Argélia',es:'Argelia',ar:'الجزائر',tr:'Cezayir'},
    TN:{en:'Tunisia',de:'Tunesien',fr:'Tunisie',pt:'Tunísia',es:'Túnez',ar:'تونس',tr:'Tunus'},
    EG:{en:'Egypt',de:'Ägypten',fr:'Égypte',pt:'Egito',es:'Egipto',ar:'مصر',tr:'Mısır'},
    NA:{en:'Namibia',de:'Namibia',fr:'Namibie',pt:'Namíbia',es:'Namibia',ar:'ناميبيا',tr:'Namibya'},
    ML:{en:'Mali',de:'Mali',fr:'Mali',pt:'Mali',es:'Malí',ar:'مالي',tr:'Mali'},
    CV:{en:'Cabo Verde',de:'Kap Verde',fr:'Cap-Vert',pt:'Cabo Verde',es:'Cabo Verde',ar:'الرأس الأخضر',tr:'Cabo Verde'},
    ST:{en:'São Tomé & Príncipe',de:'São Tomé und Príncipe',fr:'São Tomé-et-Príncipe',pt:'São Tomé e Príncipe',es:'Santo Tomé y Príncipe',ar:'ساو تومي وبرينسيب',tr:'São Tomé ve Príncipe'},
    ET:{en:'Ethiopia',de:'Äthiopien',fr:'Éthiopie',pt:'Etiópia',es:'Etiopía',ar:'إثيوبيا',tr:'Etiyopya'},
    RW:{en:'Rwanda',de:'Ruanda',fr:'Rwanda',pt:'Ruanda',es:'Ruanda',ar:'رواندا',tr:'Ruanda'},
    GW:{en:'Guinea-Bissau',de:'Guinea-Bissau',fr:'Guinée-Bissau',pt:'Guiné-Bissau',es:'Guinea-Bisáu',ar:'غينيا بيساو',tr:'Gine-Bisau'},
    LR:{en:'Liberia',de:'Liberia',fr:'Libéria',pt:'Libéria',es:'Liberia',ar:'ليبيريا',tr:'Liberya'}
  };
  // Laendername: gepflegte Uebersetzung, sonst Browser-Uebersetzung (Intl), sonst ISO-Code.
  // Deckt damit auch Laender ab, die erst durch Abholstationen dazukommen.
  function cnName(iso){
    var n = SHIP_CNAMES[iso] || {}; var l = S.lang;
    if (l === 'ln') l = (n.fr ? 'fr' : 'en'); if (l === 'sw') l = 'en';
    if (n[l] || n.en) return n[l] || n.en;
    try {
      var dn = new Intl.DisplayNames([S.lang === 'ln' ? 'fr' : S.lang, 'en'], { type: 'region' }).of(iso);
      if (dn && dn !== iso) return dn;
    } catch (e) {}
    return iso;
  }
  var PU = ({
    en: { title:'Pickup station (optional)', none:'No pickup station — deliver to my address', hint:'Select your city above to see available pickup stations.', pickCountry:'— Select country —', pickCity:'— Select city —', otherCity:'Other city…', otherPh:'Enter your city' },
    de: { title:'Abholstation (optional)', none:'Keine Abholstation — an meine Adresse liefern', hint:'Stadt oben wählen, um verfügbare Abholstationen zu sehen.', pickCountry:'— Land wählen —', pickCity:'— Stadt wählen —', otherCity:'Andere Stadt…', otherPh:'Stadt eingeben' },
    fr: { title:'Point de retrait (optionnel)', none:'Pas de point de retrait — livrer à mon adresse', hint:'Choisissez votre ville ci-dessus pour voir les points de retrait.', pickCountry:'— Choisir le pays —', pickCity:'— Choisir la ville —', otherCity:'Autre ville…', otherPh:'Saisissez votre ville' },
    pt: { title:'Estação de levantamento (opcional)', none:'Sem estação — entregar no meu endereço', hint:'Selecione a sua cidade acima para ver as estações disponíveis.', pickCountry:'— Selecionar país —', pickCity:'— Selecionar cidade —', otherCity:'Outra cidade…', otherPh:'Digite a sua cidade' },
    es: { title:'Punto de recogida (opcional)', none:'Sin punto de recogida — entregar en mi dirección', hint:'Seleccione su ciudad arriba para ver los puntos disponibles.', pickCountry:'— Seleccionar país —', pickCity:'— Seleccionar ciudad —', otherCity:'Otra ciudad…', otherPh:'Escriba su ciudad' },
    ar: { title:'محطة الاستلام (اختياري)', none:'بدون محطة استلام — التوصيل إلى عنواني', hint:'اختر مدينتك أعلاه لعرض محطات الاستلام المتاحة.', pickCountry:'— اختر الدولة —', pickCity:'— اختر المدينة —', otherCity:'مدينة أخرى…', otherPh:'أدخل مدينتك' },
    tr: { title:'Teslim alma noktası (isteğe bağlı)', none:'Nokta yok — adresime teslim edin', hint:'Mevcut noktaları görmek için yukarıdan şehrinizi seçin.', pickCountry:'— Ülke seçin —', pickCity:'— Şehir seçin —', otherCity:'Diğer şehir…', otherPh:'Şehrinizi yazın' },
    sw: { title:'Kituo cha kuchukua (hiari)', none:'Bila kituo — leta kwa anwani yangu', hint:'Chagua jiji lako hapo juu kuona vituo vilivyopo.', pickCountry:'— Chagua nchi —', pickCity:'— Chagua jiji —', otherCity:'Jiji lingine…', otherPh:'Andika jiji lako' },
    ln: { title:'Esika ya kozwa biloko (soki olingi)', none:'Esika te — bomemela ngai na adresse na ngai', hint:'Pona engumba na yo likolo mpo na komona bisika.', pickCountry:'— Pona ekólo —', pickCity:'— Pona engumba —', otherCity:'Engumba mosusu…', otherPh:'Koma engumba na yo' }
  })[S.lang] || { title:'Pickup station (optional)', none:'No pickup station — deliver to my address', hint:'Select your city above to see available pickup stations.', pickCountry:'— Select country —', pickCity:'— Select city —', otherCity:'Other city…', otherPh:'Enter your city' };

  // Laender-Optionen (sortiert nach Anzeigename)
  function coCountryOptions(selIso) {
    return SHIP_COUNTRIES.map(function (c) { return { iso: c.iso, label: cnName(c.iso) }; })
      .sort(function (a, b) { return a.label.localeCompare(b.label); })
      .map(function (o) { return '<option value="' + o.iso + '"' + (o.iso === selIso ? ' selected' : '') + '>' + esc(o.label) + '</option>'; })
      .join('');
  }
  // Laender/Staedte mit aktiven Abholstationen in SHIP_COUNTRIES einmischen:
  // neue Laender kommen dazu, bei bestehenden werden fehlende Stationsstaedte ergaenzt.
  function coMergeCoverage(list) {
    var changed = false;
    (list || []).forEach(function (cv) {
      var iso = String(cv.country || '').toUpperCase();
      if (!/^[A-Z]{2}$/.test(iso)) return;
      var cities = (cv.cities || []).filter(Boolean);
      var entry = SHIP_COUNTRIES.filter(function (c) { return c.iso === iso; })[0];
      if (!entry) { SHIP_COUNTRIES.push({ iso: iso, cities: cities.slice() }); changed = true; return; }
      var lower = entry.cities.map(function (c) { return c.toLowerCase(); });
      cities.forEach(function (ci) {
        if (lower.indexOf(ci.toLowerCase()) === -1) { entry.cities.push(ci); lower.push(ci.toLowerCase()); changed = true; }
      });
    });
    return changed;
  }

  let h = '<div class="page-wrap"><div class="checkout-grid">';
  h += '<section><div class="sec-hd"><div class="sec-title">' + t('checkout.title') + '</div></div>';
  h += '<div class="co-form">';
  h += '<h3>' + t('checkout.address') + '</h3>';
  h += '<div class="fg"><label>' + t('checkout.name') + '</label><input id="coName" value="' + esc(S.user && S.user.name || '') + '"/></div>';
  h += '<div class="fg"><label>' + t('checkout.phone') + '</label><input id="coPhone" value="' + esc(S.user && S.user.phone || '') + '"/></div>';
  h += '<div class="fg"><label>Email</label><input id="coEmail" type="email" value="' + esc(S.user && S.user.email || '') + '"/></div>';
  // Land: Dropdown statt Freitext (verhindert Tippfehler, liefert direkt ISO-2)
  var _uc = (S.user && S.user.country || '').toUpperCase().trim();
  h += '<div class="fg"><label>' + t('checkout.country') + '</label><select id="coCountry"><option value="">' + PU.pickCountry + '</option>';
  h += coCountryOptions(_uc);
  h += '</select></div>';
  // Stadt: abhängig vom Land + Freitext-Fallback „Andere Stadt…"
  h += '<div class="fg"><label>' + t('checkout.city') + '</label>';
  h += '<select id="coCity"><option value="">' + PU.pickCity + '</option></select>';
  h += '<input id="coCityOther" placeholder="' + esc(PU.otherPh) + '" style="display:none;margin-top:.4rem"/></div>';
  h += '<div class="fg"><label>' + t('checkout.addr') + '</label><textarea id="coAddr"></textarea></div>';
  // --- ABHOLSTATION (Phase 1 Versand): Stationen erscheinen nach Stadt-Auswahl (PU oben definiert) ---
  h += '<h3 style="margin-top:1rem">' + PU.title + '</h3>';
  h += '<div class="fg"><select id="coStation"><option value="">' + PU.none + '</option></select>';
  h += '<div id="coStationHint" style="font-size:.85rem;color:#777;margin-top:.3rem">' + PU.hint + '</div></div>';

  h += '<h3 style="margin-top:1rem">' + t('checkout.shipping') + '</h3>';
  h += '<div class="fg"><select id="coShip"><option value="">-- ' + t('checkout.shipping') + ' --</option>';
  h += '<option value="local">Local / Bus</option>';
  h += '<option value="courier">Courier / Motorbike</option>';
  h += '<option value="dhl">DHL / Air</option>';
  h += '</select></div>';

  // Zahlungsart wird an das Lieferland gekoppelt (siehe coFillPayment weiter unten).
  h += '<h3 style="margin-top:1rem">' + t('checkout.payment') + '</h3>';
  h += '<div class="fg"><select id="coPay"></select>';
  h += '<div id="coPayHint" style="font-size:.8rem;opacity:.65;margin-top:.45rem;line-height:1.45"></div></div>';

  h += '<button id="coPlaceBtn" class="btn btn-primary" style="margin-top:1rem" onclick="placeOrder()">' + t('checkout.place_order') + '</button>';
  h += '</div></section>';

  var _shipLbl = ({de:'Versand',en:'Shipping',fr:'Livraison',pt:'Envio',es:'Envío',sw:'Usafirishaji',ar:'الشحن',tr:'Kargo',ln:'Komema'})[S.lang] || 'Shipping';
  var _totLbl = ({de:'Gesamt',en:'Total',fr:'Total',pt:'Total',es:'Total',sw:'Jumla',ar:'الإجمالي',tr:'Toplam',ln:'Total'})[S.lang] || 'Total';
  var _shipCalcHint = ({de:'Stadt/Station wählen für Versandkosten',en:'Select city/station for shipping cost',fr:'Choisissez ville/point pour les frais',pt:'Selecione cidade/estação para o envio',es:'Elija ciudad/punto para el envío',sw:'Chagua jiji/kituo kwa gharama',ar:'اختر المدينة/المحطة لتكلفة الشحن',tr:'Kargo için şehir/nokta seçin',ln:'Pona engumba mpo na komema'})[S.lang] || 'Select city/station for shipping cost';

  h += '<aside class="co-sticky"><h3>' + t('checkout.items') + '</h3><ul class="co-items">';
  S.cart.forEach(function (i) {
    h += '<li><span>' + esc(i.title) + '</span><span>' + i.qty + ' x ' + fmt(wsUnitPrice(i, i.qty)) + '</span></li>';
  });
  h += '</ul>';
  h += '<div style="margin-top:1rem;display:flex;justify-content:space-between"><span>' + t('cart.subtotal') + '</span><span>' + fmt(ctot()) + '</span></div>';
  h += '<div style="margin-top:.4rem;display:flex;justify-content:space-between"><span>' + esc(_shipLbl) + '</span><span id="coShipVal" style="opacity:.7">—</span></div>';
  h += '<div id="coShipHint" style="font-size:.78rem;color:#888;margin-top:.2rem">' + esc(_shipCalcHint) + '</div>';
  h += '<div style="margin-top:.6rem;padding-top:.6rem;border-top:1px solid var(--border,#ddd);display:flex;justify-content:space-between;font-weight:700;color:var(--p700)"><span>' + esc(_totLbl) + '</span><span id="coTotalVal">' + fmt(ctot()) + '</span></div>';
  h += '</aside>';
  h += '</div></div>';

  $('content').innerHTML = h;
   // Städte zum gewählten Land füllen, dann Abholstationen laden (Phase 1 Versand)
  var coStTimer = null;
  function coGetCity() {
    var sel = $('coCity'), oth = $('coCityOther');
    if (sel && sel.value === '__other__') return (oth && oth.value.trim()) || '';
    return (sel && sel.value.trim()) || '';
  }
  function coFillCities() {
    var iso = ($('coCountry') && $('coCountry').value) || '';
    var sel = $('coCity'), oth = $('coCityOther');
    if (!sel) return;
    var entry = SHIP_COUNTRIES.filter(function (c) { return c.iso === iso; })[0];
    var opts = '<option value="">' + PU.pickCity + '</option>';
    if (entry) opts += entry.cities.map(function (ci) { return '<option value="' + esc(ci) + '">' + esc(ci) + '</option>'; }).join('');
    opts += '<option value="__other__">' + PU.otherCity + '</option>';
    sel.innerHTML = opts;
    if (oth) { oth.style.display = 'none'; oth.value = ''; }
    coLoadStations();
  }
  async function coLoadStations() {
    var sel = $('coStation');
    if (!sel) return;
    var first = sel.options[0] ? sel.options[0].outerHTML : '<option value=""></option>';
    var city = coGetCity();
    var country = ($('coCountry') && $('coCountry').value.trim().toUpperCase()) || '';
    if (city.length < 2) {
      sel.innerHTML = first;
      var hint0 = $('coStationHint'); if (hint0) hint0.style.display = '';
      return;
    }
    try {
      var q = '/pickup-stations?city=' + encodeURIComponent(city) + (country ? '&country=' + country : '');
      var r = await apiReq(q, 'GET', null, false);
      var stations = (r && r.stations) || [];
      sel.innerHTML = first + stations.map(function (s) {
        return '<option value="' + s.id + '">' + esc(s.name) + ' — ' + esc(s.address) + (s.opening_hours ? ' (' + esc(s.opening_hours) + ')' : '') + '</option>';
      }).join('');
      var hint = $('coStationHint');
      if (hint) hint.style.display = stations.length ? 'none' : '';
    } catch (e) { /* Stationssuche darf den Checkout nie stoeren */ }
  }
  var coShipUsd = 0;
  var coQuoteTimer = null;
  async function coUpdateShipping() {
    var valEl = $('coShipVal'), totEl = $('coTotalVal'), hintEl = $('coShipHint');
    var country = ($('coCountry') && $('coCountry').value.trim().toUpperCase()) || '';
    var city = coGetCity();
    var stationId = ($('coStation') && $('coStation').value) || '';
    if (valEl) valEl.textContent = '…';
    try {
      var r = await apiReq('/shipping/quote', 'POST', {
        items: S.cart.map(function (i) { return { id: i.id, qty: i.qty }; }),
        country: country, city: city, pickup_station_id: stationId
      }, false);
      coShipUsd = (r && typeof r.shipping_usd === 'number') ? r.shipping_usd : 0;
      if (valEl) valEl.textContent = fmt(coShipUsd);
      if (totEl) totEl.textContent = fmt(ctot() + coShipUsd);
      if (hintEl) hintEl.style.display = 'none';
    } catch (e) {
      // Schaetzung scheitert -> Versand offen lassen, Checkout bleibt nutzbar
      if (valEl) valEl.textContent = '—';
      if (totEl) totEl.textContent = fmt(ctot());
    }
  }
  function coQuoteDebounced() { clearTimeout(coQuoteTimer); coQuoteTimer = setTimeout(coUpdateShipping, 350); }

  /* ---------- ZAHLUNGSART AN DAS LIEFERLAND KOPPELN ----------
     Mobile-Money-Land  -> pawaPay-Zahlseite, Bestaetigung per PIN am Handy
     alle uebrigen      -> Stripe-Kartencheckout (Visa/Mastercard, international)
     Nigeria, Ghana, Angola und Suedafrika sind bewusst Kartenlaender.

     Die massgebliche Liste kommt vom Server (/api/payments/countries),
     damit Frontend und Routing nicht auseinanderlaufen. PAWAPAY_COUNTRIES
     dient nur als Fallback, falls der Abruf scheitert.

     Nur tatsaechlich funktionierende Methoden werden angeboten. "Bank-
     ueberweisung" und "Nachnahme" gab es im Backend nie - sie sind hier
     deshalb entfernt, statt dem Kunden etwas zu versprechen, das dann
     doch in einer Kartenzahlung endet. */
  var CO_PAY_TXT = {
    de: { pick: 'Bitte zuerst Land w\u00e4hlen', card: 'Kredit- / Debitkarte',
          cardHint: 'Sicherer Kartencheckout \u2013 Visa, Mastercard und internationale Karten.',
          mobileHint: 'Du bezahlst auf dem Handy und best\u00e4tigst mit deiner PIN.' },
    en: { pick: 'Select a country first', card: 'Credit / debit card',
          cardHint: 'Secure card checkout \u2013 Visa, Mastercard and international cards.',
          mobileHint: 'You pay on your phone and confirm with your PIN.' },
    fr: { pick: 'Choisissez d\u2019abord un pays', card: 'Carte de cr\u00e9dit / d\u00e9bit',
          cardHint: 'Paiement s\u00e9curis\u00e9 par carte \u2013 Visa, Mastercard et cartes internationales.',
          mobileHint: 'Vous payez sur votre t\u00e9l\u00e9phone et confirmez avec votre code PIN.' },
    pt: { pick: 'Selecione primeiro o pa\u00eds', card: 'Cart\u00e3o de cr\u00e9dito / d\u00e9bito',
          cardHint: 'Checkout seguro com cart\u00e3o \u2013 Visa, Mastercard e cart\u00f5es internacionais.',
          mobileHint: 'Paga no telem\u00f3vel e confirma com o seu PIN.' },
    es: { pick: 'Seleccione primero un pa\u00eds', card: 'Tarjeta de cr\u00e9dito / d\u00e9bito',
          cardHint: 'Pago seguro con tarjeta \u2013 Visa, Mastercard y tarjetas internacionales.',
          mobileHint: 'Pagas en el m\u00f3vil y confirmas con tu PIN.' },
    ar: { pick: '\u0627\u062e\u062a\u0631 \u0627\u0644\u062f\u0648\u0644\u0629 \u0623\u0648\u0644\u0627\u064b', card: '\u0628\u0637\u0627\u0642\u0629 \u0627\u0626\u062a\u0645\u0627\u0646 / \u062e\u0635\u0645',
          cardHint: '\u062f\u0641\u0639 \u0622\u0645\u0646 \u0628\u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u2013 Visa \u0648 Mastercard.',
          mobileHint: '\u062a\u062f\u0641\u0639 \u0639\u0628\u0631 \u0647\u0627\u062a\u0641\u0643 \u0648\u062a\u0624\u0643\u062f \u0628\u0631\u0645\u0632 PIN.' },
    tr: { pick: '\u00d6nce \u00fclke se\u00e7in', card: 'Kredi / banka kart\u0131',
          cardHint: 'G\u00fcvenli kart \u00f6demesi \u2013 Visa, Mastercard ve uluslararas\u0131 kartlar.',
          mobileHint: 'Telefonunuzdan \u00f6der ve PIN ile onaylars\u0131n\u0131z.' },
    sw: { pick: 'Chagua nchi kwanza', card: 'Kadi ya benki',
          cardHint: 'Malipo salama kwa kadi \u2013 Visa, Mastercard na kadi za kimataifa.',
          mobileHint: 'Unalipa kwa simu yako na kuthibitisha kwa PIN yako.' },
    ln: { pick: 'Pona mboka liboso', card: 'Karte ya banki',
          cardHint: 'Kofuta na karte na bokengi \u2013 Visa, Mastercard.',
          mobileHint: 'Ofuti na telefone mpe ondimi na PIN na yo.' }
  };
  var _coMoneyList = null; // vom Server geladene Mobile-Money-Laender

  function coFillPayment() {
    var sel = $('coPay'), hint = $('coPayHint');
    if (!sel) return;
    var T = CO_PAY_TXT[S.lang] || CO_PAY_TXT.en;
    var iso = (($('coCountry') && $('coCountry').value) || '').trim().toUpperCase();
    if (!iso) {
      sel.innerHTML = '<option value="">' + esc(T.pick) + '</option>';
      if (hint) hint.textContent = '';
      return;
    }
    var list = (_coMoneyList && _coMoneyList.length) ? _coMoneyList : PAWAPAY_COUNTRIES;
    var isMobile = list.indexOf(iso) !== -1;
    sel.innerHTML = isMobile
      ? '<option value="mobile">' + t('checkout.mobile_money') + '</option>'
      : '<option value="card">' + esc(T.card) + '</option>';
    if (hint) hint.textContent = isMobile ? T.mobileHint : T.cardHint;
  }

  async function coLoadPaymentCountries() {
    try {
      var r = await apiReq('/payments/countries', 'GET', null, false);
      if (r && Array.isArray(r.mobile_money)) _coMoneyList = r.mobile_money;
    } catch (e) { /* Fallback-Liste genuegt, Checkout darf nie blockieren */ }
    coFillPayment();
  }

  if ($('coCountry')) $('coCountry').addEventListener('change', function () { coFillCities(); coFillPayment(); coQuoteDebounced(); });
  if ($('coCity')) $('coCity').addEventListener('change', function () {
    var oth = $('coCityOther');
    if (this.value === '__other__') { if (oth) { oth.style.display = ''; oth.focus(); } }
    else { if (oth) { oth.style.display = 'none'; oth.value = ''; } coLoadStations(); }
    coQuoteDebounced();
  });
  if ($('coCityOther')) $('coCityOther').addEventListener('input', function () {
    clearTimeout(coStTimer); coStTimer = setTimeout(coLoadStations, 400);
    coQuoteDebounced();
  });
  if ($('coStation')) $('coStation').addEventListener('change', coUpdateShipping);
  // Falls das Land aus dem Profil vorausgewählt ist, Städte direkt befüllen
  if ($('coCountry') && $('coCountry').value) coFillCities();

  // Stationsabdeckung laden -> Laender-/Staedteliste erweitern, ohne Auswahl des Kunden zu verlieren
  (async function coLoadCoverage() {
    try {
      var r = await apiReq('/pickup-stations/coverage', 'GET', null, false);
      if (!coMergeCoverage(r && r.countries)) return;
      var sel = $('coCountry'); if (!sel) return;
      var curIso = sel.value, curCity = coGetCity();
      var citySel = $('coCity'), wasOther = citySel && citySel.value === '__other__';
      sel.innerHTML = '<option value="">' + PU.pickCountry + '</option>' + coCountryOptions(curIso || _uc);
      if (!curIso && _uc && sel.value === _uc) { coFillCities(); coFillPayment(); coQuoteDebounced(); return; }
      if (curIso) {
        coFillCities();
        if (curCity && citySel) {
          var has = [].some.call(citySel.options, function (o) { return o.value === curCity; });
          if (has && !wasOther) citySel.value = curCity;
          else { citySel.value = '__other__'; var oth = $('coCityOther'); if (oth) { oth.style.display = ''; oth.value = curCity; } }
          coLoadStations();
        }
      }
    } catch (e) { /* Checkout darf nie blockieren */ }
  })();
  // Versandkosten direkt beim Laden schaetzen (gewichtsbasiert, verfeinert sich mit Stadtwahl)
  coUpdateShipping();
  // Zahlungsart passend zum (ggf. vorausgewaehlten) Land setzen
  coFillPayment();
  coLoadPaymentCountries();

  // ------------------------------------------------------------
  // Offene Bestellung wiederverwenden
  // Schlaegt die Zahlung fehl und der Kunde klickt erneut, wird KEINE neue
  // Bestellung angelegt, solange Warenkorb, Adresse und Versand gleich sind.
  // Erst bei einer Aenderung entsteht eine neue Bestellung (Summe koennte
  // sich geaendert haben). Gespeichert nur in sessionStorage (dieser Tab).
  // ------------------------------------------------------------
  var CO_PENDING_KEY = 'apa_pending_order';
  function coPendingGet() {
    try { return JSON.parse(sessionStorage.getItem(CO_PENDING_KEY) || 'null'); } catch (e) { return null; }
  }
  function coPendingSet(v) {
    try {
      if (v) sessionStorage.setItem(CO_PENDING_KEY, JSON.stringify(v));
      else sessionStorage.removeItem(CO_PENDING_KEY);
    } catch (e) {}
  }
  window.coClearPendingOrder = function () { coPendingSet(null); };

  var _coPlacing = false;

  window.placeOrder = async function () {
    if (_coPlacing) return; // Doppelklick-Schutz
    const name = $('coName') && $('coName').value.trim();
    const phone = $('coPhone') && $('coPhone').value.trim();
    const city = coGetCity();
    const country = $('coCountry') && $('coCountry').value.trim();
    const addr = $('coAddr') && $('coAddr').value.trim();
    const ship = $('coShip') && $('coShip').value;
    const pay = $('coPay') && $('coPay').value;
    const email = ($('coEmail') && $('coEmail').value.trim()) || (S.user && S.user.email) || '';
    const stationId = ($('coStation') && $('coStation').value) || '';

    if (!name || !phone || !city || !country || !addr || !ship) {
      toast(t('checkout.select_ship'), 't-error');
      return;
    }
    if (!email) { toast('Email erforderlich', 't-error'); return; }

    const btn = $('coPlaceBtn');
    const btnLabel = btn ? btn.textContent : '';
    _coPlacing = true;
    if (btn) { btn.disabled = true; btn.textContent = '\u2026'; }

    // Fingerabdruck von allem, was die Bestellung/Summe beeinflusst
    const sig = JSON.stringify({
      items: (S.cart || []).map(function (it) {
        return [String(it.id != null ? it.id : it.product_id), parseInt(it.qty, 10) || 1];
      }),
      ship: ship, country: country, city: city, addr: addr, name: name,
      phone: phone, email: email, station: stationId,
      user: (S.user && S.user.id) ? String(S.user.id) : '',
    });

    async function createOrder() {
      // auth=true: eingeloggte Kaeufer werden serverseitig ueber den Token
      // zugeordnet (Gaeste ohne Token bleiben Gastbestellung).
      const r = await apiReq('/orders', 'POST', {
        items: S.cart, shipping: ship, payment: pay,
        address: { name: name, phone: phone, city: city, country: country, addr: addr, email: email, pickup_station_id: stationId, lang: S.lang }
      }, true);
      const id = r && r.order && r.order.id;
      if (!id) throw new Error('Bestellung fehlgeschlagen');
      coPendingSet({ id: id, sig: sig, at: Date.now() });
      return id;
    }

    async function getRoute(id) {
      return await apiReq('/checkout/route', 'POST', { order_id: id }, false);
    }

    try {
      let orderId = null;
      let route = null;
      const pending = coPendingGet();
      // Nur innerhalb von 24 h und bei identischem Inhalt wiederverwenden
      const reusable = pending && pending.id && pending.sig === sig &&
        (Date.now() - (pending.at || 0)) < 24 * 3600 * 1000;

      if (reusable) {
        orderId = pending.id;
        try {
          route = await getRoute(orderId);
        } catch (reuseErr) {
          // Alte Bestellung weg oder schon bezahlt -> sauber neu anlegen
          if (/nicht gefunden|bereits bezahlt|not found/i.test(reuseErr.message || '')) {
            coPendingSet(null);
            orderId = null;
          } else if (/Auszahlungskonto|payout|kein aktives/i.test(reuseErr.message || '')) {
            toast(t('checkout.seller_no_payout'), 't-error');
            return;
          } else {
            throw reuseErr;
          }
        }
      }

      if (!orderId) {
        orderId = await createOrder();
        try {
          route = await getRoute(orderId);
        } catch (routeErr) {
          if (/Auszahlungskonto|payout|kein aktives/i.test(routeErr.message || '')) {
            toast(t('checkout.seller_no_payout'), 't-error');
            return;
          }
          throw routeErr;
        }
      }

      if (route && route.provider === 'pawapay') {
        // Mobile Money: pawaPay-Zahlseite oeffnen (Kunde bestaetigt per PIN am Handy)
        const init = await apiReq('/checkout/pawapay/init', 'POST', { order_id: orderId, phone: phone }, false);
        if (init && init.redirect_url) {
          try { localStorage.setItem('pp_deposit', init.deposit_id || ''); } catch (e) {}
          window.location.href = init.redirect_url; return;
        }
      }
      if (route && route.provider === 'stripe') {
        const init = await apiReq('/checkout/stripe/init', 'POST', { order_id: orderId, email: email }, false);
        if (init && init.checkout_url) { window.location.href = init.checkout_url; return; }
      }
      throw new Error('Zahlung konnte nicht gestartet werden');
    } catch (e) {
      toast(e.message || 'Error', 't-error');
    } finally {
      _coPlacing = false;
      if (btn) { btn.disabled = false; btn.textContent = btnLabel; }
    }
  };
});

/* ---------- ROUTE: LOGIN ---------- */
route('login', async function () {
  var A = authTxt();
  // Links: Anmelden (gleich fuer Kunden und Haendler) - rechts: Weiche fuer Neue.
  // Auf schmalen Bildschirmen rutschen die Karten automatisch unter das Login.
  $('content').innerHTML =
    '<div class="page-wrap"><section class="section" style="max-width:1000px;margin:0 auto">' +
    '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem;align-items:start">' +
    '<div style="background:var(--surface,#fff);border:1px solid var(--border,#e6e8eb);border-radius:16px;padding:1.4rem">' +
    '<div style="font-weight:700;font-size:1.15rem;margin-bottom:.25rem">' + esc(A.have) + '</div>' +
    '<div style="font-size:.85rem;opacity:.7;margin-bottom:1rem">' + esc(A.same_login) + '</div>' +
    '<div class="fg"><label>' + t('auth.email') + '</label><input id="lgEmail" type="email" autocomplete="email"/></div>' +
    '<div class="fg"><label>' + t('auth.password') + '</label><input id="lgPass" type="password" autocomplete="current-password" onkeydown="if(event.key===\'Enter\')doLogin()"/></div>' +
    '<button class="btn btn-primary" style="width:100%" onclick="doLogin()">' + t('auth.login_btn') + '</button>' +
    '<p style="margin-top:.75rem;font-size:.85rem;text-align:center"><a href="javascript:void(0)" onclick="render(\'forgot-password\')">' + t('auth.forgot') + '</a></p>' +
    '</div>' +
    '<div>' + authChoiceCards() + '</div>' +
    '</div></section></div>';

  window.doLogin = async function () {
    const email = $('lgEmail') && $('lgEmail').value.trim();
    const password = $('lgPass') && $('lgPass').value.trim();
    if (!email || !password) { toast(t('auth.fill_all'), 't-error'); return; }
    try {
      const res = await apiReq('/auth/login', 'POST', { email: email, password: password }, false);
      S.user = res.user;
      S.token = res.token;
      localStorage.setItem('apa_user', JSON.stringify(S.user));
      localStorage.setItem('apa_token', S.token);
      toast('OK');
      var r0 = S.user && S.user.role;
      render(r0 === 'admin' ? 'admin-dashboard' : (r0 === 'dealer' || r0 === 'seller') ? 'seller-dashboard' : 'home');
    } catch (e) {
      toast(/too_many/.test(e.message || '') ? pwTxt().e_many : (e.message || 'Error'), 't-error');
    }
  };
});


/* ═════════════════════════════════════════════════════════════════
   ANMELDEN / REGISTRIEREN: klare Weiche "kaufen" oder "verkaufen"
   - #login : links Anmeldung, rechts zwei Karten fuer Neue
   - #signup: nur die beiden Karten (Ziel von "Registrieren")
   Anmelden ist fuer Kunden und Haendler identisch - die Seite
   erkennt am Konto selbst, wohin es danach geht.
   ═════════════════════════════════════════════════════════════════ */
var AUTH_TXT = {
  de: { have: 'Ich habe schon ein Konto', new_t: 'Neu bei AFCARPARTS?', new_d: 'Wähle, was du tun möchtest:', buy_t: 'Ich möchte Teile kaufen', buy_d: 'Kundenkonto · kostenlos · in 1 Minute erstellt', sell_t: 'Ich möchte Teile verkaufen', sell_d: 'Händlerkonto für Händler, Werkstätten und Großhändler · Shop geht nach Prüfung durch unser Team live', same_login: 'Kunden und Händler melden sich hier gleich an.', cust_t: 'Kundenkonto erstellen – Teile kaufen', hint_sell: 'Du willst Teile verkaufen?', hint_sell_a: 'Händlerkonto erstellen', hint_buy: 'Du willst nur Teile kaufen?', hint_buy_a: 'Kundenkonto erstellen', up_t: 'Dein Konto zum Händlerkonto machen', up_sub: 'Du bist als Kunde angemeldet ({email}). Ergänze deine Firmendaten – dein bestehendes Konto wird zum Händlerkonto. Ein zweites Konto brauchst du nicht. Dein Shop geht nach einer kurzen Prüfung durch unser Team live.', up_btn: 'Zum Händlerkonto machen', up_ok: 'Dein Konto ist jetzt ein Händlerkonto. Wir prüfen deinen Shop.' },
  en: { have: 'I already have an account', new_t: 'New to AFCARPARTS?', new_d: 'Choose what you want to do:', buy_t: 'I want to buy parts', buy_d: 'Customer account · free · ready in 1 minute', sell_t: 'I want to sell parts', sell_d: 'Seller account for dealers, workshops and wholesalers · your shop goes live after a review by our team', same_login: 'Customers and sellers log in here the same way.', cust_t: 'Create customer account – buy parts', hint_sell: 'Do you want to sell parts?', hint_sell_a: 'Create a seller account', hint_buy: 'Do you only want to buy parts?', hint_buy_a: 'Create a customer account', up_t: 'Turn your account into a seller account', up_sub: 'You are logged in as a customer ({email}). Add your company details – your existing account becomes a seller account. You do not need a second account. Your shop goes live after a short review by our team.', up_btn: 'Make it a seller account', up_ok: 'Your account is now a seller account. We are reviewing your shop.' },
  fr: { have: 'J’ai déjà un compte', new_t: 'Nouveau sur AFCARPARTS ?', new_d: 'Choisissez ce que vous voulez faire :', buy_t: 'Je veux acheter des pièces', buy_d: 'Compte client · gratuit · prêt en 1 minute', sell_t: 'Je veux vendre des pièces', sell_d: 'Compte vendeur pour revendeurs, garages et grossistes · votre boutique est activée après vérification par notre équipe', same_login: 'Clients et vendeurs se connectent ici de la même façon.', cust_t: 'Créer un compte client – acheter des pièces', hint_sell: 'Vous voulez vendre des pièces ?', hint_sell_a: 'Créer un compte vendeur', hint_buy: 'Vous voulez seulement acheter ?', hint_buy_a: 'Créer un compte client', up_t: 'Transformer votre compte en compte vendeur', up_sub: 'Vous êtes connecté en tant que client ({email}). Complétez les informations de votre société – votre compte existant devient un compte vendeur. Pas besoin d’un second compte. Votre boutique est activée après une brève vérification par notre équipe.', up_btn: 'Passer en compte vendeur', up_ok: 'Votre compte est maintenant un compte vendeur. Nous vérifions votre boutique.' },
  pt: { have: 'Já tenho uma conta', new_t: 'Novo na AFCARPARTS?', new_d: 'Escolha o que pretende fazer:', buy_t: 'Quero comprar peças', buy_d: 'Conta de cliente · grátis · pronta em 1 minuto', sell_t: 'Quero vender peças', sell_d: 'Conta de vendedor para revendedores, oficinas e grossistas · a loja fica ativa após verificação pela nossa equipa', same_login: 'Clientes e vendedores entram aqui da mesma forma.', cust_t: 'Criar conta de cliente – comprar peças', hint_sell: 'Quer vender peças?', hint_sell_a: 'Criar conta de vendedor', hint_buy: 'Só quer comprar peças?', hint_buy_a: 'Criar conta de cliente', up_t: 'Transformar a sua conta em conta de vendedor', up_sub: 'Tem sessão iniciada como cliente ({email}). Complete os dados da empresa – a sua conta passa a ser uma conta de vendedor. Não precisa de uma segunda conta. A loja fica ativa após uma breve verificação pela nossa equipa.', up_btn: 'Tornar conta de vendedor', up_ok: 'A sua conta é agora uma conta de vendedor. Estamos a verificar a sua loja.' },
  es: { have: 'Ya tengo una cuenta', new_t: '¿Nuevo en AFCARPARTS?', new_d: 'Elige qué quieres hacer:', buy_t: 'Quiero comprar piezas', buy_d: 'Cuenta de cliente · gratis · lista en 1 minuto', sell_t: 'Quiero vender piezas', sell_d: 'Cuenta de vendedor para distribuidores, talleres y mayoristas · tu tienda se activa tras la revisión de nuestro equipo', same_login: 'Clientes y vendedores inician sesión aquí igual.', cust_t: 'Crear cuenta de cliente – comprar piezas', hint_sell: '¿Quieres vender piezas?', hint_sell_a: 'Crear cuenta de vendedor', hint_buy: '¿Solo quieres comprar?', hint_buy_a: 'Crear cuenta de cliente', up_t: 'Convertir tu cuenta en cuenta de vendedor', up_sub: 'Has iniciado sesión como cliente ({email}). Completa los datos de tu empresa: tu cuenta actual pasa a ser de vendedor. No necesitas una segunda cuenta. Tu tienda se activa tras una breve revisión de nuestro equipo.', up_btn: 'Convertir en cuenta de vendedor', up_ok: 'Tu cuenta ya es de vendedor. Estamos revisando tu tienda.' },
  ar: { have: 'لدي حساب بالفعل', new_t: 'جديد في AFCARPARTS؟', new_d: 'اختر ما تريد القيام به:', buy_t: 'أريد شراء قطع', buy_d: 'حساب عميل · مجاني · جاهز خلال دقيقة', sell_t: 'أريد بيع قطع', sell_d: 'حساب بائع للتجار والورش وتجار الجملة · يتم تفعيل متجرك بعد مراجعة فريقنا', same_login: 'يسجّل العملاء والبائعون الدخول هنا بالطريقة نفسها.', cust_t: 'إنشاء حساب عميل – شراء القطع', hint_sell: 'هل تريد بيع قطع؟', hint_sell_a: 'إنشاء حساب بائع', hint_buy: 'هل تريد الشراء فقط؟', hint_buy_a: 'إنشاء حساب عميل', up_t: 'تحويل حسابك إلى حساب بائع', up_sub: 'أنت مسجّل الدخول كعميل ({email}). أكمل بيانات شركتك وسيصبح حسابك الحالي حساب بائع، ولا تحتاج إلى حساب ثانٍ. يتم تفعيل متجرك بعد مراجعة قصيرة من فريقنا.', up_btn: 'التحويل إلى حساب بائع', up_ok: 'أصبح حسابك الآن حساب بائع. نحن نراجع متجرك.' },
  tr: { have: 'Zaten hesabım var', new_t: 'AFCARPARTS’ta yeni misiniz?', new_d: 'Ne yapmak istediğinizi seçin:', buy_t: 'Parça satın almak istiyorum', buy_d: 'Müşteri hesabı · ücretsiz · 1 dakikada hazır', sell_t: 'Parça satmak istiyorum', sell_d: 'Bayi, servis ve toptancılar için satıcı hesabı · mağazanız ekibimizin incelemesinden sonra yayına alınır', same_login: 'Müşteriler ve satıcılar burada aynı şekilde giriş yapar.', cust_t: 'Müşteri hesabı oluştur – parça satın al', hint_sell: 'Parça mı satmak istiyorsunuz?', hint_sell_a: 'Satıcı hesabı oluştur', hint_buy: 'Sadece parça mı almak istiyorsunuz?', hint_buy_a: 'Müşteri hesabı oluştur', up_t: 'Hesabınızı satıcı hesabına dönüştürün', up_sub: 'Müşteri olarak giriş yaptınız ({email}). Firma bilgilerinizi tamamlayın – mevcut hesabınız satıcı hesabı olur. İkinci bir hesaba gerek yok. Mağazanız ekibimizin kısa incelemesinden sonra yayına alınır.', up_btn: 'Satıcı hesabına dönüştür', up_ok: 'Hesabınız artık bir satıcı hesabı. Mağazanızı inceliyoruz.' },
  sw: { have: 'Tayari nina akaunti', new_t: 'Mpya kwenye AFCARPARTS?', new_d: 'Chagua unachotaka kufanya:', buy_t: 'Nataka kununua vipuri', buy_d: 'Akaunti ya mteja · bure · tayari kwa dakika 1', sell_t: 'Nataka kuuza vipuri', sell_d: 'Akaunti ya muuzaji kwa wafanyabiashara, gereji na wauzaji wa jumla · duka lako litaanzishwa baada ya ukaguzi wa timu yetu', same_login: 'Wateja na wauzaji huingia hapa kwa njia ileile.', cust_t: 'Fungua akaunti ya mteja – nunua vipuri', hint_sell: 'Unataka kuuza vipuri?', hint_sell_a: 'Fungua akaunti ya muuzaji', hint_buy: 'Unataka kununua tu?', hint_buy_a: 'Fungua akaunti ya mteja', up_t: 'Badilisha akaunti yako kuwa ya muuzaji', up_sub: 'Umeingia kama mteja ({email}). Jaza taarifa za kampuni yako – akaunti yako iliyopo itakuwa akaunti ya muuzaji. Huhitaji akaunti ya pili. Duka lako litaanzishwa baada ya ukaguzi mfupi wa timu yetu.', up_btn: 'Badilisha kuwa akaunti ya muuzaji', up_ok: 'Akaunti yako sasa ni ya muuzaji. Tunakagua duka lako.' }
};
function authTxt() { var l = S.lang === 'ln' ? 'fr' : S.lang; return AUTH_TXT[l] || AUTH_TXT.en; }

// Die zwei grossen Karten "kaufen" / "verkaufen"
function authChoiceCards() {
  var A = authTxt();
  var card = function (icon, title, desc, target, accent) {
    return '<button type="button" onclick="render(\'' + target + '\')" style="display:flex;gap:.9rem;align-items:flex-start;width:100%;text-align:start;padding:1.1rem 1.15rem;margin-bottom:.8rem;background:var(--surface,#fff);border:2px solid ' + accent + ';border-radius:14px;cursor:pointer;font:inherit;color:inherit;transition:transform .12s ease,box-shadow .12s ease" onmouseover="this.style.transform=\'translateY(-2px)\';this.style.boxShadow=\'0 6px 18px rgba(16,24,40,.08)\'" onmouseout="this.style.transform=\'\';this.style.boxShadow=\'\'">'
      + '<span style="font-size:2rem;line-height:1">' + icon + '</span>'
      + '<span style="flex:1"><span style="display:block;font-weight:700;font-size:1.05rem;margin-bottom:.25rem">' + esc(title) + '</span>'
      + '<span style="display:block;font-size:.85rem;opacity:.75;line-height:1.4">' + esc(desc) + '</span></span>'
      + '<span style="font-size:1.3rem;opacity:.5;align-self:center">›</span></button>';
  };
  return '<div style="font-weight:700;font-size:1.15rem;margin-bottom:.25rem">' + esc(A.new_t) + '</div>'
    + '<div style="font-size:.88rem;opacity:.75;margin-bottom:.9rem">' + esc(A.new_d) + '</div>'
    + card('🛒', A.buy_t, A.buy_d, 'register', '#4f7df3')
    + card('🏪', A.sell_t, A.sell_d, 'seller-register', '#16a34a');
}

// Hinweis-Leiste "falsches Formular?" ueber den Registrierformularen
function authSwitchHint(kind) {
  var A = authTxt();
  var q = kind === 'sell' ? A.hint_sell : A.hint_buy, a = kind === 'sell' ? A.hint_sell_a : A.hint_buy_a;
  var target = kind === 'sell' ? 'seller-register' : 'register';
  return '<div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;padding:.7rem 1rem;margin-bottom:1rem;border-radius:10px;background:var(--surface2,#f3f5f8);font-size:.9rem">'
    + '<span>' + (kind === 'sell' ? '🏪' : '🛒') + ' ' + esc(q) + '</span>'
    + '<a href="javascript:void(0)" onclick="render(\'' + target + '\')" style="font-weight:700">' + esc(a) + ' →</a></div>';
}

route('signup', async function () {
  if (S.user) { render(S.user.role === 'customer' || S.user.role === 'buyer' ? 'seller-register' : 'home'); return; }
  $('content').innerHTML = '<div class="page-wrap"><section class="section" style="max-width:560px;margin:0 auto">'
    + authChoiceCards()
    + '<p style="text-align:center;font-size:.88rem;margin-top:.6rem">' + esc(authTxt().have) + ' · <a href="javascript:void(0)" onclick="render(\'login\')" style="font-weight:700">' + t('auth.login_btn') + '</a></p>'
    + '</section></div>';
});

/* ═════════════════════════════════════════════════════════════════
   PASSWORT VERGESSEN / ZURUECKSETZEN
   Link in der E-Mail: https://afcarparts.com/#reset-password?token=…
   ═════════════════════════════════════════════════════════════════ */
var PW_TXT = {
  de: { t1: 'Passwort vergessen', i1: 'Gib die E-Mail-Adresse deines Kontos ein. Wir schicken dir einen Link zum Zurücksetzen.', b1: 'Link senden', ok1: 'Falls ein Konto mit dieser E-Mail existiert, ist der Link unterwegs. Bitte prüfe auch den Spam-Ordner.', t2: 'Neues Passwort festlegen', p1: 'Neues Passwort', p2: 'Passwort wiederholen', b2: 'Passwort speichern', ok2: 'Passwort geändert. Du kannst dich jetzt anmelden.', e_match: 'Die Passwörter stimmen nicht überein.', e_short: 'Das Passwort ist zu kurz.', e_token: 'Der Link ist ungültig oder abgelaufen. Bitte fordere einen neuen an.', e_many: 'Zu viele Versuche. Bitte warte etwas und versuche es erneut.', back: 'Zurück zur Anmeldung' },
  en: { t1: 'Forgot password', i1: 'Enter the e-mail address of your account. We will send you a link to reset your password.', b1: 'Send link', ok1: 'If an account with this e-mail exists, the link is on its way. Please also check your spam folder.', t2: 'Set a new password', p1: 'New password', p2: 'Repeat password', b2: 'Save password', ok2: 'Password changed. You can now log in.', e_match: 'The passwords do not match.', e_short: 'The password is too short.', e_token: 'The link is invalid or has expired. Please request a new one.', e_many: 'Too many attempts. Please wait a moment and try again.', back: 'Back to login' },
  fr: { t1: 'Mot de passe oublié', i1: 'Saisissez l’adresse e-mail de votre compte. Nous vous enverrons un lien de réinitialisation.', b1: 'Envoyer le lien', ok1: 'Si un compte existe avec cet e-mail, le lien est en route. Vérifiez aussi vos spams.', t2: 'Nouveau mot de passe', p1: 'Nouveau mot de passe', p2: 'Répéter le mot de passe', b2: 'Enregistrer', ok2: 'Mot de passe modifié. Vous pouvez vous connecter.', e_match: 'Les mots de passe ne correspondent pas.', e_short: 'Le mot de passe est trop court.', e_token: 'Le lien est invalide ou a expiré. Veuillez en demander un nouveau.', e_many: 'Trop de tentatives. Veuillez patienter un instant.', back: 'Retour à la connexion' },
  pt: { t1: 'Esqueci-me da palavra-passe', i1: 'Introduza o e-mail da sua conta. Enviaremos um link para redefinir a palavra-passe.', b1: 'Enviar link', ok1: 'Se existir uma conta com este e-mail, o link está a caminho. Verifique também o spam.', t2: 'Definir nova palavra-passe', p1: 'Nova palavra-passe', p2: 'Repetir palavra-passe', b2: 'Guardar', ok2: 'Palavra-passe alterada. Já pode iniciar sessão.', e_match: 'As palavras-passe não coincidem.', e_short: 'A palavra-passe é demasiado curta.', e_token: 'O link é inválido ou expirou. Peça um novo.', e_many: 'Demasiadas tentativas. Aguarde um pouco.', back: 'Voltar ao início de sessão' },
  es: { t1: 'Olvidé mi contraseña', i1: 'Introduce el correo de tu cuenta. Te enviaremos un enlace para restablecer la contraseña.', b1: 'Enviar enlace', ok1: 'Si existe una cuenta con este correo, el enlace está en camino. Revisa también el spam.', t2: 'Crear nueva contraseña', p1: 'Nueva contraseña', p2: 'Repetir contraseña', b2: 'Guardar contraseña', ok2: 'Contraseña cambiada. Ya puedes iniciar sesión.', e_match: 'Las contraseñas no coinciden.', e_short: 'La contraseña es demasiado corta.', e_token: 'El enlace no es válido o ha caducado. Solicita uno nuevo.', e_many: 'Demasiados intentos. Espera un momento.', back: 'Volver al inicio de sesión' },
  ar: { t1: 'نسيت كلمة المرور', i1: 'أدخل البريد الإلكتروني لحسابك. سنرسل لك رابطًا لإعادة التعيين.', b1: 'إرسال الرابط', ok1: 'إذا كان هناك حساب بهذا البريد، فالرابط في الطريق. تحقق من مجلد الرسائل غير المرغوب فيها أيضًا.', t2: 'تعيين كلمة مرور جديدة', p1: 'كلمة المرور الجديدة', p2: 'أعد كتابة كلمة المرور', b2: 'حفظ', ok2: 'تم تغيير كلمة المرور. يمكنك تسجيل الدخول الآن.', e_match: 'كلمتا المرور غير متطابقتين.', e_short: 'كلمة المرور قصيرة جدًا.', e_token: 'الرابط غير صالح أو منتهي الصلاحية. اطلب رابطًا جديدًا.', e_many: 'محاولات كثيرة. انتظر قليلًا ثم حاول مجددًا.', back: 'العودة إلى تسجيل الدخول' },
  tr: { t1: 'Şifremi unuttum', i1: 'Hesabınızın e-posta adresini girin. Şifre sıfırlama bağlantısı göndereceğiz.', b1: 'Bağlantı gönder', ok1: 'Bu e-postaya ait bir hesap varsa bağlantı yolda. Spam klasörünü de kontrol edin.', t2: 'Yeni şifre belirle', p1: 'Yeni şifre', p2: 'Şifreyi tekrarla', b2: 'Kaydet', ok2: 'Şifre değiştirildi. Artık giriş yapabilirsiniz.', e_match: 'Şifreler eşleşmiyor.', e_short: 'Şifre çok kısa.', e_token: 'Bağlantı geçersiz veya süresi dolmuş. Lütfen yenisini isteyin.', e_many: 'Çok fazla deneme. Lütfen biraz bekleyin.', back: 'Girişe dön' },
  sw: { t1: 'Umesahau nenosiri', i1: 'Weka barua pepe ya akaunti yako. Tutakutumia kiungo cha kuweka upya nenosiri.', b1: 'Tuma kiungo', ok1: 'Ikiwa akaunti yenye barua pepe hii ipo, kiungo kiko njiani. Angalia pia folda ya spam.', t2: 'Weka nenosiri jipya', p1: 'Nenosiri jipya', p2: 'Rudia nenosiri', b2: 'Hifadhi', ok2: 'Nenosiri limebadilishwa. Sasa unaweza kuingia.', e_match: 'Manenosiri hayalingani.', e_short: 'Nenosiri ni fupi mno.', e_token: 'Kiungo si halali au kimeisha muda. Omba kipya.', e_many: 'Majaribio mengi mno. Tafadhali subiri kidogo.', back: 'Rudi kwenye kuingia' }
};
function pwTxt() { var l = S.lang === 'ln' ? 'fr' : S.lang; return PW_TXT[l] || PW_TXT.en; }

route('forgot-password', async function () {
  var X = pwTxt();
  $('content').innerHTML =
    '<div class="page-wrap"><section class="section auth-section">' +
    '<div class="sec-hd"><div class="sec-title">' + esc(X.t1) + '</div></div>' +
    '<div class="auth-form">' +
    '<p style="font-size:.9rem;opacity:.8;margin-bottom:1rem">' + esc(X.i1) + '</p>' +
    '<div class="fg"><label>' + t('auth.email') + '</label><input id="fpEmail" type="email" autocomplete="email"/></div>' +
    '<button class="btn btn-primary" id="fpBtn" onclick="doForgotPw()">' + esc(X.b1) + '</button>' +
    '<div id="fpMsg" style="margin-top:1rem"></div>' +
    '<p style="margin-top:.75rem;font-size:.85rem"><a href="javascript:void(0)" onclick="render(\'login\')">' + esc(X.back) + '</a></p>' +
    '</div></section></div>';
  window.doForgotPw = async function () {
    var email = ($('fpEmail') && $('fpEmail').value.trim()) || '';
    if (!email) { toast(t('auth.fill_all'), 't-error'); return; }
    var btn = $('fpBtn'); if (btn) btn.disabled = true;
    try {
      await apiReq('/auth/request-password-reset', 'POST', { email: email, lang: S.lang }, false);
      $('fpMsg').innerHTML = '<div class="alert alert-success">' + esc(X.ok1) + '</div>';
    } catch (e) {
      toast(/too_many/.test(e.message || '') ? X.e_many : (e.message || 'Error'), 't-error');
      if (btn) btn.disabled = false;
    }
  };
});

route('reset-password', async function (params) {
  var X = pwTxt();
  var token = (params && params.token) || '';
  if (!token) { render('forgot-password'); return; }
  $('content').innerHTML =
    '<div class="page-wrap"><section class="section auth-section">' +
    '<div class="sec-hd"><div class="sec-title">' + esc(X.t2) + '</div></div>' +
    '<div class="auth-form">' +
    '<div class="fg"><label>' + esc(X.p1) + '</label><input id="rpPass1" type="password" autocomplete="new-password"/></div>' +
    '<div class="fg"><label>' + esc(X.p2) + '</label><input id="rpPass2" type="password" autocomplete="new-password"/></div>' +
    '<button class="btn btn-primary" id="rpBtn" onclick="doResetPw()">' + esc(X.b2) + '</button>' +
    '<div id="rpMsg" style="margin-top:1rem"></div>' +
    '</div></section></div>';
  window.doResetPw = async function () {
    var a = ($('rpPass1') && $('rpPass1').value) || '', b = ($('rpPass2') && $('rpPass2').value) || '';
    if (!a || !b) { toast(t('auth.fill_all'), 't-error'); return; }
    if (a !== b) { toast(X.e_match, 't-error'); return; }
    var btn = $('rpBtn'); if (btn) btn.disabled = true;
    try {
      await apiReq('/auth/reset-password', 'POST', { token: token, newPassword: a }, false);
      // Token aus der Adresszeile entfernen, damit er nicht in der History bleibt
      history.replaceState({}, '', window.location.pathname + '#login');
      $('rpMsg').innerHTML = '<div class="alert alert-success">' + esc(X.ok2) + '</div>';
      setTimeout(function () { render('login'); }, 1800);
    } catch (e) {
      var m = e.message || '';
      toast(/password_too_short/.test(m) ? X.e_short : /invalid_or_expired/.test(m) ? X.e_token : /too_many/.test(m) ? X.e_many : (m || 'Error'), 't-error');
      if (btn) btn.disabled = false;
    }
  };
});

/* ═════════════════════════════════════════════════════════════════
   HAENDLER STARTKLAR?  Produkte werden erst sichtbar, wenn Versandtarif
   UND Auszahlungskonto hinterlegt sind (Server prueft das ebenfalls).
   ═════════════════════════════════════════════════════════════════ */
var RDY_TXT = {
  de: { shop_profile: 'Shop-Daten vervollständigen (Firma, Adresse, Telefon)', shop_approval: 'Dein Shop wird von AFCARPARTS geprüft – du bekommst eine E-Mail, sobald er freigeschaltet ist.', subscription: 'Abo abschließen', in_review: 'in Prüfung', rejected: 'abgelehnt', review_toast: 'Gespeichert – das Produkt wird vor der Veröffentlichung von AFCARPARTS geprüft.', title: 'Deine Produkte sind noch nicht sichtbar', intro: 'Damit Kunden bei dir kaufen können, fehlt noch:', rates: 'Versandtarif anlegen', payout: 'Auszahlungskonto einrichten', hidden: '{n} Produkt(e) warten auf Veröffentlichung.', ready: 'Alles eingerichtet – {n} ausgeblendete(s) Produkt(e) jetzt veröffentlichen?', pub: 'Alle veröffentlichen', saved_hidden: 'Gespeichert, aber noch nicht sichtbar: Versandtarif und Auszahlungskonto fehlen.', done: '{n} Produkt(e) veröffentlicht' },
  en: { shop_profile: 'Complete shop details (company, address, phone)', shop_approval: 'Your shop is being reviewed by AFCARPARTS – you will get an e-mail once it is approved.', subscription: 'Choose a subscription', in_review: 'in review', rejected: 'rejected', review_toast: 'Saved – the product will be reviewed by AFCARPARTS before it goes live.', title: 'Your products are not visible yet', intro: 'Before customers can buy from you, you still need to:', rates: 'Add a shipping rate', payout: 'Set up a payout account', hidden: '{n} product(s) waiting to be published.', ready: 'All set – publish {n} hidden product(s) now?', pub: 'Publish all', saved_hidden: 'Saved, but not visible yet: shipping rate and payout account are missing.', done: '{n} product(s) published' },
  fr: { shop_profile: 'Compléter les infos de la boutique (société, adresse, téléphone)', shop_approval: 'Votre boutique est en cours de vérification par AFCARPARTS – vous recevrez un e-mail dès sa validation.', subscription: 'Choisir un abonnement', in_review: 'en vérification', rejected: 'refusé', review_toast: 'Enregistré – le produit sera vérifié par AFCARPARTS avant sa publication.', title: 'Vos produits ne sont pas encore visibles', intro: 'Pour que les clients puissent acheter chez vous, il manque :', rates: 'Ajouter un tarif de livraison', payout: 'Configurer le compte de versement', hidden: '{n} produit(s) en attente de publication.', ready: 'Tout est prêt – publier maintenant {n} produit(s) masqué(s) ?', pub: 'Tout publier', saved_hidden: 'Enregistré, mais pas encore visible : tarif de livraison et compte de versement manquants.', done: '{n} produit(s) publié(s)' },
  pt: { shop_profile: 'Completar dados da loja (empresa, morada, telefone)', shop_approval: 'A sua loja está a ser verificada pela AFCARPARTS – receberá um e-mail quando for aprovada.', subscription: 'Escolher uma assinatura', in_review: 'em verificação', rejected: 'recusado', review_toast: 'Guardado – o produto será verificado pela AFCARPARTS antes da publicação.', title: 'Os seus produtos ainda não estão visíveis', intro: 'Para que os clientes possam comprar, falta:', rates: 'Criar tarifa de envio', payout: 'Configurar conta de pagamento', hidden: '{n} produto(s) aguardam publicação.', ready: 'Tudo pronto – publicar agora {n} produto(s) oculto(s)?', pub: 'Publicar tudo', saved_hidden: 'Guardado, mas ainda não visível: faltam a tarifa de envio e a conta de pagamento.', done: '{n} produto(s) publicado(s)' },
  es: { shop_profile: 'Completar datos de la tienda (empresa, dirección, teléfono)', shop_approval: 'AFCARPARTS está revisando tu tienda: recibirás un correo cuando se apruebe.', subscription: 'Elegir una suscripción', in_review: 'en revisión', rejected: 'rechazado', review_toast: 'Guardado: AFCARPARTS revisará el producto antes de publicarlo.', title: 'Tus productos aún no son visibles', intro: 'Para que los clientes puedan comprarte, falta:', rates: 'Crear tarifa de envío', payout: 'Configurar cuenta de pago', hidden: '{n} producto(s) esperan publicación.', ready: 'Todo listo – ¿publicar ahora {n} producto(s) oculto(s)?', pub: 'Publicar todo', saved_hidden: 'Guardado, pero aún no visible: faltan la tarifa de envío y la cuenta de pago.', done: '{n} producto(s) publicado(s)' },
  ar: { shop_profile: 'أكمل بيانات المتجر (الشركة، العنوان، الهاتف)', shop_approval: 'تتم مراجعة متجرك من قبل AFCARPARTS – ستصلك رسالة عند الموافقة.', subscription: 'اختر اشتراكًا', in_review: 'قيد المراجعة', rejected: 'مرفوض', review_toast: 'تم الحفظ – ستراجع AFCARPARTS المنتج قبل نشره.', title: 'منتجاتك غير مرئية بعد', intro: 'لكي يتمكن العملاء من الشراء منك، ما زال ينقص:', rates: 'إضافة سعر شحن', payout: 'إعداد حساب الدفع', hidden: '{n} منتج(ات) بانتظار النشر.', ready: 'كل شيء جاهز – نشر {n} منتج(ات) مخفية الآن؟', pub: 'نشر الكل', saved_hidden: 'تم الحفظ لكنه غير مرئي بعد: ينقص سعر الشحن وحساب الدفع.', done: 'تم نشر {n} منتج(ات)' },
  tr: { shop_profile: 'Mağaza bilgilerini tamamla (firma, adres, telefon)', shop_approval: 'Mağazanız AFCARPARTS tarafından inceleniyor – onaylandığında e-posta alacaksınız.', subscription: 'Abonelik seç', in_review: 'incelemede', rejected: 'reddedildi', review_toast: 'Kaydedildi – ürün yayınlanmadan önce AFCARPARTS tarafından incelenecek.', title: 'Ürünleriniz henüz görünmüyor', intro: 'Müşterilerin sizden alışveriş yapabilmesi için eksik olanlar:', rates: 'Kargo tarifesi ekle', payout: 'Ödeme hesabı kur', hidden: '{n} ürün yayınlanmayı bekliyor.', ready: 'Her şey hazır – {n} gizli ürünü şimdi yayınla?', pub: 'Tümünü yayınla', saved_hidden: 'Kaydedildi ancak henüz görünmüyor: kargo tarifesi ve ödeme hesabı eksik.', done: '{n} ürün yayınlandı' },
  sw: { shop_profile: 'Kamilisha taarifa za duka (kampuni, anwani, simu)', shop_approval: 'Duka lako linakaguliwa na AFCARPARTS – utapokea barua pepe likiidhinishwa.', subscription: 'Chagua usajili', in_review: 'inakaguliwa', rejected: 'imekataliwa', review_toast: 'Imehifadhiwa – AFCARPARTS itakagua bidhaa kabla ya kuchapishwa.', title: 'Bidhaa zako bado hazionekani', intro: 'Ili wateja waweze kununua kwako, bado inahitajika:', rates: 'Weka kiwango cha usafirishaji', payout: 'Weka akaunti ya malipo', hidden: 'Bidhaa {n} zinasubiri kuchapishwa.', ready: 'Kila kitu kiko tayari – chapisha bidhaa {n} zilizofichwa sasa?', pub: 'Chapisha zote', saved_hidden: 'Imehifadhiwa, lakini bado haionekani: kiwango cha usafirishaji na akaunti ya malipo vinakosekana.', done: 'Bidhaa {n} zimechapishwa' }
};
function rdyTxt() { var l = S.lang === 'ln' ? 'fr' : S.lang; return RDY_TXT[l] || RDY_TXT.en; }

async function renderReadinessBanner() {
  if (!S.user || S.user.role === 'customer') return;
  var host = document.querySelector('#content .section');
  if (!host) return;
  var r;
  try { r = await apiReq('/seller/readiness', 'GET', null, true); } catch (e) { return; }
  if (!r) return;
  var X = rdyTxt();
  var hidden = (r.products && r.products.hidden) || 0;
  var old = document.getElementById('rdy-banner'); if (old) old.remove();
  var box = document.createElement('div');
  box.id = 'rdy-banner';
  if (!r.ok) {
    var h = '<div style="padding:1rem 1.1rem;border-radius:10px;background:#fff7e6;border:1px solid #f5c26b;color:#5c4200;margin-bottom:1.1rem">';
    h += '<div style="font-weight:700;margin-bottom:.35rem">⚠️ ' + esc(X.title) + '</div>';
    h += '<div style="font-size:.9rem;margin-bottom:.6rem">' + esc(X.intro) + '</div>';
    h += '<div style="display:flex;gap:.5rem;flex-wrap:wrap">';
    if (r.missing.indexOf('shop_profile') !== -1) h += '<button class="btn btn-primary btn-sm" onclick="render(\'seller-shop\')">🏪 ' + esc(X.shop_profile) + '</button>';
    if (r.missing.indexOf('subscription') !== -1) h += '<button class="btn btn-primary btn-sm" onclick="render(\'seller-billing\')">⭐ ' + esc(X.subscription) + '</button>';
    if (r.missing.indexOf('shipping_rates') !== -1) h += '<button class="btn btn-primary btn-sm" onclick="render(\'seller-shipping-rates\')">🚚 ' + esc(X.rates) + '</button>';
    if (r.missing.indexOf('payout_account') !== -1) h += '<button class="btn btn-primary btn-sm" onclick="render(\'seller-payout-setup\')">🏦 ' + esc(X.payout) + '</button>';
    h += '</div>';
    if (r.missing.indexOf('shop_approval') !== -1) h += '<div style="font-size:.85rem;margin-top:.6rem">⏳ ' + esc(X.shop_approval) + '</div>';
    if (hidden) h += '<div style="font-size:.8rem;margin-top:.6rem;opacity:.8">' + esc(X.hidden.replace('{n}', hidden)) + '</div>';
    box.innerHTML = h + '</div>';
  } else if (hidden > 0) {
    box.innerHTML = '<div style="padding:.9rem 1.1rem;border-radius:10px;background:#ecfdf3;border:1px solid #86d9a8;color:#14532d;margin-bottom:1.1rem;display:flex;gap:.8rem;align-items:center;flex-wrap:wrap">'
      + '<span style="flex:1;min-width:200px">✅ ' + esc(X.ready.replace('{n}', hidden)) + '</span>'
      + '<button class="btn btn-primary btn-sm" onclick="publishAllHidden()">' + esc(X.pub) + '</button></div>';
  } else {
    return;
  }
  host.insertBefore(box, host.firstChild);
}
window.publishAllHidden = async function () {
  var X = rdyTxt();
  try {
    var r = await apiReq('/seller/products/publish-all', 'POST', {}, true);
    toast('✓ ' + X.done.replace('{n}', r.published || 0));
    render(S.page, S.pageParams);
  } catch (e) { toast(e.message || 'Error', 't-error'); }
};

/* ---------- ROUTE: REGISTER ---------- */
route('register', async function () {
  $('content').innerHTML =
    '<div class="page-wrap"><section class="section auth-section">' +
    '<div class="sec-hd"><div class="sec-title">🛒 ' + esc(authTxt().cust_t) + '</div></div>' +
    '<div class="auth-form">' + authSwitchHint('sell') +
    '<div class="fg"><label>' + t('auth.name') + '</label><input id="rgName"/></div>' +
    '<div class="fg"><label>' + t('auth.email') + '</label><input id="rgEmail" type="email"/></div>' +
    '<div class="fg"><label>' + t('auth.phone') + '</label><input id="rgPhone"/></div>' +
    '<div class="fg"><label>' + t('auth.country') + '</label><input id="rgCountry"/></div>' +
    '<div class="fg"><label>' + t('auth.password') + '</label><input id="rgPass" type="password"/></div>' +
    '<div class="fg"><label>' + t('auth.confirm') + '</label><input id="rgPass2" type="password"/></div>' +
    '<button class="btn btn-primary" onclick="doRegister()">' + t('auth.register_btn') + '</button>' +
    '<p style="margin-top:.75rem;font-size:.85rem">' + t('auth.have_account') +
    ' <a href="javascript:void(0)" onclick="render(\'login\')">' + t('auth.login_btn') + '</a></p>' +
    '</div></section></div>';

  window.doRegister = async function () {
    const name = $('rgName') && $('rgName').value.trim();
    const email = $('rgEmail') && $('rgEmail').value.trim();
    const phone = $('rgPhone') && $('rgPhone').value.trim();
    const country = $('rgCountry') && $('rgCountry').value.trim();
    const pass = $('rgPass') && $('rgPass').value.trim();
    const pass2 = $('rgPass2') && $('rgPass2').value.trim();
    const role = 'customer'; // Haendler registrieren sich ueber "Teile verkaufen"

    if (!name || !email || !phone || !country || !pass || !pass2) {
      toast(t('auth.fill_all'), 't-error'); return;
    }
    if (pass !== pass2) { toast(t('auth.mismatch'), 't-error'); return; }

    try {
      const res = await apiReq('/auth/register', 'POST', {
        name: name, email: email, phone: phone, country: country,
        password: pass, role: role
      }, false);
      S.user = res.user;
      S.token = res.token;
      localStorage.setItem('apa_user', JSON.stringify(S.user));
      localStorage.setItem('apa_token', S.token);
      toast('OK');
      render('home');
    } catch (e) {
      toast(e.message || 'Error', 't-error');
    }
  };
});


/* ---------- ROUTE: HÄNDLER-REGISTRIERUNG (mobile.de-Style) ----------
   Firmendaten + Zugangsdaten + statische Abo-Auswahl + Händler-AGB.
   AGB öffnen als Overlay (Formular bleibt erhalten -> "Zurück zur
   Registrierung"). Legt User + Shop (inaktiv) in einem Schritt an;
   der Shop erscheint sofort in der Admin-Händler-Verwaltung.        */
route('seller-register', async function () {

  // Länder (29 Afrika + Händler-Herkunftsländer) & Städte je Land
  var SR_COUNTRIES = [
    { iso:'NG', cities:['Lagos','Abuja','Kano','Ibadan','Port Harcourt','Benin City','Kaduna','Enugu','Onitsha','Aba','Jos','Ilorin'] },
    { iso:'GH', cities:['Accra','Kumasi','Tamale','Takoradi','Cape Coast','Tema','Sekondi','Sunyani','Koforidua','Ho'] },
    { iso:'KE', cities:['Nairobi','Mombasa','Kisumu','Nakuru','Eldoret','Thika','Malindi','Kitale','Nyeri','Machakos'] },
    { iso:'CD', cities:['Kinshasa','Lubumbashi','Mbuji-Mayi','Kananga','Kisangani','Bukavu','Goma','Matadi','Likasi','Kolwezi'] },
    { iso:'SN', cities:['Dakar','Touba','Thiès','Rufisque','Kaolack','Saint-Louis','Ziguinchor','Diourbel','Mbour'] },
    { iso:'CI', cities:['Abidjan','Bouaké','Daloa','Yamoussoukro','San-Pédro','Korhogo','Man','Gagnoa'] },
    { iso:'CM', cities:['Douala','Yaoundé','Garoua','Bamenda','Maroua','Bafoussam','Ngaoundéré','Bertoua','Kumba'] },
    { iso:'ZA', cities:['Johannesburg','Cape Town','Durban','Pretoria','Gqeberha','Bloemfontein','East London','Pietermaritzburg','Polokwane'] },
    { iso:'TZ', cities:['Dar es Salaam','Mwanza','Dodoma','Arusha','Mbeya','Morogoro','Tanga','Zanzibar City','Moshi'] },
    { iso:'UG', cities:['Kampala','Gulu','Lira','Mbarara','Jinja','Mbale','Masaka','Entebbe','Fort Portal'] },
    { iso:'TG', cities:['Lomé','Sokodé','Kara','Kpalimé','Atakpamé','Dapaong','Tsévié'] },
    { iso:'BJ', cities:['Cotonou','Porto-Novo','Parakou','Djougou','Bohicon','Abomey','Natitingou'] },
    { iso:'AO', cities:['Luanda','Huambo','Lobito','Benguela','Lubango','Kuito','Malanje','Namibe'] },
    { iso:'GN', cities:['Conakry','Nzérékoré','Kankan','Kindia','Labé','Mamou','Boké','Faranah'] },
    { iso:'NE', cities:['Niamey','Zinder','Maradi','Agadez','Tahoua','Dosso','Arlit'] },
    { iso:'ZW', cities:['Harare','Bulawayo','Chitungwiza','Mutare','Gweru','Kwekwe','Kadoma','Masvingo'] },
    { iso:'GA', cities:['Libreville','Port-Gentil','Franceville','Oyem','Moanda','Lambaréné'] },
    { iso:'MA', cities:['Casablanca','Rabat','Marrakesh','Tangier','Fès','Agadir','Meknès','Oujda','Kénitra','Tétouan'] },
    { iso:'DZ', cities:['Algiers','Oran','Constantine','Annaba','Batna','Blida','Sétif','Djelfa','Tlemcen'] },
    { iso:'TN', cities:['Tunis','Sfax','Sousse','Kairouan','Bizerte','Gabès','Ariana','Gafsa'] },
    { iso:'EG', cities:['Cairo','Alexandria','Giza','Shubra El-Kheima','Port Said','Suez','Mansoura','Tanta','Asyut','Luxor'] },
    { iso:'NA', cities:['Windhoek','Walvis Bay','Swakopmund','Rundu','Oshakati','Rehoboth','Katima Mulilo'] },
    { iso:'ML', cities:['Bamako','Sikasso','Mopti','Ségou','Kayes','Koutiala','Gao','Kati'] },
    { iso:'CV', cities:['Praia','Mindelo','Santa Maria','Assomada','Espargos'] },
    { iso:'ST', cities:['São Tomé','Santo Amaro','Neves','Trindade'] },
    { iso:'ET', cities:['Addis Ababa','Dire Dawa','Mekelle','Gondar','Adama','Hawassa','Bahir Dar','Jimma'] },
    { iso:'RW', cities:['Kigali','Huye','Rubavu','Musanze','Muhanga'] },
    { iso:'GW', cities:['Bissau','Bafatá','Gabú','Bissorã','Cacheu'] },
    { iso:'LR', cities:['Monrovia','Gbarnga','Buchanan','Kakata','Ganta','Zwedru'] },
    // Händler-Herkunftsländer außerhalb Afrikas (Stadt als Freitext)
    { iso:'CN', cities:[] }, { iso:'HK', cities:[] }, { iso:'DE', cities:[] }, { iso:'FR', cities:[] },
    { iso:'GB', cities:[] }, { iso:'US', cities:[] }, { iso:'TR', cities:[] }, { iso:'AE', cities:[] }
  ];
  var SR_CNAMES = {
    NG:{en:'Nigeria',de:'Nigeria',fr:'Nigéria',pt:'Nigéria',es:'Nigeria',ar:'نيجيريا',tr:'Nijerya'},
    GH:{en:'Ghana',de:'Ghana',fr:'Ghana',pt:'Gana',es:'Ghana',ar:'غانا',tr:'Gana'},
    KE:{en:'Kenya',de:'Kenia',fr:'Kenya',pt:'Quénia',es:'Kenia',ar:'كينيا',tr:'Kenya'},
    CD:{en:'DR Congo',de:'DR Kongo',fr:'RD Congo',pt:'RD Congo',es:'RD Congo',ar:'جمهورية الكونغو الديمقراطية',tr:'Demokratik Kongo'},
    SN:{en:'Senegal',de:'Senegal',fr:'Sénégal',pt:'Senegal',es:'Senegal',ar:'السنغال',tr:'Senegal'},
    CI:{en:"Côte d'Ivoire",de:'Elfenbeinküste',fr:"Côte d'Ivoire",pt:'Costa do Marfim',es:'Costa de Marfil',ar:'ساحل العاج',tr:'Fildişi Sahili'},
    CM:{en:'Cameroon',de:'Kamerun',fr:'Cameroun',pt:'Camarões',es:'Camerún',ar:'الكاميرون',tr:'Kamerun'},
    ZA:{en:'South Africa',de:'Südafrika',fr:'Afrique du Sud',pt:'África do Sul',es:'Sudáfrica',ar:'جنوب أفريقيا',tr:'Güney Afrika'},
    TZ:{en:'Tanzania',de:'Tansania',fr:'Tanzanie',pt:'Tanzânia',es:'Tanzania',ar:'تنزانيا',tr:'Tanzanya'},
    UG:{en:'Uganda',de:'Uganda',fr:'Ouganda',pt:'Uganda',es:'Uganda',ar:'أوغندا',tr:'Uganda'},
    TG:{en:'Togo',de:'Togo',fr:'Togo',pt:'Togo',es:'Togo',ar:'توغو',tr:'Togo'},
    BJ:{en:'Benin',de:'Benin',fr:'Bénin',pt:'Benim',es:'Benín',ar:'بنين',tr:'Benin'},
    AO:{en:'Angola',de:'Angola',fr:'Angola',pt:'Angola',es:'Angola',ar:'أنغولا',tr:'Angola'},
    GN:{en:'Guinea',de:'Guinea',fr:'Guinée',pt:'Guiné',es:'Guinea',ar:'غينيا',tr:'Gine'},
    NE:{en:'Niger',de:'Niger',fr:'Niger',pt:'Níger',es:'Níger',ar:'النيجر',tr:'Nijer'},
    ZW:{en:'Zimbabwe',de:'Simbabwe',fr:'Zimbabwe',pt:'Zimbábue',es:'Zimbabue',ar:'زيمبابوي',tr:'Zimbabve'},
    GA:{en:'Gabon',de:'Gabun',fr:'Gabon',pt:'Gabão',es:'Gabón',ar:'الغابون',tr:'Gabon'},
    MA:{en:'Morocco',de:'Marokko',fr:'Maroc',pt:'Marrocos',es:'Marruecos',ar:'المغرب',tr:'Fas'},
    DZ:{en:'Algeria',de:'Algerien',fr:'Algérie',pt:'Argélia',es:'Argelia',ar:'الجزائر',tr:'Cezayir'},
    TN:{en:'Tunisia',de:'Tunesien',fr:'Tunisie',pt:'Tunísia',es:'Túnez',ar:'تونس',tr:'Tunus'},
    EG:{en:'Egypt',de:'Ägypten',fr:'Égypte',pt:'Egito',es:'Egipto',ar:'مصر',tr:'Mısır'},
    NA:{en:'Namibia',de:'Namibia',fr:'Namibie',pt:'Namíbia',es:'Namibia',ar:'ناميبيا',tr:'Namibya'},
    ML:{en:'Mali',de:'Mali',fr:'Mali',pt:'Mali',es:'Malí',ar:'مالي',tr:'Mali'},
    CV:{en:'Cabo Verde',de:'Kap Verde',fr:'Cap-Vert',pt:'Cabo Verde',es:'Cabo Verde',ar:'الرأس الأخضر',tr:'Cabo Verde'},
    ST:{en:'São Tomé & Príncipe',de:'São Tomé und Príncipe',fr:'São Tomé-et-Príncipe',pt:'São Tomé e Príncipe',es:'Santo Tomé y Príncipe',ar:'ساو تومي وبرينسيب',tr:'São Tomé ve Príncipe'},
    ET:{en:'Ethiopia',de:'Äthiopien',fr:'Éthiopie',pt:'Etiópia',es:'Etiopía',ar:'إثيوبيا',tr:'Etiyopya'},
    RW:{en:'Rwanda',de:'Ruanda',fr:'Rwanda',pt:'Ruanda',es:'Ruanda',ar:'رواندا',tr:'Ruanda'},
    GW:{en:'Guinea-Bissau',de:'Guinea-Bissau',fr:'Guinée-Bissau',pt:'Guiné-Bissau',es:'Guinea-Bisáu',ar:'غينيا بيساو',tr:'Gine-Bisau'},
    LR:{en:'Liberia',de:'Liberia',fr:'Libéria',pt:'Libéria',es:'Liberia',ar:'ليبيريا',tr:'Liberya'},
    CN:{en:'China',de:'China',fr:'Chine',pt:'China',es:'China',ar:'الصين',tr:'Çin'},
    HK:{en:'Hong Kong',de:'Hongkong',fr:'Hong Kong',pt:'Hong Kong',es:'Hong Kong',ar:'هونغ كونغ',tr:'Hong Kong'},
    DE:{en:'Germany',de:'Deutschland',fr:'Allemagne',pt:'Alemanha',es:'Alemania',ar:'ألمانيا',tr:'Almanya'},
    FR:{en:'France',de:'Frankreich',fr:'France',pt:'França',es:'Francia',ar:'فرنسا',tr:'Fransa'},
    GB:{en:'United Kingdom',de:'Vereinigtes Königreich',fr:'Royaume-Uni',pt:'Reino Unido',es:'Reino Unido',ar:'المملكة المتحدة',tr:'Birleşik Krallık'},
    US:{en:'USA',de:'USA',fr:'États-Unis',pt:'EUA',es:'EE. UU.',ar:'الولايات المتحدة',tr:'ABD'},
    TR:{en:'Türkiye',de:'Türkei',fr:'Turquie',pt:'Turquia',es:'Turquía',ar:'تركيا',tr:'Türkiye'},
    AE:{en:'UAE',de:'VAE',fr:'Émirats arabes unis',pt:'EAU',es:'EAU',ar:'الإمارات',tr:'BAE'}
  };
  function srCName(iso){ var n = SR_CNAMES[iso] || {}; var l = S.lang; if (l === 'ln') l = (n.fr ? 'fr' : 'en'); if (l === 'sw') l = 'en'; return n[l] || n.en || iso; }

  var SRL = {
    en: { title:'Become a seller', sub:'Create your seller account - registration is free. Your shop goes live after a quick review by our team.',
      sec_company:'Company details', sec_account:'Account details',
      company:'Company name', contact:'Contact person', email:'Email', phone:'Phone',
      country:'Country', city:'City', city_other:'Other city…', other_ph:'Enter your city',
      vat:'VAT ID', vat_opt:'(optional)', pass:'Password', pass2:'Confirm password',
      plan_t:'Choose a plan', plan_hint:'Your choice is saved - billing will be activated later.',
      basic_d:'To get started: list & sell products', pro_d:'More visibility & features',
      agb_title:'Seller Terms & Conditions', agb_read:'Read seller terms', agb_accept:'I accept the seller terms & conditions',
      back:'Back to registration', submit:'Create seller account',
      fill:'Please fill in all required fields', mismatch:'Passwords do not match', terms_req:'Please accept the seller terms',
      email_exists:'This email is already registered', pass_short:'Password is too short',
      ok_t:'Welcome to AFRICARPARTS!', ok_d:'Your seller account has been created. Our team will review and activate your shop shortly. You can already set up your payouts or go to your dashboard.',
      payout_btn:'Set up payouts', dash_btn:'Go to dashboard',
      have:'Already have an account?', login:'Log in', pickC:'— Select country —', pickCity:'— Select city —' },
    de: { title:'Händler werden', sub:'Erstelle dein Händler-Konto - die Registrierung ist kostenlos. Dein Shop geht nach einer kurzen Prüfung durch unser Team live.',
      sec_company:'Firmendaten', sec_account:'Zugangsdaten',
      company:'Firmenname', contact:'Ansprechpartner', email:'E-Mail', phone:'Telefon',
      country:'Land', city:'Stadt', city_other:'Andere Stadt…', other_ph:'Stadt eingeben',
      vat:'Umsatzsteuer-ID', vat_opt:'(optional)', pass:'Passwort', pass2:'Passwort bestätigen',
      plan_t:'Abo auswählen', plan_hint:'Deine Auswahl wird gespeichert - die Abrechnung wird später aktiviert.',
      basic_d:'Für den Start: Produkte einstellen & verkaufen', pro_d:'Mehr Sichtbarkeit & Funktionen',
      agb_title:'Händler-AGB', agb_read:'Händler-AGB lesen', agb_accept:'Ich akzeptiere die Händler-AGB',
      back:'Zurück zur Registrierung', submit:'Händler-Konto erstellen',
      fill:'Bitte alle Pflichtfelder ausfüllen', mismatch:'Passwörter stimmen nicht überein', terms_req:'Bitte akzeptiere die Händler-AGB',
      email_exists:'Diese E-Mail ist bereits registriert', pass_short:'Passwort ist zu kurz',
      ok_t:'Willkommen bei AFRICARPARTS!', ok_d:'Dein Händler-Konto wurde erstellt. Unser Team prüft deinen Shop und schaltet ihn in Kürze frei. Du kannst jetzt schon deine Auszahlung einrichten oder ins Dashboard gehen.',
      payout_btn:'Auszahlung einrichten', dash_btn:'Zum Dashboard',
      have:'Schon ein Konto?', login:'Anmelden', pickC:'— Land wählen —', pickCity:'— Stadt wählen —' },
    fr: { title:'Devenir vendeur', sub:'Créez votre compte vendeur - l\'inscription est gratuite. Votre boutique sera activée après une brève vérification par notre équipe.',
      sec_company:'Informations sur l\'entreprise', sec_account:'Identifiants',
      company:'Nom de l\'entreprise', contact:'Personne de contact', email:'E-mail', phone:'Téléphone',
      country:'Pays', city:'Ville', city_other:'Autre ville…', other_ph:'Saisissez votre ville',
      vat:'Numéro de TVA', vat_opt:'(facultatif)', pass:'Mot de passe', pass2:'Confirmer le mot de passe',
      plan_t:'Choisir un forfait', plan_hint:'Votre choix est enregistré - la facturation sera activée plus tard.',
      basic_d:'Pour commencer : publier et vendre des pièces', pro_d:'Plus de visibilité et de fonctions',
      agb_title:'CGV vendeurs', agb_read:'Lire les CGV vendeurs', agb_accept:'J\'accepte les CGV vendeurs',
      back:'Retour à l\'inscription', submit:'Créer le compte vendeur',
      fill:'Veuillez remplir tous les champs obligatoires', mismatch:'Les mots de passe ne correspondent pas', terms_req:'Veuillez accepter les CGV vendeurs',
      email_exists:'Cet e-mail est déjà enregistré', pass_short:'Mot de passe trop court',
      ok_t:'Bienvenue chez AFRICARPARTS !', ok_d:'Votre compte vendeur a été créé. Notre équipe vérifiera et activera votre boutique sous peu. Vous pouvez déjà configurer vos versements ou accéder à votre tableau de bord.',
      payout_btn:'Configurer les versements', dash_btn:'Tableau de bord',
      have:'Déjà un compte ?', login:'Se connecter', pickC:'— Choisir le pays —', pickCity:'— Choisir la ville —' },
    pt: { title:'Tornar-se vendedor', sub:'Crie a sua conta de vendedor - o registo é gratuito. A sua loja fica ativa após uma breve verificação pela nossa equipa.',
      sec_company:'Dados da empresa', sec_account:'Dados de acesso',
      company:'Nome da empresa', contact:'Pessoa de contacto', email:'E-mail', phone:'Telefone',
      country:'País', city:'Cidade', city_other:'Outra cidade…', other_ph:'Digite a sua cidade',
      vat:'Número de IVA', vat_opt:'(opcional)', pass:'Palavra-passe', pass2:'Confirmar palavra-passe',
      plan_t:'Escolher plano', plan_hint:'A sua escolha é guardada - a faturação será ativada mais tarde.',
      basic_d:'Para começar: publicar e vender peças', pro_d:'Mais visibilidade e funções',
      agb_title:'Termos para vendedores', agb_read:'Ler os termos para vendedores', agb_accept:'Aceito os termos para vendedores',
      back:'Voltar ao registo', submit:'Criar conta de vendedor',
      fill:'Preencha todos os campos obrigatórios', mismatch:'As palavras-passe não coincidem', terms_req:'Aceite os termos para vendedores',
      email_exists:'Este e-mail já está registado', pass_short:'Palavra-passe demasiado curta',
      ok_t:'Bem-vindo à AFRICARPARTS!', ok_d:'A sua conta de vendedor foi criada. A nossa equipa vai verificar e ativar a sua loja em breve. Pode já configurar os seus pagamentos ou ir para o painel.',
      payout_btn:'Configurar pagamentos', dash_btn:'Ir para o painel',
      have:'Já tem conta?', login:'Entrar', pickC:'— Selecionar país —', pickCity:'— Selecionar cidade —' },
    es: { title:'Convertirse en vendedor', sub:'Crea tu cuenta de vendedor - el registro es gratuito. Tu tienda se activará tras una breve revisión de nuestro equipo.',
      sec_company:'Datos de la empresa', sec_account:'Datos de acceso',
      company:'Nombre de la empresa', contact:'Persona de contacto', email:'Correo electrónico', phone:'Teléfono',
      country:'País', city:'Ciudad', city_other:'Otra ciudad…', other_ph:'Escribe tu ciudad',
      vat:'NIF-IVA', vat_opt:'(opcional)', pass:'Contraseña', pass2:'Confirmar contraseña',
      plan_t:'Elegir plan', plan_hint:'Tu elección se guarda - la facturación se activará más adelante.',
      basic_d:'Para empezar: publicar y vender piezas', pro_d:'Más visibilidad y funciones',
      agb_title:'Condiciones para vendedores', agb_read:'Leer condiciones para vendedores', agb_accept:'Acepto las condiciones para vendedores',
      back:'Volver al registro', submit:'Crear cuenta de vendedor',
      fill:'Rellena todos los campos obligatorios', mismatch:'Las contraseñas no coinciden', terms_req:'Acepta las condiciones para vendedores',
      email_exists:'Este correo ya está registrado', pass_short:'Contraseña demasiado corta',
      ok_t:'¡Bienvenido a AFRICARPARTS!', ok_d:'Tu cuenta de vendedor ha sido creada. Nuestro equipo revisará y activará tu tienda en breve. Ya puedes configurar tus pagos o ir a tu panel.',
      payout_btn:'Configurar pagos', dash_btn:'Ir al panel',
      have:'¿Ya tienes cuenta?', login:'Iniciar sesión', pickC:'— Seleccionar país —', pickCity:'— Seleccionar ciudad —' },
    ar: { title:'كن بائعًا', sub:'أنشئ حساب البائع الخاص بك - التسجيل مجاني. سيتم تفعيل متجرك بعد مراجعة سريعة من فريقنا.',
      sec_company:'بيانات الشركة', sec_account:'بيانات الدخول',
      company:'اسم الشركة', contact:'الشخص المسؤول', email:'البريد الإلكتروني', phone:'الهاتف',
      country:'الدولة', city:'المدينة', city_other:'مدينة أخرى…', other_ph:'أدخل مدينتك',
      vat:'الرقم الضريبي', vat_opt:'(اختياري)', pass:'كلمة المرور', pass2:'تأكيد كلمة المرور',
      plan_t:'اختر خطة', plan_hint:'يتم حفظ اختيارك - سيتم تفعيل الفوترة لاحقًا.',
      basic_d:'للبداية: أضف قطعك وابدأ البيع', pro_d:'مزيد من الظهور والمزايا',
      agb_title:'شروط البائعين', agb_read:'قراءة شروط البائعين', agb_accept:'أوافق على شروط البائعين',
      back:'العودة إلى التسجيل', submit:'إنشاء حساب البائع',
      fill:'يرجى ملء جميع الحقول المطلوبة', mismatch:'كلمتا المرور غير متطابقتين', terms_req:'يرجى الموافقة على شروط البائعين',
      email_exists:'هذا البريد مسجل بالفعل', pass_short:'كلمة المرور قصيرة جدًا',
      ok_t:'مرحبًا بك في AFRICARPARTS!', ok_d:'تم إنشاء حساب البائع الخاص بك. سيقوم فريقنا بمراجعة متجرك وتفعيله قريبًا. يمكنك الآن إعداد المدفوعات أو الانتقال إلى لوحة التحكم.',
      payout_btn:'إعداد المدفوعات', dash_btn:'إلى لوحة التحكم',
      have:'لديك حساب بالفعل؟', login:'تسجيل الدخول', pickC:'— اختر الدولة —', pickCity:'— اختر المدينة —' },
    tr: { title:'Satıcı olun', sub:'Satıcı hesabınızı oluşturun - kayıt ücretsizdir. Mağazanız ekibimizin kısa incelemesinden sonra yayına alınır.',
      sec_company:'Şirket bilgileri', sec_account:'Hesap bilgileri',
      company:'Şirket adı', contact:'İlgili kişi', email:'E-posta', phone:'Telefon',
      country:'Ülke', city:'Şehir', city_other:'Diğer şehir…', other_ph:'Şehrinizi yazın',
      vat:'KDV numarası', vat_opt:'(isteğe bağlı)', pass:'Şifre', pass2:'Şifreyi onayla',
      plan_t:'Plan seçin', plan_hint:'Seçiminiz kaydedilir - faturalandırma daha sonra etkinleştirilir.',
      basic_d:'Başlangıç için: parça ekleyin ve satın', pro_d:'Daha fazla görünürlük ve özellik',
      agb_title:'Satıcı şartları', agb_read:'Satıcı şartlarını oku', agb_accept:'Satıcı şartlarını kabul ediyorum',
      back:'Kayda geri dön', submit:'Satıcı hesabı oluştur',
      fill:'Lütfen tüm zorunlu alanları doldurun', mismatch:'Şifreler eşleşmiyor', terms_req:'Lütfen satıcı şartlarını kabul edin',
      email_exists:'Bu e-posta zaten kayıtlı', pass_short:'Şifre çok kısa',
      ok_t:'AFRICARPARTS\'a hoş geldiniz!', ok_d:'Satıcı hesabınız oluşturuldu. Ekibimiz mağazanızı inceleyip kısa süre içinde etkinleştirecek. Şimdiden ödemelerinizi ayarlayabilir veya panele gidebilirsiniz.',
      payout_btn:'Ödemeleri ayarla', dash_btn:'Panele git',
      have:'Zaten hesabınız var mı?', login:'Giriş yap', pickC:'— Ülke seçin —', pickCity:'— Şehir seçin —' },
    sw: { title:'Kuwa muuzaji', sub:'Fungua akaunti yako ya muuzaji - usajili ni bure. Duka lako litaanzishwa baada ya ukaguzi mfupi wa timu yetu.',
      sec_company:'Taarifa za kampuni', sec_account:'Taarifa za akaunti',
      company:'Jina la kampuni', contact:'Mtu wa mawasiliano', email:'Barua pepe', phone:'Simu',
      country:'Nchi', city:'Jiji', city_other:'Jiji lingine…', other_ph:'Andika jiji lako',
      vat:'Namba ya VAT', vat_opt:'(hiari)', pass:'Nenosiri', pass2:'Thibitisha nenosiri',
      plan_t:'Chagua mpango', plan_hint:'Chaguo lako linahifadhiwa - malipo yataanzishwa baadaye.',
      basic_d:'Kwa kuanzia: weka na uze vipuri', pro_d:'Mwonekano zaidi na vipengele zaidi',
      agb_title:'Masharti ya wauzaji', agb_read:'Soma masharti ya wauzaji', agb_accept:'Ninakubali masharti ya wauzaji',
      back:'Rudi kwenye usajili', submit:'Fungua akaunti ya muuzaji',
      fill:'Tafadhali jaza sehemu zote za lazima', mismatch:'Manenosiri hayalingani', terms_req:'Tafadhali kubali masharti ya wauzaji',
      email_exists:'Barua pepe hii tayari imesajiliwa', pass_short:'Nenosiri ni fupi mno',
      ok_t:'Karibu AFRICARPARTS!', ok_d:'Akaunti yako ya muuzaji imefunguliwa. Timu yetu itakagua na kuanzisha duka lako hivi karibuni. Unaweza sasa kuweka malipo yako au kwenda kwenye dashibodi.',
      payout_btn:'Sanidi malipo', dash_btn:'Nenda dashibodi',
      have:'Una akaunti tayari?', login:'Ingia', pickC:'— Chagua nchi —', pickCity:'— Chagua jiji —' },
    ln: { title:'Kóma motéki', sub:'Fungola compte na yo ya motéki - kokomisa nkombo ezali ofele. Magazini na yo ekofungwama sima ya botali ya libota na biso.',
      sec_company:'Basango ya kompanyi', sec_account:'Basango ya compte',
      company:'Nkombo ya kompanyi', contact:'Moto ya kokutana', email:'Email', phone:'Telefone',
      country:'Ekólo', city:'Engumba', city_other:'Engumba mosusu…', other_ph:'Koma engumba na yo',
      vat:'Nimero ya mpako (VAT)', vat_opt:'(soki olingi)', pass:'Mot de passe', pass2:'Ndimisa mot de passe',
      plan_t:'Pona plan', plan_hint:'Boponi na yo ebombami - bofuti ekofungwama sima.',
      basic_d:'Mpo na kobanda: tia mpe teka biloko', pro_d:'Komonana mingi mpe makoki mosusu',
      agb_title:'Mibeko ya bateki', agb_read:'Tanga mibeko ya bateki', agb_accept:'Nandimi mibeko ya bateki',
      back:'Zonga na bokomisi nkombo', submit:'Fungola compte ya motéki',
      fill:'Tondisa bisika nyonso ya motuya', mismatch:'Ba mots de passe ekokani te', terms_req:'Ndima mibeko ya bateki',
      email_exists:'Email oyo esi ekomisami', pass_short:'Mot de passe ezali mokuse mingi',
      ok_t:'Boyei malamu na AFRICARPARTS!', ok_d:'Compte na yo ya motéki esalemi. Libota na biso ekotala mpe ekofungola magazini na yo kala mingi te. Okoki sikoyo kobongisa bofuti to kokende na dashboard.',
      payout_btn:'Bongisa bofuti', dash_btn:'Kende na dashboard',
      have:'Ozali na compte?', login:'Kota', pickC:'— Pona ekólo —', pickCity:'— Pona engumba —' }
  };
  var L = SRL[S.lang] || SRL.en;
  var A = authTxt();
  // Bereits Haendler -> Dashboard. Eingeloggter Kunde -> Upgrade statt Neuregistrierung.
  if (S.user && (S.user.role === 'dealer' || S.user.role === 'seller')) { render('seller-dashboard'); return; }
  var srUpgrade = !!(S.user && S.user.role !== 'admin');

  var srPlanSel = 'basic';

  function fld(label, inner, opt) {
    return '<div class="fg"><label>' + label + (opt ? ' <span class="opt">' + opt + '</span>' : '') + '</label>' + inner + '</div>';
  }

  var h = '<div class="page-wrap"><section class="section sr-wrap sr-form">';
  h += '<div class="sec-hd"><div class="sec-title">🏪 ' + esc(srUpgrade ? A.up_t : L.title) + '</div></div>';
  h += '<p class="sr-sub">' + esc(srUpgrade ? A.up_sub.replace('{email}', S.user.email || '') : L.sub) + '</p>';
  if (!srUpgrade) h += authSwitchHint('buy');

  h += '<div class="sr-card">';

  // --- Firmendaten ---
  h += '<div class="sr-sec-title">' + esc(L.sec_company) + '</div>';
  h += '<div class="sr-grid">';
  h += fld(esc(L.company), '<input id="srCompany"/>');
  h += fld(esc(L.contact), '<input id="srName" value="' + esc(srUpgrade ? (S.user.name || '') : '') + '"/>');
  h += fld(esc(L.email), srUpgrade
    ? '<input id="srEmail" type="email" value="' + esc(S.user.email || '') + '" readonly style="opacity:.7"/>'
    : '<input id="srEmail" type="email"/>');
  h += fld(esc(L.phone), '<input id="srPhone"/>');
  // Land: Dropdown (ISO-2), sortiert nach lokalisiertem Namen
  var cSel = '<select id="srCountry" onchange="srCountryChange()"><option value="">' + esc(L.pickC) + '</option>';
  SR_COUNTRIES.map(function (c) { return { iso: c.iso, label: srCName(c.iso) }; })
    .sort(function (a, b) { return a.label.localeCompare(b.label); })
    .forEach(function (o) { cSel += '<option value="' + o.iso + '">' + esc(o.label) + '</option>'; });
  cSel += '</select>';
  h += fld(esc(L.country), cSel);
  // Stadt: Dropdown je Land + Freitext-Fallback
  h += fld(esc(L.city),
    '<select id="srCity" onchange="srCityChange()"><option value="">' + esc(L.pickCity) + '</option></select>' +
    '<input id="srCityOther" placeholder="' + esc(L.other_ph) + '" style="display:none;margin-top:.4rem"/>');
  h += fld(esc(L.vat), '<input id="srVat"/>', esc(L.vat_opt));
  h += '</div>';

  // --- Zugangsdaten (entfaellt beim Upgrade - das Konto existiert schon) ---
  if (!srUpgrade) {
    h += '<div class="sr-sec-title">' + esc(L.sec_account) + '</div>';
    h += '<div class="sr-grid">';
    h += fld(esc(L.pass), '<input id="srPass" type="password"/>');
    h += fld(esc(L.pass2), '<input id="srPass2" type="password"/>');
    h += '</div>';
  }

  // --- Abo-Auswahl (statisch, wird später aktiviert) ---
  h += '<div class="sr-sec-title">' + esc(L.plan_t) + '</div>';
  h += '<p class="sr-hint">' + esc(L.plan_hint) + '</p>';
  h += '<div class="sr-plan-grid">';
  [{ id:'basic', name:'Basic', d:L.basic_d }, { id:'pro', name:'Pro', d:L.pro_d }].forEach(function (pl) {
    h += '<div id="sr-plan-' + pl.id + '" class="sr-plan" onclick="srPlan(\'' + pl.id + '\')">';
    h += '<span class="sr-plan-check">✓</span>';
    h += '<div class="sr-plan-name">' + pl.name + '</div>';
    h += '<div class="sr-plan-desc">' + esc(pl.d) + '</div>';
    h += '</div>';
  });
  h += '</div>';

  // --- Händler-AGB ---
  h += '<label class="sr-terms">';
  h += '<input id="srTerms" type="checkbox"/>';
  h += '<span>' + esc(L.agb_accept) + ' · <a href="javascript:void(0)" onclick="event.preventDefault();srShowTerms()">' + esc(L.agb_read) + '</a></span>';
  h += '</label>';

  h += '<button class="btn btn-primary sr-submit" onclick="srSubmit(this)">' + esc(srUpgrade ? A.up_btn : L.submit) + '</button>';
  if (!srUpgrade) h += '<p class="sr-login-hint">' + esc(L.have) + ' <a href="javascript:void(0)" onclick="render(\'login\')">' + esc(L.login) + '</a></p>';
  h += '</div>';

  h += '</section></div>';
  $('content').innerHTML = h;
  srPlanPaint();

  function srPlanPaint() {
    ['basic', 'pro'].forEach(function (id) {
      var box = $('sr-plan-' + id);
      if (!box) return;
      if (srPlanSel === id) box.classList.add('sel'); else box.classList.remove('sel');
    });
  }
  window.srPlan = function (id) { srPlanSel = id; srPlanPaint(); };

  window.srCountryChange = function () {
    var iso = $('srCountry').value;
    var entry = SR_COUNTRIES.filter(function (c) { return c.iso === iso; })[0];
    var sel = $('srCity'), other = $('srCityOther');
    var cities = (entry && entry.cities) || [];
    if (cities.length) {
      var o = '<option value="">' + esc(L.pickCity) + '</option>';
      cities.forEach(function (c) { o += '<option value="' + esc(c) + '">' + esc(c) + '</option>'; });
      o += '<option value="__other__">' + esc(L.city_other) + '</option>';
      sel.innerHTML = o;
      sel.style.display = '';
      other.style.display = 'none';
      other.value = '';
    } else {
      sel.style.display = 'none';
      other.style.display = '';
    }
  };
  window.srCityChange = function () {
    var other = $('srCityOther');
    other.style.display = ($('srCity').value === '__other__') ? '' : 'none';
  };

  // Händler-AGB als Overlay lesen – Formular bleibt erhalten,
  // "Zurück zur Registrierung" schließt nur das Overlay (mobile.de-Style)
  window.srShowTerms = async function () {
    if ($('sr-terms-ov')) return;
    var ov = document.createElement('div');
    ov.id = 'sr-terms-ov';
    ov.style.cssText = 'position:fixed;inset:0;z-index:10000;background:rgba(10,16,28,.55);display:flex;align-items:center;justify-content:center;padding:16px';
    ov.innerHTML =
      '<div style="background:var(--surface,#fff);color:var(--text,#1a202c);max-width:720px;width:100%;max-height:85vh;border-radius:14px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 18px 60px rgba(0,0,0,.35)">' +
      '<div style="padding:.95rem 1.25rem;border-bottom:1px solid rgba(128,128,128,.2);display:flex;justify-content:space-between;align-items:center">' +
      '<strong>' + esc(L.agb_title) + '</strong>' +
      '<button onclick="srCloseTerms()" aria-label="close" style="background:none;border:none;font-size:1.4rem;cursor:pointer;line-height:1;color:inherit">×</button></div>' +
      '<div id="sr-terms-body" style="padding:1.25rem;overflow-y:auto;flex:1">…</div>' +
      '<div style="padding:.85rem 1.25rem;border-top:1px solid rgba(128,128,128,.2);text-align:right">' +
      '<button class="btn btn-primary" onclick="srCloseTerms()">' + esc(L.back) + '</button></div></div>';
    document.body.appendChild(ov);
    try {
      var d = await apiReq('/pages/dealer-terms?lang=' + encodeURIComponent(S.lang));
      var body = $('sr-terms-body');
      if (body) body.innerHTML = '<h2 style="margin-top:0">' + esc(d.title) + '</h2>' + _pageBodyHtml(d.body);
    } catch (e) {
      var b = $('sr-terms-body');
      if (b) b.innerHTML = '<p>' + esc(e.message || 'Error') + '</p>';
    }
  };
  window.srCloseTerms = function () { var ov = $('sr-terms-ov'); if (ov) ov.remove(); };

  window.srSubmit = async function (btn) {
    var company = ($('srCompany') && $('srCompany').value || '').trim();
    var name = ($('srName') && $('srName').value || '').trim();
    var email = ($('srEmail') && $('srEmail').value || '').trim();
    var phone = ($('srPhone') && $('srPhone').value || '').trim();
    var country = ($('srCountry') && $('srCountry').value || '').trim();
    var citySel = ($('srCity') && $('srCity').style.display !== 'none') ? $('srCity').value : '__other__';
    var city = (citySel && citySel !== '__other__') ? citySel : (($('srCityOther') && $('srCityOther').value) || '').trim();
    var vat = ($('srVat') && $('srVat').value || '').trim();
    var pass = ($('srPass') && $('srPass').value || '').trim();
    var pass2 = ($('srPass2') && $('srPass2').value || '').trim();
    var terms = $('srTerms') && $('srTerms').checked;

    if (!company || !name || !phone || !country || !city || (!srUpgrade && (!email || !pass || !pass2))) { toast(L.fill, 't-error'); return; }
    if (!srUpgrade && pass !== pass2) { toast(L.mismatch, 't-error'); return; }
    if (!terms) { toast(L.terms_req, 't-error'); return; }

    if (btn) btn.disabled = true;
    try {
      var res = srUpgrade
        ? await apiReq('/auth/upgrade-to-seller', 'POST', {
            company: company, name: name, phone: phone,
            country: country, city: city, tax_number: vat || null,
            plan_choice: srPlanSel, terms_accepted: true
          }, true)
        : await apiReq('/auth/register-seller', 'POST', {
            company: company, name: name, email: email, phone: phone,
            country: country, city: city, tax_number: vat || null,
            password: pass, plan_choice: srPlanSel, terms_accepted: true
          }, false);
      if (srUpgrade) toast(A.up_ok);
      S.user = res.user;
      S.token = res.token;
      localStorage.setItem('apa_user', JSON.stringify(S.user));
      localStorage.setItem('apa_token', S.token);
      buildNav();

      // Erfolg: direkt weiter zu "Auszahlung einrichten" oder ins Dashboard
      var sh = '<div class="page-wrap"><section class="section" style="max-width:620px;margin:0 auto;text-align:center">';
      sh += '<div style="font-size:3rem;line-height:1">🎉</div>';
      sh += '<h2 style="margin:.75rem 0 .5rem">' + esc(L.ok_t) + '</h2>';
      sh += '<p style="opacity:.8;font-size:.92rem">' + esc(L.ok_d) + '</p>';
      sh += '<div style="display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;margin-top:1.25rem">';
      sh += '<button class="btn btn-primary" onclick="render(\'seller-payout-setup\')">🏦 ' + esc(L.payout_btn) + '</button>';
      sh += '<button class="btn btn-ghost" onclick="render(\'seller-dashboard\')">' + esc(L.dash_btn) + '</button>';
      sh += '</div></section></div>';
      $('content').innerHTML = sh;
      window.scrollTo(0, 0);
    } catch (e) {
      var msg = e.message || 'Error';
      if (msg === 'email_already_exists') msg = L.email_exists;
      else if (msg === 'password_too_short') msg = L.pass_short;
      else if (msg === 'terms_required') msg = L.terms_req;
      else if (/_required$/.test(msg)) msg = L.fill;
      toast(msg, 't-error');
      if (btn) btn.disabled = false;
    }
  };
});

/* ---------- ROUTE: MY ORDERS ---------- */
route('my-orders', async function () {
  if (!S.user) { render('login'); return; }
  let orders = [], shipments = [];
  try {
    const res = await apiReq('/orders', 'GET', null, true);
    orders = res.data || [];
  } catch (e) {}
  try {
    const rs = await apiReq('/my/shipments', 'GET', null, true);
    shipments = rs.shipments || [];
  } catch (e) {}

  // Sendungen nach Bestellung gruppieren
  var byOrder = {};
  shipments.forEach(function (s) { (byOrder[s.order_id] = byOrder[s.order_id] || []).push(s); });

  var SL = ({
    en: { station: 'Pickup station', tracking: 'Tracking', shipment: 'Shipment', noinfo: 'No shipping info yet' },
    de: { station: 'Abholstation', tracking: 'Tracking', shipment: 'Sendung', noinfo: 'Noch keine Versandinfo' },
    fr: { station: 'Point de retrait', tracking: 'Suivi', shipment: 'Envoi', noinfo: 'Pas encore d’info d’expédition' },
    pt: { station: 'Estação', tracking: 'Rastreio', shipment: 'Envio', noinfo: 'Ainda sem info de envio' },
    es: { station: 'Punto de recogida', tracking: 'Seguimiento', shipment: 'Envío', noinfo: 'Aún sin info de envío' },
    ar: { station: 'محطة الاستلام', tracking: 'التتبع', shipment: 'الشحنة', noinfo: 'لا توجد معلومات شحن بعد' },
    tr: { station: 'Teslim noktası', tracking: 'Takip', shipment: 'Gönderi', noinfo: 'Henüz kargo bilgisi yok' },
    sw: { station: 'Kituo cha kuchukua', tracking: 'Ufuatiliaji', shipment: 'Usafirishaji', noinfo: 'Bado hakuna taarifa ya usafirishaji' },
    ln: { station: 'Esika ya kozwa', tracking: 'Suivi', shipment: 'Envoi', noinfo: 'Sango ya kotinda ezali naino te' }
  })[S.lang] || { station: 'Pickup station', tracking: 'Tracking', shipment: 'Shipment', noinfo: 'No shipping info yet' };

  Object.assign(SL, ({
    en: { confirm:'I received this', confirmQ:'Confirm that you received this shipment? The seller gets paid afterwards.', thanks:'Thank you \u2013 receipt confirmed', got:'\u2713 Receipt confirmed' },
    de: { confirm:'Erhalten best\u00e4tigen', confirmQ:'Best\u00e4tigen, dass du diese Sendung erhalten hast? Der H\u00e4ndler wird danach bezahlt.', thanks:'Danke \u2013 Empfang best\u00e4tigt', got:'\u2713 Empfang best\u00e4tigt' },
    fr: { confirm:'J\u2019ai re\u00e7u', confirmQ:'Confirmer la r\u00e9ception de cet envoi ? Le vendeur sera pay\u00e9 ensuite.', thanks:'Merci \u2013 r\u00e9ception confirm\u00e9e', got:'\u2713 R\u00e9ception confirm\u00e9e' },
    pt: { confirm:'Recebi', confirmQ:'Confirmar que recebeu este envio? O vendedor ser\u00e1 pago em seguida.', thanks:'Obrigado \u2013 rece\u00e7\u00e3o confirmada', got:'\u2713 Rece\u00e7\u00e3o confirmada' },
    es: { confirm:'Lo he recibido', confirmQ:'\u00bfConfirmas que has recibido este env\u00edo? El vendedor cobrar\u00e1 despu\u00e9s.', thanks:'Gracias \u2013 recepci\u00f3n confirmada', got:'\u2713 Recepci\u00f3n confirmada' },
    ar: { confirm:'\u0644\u0642\u062f \u0627\u0633\u062a\u0644\u0645\u062a', confirmQ:'\u062a\u0623\u0643\u064a\u062f \u0627\u0633\u062a\u0644\u0627\u0645 \u0627\u0644\u0634\u062d\u0646\u0629\u061f', thanks:'\u0634\u0643\u0631\u0627\u064b', got:'\u2713 \u062a\u0645 \u0627\u0644\u062a\u0623\u0643\u064a\u062f' },
    tr: { confirm:'Teslim ald\u0131m', confirmQ:'Bu g\u00f6nderiyi ald\u0131\u011f\u0131n\u0131z\u0131 onayl\u0131yor musunuz? Sat\u0131c\u0131ya \u00f6deme sonras\u0131nda yap\u0131l\u0131r.', thanks:'Te\u015fekk\u00fcrler', got:'\u2713 Teslim onayland\u0131' },
    sw: { confirm:'Nimepokea', confirmQ:'Thibitisha kuwa umepokea kifurushi hiki? Muuzaji atalipwa baadaye.', thanks:'Asante \u2013 imethibitishwa', got:'\u2713 Imethibitishwa' },
    ln: { confirm:'Nazwi yango', confirmQ:'Kondima ete ozwi envoi oyo?', thanks:'Matondi', got:'\u2713 Endimami' }
  })[S.lang] || { confirm:'I received this', confirmQ:'Confirm that you received this shipment?', thanks:'Thank you', got:'\u2713 Receipt confirmed' });

  function stLabel(st) {
    var m = ({
      en: { pending: 'Pending', label_created: 'Label created', shipped: 'Shipped', delivered: 'Delivered', cancelled: 'Cancelled' },
      de: { pending: 'Offen', label_created: 'Label erstellt', shipped: 'Versendet', delivered: 'Zugestellt', cancelled: 'Storniert' },
      fr: { pending: 'En attente', label_created: 'Étiquette créée', shipped: 'Expédié', delivered: 'Livré', cancelled: 'Annulé' },
      pt: { pending: 'Pendente', label_created: 'Etiqueta criada', shipped: 'Enviado', delivered: 'Entregue', cancelled: 'Cancelado' },
      es: { pending: 'Pendiente', label_created: 'Etiqueta creada', shipped: 'Enviado', delivered: 'Entregado', cancelled: 'Cancelado' },
      ar: { pending: 'قيد الانتظار', label_created: 'تم إنشاء الملصق', shipped: 'تم الشحن', delivered: 'تم التسليم', cancelled: 'ملغى' },
      tr: { pending: 'Beklemede', label_created: 'Etiket oluşturuldu', shipped: 'Gönderildi', delivered: 'Teslim edildi', cancelled: 'İptal' },
      sw: { pending: 'Inasubiri', label_created: 'Lebo imeundwa', shipped: 'Imetumwa', delivered: 'Imefika', cancelled: 'Imeghairiwa' },
      ln: { pending: 'Ezali kozela', label_created: 'Label esalemi', shipped: 'Etindami', delivered: 'Ekomi', cancelled: 'Elongwami' }
    })[S.lang] || {};
    return m[st] || st;
  }

  let h = '<div class="page-wrap"><section class="section">';
  h += '<div class="sec-hd"><div class="sec-title">' + t('orders.title') + '</div></div>';

  if (!orders.length) {
    h += '<div class="empty-state"><div class="empty-icon">[~]</div><h3>' + t('orders.no_orders') + '</h3></div>';
  } else {
    h += '<div style="display:flex;flex-direction:column;gap:1rem">';
    orders.forEach(function (o) {
      var total = parseFloat(o.total || 0);
      var oShips = byOrder[o.id] || [];
      h += '<div style="padding:1rem 1.15rem;background:var(--surface2);border-radius:10px">';
      h += '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem">';
      h += '<div style="font-weight:700">#' + esc(o.id) + ' · ' + (o.created_at ? new Date(o.created_at).toLocaleDateString() : '') + '</div>';
      h += '<div style="display:flex;gap:.7rem;align-items:center"><span style="opacity:.7;font-size:.85rem">' + esc(o.status || '') + '</span><span style="font-weight:700">' + fmt(total) + '</span></div>';
      h += '</div>';
      if (oShips.length) {
        oShips.forEach(function (s) {
          var done = (s.status === 'shipped' || s.status === 'delivered');
          var badgeBg = done ? '#16a34a' : (s.status === 'label_created' ? '#2563eb' : '#6b7280');
          h += '<div style="border-top:1px solid rgba(128,128,128,.15);padding-top:.55rem;margin-top:.45rem;font-size:.85rem">';
          h += '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.4rem">';
          h += '<span>' + esc(SL.shipment) + ' #' + s.id + '</span>';
          h += '<span style="padding:.1rem .5rem;background:' + badgeBg + ';color:#fff;font-size:.7rem;border-radius:4px;font-weight:700">' + esc(stLabel(s.status)) + '</span>';
          h += '</div>';
          if (s.pickup_station_name) h += '<div style="opacity:.8;margin-top:.25rem">' + esc(SL.station) + ': ' + esc(s.pickup_station_name) + (s.pickup_station_city ? ' (' + esc(s.pickup_station_city) + ')' : '') + '</div>';
          if (s.tracking_number) h += '<div style="opacity:.8;margin-top:.15rem">' + esc(SL.tracking) + ': ' + esc((s.carrier ? s.carrier + ' · ' : '') + s.tracking_number) + '</div>';
          if (s.buyer_confirmed_at) {
            h += '<div style="margin-top:.4rem;font-size:.78rem;color:#16a34a;font-weight:600">' + esc(SL.got) + '</div>';
          } else if (s.status === 'shipped' || s.status === 'in_transit' || s.status === 'delivered') {
            h += '<button class="btn btn-primary btn-sm" style="margin-top:.5rem" onclick="confirmReceipt(' + s.id + ', this)">\u2713 ' + esc(SL.confirm) + '</button>';
          }
          h += '</div>';
        });
      } else {
        h += '<div style="border-top:1px solid rgba(128,128,128,.15);padding-top:.5rem;margin-top:.45rem;font-size:.8rem;opacity:.6">' + esc(SL.noinfo) + '</div>';
      }
      h += '</div>';
    });
    h += '</div>';
  }
  h += '</section></div>';
  $('content').innerHTML = h;

  window.confirmReceipt = async function (id, btn) {
    if (!confirm(SL.confirmQ)) return;
    if (btn) btn.disabled = true;
    try {
      await apiReq('/my/shipments/' + id + '/confirm', 'POST', {}, true);
      toast(SL.thanks);
      render('my-orders');
    } catch (e) {
      toast(e.message, 't-error');
      if (btn) btn.disabled = false;
    }
  };
});

/* ---------- ROUTE: SELLER DASHBOARD ---------- */
/* ---------- ROUTE: SELLER DASHBOARD (Hub) ---------- */
route('seller-dashboard', async function (params) {
  if (!S.user || (S.user.role !== 'seller' && S.user.role !== 'dealer' && S.user.role !== 'admin')) { render('login'); return; }

  // Rueckkehr von Stripe (Abo-Checkout oder Kundenportal)
  if (params && params.abo) {
    if (params.abo === 'success') { toast(t('checkout.success') || 'Abo aktiviert', 't-success'); }
    else if (params.abo === 'cancel') { toast('Vorgang abgebrochen', 't-error'); }
    history.replaceState({}, '', window.location.pathname + '#seller-dashboard');
  }

  // KPI-Quick-Stats: Anzahl Produkte (mehr KPIs kommen mit Performance-Modul)
  // Eigene Produkte ueber den Seller-Endpoint zaehlen (auth, respektiert die
  // Admin-Support-Ansicht per X-View-Seller-Id). Der oeffentliche /products-
  // Endpoint liefert keine seller_id und zeigte deshalb immer 0.
  let productCount = 0;
  try {
    const res = await apiReq('/seller/products', 'GET', null, true);
    const list = res.data || res.products || (Array.isArray(res) ? res : []);
    productCount = list.length;
  } catch (e) {}

  // Module-Definitionen — neue Module hier auf active:true setzen,
  // sobald die zugehörige Route gebaut ist.
  const modules = [
     {
      icon: '\uD83D\uDCB3',
      title: ({ de: 'Abo & Mitgliedschaft', en: 'Subscription', fr: 'Abonnement', pt: 'Subscri\u00e7\u00e3o', sw: 'Usajili' }[S.lang] || 'Subscription'),
      desc: ({ de: 'Plan w\u00e4hlen, Status & Abo verwalten', en: 'Choose plan, manage status & subscription', fr: 'Choisir un forfait, g\u00e9rer l\u2019abonnement', pt: 'Escolher plano, gerir subscri\u00e7\u00e3o', sw: 'Chagua mpango, dhibiti usajili' }[S.lang] || 'Manage your subscription'),
      target: 'seller-billing',
      active: true,
      stat: null
    },
     {
      icon: '🏦',
      title: ({ de: 'Auszahlung einrichten', en: 'Set up payouts', fr: 'Configurer les versements', pt: 'Configurar pagamentos', sw: 'Sanidua malipo' }[S.lang] || 'Set up payouts'),
      desc: ({ de: 'Region wählen – passende Auszahlung (Bank/Mobile Money)', en: 'Choose your region – the right payout (bank/mobile money)', fr: 'Choisissez votre région – versement adapté', pt: 'Escolha a sua região – pagamento adequado', sw: 'Chagua eneo lako – malipo sahihi' }[S.lang] || 'Choose your region for payouts'),
      target: 'seller-payout-setup',
      active: true,
      stat: null
    },
    {
      icon: '📦',
      title: t('seller_hub.mod_products_t'),
      desc: t('seller_hub.mod_products_d'),
      target: 'seller-products',
      active: true,
      stat: productCount + ' ' + t('seller_hub.prod_count_word')
    },
    {
      icon: '📤',
      title: t('seller_hub.mod_csv_t'),
      desc: t('seller_hub.mod_csv_d'),
      target: 'csv-import',
      active: true,
      stat: null
    },
    {
      icon: '🛒',
      title: t('seller_hub.mod_orders_t'),
      desc: t('seller_hub.mod_orders_d'),
      target: null,
      active: false,
      stat: null
    },
    {
      icon: '💰',
      title: t('seller_hub.mod_finance_t'),
      desc: t('seller_hub.mod_finance_d'),
      target: null,
      active: false,
      stat: null
    },
    {
      icon: '⭐',
      title: t('seller_hub.mod_kpi_t'),
      desc: t('seller_hub.mod_kpi_d'),
      target: 'seller-kpi',
      active: true,
      stat: null
    },
    {
      icon: '💬',
      title: t('seller_hub.mod_comm_t'),
      desc: t('seller_hub.mod_comm_d'),
      target: null,
      active: false,
      stat: null
    },
    {
      icon: '💰',
      title: ({ de: 'Guthaben & Umsatz', en: 'Balance & revenue', fr: 'Solde & CA', pt: 'Saldo & faturamento', sw: 'Salio & mapato' }[S.lang] || 'Balance & revenue'),
      desc: ({ de: 'Offenes Guthaben, Umsatz nach Tag/Woche/Monat/Quartal/Jahr, CSV-Export',
               en: 'Available balance, revenue by day/week/month/quarter/year, CSV export',
               fr: 'Solde disponible, CA par jour/semaine/mois/trimestre/an, export CSV',
               pt: 'Saldo disponível, faturamento por dia/semana/mês/trimestre/ano, CSV',
               sw: 'Salio lililopo, mapato kwa siku/wiki/mwezi/robo/mwaka, CSV' }[S.lang] || 'Balance and revenue'),
      target: 'seller-earnings',
      active: true,
      stat: null
    },
    {
      icon: '🏬',
      title: ({ de: 'Mein Shop', en: 'My Shop', fr: 'Ma boutique', pt: 'A minha loja', sw: 'Duka langu' }[S.lang] || 'My Shop'),
      desc: ({ de: 'Shop anlegen/bearbeiten – Name, Land, Stadt, Kontakt', en: 'Create/edit your shop – name, country, city, contact', fr: 'Créer/modifier la boutique – nom, pays, ville, contact', pt: 'Criar/editar a loja – nome, país, cidade, contacto', sw: 'Tengeneza/hariri duka – jina, nchi, mji, mawasiliano' }[S.lang] || 'Create/edit your shop'),
      target: 'seller-shop',
      active: true,
      stat: null
    },
    {
      icon: '🚚',
      title: ({ de: 'Versand & Sendungen', en: 'Shipping & shipments', fr: 'Expédition & envois', pt: 'Envios', es: 'Envíos', sw: 'Usafirishaji' }[S.lang] || 'Shipping & shipments'),
      desc: ({ de: 'Eigene Sendungen sehen, Versanddienst & Tracking eintragen', en: 'View your shipments, add carrier & tracking', fr: 'Voir vos envois, saisir transporteur & suivi', pt: 'Ver envios, inserir transportadora & rastreio', es: 'Ver envíos, añadir transportista y seguimiento', sw: 'Ona usafirishaji, ongeza mtoa huduma na ufuatiliaji' }[S.lang] || 'View your shipments, add carrier & tracking'),
      target: 'seller-shipments',
      active: true,
      stat: null
    }
  ];

  let h = '<div class="page-wrap"><section class="section">';

  // Header
  h += '<div class="sec-hd" style="margin-bottom:1.25rem">';
  h += '<div class="sec-title">🏪 ' + t('nav.dashboard') + '</div>';
  h += '</div>';

  // Willkommens-Banner
  const who = esc(S.user.name || S.user.email || 'Seller');
  h += '<div style="margin-bottom:1.75rem;padding:1rem 1.25rem;background:var(--surface2);border-radius:8px;border-left:4px solid var(--a300)">';
  h += '<div style="font-weight:700;margin-bottom:.25rem">' + esc(t('seller_hub.welcome')) + who + ' 👋</div>';
  h += '<div style="opacity:.75;font-size:.9rem">' + esc(t('seller_hub.subtitle')) + '</div>';
  h += '</div>';

  // Modul-Grid
  h += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1rem">';
  modules.forEach(function (m) {
    const clickable = m.active && m.target;
    const cursor = clickable ? 'pointer' : 'default';
    const opacity = clickable ? '1' : '.55';
    const clickAttr = clickable
      ? ' onclick="render(\'' + m.target + '\')" onmouseover="this.style.transform=\'translateY(-2px)\';this.style.borderColor=\'var(--a300)\'" onmouseout="this.style.transform=\'\';this.style.borderColor=\'transparent\'"'
      : '';
    const badge = m.active
      ? '<span style="display:inline-block;padding:.15rem .5rem;background:#16a34a;color:#fff;font-size:.65rem;border-radius:4px;font-weight:700;letter-spacing:.5px">' + esc(t('seller_hub.active')) + '</span>'
      : '<span style="display:inline-block;padding:.15rem .5rem;background:var(--surface2);font-size:.65rem;border-radius:4px;font-weight:700;letter-spacing:.5px;opacity:.7">' + esc(t('seller_hub.soon')) + '</span>';

    h += '<div style="padding:1.25rem;background:var(--surface2);border:1px solid transparent;border-radius:10px;cursor:' + cursor + ';opacity:' + opacity + ';transition:transform .15s ease,border-color .15s ease"' + clickAttr + '>';
    h += '<div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:.6rem">';
    h += '<div style="font-size:2rem;line-height:1">' + m.icon + '</div>';
    h += badge;
    h += '</div>';
    h += '<div style="font-weight:700;font-size:1.02rem;margin-bottom:.35rem">' + esc(m.title) + '</div>';
    h += '<div style="font-size:.85rem;opacity:.75;line-height:1.4">' + esc(m.desc) + '</div>';
    if (m.stat) {
      h += '<div style="margin-top:.7rem;padding-top:.7rem;border-top:1px solid rgba(255,255,255,.08);font-size:.8rem;font-weight:600;opacity:.85">📊 ' + esc(m.stat) + '</div>';
    }
    h += '</div>';
  });
  h += '</div>';

  h += '</section></div>';
  $('content').innerHTML = h;
  renderReadinessBanner();
});

/* ═══════════════════════════════════════════════════════════════════
   ROUTE: SELLER-KPI  —  Performance & KPIs (Händler-Dashboard)
   Datenquelle: GET /api/seller/analytics?bucket=day|week|quarter
   Layout-Vorlage: KPI-Kacheln oben, Umsatz-Flächendiagramm + Ranking
   darunter — im hellen Autodoc-Stil der Seite.
   ═══════════════════════════════════════════════════════════════════ */
function kfmtMoney(v) { if (v === null || v === undefined) return '🔒'; return '$' + Number(v || 0).toLocaleString('en-US', { maximumFractionDigits: 0 }); }
function kfmtMoney2(v) { if (v === null || v === undefined) return '🔒'; return '$' + Number(v || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function kfmtInt(v) { return Number(v || 0).toLocaleString('en-US'); }
function kfmtShort(v) {
  v = Number(v || 0);
  if (v >= 1e6) return '$' + (v / 1e6).toFixed(1).replace('.0', '') + 'M';
  if (v >= 1e3) return '$' + (v / 1e3).toFixed(1).replace('.0', '') + 'k';
  return '$' + Math.round(v);
}
function kniceMax(v) {
  if (v <= 0) return 1;
  var p = Math.pow(10, Math.floor(Math.log10(v)));
  var f = v / p; var nf = f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10;
  return nf * p;
}
function kpiLabel(b, unit) {
  var d = new Date(b + 'T00:00:00Z');
  var dd = String(d.getUTCDate()).padStart(2, '0');
  var mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  var yy = String(d.getUTCFullYear()).slice(2);
  if (unit === 'day' || unit === 'week') return dd + '.' + mm;
  var q = Math.floor(d.getUTCMonth() / 3) + 1;
  return 'Q' + q + ' ' + yy;
}
// Lücken in der Zeitreihe mit 0 auffüllen (für eine durchgehende Fläche)
function kpiFill(series, unit) {
  if (!series || series.length < 2) return (series || []).slice();
  var step = function (x) {
    var d = new Date(x);
    if (unit === 'day') d.setUTCDate(d.getUTCDate() + 1);
    else if (unit === 'week') d.setUTCDate(d.getUTCDate() + 7);
    else d.setUTCMonth(d.getUTCMonth() + 3);
    return d;
  };
  var key = function (d) { return d.toISOString().slice(0, 10); };
  var map = {}; series.forEach(function (s) { map[s.bucket] = s; });
  var out = []; var cur = new Date(series[0].bucket + 'T00:00:00Z');
  var end = new Date(series[series.length - 1].bucket + 'T00:00:00Z');
  var guard = 0;
  while (cur <= end && guard < 500) {
    var kk = key(cur);
    out.push(map[kk] || { bucket: kk, revenue: 0, units: 0, orders: 0 });
    cur = step(cur); guard++;
  }
  return out;
}
// SVG-Flächendiagramm (kein externes Lib)
function kpiChart(series, metric, unit, L) {
  var W = 760, H = 260, padL = 48, padR = 14, padT = 18, padB = 36;
  var plotW = W - padL - padR, plotH = H - padT - padB;
  if (!series || !series.length) {
    return '<div style="padding:2.5rem 1rem;text-align:center;color:var(--text3)">' + esc(L.empty) + '</div>';
  }
  var valOf = function (s) { return metric === 'units' ? s.units : s.revenue; };
  var maxV = 0; series.forEach(function (s) { if (valOf(s) > maxV) maxV = valOf(s); });
  var niceMax = kniceMax(maxV);
  var n = series.length;
  var xAt = function (i) { return padL + (n === 1 ? plotW / 2 : plotW * i / (n - 1)); };
  var yAt = function (v) { return padT + plotH - (v / niceMax) * plotH; };
  var pts = series.map(function (s, i) { return [xAt(i), yAt(valOf(s))]; });
  var line = pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ');
  var area = line + ' L' + xAt(n - 1).toFixed(1) + ',' + (padT + plotH) + ' L' + xAt(0).toFixed(1) + ',' + (padT + plotH) + ' Z';
  var grid = '', labY = '';
  for (var g = 0; g <= 4; g++) {
    var gy = padT + plotH - plotH * g / 4;
    var gv = niceMax * g / 4;
    grid += '<line x1="' + padL + '" y1="' + gy.toFixed(1) + '" x2="' + (W - padR) + '" y2="' + gy.toFixed(1) + '" stroke="var(--border)" stroke-width="1"' + (g === 0 ? '' : ' stroke-dasharray="3 4"') + '/>';
    labY += '<text x="' + (padL - 8) + '" y="' + (gy + 3).toFixed(1) + '" text-anchor="end" font-size="10" fill="var(--text3)">' + (metric === 'units' ? kfmtInt(Math.round(gv)) : kfmtShort(gv)) + '</text>';
  }
  var labX = '', stp = Math.max(1, Math.ceil(n / 6));
  for (var i = 0; i < n; i += stp) {
    labX += '<text x="' + xAt(i).toFixed(1) + '" y="' + (H - 12) + '" text-anchor="middle" font-size="10" fill="var(--text3)">' + esc(kpiLabel(series[i].bucket, unit)) + '</text>';
  }
  var dots = pts.map(function (p, i) {
    var s = series[i];
    var tip = kpiLabel(s.bucket, unit) + ': ' + (metric === 'units' ? kfmtInt(s.units) + ' ' + L.by_units : kfmtMoney(s.revenue));
    return '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="3" fill="var(--a300)"><title>' + esc(tip) + '</title></circle>';
  }).join('');
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" preserveAspectRatio="xMidYMid meet" style="display:block;max-height:300px">'
    + '<defs><linearGradient id="kpiGrad" x1="0" y1="0" x2="0" y2="1">'
    + '<stop offset="0%" stop-color="var(--a300)" stop-opacity="0.30"/>'
    + '<stop offset="100%" stop-color="var(--a300)" stop-opacity="0.02"/></linearGradient></defs>'
    + grid + labY
    + '<path d="' + area + '" fill="url(#kpiGrad)"/>'
    + '<path d="' + line + '" fill="none" stroke="var(--a300)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>'
    + dots + labX + '</svg>';
}
function kdelta(pct, label) {
  pct = Number(pct || 0);
  var up = pct >= 0, col = up ? 'var(--green)' : 'var(--red)', bg = up ? 'var(--green2)' : 'var(--red2)';
  return '<span title="' + esc(label || '') + '" style="display:inline-flex;align-items:center;gap:.2rem;font-size:.72rem;font-weight:700;padding:.15rem .45rem;border-radius:99px;color:' + col + ';background:' + bg + '">' + (up ? '▲' : '▼') + ' ' + Math.abs(pct).toFixed(1) + '%</span>';
}
function kTile(o) {
  var vc = o.valueColor || o.accent || 'var(--text)';
  var bg = o.bg || 'var(--surface)';
  var h = '<div style="background:' + bg + ';border:1px solid var(--border);border-left:4px solid ' + o.accent + ';border-radius:12px;padding:1rem 1.1rem">';
  h += '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:.5rem">';
  h += '<div style="font-size:.74rem;font-weight:600;text-transform:uppercase;letter-spacing:.4px;color:var(--text3)">' + esc(o.label) + '</div>' + (o.badge || '');
  h += '</div>';
  h += '<div style="font-family:var(--fh);font-weight:800;font-size:1.9rem;line-height:1.1;margin:.25rem 0;color:' + vc + '">' + o.value + '</div>';
  if (o.sub) h += '<div style="font-size:.8rem;color:var(--text3)">' + esc(o.sub) + '</div>';
  return h + '</div>';
}
function kChip(icon, val, label, col, bg) {
  return '<div style="background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:.7rem .8rem">'
    + '<div style="display:inline-flex;width:30px;height:30px;align-items:center;justify-content:center;border-radius:8px;background:' + (bg || 'var(--surface3)') + ';font-size:.95rem">' + icon + '</div>'
    + '<div style="font-family:var(--fh);font-weight:800;font-size:1.25rem;line-height:1.2;margin-top:.3rem;color:' + (col || 'var(--text)') + '">' + esc(String(val)) + '</div>'
    + '<div style="font-size:.72rem;color:var(--text3)">' + esc(label) + '</div></div>';
}
function kToggle(opts, sel, fn) {
  var h = '<div style="display:inline-flex;background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:2px;gap:2px">';
  opts.forEach(function (o) {
    var on = String(o[0]) === String(sel);
    h += '<button onclick="' + fn + '(\'' + o[0] + '\')" style="border:0;cursor:pointer;font-size:.78rem;font-weight:600;padding:.3rem .6rem;border-radius:6px;background:' + (on ? 'var(--surface)' : 'transparent') + ';color:' + (on ? 'var(--text)' : 'var(--text3)') + ';' + (on ? 'box-shadow:0 1px 2px rgba(0,0,0,.08)' : '') + '">' + esc(o[1]) + '</button>';
  });
  return h + '</div>';
}
function kShipBar(label, val, total, col) {
  var pct = total > 0 ? Math.round(val / total * 100) : 0;
  return '<div style="margin-bottom:.6rem"><div style="display:flex;justify-content:space-between;font-size:.8rem;margin-bottom:.2rem"><span>' + esc(label) + '</span><span style="font-weight:700">' + val + '</span></div>'
    + '<div style="height:7px;background:var(--surface2);border-radius:99px;overflow:hidden"><div style="height:100%;width:' + pct + '%;background:' + col + '"></div></div></div>';
}
function kpiRanking(list, sort, L, av) {
  var rows = (list || []).slice().sort(function (a, b) { return (b[sort] || 0) - (a[sort] || 0); }).slice(0, 12);
  var h = '<div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:1.1rem">';
  h += '<div style="display:flex;justify-content:space-between;align-items:center;gap:.5rem;flex-wrap:wrap;margin-bottom:.8rem">';
  h += '<div style="font-family:var(--fh);font-weight:700;font-size:1.15rem">' + esc(L.ranking) + '</div>';
  h += kToggle(av ? [['units', L.col_units], ['views', L.col_views]] : [['revenue', L.col_revenue], ['units', L.col_units], ['views', L.col_views]], sort, '_kpiSortBy');
  h += '</div>';
  if (!list || !list.length) { return h + '<div style="padding:1.5rem;text-align:center;color:var(--text3)">' + esc(L.no_sales) + '</div></div>'; }
  h += '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:.85rem"><thead>';
  h += '<tr style="text-align:left;color:var(--text3);font-size:.7rem;text-transform:uppercase;letter-spacing:.3px">'
    + '<th style="padding:.4rem .3rem">#</th><th style="padding:.4rem .3rem">' + esc(L.col_product) + '</th>'
    + '<th style="padding:.4rem .3rem;text-align:right">' + esc(L.col_revenue) + '</th>'
    + '<th style="padding:.4rem .3rem;text-align:right">' + esc(L.col_units) + '</th>'
    + '<th style="padding:.4rem .3rem;text-align:right">' + esc(L.col_views) + '</th>'
    + '<th style="padding:.4rem .3rem;text-align:right">' + esc(L.col_stock) + '</th></tr></thead><tbody>';
  rows.forEach(function (r, i) {
    var low = r.stock <= 3;
    var medal = i === 0 ? '#D99100' : i === 1 ? '#8A93A2' : i === 2 ? '#B06A2C' : 'var(--text3)';
    var rankCell = i < 3
      ? '<span style="display:inline-flex;width:22px;height:22px;align-items:center;justify-content:center;border-radius:99px;background:' + medal + ';color:#fff;font-weight:800;font-size:.72rem">' + (i + 1) + '</span>'
      : (i + 1);
    h += '<tr style="border-top:1px solid var(--border)">';
    h += '<td style="padding:.5rem .3rem;font-weight:700;color:var(--text3)">' + rankCell + '</td>';
    h += '<td style="padding:.5rem .3rem;max-width:230px"><div style="font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(r.title) + '</div>' + (r.active ? '' : '<span style="font-size:.65rem;color:var(--text3)">(' + esc(L.inactive) + ')</span>') + '</td>';
    h += '<td style="padding:.5rem .3rem;text-align:right;font-weight:700">' + kfmtMoney(r.revenue) + '</td>';
    h += '<td style="padding:.5rem .3rem;text-align:right">' + kfmtInt(r.units) + '</td>';
    h += '<td style="padding:.5rem .3rem;text-align:right;color:var(--text2)">' + kfmtInt(r.views) + '</td>';
    h += '<td style="padding:.5rem .3rem;text-align:right' + (low ? ';color:var(--red);font-weight:700' : '') + '">' + kfmtInt(r.stock) + '</td>';
    h += '</tr>';
  });
  return h + '</tbody></table></div></div>';
}
function kpiInsights(d, L) {
  var K = d.kpis, out = [];
  var sold = (d.ranking || []).filter(function (r) { return r.revenue > 0; });
  if (sold.length) out.push({ icon: '🏆', text: '<b>' + esc(L.ins_top) + ':</b> ' + esc(sold[0].title) + ' — ' + kfmtMoney(sold[0].revenue) });
  if (K.revenue_30d > 0 || K.revenue_prev_30d > 0) {
    var g = K.growth_30d_pct;
    if (g > 2) out.push({ icon: '📈', text: esc(L.ins_growth_up) + ' <b style="color:var(--green)">+' + g.toFixed(1) + '%</b> ' + esc(L.trend30) });
    else if (g < -2) out.push({ icon: '📉', text: esc(L.ins_growth_down) + ' <b style="color:var(--red)">' + g.toFixed(1) + '%</b> ' + esc(L.trend30) });
    else out.push({ icon: '➖', text: esc(L.ins_flat) });
  }
  if (K.views_total > 0) {
    var conv = K.orders_total / K.views_total * 100;
    out.push({ icon: '🎯', text: '<b>' + conv.toFixed(1) + '%</b> ' + esc(L.ins_conv) + ' (' + kfmtInt(K.orders_total) + '/' + kfmtInt(K.views_total) + ')' });
  }
  var low = (d.ranking || []).filter(function (r) { return r.active && r.stock <= 3; }).length;
  if (low > 0) out.push({ icon: '⚠️', text: '<b>' + low + '</b> ' + esc(L.ins_lowstock) });
  var nov = (d.ranking || []).filter(function (r) { return r.active && r.views === 0; }).length;
  if (nov > 0) out.push({ icon: '👀', text: '<b>' + nov + '</b> ' + esc(L.ins_noviews) });
  return out;
}
function kpiSide(d, L) {
  var ins = kpiInsights(d, L), s = d.shipping || {};
  var h = '<div style="display:flex;flex-direction:column;gap:1.25rem">';
  h += '<div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:1.1rem">';
  h += '<div style="font-family:var(--fh);font-weight:700;font-size:1.15rem;margin-bottom:.6rem">💡 ' + esc(L.insights) + '</div>';
  if (!ins.length) h += '<div style="color:var(--text3);font-size:.85rem">' + esc(L.empty) + '</div>';
  else ins.forEach(function (x) { h += '<div style="display:flex;gap:.55rem;align-items:flex-start;padding:.45rem 0;border-top:1px solid var(--border)"><div style="font-size:1.05rem;line-height:1.3">' + x.icon + '</div><div style="font-size:.85rem;line-height:1.4">' + x.text + '</div></div>'; });
  h += '</div>';
  h += '<div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:1.1rem">';
  h += '<div style="font-family:var(--fh);font-weight:700;font-size:1.15rem;margin-bottom:.7rem">🚚 ' + esc(L.shipping) + '</div>';
  if (!s.total) h += '<div style="color:var(--text3);font-size:.85rem">—</div>';
  else {
    h += kShipBar(L.sh_pending, s.pending, s.total, 'var(--amber)');
    h += kShipBar(L.sh_shipped, s.shipped, s.total, 'var(--blue)');
    h += kShipBar(L.sh_delivered, s.delivered, s.total, 'var(--green)');
  }
  h += '</div></div>';
  return h;
}
function kpiBuildBody(st) {
  var d = st.data, L = st.L, K = d.kpis, metric = st.metric, sort = st.sort, unit = d.bucket;
  var av = !!d.admin_view;           // Support-Ansicht: Geldwerte maskiert
  if (av) { metric = 'units'; if (sort === 'revenue') sort = 'units'; }
  var h = '';
  if (av) {
    h += '<div style="background:var(--amber2);border:1px solid var(--border);border-radius:10px;padding:.6rem .9rem;margin-bottom:1rem;font-size:.82rem;color:var(--text2)">🔒 ' + esc(L.fin_locked) + '</div>';
  }
  // KPI-Kacheln (oben) — farbige Tönung
  h += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:1rem;margin-bottom:1rem">';
  h += kTile({ label: L.rev_total, value: kfmtMoney(K.revenue_total), accent: 'var(--a400)', bg: 'var(--a050)', sub: L.rev_ytd + ': ' + kfmtMoney(K.revenue_ytd), badge: av ? '' : kdelta(K.growth_30d_pct, L.trend30) });
  h += kTile({ label: L.aov, value: kfmtMoney2(K.aov), accent: 'var(--blue)', bg: 'var(--blue2)', sub: kfmtInt(K.orders_total) + ' ' + L.orders });
  var rr = K.return_rate_pct, rrCol = rr <= 5 ? 'var(--green)' : (rr <= 15 ? 'var(--amber)' : 'var(--red)'), rrBg = rr <= 5 ? 'var(--green2)' : (rr <= 15 ? 'var(--amber2)' : 'var(--red2)');
  h += kTile({ label: L.return_rate, value: rr.toFixed(1) + '%', accent: rrCol, bg: rrBg, valueColor: rrCol, sub: kfmtInt(K.orders_lost) + ' ' + L.orders });
  h += kTile({ label: L.net_payout, value: kfmtMoney(K.net_payout_total), accent: 'var(--green)', bg: 'var(--green2)', sub: L.net_sub });
  h += '</div>';
  // Sekundär-Chips — getönte Icon-Badges
  h += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:.6rem;margin-bottom:1.5rem">';
  h += kChip('🛒', kfmtInt(K.orders_total), L.orders, 'var(--blue)', 'var(--blue2)');
  h += kChip('📦', kfmtInt(K.units_total), L.units, 'var(--a400)', 'var(--a050)');
  h += kChip('⭐', K.active_count + ' / ' + K.product_count, L.active_products, 'var(--amber)', 'var(--amber2)');
  h += kChip('👁', kfmtInt(K.views_total), L.views, 'var(--green)', 'var(--green2)');
  h += kChip('🏷', kfmtInt(K.stock_total), L.stock, 'var(--text2)', 'var(--surface3)');
  h += '</div>';
  // Umsatzverlauf
  h += '<div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:1.1rem 1.1rem .6rem;margin-bottom:1.5rem">';
  h += '<div style="display:flex;flex-wrap:wrap;gap:.6rem;align-items:center;justify-content:space-between;margin-bottom:.6rem">';
  h += '<div style="font-family:var(--fh);font-weight:700;font-size:1.15rem">' + esc(L.revenue_trend) + '</div>';
  h += '<div style="display:flex;gap:.4rem;flex-wrap:wrap">';
  h += kToggle(av ? [['units', L.by_units]] : [['revenue', L.by_revenue], ['units', L.by_units]], metric, '_kpiSetMetric');
  h += kToggle([['day', L.gran_day], ['week', L.gran_week], ['quarter', L.gran_quarter]], st.bucket, '_kpiLoad');
  h += '</div></div>';
  h += kpiChart(kpiFill(d.series, unit), metric, unit, L);
  h += '</div>';
  // Ranking + Seitenspalte
  h += '<div class="kpi-2col" style="display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);gap:1.25rem;align-items:start">';
  h += kpiRanking(d.ranking, sort, L, av);
  h += kpiSide(d, L);
  h += '</div>';
  h += '<div style="margin-top:1rem;font-size:.8rem;color:var(--text3)">ℹ️ ' + esc(L.reviews_soon) + '</div>';
  return h;
}
window._kpiRepaint = function () {
  var st = window._kpi; if (!st || !st.data) return;
  var el = document.getElementById('kpiBody'); if (!el) return;
  el.innerHTML = kpiBuildBody(st);
};
window._kpiLoad = async function (bucket) {
  var st = window._kpi; if (!st) return;
  st.bucket = bucket;
  var el = document.getElementById('kpiBody');
  if (el) el.innerHTML = '<div class="loading-wrap"><div class="spinner" role="status"></div></div>';
  try {
    st.data = await apiReq('/seller/analytics?bucket=' + encodeURIComponent(bucket), 'GET', null, true);
  } catch (e) {
    if (el) el.innerHTML = '<div class="alert alert-error">' + esc(e.message || 'Error') + '</div>';
    return;
  }
  window._kpiRepaint();
};
window._kpiSetMetric = function (m) { if (window._kpi) { window._kpi.metric = m; window._kpiRepaint(); } };
window._kpiSortBy = function (s) { if (window._kpi) { window._kpi.sort = s; window._kpiRepaint(); } };

route('seller-kpi', async function () {
  if (!S.user || (S.user.role !== 'seller' && S.user.role !== 'dealer' && S.user.role !== 'admin')) { render('login'); return; }

  var EN = {
    title: 'Performance & KPIs', back: '← Back to dashboard',
    rev_total: 'Total revenue', rev_ytd: 'This year', net_payout: 'Net payout', net_sub: 'after commission',
    aov: 'Avg. order value', orders: 'orders', units: 'units sold', return_rate: 'Return / cancel rate',
    active_products: 'active products', views: 'product views', stock: 'in stock',
    trend30: 'vs. prev. 30 days', revenue_trend: 'Revenue trend', by_revenue: 'Revenue', by_units: 'Units',
    gran_day: 'Day', gran_week: 'Week', gran_quarter: 'Quarter',
    ranking: 'Product ranking', col_product: 'Product', col_revenue: 'Revenue', col_units: 'Units', col_views: 'Views', col_stock: 'Stock',
    no_sales: 'No sales yet — your ranking appears once you sell.', inactive: 'inactive',
    insights: 'Insights', shipping: 'Shipping status', sh_pending: 'Open', sh_shipped: 'Shipped', sh_delivered: 'Delivered',
    empty: 'No data yet — your KPIs appear automatically once you make sales.',
    reviews_soon: 'Ratings & shipping time follow with the reviews module.', fin_locked: 'Support view: financial figures (revenue, payout, avg. order value) are hidden.',
    ins_top: 'Bestseller', ins_growth_up: 'Revenue is up', ins_growth_down: 'Revenue is down', ins_flat: 'Revenue is stable (last 30 days).',
    ins_lowstock: 'products almost sold out (stock ≤ 3).', ins_conv: 'of views became orders', ins_noviews: 'active products have no views yet — promote them.'
  };
  var L = ({
    en: EN,
    de: {
      title: 'Performance & KPIs', back: '← Zurück zum Dashboard',
      rev_total: 'Umsatz gesamt', rev_ytd: 'Dieses Jahr', net_payout: 'Netto-Auszahlung', net_sub: 'nach Provision',
      aov: 'Ø Bestellwert', orders: 'Bestellungen', units: 'verkaufte Stück', return_rate: 'Storno-/Retourenquote',
      active_products: 'aktive Produkte', views: 'Produktaufrufe', stock: 'auf Lager',
      trend30: 'ggü. vorh. 30 Tagen', revenue_trend: 'Umsatzverlauf', by_revenue: 'Umsatz', by_units: 'Stück',
      gran_day: 'Tag', gran_week: 'Woche', gran_quarter: 'Quartal',
      ranking: 'Produkt-Ranking', col_product: 'Produkt', col_revenue: 'Umsatz', col_units: 'Stück', col_views: 'Aufrufe', col_stock: 'Lager',
      no_sales: 'Noch keine Verkäufe — dein Ranking erscheint, sobald du verkaufst.', inactive: 'inaktiv',
      insights: 'Insights', shipping: 'Versandstatus', sh_pending: 'Offen', sh_shipped: 'Versendet', sh_delivered: 'Zugestellt',
      empty: 'Noch keine Daten — deine KPIs erscheinen automatisch, sobald du Verkäufe hast.',
      reviews_soon: 'Bewertungen & Versandzeit folgen mit dem Reviews-Modul.', fin_locked: 'Support-Ansicht: Finanzzahlen (Umsatz, Auszahlung, Ø Bestellwert) sind ausgeblendet.',
      ins_top: 'Bestseller', ins_growth_up: 'Umsatz steigt', ins_growth_down: 'Umsatz sinkt', ins_flat: 'Umsatz ist stabil (letzte 30 Tage).',
      ins_lowstock: 'Produkte fast ausverkauft (Lager ≤ 3).', ins_conv: 'der Aufrufe wurden zu Bestellungen', ins_noviews: 'aktive Produkte ohne Aufrufe — bewirb sie.'
    },
    fr: {
      title: 'Performance & KPIs', back: '← Retour au tableau de bord',
      rev_total: "Chiffre d'affaires total", rev_ytd: 'Cette année', net_payout: 'Versement net', net_sub: 'après commission',
      aov: 'Panier moyen', orders: 'commandes', units: 'unités vendues', return_rate: "Taux d'annulation/retour",
      active_products: 'produits actifs', views: 'vues produit', stock: 'en stock',
      trend30: 'vs 30 j. préc.', revenue_trend: 'Évolution du CA', by_revenue: 'CA', by_units: 'Unités',
      gran_day: 'Jour', gran_week: 'Semaine', gran_quarter: 'Trimestre',
      ranking: 'Classement produits', col_product: 'Produit', col_revenue: 'CA', col_units: 'Unités', col_views: 'Vues', col_stock: 'Stock',
      no_sales: 'Aucune vente — le classement apparaît dès la première vente.', inactive: 'inactif',
      insights: 'Analyses', shipping: 'Statut des envois', sh_pending: 'En attente', sh_shipped: 'Expédié', sh_delivered: 'Livré',
      empty: 'Pas encore de données — vos KPIs apparaissent dès vos premières ventes.',
      reviews_soon: "Notes & délai d'expédition suivront avec le module avis.", fin_locked: 'Vue support : les chiffres financiers (CA, versement, panier moyen) sont masqués.',
      ins_top: 'Meilleure vente', ins_growth_up: 'CA en hausse', ins_growth_down: 'CA en baisse', ins_flat: 'CA stable (30 derniers jours).',
      ins_lowstock: 'produits presque épuisés (stock ≤ 3).', ins_conv: 'des vues devenues commandes', ins_noviews: 'produits actifs sans vues — faites-en la promotion.'
    },
    pt: {
      title: 'Desempenho & KPIs', back: '← Voltar ao painel',
      rev_total: 'Receita total', rev_ytd: 'Este ano', net_payout: 'Pagamento líquido', net_sub: 'após comissão',
      aov: 'Valor médio', orders: 'pedidos', units: 'unidades vendidas', return_rate: 'Taxa de cancelamento/devolução',
      active_products: 'produtos ativos', views: 'visualizações', stock: 'em stock',
      trend30: 'vs 30 dias ant.', revenue_trend: 'Evolução da receita', by_revenue: 'Receita', by_units: 'Unidades',
      gran_day: 'Dia', gran_week: 'Semana', gran_quarter: 'Trimestre',
      ranking: 'Ranking de produtos', col_product: 'Produto', col_revenue: 'Receita', col_units: 'Unid.', col_views: 'Visu.', col_stock: 'Stock',
      no_sales: 'Ainda sem vendas — o ranking aparece após a primeira venda.', inactive: 'inativo',
      insights: 'Insights', shipping: 'Estado dos envios', sh_pending: 'Aberto', sh_shipped: 'Enviado', sh_delivered: 'Entregue',
      empty: 'Ainda sem dados — os KPIs aparecem assim que tiver vendas.',
      reviews_soon: 'Avaliações & tempo de envio chegam com o módulo de avaliações.', fin_locked: 'Vista de suporte: valores financeiros (receita, pagamento, valor médio) ocultos.',
      ins_top: 'Mais vendido', ins_growth_up: 'Receita a subir', ins_growth_down: 'Receita a descer', ins_flat: 'Receita estável (últimos 30 dias).',
      ins_lowstock: 'produtos quase esgotados (stock ≤ 3).', ins_conv: 'das visualizações viraram pedidos', ins_noviews: 'produtos ativos sem visualizações — promova-os.'
    },
    es: {
      title: 'Rendimiento & KPIs', back: '← Volver al panel',
      rev_total: 'Ingresos totales', rev_ytd: 'Este año', net_payout: 'Pago neto', net_sub: 'tras comisión',
      aov: 'Valor medio', orders: 'pedidos', units: 'unidades vendidas', return_rate: 'Tasa de cancelación/devolución',
      active_products: 'productos activos', views: 'vistas', stock: 'en stock',
      trend30: 'vs 30 días ant.', revenue_trend: 'Evolución de ingresos', by_revenue: 'Ingresos', by_units: 'Unidades',
      gran_day: 'Día', gran_week: 'Semana', gran_quarter: 'Trimestre',
      ranking: 'Ranking de productos', col_product: 'Producto', col_revenue: 'Ingresos', col_units: 'Unid.', col_views: 'Vistas', col_stock: 'Stock',
      no_sales: 'Aún sin ventas — el ranking aparece tras la primera venta.', inactive: 'inactivo',
      insights: 'Insights', shipping: 'Estado de envíos', sh_pending: 'Abierto', sh_shipped: 'Enviado', sh_delivered: 'Entregado',
      empty: 'Aún sin datos — los KPIs aparecen cuando tengas ventas.',
      reviews_soon: 'Valoraciones y tiempo de envío llegan con el módulo de reseñas.', fin_locked: 'Vista de soporte: los importes financieros (ingresos, pago, valor medio) están ocultos.',
      ins_top: 'Más vendido', ins_growth_up: 'Ingresos al alza', ins_growth_down: 'Ingresos a la baja', ins_flat: 'Ingresos estables (últimos 30 días).',
      ins_lowstock: 'productos casi agotados (stock ≤ 3).', ins_conv: 'de las vistas se volvieron pedidos', ins_noviews: 'productos activos sin vistas — promociónalos.'
    },
    sw: {
      title: 'Utendaji & KPIs', back: '← Rudi kwenye dashibodi',
      rev_total: 'Mapato jumla', rev_ytd: 'Mwaka huu', net_payout: 'Malipo halisi', net_sub: 'baada ya kamisheni',
      aov: 'Wastani wa oda', orders: 'oda', units: 'vipande vilivyouzwa', return_rate: 'Kiwango cha kufuta/kurudisha',
      active_products: 'bidhaa hai', views: 'mionekano', stock: 'stoo',
      trend30: 'vs siku 30 zilizopita', revenue_trend: 'Mwenendo wa mapato', by_revenue: 'Mapato', by_units: 'Vipande',
      gran_day: 'Siku', gran_week: 'Wiki', gran_quarter: 'Robo',
      ranking: 'Daraja la bidhaa', col_product: 'Bidhaa', col_revenue: 'Mapato', col_units: 'Vip.', col_views: 'Mion.', col_stock: 'Stoo',
      no_sales: 'Bado hakuna mauzo — daraja huonekana ukianza kuuza.', inactive: 'haifanyi kazi',
      insights: 'Maarifa', shipping: 'Hali ya usafirishaji', sh_pending: 'Wazi', sh_shipped: 'Imetumwa', sh_delivered: 'Imefika',
      empty: 'Bado hakuna data — KPIs zako huonekana mara tu unapouza.',
      reviews_soon: 'Ukadiriaji na muda wa usafirishaji utafuata na moduli ya mapitio.', fin_locked: 'Mwonekano wa msaada: takwimu za fedha (mapato, malipo, wastani) zimefichwa.',
      ins_top: 'Inayouzwa zaidi', ins_growth_up: 'Mapato yanapanda', ins_growth_down: 'Mapato yanashuka', ins_flat: 'Mapato ni thabiti (siku 30 zilizopita).',
      ins_lowstock: 'bidhaa karibu kuisha (stoo ≤ 3).', ins_conv: 'ya mionekano ikawa oda', ins_noviews: 'bidhaa hai bila mionekano — zitangaze.'
    }
  })[S.lang] || EN;

  window._kpi = { L: L, bucket: (window._kpi && window._kpi.bucket) || 'day', metric: 'revenue', sort: 'revenue', data: null };

  var h = '<div class="page-wrap"><section class="section">';
  h += '<style>@media(max-width:760px){.kpi-2col{grid-template-columns:1fr!important}}</style>';
  h += '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;margin-bottom:1.25rem">';
  h += '<div class="sec-title">⭐ ' + esc(L.title) + '</div>';
  h += '<a href="#seller-dashboard" onclick="event.preventDefault();render(\'seller-dashboard\')" style="font-size:.85rem;color:var(--text2)">' + esc(L.back) + '</a>';
  h += '</div>';
  h += '<div id="kpiBody"><div class="loading-wrap"><div class="spinner" role="status"></div></div></div>';
  h += '</section></div>';
  $('content').innerHTML = h;

  await window._kpiLoad(window._kpi.bucket);
});

/* ---------- ROUTE: SELLER SHIPMENTS (Versand Phase 1c) ---------- */
route('seller-shipments', async function () {
  if (!S.user || (S.user.role !== 'seller' && S.user.role !== 'dealer' && S.user.role !== 'admin')) { render('login'); return; }

  var EN = {
    title:'Shipping & shipments', back:'\u2190 Back to dashboard',
    rates:'\u2699\ufe0f My shipping rates',
    empty:'No shipments yet. They appear automatically once an order is paid.',
    order:'Order', items:'Items', qty:'Qty', recipient:'Recipient', deliverTo:'Deliver to',
    station:'Pickup station', noaddr:'No address provided',
    carrier:'Carrier', tracking:'Tracking number', pickCarrier:'\u2014 choose carrier \u2014',
    trackingPh:'Tracking / waybill no.',
    save:'Mark as shipped', recheck:'Check again', slip:'\ud83d\udcc4 Packing slip (PDF)',
    needTrack:'Enter a tracking number',
    shipFee:'Shipping paid by customer', goods:'Goods value',
    vOk:'\u2713 Confirmed by carrier', vWait:'\u23f3 Not yet confirmed \u2013 we keep checking',
    vBad:'\u26a0 Carrier does not recognise this number',
    mHeld:'Payout held until shipping is proven',
    mShip:'Shipping cost released \u2013 goods value follows on delivery',
    mFree:'Payout released',
    noRates:'You have not set your own shipping rates yet. Until then the platform charges a default price. Set your rates so the refund matches your real cost.',
    popup:'Please allow pop-ups to open the packing slip.'
  };
  var L = ({
    en: EN,
    de: {
      title:'Versand & Sendungen', back:'\u2190 Zur\u00fcck zum Dashboard',
      rates:'\u2699\ufe0f Meine Versandtarife',
      empty:'Noch keine Sendungen. Sie entstehen automatisch, sobald eine Bestellung bezahlt ist.',
      order:'Bestellung', items:'Artikel', qty:'Menge', recipient:'Empf\u00e4nger', deliverTo:'Lieferung',
      station:'Abholstation', noaddr:'Keine Adresse hinterlegt',
      carrier:'Versanddienst', tracking:'Tracking-Nummer', pickCarrier:'\u2014 Versanddienst w\u00e4hlen \u2014',
      trackingPh:'Tracking-/Frachtnr.',
      save:'Als versendet markieren', recheck:'Erneut pr\u00fcfen', slip:'\ud83d\udcc4 Packzettel (PDF)',
      needTrack:'Bitte Tracking-Nummer eingeben',
      shipFee:'Versand (vom Kunden bezahlt)', goods:'Warenwert',
      vOk:'\u2713 Vom Versanddienst best\u00e4tigt', vWait:'\u23f3 Noch nicht best\u00e4tigt \u2013 wir pr\u00fcfen weiter',
      vBad:'\u26a0 Versanddienst kennt diese Nummer nicht',
      mHeld:'Auszahlung gehalten bis Versandnachweis',
      mShip:'Versandkosten freigegeben \u2013 Warenwert folgt bei Zustellung',
      mFree:'Auszahlung freigegeben',
      noRates:'Du hast noch keine eigenen Versandtarife hinterlegt. Bis dahin berechnet die Plattform einen Standardpreis. Lege eigene Tarife an, damit die Erstattung deinen echten Kosten entspricht.',
      popup:'Bitte Pop-ups erlauben, um den Packzettel zu \u00f6ffnen.'
    },
    fr: {
      title:'Exp\u00e9dition & envois', back:'\u2190 Retour au tableau de bord',
      rates:'\u2699\ufe0f Mes tarifs d\u2019exp\u00e9dition',
      empty:'Aucun envoi pour l\u2019instant. Ils apparaissent d\u00e8s qu\u2019une commande est pay\u00e9e.',
      order:'Commande', items:'Articles', qty:'Qt\u00e9', recipient:'Destinataire', deliverTo:'Livraison',
      station:'Point de retrait', noaddr:'Aucune adresse fournie',
      carrier:'Transporteur', tracking:'Num\u00e9ro de suivi', pickCarrier:'\u2014 choisir le transporteur \u2014',
      trackingPh:'N\u00b0 de suivi',
      save:'Marquer comme exp\u00e9di\u00e9', recheck:'V\u00e9rifier \u00e0 nouveau', slip:'\ud83d\udcc4 Bon de livraison (PDF)',
      needTrack:'Saisissez un num\u00e9ro de suivi',
      shipFee:'Livraison pay\u00e9e par le client', goods:'Valeur des articles',
      vOk:'\u2713 Confirm\u00e9 par le transporteur', vWait:'\u23f3 Pas encore confirm\u00e9 \u2013 v\u00e9rification en cours',
      vBad:'\u26a0 Le transporteur ne conna\u00eet pas ce num\u00e9ro',
      mHeld:'Paiement retenu jusqu\u2019\u00e0 preuve d\u2019exp\u00e9dition',
      mShip:'Frais de port lib\u00e9r\u00e9s \u2013 la marchandise suit \u00e0 la livraison',
      mFree:'Paiement lib\u00e9r\u00e9',
      noRates:'Vous n\u2019avez pas encore de tarifs. En attendant, la plateforme applique un prix par d\u00e9faut.',
      popup:'Autorisez les pop-ups pour ouvrir le bon de livraison.'
    },
    pt: {
      title:'Envios', back:'\u2190 Voltar ao painel',
      rates:'\u2699\ufe0f As minhas tarifas de envio',
      empty:'Ainda sem envios. Surgem assim que um pedido for pago.',
      order:'Pedido', items:'Artigos', qty:'Qtd', recipient:'Comprador', deliverTo:'Entrega',
      station:'Esta\u00e7\u00e3o', noaddr:'Sem endere\u00e7o fornecido',
      carrier:'Transportadora', tracking:'N\u00famero de rastreio', pickCarrier:'\u2014 escolher transportadora \u2014',
      trackingPh:'N\u00ba de rastreio',
      save:'Marcar como enviado', recheck:'Verificar de novo', slip:'\ud83d\udcc4 Guia de remessa (PDF)',
      needTrack:'Indique o n\u00famero de rastreio',
      shipFee:'Envio pago pelo cliente', goods:'Valor dos artigos',
      vOk:'\u2713 Confirmado pela transportadora', vWait:'\u23f3 Ainda n\u00e3o confirmado \u2013 continuamos a verificar',
      vBad:'\u26a0 A transportadora n\u00e3o reconhece este n\u00famero',
      mHeld:'Pagamento retido at\u00e9 prova de envio',
      mShip:'Portes libertados \u2013 valor dos artigos ap\u00f3s entrega',
      mFree:'Pagamento libertado',
      noRates:'Ainda n\u00e3o definiu tarifas pr\u00f3prias. At\u00e9 l\u00e1 a plataforma cobra um pre\u00e7o padr\u00e3o.',
      popup:'Permita pop-ups para abrir a guia de remessa.'
    },
    es: {
      title:'Env\u00edos', back:'\u2190 Volver al panel',
      rates:'\u2699\ufe0f Mis tarifas de env\u00edo',
      empty:'A\u00fan no hay env\u00edos. Aparecen cuando se paga un pedido.',
      order:'Pedido', items:'Art\u00edculos', qty:'Cant.', recipient:'Destinatario', deliverTo:'Entrega',
      station:'Punto de recogida', noaddr:'Sin direcci\u00f3n',
      carrier:'Transportista', tracking:'N\u00famero de seguimiento', pickCarrier:'\u2014 elegir transportista \u2014',
      trackingPh:'N\u00ba de seguimiento',
      save:'Marcar como enviado', recheck:'Comprobar de nuevo', slip:'\ud83d\udcc4 Albar\u00e1n (PDF)',
      needTrack:'Introduce el n\u00famero de seguimiento',
      shipFee:'Env\u00edo pagado por el cliente', goods:'Valor de la mercanc\u00eda',
      vOk:'\u2713 Confirmado por el transportista', vWait:'\u23f3 A\u00fan sin confirmar \u2013 seguimos comprobando',
      vBad:'\u26a0 El transportista no reconoce este n\u00famero',
      mHeld:'Pago retenido hasta probar el env\u00edo',
      mShip:'Gastos de env\u00edo liberados \u2013 la mercanc\u00eda tras la entrega',
      mFree:'Pago liberado',
      noRates:'A\u00fan no tienes tarifas propias. Mientras tanto la plataforma aplica un precio est\u00e1ndar.',
      popup:'Permite ventanas emergentes para abrir el albar\u00e1n.'
    },
    sw: {
      title:'Usafirishaji', back:'\u2190 Rudi kwenye dashibodi',
      rates:'\u2699\ufe0f Bei zangu za usafirishaji',
      empty:'Bado hakuna usafirishaji. Huonekana mara tu agizo linapolipiwa.',
      order:'Agizo', items:'Bidhaa', qty:'Idadi', recipient:'Mpokeaji', deliverTo:'Wasilisha',
      station:'Kituo cha kuchukua', noaddr:'Hakuna anwani',
      carrier:'Mtoa huduma', tracking:'Nambari ya ufuatiliaji', pickCarrier:'\u2014 chagua mtoa huduma \u2014',
      trackingPh:'Nambari ya ufuatiliaji',
      save:'Weka kama imetumwa', recheck:'Angalia tena', slip:'\ud83d\udcc4 Ankara ya kifurushi (PDF)',
      needTrack:'Weka nambari ya ufuatiliaji',
      shipFee:'Usafirishaji uliolipwa na mteja', goods:'Thamani ya bidhaa',
      vOk:'\u2713 Imethibitishwa na mtoa huduma', vWait:'\u23f3 Bado haijathibitishwa \u2013 tunaendelea kuangalia',
      vBad:'\u26a0 Mtoa huduma hatambui nambari hii',
      mHeld:'Malipo yanashikiliwa hadi uthibitisho wa usafirishaji',
      mShip:'Gharama za usafirishaji zimetolewa \u2013 thamani ya bidhaa baada ya kufika',
      mFree:'Malipo yametolewa',
      noRates:'Bado hujaweka bei zako. Hadi wakati huo jukwaa linatoza bei ya kawaida.',
      popup:'Ruhusu pop-ups kufungua ankara.'
    }
  })[S.lang] || EN;

  // Fallback ohne Test-Carrier; die echte Liste kommt vom Server
  // (dort wird "Shippo (Test)" im Live-Betrieb ausgeblendet).
  var CARRIERS = [
    ['dhl_express','DHL Express'], ['dhl_germany','DHL Paket (DE)'], ['dhl_ecommerce','DHL eCommerce'],
    ['ups','UPS'], ['fedex','FedEx'], ['usps','USPS'], ['tnt','TNT'], ['aramex','Aramex']
  ];

  function stLabel(s) {
    var m = ({
      en: { pending:'Pending', label_created:'Label created', shipped:'Shipped', in_transit:'In transit', delivered:'Delivered', returned:'Returned', problem:'Problem', cancelled:'Cancelled' },
      de: { pending:'Offen', label_created:'Label erstellt', shipped:'Versendet', in_transit:'Unterwegs', delivered:'Zugestellt', returned:'R\u00fccksendung', problem:'Problem', cancelled:'Storniert' },
      fr: { pending:'En attente', label_created:'\u00c9tiquette cr\u00e9\u00e9e', shipped:'Exp\u00e9di\u00e9', in_transit:'En transit', delivered:'Livr\u00e9', returned:'Retourn\u00e9', problem:'Probl\u00e8me', cancelled:'Annul\u00e9' },
      pt: { pending:'Pendente', label_created:'Etiqueta criada', shipped:'Enviado', in_transit:'Em tr\u00e2nsito', delivered:'Entregue', returned:'Devolvido', problem:'Problema', cancelled:'Cancelado' },
      es: { pending:'Pendiente', label_created:'Etiqueta creada', shipped:'Enviado', in_transit:'En tr\u00e1nsito', delivered:'Entregado', returned:'Devuelto', problem:'Problema', cancelled:'Cancelado' },
      sw: { pending:'Inasubiri', label_created:'Lebo imeundwa', shipped:'Imetumwa', in_transit:'Njiani', delivered:'Imefika', returned:'Imerudishwa', problem:'Tatizo', cancelled:'Imeghairiwa' }
    })[S.lang] || {};
    return m[s] || s;
  }

  var data, ratesInfo = null;
  try {
    data = await apiReq('/seller/shipments', 'GET', null, true);
  } catch (e) {
    $('content').innerHTML = '<div class="page-wrap"><section class="section"><div class="alert alert-error">' + esc(e.message) + '</div></section></div>';
    return;
  }
  try { ratesInfo = await apiReq('/seller/shipping-rates', 'GET', null, true); } catch (e) {}
  if (ratesInfo && Array.isArray(ratesInfo.carriers) && ratesInfo.carriers.length) {
    CARRIERS = ratesInfo.carriers.map(function (c) { return [c.slug, c.label]; });
  }
  var FIELD_CSS = 'width:100%;box-sizing:border-box;margin-top:.3rem;background:var(--surface);' +
    'border:1.5px solid var(--border);border-radius:var(--r8,8px);padding:.6rem .75rem;' +
    'font-size:.95rem;color:var(--text);font-family:inherit';
  var LOCK_TXT = ({
    en: 'Shipment completed \u2013 tracking can no longer be changed.',
    de: 'Sendung abgeschlossen \u2013 die Tracking-Nummer kann nicht mehr ge\u00e4ndert werden.',
    fr: 'Envoi termin\u00e9 \u2013 le num\u00e9ro de suivi ne peut plus \u00eatre modifi\u00e9.',
    pt: 'Envio conclu\u00eddo \u2013 o rastreio j\u00e1 n\u00e3o pode ser alterado.',
    es: 'Env\u00edo finalizado \u2013 el seguimiento ya no se puede cambiar.',
    sw: 'Usafirishaji umekamilika \u2013 nambari ya ufuatiliaji haiwezi kubadilishwa.'
  })[S.lang] || 'Shipment completed \u2013 tracking can no longer be changed.';
  var shipments = (data && data.shipments) || [];

  var h = '<div class="page-wrap"><section class="section">';
  h += '<button class="btn btn-ghost btn-sm" onclick="render(\'seller-dashboard\')" style="margin-bottom:1rem">' + esc(L.back) + '</button>';
  h += '<div class="sec-hd" style="margin-bottom:1rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.6rem">';
  h += '<div class="sec-title">\ud83d\ude9a ' + esc(L.title) + '</div>';
  h += '<button class="btn btn-ghost btn-sm" onclick="render(\'seller-shipping-rates\')">' + esc(L.rates) + '</button>';
  h += '</div>';

  if (ratesInfo && ratesInfo.rates && !ratesInfo.rates.length) {
    h += '<div style="padding:.7rem .9rem;background:rgba(234,179,8,.12);border-left:3px solid #eab308;border-radius:6px;margin-bottom:1rem;font-size:.85rem">' + esc(L.noRates) + '</div>';
  }

  if (!shipments.length) {
    h += '<p style="opacity:.75">' + esc(L.empty) + '</p>';
  } else {
    h += '<div style="display:flex;flex-direction:column;gap:1rem">';
    shipments.forEach(function (s) {
      var badgeBg = (s.status === 'delivered') ? '#16a34a'
                  : (s.status === 'in_transit' || s.status === 'shipped') ? '#2563eb'
                  : (s.status === 'problem' || s.status === 'returned') ? '#dc2626' : '#6b7280';
      h += '<div id="shp-' + s.id + '" style="padding:1rem 1.15rem;background:var(--surface2);border:1px solid transparent;border-radius:10px">';
      h += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.6rem;flex-wrap:wrap;gap:.5rem">';
      h += '<div style="font-weight:700">#' + s.id + ' \u00b7 ' + esc(L.order) + ' #' + s.order_id + '</div>';
      h += '<span style="padding:.15rem .55rem;background:' + badgeBg + ';color:#fff;font-size:.7rem;border-radius:4px;font-weight:700">' + esc(stLabel(s.status)) + '</span>';
      h += '</div>';

      h += '<div style="font-size:.85rem;opacity:.9;line-height:1.7;margin-bottom:.75rem">';
      var addr = s.order_address || {};
      var its = Array.isArray(s.items) ? s.items : [];
      if (its.length) {
        h += '<div><strong>' + esc(L.items) + ':</strong> ';
        h += its.map(function (i) {
          return esc(i.title || ('#' + i.product_id)) + ' <span style="opacity:.7">\u00b7 ' + esc(L.qty) + ' ' + esc(i.qty) + '</span>';
        }).join(' <span style="opacity:.4">|</span> ');
        h += '</div>';
      } else if (s.product_title) {
        h += '<div><strong>' + esc(L.items) + ':</strong> ' + esc(s.product_title) + '</div>';
      }
      var recName = addr.name || s.buyer_name || ('#' + (s.buyer_user_id || '\u2014'));
      var recPhone = addr.phone || s.buyer_phone || '';
      h += '<div><strong>' + esc(L.recipient) + ':</strong> ' + esc(recName);
      if (recPhone) h += ' <span style="opacity:.7">\u00b7 ' + esc(recPhone) + '</span>';
      h += '</div>';
      if (s.pickup_station_name) {
        h += '<div><strong>' + esc(L.deliverTo) + ':</strong> ' + esc(L.station) + ' \u2014 ' +
             esc(s.pickup_station_name) + (s.pickup_station_city ? ' (' + esc(s.pickup_station_city) + ')' : '') + '</div>';
      } else {
        var addrLine = [addr.addr, addr.street, addr.city, addr.country].filter(Boolean).join(', ');
        h += '<div><strong>' + esc(L.deliverTo) + ':</strong> ' + esc(addrLine || L.noaddr) + '</div>';
      }
      h += '<div style="margin-top:.2rem"><strong>' + esc(L.shipFee) + ':</strong> ' + fmt(parseFloat(s.shipping_fee_usd || 0));
      if (s.goods_total) h += ' <span style="opacity:.7">\u00b7 ' + esc(L.goods) + ' ' + fmt(parseFloat(s.goods_total)) + '</span>';
      h += '</div>';
      h += '</div>';

      // Geld-Status
      var mTxt, mBg;
      if (s.released_at) { mTxt = L.mFree; mBg = 'rgba(22,163,74,.14)'; }
      else if (s.shipping_payout_status === 'released') { mTxt = L.mShip; mBg = 'rgba(37,99,235,.12)'; }
      else { mTxt = L.mHeld; mBg = 'rgba(128,128,128,.14)'; }
      h += '<div style="padding:.4rem .7rem;background:' + mBg + ';border-radius:6px;font-size:.78rem;margin-bottom:.7rem">\ud83d\udd12 ' + esc(mTxt) + '</div>';

      // Tracking-Status
      if (s.tracking_number) {
        var vTxt, vCol;
        if (s.tracking_verified) { vTxt = L.vOk; vCol = '#16a34a'; }
        else if (s.status === 'problem') { vTxt = L.vBad; vCol = '#dc2626'; }
        else { vTxt = L.vWait; vCol = '#ca8a04'; }
        h += '<div style="font-size:.78rem;color:' + vCol + ';font-weight:600;margin-bottom:.5rem">' + esc(vTxt);
        if (s.tracking_detail) h += ' <span style="opacity:.75;font-weight:400">\u00b7 ' + esc(s.tracking_detail) + '</span>';
        h += '</div>';
      }

      var locked = !!s.released_at || ['delivered', 'returned', 'cancelled'].indexOf(s.status) !== -1;

      if (locked) {
        // Abgeschlossen: nur noch anzeigen, nicht mehr aendern
        var cLabel = s.carrier || '';
        CARRIERS.forEach(function (c) { if (c[0] === s.carrier) cLabel = c[1]; });
        if (s.carrier === 'shippo') cLabel = 'Shippo (Test)';
        h += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:.6rem;font-size:.85rem">';
        h += '<div><div style="font-size:.75rem;opacity:.7;font-weight:600">' + esc(L.carrier) + '</div><div style="margin-top:.3rem;font-weight:600">' + esc(cLabel || '\u2014') + '</div></div>';
        h += '<div><div style="font-size:.75rem;opacity:.7;font-weight:600">' + esc(L.tracking) + '</div><div style="margin-top:.3rem;font-weight:600;font-family:monospace">' + esc(s.tracking_number || '\u2014') + '</div></div>';
        h += '</div>';
        h += '<div style="font-size:.75rem;opacity:.65;margin-top:.5rem">' + esc(LOCK_TXT) + '</div>';
      } else {
        h += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:.6rem">';
        h += '<div><label style="font-size:.75rem;opacity:.7;font-weight:600;display:block">' + esc(L.carrier) + '</label>';
        h += '<select class="shp-carrier" style="' + FIELD_CSS + '"><option value="">' + esc(L.pickCarrier) + '</option>';
        var carrierKnown = false;
        CARRIERS.forEach(function (c) {
          if (s.carrier === c[0]) carrierKnown = true;
          h += '<option value="' + esc(c[0]) + '"' + (s.carrier === c[0] ? ' selected' : '') + '>' + esc(c[1]) + '</option>';
        });
        // Gespeicherter Carrier, der nicht (mehr) in der Liste ist, bleibt sichtbar
        if (s.carrier && !carrierKnown) {
          h += '<option value="' + esc(s.carrier) + '" selected>' + esc(s.carrier) + '</option>';
        }
        h += '</select></div>';
        h += '<div><label style="font-size:.75rem;opacity:.7;font-weight:600;display:block">' + esc(L.tracking) + '</label><input class="shp-tracking" style="' + FIELD_CSS + '" value="' + esc(s.tracking_number || '') + '" placeholder="' + esc(L.trackingPh) + '"/></div>';
        h += '</div>';
      }

      h += '<div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-top:.7rem;align-items:center">';
      if (!locked) {
        h += '<button class="btn btn-primary btn-sm" onclick="sellerSaveTracking(' + s.id + ', this)">' + esc(L.save) + '</button>';
      }
      if (!locked && s.tracking_number && !s.tracking_verified) {
        h += '<button class="btn btn-ghost btn-sm" onclick="sellerRecheck(' + s.id + ', this)">\u21bb ' + esc(L.recheck) + '</button>';
      }
      h += '<button class="btn btn-ghost btn-sm" onclick="sellerPackingSlip(' + s.id + ')">' + esc(L.slip) + '</button>';
      if (s.tracking_url) {
        h += '<a class="btn btn-ghost btn-sm" href="' + esc(s.tracking_url) + '" target="_blank" rel="noopener">\ud83d\udd0d ' + esc(L.tracking) + '</a>';
      }
      h += '</div>';
      h += '</div>';
    });
    h += '</div>';
  }

  h += '</section></div>';
  $('content').innerHTML = h;

  window.sellerSaveTracking = async function (id, btn) {
    var box = document.getElementById('shp-' + id);
    if (!box) return;
    var carrier = ((box.querySelector('.shp-carrier') || {}).value || '').trim();
    var trk = ((box.querySelector('.shp-tracking') || {}).value || '').trim();
    if (!trk) { toast(L.needTrack, 't-error'); return; }
    if (btn) btn.disabled = true;
    try {
      var r = await apiReq('/seller/shipments/' + id + '/tracking', 'POST',
        { carrier: carrier, tracking_number: trk }, true);
      toast(r.message || 'OK', r.state === 'verified' ? '' : 't-error');
      render('seller-shipments');
    } catch (e) {
      toast(e.message, 't-error');
      if (btn) btn.disabled = false;
    }
  };

  window.sellerRecheck = async function (id, btn) {
    if (btn) { btn.disabled = true; btn.textContent = '\u23f3'; }
    try {
      await apiReq('/seller/shipments/' + id + '/recheck', 'POST', {}, true);
      render('seller-shipments');
    } catch (e) {
      toast(e.message, 't-error');
      if (btn) { btn.disabled = false; btn.textContent = '\u21bb ' + L.recheck; }
    }
  };

  window.sellerPackingSlip = function (id) {
    var w = window.open('', '_blank');
    var hd = { 'Authorization': 'Bearer ' + S.token };
    if (S.support && S.support.sellerId) hd['X-View-Seller-Id'] = String(S.support.sellerId);
    fetch(API + '/seller/shipments/' + id + '/packing-slip', { headers: hd })
      .then(function (r) { return r.text(); })
      .then(function (html) {
        if (!w) { toast(L.popup, 't-error'); return; }
        w.document.open(); w.document.write(html); w.document.close();
      })
      .catch(function (e) { if (w) w.close(); toast(e.message, 't-error'); });
  };
});

/* ============================================================
   HAENDLER: EIGENE VERSANDTARIFE
   Was der Kunde an Versand zahlt, legt der Haendler hier fest.
   Genau dieser Betrag wird ihm nach bestaetigtem Tracking erstattet.
   ============================================================ */
route('seller-shipping-rates', async function () {
  if (!S.user || (S.user.role !== 'seller' && S.user.role !== 'dealer' && S.user.role !== 'admin')) { render('login'); return; }

  var EN = {
    title:'My shipping rates', back:'\u2190 Back to shipments',
    intro:'You decide what the customer pays for shipping. The customer pays it to us, and we refund you exactly this amount once the carrier confirms your tracking number. Price = base + per kg. Use * for all other countries.',
    country:'Destination country', countryPh:'GH, NG, * for all others',
    base:'Base price (USD)', perKg:'Per kg (USD)', freeOver:'Free from (USD)', freeOverPh:'empty = never',
    days:'Delivery days', from:'from', to:'to', carrierHint:'Usual carrier', carrierPh:'e.g. DHL, GIG',
    add:'Save rate', del:'Delete', saved:'Rate saved', deleted:'Rate deleted',
    empty:'No rates yet.', needCountry:'Enter a destination country',
    example:'Example: base 8, per kg 2.50, 3 kg parcel = 15.50 USD',
    confirmDel:'Delete this rate?'
  };
  var L = ({
    en: EN,
    de: {
      title:'Meine Versandtarife', back:'\u2190 Zur\u00fcck zu den Sendungen',
      intro:'Du bestimmst, was der Kunde f\u00fcr den Versand zahlt. Der Kunde zahlt es an uns, und wir erstatten dir genau diesen Betrag, sobald der Versanddienst deine Tracking-Nummer best\u00e4tigt. Preis = Grundpreis + pro kg. Mit * gilt der Tarif f\u00fcr alle \u00fcbrigen L\u00e4nder.',
      country:'Zielland', countryPh:'GH, NG, * f\u00fcr alle anderen',
      base:'Grundpreis (USD)', perKg:'Pro kg (USD)', freeOver:'Gratis ab (USD)', freeOverPh:'leer = nie',
      days:'Lieferzeit (Tage)', from:'von', to:'bis', carrierHint:'\u00dcblicher Versanddienst', carrierPh:'z. B. DHL, GIG',
      add:'Tarif speichern', del:'L\u00f6schen', saved:'Tarif gespeichert', deleted:'Tarif gel\u00f6scht',
      empty:'Noch keine Tarife hinterlegt.', needCountry:'Bitte Zielland angeben',
      example:'Beispiel: Grundpreis 8, pro kg 2,50, Paket mit 3 kg = 15,50 USD',
      confirmDel:'Diesen Tarif l\u00f6schen?'
    },
    fr: {
      title:'Mes tarifs d\u2019exp\u00e9dition', back:'\u2190 Retour aux envois',
      intro:'Vous d\u00e9cidez du prix de livraison. Le client nous le paie et nous vous le remboursons int\u00e9gralement d\u00e8s que le transporteur confirme votre num\u00e9ro de suivi. Prix = base + par kg. * = tous les autres pays.',
      country:'Pays de destination', countryPh:'GH, NG, * pour les autres',
      base:'Prix de base (USD)', perKg:'Par kg (USD)', freeOver:'Gratuit \u00e0 partir de (USD)', freeOverPh:'vide = jamais',
      days:'D\u00e9lai (jours)', from:'de', to:'\u00e0', carrierHint:'Transporteur habituel', carrierPh:'ex. DHL, GIG',
      add:'Enregistrer', del:'Supprimer', saved:'Tarif enregistr\u00e9', deleted:'Tarif supprim\u00e9',
      empty:'Aucun tarif.', needCountry:'Indiquez le pays de destination',
      example:'Exemple : base 8, par kg 2,50, colis de 3 kg = 15,50 USD',
      confirmDel:'Supprimer ce tarif ?'
    },
    pt: {
      title:'As minhas tarifas de envio', back:'\u2190 Voltar aos envios',
      intro:'\u00c9 voc\u00ea que define o custo de envio. O cliente paga-nos e reembolsamos exatamente esse valor assim que a transportadora confirmar o rastreio. Pre\u00e7o = base + por kg. * = todos os outros pa\u00edses.',
      country:'Pa\u00eds de destino', countryPh:'GH, NG, * para os restantes',
      base:'Pre\u00e7o base (USD)', perKg:'Por kg (USD)', freeOver:'Gr\u00e1tis a partir de (USD)', freeOverPh:'vazio = nunca',
      days:'Prazo (dias)', from:'de', to:'a', carrierHint:'Transportadora habitual', carrierPh:'ex. DHL, GIG',
      add:'Guardar tarifa', del:'Eliminar', saved:'Tarifa guardada', deleted:'Tarifa eliminada',
      empty:'Ainda sem tarifas.', needCountry:'Indique o pa\u00eds de destino',
      example:'Exemplo: base 8, por kg 2,50, encomenda de 3 kg = 15,50 USD',
      confirmDel:'Eliminar esta tarifa?'
    },
    es: {
      title:'Mis tarifas de env\u00edo', back:'\u2190 Volver a los env\u00edos',
      intro:'T\u00fa decides lo que paga el cliente por el env\u00edo. El cliente nos lo paga y te lo reembolsamos \u00edntegro en cuanto el transportista confirme tu n\u00famero de seguimiento. Precio = base + por kg. * = todos los dem\u00e1s pa\u00edses.',
      country:'Pa\u00eds de destino', countryPh:'GH, NG, * para los dem\u00e1s',
      base:'Precio base (USD)', perKg:'Por kg (USD)', freeOver:'Gratis desde (USD)', freeOverPh:'vac\u00edo = nunca',
      days:'Plazo (d\u00edas)', from:'de', to:'a', carrierHint:'Transportista habitual', carrierPh:'p. ej. DHL, GIG',
      add:'Guardar tarifa', del:'Eliminar', saved:'Tarifa guardada', deleted:'Tarifa eliminada',
      empty:'A\u00fan no hay tarifas.', needCountry:'Indica el pa\u00eds de destino',
      example:'Ejemplo: base 8, por kg 2,50, paquete de 3 kg = 15,50 USD',
      confirmDel:'\u00bfEliminar esta tarifa?'
    },
    sw: {
      title:'Bei zangu za usafirishaji', back:'\u2190 Rudi kwenye usafirishaji',
      intro:'Wewe unaamua mteja atalipa kiasi gani kwa usafirishaji. Mteja hulipa kwetu, nasi tunakurudishia kiasi hicho hicho mara mtoa huduma anapothibitisha nambari yako ya ufuatiliaji. Bei = msingi + kwa kilo. * = nchi nyingine zote.',
      country:'Nchi lengwa', countryPh:'GH, NG, * kwa nyingine zote',
      base:'Bei ya msingi (USD)', perKg:'Kwa kilo (USD)', freeOver:'Bure kuanzia (USD)', freeOverPh:'wazi = kamwe',
      days:'Siku za kufika', from:'kutoka', to:'hadi', carrierHint:'Mtoa huduma wa kawaida', carrierPh:'mf. DHL, GIG',
      add:'Hifadhi bei', del:'Futa', saved:'Bei imehifadhiwa', deleted:'Bei imefutwa',
      empty:'Bado hakuna bei.', needCountry:'Weka nchi lengwa',
      example:'Mfano: msingi 8, kwa kilo 2.50, kifurushi cha kilo 3 = 15.50 USD',
      confirmDel:'Futa bei hii?'
    }
  })[S.lang] || EN;

  async function load() {
    var res;
    try { res = await apiReq('/seller/shipping-rates', 'GET', null, true); }
    catch (e) {
      $('content').innerHTML = '<div class="page-wrap"><section class="section"><div class="alert alert-error">' + esc(e.message) + '</div></section></div>';
      return;
    }
    var rates = res.rates || [];

    var h = '<div class="page-wrap"><section class="section">';
    h += '<button class="btn btn-ghost btn-sm" onclick="render(\'seller-shipments\')" style="margin-bottom:1rem">' + esc(L.back) + '</button>';
    h += '<div class="sec-hd" style="margin-bottom:.8rem"><div class="sec-title">\u2699\ufe0f ' + esc(L.title) + '</div></div>';
    h += '<p style="font-size:.85rem;opacity:.85;line-height:1.6;max-width:70ch">' + esc(L.intro) + '</p>';

    // Formular
    h += '<div style="padding:1rem 1.15rem;background:var(--surface2);border-radius:10px;margin:1rem 0">';
    h += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:.7rem">';
    h += '<div><label style="font-size:.75rem;opacity:.7">' + esc(L.country) + '</label><input id="sr-country" placeholder="' + esc(L.countryPh) + '" maxlength="2" style="text-transform:uppercase"/></div>';
    h += '<div><label style="font-size:.75rem;opacity:.7">' + esc(L.base) + '</label><input id="sr-base" type="number" step="0.01" min="0" value="0"/></div>';
    h += '<div><label style="font-size:.75rem;opacity:.7">' + esc(L.perKg) + '</label><input id="sr-perkg" type="number" step="0.01" min="0" value="0"/></div>';
    h += '<div><label style="font-size:.75rem;opacity:.7">' + esc(L.freeOver) + '</label><input id="sr-free" type="number" step="0.01" min="0" placeholder="' + esc(L.freeOverPh) + '"/></div>';
    h += '<div><label style="font-size:.75rem;opacity:.7">' + esc(L.days) + ' (' + esc(L.from) + ')</label><input id="sr-dmin" type="number" min="0"/></div>';
    h += '<div><label style="font-size:.75rem;opacity:.7">' + esc(L.days) + ' (' + esc(L.to) + ')</label><input id="sr-dmax" type="number" min="0"/></div>';
    h += '<div><label style="font-size:.75rem;opacity:.7">' + esc(L.carrierHint) + '</label><input id="sr-carrier" placeholder="' + esc(L.carrierPh) + '"/></div>';
    h += '</div>';
    h += '<div style="font-size:.75rem;opacity:.6;margin-top:.6rem">' + esc(L.example) + '</div>';
    h += '<button class="btn btn-primary btn-sm" style="margin-top:.7rem" onclick="srSave(this)">' + esc(L.add) + '</button>';
    h += '</div>';

    // Liste
    if (!rates.length) {
      h += '<p style="opacity:.7">' + esc(L.empty) + '</p>';
    } else {
      h += '<div style="display:flex;flex-direction:column;gap:.5rem">';
      rates.forEach(function (r) {
        h += '<div style="display:flex;justify-content:space-between;align-items:center;gap:.6rem;flex-wrap:wrap;padding:.6rem .9rem;background:var(--surface2);border-radius:8px">';
        h += '<div style="font-size:.88rem">';
        h += '<strong>' + esc(r.country === '*' ? '\u2733 ' + (S.lang === 'de' ? 'Alle \u00fcbrigen L\u00e4nder' : 'All other countries') : r.country) + '</strong> \u00b7 ';
        h += esc(L.base) + ' ' + fmt(parseFloat(r.base_usd)) + ' \u00b7 ' + esc(L.perKg) + ' ' + fmt(parseFloat(r.per_kg_usd));
        if (r.free_over_usd) h += ' \u00b7 ' + esc(L.freeOver) + ' ' + fmt(parseFloat(r.free_over_usd));
        if (r.min_days || r.max_days) h += ' \u00b7 ' + esc([r.min_days, r.max_days].filter(function (x) { return x != null; }).join('\u2013')) + ' ' + esc(L.days);
        if (r.carrier_hint) h += ' <span style="opacity:.7">\u00b7 ' + esc(r.carrier_hint) + '</span>';
        h += '</div>';
        h += '<button class="btn btn-ghost btn-sm" onclick="srDel(' + r.id + ')">' + esc(L.del) + '</button>';
        h += '</div>';
      });
      h += '</div>';
    }

    h += '</section></div>';
    $('content').innerHTML = h;
  }

  window.srSave = async function (btn) {
    function v(id) { var el = document.getElementById(id); return el ? String(el.value).trim() : ''; }
    var country = v('sr-country').toUpperCase();
    if (!country) { toast(L.needCountry, 't-error'); return; }
    if (btn) btn.disabled = true;
    try {
      await apiReq('/seller/shipping-rates', 'POST', {
        country: country,
        base_usd: parseFloat(v('sr-base')) || 0,
        per_kg_usd: parseFloat(v('sr-perkg')) || 0,
        free_over_usd: v('sr-free') === '' ? null : parseFloat(v('sr-free')),
        min_days: v('sr-dmin') === '' ? null : parseInt(v('sr-dmin'), 10),
        max_days: v('sr-dmax') === '' ? null : parseInt(v('sr-dmax'), 10),
        carrier_hint: v('sr-carrier') || null
      }, true);
      toast(L.saved);
      load();
    } catch (e) {
      toast(e.message, 't-error');
      if (btn) btn.disabled = false;
    }
  };

  window.srDel = async function (id) {
    if (!confirm(L.confirmDel)) return;
    try {
      await apiReq('/seller/shipping-rates/' + id, 'DELETE', null, true);
      toast(L.deleted);
      load();
    } catch (e) { toast(e.message, 't-error'); }
  };

  await load();
});

/* ============================================================
   PHASE 1 - FRONTEND : ABO / MITGLIEDSCHAFT
   EINFUEGEN in app.js direkt NACH dem Block:
     route('seller-dashboard', async function () { ... });
   (also vor  route('seller-shop', ...) )
   ============================================================ */

/* ---------- ROUTE: SELLER BILLING (Abo) ---------- */
route('seller-billing', async function () {
  if (!S.user || (S.user.role !== 'seller' && S.user.role !== 'dealer' && S.user.role !== 'admin')) { render('login'); return; }
  if (S.support) { toast('Finanzbereich ist in der Support-Ansicht gesperrt', 't-error'); render('seller-dashboard'); return; }

  var L = {
    de: { title: 'Abo & Mitgliedschaft', sub: 'Waehle deinen Plan. Dein Shop ist nur mit aktivem Abo freigeschaltet.',
          current: 'Dein aktueller Plan', status: 'Status', limit: 'Produktlimit', products_word: 'Produkte',
          none: 'Du hast noch kein aktives Abo.', choose: 'Plan waehlen', per_month: 'pro Monat',
          subscribe: 'Abonnieren', manage: 'Abo verwalten', back: '< Zurueck zum Dashboard',
          loading: 'Laedt …', active: 'AKTIV', basic_feat: 'Bis zu 10 Produkte', pro_feat: 'Bis zu 100 Produkte',
          cancels: 'Gek\u00fcndigt \u2013 l\u00e4uft bis', renews: 'Verl\u00e4ngert sich automatisch am', flexible: 'Monatlich k\u00fcndbar \u00b7 keine Mindestlaufzeit',
          err: 'Etwas ist schiefgelaufen. Bitte erneut versuchen.' },
    en: { title: 'Subscription & Membership', sub: 'Choose your plan. Your shop is only unlocked with an active subscription.',
          current: 'Your current plan', status: 'Status', limit: 'Product limit', products_word: 'products',
          none: 'You do not have an active subscription yet.', choose: 'Choose a plan', per_month: 'per month',
          subscribe: 'Subscribe', manage: 'Manage subscription', back: '< Back to dashboard',
          loading: 'Loading …', active: 'ACTIVE', basic_feat: 'Up to 10 products', pro_feat: 'Up to 100 products',
          cancels: 'Canceled \u2013 runs until', renews: 'Renews automatically on', flexible: 'Cancel monthly \u00b7 no minimum term',
          err: 'Something went wrong. Please try again.' },
    fr: { title: 'Abonnement', sub: 'Choisissez votre forfait. Votre boutique n\u2019est active qu\u2019avec un abonnement actif.',
          current: 'Votre forfait actuel', status: 'Statut', limit: 'Limite de produits', products_word: 'produits',
          none: 'Vous n\u2019avez pas encore d\u2019abonnement actif.', choose: 'Choisir un forfait', per_month: 'par mois',
          subscribe: 'S\u2019abonner', manage: 'G\u00e9rer l\u2019abonnement', back: '< Retour au tableau de bord',
          loading: 'Chargement …', active: 'ACTIF', basic_feat: 'Jusqu\u2019\u00e0 10 produits', pro_feat: 'Jusqu\u2019\u00e0 100 produits',
          cancels: 'R\u00e9sili\u00e9 \u2013 actif jusqu\u2019au', renews: 'Renouvellement automatique le', flexible: 'R\u00e9siliable chaque mois \u00b7 sans dur\u00e9e minimale',
          err: 'Une erreur est survenue. R\u00e9essayez.' },
    pt: { title: 'Subscri\u00e7\u00e3o', sub: 'Escolha o seu plano. A sua loja s\u00f3 fica ativa com uma subscri\u00e7\u00e3o ativa.',
          current: 'O seu plano atual', status: 'Estado', limit: 'Limite de produtos', products_word: 'produtos',
          none: 'Ainda n\u00e3o tem uma subscri\u00e7\u00e3o ativa.', choose: 'Escolher plano', per_month: 'por m\u00eas',
          subscribe: 'Subscrever', manage: 'Gerir subscri\u00e7\u00e3o', back: '< Voltar ao painel',
          loading: 'A carregar …', active: 'ATIVO', basic_feat: 'At\u00e9 10 produtos', pro_feat: 'At\u00e9 100 produtos',
          cancels: 'Cancelado \u2013 ativo at\u00e9', renews: 'Renova automaticamente a', flexible: 'Cancel\u00e1vel mensalmente \u00b7 sem per\u00edodo m\u00ednimo',
          err: 'Algo correu mal. Tente novamente.' },
    sw: { title: 'Usajili', sub: 'Chagua mpango wako. Duka lako linafunguliwa tu ukiwa na usajili hai.',
          current: 'Mpango wako wa sasa', status: 'Hali', limit: 'Kikomo cha bidhaa', products_word: 'bidhaa',
          none: 'Bado huna usajili hai.', choose: 'Chagua mpango', per_month: 'kwa mwezi',
          subscribe: 'Jisajili', manage: 'Dhibiti usajili', back: '< Rudi kwenye dashibodi',
          loading: 'Inapakia …', active: 'HAI', basic_feat: 'Hadi bidhaa 10', pro_feat: 'Hadi bidhaa 100',
          cancels: 'Imesitishwa \u2013 inaendelea hadi', renews: 'Inajirefusha kiotomatiki tarehe', flexible: 'Unaweza kusitisha kila mwezi \u00b7 hakuna muda wa chini',
          err: 'Hitilafu imetokea. Jaribu tena.' }
  };
  var x = L[S.lang] || L.en;

  // Geruest mit Lade-Hinweis sofort rendern
  var head = '<div class="page-wrap"><section class="section">'
    + '<div class="sec-hd" style="margin-bottom:1rem"><div class="sec-title">\uD83D\uDCB3 ' + esc(x.title) + '</div></div>'
    + '<div style="opacity:.75;font-size:.9rem;margin-bottom:1.5rem">' + esc(x.sub) + '</div>';
  $('content').innerHTML = head + '<div style="opacity:.6">' + esc(x.loading) + '</div></section></div>';

  // Status laden
  var st = null;
  try {
    st = await apiReq('/billing/status', 'GET', null, true);
  } catch (e) {
    $('content').innerHTML = head + '<div style="color:#dc2626">' + esc(x.err) + '</div>'
      + '<div style="margin-top:1.5rem"><a href="#" onclick="render(\'seller-dashboard\');return false">' + esc(x.back) + '</a></div>'
      + '</section></div>';
    return;
  }

  var h = head;

  // Aktueller Status
  if (st && st.hasAccess) {
    var planName = (st.plan === 'pro') ? 'Pro' : 'Basic';
    h += '<div style="margin-bottom:1.75rem;padding:1.1rem 1.25rem;background:var(--surface2);border-radius:10px;border-left:4px solid #16a34a">';
    h += '<div style="display:flex;align-items:center;gap:.6rem;margin-bottom:.5rem">';
    h += '<span style="font-weight:700;font-size:1.05rem">' + esc(x.current) + ': ' + planName + '</span>';
    h += '<span style="padding:.15rem .5rem;background:#16a34a;color:#fff;font-size:.65rem;border-radius:4px;font-weight:700;letter-spacing:.5px">' + esc(x.active) + '</span>';
    h += '</div>';
    h += '<div style="font-size:.88rem;opacity:.8">' + esc(x.limit) + ': ' + (st.productLimit || 0) + ' ' + esc(x.products_word) + ' \u00b7 ' + esc(x.status) + ': ' + esc(st.status || '') + '</div>';
    // Laufzeit-Hinweis: gekuendigt (laeuft aus) oder verlaengert sich automatisch
    var _end = null;
    if (st.currentPeriodEnd) {
      try { _end = new Date(st.currentPeriodEnd).toLocaleDateString(S.lang); } catch (e) { _end = String(st.currentPeriodEnd).slice(0, 10); }
    }
    if (st.cancelAtPeriodEnd) {
      h += '<div style="margin-top:.5rem;font-size:.88rem;color:#b45309;font-weight:600">\u23F3 ' + esc(x.cancels) + (_end ? ' ' + esc(_end) : '') + '</div>';
    } else if (_end) {
      h += '<div style="margin-top:.5rem;font-size:.88rem;opacity:.7">' + esc(x.renews) + ' ' + esc(_end) + '</div>';
    }
    h += '<div style="margin-top:.9rem"><button class="btn" onclick="sellerBillingPortal(this)" style="padding:.55rem 1rem;background:var(--a300);color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer">' + esc(x.manage) + '</button></div>';
    h += '</div>';
  } else {
    h += '<div style="margin-bottom:1.75rem;padding:1rem 1.25rem;background:var(--surface2);border-radius:10px;border-left:4px solid #f59e0b;font-size:.92rem">' + esc(x.none) + '</div>';
  }

  // Plan-Karten
  function planCard(plan, name, feat, current) {
    var isCurrent = current && st && st.hasAccess && st.plan === plan;
    var s = '<div style="padding:1.4rem;background:var(--surface2);border:2px solid ' + (isCurrent ? '#16a34a' : 'transparent') + ';border-radius:12px;display:flex;flex-direction:column;gap:.6rem">';
    s += '<div style="font-weight:800;font-size:1.2rem">' + esc(name) + '</div>';
    s += '<div style="font-size:.88rem;opacity:.8">' + esc(feat) + '</div>';
    s += '<div style="margin-top:auto;padding-top:.8rem">';
    if (isCurrent) {
      s += '<button class="btn" disabled style="width:100%;padding:.6rem;background:#16a34a;color:#fff;border:none;border-radius:8px;font-weight:700;opacity:.7;cursor:default">\u2713 ' + esc(x.active) + '</button>';
    } else {
      s += '<button class="btn" onclick="sellerSubscribe(\'' + plan + '\',this)" style="width:100%;padding:.6rem;background:var(--a300);color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer">' + esc(x.subscribe) + '</button>';
    }
    s += '</div></div>';
    return s;
  }

  h += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:1rem;margin-bottom:1.75rem">';
  h += planCard('basic', 'Basic', x.basic_feat, true);
  h += planCard('pro', 'Pro', x.pro_feat, true);
  h += '</div>';

  h += '<div style="margin-bottom:1.5rem;font-size:.85rem;opacity:.65">\u2713 ' + esc(x.flexible) + '</div>';

  h += '<div><a href="#" onclick="render(\'seller-dashboard\');return false">' + esc(x.back) + '</a></div>';
  h += '</section></div>';
  $('content').innerHTML = h;
});

/* Globale Helfer: Abo starten / Kundenportal oeffnen (leiten zu Stripe weiter) */
async function sellerSubscribe(plan, btn) {
  try {
    if (btn) { btn.disabled = true; btn.style.opacity = '.6'; }
    var d = await apiReq('/billing/subscribe', 'POST', { plan: plan }, true);
    if (d && d.url) { location.href = d.url; return; }
    throw new Error('keine URL');
  } catch (e) {
    if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
    alert((e && e.message) ? e.message : 'Fehler');
  }
}

async function sellerBillingPortal(btn) {
  try {
    if (btn) { btn.disabled = true; btn.style.opacity = '.6'; }
    var d = await apiReq('/billing/portal', 'POST', {}, true);
    if (d && d.url) { location.href = d.url; return; }
    throw new Error('keine URL');
  } catch (e) {
    if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
    alert((e && e.message) ? e.message : 'Fehler');
  }
}
/* ============================================================
   PHASE A (2026-08) - FRONTEND : AUSZAHLUNG
   Afrika  -> pawaPay Mobile Money (Nummer + Land)
   Europa & weltweit -> Payoneer (E-Mail)
   Reines Speichern des Auszahlungsziels; die Auszahlung selbst
   laeuft als woechentlicher Batch (Phase E/F).
   ============================================================ */

// Fallback-Liste. Massgeblich ist st.pawapay_countries aus
// GET /seller/payout-account - so wirkt eine Freischaltung (z. B. Ghana)
// sofort, ohne dass diese Datei angefasst werden muss.
// Nicht enthalten: NG, GH (Entscheidung 08/2026) sowie AO, ZA
// (keine pawaPay-Abdeckung) -> diese Haendler zahlen wir per Payoneer aus.
var PAWAPAY_COUNTRIES = ['BJ','BF','CM','CD','CG','CI','GA','KE','MW','ML','MZ','RW','SN','SL','TZ','UG','ZM','ZW'];

/* ---------- ROUTE: SELLER PAYOUT (Mobile Money, Afrika) ---------- */
route('seller-payout', async function () {
  if (!S.user || (S.user.role !== 'seller' && S.user.role !== 'dealer' && S.user.role !== 'admin')) { render('login'); return; }
  if (S.support) { toast('Finanzbereich ist in der Support-Ansicht gesperrt', 't-error'); render('seller-dashboard'); return; }

  var L = {
    de: { title: 'Mobile-Money-Auszahlung', sub: 'Für Händler in Afrika: Hinterlege deine Mobile-Money-Nummer. Wir zahlen deinen Verkaufsanteil wöchentlich dorthin aus (abzüglich Provision).',
          connected: 'Auszahlungsziel verbunden', country: 'Land', phone: 'Mobile-Money-Nummer',
          phoneHint: 'Mit Ländervorwahl, ohne + (z. B. 243812345678)',
          bizname: 'Geschäftsname (optional)', save: 'Nummer speichern', update: 'Nummer aktualisieren',
          back: '< Zurück zur Auswahl', loading: 'Lädt …', required: 'Land und Nummer erforderlich' },
    en: { title: 'Mobile money payout', sub: 'For sellers in Africa: add your mobile money number. We pay your sales share there weekly (minus commission).',
          connected: 'Payout target connected', country: 'Country', phone: 'Mobile money number',
          phoneHint: 'With country code, no + (e.g. 243812345678)',
          bizname: 'Business name (optional)', save: 'Save number', update: 'Update number',
          back: '< Back to selection', loading: 'Loading …', required: 'Country and number required' },
    fr: { title: 'Versement mobile money', sub: 'Pour les vendeurs en Afrique : ajoutez votre num\u00e9ro mobile money. Nous y versons votre part chaque semaine (moins la commission).',
          connected: 'Cible de versement connect\u00e9e', country: 'Pays', phone: 'Num\u00e9ro mobile money',
          phoneHint: 'Avec indicatif pays, sans + (ex. 243812345678)',
          bizname: 'Nom commercial (option.)', save: 'Enregistrer le num\u00e9ro', update: 'Mettre \u00e0 jour',
          back: '< Retour \u00e0 la s\u00e9lection', loading: 'Chargement …', required: 'Pays et num\u00e9ro requis' },
    pt: { title: 'Pagamento mobile money', sub: 'Para vendedores em \u00c1frica: adicione o seu n\u00famero mobile money. Pagamos a\u00ed a sua parte semanalmente (menos comiss\u00e3o).',
          connected: 'Destino de pagamento ligado', country: 'Pa\u00eds', phone: 'N\u00famero mobile money',
          phoneHint: 'Com indicativo do pa\u00eds, sem + (ex. 243812345678)',
          bizname: 'Nome comercial (opcional)', save: 'Guardar n\u00famero', update: 'Atualizar n\u00famero',
          back: '< Voltar \u00e0 sele\u00e7\u00e3o', loading: 'A carregar …', required: 'Pa\u00eds e n\u00famero obrigat\u00f3rios' },
    sw: { title: 'Malipo ya mobile money', sub: 'Kwa wauzaji Afrika: weka namba yako ya mobile money. Tunalipa sehemu yako ya mauzo hapo kila wiki (ukiondoa kamisheni).',
          connected: 'Akaunti ya malipo imeunganishwa', country: 'Nchi', phone: 'Namba ya mobile money',
          phoneHint: 'Na msimbo wa nchi, bila + (mf. 243812345678)',
          bizname: 'Jina la biashara (hiari)', save: 'Hifadhi namba', update: 'Sasisha namba',
          back: '< Rudi kwenye chaguo', loading: 'Inapakia …', required: 'Nchi na namba zinahitajika' }
  };
  var x = L[S.lang] || L.en;

  var head = '<div class="page-wrap"><section class="section">'
    + '<div class="sec-hd" style="margin-bottom:1rem"><div class="sec-title">\uD83D\uDCF1 ' + esc(x.title) + '</div></div>'
    + '<div style="opacity:.75;font-size:.9rem;margin-bottom:1.5rem;max-width:560px;line-height:1.5">' + esc(x.sub) + '</div>';
  $('content').innerHTML = head + '<div style="opacity:.6">' + esc(x.loading) + '</div></section></div>';

  var st = null;
  try { st = await apiReq('/seller/payout-account', 'GET', null, true); } catch (e) {}
  var pp = (st && st.pawapay) || null;

  var h = head;
  if (pp && pp.connected && pp.account) {
    var meta = pp.account.meta || {};
    h += '<div style="margin-bottom:1.5rem;padding:1rem 1.25rem;background:var(--surface2);border-radius:10px;border-left:4px solid #16a34a">';
    h += '<div style="font-weight:700;margin-bottom:.3rem">\u2713 ' + esc(x.connected) + '</div>';
    h += '<div style="font-size:.85rem;opacity:.8">+' + esc(pp.account.external_id || '') + (meta.country ? ' \u00b7 ' + esc(meta.country) : '') + '</div>';
    h += '</div>';
  }

  // Laenderliste lokalisiert; Quelle ist der Server, Fallback die Konstante.
  var ccList = (st && Array.isArray(st.pawapay_countries) && st.pawapay_countries.length)
    ? st.pawapay_countries : PAWAPAY_COUNTRIES;
  var dn = null; try { dn = new Intl.DisplayNames([S.lang], { type: 'region' }); } catch (e) {}
  var opts = ccList.map(function (c) { var nm; try { nm = (dn && dn.of(c)) || c; } catch (e) { nm = c; } return { c: c, n: nm }; });
  opts.sort(function (a, b) { return a.n.localeCompare(b.n, S.lang); });
  var copts = opts.map(function (o) {
    var sel = (pp && pp.account && pp.account.meta && pp.account.meta.country === o.c) ? ' selected' : '';
    return '<option value="' + o.c + '"' + sel + '>' + esc(o.n) + '</option>';
  }).join('');

  var lbl = 'display:block;font-size:.78rem;font-weight:600;margin:0 0 .35rem;opacity:.85';
  var inp = 'width:100%;padding:.7rem .85rem;border:1px solid var(--line,#d8d8d8);border-radius:10px;background:var(--surface,#fff);color:inherit;box-sizing:border-box;font-size:.95rem';
  var grp = 'margin-bottom:1.05rem';

  h += '<div style="max-width:480px;padding:1.5rem;border:1px solid var(--line,#eaeaea);border-radius:14px;background:var(--surface,#fff);box-shadow:0 1px 3px rgba(0,0,0,.05)">';
  h += '<div style="display:inline-block;font-size:.72rem;font-weight:600;padding:.3rem .65rem;background:var(--surface2,#f3f4f6);border-radius:999px;margin-bottom:1.3rem">\uD83C\uDF0D Mobile Money \u00b7 pawaPay</div>';
  h += '<div style="' + grp + '"><label style="' + lbl + '">' + esc(x.country) + '</label><select id="po_country" style="' + inp + '">' + copts + '</select></div>';
  h += '<div style="' + grp + '"><label style="' + lbl + '">' + esc(x.phone) + '</label><input id="po_msisdn" style="' + inp + '" inputmode="numeric" placeholder="243812345678" value="' + esc((pp && pp.account && pp.account.external_id) || '') + '">';
  h += '<div style="font-size:.72rem;opacity:.55;margin-top:.3rem">' + esc(x.phoneHint) + '</div></div>';
  h += '<div style="' + grp + '"><label style="' + lbl + '">' + esc(x.bizname) + '</label><input id="po_name" style="' + inp + '" value="' + esc((S.user && S.user.name) || '') + '"></div>';
  h += '<button class="btn" onclick="sellerSavePayout(this)" style="width:100%;padding:.8rem 1.2rem;background:var(--a300,#e8552b);color:#fff;border:none;border-radius:10px;font-weight:700;cursor:pointer;font-size:.95rem;margin-top:.35rem">' + esc(pp && pp.connected ? x.update : x.save) + '</button>';
  h += '<div id="po_result" style="margin-top:.9rem;font-size:.9rem"></div>';
  h += '</div>';

  var _ppNote = ({
    de: 'Dein Land ist nicht dabei? In Nigeria, Ghana, Angola und S\u00fcdafrika zahlen wir \u00fcber Payoneer aus.',
    fr: 'Votre pays n\u2019est pas list\u00e9 ? Au Nigeria, Ghana, Angola et en Afrique du Sud, nous payons via Payoneer.',
    pt: 'O seu pa\u00eds n\u00e3o est\u00e1 na lista? Na Nig\u00e9ria, Gana, Angola e \u00c1frica do Sul pagamos via Payoneer.',
    es: '\u00bfTu pa\u00eds no aparece? En Nigeria, Ghana, Angola y Sud\u00e1frica pagamos v\u00eda Payoneer.'
  })[S.lang] || 'Country not listed? For Nigeria, Ghana, Angola and South Africa we pay out via Payoneer.';
  h += '<div style="max-width:480px;margin-top:1rem;font-size:.82rem;opacity:.7;line-height:1.5">' + esc(_ppNote) +
       ' <a href="#" onclick="render(\'seller-payoneer\');return false">Payoneer \u2192</a></div>';

  h += '<div style="margin-top:1.75rem"><a href="#" onclick="render(\'seller-payout-setup\');return false">' + esc(x.back) + '</a></div>';
  h += '</section></div>';
  $('content').innerHTML = h;
});

async function sellerSavePayout(btn) {
  var country = (document.getElementById('po_country') || {}).value;
  var num = ((document.getElementById('po_msisdn') || {}).value || '').replace(/[^0-9]/g, '');
  var name = ((document.getElementById('po_name') || {}).value || '').trim();
  var out = document.getElementById('po_result');
  if (!country || num.length < 8) {
    if (out) { out.style.color = '#dc2626'; out.textContent = (S.lang === 'de' ? 'Land und g\u00fcltige Nummer erforderlich' : 'Country and valid number required'); }
    return;
  }
  try {
    if (btn) { btn.disabled = true; btn.style.opacity = '.6'; }
    var d = await apiReq('/seller/payout-account', 'POST',
      { type: 'pawapay', msisdn: num, country: country, business_name: name || undefined }, true);
    if (out) { out.style.color = '#16a34a'; out.textContent = '\u2713 +' + (d.msisdn || num) + ' (' + (d.country || country) + ')'; }
  } catch (e) {
    if (out) { out.style.color = '#dc2626'; out.textContent = (e && e.message) ? e.message : 'Fehler'; }
  } finally {
    if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
  }
}

/* ---------- ROUTE: SELLER PAYONEER (Europa & weltweit) ---------- */
/* Seit 2026-08 laeuft die Payoneer-Auszahlung als Bankkonto-Zahllauf.
   Eine E-Mail reicht dafuer NICHT - die Zahldatei braucht Kontoinhaber,
   Kontonummer/IBAN, Bankland und Bankwaehrung. */
route('seller-payoneer', async function () {
  if (!S.user || (S.user.role !== 'seller' && S.user.role !== 'dealer' && S.user.role !== 'admin')) { render('login'); return; }
  if (S.support) { toast('Finanzbereich ist in der Support-Ansicht gesperrt', 't-error'); render('seller-dashboard'); return; }

  var L = {
    de: { title: 'Payoneer-Auszahlung', sub: 'Für Händler in Europa und weltweit: Hinterlege dein Bankkonto. Wir überweisen deinen Verkaufsanteil wöchentlich über Payoneer dorthin.',
          connected: 'Auszahlungsziel hinterlegt', pending: 'Wird von Payoneer geprüft',
          holder: 'Kontoinhaber (genau wie bei der Bank)', account: 'IBAN oder Kontonummer',
          bcountry: 'Land der Bank', bcurrency: 'Währung des Kontos', email: 'Payoneer-E-Mail (optional)',
          bizname: 'Geschäftsname (optional)', save: 'Bankkonto speichern', update: 'Bankdaten aktualisieren',
          back: '< Zurück zur Auswahl', loading: 'Lädt …',
          curhelp: 'Wir zahlen aus unseren Guthaben in USD, EUR und GBP. Ein Konto in einer dieser Währungen wird automatisch bedient. Andere Währungen sind möglich, werden aber von Hand überwiesen und können länger dauern.',
          minhelp: 'Mindestauszahlung: {min} USD. Kleinere Beträge bleiben stehen und werden in der nächsten Auszahlung mitgezahlt.',
          feehelp: 'Die Überweisungsgebühr trägt AFCARPARTS. Du erhältst genau den Betrag, der in deinem Guthaben steht.',
          pendhelp: 'Neue Bankkonten müssen von Payoneer einmalig freigegeben werden. Bis dahin bleibt dein Guthaben stehen — es geht nichts verloren.',
          other: 'Andere Währung', warncur: 'Für diese Währung erfolgt die Auszahlung manuell.' },
    en: { title: 'Payoneer payout', sub: 'For sellers in Europe and worldwide: add your bank account. We transfer your sales share there weekly via Payoneer.',
          connected: 'Payout target saved', pending: 'Under review by Payoneer',
          holder: 'Account holder (exactly as at your bank)', account: 'IBAN or account number',
          bcountry: 'Bank country', bcurrency: 'Account currency', email: 'Payoneer email (optional)',
          bizname: 'Business name (optional)', save: 'Save bank account', update: 'Update bank details',
          back: '< Back to selection', loading: 'Loading …',
          curhelp: 'We pay from our USD, EUR and GBP balances. An account in one of these currencies is served automatically. Other currencies are possible but transferred manually and may take longer.',
          minhelp: 'Minimum payout: {min} USD. Smaller amounts stay in your balance and are included next time.',
          feehelp: 'AFCARPARTS covers the transfer fee. You receive exactly the amount shown in your balance.',
          pendhelp: 'New bank accounts must be approved by Payoneer once. Until then your balance stays put — nothing is lost.',
          other: 'Other currency', warncur: 'Payouts in this currency are made manually.' },
    fr: { title: 'Versement Payoneer', sub: 'Pour les vendeurs en Europe et dans le monde : ajoutez votre compte bancaire. Nous y versons votre part chaque semaine via Payoneer.',
          connected: 'Cible de versement enregistrée', pending: 'En cours de vérification par Payoneer',
          holder: 'Titulaire du compte (comme à la banque)', account: 'IBAN ou numéro de compte',
          bcountry: 'Pays de la banque', bcurrency: 'Devise du compte', email: 'E-mail Payoneer (option.)',
          bizname: 'Nom commercial (option.)', save: 'Enregistrer le compte', update: 'Mettre à jour',
          back: '< Retour à la sélection', loading: 'Chargement …',
          curhelp: 'Nous payons depuis nos soldes USD, EUR et GBP. Un compte dans l\u2019une de ces devises est servi automatiquement. Les autres devises sont possibles mais virées manuellement.',
          minhelp: 'Versement minimum : {min} USD. Les montants inférieurs restent sur votre solde.',
          feehelp: 'AFCARPARTS prend en charge les frais de virement. Vous recevez exactement le montant affiché.',
          pendhelp: 'Les nouveaux comptes doivent être validés une fois par Payoneer. D\u2019ici là, votre solde est conservé.',
          other: 'Autre devise', warncur: 'Les versements dans cette devise sont effectués manuellement.' },
    pt: { title: 'Pagamento Payoneer', sub: 'Para vendedores na Europa e no mundo: adicione a sua conta bancária. Pagamos aí a sua parte semanalmente via Payoneer.',
          connected: 'Destino de pagamento guardado', pending: 'Em verificação pela Payoneer',
          holder: 'Titular da conta (como no banco)', account: 'IBAN ou número de conta',
          bcountry: 'País do banco', bcurrency: 'Moeda da conta', email: 'E-mail Payoneer (opcional)',
          bizname: 'Nome comercial (opcional)', save: 'Guardar conta bancária', update: 'Atualizar dados',
          back: '< Voltar à seleção', loading: 'A carregar …',
          curhelp: 'Pagamos a partir dos nossos saldos em USD, EUR e GBP. Uma conta numa destas moedas é servida automaticamente.',
          minhelp: 'Pagamento mínimo: {min} USD. Valores inferiores ficam no seu saldo.',
          feehelp: 'A AFCARPARTS suporta a taxa de transferência. Recebe exatamente o valor apresentado.',
          pendhelp: 'Novas contas bancárias têm de ser aprovadas uma vez pela Payoneer. Até lá o seu saldo mantém-se.',
          other: 'Outra moeda', warncur: 'Os pagamentos nesta moeda são feitos manualmente.' },
    sw: { title: 'Malipo ya Payoneer', sub: 'Kwa wauzaji Ulaya na duniani kote: weka akaunti yako ya benki. Tunatuma sehemu yako ya mauzo hapo kila wiki kupitia Payoneer.',
          connected: 'Akaunti ya malipo imehifadhiwa', pending: 'Inakaguliwa na Payoneer',
          holder: 'Mmiliki wa akaunti (kama benki)', account: 'IBAN au namba ya akaunti',
          bcountry: 'Nchi ya benki', bcurrency: 'Sarafu ya akaunti', email: 'Barua pepe ya Payoneer (hiari)',
          bizname: 'Jina la biashara (hiari)', save: 'Hifadhi akaunti ya benki', update: 'Sasisha taarifa',
          back: '< Rudi kwenye chaguo', loading: 'Inapakia …',
          curhelp: 'Tunalipa kutoka salio letu la USD, EUR na GBP. Akaunti ya moja ya sarafu hizi hulipwa kiotomatiki.',
          minhelp: 'Malipo ya chini: {min} USD. Kiasi kidogo hubaki kwenye salio lako.',
          feehelp: 'AFCARPARTS hulipa ada ya uhamisho. Unapokea kiasi kamili kilichoonyeshwa.',
          pendhelp: 'Akaunti mpya za benki lazima zithibitishwe na Payoneer mara moja. Hadi hapo salio lako hubaki.',
          other: 'Sarafu nyingine', warncur: 'Malipo ya sarafu hii hufanywa kwa mkono.' }
  };
  var x = L[S.lang] || L.en;

  var head = '<div class="page-wrap"><section class="section">'
    + '<div class="sec-hd" style="margin-bottom:1rem"><div class="sec-title">\uD83C\uDF10 ' + esc(x.title) + '</div></div>'
    + '<div style="opacity:.75;font-size:.9rem;margin-bottom:1.5rem;max-width:600px;line-height:1.5">' + esc(x.sub) + '</div>';
  $('content').innerHTML = head + '<div style="opacity:.6">' + esc(x.loading) + '</div></section></div>';

  var st = null;
  try { st = await apiReq('/seller/payout-account', 'GET', null, true); } catch (e) {}
  var po = (st && st.payoneer) || null;
  var cfg = (st && st.payoneer_config) || null;
  var meta = (po && po.account && po.account.meta) || {};
  var minPayout = (cfg && cfg.min_payout != null) ? cfg.min_payout : 50;
  var balances = (cfg && cfg.balances && cfg.balances.length) ? cfg.balances : ['USD', 'EUR', 'GBP'];
  var blocked = (cfg && cfg.blocked_countries) || [];
  var unconfirmed = (cfg && cfg.unconfirmed_countries) || [];

  // Laenderliste: Marktplatz-Laender + gaengige Bankstandorte der Haendler.
  var CC = ['NG','GH','KE','ZA','CD','SN','CI','CM','TZ','UG','ZM','RW','BJ','BF','ML','TG','GA','CG','MW','MZ','SL','ZW','AO','NE','GN',
            'DE','FR','NL','BE','ES','IT','PT','AT','PL','IE','SE','DK','FI','GR','CZ','RO','GB','CH','NO',
            'US','CA','AE','TR','CN','HK','IN','SG','MY','BR','MX','AU','NZ','JP'];
  function cname(iso) {
    try { return new Intl.DisplayNames([S.lang || 'en'], { type: 'region' }).of(iso) || iso; }
    catch (e) { return iso; }
  }
  var ccList = CC.filter(function (c) { return blocked.indexOf(c) === -1; })
                 .map(function (c) { return { iso: c, name: cname(c) }; })
                 .sort(function (a, b) { return a.name.localeCompare(b.name); });

  var h = head;

  if (po && po.connected && po.account) {
    var isApproved = meta.approved === true;
    var col = isApproved ? '#16a34a' : '#d97706';
    h += '<div style="margin-bottom:1.25rem;padding:1rem 1.25rem;background:var(--surface2);border-radius:10px;border-left:4px solid ' + col + '">';
    h += '<div style="font-weight:700;margin-bottom:.3rem">' + (isApproved ? '\u2713 ' + esc(x.connected) : '\u23F3 ' + esc(x.pending)) + '</div>';
    h += '<div style="font-size:.85rem;opacity:.8">' + esc(meta.holder_name || '') + ' \u00B7 ' + esc(meta.bank_currency || '') + ' \u00B7 ' + esc(cname(meta.bank_country || '')) + '</div>';
    if (!isApproved) h += '<div style="font-size:.8rem;opacity:.75;margin-top:.5rem;line-height:1.45">' + esc(x.pendhelp) + '</div>';
    h += '</div>';
  }

  var lbl = 'display:block;font-size:.78rem;font-weight:600;margin:0 0 .35rem;opacity:.85';
  var inp = 'width:100%;padding:.7rem .85rem;border:1px solid var(--line,#d8d8d8);border-radius:10px;background:var(--surface,#fff);color:inherit;box-sizing:border-box;font-size:.95rem';
  var grp = 'margin-bottom:1.05rem';
  var hlp = 'font-size:.76rem;opacity:.7;margin-top:.35rem;line-height:1.45';

  h += '<div style="max-width:520px;padding:1.5rem;border:1px solid var(--line,#eaeaea);border-radius:14px;background:var(--surface,#fff);box-shadow:0 1px 3px rgba(0,0,0,.05)">';
  h += '<div style="display:inline-block;font-size:.72rem;font-weight:600;padding:.3rem .65rem;background:var(--surface2,#f3f4f6);border-radius:999px;margin-bottom:1.3rem">\uD83C\uDF10 Payoneer</div>';

  h += '<div style="' + grp + '"><label style="' + lbl + '">' + esc(x.holder) + '</label>'
     + '<input id="pn_holder" style="' + inp + '" value="' + esc(meta.holder_name || (S.user && S.user.name) || '') + '"></div>';

  h += '<div style="' + grp + '"><label style="' + lbl + '">' + esc(x.account) + '</label>'
     + '<input id="pn_account" style="' + inp + '" placeholder="DE00 0000 0000 0000 0000 00" value="' + esc(meta.bank_account || '') + '"></div>';

  h += '<div style="' + grp + '"><label style="' + lbl + '">' + esc(x.bcountry) + '</label><select id="pn_country" style="' + inp + '">';
  h += '<option value=""></option>';
  for (var i = 0; i < ccList.length; i++) {
    var sel = (meta.bank_country === ccList[i].iso) ? ' selected' : '';
    var warn = (unconfirmed.indexOf(ccList[i].iso) !== -1) ? ' \u26A0' : '';
    h += '<option value="' + ccList[i].iso + '"' + sel + '>' + esc(ccList[i].name) + warn + '</option>';
  }
  h += '</select></div>';

  h += '<div style="' + grp + '"><label style="' + lbl + '">' + esc(x.bcurrency) + '</label><select id="pn_currency" style="' + inp + '" onchange="pnCurChanged()">';
  h += '<option value=""></option>';
  for (var j = 0; j < balances.length; j++) {
    h += '<option value="' + balances[j] + '"' + (meta.bank_currency === balances[j] ? ' selected' : '') + '>' + balances[j] + '</option>';
  }
  var isOther = meta.bank_currency && balances.indexOf(meta.bank_currency) === -1;
  h += '<option value="__other"' + (isOther ? ' selected' : '') + '>' + esc(x.other) + '</option>';
  h += '</select>';
  h += '<input id="pn_currency_other" maxlength="3" placeholder="NGN" style="' + inp + ';margin-top:.5rem;display:' + (isOther ? 'block' : 'none') + '" value="' + esc(isOther ? meta.bank_currency : '') + '">';
  h += '<div id="pn_cur_warn" style="' + hlp + ';color:#d97706;display:' + (isOther ? 'block' : 'none') + '">' + esc(x.warncur) + '</div>';
  h += '<div style="' + hlp + '">' + esc(x.curhelp) + '</div></div>';

  h += '<div style="' + grp + '"><label style="' + lbl + '">' + esc(x.email) + '</label>'
     + '<input id="pn_email" type="email" style="' + inp + '" placeholder="name@example.com" value="' + esc(meta.payee_email || '') + '"></div>';

  h += '<div style="' + grp + '"><label style="' + lbl + '">' + esc(x.bizname) + '</label>'
     + '<input id="pn_name" style="' + inp + '" value="' + esc(meta.business_name || (S.user && S.user.name) || '') + '"></div>';

  h += '<button class="btn" onclick="sellerSavePayoneer(this)" style="width:100%;padding:.8rem 1.2rem;background:var(--a300,#e8552b);color:#fff;border:none;border-radius:10px;font-weight:700;cursor:pointer;font-size:.95rem;margin-top:.35rem">'
     + esc(po && po.connected ? x.update : x.save) + '</button>';
  h += '<div id="pn_result" style="margin-top:.9rem;font-size:.9rem"></div>';

  var changeHelp = {
    de: 'Du kannst deine Bankdaten jederzeit hier ändern. Nach einer Änderung muss Payoneer das neue Konto einmal freigeben — bis dahin bleibt dein Guthaben stehen und geht nicht verloren.',
    en: 'You can change your bank details here at any time. After a change, Payoneer must approve the new account once — until then your balance stays put and is not lost.',
    fr: 'Vous pouvez modifier vos coordonnées bancaires ici à tout moment. Après un changement, Payoneer doit valider le nouveau compte — votre solde est conservé jusque-là.',
    pt: 'Pode alterar os seus dados bancários aqui a qualquer momento. Após uma alteração, a Payoneer tem de aprovar a nova conta — até lá o seu saldo mantém-se.',
    sw: 'Unaweza kubadilisha taarifa zako za benki hapa wakati wowote. Baada ya mabadiliko, Payoneer lazima ithibitishe akaunti mpya — hadi hapo salio lako hubaki salama.'
  };
  h += '<div style="margin-top:1.1rem;padding-top:1.1rem;border-top:1px solid var(--line,#eee);' + hlp + '">'
     + '\u2139\uFE0F ' + esc(x.feehelp) + '<br>'
     + '\u2139\uFE0F ' + esc(String(x.minhelp).replace('{min}', String(minPayout))) + '<br>'
     + '\u2139\uFE0F ' + esc(changeHelp[S.lang] || changeHelp.en) + '</div>';
  h += '</div>';

  h += '<div style="margin-top:1.75rem"><a href="#" onclick="render(\'seller-payout-setup\');return false">' + esc(x.back) + '</a></div>';
  h += '</section></div>';
  $('content').innerHTML = h;
});

function pnCurChanged() {
  var sel = document.getElementById('pn_currency');
  var other = document.getElementById('pn_currency_other');
  var warn = document.getElementById('pn_cur_warn');
  var show = sel && sel.value === '__other';
  if (other) other.style.display = show ? 'block' : 'none';
  if (warn) warn.style.display = show ? 'block' : 'none';
}

async function sellerSavePayoneer(btn) {
  var gv = function (id) { return ((document.getElementById(id) || {}).value || '').trim(); };
  var holder = gv('pn_holder');
  var account = gv('pn_account').replace(/\s+/g, '').toUpperCase();
  var country = gv('pn_country').toUpperCase();
  var currency = gv('pn_currency');
  if (currency === '__other') currency = gv('pn_currency_other');
  currency = currency.toUpperCase();
  var email = gv('pn_email').toLowerCase();
  var name = gv('pn_name');
  var out = document.getElementById('pn_result');
  var de = (S.lang === 'de');

  function fail(msg) { if (out) { out.style.color = '#dc2626'; out.textContent = msg; } }

  if (holder.length < 2)      return fail(de ? 'Kontoinhaber erforderlich' : 'Account holder required');
  if (account.length < 5)     return fail(de ? 'IBAN oder Kontonummer erforderlich' : 'IBAN or account number required');
  if (!/^[A-Z]{2}$/.test(country))    return fail(de ? 'Land der Bank wählen' : 'Select bank country');
  if (!/^[A-Z]{3}$/.test(currency))   return fail(de ? 'Währung wählen (3 Buchstaben)' : 'Select currency (3 letters)');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail(de ? 'E-Mail ungültig' : 'Invalid email');

  try {
    if (btn) { btn.disabled = true; btn.style.opacity = '.6'; }
    var d = await apiReq('/seller/payout-account', 'POST', {
      type: 'payoneer',
      holder_name: holder,
      bank_account: account,
      bank_country: country,
      bank_currency: currency,
      payee_email: email || undefined,
      business_name: name || undefined
    }, true);
    if (out) {
      out.style.color = '#16a34a';
      out.textContent = '\u2713 ' + (de ? 'Gespeichert. Payoneer prüft das Konto.' : 'Saved. Payoneer is reviewing the account.');
    }
    setTimeout(function () { render('seller-payoneer'); }, 1200);
  } catch (e) {
    fail((e && e.message) ? e.message : 'Fehler');
  } finally {
    if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
  }
}

async function sellerSwitchPayout(provider, btn) {
  var out = document.getElementById('payoutSwitchMsg');
  var de = (S.lang === 'de');
  try {
    if (btn) { btn.disabled = true; btn.style.opacity = '.6'; }
    var d = await apiReq('/seller/payout-method', 'POST', { provider: provider }, true);
    if (out) {
      out.style.color = '#16a34a';
      out.textContent = '\u2713 ' + (de ? 'Umgestellt.' : 'Switched.') + (d.note ? ' ' + d.note : '');
    }
    setTimeout(function () { render('seller-payout-setup'); }, 1400);
  } catch (e) {
    if (out) { out.style.color = '#dc2626'; out.textContent = (e && e.message) || 'Fehler'; }
    if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
  }
}

/* ---------- ROUTE: ADMIN BUCHHALTUNG ---------- */
/* Liefert die Zahlen, die aus dem Marktplatz kommen, plus selbst erfasste
   Belege - als Grundlage fuer den Steuerberater. Ausdruecklich KEIN
   Jahresabschluss: Bankkonten, Anlagevermoegen, Eigenkapital und die
   Umsatzsteuerbehandlung der Verkaeufe stecken hier nicht drin. */
route('admin-accounting', async function () {
  if (!S.user || S.user.role !== 'admin') { render('login'); return; }

  var y = new Date().getFullYear();
  var from = window._accFrom || (y + '-01-01');
  var to = window._accTo || '';

  var head = '<div class="page-wrap"><section class="section">'
    + '<div class="sec-hd" style="margin-bottom:1rem"><div class="sec-title">\uD83D\uDCD2 Buchhaltung</div></div>';
  $('content').innerHTML = head + '<div style="opacity:.6">Lädt …</div></section></div>';

  var q = '?from=' + encodeURIComponent(from) + (to ? '&to=' + encodeURIComponent(to) : '');
  var rep = null, cats = null, entries = null, err = '';
  try { rep = await apiReq('/admin/accounting/report' + q, 'GET', null, true); }
  catch (e) { err = (e && e.message) || 'Fehler'; }
  try { cats = await apiReq('/admin/accounting/categories', 'GET', null, true); } catch (e) {}
  try { entries = await apiReq('/admin/accounting/entries' + q, 'GET', null, true); } catch (e) {}

  var h = head;
  if (err) {
    h += '<div style="color:#dc2626;margin-bottom:1rem">' + esc(err) + '</div>';
    h += '<div style="opacity:.75;font-size:.9rem">Falls die Tabelle noch fehlt: einmal <code>/api/migrate-accounting?secret=…</code> aufrufen.</div>';
    h += '</section></div>';
    $('content').innerHTML = h; return;
  }

  var CUR = (rep && rep.report_currency) || 'EUR';
  var card = 'padding:1.1rem 1.25rem;border:1px solid var(--line,#eaeaea);border-radius:12px;background:var(--surface,#fff);margin-bottom:1rem';
  var money = function (v) {
    return (Number(v) || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ' + CUR;
  };

  // --- Zeitraum ---
  h += '<div style="display:flex;gap:.6rem;align-items:center;flex-wrap:wrap;margin-bottom:1.25rem">';
  h += '<span style="font-size:.82rem;opacity:.7">Von</span><input id="accFrom" type="date" value="' + esc(from) + '" style="padding:.4rem .55rem;border:1px solid var(--line,#ddd);border-radius:8px">';
  h += '<span style="font-size:.82rem;opacity:.7">Bis</span><input id="accTo" type="date" value="' + esc(to) + '" style="padding:.4rem .55rem;border:1px solid var(--line,#ddd);border-radius:8px">';
  h += '<button class="btn" onclick="accFilter()" style="padding:.45rem .9rem;border-radius:8px;border:1px solid var(--line,#ddd);background:transparent;cursor:pointer">Zeitraum setzen</button>';
  h += '<button class="btn" onclick="window._accFrom=\'' + (y - 1) + '-01-01\';window._accTo=\'' + (y - 1) + '-12-31\';render(\'admin-accounting\')" style="padding:.45rem .9rem;border-radius:8px;border:1px solid var(--line,#ddd);background:transparent;cursor:pointer">' + (y - 1) + '</button>';
  h += '<button class="btn" onclick="window._accFrom=\'' + y + '-01-01\';window._accTo=\'\';render(\'admin-accounting\')" style="padding:.45rem .9rem;border-radius:8px;border:1px solid var(--line,#ddd);background:transparent;cursor:pointer">' + y + '</button>';
  h += '</div>';

  var m = rep.marketplace || {};

  // --- Warnhinweis oben ---
  h += '<div style="' + card + ';border-left:4px solid #d97706;background:var(--surface2,#fdf9f3)">';
  h += '<div style="font-weight:700;margin-bottom:.4rem">Das ist kein Jahresabschluss</div>';
  h += '<div style="font-size:.85rem;line-height:1.55;opacity:.85">Diese Auswertung zeigt nur, was der Marktplatz kennt. Eine Bilanz nach § 266 HGB umfasst das gesamte Unternehmen; die Übermittlung ans Finanzamt läuft als E-Bilanz nach § 5b EStG im XBRL-Format. Gib die Exporte deinem Steuerberater — die Zuordnung zu Konten und der Abschluss gehören in dessen Software.</div>';
  h += '</div>';

  // --- Marktplatz-Zahlen ---
  h += '<div style="' + card + '">';
  h += '<div style="font-weight:700;margin-bottom:.2rem">Aus dem Marktplatz</div>';
  h += '<div style="font-size:.8rem;opacity:.7;margin-bottom:.9rem">' + (m.order_count || 0) + ' bezahlte Bestellungen · umgerechnet ' + esc(m.base_currency || '') + ' → ' + esc(CUR) + ' zum Kurs ' + (m.base_to_report_rate || 1).toLocaleString('de-DE') + '</div>';

  var rows = [
    ['Bruttowarenwert (GMV)', m.gmv, 'Kein Umsatz der Plattform — nur zur Einordnung', '#6b7280'],
    ['Provisionsertrag', m.commission, 'Das ist dein Ertrag', '#16a34a'],
    ['Händleranteil', m.merchant_share, 'Durchlaufender Posten, kein Umsatz', '#6b7280'],
    ['davon offen (Verbindlichkeit)', m.liability_open, 'Schuld gegenüber Händlern zum Stichtag', '#d97706'],
    ['davon ausgezahlt', m.paid_out, '', '#6b7280']
  ];
  h += '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:.9rem">';
  rows.forEach(function (r) {
    h += '<tr style="border-top:1px solid var(--line,#f0f0f0)">'
       + '<td style="padding:.55rem .3rem"><div style="font-weight:600">' + esc(r[0]) + '</div>'
       + (r[2] ? '<div style="font-size:.75rem;opacity:.6">' + esc(r[2]) + '</div>' : '') + '</td>'
       + '<td style="padding:.55rem .3rem;text-align:right;font-weight:700;color:' + r[3] + ';white-space:nowrap">' + money(r[1]) + '</td></tr>';
  });
  h += '</table></div>';

  if (m.fx_incomplete) {
    h += '<div style="margin-top:.7rem;font-size:.82rem;color:#dc2626">\u26A0 Es sind Bestellungen ohne ermittelten Wechselkurs enthalten. Die Summen sind unvollständig.</div>';
  }
  if (m.has_legacy_fx) {
    h += '<div style="margin-top:.5rem;font-size:.82rem;color:#d97706">\u26A0 Altbestellungen mit Kurs 1 (fx_source=legacy) sind enthalten.</div>';
  }
  h += '</div>';

  // --- Ergebnis ---
  var r2 = rep.result || {};
  h += '<div style="' + card + '">';
  h += '<div style="font-weight:700;margin-bottom:.75rem">Vorläufige Übersicht</div>';
  h += '<div style="display:flex;gap:1rem;flex-wrap:wrap">';
  [['Erträge', r2.income_total, '#16a34a'], ['Aufwendungen', r2.expense_total, '#dc2626'], ['Überschuss', r2.surplus, r2.surplus >= 0 ? '#16a34a' : '#dc2626']].forEach(function (x) {
    h += '<div style="flex:1;min-width:150px"><div style="font-size:.75rem;opacity:.7;text-transform:uppercase;letter-spacing:.04em">' + esc(x[0]) + '</div>'
       + '<div style="font-size:1.3rem;font-weight:700;color:' + x[2] + ';margin-top:.2rem">' + money(x[1]) + '</div></div>';
  });
  h += '</div>';
  h += '<div style="margin-top:.9rem;padding-top:.8rem;border-top:1px solid var(--line,#eee);font-size:.78rem;opacity:.7;line-height:1.5">Nicht enthalten: ' + esc((rep.not_included || []).join(' · ')) + '</div>';
  h += '</div>';

  // --- Beleg erfassen ---
  var catList = (cats && cats.categories) || [];
  h += '<div style="' + card + '">';
  h += '<div style="font-weight:700;margin-bottom:.75rem">Beleg erfassen</div>';
  var inp = 'padding:.55rem .7rem;border:1px solid var(--line,#ddd);border-radius:8px;background:var(--surface,#fff);color:inherit;font-size:.9rem;box-sizing:border-box';
  h += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:.7rem">';
  h += '<div><label style="font-size:.75rem;opacity:.7;display:block;margin-bottom:.25rem">Belegdatum</label><input id="acDate" type="date" style="' + inp + ';width:100%" value="' + new Date().toISOString().slice(0, 10) + '"></div>';
  h += '<div><label style="font-size:.75rem;opacity:.7;display:block;margin-bottom:.25rem">Kategorie</label><select id="acCat" style="' + inp + ';width:100%">';
  catList.forEach(function (c) {
    h += '<option value="' + esc(c.key) + '">' + esc(c.label) + (c.direction === 'income' ? ' (+)' : ' (−)') + '</option>';
  });
  h += '</select></div>';
  h += '<div><label style="font-size:.75rem;opacity:.7;display:block;margin-bottom:.25rem">Betrag</label><input id="acAmount" type="number" step="0.01" min="0" placeholder="0,00" style="' + inp + ';width:100%"></div>';
  h += '<div><label style="font-size:.75rem;opacity:.7;display:block;margin-bottom:.25rem">Währung</label><select id="acCur" style="' + inp + ';width:100%"><option>EUR</option><option>USD</option><option>GBP</option></select></div>';
  h += '<div><label style="font-size:.75rem;opacity:.7;display:block;margin-bottom:.25rem">USt-Satz %</label><input id="acVat" type="number" step="0.1" min="0" placeholder="19" style="' + inp + ';width:100%"></div>';
  h += '<div><label style="font-size:.75rem;opacity:.7;display:block;margin-bottom:.25rem">Belegnummer</label><input id="acRef" placeholder="RE-2026-0042" style="' + inp + ';width:100%"></div>';
  h += '</div>';
  h += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:.7rem;margin-top:.7rem">';
  h += '<div><label style="font-size:.75rem;opacity:.7;display:block;margin-bottom:.25rem">Buchungstext</label><input id="acDesc" placeholder="Bannerplatzierung Startseite, August" style="' + inp + ';width:100%"></div>';
  h += '<div><label style="font-size:.75rem;opacity:.7;display:block;margin-bottom:.25rem">Geschäftspartner</label><input id="acParty" placeholder="Firma / Person" style="' + inp + ';width:100%"></div>';
  h += '</div>';
  h += '<button class="btn" onclick="accAddEntry(this)" style="margin-top:.9rem;padding:.55rem 1.1rem;border-radius:8px;background:var(--a300,#e8552b);color:#fff;border:none;font-weight:600;cursor:pointer">Buchen</button>';
  h += '<span id="acMsg" style="margin-left:.8rem;font-size:.85rem"></span>';
  h += '<div style="margin-top:.7rem;font-size:.76rem;opacity:.65;line-height:1.5">Der Betrag wird als Bruttobetrag verstanden. Buchungen lassen sich nicht ändern oder löschen — Korrekturen laufen als Storno. Das ist die Anforderung aus § 146 Abs. 4 AO.</div>';
  h += '</div>';

  // --- Journal ---
  var list = (entries && entries.entries) || [];
  h += '<div style="' + card + '">';
  h += '<div style="font-weight:700;margin-bottom:.75rem">Buchungsjournal (' + list.length + ')</div>';
  if (!list.length) {
    h += '<div style="opacity:.7;font-size:.9rem">Noch keine Belege im Zeitraum erfasst.</div>';
  } else {
    h += '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:.85rem">';
    h += '<tr style="text-align:left;opacity:.7;font-size:.75rem"><th style="padding:.35rem">Nr</th><th style="padding:.35rem">Datum</th><th style="padding:.35rem">Text</th><th style="padding:.35rem">Kategorie</th><th style="padding:.35rem;text-align:right">Betrag</th><th></th></tr>';
    list.forEach(function (e) {
      var storno = !!e.reverses_id;
      var cancelled = !!e.reversed_by_id;
      var sign = e.direction === 'income' ? '+' : '−';
      var style = cancelled ? 'opacity:.45;text-decoration:line-through' : (storno ? 'opacity:.7' : '');
      h += '<tr style="border-top:1px solid var(--line,#f0f0f0);' + style + '">';
      h += '<td style="padding:.45rem .35rem">#' + e.id + '</td>';
      h += '<td style="padding:.45rem .35rem;white-space:nowrap">' + esc(String(e.entry_date).slice(0, 10)) + '</td>';
      h += '<td style="padding:.45rem .35rem">' + esc(e.description) + (e.counterparty ? '<div style="font-size:.72rem;opacity:.6">' + esc(e.counterparty) + '</div>' : '') + '</td>';
      h += '<td style="padding:.45rem .35rem;font-size:.78rem;opacity:.75">' + esc(e.category) + '</td>';
      h += '<td style="padding:.45rem .35rem;text-align:right;white-space:nowrap;font-weight:600">' + sign + ' ' + money(Math.abs(Number(e.amount_report))) + '</td>';
      h += '<td style="padding:.45rem .35rem;text-align:right">';
      if (!cancelled && !storno) {
        h += '<button onclick="accReverse(' + e.id + ',this)" style="padding:.2rem .55rem;font-size:.72rem;border-radius:6px;border:1px solid var(--line,#ddd);background:transparent;cursor:pointer">Storno</button>';
      } else if (cancelled) {
        h += '<span style="font-size:.72rem;opacity:.6">storniert</span>';
      }
      h += '</td></tr>';
    });
    h += '</table></div>';
  }
  h += '</div>';

  // --- Export ---
  h += '<div style="' + card + '">';
  h += '<div style="font-weight:700;margin-bottom:.5rem">Export für den Steuerberater</div>';
  h += '<div style="font-size:.83rem;opacity:.75;margin-bottom:.9rem;line-height:1.5">Drei Dateien, alle als CSV mit Semikolon und deutschem Zahlenformat. Bewusst kein DATEV-EXTF: eine falsch erzeugte EXTF-Datei wird beim Import stillschweigend verworfen oder falsch verbucht. Diese Dateien kann jede Kanzlei mappen.</div>';
  var expq = q;
  [['summary', 'Zusammenfassung', 'Periodenübersicht mit Provision, Verbindlichkeit und erfassten Belegen'],
   ['orders', 'Provisionsnachweis', 'Jede Bestellposition einzeln, mit eingefrorenem Wechselkurs'],
   ['journal', 'Buchungsjournal', 'Alle erfassten Belege inklusive Stornos']].forEach(function (x) {
    h += '<div style="display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:.55rem 0;border-top:1px solid var(--line,#f0f0f0);flex-wrap:wrap">';
    h += '<div><div style="font-weight:600">' + esc(x[1]) + '</div><div style="font-size:.78rem;opacity:.65">' + esc(x[2]) + '</div></div>';
    h += '<button class="btn" onclick="downloadCsv(\'/admin/accounting/export' + expq + '&format=' + x[0] + '\',\'' + x[0] + '.csv\',this)" style="padding:.4rem .85rem;border-radius:8px;border:1px solid var(--line,#ddd);background:transparent;cursor:pointer;font-size:.85rem;white-space:nowrap">\u2b07 CSV</button>';
    h += '</div>';
  });
  h += '</div>';

  h += '<div style="margin-top:1.5rem"><a href="#" onclick="render(\'admin-dashboard\');return false">< Zurück zum Admin-Bereich</a></div>';
  h += '</section></div>';
  $('content').innerHTML = h;
});

function accFilter() {
  window._accFrom = ((document.getElementById('accFrom') || {}).value || '');
  window._accTo = ((document.getElementById('accTo') || {}).value || '');
  render('admin-accounting');
}

async function accAddEntry(btn) {
  var gv = function (id) { return ((document.getElementById(id) || {}).value || '').trim(); };
  var msg = document.getElementById('acMsg');
  var set = function (t, c) { if (msg) { msg.textContent = t; msg.style.color = c; } };

  var body = {
    entry_date: gv('acDate'),
    category: gv('acCat'),
    amount: gv('acAmount'),
    currency: gv('acCur'),
    description: gv('acDesc'),
    counterparty: gv('acParty') || undefined,
    doc_ref: gv('acRef') || undefined,
    vat_rate: gv('acVat') === '' ? undefined : gv('acVat')
  };
  if (!body.amount || Number(body.amount) <= 0) return set('Betrag fehlt', '#dc2626');
  if (!body.description) return set('Buchungstext fehlt', '#dc2626');

  try {
    if (btn) { btn.disabled = true; btn.style.opacity = '.6'; }
    var d = await apiReq('/admin/accounting/entries', 'POST', body, true);
    set('\u2713 Gebucht als #' + d.entry.id, '#16a34a');
    setTimeout(function () { render('admin-accounting'); }, 900);
  } catch (e) {
    set((e && e.message) || 'Fehler', '#dc2626');
  } finally {
    if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
  }
}

async function accReverse(id, btn) {
  var reason = prompt('Grund für den Storno von Buchung #' + id + ':', '');
  if (reason === null) return;
  try {
    if (btn) btn.disabled = true;
    await apiReq('/admin/accounting/entries/' + id + '/reverse', 'POST', { reason: reason }, true);
    toast('Storno gebucht', 't-ok');
    render('admin-accounting');
  } catch (e) {
    toast((e && e.message) || 'Fehler', 't-error');
    if (btn) btn.disabled = false;
  }
}

/* ---------- ROUTE: ADMIN AUSZAHLUNGEN ---------- */
route('admin-payouts', async function () {
  if (!S.user || S.user.role !== 'admin') { render('login'); return; }

  var head = '<div class="page-wrap"><section class="section">'
    + '<div class="sec-hd" style="margin-bottom:1rem"><div class="sec-title">\uD83D\uDCB8 Auszahlungen</div></div>';
  $('content').innerHTML = head + '<div style="opacity:.6">Lädt …</div></section></div>';

  var pend = null, pn = null, pp = null, pe = null, err = '';
  try { pend = await apiReq('/admin/payouts/pending', 'GET', null, true); }
  catch (e) { err = (e && e.message) || 'Fehler'; }
  try { pn = await apiReq('/admin/payouts/payoneer', 'GET', null, true); } catch (e) {}
  try { pp = await apiReq('/admin/payouts/pawapay', 'GET', null, true); } catch (e) {}
  try { pe = await apiReq('/admin/payouts/payees', 'GET', null, true); } catch (e) {}

  window._admPayouts = pend;

  var h = head;
  if (err) {
    h += '<div style="color:#dc2626">' + esc(err) + '</div></section></div>';
    $('content').innerHTML = h; return;
  }

  var card = 'padding:1.1rem 1.25rem;border:1px solid var(--line,#eaeaea);border-radius:12px;background:var(--surface,#fff);margin-bottom:1rem';
  var all = (pend && pend.payouts) || [];

  // --- Überblick ---
  var byMethod = {};
  all.forEach(function (p) {
    var m = p.method || 'offen';
    if (!byMethod[m]) byMethod[m] = { n: 0, sum: 0 };
    byMethod[m].n++; byMethod[m].sum += Number(p.amount) || 0;
  });
  h += '<div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-bottom:1.5rem">';
  Object.keys(byMethod).forEach(function (m) {
    h += '<div style="' + card + ';margin:0;min-width:150px">'
       + '<div style="font-size:.75rem;opacity:.7;text-transform:uppercase;letter-spacing:.04em">' + esc(m) + '</div>'
       + '<div style="font-size:1.35rem;font-weight:700;margin-top:.25rem">' + byMethod[m].sum.toFixed(2) + '</div>'
       + '<div style="font-size:.78rem;opacity:.65">' + byMethod[m].n + ' Händler</div></div>';
  });
  if (!all.length) h += '<div style="opacity:.6">Keine offenen Auszahlungen.</div>';
  h += '</div>';

  // --- Payoneer-Zahllauf ---
  h += '<div style="' + card + '">';
  h += '<div style="font-weight:700;margin-bottom:.75rem">\uD83C\uDF10 Payoneer-Zahllauf</div>';
  if (!pn) {
    h += '<div style="opacity:.7;font-size:.9rem">Payoneer-Adapter nicht erreichbar.</div>';
  } else {
    var bs = pn.batches || [];
    if (!bs.length) {
      h += '<div style="opacity:.7;font-size:.9rem">Aktuell keine auszahlbaren Posten.</div>';
    } else {
      h += '<div style="font-size:.85rem;opacity:.8;margin-bottom:.75rem">Datei herunterladen, in Payoneer unter <b>Zahlen \u2192 Zahllauf</b> hochladen, danach hier als bezahlt markieren.</div>';
      bs.forEach(function (b) {
        h += '<div style="display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.6rem 0;border-top:1px solid var(--line,#eee);flex-wrap:wrap">';
        var names = (b.merchants || []).map(function (x) {
          return (typeof x === 'object') ? (x.seller || ('#' + x.merchant_id)) : ('#' + x);
        });
        h += '<div style="min-width:240px"><div style="font-weight:600">' + esc(b.ref) + '</div>'
           + '<div style="font-size:.8rem;opacity:.7">' + b.rows + ' Zeilen \u00B7 ' + b.total.toFixed(2) + ' ' + esc(b.currency) + '</div>'
           + (names.length ? '<div style="font-size:.76rem;opacity:.6;margin-top:.2rem">' + esc(names.join(', ')) + '</div>' : '')
           + '</div>';
        h += '<button class="btn" onclick="admDownloadPayoneer(' + b.number + ',\'' + esc(b.ref) + '\',\'' + esc(b.currency) + '\',this)" style="padding:.5rem .9rem;border-radius:8px;background:var(--a300,#e8552b);color:#fff;border:none;font-weight:600;font-size:.85rem;cursor:pointer">CSV laden</button>';
        h += '</div>';
      });
    }
    var bl = pn.blocked || [];
    if (bl.length) {
      h += '<div style="margin-top:1rem;padding-top:.85rem;border-top:1px solid var(--line,#eee)">';
      h += '<div style="font-weight:600;font-size:.85rem;margin-bottom:.5rem;color:#d97706">\u26A0 Nicht auszahlbar (' + bl.length + ')</div>';
      bl.forEach(function (b) {
        h += '<div style="font-size:.82rem;opacity:.85;padding:.3rem 0;display:flex;gap:.6rem;flex-wrap:wrap;align-items:center">'
           + '<b>' + esc(b.seller || ('#' + b.merchant_id)) + '</b> <span>' + (Number(b.amount) || 0).toFixed(2) + ' ' + esc(b.currency) + '</span>'
           + '<span style="opacity:.75">' + esc(b.reason) + '</span>';
        if (/freigegeben/i.test(b.reason || '')) {
          h += ' <button class="btn" onclick="admApprovePayoneer(' + b.merchant_id + ',this)" style="padding:.25rem .6rem;font-size:.75rem;border-radius:6px;border:1px solid var(--line,#ddd);background:transparent;cursor:pointer">Freigabe bestätigen</button>';
        }
        h += '</div>';
      });
      h += '</div>';
    }
  }
  h += '</div>';

  // --- pawaPay-Auszahlungen ---
  h += '<div style="' + card + '">';
  h += '<div style="font-weight:700;margin-bottom:.35rem">\uD83D\uDCF1 pawaPay \u2013 Mobile Money</div>';
  var ppRows = (pp && pp.rows) || [];
  if (!ppRows.length) {
    h += '<div style="opacity:.7;font-size:.9rem">Aktuell keine offenen Mobile-Money-Auszahlungen.</div>';
  } else {
    h += '<div style="font-size:.83rem;opacity:.75;margin-bottom:.9rem;line-height:1.5">Zahle <b>den fett markierten Betrag</b> \u2013 er ist mit dem Kurs gerechnet, zu dem auch kassiert wurde. Der Tageskurs steht nur zum Vergleich daneben.</div>';
    ppRows.forEach(function (p) {
      h += '<div style="border-top:1px solid var(--line,#eee);padding:.85rem 0">';
      h += '<div style="display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;align-items:flex-start">';
      h += '<div><div style="font-weight:600">' + esc(p.seller || p.business_name || ('Händler #' + p.merchant_id)) + ' <span style="font-weight:400;opacity:.55;font-size:.8rem">#' + p.merchant_id + '</span></div>'
         + '<div style="font-size:.8rem;opacity:.7;margin-top:.15rem">'
         + '<code style="font-family:ui-monospace,monospace">' + esc(p.msisdn || '\u2014') + '</code>'
         + '<button onclick="admCopy(' + JSON.stringify(String(p.msisdn || '')).replace(/"/g, '&quot;') + ',this)" style="margin-left:.4rem;padding:.1rem .4rem;font-size:.68rem;border-radius:5px;border:1px solid var(--line,#ddd);background:transparent;cursor:pointer;opacity:.7">kopieren</button>'
         + ' \u00B7 ' + esc(p.country || '') + ' \u00B7 ' + p.item_count + ' Posten</div></div>';
      h += '<div style="text-align:right">';
      if (p.amount_local != null && p.local_currency) {
        h += '<div style="font-size:1.15rem;font-weight:700">' + p.amount_local.toLocaleString('de-DE') + ' ' + esc(p.local_currency)
           + '<button onclick="admCopy(' + JSON.stringify(String(p.amount_local)).replace(/"/g, '&quot;') + ',this)" style="margin-left:.4rem;padding:.1rem .4rem;font-size:.68rem;font-weight:400;border-radius:5px;border:1px solid var(--line,#ddd);background:transparent;cursor:pointer;opacity:.7">kopieren</button></div>';
      }
      h += '<div style="font-size:.8rem;opacity:.7">entspricht ' + p.amount.toFixed(2) + ' ' + esc(p.ledger_currency) + '</div>';
      h += '</div></div>';

      // Kursvergleich
      if (p.weighted_rate) {
        h += '<div style="margin-top:.55rem;font-size:.8rem;display:flex;gap:1.2rem;flex-wrap:wrap;align-items:center">';
        h += '<span style="opacity:.8">Kassierter Kurs <b>' + p.weighted_rate.toLocaleString('de-DE') + '</b></span>';
        if (p.live_rate) {
          var dc = (p.diff_pct === null) ? 'inherit' : (Math.abs(p.diff_pct) >= 3 ? '#d97706' : 'inherit');
          h += '<span style="opacity:.65">Tageskurs ' + p.live_rate.toLocaleString('de-DE') + '</span>';
          if (p.diff_pct !== null) {
            h += '<span style="color:' + dc + '">' + (p.diff_pct > 0 ? '+' : '') + p.diff_pct.toFixed(2) + ' %'
               + (Math.abs(p.diff_pct) >= 3 ? ' \u2013 zum Tageskurs w\u00e4ren es ' + (p.amount_local_live || 0).toLocaleString('de-DE') + ' ' + esc(p.local_currency) : '')
               + '</span>';
          }
        }
        h += '</div>';
      }

      if (p.problems && p.problems.length) {
        h += '<div style="margin-top:.5rem;font-size:.8rem;color:#d97706">\u26A0 ' + esc(p.problems.join(' \u00B7 ')) + '</div>';
      }

      h += '<div style="margin-top:.6rem"><button class="btn" onclick="admSettlePayout(' + p.merchant_id + ',\'' + esc(p.ledger_currency) + '\',this)" style="padding:.35rem .8rem;font-size:.8rem;border-radius:7px;border:1px solid var(--line,#ddd);background:transparent;cursor:pointer">Als bezahlt markieren</button></div>';
      h += '</div>';
    });
  }
  h += '</div>';

  // --- Auszahlungsziele der Händler ---
  var payees = (pe && pe.payees) || [];
  h += '<div style="' + card + '">';
  h += '<div style="font-weight:700;margin-bottom:.35rem">\uD83C\uDFE6 Auszahlungsziele der Händler</div>';
  h += '<div style="font-size:.83rem;opacity:.75;margin-bottom:.9rem;line-height:1.5">Diese Daten trägst du bei Payoneer unter <b>Zahlen \u2192 Zahlen Sie auf das Bankkonto eines Empfängers \u2192 Kontakte verwalten</b> ein. Erst wenn Payoneer den Empfänger genehmigt hat, hier auf \u201eFreigabe bestätigen\u201c klicken.</div>';

  if (!payees.length) {
    h += '<div style="opacity:.7;font-size:.9rem">Noch kein Händler hat ein Auszahlungsziel hinterlegt.</div>';
  } else {
    payees.forEach(function (p) {
      var isPn = p.provider === 'payoneer';
      var ok = isPn ? p.approved : true;
      var col = ok ? '#16a34a' : '#d97706';
      h += '<div style="border-top:1px solid var(--line,#eee);padding:.85rem 0">';
      h += '<div style="display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;align-items:flex-start">';
      h += '<div style="min-width:220px">';
      h += '<div style="font-weight:600">#' + p.merchant_id + ' \u00B7 ' + esc(p.seller || p.email || '\u2014') + '</div>';
      h += '<div style="font-size:.78rem;opacity:.7;margin-top:.15rem">' + esc(p.provider)
         + (p.is_default ? ' \u00B7 Standardweg' : '') + '</div>';
      h += '</div>';
      h += '<div style="font-size:.78rem;font-weight:600;color:' + col + ';white-space:nowrap">'
         + (isPn ? (p.approved ? '\u2713 freigegeben' : '\u23F3 wartet auf Payoneer') : '\u2713 aktiv') + '</div>';
      h += '</div>';

      if (isPn) {
        var fields = [
          ['Kontoinhaber', p.holder_name],
          ['IBAN / Konto', p.bank_account],
          ['Bankland', p.bank_country],
          ['Währung', p.bank_currency],
          ['E-Mail', p.payee_email]
        ];
        h += '<div style="margin-top:.6rem;background:var(--surface2,#f7f7f8);border-radius:8px;padding:.7rem .85rem">';
        fields.forEach(function (f) {
          if (!f[1]) return;
          h += '<div style="display:flex;gap:.6rem;align-items:center;padding:.2rem 0;font-size:.85rem;flex-wrap:wrap">'
             + '<span style="opacity:.65;min-width:110px">' + esc(f[0]) + '</span>'
             + '<code style="font-family:ui-monospace,monospace;font-size:.85rem">' + esc(f[1]) + '</code>'
             + '<button onclick="admCopy(' + JSON.stringify(String(f[1])).replace(/"/g, '&quot;') + ',this)" style="padding:.1rem .45rem;font-size:.7rem;border-radius:5px;border:1px solid var(--line,#ddd);background:transparent;cursor:pointer;opacity:.7">kopieren</button>'
             + '</div>';
        });
        h += '</div>';
        if (p.data_problem) {
          h += '<div style="margin-top:.5rem;font-size:.8rem;color:#d97706">\u26A0 ' + esc(p.data_problem) + '</div>';
        }
        if (p.changed_at && !p.approved && (p.history || []).length) {
          h += '<div style="margin-top:.5rem;font-size:.8rem;color:#d97706">\u26A0 Bankdaten wurden am '
             + esc(new Date(p.changed_at).toLocaleDateString('de-DE'))
             + ' geändert. Die frühere Freigabe gilt nicht mehr — Empfänger bei Payoneer neu anlegen.</div>';
        }
        if ((p.history || []).length) {
          h += '<details style="margin-top:.5rem"><summary style="font-size:.78rem;opacity:.65;cursor:pointer">Frühere Bankdaten (' + p.history.length + ')</summary>';
          p.history.forEach(function (x) {
            h += '<div style="font-size:.76rem;opacity:.7;padding:.25rem 0 .25rem .8rem;border-left:2px solid var(--line,#eee);margin-top:.3rem">'
               + esc(x.holder_name || '—') + ' · <code style="font-family:ui-monospace,monospace">' + esc(x.bank_account || '—') + '</code> · '
               + esc(x.bank_currency || '') + ' · ersetzt am ' + esc(x.replaced_at ? new Date(x.replaced_at).toLocaleDateString('de-DE') : '—')
               + (x.was_approved ? ' · war freigegeben' : '') + '</div>';
          });
          h += '</details>';
        }
        h += '<div style="margin-top:.65rem;display:flex;gap:.5rem;flex-wrap:wrap">';
        if (!p.approved) {
          h += '<button class="btn" onclick="admApprovePayoneer(' + p.merchant_id + ',this)" style="padding:.35rem .8rem;font-size:.8rem;border-radius:7px;background:#16a34a;color:#fff;border:none;cursor:pointer;font-weight:600">Freigabe bestätigen</button>';
        } else {
          h += '<button class="btn" onclick="admRevokePayoneer(' + p.merchant_id + ',this)" style="padding:.35rem .8rem;font-size:.8rem;border-radius:7px;border:1px solid var(--line,#ddd);background:transparent;cursor:pointer">Freigabe zurücknehmen</button>';
        }
        h += '</div>';
      } else if (p.provider === 'pawapay') {
        h += '<div style="margin-top:.5rem;font-size:.85rem;opacity:.85">'
           + '<code style="font-family:ui-monospace,monospace">' + esc(p.msisdn || '') + '</code>'
           + ' \u00B7 ' + esc(p.country || '') + '</div>';
      }
      h += '</div>';
    });
  }
  h += '</div>';

  // --- Alle offenen Posten ---
  if (all.length) {
    h += '<div style="' + card + '">';
    h += '<div style="font-weight:700;margin-bottom:.75rem">Offene Posten je Händler</div>';
    h += '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:.88rem">';
    h += '<tr style="text-align:left;opacity:.7;font-size:.78rem"><th style="padding:.4rem .5rem">Händler</th><th style="padding:.4rem .5rem">Methode</th><th style="padding:.4rem .5rem">Ziel</th><th style="padding:.4rem .5rem">Posten</th><th style="padding:.4rem .5rem;text-align:right">Betrag</th><th></th></tr>';
    all.forEach(function (p) {
      h += '<tr style="border-top:1px solid var(--line,#eee)">';
      h += '<td style="padding:.5rem"><div style="font-weight:600">' + esc(p.seller || ('Händler #' + p.merchant_id)) + '</div><div style="font-size:.72rem;opacity:.6">#' + p.merchant_id + '</div></td>';
      h += '<td style="padding:.5rem">' + esc(p.method || '\u2014') + '</td>';
      h += '<td style="padding:.5rem;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(p.destination || '\u2014') + '</td>';
      h += '<td style="padding:.5rem">' + (p.item_count || 0) + '</td>';
      h += '<td style="padding:.5rem;text-align:right;font-weight:600">' + (Number(p.amount) || 0).toFixed(2) + ' ' + esc(p.currency) + '</td>';
      h += '<td style="padding:.5rem;text-align:right"><button class="btn" onclick="admSettlePayout(' + p.merchant_id + ',\'' + esc(p.currency) + '\',this)" style="padding:.3rem .7rem;font-size:.78rem;border-radius:6px;border:1px solid var(--line,#ddd);background:transparent;cursor:pointer">Bezahlt</button></td>';
      h += '</tr>';
    });
    h += '</table></div></div>';
  }

  h += '<div style="margin-top:1.5rem"><a href="#" onclick="render(\'admin-dashboard\');return false">< Zurück zum Admin-Bereich</a></div>';
  h += '</section></div>';
  $('content').innerHTML = h;
});

async function admDownloadPayoneer(batchNo, ref, currency, btn) {
  // Die API authentifiziert per Bearer-Token, deshalb kein direkter Link:
  // Datei mit Header holen und als Blob im Browser speichern.
  try {
    if (btn) { btn.disabled = true; btn.style.opacity = '.6'; }
    var res = await fetch(API + '/admin/payouts/payoneer?format=csv&batch=' + batchNo, {
      headers: { 'Authorization': 'Bearer ' + S.token }
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    var blob = await res.blob();
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'payoneer-' + String(currency).toLowerCase() + '-' + ref + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  } catch (e) {
    toast((e && e.message) || 'Download fehlgeschlagen', 't-error');
  } finally {
    if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
  }
}

function admCopy(text, btn) {
  try {
    navigator.clipboard.writeText(String(text));
    if (btn) {
      var old = btn.textContent;
      btn.textContent = '\u2713';
      setTimeout(function () { btn.textContent = old; }, 1200);
    }
  } catch (e) {
    toast('Kopieren nicht möglich', 't-error');
  }
}

async function admRevokePayoneer(merchantId, btn) {
  if (!confirm('Freigabe für Händler #' + merchantId + ' zurücknehmen?\n\nEr wird dann aus dem nächsten Zahllauf ausgeschlossen.')) return;
  try {
    if (btn) btn.disabled = true;
    await apiReq('/admin/payouts/payoneer/approve', 'POST', { merchant_id: merchantId, approved: false }, true);
    toast('Freigabe zurückgenommen', 't-ok');
    render('admin-payouts');
  } catch (e) {
    toast((e && e.message) || 'Fehler', 't-error');
    if (btn) btn.disabled = false;
  }
}

async function admApprovePayoneer(merchantId, btn) {
  if (!confirm('Bankkonto von Händler #' + merchantId + ' als von Payoneer freigegeben markieren?\n\nNur bestätigen, wenn Payoneer den Empfänger tatsächlich genehmigt hat — sonst wird die ganze Zahldatei beim Upload abgewiesen.')) return;
  try {
    if (btn) btn.disabled = true;
    await apiReq('/admin/payouts/payoneer/approve', 'POST', { merchant_id: merchantId }, true);
    toast('Freigabe gespeichert', 't-ok');
    render('admin-payouts');
  } catch (e) {
    toast((e && e.message) || 'Fehler', 't-error');
    if (btn) btn.disabled = false;
  }
}

async function admSettlePayout(merchantId, currency, btn) {
  var ref = prompt('Referenz der Zahlung (z. B. Batch-Nummer aus Payoneer):', '');
  if (ref === null) return;
  try {
    if (btn) btn.disabled = true;
    var d = await apiReq('/admin/payouts/settle', 'POST',
      { merchant_id: merchantId, currency: currency, reference: ref || undefined }, true);
    toast('Abgerechnet: ' + (d.settled_items || 0) + ' Posten', 't-ok');
    render('admin-payouts');
  } catch (e) {
    toast((e && e.message) || 'Fehler', 't-error');
    if (btn) btn.disabled = false;
  }
}

/* ============================================================
   PHASE 3b - FRONTEND : STRIPE-AUSZAHLUNG (Connect, EU/US/global)
   EINFUEGEN in app.js direkt NACH dem Block:
     route('seller-payout', ...) inkl. sellerLoadBanks / sellerSavePayout
   ============================================================ */

route('seller-stripe-connect', async function () {
  if (!S.user || (S.user.role !== 'seller' && S.user.role !== 'dealer' && S.user.role !== 'admin')) { render('login'); return; }
  if (S.support) { toast('Finanzbereich ist in der Support-Ansicht gesperrt', 't-error'); render('seller-dashboard'); return; }

  var L = {
    de: { title: 'Stripe-Auszahlung (EU/US)', sub: 'Für Händler außerhalb Afrikas: Konto über Stripe verbinden. Stripe übernimmt die Prüfung; dein Verkaufsanteil wird direkt dorthin ausgezahlt (abzgl. Provision).',
          country: 'Land', connect: 'Mit Stripe verbinden', resume: 'Onboarding fortsetzen',
          connected: 'Stripe-Konto verbunden', ready: 'Zahlungsbereit', pending: 'Onboarding noch nicht abgeschlossen',
          back: '< Zurück zum Dashboard', loading: 'Lädt …', err: 'Fehler' },
    en: { title: 'Stripe payout (EU/US)', sub: 'For sellers outside Africa: connect your account via Stripe. Stripe handles verification; your sales share is paid out there (minus commission).',
          country: 'Country', connect: 'Connect with Stripe', resume: 'Resume onboarding',
          connected: 'Stripe account connected', ready: 'Ready for payments', pending: 'Onboarding not finished yet',
          back: '< Back to dashboard', loading: 'Loading …', err: 'Error' },
    fr: { title: 'Versement Stripe (UE/US)', sub: 'Pour les vendeurs hors d\u2019Afrique : connectez votre compte via Stripe. Stripe g\u00e8re la v\u00e9rification ; votre part est vers\u00e9e l\u00e0 (moins la commission).',
          country: 'Pays', connect: 'Connecter avec Stripe', resume: 'Reprendre l\u2019inscription',
          connected: 'Compte Stripe connect\u00e9', ready: 'Pr\u00eat pour les paiements', pending: 'Inscription non termin\u00e9e',
          back: '< Retour au tableau de bord', loading: 'Chargement …', err: 'Erreur' },
    pt: { title: 'Pagamento Stripe (UE/EUA)', sub: 'Para vendedores fora de \u00c1frica: ligue a sua conta via Stripe. A Stripe trata da verifica\u00e7\u00e3o; a sua parte \u00e9 paga a\u00ed (menos comiss\u00e3o).',
          country: 'Pa\u00eds', connect: 'Ligar com Stripe', resume: 'Retomar registo',
          connected: 'Conta Stripe ligada', ready: 'Pronto para pagamentos', pending: 'Registo n\u00e3o conclu\u00eddo',
          back: '< Voltar ao painel', loading: 'A carregar …', err: 'Erro' },
    sw: { title: 'Malipo ya Stripe (EU/US)', sub: 'Kwa wauzaji nje ya Afrika: unganisha akaunti yako kupitia Stripe. Stripe hushughulikia uthibitishaji; sehemu yako hulipwa hapo (ukiondoa kamisheni).',
          country: 'Nchi', connect: 'Unganisha na Stripe', resume: 'Endelea na usajili',
          connected: 'Akaunti ya Stripe imeunganishwa', ready: 'Tayari kwa malipo', pending: 'Usajili haujakamilika',
          back: '< Rudi kwenye dashibodi', loading: 'Inapakia …', err: 'Hitilafu' }
  };
  var x = L[S.lang] || L.en;

  var head = '<div class="page-wrap"><section class="section">'
    + '<div class="sec-hd" style="margin-bottom:1rem"><div class="sec-title">\uD83C\uDF0D ' + esc(x.title) + '</div></div>'
    + '<div style="opacity:.75;font-size:.9rem;margin-bottom:1.5rem">' + esc(x.sub) + '</div>';
  $('content').innerHTML = head + '<div style="opacity:.6">' + esc(x.loading) + '</div></section></div>';

  var st = null;
  try { st = await apiReq('/seller/stripe-connect', 'GET', null, true); } catch (e) {}

  var h = head;

  if (st && st.connected) {
    h += '<div style="margin-bottom:1.5rem;padding:1rem 1.25rem;background:var(--surface2);border-radius:10px;border-left:4px solid #16a34a">';
    h += '<div style="font-weight:700;margin-bottom:.3rem">\u2713 ' + esc(x.connected) + '</div>';
    h += '<div style="font-size:.85rem;opacity:.8">' + esc(x.ready) + (st.account && st.account.country ? ' \u00b7 ' + esc(st.account.country) : '') + '</div>';
    h += '</div>';
  } else {
    var resume = !!(st && st.account && st.account.id); // Konto existiert, aber noch nicht fertig
    var lbl = 'display:block;font-size:.8rem;font-weight:600;margin:.9rem 0 .3rem';
    var inp = 'width:100%;max-width:420px;padding:.6rem;border:1px solid var(--line,#ccc);border-radius:8px;background:var(--surface,#fff);color:inherit;box-sizing:border-box';
    var countries = [['DE','Deutschland'],['AT','\u00d6sterreich'],['FR','France'],['NL','Nederland'],['ES','Espa\u00f1a'],['IT','Italia'],['GB','United Kingdom'],['US','United States'],['CA','Canada'],['JP','Japan'],['SG','Singapore'],['HK','Hong Kong'],['AU','Australia'],['NZ','New Zealand'],['AE','United Arab Emirates']];
    var copts = countries.map(function (c) { return '<option value="' + c[0] + '">' + esc(c[1]) + '</option>'; }).join('');

    if (resume) {
      h += '<div style="margin-bottom:1rem;padding:.8rem 1rem;background:var(--surface2);border-radius:10px;border-left:4px solid #f59e0b;font-size:.88rem">' + esc(x.pending) + '</div>';
    }
    h += '<div style="max-width:420px">';
    h += '<label style="' + lbl + '">' + esc(x.country) + '</label>';
    h += '<select id="sc_country" style="' + inp + '">' + copts + '</select>';
    h += '<div style="margin-top:1.1rem"><button class="btn" onclick="sellerStripeConnect(this)" style="padding:.6rem 1.2rem;background:#635bff;color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer">' + esc(resume ? x.resume : x.connect) + '</button></div>';
    h += '<div id="sc_result" style="margin-top:.9rem;font-size:.9rem"></div>';
    h += '</div>';
  }

  h += '<div style="margin-top:1.75rem"><a href="#" onclick="render(\'seller-dashboard\');return false">' + esc(x.back) + '</a></div>';
  h += '</section></div>';
  $('content').innerHTML = h;
});

async function sellerStripeConnect(btn) {
  var country = (document.getElementById('sc_country') || {}).value || 'DE';
  var out = document.getElementById('sc_result');
  try {
    if (btn) { btn.disabled = true; btn.style.opacity = '.6'; }
    var d = await apiReq('/seller/stripe-connect', 'POST', { country: country }, true);
    if (d && d.onboarding_url) { window.location.href = d.onboarding_url; return; }
    if (out) { out.style.color = '#dc2626'; out.textContent = (S.lang === 'de' ? 'Fehler' : 'Error'); }
  } catch (e) {
    if (out) { out.style.color = '#dc2626'; out.textContent = (e && e.message) ? e.message : 'Fehler'; }
  } finally {
    if (btn) { btn.disabled = false; btn.style.opacity = '1'; }
  }
}
/* ---------- ROUTE: SELLER PAYOUT SETUP (vereinheitlichte Auszahlung) ---------- */
/* ---------- CSV-DOWNLOAD MIT AUTHENTIFIZIERUNG ----------
   Ein einfaches <a href> traegt den Token nicht mit, deshalb holen wir
   die Datei per fetch und legen sie als Blob zum Download bereit. */
async function downloadCsv(path, filename, btn) {
  var old = btn ? btn.textContent : null;
  if (btn) { btn.disabled = true; btn.textContent = '\u2026'; }
  try {
    var h = { 'Accept-Language': S.lang };
    if (S.token) h['Authorization'] = 'Bearer ' + S.token;
    var res = await fetch(API + path, { headers: h });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    var blob = await res.blob();
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  } catch (e) {
    toast((e && e.message) ? e.message : 'Download fehlgeschlagen', 't-error');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = old; }
  }
}

function fmtMoney(v, cur) {
  var n = Number(v) || 0;
  try { return n.toLocaleString(numLocale(), { style: 'currency', currency: cur || 'USD' }); }
  catch (e) { return (cur || 'USD') + ' ' + n.toFixed(2); }
}

// Bucket-Datum je nach Raster lesbar machen.
function fmtBucket(iso, period) {
  var d = new Date(iso);
  if (isNaN(d)) return String(iso);
  try {
    if (period === 'year')    return String(d.getFullYear());
    if (period === 'quarter') return 'Q' + (Math.floor(d.getMonth() / 3) + 1) + ' ' + d.getFullYear();
    if (period === 'month')   return d.toLocaleDateString(S.lang, { year: 'numeric', month: 'long' });
    if (period === 'week')    return 'KW ' + d.toLocaleDateString(S.lang, { day: '2-digit', month: '2-digit', year: 'numeric' });
    return d.toLocaleDateString(S.lang, { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch (e) { return d.toISOString().slice(0, 10); }
}

/* ---------- ROUTE: HAENDLER-GUTHABEN & UMSATZ ---------- */
route('seller-earnings', async function () {
  if (!S.user || (S.user.role !== 'seller' && S.user.role !== 'dealer' && S.user.role !== 'admin')) { render('login'); return; }
  if (S.support) { toast('Finanzbereich ist in der Support-Ansicht gesperrt', 't-error'); render('seller-dashboard'); return; }

  var L = {
    de: { title: 'Guthaben & Umsatz', pending: 'Offenes Guthaben', pendingD: 'Wird beim n\u00e4chsten Auszahlungslauf \u00fcberwiesen',
          gross: 'Bruttoumsatz', comm: 'Provision', net: 'Deine Auszahlung', period: 'Zeitraum',
          day: 'T\u00e4glich', week: 'W\u00f6chentlich', month: 'Monatlich', quarter: 'Quartalsweise', year: 'J\u00e4hrlich',
          orders: 'Bestellungen', empty: 'Noch keine bezahlten Bestellungen in diesem Zeitraum.',
          dl: 'Als CSV herunterladen', back: '< Zur\u00fcck zum Dashboard', loading: 'L\u00e4dt \u2026',
          noPayout: 'Du hast noch kein Auszahlungsziel hinterlegt \u2013 dein Guthaben kann nicht \u00fcberwiesen werden.',
          setup: 'Jetzt einrichten' },
    en: { title: 'Balance & revenue', pending: 'Available balance', pendingD: 'Transferred with the next payout run',
          gross: 'Gross revenue', comm: 'Commission', net: 'Your payout', period: 'Period',
          day: 'Daily', week: 'Weekly', month: 'Monthly', quarter: 'Quarterly', year: 'Yearly',
          orders: 'Orders', empty: 'No paid orders in this period yet.',
          dl: 'Download as CSV', back: '< Back to dashboard', loading: 'Loading \u2026',
          noPayout: 'No payout destination set \u2013 your balance cannot be transferred.',
          setup: 'Set up now' },
    fr: { title: 'Solde & chiffre d\u2019affaires', pending: 'Solde disponible', pendingD: 'Vers\u00e9 lors du prochain paiement',
          gross: 'CA brut', comm: 'Commission', net: 'Votre versement', period: 'P\u00e9riode',
          day: 'Quotidien', week: 'Hebdomadaire', month: 'Mensuel', quarter: 'Trimestriel', year: 'Annuel',
          orders: 'Commandes', empty: 'Aucune commande pay\u00e9e sur cette p\u00e9riode.',
          dl: 'T\u00e9l\u00e9charger en CSV', back: '< Retour', loading: 'Chargement \u2026',
          noPayout: 'Aucune destination de versement \u2013 votre solde ne peut pas \u00eatre vers\u00e9.',
          setup: 'Configurer' },
    pt: { title: 'Saldo & faturamento', pending: 'Saldo dispon\u00edvel', pendingD: 'Transferido no pr\u00f3ximo pagamento',
          gross: 'Faturamento bruto', comm: 'Comiss\u00e3o', net: 'O seu pagamento', period: 'Per\u00edodo',
          day: 'Di\u00e1rio', week: 'Semanal', month: 'Mensal', quarter: 'Trimestral', year: 'Anual',
          orders: 'Encomendas', empty: 'Ainda sem encomendas pagas neste per\u00edodo.',
          dl: 'Descarregar CSV', back: '< Voltar', loading: 'A carregar \u2026',
          noPayout: 'Sem destino de pagamento \u2013 o saldo n\u00e3o pode ser transferido.',
          setup: 'Configurar agora' },
    sw: { title: 'Salio & mapato', pending: 'Salio lililopo', pendingD: 'Litatumwa katika malipo yajayo',
          gross: 'Mapato ghafi', comm: 'Kamisheni', net: 'Malipo yako', period: 'Kipindi',
          day: 'Kila siku', week: 'Kila wiki', month: 'Kila mwezi', quarter: 'Robo mwaka', year: 'Kila mwaka',
          orders: 'Maagizo', empty: 'Hakuna maagizo yaliyolipwa katika kipindi hiki.',
          dl: 'Pakua CSV', back: '< Rudi', loading: 'Inapakia \u2026',
          noPayout: 'Hakuna mahali pa malipo \u2013 salio lako haliwezi kutumwa.',
          setup: 'Sanidua sasa' }
  };
  var x = L[S.lang] || L.en;
  var period = (window._earnPeriod || 'month');

  var head = '<div class="page-wrap"><section class="section">'
    + '<div class="sec-hd" style="margin-bottom:1rem"><div class="sec-title">\ud83d\udcb0 ' + esc(x.title) + '</div></div>';
  $('content').innerHTML = head + '<div style="opacity:.6">' + esc(x.loading) + '</div></section></div>';

  var d = await apiReq('/seller/earnings?period=' + encodeURIComponent(period), 'GET', null, true)
    .catch(function (e) { return { error: e.message }; });

  var h = head;
  if (d && d.error) {
    h += '<div class="alert alert-error">' + esc(d.error) + '</div></section></div>';
    $('content').innerHTML = h; return;
  }

  // Offenes Guthaben gross oben - das ist die Zahl, die den Händler interessiert.
  var pend = (d.pending || []);
  var pendTotal = pend.reduce(function (s, p) { return s + (Number(p.amount) || 0); }, 0);
  var pendCur = pend.length ? pend[0].currency : 'USD';

  h += '<div style="display:flex;flex-wrap:wrap;gap:1rem;margin-bottom:1.5rem">';
  h += '<div style="flex:1;min-width:230px;padding:1.15rem 1.35rem;background:var(--surface2);border-radius:12px;border-left:4px solid #16a34a">'
     + '<div style="font-size:.78rem;opacity:.65;margin-bottom:.35rem">' + esc(x.pending) + '</div>'
     + '<div style="font-size:1.75rem;font-weight:700;line-height:1.15">' + esc(fmtMoney(pendTotal, pendCur)) + '</div>'
     + '<div style="font-size:.75rem;opacity:.6;margin-top:.35rem">' + esc(x.pendingD) + '</div></div>';
  h += '</div>';

  if (!d.payout_ready) {
    h += '<div style="padding:.9rem 1.1rem;background:var(--surface2);border-radius:10px;border-left:4px solid #dc2626;font-size:.88rem;margin-bottom:1.5rem;max-width:640px">'
       + '\u26a0\ufe0f ' + esc(x.noPayout) + ' <a href="#" onclick="render(\'seller-payout-setup\');return false">' + esc(x.setup) + ' \u2192</a></div>';
  }

  // Zeitraster
  var periods = [['day', x.day], ['week', x.week], ['month', x.month], ['quarter', x.quarter], ['year', x.year]];
  h += '<div style="display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1.25rem">';
  periods.forEach(function (p) {
    var on = p[0] === period;
    h += '<button onclick="window._earnPeriod=\'' + p[0] + '\';render(\'seller-earnings\')" '
       + 'style="padding:.45rem .9rem;border-radius:20px;font-size:.82rem;cursor:pointer;border:1px solid '
       + (on ? 'var(--a300,#e8552b);background:var(--a300,#e8552b);color:#fff' : 'var(--line,#e3e3e3);background:transparent')
       + '">' + esc(p[1]) + '</button>';
  });
  h += '</div>';

  var series = d.series || [];
  if (!series.length) {
    h += '<p style="opacity:.7">' + esc(x.empty) + '</p>';
  } else {
    var COLS = 'display:grid;grid-template-columns:minmax(120px,1.3fr) 80px repeat(3,minmax(95px,1fr));gap:.5rem;padding:.6rem .5rem;border-bottom:1px solid rgba(128,128,128,.18);align-items:center;font-size:.86rem';
    h += '<div style="overflow-x:auto"><div style="min-width:600px">';
    h += '<div style="' + COLS + ';font-weight:700;background:var(--surface2);border-radius:6px">'
       + '<div>' + esc(x.period) + '</div><div>' + esc(x.orders) + '</div>'
       + '<div style="text-align:right">' + esc(x.gross) + '</div>'
       + '<div style="text-align:right">' + esc(x.comm) + '</div>'
       + '<div style="text-align:right">' + esc(x.net) + '</div></div>';
    series.forEach(function (r) {
      h += '<div style="' + COLS + '">'
         + '<div>' + esc(fmtBucket(r.bucket, period)) + '</div>'
         + '<div style="opacity:.7">' + esc(String(r.order_count || 0)) + '</div>'
         + '<div style="text-align:right">' + esc(fmtMoney(r.gross, r.currency)) + '</div>'
         + '<div style="text-align:right;opacity:.65">\u2212' + esc(fmtMoney(r.commission, r.currency)) + '</div>'
         + '<div style="text-align:right;font-weight:700">' + esc(fmtMoney(r.net, r.currency)) + '</div></div>';
    });
    h += '</div></div>';
  }

  // Provisionshinweis - mit dem EFFEKTIVEN Satz, nicht dem Basissatz.
  var rate = d.effective_commission_rate;
  var note;
  if (S.lang === 'de') {
    note = 'Die Provision ist bereits abgezogen \u2013 \u201e' + x.net + '\u201c ist der Betrag, der bei dir ankommt. '
         + (rate !== null && rate !== undefined ? 'Dein effektiver Satz in diesem Zeitraum: ' + (rate * 100).toFixed(1) + '\u202f%. ' : '')
         + 'Der Satz sinkt mit steigendem Umsatz: 16\u202f% bis 500\u202f$, dann 12\u202f%, 9\u202f% und 7\u202f% \u2013 gestaffelt, nicht r\u00fcckwirkend.';
  } else {
    note = 'Commission is already deducted \u2013 \u201c' + x.net + '\u201d is what reaches you. '
         + (rate !== null && rate !== undefined ? 'Your effective rate in this period: ' + (rate * 100).toFixed(1) + '%. ' : '')
         + 'The rate drops as revenue grows: 16% up to $500, then 12%, 9% and 7% \u2013 tiered, not retroactive.';
  }
  h += '<div style="margin-top:1.1rem;padding:.85rem 1.1rem;background:var(--surface2);border-radius:10px;font-size:.82rem;opacity:.85;line-height:1.55;max-width:680px">\u2139\ufe0f ' + esc(note) + '</div>';

  h += '<div style="margin-top:1.25rem;display:flex;gap:.6rem;flex-wrap:wrap">'
     + '<button class="btn" onclick="downloadCsv(\'/seller/earnings/export\',\'umsatz.csv\',this)">\u2b07 ' + esc(x.dl) + '</button></div>';

  h += '<div style="margin-top:1.75rem"><a href="#" onclick="render(\'seller-dashboard\');return false">' + esc(x.back) + '</a></div>';
  h += '</section></div>';
  $('content').innerHTML = h;
});

/* ---------- ROUTE: ADMIN - GUTHABEN JE HAENDLER ---------- */
route('admin-earnings', async function () {
  if (!S.user || S.user.role !== 'admin') { render('login'); return; }

  var head = '<div class="page-wrap"><section class="section">'
    + '<div class="sec-hd" style="margin-bottom:1rem"><div class="sec-title">\ud83d\udcca H\u00e4ndlerguthaben</div></div>';
  $('content').innerHTML = head + '<div style="opacity:.6">L\u00e4dt \u2026</div></section></div>';

  var from = window._admEarnFrom || '';
  var to = window._admEarnTo || '';
  var qs = [];
  if (from) qs.push('from=' + encodeURIComponent(from));
  if (to) qs.push('to=' + encodeURIComponent(to));
  var query = qs.length ? ('?' + qs.join('&')) : '';

  var d = await apiReq('/admin/earnings' + query, 'GET', null, true)
    .catch(function (e) { return { error: e.message }; });

  var h = head;
  if (d && d.error) {
    $('content').innerHTML = h + '<div class="alert alert-error">' + esc(d.error) + '</div></section></div>'; return;
  }

  var t = d.totals || {};
  var BC = d.base_currency || 'USD';
  var curs = d.currencies || [];
  h += '<div style="display:flex;flex-wrap:wrap;gap:.85rem;margin-bottom:1rem">';
  [['Bruttoumsatz', t.gross, ''], ['Provision (Einnahme)', t.commission, '#16a34a'],
   ['H\u00e4ndleranteil', t.net, ''], ['Offen zur Auszahlung', t.pending, '#d97706']].forEach(function (k) {
    h += '<div style="flex:1;min-width:170px;padding:.95rem 1.1rem;background:var(--surface2);border-radius:10px'
       + (k[2] ? ';border-left:4px solid ' + k[2] : '') + '">'
       + '<div style="font-size:.75rem;opacity:.65;margin-bottom:.3rem">' + esc(k[0]) + '</div>'
       + '<div style="font-size:1.3rem;font-weight:700">' + esc(fmtMoney(k[1], BC)) + '</div></div>';
  });
  h += '</div>';

  // Transparenz zur Umrechnung - sonst weiss niemand, welcher Kurs gilt.
  h += '<div style="font-size:.78rem;opacity:.7;margin-bottom:1.25rem;line-height:1.5;max-width:720px">'
     + 'Summen in ' + esc(BC) + ', umgerechnet mit dem Kurs, der bei jeder Bestellung eingefroren wurde \u2013 nicht mit dem heutigen Kurs. '
     + (curs.length > 1 ? 'Bestellw\u00e4hrungen im Zeitraum: ' + esc(curs.join(', ')) + '. ' : '')
     + 'Die Spalten je H\u00e4ndler stehen weiterhin in der jeweiligen Bestellw\u00e4hrung.</div>';

  if (d.fx_incomplete > 0) {
    h += '<div style="padding:.85rem 1.1rem;background:var(--surface2);border-radius:10px;border-left:4px solid #dc2626;font-size:.87rem;margin-bottom:1.25rem">'
       + '\u26a0\ufe0f Bei ' + esc(String(d.fx_incomplete)) + ' H\u00e4ndler(n) fehlt zu mindestens einer Bestellung der Wechselkurs. '
       + 'Diese Betr\u00e4ge fehlen in den Summen oben. In der Nachweis-CSV steht die Spalte \u201eKurs vollst\u00e4ndig\u201c auf NEIN.</div>';
  }

  if (d.without_payout_target > 0) {
    h += '<div style="padding:.85rem 1.1rem;background:var(--surface2);border-radius:10px;border-left:4px solid #dc2626;font-size:.87rem;margin-bottom:1.25rem">'
       + '\u26a0\ufe0f ' + esc(String(d.without_payout_target)) + ' H\u00e4ndler haben Guthaben, aber kein Auszahlungsziel hinterlegt. Diese k\u00f6nnen nicht bezahlt werden.</div>';
  }

  h += '<div style="display:flex;gap:.6rem;flex-wrap:wrap;align-items:flex-end;margin-bottom:1.1rem">'
     + '<div class="fg" style="margin:0"><label style="font-size:.78rem">Von</label><input type="date" id="aeFrom" value="' + esc(from) + '"></div>'
     + '<div class="fg" style="margin:0"><label style="font-size:.78rem">Bis</label><input type="date" id="aeTo" value="' + esc(to) + '"></div>'
     + '<button class="btn" onclick="window._admEarnFrom=($(\'aeFrom\')||{}).value||\'\';window._admEarnTo=($(\'aeTo\')||{}).value||\'\';render(\'admin-earnings\')">Filtern</button>'
     + '<button class="btn btn-primary" onclick="downloadCsv(\'/admin/earnings?format=csv' + (query ? '&' + qs.join('&') : '') + '\',\'haendlerguthaben.csv\',this)">\u2b07 Nachweis-CSV</button>'
     + '</div>';

  var rows = d.merchants || [];
  if (!rows.length) {
    h += '<p style="opacity:.7">Keine bezahlten Bestellungen im gew\u00e4hlten Zeitraum.</p>';
  } else {
    var C = 'display:grid;grid-template-columns:60px minmax(90px,1fr) 70px repeat(4,minmax(88px,1fr)) 110px 90px;gap:.45rem;padding:.55rem .4rem;border-bottom:1px solid rgba(128,128,128,.18);align-items:center;font-size:.83rem';
    h += '<div style="overflow-x:auto"><div style="min-width:960px">';
    h += '<div style="' + C + ';font-weight:700;background:var(--surface2);border-radius:6px">'
       + '<div>Händler</div><div>Ziel</div><div>Best.</div>'
       + '<div style="text-align:right">Brutto</div><div style="text-align:right">Provision</div>'
       + '<div style="text-align:right">Satz</div><div style="text-align:right">Offen</div>'
       + '<div>Weg</div><div>Belege</div></div>';
    rows.forEach(function (m) {
      h += '<div style="' + C + '">'
         + '<div><div style="font-weight:600;line-height:1.25">' + esc(m.seller || ('Händler #' + m.merchant_id)) + '</div>'
           + '<div style="font-size:.72rem;opacity:.6">#' + esc(String(m.merchant_id)) + (m.seller_email ? ' · ' + esc(m.seller_email) : '') + '</div></div>'
         + '<div style="font-size:.78rem;opacity:.75;overflow:hidden;text-overflow:ellipsis">' + esc(m.payout_destination || '\u2014') + '</div>'
         + '<div style="opacity:.7">' + esc(String(m.order_count)) + '</div>'
         + '<div style="text-align:right">' + esc(fmtMoney(m.gross, m.currency)) + '</div>'
         + '<div style="text-align:right;color:#16a34a">' + esc(fmtMoney(m.commission, m.currency)) + '</div>'
         + '<div style="text-align:right;opacity:.7">' + (m.effective_rate === null ? '\u2014' : esc((m.effective_rate * 100).toFixed(1) + '%')) + '</div>'
         + '<div style="text-align:right;font-weight:700">' + esc(fmtMoney(m.pending, m.currency)) + '</div>'
         + '<div>' + (m.payout_ready ? esc(m.payout_method) : '<span style="color:#dc2626">kein Ziel</span>') + '</div>'
         + '<div><button class="btn" style="padding:.3rem .55rem;font-size:.75rem" onclick="downloadCsv(\'/admin/earnings/' + m.merchant_id + '/export' + (query || '') + '\',\'haendler-' + m.merchant_id + '.csv\',this)">\u2b07 CSV</button></div>'
         + '</div>';
    });
    h += '</div></div>';
  }

  h += '<div style="margin-top:1.1rem;padding:.85rem 1.1rem;background:var(--surface2);border-radius:10px;font-size:.8rem;opacity:.8;line-height:1.55;max-width:720px">'
     + '\u2139\ufe0f Die Spalte \u201eOffen\u201c ist der Betrag, den du dem H\u00e4ndler noch schuldest \u2013 Provision ist bereits abgezogen. '
     + 'Der Satz ist der tats\u00e4chlich einbehaltene Mischsatz aus der Staffel, nicht der Basissatz von 16\u202f%. '
     + 'Die Belege-CSV enth\u00e4lt jede Einzelposition mit Datum, Satz, Betrag UND dem eingefrorenen Wechselkurs \u2013 das ist die Ebene, die bei einer Aufkl\u00e4rung z\u00e4hlt.</div>';

  h += '<div style="margin-top:1.5rem"><a href="#" onclick="render(\'admin-dashboard\');return false">< Zur\u00fcck</a></div>';
  h += '</section></div>';
  $('content').innerHTML = h;
});

/* ---------- ROUTE: AUSZAHLUNG AUF BANKKONTO (Stripe Connect) ----------
   Fuer Haendler mit Bankkonto im EWR, UK, CH, US, CA u. a.
   Bewusst NICHT ans Wohnsitzland gekoppelt: Wer in Luanda oder Lagos
   sitzt, aber ein portugiesisches oder britisches Geschaeftskonto hat,
   faehrt hier am besten - schnellste Auszahlung und Stripe uebernimmt
   die regulatorische Last. */
route('seller-stripe-connect', async function () {
  if (!S.user || (S.user.role !== 'seller' && S.user.role !== 'dealer' && S.user.role !== 'admin')) { render('login'); return; }
  if (S.support) { toast('Finanzbereich ist in der Support-Ansicht gesperrt', 't-error'); render('seller-dashboard'); return; }

  var L = {
    de: { title: 'Auszahlung auf Bankkonto', sub: 'Verbinde dein Gesch\u00e4ftskonto. Entscheidend ist, wo dein Konto gef\u00fchrt wird \u2013 nicht, wo du wohnst.',
          hint: 'M\u00f6glich mit einem Konto in der EU, Gro\u00dfbritannien, der Schweiz, den USA, Kanada und weiteren L\u00e4ndern. Auszahlungen innerhalb des EWR sind geb\u00fchrenfrei.',
          start: 'Bankkonto verbinden', pending: 'Verifizierung l\u00e4uft \u2013 Stripe pr\u00fcft deine Angaben. Das dauert meist wenige Minuten bis zu einem Tag.',
          resume: 'Verifizierung fortsetzen', ok: 'Bankkonto verbunden und auszahlungsbereit',
          country: 'Land deines Bankkontos', back: '< Zur\u00fcck', loading: 'L\u00e4dt \u2026', err: 'Verbindung fehlgeschlagen' },
    en: { title: 'Payouts to your bank account', sub: 'Connect your business account. What matters is where your account is held \u2013 not where you live.',
          hint: 'Works with an account in the EU, UK, Switzerland, USA, Canada and more. Payouts within the EEA are free of charge.',
          start: 'Connect bank account', pending: 'Verification in progress \u2013 Stripe is reviewing your details. This usually takes minutes to a day.',
          resume: 'Resume verification', ok: 'Bank account connected and ready for payouts',
          country: 'Country of your bank account', back: '< Back', loading: 'Loading \u2026', err: 'Connection failed' },
    fr: { title: 'Versements sur compte bancaire', sub: 'Connectez votre compte professionnel. Ce qui compte, c\u2019est o\u00f9 votre compte est tenu \u2013 pas o\u00f9 vous vivez.',
          hint: 'Possible avec un compte dans l\u2019UE, au Royaume-Uni, en Suisse, aux USA, au Canada et ailleurs. Versements gratuits dans l\u2019EEE.',
          start: 'Connecter le compte', pending: 'V\u00e9rification en cours \u2013 Stripe examine vos informations.',
          resume: 'Reprendre la v\u00e9rification', ok: 'Compte connect\u00e9 et pr\u00eat pour les versements',
          country: 'Pays de votre compte bancaire', back: '< Retour', loading: 'Chargement \u2026', err: '\u00c9chec de la connexion' },
    pt: { title: 'Pagamentos para conta banc\u00e1ria', sub: 'Ligue a sua conta empresarial. O que conta \u00e9 onde a conta est\u00e1 sediada \u2013 n\u00e3o onde vive.',
          hint: 'Funciona com conta na UE, Reino Unido, Su\u00ed\u00e7a, EUA, Canad\u00e1 e mais. Pagamentos dentro do EEE s\u00e3o gratuitos.',
          start: 'Ligar conta banc\u00e1ria', pending: 'Verifica\u00e7\u00e3o em curso \u2013 a Stripe est\u00e1 a rever os seus dados.',
          resume: 'Continuar verifica\u00e7\u00e3o', ok: 'Conta ligada e pronta para pagamentos',
          country: 'Pa\u00eds da sua conta banc\u00e1ria', back: '< Voltar', loading: 'A carregar \u2026', err: 'Falha na liga\u00e7\u00e3o' },
    sw: { title: 'Malipo kwenye akaunti ya benki', sub: 'Unganisha akaunti yako ya biashara. Kinachohesabika ni mahali akaunti ilipo \u2013 si unapoishi.',
          hint: 'Inawezekana na akaunti katika EU, Uingereza, Uswisi, Marekani, Kanada na kwingine.',
          start: 'Unganisha akaunti', pending: 'Uthibitishaji unaendelea \u2013 Stripe inakagua taarifa zako.',
          resume: 'Endelea na uthibitishaji', ok: 'Akaunti imeunganishwa na iko tayari',
          country: 'Nchi ya akaunti yako ya benki', back: '< Rudi', loading: 'Inapakia \u2026', err: 'Kuunganisha kumeshindikana' }
  };
  var x = L[S.lang] || L.en;

  var head = '<div class="page-wrap"><section class="section">'
    + '<div class="sec-hd" style="margin-bottom:1rem"><div class="sec-title">\ud83c\udfe6 ' + esc(x.title) + '</div></div>'
    + '<div style="opacity:.75;font-size:.92rem;margin-bottom:1.25rem;max-width:620px;line-height:1.5">' + esc(x.sub) + '</div>';
  $('content').innerHTML = head + '<div style="opacity:.6">' + esc(x.loading) + '</div></section></div>';

  var st = await apiReq('/seller/stripe-connect', 'GET', null, true).catch(function () { return null; });

  var h = head + '<div style="max-width:560px">';

  if (st && st.connected) {
    h += '<div style="padding:.9rem 1.1rem;background:var(--surface2);border-radius:10px;border-left:4px solid #16a34a;font-size:.9rem;margin-bottom:1.25rem">\u2713 ' + esc(x.ok) + '</div>';
  } else {
    if (st && st.account) {
      h += '<div style="padding:.9rem 1.1rem;background:var(--surface2);border-radius:10px;border-left:4px solid #d97706;font-size:.9rem;margin-bottom:1.25rem">' + esc(x.pending) + '</div>';
    }
    h += '<div style="font-size:.85rem;opacity:.7;margin-bottom:1.25rem;line-height:1.5">' + esc(x.hint) + '</div>';

    // Laenderliste: die Stripe-Connect-Laender. Der Haendler waehlt das Land
    // SEINES KONTOS - deshalb ist die Vorauswahl nur ein Vorschlag.
    var SC = ['DE','AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','GR','HU','IE','IT','LV','LI','LT','LU','MT','NL','NO','PL','PT','RO','SK','SI','ES','SE','GB','CH','US','CA','AU','NZ','JP','SG','HK','AE'];
    var dn = null; try { dn = new Intl.DisplayNames([S.lang], { type: 'region' }); } catch (e) {}
    var opts = SC.map(function (c) { var n; try { n = (dn && dn.of(c)) || c; } catch (e) { n = c; } return { c: c, n: n }; });
    opts.sort(function (a, b) { return a.n.localeCompare(b.n, S.lang); });

    h += '<div class="fg"><label>' + esc(x.country) + '</label><select id="scCountry">';
    opts.forEach(function (o) { h += '<option value="' + o.c + '">' + esc(o.n) + '</option>'; });
    h += '</select></div>';
    h += '<button class="btn btn-primary" id="scBtn" onclick="sellerStartConnect(this)" style="margin-top:.5rem">' + esc((st && st.account) ? x.resume : x.start) + '</button>';
  }

  h += '<div style="margin-top:1.75rem"><a href="#" onclick="render(\'seller-payout-setup\');return false">' + esc(x.back) + '</a></div>';
  h += '</div></section></div>';
  $('content').innerHTML = h;
});

async function sellerStartConnect(btn) {
  var country = ($('scCountry') && $('scCountry').value) || '';
  var old = btn.textContent;
  btn.disabled = true; btn.textContent = '\u2026';
  try {
    var r = await apiReq('/seller/stripe-connect', 'POST', { country: country }, true);
    if (r && r.onboarding_url) { window.location.href = r.onboarding_url; return; }
    throw new Error('keine URL');
  } catch (e) {
    btn.disabled = false; btn.textContent = old;
    toast((e && e.message) ? e.message : 'Fehler', 't-error');
  }
}

route('seller-payout-setup', async function () {
  if (!S.user || (S.user.role !== 'seller' && S.user.role !== 'dealer' && S.user.role !== 'admin')) { render('login'); return; }
  if (S.support) { toast('Finanzbereich ist in der Support-Ansicht gesperrt', 't-error'); render('seller-dashboard'); return; }

  var L = {
    de: { title: 'Auszahlung einrichten', sub: 'Wähle deine Region – wir richten automatisch die passende Auszahlungsmethode ein. Daran zahlen wir deinen Verkaufsanteil wöchentlich aus (abzüglich Provision).',
          africa: 'Afrika · Mobile Money', africaD: 'Auszahlung auf dein Handy · DR Kongo, Kenia, Senegal, Côte d’Ivoire, Tansania, Uganda, Kamerun u. a.',
          bank: 'Bankkonto EU, UK, USA, Kanada, Schweiz', bankD: 'Direkt auf dein Bankkonto · schnellste Option, keine Gebühren im EWR · auch wenn du außerhalb Europas wohnst, aber dort ein Konto hast',
          eu: 'Europa & weltweit', euD: 'Payoneer · Auszahlung auf dein Payoneer-Konto oder Bankkonto · EU, Großbritannien, USA, Asien u. v. m.',
          connected: 'Auszahlung verbunden', back: '< Zurück zum Dashboard', loading: 'Lädt …' },
    en: { title: 'Set up payouts', sub: 'Choose your region – we set up the right payout method automatically. Your sales share is paid out there weekly (minus commission).',
          africa: 'Africa · mobile money', africaD: 'Paid to your phone · DR Congo, Kenya, Senegal, Côte d’Ivoire, Tanzania, Uganda, Cameroon and more',
          bank: 'Bank account in EU, UK, USA, Canada, Switzerland', bankD: 'Straight to your bank account · fastest option, no fees within the EEA · also works if you live elsewhere but hold an account there',
          eu: 'Europe & worldwide', euD: 'Payoneer · payout to your Payoneer account or bank account · EU, UK, USA, Asia & more',
          connected: 'Payout connected', back: '< Back to dashboard', loading: 'Loading …' },
    fr: { title: 'Configurer les versements', sub: 'Choisissez votre région – nous configurons la bonne méthode de versement. Votre part des ventes y est versée chaque semaine (moins la commission).',
          africa: 'Afrique · mobile money', africaD: 'Versé sur votre téléphone · RD Congo, Kenya, Sénégal, Côte d’Ivoire, Tanzanie, Ouganda, Cameroun…',
          bank: 'Compte bancaire UE, R.-U., USA, Canada, Suisse', bankD: 'Directement sur votre compte · option la plus rapide, sans frais dans l’EEE · valable aussi si vous résidez ailleurs mais y avez un compte',
          eu: 'Europe & monde', euD: 'Payoneer · versement sur votre compte Payoneer ou bancaire · UE, Royaume-Uni, USA, Asie…',
          connected: 'Versement connecté', back: '< Retour au tableau de bord', loading: 'Chargement …' },
    pt: { title: 'Configurar pagamentos', sub: 'Escolha a sua região – configuramos o método de pagamento certo. A sua parte das vendas é paga aí semanalmente (menos comissão).',
          africa: 'África · mobile money', africaD: 'Pago no seu telemóvel · RD Congo, Quénia, Senegal, Costa do Marfim, Tanzânia, Uganda, Camarões e mais',
          bank: 'Conta bancária na UE, Reino Unido, EUA, Canadá, Suíça', bankD: 'Direto para a sua conta · opção mais rápida, sem taxas no EEE · também serve se vive noutro país mas tem conta lá',
          eu: 'Europa & mundo', euD: 'Payoneer · pagamento na sua conta Payoneer ou bancária · UE, Reino Unido, EUA, Ásia e mais',
          connected: 'Pagamento ligado', back: '< Voltar ao painel', loading: 'A carregar …' },
    sw: { title: 'Sanidua malipo', sub: 'Chagua eneo lako – tunasanidua njia sahihi ya malipo. Sehemu yako ya mauzo hulipwa hapo kila wiki (ukiondoa kamisheni).',
          africa: 'Afrika · mobile money', africaD: 'Kulipwa kwenye simu yako · DR Congo, Kenya, Senegal, Côte d’Ivoire, Tanzania, Uganda, Kamerun n.k.',
          bank: 'Akaunti ya benki EU, Uingereza, Marekani, Kanada, Uswisi', bankD: 'Moja kwa moja kwenye akaunti yako · njia ya haraka zaidi · pia inafaa ukiishi kwingine lakini una akaunti huko',
          eu: 'Ulaya & duniani kote', euD: 'Payoneer · malipo kwenye akaunti yako ya Payoneer au benki · EU, Uingereza, Marekani, Asia n.k.',
          connected: 'Malipo yameunganishwa', back: '< Rudi kwenye dashibodi', loading: 'Inapakia …' }
  };
  var x = L[S.lang] || L.en;

  var head = '<div class="page-wrap"><section class="section">'
    + '<div class="sec-hd" style="margin-bottom:1rem"><div class="sec-title">🏦 ' + esc(x.title) + '</div></div>'
    + '<div style="opacity:.75;font-size:.92rem;margin-bottom:1.5rem;max-width:620px;line-height:1.5">' + esc(x.sub) + '</div>';
  $('content').innerHTML = head + '<div style="opacity:.6">' + esc(x.loading) + '</div></section></div>';

  // Status beider Schienen prüfen (eine Abfrage liefert beide)
  var connectedVia = null;
  try {
    var st = await apiReq('/seller/payout-account', 'GET', null, true).catch(function () { return null; });
    var sc = await apiReq('/seller/stripe-connect', 'GET', null, true).catch(function () { return null; });
    window._payoutState = { st: st, sc: sc };
    // Massgeblich ist der GEWAEHLTE Weg, nicht der erstbeste verbundene.
    // Wer Payoneer hinterlegt hat und zusaetzlich Stripe einrichtet, sah
    // frueher "Bankkonto (Stripe)", obwohl das Geld weiter zu Payoneer lief.
    var defProv = (st && st.default_provider) || ((sc && sc.connected) ? 'stripe' : null);
    var provLabel = { stripe: 'Bankkonto (Stripe)', pawapay: 'Mobile Money', payoneer: 'Payoneer' };
    if (defProv && provLabel[defProv]) { connectedVia = provLabel[defProv]; }
    else if (sc && sc.connected) { connectedVia = 'Bankkonto (Stripe)'; }
    else if (st && st.pawapay && st.pawapay.connected) { connectedVia = 'Mobile Money'; }
    else if (st && st.payoneer && st.payoneer.connected) { connectedVia = 'Payoneer'; }
  } catch (e) {}

  var h = head;
  if (connectedVia) {
    h += '<div style="margin-bottom:1.25rem;padding:.85rem 1.1rem;background:var(--surface2);border-radius:10px;border-left:4px solid #16a34a;font-size:.9rem;max-width:620px">✓ ' + esc(x.connected) + ' · ' + esc(connectedVia) + '</div>';
  }

  function regionCard(emoji, title, desc, target) {
    return '<div onclick="render(\'' + target + '\')" '
      + 'style="cursor:pointer;display:flex;gap:1rem;align-items:flex-start;padding:1.1rem 1.25rem;border:1px solid var(--line,#e3e3e3);border-radius:12px;margin-bottom:.9rem;background:var(--surface,#fff);transition:border-color .15s, transform .15s" '
      + 'onmouseover="this.style.borderColor=\'var(--a300,#e8552b)\';this.style.transform=\'translateY(-1px)\'" '
      + 'onmouseout="this.style.borderColor=\'var(--line,#e3e3e3)\';this.style.transform=\'none\'">'
      + '<div style="font-size:1.7rem;line-height:1.1">' + emoji + '</div>'
      + '<div style="flex:1"><div style="font-weight:700;margin-bottom:.25rem">' + esc(title) + '</div>'
      + '<div style="font-size:.82rem;opacity:.7;line-height:1.45">' + esc(desc) + '</div></div>'
      + '<div style="align-self:center;opacity:.35;font-size:1.3rem">›</div></div>';
  }

  // Reihenfolge = Attraktivitaet fuer den Haendler. Bankkonto zuerst:
  // schnellste Auszahlung, keine Gebuehren im EWR, und Stripe traegt dabei
  // die regulatorische Last. Wichtig: Es zaehlt, WO der Haendler ein Konto
  // hat, nicht wo er wohnt - ein Haendler in Luanda mit portugiesischem
  // Konto gehoert hierher.
  h += '<div style="max-width:620px">';
  h += regionCard('🏦', x.bank, x.bankD, 'seller-stripe-connect');
  h += regionCard('📱', x.africa, x.africaD, 'seller-payout');
  h += regionCard('🌐', x.eu, x.euD, 'seller-payoneer');
  h += '</div>';

  // Aktiver Weg umschaltbar, sobald mehr als einer eingerichtet ist.
  var stx = window._payoutState && window._payoutState.st;
  var avail = (stx && stx.available_methods) || [];
  if (avail.length > 1) {
    var labels = { stripe: '🏦 Bankkonto (Stripe)', pawapay: '📱 Mobile Money', payoneer: '🌐 Payoneer' };
    var cur = (stx && stx.default_provider) || null;
    var de = (S.lang === 'de');
    h += '<div style="max-width:620px;margin-top:1.5rem;padding:1.1rem 1.25rem;border:1px solid var(--line,#eaeaea);border-radius:12px;background:var(--surface,#fff)">';
    h += '<div style="font-weight:700;margin-bottom:.3rem">' + (de ? 'Aktiver Auszahlungsweg' : 'Active payout method') + '</div>';
    h += '<div style="font-size:.83rem;opacity:.75;margin-bottom:.85rem;line-height:1.5">'
       + (de ? 'Du hast mehrere Wege eingerichtet. Hier bestimmst du, wohin dein Geld tatsächlich geht — auch das bereits aufgelaufene Guthaben.'
             : 'You have set up several methods. Choose where your money actually goes — including your existing balance.') + '</div>';
    h += '<div style="display:flex;gap:.5rem;flex-wrap:wrap">';
    avail.forEach(function (p) {
      var active = (p === cur);
      h += '<button class="btn" ' + (active ? 'disabled' : 'onclick="sellerSwitchPayout(\'' + p + '\',this)"')
         + ' style="padding:.5rem .95rem;border-radius:9px;font-size:.87rem;cursor:' + (active ? 'default' : 'pointer')
         + ';border:1px solid ' + (active ? '#16a34a' : 'var(--line,#ddd)') + ';background:' + (active ? '#16a34a' : 'transparent')
         + ';color:' + (active ? '#fff' : 'inherit') + ';font-weight:' + (active ? '700' : '500') + '">'
         + (active ? '✓ ' : '') + esc(labels[p] || p) + '</button>';
    });
    h += '</div><div id="payoutSwitchMsg" style="margin-top:.7rem;font-size:.85rem"></div></div>';
  }

  h += '<div style="margin-top:1.5rem"><a href="#" onclick="render(\'seller-dashboard\');return false">' + esc(x.back) + '</a></div>';
  h += '</section></div>';
  $('content').innerHTML = h;
});

/* ---------- ROUTE: SELLER SHOP (Mein Shop) ---------- */
route('seller-shop', async function () {
  if (!S.user || (S.user.role !== 'seller' && S.user.role !== 'dealer' && S.user.role !== 'admin')) { render('login'); return; }

  var MAP = {
    de: { title: 'Mein Shop', sub: 'Lege deinen Shop an oder bearbeite ihn. Danach erscheint er im Shop-Verzeichnis und unter „Shops in deiner Nähe".', name: 'Shop-Name', country: 'Land', city: 'Stadt', phone: 'Telefon', email: 'E-Mail', desc: 'Kurzbeschreibung', choose: '– Land wählen –', save: 'Speichern', saved: 'Shop gespeichert ✓', back: '< Zurück zum Dashboard', req: 'Bitte einen Shop-Namen eingeben.', live: 'Dein Shop ist live und sichtbar.', logo: 'Shop-Logo', logo_hint: 'Quadratisches Bild empfohlen (JPG, PNG oder WebP, max. 2 MB).', logo_upload: 'Logo hochladen', logo_change: 'Logo ändern', logo_remove: 'Entfernen', logo_uploading: 'Wird hochgeladen …', logo_err_type: 'Bitte ein JPG-, PNG- oder WebP-Bild wählen.', logo_err_size: 'Das Bild ist zu groß (max. 2 MB).', logo_err_upload: 'Logo-Upload fehlgeschlagen.' },
    en: { title: 'My Shop', sub: 'Create or edit your shop. It then appears in the directory and under “Shops nearby”.', name: 'Shop name', country: 'Country', city: 'City', phone: 'Phone', email: 'Email', desc: 'Short description', choose: '– Select country –', save: 'Save', saved: 'Shop saved ✓', back: '< Back to dashboard', req: 'Please enter a shop name.', live: 'Your shop is live and visible.', logo: 'Shop logo', logo_hint: 'Square image recommended (JPG, PNG or WebP, max 2 MB).', logo_upload: 'Upload logo', logo_change: 'Change logo', logo_remove: 'Remove', logo_uploading: 'Uploading …', logo_err_type: 'Please choose a JPG, PNG or WebP image.', logo_err_size: 'Image is too large (max 2 MB).', logo_err_upload: 'Logo upload failed.' },
    fr: { title: 'Ma boutique', sub: 'Créez ou modifiez votre boutique. Elle apparaît ensuite dans l’annuaire et sous « Boutiques à proximité ».', name: 'Nom de la boutique', country: 'Pays', city: 'Ville', phone: 'Téléphone', email: 'E-mail', desc: 'Brève description', choose: '– Choisir le pays –', save: 'Enregistrer', saved: 'Boutique enregistrée ✓', back: '< Retour au tableau de bord', req: 'Veuillez saisir un nom de boutique.', live: 'Votre boutique est en ligne.', logo: 'Logo de la boutique', logo_hint: 'Image carrée recommandée (JPG, PNG ou WebP, max 2 Mo).', logo_upload: 'Téléverser le logo', logo_change: 'Changer le logo', logo_remove: 'Supprimer', logo_uploading: 'Téléversement …', logo_err_type: 'Veuillez choisir une image JPG, PNG ou WebP.', logo_err_size: 'Image trop volumineuse (max 2 Mo).', logo_err_upload: 'Échec du téléversement du logo.' },
    pt: { title: 'A minha loja', sub: 'Crie ou edite a sua loja. Depois aparece no diretório e em “Lojas próximas”.', name: 'Nome da loja', country: 'País', city: 'Cidade', phone: 'Telefone', email: 'E-mail', desc: 'Breve descrição', choose: '– Selecionar país –', save: 'Guardar', saved: 'Loja guardada ✓', back: '< Voltar ao painel', req: 'Introduza um nome de loja.', live: 'A sua loja está online.', logo: 'Logótipo da loja', logo_hint: 'Imagem quadrada recomendada (JPG, PNG ou WebP, máx 2 MB).', logo_upload: 'Carregar logótipo', logo_change: 'Mudar logótipo', logo_remove: 'Remover', logo_uploading: 'A carregar …', logo_err_type: 'Escolha uma imagem JPG, PNG ou WebP.', logo_err_size: 'Imagem demasiado grande (máx 2 MB).', logo_err_upload: 'Falha ao carregar o logótipo.' },
    sw: { title: 'Duka langu', sub: 'Tengeneza au hariri duka lako. Litaonekana kwenye orodha na chini ya “Maduka karibu nawe”.', name: 'Jina la duka', country: 'Nchi', city: 'Mji', phone: 'Simu', email: 'Barua pepe', desc: 'Maelezo mafupi', choose: '– Chagua nchi –', save: 'Hifadhi', saved: 'Duka limehifadhiwa ✓', back: '< Rudi kwenye dashibodi', req: 'Tafadhali weka jina la duka.', live: 'Duka lako liko hewani.', logo: 'Nembo ya duka', logo_hint: 'Picha ya mraba inapendekezwa (JPG, PNG au WebP, max 2 MB).', logo_upload: 'Pakia nembo', logo_change: 'Badilisha nembo', logo_remove: 'Ondoa', logo_uploading: 'Inapakia …', logo_err_type: 'Tafadhali chagua picha ya JPG, PNG au WebP.', logo_err_size: 'Picha ni kubwa mno (max 2 MB).', logo_err_upload: 'Upakiaji wa nembo umeshindwa.' }
  };
  var LBL = MAP[S.lang] || MAP.en;

  // Bestehenden Shop laden (falls vorhanden)
  var existing = null;
  try {
    var r = await apiReq('/seller/shop', 'GET', null, true);
    existing = (r && r.shop) ? r.shop : null;
  } catch (e) {}

  // Länder-Dropdown (Afrika-Fokus + einige weitere), Namen lokalisiert
  var codes = ['GH','NG','KE','SN','CD','CI','TZ','UG','ET','CM','ZA','RW','ZM','ZW','AO','MZ','BF','ML','BJ','TG','GA','GN','MW','MA','EG','DZ','TN','DE','FR','GB','US','CN'];
  var dn = null; try { dn = new Intl.DisplayNames([S.lang], { type: 'region' }); } catch (e) {}
  var opts = codes.map(function (c) { var nm; try { nm = (dn && dn.of(c)) || c; } catch (e) { nm = c; } return { c: c, n: nm }; });
  opts.sort(function (a, b) { return a.n.localeCompare(b.n, S.lang); });
  var optsHtml = '<option value="">' + esc(LBL.choose) + '</option>';
  opts.forEach(function (o) { optsHtml += '<option value="' + o.c + '">' + esc(o.n) + '</option>'; });

  var descVal = '';
  if (existing && existing.translations) descVal = existing.translations[S.lang] || existing.translations.en || '';

  var h = '<div class="page-wrap"><section class="section">';
  h += '<div class="sec-hd"><div class="sec-title">🏬 ' + esc(LBL.title) + '</div></div>';
  h += '<p style="opacity:.75;margin:-.25rem 0 1.25rem;font-size:.9rem;max-width:560px">' + esc(LBL.sub) + '</p>';
  if (existing && existing.active) {
    h += '<div style="max-width:560px;margin-bottom:1rem;padding:.6rem .9rem;background:#16a34a;color:#fff;border-radius:6px;font-size:.85rem">' + esc(LBL.live) + '</div>';
  }
  var logoVal = (existing && existing.logo_url) ? existing.logo_url : '';

  h += '<div class="auth-form" style="max-width:560px">';
  h += '<div class="fg"><label>' + esc(LBL.name) + ' *</label><input id="shName"/></div>';

  // --- Shop-Logo ---
  h += '<div class="fg"><label>' + esc(LBL.logo) + '</label>';
  h += '<div class="shop-logo-row">';
  h += '<div class="shop-logo-prev" id="shLogoPrev">';
  if (logoVal) h += '<img src="' + esc(logoVal) + '" alt="logo"/>';
  else h += '<span class="shop-logo-ph">🏬</span>';
  h += '</div>';
  h += '<div class="shop-logo-actions">';
  h += '<input type="file" id="shLogoFile" accept="image/jpeg,image/png,image/webp" style="display:none"/>';
  h += '<button type="button" class="btn btn-ghost btn-sm" id="shLogoBtn" onclick="document.getElementById(\'shLogoFile\').click()">' + esc(logoVal ? LBL.logo_change : LBL.logo_upload) + '</button>';
  h += '<button type="button" class="btn btn-ghost btn-sm" id="shLogoRemove" style="color:#c33;' + (logoVal ? '' : 'display:none') + '" onclick="removeShopLogo()">' + esc(LBL.logo_remove) + '</button>';
  h += '<div class="shop-logo-hint">' + esc(LBL.logo_hint) + '</div>';
  h += '</div></div></div>';

  h += '<div class="fg"><label>' + esc(LBL.country) + '</label><select id="shCountry">' + optsHtml + '</select></div>';
  h += '<div class="fg"><label>' + esc(LBL.city) + '</label><input id="shCity"/></div>';
  // Ladungsfaehige Anschrift: fuer Rechnungen, Impressum und die
  // Empfaengeranlage bei Payoneer. Sprachneutral beschriftet, damit hier
  // keine fuenf Uebersetzungstabellen noetig sind.
  h += '<div class="fg"><label>' + (S.lang === 'de' ? 'Straße und Hausnummer' : 'Street and number') + '</label><input id="shStreet"/></div>';
  h += '<div class="fg"><label>' + (S.lang === 'de' ? 'Postleitzahl' : 'Postal code') + '</label><input id="shZip"/></div>';
  h += '<div class="fg"><label>' + (S.lang === 'de' ? 'Region / Bundesstaat (optional)' : 'Region / state (optional)') + '</label><input id="shRegion"/></div>';
  h += '<div class="fg"><label>' + (S.lang === 'de' ? 'Eingetragener Firmenname (optional)' : 'Registered company name (optional)') + '</label><input id="shCompany"/></div>';
  h += '<div class="fg"><label>' + (S.lang === 'de' ? 'Handelsregister-/Registernummer (optional)' : 'Company registration number (optional)') + '</label><input id="shReg"/></div>';
  h += '<div class="fg"><label>' + (S.lang === 'de' ? 'USt-IdNr. (optional)' : 'VAT ID (optional)') + '</label><input id="shVat"/></div>';
  h += '<div class="fg"><label>' + esc(LBL.phone) + '</label><input id="shPhone"/></div>';
  h += '<div class="fg"><label>' + esc(LBL.email) + '</label><input id="shEmail" type="email"/></div>';
  h += '<div class="fg"><label>' + esc(LBL.desc) + '</label><textarea id="shDesc" rows="3"></textarea></div>';
  h += '<button class="btn btn-primary" id="shSaveBtn" onclick="saveMyShop()">' + esc(LBL.save) + '</button>';
  h += ' <a href="javascript:void(0)" style="margin-left:.75rem;font-size:.85rem" onclick="render(\'seller-dashboard\')">' + esc(LBL.back) + '</a>';
  h += '</div></section></div>';
  $('content').innerHTML = h;

  // Werte sicher per JS setzen (vermeidet Attribut-Escaping)
  if (existing) {
    if ($('shName')) $('shName').value = existing.name || '';
    if ($('shCountry')) $('shCountry').value = existing.country || '';
    if ($('shCity')) $('shCity').value = existing.city || '';
    if ($('shStreet')) $('shStreet').value = existing.street || '';
    if ($('shZip')) $('shZip').value = existing.postal_code || '';
    if ($('shRegion')) $('shRegion').value = existing.region || '';
    if ($('shCompany')) $('shCompany').value = existing.company_name || '';
    if ($('shReg')) $('shReg').value = existing.reg_number || '';
    if ($('shVat')) $('shVat').value = existing.vat_id || '';
    if ($('shPhone')) $('shPhone').value = existing.phone || '';
    if ($('shEmail')) $('shEmail').value = existing.email || '';
    if ($('shDesc')) $('shDesc').value = descVal || '';
  }

  // --- Logo-Upload-Logik ---
  var currentLogo = logoVal;

  function setLogoPreview(url) {
    currentLogo = url || '';
    var prev = $('shLogoPrev');
    var btn = $('shLogoBtn');
    var rm = $('shLogoRemove');
    if (prev) prev.innerHTML = currentLogo
      ? '<img src="' + esc(currentLogo) + '" alt="logo"/>'
      : '<span class="shop-logo-ph">🏬</span>';
    if (btn) btn.textContent = currentLogo ? LBL.logo_change : LBL.logo_upload;
    if (rm) rm.style.display = currentLogo ? '' : 'none';
  }

  window.removeShopLogo = function () { setLogoPreview(''); };

  var logoInput = $('shLogoFile');
  if (logoInput) {
    logoInput.addEventListener('change', async function () {
      var f = this.files && this.files[0];
      this.value = '';
      if (!f) return;
      if (!/^image\/(jpe?g|png|webp)$/i.test(f.type)) { toast(LBL.logo_err_type, 't-error'); return; }
      if (f.size > 2 * 1024 * 1024) { toast(LBL.logo_err_size, 't-error'); return; }
      var btn = $('shLogoBtn');
      if (btn) { btn.disabled = true; btn.textContent = LBL.logo_uploading; }
      try {
        var fd = new FormData();
        fd.append('images', f);
        fd.append('folder', 'shops');
        var tok = S.token || localStorage.getItem('apa_token') || '';
        var res = await fetch('/api/upload/images', {
          method: 'POST',
          headers: tok ? { 'Authorization': 'Bearer ' + tok } : {},
          body: fd
        });
        var data = await res.json().catch(function () { return {}; });
        if (!res.ok) throw new Error(data.error || data.message || LBL.logo_err_upload);
        var url = (data.urls && data.urls[0]) || (data.data && data.data.urls && data.data.urls[0]);
        if (!url) throw new Error(LBL.logo_err_upload);
        setLogoPreview(url);
      } catch (e) {
        toast(e.message || LBL.logo_err_upload, 't-error');
      } finally {
        if (btn) btn.disabled = false;
        if (btn && !currentLogo) btn.textContent = LBL.logo_upload;
        else if (btn) btn.textContent = LBL.logo_change;
      }
    });
  }

  window.saveMyShop = async function () {
    var name = $('shName') ? $('shName').value.trim() : '';
    if (!name) { toast(LBL.req, 't-error'); return; }
    var payload = {
      name: name,
      country: $('shCountry') ? $('shCountry').value : '',
      city: $('shCity') ? $('shCity').value.trim() : '',
      phone: $('shPhone') ? $('shPhone').value.trim() : '',
      email: $('shEmail') ? $('shEmail').value.trim() : '',
      logo_url: currentLogo || '',
      description: $('shDesc') ? $('shDesc').value.trim() : '',
      street: $('shStreet') ? $('shStreet').value.trim() : '',
      postal_code: $('shZip') ? $('shZip').value.trim() : '',
      region: $('shRegion') ? $('shRegion').value.trim() : '',
      company_name: $('shCompany') ? $('shCompany').value.trim() : '',
      reg_number: $('shReg') ? $('shReg').value.trim() : '',
      vat_id: $('shVat') ? $('shVat').value.trim() : ''
    };
    var btn = $('shSaveBtn'); if (btn) btn.disabled = true;
    try {
      await apiReq('/seller/shop', 'POST', payload, true);
      toast(LBL.saved);
      render('seller-shop');
    } catch (e) {
      toast(e.message || 'Error', 't-error');
      if (btn) btn.disabled = false;
    }
  };
});

/* ---------- ROUTE: SELLER PRODUCTS (Modul: Produktmanagement) ---------- */
route('seller-products', async function () {
  if (!S.user || (S.user.role !== 'seller' && S.user.role !== 'dealer' && S.user.role !== 'admin')) { render('login'); return; }

  // Route-lokaler State
  let uploadedImages = [];
  let editingId = null;
  let categories = [];

  // Kategorien für Dropdown laden (öffentlicher Endpoint, kein Auth nötig)
  try {
    const cR = await apiReq('/categories?lang=' + (S.lang || 'de'), 'GET', null, false);
    categories = Array.isArray(cR) ? cR : (cR.data || []);
  } catch (e) {}

  // Bilder-Upload-Helper: schickt Dateien an R2 unter folder=products
  async function uploadProductImages(files) {
    if (!files || !files.length) return [];
    const validTypes = /^image\/(jpe?g|png|webp)$/i;
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (!validTypes.test(f.type)) throw new Error(t('seller_prod.err_only_jpg').replace('{name}', f.name));
      if (f.size > 2 * 1024 * 1024) throw new Error(t('seller_prod.err_too_large').replace('{name}', f.name));
    }
    const fd = new FormData();
    for (let i = 0; i < files.length; i++) fd.append('images', files[i]);
    fd.append('folder', 'products');
    const tok = S.token || localStorage.getItem('apa_token') || '';
    const headers = tok ? { 'Authorization': 'Bearer ' + tok } : {};
    const res = await fetch('/api/upload/images', { method: 'POST', headers: headers, body: fd });
    const data = await res.json().catch(function () { return {}; });
    if (!res.ok) throw new Error(data.message || data.error || t('seller_prod.err_upload_fail').replace('{n}', res.status));
    return data.urls || (data.data && data.data.urls) || [];
  }

  // Liste laden + rendern
  async function loadProducts() {
    let products = [];
    try {
      // Versuche zuerst Seller-Endpoint (auth, nur eigene Produkte)
      const res = await apiReq('/seller/products', 'GET', null, true);
      products = res.data || res.products || (Array.isArray(res) ? res : []);
    } catch (e) {
      // Fallback: öffentlicher Endpoint + client-seitig filtern
      try {
        const res = await apiReq('/products?limit=200', 'GET', null, false);
        const all = res.data || res.products || [];
        products = all.filter(function (p) {
          return String(p.seller_id || p.user_id || '') === String(S.user.id);
        });
      } catch (e2) {}
    }

    const listEl = $('sp-list');
    if (!listEl) return;

    if (!products.length) {
      listEl.innerHTML = '<div class="empty-state"><div class="empty-icon">[-]</div><h3>' + esc(t('seller_prod.empty_t')) + '</h3><p style="opacity:.7">' + esc(t('seller_prod.empty_s')) + '</p></div>';
      return;
    }

    let h = '<div style="display:flex;flex-direction:column;gap:.55rem">';
    products.forEach(function (p) {
      let imgs = p.images_array || [];
      if (!imgs.length && p.images) {
        if (Array.isArray(p.images)) imgs = p.images;
        else if (typeof p.images === 'string') { try { imgs = JSON.parse(p.images); } catch (e) { imgs = []; } }
      }
      const img = imgs[0];
      const ws = wsIsWholesale(p);
      const inactive = (p.active === false);
      const stock = (p.stock != null ? p.stock : 0);
      const stockColor = stock > 0 ? '#0a7d36' : '#c0392b';
      const stockBg = stock > 0 ? '#eaf6ee' : '#fdecea';

      h += '<div style="display:grid;grid-template-columns:64px minmax(0,1fr) auto;gap:.9rem;align-items:center;background:var(--surface,#fff);border:1px solid var(--border,#e6e8eb);border-radius:14px;padding:.7rem .85rem;box-shadow:0 1px 2px rgba(16,24,40,.05)' + (inactive ? ';opacity:.6' : '') + '">';

      // Thumbnail
      h += img
        ? '<img src="' + esc(img) + '" style="width:64px;height:64px;object-fit:cover;border-radius:10px;background:#f3f4f6" onerror="this.style.opacity=.3"/>'
        : '<div style="width:64px;height:64px;border-radius:10px;background:#f3f4f6;display:flex;align-items:center;justify-content:center;color:#c2c6cc;font-size:1.3rem">📦</div>';

      // Info: Titel + Marke + Badges
      h += '<div style="min-width:0">';
      h += '<div style="font-weight:600;font-size:.98rem;color:var(--text,#101828);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(p.title || '—') + '</div>';
      h += '<div style="display:flex;gap:.4rem;align-items:center;flex-wrap:wrap;margin-top:.3rem">';
      h += '<span style="font-size:.8rem;color:var(--muted,#667085)">' + esc(p.brand || '—') + '</span>';
      if (ws) h += '<span style="font-size:.7rem;font-weight:600;background:#eaf6ee;color:#0a7d36;border:1px solid #b7e3c4;border-radius:20px;padding:.08rem .55rem">' + esc(wsT('badge')) + '</span>';
      if (inactive) h += '<span style="font-size:.7rem;font-weight:600;background:#f1f3f5;color:#667085;border-radius:20px;padding:.08rem .55rem">' + esc(({de:'inaktiv',en:'inactive',fr:'inactif',pt:'inativo',es:'inactivo',sw:'haifanyi kazi',ar:'غير نشط',tr:'pasif',ln:'esali te'})[S.lang] || 'inactive') + '</span>';
      if (p.review_status === 'pending') h += '<span style="font-size:.7rem;font-weight:600;background:#fff7e6;color:#b45309;border-radius:20px;padding:.08rem .55rem">⏳ ' + esc(rdyTxt().in_review) + '</span>';
      if (p.review_status === 'rejected') h += '<span style="font-size:.7rem;font-weight:600;background:#fef2f2;color:#b91c1c;border-radius:20px;padding:.08rem .55rem" title="' + esc(p.review_note || '') + '">✕ ' + esc(rdyTxt().rejected) + (p.review_note ? ': ' + esc(p.review_note) : '') + '</span>';
      h += '</div></div>';

      // Rechts: Preis + Bestand-Pill + Aktionen
      h += '<div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;justify-content:flex-end">';
      h += '<div style="text-align:right;line-height:1.15">';
      h += '<div style="font-weight:700;font-size:1rem;color:var(--p700,#003057)">' + fmt(p.price_usd) + '</div>';
      h += '<div style="margin-top:.25rem"><span style="font-size:.72rem;font-weight:600;color:' + stockColor + ';background:' + stockBg + ';border-radius:20px;padding:.1rem .5rem">' + esc(t('seller_prod.col_stock')) + ': ' + stock + '</span></div>';
      h += '</div>';
      h += '<div style="display:flex;gap:.4rem">';
      h += '<button class="btn btn-ghost btn-sm" onclick="spEdit(\'' + p.id + '\')">✏️ ' + esc(t('seller_prod.btn_edit')) + '</button>';
      h += '<button class="btn btn-ghost btn-sm" style="color:#c33" onclick="spDelete(\'' + p.id + '\')">🗑️ ' + esc(t('seller_prod.btn_delete')) + '</button>';
      h += '</div>';
      h += '</div>';

      h += '</div>';
    });
    h += '</div>';
    listEl.innerHTML = h;
  }

  // Formular rendern (Create oder Edit)
  function renderForm(product) {
    editingId = product ? product.id : null;
    uploadedImages = [];
    if (product && product.images) {
      if (Array.isArray(product.images)) uploadedImages = product.images.slice();
      else if (typeof product.images === 'string') {
        try { uploadedImages = JSON.parse(product.images); } catch (e) {}
      }
    }

    const v = function (k, d) { return product && product[k] != null ? product[k] : (d != null ? d : ''); };
    const title = v('title', '');
    const desc = v('description', '');
    const price = v('price_usd', '');
    const stock = v('stock', 0);
    const weight = v('weight_kg', '');
    const wLabel = ({de:'Gewicht (kg)',en:'Weight (kg)',fr:'Poids (kg)',pt:'Peso (kg)',es:'Peso (kg)',sw:'Uzito (kg)',ar:'الوزن (كجم)',tr:'Ağırlık (kg)',ln:'Kilo (kg)'})[S.lang] || 'Weight (kg)';
    const wHint = ({de:'für automatische Versandberechnung',en:'for automatic shipping cost',fr:'pour le calcul automatique des frais',pt:'para cálculo automático de envio',es:'para cálculo automático de envío',sw:'kwa kukokotoa usafirishaji kiotomatiki',ar:'لحساب الشحن تلقائيًا',tr:'otomatik kargo hesabı için',ln:'mpo na kotanga komema'})[S.lang] || 'for automatic shipping cost';
    const brand = v('brand', '');
    const model = v('model', '');
    const oem = v('oem', '');
    const sku = v('sku', '');
    const ean = v('ean', '');
    const skuLabel = ({de:'Artikelnummer',en:'Article number (SKU)',fr:'Référence (SKU)',pt:'Referência (SKU)',es:'Referencia (SKU)',sw:'Nambari ya bidhaa',ar:'رقم الصنف (SKU)',tr:'Stok kodu (SKU)',ln:'Numéro ya article (SKU)'})[S.lang] || 'Article number (SKU)';
    const skuPh = ({de:'optional, deine interne Nr.',en:'optional, your internal no.',fr:'facultatif, réf. interne',pt:'opcional, ref. interna',es:'opcional, ref. interna',sw:'hiari',ar:'اختياري',tr:'isteğe bağlı',ln:'optionnel'})[S.lang] || 'optional';
    const eanLabel = ({de:'EAN / Barcode',en:'EAN / Barcode',fr:'EAN / Code-barres',pt:'EAN / Código de barras',es:'EAN / Código de barras',sw:'EAN / Barcode',ar:'EAN / الباركود',tr:'EAN / Barkod',ln:'EAN / Code-barres'})[S.lang] || 'EAN / Barcode';
    const eanPh = ({de:'z. B. 4006381333931',en:'e.g. 4006381333931',fr:'ex. 4006381333931',pt:'ex. 4006381333931',es:'ej. 4006381333931',sw:'mf. 4006381333931',ar:'مثال 4006381333931',tr:'örn. 4006381333931',ln:'ndakisa 4006381333931'})[S.lang] || 'e.g. 4006381333931';
    const condition = v('condition', 'new');
    const cat = v('category_id', '');
    const tagsArr = Array.isArray(v('tags', [])) ? v('tags', []) : [];
    const tags = tagsArr.length ? tagsArr.join(', ') : (typeof v('tags', '') === 'string' ? v('tags', '') : '');
    const active = product ? !!product.active : true;

    let h = '<details id="sp-form" class="sp-form-card"' + (product ? ' open' : '') + '>';
    h += '<summary>' + (product ? '✏️ ' + esc(t('seller_prod.summary_edit')) : esc(t('seller_prod.summary_new'))) + '</summary>';
    h += '<div class="sp-form-grid">';

    h += '<div class="fg"><label>' + esc(t('seller_prod.f_title')) + '</label><input id="spTitle" maxlength="200" value="' + esc(title) + '" placeholder="' + esc(t('seller_prod.ph_title')) + '"/></div>';
    h += '<div class="fg"><label>' + esc(t('seller_prod.f_desc')) + '</label><textarea id="spDesc" rows="3" placeholder="' + esc(t('seller_prod.ph_desc')) + '">' + esc(desc) + '</textarea></div>';

    h += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:.75rem">';
    // Preis + Eingabewaehrung: Haendler tippt in seiner Waehrung, gespeichert wird USD
    var spCur0 = product ? 'USD' : (CURRENCIES[S.currency] ? S.currency : 'USD');
    h += '<div class="fg"><label>' + esc(t('seller_prod.f_price')) + '</label>'
      + '<div style="display:flex;gap:.4rem">'
      + '<input id="spPrice" type="number" step="0.01" min="0" value="' + esc(price) + '" oninput="spPricePreview()" style="flex:1;min-width:0"/>'
      + '<select id="spPriceCur" data-prev="' + spCur0 + '" onchange="spPriceCurChanged()" title="' + esc(spCurTxt().label) + '" style="width:auto">'
      + Object.keys(CURRENCIES).map(function (c) { return '<option value="' + c + '"' + (c === spCur0 ? ' selected' : '') + '>' + c + '</option>'; }).join('')
      + '</select></div>'
      + '<small id="spPricePrev" style="display:block;margin-top:.25rem;opacity:.75">' + esc(spPricePreviewText(price, spCur0)) + '</small></div>';
    h += '<div class="fg"><label>' + esc(t('seller_prod.f_stock')) + '</label><input id="spStock" type="number" min="0" value="' + esc(stock) + '"/></div>';
    h += '<div class="fg"><label>' + esc(wLabel) + ' <small style="opacity:.6">' + esc(wHint) + '</small></label><input id="spWeight" type="number" step="0.1" min="0" value="' + esc(weight) + '" placeholder="z. B. 2.5"/></div>';
    h += '</div>';

    // ---- GROSSHANDEL / Staffelpreise (Alibaba-Stil) ----
    var saleMode = v('sale_mode', 'retail');
    var initTiers = wsTiers(product || {});
    h += '<div class="sp-ws-box">';
    h += '<label style="font-weight:700">🏷️ ' + esc(wsT('f_mode')) + '</label>';
    h += '<select id="spSaleMode">';
    [['retail', wsT('mode_retail')], ['wholesale', wsT('mode_wholesale')], ['both', wsT('mode_both')]].forEach(function (pair) {
      h += '<option value="' + pair[0] + '"' + (saleMode === pair[0] ? ' selected' : '') + '>' + esc(pair[1]) + '</option>';
    });
    h += '</select>';
    h += '<label>' + esc(wsT('f_tiers')) + ' <small style="opacity:.6">' + esc(wsT('tiers_hint')) + '</small></label>';
    h += '<div id="spTiers" style="display:flex;flex-direction:column;gap:.4rem;margin:.45rem 0"></div>';
    initTiers.forEach(function (tr) { h += window.spTierRowHtml(tr.min, tr.price); });
    h += '<button type="button" class="btn btn-ghost btn-sm" onclick="spAddTier()">' + esc(wsT('add_tier')) + '</button>';
    h += '</div>';

    h += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:.75rem">';
    h += '<div class="fg"><label>' + esc(t('seller_prod.f_brand')) + '</label><input id="spBrand" maxlength="100" value="' + esc(brand) + '" placeholder="' + esc(t('seller_prod.ph_brand')) + '"/></div>';
    h += '<div class="fg"><label>' + esc(t('seller_prod.f_model')) + '</label><input id="spModel" maxlength="100" value="' + esc(model) + '" placeholder="' + esc(t('seller_prod.ph_model')) + '"/></div>';
    h += '</div>';

    h += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:.75rem">';
    h += '<div class="fg"><label>' + esc(t('seller_prod.f_oem')) + '</label><input id="spOem" maxlength="100" value="' + esc(oem) + '" placeholder="' + esc(t('seller_prod.ph_oem')) + '"/></div>';
    h += '<div class="fg"><label>' + esc(skuLabel) + '</label><input id="spSku" maxlength="100" value="' + esc(sku) + '" placeholder="' + esc(skuPh) + '"/></div>';
    h += '<div class="fg"><label>' + esc(eanLabel) + '</label><input id="spEan" maxlength="14" value="' + esc(ean) + '" placeholder="' + esc(eanPh) + '"/></div>';
    h += '<div class="fg"><label>' + esc(t('seller_prod.f_condition')) + '</label><select id="spCondition">';
    [['new', t('seller_prod.cond_new')], ['used', t('seller_prod.cond_used')], ['refurbished', t('seller_prod.cond_ref')]].forEach(function (pair) {
      h += '<option value="' + pair[0] + '"' + (condition === pair[0] ? ' selected' : '') + '>' + esc(pair[1]) + '</option>';
    });
    h += '</select></div>';
    h += '</div>';

    // ---- Passende Fahrzeuge (optional) ----
    var fitsVal = v('fits_vehicles', '');
    var fitsLabel = ({de:'Passende Fahrzeuge',en:'Compatible vehicles',fr:'Véhicules compatibles',pt:'Veículos compatíveis',es:'Vehículos compatibles',sw:'Magari yanayolingana',ar:'المركبات المتوافقة',tr:'Uyumlu araçlar',ln:'Mituka oyo ekoki'})[S.lang] || 'Compatible vehicles';
    var fitsHint = ({de:'optional – wähle Marke & Modell, für die dieses Teil passt',en:'optional – pick the make & model this part fits',fr:'facultatif – choisissez la marque et le modèle',pt:'opcional – escolha a marca e o modelo',es:'opcional – elige la marca y el modelo',sw:'hiari – chagua chapa na modeli inayofaa',ar:'اختياري – اختر الماركة والموديل',tr:'isteğe bağlı – marka ve modeli seçin',ln:'optionnel – pona marque na modèle'})[S.lang] || 'optional';
    var fitsAllModels = ({de:'(alle Modelle)',en:'(all models)',fr:'(tous modèles)',pt:'(todos os modelos)',es:'(todos los modelos)',sw:'(modeli zote)',ar:'(كل الموديلات)',tr:'(tüm modeller)',ln:'(modèles nyonso)'})[S.lang] || '(all models)';
    var fitsBrandPh = ({de:'Marke…',en:'Make…',fr:'Marque…',pt:'Marca…',es:'Marca…',sw:'Chapa…',ar:'الماركة…',tr:'Marka…',ln:'Marque…'})[S.lang] || 'Make…';
    var fitsAddLbl = ({de:'+ Hinzufügen',en:'+ Add',fr:'+ Ajouter',pt:'+ Adicionar',es:'+ Añadir',sw:'+ Ongeza',ar:'+ إضافة',tr:'+ Ekle',ln:'+ Bakisa'})[S.lang] || '+ Add';
    h += '<div class="fg sp-fits-box"><label>🚗 ' + esc(fitsLabel) + ' <small style="opacity:.6">' + esc(fitsHint) + '</small></label>';
    h += '<input type="hidden" id="spFits" value="' + esc(fitsVal) + '"/>';
    h += '<div class="sp-fits-row">';
    h += '<select id="spFitsBrand" onchange="spFitsBrandChange()"><option value="">' + esc(fitsBrandPh) + '</option>';
    window.CAR_BRANDS.forEach(function (b) { h += '<option value="' + esc(b) + '">' + esc(b) + '</option>'; });
    h += '</select>';
    h += '<select id="spFitsModel" data-all="' + esc(fitsAllModels) + '"><option value="">' + esc(fitsAllModels) + '</option></select>';
    h += '<button type="button" class="btn btn-ghost btn-sm" onclick="spFitsAdd()">' + esc(fitsAddLbl) + '</button>';
    h += '</div>';
    h += '<div id="spFitsChips" class="sp-fits-chips"></div>';
    h += '</div>';

    h += '<div class="fg"><label>' + esc(t('seller_prod.f_cat')) + '</label><select id="spCategory">';
    h += '<option value="">' + esc(t('seller_prod.no_cat')) + '</option>';
    categories.forEach(function (c) {
      const cid = c.id || c.slug || '';
      const cname = c.name || c.title || c.slug || '?';
      h += '<option value="' + esc(cid) + '"' + (String(cat) === String(cid) ? ' selected' : '') + '>' + esc(cname) + '</option>';
    });
    h += '</select></div>';

    h += '<div class="fg"><label>' + esc(t('seller_prod.f_tags')) + ' <small style="opacity:.6">(' + esc(t('seller_prod.tags_hint')) + ')</small></label>';
    h += '<input id="spTags" value="' + esc(tags) + '" placeholder="' + esc(t('seller_prod.ph_tags')) + '"/></div>';

    // Bild-Upload
    h += '<div class="fg"><label>' + esc(t('seller_prod.f_images')) + ' <small style="opacity:.6">(' + esc(t('seller_prod.images_hint')) + ')</small></label>';
    h += '<div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap;margin-bottom:.5rem">';
    h += '<input id="spImageFile" type="file" accept="image/jpeg,image/png,image/webp" multiple style="display:none" onchange="spHandleUpload(this)"/>';
    h += '<button type="button" class="btn btn-ghost btn-sm" onclick="document.getElementById(\'spImageFile\').click()">📤 ' + esc(t('seller_prod.btn_upload')) + '</button>';
    h += '<small style="opacity:.65">' + esc(t('seller_prod.images_info')) + '</small>';
    h += '</div>';
    h += '<div id="spImageGrid" style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.25rem"></div>';
    h += '</div>';

    h += '<div class="fg"><label style="display:flex;align-items:center;gap:.5rem;font-weight:normal;cursor:pointer">';
    h += '<input id="spActive" type="checkbox" ' + (active ? 'checked' : '') + ' style="width:auto"/>';
    h += '<span>' + esc(t('seller_prod.f_active')) + '</span></label></div>';

    h += '<div class="sp-actions" style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">';
    h += '<button type="button" class="btn btn-primary" onclick="spSave()">' + (product ? '💾 ' + esc(t('seller_prod.btn_update')) : '✚ ' + esc(t('seller_prod.btn_create'))) + '</button>';
    if (product) h += '<button type="button" class="btn btn-ghost" onclick="spCancelEdit()">' + esc(t('seller_prod.btn_cancel')) + '</button>';
    h += '<div id="spStatus" style="margin-left:auto;font-size:.85rem;opacity:.8"></div>';
    h += '</div>';

    h += '</div></details>';
    $('sp-form-slot').innerHTML = h;
    renderImagePreview();
    window._spFits = fitsVal ? fitsVal.split(',').map(function (s) { return s.trim(); }).filter(Boolean) : [];
    if (window.spFitsSync) window.spFitsSync();
  }

  function renderImagePreview() {
    const grid = $('spImageGrid');
    if (!grid) return;
    if (!uploadedImages.length) { grid.innerHTML = '<small style="opacity:.55">' + esc(t('seller_prod.no_images')) + '</small>'; return; }
    let h = '';
    uploadedImages.forEach(function (url, idx) {
      h += '<div style="position:relative;width:84px;height:84px">';
      h += '<img src="' + esc(url) + '" style="width:84px;height:84px;object-fit:cover;border-radius:6px;border:1px solid var(--border,#ccc)"/>';
      h += '<button type="button" onclick="spRemoveImage(' + idx + ')" title="Entfernen" style="position:absolute;top:-6px;right:-6px;width:22px;height:22px;border-radius:50%;border:none;background:#c33;color:#fff;cursor:pointer;font-size:14px;line-height:1;font-weight:700">×</button>';
      h += '</div>';
    });
    grid.innerHTML = h;
  }

  // Window-Handlers
  window.spHandleUpload = async function (input) {
    const files = Array.prototype.slice.call(input.files || []);
    input.value = '';
    if (!files.length) return;
    const remaining = 5 - uploadedImages.length;
    if (remaining <= 0) { toast(t('seller_prod.err_max_5'), 't-error'); return; }
    if (files.length > remaining) { toast(t('seller_prod.err_only_n').replace('{n}', remaining), 't-error'); return; }
    const status = $('spStatus');
    if (status) status.textContent = '⏳ ' + t('seller_prod.status_uploading');
    try {
      const urls = await uploadProductImages(files);
      uploadedImages.push.apply(uploadedImages, urls);
      renderImagePreview();
      if (status) status.textContent = '✓ ' + t('seller_prod.status_uploaded');
      setTimeout(function () { if (status) status.textContent = ''; }, 2000);
    } catch (e) {
      toast(e.message || t('seller_prod.err_upload'), 't-error');
      if (status) status.textContent = '';
    }
  };

  window.spRemoveImage = function (idx) {
    uploadedImages.splice(idx, 1);
    renderImagePreview();
  };

  // ---- Grosshandel-Staffel: Zeilen-Builder + Hinzufuegen ----
  window.spTierRowHtml = function (min, price) {
    return '<div class="sp-tier-row" style="display:flex;gap:.4rem;align-items:center">'
      + '<input type="number" min="2" step="1" class="spTierMin" placeholder="' + esc(wsT('tier_qty')) + '" value="' + (min != null ? min : '') + '" style="flex:1"/>'
      + '<input type="number" min="0" step="0.01" class="spTierPrice" placeholder="' + esc(wsT('tier_price')) + '" value="' + (price != null ? price : '') + '" style="flex:1"/>'
      + '<button type="button" class="btn btn-ghost btn-sm" style="color:#c33" title="×" onclick="this.closest(\'.sp-tier-row\').remove()">×</button>'
      + '</div>';
  };
  window.spAddTier = function () {
    var c = document.getElementById('spTiers');
    if (c) c.insertAdjacentHTML('beforeend', window.spTierRowHtml(null, null));
  };

  // ---- Passende Fahrzeuge: Chip-Picker ----
  window._spFits = window._spFits || [];
  window.spFitsBrandChange = function () {
    var bEl = document.getElementById('spFitsBrand');
    var sel = document.getElementById('spFitsModel');
    if (!bEl || !sel) return;
    var models = (window.CAR_MODELS[bEl.value] || []);
    var allLbl = sel.getAttribute('data-all') || '';
    sel.innerHTML = '<option value="">' + esc(allLbl) + '</option>' +
      models.map(function (m) { return '<option value="' + esc(m) + '">' + esc(m) + '</option>'; }).join('');
  };
  window.spFitsAdd = function () {
    var bEl = document.getElementById('spFitsBrand');
    var mEl = document.getElementById('spFitsModel');
    var b = bEl ? (bEl.value || '') : '';
    var m = mEl ? (mEl.value || '') : '';
    if (!b) return;
    var label = (m ? (b + ' ' + m) : b).replace(/,/g, ' ').trim();
    if (window._spFits.indexOf(label) === -1) { window._spFits.push(label); window.spFitsSync(); }
    if (bEl) bEl.value = '';
    if (mEl) mEl.innerHTML = '<option value="">' + esc(mEl.getAttribute('data-all') || '') + '</option>';
  };
  window.spFitsRemove = function (idx) {
    window._spFits.splice(idx, 1); window.spFitsSync();
  };
  window.spFitsSync = function () {
    var hid = document.getElementById('spFits');
    if (hid) hid.value = window._spFits.join(', ');
    var box = document.getElementById('spFitsChips');
    if (!box) return;
    box.innerHTML = window._spFits.map(function (v, i) {
      return '<span class="sp-fits-chip">' + esc(v) + '<b onclick="spFitsRemove(' + i + ')">×</b></span>';
    }).join('');
  };

  window.spEdit = async function (id) {
    const status = $('spStatus');
    if (status) status.textContent = '⏳ ' + t('seller_prod.status_loading');
    try {
      let product;
      try {
        const r = await apiReq('/seller/products/' + id, 'GET', null, true);
        product = r.data || r;
      } catch (e) {
        const r = await apiReq('/products/' + id, 'GET', null, false);
        product = r.data || r;
      }
      renderForm(product);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      toast(e.message || t('seller_prod.err_load'), 't-error');
    }
  };

  window.spCancelEdit = function () {
    editingId = null;
    uploadedImages = [];
    renderForm(null);
  };

  window.spDelete = async function (id) {
    if (!confirm(t('seller_prod.confirm_delete'))) return;
    try {
      await apiReq('/seller/products/' + id, 'DELETE', null, true);
      toast('✓ ' + t('seller_prod.t_deleted'));
      await loadProducts();
    } catch (e) {
      toast(e.message || t('seller_prod.err_delete'), 't-error');
    }
  };

  // ---- Eingabewaehrung im Produktformular ----
  window.spPricePreview = function () {
    var el = $('spPricePrev'); if (!el) return;
    el.textContent = spPricePreviewText(($('spPrice') || {}).value, ($('spPriceCur') || {}).value || 'USD');
  };
  window.spPriceCurChanged = function () {
    var sel = $('spPriceCur'); if (!sel) return;
    var from = sel.getAttribute('data-prev') || 'USD', to = sel.value;
    var f = fxRate(to) / fxRate(from);
    var round = function (v) { var d = curDecimals(to); return Math.round(v * Math.pow(10, d)) / Math.pow(10, d); };
    var inputs = [$('spPrice')].concat([].slice.call(document.querySelectorAll('#spTiers .spTierPrice')));
    inputs.forEach(function (inp) {
      if (!inp) return;
      var v = parseFloat(inp.value);
      if (!isNaN(v)) inp.value = round(v * f);
    });
    sel.setAttribute('data-prev', to);
    spPricePreview();
  };

  window.spSave = async function () {
    const title = ($('spTitle').value || '').trim();
    const desc = ($('spDesc').value || '').trim();
    // Eingabe in der gewaehlten Waehrung -> fuer die Datenbank in USD umrechnen
    const spCur = ($('spPriceCur') && $('spPriceCur').value) || 'USD';
    const toUsd = function (v) { return spCur === 'USD' ? v : Math.round((v / fxRate(spCur)) * 100) / 100; };
    const priceIn = parseFloat($('spPrice').value);
    const price = isNaN(priceIn) ? NaN : toUsd(priceIn);
    const stock = parseInt($('spStock').value, 10) || 0;
    const weightRaw = $('spWeight') ? ($('spWeight').value || '').trim() : '';
    const weight_kg = weightRaw !== '' && !isNaN(parseFloat(weightRaw)) ? parseFloat(weightRaw) : null;
    const brand = ($('spBrand').value || '').trim();
    const model = ($('spModel').value || '').trim();
    const oem = ($('spOem').value || '').trim();
    const sku = ($('spSku') ? ($('spSku').value || '').trim() : '');
    const ean = ($('spEan') ? ($('spEan').value || '').trim() : '');
    const fits_vehicles = ($('spFits') ? ($('spFits').value || '').trim() : '');
    const condition = $('spCondition').value;
    const cat = $('spCategory').value;
    const tagsRaw = ($('spTags').value || '').trim();
    const tags = tagsRaw ? tagsRaw.split(',').map(function (x) { return x.trim(); }).filter(Boolean) : [];
    const active = $('spActive').checked;

    // Grosshandel: Verkaufsart + Staffelpreise einsammeln
    const sale_mode = ($('spSaleMode') && $('spSaleMode').value) || 'retail';
    const price_tiers = [];
    document.querySelectorAll('#spTiers .sp-tier-row').forEach(function (row) {
      const mn = parseInt((row.querySelector('.spTierMin') || {}).value, 10);
      const pr = parseFloat((row.querySelector('.spTierPrice') || {}).value);
      if (isFinite(mn) && mn > 1 && isFinite(pr) && pr >= 0) price_tiers.push({ min: mn, price: toUsd(pr) });
    });
    price_tiers.sort(function (a, b) { return a.min - b.min; });

    if (!title) { toast(t('seller_prod.err_title_req'), 't-error'); return; }
    if (isNaN(price) || price < 0) { toast(t('seller_prod.err_price_invalid'), 't-error'); return; }

    const lang = S.lang || 'de';
    const payload = {
      default_lang: lang,
      translations: {},
      title: title,
      description: desc || null,
      price_usd: price,
      stock: stock,
      weight_kg: weight_kg,
      sale_mode: sale_mode,
      price_tiers: price_tiers,
      brand: brand || null,
      model: model || null,
      oem: oem || null,
      sku: sku || null,
      ean: ean || null,
      fits_vehicles: fits_vehicles || null,
      condition: condition,
      category_id: cat || null,
      images: uploadedImages,
      tags: tags,
      active: active
    };
    payload.translations[lang] = { title: title, description: desc || null };

    const status = $('spStatus');
    if (status) status.textContent = '⏳ ' + t('seller_prod.status_saving');
    try {
      var saveRes;
      if (editingId) {
        saveRes = await apiReq('/seller/products/' + editingId, 'PUT', payload, true);
        toast('✓ ' + t('seller_prod.t_updated'));
      } else {
        saveRes = await apiReq('/seller/products', 'POST', payload, true);
        toast('✓ ' + t('seller_prod.t_created'));
      }
      // Server hat das Produkt gespeichert, aber (noch) nicht veroeffentlicht
      if (saveRes && saveRes.review_status === 'pending') {
        setTimeout(function () { toast(rdyTxt().review_toast); }, 600);
      } else if (saveRes && saveRes.published === false) {
        setTimeout(function () { toast(rdyTxt().saved_hidden, 't-error'); }, 600);
      }
      renderReadinessBanner();
      editingId = null;
      uploadedImages = [];
      renderForm(null);
      await loadProducts();
    } catch (e) {
      toast(e.message || t('seller_prod.err_save'), 't-error');
    } finally {
      if (status) status.textContent = '';
    }
  };

  // Page-Shell
  let h = '<div class="page-wrap"><section class="section">';
  h += '<button class="btn btn-ghost btn-sm" onclick="render(\'seller-dashboard\')" style="margin-bottom:1rem">' + esc(t('seller_prod.back')) + '</button>';
  h += '<div class="sec-hd"><div class="sec-title">📦 ' + t('seller.products') + '</div></div>';
  h += '<div id="sp-form-slot"></div>';
  h += '<div id="sp-list"></div>';
  h += '</section></div>';
  $('content').innerHTML = h;
  renderReadinessBanner();

  renderForm(null);
  await loadProducts();
});

/* ---------- ROUTE: CSV IMPORT ---------- */
route('csv-import', async function () {
  if (!S.user || (S.user.role !== 'seller' && S.user.role !== 'dealer' && S.user.role !== 'admin')) { render('login'); return; }

  $('content').innerHTML =
    '<div class="page-wrap"><section class="section">' +
    '<button class="btn btn-ghost btn-sm" onclick="render(\'seller-dashboard\')" style="margin-bottom:1rem">' + esc(t('seller_prod.back')) + '</button>' +
    '<div class="sec-hd"><div class="sec-title">📤 ' + t('csv.title') + '</div></div>' +
    '<p>' + t('csv.info') + '</p>' +
    '<p><strong>' + t('csv.cols') + ':</strong> title, price_usd, brand, model, year, oem, location, condition, moq, category_id</p>' +
    '<button class="btn btn-ghost" onclick="downloadCsvTpl()" style="margin-top:.5rem">' + t('csv.download') + '</button>' +
    '<div class="csv-drop">' +
      '<input type="file" id="csvFile" accept=".csv" style="display:none" onchange="uploadCsv(this.files[0])"/>' +
      '<button class="btn btn-primary" onclick="document.getElementById(\'csvFile\').click()">' + t('csv.drop') + '</button>' +
      '<div style="font-size:.8rem;color:var(--text3);margin-top:.4rem">' + t('csv.drop_sub') + '</div>' +
    '</div>' +
    '<div id="csvStatus" style="margin-top:1rem;font-size:.85rem;color:var(--text2)"></div>' +
    '</section></div>';

  window.downloadCsvTpl = function () {
    const header = 'title,price_usd,brand,model,year,oem,location,condition,moq,category_id\n';
    const blob = new Blob([header], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'africarparts_template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  window.uploadCsv = async function (file) {
    if (!file) return;
    $('csvStatus').textContent = t('csv.processing');
    const fd = new FormData();
    fd.append('file', file);
    try {
      await apiForm('/seller/csv-import', fd, true);
      $('csvStatus').textContent = t('csv.success');
      toast(t('csv.success'));
    } catch (e) {
      $('csvStatus').textContent = e.message || 'Error';
      toast(e.message || 'Error', 't-error');
    }
  };
});

/* ---------- ROUTE: ADMIN BANNERS ---------- */
/* ---------- ROUTE: ADMIN DASHBOARD (Hub) ---------- */
route('admin-dashboard', async function () {
  if (!S.user || S.user.role !== 'admin') { render('login'); return; }

  // Module-Definitionen — neue Module hier hinzufügen und active:true setzen,
  // sobald die zugehörige Route gebaut ist.
  const modules = [
    {
      icon: '🖼️',
      title: t('admin_hub.mod_banner_t'),
      desc: t('admin_hub.mod_banner_d'),
      target: 'admin-banners',
      active: true
    },
    {
      icon: '🗂️',
      title: 'Categories',
      desc: 'Manage main & sub categories with hierarchy, icons and translations',
      target: 'admin-categories',
      active: true
    },
    {
      icon: '📄',
      title: t('footerx.adm_title'),
      desc: t('footerx.adm_desc'),
      target: 'admin-footer',
      active: true
    },
    {
      icon: '📝',
      title: t('home.seo_admin_title'),
      desc: t('home.seo_admin_sub'),
      target: 'admin-seo-texts',
      active: true
    },
    {
      icon: '📦',
      title: t('admin_hub.mod_products_t'),
      desc: t('admin_hub.mod_products_d'),
      target: 'admin-products',
      active: true
    },
    {
      icon: '🛒',
      title: t('admin_hub.mod_orders_t'),
      desc: t('admin_hub.mod_orders_d'),
      target: 'admin-orders',
      active: true
    },
    {
      icon: '🏪',
      title: t('admin_hub.mod_shops_t'),
      desc: t('admin_hub.mod_shops_d'),
      target: 'admin-shops',
      active: true
    },
    {
      icon: '🚚',
      title: 'Versand',
      desc: 'Abholstationen anlegen/bearbeiten und alle Sendungen der Plattform einsehen',
      target: 'admin-shipping',
      active: true
    },
    {
      icon: '\ud83d\udce6',
      title: 'Sendungen & Treuhand',
      desc: 'Alle Sendungen, Tracking-Pr\u00fcfung und Freigabe der H\u00e4ndlerauszahlung an einer Stelle',
      target: 'admin-shipments-board',
      active: true
    },
    {
      icon: '📊',
      title: 'Händlerguthaben',
      desc: 'Guthaben je Händler, Provisionseinnahmen und Belege als CSV für Nachweise',
      target: 'admin-earnings',
      active: true
    },
    {
      icon: '📒',
      title: 'Buchhaltung',
      desc: 'Provisionserträge, eigene Belege und Exporte für den Steuerberater',
      target: 'admin-accounting',
      active: true
    },
    {
      icon: '💸',
      title: 'Auszahlungen',
      desc: 'Offene Händlerguthaben, Payoneer-Zahllauf als CSV und Abrechnung nach der Überweisung',
      target: 'admin-payouts',
      active: true
    },
    {
      icon: '👥',
      title: t('admin_hub.mod_users_t'),
      desc: t('admin_hub.mod_users_d'),
      target: 'admin-users',
      active: true
    },
    {
      icon: '🛡️',
      title: t('admin_hub.mod_mod_t'),
      desc: t('admin_hub.mod_mod_d'),
      target: null,
      active: false
    },
    {
      icon: '📊',
      title: t('admin_hub.mod_analytics_t'),
      desc: t('admin_hub.mod_analytics_d'),
      target: null,
      active: false
    },
    {
      icon: '⚙️',
      title: t('admin_hub.mod_system_t'),
      desc: t('admin_hub.mod_system_d'),
      target: null,
      active: false
    }
  ];

  let h = '<div class="page-wrap"><section class="section">';

  // Header
  h += '<div class="sec-hd" style="margin-bottom:1.25rem">';
  h += '<div class="sec-title">⚡ ' + t('nav.admin') + '</div>';
  h += '</div>';

  // Willkommens-Banner
  const who = esc(S.user.name || S.user.email || 'Admin');
  h += '<div style="margin-bottom:1.75rem;padding:1rem 1.25rem;background:var(--surface2);border-radius:8px;border-left:4px solid var(--a300)">';
  h += '<div style="font-weight:700;margin-bottom:.25rem">' + esc(t('admin_hub.welcome')) + who + ' 👋</div>';
  h += '<div style="opacity:.75;font-size:.9rem">' + esc(t('admin_hub.subtitle')) + '</div>';
  h += '</div>';

  // Modul-Grid
  h += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1rem">';
  modules.forEach(function (m) {
    const clickable = m.active && m.target;
    const cursor = clickable ? 'pointer' : 'default';
    const opacity = clickable ? '1' : '.55';
    const clickAttr = clickable
      ? ' onclick="render(\'' + m.target + '\')" onmouseover="this.style.transform=\'translateY(-2px)\';this.style.borderColor=\'var(--a300)\'" onmouseout="this.style.transform=\'\';this.style.borderColor=\'\'"'
      : '';
    const badge = m.active
      ? '<span style="display:inline-block;padding:.15rem .5rem;background:#16a34a;color:#fff;font-size:.65rem;border-radius:4px;font-weight:700;letter-spacing:.5px">AKTIV</span>'
      : '<span style="display:inline-block;padding:.15rem .5rem;background:var(--surface2);font-size:.65rem;border-radius:4px;font-weight:700;letter-spacing:.5px;opacity:.7">BALD</span>';

    h += '<div style="padding:1.25rem;background:var(--surface2);border:1px solid transparent;border-radius:10px;cursor:' + cursor + ';opacity:' + opacity + ';transition:transform .15s ease,border-color .15s ease"' + clickAttr + '>';
    h += '<div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:.6rem">';
    h += '<div style="font-size:2rem;line-height:1">' + m.icon + '</div>';
    h += badge;
    h += '</div>';
    h += '<div style="font-weight:700;font-size:1.02rem;margin-bottom:.35rem">' + esc(m.title) + '</div>';
    h += '<div style="font-size:.85rem;opacity:.75;line-height:1.4">' + esc(m.desc) + '</div>';
    h += '</div>';
  });
  h += '</div>';

  h += '</section></div>';
  $('content').innerHTML = h;
  // Offene Produkt-Freigaben auf der Produkte-Kachel anzeigen
  apiReq('/admin/products/review-count', 'GET', null, true).then(function (r) {
    if (!r || !r.pending) return;
    var tile = document.querySelector('#content [onclick*="admin-products"]');
    if (tile) tile.insertAdjacentHTML('beforeend', '<div style="margin-top:.6rem;display:inline-block;padding:.2rem .6rem;border-radius:999px;background:#fff7e6;color:#b45309;border:1px solid #f5c26b;font-weight:700;font-size:.8rem">⏳ ' + r.pending + ' zur Prüfung</div>');
  }).catch(function () {});
});

/* ═══════════════════════════════════════════════════════════════════
   ROUTE: ADMIN-CATEGORIES  (v2 — Phase 4)
   Features:
   • Search filter (name + slug)
   • Live product counts per category
   • Bulk select + activate/deactivate
   • Inline rename (click-to-edit) + drag-to-reorder
   • Modal with 5 priority langs (EN, DE, FR, PT, SW)
     + collapsible "more languages" (ES, AR, TR, LN)
   ═══════════════════════════════════════════════════════════════════ */
window._adminCatsCache = null;
window._adminCatsFilter = '';
window._adminCatsSel = new Set();

/* ---------- ROUTE: ADMIN SHOPS (Händler-Verwaltung) ---------- */
route('admin-shops', async function () {
  if (!S.user || S.user.role !== 'admin') { render('login'); return; }

  var allShops = [];

  function fmtMoney(v) { var n = parseFloat(v || 0); return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function fmtDate(d) { if (!d) return '—'; try { return new Date(d).toLocaleDateString(); } catch (e) { return '—'; } }

  function kycBadge(k) {
    var map = {
      verified: ['#0a7d36', '#eaf6ee', '✓ verifiziert'],
      pending: ['#946200', '#fff7e6', '⏳ ausstehend'],
      rejected: ['#c8210a', '#fdece8', '✕ abgelehnt'],
      none: ['#6b7280', '#f1f2f4', '— nicht verifiziert']
    };
    var c = map[k || 'none'] || map.none;
    return '<span style="font-size:.72rem;font-weight:600;padding:2px 8px;border-radius:99px;color:' + c[0] + ';background:' + c[1] + '">' + c[2] + '</span>';
  }
  function subBadge(plan, status) {
    if (!plan) return '<span style="font-size:.72rem;font-weight:600;padding:2px 8px;border-radius:99px;color:#6b7280;background:#f1f2f4">kein Abo</span>';
    var active = status === 'active';
    var col = active ? ['#0a3a82', '#e7f0fd'] : ['#946200', '#fff7e6'];
    var label = String(plan).toUpperCase() + (active ? '' : ' · ' + (status || '?'));
    return '<span style="font-size:.72rem;font-weight:700;padding:2px 8px;border-radius:99px;color:' + col[0] + ';background:' + col[1] + '">' + esc(label) + '</span>';
  }
  function row(label, val) {
    return '<div style="display:flex;justify-content:space-between;gap:10px;padding:3px 0;font-size:.82rem"><span style="color:#6b7280">' + esc(label) + '</span><span style="font-weight:600;text-align:right;word-break:break-word">' + val + '</span></div>';
  }

  function card(s) {
    var loc = [s.city, s.country].filter(Boolean).join(', ') || '—';
    var h = '<div style="border:1px solid #e2e5ec;border-radius:12px;padding:14px 16px;background:#fff;box-shadow:0 1px 3px rgba(16,28,52,.05)">';
    h += '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:8px">';
    h += '<div><div style="font-weight:700;font-size:1rem;color:#14181F">' + esc(s.name || '(ohne Name)') + (s.is_china ? ' <span class="badge badge-china">CN</span>' : '') + '</div>';
    h += '<div style="font-size:.72rem;color:#9aa3af">ID ' + esc(String(s.id)) + ' · ' + (s.active ? '🟢 aktiv' : '⚪ inaktiv') + '</div></div>';
    h += '<div style="text-align:right;display:flex;flex-direction:column;gap:4px;align-items:flex-end">' + kycBadge(s.kyc_status) + subBadge(s.sub_plan, s.sub_status) + '</div>';
    h += '</div>';
    h += row('E-Mail', esc(s.email || '—'));
    h += row('Telefon', esc(s.phone || '—'));
    h += row('Standort', esc(loc));
    h += row('Registriert', fmtDate(s.created_at));
    if (s.tax_number) h += row('Steuernummer', esc(s.tax_number));
    if (s.contact_name) h += row('Ansprechpartner', esc(s.contact_name));
    if (s.plan_choice) h += row('Abo-Wunsch', '<span style="font-weight:700">' + esc(String(s.plan_choice).toUpperCase()) + '</span>');
    h += row('Produkte', '<a href="javascript:void(0)" style="font-weight:700" onclick="render(\'admin-products\',{seller:\'' + esc(String(s.owner_id || '')) + '\'})">' + esc(String(s.product_count || 0)) + ' ansehen →</a>');
    h += row('Umsatz', '<strong>' + fmtMoney(s.revenue_usd) + '</strong>');
    h += '<div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-top:10px;padding-top:10px;border-top:1px solid #eef0f3">';
    h += '<button class="btn btn-ghost btn-sm" onclick="shToggle(\'' + s.id + '\',' + (!s.active) + ')">' + (s.active ? 'Deaktivieren' : 'Freigeben') + '</button>';
    h += '<button class="btn btn-ghost btn-sm" onclick="shView(\'' + esc(String(s.slug || s.id)) + '\')">Ansehen</button>';
    h += '<button class="btn btn-ghost btn-sm" style="color:var(--a400);font-weight:700" onclick="shSupport(\'' + esc(String(s.owner_id || '')) + '\',\'' + encodeURIComponent(s.name || '') + '\')">🛟 Dashboard</button>';
    h += '<button class="btn btn-ghost btn-sm" onclick="shTax(\'' + s.id + '\')">Steuernr.</button>';
    var ky = s.kyc_status || 'none';
    h += '<select onchange="shKyc(\'' + s.id + '\',this.value)" style="font-size:.78rem;padding:5px 7px;border:1px solid #d6dae1;border-radius:7px;background:#fff;cursor:pointer">';
    h += '<option value="verified"' + (ky === 'verified' ? ' selected' : '') + '>✓ Verifiziert</option>';
    h += '<option value="pending"' + (ky === 'pending' ? ' selected' : '') + '>⏳ Ausstehend</option>';
    h += '<option value="rejected"' + (ky === 'rejected' ? ' selected' : '') + '>✕ Abgelehnt</option>';
    h += '<option value="none"' + (ky === 'none' ? ' selected' : '') + '>— Nicht verifiziert</option>';
    h += '</select>';
    h += '<button class="btn btn-ghost btn-sm" style="color:#c33" onclick="shDelete(\'' + s.id + '\')">Löschen</button>';
    h += '</div></div>';
    return h;
  }

  function renderList() {
    var inp = $('shop-search');
    var q = (inp && inp.value ? inp.value : '').trim().toLowerCase();
    var list = allShops;
    if (q) {
      list = allShops.filter(function (s) {
        return String(s.id).indexOf(q) >= 0
          || (s.name || '').toLowerCase().indexOf(q) >= 0
          || (s.city || '').toLowerCase().indexOf(q) >= 0
          || (s.country || '').toLowerCase().indexOf(q) >= 0
          || (s.email || '').toLowerCase().indexOf(q) >= 0;
      });
    }
    var el = $('shop-list');
    var count = '<div style="font-size:.78rem;color:#9aa3af;margin-bottom:.6rem">' + list.length + ' Händler' + (q ? ' (gefiltert)' : '') + '</div>';
    if (!list.length) { el.innerHTML = count + '<div style="padding:24px;text-align:center;color:#6b7280">Keine Treffer.</div>'; return; }
    el.innerHTML = count + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px">' + list.map(card).join('') + '</div>';
  }

  async function loadList() {
    try {
      var res = await apiReq('/admin/shops', 'GET', null, true);
      allShops = res.data || [];
    } catch (e) {
      $('shop-list').innerHTML = '<div class="alert alert-error">' + esc(e.message) + '</div>'; return;
    }
    if (!allShops.length) {
      $('shop-list').innerHTML = '<div class="empty-state"><div class="empty-icon">[-]</div><h3>Noch keine Händler</h3></div>'; return;
    }
    renderList();
  }

  var h = '<div class="page-wrap"><section class="section">';
  h += '<button class="btn btn-ghost btn-sm" onclick="render(\'admin-dashboard\')" style="margin-bottom:1rem">&lt; Zurück</button>';
  h += '<div class="sec-hd"><div class="sec-title">🏪 Händler-Verwaltung</div></div>';
  h += '<p style="opacity:.7;font-size:.85rem;margin:-.25rem 0 1rem;max-width:680px">Alle Händler mit Status, Verifizierung, Abo, Produkten und Umsatz. Suche nach ID, Name, Stadt, Land oder E-Mail.</p>';
  h += '<input id="shop-search" type="search" placeholder="Suchen: ID, Name, Anschrift, E-Mail …" oninput="shFilter()" style="width:100%;max-width:420px;padding:9px 12px;border:1px solid #d6dae1;border-radius:9px;font-size:.9rem;margin-bottom:1rem"/>';
  h += '<div id="shop-list">Lädt…</div>';
  h += '</section></div>';
  $('content').innerHTML = h;

  window.shFilter = renderList;
  window.shToggle = async function (id, makeActive) {
    try { await apiReq('/admin/shops/' + id, 'PUT', { active: !!makeActive }, true); toast('OK'); loadList(); }
    catch (e) { toast(e.message || 'Error', 't-error'); }
  };
  window.shView = function (slugOrId) { render('shop', { id: slugOrId }); };
  window.shSupport = function (ownerId, encName) {
    if (!ownerId) { toast('Diesem Shop ist kein Inhaber-Konto zugeordnet', 't-error'); return; }
    startSupport(ownerId, decodeURIComponent(encName || ''));
  };
  window.shKyc = async function (id, status) {
    if (!status) return;
    try { await apiReq('/admin/shops/' + id + '/kyc', 'PUT', { status: status }, true); toast('Verifizierung aktualisiert'); loadList(); }
    catch (e) { toast(e.message || 'Error', 't-error'); }
  };
  window.shTax = async function (id) {
    var cur = (allShops.filter(function (x) { return String(x.id) === String(id); })[0] || {}).tax_number || '';
    var val = prompt('Steuernummer (leer lassen zum Entfernen):', cur);
    if (val === null) return;
    try { await apiReq('/admin/shops/' + id, 'PUT', { tax_number: val.trim() }, true); toast('Gespeichert'); loadList(); }
    catch (e) { toast(e.message || 'Error', 't-error'); }
  };
  window.shDelete = async function (id) {
    if (!confirm('Diesen Händler wirklich löschen?')) return;
    try { await apiReq('/admin/shops/' + id, 'DELETE', null, true); toast('Gelöscht'); loadList(); }
    catch (e) { toast(e.message || 'Error', 't-error'); }
  };

  loadList();
});

/* ---------- ROUTE: ADMIN SHIPPING (Versand: Stationen + Sendungen) ---------- */
/* ============================================================
   ADMIN: SENDUNGS-BOARD (Treuhand)
   Eine Stelle mit allem: wer hat bestellt, was ist unterwegs,
   welche Trackingnummer ist vom Carrier bestaetigt und welches
   Geld ist freigegeben.
   ============================================================ */
route('admin-shipments-board', async function () {
  if (!S.user || S.user.role !== 'admin') { render('login'); return; }

  var FILTER = window._sbFilter || 'all';

  function stLabel(s) {
    return ({ pending:'Offen', label_created:'Label erstellt', shipped:'Versendet',
              in_transit:'Unterwegs', delivered:'Zugestellt', returned:'R\u00fccksendung',
              problem:'Problem', cancelled:'Storniert' })[s] || s;
  }

  async function load() {
    var box = document.getElementById('sb-body');
    if (box) box.innerHTML = '<div class="loading-wrap"><div class="spinner"></div></div>';
    var res;
    try { res = await apiReq('/admin/shipments/board', 'GET', null, true); }
    catch (e) {
      if (box) box.innerHTML = '<div class="alert alert-error">' + esc(e.message) + '</div>';
      return;
    }
    var all = res.shipments || [];
    var sum = res.summary || {};

    var rows = all.filter(function (s) {
      if (FILTER === 'held')       return !s.released_at;
      if (FILTER === 'unverified') return s.tracking_number && !s.tracking_verified;
      if (FILTER === 'notracking') return !s.tracking_number;
      if (FILTER === 'problem')    return s.status === 'problem';
      if (FILTER === 'released')   return !!s.released_at;
      return true;
    });

    var h = '';
    h += '<div style="display:flex;gap:.6rem;flex-wrap:wrap;margin-bottom:1rem">';
    [['all','Alle ' + (sum.total || 0)], ['held','Gehalten ' + (sum.held || 0)],
     ['unverified','Unbest\u00e4tigt ' + (sum.unverified || 0)], ['notracking','Ohne Tracking'],
     ['problem','Problem ' + (sum.problem || 0)], ['released','Freigegeben ' + (sum.released || 0)]
    ].forEach(function (f) {
      var on = (FILTER === f[0]);
      h += '<button class="btn btn-sm ' + (on ? 'btn-primary' : 'btn-ghost') + '" onclick="sbFilter(\'' + f[0] + '\')">' + esc(f[1]) + '</button>';
    });
    h += '<button class="btn btn-ghost btn-sm" style="margin-left:auto" onclick="sbSweep(this)">\u21bb Alle offenen pr\u00fcfen</button>';
    h += '</div>';

    if (!rows.length) {
      h += '<p style="opacity:.7">Keine Sendungen in dieser Ansicht.</p>';
    } else {
      h += '<div style="display:flex;flex-direction:column;gap:.7rem">';
      rows.forEach(function (s) {
        var badgeBg = (s.status === 'delivered') ? '#16a34a'
                    : (s.status === 'in_transit' || s.status === 'shipped') ? '#2563eb'
                    : (s.status === 'problem' || s.status === 'returned') ? '#dc2626' : '#6b7280';
        var mCol = s.released_at ? '#16a34a' : (s.shipping_payout_status === 'released' ? '#2563eb' : '#6b7280');

        h += '<div style="padding:.85rem 1rem;background:var(--surface2);border-radius:9px;border-left:3px solid ' + mCol + '">';
        h += '<div style="display:flex;justify-content:space-between;align-items:center;gap:.5rem;flex-wrap:wrap;margin-bottom:.45rem">';
        h += '<div style="font-weight:700">#' + s.id + ' \u00b7 Bestellung #' + s.order_id +
             ' <span style="opacity:.6;font-weight:400;font-size:.8rem">H\u00e4ndler ' + esc(s.seller_user_id || '\u2014') + '</span></div>';
        h += '<span style="padding:.15rem .55rem;background:' + badgeBg + ';color:#fff;font-size:.7rem;border-radius:4px;font-weight:700">' + esc(stLabel(s.status)) + '</span>';
        h += '</div>';

        h += '<div style="font-size:.82rem;opacity:.9;line-height:1.65">';
        var its = Array.isArray(s.items) ? s.items : [];
        if (its.length) {
          h += '<div>' + its.map(function (i) { return esc(i.title || ('#' + i.product_id)) + ' \u00d7' + esc(i.qty); }).join(', ') + '</div>';
        }
        h += '<div>Kunde: ' + esc(s.buyer_name || '\u2014');
        if (s.buyer_phone) h += ' \u00b7 ' + esc(s.buyer_phone);
        if (s.destination) h += ' \u2192 ' + esc(s.destination);
        h += '</div>';
        h += '<div>Warenwert ' + fmt(parseFloat(s.goods_total || 0)) +
             ' \u00b7 Versand ' + fmt(parseFloat(s.shipping_fee_usd || 0)) +
             ' \u00b7 H\u00e4ndleranteil ' + fmt(parseFloat(s.payout_total || 0)) + '</div>';

        if (s.tracking_number) {
          var vTxt = s.tracking_verified ? '\u2713 best\u00e4tigt'
                   : (s.status === 'problem' ? '\u26a0 nicht anerkannt' : '\u23f3 ungepr\u00fcft');
          var vCol = s.tracking_verified ? '#16a34a' : (s.status === 'problem' ? '#dc2626' : '#ca8a04');
          h += '<div>Tracking: ';
          if (s.tracking_url) h += '<a href="' + esc(s.tracking_url) + '" target="_blank" rel="noopener">' + esc(s.tracking_number) + '</a>';
          else h += esc(s.tracking_number);
          h += ' <span style="opacity:.7">(' + esc(s.carrier_label || s.carrier || '?') + ')</span>';
          h += ' <span style="color:' + vCol + ';font-weight:600">' + esc(vTxt) + '</span>';
          if (s.tracking_attempts) h += ' <span style="opacity:.55">\u00b7 ' + esc(s.tracking_attempts) + ' Versuche</span>';
          h += '</div>';
          if (s.tracking_detail) h += '<div style="opacity:.7">' + esc(s.tracking_detail) + '</div>';
        } else {
          h += '<div style="opacity:.6">Noch keine Trackingnummer vom H\u00e4ndler</div>';
        }
        h += '<div style="margin-top:.25rem;color:' + mCol + ';font-weight:600">\ud83d\udd12 ' + esc(s.money_state || '') +
             (s.release_reason ? ' <span style="opacity:.7;font-weight:400">(' + esc(s.release_reason) + ')</span>' : '') + '</div>';
        h += '</div>';

        h += '<div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-top:.55rem">';
        if (s.tracking_number) h += '<button class="btn btn-ghost btn-sm" onclick="sbCheck(' + s.id + ', this)">\u21bb Pr\u00fcfen</button>';
        if (!s.released_at) h += '<button class="btn btn-ghost btn-sm" onclick="sbRelease(' + s.id + ')">\ud83d\udd13 Von Hand freigeben</button>';
        h += '</div>';
        h += '</div>';
      });
      h += '</div>';
    }

    if (box) box.innerHTML = h;
  }

  var page = '<div class="page-wrap"><section class="section">';
  page += '<button class="btn btn-ghost btn-sm" onclick="render(\'admin-dashboard\')" style="margin-bottom:1rem">\u2190 Zur\u00fcck</button>';
  page += '<div class="sec-hd" style="margin-bottom:.4rem"><div class="sec-title">\ud83d\udce6 Sendungen & Treuhand</div></div>';
  page += '<p style="font-size:.84rem;opacity:.8;max-width:75ch">Geld bleibt hier, bis der Versand nachgewiesen ist. Der Versandanteil wird frei, sobald der Carrier die Trackingnummer kennt; der Warenwert bei Zustellung oder Kundenbest\u00e4tigung.</p>';
  page += '<div id="sb-body" style="margin-top:1rem"></div>';
  page += '</section></div>';
  $('content').innerHTML = page;

  window.sbFilter = function (f) { window._sbFilter = f; FILTER = f; load(); };

  window.sbCheck = async function (id, btn) {
    if (btn) { btn.disabled = true; btn.textContent = '\u23f3'; }
    try {
      var r = await apiReq('/admin/shipments/' + id + '/check', 'POST', {}, true);
      var c = r.check || {};
      toast(c.valid ? 'Best\u00e4tigt' + (c.released_goods ? ' \u2013 Warenwert freigegeben' : (c.released_shipping ? ' \u2013 Versand freigegeben' : ''))
                    : (c.ok ? 'Carrier kennt die Nummer nicht' : ('Nicht pr\u00fcfbar: ' + (c.error || ''))),
            c.valid ? '' : 't-error');
      load();
    } catch (e) { toast(e.message, 't-error'); if (btn) { btn.disabled = false; btn.textContent = '\u21bb Pr\u00fcfen'; } }
  };

  window.sbRelease = async function (id) {
    var reason = prompt('Grund f\u00fcr die manuelle Freigabe:', 'Kunde hat den Erhalt telefonisch best\u00e4tigt');
    if (reason === null) return;
    try {
      await apiReq('/admin/shipments/' + id + '/release', 'POST', { reason: reason }, true);
      toast('Freigegeben');
      load();
    } catch (e) { toast(e.message, 't-error'); }
  };

  window.sbSweep = async function (btn) {
    if (btn) { btn.disabled = true; btn.textContent = '\u23f3 pr\u00fcfe\u2026'; }
    try {
      var r = await apiReq('/admin/tracking/sweep', 'POST', { limit: 40 }, true);
      var s = r.summary || {};
      toast((s.checked || 0) + ' gepr\u00fcft \u00b7 ' + (s.released_shipping || 0) + ' Versand frei \u00b7 ' + (s.released_goods || 0) + ' Ware frei');
      load();
    } catch (e) { toast(e.message, 't-error'); }
    if (btn) { btn.disabled = false; btn.textContent = '\u21bb Alle offenen pr\u00fcfen'; }
  };

  await load();
});

route('admin-shipping', async function () {
  if (!S.user || S.user.role !== 'admin') { render('login'); return; }

  var editId = null; // null = Neuanlage, sonst PUT auf diese Station-ID
  function stVal(id) { var el = document.getElementById(id); return el ? String(el.value).trim() : ''; }

  // Spaltenraster (Header + Zeilen identisch), unabhängig von .trow-CSS
  var STA_COLS = 'display:grid;grid-template-columns:60px 110px minmax(160px,1.4fr) 120px 90px 210px;gap:.5rem;padding:.55rem .4rem;border-bottom:1px solid rgba(128,128,128,.18);align-items:center';
  var SHP_COLS = 'display:grid;grid-template-columns:44px 64px 64px 72px 72px minmax(140px,1.4fr) 100px minmax(120px,1.4fr);gap:.5rem;padding:.55rem .4rem;border-bottom:1px solid rgba(128,128,128,.18);align-items:center;font-size:.85rem';

  async function loadStations() {
    var box = document.getElementById('ship-stations');
    if (!box) return;
    var stations = [];
    try {
      var res = await apiReq('/admin/pickup-stations', 'GET', null, true);
      stations = res.stations || [];
    } catch (e) { box.innerHTML = '<div class="alert alert-error">' + esc(e.message) + '</div>'; return; }
    window._psCache = stations;
    psFillCountryFilter();
    psRenderStations();
  }

  // Regionen kommen vom Backend (dhlStations.js) - Region wird immer aus dem Land abgeleitet
  var PS_META = null;
  var PS_REGION_OF = {};
  var PS_COUNTRY_NAME = {};
  async function loadMeta() {
    try {
      PS_META = await apiReq('/admin/dhl-stations/meta', 'GET', null, true);
      (PS_META.regions || []).forEach(function (r) {
        r.countries.forEach(function (c) { PS_REGION_OF[c.iso] = r.key; PS_COUNTRY_NAME[c.iso] = c.name; });
      });
    } catch (e) { PS_META = null; }
    renderImportPanel();
    psFillCountryFilter();
    psRenderStations();
  }
  function regionLabel(key) {
    var r = PS_META && (PS_META.regions || []).filter(function (x) { return x.key === key; })[0];
    return r ? r.label : 'Sonstige';
  }

  function psFillCountryFilter() {
    var sel = document.getElementById('psFltCountry');
    if (!sel) return;
    var cur = sel.value;
    var region = stVal('psFltRegion');
    var isos = {};
    (window._psCache || []).forEach(function (s) {
      if (!region || (PS_REGION_OF[s.country] || 'other') === region) isos[s.country] = true;
    });
    var list = Object.keys(isos).sort();
    sel.innerHTML = '<option value="">Alle Länder</option>' + list.map(function (iso) {
      return '<option value="' + esc(iso) + '"' + (iso === cur ? ' selected' : '') + '>' + esc(iso + (PS_COUNTRY_NAME[iso] ? ' – ' + PS_COUNTRY_NAME[iso] : '')) + '</option>';
    }).join('');
  }

  function psRenderStations() {
    var box = document.getElementById('ship-stations');
    if (!box || !window._psCache) return;
    var all = window._psCache;
    if (!all.length) { box.innerHTML = '<p style="opacity:.7">Noch keine Abholstationen.</p>'; return; }

    var fRegion = stVal('psFltRegion'), fCountry = stVal('psFltCountry'), fSource = stVal('psFltSource');
    var fText = stVal('psFltText').toLowerCase();
    var list = all.filter(function (s) {
      var reg = PS_REGION_OF[s.country] || 'other';
      if (fRegion && reg !== fRegion) return false;
      if (fCountry && s.country !== fCountry) return false;
      if (fSource === 'dhl' && s.source !== 'dhl') return false;
      if (fSource === 'manual' && s.source === 'dhl') return false;
      if (fText && ((s.city || '') + ' ' + (s.name || '') + ' ' + (s.address || '')).toLowerCase().indexOf(fText) < 0) return false;
      return true;
    });

    var info = document.getElementById('psCount');
    if (info) info.textContent = list.length + ' von ' + all.length + ' Stationen';
    if (!list.length) { box.innerHTML = '<p style="opacity:.7">Keine Station für diesen Filter.</p>'; return; }

    // Nach Region gruppieren (Reihenfolge wie im Backend), dann Land/Stadt/Name
    var order = ((PS_META && PS_META.regions) || []).map(function (r) { return r.key; }).concat(['other']);
    var groups = {};
    list.forEach(function (s) { var k = PS_REGION_OF[s.country] || 'other'; (groups[k] = groups[k] || []).push(s); });

    var MAX = 400; // sehr lange Listen bremsen den Browser -> Filter nutzen
    var shown = 0;
    var h = '<div style="overflow-x:auto"><div style="min-width:760px">';
    h += '<div style="' + STA_COLS + ';font-weight:700;background:var(--surface2);border-radius:6px"><div>Land</div><div>Stadt</div><div>Name / Adresse</div><div>Telefon</div><div>Status</div><div>Aktionen</div></div>';
    order.forEach(function (key) {
      var g = groups[key];
      if (!g || !g.length) return;
      g.sort(function (a, b) { return (a.country + a.city + a.name).localeCompare(b.country + b.city + b.name); });
      h += '<div style="padding:.7rem .4rem .35rem;font-weight:700;font-size:.95rem;border-bottom:2px solid var(--p700,#3b6cf6)">🌍 ' + esc(regionLabel(key)) + ' <span style="font-weight:400;opacity:.6;font-size:.8rem">(' + g.length + ')</span></div>';
      g.forEach(function (s) {
        if (shown >= MAX) return;
        shown++;
        h += '<div style="' + STA_COLS + '">';
        h += '<div title="' + esc(PS_COUNTRY_NAME[s.country] || '') + '">' + esc(s.country || '—') + '</div>';
        h += '<div>' + esc(s.city || '—') + '</div>';
        h += '<div>' + esc(s.name || '—') + (s.source === 'dhl' ? ' <span style="font-size:.65rem;background:#ffcc00;color:#d40511;font-weight:700;padding:1px 5px;border-radius:4px">DHL</span>' : '') + '<div style="font-size:.75rem;opacity:.6">' + esc(s.address || '') + (s.opening_hours ? ' · ' + esc(s.opening_hours) : '') + '</div></div>';
        h += '<div style="font-size:.8rem;opacity:.85">' + esc(s.phone || '—') + '</div>';
        h += '<div>' + (s.active ? '🟢 aktiv' : '⚪ inaktiv') + '</div>';
        h += '<div style="display:flex;gap:.35rem;flex-wrap:wrap">';
        h += '<button class="btn btn-ghost btn-sm" onclick="psEdit(' + s.id + ')">Bearb.</button>';
        h += '<button class="btn btn-ghost btn-sm" onclick="psToggle(' + s.id + ',' + (!s.active) + ')">' + (s.active ? 'Deakt.' : 'Aktiv.') + '</button>';
        h += '<button class="btn btn-ghost btn-sm" style="color:#c33" onclick="psDelete(' + s.id + ')">Lö.</button>';
        h += '</div></div>';
      });
    });
    h += '</div></div>';
    if (shown < list.length) h += '<p style="opacity:.7;font-size:.85rem;margin-top:.5rem">Es werden die ersten ' + MAX + ' Stationen angezeigt – bitte nach Region oder Land filtern.</p>';
    box.innerHTML = h;
  }

  /* ---------- DHL-IMPORT ---------- */
  function renderImportPanel() {
    var box = document.getElementById('psDhlPanel');
    if (!box) return;
    if (!PS_META) {
      box.innerHTML = '<div class="alert alert-error">DHL-Import nicht erreichbar – dhlStations.js deployt und /api/migrate-dhl-stations aufgerufen?</div>';
      return;
    }
    var h = '';
    if (!PS_META.keyConfigured) {
      h += '<div class="alert alert-error" style="margin-bottom:.6rem">DHL_API_KEY ist in Render noch nicht gesetzt. Kostenlosen Key auf developer.dhl.com für „Location Finder – Unified“ anfordern.</div>';
    }
    h += '<div style="display:flex;gap:.6rem;flex-wrap:wrap;align-items:center">';
    h += '<select id="psImpRegion"><option value="">Ganz Afrika (alle Regionen)</option>' + PS_META.regions.map(function (r) {
      return '<option value="' + r.key + '">' + esc(r.label) + ' (' + r.countries.length + ' Länder)</option>';
    }).join('') + '</select>';
    h += '<button class="btn btn-primary btn-sm" id="psImpBtn" onclick="psImportDhl()">DHL Service Points importieren</button>';
    h += '<button class="btn btn-ghost btn-sm" id="psImpStop" style="display:none" onclick="window._psStop=true">Stopp</button>';
    h += '</div>';
    h += '<div style="display:flex;gap:.6rem;flex-wrap:wrap;align-items:center;margin-top:.6rem">';
    h += '<select id="psImpCountry"><option value="">— Land —</option>' + PS_META.regions.map(function (r) {
      return '<optgroup label="' + esc(r.label) + '">' + r.countries.map(function (c) { return '<option value="' + c.iso + '">' + esc(c.iso + ' – ' + c.name) + '</option>'; }).join('') + '</optgroup>';
    }).join('') + '</select>';
    h += '<input id="psImpCity" placeholder="Weitere Stadt (optional)" style="max-width:200px"/>';
    h += '<button class="btn btn-ghost btn-sm" onclick="psImportOne()">Nur dieses Land / diese Stadt</button>';
    h += '<button class="btn btn-ghost btn-sm" style="color:#c33" onclick="psDeleteDhl()">DHL-Importe löschen</button>';
    h += '</div>';
    h += '<div style="font-size:.78rem;opacity:.65;margin-top:.4rem">1 Stadt = 1 DHL-Abfrage (Kontingent 500/Tag). Ganz Afrika ≈ ' + PS_META.totalCalls + ' Abfragen, ca. 4–5 Minuten. Mehrfaches Importieren erzeugt keine Duplikate.</div>';
    h += '<div id="psImpLog" style="margin-top:.6rem;font-size:.82rem;max-height:220px;overflow:auto"></div>';
    box.innerHTML = h;
  }

  function impLog(line, isErr) {
    var el = document.getElementById('psImpLog');
    if (!el) return;
    el.insertAdjacentHTML('beforeend', '<div style="' + (isErr ? 'color:#c33' : '') + '">' + line + '</div>');
    el.scrollTop = el.scrollHeight;
  }

  async function importOneCountry(iso, cities) {
    var body = { country: iso };
    if (cities && cities.length) body.cities = cities;
    try {
      var r = await apiReq('/admin/dhl-stations/import', 'POST', body, true);
      var x = r.result;
      impLog('✅ <b>' + esc(x.country) + '</b> ' + esc(x.name) + ': ' + x.found + ' gefunden (' + x.inserted + ' neu, ' + x.updated + ' aktualisiert)' + (x.errors.length ? ' · ⚠️ ' + esc(x.errors.join('; ')) : ''));
      return { ok: true, result: x };
    } catch (e) {
      impLog('❌ <b>' + esc(iso) + '</b>: ' + esc(e.message), true);
      var fatal = /Limit|DHL_API_KEY|Key|Migration/i.test(e.message);
      return { ok: false, fatal: fatal };
    }
  }

  window.psImportDhl = async function () {
    if (!PS_META) return;
    var regionKey = stVal('psImpRegion');
    var regions = PS_META.regions.filter(function (r) { return !regionKey || r.key === regionKey; });
    var countries = [];
    regions.forEach(function (r) { r.countries.forEach(function (c) { countries.push(c); }); });
    if (!confirm(countries.length + ' Länder importieren? Das dauert einige Minuten – Seite bitte offen lassen.')) return;

    var btn = document.getElementById('psImpBtn'), stop = document.getElementById('psImpStop');
    if (btn) btn.disabled = true;
    if (stop) stop.style.display = '';
    window._psStop = false;
    var logEl = document.getElementById('psImpLog'); if (logEl) logEl.innerHTML = '';
    var tot = { found: 0, inserted: 0 };
    for (var i = 0; i < countries.length; i++) {
      if (window._psStop) { impLog('⏹️ Abgebrochen.'); break; }
      impLog('⏳ ' + (i + 1) + '/' + countries.length + ' ' + esc(countries[i].iso + ' – ' + countries[i].name) + ' …');
      var r = await importOneCountry(countries[i].iso);
      if (r.ok) { tot.found += r.result.found; tot.inserted += r.result.inserted; }
      if (r.fatal) { impLog('Import angehalten. Später erneut starten – bereits importierte Länder werden nur aktualisiert.', true); break; }
    }
    impLog('<b>Fertig: ' + tot.found + ' Service Points, davon ' + tot.inserted + ' neu.</b>');
    if (btn) btn.disabled = false;
    if (stop) stop.style.display = 'none';
    loadStations();
  };

  window.psImportOne = async function () {
    var iso = stVal('psImpCountry');
    if (!iso) { toast('Bitte ein Land wählen', 't-error'); return; }
    var city = stVal('psImpCity');
    impLog('⏳ ' + esc(iso) + (city ? ' / ' + esc(city) : '') + ' …');
    await importOneCountry(iso, city ? [city] : null);
    loadStations();
  };

  window.psDeleteDhl = async function () {
    var iso = stVal('psImpCountry');
    var what = iso ? ('alle DHL-Importe in ' + iso) : 'ALLE DHL-Importe (alle Länder)';
    if (!confirm(what + ' löschen? Manuell angelegte Stationen bleiben. Bestehende Sendungen verlieren den Stationsbezug.')) return;
    try {
      var r = await apiReq('/admin/dhl-stations' + (iso ? '?country=' + encodeURIComponent(iso) : ''), 'DELETE', null, true);
      toast(r.deleted + ' DHL-Stationen gelöscht');
      loadStations();
    } catch (e) { toast(e.message, 't-error'); }
  };

  async function loadShipments() {
    var box = document.getElementById('ship-shipments');
    if (!box) return;
    var status = stVal('shipFilterStatus');
    var seller = stVal('shipFilterSeller');
    var q = '/admin/shipments?page=1' + (status ? '&status=' + encodeURIComponent(status) : '') + (seller ? '&seller_user_id=' + encodeURIComponent(seller) : '');
    var shipments = [];
    try {
      var res = await apiReq(q, 'GET', null, true);
      shipments = res.shipments || [];
    } catch (e) { box.innerHTML = '<div class="alert alert-error">' + esc(e.message) + '</div>'; return; }
    if (!shipments.length) { box.innerHTML = '<p style="opacity:.7">Keine Sendungen für diesen Filter.</p>'; return; }
    var stMap = { pending: 'Offen', label_created: 'Label erstellt', shipped: 'Versendet', delivered: 'Zugestellt', cancelled: 'Storniert' };
    var h = '<div style="overflow-x:auto"><div style="min-width:820px">';
    h += '<div style="' + SHP_COLS + ';font-weight:700;background:var(--surface2);border-radius:6px"><div>#</div><div>Best.</div><div>Artikel</div><div>Händler</div><div>Käufer</div><div>Station</div><div>Status</div><div>Tracking</div></div>';
    shipments.forEach(function (s) {
      h += '<div style="' + SHP_COLS + '">';
      h += '<div>' + s.id + '</div>';
      h += '<div>#' + s.order_id + '</div>';
      h += '<div>#' + (s.product_id || '—') + '</div>';
      h += '<div>#' + (s.seller_user_id || '—') + '</div>';
      h += '<div>#' + (s.buyer_user_id || '—') + '</div>';
      h += '<div style="font-size:.8rem">' + (s.pickup_station_name ? esc(s.pickup_station_name) + (s.pickup_station_city ? ' (' + esc(s.pickup_station_city) + ')' : '') : '—') + '</div>';
      h += '<div>' + esc(stMap[s.status] || s.status) + '</div>';
      h += '<div style="font-size:.8rem">' + (s.tracking_number ? esc((s.carrier ? s.carrier + ' · ' : '') + s.tracking_number) : '—') + (s.label_url ? ' · <a href="' + esc(s.label_url) + '" target="_blank" rel="noopener">📄 Label</a>' : '') + '</div>';
      h += '</div>';
    });
    h += '</div></div>';
    box.innerHTML = h;
  }

  var h = '<div class="page-wrap"><section class="section">';
  h += '<button class="btn btn-ghost btn-sm" onclick="render(\'admin-dashboard\')" style="margin-bottom:1rem">&lt; Zurück</button>';
  h += '<div class="sec-hd"><div class="sec-title">🚚 Versand</div></div>';

  // Abschnitt 1: Abholstationen (CRUD)
  h += '<h3 style="margin:1.25rem 0 .5rem">Abholstationen</h3>';
  h += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:.6rem;margin-bottom:.6rem">';
  h += '<input id="psCountry" placeholder="Land ISO-2 (z. B. NG)" maxlength="2"/>';
  h += '<input id="psCity" placeholder="Stadt"/>';
  h += '<input id="psName" placeholder="Stationsname"/>';
  h += '<input id="psAddress" placeholder="Adresse"/>';
  h += '<input id="psPhone" placeholder="Telefon (optional)"/>';
  h += '<input id="psHours" placeholder="Öffnungszeiten (optional)"/>';
  h += '</div>';
  h += '<button class="btn btn-primary btn-sm" id="psSaveBtn" onclick="psSave(this)">Station anlegen</button> ';
  h += '<button class="btn btn-ghost btn-sm" id="psCancelBtn" style="display:none" onclick="psCancelEdit()">Abbrechen</button>';
  // DHL-Import
  h += '<h3 style="margin:1.5rem 0 .5rem">DHL Service Points importieren (Afrika)</h3>';
  h += '<div id="psDhlPanel" style="padding:.8rem;border:1px solid rgba(128,128,128,.25);border-radius:8px">Lädt…</div>';
  // Filter
  h += '<div style="display:flex;gap:.6rem;flex-wrap:wrap;align-items:center;margin-top:1.25rem">';
  h += '<select id="psFltRegion" onchange="psFilterChanged(true)"><option value="">Alle Regionen</option><option value="north">Nordafrika</option><option value="west">Westafrika</option><option value="central">Zentralafrika</option><option value="east">Ostafrika</option><option value="south">Südliches Afrika</option><option value="other">Sonstige</option></select>';
  h += '<select id="psFltCountry" onchange="psFilterChanged()"><option value="">Alle Länder</option></select>';
  h += '<select id="psFltSource" onchange="psFilterChanged()"><option value="">Alle Quellen</option><option value="dhl">Nur DHL</option><option value="manual">Nur manuell</option></select>';
  h += '<input id="psFltText" placeholder="Suche Stadt / Name / Adresse" oninput="psFilterChanged()" style="max-width:220px"/>';
  h += '<span id="psCount" style="font-size:.85rem;opacity:.7"></span>';
  h += '</div>';
  h += '<div id="ship-stations" style="margin-top:.6rem">Lädt…</div>';

  // Abschnitt 2: Sendungen (Filter + Liste, read-only)
  h += '<h3 style="margin:1.75rem 0 .5rem">Sendungen</h3>';
  h += '<div style="display:flex;gap:.6rem;flex-wrap:wrap;margin-bottom:.6rem;align-items:center">';
  h += '<select id="shipFilterStatus" onchange="psLoadShipments()"><option value="">Alle Status</option><option value="pending">Offen</option><option value="label_created">Label erstellt</option><option value="shipped">Versendet</option><option value="delivered">Zugestellt</option><option value="cancelled">Storniert</option></select>';
  h += '<input id="shipFilterSeller" placeholder="Händler-ID (optional)" style="max-width:180px"/>';
  h += '<button class="btn btn-ghost btn-sm" onclick="psLoadShipments()">Filtern</button>';
  h += '</div>';
  h += '<div id="ship-shipments">Lädt…</div>';

  h += '</section></div>';
  $('content').innerHTML = h;

  window.psLoadShipments = loadShipments;
  window.psFilterChanged = function (regionChanged) {
    if (regionChanged) { var c = document.getElementById('psFltCountry'); if (c) c.value = ''; psFillCountryFilter(); }
    psRenderStations();
  };

  window.psSave = async function (btn) {
    var body = {
      country: stVal('psCountry').toUpperCase(),
      city: stVal('psCity'),
      name: stVal('psName'),
      address: stVal('psAddress'),
      phone: stVal('psPhone') || null,
      opening_hours: stVal('psHours') || null
    };
    if (!body.country || !body.city || !body.name) { toast('Land, Stadt und Name sind Pflicht', 't-error'); return; }
    if (btn) btn.disabled = true;
    try {
      if (editId) await apiReq('/admin/pickup-stations/' + editId, 'PUT', body, true);
      else await apiReq('/admin/pickup-stations', 'POST', body, true);
      toast(editId ? 'Station aktualisiert' : 'Station angelegt');
      psCancelEdit();
      loadStations();
    } catch (e) { toast(e.message, 't-error'); }
    if (btn) btn.disabled = false;
  };

  window.psEdit = function (id) {
    var s = (window._psCache || []).filter(function (x) { return x.id === id; })[0];
    if (!s) return;
    editId = id;
    document.getElementById('psCountry').value = s.country || '';
    document.getElementById('psCity').value = s.city || '';
    document.getElementById('psName').value = s.name || '';
    document.getElementById('psAddress').value = s.address || '';
    document.getElementById('psPhone').value = s.phone || '';
    document.getElementById('psHours').value = s.opening_hours || '';
    document.getElementById('psSaveBtn').textContent = 'Station speichern';
    document.getElementById('psCancelBtn').style.display = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.psCancelEdit = function () {
    editId = null;
    ['psCountry', 'psCity', 'psName', 'psAddress', 'psPhone', 'psHours'].forEach(function (id) { var el = document.getElementById(id); if (el) el.value = ''; });
    var b = document.getElementById('psSaveBtn'); if (b) b.textContent = 'Station anlegen';
    var c = document.getElementById('psCancelBtn'); if (c) c.style.display = 'none';
  };

  window.psToggle = async function (id, makeActive) {
    try { await apiReq('/admin/pickup-stations/' + id, 'PUT', { active: !!makeActive }, true); toast('OK'); loadStations(); }
    catch (e) { toast(e.message, 't-error'); }
  };

  window.psDelete = async function (id) {
    if (!confirm('Diese Station wirklich löschen?')) return;
    try { await apiReq('/admin/pickup-stations/' + id, 'DELETE', null, true); toast('Gelöscht'); loadStations(); }
    catch (e) { toast(e.message, 't-error'); }
  };

  loadStations();
  loadMeta();
  loadShipments();
});

/* ---------- ROUTE: ADMIN CATEGORIES ---------- */
route('admin-categories', async function () {
  if (!S.user || S.user.role !== 'admin') { render('login'); return; }

  // Load with product counts
  let allCats = [];
  try {
    const r = await apiReq('/admin/categories/full?lang=' + S.lang, 'GET', null, true);
    allCats = (r && r.categories) ? r.categories : (Array.isArray(r) ? r : []);
  } catch(e) {
    console.error('[admin-categories] /full failed:', e.message);
    // Fallback to old endpoint if /full not deployed yet
    try {
      const r = await apiReq('/admin/categories', 'GET', null, true);
      allCats = Array.isArray(r) ? r : (r.data || []);
    } catch(e2) {
      console.error('[admin-categories] fallback also failed:', e2.message);
      toast('⚠ Could not load categories: ' + (e2.message || 'auth error'));
    }
  }
  window._adminCatsCache = allCats;
  window._adminCatsSel.clear();

  $('content').innerHTML = adminCatBuildShell(allCats);
  adminCatRender();
});

function adminCatBuildShell(allCats) {
  const mainCats = allCats.filter(c => !c.parent_id);
  const subCats  = allCats.filter(c =>  c.parent_id);
  const totalProducts = allCats.reduce((sum, c) => sum + (parseInt(c.product_count) || 0), 0);

  let h = '<div class="page-wrap"><section class="section">';
  // Header
  h += '<div class="sec-hd">';
  h += '<div><div class="sec-title">🗂️ Category Management</div>';
  h += '<div class="sec-sub">' + mainCats.length + ' main · ' + subCats.length + ' sub · ' + totalProducts + ' products</div></div>';
  h += '<div style="display:flex;gap:.5rem;flex-wrap:wrap">';
  h += '<button class="sb-btn" style="border-radius:var(--r8);font-size:.85rem;padding:.55rem 1.1rem" onclick="adminCatAdd(null)">+ Main Category</button>';
  h += '</div></div>';

  // Toolbar (search + bulk actions)
  h += '<div class="adm-cat-toolbar">';
  h += '<div class="adm-cat-search">';
  h += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
  h += '<input id="adm-cat-q" type="search" placeholder="Search by name or slug…" value="' + esc(window._adminCatsFilter || '') + '" oninput="adminCatFilter(this.value)" />';
  h += '</div>';
  h += '<div class="adm-cat-bulk" id="adm-cat-bulk" style="display:none">';
  h += '<span id="adm-cat-bulk-count" class="adm-cat-bulk-count">0 selected</span>';
  h += '<button class="adm-cat-bulk-btn" onclick="adminCatBulkSetActive(true)">✓ Activate</button>';
  h += '<button class="adm-cat-bulk-btn" onclick="adminCatBulkSetActive(false)">⊘ Deactivate</button>';
  h += '<button class="adm-cat-bulk-btn danger" onclick="adminCatBulkDelete()">🗑 Delete</button>';
  h += '<button class="adm-cat-bulk-btn ghost" onclick="adminCatBulkClear()">Clear</button>';
  h += '</div>';
  h += '</div>';

  // Tree container
  h += '<div class="adm-cat-tree" id="adm-cat-tree"></div>';
  h += '</section></div>';

  // Edit modal (built once, reused)
  h += adminCatModalHTML();
  return h;
}

function adminCatModalHTML() {
  const priLangs = [['en','English'],['de','Deutsch'],['fr','Français'],['pt','Português'],['sw','Kiswahili']];
  const extLangs = [['es','Español'],['ar','العربية'],['tr','Türkçe'],['ln','Lingála']];
  let h = '<div id="cat-modal" class="adm-modal" style="display:none">';
  h += '<div class="adm-modal-card">';
  h += '<h3 id="cat-modal-title" class="adm-modal-title"></h3>';
  h += '<div class="adm-modal-grid">';
  h += '<div class="adm-modal-fld"><label>Slug</label><input id="cat-slug" placeholder="auto from English"></div>';
  h += '<div class="adm-modal-fld"><label>Icon (emoji)</label><input id="cat-icon" placeholder="🔧" maxlength="4"></div>';
  h += '<div class="adm-modal-fld"><label>Sort Order</label><input id="cat-sort" type="number" placeholder="10"></div>';
  h += '<div class="adm-modal-fld" style="display:flex;align-items:flex-end"><label style="display:flex;align-items:center;gap:.5rem;cursor:pointer;margin:0"><input id="cat-active" type="checkbox" checked> <span>Active (visible in shop)</span></label></div>';
  h += '</div>';

  h += '<div class="adm-modal-section">';
  h += '<div class="adm-modal-section-hd" style="display:flex;justify-content:space-between;align-items:center;gap:.5rem">';
  h += '<span>Names · Priority Languages</span>';
  h += '<button type="button" class="adm-modal-btn" id="cat-autotrans-btn" onclick="adminCatAutoTranslate()" style="font-size:.78rem;padding:.35rem .75rem;background:var(--p050,#fff1ed);border:1px solid var(--p300,#fdb39c);color:var(--p600,#d6451f);border-radius:6px;cursor:pointer">🌐 Auto-Translate</button>';
  h += '</div>';
  h += '<div style="font-size:.72rem;color:var(--text3,#8a96a8);margin:.25rem 0 .65rem 0">Fill any language (DE recommended) → click Auto-Translate to fill the others.</div>';
  priLangs.forEach(l => {
    h += '<div class="adm-modal-trans-row">';
    h += '<label>' + l[1] + (l[0]==='en' ? ' *' : '') + '</label>';
    h += '<input id="cat-t-' + l[0] + '" placeholder="Name in ' + l[1] + '">';
    h += '</div>';
  });
  h += '</div>';

  h += '<details class="adm-modal-section adm-modal-extra">';
  h += '<summary>More languages (optional)</summary>';
  extLangs.forEach(l => {
    h += '<div class="adm-modal-trans-row">';
    h += '<label>' + l[1] + '</label>';
    h += '<input id="cat-t-' + l[0] + '" placeholder="Name in ' + l[1] + '">';
    h += '</div>';
  });
  h += '</details>';

  h += '<div class="adm-modal-actions">';
  h += '<button class="adm-modal-btn ghost" onclick="document.getElementById(\'cat-modal\').style.display=\'none\'">Cancel</button>';
  h += '<button class="adm-modal-btn primary" id="cat-save-btn" onclick="adminCatSave()">Save</button>';
  h += '</div>';
  h += '</div></div>';
  return h;
}

function adminCatRender() {
  const tree = document.getElementById('adm-cat-tree');
  if (!tree) return;
  const all = window._adminCatsCache || [];
  const q = (window._adminCatsFilter || '').toLowerCase().trim();

  // Filter logic: a main category is shown if it matches OR any of its subs matches
  function catMatches(c) {
    if (!q) return true;
    const name = ((c.name_de || c.name_en || c.name || '') + ' ' + (c.slug || '')).toLowerCase();
    return name.indexOf(q) !== -1;
  }

  const mainCats = all.filter(c => !c.parent_id);
  const subCats  = all.filter(c =>  c.parent_id);

  let h = '';

  if (!mainCats.length) {
    h += '<div class="adm-cat-empty">No categories yet. <button class="adm-cat-link" onclick="adminCatAdd(null)">+ Add first</button></div>';
  }

  mainCats.forEach(function(mc) {
    const mySubs = subCats.filter(s => String(s.parent_id) === String(mc.id));
    const visibleSubs = mySubs.filter(catMatches);
    const mainVisible = catMatches(mc) || visibleSubs.length > 0;
    if (!mainVisible) return;

    const displayName = mc.name_de || mc.name_en || mc.name || mc.slug;
    const isInactive = mc.active === false;
    const isSelected = window._adminCatsSel.has(String(mc.id));
    const productCount = parseInt(mc.product_count) || 0;

    h += '<div class="adm-cat-main' + (isInactive ? ' inactive' : '') + (isSelected ? ' selected' : '') + '" data-id="' + mc.id + '" draggable="true" ondragstart="adminCatDragStart(event,' + mc.id + ')" ondragover="adminCatDragOver(event)" ondragleave="adminCatDragLeave(event)" ondrop="adminCatDrop(event,' + mc.id + ')">';

    // Header row
    h += '<div class="adm-cat-row">';
    h += '<span class="adm-cat-grip" title="Drag to reorder">⋮⋮</span>';
    h += '<input type="checkbox" class="adm-cat-chk" ' + (isSelected ? 'checked' : '') + ' onclick="event.stopPropagation();adminCatToggleSel(' + mc.id + ')">';
    h += '<button class="adm-cat-toggle" onclick="adminCatToggleExpand(' + mc.id + ')" title="Expand/Collapse" aria-label="Toggle"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg></button>';
    h += '<span class="adm-cat-icon">' + esc(mc.icon_url || '📁') + '</span>';
    h += '<div class="adm-cat-name-wrap">';
    h += '<div class="adm-cat-name" onclick="adminCatInlineEdit(' + mc.id + ', this)" title="Click to edit">' + esc(displayName) + '</div>';
    h += '<div class="adm-cat-meta">';
    h += '<span class="adm-cat-meta-pill">' + mySubs.length + ' subs</span>';
    if (productCount > 0) h += '<span class="adm-cat-meta-pill products">' + productCount + ' products</span>';
    h += '<span class="adm-cat-meta-slug">/' + esc(mc.slug) + '</span>';
    if (isInactive) h += '<span class="adm-cat-meta-pill inactive">inactive</span>';
    h += '</div>';
    h += '</div>';
    h += '<div class="adm-cat-actions">';
    h += '<button class="adm-cat-act" onclick="adminCatToggleActive(' + mc.id + ',' + (!isInactive) + ')" title="' + (isInactive ? 'Activate' : 'Deactivate') + '">' + (isInactive ? '⊘' : '✓') + '</button>';
    h += '<button class="adm-cat-act primary" onclick="adminCatAdd(' + mc.id + ')" title="Add subcategory">+ Sub</button>';
    h += '<button class="adm-cat-act" onclick="adminCatEdit(' + mc.id + ')" title="Edit details">⚙</button>';
    h += '<button class="adm-cat-act danger" onclick="adminCatDelete(' + mc.id + ',\'' + esc(displayName).replace(/'/g,'') + '\')" title="Delete">🗑</button>';
    h += '</div>';
    h += '</div>';

    // Subs container
    h += '<div class="adm-cat-subs" id="adm-cat-subs-' + mc.id + '">';
    visibleSubs.forEach(function(sc) {
      const scName = sc.name_de || sc.name_en || sc.name || sc.slug;
      const subInactive = sc.active === false;
      const subSelected = window._adminCatsSel.has(String(sc.id));
      const subProductCount = parseInt(sc.product_count) || 0;

      h += '<div class="adm-cat-sub' + (subInactive ? ' inactive' : '') + (subSelected ? ' selected' : '') + '" data-id="' + sc.id + '">';
      h += '<span class="adm-cat-sub-arrow">↳</span>';
      h += '<input type="checkbox" class="adm-cat-chk" ' + (subSelected ? 'checked' : '') + ' onclick="adminCatToggleSel(' + sc.id + ')">';
      h += '<span class="adm-cat-icon sm">' + esc(sc.icon_url || '▸') + '</span>';
      h += '<div class="adm-cat-name-wrap">';
      h += '<div class="adm-cat-name" onclick="adminCatInlineEdit(' + sc.id + ', this)" title="Click to edit">' + esc(scName) + '</div>';
      h += '<div class="adm-cat-meta">';
      if (subProductCount > 0) h += '<span class="adm-cat-meta-pill products">' + subProductCount + ' products</span>';
      h += '<span class="adm-cat-meta-slug">/' + esc(sc.slug) + '</span>';
      if (subInactive) h += '<span class="adm-cat-meta-pill inactive">inactive</span>';
      h += '</div>';
      h += '</div>';
      h += '<div class="adm-cat-actions">';
      h += '<button class="adm-cat-act" onclick="adminCatToggleActive(' + sc.id + ',' + (!subInactive) + ')">' + (subInactive ? '⊘' : '✓') + '</button>';
      h += '<button class="adm-cat-act" onclick="adminCatEdit(' + sc.id + ')">⚙</button>';
      h += '<button class="adm-cat-act danger" onclick="adminCatDelete(' + sc.id + ',\'' + esc(scName).replace(/'/g,'') + '\')">🗑</button>';
      h += '</div>';
      h += '</div>';
    });
    if (!visibleSubs.length && !q) {
      h += '<div class="adm-cat-sub-empty">No subcategories — <button class="adm-cat-link" onclick="adminCatAdd(' + mc.id + ')">+ Add one</button></div>';
    }
    h += '</div>';
    h += '</div>';
  });

  if (q && !h) {
    h = '<div class="adm-cat-empty">No matches for "<strong>' + esc(q) + '</strong>"</div>';
  }

  tree.innerHTML = h;
  adminCatUpdateBulkBar();
}

// ─── Filter ────────────────────────────────────────────────
window.adminCatFilter = function(q) {
  window._adminCatsFilter = q;
  adminCatRender();
};

// ─── Bulk selection ────────────────────────────────────────
window.adminCatToggleSel = function(id) {
  const k = String(id);
  if (window._adminCatsSel.has(k)) window._adminCatsSel.delete(k);
  else window._adminCatsSel.add(k);
  // Just update the highlight + bulk bar, no full re-render needed
  const row = document.querySelector('[data-id="' + id + '"]');
  if (row) row.classList.toggle('selected', window._adminCatsSel.has(k));
  adminCatUpdateBulkBar();
};

window.adminCatBulkClear = function() {
  window._adminCatsSel.clear();
  adminCatRender();
};

function adminCatUpdateBulkBar() {
  const bar = document.getElementById('adm-cat-bulk');
  const cnt = document.getElementById('adm-cat-bulk-count');
  if (!bar) return;
  const n = window._adminCatsSel.size;
  bar.style.display = n > 0 ? 'flex' : 'none';
  if (cnt) cnt.textContent = n + ' selected';
}

window.adminCatBulkSetActive = async function(active) {
  const ids = Array.from(window._adminCatsSel);
  if (!ids.length) return;
  if (!confirm((active ? 'Activate' : 'Deactivate') + ' ' + ids.length + ' categories?')) return;
  let ok = 0, fail = 0;
  for (const id of ids) {
    try { await apiReq('/admin/categories/' + id, 'PUT', { active }, true); ok++; }
    catch(e) { fail++; }
  }
  toast(ok + ' updated' + (fail ? ', ' + fail + ' failed' : ''));
  window._adminCatsSel.clear();
  render('admin-categories');
};

window.adminCatBulkDelete = async function() {
  const ids = Array.from(window._adminCatsSel);
  if (!ids.length) return;
  if (!confirm('⚠ Delete ' + ids.length + ' categories? Subcategories will also be deleted. This cannot be undone.')) return;
  let ok = 0, fail = 0;
  for (const id of ids) {
    try { await apiReq('/admin/categories/' + id, 'DELETE', null, true); ok++; }
    catch(e) { fail++; }
  }
  toast(ok + ' deleted' + (fail ? ', ' + fail + ' failed' : ''));
  window._adminCatsSel.clear();
  render('admin-categories');
};

// ─── Single active toggle ─────────────────────────────────
window.adminCatToggleActive = async function(id, currentlyActive) {
  try {
    await apiReq('/admin/categories/' + id, 'PUT', { active: !currentlyActive }, true);
    toast(currentlyActive ? 'Deactivated' : 'Activated');
    render('admin-categories');
  } catch(e) { toast('Error: ' + (e.message || 'Unknown')); }
};

// ─── Expand/collapse subs ─────────────────────────────────
window.adminCatToggleExpand = function(mainId) {
  const subs = document.getElementById('adm-cat-subs-' + mainId);
  const main = document.querySelector('.adm-cat-main[data-id="' + mainId + '"]');
  if (subs) subs.classList.toggle('collapsed');
  if (main) main.classList.toggle('collapsed');
};

// ─── Inline rename (click on name) ────────────────────────
window.adminCatInlineEdit = function(id, el) {
  if (el.querySelector('input')) return; // already editing
  const current = el.textContent.trim();
  const input = document.createElement('input');
  input.type = 'text';
  input.value = current;
  input.className = 'adm-cat-inline-edit';
  input.addEventListener('blur', async function() {
    const newName = input.value.trim();
    if (!newName || newName === current) { el.textContent = current; return; }
    try {
      const lang = S.lang || 'de';
      const trans = {}; trans[lang] = newName;
      await apiReq('/admin/categories/' + id, 'PUT', { translations: trans }, true);
      el.textContent = newName;
      toast('✓ Renamed');
      // refresh cache so next interaction is correct
      setTimeout(function(){ render('admin-categories'); }, 300);
    } catch(e) { el.textContent = current; toast('Error: ' + (e.message || 'Failed')); }
  });
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') input.blur();
    if (e.key === 'Escape') { el.textContent = current; }
  });
  el.innerHTML = '';
  el.appendChild(input);
  input.focus();
  input.select();
};

// ─── Drag-and-drop reorder ────────────────────────────────
window.adminCatDragStart = function(e, id) {
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', String(id));
};
window.adminCatDragOver = function(e) {
  e.preventDefault();
  e.currentTarget.classList.add('drop-target');
};
window.adminCatDragLeave = function(e) {
  e.currentTarget.classList.remove('drop-target');
};
window.adminCatDrop = async function(e, targetId) {
  e.preventDefault();
  e.currentTarget.classList.remove('drop-target');
  const sourceId = e.dataTransfer.getData('text/plain');
  if (!sourceId || String(sourceId) === String(targetId)) return;

  // Swap sort_order between source and target
  const cats = window._adminCatsCache || [];
  const src = cats.find(c => String(c.id) === String(sourceId));
  const tgt = cats.find(c => String(c.id) === String(targetId));
  if (!src || !tgt) return;

  try {
    await apiReq('/admin/categories/' + sourceId, 'PUT', { sort_order: tgt.sort_order }, true);
    await apiReq('/admin/categories/' + targetId, 'PUT', { sort_order: src.sort_order }, true);
    toast('✓ Reordered');
    render('admin-categories');
  } catch(err) { toast('Error reordering'); }
};

// ─── Modal: Add / Edit / Save ─────────────────────────────
window._catEditId = null;
window._catParentId = null;
const _CAT_ALL_LANGS = ['en','de','fr','pt','sw','es','ar','tr','ln'];

window.adminCatAdd = function(parentId) {
  window._catEditId = null;
  window._catParentId = parentId;
  $('cat-modal-title').textContent = parentId ? '➕ Add Subcategory' : '➕ Add Main Category';
  if ($('cat-slug'))   $('cat-slug').value = '';
  if ($('cat-icon'))   $('cat-icon').value = '';
  if ($('cat-sort'))   $('cat-sort').value = '';
  if ($('cat-active')) $('cat-active').checked = true;
  _CAT_ALL_LANGS.forEach(function(l){ if($('cat-t-'+l)) $('cat-t-'+l).value = ''; });
  $('cat-modal').style.display = 'flex';
  setTimeout(function(){ if($('cat-t-en')) $('cat-t-en').focus(); }, 50);
};

window.adminCatEdit = async function(id) {
  window._catEditId = id;
  const cat = (window._adminCatsCache || []).find(c => String(c.id) === String(id));
  if (!cat) { toast('Category not found'); return; }
  window._catParentId = cat.parent_id || null;
  $('cat-modal-title').textContent = '✏️ Edit: ' + esc(cat.name_en || cat.slug);
  if ($('cat-slug'))   $('cat-slug').value   = cat.slug || '';
  if ($('cat-icon'))   $('cat-icon').value   = cat.icon_url || '';
  if ($('cat-sort'))   $('cat-sort').value   = cat.sort_order || '';
  if ($('cat-active')) $('cat-active').checked = cat.active !== false;

  // Fetch full translations for this category
  try {
    const r = await apiReq('/admin/categories', 'GET', null, true);
    const all = Array.isArray(r) ? r : (r.data || []);
    const full = all.find(c => String(c.id) === String(id));
    const tr = (full && full.translations) || {};
    _CAT_ALL_LANGS.forEach(function(l){
      if ($('cat-t-'+l)) $('cat-t-'+l).value = tr[l] || (full && full['name_'+l]) || '';
    });
  } catch(e) {}

  $('cat-modal').style.display = 'flex';
};

window.adminCatSave = async function() {
  const slug = $('cat-slug') ? $('cat-slug').value.trim() : '';
  const icon = $('cat-icon') ? $('cat-icon').value.trim() : '';
  const sort = $('cat-sort') ? (parseInt($('cat-sort').value) || 0) : 0;
  const active = $('cat-active') ? $('cat-active').checked : true;
  const translations = {};
  _CAT_ALL_LANGS.forEach(function(l){
    const v = $('cat-t-'+l) ? $('cat-t-'+l).value.trim() : '';
    if (v) translations[l] = v;
  });

  if (!translations.en && !slug) {
    toast('English name or slug required');
    if ($('cat-t-en')) $('cat-t-en').focus();
    return;
  }

  const finalSlug = slug || (translations.en || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').substring(0, 80);

  const payload = {
    slug: finalSlug,
    icon_url: icon,
    sort_order: sort,
    active: active,
    parent_id: window._catParentId || null,
    translations: translations
  };

  const btn = $('cat-save-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Saving…'; }

  try {
    if (window._catEditId) {
      await apiReq('/admin/categories/' + window._catEditId, 'PUT', payload, true);
    } else {
      await apiReq('/admin/categories', 'POST', payload, true);
    }
    $('cat-modal').style.display = 'none';
    toast('✅ Saved!');
    render('admin-categories');
  } catch(e) {
    toast('Error: ' + (e.message || 'Unknown'));
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Save'; }
  }
};

// ─── 🌐 Auto-Translate: fills empty language inputs from a source ──────
// Source = first non-empty among DE → EN → FR → PT → SW.
// Targets = the other 4 priority languages. Uses /api/admin/translate
// (MyMemory backend). Existing values are NOT overwritten.
window.adminCatAutoTranslate = async function() {
  const langs = ['de','en','fr','pt','sw'];
  // 1. Pick source (priority: DE first — user's primary admin lang)
  const order = ['de','en','fr','pt','sw'];
  let sourceLang = null, sourceText = '';
  for (const l of order) {
    const el = $('cat-t-' + l);
    const v = el ? el.value.trim() : '';
    if (v) { sourceLang = l; sourceText = v; break; }
  }
  if (!sourceLang) {
    toast('Enter at least one name first (DE recommended)');
    if ($('cat-t-de')) $('cat-t-de').focus();
    return;
  }

  const btn = $('cat-autotrans-btn');
  const original = btn ? btn.textContent : '';
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Translating…'; }

  let filled = 0, skipped = 0, failed = 0;
  const targets = langs.filter(l => l !== sourceLang);

  for (const tgt of targets) {
    const el = $('cat-t-' + tgt);
    if (!el) continue;
    if (el.value.trim()) { skipped++; continue; } // don't overwrite
    try {
      const r = await apiReq('/admin/translate', 'POST', {
        text: sourceText, from: sourceLang, to: tgt
      });
      if (r && r.translated) {
        el.value = r.translated;
        el.style.background = '#fff8e1';
        setTimeout(function(){ el.style.background = ''; }, 1500);
        filled++;
      } else { failed++; }
    } catch(e) { failed++; }
  }

  if (btn) { btn.disabled = false; btn.textContent = original || '🌐 Auto-Translate'; }

  let msg = '';
  if (filled)  msg += '✓ Filled ' + filled + ' · ';
  if (skipped) msg += 'kept ' + skipped + ' · ';
  if (failed)  msg += '⚠ ' + failed + ' failed';
  toast(msg.replace(/ · $/, '') || 'Nothing to translate');
};

window.adminCatDelete = async function(id, name) {
  if (!confirm('Delete "' + name + '"?\n\nSubcategories will also be deleted.\nThis cannot be undone.')) return;
  try {
    await apiReq('/admin/categories/' + id, 'DELETE', null, true);
    toast('🗑 Deleted');
    render('admin-categories');
  } catch(e) { toast('Error: ' + (e.message || 'Cannot delete')); }
};

/* ═══════════════════════════════════════════════════════════════════
   ROUTE: ADMIN — SEO TEXTS (NEW)
   Multilingual content blocks managed by admin
   ═══════════════════════════════════════════════════════════════════ */
route('admin-seo-texts', async function () {
  if (!S.user || S.user.role !== 'admin') { render('login'); return; }

  const ALL_LANGS = [
    ['en','English'],['de','Deutsch'],['fr','Français'],
    ['pt','Português'],['sw','Kiswahili']
  ];
  const EXTRA_LANGS = [
    ['es','Español'],['ar','العربية'],['tr','Türkçe'],['ln','Lingála']
  ];

  async function loadList() {
    let items = [];
    try {
      const res = await apiReq('/admin/seo-texts', 'GET', null, true);
      items = res.data || [];
    } catch (e) {
      $('seo-list').innerHTML = '<div class="alert alert-error">' + esc(e.message) + '</div>';
      return;
    }
    if (!items.length) {
      $('seo-list').innerHTML = '<div class="empty-state"><div class="empty-icon">[T]</div><h3>' + esc(t('home.seo_admin_sub')) + '</h3></div>';
      return;
    }

    const plLabels = {
      home_top:        '⬆️ ' + t('home.seo_pl_home_top'),
      home_bottom:     '⬇️ ' + t('home.seo_pl_home_bottom'),
      partner_section: '🤝 ' + t('home.seo_pl_partner'),
      custom:          '⚙️ ' + t('home.seo_pl_custom')
    };

    let h = '<div class="table">';
    h += '<div class="trow" style="font-weight:700;background:var(--surface2)">';
    h += '<div>Slug</div><div>' + esc(t('home.seo_position')) + '</div><div>' + esc(t('home.seo_translations')) + '</div><div>' + esc(t('home.seo_sort')) + '</div><div>Status</div><div>Aktionen</div>';
    h += '</div>';
    items.forEach(function(it) {
      const trKeys = Object.keys(it.translations || {});
      h += '<div class="trow">';
      h += '<div><code style="font-size:.8rem">' + esc(it.slug || '—') + '</code></div>';
      h += '<div>' + (plLabels[it.placement] || it.placement) + '</div>';
      h += '<div style="display:flex;gap:.25rem;flex-wrap:wrap">' + trKeys.map(function(l){
        return '<span style="background:var(--surface2);padding:.1rem .4rem;border-radius:3px;font-size:.7rem;font-weight:600">' + l.toUpperCase() + '</span>';
      }).join('') + '</div>';
      h += '<div>' + it.sort_order + '</div>';
      h += '<div>' + (it.active ? '🟢 aktiv' : '⚪ inaktiv') + '</div>';
      h += '<div style="display:flex;gap:.4rem;flex-wrap:wrap">';
      h += '<button class="btn btn-ghost btn-sm" onclick="seoToggle(\'' + it.id + '\',' + (!it.active) + ')">' + (it.active ? 'Deakt.' : 'Aktiv.') + '</button>';
      h += '<button class="btn btn-ghost btn-sm" onclick="seoEdit(\'' + it.id + '\')">Bearb.</button>';
      h += '<button class="btn btn-ghost btn-sm" style="color:#c33" onclick="seoDelete(\'' + it.id + '\')">Lösch.</button>';
      h += '</div></div>';
    });
    h += '</div>';
    $('seo-list').innerHTML = h;
  }

  let h = '<div class="page-wrap"><section class="section">';
  h += '<button class="btn btn-ghost btn-sm" onclick="render(\'admin-dashboard\')" style="margin-bottom:1rem">&lt; Zurück</button>';
  h += '<div class="sec-hd"><div><div class="sec-title">📝 ' + esc(t('home.seo_admin_title')) + '</div>';
  h += '<div class="sec-sub">' + esc(t('home.seo_admin_sub')) + '</div></div></div>';

  // Form
  h += '<details style="margin-bottom:1.5rem;padding:1rem;background:var(--surface2);border-radius:8px" id="seoForm">';
  h += '<summary style="cursor:pointer;font-weight:700;margin-bottom:.75rem">' + esc(t('home.seo_add')) + '</summary>';
  h += '<div style="display:grid;gap:.75rem;max-width:760px">';
  h += '<input type="hidden" id="seoEditId">';
  h += '<div style="display:grid;grid-template-columns:1fr 1fr 120px;gap:.5rem">';
  h += '<div class="fg"><label>' + esc(t('home.seo_slug')) + '</label><input id="seoSlug" placeholder="z.B. ueber-uns" maxlength="80"/></div>';
  h += '<div class="fg"><label>' + esc(t('home.seo_position')) + '</label>';
  h += '<select id="seoPlacement" style="padding:.55rem .75rem;border:1.5px solid var(--border);border-radius:8px;background:var(--surface)">';
  h += '<option value="home_top">⬆️ ' + esc(t('home.seo_pl_home_top')) + '</option>';
  h += '<option value="home_bottom" selected>⬇️ ' + esc(t('home.seo_pl_home_bottom')) + '</option>';
  h += '<option value="partner_section">🤝 ' + esc(t('home.seo_pl_partner')) + '</option>';
  h += '<option value="custom">⚙️ ' + esc(t('home.seo_pl_custom')) + '</option>';
  h += '</select></div>';
  h += '<div class="fg"><label>' + esc(t('home.seo_sort')) + '</label><input id="seoSort" type="number" value="0"/></div>';
  h += '</div>';

  // ── KI-Generator (Admin, hardcoded DE – konsistent mit restlicher Admin-UI) ──
  h += '<div style="margin-top:.25rem;padding:.85rem;background:var(--surface);border:1px dashed var(--a300,#e8552b);border-radius:8px">';
  h += '<strong style="display:block;margin-bottom:.4rem;font-size:.85rem">✨ Mit KI erzeugen</strong>';
  h += '<textarea id="seoAiTopic" placeholder="Thema / Stichworte – z.B. Gebrauchte Bremsbel\u00e4ge f\u00fcr Toyota, Vertrauen &amp; schnelle Lieferung nach Nigeria betonen" style="width:100%;min-height:60px;margin-bottom:.5rem"></textarea>';
  h += '<button type="button" class="btn btn-ghost btn-sm" id="seoAiBtn" onclick="seoAiGenerate()" style="border-color:var(--a300,#e8552b)">✨ Texte generieren</button>';
  h += '<span style="font-size:.78rem;color:var(--text2);margin-left:.5rem">F\u00fcllt alle Sprachfelder automatisch – danach pr\u00fcfen &amp; speichern.</span>';
  h += '</div>';

  // Priority languages
  h += '<div style="margin-top:.5rem"><strong style="font-size:.85rem;color:var(--text2);display:block;margin-bottom:.5rem">' + esc(t('home.seo_translations')) + ' · Priority</strong>';
  ALL_LANGS.forEach(function(l) {
    h += '<div style="margin-bottom:.75rem;padding:.75rem;background:var(--surface);border:1px solid var(--border);border-radius:6px">';
    h += '<strong style="display:block;margin-bottom:.4rem;font-size:.8rem">' + l[1] + ' (' + l[0].toUpperCase() + ')</strong>';
    h += '<input id="seoT_' + l[0] + '_title" placeholder="' + esc(t('home.seo_title_field')) + ' (' + l[1] + ')" style="width:100%;margin-bottom:.4rem"/>';
    h += '<textarea id="seoT_' + l[0] + '_body" placeholder="' + esc(t('home.seo_body_field')) + ' (' + l[1] + ')" style="width:100%;min-height:80px;font-family:ui-monospace,monospace;font-size:.85rem"></textarea>';
    h += '</div>';
  });
  h += '</div>';

  // Extra languages collapsible
  h += '<details style="margin-top:.5rem;padding:.5rem;background:var(--surface);border:1px solid var(--border);border-radius:6px">';
  h += '<summary style="cursor:pointer;font-size:.85rem;font-weight:700">+ More languages</summary>';
  EXTRA_LANGS.forEach(function(l) {
    h += '<div style="margin-top:.75rem;padding:.5rem">';
    h += '<strong style="display:block;margin-bottom:.4rem;font-size:.8rem">' + l[1] + '</strong>';
    h += '<input id="seoT_' + l[0] + '_title" placeholder="Title (' + l[1] + ')" style="width:100%;margin-bottom:.4rem"/>';
    h += '<textarea id="seoT_' + l[0] + '_body" placeholder="Body (' + l[1] + ')" style="width:100%;min-height:60px;font-family:ui-monospace,monospace;font-size:.85rem"></textarea>';
    h += '</div>';
  });
  h += '</details>';

  h += '<div style="display:flex;gap:.5rem;margin-top:.75rem">';
  h += '<button class="btn btn-primary" onclick="seoSave()">' + esc(t('home.seo_save')) + '</button>';
  h += '<button class="btn btn-ghost" onclick="seoFormReset()">' + esc(t('home.seo_cancel')) + '</button>';
  h += '</div>';
  h += '</div></details>';

  h += '<div id="seo-list"><div class="loading-wrap"><div class="spinner"></div></div></div>';
  h += '</section></div>';

  $('content').innerHTML = h;
  loadList();

  const ALL_KEYS = ALL_LANGS.concat(EXTRA_LANGS).map(function(l){return l[0];});

  window.seoFormReset = function() {
    $('seoEditId').value = '';
    $('seoSlug').value = '';
    $('seoPlacement').value = 'home_bottom';
    $('seoSort').value = '0';
    ALL_KEYS.forEach(function(l){
      const t1 = $('seoT_' + l + '_title'); if (t1) t1.value = '';
      const b1 = $('seoT_' + l + '_body');  if (b1) b1.value = '';
    });
    $('seoForm').open = false;
  };

  window.seoAiGenerate = async function() {
    const topic = (($('seoAiTopic') || {}).value || '').trim();
    if (!topic) { toast('Bitte ein Thema / Stichworte eingeben', 't-error'); return; }
    const btn = $('seoAiBtn');
    const orig = btn ? btn.innerHTML : '';
    if (btn) { btn.disabled = true; btn.innerHTML = '… generiere'; }
    try {
      const res = await apiReq('/admin/seo-texts/generate', 'POST', {
        topic: topic,
        placement: $('seoPlacement').value,
        langs: ALL_KEYS
      }, true);
      const tr = (res && res.translations) || {};
      let filled = 0;
      ALL_KEYS.forEach(function(l){
        if (tr[l]) {
          const t1 = $('seoT_' + l + '_title'); if (t1) t1.value = tr[l].title || '';
          const b1 = $('seoT_' + l + '_body');  if (b1) b1.value = tr[l].body  || '';
          filled++;
        }
      });
      toast('✨ ' + filled + ' Sprachen ausgef\u00fcllt – bitte pr\u00fcfen & speichern');
    } catch(e) {
      toast(e.message || 'KI-Fehler', 't-error');
    } finally {
      if (btn) { btn.disabled = false; btn.innerHTML = orig; }
    }
  };

  window.seoSave = async function() {
    const id = $('seoEditId').value;
    const translations = {};
    ALL_KEYS.forEach(function(l){
      const title = ($('seoT_' + l + '_title') || {}).value || '';
      const body  = ($('seoT_' + l + '_body')  || {}).value || '';
      if (title.trim() || body.trim()) {
        translations[l] = { title: title.trim(), body: body.trim() };
      }
    });
    const payload = {
      slug:       $('seoSlug').value.trim(),
      placement:  $('seoPlacement').value,
      sort_order: parseInt($('seoSort').value, 10) || 0,
      active:     true,
      translations: translations
    };
    if (!Object.keys(translations).length) {
      toast('Mindestens eine Sprache mit Titel oder Text', 't-error');
      return;
    }
    try {
      if (id) {
        await apiReq('/admin/seo-texts/' + id, 'PUT', payload, true);
      } else {
        await apiReq('/admin/seo-texts', 'POST', payload, true);
      }
      toast('✅ ' + t('home.seo_save'));
      seoFormReset();
      loadList();
    } catch(e) {
      toast(e.message || 'Fehler', 't-error');
    }
  };

  window.seoEdit = async function(id) {
    try {
      const res = await apiReq('/admin/seo-texts', 'GET', null, true);
      const item = (res.data || []).find(function(x){ return String(x.id) === String(id); });
      if (!item) { toast('Nicht gefunden', 't-error'); return; }

      $('seoEditId').value  = item.id;
      $('seoSlug').value    = item.slug || '';
      $('seoPlacement').value = item.placement || 'home_bottom';
      $('seoSort').value    = item.sort_order || 0;
      const tr = item.translations || {};
      ALL_KEYS.forEach(function(l){
        const t1 = $('seoT_' + l + '_title'); if (t1) t1.value = (tr[l] && tr[l].title) || '';
        const b1 = $('seoT_' + l + '_body');  if (b1) b1.value = (tr[l] && tr[l].body)  || '';
      });
      $('seoForm').open = true;
      $('seoForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch(e) { toast(e.message, 't-error'); }
  };

  window.seoToggle = async function(id, newActive) {
    try {
      await apiReq('/admin/seo-texts/' + id, 'PUT', { active: newActive }, true);
      loadList();
    } catch(e) { toast(e.message, 't-error'); }
  };

  window.seoDelete = async function(id) {
    if (!confirm(t('home.seo_confirm_delete'))) return;
    try {
      await apiReq('/admin/seo-texts/' + id, 'DELETE', null, true);
      toast('🗑 ' + t('home.seo_delete'));
      loadList();
    } catch(e) { toast(e.message, 't-error'); }
  };
});


route('admin-banners', async function () {
  if (!S.user || S.user.role !== 'admin') { render('login'); return; }

  // Upload-Helper: Bild ODER Video (bis 20 MB) via /api/upload/banner-media mit folder=banners → R2
  async function uploadBannerImage(file) {
    if (!file) return null;
    if (!/^(image\/(jpe?g|png|webp)|video\/(mp4|webm))$/i.test(file.type)) {
      throw new Error('Nur JPG, PNG, WebP, MP4 oder WebM erlaubt');
    }
    if (file.size > 20 * 1024 * 1024) {
      throw new Error('Datei zu groß (max 20 MB)');
    }
    const fd = new FormData();
    fd.append('file', file);
    fd.append('folder', 'banners');
    const headers = {};
    const tok = (S && (S.token || S.jwt)) || (function(){ try { return localStorage.getItem('token') || localStorage.getItem('jwt') || ''; } catch(e) { return ''; } })();
    if (tok) headers['Authorization'] = 'Bearer ' + tok;
    const res = await fetch('/api/upload/banner-media', { method: 'POST', headers: headers, body: fd });
    const data = await res.json().catch(function () { return {}; });
    if (!res.ok) throw new Error(data.message || data.error || 'Upload fehlgeschlagen (HTTP ' + res.status + ')');
    if (!data.url) throw new Error('Keine URL vom Server erhalten');
    // media_type kommt vom echten MIME-Typ des Servers; Fallback per Dateityp/Endung
    var mt = data.media_type || (/^video\//.test(file.type) || /\.(mp4|webm|mov)(\?|$)/i.test(data.url) ? 'video' : 'image');
    return { url: data.url, media_type: mt };
  }

  async function loadList() {
    let banners = [];
    try {
      const res = await apiReq('/admin/banners', 'GET', null, true);
      banners = res.data || [];
    } catch (e) {
      $('banner-list').innerHTML = '<div class="alert alert-error">' + esc(e.message) + '</div>';
      return;
    }
    if (!banners.length) {
      $('banner-list').innerHTML = '<div class="empty-state"><div class="empty-icon">[-]</div><h3>Noch keine Banner</h3></div>';
      return;
    }
    let h = '<div class="table">';
    h += '<div class="trow" style="font-weight:700;background:var(--surface2)">';
    h += '<div>Vorschau</div><div>Titel</div><div>' + esc(t('home.banner_placement')) + '</div><div>Pos</div><div>Status</div><div>Aktionen</div>';
    h += '</div>';
    const plLabels = {
      hero: '🖼️ Hero',
      partner: '🤝 Partner',
      side_left: '⬅️ Side L',
      side_right: '➡️ Side R'
    };
    banners.forEach(function (b) {
      h += '<div class="trow">';
      h += '<div>' + (b.image_url ? '<img src="' + esc(b.image_url) + '" style="width:80px;height:45px;object-fit:cover;border-radius:4px" onerror="this.style.opacity=.3"/>' : '—') + '</div>';
      h += '<div>' + esc(b.title || '(ohne Titel)') + '</div>';
      h += '<div><span class="banner-pl-badge banner-pl-' + (b.placement || 'hero') + '">' + (plLabels[b.placement] || plLabels.hero) + '</span></div>';
      h += '<div>' + b.position + '</div>';
      h += '<div>' + (b.active ? '🟢 aktiv' : '⚪ inaktiv') + '</div>';
      h += '<div style="display:flex;gap:.4rem;flex-wrap:wrap">';
      h += '<button class="btn btn-ghost btn-sm" onclick="bToggle(\'' + b.id + '\',' + (!b.active) + ')">' + (b.active ? 'Deakt.' : 'Aktiv.') + '</button>';
      h += '<button class="btn btn-ghost btn-sm" onclick="bChangePlacement(\'' + b.id + '\',\'' + (b.placement || 'hero') + '\')">📍 Position</button>';
      h += '<button class="btn btn-ghost btn-sm" onclick="bReplaceImg(\'' + b.id + '\')">🖼️ Bild ersetzen</button>';
      h += '<button class="btn btn-ghost btn-sm" onclick="bEdit(\'' + b.id + '\')">Bearb.</button>';
      h += '<button class="btn btn-ghost btn-sm" style="color:#c33" onclick="bDelete(\'' + b.id + '\')">Lösch.</button>';
      h += '</div></div>';
    });
    h += '</div>';
    $('banner-list').innerHTML = h;
  }

  let h = '<div class="page-wrap"><section class="section">';
  h += '<button class="btn btn-ghost btn-sm" onclick="render(\'admin-dashboard\')" style="margin-bottom:1rem">&lt; Zurück</button>';
  h += '<div class="sec-hd"><div class="sec-title">🖼️ Banner verwalten</div></div>';

  h += '<details style="margin-bottom:1.5rem;padding:1rem;background:var(--surface2);border-radius:8px" open>';
  h += '<summary style="cursor:pointer;font-weight:700;margin-bottom:.75rem">+ Neuer Banner</summary>';
  h += '<div style="display:grid;gap:.5rem;max-width:640px">';
  h += '<div class="fg"><label>Titel (intern)</label><input id="bnTitle" placeholder="z.B. Sommer-Aktion 2026"/></div>';

  // Bild: URL-Feld + Hochladen-Button + Vorschau
  h += '<div class="fg"><label>Bild *</label>';
  h += '<div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap">';
  h += '<input id="bnImg" type="url" placeholder="https://... oder Datei hochladen" style="flex:1;min-width:200px"/>';
  h += '<input id="bnImgFile" type="file" accept="image/jpeg,image/png,image/webp,video/mp4,video/webm" style="display:none" onchange="bUploadNew(this)"/>';
  h += '<button type="button" class="btn btn-ghost btn-sm" onclick="document.getElementById(\'bnImgFile\').click()">📤 Hochladen</button>';
  h += '</div>';
  h += '<small style="opacity:.7">Max 20 MB · Bild (JPG/PNG/WebP) oder Video (MP4/WebM). Wird auf Cloudflare R2 unter <code>banners/</code> gespeichert.</small>';
  h += '<div id="bnPreview" style="margin-top:.5rem"></div>';
  h += '</div>';

  h += '<div class="fg"><label>Link-URL (optional)</label><input id="bnLink" type="url" placeholder="https://afcarparts.com/..."/></div>';
  h += '<div class="fg"><label>Alt-Text (SEO)</label><input id="bnAlt"/></div>';
  h += '<div class="fg"><label>' + esc(t('home.banner_placement')) + ' *</label>';
  h += '<select id="bnPlacement" style="padding:.55rem .75rem;border:1.5px solid var(--border);border-radius:8px;background:var(--surface);font-size:.92rem">';
  h += '<option value="hero">🖼️ ' + esc(t('home.banner_pl_hero')) + '</option>';
  h += '<option value="partner">🤝 ' + esc(t('home.banner_pl_partner')) + '</option>';
  h += '<option value="side_left">⬅️ ' + esc(t('home.banner_pl_side_left')) + '</option>';
  h += '<option value="side_right">➡️ ' + esc(t('home.banner_pl_side_right')) + '</option>';
  h += '</select>';
  h += '<small style="opacity:.7">' + esc(t('home.banner_placement_help')) + '</small>';
  h += '</div>';
  h += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:.5rem">';
  h += '<div class="fg"><label>Position</label><input id="bnPos" type="number" value="0"/></div>';
  h += '<div class="fg"><label>Start</label><input id="bnStart" type="datetime-local"/></div>';
  h += '<div class="fg"><label>Ende</label><input id="bnEnd" type="datetime-local"/></div>';
  h += '</div>';
  h += '<button class="btn btn-primary" onclick="bCreate()" style="margin-top:.75rem">Banner anlegen</button>';
  h += '</div></details>';

  h += '<div id="banner-list"><div class="loading-wrap"><div class="spinner"></div></div></div>';
  h += '</section></div>';

  $('content').innerHTML = h;
  loadList();

  // Live-Vorschau wenn URL manuell eingetippt/eingefügt wird
  $('bnImg').addEventListener('input', function () {
    const url = $('bnImg').value.trim();
    var isVid = /\.(mp4|webm|mov)(\?|$)/i.test(url);
    $('bnImg').dataset.mediaType = isVid ? 'video' : 'image';
    if (!url) { $('bnPreview').innerHTML = ''; return; }
    $('bnPreview').innerHTML = isVid
      ? '<video src="' + esc(url) + '" muted autoplay loop playsinline style="max-width:240px;max-height:120px;border-radius:6px;border:1px solid var(--border)"></video>'
      : '<img src="' + esc(url) + '" style="max-width:240px;max-height:120px;border-radius:6px;border:1px solid var(--border)" onerror="this.style.opacity=.3"/>';
  });

  // Upload-Button im Neuer-Banner-Formular
  window.bUploadNew = async function (input) {
    const file = input.files && input.files[0];
    if (!file) return;
    $('bnPreview').innerHTML = '<div class="spinner" style="width:24px;height:24px"></div>';
    try {
      const up = await uploadBannerImage(file);
      const url = up.url;
      $('bnImg').value = url;
      $('bnImg').dataset.mediaType = up.media_type;
      var isVid = up.media_type === 'video';
      $('bnPreview').innerHTML = isVid
        ? '<video src="' + esc(url) + '" muted autoplay loop playsinline style="max-width:240px;max-height:120px;border-radius:6px;border:1px solid var(--border)"></video>'
        : '<img src="' + esc(url) + '" style="max-width:240px;max-height:120px;border-radius:6px;border:1px solid var(--border)"/>';
      toast('Hochgeladen');
    } catch (e) {
      $('bnPreview').innerHTML = '';
      toast(e.message, 't-error');
    }
    input.value = ''; // damit dieselbe Datei erneut wählbar ist
  };

  // Bild für bestehenden Banner ersetzen
  window.bReplaceImg = function (id) {
    let input = document.getElementById('bnReplaceFile');
    if (!input) {
      input = document.createElement('input');
      input.type = 'file';
      input.id = 'bnReplaceFile';
      input.accept = 'image/jpeg,image/png,image/webp,video/mp4,video/webm';
      input.style.display = 'none';
      document.body.appendChild(input);
    }
    input.onchange = async function () {
      const file = input.files && input.files[0];
      input.value = '';
      if (!file) return;
      toast('Lade Bild hoch …');
      try {
        const up = await uploadBannerImage(file);
        await apiReq('/admin/banners/' + id, 'PUT', { image_url: up.url, media_type: up.media_type }, true);
        toast('Bild ersetzt');
        loadList();
      } catch (e) {
        toast(e.message, 't-error');
      }
    };
    input.click();
  };

  window.bCreate = async function () {
    const imgUrl = $('bnImg').value.trim();
    const mediaType = ($('bnImg').dataset.mediaType)
      || (/\.(mp4|webm|mov)(\?|$)/i.test(imgUrl) ? 'video' : 'image');
    const payload = {
      title:      $('bnTitle').value.trim(),
      image_url:  imgUrl,
      media_type: mediaType,
      link_url:   $('bnLink').value.trim() || null,
      alt_text:   $('bnAlt').value.trim() || null,
      placement:  $('bnPlacement') ? $('bnPlacement').value : 'hero',
      position:   parseInt($('bnPos').value, 10) || 0,
      start_date: $('bnStart').value || null,
      end_date:   $('bnEnd').value || null,
      active:     true
    };
    if (!payload.image_url) { toast('Bild fehlt', 't-error'); return; }
    try {
      await apiReq('/admin/banners', 'POST', payload, true);
      ['bnTitle','bnImg','bnLink','bnAlt','bnStart','bnEnd'].forEach(function(id){ $(id).value=''; });
      $('bnImg').dataset.mediaType = 'image';
      $('bnPos').value = '0';
      if ($('bnPlacement')) $('bnPlacement').value = 'hero';
      $('bnPreview').innerHTML = '';
      toast('Banner angelegt');
      loadList();
    } catch (e) { toast(e.message, 't-error'); }
  };

  window.bChangePlacement = async function (id, current) {
    const opts = {
      '1': ['hero',       'Hero (Hintergrund oben)'],
      '2': ['partner',    'Partner-Slot (Seitenmitte)'],
      '3': ['side_left',  'Linker Seitenbanner'],
      '4': ['side_right', 'Rechter Seitenbanner']
    };
    const msg = 'Aktuell: ' + current + '\n\nWähle neue Position:\n1 = Hero (Hintergrund oben)\n2 = Partner (ersetzt Bosch-Block)\n3 = Side Left (links außen)\n4 = Side Right (rechts außen)';
    const sel = prompt(msg, '1');
    if (!sel || !opts[sel]) return;
    try {
      await apiReq('/admin/banners/' + id, 'PUT', { placement: opts[sel][0] }, true);
      toast('Position geändert: ' + opts[sel][1]);
      loadList();
    } catch (e) { toast(e.message, 't-error'); }
  };

  window.bToggle = async function (id, newActive) {
    try {
      await apiReq('/admin/banners/' + id, 'PUT', { active: newActive }, true);
      loadList();
    } catch (e) { toast(e.message, 't-error'); }
  };

  window.bEdit = async function (id) {
    const newPos  = prompt('Neue Position (leer = unverändert):');
    const newLink = prompt('Neue Link-URL (leer = unverändert):');
    const update = {};
    if (newPos !== null && newPos !== '') update.position = parseInt(newPos, 10) || 0;
    if (newLink) update.link_url = newLink;
    if (!Object.keys(update).length) return;
    try {
      await apiReq('/admin/banners/' + id, 'PUT', update, true);
      toast('Aktualisiert');
      loadList();
    } catch (e) { toast(e.message, 't-error'); }
  };

  window.bDelete = async function (id) {
    if (!confirm('Banner wirklich löschen?')) return;
    try {
      await apiReq('/admin/banners/' + id, 'DELETE', null, true);
      toast('Gelöscht');
      loadList();
    } catch (e) { toast(e.message, 't-error'); }
  };
});


/* ═════════════════════════════════════════════════════════════════
   ADMIN: BESTELLUNGEN  (#admin-orders)
   Alle Bestellungen mit Positionen, Status-Filter und Suche.
   ═════════════════════════════════════════════════════════════════ */
var ADM_STATUS = {
  pending:   { l: 'Offen / unbezahlt', c: '#b45309', bg: '#fff7e6' },
  paid:      { l: 'Bezahlt',           c: '#15803d', bg: '#ecfdf3' },
  shipped:   { l: 'Versendet',         c: '#1d4ed8', bg: '#eef4ff' },
  delivered: { l: 'Zugestellt',        c: '#0f766e', bg: '#e6fffa' },
  canceled:  { l: 'Storniert',         c: '#6b7280', bg: '#f3f4f6' },
  fulfilled: { l: 'Erfüllt',           c: '#0f766e', bg: '#e6fffa' },
  failed:    { l: 'Fehlgeschlagen',    c: '#b91c1c', bg: '#fef2f2' },
  refunded:  { l: 'Erstattet',         c: '#7c3aed', bg: '#f5f3ff' }
};
function admBadge(st) {
  var x = ADM_STATUS[st] || { l: st || '—', c: '#374151', bg: '#f3f4f6' };
  return '<span style="display:inline-block;padding:2px 8px;border-radius:999px;font-size:.75rem;font-weight:700;color:' + x.c + ';background:' + x.bg + '">' + esc(x.l) + '</span>';
}
function admDate(d) {
  if (!d) return '—';
  try { return new Date(d).toLocaleString(numLocale(), { dateStyle: 'medium', timeStyle: 'short' }); } catch (e) { return String(d); }
}

route('admin-orders', async function () {
  if (!S.user || S.user.role !== 'admin') { render('login'); return; }
  var h = '<div class="page-wrap"><section class="section">';
  h += '<button class="btn btn-ghost btn-sm" onclick="render(\'admin-dashboard\')">&lt; Zurück</button>';
  h += '<div class="sec-hd" style="margin:.6rem 0 1rem"><div class="sec-title">🛒 Bestellungen</div></div>';
  h += '<div style="display:flex;gap:.6rem;flex-wrap:wrap;align-items:center;margin-bottom:1rem">';
  h += '<select id="aoStatus" onchange="aoRender()"><option value="">Alle Status</option>' + Object.keys(ADM_STATUS).map(function (k) { return '<option value="' + k + '">' + esc(ADM_STATUS[k].l) + '</option>'; }).join('') + '</select>';
  h += '<input id="aoSearch" placeholder="Suche: Nr., E-Mail, Name, Artikel" oninput="aoRender()" style="max-width:280px"/>';
  h += '<span id="aoCount" style="font-size:.85rem;opacity:.7"></span>';
  h += '</div><div id="aoStats" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:.6rem;margin-bottom:1rem"></div>';
  h += '<div id="aoList">Lädt…</div></section></div>';
  $('content').innerHTML = h;
  try {
    var r = await apiReq('/admin/orders', 'GET', null, true);
    window._aoData = (r.data || []).map(function (o) {
      if (typeof o.address === 'string') { try { o.address = JSON.parse(o.address); } catch (e) { o.address = {}; } }
      o.address = o.address || {};
      return o;
    });
    aoRender();
  } catch (e) { $('aoList').innerHTML = '<div class="alert alert-error">' + esc(e.message) + '</div>'; }
});

window.aoRender = function () {
  var all = window._aoData || [], box = $('aoList'); if (!box) return;
  var st = ($('aoStatus') || {}).value || '', q = (($('aoSearch') || {}).value || '').toLowerCase().trim();
  // Kennzahlen (Summen je Waehrung, nur bezahlte und spaeter)
  var paidStates = ['paid', 'shipped', 'delivered', 'fulfilled'];
  var sums = {}, nPaid = 0, nOpen = 0;
  all.forEach(function (o) {
    if (paidStates.indexOf(o.status) !== -1) { nPaid++; sums[o.currency || 'USD'] = (sums[o.currency || 'USD'] || 0) + (Number(o.total) || 0); }
    if (o.status === 'pending') nOpen++;
  });
  var tile = function (k, v) { return '<div style="padding:.7rem .9rem;border:1px solid rgba(128,128,128,.25);border-radius:8px"><div style="font-size:.75rem;opacity:.65">' + k + '</div><div style="font-weight:700;font-size:1.05rem">' + v + '</div></div>'; };
  var stats = tile('Bestellungen gesamt', all.length) + tile('Bezahlt / versendet', nPaid) + tile('Offen (unbezahlt)', nOpen);
  Object.keys(sums).forEach(function (c) { stats += tile('Umsatz (' + c + ')', esc(fmtMoney(sums[c], c))); });
  $('aoStats').innerHTML = stats;

  var list = all.filter(function (o) {
    if (st && o.status !== st) return false;
    if (!q) return true;
    var hay = [o.id, o.email, o.address.name, o.address.phone, o.address.city, o.address.country].concat((o.items || []).map(function (i) { return i.title; })).join(' ').toLowerCase();
    return hay.indexOf(q) !== -1;
  });
  $('aoCount').textContent = list.length + ' von ' + all.length;
  if (!list.length) { box.innerHTML = '<p style="opacity:.7">Keine Bestellungen für diesen Filter.</p>'; return; }
  box.innerHTML = list.map(function (o) {
    var a = o.address || {};
    var items = (o.items || []).map(function (i) {
      return '<tr><td style="padding:.3rem .4rem">' + esc(i.title || '—') + '</td><td style="padding:.3rem .4rem;text-align:center">' + esc(i.qty) + '</td>'
        + '<td style="padding:.3rem .4rem;text-align:right;white-space:nowrap">' + esc(fmtMoney(i.line_total, o.currency)) + '</td>'
        + '<td style="padding:.3rem .4rem;text-align:right;white-space:nowrap;opacity:.75">' + esc(fmtMoney(i.commission_amount, o.currency)) + '</td>'
        + '<td style="padding:.3rem .4rem;font-size:.75rem;opacity:.75">' + esc(i.payout_status || '—') + '</td></tr>';
    }).join('');
    var x = '<details style="border:1px solid rgba(128,128,128,.25);border-radius:10px;margin-bottom:.6rem;background:var(--surface,#fff)">';
    x += '<summary style="padding:.75rem 1rem;cursor:pointer;display:flex;gap:.8rem;align-items:center;flex-wrap:wrap">';
    x += '<b>#' + esc(o.id) + '</b>' + admBadge(o.status);
    x += '<span style="opacity:.75;font-size:.85rem">' + esc(admDate(o.created_at)) + '</span>';
    x += '<span style="flex:1;min-width:160px;font-size:.85rem">' + esc(a.name || o.email || '—') + (a.country ? ' · ' + esc(a.city || '') + ' ' + esc(a.country) : '') + '</span>';
    x += '<b style="white-space:nowrap">' + esc(fmtMoney(o.total, o.currency)) + '</b></summary>';
    x += '<div style="padding:0 1rem 1rem">';
    x += '<div style="font-size:.85rem;line-height:1.6;margin-bottom:.6rem">'
      + '<b>Kunde:</b> ' + esc(a.name || '—') + ' · ' + esc(o.email || '—') + (a.phone ? ' · ' + esc(a.phone) : '') + '<br>'
      + '<b>Lieferung:</b> ' + esc([a.addr, a.city, a.country].filter(Boolean).join(', ') || '—') + (a.pickup_station_id ? ' · Abholstation #' + esc(a.pickup_station_id) : '') + '<br>'
      + '<b>Summen:</b> Waren ' + esc(fmtMoney(o.subtotal, o.currency)) + ' · Versand ' + esc(fmtMoney(o.shipping, o.currency)) + ' · Gesamt ' + esc(fmtMoney(o.total, o.currency))
      + '</div>';
    x += '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:.85rem"><tr style="background:var(--surface2,#f3f4f6)"><th style="text-align:left;padding:.35rem .4rem">Artikel</th><th>Menge</th><th style="text-align:right;padding:.35rem .4rem">Summe</th><th style="text-align:right;padding:.35rem .4rem">Provision</th><th style="text-align:left;padding:.35rem .4rem">Auszahlung</th></tr>' + items + '</table></div>';
    x += '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.7rem">';
    x += '<button class="btn btn-ghost btn-sm" onclick="render(\'admin-shipments-board\')">📦 Sendungen & Treuhand</button>';
    if (o.status === 'pending') x += '<button class="btn btn-ghost btn-sm" style="color:#b45309" onclick="aoMarkPaid(' + o.id + ')">Als bezahlt markieren (nur Test)</button>';
    x += '</div></div></details>';
    return x;
  }).join('');
};

window.aoMarkPaid = async function (id) {
  if (!confirm('Bestellung #' + id + ' als BEZAHLT markieren?\n\nNur für Tests verwenden! Es werden Sendungen angelegt und Kunde sowie Händler per E-Mail benachrichtigt – ohne dass Geld geflossen ist.')) return;
  try {
    await apiReq('/admin/orders/' + id + '/mark-paid', 'POST', {}, true);
    toast('Bestellung #' + id + ' als bezahlt markiert');
    render('admin-orders');
  } catch (e) { toast(e.message, 't-error'); }
};

/* ═════════════════════════════════════════════════════════════════
   ADMIN: PRODUKTE  (#admin-products)
   Alle Produkte aller Haendler: Verkaeufer sehen, Preis korrigieren
   (mit Waehrungsumrechnung), ein-/ausblenden, loeschen.
   ═════════════════════════════════════════════════════════════════ */
function apTitle(p) {
  var tr = p.translations || {};
  var t1 = (tr[S.lang] && tr[S.lang].title) || (tr[p.default_lang] && tr[p.default_lang].title) || (tr.en && tr.en.title) || (tr.de && tr.de.title);
  if (!t1) { var k = Object.keys(tr)[0]; t1 = k ? tr[k].title : ''; }
  return t1 || p.title || ('Produkt #' + p.id);
}
function apImg(p) {
  var im = p.images; if (typeof im === 'string') { try { im = JSON.parse(im); } catch (e) { im = []; } }
  return Array.isArray(im) && im[0] ? im[0] : '';
}

route('admin-products', async function (params) {
  if (!S.user || S.user.role !== 'admin') { render('login'); return; }
  var pre = (params && params.seller) ? String(params.seller) : '';
  var h = '<div class="page-wrap"><section class="section">';
  h += '<button class="btn btn-ghost btn-sm" onclick="render(\'admin-dashboard\')">&lt; Zurück</button>';
  h += '<div class="sec-hd" style="margin:.6rem 0 .4rem"><div class="sec-title">📦 Produkte & Freigabe</div></div>';
  h += '<p style="font-size:.85rem;opacity:.75;margin-bottom:1rem">Im Shop sichtbar ist ein Produkt nur, wenn es <b>freigegeben</b> und <b>aktiv</b> ist. Produkte nicht verifizierter Händler landen automatisch hier zur Prüfung – auch nach Preis-, Titel- oder Bildänderungen.</p>';
  h += '<div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:.8rem" id="apTabs"></div>';
  h += '<div style="display:flex;gap:.6rem;flex-wrap:wrap;align-items:center;margin-bottom:1rem">';
  h += '<select id="apSeller" onchange="apRender()" style="max-width:320px"><option value="">Alle Händler</option></select>';
  h += '<select id="apState" onchange="apRender()"><option value="">Sichtbarkeit: alle</option><option value="on">Aktiv</option><option value="off">Ausgeblendet</option><option value="big">Preis über 10.000 USD</option></select>';
  h += '<input id="apSearch" placeholder="Suche: Titel, SKU, OEM, Marke" oninput="apRender()" style="max-width:260px"/>';
  h += '<span id="apCount" style="font-size:.85rem;opacity:.7"></span></div>';
  h += '<div id="apBulk" style="margin-bottom:.6rem"></div>';
  h += '<div id="apList">Lädt…</div></section></div>';
  $('content').innerHTML = h;
  window._apTab = pre ? 'all' : null;
  try {
    var r = await apiReq('/admin/products', 'GET', null, true);
    window._apData = r.data || [];
    // Haendler-Auswahl mit Anzahl Produkte / offene Pruefungen
    var sellers = {};
    window._apData.forEach(function (p) {
      var k = p.seller_id ? String(p.seller_id) : '_none';
      if (!sellers[k]) sellers[k] = { name: p.shop_name || p.seller_name || p.seller_email || (p.seller_id ? 'Nutzer #' + p.seller_id : 'Ohne Händler (Admin)'), n: 0, pend: 0 };
      sellers[k].n++; if ((p.review_status || 'approved') === 'pending') sellers[k].pend++;
    });
    var sel = $('apSeller');
    Object.keys(sellers).sort(function (a, b) { return sellers[b].pend - sellers[a].pend || sellers[a].name.localeCompare(sellers[b].name); })
      .forEach(function (k) {
        var o = document.createElement('option');
        o.value = k; o.textContent = sellers[k].name + ' – ' + sellers[k].n + ' Produkt(e)' + (sellers[k].pend ? ', ' + sellers[k].pend + ' zur Prüfung' : '');
        if (k === pre) o.selected = true;
        sel.appendChild(o);
      });
    if (!window._apTab) window._apTab = window._apData.some(function (p) { return p.review_status === 'pending'; }) ? 'pending' : 'all';
    apRender();
  } catch (e) { $('apList').innerHTML = '<div class="alert alert-error">' + esc(e.message) + '</div>'; }
});

var AP_REV = {
  pending:  { l: '⏳ Zur Prüfung', c: '#b45309', bg: '#fff7e6' },
  approved: { l: '✅ Freigegeben', c: '#15803d', bg: '#ecfdf3' },
  rejected: { l: '✕ Abgelehnt',   c: '#b91c1c', bg: '#fef2f2' }
};
window.apSetTab = function (t) { window._apTab = t; apRender(); };

window.apRender = function () {
  var all = window._apData || [], box = $('apList'); if (!box) return;
  var tab = window._apTab || 'all';
  var seller = ($('apSeller') || {}).value || '';
  var st = ($('apState') || {}).value || '', q = (($('apSearch') || {}).value || '').toLowerCase().trim();
  var bySeller = all.filter(function (p) { return !seller || (seller === '_none' ? !p.seller_id : String(p.seller_id) === seller); });
  // Tabs mit Zaehlern
  var cnt = { all: bySeller.length, pending: 0, approved: 0, rejected: 0 };
  bySeller.forEach(function (p) { cnt[p.review_status || 'approved']++; });
  var tabBtn = function (k, l) {
    var on = tab === k;
    return '<button class="btn btn-sm ' + (on ? 'btn-primary' : 'btn-ghost') + '" onclick="apSetTab(\'' + k + '\')">' + l + ' (' + cnt[k] + ')</button>';
  };
  $('apTabs').innerHTML = tabBtn('pending', '⏳ Zur Prüfung') + tabBtn('approved', '✅ Freigegeben') + tabBtn('rejected', '✕ Abgelehnt') + tabBtn('all', 'Alle');

  var list = bySeller.filter(function (p) {
    var rv = p.review_status || 'approved';
    if (tab !== 'all' && rv !== tab) return false;
    if (st === 'on' && !p.active) return false;
    if (st === 'off' && p.active) return false;
    if (st === 'big' && !(Number(p.price_usd) > 10000)) return false;
    if (!q) return true;
    return [apTitle(p), p.sku, p.oem, p.ean, p.brand, p.model, p.id].join(' ').toLowerCase().indexOf(q) !== -1;
  });
  window._apVisible = list;
  $('apCount').textContent = list.length + ' Produkt(e)';
  var pend = list.filter(function (p) { return (p.review_status || 'approved') !== 'approved'; });
  $('apBulk').innerHTML = (seller && pend.length)
    ? '<button class="btn btn-primary btn-sm" onclick="apBulk(\'approved\')">Alle ' + pend.length + ' angezeigten freigeben</button>'
    : '';
  if (!list.length) { box.innerHTML = '<p style="opacity:.7">Keine Produkte für diesen Filter.</p>'; return; }

  box.innerHTML = list.slice(0, 300).map(function (p) {
    var img = apImg(p), rv = AP_REV[p.review_status || 'approved'];
    var sellerTxt = p.shop_name || p.seller_name || p.seller_email || (p.seller_id ? 'Nutzer #' + p.seller_id : 'Admin');
    var warn = [];
    if (p.seller_id && p.seller_role !== 'admin' && p.shop_active === false) warn.push('Shop nicht freigegeben');
    if (p.seller_id && p.seller_role !== 'admin' && p.seller_kyc !== 'verified') warn.push('Händler nicht verifiziert');
    if (Number(p.price_usd) > 10000) warn.push('sehr hoher Preis');
    var x = '<div style="display:flex;gap:.8rem;align-items:center;padding:.7rem .5rem;border-bottom:1px solid rgba(128,128,128,.2);flex-wrap:wrap">';
    x += '<div style="width:64px;height:64px;border-radius:8px;background:#f3f4f6;overflow:hidden;flex:none">' + (img ? '<img src="' + esc(img) + '" style="width:100%;height:100%;object-fit:cover" loading="lazy" onclick="openZoom(this.src)"/>' : '') + '</div>';
    x += '<div style="flex:1;min-width:230px">';
    x += '<div style="font-weight:600">' + esc(apTitle(p)) + '</div>';
    x += '<div style="font-size:.78rem;opacity:.75">#' + esc(p.id) + (p.sku ? ' · Art.-Nr. ' + esc(p.sku) : '') + (p.brand ? ' · ' + esc(p.brand) : '') + ' · ' + esc(p.condition || '') + '</div>';
    x += '<div style="font-size:.8rem;margin-top:.15rem">Händler: <a href="javascript:void(0)" onclick="apPickSeller(\'' + esc(String(p.seller_id || '_none')) + '\')"><b>' + esc(sellerTxt) + '</b></a>' + (p.seller_email ? ' <span style="opacity:.6">' + esc(p.seller_email) + '</span>' : '') + '</div>';
    x += '<div style="display:flex;gap:.35rem;flex-wrap:wrap;margin-top:.3rem">';
    x += '<span style="font-size:.72rem;font-weight:700;padding:.1rem .5rem;border-radius:999px;color:' + rv.c + ';background:' + rv.bg + '">' + rv.l + '</span>';
    x += '<span style="font-size:.72rem;padding:.1rem .5rem;border-radius:999px;background:#f3f4f6">' + (p.active ? 'aktiv' : 'ausgeblendet') + '</span>';
    warn.forEach(function (w) { x += '<span style="font-size:.72rem;padding:.1rem .5rem;border-radius:999px;background:#fef2f2;color:#b91c1c">⚠ ' + esc(w) + '</span>'; });
    x += '</div>';
    if (p.review_note && p.review_status === 'rejected') x += '<div style="font-size:.78rem;color:#b91c1c;margin-top:.2rem">Grund: ' + esc(p.review_note) + '</div>';
    x += '</div>';
    x += '<div style="text-align:right;min-width:150px"><div style="font-weight:700">' + esc(fmtIn(p.price_usd, 'USD')) + '</div>'
      + (S.currency !== 'USD' ? '<div style="font-size:.75rem;opacity:.65">≈ ' + esc(fmt(p.price_usd)) + '</div>' : '') + '</div>';
    x += '<div style="display:flex;gap:.3rem;flex-wrap:wrap;justify-content:flex-end">';
    if (p.review_status !== 'approved') x += '<button class="btn btn-primary btn-sm" onclick="apReview(' + p.id + ',\'approved\')">Freigeben</button>';
    if (p.review_status !== 'rejected') x += '<button class="btn btn-ghost btn-sm" style="color:#b91c1c" onclick="apReview(' + p.id + ',\'rejected\')">Ablehnen</button>';
    x += '<button class="btn btn-ghost btn-sm" onclick="apPrice(' + p.id + ')">Preis</button>';
    x += '<button class="btn btn-ghost btn-sm" onclick="apToggle(' + p.id + ',' + (!p.active) + ')">' + (p.active ? 'Ausblenden' : 'Einblenden') + '</button>';
    x += '<button class="btn btn-ghost btn-sm" onclick="apPreview(' + p.id + ')">Details</button>';
    x += '<button class="btn btn-ghost btn-sm" style="color:#c33" onclick="apDelete(' + p.id + ')">Löschen</button>';
    x += '</div></div>';
    x += '<div id="apPrev' + p.id + '" style="display:none;padding:.6rem .8rem;margin:0 0 .4rem 72px;background:var(--surface2,#f7f8fa);border-radius:8px;font-size:.85rem"></div>';
    return x;
  }).join('') + (list.length > 300 ? '<p style="opacity:.7;font-size:.85rem">Die ersten 300 werden angezeigt – bitte filtern.</p>' : '');
};

window.apPickSeller = function (id) { var s = $('apSeller'); if (s) { s.value = id; window._apTab = 'all'; apRender(); window.scrollTo(0, 0); } };

// Details aufklappen: Beschreibung, alle Bilder, Staffelpreise (ohne die Seite zu verlassen)
window.apPreview = function (id) {
  var el = $('apPrev' + id), p = apFind(id); if (!el || !p) return;
  if (el.style.display === 'block') { el.style.display = 'none'; return; }
  var tr = p.translations || {}, src = tr[p.default_lang] || tr.de || tr.en || {};
  var im = p.images; if (typeof im === 'string') { try { im = JSON.parse(im); } catch (e) { im = []; } }
  var tiers = p.price_tiers; if (typeof tiers === 'string') { try { tiers = JSON.parse(tiers); } catch (e) { tiers = []; } }
  var h = '<div style="margin-bottom:.4rem"><b>Beschreibung (' + esc(p.default_lang || '') + '):</b> ' + esc(src.description || '—') + '</div>';
  if (Array.isArray(im) && im.length) h += '<div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:.4rem">' + im.map(function (u) { return '<img src="' + esc(u) + '" style="width:90px;height:90px;object-fit:cover;border-radius:6px;cursor:zoom-in" onclick="openZoom(this.src)"/>'; }).join('') + '</div>';
  h += '<div>Bestand: <b>' + esc(p.stock || 0) + '</b> · Gewicht: ' + esc(p.weight_kg || '—') + ' kg · Verkaufsart: ' + esc(p.sale_mode || 'retail') + (p.oem ? ' · OEM ' + esc(p.oem) : '') + '</div>';
  if (Array.isArray(tiers) && tiers.length) h += '<div>Staffelpreise: ' + tiers.map(function (t1) { return 'ab ' + t1.min + ' Stk. ' + fmtIn(t1.price, 'USD'); }).join(' · ') + '</div>';
  h += '<div style="margin-top:.3rem;opacity:.7">Angelegt: ' + esc(admDate(p.created_at)) + '</div>';
  el.innerHTML = h; el.style.display = 'block';
};

window.apReview = async function (id, status) {
  var note = null;
  if (status === 'rejected') {
    note = prompt('Grund für die Ablehnung (der Händler bekommt ihn per E-Mail):', 'Preis/Angaben bitte prüfen');
    if (note === null) return;
  }
  try {
    await apiReq('/admin/products/' + id + '/review', 'POST', { status: status, note: note }, true);
    var p = apFind(id); if (p) { p.review_status = status; p.review_note = note; }
    apRender(); toast(status === 'approved' ? 'Freigegeben' : 'Abgelehnt');
  } catch (e) { toast(e.message, 't-error'); }
};
window.apBulk = async function (status) {
  var ids = (window._apVisible || []).filter(function (p) { return (p.review_status || 'approved') !== 'approved'; }).map(function (p) { return p.id; });
  if (!ids.length || !confirm(ids.length + ' Produkt(e) dieses Händlers freigeben?')) return;
  try {
    var r = await apiReq('/admin/products/review-bulk', 'POST', { ids: ids, status: status }, true);
    (window._apData || []).forEach(function (p) { if (ids.indexOf(p.id) !== -1) p.review_status = status; });
    apRender(); toast((r.updated || 0) + ' freigegeben');
  } catch (e) { toast(e.message, 't-error'); }
};

function apFind(id) { return (window._apData || []).filter(function (p) { return String(p.id) === String(id); })[0]; }

// Preis korrigieren: Betrag + Waehrung eingeben, gespeichert wird USD
window.apPrice = async function (id) {
  var p = apFind(id); if (!p) return;
  var cur = (prompt('In welcher Währung gibst du den Preis ein?\n(z. B. USD, EUR, AED, NGN, XOF …)\n\nAktuell: ' + fmtIn(p.price_usd, 'USD'), 'USD') || '').trim().toUpperCase();
  if (!cur) return;
  if (!CURRENCIES[cur]) { toast('Unbekannte Währung: ' + cur, 't-error'); return; }
  var raw = prompt('Neuer Preis in ' + cur + ':', cur === 'USD' ? String(p.price_usd) : '');
  if (raw == null) return;
  var v = parseFloat(String(raw).replace(/\s/g, '').replace(',', '.'));
  if (isNaN(v) || v < 0) { toast('Ungültiger Betrag', 't-error'); return; }
  var usd = cur === 'USD' ? v : Math.round((v / fxRate(cur)) * 100) / 100;
  if (!confirm('Neuer Preis: ' + fmtIn(v, cur) + (cur !== 'USD' ? ' = ' + fmtIn(usd, 'USD') : '') + '\n\nSpeichern?')) return;
  try {
    await apiReq('/admin/products/' + id, 'PUT', { price_usd: usd }, true);
    p.price_usd = usd; apRender(); toast('Preis gespeichert');
  } catch (e) { toast(e.message, 't-error'); }
};
window.apToggle = async function (id, on) {
  try {
    await apiReq('/admin/products/' + id, 'PUT', { active: !!on }, true);
    var p = apFind(id); if (p) p.active = !!on; apRender();
  } catch (e) { toast(e.message, 't-error'); }
};
window.apDelete = async function (id) {
  var p = apFind(id);
  if (!confirm('Produkt „' + (p ? apTitle(p) : id) + '“ endgültig löschen?')) return;
  try {
    await apiReq('/admin/products/' + id, 'DELETE', null, true);
    window._apData = (window._apData || []).filter(function (x) { return String(x.id) !== String(id); });
    apRender(); toast('Produkt gelöscht');
  } catch (e) { toast(e.message, 't-error'); }
};

/* ═════════════════════════════════════════════════════════════════
   ADMIN: NUTZER  (#admin-users)  – Uebersicht, nur lesend
   ═════════════════════════════════════════════════════════════════ */
route('admin-users', async function () {
  if (!S.user || S.user.role !== 'admin') { render('login'); return; }
  var h = '<div class="page-wrap"><section class="section">';
  h += '<button class="btn btn-ghost btn-sm" onclick="render(\'admin-dashboard\')">&lt; Zurück</button>';
  h += '<div class="sec-hd" style="margin:.6rem 0 1rem"><div class="sec-title">👥 Nutzer</div></div>';
  h += '<div style="display:flex;gap:.6rem;flex-wrap:wrap;align-items:center;margin-bottom:1rem">';
  h += '<select id="auRole" onchange="auRender()"><option value="">Alle Rollen</option><option value="customer">Kunden</option><option value="dealer">Händler</option><option value="admin">Admins</option></select>';
  h += '<input id="auSearch" placeholder="Suche: Name, E-Mail, Telefon, Land" oninput="auRender()" style="max-width:280px"/>';
  h += '<span id="auCount" style="font-size:.85rem;opacity:.7"></span></div><div id="auList">Lädt…</div></section></div>';
  $('content').innerHTML = h;
  try {
    var r = await apiReq('/admin/users', 'GET', null, true);
    window._auData = r.data || [];
    auRender();
  } catch (e) { $('auList').innerHTML = '<div class="alert alert-error">' + esc(e.message) + '</div>'; }
});
window.auRender = function () {
  var all = window._auData || [], box = $('auList'); if (!box) return;
  var role = ($('auRole') || {}).value || '', q = (($('auSearch') || {}).value || '').toLowerCase().trim();
  var list = all.filter(function (u) {
    var r = u.role === 'seller' ? 'dealer' : u.role;
    if (role && r !== role) return false;
    if (!q) return true;
    return [u.name, u.email, u.phone, u.country, u.id].join(' ').toLowerCase().indexOf(q) !== -1;
  });
  $('auCount').textContent = list.length + ' von ' + all.length;
  var roleL = { customer: 'Kunde', dealer: 'Händler', seller: 'Händler', admin: 'Admin' };
  var h = '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:.85rem;min-width:720px">';
  h += '<tr style="background:var(--surface2,#f3f4f6)"><th style="text-align:left;padding:.45rem">Name</th><th style="text-align:left;padding:.45rem">E-Mail</th><th style="text-align:left;padding:.45rem">Rolle</th><th style="text-align:left;padding:.45rem">Land</th><th style="text-align:left;padding:.45rem">E-Mail bestätigt</th><th style="text-align:left;padding:.45rem">Registriert</th><th style="text-align:left;padding:.45rem">Letzter Login</th></tr>';
  h += list.map(function (u) {
    return '<tr style="border-bottom:1px solid rgba(128,128,128,.2)"><td style="padding:.45rem">' + esc(u.name || '—') + '</td><td style="padding:.45rem">' + esc(u.email) + '</td>'
      + '<td style="padding:.45rem">' + esc(roleL[u.role] || u.role) + '</td><td style="padding:.45rem">' + esc(u.country || '—') + '</td>'
      + '<td style="padding:.45rem">' + (u.email_verified ? '✅' : '—') + '</td><td style="padding:.45rem">' + esc(admDate(u.created_at)) + '</td>'
      + '<td style="padding:.45rem">' + esc(admDate(u.last_login_at)) + '</td></tr>';
  }).join('');
  box.innerHTML = h + '</table></div>';
};

/* ---------- INIT + SPA ROUTING ---------- */
setDir(S.lang);
updateMeta();
loadFxRates(); // Live-Wechselkurse im Hintergrund laden

// Browser Back/Forward → re-render
window.addEventListener('popstate', function (e) {
  if (e.state && e.state.name) {
    render(e.state.name, e.state.params || {}, true);
  } else {
    render('home', {}, true);
  }
});

// Rueckkehr von Stripe pruefen (?stripe_session=...)
function _checkStripeReturn() {
  const sid = new URLSearchParams(window.location.search).get('stripe_session');
  if (!sid) return false;
  history.replaceState({}, '', window.location.pathname + window.location.hash);
  apiReq('/checkout/stripe/verify?session_id=' + encodeURIComponent(sid), 'GET', null, false)
    .then(function (d) {
      if (d && d.paid) {
        try { sessionStorage.removeItem('apa_pending_order'); } catch (e) {}
        S.cart = []; csave(); buildNav();
        toast(t('checkout.success') || 'Zahlung erfolgreich');
        render('my-orders');
      } else {
        toast('Zahlung nicht abgeschlossen', 't-error');
        render('cart');
      }
    })
    .catch(function () { toast('Verifizierung fehlgeschlagen', 't-error'); render('cart'); });
  return true;
}

// Rueckkehr von pawaPay pruefen (?pawapay_deposit=...)
// Mobile Money ist asynchron: der Endstatus kann noch unterwegs sein,
// deshalb wird bis zu 90 Sekunden lang nachgefragt.
function _checkPawapayReturn() {
  const dep = new URLSearchParams(window.location.search).get('pawapay_deposit');
  if (!dep) return false;
  history.replaceState({}, '', window.location.pathname + window.location.hash);

  const L = {
    de: { wait: 'Zahlung wird bestätigt … bitte bestätige die Zahlung auf deinem Handy.',
          ok: 'Zahlung erfolgreich', slow: 'Die Zahlung wird noch verarbeitet. Du findest den Status unter „Meine Bestellungen“.',
          fail: 'Zahlung nicht abgeschlossen' },
    en: { wait: 'Confirming payment … please approve the payment on your phone.',
          ok: 'Payment successful', slow: 'Your payment is still processing. You can check the status under “My orders”.',
          fail: 'Payment not completed' },
    fr: { wait: 'Confirmation du paiement … veuillez approuver le paiement sur votre téléphone.',
          ok: 'Paiement réussi', slow: 'Votre paiement est en cours de traitement. Consultez « Mes commandes ».',
          fail: 'Paiement non abouti' },
    pt: { wait: 'A confirmar o pagamento … aprove o pagamento no seu telemóvel.',
          ok: 'Pagamento efetuado', slow: 'O pagamento ainda está a ser processado. Veja em «As minhas encomendas».',
          fail: 'Pagamento não concluído' },
    sw: { wait: 'Tunathibitisha malipo … tafadhali idhinisha malipo kwenye simu yako.',
          ok: 'Malipo yamefanikiwa', slow: 'Malipo bado yanachakatwa. Angalia chini ya “Maagizo yangu”.',
          fail: 'Malipo hayakukamilika' }
  };
  const x = L[S.lang] || L.en;

  $('content').innerHTML =
    '<div class="page-wrap"><section class="section" style="text-align:center;padding:3rem 1rem">' +
    '<div class="spinner" role="status" style="margin:0 auto 1.25rem"></div>' +
    '<div style="font-size:1rem;max-width:420px;margin:0 auto;line-height:1.5">' + esc(x.wait) + '</div>' +
    '</section></div>';

  let tries = 0;
  const poll = function () {
    tries++;
    apiReq('/checkout/pawapay/status?deposit_id=' + encodeURIComponent(dep), 'GET', null, false)
      .then(function (d) {
        if (d && d.paid) {
          try { localStorage.removeItem('pp_deposit'); } catch (e) {}
          try { sessionStorage.removeItem('apa_pending_order'); } catch (e) {}
          S.cart = []; csave(); buildNav();
          toast(t('checkout.success') || x.ok);
          render('my-orders');
          return;
        }
        if (d && d.pending && tries < 18) { setTimeout(poll, 5000); return; }
        if (d && d.pending) { toast(x.slow, 't-error'); render('my-orders'); return; }
        toast((d && d.failure_message) ? d.failure_message : x.fail, 't-error');
        render('cart');
      })
      .catch(function () {
        if (tries < 18) { setTimeout(poll, 5000); return; }
        toast(x.fail, 't-error'); render('cart');
      });
  };
  setTimeout(poll, 2500);
  return true;
}

// Beim Laden: aus URL-Hash die richtige Route ermitteln
function _initRouteFromHash() {
  if (_checkPawapayReturn()) return;
  if (_checkStripeReturn()) return;
  const hash = window.location.hash.slice(1);
  if (!hash) { render('home'); return; }
  const parts = hash.split('?');
  const name = parts[0] || 'home';
  const params = {};
  if (parts[1]) {
    new URLSearchParams(parts[1]).forEach(function (v, k) { params[k] = v; });
  }
  render(name, params);
}

/* ═════════════════════════════════════════════════════════════════
   PKW-ERSATZTEILE OVERLAY
   Autodoc-style category picker. Fixed overlay, doesn't push content.
   Cached on first open. Two-pane on desktop, two-step on mobile.
   ═════════════════════════════════════════════════════════════════ */

window._pkwTree = null;     // cached tree from /api/categories/tree
window._pkwActiveMain = null; // currently selected main category id

async function pkwOpen() {
  // Sprachwechsel: Overlay komplett neu bauen, damit Titel/Buttons
  // und Inhalte in der aktuellen Sprache erscheinen (Fix: Texte
  // blieben bis zum Seiten-Reload in der alten Sprache haengen).
  var existing = document.getElementById('pkw-overlay');
  if (existing && existing.dataset.lang !== S.lang) {
    existing.remove();
  }
  // Build the DOM lazily — only once per language
  if (!document.getElementById('pkw-overlay')) {
    var ov = document.createElement('div');
    ov.id = 'pkw-overlay';
    ov.className = 'pkw-ov';
    ov.innerHTML = ''
      + '<div class="pkw-ov-bg" onclick="pkwClose()"></div>'
      + '<div class="pkw-ov-panel" role="dialog" aria-modal="true" aria-labelledby="pkw-ov-title">'
      +   '<div class="pkw-ov-hd">'
      +     '<button class="pkw-ov-back" id="pkw-ov-back" onclick="pkwShowMains()" aria-label="' + esc(t('home.pkw_back')) + '" style="display:none">'
      +       '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>'
      +     '</button>'
      +     '<h2 id="pkw-ov-title">' + esc(t('home.pkw_title')) + '</h2>'
      +     '<button class="pkw-ov-close" onclick="pkwClose()" aria-label="' + esc(t('home.pkw_close')) + '">'
      +       '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
      +     '</button>'
      +   '</div>'
      +   '<div class="pkw-ov-body">'
      +     '<div class="pkw-ov-mains" id="pkw-ov-mains">'
      +       '<div class="pkw-loading">…</div>'
      +     '</div>'
      +     '<div class="pkw-ov-subs" id="pkw-ov-subs">'
      +       '<div class="pkw-sub-empty">' + esc(t('home.pkw_choose')) + '</div>'
      +     '</div>'
      +   '</div>'
      + '</div>';
    ov.dataset.lang = S.lang;
    document.body.appendChild(ov);
  }

  // Show overlay & block body scroll
  document.getElementById('pkw-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';

  // Lazy-load tree (cache 5 min, sprach-gebunden — Fix: Cache lieferte
  // nach Sprachwechsel den Baum in der alten Sprache aus)
  if (!window._pkwTree || window._pkwTreeLang !== S.lang || (Date.now() - (window._pkwTreeFetched || 0)) > 300000) {
    try {
      var resp = await apiReq('/categories/tree?lang=' + S.lang, 'GET', null, false);
      window._pkwTree = (resp && resp.tree) ? resp.tree : (Array.isArray(resp) ? resp : []);
      window._pkwTreeFetched = Date.now();
      window._pkwTreeLang = S.lang;
    } catch (e) {
      window._pkwTree = [];
    }
  }

  pkwRenderMains();
}

function pkwClose() {
  var ov = document.getElementById('pkw-overlay');
  if (ov) ov.classList.remove('open');
  document.body.style.overflow = '';
  window._pkwActiveMain = null;
}

function pkwRenderMains() {
  var box = document.getElementById('pkw-ov-mains');
  if (!box) return;
  var tree = window._pkwTree || [];
  if (!tree.length) {
    box.innerHTML = '<div class="pkw-sub-empty">No categories yet</div>';
    return;
  }
  var html = '';
  tree.forEach(function (m) {
    var isActive = String(window._pkwActiveMain) === String(m.id);
    html += '<button type="button" class="pkw-main-row ' + (isActive ? 'active' : '') + '" onclick="pkwPickMain(' + m.id + ')" data-id="' + m.id + '">';
    html += '<span class="pkw-main-icon">' + esc(m.icon || '📁') + '</span>';
    html += '<span class="pkw-main-name">' + esc(m.name) + '</span>';
    if (m.subs && m.subs.length) {
      html += '<svg class="pkw-main-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>';
    }
    html += '</button>';
  });
  box.innerHTML = html;
}

function pkwPickMain(id) {
  window._pkwActiveMain = id;
  var tree = window._pkwTree || [];
  var main = tree.find(function (m) { return String(m.id) === String(id); });
  if (!main) return;

  // Highlight active in left column
  document.querySelectorAll('.pkw-main-row').forEach(function (el) {
    el.classList.toggle('active', el.dataset.id == id);
  });

  // Render right column (subs)
  var subs = main.subs || [];
  var box = document.getElementById('pkw-ov-subs');
  if (!box) return;

  var html = '<div class="pkw-sub-hd">';
  html += '<span class="pkw-sub-hd-icon">' + esc(main.icon) + '</span>';
  html += '<span class="pkw-sub-hd-name">' + esc(main.name) + '</span>';
  html += '</div>';
  html += '<div class="pkw-sub-list">';

  // "All in main category" entry — clicking this filters by main category itself
  html += '<button type="button" class="pkw-sub-row pkw-sub-all" onclick="pkwGo(' + main.id + ',\'' + esc(main.name).replace(/'/g,'') + '\')">';
  html += '<span class="pkw-sub-name"><strong>' + esc(t('home.pkw_search_in')) + ': ' + esc(main.name) + '</strong></span>';
  html += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>';
  html += '</button>';

  if (!subs.length) {
    html += '<div class="pkw-sub-empty" style="margin-top:.5rem">—</div>';
  } else {
    subs.forEach(function (s) {
      html += '<button type="button" class="pkw-sub-row" onclick="pkwGo(' + s.id + ',\'' + esc(s.name).replace(/'/g,'') + '\')">';
      html += '<span class="pkw-sub-icon">' + esc(s.icon || '▸') + '</span>';
      html += '<span class="pkw-sub-name">' + esc(s.name) + '</span>';
      html += '<svg class="pkw-sub-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>';
      html += '</button>';
    });
  }
  html += '</div>';
  box.innerHTML = html;

  // On mobile: slide to sub-view
  var panel = document.querySelector('#pkw-overlay .pkw-ov-panel');
  if (panel) panel.classList.add('show-subs');
  var backBtn = document.getElementById('pkw-ov-back');
  if (backBtn) backBtn.style.display = '';
}

function pkwShowMains() {
  var panel = document.querySelector('#pkw-overlay .pkw-ov-panel');
  if (panel) panel.classList.remove('show-subs');
  var backBtn = document.getElementById('pkw-ov-back');
  if (backBtn) backBtn.style.display = 'none';
}

function pkwGo(catId, catName) {
  pkwClose();
  render('products', { category_id: catId, category_name: catName });
}

// ESC key closes the overlay
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    var ov = document.getElementById('pkw-overlay');
    if (ov && ov.classList.contains('open')) pkwClose();
  }
});


/* ═══════════════════════════════════════════════════════════════════
   DYNAMIC HOMEPAGE CONTENT (Banners + SEO Texts)
   Slot map:
     • #hero-banner-mount        → rotating background banners (placement=hero)
     • #partner-slot-mount       → rotating partner card        (placement=partner)
     • #side-banner-left-mount   → rotating left skyscraper     (placement=side_left)
     • #side-banner-right-mount  → rotating right skyscraper    (placement=side_right)
     • #seo-top-mount            → SEO text blocks (home_top)
     • #seo-bottom-mount         → SEO text blocks (home_bottom)
   ═══════════════════════════════════════════════════════════════════ */

// Empfohlene Kategorien: echte Kategorienliste (erste 12), echte Bilder, Slide-Style.
function renderFeaturedCats(cats) {
  var mount = document.getElementById('featcat-mount');
  if (!mount) return;
  if (!cats || !cats.length) { mount.innerHTML = ''; return; }

  // Titel mehrsprachig (alle 9 Sprachen).
  var TT = { de:'Empfohlene Kategorien', en:'Featured Categories', fr:'Catégories en vedette', pt:'Categorias em destaque', es:'Categorías destacadas', sw:'Kategoria maarufu', ar:'الفئات المميزة', tr:'Öne çıkan kategoriler', ln:'Bakatɛgɔlɛ ya ntina' };
  var title = TT[S.lang] || TT.en;

  var list = cats.slice(0, 12);

  // Liefert die Bildquelle: echtes Bild aus icon_url (falls URL),
  // sonst /categories/{slug}.png auf dem Host (vom Nutzer hochladbar).
  function imgFor(c) {
    var u = c && c.icon_url ? String(c.icon_url).trim() : '';
    if (u && (u.indexOf('http') === 0 || u.indexOf('/') === 0)) return u;
    return '/categories/' + encodeURIComponent(c.slug || '') + '.png';
  }

  var h = '<div class="mp-card">';
  h += '<div class="mp-card-hd"><div class="mp-card-title">' + esc(title) + '</div></div>';
  h += '<div class="mp-scroller"><div class="mp-scroller-track">';
  list.forEach(function (c) {
    var nm = c.name || c.slug || '';
    var safeNm = String(nm).replace(/'/g, '');
    h += '<div class="mp-cat-tile photo" onclick="render(\'products\',{category_id:\'' + c.id + '\',category_name:\'' + esc(safeNm) + '\'})" title="' + esc(nm) + '">';
    h += '<div class="cat-photo">';
    h += '<img src="' + esc(imgFor(c)) + '" alt="' + esc(nm) + '" loading="lazy" onerror="this.style.display=\'none\';this.parentNode.classList.add(\'noimg\')"/>';
    h += '</div>';
    h += '<div class="cat-label">' + esc(nm) + '</div>';
    h += '</div>';
  });
  h += '</div></div></div>';
  mount.innerHTML = h;
}

async function mountHomeDynamic() {
  // Fire all requests in parallel
  const [hero, partner, sleft, sright, seoTop, seoBot, cats] = await Promise.all([
    apiReq('/banners?placement=hero',       'GET', null, false).catch(() => ({ data: [] })),
    apiReq('/banners?placement=partner',    'GET', null, false).catch(() => ({ data: [] })),
    apiReq('/banners?placement=side_left',  'GET', null, false).catch(() => ({ data: [] })),
    apiReq('/banners?placement=side_right', 'GET', null, false).catch(() => ({ data: [] })),
    apiReq('/seo-texts?placement=home_top&lang='    + S.lang, 'GET', null, false).catch(() => ({ data: [] })),
    apiReq('/seo-texts?placement=home_bottom&lang=' + S.lang, 'GET', null, false).catch(() => ({ data: [] })),
    apiReq('/categories?lang=' + S.lang, 'GET', null, false).catch(() => []),
  ]);

  renderHeroBanners(hero.data || []);
  renderPartnerSlot(partner.data || []);
  renderSideBanner('side-banner-left-mount', sleft.data || []);
  renderSideBanner('side-banner-right-mount', sright.data || []);
  renderSeoBlocks('seo-top-mount',    seoTop.data || []);
  renderSeoBlocks('seo-bottom-mount', seoBot.data || []);
  renderFeaturedCats(Array.isArray(cats) ? cats : (cats && cats.data) || []);
}

function renderHeroBanners(banners) {
  const mount = document.getElementById('hero-banner-mount');
  const hero = document.querySelector('.hero');
  if (!mount) return;
  if (!banners.length) {
    mount.innerHTML = '';
    if (hero) hero.classList.remove('has-banner');
    return;
  }
  if (hero) hero.classList.add('has-banner');

  let html = '';
  banners.forEach(function (b, i) {
    const active = i === 0 ? ' is-active' : '';
    const safe = String(b.image_url || '').replace(/'/g, '%27');
    const isVid = (b.media_type === 'video') || /\.(mp4|webm|mov)(\?|$)/i.test(safe);
    if (isVid) {
      html += '<div class="hero-slide-bg' + active + '" aria-hidden="true">'
            + '<video class="hero-slide-vid" src="' + safe + '" muted autoplay loop playsinline preload="metadata"></video>'
            + '</div>';
    } else {
      html += '<div class="hero-slide-bg' + active + '" style="background-image:url(\'' + safe + '\')" aria-hidden="true"></div>';
    }
  });
  if (banners.length > 1) {
    html += '<div class="hero-dots">';
    banners.forEach(function (_, i) {
      html += '<button class="hero-dot' + (i === 0 ? ' is-active' : '') + '" data-i="' + i + '" aria-label="Banner ' + (i + 1) + '"></button>';
    });
    html += '</div>';
  }
  mount.innerHTML = html;
  if (banners.length > 1) startBannerRotation('.hero', '.hero-slide-bg', '.hero-dot', 6000);
}

function renderPartnerSlot(banners) {
  const mount = document.getElementById('partner-slot-mount');
  if (!mount) return;
  if (!banners.length) { mount.innerHTML = ''; return; }

  // If only one — static card with image + click. If many — rotating.
  let html = '<div class="mp-card partner-slot">';
  html += '<div class="mp-card-hd">';
  html += '<div class="mp-card-title">' + esc(banners[0].title || 'Partner') + '</div>';
  html += '<span class="mp-sponsor-tag">Sponsored ⓘ</span>';
  html += '</div>';
  html += '<div class="partner-rotator">';
  banners.forEach(function(b, i) {
    const safeImg = String(b.image_url).replace(/'/g, '%27');
    const aria = esc(b.alt_text || b.title || 'Partner banner');
    const link = b.link_url ? esc(b.link_url) : '';
    if (link) {
      html += '<a href="' + link + '" class="partner-slide' + (i === 0 ? ' is-active' : '') + '" target="_blank" rel="noopener" aria-label="' + aria + '"><img src="' + safeImg + '" alt="' + aria + '" loading="lazy"></a>';
    } else {
      html += '<div class="partner-slide' + (i === 0 ? ' is-active' : '') + '" role="img" aria-label="' + aria + '"><img src="' + safeImg + '" alt="' + aria + '" loading="lazy"></div>';
    }
  });
  if (banners.length > 1) {
    html += '<div class="partner-dots">';
    banners.forEach(function(_, i) {
      html += '<button class="partner-dot' + (i === 0 ? ' is-active' : '') + '" data-i="' + i + '" aria-label="Partner ' + (i + 1) + '"></button>';
    });
    html += '</div>';
  }
  html += '</div></div>';
  mount.innerHTML = html;

  if (banners.length > 1) {
    startBannerRotation('.partner-rotator', '.partner-slide', '.partner-dot', 7000);
  }
}

function renderSideBanner(mountId, banners) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  if (!banners.length) { mount.style.display = 'none'; return; }

  mount.style.display = '';
  let html = '<div class="side-rotator">';
  banners.forEach(function(b, i) {
    const safeImg = String(b.image_url).replace(/'/g, '%27');
    const aria = esc(b.alt_text || b.title || '');
    const link = b.link_url ? esc(b.link_url) : '';
    if (link) {
      html += '<a href="' + link + '" class="side-slide' + (i === 0 ? ' is-active' : '') + '" target="_blank" rel="noopener" aria-label="' + aria + '"><img src="' + safeImg + '" alt="' + aria + '" loading="lazy"></a>';
    } else {
      html += '<div class="side-slide' + (i === 0 ? ' is-active' : '') + '" role="img" aria-label="' + aria + '"><img src="' + safeImg + '" alt="' + aria + '" loading="lazy"></div>';
    }
  });
  html += '<div class="side-ad-label">Ad</div>';
  html += '</div>';
  mount.innerHTML = html;

  if (banners.length > 1) {
    startBannerRotation('#' + mountId + ' .side-rotator', '.side-slide', null, 8000);
  }
}

function renderSeoBlocks(mountId, items) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  if (!items.length) { mount.innerHTML = ''; return; }

  let html = '<div class="page-wrap"><div class="seo-blocks">';
  items.forEach(function(s) {
    html += '<article class="seo-block">';
    if (s.title) html += '<h2 class="seo-block-title">' + esc(s.title) + '</h2>';
    // body may contain HTML — admin-managed, trust it
    if (s.body) html += '<div class="seo-block-body">' + s.body + '</div>';
    html += '</article>';
  });
  html += '</div></div>';
  mount.innerHTML = html;
}

// Generic rotator: cycles `.is-active` class through slides, optional dot navigation
function startBannerRotation(containerSel, slideSel, dotSel, intervalMs) {
  intervalMs = intervalMs || 6000;
  const container = document.querySelector(containerSel);
  if (!container) return;
  const slides = container.querySelectorAll(slideSel);
  if (slides.length < 2) return;
  const dots = dotSel ? container.querySelectorAll(dotSel) : null;

  let i = 0;
  function show(next) {
    slides[i].classList.remove('is-active');
    if (dots && dots[i]) dots[i].classList.remove('is-active');
    i = (next + slides.length) % slides.length;
    slides[i].classList.add('is-active');
    if (dots && dots[i]) dots[i].classList.add('is-active');
  }
  let timer = setInterval(function() { show(i + 1); }, intervalMs);

  if (dots) {
    dots.forEach(function(d) {
      d.addEventListener('click', function() {
        clearInterval(timer);
        show(parseInt(d.dataset.i, 10));
        timer = setInterval(function() { show(i + 1); }, intervalMs);
      });
    });
  }
  container.addEventListener('mouseenter', function() { clearInterval(timer); });
  container.addEventListener('mouseleave', function() {
    timer = setInterval(function() { show(i + 1); }, intervalMs);
  });
}


/* ---------- FOOTER-CMS: statische Seiten, Kontakt, Admin ---------- */

function _pageBodyHtml(body) {
  // Escapen, dann Leerzeile = Absatz, einfacher Umbruch = <br>
  return String(body || '').split(/\n{2,}/).map(function (p) {
    return '<p>' + esc(p).replace(/\n/g, '<br>') + '</p>';
  }).join('');
}

route('page', async function (params) {
  const slug = (params && params.slug) || 'about';
  const d = await apiReq('/pages/' + encodeURIComponent(slug) + '?lang=' + encodeURIComponent(S.lang));
  let h = '<div class="page-wrap"><div class="section static-page">';
  h += '<h1>' + esc(d.title) + '</h1>';
  h += _pageBodyHtml(d.body);
  h += '</div></div>';
  $('content').innerHTML = h;
});

route('contact', async function () {
  let email = 'ziko.miguel@live.de';
  try {
    const d = await apiReq('/site-settings/contact-email');
    if (d && d.email) email = d.email;
  } catch (e) { /* Fallback behalten */ }

  let h = '<div class="page-wrap"><div class="section static-page" style="max-width:640px">';
  h += '<h1>' + t('footerx.c_title') + '</h1>';
  h += '<p>' + t('footerx.c_intro') + '</p>';
  h += '<div class="contact-form">';
  h += '<label>' + t('footerx.c_name') + '</label><input id="cf-name" type="text">';
  h += '<label>' + t('footerx.c_email') + '</label><input id="cf-email" type="email">';
  h += '<label>' + t('footerx.c_msg') + '</label><textarea id="cf-msg" rows="6"></textarea>';
  h += '<button class="btn btn-primary" onclick="cfSend(\'' + esc(email) + '\')">' + t('footerx.c_send') + '</button>';
  h += '<p style="font-size:.85rem;opacity:.7;margin-top:.5rem">' + t('footerx.c_hint') + '</p>';
  h += '</div></div></div>';
  $('content').innerHTML = h;
});

function cfSend(email) {
  const name = ($('cf-name') && $('cf-name').value || '').trim();
  const from = ($('cf-email') && $('cf-email').value || '').trim();
  const msg = ($('cf-msg') && $('cf-msg').value || '').trim();
  const subject = 'AFRICARPARTS Contact' + (name ? ' - ' + name : '');
  const body = msg + (from ? '\n\n' + t('footerx.c_email') + ': ' + from : '');
  window.location.href = 'mailto:' + encodeURIComponent(email) +
    '?subject=' + encodeURIComponent(subject) +
    '&body=' + encodeURIComponent(body);
}
window.cfSend = cfSend;

/* ---------- Admin: Footer & Seiten ---------- */
const FOOTER_ADMIN_SLUGS = ['about', 'blog', 'faq', 'terms', 'privacy', 'cookies', 'dealer-terms', 'imprint', 'shipping', 'returns'];
const FOOTER_ADMIN_LANGS = ['en', 'de', 'fr', 'pt', 'es', 'ar', 'tr', 'sw', 'ln'];
let _faPages = null;

route('admin-footer', async function () {
  if (!S.user || S.user.role !== 'admin') { render('login'); return; }

  const [pd, ed] = await Promise.all([
    apiReq('/admin/pages', 'GET', null, true),
    apiReq('/site-settings/contact-email')
  ]);
  _faPages = {};
  (pd.pages || []).forEach(function (p) { _faPages[p.slug] = p.content || {}; });

  let h = '<div class="page-wrap"><div class="section">';
  h += '<button class="btn btn-ghost btn-sm" onclick="render(\'admin-dashboard\')" style="margin-bottom:1rem">&lt; Zurück</button>';
  h += '<h1 style="margin-bottom:1rem">' + t('footerx.adm_title') + '</h1>';

  // Kontakt-E-Mail
  h += '<div class="card" style="padding:1rem;margin-bottom:1.5rem;max-width:560px">';
  h += '<div class="footer-col-title" style="color:inherit">' + t('footerx.adm_email_t') + '</div>';
  h += '<p style="font-size:.85rem;opacity:.75;margin:.25rem 0 .5rem">' + t('footerx.adm_email_d') + '</p>';
  h += '<div style="display:flex;gap:.5rem;flex-wrap:wrap">';
  h += '<input id="fa-email" type="email" value="' + esc(ed.email || '') + '" style="flex:1;min-width:220px">';
  h += '<button class="btn btn-primary btn-sm" onclick="faSaveEmail()">' + t('footerx.adm_email_save') + '</button>';
  h += '</div></div>';

  // Seiten-Editor
  h += '<div class="card" style="padding:1rem;max-width:760px">';
  h += '<div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-bottom:.75rem">';
  h += '<div><label>' + t('footerx.adm_page') + '</label><br><select id="fa-slug" onchange="faLoad()">';
  FOOTER_ADMIN_SLUGS.forEach(function (s) { h += '<option value="' + s + '">' + s + '</option>'; });
  h += '</select></div>';
  h += '<div><label>' + t('footerx.adm_lang') + '</label><br><select id="fa-lang" onchange="faLoad()">';
  FOOTER_ADMIN_LANGS.forEach(function (l) { h += '<option value="' + l + '">' + l.toUpperCase() + '</option>'; });
  h += '</select></div>';
  h += '</div>';
  h += '<label>' + t('footerx.adm_f_title') + '</label>';
  h += '<input id="fa-title" type="text" style="width:100%;margin:.25rem 0 .75rem">';
  h += '<label>' + t('footerx.adm_f_body') + '</label>';
  h += '<textarea id="fa-body" rows="14" style="width:100%;margin-top:.25rem;font-family:inherit"></textarea>';
  h += '<div style="margin-top:.75rem"><button class="btn btn-primary" onclick="faSave()">' + t('footerx.adm_save') + '</button></div>';
  h += '</div>';

  h += '</div></div>';
  $('content').innerHTML = h;
  faLoad();
});

function faLoad() {
  const slug = $('fa-slug').value;
  const lang = $('fa-lang').value;
  const entry = (_faPages[slug] && _faPages[slug][lang]) || { title: '', body: '' };
  $('fa-title').value = entry.title || '';
  $('fa-body').value = entry.body || '';
}
window.faLoad = faLoad;

async function faSave() {
  const slug = $('fa-slug').value;
  const lang = $('fa-lang').value;
  const payload = { lang: lang, title: $('fa-title').value, body: $('fa-body').value };
  try {
    await apiReq('/admin/pages/' + slug, 'PUT', payload, true);
    if (!_faPages[slug]) _faPages[slug] = {};
    _faPages[slug][lang] = { title: payload.title, body: payload.body };
    toast(t('footerx.adm_saved'), 't-success');
  } catch (err) {
    toast(err.message, 't-error');
  }
}
window.faSave = faSave;

async function faSaveEmail() {
  try {
    await apiReq('/admin/site-settings/contact-email', 'PUT', { email: $('fa-email').value }, true);
    toast(t('footerx.adm_saved'), 't-success');
  } catch (err) {
    toast(err.message, 't-error');
  }
}
window.faSaveEmail = faSaveEmail;


/* ═════════════════════════════════════════════════════════════════
   PARTA — KI-Kundenassistent (Frontend-Widget)
   Schwebender Button + Chat-Panel. Spricht POST /parta an (öffentlich).
   Verlauf bleibt im Speicher (partaHistory), Vorschläge sind klickbar.
   ═════════════════════════════════════════════════════════════════ */
var partaHistory = [];
var partaOpen = false;
var partaBusy = false;

var PARTA_L = {
  en: { title:'Parta · Parts assistant', greet:"Hi! I'm Parta. Tell me which part you need, or describe the problem with your car.", ph:'Type your message…', send:'Send', err:'Something went wrong. Please try again.', off:'The assistant is not available right now.', open:'Ask Parta' },
  de: { title:'Parta · Teile-Assistent', greet:'Hallo! Ich bin Parta. Sag mir, welches Teil du brauchst, oder beschreib dein Problem am Auto.', ph:'Nachricht eingeben…', send:'Senden', err:'Etwas ist schiefgelaufen. Bitte versuch es nochmal.', off:'Der Assistent ist gerade nicht verfügbar.', open:'Parta fragen' },
  fr: { title:'Parta · Assistant pièces', greet:"Bonjour ! Je suis Parta. Dites-moi quelle pièce vous cherchez, ou décrivez le problème de votre voiture.", ph:'Écrivez votre message…', send:'Envoyer', err:"Une erreur s'est produite. Veuillez réessayer.", off:"L'assistant n'est pas disponible pour le moment.", open:'Demander à Parta' },
  pt: { title:'Parta · Assistente de peças', greet:'Olá! Sou a Parta. Diga-me de que peça precisa ou descreva o problema do seu carro.', ph:'Escreva a sua mensagem…', send:'Enviar', err:'Algo correu mal. Tente novamente.', off:'O assistente não está disponível de momento.', open:'Perguntar à Parta' },
  sw: { title:'Parta · Msaidizi wa vipuri', greet:'Habari! Mimi ni Parta. Niambie unahitaji kipuri gani, au eleza tatizo la gari lako.', ph:'Andika ujumbe wako…', send:'Tuma', err:'Kuna hitilafu. Tafadhali jaribu tena.', off:'Msaidizi hapatikani kwa sasa.', open:'Uliza Parta' },
  es: { title:'Parta · Asistente de piezas', greet:'¡Hola! Soy Parta. Dime qué pieza necesitas o describe el problema de tu coche.', ph:'Escribe tu mensaje…', send:'Enviar', err:'Algo salió mal. Inténtalo de nuevo.', off:'El asistente no está disponible ahora mismo.', open:'Preguntar a Parta' },
  ar: { title:'Parta · مساعد القطع', greet:'مرحبًا! أنا Parta. أخبرني بالقطعة التي تحتاجها أو صف مشكلة سيارتك.', ph:'اكتب رسالتك…', send:'إرسال', err:'حدث خطأ ما. حاول مرة أخرى.', off:'المساعد غير متاح حاليًا.', open:'اسأل Parta' },
  tr: { title:'Parta · Parça asistanı', greet:'Merhaba! Ben Parta. Hangi parçaya ihtiyacın olduğunu söyle ya da aracının sorununu anlat.', ph:'Mesajını yaz…', send:'Gönder', err:'Bir şeyler ters gitti. Lütfen tekrar dene.', off:'Asistan şu anda kullanılamıyor.', open:"Parta'ya sor" },
  ln: { title:'Parta · Mosalisi ya biloko', greet:'Mbote! Nazali Parta. Yebisa ngai eloko nini ozali na yango mposa, to limbola mokakatano ya motuka na yo.', ph:'Koma nsango na yo…', send:'Tinda', err:'Likambo esalemi mabe. Meka lisusu.', off:'Mosalisi azali na disponibilité te sikoyo.', open:'Tuna Parta' },
};
function partaT() { return PARTA_L[S.lang] || PARTA_L.en; }

function buildParta() {
  if ($('parta-root')) { return; }
  var root = document.createElement('div');
  root.id = 'parta-root';
  document.body.appendChild(root);
  renderParta();
}

function renderParta() {
  var root = $('parta-root');
  if (!root) return;
  var L = partaT();
  var rtl = (S.lang === 'ar');
  var side = rtl ? 'left' : 'right';

  var h = '';
  // Schwebender Button
  h += '<button id="parta-fab" onclick="partaToggle()" aria-label="' + esc(L.open) + '" ' +
       'style="position:fixed;bottom:20px;' + side + ':20px;z-index:9998;display:flex;align-items:center;gap:.5rem;' +
       'background:#003057;color:#fff;border:none;border-radius:999px;padding:.7rem 1.1rem;cursor:pointer;' +
       'box-shadow:0 6px 20px rgba(0,0,0,.25);font-weight:700;font-size:.95rem">' +
       '<span style="font-size:1.15rem">💬</span><span>' + esc(L.open) + '</span></button>';

  // Panel
  if (partaOpen) {
    h += '<div id="parta-panel" dir="' + (rtl ? 'rtl' : 'ltr') + '" ' +
         'style="position:fixed;bottom:84px;' + side + ':20px;z-index:9999;width:min(370px,calc(100vw - 32px));' +
         'height:min(540px,calc(100vh - 120px));display:flex;flex-direction:column;background:var(--surface,#fff);' +
         'border:1px solid var(--border,#e2e8f0);border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.28);overflow:hidden">';
    // Kopf
    h += '<div style="background:#003057;color:#fff;padding:.85rem 1rem;display:flex;align-items:center;justify-content:space-between">';
    h += '<div style="font-weight:700;font-size:.95rem">🚗 ' + esc(L.title) + '</div>';
    h += '<button onclick="partaToggle()" aria-label="close" style="background:transparent;border:none;color:#fff;font-size:1.3rem;cursor:pointer;line-height:1">×</button>';
    h += '</div>';
    // Verlauf
    h += '<div id="parta-msgs" style="flex:1;overflow-y:auto;padding:1rem;display:flex;flex-direction:column;gap:.7rem;background:var(--surface2,#f7f9fc)"></div>';
    // Eingabe
    h += '<div style="display:flex;gap:.5rem;padding:.7rem;border-top:1px solid var(--border,#e2e8f0);background:var(--surface,#fff)">';
    h += '<input id="parta-input" type="text" placeholder="' + esc(L.ph) + '" autocomplete="off" ' +
         'onkeydown="if(event.key===\'Enter\'){partaSend();}" ' +
         'style="flex:1;border:1px solid var(--border,#e2e8f0);border-radius:10px;padding:.6rem .8rem;font-size:.9rem;background:var(--surface,#fff);color:var(--text,#1a202c)"/>';
    h += '<button onclick="partaSend()" style="background:#e07b00;color:#fff;border:none;border-radius:10px;padding:.6rem .9rem;cursor:pointer;font-weight:700;font-size:.9rem">' + esc(L.send) + '</button>';
    h += '</div></div>';
  }
  root.innerHTML = h;

  if (partaOpen) {
    paintPartaMsgs();
    setTimeout(function () { var inp = $('parta-input'); if (inp) inp.focus(); }, 50);
  }
}

function partaToggle() {
  partaOpen = !partaOpen;
  if (partaOpen && !partaHistory.length) {
    partaHistory.push({ role: 'assistant', content: partaT().greet });
  }
  renderParta();
}

function paintPartaMsgs() {
  var box = $('parta-msgs');
  if (!box) return;
  var h = '';
  partaHistory.forEach(function (m) {
    if (m.role === 'user') {
      h += '<div style="align-self:flex-end;max-width:85%;background:#003057;color:#fff;padding:.55rem .8rem;border-radius:12px 12px 2px 12px;font-size:.9rem;line-height:1.45">' + esc(m.content) + '</div>';
    } else {
      h += '<div style="align-self:flex-start;max-width:90%;background:var(--surface,#fff);color:var(--text,#1a202c);border:1px solid var(--border,#e2e8f0);padding:.55rem .8rem;border-radius:12px 12px 12px 2px;font-size:.9rem;line-height:1.5">' + esc(m.content).replace(/\n/g, '<br>') + '</div>';
      // Produktvorschläge unter der Antwort
      if (m.products && m.products.length) {
        h += '<div style="display:flex;flex-direction:column;gap:.4rem;align-self:flex-start;width:90%">';
        m.products.forEach(function (p) {
          var price = p.price_usd ? ('$' + (Math.round(p.price_usd * 100) / 100)) : '';
          h += '<div onclick="partaOpenProduct(\'' + esc(String(p.id)) + '\')" ' +
               'style="cursor:pointer;display:flex;justify-content:space-between;gap:.5rem;align-items:center;' +
               'background:var(--surface2,#f7f9fc);border:1px solid var(--border,#e2e8f0);border-radius:10px;padding:.5rem .7rem">' +
               '<span style="font-size:.85rem;font-weight:600;color:var(--text,#1a202c)">' + esc(p.title) + '</span>' +
               '<span style="font-size:.85rem;font-weight:700;color:#e07b00;white-space:nowrap">' + esc(price) + '</span>' +
               '</div>';
        });
        h += '</div>';
      }
    }
  });
  if (partaBusy) {
    h += '<div style="align-self:flex-start;background:var(--surface,#fff);border:1px solid var(--border,#e2e8f0);padding:.55rem .8rem;border-radius:12px;font-size:.9rem;opacity:.7">…</div>';
  }
  box.innerHTML = h;
  box.scrollTop = box.scrollHeight;
}

function partaOpenProduct(id) {
  partaOpen = false;
  renderParta();
  render('product-detail', { id: id });
}

async function partaSend() {
  if (partaBusy) return;
  var inp = $('parta-input');
  var text = inp ? (inp.value || '').trim() : '';
  if (!text) return;
  if (inp) inp.value = '';
  partaHistory.push({ role: 'user', content: text });
  partaBusy = true;
  paintPartaMsgs();

  // Nur reine user/assistant-Texte als Verlauf senden (ohne Produkt-Anhänge)
  var hist = partaHistory.map(function (m) { return { role: m.role, content: m.content }; });

  try {
    var data = await apiReq('/parta', 'POST', { message: text, history: hist }, false);
    partaBusy = false;
    partaHistory.push({
      role: 'assistant',
      content: (data && data.reply) || partaT().err,
      products: (data && data.products) || [],
    });
    paintPartaMsgs();
  } catch (e) {
    partaBusy = false;
    var msg = (e && /not_configured/.test(e.message || '')) ? partaT().off : partaT().err;
    partaHistory.push({ role: 'assistant', content: msg });
    paintPartaMsgs();
  }
}
window.partaToggle = partaToggle;
window.partaSend = partaSend;
window.partaOpenProduct = partaOpenProduct;

buildParta();

_initRouteFromHash();
