const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI; // Получение URI из переменных окружения

module.exports = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const client = new MongoClient(uri);
            await client.connect();
            const database = client.db('wallets'); // Замените на имя вашей базы данных
            const collection = database.collection('wallets');

            const wallets = await collection.find({}).toArray(); // Получаем все кошельки
            res.status(200).json(wallets);
        } catch (error) {
            console.error('Error fetching wallets:', error);
            res.status(500).json({ error: 'Failed to fetch wallets' });
        } finally {
            await client.close();
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
