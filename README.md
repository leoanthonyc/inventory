# inventory

Keep track of your personal things. You can add, edit and delete items in you inventory.

This app is created using the **PERN** Stack (**P**ostgreSQL, **E**xpress, **R**eact, and **N**ode.js)

## Local setup

### Backend

- Install postgresql
- Execute sql commands inside `server/database.sql`
- Use correct values inside `server/.env`,
  - `DB_HOST`
  - `DB_PORT`
  - `DB_NAME`
  - `DB_USER`
  - `DB_PASSWORD`
- Start the server using:
  > `node server/index.js`
