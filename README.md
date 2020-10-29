# inventory

Keep track of your personal things. You can add, edit and delete items in you inventory.

This app is created using the **PERN** Stack (**P**ostgreSQL, **E**xpress, **R**eact, and **N**ode.js)

## Local setup

### Backend

- Install postgresql
- Execute sql commands inside `server/database.sql`
- Create `server/.env` file with the following keys:
  - `DB_HOST=localhost`
  - `DB_PORT=5432`
  - `DB_NAME=inventory`
  - `DB_USER=postgres`
  - `DB_PASSWORD=postgres`
- Start backend service:
  ```
    cd server
    node index.js
  ```
