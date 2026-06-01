/* ============================================================
   AFRICARPARTS - FRONTEND APP
   ============================================================ */

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
      featured: "Featured Parts", featured_sub: "Recently listed",
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
      featured_sub: "Zuletzt gelistet", view_all: "Alle anzeigen",
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
      featured: "En vedette", featured_sub: "Recentes",
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
      featured: "Destaque", featured_sub: "Recentes",
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
      featured: "Destacadas", featured_sub: "Recientes",
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
      featured: "Mumayyaza", featured_sub: "Hadithan",
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
      featured: "One Cikan", featured_sub: "Son", view_all: "Tumu",
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
      featured: "Maarufu", featured_sub: "Karibuni", view_all: "Vyote",
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
      featured: "Malamu", featured_sub: "Sika", view_all: "Nyonso",
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
      select_brand: "Select brand", select_model: "Select model", select_engine: "Select engine type",
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
      select_brand: "Marke auswählen", select_model: "Modell auswählen", select_engine: "Motor (Typ) auswählen",
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
      select_brand: "Choisir une marque", select_model: "Choisir un modèle", select_engine: "Choisir un type de moteur",
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
      select_brand: "Selecionar marca", select_model: "Selecionar modelo", select_engine: "Selecionar tipo de motor",
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
      select_brand: "Seleccionar marca", select_model: "Seleccionar modelo", select_engine: "Seleccionar tipo de motor",
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
      select_brand: "اختر العلامة", select_model: "اختر الموديل", select_engine: "اختر نوع المحرك",
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
      select_brand: "Marka seçin", select_model: "Model seçin", select_engine: "Motor tipi seçin",
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
      select_brand: "Chagua chapa", select_model: "Chagua modeli", select_engine: "Chagua aina ya injini",
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
      select_brand: "Pona marque", select_model: "Pona modèle", select_engine: "Pona type ya moteur",
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


/* ---------- CONFIG ---------- */
const API = "https://afcarparts-com.onrender.com/api";

const LANGS = {
  en: 'English', de: 'Deutsch', fr: 'Francais',
  pt: 'Portugues', es: 'Espanol', ar: 'Arabic',
  tr: 'Turkce', sw: 'Swahili', ln: 'Lingala'
};

const CURRENCIES = {
  USD: { sym: 'USD ', rate: 1 },
  EUR: { sym: 'EUR ', rate: 0.92 },
  GBP: { sym: 'GBP ', rate: 0.79 },
  NGN: { sym: 'NGN ', rate: 1580 },
  GHS: { sym: 'GHS ', rate: 15.2 },
  KES: { sym: 'KES ', rate: 130 }
};

/* ---------- STATE ---------- */
const S = {
  user: JSON.parse(localStorage.getItem('apa_user') || 'null'),
  token: localStorage.getItem('apa_token') || null,
  lang: localStorage.getItem('apa_lang') || 'en',
  currency: localStorage.getItem('apa_currency') || 'USD',
  cart: JSON.parse(localStorage.getItem('apa_cart') || '[]'),
  page: 'home',
  pageParams: {}
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

function fmt(usd) {
  const c = CURRENCIES[S.currency] || CURRENCIES.USD;
  return c.sym + (parseFloat(usd || 0) * c.rate).toFixed(2);
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
const ctot = () => S.cart.reduce((s, i) => s + parseFloat(i.price_usd || 0) * i.qty, 0);
const csave = () => localStorage.setItem('apa_cart', JSON.stringify(S.cart));

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

  const opts = { method: method, headers: h };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(API + path, opts);
  const d = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(d.error || d.message || 'HTTP ' + res.status);
  return d;
}

async function apiForm(path, fd, auth) {
  const h = { 'Accept-Language': S.lang };

  // Auch hier: KEIN Bearer
  if (auth && S.token) h['Authorization'] = 'Bearer ' + S.token;

  const res = await fetch(API + path, { 
    method: 'POST', 
    headers: h, 
    body: fd 
  });

  const d = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(d.error || 'HTTP ' + res.status);
  return d;
}

function logout() {
  S.user = null;
  S.token = null;
  localStorage.removeItem('apa_user');
  localStorage.removeItem('apa_token');
  render('home');
}

/* ---------- SELL BUTTON ROUTING ----------
   Smart routing for the "Verkaufen" / "Sell" button.
   - Not logged in        -> registration page
   - Logged in as seller  -> seller dashboard
   - Logged in as buyer   -> friendly message (later: upgrade page)
*/
function goSell() {
  if (!S.user) {
    render('register');
    return;
  }
  if (S.user.role === 'seller' || S.user.role === 'dealer') {
    render('seller-dashboard');
    return;
  }
  toast(
    'Dein Konto ist als Kaeufer registriert. Bitte erstelle ein separates Haendler-Konto.',
    't-error'
  );
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
  html += '<button class="nav-link" onclick="render(\'products\',{wholesale_only:\'1\'})">' + t('nav.china') + '</button>';

  if (S.user) {
    if (isS) html += '<button class="nav-link" onclick="render(\'seller-dashboard\')">' + t('nav.dashboard') + '</button>';
    if (isA) html += '<button class="nav-link" onclick="render(\'admin-dashboard\')">' + t('nav.admin') + '</button>';
    html += '<button class="nav-link" onclick="render(\'my-orders\')">' + t('nav.orders') + '</button>';
  }

  html += '<div class="nav-spacer"></div>';

  // Language + Currency selects
  html += '<select class="nav-sel" onchange="chLang(this.value)" title="' + t('nav.language') + '">';
  Object.entries(LANGS).forEach(function (e) {
    html += '<option value="' + e[0] + '"' + (S.lang === e[0] ? ' selected' : '') + '>' + e[1] + '</option>';
  });
  html += '</select>';
  html += '<select class="nav-sel" onchange="chCurr(this.value)" title="' + t('nav.currency') + '">';
  Object.keys(CURRENCIES).forEach(function (c) {
    html += '<option value="' + c + '"' + (S.currency === c ? ' selected' : '') + '>' + c + '</option>';
  });
  html += '</select>';

  html += '<div class="nav-divider"></div>';

  // Cart button (icon + count)
  html += '<button class="nav-cart-btn" onclick="render(\'cart\')" aria-label="' + t('nav.cart') + '">';
  html += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>';
  html += '<span class="cart-ct">' + cc() + '</span></button>';

  // Sign-in / sign-out
  if (S.user) {
    html += '<button class="nav-cart-btn" style="background:transparent;color:var(--text);border:1px solid var(--border)" onclick="logout()">' + t('nav.logout') + '</button>';
  } else {
    html += '<button class="nav-cart-btn" onclick="render(\'login\')">' + t('nav.login') + '</button>';
  }

  // Burger
  html += '<button class="burger" onclick="openMobileNav()" aria-label="Open menu">';
  html += '<span></span><span></span><span></span></button>';

  nb.innerHTML = html;

  // MOBILE NAV
  let mh = '';
  mh += '<button class="nav-mobile-close" onclick="closeMobileNav()">✕ Close</button>';
  mh += '<button class="nav-link" onclick="render(\'products\');closeMobileNav()">' + t('nav.parts') + '</button>';
  mh += '<button class="nav-link" onclick="render(\'shops\');closeMobileNav()">' + t('nav.shops') + '</button>';
  mh += '<button class="nav-link" onclick="render(\'products\',{wholesale_only:\'1\'});closeMobileNav()">' + t('nav.china') + '</button>';
  if (S.user) {
    if (isS) mh += '<button class="nav-link" onclick="render(\'seller-dashboard\');closeMobileNav()">' + t('nav.dashboard') + '</button>';
    if (isA) mh += '<button class="nav-link" onclick="render(\'admin-dashboard\');closeMobileNav()">' + t('nav.admin') + '</button>';
    mh += '<button class="nav-link" onclick="render(\'my-orders\');closeMobileNav()">' + t('nav.orders') + '</button>';
    mh += '<button class="nav-link" onclick="render(\'cart\');closeMobileNav()">' + t('nav.cart') + ' (' + cc() + ')</button>';
    mh += '<button class="nav-link" onclick="logout();closeMobileNav()" style="color:#c0392b">' + t('nav.logout') + '</button>';
  } else {
    mh += '<button class="nav-link" onclick="render(\'login\');closeMobileNav()">' + t('nav.login') + '</button>';
    mh += '<button class="nav-link" onclick="render(\'register\');closeMobileNav()">' + t('nav.register') + '</button>';
    mh += '<button class="nav-link" onclick="render(\'cart\');closeMobileNav()">' + t('nav.cart') + ' (' + cc() + ')</button>';
  }
  mh += '<div style="margin-top:1rem;padding-top:1rem;border-top:1px solid var(--border)">';
  mh += '<label style="font-size:.78rem;font-weight:700;color:var(--text2);display:block;margin-bottom:.3rem">' + t('nav.language') + '</label>';
  mh += '<select class="nav-sel" style="width:100%;display:block" onchange="chLang(this.value);closeMobileNav()">';
  Object.entries(LANGS).forEach(function (e) {
    mh += '<option value="' + e[0] + '"' + (S.lang === e[0] ? ' selected' : '') + '>' + e[1] + '</option>';
  });
  mh += '</select>';
  mh += '<label style="font-size:.78rem;font-weight:700;color:var(--text2);display:block;margin-top:.75rem;margin-bottom:.3rem">' + t('nav.currency') + '</label>';
  mh += '<select class="nav-sel" style="width:100%;display:block" onchange="chCurr(this.value)">';
  Object.keys(CURRENCIES).forEach(function (c) {
    mh += '<option value="' + c + '"' + (S.currency === c ? ' selected' : '') + '>' + c + '</option>';
  });
  mh += '</select></div>';

  $('nav-mobile').innerHTML = mh;
}

function openMobileNav() {
  $('nav-mobile').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
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
  S.currency = c;
  localStorage.setItem('apa_currency', c);
  buildNav();
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
  h += '<button class="footer-link" onclick="render(\'products\',{wholesale_only:\'1\'})">' + t('footer.china_w') + '</button>';
  h += '<a class="footer-link" href="/seller-dashboard.html?tab=register">' + t('footer.sell') + '</a>';
  h += '</div></div>';

  // Col 2: Support
  h += '<div><div class="footer-col-title">' + t('footer.support') + '</div><div class="footer-links">';
  h += '<button class="footer-link">' + t('footer.help') + '</button>';
  h += '<button class="footer-link">' + t('footer.shipping_info') + '</button>';
  h += '<button class="footer-link">' + t('footer.returns') + '</button>';
  h += '<button class="footer-link">' + t('footer.contact') + '</button>';
  h += '</div></div>';

  // Col 3: Account
  h += '<div><div class="footer-col-title">Account</div><div class="footer-links">';
  if (S.user) {
    h += '<button class="footer-link" onclick="render(\'my-orders\')">' + t('nav.orders') + '</button>';
    h += '<button class="footer-link" onclick="render(\'cart\')">' + t('nav.cart') + '</button>';
    h += '<button class="footer-link" onclick="logout()">' + t('nav.logout') + '</button>';
  } else {
    h += '<button class="footer-link" onclick="render(\'login\')">' + t('nav.login') + '</button>';
    h += '<button class="footer-link" onclick="render(\'register\')">' + t('nav.register') + '</button>';
    h += '<a class="footer-link" href="/seller-dashboard.html">Seller Login</a>';
  }
  h += '</div></div>';

  // Col 4: Payment / popular
  h += '<div><div class="footer-col-title">' + t('footer.payments') + '</div><div class="footer-links">';
  h += '<span class="footer-link" style="cursor:default">📱 ' + t('checkout.mobile_money') + '</span>';
  h += '<span class="footer-link" style="cursor:default">🏦 ' + t('checkout.bank') + '</span>';
  h += '<span class="footer-link" style="cursor:default">💵 ' + t('checkout.cod') + '</span>';
  h += '<span class="footer-link" style="cursor:default;opacity:.5">💳 Card (coming soon)</span>';
  h += '</div></div>';

  h += '</div>';

  // Bottom bar
  h += '<div class="footer-bot">';
  h += '<span>© ' + new Date().getFullYear() + ' AFRICARPARTS · ' + t('footer.rights') + '</span>';
  h += '<span style="opacity:.7">' + t('footer.countries') + '</span>';
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
    '<a class="ad-card bl" href="/seller-dashboard.html?tab=register" style="text-decoration:none">' +
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
  h += '<div class="pcard-price">' + fmt(p.price_usd) + '<small>incl. VAT</small></div>';
  h += '<div class="pcard-meta">';
  if (p.brand) h += '<span>' + esc(p.brand) + '</span>';
  if (p.model) h += '<span>' + esc(p.model) + '</span>';
  if (p.oem) h += '<span>OEM ' + esc(p.oem) + '</span>';
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
      apiReq('/products?limit=8', 'GET', null, false).catch(() => ({ data: [] })),
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
  h += '<div class="page-wrap mp-stack" style="margin-top:1rem">';

  // ----- 1. Search card -----
  h += '<div class="mp-search-card">';
  h += '<h2>Millions of parts. One simple search.</h2>';
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

  // ----- 5. Featured categories (small tiles) -----
  h += '<div class="mp-card">';
  h += '<div class="mp-card-hd"><div class="mp-card-title">Featured Categories</div></div>';
  h += '<div class="mp-scroller"><div class="mp-scroller-track">';

  var featCats = [
    {label:'Engine', sub:'Pistons · Belts · Pumps', q:'engine', tone:'blue', icon:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>'},
    {label:'Brakes', sub:'Pads · Discs · Calipers', q:'brake', tone:'amber', icon:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="3" x2="12" y2="6"/><line x1="18" y1="12" x2="21" y2="12"/>'},
    {label:'Suspension', sub:'Shocks · Springs · Arms', q:'suspension', tone:'green', icon:'<path d="M12 3v18M8 6h8M6 9l12 0M7 14l10 0M9 18l6 0"/>'},
    {label:'Filters', sub:'Oil · Air · Fuel · Cabin', q:'filter', tone:'violet', icon:'<rect x="6" y="3" width="12" height="18" rx="1"/><line x1="6" y1="8" x2="18" y2="8"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="6" y1="16" x2="18" y2="16"/>'},
    {label:'Lighting', sub:'Bulbs · LED · Xenon', q:'light', tone:'blue', icon:'<path d="M9 21h6M10 17h4M12 3a7 7 0 0 1 4 12.7c-.6.5-1 1.3-1 2.1V19h-6v-1.2c0-.8-.3-1.6-1-2.1A7 7 0 0 1 12 3z"/>'},
    {label:'Tyres', sub:'Summer · Winter · All-year', q:'tyre', tone:'amber', icon:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="3" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="21"/><line x1="3" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="21" y2="12"/>'},
    {label:'Electrics', sub:'Battery · Sensors · ECU', q:'battery', tone:'green', icon:'<rect x="6" y="6" width="16" height="11" rx="2"/><line x1="3" y1="11" x2="6" y2="11"/><line x1="10" y1="10" x2="10" y2="13"/><line x1="14" y1="10" x2="14" y2="13"/>'},
    {label:'Oils & Fluids', sub:'Engine · Brake · Coolant', q:'oil', tone:'violet', icon:'<path d="M12 3l5 6c2 2.5 2 6-1 8-2 1.5-6 1.5-8 0-3-2-3-5.5-1-8z"/>'}
  ];
  featCats.forEach(function (c) {
    h += '<div class="mp-cat-tile ' + c.tone + '" onclick="render(\'products\',{q:\'' + c.q + '\'})">';
    h += '<div class="cat-img"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + c.icon + '</svg></div>';
    h += '<div class="cat-label">' + esc(c.label) + '</div>';
    h += '<div class="cat-sub">' + esc(c.sub) + '</div>';
    h += '</div>';
  });
  h += '</div></div></div>';

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
  h += '<a href="/seller-dashboard.html?tab=register" style="text-decoration:none;color:inherit">';
  h += '<div class="mp-sell-promo">';
  h += '<div class="mp-sell-promo-body">';
  h += '<h3>How much are your parts worth?</h3>';
  h += '<p>Free listing, no commission until first sale — get your parts in front of buyers across Africa.</p>';
  h += '<div class="mp-sell-fields">';
  h += '<div><label>Brand</label><select onclick="event.preventDefault()"><option>Any</option><option>Bosch</option><option>Brembo</option><option>Mahle</option></select></div>';
  h += '<div><label>Category</label><select onclick="event.preventDefault()"><option>Any</option><option>Engine</option><option>Brakes</option><option>Body</option></select></div>';
  h += '</div>';
  h += '<button class="mp-sell-btn">Start selling →</button>';
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
  var nearTitles = { en: 'Shops nearby', de: 'Shops in deiner Nähe', fr: 'Boutiques à proximité', pt: 'Lojas próximas', sw: 'Maduka karibu nawe' };
  var inTitles = {
    en: 'Shops in ' + countryName, de: 'Shops in ' + countryName,
    fr: 'Boutiques · ' + countryName, pt: 'Lojas em ' + countryName, sw: 'Maduka · ' + countryName
  };
  var shopsTitle = (countryMatch && countryName)
    ? (inTitles[S.lang] || inTitles.en)
    : (nearTitles[S.lang] || nearTitles.en);

  h += '<div class="mp-card">';
  h += '<div class="mp-card-hd"><div class="mp-card-title">' + esc(shopsTitle) + '</div></div>';
  h += '<div class="mp-shops-grid">';
  h += '<div class="mp-shops-aside">';
  h += '<strong>Looking for a parts dealer near you?</strong>';
  h += '<p>In our <a onclick="render(\'shops\')">shop directory</a> you\'ll find verified sellers from across Africa.</p>';
  h += '</div>';
  h += '<div class="mp-shops-list">';
  if (shops.length) {
    shops.slice(0, 6).forEach(function (s) {
      var name = s.name || s.shop_name || 'Auto Shop';
      var loc = s.city || s.country || s.location || '';
      h += '<div class="mp-shop-item" onclick="render(\'shop\',{id:\'' + s.id + '\'})">';
      h += '<div class="mp-shop-logo">' + esc(name.charAt(0).toUpperCase()) + '</div>';
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
  h += '<div class="mp-card-hd"><div class="mp-card-title">Popular Parts Brands</div></div>';
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
  h += '<div class="mp-card-hd"><div class="mp-card-title">Popular Brands & more on our marketplace</div></div>';
  h += '<div class="mp-link-cols">';

  var linkCols = [
    {title:'Bosch Parts', items:['Bosch oil filter','Bosch spark plugs','Bosch wiper blades','Bosch starter','Bosch alternator']},
    {title:'Brembo Parts', items:['Brembo brake pads','Brembo discs','Brembo calipers','Brembo brake kit','Brembo sport']},
    {title:'Engine Parts', items:['Timing belt','Timing chain','Water pump','Piston rings','Cylinder head']},
    {title:'Brake Parts', items:['Front brake pads','Rear brake pads','Brake discs','Brake calipers','ABS sensor']},
    {title:'Filters', items:['Oil filter','Air filter','Fuel filter','Cabin filter','DPF filter']},
    {title:'Suspension', items:['Shock absorber','Coil spring','Control arm','Ball joint','Wheel bearing']},
    {title:'Body & Exterior', items:['Front bumper','Headlight','Tail light','Side mirror','Door handle']},
    {title:'Oils & Fluids', items:['5W-30 engine oil','5W-40 engine oil','DOT 4 brake fluid','Coolant G12','Power steering fluid']}
  ];
  linkCols.forEach(function (col) {
    h += '<div class="mp-link-col"><h5>' + esc(col.title) + '</h5><ul>';
    col.items.forEach(function (it) {
      h += '<li onclick="render(\'products\',{q:\'' + esc(it).replace(/\'/g, "") + '\'})">' + esc(it) + '</li>';
    });
    h += '</ul></div>';
  });
  h += '</div></div>';

  // ----- 13. SEO long-text -----
  h += '<div class="mp-card mp-seo">';
  h += '<h2 style="font-size:1.4rem;margin-bottom:.75rem;font-weight:800">Buy, sell or wholesale auto spare parts across Africa? AFRICARPARTS!</h2>';
  h += '<p>Discover everything auto on AFRICARPARTS — from <a>cars</a> over <a>motorcycles</a> and <a>e-bikes</a> to <a>trucks</a>, and easily get an overview of the whole mobility market. Thousands of new parts wait for you every day.</p>';
  h += '<h3 style="font-size:1.05rem;font-weight:800">AFRICARPARTS is Africa\'s largest auto-parts marketplace</h3>';
  h += '<p>On AFRICARPARTS you can easily buy or sell car parts. Find <a>used parts</a> or <a>new parts</a>, OEM or aftermarket. Whether <a>small car</a>, <a>SUV</a> or premium — we\'ve got the part you need.</p>';
  h += '<p>With AFRICARPARTS you can sell your <a>used auto parts</a> and contact new & used part dealers. Get informed about <a>brands & models</a>, financing, monthly rates, and also <a>wholesale offers</a> from verified suppliers. We also offer useful <a>guides, tests, advice</a>, news on <a>e-mobility</a> and more.</p>';
  h += '<p><strong>Tip:</strong> With a <strong>customer account</strong> you always stay up to date. Access your saved parts from any device, store your searches and receive the latest offers: <a>Register/Login</a></p>';
  h += '<p>AFRICARPARTS is also international: <a>GH</a> | <a>NG</a> | <a>KE</a> | <a>CD</a> | <a>SN</a> | <a>CI</a> | <a>ZA</a></p>';

  h += '<div class="mp-seo-cols">';
  h += '<div><h4>Want to buy used parts?</h4><p>Discover thousands of listings on AFRICARPARTS, compare them and contact sellers directly — whether professional dealers or private sellers. Find for example company surplus or refurbished parts. Also with parts warranty and quality seal.</p><a>Buy used parts</a></div>';
  h += '<div><h4>Want to buy new parts?</h4><p>Here you\'ll find a huge selection of new parts, usually with modern technology, comprehensive warranty and optimal compatibility — for a worry-free experience.</p><a>Buy new parts</a></div>';
  h += '<div><h4>Want to buy wholesale?</h4><p>Whether retail or wholesale, you\'ll find what you need. Search the wholesale offers from our verified suppliers.</p><a>Find wholesale offers</a></div>';
  h += '<div><h4>Want to sell parts?</h4><p>You can sell your used parts here for free. Simple and convenient. For maximum price per listing or fast express sale at an AFRICARPARTS purchase station.</p><a>Sell parts</a></div>';
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

  // Static car brands for the vehicle selector
  var CAR_BRANDS = [
    'Audi','BMW','Citroen','Fiat','Ford','Honda','Hyundai','Kia','Mazda','Mercedes-Benz',
    'Nissan','Opel','Peugeot','Renault','Seat','Skoda','Suzuki','Toyota','Volkswagen','Volvo'
  ];
  var CAR_MODELS = {
    'Toyota':   ['Corolla','Camry','RAV4','Hilux','Land Cruiser','Yaris','Avensis'],
    'BMW':      ['1 Series','3 Series','5 Series','7 Series','X1','X3','X5'],
    'Mercedes-Benz': ['A-Class','C-Class','E-Class','S-Class','GLA','GLC','GLE','Sprinter'],
    'Audi':     ['A3','A4','A5','A6','A7','A8','Q3','Q5','Q7'],
    'Volkswagen': ['Golf','Polo','Passat','Tiguan','Touareg','Caddy','T-Roc'],
    'Ford':     ['Fiesta','Focus','Mondeo','Kuga','Ranger','Transit'],
    'Hyundai':  ['i10','i20','i30','Tucson','Santa Fe','Kona'],
    'Kia':      ['Picanto','Rio','Ceed','Sportage','Sorento','Stonic'],
    'Nissan':   ['Micra','Note','Qashqai','Juke','X-Trail','Navara'],
    'Renault':  ['Clio','Megane','Captur','Kadjar','Trafic'],
    'Peugeot':  ['208','308','3008','5008','Partner','Boxer'],
    'Opel':     ['Corsa','Astra','Insignia','Mokka','Vivaro'],
    'Skoda':    ['Fabia','Octavia','Superb','Kodiaq','Karoq'],
    'Seat':     ['Ibiza','Leon','Ateca','Arona'],
    'Honda':    ['Civic','Jazz','CR-V','HR-V'],
    'Mazda':    ['2','3','6','CX-3','CX-5'],
    'Fiat':     ['500','Panda','Punto','Tipo','Doblo'],
    'Citroen':  ['C1','C3','C4','C5','Berlingo','Jumpy'],
    'Suzuki':   ['Swift','Vitara','Jimny','Baleno'],
    'Volvo':    ['XC40','XC60','XC90','S60','V60']
  };
  var ENGINE_TYPES = ['1.0 Petrol','1.2 Petrol','1.4 Petrol','1.6 Petrol','2.0 Petrol','1.5 Diesel','1.6 Diesel','2.0 Diesel','2.5 Diesel','3.0 Diesel','Hybrid','Electric'];

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

  h += '<button class="vs-search-btn" id="vsSearchBtn" onclick="vsApply()"' + (F.car_brand ? '' : ' disabled') + '>';
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
  window._vsState = { brand: F.car_brand, model: F.car_model, engine: F.engine };

  window.vsToggle = function (n) {
    var step = document.getElementById('vsStep' + n);
    if (!step || step.classList.contains('disabled')) return;
    // Close other open ones
    [1, 2, 3].forEach(function (i) {
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

  window.vsApply = function () {
    var st = window._vsState;
    if (!st.brand) return;
    var params = { car_brand: st.brand };
    if (st.model) params.car_model = st.model;
    if (st.engine) params.engine = st.engine;
    if (F.category_id) params.category_id = F.category_id;
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
    // Combine vehicle filter into q if present
    if (F.car_brand && !F.q) qs += '&q=' + encodeURIComponent(F.car_brand + (F.car_model ? ' ' + F.car_model : ''));

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

  // Mock UVP discount (since the marketplace doesn't have UVP data yet)
  var priceUsd = parseFloat(p.price_usd || 0);
  var hasDiscount = priceUsd > 5 && (p.id || '').toString().charCodeAt(0) % 3 === 0;
  var discountPct = hasDiscount ? (10 + ((p.id || '').toString().charCodeAt(0) % 15)) : 0;
  var oldPrice = hasDiscount ? (priceUsd / (1 - discountPct / 100)) : 0;

  // Stock state
  var stockQty = p.stock != null ? parseInt(p.stock) : 999;
  var stockClass = 'in', stockText = t('pp.in_stock');
  if (stockQty === 0) { stockClass = 'out'; stockText = t('pp.out_of_stock'); }
  else if (stockQty < 5) { stockClass = 'low'; stockText = t('pp.only_left').replace('{n}', stockQty); }

  // Rating (mock - average ~4 stars)
  var rating = p.rating || 4;
  var reviews = p.reviews_count || (40 + ((p.id || '').toString().length * 23) % 200);
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
  if (img) html += '<img src="' + esc(img) + '" alt="' + esc(p.title) + '" loading="lazy"/>';
  else html += '<span>' + t('pp.no_image') + '</span>';
  html += '</div></div>';

  // Middle col
  html += '<div class="pp-row-mid">';
  html += '<div class="pp-row-title"><span class="brand-prefix">' + esc(brand.toUpperCase()) + '</span>' + esc(p.title) + '</div>';
  if (p.model) html += '<div class="pp-row-subtitle">' + esc(p.model) + (p.year ? ', ' + esc(p.year) : '') + '</div>';

  html += '<div class="pp-row-meta">';
  if (p.oem) html += '<span class="pp-row-art">' + t('pp.article_num') + ' <strong>' + esc(p.oem) + '</strong></span>';
  html += '<span class="pp-row-stars">' + stars + '</span>';
  html += '<span class="pp-row-reviews">' + t('pp.reviews_word') + ' · ' + reviews + '</span>';
  html += '</div>';

  // Specs table
  html += '<div class="pp-row-specs">';
  html += '<span class="pp-spec-k">' + t('pp.spec_condition') + '</span><span class="pp-spec-v">' + esc(t('product.' + cond)) + '</span>';
  if (p.brand) html += '<span class="pp-spec-k">' + t('pp.spec_brand') + '</span><span class="pp-spec-v">' + esc(p.brand) + '</span>';
  if (p.model) html += '<span class="pp-spec-k">' + t('pp.spec_model') + '</span><span class="pp-spec-v">' + esc(p.model) + '</span>';
  if (p.year) html += '<span class="pp-spec-k">' + t('pp.spec_year') + '</span><span class="pp-spec-v">' + esc(p.year) + '</span>';
  if (p.oem) html += '<span class="pp-spec-k">' + t('pp.spec_oem') + '</span><span class="pp-spec-v">' + esc(p.oem) + '</span>';
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
  // Price
  var priceStr = formatted;
  // Try to split currency / decimal for fancy display
  var m = priceStr.match(/^([A-Z]{3})\s*([\d.,]+)$/);
  if (m) {
    var num = m[2];
    var dot = num.lastIndexOf('.');
    var intPart = dot > -1 ? num.substring(0, dot) : num;
    var decPart = dot > -1 ? num.substring(dot) : '';
    html += '<div class="pp-price">' + intPart + '<span class="cents">' + decPart + '</span><span class="currency">' + m[1] + '</span></div>';
  } else {
    html += '<div class="pp-price">' + priceStr + '</div>';
  }
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

    h += '<div class="dactions">';
    h += '<button class="btn btn-primary" onclick="detailAdd(\'' + p.id + '\')">+ ' + t('product.add_cart') + '</button>';
    if (p.shop_id) {
      h += '<button class="btn btn-ghost" onclick="render(\'shop\',{id:\'' + p.shop_id + '\'})">' + t('product.view_shop') + '</button>';
    }
    h += '</div>';
    h += '</div>';

    h += '</div></div>';

    $('content').innerHTML = h;

    window.__currentProduct = p;

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

window.detailAdd = function () {
  if (window.__currentProduct) {
    cadd(window.__currentProduct);
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
    h += '<div class="shop-header"><h1>' + esc(shop.name || '') + '</h1>';
    h += '<div class="shop-meta">';
    if (shop.city) h += '<span>' + esc(shop.city) + '</span>';
    if (shop.country) h += '<span class="loc">' + esc(shop.country) + '</span>';
    if (shop.is_china_seller) h += '<span class="badge badge-china">' + t('shop.china') + '</span>';
    h += '</div>';
    if (shop.pending) h += '<div class="alert alert-info">' + t('shop.pending') + '</div>';
    h += '</div>';
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
    h += '<div class="cart-list">';
    items.forEach(function (i) {
      h += '<div class="cart-row">';
      h += '<div class="cart-main"><div class="cart-title">' + esc(i.title) + '</div>';
      h += '<div class="cart-meta">';
      if (i.brand) h += '<span>' + esc(i.brand) + '</span>';
      if (i.location) h += '<span class="loc">' + esc(i.location) + '</span>';
      h += '</div></div>';
      h += '<div class="cart-qty"><input type="number" min="1" value="' + i.qty +
           '" onchange="cupd(\'' + i.id + '\',parseInt(this.value)||1);render(\'cart\')"/></div>';
      h += '<div class="cart-price">' + fmt(i.price_usd) + '</div>';
      h += '<button class="btn btn-ghost btn-sm" onclick="crem(\'' + i.id + '\');render(\'cart\')">X</button>';
      h += '</div>';
    });
    h += '</div>';

    h += '<div class="cart-summary">';
    h += '<div>' + t('cart.subtotal') + ': <strong>' + fmt(total) + '</strong></div>';
    h += '<div style="margin-top:.5rem;display:flex;flex-wrap:wrap;gap:.5rem">';
    h += '<button class="btn btn-primary" onclick="render(\'checkout\')">' + t('cart.checkout') + '</button>';
    h += '<button class="btn btn-ghost" onclick="render(\'products\')">' + t('cart.continue') + '</button>';
    h += '<button class="btn btn-ghost" onclick="S.cart=[];csave();buildNav();render(\'cart\')">' + t('cart.clear') + '</button>';
    h += '</div></div>';
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

  let h = '<div class="page-wrap"><div class="checkout-grid">';
  h += '<section><div class="sec-hd"><div class="sec-title">' + t('checkout.title') + '</div></div>';
  h += '<div class="co-form">';
  h += '<h3>' + t('checkout.address') + '</h3>';
  h += '<div class="fg"><label>' + t('checkout.name') + '</label><input id="coName" value="' + esc(S.user && S.user.name || '') + '"/></div>';
  h += '<div class="fg"><label>' + t('checkout.phone') + '</label><input id="coPhone" value="' + esc(S.user && S.user.phone || '') + '"/></div>';
  h += '<div class="fg"><label>' + t('checkout.city') + '</label><input id="coCity"/></div>';
  h += '<div class="fg"><label>' + t('checkout.country') + '</label><input id="coCountry" value="' + esc(S.user && S.user.country || '') + '"/></div>';
  h += '<div class="fg"><label>' + t('checkout.addr') + '</label><textarea id="coAddr"></textarea></div>';

  h += '<h3 style="margin-top:1rem">' + t('checkout.shipping') + '</h3>';
  h += '<div class="fg"><select id="coShip"><option value="">-- ' + t('checkout.shipping') + ' --</option>';
  h += '<option value="local">Local / Bus</option>';
  h += '<option value="courier">Courier / Motorbike</option>';
  h += '<option value="dhl">DHL / Air</option>';
  h += '</select></div>';

  h += '<h3 style="margin-top:1rem">' + t('checkout.payment') + '</h3>';
  h += '<div class="fg"><select id="coPay">';
  h += '<option value="mobile">' + t('checkout.mobile_money') + '</option>';
  h += '<option value="bank">' + t('checkout.bank') + '</option>';
  h += '<option value="cod">' + t('checkout.cod') + '</option>';
  h += '</select></div>';

  h += '<button class="btn btn-primary" style="margin-top:1rem" onclick="placeOrder()">' + t('checkout.place_order') + '</button>';
  h += '</div></section>';

  h += '<aside class="co-sticky"><h3>' + t('checkout.items') + '</h3><ul class="co-items">';
  S.cart.forEach(function (i) {
    h += '<li><span>' + esc(i.title) + '</span><span>' + i.qty + ' x ' + fmt(i.price_usd) + '</span></li>';
  });
  h += '</ul><div style="margin-top:1rem;font-weight:700;color:var(--p700)">';
  h += t('cart.subtotal') + ': ' + fmt(ctot()) + '</div></aside>';
  h += '</div></div>';

  $('content').innerHTML = h;

  window.placeOrder = async function () {
    const name = $('coName') && $('coName').value.trim();
    const phone = $('coPhone') && $('coPhone').value.trim();
    const city = $('coCity') && $('coCity').value.trim();
    const country = $('coCountry') && $('coCountry').value.trim();
    const addr = $('coAddr') && $('coAddr').value.trim();
    const ship = $('coShip') && $('coShip').value;
    const pay = $('coPay') && $('coPay').value;

    if (!name || !phone || !city || !country || !addr || !ship) {
      toast(t('checkout.select_ship'), 't-error');
      return;
    }
    try {
      await apiReq('/orders', 'POST', {
        items: S.cart, shipping: ship, payment: pay,
        address: { name: name, phone: phone, city: city, country: country, addr: addr },
        user: S.user
      }, false);
      S.cart = [];
      csave();
      buildNav();
      toast(t('checkout.success'));
      render('home');
    } catch (e) {
      toast(e.message || 'Error', 't-error');
    }
  };
});

/* ---------- ROUTE: LOGIN ---------- */
route('login', async function () {
  $('content').innerHTML =
    '<div class="page-wrap"><section class="section auth-section">' +
    '<div class="sec-hd"><div class="sec-title">' + t('nav.login') + '</div></div>' +
    '<div class="auth-form">' +
    '<div class="fg"><label>' + t('auth.email') + '</label><input id="lgEmail" type="email"/></div>' +
    '<div class="fg"><label>' + t('auth.password') + '</label><input id="lgPass" type="password"/></div>' +
    '<button class="btn btn-primary" onclick="doLogin()">' + t('auth.login_btn') + '</button>' +
    '<p style="margin-top:.75rem;font-size:.85rem">' + t('auth.no_account') +
    ' <a href="javascript:void(0)" onclick="render(\'register\')">' + t('auth.register_btn') + '</a></p>' +
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
      render('home');
    } catch (e) {
      toast(e.message || 'Error', 't-error');
    }
  };
});

/* ---------- ROUTE: REGISTER ---------- */
route('register', async function () {
  $('content').innerHTML =
    '<div class="page-wrap"><section class="section auth-section">' +
    '<div class="sec-hd"><div class="sec-title">' + t('nav.register') + '</div></div>' +
    '<div class="auth-form">' +
    '<div class="fg"><label>' + t('auth.name') + '</label><input id="rgName"/></div>' +
    '<div class="fg"><label>' + t('auth.email') + '</label><input id="rgEmail" type="email"/></div>' +
    '<div class="fg"><label>' + t('auth.phone') + '</label><input id="rgPhone"/></div>' +
    '<div class="fg"><label>' + t('auth.country') + '</label><input id="rgCountry"/></div>' +
    '<div class="fg"><label>' + t('auth.password') + '</label><input id="rgPass" type="password"/></div>' +
    '<div class="fg"><label>' + t('auth.confirm') + '</label><input id="rgPass2" type="password"/></div>' +
    '<div class="fg"><label>' + t('auth.role') + '</label><select id="rgRole">' +
    '<option value="buyer">' + t('auth.buyer') + '</option>' +
    '<option value="seller">' + t('auth.seller') + '</option>' +
    '</select></div>' +
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
    const role = $('rgRole') && $('rgRole').value;

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

/* ---------- ROUTE: MY ORDERS ---------- */
route('my-orders', async function () {
  if (!S.user) { render('login'); return; }
  let orders = [];
  try {
    const res = await apiReq('/orders', 'GET', null, false);
    const all = res.data || [];
    orders = all.filter(function (o) {
      return o.user && S.user && String(o.user.id || '') === String(S.user.id);
    });
  } catch (e) {}

  let h = '<div class="page-wrap"><section class="section">';
  h += '<div class="sec-hd"><div class="sec-title">' + t('orders.title') + '</div></div>';

  if (orders.length) {
    h += '<div class="table">';
    h += '<div class="trow" style="font-weight:700;background:var(--surface2)">';
    h += '<div>' + t('orders.number') + '</div>';
    h += '<div>' + t('orders.date') + '</div>';
    h += '<div>' + t('orders.status') + '</div>';
    h += '<div>' + t('orders.total') + '</div>';
    h += '</div>';
    orders.forEach(function (o) {
      const total = (o.items || []).reduce(function (s, i) {
        return s + parseFloat(i.price_usd || 0) * (i.qty || 1);
      }, 0);
      h += '<div class="trow">';
      h += '<div>#' + esc(o.id) + '</div>';
      h += '<div>' + (o.created_at ? new Date(o.created_at).toLocaleString() : '') + '</div>';
      h += '<div>' + esc(o.status || '') + '</div>';
      h += '<div>' + fmt(total) + '</div>';
      h += '</div>';
    });
    h += '</div>';
  } else {
    h += '<div class="empty-state"><div class="empty-icon">[~]</div><h3>' + t('orders.no_orders') + '</h3></div>';
  }
  h += '</section></div>';

  $('content').innerHTML = h;
});

/* ---------- ROUTE: SELLER DASHBOARD ---------- */
/* ---------- ROUTE: SELLER DASHBOARD (Hub) ---------- */
route('seller-dashboard', async function () {
  if (!S.user || (S.user.role !== 'seller' && S.user.role !== 'dealer')) { render('login'); return; }

  // KPI-Quick-Stats: Anzahl Produkte (mehr KPIs kommen mit Performance-Modul)
  let productCount = 0;
  try {
    const res = await apiReq('/products?limit=200', 'GET', null, false);
    const all = res.data || res.products || [];
    productCount = all.filter(function (p) {
      return String(p.seller_id || p.user_id || '') === String(S.user.id);
    }).length;
  } catch (e) {}

  // Module-Definitionen — neue Module hier auf active:true setzen,
  // sobald die zugehörige Route gebaut ist.
  const modules = [
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
      target: null,
      active: false,
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
      icon: '🏬',
      title: ({ de: 'Mein Shop', en: 'My Shop', fr: 'Ma boutique', pt: 'A minha loja', sw: 'Duka langu' }[S.lang] || 'My Shop'),
      desc: ({ de: 'Shop anlegen/bearbeiten – Name, Land, Stadt, Kontakt', en: 'Create/edit your shop – name, country, city, contact', fr: 'Créer/modifier la boutique – nom, pays, ville, contact', pt: 'Criar/editar a loja – nome, país, cidade, contacto', sw: 'Tengeneza/hariri duka – jina, nchi, mji, mawasiliano' }[S.lang] || 'Create/edit your shop'),
      target: 'seller-shop',
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
});

/* ---------- ROUTE: SELLER SHOP (Mein Shop) ---------- */
route('seller-shop', async function () {
  if (!S.user || (S.user.role !== 'seller' && S.user.role !== 'dealer' && S.user.role !== 'admin')) { render('login'); return; }

  var MAP = {
    de: { title: 'Mein Shop', sub: 'Lege deinen Shop an oder bearbeite ihn. Danach erscheint er im Shop-Verzeichnis und unter „Shops in deiner Nähe".', name: 'Shop-Name', country: 'Land', city: 'Stadt', phone: 'Telefon', email: 'E-Mail', desc: 'Kurzbeschreibung', choose: '– Land wählen –', save: 'Speichern', saved: 'Shop gespeichert ✓', back: '< Zurück zum Dashboard', req: 'Bitte einen Shop-Namen eingeben.', live: 'Dein Shop ist live und sichtbar.' },
    en: { title: 'My Shop', sub: 'Create or edit your shop. It then appears in the directory and under “Shops nearby”.', name: 'Shop name', country: 'Country', city: 'City', phone: 'Phone', email: 'Email', desc: 'Short description', choose: '– Select country –', save: 'Save', saved: 'Shop saved ✓', back: '< Back to dashboard', req: 'Please enter a shop name.', live: 'Your shop is live and visible.' },
    fr: { title: 'Ma boutique', sub: 'Créez ou modifiez votre boutique. Elle apparaît ensuite dans l’annuaire et sous « Boutiques à proximité ».', name: 'Nom de la boutique', country: 'Pays', city: 'Ville', phone: 'Téléphone', email: 'E-mail', desc: 'Brève description', choose: '– Choisir le pays –', save: 'Enregistrer', saved: 'Boutique enregistrée ✓', back: '< Retour au tableau de bord', req: 'Veuillez saisir un nom de boutique.', live: 'Votre boutique est en ligne.' },
    pt: { title: 'A minha loja', sub: 'Crie ou edite a sua loja. Depois aparece no diretório e em “Lojas próximas”.', name: 'Nome da loja', country: 'País', city: 'Cidade', phone: 'Telefone', email: 'E-mail', desc: 'Breve descrição', choose: '– Selecionar país –', save: 'Guardar', saved: 'Loja guardada ✓', back: '< Voltar ao painel', req: 'Introduza um nome de loja.', live: 'A sua loja está online.' },
    sw: { title: 'Duka langu', sub: 'Tengeneza au hariri duka lako. Litaonekana kwenye orodha na chini ya “Maduka karibu nawe”.', name: 'Jina la duka', country: 'Nchi', city: 'Mji', phone: 'Simu', email: 'Barua pepe', desc: 'Maelezo mafupi', choose: '– Chagua nchi –', save: 'Hifadhi', saved: 'Duka limehifadhiwa ✓', back: '< Rudi kwenye dashibodi', req: 'Tafadhali weka jina la duka.', live: 'Duka lako liko hewani.' }
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
  h += '<div class="auth-form" style="max-width:560px">';
  h += '<div class="fg"><label>' + esc(LBL.name) + ' *</label><input id="shName"/></div>';
  h += '<div class="fg"><label>' + esc(LBL.country) + '</label><select id="shCountry">' + optsHtml + '</select></div>';
  h += '<div class="fg"><label>' + esc(LBL.city) + '</label><input id="shCity"/></div>';
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
    if ($('shPhone')) $('shPhone').value = existing.phone || '';
    if ($('shEmail')) $('shEmail').value = existing.email || '';
    if ($('shDesc')) $('shDesc').value = descVal || '';
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
      description: $('shDesc') ? $('shDesc').value.trim() : ''
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
  if (!S.user || (S.user.role !== 'seller' && S.user.role !== 'dealer')) { render('login'); return; }

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

    let h = '<div class="table">';
    h += '<div class="trow" style="font-weight:700;background:var(--surface2)">';
    h += '<div>' + esc(t('seller_prod.col_image')) + '</div><div>' + esc(t('seller_prod.col_title')) + '</div><div>' + esc(t('seller_prod.col_brand')) + '</div><div>' + esc(t('seller_prod.col_price')) + '</div><div>' + esc(t('seller_prod.col_stock')) + '</div><div>' + esc(t('seller_prod.col_actions')) + '</div>';
    h += '</div>';
    products.forEach(function (p) {
      let imgs = p.images_array || [];
      if (!imgs.length && p.images) {
        if (Array.isArray(p.images)) imgs = p.images;
        else if (typeof p.images === 'string') { try { imgs = JSON.parse(p.images); } catch (e) { imgs = []; } }
      }
      const img = imgs[0];
      h += '<div class="trow">';
      h += '<div>' + (img ? '<img src="' + esc(img) + '" style="width:60px;height:60px;object-fit:cover;border-radius:4px" onerror="this.style.opacity=.3"/>' : '—') + '</div>';
      h += '<div>' + esc(p.title || '—') + '</div>';
      h += '<div>' + esc(p.brand || '—') + '</div>';
      h += '<div>' + fmt(p.price_usd) + '</div>';
      h += '<div>' + (p.stock != null ? p.stock : '—') + '</div>';
      h += '<div style="display:flex;gap:.4rem;flex-wrap:wrap">';
      h += '<button class="btn btn-ghost btn-sm" onclick="spEdit(\'' + p.id + '\')">✏️ ' + esc(t('seller_prod.btn_edit')) + '</button>';
      h += '<button class="btn btn-ghost btn-sm" style="color:#c33" onclick="spDelete(\'' + p.id + '\')">🗑️ ' + esc(t('seller_prod.btn_delete')) + '</button>';
      h += '</div></div>';
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
    const brand = v('brand', '');
    const model = v('model', '');
    const oem = v('oem', '');
    const condition = v('condition', 'new');
    const cat = v('category_id', '');
    const tagsArr = Array.isArray(v('tags', [])) ? v('tags', []) : [];
    const tags = tagsArr.length ? tagsArr.join(', ') : (typeof v('tags', '') === 'string' ? v('tags', '') : '');
    const active = product ? !!product.active : true;

    let h = '<details id="sp-form" style="margin-bottom:1.5rem;padding:1rem;background:var(--surface2);border-radius:8px"' + (product ? ' open' : '') + '>';
    h += '<summary style="cursor:pointer;font-weight:700">' + (product ? '✏️ ' + esc(t('seller_prod.summary_edit')) : esc(t('seller_prod.summary_new'))) + '</summary>';
    h += '<div style="display:grid;gap:.6rem;max-width:720px;margin-top:1rem">';

    h += '<div class="fg"><label>' + esc(t('seller_prod.f_title')) + '</label><input id="spTitle" maxlength="200" value="' + esc(title) + '" placeholder="' + esc(t('seller_prod.ph_title')) + '"/></div>';
    h += '<div class="fg"><label>' + esc(t('seller_prod.f_desc')) + '</label><textarea id="spDesc" rows="3" placeholder="' + esc(t('seller_prod.ph_desc')) + '">' + esc(desc) + '</textarea></div>';

    h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem">';
    h += '<div class="fg"><label>' + esc(t('seller_prod.f_price')) + '</label><input id="spPrice" type="number" step="0.01" min="0" value="' + esc(price) + '"/></div>';
    h += '<div class="fg"><label>' + esc(t('seller_prod.f_stock')) + '</label><input id="spStock" type="number" min="0" value="' + esc(stock) + '"/></div>';
    h += '</div>';

    h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem">';
    h += '<div class="fg"><label>' + esc(t('seller_prod.f_brand')) + '</label><input id="spBrand" maxlength="100" value="' + esc(brand) + '" placeholder="' + esc(t('seller_prod.ph_brand')) + '"/></div>';
    h += '<div class="fg"><label>' + esc(t('seller_prod.f_model')) + '</label><input id="spModel" maxlength="100" value="' + esc(model) + '" placeholder="' + esc(t('seller_prod.ph_model')) + '"/></div>';
    h += '</div>';

    h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem">';
    h += '<div class="fg"><label>' + esc(t('seller_prod.f_oem')) + '</label><input id="spOem" maxlength="100" value="' + esc(oem) + '" placeholder="' + esc(t('seller_prod.ph_oem')) + '"/></div>';
    h += '<div class="fg"><label>' + esc(t('seller_prod.f_condition')) + '</label><select id="spCondition">';
    [['new', t('seller_prod.cond_new')], ['used', t('seller_prod.cond_used')], ['refurbished', t('seller_prod.cond_ref')]].forEach(function (pair) {
      h += '<option value="' + pair[0] + '"' + (condition === pair[0] ? ' selected' : '') + '>' + esc(pair[1]) + '</option>';
    });
    h += '</select></div>';
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

    h += '<div style="display:flex;gap:.5rem;margin-top:.75rem;flex-wrap:wrap;align-items:center">';
    h += '<button type="button" class="btn btn-primary" onclick="spSave()">' + (product ? '💾 ' + esc(t('seller_prod.btn_update')) : '✚ ' + esc(t('seller_prod.btn_create'))) + '</button>';
    if (product) h += '<button type="button" class="btn btn-ghost" onclick="spCancelEdit()">' + esc(t('seller_prod.btn_cancel')) + '</button>';
    h += '<div id="spStatus" style="margin-left:auto;font-size:.85rem;opacity:.8"></div>';
    h += '</div>';

    h += '</div></details>';
    $('sp-form-slot').innerHTML = h;
    renderImagePreview();
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

  window.spSave = async function () {
    const title = ($('spTitle').value || '').trim();
    const desc = ($('spDesc').value || '').trim();
    const price = parseFloat($('spPrice').value);
    const stock = parseInt($('spStock').value, 10) || 0;
    const brand = ($('spBrand').value || '').trim();
    const model = ($('spModel').value || '').trim();
    const oem = ($('spOem').value || '').trim();
    const condition = $('spCondition').value;
    const cat = $('spCategory').value;
    const tagsRaw = ($('spTags').value || '').trim();
    const tags = tagsRaw ? tagsRaw.split(',').map(function (x) { return x.trim(); }).filter(Boolean) : [];
    const active = $('spActive').checked;

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
      brand: brand || null,
      model: model || null,
      oem: oem || null,
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
      if (editingId) {
        await apiReq('/seller/products/' + editingId, 'PUT', payload, true);
        toast('✓ ' + t('seller_prod.t_updated'));
      } else {
        await apiReq('/seller/products', 'POST', payload, true);
        toast('✓ ' + t('seller_prod.t_created'));
      }
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

  renderForm(null);
  await loadProducts();
});

/* ---------- ROUTE: CSV IMPORT ---------- */
route('csv-import', async function () {
  if (!S.user || (S.user.role !== 'seller' && S.user.role !== 'dealer')) { render('login'); return; }

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
      target: null,
      active: false
    },
    {
      icon: '🛒',
      title: t('admin_hub.mod_orders_t'),
      desc: t('admin_hub.mod_orders_d'),
      target: null,
      active: false
    },
    {
      icon: '🏪',
      title: t('admin_hub.mod_shops_t'),
      desc: t('admin_hub.mod_shops_d'),
      target: null,
      active: false
    },
    {
      icon: '👥',
      title: t('admin_hub.mod_users_t'),
      desc: t('admin_hub.mod_users_d'),
      target: null,
      active: false
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

  // Upload-Helper: schickt Datei via /api/upload/images mit folder=banners → R2
  async function uploadBannerImage(file) {
    if (!file) return null;
    if (!/^image\/(jpe?g|png|webp)$/i.test(file.type)) {
      throw new Error('Nur JPG, PNG oder WebP erlaubt');
    }
    if (file.size > 2 * 1024 * 1024) {
      throw new Error('Bild zu groß (max 2 MB)');
    }
    const fd = new FormData();
    fd.append('images', file);
    fd.append('folder', 'banners');
    const headers = {};
    const tok = (S && (S.token || S.jwt)) || (function(){ try { return localStorage.getItem('token') || localStorage.getItem('jwt') || ''; } catch(e) { return ''; } })();
    if (tok) headers['Authorization'] = 'Bearer ' + tok;
    const res = await fetch('/api/upload/images', { method: 'POST', headers: headers, body: fd });
    const data = await res.json().catch(function () { return {}; });
    if (!res.ok) throw new Error(data.message || data.error || 'Upload fehlgeschlagen (HTTP ' + res.status + ')');
    const urls = data.urls || (data.data && data.data.urls) || [];
    if (!urls.length) throw new Error('Keine URL vom Server erhalten');
    return urls[0];
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
  h += '<input id="bnImgFile" type="file" accept="image/jpeg,image/png,image/webp" style="display:none" onchange="bUploadNew(this)"/>';
  h += '<button type="button" class="btn btn-ghost btn-sm" onclick="document.getElementById(\'bnImgFile\').click()">📤 Hochladen</button>';
  h += '</div>';
  h += '<small style="opacity:.7">Max 2 MB, JPG/PNG/WebP. Wird auf Cloudflare R2 unter <code>banners/</code> gespeichert.</small>';
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
    $('bnPreview').innerHTML = url
      ? '<img src="' + esc(url) + '" style="max-width:240px;max-height:120px;border-radius:6px;border:1px solid var(--border)" onerror="this.style.opacity=.3"/>'
      : '';
  });

  // Upload-Button im Neuer-Banner-Formular
  window.bUploadNew = async function (input) {
    const file = input.files && input.files[0];
    if (!file) return;
    $('bnPreview').innerHTML = '<div class="spinner" style="width:24px;height:24px"></div>';
    try {
      const url = await uploadBannerImage(file);
      $('bnImg').value = url;
      $('bnPreview').innerHTML = '<img src="' + esc(url) + '" style="max-width:240px;max-height:120px;border-radius:6px;border:1px solid var(--border)"/>';
      toast('Bild hochgeladen');
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
      input.accept = 'image/jpeg,image/png,image/webp';
      input.style.display = 'none';
      document.body.appendChild(input);
    }
    input.onchange = async function () {
      const file = input.files && input.files[0];
      input.value = '';
      if (!file) return;
      toast('Lade Bild hoch …');
      try {
        const url = await uploadBannerImage(file);
        await apiReq('/admin/banners/' + id, 'PUT', { image_url: url }, true);
        toast('Bild ersetzt');
        loadList();
      } catch (e) {
        toast(e.message, 't-error');
      }
    };
    input.click();
  };

  window.bCreate = async function () {
    const payload = {
      title:      $('bnTitle').value.trim(),
      image_url:  $('bnImg').value.trim(),
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

/* ---------- INIT + SPA ROUTING ---------- */
setDir(S.lang);
updateMeta();

// Browser Back/Forward → re-render
window.addEventListener('popstate', function (e) {
  if (e.state && e.state.name) {
    render(e.state.name, e.state.params || {}, true);
  } else {
    render('home', {}, true);
  }
});

// Beim Laden: aus URL-Hash die richtige Route ermitteln
function _initRouteFromHash() {
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
  // Build the DOM lazily — only once
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
    document.body.appendChild(ov);
  }

  // Show overlay & block body scroll
  document.getElementById('pkw-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';

  // Lazy-load tree (cache for 5 min)
  if (!window._pkwTree || (Date.now() - (window._pkwTreeFetched || 0)) > 300000) {
    try {
      var resp = await apiReq('/categories/tree?lang=' + S.lang, 'GET', null, false);
      window._pkwTree = (resp && resp.tree) ? resp.tree : (Array.isArray(resp) ? resp : []);
      window._pkwTreeFetched = Date.now();
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

async function mountHomeDynamic() {
  // Fire all requests in parallel
  const [hero, partner, sleft, sright, seoTop, seoBot] = await Promise.all([
    apiReq('/banners?placement=hero',       'GET', null, false).catch(() => ({ data: [] })),
    apiReq('/banners?placement=partner',    'GET', null, false).catch(() => ({ data: [] })),
    apiReq('/banners?placement=side_left',  'GET', null, false).catch(() => ({ data: [] })),
    apiReq('/banners?placement=side_right', 'GET', null, false).catch(() => ({ data: [] })),
    apiReq('/seo-texts?placement=home_top&lang='    + S.lang, 'GET', null, false).catch(() => ({ data: [] })),
    apiReq('/seo-texts?placement=home_bottom&lang=' + S.lang, 'GET', null, false).catch(() => ({ data: [] })),
  ]);

  renderHeroBanners(hero.data || []);
  renderPartnerSlot(partner.data || []);
  renderSideBanner('side-banner-left-mount', sleft.data || []);
  renderSideBanner('side-banner-right-mount', sright.data || []);
  renderSeoBlocks('seo-top-mount',    seoTop.data || []);
  renderSeoBlocks('seo-bottom-mount', seoBot.data || []);
}

function renderHeroBanners(banners) {
  const mount = document.getElementById('hero-banner-mount');
  if (!mount) return;
  if (!banners.length) { mount.innerHTML = ''; return; }

  let html = '';
  banners.forEach(function(b, i) {
    const safeImg = String(b.image_url).replace(/'/g, '%27');
    html += '<div class="hero-slide-bg' + (i === 0 ? ' is-active' : '') + '" style="background-image:url(\'' + safeImg + '\')" aria-hidden="true"></div>';
  });
  html += '<div class="hero-bg-overlay"></div>';
  if (banners.length > 1) {
    html += '<div class="hero-dots">';
    banners.forEach(function(_, i) {
      html += '<button class="hero-dot' + (i === 0 ? ' is-active' : '') + '" data-i="' + i + '" aria-label="Banner ' + (i + 1) + '"></button>';
    });
    html += '</div>';
  }
  mount.innerHTML = html;
  startBannerRotation('.hero', '.hero-slide-bg', '.hero-dot', 6000);
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


_initRouteFromHash();
