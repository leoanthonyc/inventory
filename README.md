# inventory

Keep track of your personal things. You can add, edit and delete items in you inventory.

This app was created using the **PERN** Stack (**P**ostgreSQL, **E**xpress, **R**eact, and **N**ode.js)

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

### Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- Start frontend service:
  ```
    cd client
    npm start
  ```
- Open [http://localhost:3000](http://localhost:3000) in the browser.
