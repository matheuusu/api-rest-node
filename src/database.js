import mysql from "mysql2/promise";
import { randomUUID } from "node:crypto";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "mydb",
});

export async function selectUsers() {
  const users = connection.query("SELECT * FROM users;");
  return users;
}

export async function selectUser(id) {
  const user = await connection.query("SELECT * FROM users WHERE id=?;", [id]);
  return user;
}

export async function createUser(user) {
  const values = [
    randomUUID(),
    user.name,
    user.email,
    user.password,
    user.type,
  ];

  await connection.query(
    "INSERT INTO users(id, name, email, password, user_type) VALUES (?, ?, ?, ?, ?);",
    values
  );
}

export async function updateUser(id, user) {
  const values = [user.name, user.email, user.password, id];
  await connection.query(
    "UPDATE users SET name=?, email=?, password=? WHERE id=?;",
    values
  );
}

export async function deleteUser(id) {
  await connection.query("DELETE FROM users WHERE id=?;", [id]);
}
