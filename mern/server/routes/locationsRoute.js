import express from "express";
import Joi from "joi";
import { getLocationsByCampaign, getLocationById, addLocation, updateLocation, deleteLocation } from "../models/locationModel.js";
import { sanitizeInput } from "../utils/sanitization.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Joi validation schema for locations
const locationSchema = Joi.object({
  campaignID: Joi.string().required(),
  // locationID: Joi.number().integer().required(), //Using MongoDB _id
  locationType: Joi.string().valid("Plane", "Realm", "Country", "Region", "Site").required(),
  parentLocationID: Joi.string().optional(), // For nested sites
  name: Joi.string().required(),
  description: Joi.string().optional(),
});

// Validate MongoDB ObjectId
const validateObjectId = (id) => ObjectId.isValid(id);

// Get all locations for a specific campaign
router.get("/campaign/:campaignID", async (req, res) => {
  try {
    const locations = await getLocationsByCampaign(req.params.campaignID);
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch locations" });
  }
});

// Get a location by ID
router.get("/:id", async (req, res) => {
  try {
    if (!validateObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid location ID format" });
    }
    const location = await getLocationById(req.params.id);
    if (!location) return res.status(404).json({ error: "Location not found" });
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch location" });
  }
});

// Add a new location
router.post("/", async (req, res) => {
  try {
    const sanitizedData = sanitizeInput(req.body);
    const { error } = locationSchema.validate(sanitizedData);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const result = await addLocation(sanitizedData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to add location" });
  }
});

// Update a location
router.put("/:id", async (req, res) => {
  try {
    if (!validateObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid location ID format" });
    }
    const sanitizedData = sanitizeInput(req.body);
    const { error } = locationSchema.validate(sanitizedData);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const result = await updateLocation(req.params.id, sanitizedData);
    if (result.modifiedCount === 0) return res.status(404).json({ error: "No location found to update" });

    res.json({ message: "Location updated successfully", result });
  } catch (error) {
    res.status(500).json({ error: "Failed to update location" });
  }
});

// Delete a location
router.delete("/:id", async (req, res) => {
  try {
    if (!validateObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid location ID format" });
    }
    const result = await deleteLocation(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete location" });
  }
});

export default router;
