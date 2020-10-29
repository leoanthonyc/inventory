const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

app.post('/items', async(req, res) => {
  try {
    // TODO: Add check
    const { name } = req.body;
    const newItem = await pool.query(
      "INSERT INTO items(name) VALUES($1) RETURNING *",
      [name]
    );
    res.json(newItem.rows[0]);
  } catch(err) {
    console.error(err.message);
  }
});

app.get('/items', async(req, res) => {
  try {
    // TODO: Add check
    const items = await pool.query("SELECT * from items");
    res.json(items.rows);
  } catch(err) {
    console.error(err.message);
  }
});

app.get('/items/:id', async(req, res) => {
  try {
    // TODO: Add check
    const { id } = req.params
    const item = await pool.query(
      "SELECT * from items WHERE id=$1",
      [id]
    );
    res.json(item.rows[0]);
  } catch(err) {
    console.error(err.message);
  }
});

app.put('/items/:id', async(req, res) => {
  try {
   const { id } = req.params;
   const { name } = req.body;
   const todo = await pool.query(
    "UPDATE items SET name=$1 WHERE id=$2 RETURNING *",
    [name, id]
   );
   res.json(todo.rows[0])
  } catch(err) {
    console.error(err.message);
  }
});

app.delete('/items/:id', async(req, res) => {
  try {
    const { id } = req.params
    await pool.query(
      "DELETE FROM items WHERE id=$1",
      [id]
    );
    res.json('Item was deleted!')
  } catch (err) {
    console.error(err.message)
  }
})

app.listen(5000, () =>{
  console.log('Now listening on port 5000');
});