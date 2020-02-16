const express = require("express");
const app = express();
const port = 3001;
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

const uri =
  "mongodb+srv://admin:!admin123@valleyorbust-i8h5c.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
client.connect(err => !!err && console.log(`DB Connection Error: ${err}`));

app.use(bodyParser.json());
app.get("/", async (req, res) => {
  await client
    .db("temp")
    .collection("collection")
    .findOne({ dbName: "temp" }, (err, doc) => {
      res.send(JSON.stringify(doc));
    });
});

app.post("/addAccount", async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  const collection = client.db("main").collection("users");
  await collection.findOne({ username }, async (err, doc) => {
    let returnObj = { status: 0, msg: "" };
    if (!!doc) {
      returnObj = { status: 1, msg: "Username already exists" };
    } else if (err) {
      returnObj = { status: 2, msg: err };
    } else {
      try {
        const accountDoc = { username, password };
        await collection.insertOne(accountDoc);
        returnObj = { status: 0, msg: "Success" };
      } catch (error) {
        returnObj = { status: 2, msg: error };
      }
    }
    res.send(JSON.stringify(returnObj));
  });
});

app.post("/loginAccount", async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  let returnObj = { status: 0, msg: "" };

  const collection = client.db("main").collection("users");
  await collection.findOne(
    { username },
    { _id: 1, name: 1, password: 1 },
    (err, doc) => {
      if (!doc) {
        returnObj = { status: 1, msg: "Username does not exist" };
      } else if (err) {
        returnObj = { status: 2, msg: err };
      } else {
        const { _id, name, password: actualPassword } = doc;
        if (password !== actualPassword)
          returnObj = { status: 2, msg: "Incorrect password" };
        else returnObj = { status: 0, msg: "Success", data: { _id, name } };
      }
      res.send(JSON.stringify(returnObj));
    }
  );
});

app.post("/addShelter", async (req, res) => {
  const name = req.query.name;
  const address = req.query.address;
  const services = JSON.parse(req.query.services);

  console.log(services);

  const collection = client.db("main").collection("places");
  await collection.insertOne({
    name: name,
    address: address,
    services: services
  });

  res.send({ status: 0, msg: "Success", data: { name, address } });
});

app.post("/getProfile", async (req, res) => {
  const { account } = req.body;
  const { _id, profileType } = account;
  let returnObj = { status: 0, msg: "" };
  const collection = client.db("main").collection(profileType);
  await collection.findOne({ _id }, (err, doc) => {
    if (err) returnObj = { status: 2, msg: err };
    else returnObj = { status: 0, data: doc };
  });
  res.send(JSON.stringify(returnObj));
});

app.post("/updateProfile", async (req, res) => {
  const { account } = req.body;
  const { _id, profileType, profile } = account;
  let returnObj = { status: 0, msg: "" };
  const collection = client.db("main").collection(profileType);
  try {
    await collection.findOneAndUpdate(
      { _id },
      { $set: { profile } },
      { upsert: true }
    );
    returnObj = { status: 0, msg: "Success" };
  } catch (error) {
    returnObj = { status: 0, msg: `Error on updating profile: ${error}` };
  }
  res.send(JSON.stringify(returnObj));
});

app.get("/getPlaces", async (req, res) => {
  const collection = client.db("main").collection("places");
  let items = await collection.find().toArray();
  res.send(items);
});

app.post("/getPlacesByServices", async (req, res) => {
  const { services } = req.query;
  const parsedServices = JSON.parse(services);
  console.log(services);

  let returnObj = { status: 0, msg: "" };
  const collection = client.db("main").collection("places");
  try {
    const places = await collection
      .find({ services: { $in: parsedServices } })
      .toArray();
    returnObj = { status: 0, msg: "Success", data: places };
  } catch (error) {
    returnObj = { status: 2, msg: error };
  }
  res.send(JSON.stringify(returnObj));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
