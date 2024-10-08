const fs = require('fs');
const path = require('path');

// Путь к файлу с кошельками и файлу индекса
const walletsFile = path.join(__dirname, '../../wallets.txt');
const indexFile = path.join(__dirname, '../../index.txt');

// Читаем текущий индекс из файла (или создаем его)
function getCurrentIndex() {
    try {
        const index = fs.readFileSync(indexFile, 'utf8');
        return parseInt(index, 10);
    } catch (err) {
        // Если файла с индексом нет, начинаем с 0
        return 0;
    }
}

// Сохраняем текущий индекс в файл
function saveCurrentIndex(index) {
    fs.writeFileSync(indexFile, index.toString(), 'utf8');
}

// Функция для получения следующего кошелька
function getNextWallet(callback) {
    fs.readFile(walletsFile, 'utf8', (err, data) => {
        if (err) {
            return callback(err);
        }

        const wallets = data.split('\n').filter(Boolean); // Массив кошельков
        let currentIndex = getCurrentIndex();

        if (currentIndex >= wallets.length) {
            currentIndex = 0; // Если индекс превышает количество кошельков, начинаем с первого
        }

        const selectedWallet = wallets[currentIndex]; // Берем текущий кошелек

        // Обновляем индекс для следующего запроса
        currentIndex += 1;
        saveCurrentIndex(currentIndex);

        callback(null, selectedWallet);
    });
}

export default function handler(req, res) {
    if (req.method === 'GET') {
        getNextWallet((err, wallet) => {
            if (err) {
                return res.status(500).send('Error reading wallets file');
            }

            res.status(200).json({ wallet });
        });
    } else {
        res.status(405).send('Method Not Allowed');
    }
}
