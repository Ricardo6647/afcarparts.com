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

/* ---------- LOAD FUNCTION (robust & auto-repair) ---------- */
function load(name) {
  const fp = filePath(name);

  try {
    // If file does not exist → create empty array
    if (!fs.existsSync(fp)) {
      fs.writeFileSync(fp, '[]', 'utf8');
      return [];
    }

    const raw = fs.readFileSync(fp, 'utf8');

    // Empty file → repair
    if (!raw || !raw.trim()) {
      fs.writeFileSync(fp, '[]', 'utf8');
      return [];
    }

    try {
      return JSON.parse(raw);
    } catch (parseErr) {
      console.error(`Corrupted JSON in ${name}.json → repairing...`);
      fs.writeFileSync(fp, '[]', 'utf8');
      return [];
    }

  } catch (err) {
    console.error('Error loading ' + name + ':', err.message);
    return [];
  }
}

/* ---------- SAVE FUNCTION (atomic write) ---------- */
function save(name, data) {
  const fp = filePath(name);

  try {
    // Atomic write: write to temp file first
    const tmp = fp + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tmp, fp);

    return true;
  } catch (err) {
    console.error('Error saving ' + name + ':', err.message);
    return false;
  }
}

module.exports = { load, save };
