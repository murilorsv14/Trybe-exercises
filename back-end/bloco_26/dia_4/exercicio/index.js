const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(bodyParser.json());
app.use(cors());

const drinks = [
  { id: 1, name: "Refrigerante Lata", price: 5.0 },
  { id: 2, name: "Refrigerante 600ml", price: 8.0 },
  { id: 3, name: "Suco 300ml", price: 4.0 },
  { id: 4, name: "Suco 1l", price: 10.0 },
  { id: 5, name: "Cerveja Lata", price: 4.5 },
  { id: 6, name: "Água Mineral 500 ml", price: 5.0 },
];

const port = 3002;


app.get("/ping", (req, res) => res.json({message: "pong"}));

app.get("/receitas", (req, res) => res.json(drinks));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.post("/hello", (req) => {

  console.log(req);
  // const {nome} = req.body;

  // if(req.body) return res.json({ "message": `Hello, ${nome}!` } );
});

app.get("/receitas/:id", (req, res)=> {
  const { id } = req.params;
  const drink = drinks.find((element) => element.id === parseInt(id));

  if(!drink) return res.status(404).json({message: "Not found drink"});

  res.status(200).json(drink);
});

app.post("/receitas", (req, res)=> {
  const {body, body:{id, name, price}}= req;
  console.log(body);
  drinks.push({id, name, price});
  res.status(201).send({"message": "sucessfull", "item": `${id} ${name} ${price}`});
});

app.post("/greetings", (req, res)=> {
  const {name, age} = req.body;

  if (age >= 17) return res.status(200).json({"message": `Hello, ${name}`});

  res.status(401).json({"message": "Unauthorized"});
});

app.get("/simpsons", (req, res) => {
  let simpsons;
  try {
    simpsons = fs.readFileSync("./simpsons.json", "utf-8");
  } catch (err) {
    return res.status(500).send({message: "Internal Server Error"});
  }
  res.status(200).json(JSON.parse(simpsons));
});

app.get("/simpsons/:id", (req, res) => {
  const { id } = req.params;
  let simpsons;
  try {
    simpsons = fs.readFileSync("./simpsons.json", "utf-8");
  } catch (err) {
  return res.status(500).send({message: "Internal Server Error"});
  }
  const simpsonsArray = JSON.parse(simpsons);
  const simpsonsFiltered = simpsonsArray.filter((simpson) => simpson.id == id);

  if(simpsonsFiltered.length === 0) return res.status(404).send({message: "simpson not found"});

  res.status(200).json(simpsonsFiltered);
});

app.post("/simpsons", (req, res) => {
  const {id, name} = req.body;
  let simpsons;
  try {
    simpsons = JSON.parse(fs.readFileSync("./simpsons.json", "utf-8"));
  } catch (err) {
    return res.status(500).send({message: "Internal Server Error"});
  }
  if (simpsons[id] !== undefined) return res.status(409).send({message: "id already exists"});
  try {
    simpsons.push({id: id, name: name});
    fs.writeFileSync("./simpsons.json", JSON.stringify(simpsons));
  } catch (error) {
    return res.status(400).send({message: "error na escrita"});
  }
  res.status(204).end();

});
