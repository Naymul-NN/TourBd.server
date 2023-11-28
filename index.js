const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
const userBookingCollection = client.db('TourBd').collection('userBooking');
const allPackageCollection = client.db('TourBd').collection('allpackage');
const storyCollection = client.db('TourBd').collection('clienTStory');
const usersCollection = client.db('TourBd').collection('users');

// get the tabTour

app.get('/tabTour', async(req, res) => {
    const result = await tabTourCollection.find().toArray();
    res.send(result);
})
// get the users
app.get('/users', async(req, res) => {
    const result = await usersCollection.find().toArray();
    res.send(result);
})
app.get('/allpackage', async(req, res) => {
    const result = await allPackageCollection.find().toArray();
    res.send(result);
})

// get the guide
app.get('/tourGuides', async(req, res) => {
    const result = await guidesCollection.find().toArray();
    res.send(result);
})
app.get('/clienTStory', async(req, res) => {
    const result = await storyCollection.find().limit(4).toArray();
    res.send(result);
})
app.get('/clienTStoryall', async(req, res) => {
    const result = await storyCollection.find().toArray();
    res.send(result);
})

 app.get('/userBooking/:providerEmail', async(req, res) => {
    const providerEmail = req.params.providerEmail;
    const products = await userBookingCollection.find({touristEmail:providerEmail}).toArray();
    res.send(products);
  });
 app.get('/wishlist/:providerEmail', async(req, res) => {
    const providerEmail = req.params.providerEmail;
    const products = await wishCollection.find({userEmil:providerEmail}).toArray();
    res.send(products);
  });


// get single id

app.get ('/tabTour/:id', async(req,res) =>{
  const id = req.params.id;
  const query = {_id: new ObjectId(id)}
  const result = await tabTourCollection.findOne(query);
  res.send(result);
})

app.get ('/storyone/:id', async(req,res) =>{
  const id = req.params.id;
  const query = {_id: new ObjectId(id)}
  const result = await storyCollection.findOne(query);
  res.send(result);
})

app.get ('/tourGuide/:id', async(req,res) =>{
  const id = req.params.id;
  const query = {_id: new ObjectId(id)}
  const result = await guidesCollection.findOne(query);
  res.send(result);
})
app.get ('/allpackage/:id', async(req,res) =>{
  const id = req.params.id;
  const query = {_id: new ObjectId(id)}
  const result = await allPackageCollection.findOne(query);
  res.send(result);
})

// post the wishlist

app.post('/wishlist', async (req, res) => {
  const item = req.body;
  const result = await wishCollection.insertOne(item)
  res.send(result);
})
// post the booking of user
app.post('/userBooking', async (req, res) => {
  const item = req.body;
  const result = await userBookingCollection.insertOne(item)
  res.send(result);
})
// post the users
app.post('/users', async (req, res) => {
  const user = req.body;
  // insert email if user doesnt exists;
  // you can do this many ways(1.email unique, 2, upsert 3. simple checking)
  const query = { email: user.email }
  const existingUser = await usersCollection.findOne(query);
  if (existingUser) {
    return res.send({ message: 'user already exists', insertedId: null })
  }
  const result = await usersCollection.insertOne(user);
  res.send(result);
})
// make a admin role
app.patch('/users/admin/:id', async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updatedDoc = {
    $set: {
      role: 'admin'
    }
  }
  const result = await usersCollection.updateOne(filter, updatedDoc);
  res.send(result);
})
// make the guide
app.patch('/users/guide/:id', async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updatedDoc = {
    $set: {
      role: 'guide'
    }
  }
  const result = await usersCollection.updateOne(filter, updatedDoc);
  res.send(result);
})

// GET the admin

app.get('/users/admin/:email',async (req, res) => {
  const email = req.params.email;
  const query = { email: email }
  const user = await usersCollection.findOne(query);
  let admin = false;
  if (user) {
    admin = user?.role === 'admin';
  }
  res.send({ admin });
})
// get the guide
app.get('/users/guide/:email',async (req, res) => {
  const email = req.params.email;
  const query = { email: email }
  const user = await usersCollection.findOne(query);
  let guide = false;
  if (user) {
    guide = user?.role === 'guide';
  }
  res.send({ guide });
})

// delete 
 app.delete("/wishlist/:id", async(req,res)=>{
      const id = req.params.id;
      const query = {
          _id: new ObjectId(id),
      };
      const result = await wishCollection.deleteOne(query);
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
