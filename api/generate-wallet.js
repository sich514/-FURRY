const { Connection, Keypair } = require('@solana/web3.js');

// Функция для генерации нового кошелька на Solana
module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    
    try {
        const connection = new Connection('https://api.mainnet-beta.solana.com');
        const wallet = Keypair.generate();

        const publicKey = wallet.publicKey.toString();
        const secretKey = wallet.secretKey.toString();

        // В реальном приложении нужно сохранить приватный ключ в БД, а не просто возвращать его
        res.status(200).json({ publicKey });
    } catch (error) {
        res.status(500).json({ message: 'Error generating wallet', error });
    }
};
