const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Читаем кошельки из файла
let wallets = [];
const filePath = path.join(__dirname, 'wallets.txt');
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading wallet file:', err);
        return;
    }
    wallets = data.split('\n').filter(line => line.trim()); // Загружаем только непустые строки
});

// Возвращаем следующий кошелек
app.get('/get-wallet', (req, res) => {
    if (wallets.length > 0) {
        const wallet = wallets.shift(); // Берем первый кошелек
        fs.writeFile(filePath, wallets.join('\n'), 'utf8', (err) => {
            if (err) {
                console.error('Error updating wallet file:', err);
            }
        });
        res.json({ publicKey: wallet });
    } else {
        res.status(500).json({ error: 'No wallets left' });
    }
});

app.use(express.static('public')); // Раздаем статические файлы

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
