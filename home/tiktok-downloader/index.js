const axios = require('axios');

// Fungsi untuk mengambil data TikTok dari URL
async function downloadTikTok(url) {
    try {
        const response = await axios.post('http://localhost:3000/download', { url });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Panggil fungsi downloadTikTok dengan URL TikTok yang ingin Anda download
const result = await downloadTikTok('https://vt.tiktok.com/ZSFSqcuXb/');
console.log(result);
