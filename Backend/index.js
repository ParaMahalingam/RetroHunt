var express = require("express");
const cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());

var Database = require("./database");

var http = require("http").createServer(app);
var io = require("socket.io")(http);

var port = process.env.PORT || 3020; //Backend server port

var router = express.Router();

router.get("/", function (req, res) {
  res.json({ message: "Welcome to our backend api!" });
});

//Socket.io (Real-time Chat feature)
io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('disconnect', () =>
    console.log(`User Disconnected: ${socket.id}`));

  socket.on('join', (room) => {
    console.log(`User ${socket.id} Joined ${room}`);
    socket.join(room);
  });

  socket.on('chat', (data) => {
    console.log(data)
    io.to(data.room).emit('chat', data);
  });
});

//return all listings
router.get("/search", function (req, res) {
  let searchKeyword = req.query.keyword;
  let platform = req.query.platform;
  let genre = req.query.genre;

  Database.getListingsBySearch(
    searchKeyword,
    platform,
    genre,
    function (result) {
      res.json({ result });
    }
  );
});

//Create a new listing
router.post("/listings/new", (req, res) => {
  var listing = req.body;
  console.log(listing);

  Database.addListing(listing, function (result) {
    console.log(result);
    res.send({ insertID: result });
  });
});

//delete a listing by ID
router.get("/listings/delete/:id", function (req, res) {
  var ListingID = req.params.id;

  Database.deleteListing(ListingID, function (result) {
    console.log(result);
    res.send({ affectedRow: result });
  });
});

//return all listings assigned to a user
router.get("/listings/user/:id", function (req, res) {
  var UserID = req.params.id;

  Database.getUserListings(UserID, function (result) {
    res.json({ result });
  });
});

//Update a listing
router.post("/listings/update", (req, res) => {
  var listing = req.body;
  var ListingID = listing.ID;

  Database.updateListing(listing, ListingID, function (result) {
    console.log(result);
    res.send({ completed: result });
  });
});

//Create a new user
router.post("/user/new", (req, res) => {
  var user = req.body;
  console.log(user);

  Database.addUser(user, function (result) {
    console.log(result);
    res.send({ insertID: result });
  });
});

//Login user
router.get("/user/login", function (req, res) {
  var username = req.query.username;
  var password = req.query.password;

  Database.Login(username, password, function (result) {
    if (result.length > 0) {
      res.send({
        loggedIn: true,
        ID: result[0].ID,
        Name: result[0].Name,
        Username: result[0].Username,
        Borough: result[0].Borough,
      });
    } else {
      res.send({ loggedIn: false });
    }
  });
});

//Update Sold Status
router.get("/listings/sold", function (req, res) {
  var ListingID = req.query.ListingID;
  var Sold = req.query.Sold;

  Database.updateSoldStatus(Sold, ListingID, function (result) {
    console.log(result);
    res.send({ affectedRow: result });
  });
});

//Get platforms
router.get("/platforms", function (req, res) {
  Database.getPlatforms(function (result) {
    res.json({ result });
  });
});

//Get Genres
router.get("/genres", function (req, res) {
  Database.getGenres(function (result) {
    res.json({ result });
  });
});

//Routes will be prefixed with /api
app.use("/api", router);

//START THE SERVER
http.listen(port, function () {
  var host = http.address().address;
  var port = http.address().port;
  console.log("Server running on http://%s:%s", host, port);
});
