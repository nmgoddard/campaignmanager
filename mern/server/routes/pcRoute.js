import express from "express";
import Joi from "joi";
import { getAllPCs, getPCById, addPC, updatePC, deletePC } from "../models/pcModel.js";
import { sanitizeInput } from "../utils/sanitization.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Joi validation schema for player characters
const pcSchema = Joi.object({
  campaignID: Joi.number().integer().required(),
  name: Joi.string().required(),
  alignment: Joi.string().required(),
  race: Joi.string().required(),
  class: Joi.string().required(),
  speed: Joi.number().integer().required(),
  hitDice: Joi.string().required(),
  proficiencies: Joi.array().items(Joi.string()).required(),
  stats: Joi.object({
    strength: Joi.number().integer().min(1).max(20).required(),
    dexterity: Joi.number().integer().min(1).max(20).required(),
    constitution: Joi.number().integer().min(1).max(20).required(),
    intelligence: Joi.number().integer().min(1).max(20).required(),
    wisdom: Joi.number().integer().min(1).max(20).required(),
    charisma: Joi.number().integer().min(1).max(20).required()
  }).required(),
  size: Joi.string().required(),
  size_description: Joi.string().optional(),
  languages: Joi.array().items(Joi.string()).required(),
  language_desc: Joi.string().optional(),
  traits: Joi.array().items(Joi.string()).required(),
  startingProficiencies: Joi.array().items(Joi.string()).required(),
  classProficiencies: Joi.array().items(Joi.string()).required(),
});

// Validate MongoDB ObjectId
const validateObjectId = (id) => ObjectId.isValid(id);

// Get all player characters
router.get("/", async (req, res) => {
  try {
    const pcs = await getAllPCs();
    res.json(pcs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch player characters" });
  }
});

// Get player character by ID
router.get("/:id", async (req, res) => {
  try {
    if (!validateObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid player character ID format" });
    }
    const pc = await getPCById(req.params.id);
    if (!pc) return res.status(404).json({ error: "Player character not found" });
    res.json(pc);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch player character" });
  }
});

// Add a new player character
router.post("/", async (req, res) => {
  try {
    const sanitizedData = sanitizeInput(req.body);
    const { error } = pcSchema.validate(sanitizedData);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const result = await addPC(sanitizedData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to add player character" });
  }
});

// Update a player character
router.put("/:id", async (req, res) => {
  try {
    if (!validateObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid player character ID format" });
    }
    const sanitizedData = sanitizeInput(req.body);
    const { error } = pcSchema.validate(sanitizedData);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const result = await updatePC(req.params.id, sanitizedData);
    if (result.modifiedCount === 0) return res.status(404).json({ error: "No player character found to update" });

    res.json({ message: "Player character updated successfully", result });
  } catch (error) {
    res.status(500).json({ error: "Failed to update player character" });
  }
});

// Delete a player character
router.delete("/:id", async (req, res) => {
  try {
    if (!validateObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid player character ID format" });
    }
    const result = await deletePC(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete player character" });
  }
});

export default router;
