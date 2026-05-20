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
    nav: { parts: "Parts", shops: "Shops", china: "China Wholesale",
      login: "Sign In", register: "Register", logout: "Sign Out",
      dashboard: "Dashboard", admin: "Admin Panel", orders: "My Orders",
      cart: "Cart", language: "Language", currency: "Currency" },
    home: {
      hero_badge: "Africa's #1 Auto Parts Marketplace",
      hero_title: "Find Any Car Part -", hero_title_em: "Fast & Reliable",
      hero_sub: "New, used & wholesale spare parts - Verified sellers - Mobile Money payments",
      search_ph: "Part name, OEM number, brand, model...",
      search_btn: "Search Parts",
      stats_parts: "Parts Listed", stats_sellers: "Verified Sellers",
      stats_countries: "Countries", stats_langs: "Languages",
      featured: "Featured Parts", featured_sub: "Recently listed",
      view_all: "View all", categories: "Browse by Category",
      china_title: "China Wholesale Direct",
      china_sub: "Factory prices - Ships to all Africa",
      why_title: "Why AFRICARPARTS?",
      vc_cat_btn: "All Categories", vc_tree: [{"l":"Engine & Drivetrain","subs":[{"g":"Engine Block & Components","items":["Crankcase","Cylinder Head","Valve Cover","Oil Sump","Pistons","Piston Rings","Camshaft","Crankshaft"]},{"g":"Timing","items":["Timing Belt","Timing Chain","Chain Tensioner","Idler Pulley","Timing Belt Kit","Timing Chain Kit"]},{"g":"Fuel System","items":["Fuel Injectors","Fuel Pump","High-Pressure Pump","Fuel Filter","Fuel Rail","Pressure Regulator","Fuel Pressure Sensor"]},{"g":"Air Intake","items":["Air Filter","Intake Manifold","Intercooler","Turbocharger","Throttle Body","MAF Sensor","Intake Hose"]},{"g":"Cooling System","items":["Radiator","Thermostat","Water Pump","Expansion Tank","Coolant Hose","Cooling Fan","Viscous Coupling","Coolant Temp Sensor"]},{"g":"Lubrication System","items":["Oil Filter","Oil Pump","Oil Pressure Sensor","Crankcase Breather","Oil Cooler","Oil Dipstick"]},{"g":"Clutch & Gearbox","items":["Clutch Kit","Dual-Mass Flywheel","Gearbox Bearing","Driveshaft","CV Joint","Release Bearing","Gear Linkage","Gearbox Oil Seal"]}]},{"l":"Brakes","subs":[{"g":"Brake Pads","items":["Front Brake Pads","Rear Brake Pads","Sport Brake Pads","Brake Pad Set with Sensor"]},{"g":"Brake Discs","items":["Vented Discs","Solid Discs","Drilled Discs","Sport Discs","Brake Disc Set"]},{"g":"Brake Calipers","items":["Front Caliper","Rear Caliper","Brake Shoes","Wheel Cylinder","Caliper Repair Kit"]},{"g":"ABS / ESP Sensors","items":["ABS Sensor","Wheel Speed Sensor","ABS Control Unit","ABS Pump","ESP Sensor"]},{"g":"Brake Lines","items":["Brake Hoses","Brake Pipes","Distribution Block","Brake Line Set","Brake Fluid Reservoir"]},{"g":"Parking Brake","items":["Handbrake Cable","Handbrake Lever","EPB Motor","Rear Brake Shoes","Brake Drum"]}]},{"l":"Suspension & Steering","subs":[{"g":"Shock Absorbers & Springs","items":["Front Shock Absorbers","Rear Shock Absorbers","Coil Springs","Top Mount","Bump Stop","Dust Cover","Coilover Kit","Air Suspension"]},{"g":"Steering","items":["Track Rod End","Tie Rod","Track Rod","Steering Rack","Power Steering Pump","Steering Boot","Steering Column","Steering Angle Sensor"]},{"g":"Axle Parts","items":["Control Arm","Ball Joint","Stabiliser Bar Bush","Anti-Roll Bar","Drop Link","Stub Axle","Subframe","Rubber Bush"]},{"g":"Wheel Bearings","items":["Front Wheel Bearing","Rear Wheel Bearing","Wheel Hub","Wheel Bearing Kit","Hub Bolt"]}]},{"l":"Electrics & Sensors","subs":[{"g":"Battery & Charging","items":["Car Battery","Alternator","Starter Motor","Voltage Regulator","Charging Cable","Battery Terminal","Battery Sensor"]},{"g":"Lighting","items":["Headlight","Rear Light","Indicator","Fog Light","Daytime Running Light","LED Module","Bulbs","Headlight Washer"]},{"g":"Sensors","items":["MAF Sensor","MAP Sensor","Lambda Sensor","Crankshaft Sensor","Camshaft Sensor","NOx Sensor","Exhaust Temp Sensor","Knock Sensor"]},{"g":"Control Units","items":["Engine ECU","ABS Control Unit","Body Control Module","Airbag Module","Transmission Control Unit"]},{"g":"Switches & Controls","items":["Window Switch","Indicator Stalk","Ignition Switch","Horn","Mirror Switch","Central Locking Module"]}]},{"l":"Filters","subs":[{"g":"Air Filters","items":["Petrol Engine Air Filter","Diesel Air Filter","Sport Air Filter","Panel Filter"]},{"g":"Oil Filters","items":["Cartridge Oil Filter","Spin-On Oil Filter","Oil Filter Housing","Oil Filter Set"]},{"g":"Fuel Filters","items":["Diesel Fuel Filter","Petrol Fuel Filter","Inline Filter","Pre-Filter"]},{"g":"Cabin Filters","items":["Pollen Filter","Activated Carbon Filter","Combi Filter","Cabin Filter Set"]}]},{"l":"Body & Exterior","subs":[{"g":"Bumpers","items":["Front Bumper","Rear Bumper","Bumper Bracket","Bumper Undertray","Tow Eye Cover"]},{"g":"Wings & Panels","items":["Wing / Fender","Bonnet","Tailgate","Door Panel","Sill","Roof Rail"]},{"g":"Mirrors","items":["Mirror Glass","Mirror Housing","Mirror Motor","Heated Mirror Element","Mirror Cover"]},{"g":"Window Regulators","items":["Window Regulator Motor","Window Regulator Mechanism","Window Glass","Window Seal"]},{"g":"Locks & Closures","items":["Door Lock","Central Locking","Door Lock Actuator","Lock Cylinder","Bonnet Cable","Fuel Cap"]}]},{"l":"Interior & Comfort","subs":[{"g":"Seats & Mechanism","items":["Seat Rail","Headrest","Seat Cover","Seat Heating","Seat Adjuster","Backrest Lock"]},{"g":"Dashboard & Trim","items":["Dashboard","Centre Console","Glove Box","Sun Visor","Interior Door Handle","Carpet"]},{"g":"Air Conditioning","items":["AC Compressor","AC Condenser","Evaporator","Expansion Valve","AC Pressure Switch","Dryer / Accumulator","AC Line"]},{"g":"Heating","items":["Heater Matrix","Blower Motor","Blower Resistor","Heater Tap","Heater Hose"]}]},{"l":"Exhaust System","subs":[{"g":"Exhaust Manifold","items":["Exhaust Manifold","Turbo Manifold","Manifold Gasket","Manifold Stud"]},{"g":"Catalytic Converter","items":["Oxidation Catalyst","Three-Way Catalyst","Diesel Oxidation Catalyst","Pre-Cat"]},{"g":"Particulate Filter","items":["DPF Diesel Particulate Filter","OPF Petrol Particulate Filter","DPF Pressure Sensor","DPF Temp Sensor"]},{"g":"Silencer & Pipes","items":["Rear Silencer","Middle Silencer","Centre Pipe","Intermediate Pipe","Flexi Pipe","Exhaust Mount"]},{"g":"Lambda Sensors","items":["Pre-Cat Lambda Sensor","Post-Cat Lambda Sensor","Wideband Lambda Sensor","NOx Sensor","Heated Sensor"]}]},{"l":"Wheels & Tyres","subs":[{"g":"Rims","items":["Alloy Rims","Steel Rims","Chrome Rims","Sport Rims","Winter Rims","Complete Wheel"]},{"g":"Tyres","items":["Summer Tyres","Winter Tyres","All-Season Tyres","Run-Flat","Sport Tyres","SUV Tyres","Off-Road Tyres"]},{"g":"TPMS Sensors","items":["TPMS Sensor","TPMS Valve","TPMS Control Unit","TPMS Programmer"]},{"g":"Wheel Bolts & Nuts","items":["Wheel Bolts","Wheel Nuts","Wheel Studs","Centre Cap","Valve Core","Wheel Spacer"]}]},{"l":"Oils, Fluids & Chemicals","subs":[{"g":"Engine Oil","items":["5W-30","5W-40","10W-40","0W-20","0W-30","Diesel Engine Oil","Fully Synthetic","Semi-Synthetic","Longlife Oil"]},{"g":"Gear Oil","items":["Manual Gearbox Oil","Automatic Transmission Fluid (ATF)","DSG / DCT Oil","Axle Oil","Differential Oil"]},{"g":"Brake Fluid","items":["DOT 4","DOT 5.1","DOT 3","Long Life Brake Fluid"]},{"g":"Coolant","items":["G12 Coolant","G13 Coolant","OAT Coolant","Coolant Concentrate","Ready-Mixed Coolant"]},{"g":"Additives & Chemicals","items":["Oil Additive","Fuel Additive","DPF Cleaner","AC Disinfectant","Brake Cleaner","Chain Lube"]}]},{"l":"Accessories & Wear Parts","subs":[{"g":"Wiper Blades","items":["Flat Blade Wiper","Conventional Wiper","Rear Wiper","Wiper Arm","Washer Jet"]},{"g":"Bulbs","items":["H4 Halogen","H7 Halogen","LED Retrofit Kit","Xenon D1S","Xenon D2S","Interior Bulb","W5W Sidelight"]},{"g":"Fuses","items":["Blade Fuses","Fuse Link","Fuse Box","Relay","Relay Box"]},{"g":"Belts & Pulleys","items":["V-Belt","Ribbed Belt","Poly-V Kit","Tensioner Pulley","Idler Pulley","Alternator Freewheel"]}]}], vc_cta: "Car Parts", vc_cta_sub: "All makes & models →",
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
        ["China Direct", "Wholesale from verified Chinese suppliers"],
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
      china_seller: "Chinese supplier / wholesale shop",
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
      origin: "Origin", china_only: "China Only", search: "Search",
      reset: "Reset filters", load_more: "Load more",
      showing: "Showing", of: "of", parts: "parts" },
    shop: { african: "African Sellers", china: "Chinese Suppliers (Wholesale)",
      no_shops: "No shops registered yet.", products_from: "Products from",
      whatsapp: "WhatsApp available", wechat: "WeChat", alibaba: "Alibaba Store",
      pending: "Your shop is pending admin approval.",
      create: "Create Shop", save: "Save Changes" },
    footer: { tagline: "Africa's leading B2B/B2C marketplace for new & used auto spare parts.",
      marketplace: "Marketplace", browse: "Browse Parts",
      sell: "Sell on AFRICARPARTS", china_w: "China Wholesale",
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
    nav: { parts: "Teile", shops: "Shops", china: "China Grosshandel",
      login: "Anmelden", register: "Registrieren", logout: "Abmelden",
      dashboard: "Dashboard", admin: "Admin-Panel", orders: "Meine Bestellungen",
      cart: "Warenkorb", language: "Sprache", currency: "Waehrung" },
    home: { hero_badge: "Afrikas #1 Kfz-Ersatzteilmarktplatz",
      hero_title: "Jedes Autoteil finden -", hero_title_em: "Schnell & Zuverlaessig",
      hero_sub: "Neue, gebrauchte & Grosshandels-Ersatzteile - Verifizierte Verkaeufer",
      search_ph: "Teilename, OEM-Nummer, Marke, Modell...",
      search_btn: "Teile suchen", stats_parts: "Teile gelistet",
      stats_sellers: "Verifizierte Verkaeufer", stats_countries: "Laender",
      stats_langs: "Sprachen", featured: "Empfohlene Teile",
      featured_sub: "Zuletzt gelistet", view_all: "Alle anzeigen",
      vc_cat_btn: "Alle Kategorien", vc_tree: [{"l":"Motor & Antrieb","subs":[{"g":"Motorblock & Komponenten","items":["Kurbelgehäuse","Zylinderkopf","Ventildeckel","Ölwanne","Kolben","Kolbenringe","Nockenwelle","Kurbelwelle"]},{"g":"Steuertrieb","items":["Zahnriemen","Steuerkette","Kettenspanner","Umlenkrolle","Steuerriemen-Kit","Steuerketten-Kit"]},{"g":"Kraftstoffsystem","items":["Einspritzdüsen","Kraftstoffpumpe","Hochdruckpumpe","Kraftstofffilter","Kraftstoff-Rail","Druckregler","Kraftstoffdrucksensor"]},{"g":"Luftansaugung","items":["Luftfilter","Ansaugbrücke","Ladeluftkühler","Turbolader","Drosselklappe","Luftmassenmesser","Ansaugschlauch"]},{"g":"Kühlsystem","items":["Kühler","Thermostat","Wasserpumpe","Ausgleichsbehälter","Kühlerschlauch","Lüfter","Viskokupplung","Kühlmitteltemperatursensor"]},{"g":"Schmiersystem","items":["Ölfilter","Ölpumpe","Öldrucksensor","Ventildeckelentlüftung","Ölkühler","Ölmessstab"]},{"g":"Kupplung & Getriebe","items":["Kupplungssatz","Zweimassenschwungrad","Getriebelager","Antriebswellen","Gleichlaufgelenk","Ausrücklager","Schaltgestänge","Getriebeöldichtung"]}]},{"l":"Bremsanlage","subs":[{"g":"Bremsbeläge","items":["Vorderachs-Beläge","Hinterachs-Beläge","Sportbremsbeläge","Bremsbelagsatz mit Warnkontakt"]},{"g":"Bremsscheiben","items":["Innenbelüftete Scheiben","Massivscheiben","Gelochte Scheiben","Sportbremsscheiben","Bremsscheiben-Set"]},{"g":"Bremssättel","items":["Bremssattel vorne","Bremssattel hinten","Bremsbacken","Radzylinder","Bremssattel Reparatursatz"]},{"g":"ABS / ESP Sensorik","items":["ABS-Sensor","Raddrehzahlsensor","ABS-Steuergerät","ABS-Pumpe","ESP-Sensor"]},{"g":"Bremsleitungen","items":["Bremsschläuche","Bremsleitungen","Verteiler","Bremsleitungsset","Bremsflüssigkeitsbehälter"]},{"g":"Handbremse","items":["Handbremsseil","Handbremshebel","EPB-Stellmotor","Bremsbacken hinten","Bremstrommel"]}]},{"l":"Fahrwerk & Lenkung","subs":[{"g":"Stoßdämpfer & Federung","items":["Stoßdämpfer vorne","Stoßdämpfer hinten","Schraubenfedern","Domlager","Puffer","Faltenbalg","Gewindefahrwerk","Luftfederung"]},{"g":"Lenkung","items":["Spurstangenkopf","Spurstange","Axialgelenk","Lenkgetriebe","Servopumpe","Lenkmanschette","Lenksäule","Lenkwinkelsensor"]},{"g":"Achsteile","items":["Querlenker","Traggelenk","Stabilisatorlager","Stabilisator","Koppelstange","Achsschenkel","Hilfsrahmen","Gummilager"]},{"g":"Radlager","items":["Radlager vorne","Radlager hinten","Radnabe","Radlager-Kit","Radnabenschraube"]}]},{"l":"Elektrik & Sensorik","subs":[{"g":"Batterie & Ladung","items":["Starterbatterie","Lichtmaschine","Anlasser","Spannungsregler","Ladekabel","Batteriepol","Batteriesensor"]},{"g":"Beleuchtung","items":["Scheinwerfer","Rückleuchten","Blinker","Nebelscheinwerfer","Tagfahrlicht","LED-Module","Glühlampen","Scheinwerferwaschanlage"]},{"g":"Sensoren","items":["Luftmassenmesser","MAP-Sensor","Lambdasonde","Kurbelwellensensor","Nockenwellensensor","NOx-Sensor","Abgastemperatursensor","Klopfsensor"]},{"g":"Steuergeräte","items":["Motorsteuergerät","ABS-Steuergerät","Komfortsteuergerät","Airbag-Steuergerät","Getriebesteuergerät"]},{"g":"Schalter & Bedienelemente","items":["Fensterheberschalter","Lenkstockschalter","Zündschloss","Hupe","Außenspiegelschalter","Zentralverriegelungsmodul"]}]},{"l":"Filter","subs":[{"g":"Luftfilter","items":["Luftfilter Benziner","Luftfilter Diesel","Sportluftfilter","Rucksackfilter"]},{"g":"Ölfilter","items":["Ölfilter Patrone","Ölfilter Spin-on","Ölfiltergehäuse","Ölfilter-Set"]},{"g":"Kraftstofffilter","items":["Kraftstofffilter Diesel","Kraftstofffilter Benzin","Inline-Filter","Vorfilter"]},{"g":"Innenraumfilter","items":["Pollenfilter","Aktivkohlefilter","Kombifilter","Cabin-Filter-Set"]}]},{"l":"Karosserie & Außen","subs":[{"g":"Stoßfänger","items":["Frontstoßfänger","Heckstoßfänger","Stoßfängerhalter","Stoßfänger-Unterfahrschutz","Abschleppösenabdeckung"]},{"g":"Kotflügel & Türen","items":["Kotflügel","Motorhaube","Heckklappe","Türverkleidung","Seitenschweller","Dachleiste"]},{"g":"Spiegel","items":["Spiegelglas","Spiegelgehäuse","Spiegelstellmotor","Beheizbares Spiegelelement","Spiegelkappe"]},{"g":"Fensterheber","items":["Fensterheber-Motor","Fensterheber-Mechanik","Fensterscheibe","Fensterdichtung"]},{"g":"Schlösser & Schließsysteme","items":["Türschloss","Zentralverriegelung","Türschlossstellmotor","Schließzylinder","Motorhaubenzug","Tankklappe"]}]},{"l":"Innenraum & Komfort","subs":[{"g":"Sitze & Mechanik","items":["Sitzschiene","Kopfstütze","Sitzbezug","Sitzheizung","Sitzverstellung","Lehnenschloss"]},{"g":"Armaturen & Verkleidung","items":["Armaturenbrett","Mittelkonsole","Handschuhfach","Sonnenblende","Türgriff innen","Teppichboden"]},{"g":"Klimaanlage","items":["Klimakompressor","Klimakondensator","Verdampfer","Expansionsventil","Klimadruckschalter","Trockner / Sammler","Klimaleitung"]},{"g":"Heizung","items":["Wärmetauscher","Gebläsemotor","Gebläseregler","Heizungsventil","Heizungsschlauch"]}]},{"l":"Abgasanlage","subs":[{"g":"Krümmer","items":["Abgaskrümmer","Turboladerkrümmer","Krümmerdichtung","Krümmerbolzen"]},{"g":"Katalysator","items":["Oxidationskatalysator","Dreiwegekatalysator","Dieseloxidationskatalysator","Vorkatalysator"]},{"g":"Partikelfilter","items":["DPF Dieselpartikelfilter","Ottopartikelfilter OPF","DPF-Drucksensor","DPF-Temperatursensor"]},{"g":"Endschalldämpfer","items":["Endschalldämpfer","Mittelschalldämpfer","Mittelrohr","Zwischenrohr","Flexrohr","Abgashalterung"]},{"g":"Lambdasonden","items":["Vor-Kat Lambdasonde","Nach-Kat Lambdasonde","Breitband-Lambdasonde","NOx-Sonde","Heizsonde"]}]},{"l":"Räder & Reifen","subs":[{"g":"Felgen","items":["Alufelgen","Stahlfelgen","Chromfelgen","Sportfelgen","Winterfelgen","Komplettrad"]},{"g":"Reifen","items":["Sommerreifen","Winterreifen","Ganzjahresreifen","Runflat","Sportreifen","SUV-Reifen","Geländereifen"]},{"g":"Reifendrucksensoren (RDKS)","items":["RDKS-Sensor","RDKS-Ventil","RDKS-Steuergerät","RDKS-Programmierwerkzeug"]},{"g":"Radschrauben & Muttern","items":["Radschrauben","Radmuttern","Radbolzen","Nabendeckel","Ventileinsatz","Spurverbreiterung"]}]},{"l":"Öle, Flüssigkeiten & Chemie","subs":[{"g":"Motoröl","items":["5W-30","5W-40","10W-40","0W-20","0W-30","Dieselmotoröl","Vollsynthetisch","Teilsynthetisch","Longlife-Öl"]},{"g":"Getriebeöl","items":["Schaltgetriebeöl","Automatikgetriebeöl (ATF)","DSG/DCT-Öl","Achsgetriebeöl","Differenzialöl"]},{"g":"Bremsflüssigkeit","items":["DOT 4","DOT 5.1","DOT 3","Bremsflüssigkeit Long Life"]},{"g":"Kühlmittel","items":["G12 Kühlmittel","G13 Kühlmittel","OAT Kühlmittel","Kühlmittelkonzentrat","Kühlmittel gebrauchsfertig"]},{"g":"Additive & Chemie","items":["Öladditiv","Kraftstoffadditiv","DPF-Reiniger","Klima-Desinfektion","Bremsreiniger","Kettenfett"]}]},{"l":"Zubehör & Verschleißteile","subs":[{"g":"Wischerblätter","items":["Flachbalkenwischer","Bügel-Wischblatt","Heckwischer","Wischerarm","Waschdüse"]},{"g":"Glühbirnen","items":["H4 Halogen","H7 Halogen","LED-Nachrüstsatz","Xenon D1S","Xenon D2S","Innenraumbirne","W5W Standlicht"]},{"g":"Sicherungen","items":["Flachstecksicherungen","Schmelzsicherung","Sicherungsbox","Relais","Relaisbox"]},{"g":"Riemen & Rollen","items":["Keilriemen","Keilrippenriemen","Rippenriemen-Kit","Spannrolle","Umlenkrolle","Lichtmaschinen-Freilauf"]}]}], vc_cta: "PKW-Ersatzteile", vc_cta_sub: "Alle Marken & Modelle →",
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
      categories: "Nach Kategorie suchen", china_title: "China Grosshandel Direkt",
      china_sub: "Fabrikpreise - Lieferung nach ganz Afrika",
      why_title: "Warum AFRICARPARTS?",
      features: [
        ["OEM-Suche", "Nach OEM-Nummer, Marke, Modell & Jahr"],
        ["Mobile Money", "MTN, Airtel, M-Pesa, Ueberweisung, Nachnahme"],
        ["Lokale Logistik", "Bus, Motorrad, Kurier & DHL"],
        ["China Direkt", "Grosshandel von verifizierten chinesischen Lieferanten"],
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
      have_account: "Konto vorhanden?", china_seller: "Chinesischer Anbieter",
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
      origin: "Herkunft", china_only: "Nur China", search: "Suchen",
      reset: "Zuruecksetzen", load_more: "Mehr laden",
      showing: "Zeige", of: "von", parts: "Teile" },
    shop: { african: "Afrikanische Verkaeufer",
      china: "Chinesische Anbieter (Grosshandel)",
      no_shops: "Keine Shops.", products_from: "Produkte von",
      whatsapp: "WhatsApp", wechat: "WeChat", alibaba: "Alibaba",
      pending: "Ausstehende Genehmigung.",
      create: "Shop erstellen", save: "Speichern" },
    footer: { tagline: "Afrikas fuehrender Marktplatz fuer Kfz-Ersatzteile.",
      marketplace: "Marktplatz", browse: "Durchsuchen",
      sell: "Verkaufen", china_w: "China Grosshandel",
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
    nav: { parts: "Pieces", shops: "Boutiques", china: "Gros Chine",
      login: "Connexion", register: "S'inscrire", logout: "Deconnexion",
      dashboard: "Tableau", admin: "Admin", orders: "Commandes",
      cart: "Panier", language: "Langue", currency: "Devise" },
    home: { hero_badge: "N1 de pieces auto en Afrique",
      hero_title: "Toute piece auto -", hero_title_em: "Rapide et Fiable",
      hero_sub: "Pieces neuves, d'occasion et en gros",
      search_ph: "Nom, OEM...", search_btn: "Rechercher",
      stats_parts: "Pieces", stats_sellers: "Vendeurs",
      stats_countries: "Pays", stats_langs: "Langues",
      featured: "En vedette", featured_sub: "Recentes",
      view_all: "Voir tout", categories: "Par categorie",
      vc_cat_btn: "Toutes catégories", vc_tree: [{"l":"Moteur & Transmission","subs":[{"g":"Bloc Moteur & Composants","items":["Carter Moteur","Culasse","Cache Culbuteurs","Carter Huile","Pistons","Segments","Arbre à Cames","Vilebrequin"]},{"g":"Distribution","items":["Courroie Distribution","Chaîne Distribution","Tendeur Chaîne","Galet Enrouleur","Kit Courroie Distrib.","Kit Chaîne Distrib."]},{"g":"Alimentation","items":["Injecteurs","Pompe à Carburant","Pompe Haute Pression","Filtre Carburant","Rail Injecteurs","Régulateur Pression","Capteur Pression Carburant"]},{"g":"Admission Air","items":["Filtre à Air","Collecteur Admission","Échangeur Air","Turbocompresseur","Corps Papillon","Débitmètre","Durite Admission"]},{"g":"Refroidissement","items":["Radiateur","Thermostat","Pompe à Eau","Vase Expansion","Durite Refroidissement","Ventilateur","Visco-coupleur","Sonde Température Eau"]},{"g":"Lubrification","items":["Filtre à Huile","Pompe à Huile","Capteur Pression Huile","Reniflard","Refroidisseur Huile","Jauge Huile"]},{"g":"Embrayage & Boîte de Vitesse","items":["Kit Embrayage","Volant Bi-Masse","Roulement Boîte","Arbre de Transmission","Joint Homocinétique","Butée Embrayage","Tringlerie","Joint Spy Boîte"]}]},{"l":"Freinage","subs":[{"g":"Plaquettes de Frein","items":["Plaquettes Avant","Plaquettes Arrière","Plaquettes Sport","Jeu Plaquettes avec Témoin"]},{"g":"Disques de Frein","items":["Disques Ventilés","Disques Pleins","Disques Percés","Disques Sport","Jeu Disques Frein"]},{"g":"Étriers & Cylindres","items":["Étrier Avant","Étrier Arrière","Mâchoires","Cylindre Roue","Kit Réparation Étrier"]},{"g":"Capteurs ABS / ESP","items":["Capteur ABS","Capteur Vitesse Roue","Calculateur ABS","Pompe ABS","Capteur ESP"]},{"g":"Canalisations de Frein","items":["Flexibles Frein","Tuyaux Frein","Répartiteur","Jeu Canalisations","Bocal Liquide Frein"]},{"g":"Frein à Main","items":["Câble Frein à Main","Levier Frein à Main","Moteur EPB","Mâchoires Arrière","Tambour Frein"]}]},{"l":"Suspension & Direction","subs":[{"g":"Amortisseurs & Ressorts","items":["Amortisseurs Avant","Amortisseurs Arrière","Ressorts Hélicoïdaux","Coupelle Amortisseur","Butée","Soufflet","Kit Suspension Sport","Suspension Pneumatique"]},{"g":"Direction","items":["Rotule Direction","Rotule Axiale","Barre de Direction","Crémaillère","Pompe Direction Assistée","Soufflet Direction","Colonne Direction","Capteur Angle Braquage"]},{"g":"Pièces de Train Roulant","items":["Triangle de Suspension","Rotule de Suspension","Silent Bloc Stabilisateur","Barre Stabilisatrice","Biellette de Barre","Pivot","Berceau","Silentbloc"]},{"g":"Roulements de Roue","items":["Roulement Roue Avant","Roulement Roue Arrière","Moyeu de Roue","Kit Roulement","Ecrou de Moyeu"]}]},{"l":"Électricité & Capteurs","subs":[{"g":"Batterie & Charge","items":["Batterie Automobile","Alternateur","Démarreur","Régulateur Tension","Câble Charge","Cosse Batterie","Capteur Batterie"]},{"g":"Éclairage","items":["Phare","Feu Arrière","Clignotant","Antibrouillard","Feux Diurnes","Module LED","Ampoules","Lave-Phares"]},{"g":"Capteurs","items":["Débitmètre Air","Capteur MAP","Sonde Lambda","Capteur Vilebrequin","Capteur Arbre Cames","Sonde NOx","Capteur Temp. Gaz Échap.","Capteur Cliquetis"]},{"g":"Calculateurs","items":["Calculateur Moteur","Calculateur ABS","Contrôle Habitacle","Module Airbag","Calculateur Boîte de Vitesses"]},{"g":"Commandes & Contacteurs","items":["Commande Lève-Vitre","Commodo Clignotant","Contacteur Démarreur","Klaxon","Commande Rétroviseur","Module Verrouillage"]}]},{"l":"Filtres","subs":[{"g":"Filtres à Air","items":["Filtre Air Essence","Filtre Air Diesel","Filtre Air Sport","Filtre Plat"]},{"g":"Filtres à Huile","items":["Filtre Huile Cartouche","Filtre Huile Vissé","Boîtier Filtre Huile","Kit Filtre Huile"]},{"g":"Filtres à Carburant","items":["Filtre Carburant Diesel","Filtre Carburant Essence","Filtre en Ligne","Pré-Filtre"]},{"g":"Filtres Habitacle","items":["Filtre à Pollen","Filtre à Charbon Actif","Filtre Combiné","Kit Filtre Habitacle"]}]},{"l":"Carrosserie & Extérieur","subs":[{"g":"Pare-Chocs","items":["Pare-Chocs Avant","Pare-Chocs Arrière","Support Pare-Chocs","Soubassement Pare-Chocs","Cache Crochet Remorquage"]},{"g":"Ailes & Panneaux","items":["Aile","Capot","Hayon","Panneau de Porte","Bas de Caisse","Baguette de Toit"]},{"g":"Rétroviseurs","items":["Glace Rétroviseur","Boîtier Rétroviseur","Moteur Rétroviseur","Élément Chauffant","Coque Rétroviseur"]},{"g":"Lève-Vitres","items":["Moteur Lève-Vitre","Mécanisme Lève-Vitre","Vitre","Joint de Vitre"]},{"g":"Serrures & Fermeture","items":["Serrure de Porte","Centralisation","Actionneur Serrure","Barillet","Câble Capot","Trappe à Carburant"]}]},{"l":"Intérieur & Confort","subs":[{"g":"Sièges & Mécanismes","items":["Rail de Siège","Appuie-Tête","Housse de Siège","Chauffage Siège","Réglage Siège","Verrou Dossier"]},{"g":"Tableau de Bord & Garnitures","items":["Tableau de Bord","Console Centrale","Vide-Poches","Pare-Soleil","Poignée Porte Intérieure","Moquette"]},{"g":"Climatisation","items":["Compresseur Clim","Condenseur Clim","Évaporateur","Détendeur","Pressostat","Déshydrateur","Tuyau Clim"]},{"g":"Chauffage","items":["Radiateur de Chauffage","Moto-Ventilateur Chauffage","Résistance Chauffage","Robinet Chauffage","Durite Chauffage"]}]},{"l":"Ligne d'Échappement","subs":[{"g":"Collecteur d'Échappement","items":["Collecteur","Collecteur Turbo","Joint Collecteur","Goujon Collecteur"]},{"g":"Catalyseur","items":["Catalyseur d'Oxydation","Catalyseur Trois Voies","Catalyseur Diesel","Pré-Catalyseur"]},{"g":"Filtre à Particules","items":["FAP Diesel","FAP Essence (OPF)","Capteur Pression FAP","Capteur Temp. FAP"]},{"g":"Silencieux & Tubes","items":["Silencieux Arrière","Silencieux Central","Tube Central","Tube Intermédiaire","Tube Flexible","Support Échappement"]},{"g":"Sondes Lambda","items":["Sonde Lambda Amont","Sonde Lambda Aval","Sonde Wideband","Sonde NOx","Sonde Chauffée"]}]},{"l":"Roues & Pneumatiques","subs":[{"g":"Jantes","items":["Jantes Alliage","Jantes Acier","Jantes Chromées","Jantes Sport","Jantes Hiver","Roue Complète"]},{"g":"Pneumatiques","items":["Pneus Été","Pneus Hiver","Pneus 4 Saisons","Run-Flat","Pneus Sport","Pneus SUV","Pneus Tout-Terrain"]},{"g":"Capteurs TPMS","items":["Capteur TPMS","Valve TPMS","Calculateur TPMS","Outil Programmation TPMS"]},{"g":"Boulons & Écrous de Roue","items":["Boulons de Roue","Écrous de Roue","Goujons","Cache Moyeu","Valve","Élargisseur de Voie"]}]},{"l":"Huiles, Liquides & Chimie","subs":[{"g":"Huile Moteur","items":["5W-30","5W-40","10W-40","0W-20","0W-30","Huile Moteur Diesel","100% Synthétique","Semi-Synthétique","Longlife"]},{"g":"Huile Boîte de Vitesses","items":["Huile Boîte Mécanique","Huile Automatique (ATF)","Huile DSG / DCT","Huile de Pont","Huile Différentiel"]},{"g":"Liquide de Frein","items":["DOT 4","DOT 5.1","DOT 3","Liquide de Frein Long Life"]},{"g":"Liquide de Refroidissement","items":["Liquide G12","Liquide G13","Liquide OAT","Concentré Antigel","Liquide Prêt à l'Emploi"]},{"g":"Additifs & Produits","items":["Additif Huile","Additif Carburant","Nettoyant FAP","Désinfectant Clim","Nettoyant Freins","Lubrifiant Chaîne"]}]},{"l":"Accessoires & Pièces d'Usure","subs":[{"g":"Balais Essuie-Glace","items":["Balai Plat","Balai Traditionnel","Balai Arrière","Bras Essuie-Glace","Gicleur Lave-Glace"]},{"g":"Ampoules","items":["H4 Halogène","H7 Halogène","Kit LED Rétrofit","Xénon D1S","Xénon D2S","Ampoule Habitacle","W5W Veilleuse"]},{"g":"Fusibles","items":["Fusibles Plats","Fusibles Cartouche","Boîtier Fusibles","Relais","Boîtier Relais"]},{"g":"Courroies & Galets","items":["Courroie Trapézoïdale","Courroie Poly-V","Kit Poly-V","Galet Tendeur","Galet Enrouleur","Roue Libre Alternateur"]}]}], vc_cta: "Pièces Auto", vc_cta_sub: "Toutes marques & modèles →",
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
      china_title: "Gros direct Chine", china_sub: "Prix usine",
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
      have_account: "Compte?", china_seller: "Fournisseur chinois",
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
      origin: "Origine", china_only: "Chine", search: "Chercher",
      reset: "Reinitialiser", load_more: "Plus", showing: "Affiche",
      of: "sur", parts: "pieces" },
    shop: { african: "Africains", china: "Chinois", no_shops: "Aucune.",
      products_from: "Produits de", whatsapp: "WhatsApp", wechat: "WeChat",
      alibaba: "Alibaba", pending: "En attente.", create: "Creer", save: "Enregistrer" },
    footer: { tagline: "Marche B2B/B2C de pieces auto.", marketplace: "Marche",
      browse: "Parcourir", sell: "Vendre", china_w: "Gros Chine",
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
    nav: { parts: "Pecas", shops: "Lojas", china: "Atacado China",
      login: "Entrar", register: "Registar", logout: "Sair",
      dashboard: "Painel", admin: "Admin", orders: "Pedidos",
      cart: "Carrinho", language: "Idioma", currency: "Moeda" },
    home: { hero_badge: "Mercado 1 de pecas auto", hero_title: "Qualquer peca -",
      hero_title_em: "Rapido", hero_sub: "Pecas novas, usadas, atacado",
      search_ph: "Nome, OEM...", search_btn: "Pesquisar",
      stats_parts: "Pecas", stats_sellers: "Vendedores",
      stats_countries: "Paises", stats_langs: "Idiomas",
      featured: "Destaque", featured_sub: "Recentes",
      view_all: "Ver tudo", categories: "Categorias",
      vc_cat_btn: "Todas categorias", vc_tree: [{"l":"Motor & Transmissão","subs":[{"g":"Bloco Motor & Componentes","items":["Bloco Motor","Cabeça de Cilindros","Tampa de Válvulas","Carter de Óleo","Pistões","Anéis de Pistão","Árbol de Cames","Cambota"]},{"g":"Distribuição","items":["Correia de Distribuição","Corrente de Distribuição","Tensor de Corrente","Rolo Guia","Kit Correia Distrib.","Kit Corrente Distrib."]},{"g":"Sistema de Combustível","items":["Injetores","Bomba de Combustível","Bomba de Alta Pressão","Filtro de Combustível","Rail de Combustível","Regulador de Pressão","Sensor de Pressão"]},{"g":"Admissão de Ar","items":["Filtro de Ar","Coletor de Admissão","Intercooler","Turbocompressor","Corpo de Borboleta","Medidor de Caudal","Tubo de Admissão"]},{"g":"Sistema de Arrefecimento","items":["Radiador","Termostato","Bomba de Água","Reservatório de Expansão","Manga de Arrefecimento","Ventilador","Embraiagem Viscosa","Sonda de Temperatura"]},{"g":"Sistema de Lubrificação","items":["Filtro de Óleo","Bomba de Óleo","Sensor de Pressão de Óleo","Respirador","Permutador de Calor Óleo","Vareta de Óleo"]},{"g":"Embraiagem & Caixa","items":["Kit de Embraiagem","Volante Bi-Massa","Rolamento de Caixa","Semieixo","Junta Homocinética","Rolamento de Pressão","Varão de Mudanças","Retentor de Caixa"]}]},{"l":"Sistema de Travagem","subs":[{"g":"Pastilhas de Travão","items":["Pastilhas Dianteiras","Pastilhas Traseiras","Pastilhas Desportivas","Jogo Pastilhas com Sensor"]},{"g":"Discos de Travão","items":["Discos Ventilados","Discos Maciços","Discos Perfurados","Discos Desportivos","Jogo Discos Travão"]},{"g":"Pinças & Cilindros","items":["Pinça Dianteira","Pinça Traseira","Maxilas de Travão","Cilindro de Roda","Kit Reparação Pinça"]},{"g":"Sensores ABS / ESP","items":["Sensor ABS","Sensor de Velocidade da Roda","Módulo ABS","Bomba ABS","Sensor ESP"]},{"g":"Tubagens de Travão","items":["Flexíveis de Travão","Tubagens de Travão","Bloco Distribuidor","Jogo Tubagens","Reservatório de Líquido"]},{"g":"Travão de Mão","items":["Cabo de Travão de Mão","Alavanca de Travão de Mão","Motor EPB","Maxilas Traseiras","Tambor de Travão"]}]},{"l":"Suspensão & Direção","subs":[{"g":"Amortecedores & Molas","items":["Amortecedores Dianteiros","Amortecedores Traseiros","Molas Helicoidais","Coxim Superior","Batente","Coifa","Kit Desportivo","Suspensão Pneumática"]},{"g":"Direção","items":["Rótula de Direção","Rótula Axial","Barra de Direção","Caixa de Direção","Bomba de Direção Assistida","Coifa de Direção","Coluna de Direção","Sensor de Ângulo"]},{"g":"Peças de Eixo","items":["Braço de Suspensão","Rótula de Suspensão","Silentblock da Barra","Barra Estabilizadora","Bieleta","Manga de Eixo","Berceau","Silentblock"]},{"g":"Rolamentos de Roda","items":["Rolamento Dianteiro","Rolamento Traseiro","Cubo de Roda","Kit de Rolamento","Porca de Cubo"]}]},{"l":"Elétrica & Sensores","subs":[{"g":"Bateria & Carregamento","items":["Bateria Automóvel","Alternador","Motor de Arranque","Regulador de Tensão","Cabo de Carga","Terminal de Bateria","Sensor de Bateria"]},{"g":"Iluminação","items":["Farol","Farolim Traseiro","Pisca","Nevoeiro","Luzes de Circulação Diurna","Módulo LED","Lâmpadas","Lavador de Farol"]},{"g":"Sensores","items":["Medidor de Caudal","Sensor MAP","Sonda Lambda","Sensor de Cambota","Sensor Árbol de Cames","Sonda NOx","Sensor Temp. Gases","Sensor de Detonação"]},{"g":"Centralinas","items":["Centralina do Motor","Módulo ABS","Módulo de Conforto","Módulo Airbag","Centralina de Caixa"]},{"g":"Interruptores & Comandos","items":["Comando Eléctrico","Comutador de Coluna","Chave de Ignição","Buzina","Comando de Espelhos","Módulo de Fecho Central"]}]},{"l":"Filtros","subs":[{"g":"Filtros de Ar","items":["Filtro Ar Gasolina","Filtro Ar Diesel","Filtro Ar Desportivo","Filtro Plano"]},{"g":"Filtros de Óleo","items":["Filtro Óleo Cartucho","Filtro Óleo Rosca","Caixa de Filtro Óleo","Jogo Filtro Óleo"]},{"g":"Filtros de Combustível","items":["Filtro Combustível Diesel","Filtro Combustível Gasolina","Filtro em Linha","Pré-Filtro"]},{"g":"Filtros de Habitáculo","items":["Filtro de Pólen","Filtro de Carvão Ativo","Filtro Combinado","Jogo Filtro Habitáculo"]}]},{"l":"Carroçaria & Exterior","subs":[{"g":"Para-Choques","items":["Para-Choques Dianteiro","Para-Choques Traseiro","Suporte Para-Choques","Protecção Inferior","Tampa Gancho Reboque"]},{"g":"Guarda-Lamas & Painéis","items":["Guarda-Lamas","Capô","Mala / Portão Traseiro","Painel de Porta","Soleira","Perfil de Tejadilho"]},{"g":"Espelhos","items":["Vidro de Espelho","Caixa de Espelho","Motor de Espelho","Elemento de Aquecimento","Tampa de Espelho"]},{"g":"Elevadores de Vidro","items":["Motor de Elevador","Mecanismo de Elevador","Vidro","Vedante de Vidro"]},{"g":"Fechos & Fechaduras","items":["Fechadura de Porta","Fecho Central","Actuador de Fechadura","Cilindro de Fecho","Cabo de Capô","Tampa de Combustível"]}]},{"l":"Interior & Conforto","subs":[{"g":"Bancos & Mecanismos","items":["Calha de Banco","Apoio de Cabeça","Capa de Banco","Aquecimento de Banco","Ajuste de Banco","Trinco de Encosto"]},{"g":"Painel & Estofos","items":["Painel de Instrumentos","Consola Central","Porta-Luvas","Pala de Sol","Puxador Interior","Carpete"]},{"g":"Ar Condicionado","items":["Compressor AC","Condensador AC","Evaporador","Válvula de Expansão","Pressostato AC","Desidratador","Tubo AC"]},{"g":"Aquecimento","items":["Radiador de Aquecimento","Motor da Ventilação","Resistência de Ventilação","Torneira de Aquecimento","Manga de Aquecimento"]}]},{"l":"Sistema de Escape","subs":[{"g":"Coletor de Escape","items":["Coletor de Escape","Coletor Turbo","Junta de Coletor","Parafuso de Coletor"]},{"g":"Catalisador","items":["Catalisador de Oxidação","Catalisador de Três Vias","Catalisador Diesel","Pré-Catalisador"]},{"g":"Filtro de Partículas","items":["FAP Diesel","FAP Gasolina (OPF)","Sensor de Pressão FAP","Sensor de Temperatura FAP"]},{"g":"Silencioso & Tubagens","items":["Silencioso Traseiro","Silencioso Central","Tubo Central","Tubo Intermédio","Tubo Flexível","Suporte de Escape"]},{"g":"Sondas Lambda","items":["Sonda Lambda Pré-Cat","Sonda Lambda Pós-Cat","Sonda Wideband","Sonda NOx","Sonda Aquecida"]}]},{"l":"Rodas & Pneus","subs":[{"g":"Jantes","items":["Jantes em Liga Leve","Jantes de Aço","Jantes Cromadas","Jantes Desportivas","Jantes de Inverno","Roda Completa"]},{"g":"Pneus","items":["Pneus de Verão","Pneus de Inverno","Pneus 4 Estações","Run-Flat","Pneus Desportivos","Pneus SUV","Pneus Todo-o-Terreno"]},{"g":"Sensores TPMS","items":["Sensor TPMS","Válvula TPMS","Módulo TPMS","Ferramenta de Programação TPMS"]},{"g":"Parafusos & Porcas de Roda","items":["Parafusos de Roda","Porcas de Roda","Prisioneiros","Tampa de Cubo","Válvula de Pneu","Espaçador de Roda"]}]},{"l":"Óleos, Fluidos & Química","subs":[{"g":"Óleo de Motor","items":["5W-30","5W-40","10W-40","0W-20","0W-30","Óleo Diesel","Sintético Puro","Semi-Sintético","Longlife"]},{"g":"Óleo de Caixa","items":["Óleo Caixa Manual","Fluido ATF Automático","Óleo DSG / DCT","Óleo de Eixo","Óleo Diferencial"]},{"g":"Líquido de Travões","items":["DOT 4","DOT 5.1","DOT 3","Líquido de Travões Long Life"]},{"g":"Líquido de Arrefecimento","items":["Líquido G12","Líquido G13","Líquido OAT","Concentrado Anticongelante","Líquido Pronto a Usar"]},{"g":"Aditivos & Químicos","items":["Aditivo de Óleo","Aditivo de Combustível","Limpador FAP","Desinfetante AC","Limpador de Travões","Lubrificante de Corrente"]}]},{"l":"Acessórios & Peças de Desgaste","subs":[{"g":"Palhetas de Limpa-Vidros","items":["Palheta Plana","Palheta Convencional","Palheta Traseira","Braço Limpa-Vidros","Esguicho"]},{"g":"Lâmpadas","items":["H4 Halogéneo","H7 Halogéneo","Kit LED Retrofit","Xenon D1S","Xenon D2S","Lâmpada Interior","W5W Posição"]},{"g":"Fusíveis","items":["Fusíveis de Faca","Fusíveis em Cartucho","Caixa de Fusíveis","Relé","Caixa de Relés"]},{"g":"Correias & Polias","items":["Correia em V","Correia Poly-V","Kit Poly-V","Polia Tensora","Rolo Guia","Roda Livre do Alternador"]}]}], vc_cta: "Peças Auto", vc_cta_sub: "Todas as marcas & modelos →",
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
      china_title: "Atacado China", china_sub: "Precos de fabrica",
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
      have_account: "Conta?", china_seller: "Chines",
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
      origin: "Origem", china_only: "So China", search: "Pesquisar",
      reset: "Limpar", load_more: "Mais", showing: "Mostrando",
      of: "de", parts: "pecas" },
    shop: { african: "Africanos", china: "Chineses", no_shops: "Nenhuma.",
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
    nav: { parts: "Piezas", shops: "Tiendas", china: "Mayorista China",
      login: "Iniciar", register: "Registro", logout: "Cerrar",
      dashboard: "Panel", admin: "Admin", orders: "Pedidos",
      cart: "Carrito", language: "Idioma", currency: "Moneda" },
    home: { hero_badge: "Mercado 1 de repuestos", hero_title: "Cualquier pieza -",
      hero_title_em: "Rapido", hero_sub: "Repuestos nuevos y usados",
      search_ph: "Nombre, OEM...", search_btn: "Buscar",
      stats_parts: "Piezas", stats_sellers: "Vendedores",
      stats_countries: "Paises", stats_langs: "Idiomas",
      featured: "Destacadas", featured_sub: "Recientes",
      view_all: "Ver todo", categories: "Categorias",
      vc_cat_btn: "Todas categorías", vc_tree: [{"l":"Motor & Transmisión","subs":[{"g":"Bloque Motor & Componentes","items":["Bloque Motor","Culata","Tapa de Balancines","Cárter de Aceite","Pistones","Segmentos","Árbol de Levas","Cigüeñal"]},{"g":"Distribución","items":["Correa de Distribución","Cadena de Distribución","Tensor de Cadena","Polea Guía","Kit Correa Distrib.","Kit Cadena Distrib."]},{"g":"Sistema de Combustible","items":["Inyectores","Bomba de Combustible","Bomba Alta Presión","Filtro Combustible","Rail de Inyectores","Regulador de Presión","Sensor Presión Combustible"]},{"g":"Admisión de Aire","items":["Filtro de Aire","Colector de Admisión","Intercooler","Turbocompresor","Cuerpo de Mariposa","Caudalímetro","Manguito de Admisión"]},{"g":"Sistema de Refrigeración","items":["Radiador","Termostato","Bomba de Agua","Depósito de Expansión","Manguito Refrigeración","Ventilador","Viscoreductor","Sonda Temperatura Agua"]},{"g":"Sistema de Lubricación","items":["Filtro de Aceite","Bomba de Aceite","Sensor Presión Aceite","Tapa Válvulas Ventilación","Enfriador Aceite","Varilla del Aceite"]},{"g":"Embrague & Caja de Cambios","items":["Kit Embrague","Volante Bimasa","Rodamiento Caja Cambios","Semieje","Junta Homocinética","Cojinete de Empuje","Varillaje Cambio","Retén Caja Cambios"]}]},{"l":"Sistema de Frenos","subs":[{"g":"Pastillas de Freno","items":["Pastillas Delanteras","Pastillas Traseras","Pastillas Deportivas","Juego Pastillas con Sensor"]},{"g":"Discos de Freno","items":["Discos Ventilados","Discos Macizos","Discos Perforados","Discos Deportivos","Juego Discos de Freno"]},{"g":"Pinzas & Cilindros","items":["Pinza Delantera","Pinza Trasera","Zapatas de Freno","Cilindro de Rueda","Kit Reparación Pinza"]},{"g":"Sensores ABS / ESP","items":["Sensor ABS","Sensor Velocidad Rueda","Módulo ABS","Bomba ABS","Sensor ESP"]},{"g":"Tuberías de Freno","items":["Latiguillos Freno","Tuberías Freno","Distribuidor","Juego Tuberías","Depósito Líquido Freno"]},{"g":"Freno de Mano","items":["Cable Freno de Mano","Palanca Freno de Mano","Motor EPB","Zapatas Traseras","Tambor de Freno"]}]},{"l":"Suspensión & Dirección","subs":[{"g":"Amortiguadores & Muelles","items":["Amortiguadores Delanteros","Amortiguadores Traseros","Muelles de Suspensión","Cojinete Superior","Tope","Fuelle","Kit Sport","Suspensión Neumática"]},{"g":"Dirección","items":["Rótula de Dirección","Rótula Axial","Barra de Dirección","Cremallera","Bomba Dirección Asistida","Fuelle Dirección","Columna de Dirección","Sensor Ángulo Dirección"]},{"g":"Piezas de Tren Delantero","items":["Brazo de Suspensión","Rótula de Suspensión","Silent-Block Estabilizador","Barra Estabilizadora","Tirante Estabilizador","Mangueta","Berceau","Silent-Block"]},{"g":"Rodamientos de Rueda","items":["Rodamiento Delantero","Rodamiento Trasero","Maza de Rueda","Kit de Rodamiento","Tuerca de Cubo"]}]},{"l":"Electricidad & Sensores","subs":[{"g":"Batería & Carga","items":["Batería de Coche","Alternador","Motor de Arranque","Regulador de Tensión","Cable de Carga","Terminal de Batería","Sensor de Batería"]},{"g":"Iluminación","items":["Faro","Piloto Trasero","Intermitente","Antiniebla","Luces de Circulación Diurna","Módulo LED","Bombillas","Limpiafaro"]},{"g":"Sensores","items":["Caudalímetro","Sensor MAP","Sonda Lambda","Sensor Cigüeñal","Sensor Árbol de Levas","Sonda NOx","Sensor Temp. Gases","Sensor de Detonación"]},{"g":"Centralitas","items":["Centralita Motor","Centralita ABS","Módulo de Confort","Módulo Airbag","Centralita Caja de Cambios"]},{"g":"Interruptores & Mandos","items":["Mando Elevalunas","Columna de Mandos","Llave de Contacto","Bocina","Mando Retrovisor","Módulo Cierre Centralizado"]}]},{"l":"Filtros","subs":[{"g":"Filtros de Aire","items":["Filtro Aire Gasolina","Filtro Aire Diésel","Filtro Aire Deportivo","Filtro Plano"]},{"g":"Filtros de Aceite","items":["Filtro Aceite Cartucho","Filtro Aceite Rosca","Carcasa Filtro Aceite","Juego Filtro Aceite"]},{"g":"Filtros de Combustible","items":["Filtro Combustible Diésel","Filtro Combustible Gasolina","Filtro en Línea","Prefiltro"]},{"g":"Filtros de Habitáculo","items":["Filtro de Polen","Filtro de Carbón Activo","Filtro Combinado","Juego Filtro Habitáculo"]}]},{"l":"Carrocería & Exterior","subs":[{"g":"Parachoques","items":["Parachoques Delantero","Parachoques Trasero","Soporte Parachoques","Protector Inferior","Tapa Gancho Remolque"]},{"g":"Aletas & Paneles","items":["Aleta","Capó","Portón Trasero","Panel de Puerta","Umbral","Moldura de Techo"]},{"g":"Espejos","items":["Luna Espejo","Carcasa Espejo","Motor Espejo","Elemento Calefactado","Carcasa Exterior"]},{"g":"Elevalunas","items":["Motor Elevalunas","Mecanismo Elevalunas","Luna","Junta de Luna"]},{"g":"Cierres & Cerraduras","items":["Cerradura de Puerta","Cierre Centralizado","Actuador Cerradura","Bombín Cerradura","Cable Capó","Tapa Combustible"]}]},{"l":"Interior & Confort","subs":[{"g":"Asientos & Mecanismos","items":["Guía de Asiento","Reposacabezas","Funda de Asiento","Calefacción Asiento","Ajuste Asiento","Cierre Respaldo"]},{"g":"Salpicadero & Guarnecidos","items":["Salpicadero","Consola Central","Guantera","Parasol","Manilla Interior","Moqueta"]},{"g":"Climatización","items":["Compresor Aire Acondicionado","Condensador AC","Evaporador","Válvula de Expansión","Presostato AC","Filtro Deshidratador","Tubería AC"]},{"g":"Calefacción","items":["Radiador de Calefacción","Motor del Ventilador","Resistencia Ventilador","Llave de Calefacción","Manguito Calefacción"]}]},{"l":"Sistema de Escape","subs":[{"g":"Colector de Escape","items":["Colector de Escape","Colector Turbo","Junta Colector","Espárrago Colector"]},{"g":"Catalizador","items":["Catalizador de Oxidación","Catalizador Tres Vías","Catalizador Diésel","Pre-Catalizador"]},{"g":"Filtro de Partículas","items":["FAP Diésel","FAP Gasolina (OPF)","Sensor Presión FAP","Sensor Temperatura FAP"]},{"g":"Silenciador & Tubos","items":["Silenciador Trasero","Silenciador Central","Tubo Central","Tubo Intermedio","Tubo Flexible","Soporte Escape"]},{"g":"Sondas Lambda","items":["Sonda Lambda Pre-Cat","Sonda Lambda Post-Cat","Sonda Wideband","Sonda NOx","Sonda Calefactada"]}]},{"l":"Ruedas & Neumáticos","subs":[{"g":"Llantas","items":["Llantas de Aleación","Llantas de Acero","Llantas Cromadas","Llantas Sport","Llantas de Invierno","Rueda Completa"]},{"g":"Neumáticos","items":["Neumáticos Verano","Neumáticos Invierno","Neumáticos 4 Estaciones","Run-Flat","Neumáticos Sport","Neumáticos SUV","Todo Terreno"]},{"g":"Sensores TPMS","items":["Sensor TPMS","Válvula TPMS","Módulo TPMS","Herramienta Programación TPMS"]},{"g":"Tornillos & Tuercas de Rueda","items":["Tornillos de Rueda","Tuercas de Rueda","Espárragos de Rueda","Tapacubos","Válvula de Rueda","Separador de Rueda"]}]},{"l":"Aceites, Líquidos & Química","subs":[{"g":"Aceite de Motor","items":["5W-30","5W-40","10W-40","0W-20","0W-30","Aceite Motor Diésel","Sintético Puro","Semisintético","Longlife"]},{"g":"Aceite de Caja de Cambios","items":["Aceite Caja Manual","Líquido ATF Automático","Aceite DSG / DCT","Aceite Diferencial","Aceite de Puente"]},{"g":"Líquido de Frenos","items":["DOT 4","DOT 5.1","DOT 3","Líquido Frenos Long Life"]},{"g":"Líquido Refrigerante","items":["Refrigerante G12","Refrigerante G13","Refrigerante OAT","Concentrado Anticongelante","Refrigerante Listo al Uso"]},{"g":"Aditivos & Productos","items":["Aditivo Aceite","Aditivo Combustible","Limpiador FAP","Desinfectante Aire Acondicionado","Limpiador Frenos","Lubricante Cadena"]}]},{"l":"Accesorios & Piezas de Desgaste","subs":[{"g":"Escobillas Limpiaparabrisas","items":["Escobilla Plana","Escobilla Convencional","Escobilla Trasera","Brazo Limpiaparabrisas","Tobera Lavaparabrisas"]},{"g":"Bombillas","items":["H4 Halógeno","H7 Halógeno","Kit LED Retrofit","Xenón D1S","Xenón D2S","Bombilla Interior","W5W Luz Posición"]},{"g":"Fusibles","items":["Fusibles Planos","Fusibles Cartucho","Caja de Fusibles","Relé","Caja de Relés"]},{"g":"Correas & Poleas","items":["Correa Trapecial","Correa Poly-V","Kit Poly-V","Polea Tensora","Polea Guía","Rueda Libre Alternador"]}]}], vc_cta: "Repuestos Auto", vc_cta_sub: "Todas marcas & modelos →",
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
      china_title: "Mayorista China", china_sub: "Precios fabrica",
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
      have_account: "Cuenta?", china_seller: "Chino",
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
      origin: "Origen", china_only: "Solo China", search: "Buscar",
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
      stats_parts: "Qata", stats_sellers: "Baei",
      stats_countries: "Dawla", stats_langs: "Lugha",
      featured: "Mumayyaza", featured_sub: "Hadithan",
      view_all: "Al-Kull", categories: "Fiat",
      vc_cat_btn: "Kull al-fiat", vc_tree: [{"l":"المحرك والناقل","subs":[{"g":"كتلة المحرك ومكوناتها","items":["كتلة المحرك","رأس الأسطوانة","غطاء الصمامات","وعاء الزيت","مكابس","حلقات المكبس","عمود الكامة","العمود المرفقي"]},{"g":"توقيت المحرك","items":["سير التوقيت","سلسلة التوقيت","شادّ السلسلة","بكرة التوجيه","طقم سير التوقيت","طقم سلسلة التوقيت"]},{"g":"نظام الوقود","items":["رشاشات الوقود","مضخة الوقود","مضخة الضغط العالي","فلتر الوقود","خط الوقود","منظم الضغط","مستشعر ضغط الوقود"]},{"g":"سحب الهواء","items":["فلتر الهواء","مشعب السحب","مبرد الشحن","الشاحن التوربيني","صمام الخانق","مقياس تدفق الهواء","خرطوم السحب"]},{"g":"نظام التبريد","items":["المبرد","الثرموستات","مضخة المياه","خزان التمدد","خرطوم التبريد","مروحة التبريد","مقرن اللزوجة","مستشعر درجة حرارة الماء"]},{"g":"نظام التزليق","items":["فلتر الزيت","مضخة الزيت","مستشعر ضغط الزيت","تنفيس كارتر","مبرد الزيت","مسطرة قياس الزيت"]},{"g":"القابض وصندوق التروس","items":["طقم القابض","دولاب الحدين","رافعة صندوق التروس","عمود الإدارة","وصلة هوموسيناتيك","رافعة الضغط","ذراع التروس","حلقة إحكام صندوق التروس"]}]},{"l":"نظام الفرامل","subs":[{"g":"أحذية الفرامل","items":["أحذية أمامية","أحذية خلفية","أحذية رياضية","طقم أحذية مع حساس تآكل"]},{"g":"أقراص الفرامل","items":["أقراص مهواة","أقراص صلبة","أقراص مثقوبة","أقراص رياضية","طقم أقراص فرامل"]},{"g":"ملازم وأسطوانات الفرامل","items":["ملزمة أمامية","ملزمة خلفية","أحذية فرامل خلفية","أسطوانة عجلة","طقم إصلاح الملزمة"]},{"g":"حساسات ABS / ESP","items":["حساس ABS","حساس سرعة العجلة","وحدة تحكم ABS","مضخة ABS","حساس ESP"]},{"g":"أنابيب الفرامل","items":["خراطيم الفرامل","أنابيب الفرامل","موزع الفرامل","طقم أنابيب","خزان سائل الفرامل"]},{"g":"فرامل اليد","items":["كابل فرامل اليد","ذراع فرامل اليد","محرك EPB","أحذية خلفية","طبل الفرامل"]}]},{"l":"التعليق والتوجيه","subs":[{"g":"الممتصات والزنبركات","items":["ممتصات أمامية","ممتصات خلفية","زنبركات حلزونية","حامل الممتص","مطاط الإيقاف","جلبة الحماية","نظام الضبط الرياضي","تعليق هوائي"]},{"g":"نظام التوجيه","items":["رأس قضيب التوجيه","قضيب التوجيه","بار التوجيه","علبة التوجيه","مضخة التوجيه","جلبة التوجيه","عمود التوجيه","مستشعر زاوية التوجيه"]},{"g":"أجزاء المحور","items":["ذراع التحكم","كرة الإسناد","مطاط بار الاستقرار","بار الاستقرار","رابط الاستقرار","محور التوجيه","هيكل فرعي","مطاط مطاطي"]},{"g":"محامل العجل","items":["محمل عجل أمامي","محمل عجل خلفي","نابض العجل","طقم محمل","صمولة المحور"]}]},{"l":"الكهرباء والمستشعرات","subs":[{"g":"البطارية والشحن","items":["بطارية السيارة","مولد الكهرباء","موتور الإقلاع","منظم الجهد","كابل الشحن","قطب البطارية","مستشعر البطارية"]},{"g":"الإضاءة","items":["المصابيح الأمامية","المصابيح الخلفية","مؤشر الانعطاف","مصباح الضباب","مصابيح النهار","وحدة LED","لمبات","غسالة الأضواء"]},{"g":"المستشعرات","items":["مقياس تدفق الهواء","حساس MAP","مسبار لامبدا","حساس العمود المرفقي","حساس عمود الكامة","مسبار NOx","حساس درجة حرارة الغازات","حساس الطرق"]},{"g":"وحدات التحكم","items":["وحدة تحكم المحرك ECU","وحدة تحكم ABS","وحدة التحكم بالجسم BCM","وحدة Airbag","وحدة تحكم ناقل الحركة"]},{"g":"المفاتيح والأوامر","items":["مفتاح رافع الزجاج","ذراع الإشارات","مفتاح الإشعال","البوق","مفتاح المرايا","وحدة القفل المركزي"]}]},{"l":"الفلاتر","subs":[{"g":"فلاتر الهواء","items":["فلتر هواء بنزين","فلتر هواء ديزل","فلتر هواء رياضي","فلتر لوحي"]},{"g":"فلاتر الزيت","items":["فلتر زيت خرطوشة","فلتر زيت ملولب","غلاف فلتر الزيت","طقم فلتر زيت"]},{"g":"فلاتر الوقود","items":["فلتر وقود ديزل","فلتر وقود بنزين","فلتر مضمن","فلتر مسبق"]},{"g":"فلاتر المقصورة","items":["فلتر حبوب اللقاح","فلتر الفحم النشط","فلتر مركب","طقم فلتر مقصورة"]}]},{"l":"هيكل الجسم والمظهر الخارجي","subs":[{"g":"المصدات","items":["المصد الأمامي","المصد الخلفي","حامل المصد","الحماية السفلية","غطاء خطاف القطر"]},{"g":"الأجنحة والألواح","items":["الجناح","غطاء المحرك","باب الصندوق","لوح الباب","عتبة الباب","شريح السقف"]},{"g":"المرايا","items":["زجاج المرآة","غطاء المرآة","موتور المرآة","عنصر التسخين","غطاء المرآة الخارجي"]},{"g":"رافعات الزجاج","items":["موتور رافع الزجاج","آلية رافع الزجاج","زجاج النافذة","ختم الزجاج"]},{"g":"الأقفال وأنظمة الإغلاق","items":["قفل الباب","القفل المركزي","محرك قفل الباب","أسطوانة القفل","كابل غطاء المحرك","غطاء خزان الوقود"]}]},{"l":"المقصورة الداخلية والراحة","subs":[{"g":"المقاعد وآلياتها","items":["ريل المقعد","مسند الرأس","غطاء المقعد","تدفئة المقعد","ضبط المقعد","قفل الظهر"]},{"g":"لوحة القيادة والتشطيبات","items":["لوحة القيادة","وحدة التحكم الوسطى","درج القفازات","حاجب الشمس","مقبض الباب الداخلي","السجادة"]},{"g":"تكييف الهواء","items":["ضاغط التكييف","مكثف التكييف","المبخر","صمام التمدد","مفتاح الضغط","المجفف","أنبوب التكييف"]},{"g":"التدفئة","items":["مشعاع التدفئة","موتور مروحة التدفئة","مقاومة المروحة","صنبور التدفئة","خرطوم التدفئة"]}]},{"l":"نظام العادم","subs":[{"g":"مشعب العادم","items":["مشعب العادم","مشعب التوربو","حشية مشعب العادم","مسمار مشعب العادم"]},{"g":"المحول الحراري","items":["محول أكسدة","محول ثلاثي الطرق","محول ديزل","محول مسبق"]},{"g":"فلتر الجسيمات","items":["فلتر جسيمات ديزل DPF","فلتر جسيمات بنزين OPF","مستشعر ضغط DPF","مستشعر حرارة DPF"]},{"g":"كاتمات الصوت والأنابيب","items":["كاتم الصوت الخلفي","كاتم الصوت الأوسط","الأنبوب الأوسط","الأنبوب الوسيط","الأنبوب المرن","حامل العادم"]},{"g":"مسابير لامبدا","items":["مسبار لامبدا قبل المحول","مسبار لامبدا بعد المحول","مسبار عريض النطاق","مسبار NOx","مسبار مسخن"]}]},{"l":"العجلات والإطارات","subs":[{"g":"الجنوط","items":["جنوط ألومنيوم","جنوط فولاذية","جنوط كروم","جنوط رياضية","جنوط شتاء","عجلة كاملة"]},{"g":"الإطارات","items":["إطارات صيفية","إطارات شتوية","إطارات كل الفصول","Run-Flat","إطارات رياضية","إطارات SUV","إطارات وعرة"]},{"g":"حساسات ضغط الإطار TPMS","items":["حساس TPMS","صمام TPMS","وحدة تحكم TPMS","أداة برمجة TPMS"]},{"g":"براغي وصواميل العجل","items":["براغي العجل","صواميل العجل","مسامير العجل","غطاء المحور","صمام الإطار","فاصل العجل"]}]},{"l":"الزيوت والسوائل والمواد الكيميائية","subs":[{"g":"زيت المحرك","items":["5W-30","5W-40","10W-40","0W-20","0W-30","زيت محرك ديزل","كامل الاصطناع","نصف اصطناعي","زيت طويل الأمد"]},{"g":"زيت ناقل الحركة","items":["زيت علبة يدوية","سائل ATF أوتوماتيك","زيت DSG / DCT","زيت المحور","زيت التفاضل"]},{"g":"سائل الفرامل","items":["DOT 4","DOT 5.1","DOT 3","سائل فرامل طويل الأمد"]},{"g":"سائل التبريد","items":["سائل G12","سائل G13","سائل OAT","مركز مانع التجمد","سائل جاهز للاستخدام"]},{"g":"المواد المضافة والكيميائية","items":["مضاف الزيت","مضاف الوقود","منظف DPF","معقم التكييف","منظف الفرامل","مواد التزليق"]}]},{"l":"الملحقات وقطع التآكل","subs":[{"g":"مساحات الزجاج","items":["ماسحة مسطحة","ماسحة تقليدية","ماسحة خلفية","ذراع الماسحة","فوهة الغسيل"]},{"g":"المصابيح","items":["H4 هالوجين","H7 هالوجين","طقم LED بديل","زينون D1S","زينون D2S","مصباح داخلي","W5W ضوء موضع"]},{"g":"الفيوزات","items":["فيوزات شفرة","فيوز خرطوشة","صندوق فيوزات","ريلاي","صندوق ريلاي"]},{"g":"السيور والبكرات","items":["سير V","سير Poly-V","طقم Poly-V","بكرة الشد","بكرة التوجيه","عجلة حرة للمولد"]}]}], vc_cta: "Qata Sayara", vc_cta_sub: "Kull al-marakat →",
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
      china_title: "Jumla", china_sub: "Asaar",
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
      have_account: "Hisab?", china_seller: "Sini",
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
      stats_parts: "Parca", stats_sellers: "Satici",
      stats_countries: "Ulke", stats_langs: "Dil",
      featured: "One Cikan", featured_sub: "Son", view_all: "Tumu",
      vc_cat_btn: "Tum Kategoriler", vc_tree: [{"l":"Motor & Aktarma Organları","subs":[{"g":"Motor Bloğu & Bileşenler","items":["Motor Bloğu","Silindir Kapağı","Subap Kapağı","Yağ Karteri","Pistonlar","Piston Segmanları","Eksantrik Mili","Krank Mili"]},{"g":"Triger Sistemi","items":["Triger Kayışı","Triger Zinciri","Zincir Gergisi","Rölanti Rölesi","Triger Kayışı Kiti","Triger Zinciri Kiti"]},{"g":"Yakıt Sistemi","items":["Yakıt Enjektörleri","Yakıt Pompası","Yüksek Basınçlı Pompa","Yakıt Filtresi","Yakıt Rayı","Basınç Regülatörü","Yakıt Basınç Sensörü"]},{"g":"Hava Emişi","items":["Hava Filtresi","Emme Manifoldu","Ara Soğutucu","Turboşarjer","Gaz Kelebeği","Hava Akış Sensörü","Emme Hortumu"]},{"g":"Soğutma Sistemi","items":["Radyatör","Termostat","Su Pompası","Genleşme Tankı","Soğutma Hortumu","Soğutma Fanı","Viskoz Kavrama","Soğutma Suyu Sıcaklık Sensörü"]},{"g":"Yağlama Sistemi","items":["Yağ Filtresi","Yağ Pompası","Yağ Basınç Sensörü","Karter Havalandırma","Yağ Soğutucu","Yağ Çubuğu"]},{"g":"Debriyaj & Şanzıman","items":["Debriyaj Seti","Çift Kütleli Volan","Şanzıman Rulmanlı","Tahrik Mili","CV Mafsalı","Baskı Rulmanlı","Vites Bağlantısı","Şanzıman Keçesi"]}]},{"l":"Fren Sistemi","subs":[{"g":"Fren Balataları","items":["Ön Fren Balataları","Arka Fren Balataları","Spor Fren Balataları","Uyarı Sensörlü Balata Seti"]},{"g":"Fren Diskleri","items":["Havalandırmalı Diskler","Düz Diskler","Delikli Diskler","Spor Diskler","Fren Disk Seti"]},{"g":"Fren Kaliperleri & Silindirleri","items":["Ön Fren Kaliperi","Arka Fren Kaliperi","Fren Pabuçları","Tekerlek Silindiri","Kaliper Tamir Kiti"]},{"g":"ABS / ESP Sensörleri","items":["ABS Sensörü","Tekerlek Hız Sensörü","ABS Kontrol Ünitesi","ABS Pompası","ESP Sensörü"]},{"g":"Fren Boruları","items":["Fren Hortumları","Fren Boruları","Dağıtıcı Blok","Boru Seti","Fren Hidroliği Haznesi"]},{"g":"El Freni","items":["El Freni Kablosu","El Freni Kolu","EPB Motoru","Arka Fren Pabuçları","Fren Kampanası"]}]},{"l":"Süspansiyon & Direksiyon","subs":[{"g":"Amortisörler & Yaylar","items":["Ön Amortisörler","Arka Amortisörler","Sarmal Yaylar","Üst Taşıyıcı","Tampon","Körük","Spor Süspansiyon Kiti","Hava Süspansiyonu"]},{"g":"Direksiyon","items":["Rot Başı","Rot","Bağlantı Çubuğu","Direksiyon Kutusu","Servo Pompa","Direksiyon Körüğü","Direksiyon Mili","Direksiyon Açı Sensörü"]},{"g":"Aks Parçaları","items":["Salıncak","Rotil","Stabilizatör Burcu","Stabilizatör Çubuğu","Stabilizatör Bağlantısı","Aksiyel Mili","Alt Şasi","Susturucu Burç"]},{"g":"Tekerlek Rulmanları","items":["Ön Tekerlek Rulmanı","Arka Tekerlek Rulmanı","Tekerlek Göbeği","Rulman Kiti","Göbek Somunu"]}]},{"l":"Elektrik & Sensörler","subs":[{"g":"Akü & Şarj","items":["Araç Aküsü","Alternatör","Marş Motoru","Voltaj Regülatörü","Şarj Kablosu","Akü Kutbu","Akü Sensörü"]},{"g":"Aydınlatma","items":["Far","Arka Lamba","Sinyal","Sis Lambası","Gündüz Farları","LED Modül","Ampuller","Far Yıkayıcı"]},{"g":"Sensörler","items":["Hava Akış Sensörü","MAP Sensörü","Lambda Sensörü","Krank Mili Sensörü","Eksantrik Sensörü","NOx Sensörü","Egzoz Gazı Sıcaklık Sensörü","Vuruntu Sensörü"]},{"g":"Kontrol Üniteleri","items":["Motor ECU","ABS Kontrol Ünitesi","Karoser Kontrol Modülü","Airbag Modülü","Şanzıman Kontrol Ünitesi"]},{"g":"Anahtarlar & Kumandalar","items":["Cam Düğmesi","Sinyal Kolu","Kontak Anahtarı","Korna","Ayna Kumandası","Merkezi Kilit Modülü"]}]},{"l":"Filtreler","subs":[{"g":"Hava Filtreleri","items":["Benzinli Motor Hava Filtresi","Dizel Hava Filtresi","Spor Hava Filtresi","Panel Filtre"]},{"g":"Yağ Filtreleri","items":["Kartuş Yağ Filtresi","Vidalı Yağ Filtresi","Yağ Filtre Konut","Yağ Filtre Seti"]},{"g":"Yakıt Filtreleri","items":["Dizel Yakıt Filtresi","Benzin Yakıt Filtresi","Sıralı Filtre","Ön Filtre"]},{"g":"Polen Filtreleri","items":["Polen Filtresi","Aktif Karbonlu Filtre","Kombine Filtre","Kabin Filtre Seti"]}]},{"l":"Kaporta & Dış Mekan","subs":[{"g":"Tamponlar","items":["Ön Tampon","Arka Tampon","Tampon Braketi","Alt Karın Koruma","Çeki Kancası Kapağı"]},{"g":"Çamurluğlar & Paneller","items":["Çamurluk","Kaput","Bagaj Kapağı","Kapı Paneli","Eşik","Tavan Rayı"]},{"g":"Aynalar","items":["Ayna Camı","Ayna Kasası","Ayna Motoru","Isıtma Elemanı","Dış Ayna Kapağı"]},{"g":"Cam Mekanizmaları","items":["Cam Motoru","Cam Mekanizması","Cam","Cam Contası"]},{"g":"Kilitler & Kapama Sistemleri","items":["Kapı Kilidi","Merkezi Kilit","Kapı Kilidi Aktüatörü","Kilit Silindiri","Kaput Kablosu","Yakıt Kapağı"]}]},{"l":"İç Mekan & Konfor","subs":[{"g":"Koltuklar & Mekanizmalar","items":["Koltuk Rayı","Koltuk Başlığı","Koltuk Kılıfı","Koltuk Isıtması","Koltuk Ayarı","Arkalık Kilidi"]},{"g":"Gösterge Paneli & Döşeme","items":["Gösterge Paneli","Orta Konsol","Torpido Gözü","Güneşlik","İç Kapı Kolu","Halı"]},{"g":"Klima","items":["Klima Kompresörü","Klima Kondenseri","Evaporatör","Genleşme Valfi","Klima Basınç Şalteri","Kurutucu","Klima Hattı"]},{"g":"Isıtma","items":["Isıtma Radyatörü","Isıtma Fanı Motoru","Fan Direnci","Isıtma Musluğu","Isıtma Hortumu"]}]},{"l":"Egzoz Sistemi","subs":[{"g":"Egzoz Manifoldu","items":["Egzoz Manifoldu","Turbo Manifoldu","Manifold Contası","Manifold Saplaması"]},{"g":"Katalitik Konvertör","items":["Oksidasyon Katalizatörü","Üç Yollu Katalizatör","Dizel Oksidasyon Katalizatörü","Ön Katalizatör"]},{"g":"Partikül Filtresi","items":["Dizel DPF","Benzinli OPF","DPF Basınç Sensörü","DPF Sıcaklık Sensörü"]},{"g":"Susturucu & Borular","items":["Arka Susturucu","Orta Susturucu","Orta Boru","Ara Boru","Esnek Boru","Egzoz Askısı"]},{"g":"Lambda Sensörleri","items":["Kat Öncesi Lambda","Kat Sonrası Lambda","Geniş Bant Lambda","NOx Sensörü","Isıtmalı Sensör"]}]},{"l":"Tekerlekler & Lastikler","subs":[{"g":"Jantlar","items":["Alüminyum Jant","Çelik Jant","Krom Jant","Spor Jant","Kış Jantı","Komple Tekerlek"]},{"g":"Lastikler","items":["Yaz Lastiği","Kış Lastiği","4 Mevsim Lastiği","Run-Flat","Spor Lastik","SUV Lastik","Arazi Lastiği"]},{"g":"TPMS Sensörleri","items":["TPMS Sensörü","TPMS Valfi","TPMS Kontrol Ünitesi","TPMS Programlama Aleti"]},{"g":"Tekerlek Civata & Somunları","items":["Tekerlek Cıvataları","Tekerlek Somunları","Tekerlek Saplamaları","Göbek Kapağı","Lastik Valfi","Tekerlek Aralayıcı"]}]},{"l":"Yağlar, Sıvılar & Kimyasallar","subs":[{"g":"Motor Yağı","items":["5W-30","5W-40","10W-40","0W-20","0W-30","Dizel Motor Yağı","Tam Sentetik","Yarı Sentetik","Longlife Yağ"]},{"g":"Şanzıman Yağı","items":["Manuel Şanzıman Yağı","Otomatik ATF","DSG / DCT Yağı","Aks Yağı","Diferansiyel Yağı"]},{"g":"Fren Hidroliği","items":["DOT 4","DOT 5.1","DOT 3","Long Life Fren Hidroliği"]},{"g":"Antifriz","items":["G12 Antifriz","G13 Antifriz","OAT Antifriz","Antifriz Konsantresi","Kullanıma Hazır"]},{"g":"Katkı Maddeleri & Kimyasallar","items":["Yağ Katkısı","Yakıt Katkısı","DPF Temizleyici","Klima Dezenfektanı","Fren Temizleyici","Zincir Yağı"]}]},{"l":"Aksesuar & Aşınan Parçalar","subs":[{"g":"Silecek Lastikleri","items":["Düz Silecek","Konvansiyonel Silecek","Arka Silecek","Silecek Kolu","Fıskiye"]},{"g":"Ampuller","items":["H4 Halojen","H7 Halojen","LED Dönüşüm Kiti","Xenon D1S","Xenon D2S","İç Mekan Ampulü","W5W Marker Lambası"]},{"g":"Sigortalar","items":["Bıçak Sigorta","Kartuş Sigorta","Sigorta Kutusu","Röle","Röle Kutusu"]},{"g":"Kayışlar & Gergi Mekanizması","items":["V Kayışı","Kanallı Kayış","Poly-V Seti","Gergi Rölesi","Rölanti Rölesi","Alternatör Freewheel"]}]}], vc_cta: "Oto Yedek Parca", vc_cta_sub: "Tum marka & modeller →",
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
      categories: "Kategori", china_title: "Cin Toptan", china_sub: "Fabrika",
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
      have_account: "Hesap?", china_seller: "Cinli",
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
      origin: "Koken", china_only: "Cin", search: "Ara",
      reset: "Sifirla", load_more: "Daha", showing: "Gosterilen",
      of: "/", parts: "parca" },
    shop: { african: "Afrikali", china: "Cinli", no_shops: "Yok.",
      products_from: "Urunler", whatsapp: "WhatsApp", wechat: "WeChat",
      alibaba: "Alibaba", pending: "Bekliyor.", create: "Olustur", save: "Kaydet" },
    footer: { tagline: "Pazaryeri.", marketplace: "Pazar",
      browse: "Gozat", sell: "Sat", china_w: "Cin", support: "Destek",
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
      hero_title_em: "Haraka", hero_sub: "Vipande vipya",
      search_ph: "Jina, OEM...", search_btn: "Tafuta",
      stats_parts: "Vipande", stats_sellers: "Wauzaji",
      stats_countries: "Nchi", stats_langs: "Lugha",
      featured: "Maarufu", featured_sub: "Karibuni", view_all: "Vyote",
      vc_cat_btn: "Aina Zote", vc_tree: [{"l":"Injini & Mfumo wa Uendeshaji","subs":[{"g":"Bloku la Injini & Vipande","items":["Bloku la Injini","Kichwa cha Silinda","Kifuniko cha Valvu","Bakuli la Mafuta","Pistoni","Pete za Pistoni","Shimba la Kama","Shimba la Krank"]},{"g":"Mfumo wa Wakati","items":["Ukanda wa Wakati","Mnyororo wa Wakati","Msongo wa Mnyororo","Roli ya Mwongozo","Seti ya Ukanda wa Wakati","Seti ya Mnyororo wa Wakati"]},{"g":"Mfumo wa Mafuta","items":["Vinyunyizia Mafuta","Pampu ya Mafuta","Pampu ya Shinikizo Juu","Kichungi cha Mafuta","Rail ya Mafuta","Mdhibiti wa Shinikizo","Sensa ya Shinikizo la Mafuta"]},{"g":"Uingizaji Hewa","items":["Kichungi cha Hewa","Kivuma cha Hewa","Kiimarisha Hewa","Turbo Charger","Valve ya Hewa","Kipimo cha Mtiririko wa Hewa","Hose ya Hewa"]},{"g":"Mfumo wa Kupoza","items":["Radiyeta","Thermostat","Pampu ya Maji","Tanki la Upanuzi","Hose ya Kupoza","Feni ya Kupoza","Umunganisho wa Viscous","Sensa ya Joto la Maji"]},{"g":"Mfumo wa Mafuta ya Kulinika","items":["Kichungi cha Mafuta ya Injini","Pampu ya Mafuta ya Injini","Sensa ya Shinikizo la Mafuta","Mwingizo wa Hewa","Kipoza Mafuta","Kipande cha Kupima Mafuta"]},{"g":"Klachi & Gearbox","items":["Seti ya Klachi","Magurudumu Mawili","Beari ya Gearbox","Shimba la Uendeshaji","Yunitihomosinetic","Beari ya Ukandamizaji","Ufungo wa Gearbox","Muhuri wa Gearbox"]}]},{"l":"Mfumo wa Breki","subs":[{"g":"Pedi za Breki","items":["Pedi za Mbele","Pedi za Nyuma","Pedi za Michezo","Seti ya Pedi na Sensa"]},{"g":"Diski za Breki","items":["Diski Zilizowashwa Upepo","Diski Imara","Diski Zilizopigwa Mashimo","Diski za Michezo","Seti ya Diski"]},{"g":"Kalipa & Silinda","items":["Kalipa ya Mbele","Kalipa ya Nyuma","Viatu vya Breki","Silinda ya Gurudumu","Seti ya Kurekebisha Kalipa"]},{"g":"Sensa za ABS / ESP","items":["Sensa ya ABS","Sensa ya Kasi ya Gurudumu","Kitengo cha Kudhibiti ABS","Pampu ya ABS","Sensa ya ESP"]},{"g":"Mabomba ya Breki","items":["Hose za Breki","Mabomba ya Breki","Bloku la Mgawanyo","Seti ya Mabomba","Hifadhi ya Maji ya Breki"]},{"g":"Breki ya Mkono","items":["Waya wa Breki ya Mkono","Mkono wa Breki","Motor ya EPB","Viatu vya Nyuma","Ngoma ya Breki"]}]},{"l":"Mfumo wa Kusimamia & Uendeshaji","subs":[{"g":"Vifaa vya Kusimamia & Chemchemi","items":["Msimamizi wa Mbele","Msimamizi wa Nyuma","Chemchemi za Helical","Kiti cha Juu","Kizuizi","Kofia ya Ulinzi","Seti ya Kusimamia Michezo","Kusimamia kwa Hewa"]},{"g":"Mfumo wa Uendeshaji","items":["Kichwa cha Fimbo ya Uendeshaji","Fimbo ya Uendeshaji","Fimbo ya Kuunganisha","Rack ya Uendeshaji","Pampu ya Uendeshaji wa Power","Kofia ya Uendeshaji","Nguzo ya Uendeshaji","Sensa ya Pembe ya Uendeshaji"]},{"g":"Sehemu za Mhimili","items":["Mkono wa Kudhibiti","Mpira wa Kuunganisha","Bushi ya Fimbo ya Uthabiti","Fimbo ya Uthabiti","Kiungo cha Uthabiti","Mhimili wa Uendeshaji","Muundo Mdogo","Bushi ya Mpira"]},{"g":"Beari za Gurudumu","items":["Beari ya Gurudumu la Mbele","Beari ya Gurudumu la Nyuma","Kitovu cha Gurudumu","Seti ya Beari","Nati ya Kitovu"]}]},{"l":"Umeme & Sensa","subs":[{"g":"Betri & Kuchaji","items":["Betri ya Gari","Jenereta","Motor ya Kuanzisha","Mdhibiti wa Voltage","Kebo ya Kuchaji","Klapu ya Betri","Sensa ya Betri"]},{"g":"Taa","items":["Taa za Mbele","Taa za Nyuma","Taa za Ishara","Taa za Ukungu","Taa za Mchana","Moduli ya LED","Balbu","Kisafishaji Taa"]},{"g":"Sensa","items":["Sensa ya Mtiririko wa Hewa","Sensa ya MAP","Sensa ya Lambda","Sensa ya Krank","Sensa ya Kama","Sensa ya NOx","Sensa ya Joto la Gesi","Sensa ya Mapigano"]},{"g":"Vitengo vya Kudhibiti","items":["ECU ya Injini","Kitengo cha Kudhibiti ABS","Moduli ya Udhibiti wa Mwili","Moduli ya Airbag","Kitengo cha Kudhibiti Gearbox"]},{"g":"Vitufe & Vidhibiti","items":["Kitufe cha Glasi","Nguzo ya Ishara","Ufunguo wa Kuwasha","Pembe","Kidhibiti cha Kioo","Moduli ya Kufunga Kati"]}]},{"l":"Vichungi","subs":[{"g":"Vichungi vya Hewa","items":["Kichungi cha Hewa cha Benzini","Kichungi cha Hewa cha Dizeli","Kichungi cha Hewa cha Michezo","Kichungi cha Paneli"]},{"g":"Vichungi vya Mafuta ya Injini","items":["Kichungi cha Mafuta cha Cartridge","Kichungi cha Mafuta cha Screwable","Nyumba ya Kichungi cha Mafuta","Seti ya Kichungi cha Mafuta"]},{"g":"Vichungi vya Petroli","items":["Kichungi cha Mafuta cha Dizeli","Kichungi cha Mafuta cha Benzini","Kichungi cha Inline","Kichungi cha Awali"]},{"g":"Vichungi vya Cabin","items":["Kichungi cha Poleni","Kichungi cha Carbon Iliyoanzishwa","Kichungi cha Mchanganyiko","Seti ya Kichungi cha Cabin"]}]},{"l":"Mwili wa Gari & Nje","subs":[{"g":"Bumper","items":["Bumper ya Mbele","Bumper ya Nyuma","Msimamizi wa Bumper","Kinga ya Chini","Kifuniko cha Ndoano ya Kukokota"]},{"g":"Mabawa & Paneli","items":["Bawa","Bonnet","Mlango wa Nyuma","Paneli ya Mlango","Kizingiti","Rail ya Dari"]},{"g":"Vioo","items":["Kioo cha Kioo","Nyumba ya Kioo","Motor ya Kioo","Kipengele cha Joto","Kifuniko cha Kioo cha Nje"]},{"g":"Mifumo ya Kuinua Glasi","items":["Motor ya Kuinua Glasi","Utaratibu wa Kuinua Glasi","Glasi ya Dirisha","Muhuri wa Glasi"]},{"g":"Malfungo & Mifumo ya Kufunga","items":["Kufuli cha Mlango","Kufunga Kati","Actuator ya Kufuli","Silinda ya Kufuli","Kebo ya Bonnet","Kifuniko cha Tanki ya Mafuta"]}]},{"l":"Ndani ya Gari & Starehe","subs":[{"g":"Viti & Mifumo","items":["Rail ya Kiti","Kitegemeo cha Kichwa","Kufunika Kiti","Kupasha Joto Kiti","Kurekebisha Kiti","Kufuli cha Mgongo"]},{"g":"Dashibodi & Mapambo","items":["Dashibodi","Konsol ya Kati","Sanduku la Glavu","Kizuia Jua","Mpini wa Mlango wa Ndani","Zulia"]},{"g":"Kiyoyozi","items":["Kompresori ya AC","Kondensa ya AC","Evaporeta","Valve ya Upanuzi","Swichi ya Shinikizo la AC","Kikausha","Bomba la AC"]},{"g":"Mfumo wa Joto","items":["Radiyeta ya Joto","Motor ya Feni ya Joto","Kipinga cha Feni","Bomba la Joto","Hose ya Joto"]}]},{"l":"Mfumo wa Ekzosti","subs":[{"g":"Manifold ya Ekzosti","items":["Manifold ya Ekzosti","Manifold ya Turbo","Gasket ya Manifold","Pini ya Manifold"]},{"g":"Kisafishaji Kemikali","items":["Kisafishaji cha Oksidi","Kisafishaji cha Njia Tatu","Kisafishaji cha Dizeli","Kisafishaji cha Awali"]},{"g":"Kichungi cha Chembe","items":["DPF ya Dizeli","OPF ya Benzini","Sensa ya Shinikizo la DPF","Sensa ya Joto la DPF"]},{"g":"Kisimamizi & Mabomba","items":["Kisimamizi cha Nyuma","Kisimamizi cha Katikati","Bomba la Katikati","Bomba la Kati","Bomba Linaloinama","Msimamizi wa Ekzosti"]},{"g":"Sensa za Lambda","items":["Lambda Kabla ya Kisafishaji","Lambda Baada ya Kisafishaji","Lambda ya Upana Mpana","Sensa ya NOx","Sensa yenye Joto"]}]},{"l":"Magurudumu & Matairi","subs":[{"g":"Rimi","items":["Rimi za Alum","Rimi za Chuma","Rimi za Krome","Rimi za Michezo","Rimi za Baridi","Gurudumu Kamili"]},{"g":"Matairi","items":["Matairi ya Kiangazi","Matairi ya Baridi","Matairi ya Majira Yote","Run-Flat","Matairi ya Michezo","Matairi ya SUV","Matairi ya Off-Road"]},{"g":"Sensa za TPMS","items":["Sensa ya TPMS","Valve ya TPMS","Kitengo cha Kudhibiti TPMS","Chombo cha Kupanga TPMS"]},{"g":"Bolti & Nati za Gurudumu","items":["Bolti za Gurudumu","Nati za Gurudumu","Viganja vya Gurudumu","Kifuniko cha Kitovu","Valve ya Tairi","Kipanzi cha Gurudumu"]}]},{"l":"Mafuta, Vinywaji & Kemikali","subs":[{"g":"Mafuta ya Injini","items":["5W-30","5W-40","10W-40","0W-20","0W-30","Mafuta ya Injini ya Dizeli","Synthetic Kamili","Semi-Synthetic","Longlife"]},{"g":"Mafuta ya Gearbox","items":["Mafuta ya Gearbox ya Mkono","Mafuta ya ATF ya Otomatiki","Mafuta ya DSG / DCT","Mafuta ya Mhimili","Mafuta ya Differesheli"]},{"g":"Maji ya Breki","items":["DOT 4","DOT 5.1","DOT 3","Maji ya Breki ya Muda Mrefu"]},{"g":"Kibaridi","items":["Kibaridi G12","Kibaridi G13","Kibaridi OAT","Mkusanyiko wa Kibaridi","Kibaridi Tayari Kutumika"]},{"g":"Vongeza & Kemikali","items":["Ongeza la Mafuta","Ongeza la Petroli","Kisafishaji DPF","Dawa ya AC","Kisafishaji Breki","Mafuta ya Mnyororo"]}]},{"l":"Vifaa & Vipande vya Kuchakaa","subs":[{"g":"Blade za Mfuta","items":["Blade Tambarare","Blade ya Kawaida","Blade ya Nyuma","Mkono wa Mfuta","Dawa ya Maji"]},{"g":"Balbu","items":["H4 Halojeni","H7 Halojeni","Seti ya LED ya Ubadilishaji","Xenon D1S","Xenon D2S","Balbu ya Ndani","W5W Mwanga wa Msimamo"]},{"g":"Fyuzi","items":["Fyuzi za Blade","Fyuzi ya Cartridge","Sanduku la Fyuzi","Relay","Sanduku la Relay"]},{"g":"Mikanda & Roli","items":["Ukanda wa V","Ukanda wa Poly-V","Seti ya Poly-V","Roli ya Mvutano","Roli ya Mwongozo","Gurudumu Huru la Jenereta"]}]}], vc_cta: "Vipande Gari", vc_cta_sub: "Aina zote →",
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
      categories: "Aina", china_title: "China", china_sub: "Bei kiwanda",
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
      have_account: "Akaunti?", china_seller: "China",
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
      origin: "Asili", china_only: "China", search: "Tafuta",
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
      stats_parts: "Bibelelo", stats_sellers: "Babateli",
      stats_countries: "Pays", stats_langs: "Minoko",
      featured: "Malamu", featured_sub: "Sika", view_all: "Nyonso",
      vc_cat_btn: "Mitindo Nyonso", vc_tree: [{"l":"Moteur & Système d'Entraînement","subs":[{"g":"Bloka ya Moteur & Bibelelo","items":["Bloka ya Moteur","Culasse","Couvercle Soupapes","Carter Huile","Pistons","Anneaux Piston","Arbre Cames","Vilebrequin"]},{"g":"Distribution","items":["Courroie Distribution","Chaîne Distribution","Tendeur Chaîne","Galet Enrouleur","Kit Courroie Distribution","Kit Chaîne Distribution"]},{"g":"Système Carburant","items":["Injecteurs","Pompe Carburant","Pompe Haute Pression","Filtre Carburant","Rail Injecteurs","Régulateur Pression","Capteur Pression Carburant"]},{"g":"Admission Air","items":["Filtre Air","Collecteur Admission","Intercooler","Turbo","Corps Papillon","Débitmètre Air","Durite Admission"]},{"g":"Refroidissement","items":["Radiateur","Thermostat","Pompe Eau","Vase Expansion","Durite Refroidissement","Ventilateur","Visco-coupleur","Sonde Température Eau"]},{"g":"Lubrification","items":["Filtre Huile","Pompe Huile","Capteur Pression Huile","Reniflard","Refroidisseur Huile","Jauge Huile"]},{"g":"Embrayage & Boîte","items":["Kit Embrayage","Volant Bimasse","Roulement Boîte","Arbre Transmission","Joint Homo","Butée Embrayage","Tringle Vitesses","Joint Boîte"]}]},{"l":"Système Frein","subs":[{"g":"Plaquettes Frein","items":["Plaquettes Avant","Plaquettes Arrière","Plaquettes Sport","Jeu Plaquettes avec Témoin"]},{"g":"Disques Frein","items":["Disques Ventilés","Disques Pleins","Disques Percés","Disques Sport","Jeu Disques Frein"]},{"g":"Étriers & Cylindres","items":["Étrier Avant","Étrier Arrière","Mâchoires","Cylindre Roue","Kit Réparation Étrier"]},{"g":"Capteurs ABS / ESP","items":["Capteur ABS","Capteur Vitesse Roue","Calculateur ABS","Pompe ABS","Capteur ESP"]},{"g":"Canalisations Frein","items":["Flexibles Frein","Tuyaux Frein","Répartiteur","Jeu Canalisations","Bocal Liquide Frein"]},{"g":"Frein à Main","items":["Câble Frein Main","Levier Frein Main","Moteur EPB","Mâchoires Arrière","Tambour Frein"]}]},{"l":"Suspension & Direction","subs":[{"g":"Amortisseurs & Ressorts","items":["Amortisseurs Avant","Amortisseurs Arrière","Ressorts Hélicoïdaux","Coupelle Amortisseur","Butée","Soufflet","Kit Sport","Suspension Pneumatique"]},{"g":"Direction","items":["Rotule Direction","Rotule Axiale","Barre Direction","Crémaillère","Pompe Direction","Soufflet Direction","Colonne Direction","Capteur Angle"]},{"g":"Pièces Train Roulant","items":["Triangle Suspension","Rotule Suspension","Silent Bloc Barre","Barre Stabilisatrice","Biellette","Pivot","Berceau","Silentbloc"]},{"g":"Roulements Roue","items":["Roulement Avant","Roulement Arrière","Moyeu Roue","Kit Roulement","Écrou Moyeu"]}]},{"l":"Électrique & Capteurs","subs":[{"g":"Batterie & Charge","items":["Batterie Auto","Alternateur","Démarreur","Régulateur Tension","Câble Charge","Cosse Batterie","Capteur Batterie"]},{"g":"Éclairage","items":["Phare","Feu Arrière","Clignotant","Antibrouillard","Feux Diurnes","Module LED","Ampoules","Lave-Phare"]},{"g":"Capteurs","items":["Débitmètre Air","Capteur MAP","Sonde Lambda","Capteur Vilebrequin","Capteur Arbre Cames","Sonde NOx","Capteur Temp Gaz","Capteur Cliquetis"]},{"g":"Calculateurs","items":["Calculateur Moteur","Calculateur ABS","Module Confort","Module Airbag","Calculateur Boîte"]},{"g":"Commandes & Contacteurs","items":["Commande Vitre","Commodo","Contacteur Démarrage","Klaxon","Commande Rétroviseur","Module Verrouillage"]}]},{"l":"Filtres","subs":[{"g":"Filtres Air","items":["Filtre Air Essence","Filtre Air Diesel","Filtre Air Sport","Filtre Plat"]},{"g":"Filtres Huile","items":["Filtre Huile Cartouche","Filtre Huile Vissé","Carter Filtre Huile","Kit Filtre Huile"]},{"g":"Filtres Carburant","items":["Filtre Carburant Diesel","Filtre Carburant Essence","Filtre Ligne","Pré-Filtre"]},{"g":"Filtres Habitacle","items":["Filtre Pollen","Filtre Charbon Actif","Filtre Combiné","Kit Filtre Habitacle"]}]},{"l":"Carrosserie & Extérieur","subs":[{"g":"Pare-Chocs","items":["Pare-Chocs Avant","Pare-Chocs Arrière","Support Pare-Chocs","Protection Sous-Caisse","Cache Crochet Remorquage"]},{"g":"Ailes & Panneaux","items":["Aile","Capot","Hayon","Panneau Porte","Bas de Caisse","Baguette Toit"]},{"g":"Rétroviseurs","items":["Glace Rétroviseur","Boîtier Rétroviseur","Moteur Rétroviseur","Élément Chauffant","Coque Extérieure"]},{"g":"Lève-Vitres","items":["Moteur Lève-Vitre","Mécanisme Lève-Vitre","Vitre","Joint Vitre"]},{"g":"Serrures & Fermeture","items":["Serrure Porte","Centralisation","Actionneur Serrure","Barillet","Câble Capot","Trappe Carburant"]}]},{"l":"Intérieur & Confort","subs":[{"g":"Sièges & Mécanismes","items":["Rail Siège","Appuie-Tête","Housse Siège","Chauffage Siège","Réglage Siège","Verrou Dossier"]},{"g":"Tableau de Bord & Garnitures","items":["Tableau de Bord","Console Centrale","Vide-Poches","Pare-Soleil","Poignée Intérieure","Moquette"]},{"g":"Climatisation","items":["Compresseur Clim","Condenseur Clim","Évaporateur","Détendeur","Pressostat","Déshydrateur","Tuyau Clim"]},{"g":"Chauffage","items":["Radiateur Chauffage","Moto-Ventilateur Chauffage","Résistance Ventilateur","Robinet Chauffage","Durite Chauffage"]}]},{"l":"Ligne d'Échappement","subs":[{"g":"Collecteur d'Échappement","items":["Collecteur Échappement","Collecteur Turbo","Joint Collecteur","Goujon Collecteur"]},{"g":"Catalyseur","items":["Catalyseur Oxydation","Catalyseur Trois Voies","Catalyseur Diesel","Pré-Catalyseur"]},{"g":"Filtre à Particules","items":["FAP Diesel","FAP Essence OPF","Capteur Pression FAP","Capteur Temp FAP"]},{"g":"Silencieux & Tubes","items":["Silencieux Arrière","Silencieux Central","Tube Central","Tube Intermédiaire","Tube Flexible","Support Échappement"]},{"g":"Sondes Lambda","items":["Sonde Lambda Amont","Sonde Lambda Aval","Sonde Wideband","Sonde NOx","Sonde Chauffée"]}]},{"l":"Roues & Pneumatiques","subs":[{"g":"Jantes","items":["Jantes Alliage","Jantes Acier","Jantes Chrome","Jantes Sport","Jantes Hiver","Roue Complète"]},{"g":"Pneumatiques","items":["Pneus Été","Pneus Hiver","Pneus 4 Saisons","Run-Flat","Pneus Sport","Pneus SUV","Tout-Terrain"]},{"g":"Capteurs TPMS","items":["Capteur TPMS","Valve TPMS","Calculateur TPMS","Outil Programmation TPMS"]},{"g":"Boulons & Écrous Roue","items":["Boulons Roue","Écrous Roue","Goujons Roue","Cache Moyeu","Valve Pneu","Élargisseur Voie"]}]},{"l":"Huiles, Liquides & Produits","subs":[{"g":"Huile Moteur","items":["5W-30","5W-40","10W-40","0W-20","0W-30","Huile Diesel","100% Synthétique","Semi-Synthétique","Longlife"]},{"g":"Huile Boîte","items":["Huile Boîte Mécanique","Huile ATF Auto","Huile DSG / DCT","Huile de Pont","Huile Différentiel"]},{"g":"Liquide de Frein","items":["DOT 4","DOT 5.1","DOT 3","Liquide Frein Long Life"]},{"g":"Liquide Refroidissement","items":["Liquide G12","Liquide G13","Liquide OAT","Concentré Antigel","Liquide Prêt Emploi"]},{"g":"Additifs & Produits","items":["Additif Huile","Additif Carburant","Nettoyant FAP","Désinfectant Clim","Nettoyant Freins","Lubrifiant Chaîne"]}]},{"l":"Accessoires & Pièces d'Usure","subs":[{"g":"Balais Essuie-Glace","items":["Balai Plat","Balai Traditionnel","Balai Arrière","Bras Essuie-Glace","Gicleur"]},{"g":"Ampoules","items":["H4 Halogène","H7 Halogène","Kit LED Retrofit","Xénon D1S","Xénon D2S","Ampoule Habitacle","W5W Veilleuse"]},{"g":"Fusibles","items":["Fusibles Plats","Fusibles Cartucho","Boîtier Fusibles","Relais","Boîtier Relais"]},{"g":"Courroies & Galets","items":["Courroie Trapézoïdale","Courroie Poly-V","Kit Poly-V","Galet Tendeur","Galet Enrouleur","Roue Libre Alternateur"]}]}], vc_cta: "Bibelelo ya Vwature", vc_cta_sub: "Mitindo nyonso →",
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
      have_account: "Compte?", china_seller: "Chine",
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
      origin: "Esika", china_only: "Chine", search: "Koluka",
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
  html += '<button class="nav-brand" onclick="render(\'home\')" aria-label="AFRICARPARTS Home">';
  html += 'AFRICAR<span class="dot">P</span>ARTS<span class="tag">Africa</span></button>';
  html += '<button class="nav-link" onclick="render(\'products\')">' + t('nav.parts') + '</button>';
  html += '<button class="nav-link" onclick="render(\'shops\')">' + t('nav.shops') + '</button>';
  html += '<button class="nav-link" onclick="render(\'products\',{china_only:\'1\'})">' + t('nav.china') + '</button>';

  if (S.user) {
    if (isS) html += '<button class="nav-link" onclick="render(\'seller-dashboard\')">' + t('nav.dashboard') + '</button>';
    if (isA) html += '<button class="nav-link" onclick="render(\'admin-dashboard\')">' + t('nav.admin') + '</button>';
    html += '<button class="nav-link" onclick="render(\'my-orders\')">' + t('nav.orders') + '</button>';
    html += '<button class="nav-link" onclick="logout()" style="color:#ffbbbb">' + t('nav.logout') + '</button>';
  } else {
    html += '<button class="nav-link always-show" onclick="render(\'login\')">' + t('nav.login') + '</button>';
    html += '<button class="nav-link always-show" onclick="render(\'register\')" style="color:var(--a300);font-weight:700">+ ' + t('nav.register') + '</button>';
  }

  html += '<div class="nav-spacer"></div><div class="nav-divider"></div>';

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

  html += '<button class="nav-cart-btn" onclick="render(\'cart\')" aria-label="' + t('nav.cart') + '">';
  html += t('nav.cart') + ' <span class="cart-ct">' + cc() + '</span></button>';

  html += '<button class="burger" onclick="openMobileNav()" aria-label="Open menu">';
  html += '<span></span><span></span><span></span></button>';

  nb.innerHTML = html;

  // MOBILE NAV
  let mh = '';
  mh += '<button class="nav-mobile-close" onclick="closeMobileNav()">X Close</button>';
  mh += '<button class="nav-link" onclick="render(\'products\');closeMobileNav()">' + t('nav.parts') + '</button>';
  mh += '<button class="nav-link" onclick="render(\'shops\');closeMobileNav()">' + t('nav.shops') + '</button>';
  mh += '<button class="nav-link" onclick="render(\'products\',{china_only:\'1\'});closeMobileNav()">' + t('nav.china') + '</button>';
  if (S.user) {
    mh += '<button class="nav-link" onclick="render(\'my-orders\');closeMobileNav()">' + t('nav.orders') + '</button>';
    mh += '<button class="nav-link" onclick="render(\'cart\');closeMobileNav()">' + t('nav.cart') + ' (' + cc() + ')</button>';
    mh += '<button class="nav-link" onclick="logout();closeMobileNav()">' + t('nav.logout') + '</button>';
  } else {
    mh += '<button class="nav-link" onclick="render(\'login\');closeMobileNav()">' + t('nav.login') + '</button>';
    mh += '<button class="nav-link" onclick="render(\'register\');closeMobileNav()">+ ' + t('nav.register') + '</button>';
  }
  mh += '<div style="margin-top:1rem;padding-top:1rem;border-top:1px solid rgba(255,255,255,0.1)">';
  mh += '<select class="nav-sel" style="width:100%" onchange="chLang(this.value);closeMobileNav()">';
  Object.entries(LANGS).forEach(function (e) {
    mh += '<option value="' + e[0] + '"' + (S.lang === e[0] ? ' selected' : '') + '>' + e[1] + '</option>';
  });
  mh += '</select>';
  mh += '<select class="nav-sel" style="width:100%;margin-top:.5rem" onchange="chCurr(this.value)">';
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
  let h = '<div class="footer-grid">';
  h += '<div><div class="footer-brand">AFRICAR<span class="dot">P</span>ARTS</div>';
  h += '<p class="footer-tagline">' + t('footer.tagline') + '</p>';
  h += '<div class="footer-langs">';
  Object.entries(LANGS).forEach(function (e) {
    h += '<span class="flang" onclick="chLang(\'' + e[0] + '\')" role="button" tabindex="0">' + e[1] + '</span>';
  });
  h += '</div></div>';

  h += '<div><h4 class="footer-col">' + t('footer.marketplace') + '</h4>';
  h += '<span class="footer-link" onclick="render(\'products\')">' + t('footer.browse') + '</span>';
  h += '<span class="footer-link" onclick="render(\'shops\')">' + t('nav.shops') + '</span>';
  h += '<span class="footer-link" onclick="render(\'products\',{china_only:\'1\'})">' + t('footer.china_w') + '</span>';
 h += '<a class="footer-link" href="/seller-dashboard.html?tab=register" style="cursor:pointer">' + t('footer.sell') + '</a></div>';

  h += '<div><h4 class="footer-col">' + t('footer.support') + '</h4>';
  h += '<span class="footer-link">' + t('footer.help') + '</span>';
  h += '<span class="footer-link">' + t('footer.shipping_info') + '</span>';
  h += '<span class="footer-link">' + t('footer.returns') + '</span>';
  h += '<span class="footer-link">' + t('footer.contact') + '</span></div>';

  h += '<div><h4 class="footer-col">' + t('footer.payments') + '</h4>';
  h += '<div style="color:rgba(255,255,255,0.5);font-size:.78rem;line-height:2.1">';
  h += t('checkout.mobile_money') + '<br>' + t('checkout.bank') + '<br>' + t('checkout.cod');
  h += '<br>Card (coming soon)</div></div></div>';

  h += '<div class="footer-bot">';
  h += '<span>(c) ' + new Date().getFullYear() + ' AFRICARPARTS - ' + t('footer.rights') + '</span>';
  h += '<span><a href="/seller-dashboard.html" style="color:inherit;text-decoration:none;opacity:0.7">🛍️ Händler-Login</a></span>';
  h += '<span>' + t('footer.countries') + '</span></div>';

  $('footer').innerHTML = h;
}

/* ---------- SHARED WIDGETS ---------- */
function ticker() {
  return '<div class="ticker"><span class="ticker-lbl">PROMO</span>' +
    '<div class="ticker-scroll">' +
      '<span class="ticker-item">Engine Parts from $12 - China Direct</span>' +
      '<span class="ticker-item">Toyota/Nissan OEM Parts in stock</span>' +
      '<span class="ticker-item">Bulk orders - MOQ from 1 unit</span>' +
      '<span class="ticker-item">DHL China 5-10 days</span>' +
      '<span class="ticker-item">6 currencies supported</span>' +
      '<span class="ticker-item">Register your shop - free</span>' +
      '<span class="ticker-item">Engine Parts from $12 - China Direct</span>' +
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

  let h = '<article class="pcard" onclick="render(\'product-detail\',{id:\'' + p.id + '\'})" role="listitem">';
  h += '<div class="pcard-img"><div class="pcard-badges">';
  if (isCn) h += '<span class="pbadge pbadge-china">CN</span>';
  h += '<span class="pbadge pbadge-' + cond + '">' + t('product.' + cond) + '</span>';
  h += '</div>';
  if (p.moq && p.moq > 1) h += '<span class="pbadge-moq">MOQ ' + p.moq + '</span>';
  if (img) h += '<img src="' + esc(img) + '" alt="' + esc(p.title) + '" loading="lazy"/>';
  else h += 'Part';
  h += '</div>';
  h += '<div class="pcard-body">';
  h += '<div class="pcard-title">' + esc(p.title) + '</div>';
  h += '<div class="pcard-meta">';
  if (p.brand) h += '<span>' + esc(p.brand) + '</span>';
  if (p.location) h += '<span class="loc">' + esc(p.location) + '</span>';
  h += '</div>';
  h += '<div class="pcard-foot">';
  h += '<span class="pcard-price">' + fmt(p.price_usd) + '</span>';
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
  let prods = [], cats = [], cnProds = [];
  try {
    const arr = await Promise.all([
      apiReq('/products?limit=8', 'GET', null, false).catch(() => ({ data: [] })),
      apiReq('/admin/categories', 'GET', null, false).catch(() => []),
      apiReq('/products?limit=4&china_only=1', 'GET', null, false).catch(() => ({ data: [] }))
    ]);
    prods = arr[0].data || arr[0].products || [];
    cats = Array.isArray(arr[1]) ? arr[1] : (arr[1].data || []);
    cnProds = arr[2].data || arr[2].products || [];
  } catch (e) {}

  const features = t('home.features');

  const heroBanners = await renderBannerRotator();
  let h = '<section class="hero">' + heroBanners + '<div class="hero-inner">';
  h += '<div class="hero-badge">' + t('home.hero_badge') + '</div>';
  h += '<h1>' + t('home.hero_title') + ' <em>' + t('home.hero_title_em') + '</em></h1>';
  h += '<p>' + t('home.hero_sub') + '</p>';

  h += '<div class="search-bar" role="search">';
  h += '<select class="sb-cat" id="hCat"><option value="">All Categories</option>';
  cats.forEach(function (c) {
    h += '<option value="' + c.id + '">' + esc(c['name_' + S.lang] || c.name) + '</option>';
  });
  h += '</select>';
  h += '<input type="search" id="hsearch" placeholder="' + t('home.search_ph') + '" onkeydown="if(event.key===\'Enter\')doSearch()"/>';
  h += '<button onclick="doSearch()">' + t('home.search_btn') + '</button>';
  h += '</div>';

  h += '<div class="hero-stats">';
  h += '<div class="hstat"><strong>10000+</strong><span>' + t('home.stats_parts') + '</span></div>';
  h += '<div class="hstat"><strong>500+</strong><span>' + t('home.stats_sellers') + '</span></div>';
  h += '<div class="hstat"><strong>20+</strong><span>' + t('home.stats_countries') + '</span></div>';
  h += '<div class="hstat"><strong>9</strong><span>' + t('home.stats_langs') + '</span></div>';
  h += '</div></div></section>';

  // Fahrzeug-Konsole direkt unter Hero-Suche
  h += '<div class="page-wrap" style="padding-top:1.5rem;padding-bottom:.5rem">';

  // ── Toolbar: Kategorien-Button + CTA ──
  h += '<div style="display:flex;gap:.75rem;margin-bottom:1.25rem;position:relative">';

  // Kategorien-Button (Autodoc-Stil)
  h += '<button id="vc-cat-toggle" onclick="vcToggle()" style="display:flex;align-items:center;gap:.6rem;background:var(--p700);color:#fff;font-family:var(--fh);font-size:1rem;font-weight:700;letter-spacing:.03em;text-transform:uppercase;padding:.9rem 1.25rem;border-radius:var(--r12);border:none;cursor:pointer;white-space:nowrap;flex-shrink:0;transition:background .15s"'
     + ' onmouseover="this.style.background=\'var(--p600)\'" onmouseout="this.style.background=\'var(--p700)\'">'
     + '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>'
     + t('home.vc_cat_btn') + '</button>';

  // CTA-Button
  h += '<a href="javascript:void(0)" onclick="render(\'products\')" style="display:flex;align-items:center;gap:.75rem;background:var(--a500);color:#fff;font-family:var(--fh);font-size:1.2rem;font-weight:700;letter-spacing:.03em;text-transform:uppercase;padding:.9rem 1.75rem;border-radius:var(--r12);border:none;cursor:pointer;box-shadow:0 4px 18px rgba(232,99,0,.35);text-decoration:none;flex:1;justify-content:center;box-sizing:border-box">'
     + '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>'
     + t('home.vc_cta') + '<span style="font-family:var(--fb);font-size:.78rem;font-weight:500;opacity:.82;text-transform:none;margin-left:auto">' + t('home.vc_cta_sub') + '</span></a>';

  h += '</div>'; // end toolbar

  // ── Kategorie-Mega-Dropdown ──
  h += '<div id="vc-cat-panel" style="display:none;background:var(--surface);border:1.5px solid var(--border);border-radius:var(--r12);box-shadow:var(--shc);overflow:hidden;margin-bottom:1.25rem">';

  // Inline CSS for panel (mobile-first)
  h += '<style>'
  + '.vcp-flex{display:flex;min-height:460px}'
  + '.vcp-left{width:240px;flex-shrink:0;overflow-y:auto;border-right:1px solid var(--border);background:var(--surface2)}'
  + '.vcp-right{flex:1;padding:1.25rem 1.5rem;overflow-y:auto;max-height:460px}'
  + '.vcp-item{display:flex;align-items:center;gap:.55rem;padding:.65rem 1rem;cursor:pointer;border-left:3px solid transparent;font-size:.85rem;font-weight:600;color:var(--text);transition:all .12s}'
  + '.vcp-item:hover,.vcp-item.active{border-left-color:var(--a500);background:var(--a050);color:var(--a500)}'
  + '.vcp-grp-title{font-size:.68rem;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--text3);margin:.85rem 0 .35rem;padding-bottom:.3rem;border-bottom:1px solid var(--border)}'
  + '.vcp-grp-title:first-child{margin-top:0}'
  + '.vcp-chips{display:flex;flex-wrap:wrap;gap:.3rem .4rem;margin-bottom:.5rem}'
  + '.vcp-chip{background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:.3rem .65rem;font-size:.8rem;font-weight:500;color:var(--text);cursor:pointer;transition:all .12s;white-space:nowrap}'
  + '.vcp-chip:hover{border-color:var(--a400);color:var(--a500);background:var(--a050)}'
  + '@media(max-width:600px){'
  + '.vcp-flex{flex-direction:column;min-height:0}'
  + '.vcp-left{width:100%;border-right:none;border-bottom:1px solid var(--border);max-height:185px;display:flex;flex-wrap:wrap;padding:.35rem}'
  + '.vcp-item{padding:.4rem .6rem;font-size:.8rem;border-left:none;border-radius:6px;flex-basis:auto}'
  + '.vcp-item.active{background:var(--a500);color:#fff}'
  + '.vcp-right{max-height:280px}'
  + '}'
  + '</style>';

  // Left: 11 main categories from vc_tree
  var vcTreeData = t('home.vc_tree') || [];
  var vcTreeIcons = [
    '<circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>',
    '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="8.34" y2="8.34"/><line x1="15.66" y1="15.66" x2="19.07" y2="19.07"/><line x1="4.93" y1="19.07" x2="8.34" y2="15.66"/><line x1="15.66" y1="8.34" x2="19.07" y2="4.93"/>',
    '<path d="M12 2L2 12h3v8h14v-8h3L12 2z"/>',
    '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
    '<rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
    '<path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1H6v-1a2 2 0 0 0-4 0z"/>',
    '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1"/><path d="M4 20s1-1 4-1 5 2 8 2 4-1 4-1"/><path d="M6 4l-2 8"/><path d="M10 4l-2 8"/>',
    '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="22"/><line x1="2" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="22" y2="12"/>',
    '<path d="M12 2c0 0-7 8.5-7 13a7 7 0 0 0 14 0c0-4.5-7-13-7-13z"/><path d="M9.09 12a3 3 0 0 0 5.83 1"/>',
    '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'
  ];

  h += '<div class="vcp-flex"><div class="vcp-left" id="vcp-left">';
  vcTreeData.forEach(function(cat, idx) {
    h += '<div class="vcp-item' + (idx===0?' active':'') + '" data-idx="' + idx + '"'
       + ' onclick="vcpShow(' + idx + ')" onmouseover="vcpShow(' + idx + ')">'
       + '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (vcTreeIcons[idx] || vcTreeIcons[10]) + '</svg>'
       + '<span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(cat.l) + '</span>'
       + '<svg class="vcp-arr" style="opacity:.3;flex-shrink:0" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>'
       + '</div>';
  });
  h += '</div>';

  // Right: subcategories + components (filled by JS)
  h += '<div class="vcp-right" id="vcp-right">';
  h += '<h3 id="vcp-title" style="font-family:var(--fh);font-size:1.1rem;font-weight:800;color:var(--text);margin-bottom:1rem;padding-bottom:.5rem;border-bottom:2px solid var(--a500)"></h3>';
  h += '<div id="vcp-body"></div>';
  h += '</div>';
  h += '</div></div>';

  // Embed translated tree for display + English tree for search queries
  var vcTreeEN = (I18N && I18N.en && I18N.en.home && I18N.en.home.vc_tree) || vcTreeData;
  h += '<script>var _VCT=' + JSON.stringify(vcTreeData) + ';var _VCT_EN=' + JSON.stringify(vcTreeEN) + ';</script>';

  // ── 9 Kategorie-Cards Grid ──
  h += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.85rem">';
  var vcIcons = [
    '<rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
    '<circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6h2l3 5H9l2-5h4z"/><path d="M9 11l-3.5 6.5"/><path d="M15 6l-2 5"/>',
    '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="22"/><line x1="2" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="22" y2="12"/>',
    '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="2"/><line x1="12" y1="2" x2="12" y2="10"/><line x1="12" y1="14" x2="12" y2="22"/><line x1="2" y1="12" x2="10" y2="12"/><line x1="14" y1="12" x2="22" y2="12"/><line x1="4.93" y1="4.93" x2="10.54" y2="10.54"/><line x1="13.46" y1="13.46" x2="19.07" y2="19.07"/><line x1="19.07" y1="4.93" x2="13.46" y2="10.54"/><line x1="10.54" y1="13.46" x2="4.93" y2="19.07"/>',
    '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>',
    '<path d="M12 2c0 0-7 8.5-7 13a7 7 0 0 0 14 0c0-4.5-7-13-7-13z"/><path d="M12 12v5"/><path d="M9 14l3-2 3 2"/>',
    '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
    '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="8.34" y2="8.34"/><line x1="15.66" y1="15.66" x2="19.07" y2="19.07"/><line x1="4.93" y1="19.07" x2="8.34" y2="15.66"/><line x1="15.66" y1="8.34" x2="19.07" y2="4.93"/>'
  ];
  var vcData = t('home.vc') || [];
  vcData.forEach(function(vc, idx) {
    h += '<div onclick="render(\'products\',{q:\'' + vc.q + '\'})" style="background:var(--surface);border:1.5px solid var(--border);border-radius:var(--r12);padding:1.1rem .85rem .9rem;display:flex;flex-direction:column;align-items:center;gap:.45rem;cursor:pointer;box-shadow:var(--sh);transition:var(--tr)"'
       + ' onmouseover="this.style.borderColor=\'var(--a400)\';this.style.transform=\'translateY(-3px)\';this.style.boxShadow=\'var(--sha)\'"'
       + ' onmouseout="this.style.borderColor=\'var(--border)\';this.style.transform=\'\';this.style.boxShadow=\'var(--sh)\'">'
       + '<div style="width:48px;height:48px;background:var(--a050);border-radius:50%;display:flex;align-items:center;justify-content:center">'
       + '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--a500)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (vcIcons[idx] || '') + '</svg></div>'
       + '<span style="font-family:var(--fh);font-size:.9rem;font-weight:700;text-align:center;color:var(--text);line-height:1.2">' + esc(vc.l) + '</span>'
       + '<span style="font-size:.7rem;color:var(--text3);text-align:center">' + vc.s + '</span>'
       + '</div>';
  });
  h += '</div></div>';

  h += '<div class="page-wrap"><section class="section">';
  h += '<div class="sec-hd"><div class="sec-title">' + t('home.categories') + '</div></div>';
  h += '<div class="cat-scroll" role="list">';
  if (cats.length) {
    cats.forEach(function (c) {
      h += '<button class="cat-pill" role="listitem" ' +
        'onclick="render(\'products\',{category_id:\'' + c.id + '\',category_name:\'' + esc(c['name_' + S.lang] || c.name) + '\'})">' +
        '<span class="cat-icon">' + esc(c.icon || '*') + '</span>' + esc(c['name_' + S.lang] || c.name) + '</button>';
    });
  } else {
    h += '<span style="color:var(--text3);font-size:.85rem">No categories yet.</span>';
  }
  h += '</div></section>';

  h += '<section class="section">';
  h += '<div class="sec-hd"><div><div class="sec-title">' + t('home.featured');
  h += ' <small>' + t('home.featured_sub') + '</small></div></div>';
  h += '<button class="view-all" onclick="render(\'products\')">' + t('home.view_all') + ' &gt;</button></div>';
  if (prods.length) {
    h += '<div class="pgrid" role="list">' + prods.map(pcard).join('') + '</div>';
  } else {
    h += '<div class="empty-state"><div class="empty-icon">[~]</div><h3>No products yet</h3></div>';
  }
  h += '</section></div>';

  h += adBanners();

  if (cnProds.length) {
    h += '<div class="page-wrap"><section class="section">';
    h += '<div class="sec-hd"><div><div class="sec-title">' + t('home.china_title') + '</div>';
    h += '<div class="sec-sub">' + t('home.china_sub') + '</div></div>';
    h += '<button class="view-all" onclick="render(\'products\',{china_only:\'1\'})">' + t('home.view_all') + ' &gt;</button></div>';
    h += '<div class="pgrid" role="list">' + cnProds.map(pcard).join('') + '</div>';
    h += '</section></div>';
  }

  h += '<div class="page-wrap"><section class="section">';
  h += '<div class="sec-hd"><div class="sec-title">' + t('home.why_title') + '</div></div>';
  h += '<div class="feature-grid">';
  [1, 2, 3, 4, 5, 6].forEach(function (n, i) {
    if (Array.isArray(features) && features[i]) {
      h += '<div class="feature-card">';
      h += '<div class="feature-icon">' + n + '</div>';
      h += '<div class="feature-title">' + esc(features[i][0]) + '</div>';
      h += '<p class="feature-desc">' + esc(features[i][1]) + '</p>';
      h += '</div>';
    }
  });
  h += '</div></section></div>';

  $('content').innerHTML = h;
  requestAnimationFrame(function () { startBannerRotation(6000); });
});

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
        // Search by BOTH category_id AND name as q fallback
        html += '<button class="vcp-chip" onclick="render(\'products\',{category_id:\'' + sub.id + '\',q:\'' + esc(sub.name).replace(/'/g,'') + '\',category_name:\'' + esc(sub.name).replace(/'/g,'') + '\'});vcToggle()" title="' + esc(sub.name) + '">' + esc(sub.name) + '</button>';
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

/* ---------- ROUTE: PRODUCTS ---------- */
route('products', async function (P) {
  P = P || {};
  let cats = [];
  try {
    const cR = await apiReq('/categories?lang=' + S.lang, 'GET', null, false);
    cats = Array.isArray(cR) ? cR : (cR.data || []);
  } catch (e) {}

  const F = {
    q: P.q || '', category_id: P.category_id || '',
    condition: P.condition || '', brand: P.brand || '',
    china_only: P.china_only || '', page: 1, limit: 24
  };

  const load = async function () {
    const qs = Object.keys(F)
      .filter(function (k) { return F[k] !== '' && F[k] !== null; })
      .map(function (k) { return k + '=' + encodeURIComponent(F[k]); })
      .join('&');

    let res = { data: [], pagination: { total: 0, pages: 1 } };
    try {
      res = await apiReq('/products?' + qs + '&currency=' + S.currency, 'GET', null, false);
    } catch (e) {}

    const products = res.data || res.products || [];
    const total = (res.pagination && res.pagination.total) || products.length;
    const pages = (res.pagination && res.pagination.pages) || 1;

    const pgEl = $('pgrid-wrap');
    if (!pgEl) return;

    if (products.length) {
      let ph = '<div class="pgrid" role="list">' + products.map(pcard).join('') + '</div>';
      ph += '<div style="text-align:center;margin-top:1.5rem;color:var(--text2);font-size:.84rem">';
      ph += t('filter.showing') + ' ' + products.length + ' ' + t('filter.of') + ' ' + total + ' ' + t('filter.parts');
      if (F.page < pages) {
        ph += ' <button class="btn btn-ghost btn-sm" style="margin-left:1rem" onclick="moreP(' + (F.page + 1) + ')">' + t('filter.load_more') + '</button>';
      }
      ph += '</div>';
      pgEl.innerHTML = ph;
    } else {
      pgEl.innerHTML = '<div class="empty-state"><div class="empty-icon">[-]</div><h3>' +
        t('errors.no_parts') + '</h3><button class="btn btn-ghost" style="margin-top:1rem" onclick="render(\'products\')">' +
        t('filter.reset') + '</button></div>';
    }
  };

  let h = '<div class="page-wrap"><section class="section">';
  h += '<div class="sec-hd"><div class="sec-title">' + t('nav.parts');
  if (P.category_name) h += ' <small>in ' + esc(P.category_name) + '</small>';
  if (P.china_only === '1') h += ' <small>- China</small>';
  h += '</div></div>';

 

  h += '<div class="filter-bar" role="search">';
  h += '<div class="fg" style="flex:2;min-width:160px"><label>' + t('filter.search') + '</label>' +
       '<input id="fQ" value="' + esc(F.q) + '" placeholder="' + t('home.search_ph') + '"/></div>';
  h += '<div class="fg"><label>Category</label><select id="fCat"><option value="">' + t('filter.all') + '</option>';
  cats.forEach(function (c) {
    h += '<option value="' + c.id + '"' + (F.category_id == c.id ? ' selected' : '') + '>' +
         esc(c['name_' + S.lang] || c.name) + '</option>';
  });
  h += '</select></div>';
  h += '<div class="fg"><label>' + t('filter.condition') + '</label><select id="fCond">';
  h += '<option value="">' + t('filter.all') + '</option>';
  ['new', 'used', 'refurbished'].forEach(function (c) {
    h += '<option value="' + c + '"' + (F.condition === c ? ' selected' : '') + '>' + t('product.' + c) + '</option>';
  });
  h += '</select></div>';
  h += '<div class="fg"><label>' + t('filter.brand') + '</label>' +
       '<input id="fBrand" value="' + esc(F.brand) + '" placeholder="Toyota..."/></div>';
  h += '<div class="fg"><label>' + t('filter.origin') + '</label><select id="fOrig">';
  h += '<option value="">' + t('filter.all') + '</option>';
  h += '<option value="1"' + (F.china_only === '1' ? ' selected' : '') + '>' + t('filter.china_only') + '</option>';
  h += '</select></div>';
  h += '<div class="fb-actions">';
  h += '<button class="btn btn-primary" onclick="applyF()">' + t('filter.search') + '</button>';
  h += '<button class="btn btn-ghost" onclick="render(\'products\')">' + t('filter.reset') + '</button>';
  h += '</div></div>';

  h += '<div id="pgrid-wrap"><div class="loading-wrap"><div class="spinner"></div></div></div>';
  h += '</section></div>';
  h += adBanners();

  $('content').innerHTML = h;

  window.applyF = function () {
    F.q = ($('fQ') && $('fQ').value.trim()) || '';
    F.category_id = ($('fCat') && $('fCat').value) || '';
    F.condition = ($('fCond') && $('fCond').value) || '';
    F.brand = ($('fBrand') && $('fBrand').value.trim()) || '';
    F.china_only = ($('fOrig') && $('fOrig').value) || '';
    F.page = 1;
    load();
  };

  window.moreP = function (pg) { F.page = pg; load(); };

  load();
});

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
    if (isCn) h += '<div style="margin-bottom:.65rem"><span class="badge badge-china">China Direct</span></div>';
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
      icon: '🏢',
      title: t('seller_hub.mod_profile_t'),
      desc: t('seller_hub.mod_profile_d'),
      target: null,
      active: false,
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
    h += '<div>Vorschau</div><div>Titel</div><div>Pos</div><div>Status</div><div>Aktionen</div>';
    h += '</div>';
    banners.forEach(function (b) {
      h += '<div class="trow">';
      h += '<div>' + (b.image_url ? '<img src="' + esc(b.image_url) + '" style="width:80px;height:45px;object-fit:cover;border-radius:4px" onerror="this.style.opacity=.3"/>' : '—') + '</div>';
      h += '<div>' + esc(b.title || '(ohne Titel)') + '</div>';
      h += '<div>' + b.position + '</div>';
      h += '<div>' + (b.active ? '🟢 aktiv' : '⚪ inaktiv') + '</div>';
      h += '<div style="display:flex;gap:.4rem;flex-wrap:wrap">';
      h += '<button class="btn btn-ghost btn-sm" onclick="bToggle(\'' + b.id + '\',' + (!b.active) + ')">' + (b.active ? 'Deakt.' : 'Aktiv.') + '</button>';
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
      $('bnPreview').innerHTML = '';
      toast('Banner angelegt');
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

_initRouteFromHash();
