import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const collectionName = "campaigns";

//Get all campaigns
export const getAllCampaigns = async () => {
    return await db.collection(collectionName).find({}).toArray();
};

//Get campaign by ID
export const getCampaignById = async (id) => {
    try {
        if (!ObjectId.isValid(id)) {
            throw new Error("Invalid campaign ID format");
        }
        const campaign = await db.collection(collectionName).findOne({_id: new ObjectId(id) });
        return campaign;
    } catch (error) {
        console.error("Error fetching campaign by ID: ", id, "Error: ", error);
        throw error;
    }
};

//Add a new campaign
export const addCampaign = async (campaignData) => {
    try {
    //   // Generate a unique campaignID using the current timestamp
    //   const uniqueCampaignID = Date.now(); // Example: 1714085293587
  
    //   // Assign it to campaignData
    //   campaignData.campaignID = uniqueCampaignID;
  
    //   console.log("Generated campaignID:", uniqueCampaignID); // Debugging log
  
      const result = await db.collection("campaigns").insertOne(campaignData);
      return result;    //MongoDB auto-assigns _id; no need for campaignID for now...
    } catch (error) {
      console.error("Error adding campaign:", error);
      throw error;
    }
  };
  

//Update a campaign
export const updateCampaign = async (id, campaignData) => {
    try {
        if (!ObjectId.isValid(id)) {
            throw new Error("Invalid campaign ID format");
        }
        const result = await db.collection(collectionName).updateOne(
            { _id: new ObjectId(id) },
            { $set: campaignData }
        );
        return result;
    } catch (error) {
        console.error("Error updating campaign: ", id, "  Error: ", error);
        throw error;
    }
};

//Delete a campaign
export const deleteCampaign = async (id) => {
    try {
        if (!ObjectId.isValid(id)) {
            throw new Error("Invalid campaign ID format");
        }
        const result = await db.collection(collectionName).deleteOne({_id: new ObjectId(id) });
        return result;
    } catch (error) {
        console.error("Error deleting campaign: ", id, "  Error: ", error);
        throw error;
    }
};