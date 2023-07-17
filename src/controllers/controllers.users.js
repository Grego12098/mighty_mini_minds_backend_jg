import { users } from "../models/usersModel.js";
import jwt from "jsonwebtoken";
import{JWT_SECRET} from "../config.js";
import bcrypt from "bcrypt";
import {createTokens, validateToken} from "./JWT.js";
import { entries } from "../models/entryJournalModel.js";

export const getUsers = async (req, res) => {
  try {
    const listUsers = await users.findAll();
    res.send(listUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  console.log("Get user by id")
  try {
    const user = await users.findOne({
      where: {
        uuid: req.params.user_uuid
      },
    });
    res.send(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const {
      name,
      username,
      password,
      contact_email,
      contact_name,
      contact_relationship,
      avatar_url,
    } = req.body;

      const existingUser = await users.findOne({ 
      where: {
        username : req.body.username 
      }
       
      });
       if (existingUser) {
       return res.status(400).json({ message: 'Username is already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
      await users.create({
      name,
      username,
      password: hashedPassword,
      contact_email,
      contact_name,
      contact_relationship,
      avatar_url,
    });
    res.send({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

export const updateUser = async (req, res) => {
  const { uuid } = req.params;
  const {
    name,
    username,
    password, 
    contact_email,
    contact_name,
    contact_relationship,
    avatar_url,
  } = req.body; 
  
  try {
    const updatedUser = await users.findOne({
      where: {
        uuid: uuid,
      },
    });
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (password) {
      const updatedHash = await bcrypt.hash(password, 10);
      updatedUser.password = updatedHash;
    }
    
    await updatedUser.update({
      name,
      username,
      password: updatedUser.password, 
      contact_email,
      contact_name,
      contact_relationship,
      avatar_url,
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

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const dbPassword = user.password;

    const validPassword = await bcrypt.compare(password, dbPassword);
    
  
    if (!validPassword) {
      return res.status(401).json({ auth: false, message: "Invalid credentials" });
    } else {
      const accessToken = createTokens(user);
      res.json({ username:user.username, token: accessToken, userId: user.uuid });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserEntries = async (req, res) => {
  try {
    console.log("getting the entries for user:");
    console.log(req.params.user_uuid) 
    const userEntries = await entries.findAll({
      where: {
        user_uuid: req.params.user_uuid,
      },
    });
    res.send(userEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}