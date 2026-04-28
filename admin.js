/* -------------------- API BASE -------------------- */
const API = "https://afcarparts-com.onrender.com/api";

/* -------------------- GLOBAL TOKEN -------------------- */
let token = localStorage.getItem("admin_token") || null;

/* -------------------- LOGIN -------------------- */
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  fetch(API + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(r => r.json())
    .then(data => {
      if (data.error) {
        document.getElementById("loginError").innerText = data.error;
        return;
      }
      // Prüfen, ob User wirklich Admin ist
      if (!data.user || data.user.role !== "admin") {
        document.getElementById("loginError").innerText = "Kein Admin-Konto";
        return;
      }

      token = data.token;
      localStorage.setItem("admin_token", token);

      document.getElementById("loginBox").style.display = "none";
      document.getElementById("adminPanel").style.display = "block";

      loadCategories();
      loadProducts();
    })
    .catch(() => {
      document.getElementById("loginError").innerText = "Serverfehler";
    });
}

/* -------------------- LOGOUT -------------------- */
function logout() {
  token = null;
  localStorage.removeItem("admin_token");
  location.reload();
}

/* -------------------- SECTION SWITCH -------------------- */
function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.style.display = "none");
  document.getElementById(id).style.display = "block";
}

/* -------------------- LOAD CATEGORIES -------------------- */
function loadCategories() {
  if (!token) return;

  fetch(API + "/admin/categories", {
    headers: { "Authorization": token }
  })
    .then(r => r.json())
    .then(res => {
      // Backend gibt mal Array, mal {data: [...]} zurück - beides abfangen
      const cats = Array.isArray(res) ? res : (res.data || []);
      const list = document.getElementById("catList");
      list.innerHTML = "";
      cats.forEach(c => {
        const li = document.createElement("li");
        li.innerText = c.name || "(ohne Name)";
        list.appendChild(li);
      });
    })
    .catch(err => console.error("Kategorie-Fehler:", err));
}

/* -------------------- LOAD PRODUCTS -------------------- */
function loadProducts() {
  if (!token) return;

  fetch(API + "/admin/products", {
    headers: { "Authorization": token }
  })
    .then(r => r.json())
    .then(res => {
      const products = res.data || [];
      const list = document.getElementById("productList");
      list.innerHTML = "";
      products.forEach(p => {
        const li = document.createElement("li");
        li.innerText = `${p.title} - ${p.price_usd} USD`;
        list.appendChild(li);
      });
    })
    .catch(err => console.error("Produkt-Fehler:", err));
}

/* -------------------- AUTO-LOGIN -------------------- */
window.addEventListener("DOMContentLoaded", () => {
  if (token) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
    loadCategories();
    loadProducts();
  }
});
