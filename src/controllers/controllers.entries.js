import { entries } from "../models/entryJournalModel.js";
import jwt from "jsonwebtoken";
import{JWT_SECRET} from "../config.js";

// CRUD functions for entries table
export const getEntries = async (req, res) => {
  try {
    const listEntries = await entries.findAll();
    res.send(listEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get entry by id
export const getEntry = async (req, res) => {
  try {
    const entry = await entries.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.send(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create a new entry (signup)
export const createEntry = async (req, res) => {
  try {
    const token = req.headers.authorization; // Corrected typo in the header field name
    const decoded = jwt.verify(token, JWT_SECRET); // Use the imported JWT_SECRET instead of process.env.JWT_SECRET
    const userUuid = decoded.userId;
    const {
      mood,
      questionOne,
      questionTwo,
      questionThree,
      answerOne,
      answerTwo,
      answerThree,
      share,
    } = req.body;
    const newEntry = await entries.create({
      mood,
      questionOne,
      questionTwo,
      questionThree,
      answerOne,
      answerTwo,
      answerThree,
      share,
      userUuid,
    });
    res.send(newEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a entry by id
export const deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEntry = await entries.findOne({
      where: {
        uuid: id,
      },
    });

    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    await entries.destroy({
      where: {
        uuid: id,
      },
    });

    res.status(200).json({ message: "Entry deleted successfully", deletedEntry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a entry by id
export const updateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const {
        mood,
        questionOne,
        questionTwo,
        questionThree,
        answerOne,
        answerTwo,
        answerThree,
        share,
    } = req.body;

    const updatedEntry = await entries.findOne({
      where: {
        uuid: id,
      },
    });

    if (!updatedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    await updatedEntry.update({
        mood,
        questionOne,
        questionTwo,
        questionThree,
        answerOne,
        answerTwo,
        answerThree,
        share,
    });

    res.send(updatedEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
