const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;


// middlewares

app.use(cors());
app.use(express.json())

// const cars = [
//   {id: '1', name: 'c1', price: 201020 },
//   {id: '2', name: 'c2', price: 203020 },
//   {id: '3', name: 'c3', price: 203020 },
//   {id: '4', name: 'c4', price: 204020 },
//   {id: '5', name: 'c5', price: 205020 },
// ]

// NkmnjgC9tjqnZxEF
// demotest


const uri = `mongodb+srv://${process.env.DB_USER_2}:${process.env.DB_PASS_2}@cluster0.fovwt3b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const carsCollection =  client.db('demoDb').collection('cars');
    // const database = client.db("demoDb");
    // const carsCollection = database.collection("cars");

    // crud operations

    // get
    
    app.get('/cars', async (req, res)=>{
      const cursor = carsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    // post
    app.post('/cars', async(req, res)=>{
      const newCars = req.body;
      console.log(newCars);
      const result = await carsCollection.insertOne(newCars);
      res.send(result);
    })

    // app.post('/cars', async (req, res) => {
    //   const newCar = req.body;
    //   newCar.id = cars.length > 0 ? Math.max(...cars.map(c => c.id)) + 1 : 1;  // Ensure unique ID generation
    //   cars.push(newCar);
    //   // res.send(newCar);
    //   console.log("new cars: " ,newCar);
    //   const result = await carsCollection.insertOne(newCar);
    //   res.send(result);
    // })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// home routes

app.get('/', (req, res) => {
  res.send('Server is running');
});


// curd for cars
// app.get('/cars', (req, res)=>{
//   console.log("hi");
//   // res.send("Hey take this car now");
//   res.send(cars)
// })


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
