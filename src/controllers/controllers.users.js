import { users } from "../models/usersModel.js";

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
    const newUser = await users.create({
      name,
      username,
      password,
      contactEmail,
      contactName,
      contactRelationship,
      avatarUrl,
    });
    res.send(newUser);
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
    const { id } = req.params;
    const {
      name,
      username,
      password,
      contactEmail,
      contactName,
      contactRelationship,
      avatarUrl,
    } = req.body;

    const updatedUser = await users.findOne({
      where: {
        uuid: id,
      },
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await updatedUser.update({
      name,
      username,
      password,
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
