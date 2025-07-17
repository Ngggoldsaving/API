const express = require('express');
const app = express();
const scrapeGold = require('./index');

app.get('/', async (req, res) => {
  try {
    const data = await scrapeGold();
    res.setHeader('Access-Control-Allow-Origin', '*'); // สำหรับ Google Script
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
