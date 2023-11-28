var mysql = require("mysql");

var con = mysql.createConnection({
  host: "x",
  user: "x",
  password: "x",
  database: "x",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//MySQL statement for retreiving listings using keyword, platform, and genre
function getListingsBySearch(searchKeyword, platform, genre, callback) {
  con.query(
    "SELECT * FROM Listings WHERE Sold=0 AND Title LIKE ? AND Platform LIKE ? AND Genre LIKE ?",
    ["%" + searchKeyword + "%", platform + "%", genre + "%"],
    function (err, result) {
      if (err) {
        console.log(err);
        callback({ message: "There was an error!" });
      } else {
        var string = JSON.stringify(result);
        var json = JSON.parse(string);
        callback(json);
      }
    }
  );
}

//MySQL statement for creating a new listing
function addListing(data, callback) {
  con.query("INSERT INTO Listings SET ?", data, function (err, result) {
    if (err) {
      console.log(err);
      callback("There was an error!");
    } else {
      callback(result.insertId);
    }
  });
}

//MYSQL statement for deleting an existing listing
function deleteListing(id, callback) {
  con.query("DELETE FROM Listings WHERE ID = ?", [id], function (err, result) {
    if (err) {
      callback({ message: "There was an error!" });
    } else {
      callback(result.affectedRows);
    }
  });
}

//MySQL statement for retreiving all listings assigned to a user
function getUserListings(id, callback) {
  con.query(
    "SELECT * FROM Listings WHERE UserID = ? ORDER BY CreatedOn",
    [id],
    function (err, result) {
      if (err) {
        console.log(err);
        callback({ message: "There was an error!" });
      } else {
        var string = JSON.stringify(result);
        var json = JSON.parse(string);
        callback(json);
      }
    }
  );
}

//MySQL statement for updating a listing
function updateListing(data, ListingID, callback) {
  con.query(
    "UPDATE Listings SET ? WHERE ID = ?",
    [data, ListingID],
    function (err, result) {
      if (err) {
        console.log(err);
        callback("There was an error!");
      } else {
        callback(true);
      }
    }
  );
}

//MySQL statement for updating sold status
function updateSoldStatus(Sold, ListingID, callback) {
  con.query(
    "UPDATE Listings SET Sold = ? WHERE ID = ?",
    [Sold, ListingID],
    function (err, result) {
      if (err) {
        console.log(err);
        callback("There was an error!");
      } else {
        callback(result.affectedRows);
      }
    }
  );
}

//MySQL statement for creating a new user
function addUser(data, callback) {
  con.query("INSERT INTO User SET ?", data, function (err, result) {
    if (err) {
      console.log(err);
      callback("There was an error!");
    } else {
      callback(result.insertId);
    }
  });
}

//MySQL statement for login user
function Login(username, password, callback) {
  con.query(
    "SELECT * FROM User WHERE Username = ? AND BINARY(`Password`) = ?",
    [username, password],
    function (err, result, fields) {
      if (err) {
        callback({ message: "There was an error!" });
      } else {
        var string = JSON.stringify(result);
        var json = JSON.parse(string);
        callback(json);
      }
    }
  );
}

//MySQL statement for retrieving platforms
function getPlatforms(callback) {
  con.query("SELECT * FROM Platform", function (err, result) {
    if (err) {
      console.log(err);
      callback({ message: "There was an error!" });
    } else {
      var string = JSON.stringify(result);
      var json = JSON.parse(string);
      callback(json);
    }
  });
}

//MySQL statement for retrieving genres
function getGenres(callback) {
  con.query("SELECT * FROM Genre", function (err, result) {
    if (err) {
      console.log(err);
      callback({ message: "There was an error!" });
    } else {
      var string = JSON.stringify(result);
      var json = JSON.parse(string);
      callback(json);
    }
  });
}

module.exports = {
  getListingsBySearch,
  addListing,
  getUserListings,
  deleteListing,
  updateListing,
  addUser,
  Login,
  getPlatforms,
  getGenres,
  updateSoldStatus
};
