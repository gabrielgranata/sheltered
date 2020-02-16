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
  const { account } = req.body;
  const { username, password, accountType } = account;

  const collection = client.db("main").collection(accountType);
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
  const { account } = req.body;
  const { username, password, accountType } = account;
  let returnObj = { status: 0, msg: "" };

  const collection = client.db("main").collection(accountType);
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
  let returnObj = { status: 0, msg: "" };
  try {
    let items = await collection.find().toArray();
    returnObj = { status: 0, msg: "Success", data: items };
  } catch (error) {
    returnObj = { status: 2, msg: error };
  }
  res.send(returnObj);
});

app.get("/addPlace", async (req, res) => {
  const { place } = req.body;
  const collection = client.db("main").collection("places");
  let returnObj = { status: 0, msg: "" };
  try {
    await collection.insertOne(place);
    returnObj = { status: 0, msg: "Success" };
  } catch (error) {
    returnObj = { status: 2, msg: error };
  }
  res.send(returnObj);
});

app.post("/");

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
