import { MongoClient } from 'mongodb';

//url of this api si /api/new-meetup
// POST only post requested are triggered

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    // const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      'mongodb+srv://admin:admin@cluster0.zkiho.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetupsCollection');

    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();

    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;
