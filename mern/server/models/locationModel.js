import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const collectionName = "locations";

// Get all locations for a campaign
export const getLocationsByCampaign = async (campaignID) => {
  return await db.collection(collectionName).find({ campaignID }).toArray();
};

// Get location by ID
export const getLocationById = async (id) => {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid location ID format");
    }
    const location = await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
    return location;
  } catch (error) {
    console.error(`Error fetching location by ID: ${id} `, error);
    throw error;
  }
};

// Add a new location
export const addLocation = async (locationData) => {
  try {
    if (!locationData.campaignID || !locationData.locationType) {
      throw new Error("Location must have a campaignID and locationType");
    }
    const result = await db.collection(collectionName).insertOne(locationData);
    return result;
  } catch (error) {
    console.error("Error adding location:", error);
    throw error;
  }
};

// Update a location
export const updateLocation = async (id, locationData) => {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid location ID format");
    }
    const result = await db.collection(collectionName).updateOne(
      { _id: new ObjectId(id) },
      { $set: locationData }
    );
    return result;
  } catch (error) {
    console.error(`Error updating location: ${id}`, error);
    throw error;
  }
};

// Delete a location
export const deleteLocation = async (id) => {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid location ID format");
    }
    const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error(`Error deleting location: ${id}`, error);
    throw error;
  }
};
