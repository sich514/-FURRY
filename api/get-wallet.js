import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://slavikobmen2022:rxIPD54HL8j00jTj@wallets.tn8px.mongodb.net/?retryWrites=true&w=majority&appName=wallets'; // Замените на вашу строку подключения
const client = new MongoClient(uri);

export default async function handler(req, res) {
    try {
        // Подключение к базе данных
        await client.connect();
        const database = client.db('wallets');
        const collection = database.collection('addresses');

        // Получаем первый адрес кошелька
        const wallet = await collection.findOne({}); // Вы можете изменить запрос в зависимости от структуры данных

        if (!wallet) {
            return res.status(404).json({ error: 'No wallets available' });
        }

        // Возвращаем адрес кошелька
        res.status(200).json({ address: wallet.address });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to connect to the database' });
    } finally {
        // Закрываем соединение
        await client.close();
    }
}
