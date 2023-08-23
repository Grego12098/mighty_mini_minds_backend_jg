import { users } from "../models/usersModel.js";
import bcrypt from "bcrypt";

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

