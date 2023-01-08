const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"todolist"
})


app.get('/api/items',(req, res) => {
    let sqlQuery = "SELECT * FROM list";
    
    let query = db.query(sqlQuery, (err, results) => {
      if(err) throw err;
      console.log(results)
      res.send(JSON.stringify(results));
      
      // res.send(apiResponse(results));
    });
  });

  app.post('/api/post',(req, res) => {
    console.log(req.body.data)
          let dataa = {data: req.body.data};
          
          let sqlQuery = "INSERT INTO list SET ?";
          
          let query = db.query(sqlQuery, dataa,(err, results) => {
            if(err) throw err;
            console.log(results)
            res.send(JSON.stringify(results));
          });
});

app.get('/api/items/:id',(req, res) => {
  let sqlQuery = "SELECT * FROM list WHERE id=" + req.params.id;
  let query = db.query(sqlQuery, (err, results) => {
      if(err) throw err;
      console.log(results)
      // res.send(apiResponse(results));
      res.send(JSON.stringify(results));
    });
  });

  app.patch('/api/items/:id',(req, res) => {
    let sqlQuery = "UPDATE list SET data='"+req.body.data+"' WHERE id="+req.params.id;
    console.log(req.params.id);
    
    let query = db.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send((results));
    });
  });

  app.delete('/api/items/:id',(req, res) => {
    let sqlQuery = "DELETE FROM list WHERE id="+req.params.id+"";
      
    let query = db.query(sqlQuery, (err, results) => {
      if(err) throw err;
        res.send((results));
    });
  });

app.get('/',(req,res)=>{
    res.send("helllo");
})



app.listen(5000,()=>{
    console.log("server running on port 5000");
})