// file: store.js
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function filePath(name) {
  return path.join(DATA_DIR, name + '.json');
}

function load(name) {
  const fp = filePath(name);
  try {
    if (!fs.existsSync(fp)) {
      fs.writeFileSync(fp, '[]', 'utf8');
      return [];
    }
    const raw = fs.readFileSync(fp, 'utf8');
    if (!raw || !raw.trim()) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error loading ' + name + ':', err.message);
    return [];
  }
}

function save(name, data) {
  const fp = filePath(name);
  try {
    fs.writeFileSync(fp, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error saving ' + name + ':', err.message);
    return false;
  }
}

module.exports = { load, save };
