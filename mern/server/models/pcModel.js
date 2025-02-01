import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const collectionName = "player_characters";

// Get all player characters
export const getAllPCs = async () => {
  return await db.collection(collectionName).find({}).toArray();
};

// Get player character by ID
export const getPCById = async (id) => {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid player character ID format");
    }
    const pc = await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
    return pc;
  } catch (error) {
    console.error("Error fetching player character by ID:", error);
    throw error;
  }
};

// Add a new player character
export const addPC = async (pcData) => {
  try {
    const result = await db.collection(collectionName).insertOne(pcData);
    return result;
  } catch (error) {
    console.error("Error adding player character:", error);
    throw error;
  }
};

// Update a player character
export const updatePC = async (id, pcData) => {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid player character ID format");
    }
    const result = await db.collection(collectionName).updateOne(
      { _id: new ObjectId(id) },
      { $set: pcData }
    );
    return result;
  } catch (error) {
    console.error("Error updating player character:", error);
    throw error;
  }
};

// Delete a player character
export const deletePC = async (id) => {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid player character ID format");
    }
    const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error("Error deleting player character:", error);
    throw error;
  }
};
