const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

app.post('/items', async(req, res) => {
  try {
    // TODO: Add check
    const { name, dateAdded } = req.body;
    const addedAt = dateAdded ? new Date(dateAdded).toISOString() : null;
    const newItem = await pool.query(
      "INSERT INTO items(name, added_at) VALUES($1, $2) RETURNING *",
      [name, addedAt]
    );
    res.json(newItem.rows[0]);
  } catch(err) {
    console.error(err.message);
  }
});

app.get('/items', async(req, res) => {
  try {
    // TODO: Add check
    const items = await pool.query("SELECT * FROM items ORDER BY added_at desc");
    res.json(items.rows);
  } catch(err) {
    console.error(err.message);
  }
});

app.get('/items/:query', async(req, res) => {
  try {
    // TODO: Add check
    const { query } = req.params
    const items = await pool.query(
      `SELECT * FROM items WHERE name ILIKE '%${query}%' ORDER BY added_at desc`
    );
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

app.get('/items/year/:year', async(req, res) => {
  try {
    // TODO: Add check
    const { year } = req.params;
    if (year === 'notdated') {
      const items = await pool.query("SELECT * FROM items WHERE added_at IS NULL;");
      res.json(items.rows);
    } else {
      const date = new Date(year).toISOString().split('T')[0]
      const items = await pool.query(`
        SELECT * FROM items
        WHERE date_part('year', added_at) = date_part('year', TO_DATE('${date}', 'YYYY-MM-DD'))
        ORDER BY added_at desc;
      `);
      res.json(items.rows);
    }

  } catch(err) {
    console.error(err.message);
  }
});

app.get('/years', async(req, res) => {
  try {
    const items = await pool.query("SELECT DISTINCT date_part('year', added_at) FROM items;");
    res.json(items.rows);
  } catch(err) {
    console.error(err.message);
  }
});

app.put('/items/:id', async(req, res) => {
  try {
   const { id } = req.params;
   const { name, dateAdded, tags } = req.body;
   const addedAt = dateAdded ? new Date(dateAdded).toISOString() : null;
   const itemTags = tags ? tags.join(",") : null;
   const todo = await pool.query(
    "UPDATE items SET name=$1, added_at=$2, tags=$3 WHERE id=$4 RETURNING *",
    [name, addedAt, itemTags, id]
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