const express = require('express');
const { TiktokDownloader } = require("@tobyg74/tiktok-api-dl");
const app = express();
const port = 3000;

// function tiktokdl
function TikTokScraper(url) {
  return new Promise((resolve, reject) => {
    TiktokDownloader(url, { version: "v2" })
      .then((result) => {
        const hasil = {
          status: "success",
          result: result.result
        };

        resolve(hasil);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

app.get('/api/tiktok', async (req, res) => {
  const videoUrl = req.query.url;
  try {
    const data = await TikTokScraper(videoUrl);
    res.json({
      success: true,
      data: data,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running listening on port ${port}`);
});