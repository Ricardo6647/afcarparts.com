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
      processing: "Processing CSV...", success: "Import complete!" }
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
      processing: "Verarbeitung...", success: "Fertig!" }
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
      processing: "Traitement...", success: "Termine!" }
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
      processing: "Processando...", success: "Concluido!" }
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
      processing: "Procesando...", success: "Completo!" }
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
      processing: "Inashughulikia...", success: "Imekamilika!" }
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
const API = "https://afcarparts-com-895534.hostingersite.com/api";

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
  const h = { 'Content-Type': 'application/json', 'Accept-Language': S.lang };
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
  if (auth && S.token) h['Authorization'] = 'Bearer ' + S.token;
  const res = await fetch(API + path, { method: 'POST', headers: h, body: fd });
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

/* ---------- ROUTER ---------- */
const routes = {};
function route(name, fn) { routes[name] = fn; }

async function render(name, params) {
  params = params || {};
  S.page = name;
  S.pageParams = params;
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
  $('topbar').innerHTML =
    '<div class="tb-left">' +
      '<span>Free shipping on orders over $200 - ' +
      '<a onclick="render(\'register\')" href="javascript:void(0)">' + t('auth.register_btn') + '</a></span>' +
    '</div>' +
    '<div class="tb-right">' +
      '<span>China Wholesale - ' +
      '<a onclick="render(\'products\',{china_only:\'1\'})" href="javascript:void(0)">' + t('filter.china_only') + '</a></span>' +
    '</div>';
}

function buildNav() {
  buildTopbar();
  const isA = S.user && S.user.role === 'admin';
  const isS = S.user && S.user.role === 'seller';
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
  h += '<span class="footer-link" onclick="render(\'register\')">' + t('footer.sell') + '</span></div>';

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
  return '<div class="page-wrap"><div class="ad-grid">' +
    '<div class="ad-card or" onclick="render(\'products\',{china_only:\'1\'})">' +
      '<div class="ad-card-tag">AD</div>' +
      '<div><h3 style="color:var(--a500)">' + t('home.china_title') + '</h3>' +
      '<p>' + t('home.china_sub') + '</p></div>' +
      '<button class="ad-cta or">Browse &gt;</button></div>' +
    '<div class="ad-card bl" onclick="render(\'register\')">' +
      '<div class="ad-card-tag">AD</div>' +
      '<div><h3 style="color:var(--p700)">' + t('footer.sell') + '</h3>' +
      '<p>List parts free - Reach buyers across Africa</p></div>' +
      '<button class="ad-cta bl">Start &gt;</button></div>' +
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
    try { imgs = JSON.parse(p.images); } catch (e) { imgs = []; }
  }
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

  let h = '<section class="hero"><div class="hero-inner">';
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

  h += ticker();

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
});

function doSearch() {
  const q = $('hsearch') ? $('hsearch').value.trim() : '';
  const cat = $('hCat') ? $('hCat').value : '';
  const params = {};
  if (q) params.q = q;
  if (cat) params.category_id = cat;
  render('products', params);
}

/* ---------- ROUTE: PRODUCTS ---------- */
route('products', async function (P) {
  P = P || {};
  let cats = [];
  try {
    const cR = await apiReq('/admin/categories', 'GET', null, false);
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

  h += ticker();

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
      try { imgs = JSON.parse(p.images); } catch (e) { imgs = []; }
    }
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
route('seller-dashboard', async function () {
  if (!S.user || S.user.role !== 'seller') { render('login'); return; }

  let products = [];
  try {
    const res = await apiReq('/products?limit=200', 'GET', null, false);
    const all = res.data || res.products || [];
    products = all.filter(function (p) {
      return String(p.seller_id || p.user_id || '') === String(S.user.id);
    });
  } catch (e) {}

  let h = '<div class="page-wrap"><div class="dash-layout">';
  h += '<aside class="dash-sidebar">';
  h += '<div class="ds-section-lbl">' + t('seller.shop') + '</div>';
  h += '<button class="ds-link active">' + t('seller.products') + '</button>';
  h += '<button class="ds-link" onclick="render(\'csv-import\')">' + t('seller.csv_import') + '</button>';
  h += '</aside>';
  h += '<section><div class="sec-hd"><div class="sec-title">' + t('seller.products') + '</div></div>';
  if (products.length) {
    h += '<div class="pgrid" role="list">' + products.map(pcard).join('') + '</div>';
  } else {
    h += '<div class="empty-state"><div class="empty-icon">[-]</div><h3>' + t('errors.no_parts') + '</h3></div>';
  }
  h += '</section></div></div>';

  $('content').innerHTML = h;
});

/* ---------- ROUTE: CSV IMPORT ---------- */
route('csv-import', async function () {
  if (!S.user || S.user.role !== 'seller') { render('login'); return; }

  $('content').innerHTML =
    '<div class="page-wrap"><section class="section">' +
    '<div class="sec-hd"><div class="sec-title">' + t('csv.title') + '</div></div>' +
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

/* ---------- ROUTE: ADMIN DASHBOARD ---------- */
route('admin-dashboard', async function () {
  if (!S.user || S.user.role !== 'admin') { render('login'); return; }

  let products = [], shops = [], orders = [], cats = [];
  try {
    const arr = await Promise.all([
      apiReq('/products?limit=500', 'GET', null, false).catch(() => ({ data: [] })),
      apiReq('/shops', 'GET', null, false).catch(() => ({ data: [] })),
      apiReq('/orders', 'GET', null, false).catch(() => ({ data: [] })),
      apiReq('/admin/categories', 'GET', null, false).catch(() => [])
    ]);
    products = arr[0].data || arr[0].products || [];
    shops = arr[1].data || [];
    orders = arr[2].data || [];
    cats = Array.isArray(arr[3]) ? arr[3] : (arr[3].data || []);
  } catch (e) {}

  let h = '<div class="page-wrap"><div class="dash-layout">';
  h += '<aside class="dash-sidebar">';
  h += '<div class="ds-section-lbl">' + t('admin.overview') + '</div>';
  h += '<button class="ds-link active">' + t('admin.overview') + '</button>';
  h += '</aside>';
  h += '<section><div class="sec-hd"><div class="sec-title">' + t('admin.overview') + '</div></div>';

  h += '<div class="stat-grid">';
  h += '<div class="stat-card"><div class="stat-label">' + t('nav.parts') + '</div><div class="stat-value">' + products.length + '</div></div>';
  h += '<div class="stat-card"><div class="stat-label">' + t('nav.shops') + '</div><div class="stat-value">' + shops.length + '</div></div>';
  h += '<div class="stat-card"><div class="stat-label">' + t('nav.orders') + '</div><div class="stat-value">' + orders.length + '</div></div>';
  h += '<div class="stat-card"><div class="stat-label">' + t('admin.categories') + '</div><div class="stat-value">' + cats.length + '</div></div>';
  h += '</div>';

  h += '<div style="margin-top:2rem"><h3 style="font-family:var(--fh);margin-bottom:1rem">' + t('orders.title') + '</h3>';
  if (orders.length) {
    h += '<div class="table">';
    h += '<div class="trow" style="font-weight:700;background:var(--surface2)">';
    h += '<div>' + t('orders.number') + '</div>';
    h += '<div>' + t('cart.items') + '</div>';
    h += '<div>' + t('orders.status') + '</div>';
    h += '<div>' + t('orders.date') + '</div>';
    h += '</div>';
    orders.forEach(function (o) {
      h += '<div class="trow">';
      h += '<div>#' + esc(o.id) + '</div>';
      h += '<div>' + ((o.items || []).length) + '</div>';
      h += '<div>' + esc(o.status || '') + '</div>';
      h += '<div>' + (o.created_at ? new Date(o.created_at).toLocaleString() : '') + '</div>';
      h += '</div>';
    });
    h += '</div>';
  } else {
    h += '<p>' + t('orders.no_orders') + '</p>';
  }
  h += '</div>';

  h += '</section></div></div>';

  $('content').innerHTML = h;
});

/* ---------- INIT ---------- */
setDir(S.lang);
updateMeta();
render('home');
