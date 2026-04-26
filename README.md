# AFRICARPARTS

Auto Spare Parts Marketplace for Africa - Node.js + Express + Vanilla JS

## Project Structure

```
africarparts/
├── server.js              # Express backend (entry point)
├── store.js               # JSON file storage helper
├── package.json           # Dependencies
├── public/                # Frontend (served statically)
│   ├── index.html
│   ├── app.js
│   └── styles.css
├── data/                  # JSON data files
│   ├── products.json
│   ├── shops.json
│   ├── categories.json
│   ├── orders.json
│   └── users.json
└── uploads/               # CSV uploads destination
```

## Local Run

```bash
npm install
npm start
```

App runs on http://localhost:5000

## Hostinger Deployment

1. Upload the entire project folder to Hostinger (via File Manager or FTP)
2. In the Hostinger Node.js panel:
   - **Startup file**: `server.js`
   - **Node version**: 18+ (or any LTS)
   - Run `npm install`
   - Start the app
3. Hostinger will pick `PORT` from the environment automatically.

The frontend calls the API via relative paths (`/api/...`), so no configuration changes are needed.
