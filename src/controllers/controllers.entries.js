import { entries } from "../models/entryJournalModel.js";
import jwt from "jsonwebtoken";
import{JWT_SECRET} from "../config.js";

export const getEntries = async (req, res) => {
  try {
    const listEntries = await entries.findAll();
    res.send(listEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

export const createEntry = async (req, res) => {
  try {
    const {user_uuid} = req.params;
    const {
      mood,
      question_one,
      question_two,
      question_three,
      answer_one,
      answer_two,
      answer_three,
      share,
    } = req.body;
    const newEntry = await entries.create({
      mood,
      question_one,
      question_two,
      question_three,
      answer_one,
      answer_two,
      answer_three,
      share,
      user_uuid,
    });
    res.send(newEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

export const updateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const {
        mood,
        question_one,
        question_two,
        question_three,
        answer_one,
        answer_two,
        answer_three,
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
        question_one,
        question_two,
        question_three,
        answer_one,
        answer_two,
        answer_three,
        share,
    });

    res.send(updatedEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
