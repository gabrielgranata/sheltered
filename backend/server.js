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
    if (!!doc) {
      res.send("The username above already exists");
    } else if (err) {
      res.send(err);
    } else {
      try {
        const accountDoc = { username, password };
        await collection.insertOne(accountDoc);
        res.send("New user created");
      } catch (error) {
        res.send(error);
      }
    }
  });
});

app.post("/loginAccount", async (req, res) => {
  const { account } = req.body;
  const { username, password, accountType } = account;

  const collection = client.db("main").collection(accountType);
  await collection.findOne(
    { username },
    { _id: 1, name: 1, password: 1 },
    (err, doc) => {
      if (!doc) {
        res.send("The username does not exist");
      } else if (err) {
        res.send(err);
      } else {
        const { _id, name, password: actualPassword } = doc;
        if (password !== actualPassword) res.send("Incorrect password");
        else res.send(JSON.stringify({ _id, name }));
      }
    }
  );
});

app.post("/getProfile", async (req, res) => {
  const { account } = req.body;
  const { _id, profileType } = account;
  const collection = client.db("main").collection(profileType);
  try {
    await collection.findOne({ _id }, (err, doc) => {
      if (err) res.send(err);
      else res.send(JSON.stringify(doc));
    });
  } catch (error) {
    res.send(`Error on updating profile: ${error}`);
  }
});

app.post("/updateProfile", async (req, res) => {
  const { account } = req.body;
  const { _id, profileType, profile } = account;
  const collection = client.db("main").collection(profileType);
  try {
    await collection.findOneAndUpdate(
      { _id },
      { $set: { profile } },
      { upsert: true }
    );
    res.send("Profile updated");
  } catch (error) {
    res.send(`Error on updating profile: ${error}`);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
