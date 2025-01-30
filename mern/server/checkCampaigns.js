import "dotenv/config";
import db from "./db/connection.js";

const checkDuplicate = async () => {
  const duplicate = await db.collection("campaigns").findOne({ campaignID: 12345 });
  console.log("Duplicate Campaign Found:", duplicate);
  process.exit(); // Exit after checking
};

checkDuplicate();
