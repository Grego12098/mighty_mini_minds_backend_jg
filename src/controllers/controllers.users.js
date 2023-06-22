import { users } from "../models/usersModel.js";
import jwt from "jsonwebtoken";
import{JWT_SECRET} from "../config.js";
import bcrypt from "bcrypt";
import {createTokens} from "./JWT.js";

// CRUD functions for users table
export const getUsers = async (req, res) => {
  try {
    const listUsers = await users.findAll();
    res.send(listUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get user by id
export const getUser = async (req, res) => {
  try {
    const user = await users.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.send(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create a new user (signup)
export const createUser = async (req, res) => {
  try {
    const {
      name,
      username,
      password,
      contactEmail,
      contactName,
      contactRelationship,
      avatarUrl,
    } = req.body;

    const hash = await bcrypt.hash(password, 10);

    await users.create({
      name,
      username,
      hash,
      contactEmail,
      contactName,
      contactRelationship,
      avatarUrl,
    });

    res.send({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a user by id
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await users.findOne({
      where: {
        uuid: id,
      },
    });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await users.destroy({
      where: {
        uuid: id,
      },
    });

    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a user by id
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await users.findOne({
      where: {
        uuid: id,
      },
    });
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Hash the updated password
    const updatedHash = await bcrypt.hash(password, 10);
    
    await updatedUser.update({
      name,
      username,
      password: updatedHash, // Use the hashed password
      contactEmail,
      contactName,
      contactRelationship,
      avatarUrl,
    });
    
    res.send(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const authenticateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await users.findOne({
      where: {
        username: username
      }
    });
    console.log("User:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const dbPassword = user.password;
    console.log("DB Password:", dbPassword);

    const result = await new Promise((resolve, reject) => {
      bcrypt.compare(password, dbPassword, (err, passwordMatch) => {
        if (err) reject(err);
        resolve(passwordMatch);
      });
    });

    if (!result) {
      return res.status(401).json({ auth: false, message: "Invalid credentials" });
    } else {
      const accessToken = createTokens(user);
      res.send({ auth: true, token: accessToken });
      res.cookie("access-token", accessToken, { httpOnly: true, maxAge: 3600000 });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};