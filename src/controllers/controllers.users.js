import { users } from "../models/usersModel.js";

export const getUsers = async (req, res) => {
    try {
        const listUsers = await users.findAll();
        res.send(listUsers);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await users.findOne({
            where: {
                uuid: req.params.id
            }
        });
        res.send(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createUser = async (req, res) => {
    try {
        const { name, username, password, contactEmail, contactName, contactRelationship, avatarUrl } = req.body;
        const newUser = await users.create({
            name,
            username,
            password,
            contactEmail,
            contactName,
            contactRelationship,
            avatarUrl
        });
        res.send(newUser);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        await users.destroy({
            where:{
                uuid: id,
            }
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const { name, username, password, contactEmail, contactName, contactRelationship, avatarUrl } = req.body;
        const updatedUser =  await users.findOne({
            where: {
                uuid: id,
            }
        });
        updatedUser.name = name;
        updatedUser.username = username;
        updatedUser.password = password;
        updatedUser.contactEmail = contactEmail;
        updatedUser.contactName = contactName;
        updatedUser.contactRelationship = contactRelationship;
        updatedUser.avatarUrl = avatarUrl;
        res.send(updatedUser);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}