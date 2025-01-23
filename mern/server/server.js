import express from "express";
import cors from "cors";

import characters from "./routes/characters.js";
import campaigns from "./routes/campaigns.js";
import monsters from "./routes/monsters.js";
import notes from "./routes/notes.js";
import items from "./routes/items.js";
import locations from "./routes/locations.js";

const PORT = process.env.PORT || 5050;
const app = express();

//Middleware
//declare routes to the database here
app.use(cors());
app.use(express.json());
app.use("/characters", characters);
app.use("/campaigns", campaigns);
app.use("/monsters", monsters);
app.use("/notes", notes);
app.use("/locations", locations);
app.use("/items", items);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});