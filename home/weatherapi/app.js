const express = require('express');

const app = express();
const port = 3000;

// Endpoint untuk mendapatkan cuaca berdasarkan kota
app.get('/weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'Kota harus disediakan.' });
    }

    try {
        // Menggunakan dynamic import() untuk memuat node-fetch
        const { default: fetch } = await import('node-fetch');
        const response = await fetch(`https://www.metaweather.com/api/location/search/?query=${city}`);
        const locations = await response.json();

        if (locations.length === 0) {
            return res.status(404).json({ error: 'Kota tidak ditemukan.' });
        }

        const woeid = locations[0].woeid;
        const weatherResponse = await fetch(`https://www.metaweather.com/api/location/${woeid}/`);
        const weatherData = await weatherResponse.json();
        
        res.json(weatherData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data cuaca.' });
    }
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
