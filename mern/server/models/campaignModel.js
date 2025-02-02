import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const collectionName = "campaigns";

// Get all campaigns (Convert `_id` to string)
export const getAllCampaigns = async () => {
  try {
    const campaigns = await db.collection(collectionName).find({}).toArray();

    return campaigns.map(campaign => ({
      ...campaign,
      _id: campaign._id.toString(), // Convert `_id` to string for API response
    }));
  } catch (error) {
    console.error("Error fetching all campaigns:", error);
    throw error;
  }
};

// Get campaign by ID (Convert string ID to ObjectId, convert `_id` back to string)
export const getCampaignById = async (id) => {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid campaign ID format");
    }

    const campaign = await db.collection(collectionName).findOne({ _id: new ObjectId(id) });

    if (!campaign) {
      throw new Error("Campaign not found");
    }

    return { ...campaign, _id: campaign._id.toString() }; // Convert `_id` to string for API response
  } catch (error) {
    console.error(`Error fetching campaign ID ${id}:`, error);
    throw error;
  }
};

// Add a new campaign (MongoDB auto-generates `_id`)
export const addCampaign = async (campaignData) => {
  try {
    const result = await db.collection(collectionName).insertOne(campaignData);

    return { ...campaignData, _id: result.insertedId.toString() }; // Convert `_id` to string for API response
  } catch (error) {
    console.error("Error adding campaign:", error);
    throw error;
  }
};

// Update a campaign (Ensure `_id` is an ObjectId)
export const updateCampaign = async (id, campaignData) => {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid campaign ID format");
    }

    const result = await db.collection(collectionName).updateOne(
      { _id: new ObjectId(id) },
      { $set: campaignData }
    );

    if (result.modifiedCount === 0) {
      throw new Error("No campaign found to update");
    }

    return { message: "Campaign updated successfully", result };
  } catch (error) {
    console.error(`Error updating campaign ID ${id}:`, error);
    throw error;
  }
};

// Delete a campaign (Ensure `_id` is ObjectId)
export const deleteCampaign = async (id) => {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid campaign ID format");
    }

    const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      throw new Error("No campaign found to delete");
    }

    return { message: "Campaign deleted successfully", result };
  } catch (error) {
    console.error(`Error deleting campaign ID ${id}:`, error);
    throw error;
  }
};
