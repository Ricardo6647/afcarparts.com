/* -------------------- GLOBAL TOKEN -------------------- */
let token = localStorage.getItem("admin_token") || null;

/* -------------------- LOGIN -------------------- */
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  fetch("/api/auth/login", {
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

  fetch("/api/admin/categories", {
    headers: {
      "Authorization": token
    }
  })
    .then(r => r.json())
    .then(cats => {
      const list = document.getElementById("catList");
      list.innerHTML = "";

      cats.forEach(c => {
        const li = document.createElement("li");
        li.innerText = c.name || "(ohne Name)";
        list.appendChild(li);
      });
    })
    .catch(err => {
      console.error("Kategorie-Fehler:", err);
    });
}

/* -------------------- LOAD PRODUCTS -------------------- */
function loadProducts() {
  if (!token) return;

  fetch("/api/admin/products", {
    headers: {
      "Authorization": token
    }
  })
    .then(r => r.json())
    .then(res => {
      const list = document.getElementById("productList");
      list.innerHTML = "";

      (res.data || []).forEach(p => {
        const li = document.createElement("li");
        li.innerText = `${p.title} - ${p.price_usd} USD`;
        list.appendChild(li);
      });
    })
    .catch(err => {
      console.error("Produkt-Fehler:", err);
    });
}

/* -------------------- AUTO-LOGIN (falls Token existiert) -------------------- */
window.addEventListener("DOMContentLoaded", () => {
  if (token) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";

    loadCategories();
    loadProducts();
  }
});
