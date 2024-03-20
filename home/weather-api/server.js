const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 3000;

// Konfigurasi opsi Swagger UI
const swaggerOptions = {
    customCss: '.topbar { display: none; } .swagger-ui .wrapper .container .header { background-color: #F5F5F5; padding: 10px; } .swagger-ui .wrapper .container .header hgroup { margin-bottom: 0; } .swagger-ui .wrapper .container .header hgroup .title { font-size: 1.5em; font-weight: bold; }', // Custom CSS untuk mengubah tampilan top bar
    customSiteTitle: 'IvanAPI' // Mengubah judul situs Swagger UI menjadi "IvanAPI"
};

// Middleware untuk menampilkan Swagger UI dengan opsi konfigurasi
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

// Route untuk mendapatkan informasi cuaca
app.get('/weather', (req, res) => {
    // Di sini Anda bisa menambahkan logika untuk mengambil data cuaca dari sumber daya eksternal
    // Misalnya, Anda bisa menggunakan API cuaca dari OpenWeatherMap, AccuWeather, atau yang lainnya
    // Untuk contoh ini, kita akan mengirimkan respons sederhana berupa string JSON
    const weatherData = {
        city: 'Bandar Lampung',
        temperature: 28,
        description: 'Cerah'
    };
    res.json(weatherData);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
