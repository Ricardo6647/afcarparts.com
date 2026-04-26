let token = null;

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

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
      document.getElementById("loginBox").style.display = "none";
      document.getElementById("adminPanel").style.display = "block";
    });
}

function logout() {
  token = null;
  location.reload();
}

function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.style.display = "none");
  document.getElementById(id).style.display = "block";
}

function loadCategories() {
  fetch("/api/admin/categories")
    .then(r => r.json())
    .then(cats => {
      const list = document.getElementById("catList");
      list.innerHTML = "";
      cats.forEach(c => {
        const li = document.createElement("li");
        li.innerText = c.name || "(ohne Name)";
        list.appendChild(li);
      });
    });
}

function loadProducts() {
  fetch("/api/products")
    .then(r => r.json())
    .then(res => {
      const list = document.getElementById("productList");
      list.innerHTML = "";
      res.data.forEach(p => {
        const li = document.createElement("li");
        li.innerText = `${p.title} - ${p.price_usd} USD`;
        list.appendChild(li);
      });
    });
}
