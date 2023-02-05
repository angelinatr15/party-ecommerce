const pool = require("../../../db/connection");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const users = await pool.query("SELECT * FROM users");
      res.json(users.rows);
    } catch (e) {
      console.log(e.message);
    }
  } else if (req.method === "POST") {
    const user = req.body;

    try {
      const newUser = await pool.query(
        "INSERT INTO users(first_name, last_name, phone_number, email, password, role) VALUES($1, $2, $3, $4,$5,$6) RETURNING *",
        [
          user.first_name,
          user.last_name,
          user.phone_number,
          user.email,
          user.password,
          user.role,
        ]
      );

      res.json(newUser.rows[0]);
    } catch (e) {
      console.log(e.message);
    }
  } else {
  }
}
