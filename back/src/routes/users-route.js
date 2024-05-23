import express from "express";
import { UserModel } from "../database/user.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export const usersRouter = express.Router();

const SECRET_KEY = "azerty";

usersRouter.post("/inscription", async (req, res) => {
  console.log(req.body);

  // * Step 1: Test the received data
  const { email, password, username } = req.body;

  if (!email.includes("@") || username === "" || password.length < 6) {
    return res.status(400).json({ error: "incorrect data" });
  }

  //   * Step 2: Test if the user exists
  const userFromDB = await UserModel.find({ email: email });
  console.log(userFromDB);
  if (userFromDB.length > 0) {
    return res.status(401).json({ error: "this user already exists" });
  }

  // * Step 3: Hash the password
  const hashedPassword = await bcrypt.hash(password, 6);
  console.log(hashedPassword);

  // * Step 4: Register the user
  const newUser = new UserModel({
    email,
    hashedPassword,
    username,
  });

  const user = await newUser.save();
  console.log(user);
  return res.json({
    user: {
      email: user.email,
      username: user.username,
      id: user._id,
    },
  });
});
//* Exercice:
//Créer un route: /api/user/connexion
//Verifier si l'email et le mot de passe on ete réçu dans le coprs de la requete sinon retourner un erreur
//Récuperer l'utilisateur depuis la base de données avec son mail, retourner un erreur si il n'existe pas
//Verifier si le mot de passe est correcte (utiliser la methode compare de bcrypt)
//Retourner l'utilisateur dans la réponse
usersRouter.post("/connexion", async (req, res) => {
  const mailBody = req.body.email;
  const passwordBody = req.body.password;

  if (!mailBody || !passwordBody) {
    return res.status(401).json({ error: "Email et mot de passe obligatoire" });
  }

  if (!mailBody.includes("@") || passwordBody.length < 6) {
    return res.status(401).json({ error: "Données incorrectes" });
  }

  const [userFromDB] = await UserModel.find({ email: mailBody });
  console.log(userFromDB);

  if (!userFromDB) {
    return res.status(401).json({ error: "Utilisateur introuvable" });
  }

  const isPasswordValid = await bcrypt.compare(
    passwordBody,
    userFromDB.hashedPassword
  );

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Données incorrectes" });
  }

  const access_token = jsonwebtoken.sign({ id: userFromDB._id }, SECRET_KEY);
  console.log(access_token);
  return res.json({ user: userFromDB, access_token });
});

usersRouter.get("/me", async (req, res) => {
  const access_token = req.headers.authorization;
  console.log(req.headers);

  const token = access_token.split(" ")[1];
  const verifiedToken = jsonwebtoken.verify(token, SECRET_KEY);

  if (!verifiedToken) {
    return res.status(401).json({ error: "Token invalide" });
  }

  const user = await UserModel.findById(verifiedToken.id);
  return res.json({ user });
});

//! Etape 12: Back
usersRouter.put("/me", async (req, res) => {
  const newUsername = req.body.username;
  const newAvatar = req.body.avatarUrl;

  if (!newUsername || !newAvatar) {
    return res.status(400).json({ error: "Données invalides" });
  }

  const access_token = req.headers.authorization;
  console.log("Authorization Header:", access_token);
  if (!access_token) {
    return res.status(401).json({ error: "Token manquant" });
  }

  const token = access_token.split(" ")[1];
  const verifiedToken = jsonwebtoken.verify(token, SECRET_KEY);

  if (!verifiedToken) {
    return res.status(401).json({ error: "Token invalide !" });
  }

  const user = await UserModel.findById(verifiedToken.id);
  if (!user) {
    return res.status(404).json({ error: "Utilisateur introuvable" });
  }

  user.username = newUsername;
  user.avatarUrl = newAvatar;

  await user.save();

  return res.json({ user });
});

