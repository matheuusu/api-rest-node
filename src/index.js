import express from "express";
import {
  createUser,
  deleteUser,
  selectUser,
  selectUsers,
  updateUser,
} from "./database.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/users", async (req, res) => {
  const user = req.body;
  await createUser(user);

  return res.status(201).send();
});

app.get("/users", async (req, res) => {
  const [users] = await selectUsers();
  return res.json(users);
});

app.get("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const [user] = await selectUser(userId);

  return res.json(user);
});

app.patch("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = req.body;

  await updateUser(userId, user);
  return res.status(204).send();
});

app.delete("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  await deleteUser(userId);

  return res.status(204).send();
});

app.listen(3000, () => {
  console.log("server is running");
});
