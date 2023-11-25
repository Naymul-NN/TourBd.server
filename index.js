const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// TourBd
// DthcrhpyBeCeZKLJ


const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.SECRET_KEY}@cluster0.4kfubsh.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   
// your project work will be here

const tabTourCollection = client.db('TourBd').collection('tabTour');
const guidesCollection = client.db('TourBd').collection('tourGuides');
const wishCollection = client.db('TourBd').collection('wishlist');

// get the tabTour

app.get('/tabTour', async(req, res) => {
    const result = await tabTourCollection.find().toArray();
    res.send(result);
})

// get the guide
app.get('/tourGuides', async(req, res) => {
    const result = await guidesCollection.find().toArray();
    res.send(result);
})

// post the wishlist

app.post('/wishlist', async (req, res) => {
  const item = req.body;
  const result = await wishCollection.insertOne(item)
  res.send(result);
})



    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) =>{
    res.send('Find the beauty of bengladesh')
})

app.listen(port, () =>{
    console.log(` tour is going on: ${port}`);
})
