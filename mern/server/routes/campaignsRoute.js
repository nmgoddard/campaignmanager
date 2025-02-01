import express from "express";
import Joi from "joi";
import { getAllCampaigns, getCampaignById, addCampaign, updateCampaign, deleteCampaign } from "../models/campaignModel.js";
import { sanitizeInput } from "../utils/sanitization.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Joi validation schema for campaigns
const campaignSchema = Joi.object({
  //campaignID is a MongoDB _id now
  //campaignID: Joi.number().integer().required(),
  title: Joi.string().required(),
  description: Joi.string().optional(),
  createdBy: Joi.string().required(), // Store user ID or username
  createdAt: Joi.date().default(() => new Date()),
});

// Validate MongoDB ObjectId
const validateObjectId = (id) => ObjectId.isValid(id);

// Get all campaigns
router.get("/", async (req, res) => {
  try {
    const campaigns = await getAllCampaigns();
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch campaigns" });
  }
});

// Get campaign by ID
router.get("/:id", async (req, res) => {
  try {
    if (!validateObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid campaign ID format" });
    }
    const campaign = await getCampaignById(req.params.id);
    if (!campaign) return res.status(404).json({ error: "Campaign not found" });
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch campaign" });
  }
});

// Add a new campaign
router.post("/", async (req, res) => {
  try {
    const sanitizedData = sanitizeInput(req.body);
    const { error } = campaignSchema.validate(sanitizedData);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const result = await addCampaign(sanitizedData);
    res.status(201).json(result);
  } catch (error) {
    console.error("Failed to add campaign:", error);
    res.status(500).json({ error: "Failed to add campaign" });
  }
});

// Update a campaign
router.put("/:id", async (req, res) => {
  try {
    if (!validateObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid campaign ID format" });
    }
    const sanitizedData = sanitizeInput(req.body);
    const { error } = campaignSchema.validate(sanitizedData);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const result = await updateCampaign(req.params.id, sanitizedData);
    if (result.modifiedCount === 0) return res.status(404).json({ error: "No campaign found to update" });

    res.json({ message: "Campaign updated successfully", result });
  } catch (error) {
    console.error("Failed to update campaign:", error);
    res.status(500).json({ error: "Failed to update campaign" });
  }
});

// Delete a campaign
router.delete("/:id", async (req, res) => {
  try {
    if (!validateObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid campaign ID format" });
    }
    const result = await deleteCampaign(req.params.id);
    res.json(result);
  } catch (error) {
    console.error("Failed to delete campaign:", error);
    res.status(500).json({ error: "Failed to delete campaign" });
  }
});

export default router;
