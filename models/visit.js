const { Client } = require('pg');

var Visit = {};

Visit.create = function(userId, name, callback) {
  const client = Visit.connection();

  var text = "INSERT INTO Visits(userId, name) VALUES ($1, $2) RETURNING *";
  var values = [userId, name];

  client.query(text, values, function (err, results) {
    if (err) {
      console.log(err);
      callback(null, err);
    } else {
      console.log(results);
      callback(results.rows[0], null);
    }
    client.end();
  });
}

Visit.search = function(name, userId, id,  callback) {
  const client = Visit.connection();

  var query;
  var params;
  if (id != null) {
    console.log("id provided")
    query = {
      text: "SELECT * FROM Visits WHERE id = $1",
      values: [id]
    }
  } else if (name !== null && userId !== null) {
    console.log(name)
    console.log("User ID: " + userId)
    query = {
      text: "SELECT * FROM Visits WHERE userId = $1 AND name LIKE $2 ORDER BY created_at DESC LIMIT 5",
      values: [userId, '%' + name + '%']
    }
  } else {
    callback(null, new Error("Please provide a user id and name, or an id"))
  }

  client.query(query, function (err, results) {
    if (err) {
      console.log(err);
      callback(null, err);
    } else {
      console.log(results);
      callback(results.rows, null);
    }
    client.end();
  })
}

Visit.connection = function() {
  const client = new Client({ connectionString: process.env.DATABASE_URL })
  client.connect();

  return client
}

for (var k in Visit) {
  exports[k] = Visit[k];
}
