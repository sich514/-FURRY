import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const filePath = path.resolve('./wallets.txt');
    const wallets = fs.readFileSync(filePath, 'utf-8').split('\n').filter(Boolean);

    if (wallets.length === 0) {
        return res.status(500).json({ error: 'No wallets available' });
    }

    const walletAddress = wallets.shift(); // Берем первый адрес из списка

    // Перезаписываем файл с оставшимися адресами
    fs.writeFileSync(filePath, wallets.join('\n'));

    res.status(200).json({ wallet: walletAddress });
}
