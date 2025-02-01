import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const collectionName = "npcs";

// Get all NPCs
export const getAllNPCs = async () => {
  return await db.collection(collectionName).find({}).toArray();
};

// Get NPC by ID with ObjectId conversion
export const getNPCById = async (id) => {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid NPC ID format");
    }
    const npc = await db.collection("npcs").findOne({ _id: new ObjectId(id) });
    return npc;
  } catch (error) {
    console.error("Error fetching NPC by ID:", error);
    throw error;
  }
};

// Add a new NPC
export const addNPC = async (npcData) => {
  try {
    const result = await db.collection(collectionName).insertOne(npcData);
    return result;
  } catch (error) {
    console.error("Error adding NPC:", error);
    throw error;
  }
};

// Update an existing NPC
export const updateNPC = async (id, npcData) => {
    try {
      const result = await db.collection("npcs").updateOne(
        { _id: new ObjectId(id) },
        { $set: npcData }
      );
  
      return result;
    } catch (error) {
      console.error("Error updating NPC:", error);
      throw error;
    }
  };
  

// Delete an NPC
export const deleteNPC = async (id) => {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid NPC ID format");
    }
    const result = await db.collection("npcs").deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error("Error deleting NPC:", error);
    throw error;
  }
};
