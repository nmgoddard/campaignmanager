/*=========================== 
*   Title: PlayerCharacterSheet
*   Author: Grimm_mmirG
*   Date: 2025-25-01
*
*
*   For proper launching of the server: navigate to "campaignmanager\mern\server\" and execute node index.js
*
*
=============================*/

import React, { useState, useEffect } from "react";
import axios from "axios";

/* This section uses useState to store data for races, classes, selected classes and races and character stats */

const CharacterSheet = () => {
  
  const [races, setRaces] = useState([]); 
  const [classes, setClasses] = useState([]);
  // Currently selected race
  const [selectedRace, setSelectedRace] = useState(null); 
  // Currently selected class
  const [selectedClass, setSelectedClass] = useState(null); 

  /* The base stats that will be loaded: Note that these will be updated as per the race bonuses */
  const [baseStats, setBaseStats] = useState({
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  });

  /* Here is where the character details will be updated/stored as per the Class/Race selection */
  const [character, setCharacter] = useState({
    name: "",
    alignment: "",
    race: "",
    class: "",
    speed: 0,
    hitDice: "",
    proficiencies: [],
    stats: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 },
    size: "",
    size_description: "",
    languages: [],
    language_desc: "",
    traits: [],
    startingProficiencies: [],
    classProficiencies: [],
  });

  // New state for spellcasting
  const [spells, setSpells] = useState([]);
  const [knownSpells, setKnownSpells] = useState([]);
  const [spellSlots, setSpellSlots] = useState({
    level1: 0,
    level2: 0,
    level3: 0,
    // Add more levels as necessary
  });

  /* This is where our program will fetch race/class details to be used later */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [raceRes, classRes, spellRes] = await Promise.all([
          axios.get("https://www.dnd5eapi.co/api/races"),
          axios.get("https://www.dnd5eapi.co/api/classes"),
          axios.get("https://www.dnd5eapi.co/api/spells")
        ]);
  
        setRaces(raceRes.data.results);
        setClasses(classRes.data.results);
        setSpells(spellRes.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  const passivePerception = 10 + Math.floor((character.stats.wisdom - 10) / 2);
  
  // Add these states to control visibility
  const [showRaceDetails, setShowRaceDetails] = useState(false);
  const [showClassProficiencies, setShowClassProficiencies] = useState(false);
  
  /* This is where the character stats become updated whenever a race is selected or changed to another */
  const handleRaceChange = async (index) => {
    if (index === "") {
    // This is error handeling if the user reselected the default option
      setSelectedRace(null);
      setCharacter((prev) => ({
        ...prev,
        race: "",
        speed: 0,
        size: "",
        size_description: "",
        languages: [],
        language_desc: "",
        traits: [],
        stats: baseStats,
      }));
      return;
    }

    const raceDetails = await axios.get(`https://www.dnd5eapi.co/api/races/${index}`);
    // Set selected race details
    setSelectedRace(raceDetails.data); 

    // Update character state with selected race attributes
    setCharacter((prev) => ({
      ...prev,
      race: raceDetails.data.name,
      speed: raceDetails.data.speed,
      size: raceDetails.data.size,
      size_description: raceDetails.data.size_description,
      languages: raceDetails.data.languages.map((lang) => lang.name),
      language_desc: raceDetails.data.language_desc,
      traits: raceDetails.data.traits.map((trait) => trait.name),
      stats: { ...baseStats },
    }));

    // Apply race bonuses to stats
    applyRaceBonuses(raceDetails.data.ability_bonuses); 
    // Update saving throws based on race proficiencies
    updateSavingThrows(raceDetails.data.proficiencies); 
  };

  /* This is where the character stats become updated whenever a class is selected or changed to another */
  const handleClassChange = async (index) => {
    if (!index) {
    // This is error handeling if the user reselected the default option
      setSelectedClass(null); 
      setCharacter((prev) => ({
        ...prev,
        class: "",
        hitDice: "",
        proficiencies: [],
        startingProficiencies: [],
        classProficiencies: [],
      }));
      return;
    }

    const classDetails = await axios.get(`https://www.dnd5eapi.co/api/classes/${index}`);
    // Set selected class details
    setSelectedClass(classDetails.data); 

    /* Update character state with selected class attributes */ 
    setCharacter((prev) => ({
      ...prev,
      class: classDetails.data.name,
      hitDice: `d${classDetails.data.hit_die}`,
      proficiencies: classDetails.data.proficiencies.map((p) => p.name),
      startingProficiencies: classDetails.data.proficiencies.map((p) => p.name),
      classProficiencies: classDetails.data.proficiency_choices.map((p) => p.desc),
    }));

    // Reapply race bonuses if a race is selected
    if (selectedRace) {
      applyRaceBonuses(selectedRace.ability_bonuses); 
    }

    // Filter spells based on the selected class
    const classSpells = spells.filter(spell => spell.classes.some(cls => cls.index === classDetails.data.index));
    setSpells(classSpells);
  };

  /* Apply race ability score bonuses to the character stats */
  const applyRaceBonuses = (abilityBonuses) => {
    const statMap = {
      str: "strength",
      dex: "dexterity",
      con: "constitution",
      int: "intelligence",
      wis: "wisdom",
      cha: "charisma",
    };

    // Use base stats as a starting point
    const updatedStats = { ...baseStats }; 

    /* Loop through race bonuses and apply to stats */
    abilityBonuses.forEach((bonus) => {
        // Map ability score index to stat key
      const statKey = statMap[bonus.ability_score.index]; 
      if (statKey && updatedStats[statKey] !== undefined) {
        // Apply bonus to stat
        updatedStats[statKey] += bonus.bonus; 
      }
    });

    /* Update character state with modified stats */
    setCharacter((prev) => ({
      ...prev,
      stats: updatedStats,
    }));
  };

  /* Handle manual stat changes by the user */
  const handleStatChange = (stat, value) => {
    setCharacter((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        // Ensure value is a valid number
        [stat]: parseInt(value) || 0, 
      },
    }));
    setBaseStats((prev) => ({
      ...prev,
      // Update base stats as well
      [stat]: parseInt(value) || 0, 
    }));
  };

  // JSX rendering of the character sheet form
  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md flex gap-6">
      {/* Left Section - Display race details */}
      <div className="w-1/4 bg-gray-200 p-4 rounded-lg shadow-md">
    <h2 className="text-lg font-bold mb-2 cursor-pointer" onClick={() => setShowRaceDetails(!showRaceDetails)}>
      Race Details {showRaceDetails ? "▼" : "▲"}
    </h2>
    {showRaceDetails && (
      <div>
        <p><strong>Size:</strong> {character.size}</p>
        <p><strong>Size Description:</strong> {character.size_description}</p>
        <p><strong>Languages:</strong> {character.languages.join(", ")}</p>
        <p><strong>Language Description:</strong> {character.language_desc}</p>
        <p><strong>Traits:</strong> {character.traits.join(", ")}</p>
      </div>
    )}

    </div>
      {/* Main Character Sheet Form */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">D&D Character Sheet</h1>
        <form className="space-y-4">
          {/* Character name input */}
          <div>
            <label className="block font-medium">Name:</label>
            <input
              type="text"
              className="w-full p-2 border rounded hover:bg-gray-100 focus:outline-none"
              value={character.name}
              onChange={(e) => setCharacter({ ...character, name: e.target.value })}
              placeholder="Enter character name"
            />
          </div>

          {/* Race dropdown */}
          <div>
            <label className="block font-medium">Race:</label>
            <select className="w-full p-2 border rounded hover:bg-gray-100 focus:outline-none" onChange={(e) => handleRaceChange(e.target.value || "")}>
              <option value="">Select a Race</option>
              {races.map((race) => (
                <option key={race.index} value={race.index}>{race.name}</option>
              ))}
            </select>
          </div>

          {/* Class dropdown */}
          <div>
            <label className="block font-medium">Class:</label>
            <select className="w-full p-2 border rounded hover:bg-gray-100 focus:outline-none" onChange={(e) => handleClassChange(e.target.value || "")}>
              <option value="">Select a Class</option>
              {classes.map((cls) => (
                <option key={cls.index} value={cls.index}>{cls.name}</option>
              ))}
            </select>
          </div>

          {/* Stats inputs */}
          <div>
            <label className="block font-medium">Stats:</label>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(character.stats).map((stat) => (
                <div key={stat}>
                  <label className="block font-medium">{stat.charAt(0).toUpperCase() + stat.slice(1)}:</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded hover:bg-gray-100 focus:outline-none"
                    value={character.stats[stat]}
                    onChange={(e) => handleStatChange(stat, e.target.value)}
                    placeholder={`Enter ${stat}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Speed and Passive Perception inputs in the same row */}
          <div className="flex items-center space-x-4">
            {/* Speed input */}
            <div>
              <label className="font-medium">Speed:</label>
              <input
                type="text"
                className="w-20 p-2 border rounded hover:bg-gray-100 focus:outline-none"
                value={character.speed}
                readOnly
              />
            </div>

            {/* Passive Perception Input */}
            <div>
              <label className="font-medium">Passive Perception:</label>
              <input
                type="text"
                className="w-20 p-2 border rounded hover:bg-gray-100 focus:outline-none"
                value={passivePerception}
                readOnly
              />
            </div>
          </div>


          {/* Hit Dice */}
          <div>
            <label className="block font-medium">Hit Dice:</label>
            <input
              type="text"
              className="w-full p-2 border rounded hover:bg-gray-100 focus:outline-none"
              value={character.hitDice}
              readOnly
            />
          </div>

          {/* Spellcasting Section */}
          <div>
            <h2 className="text-lg font-bold mb-2">Spellcasting</h2>

            {/* Display spell slots */}
            <div className="spell-slots">
              <label className="block font-medium">Spell Slots (Level 1):</label>
              <input
                type="number"
                className="w-20 p-2 border rounded hover:bg-gray-100 focus:outline-none"
                value={spellSlots.level1}
                onChange={(e) => setSpellSlots({ ...spellSlots, level1: parseInt(e.target.value) || 0 })}
              />
              {/* Add inputs for other levels similarly */}
            </div>

            {/* Display available spells based on class */}
            <div className="available-spells">
              <h3 className="font-medium">Available Spells:</h3>
              <select
                className="w-full p-2 border rounded hover:bg-gray-100 focus:outline-none"
                onChange={(e) => setKnownSpells([...knownSpells, e.target.value])}
              >
                <option value="">Select a Spell</option>
                {spells.map((spell) => (
                  <option key={spell.index} value={spell.name}>
                    {spell.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Display selected known spells */}
            <div className="known-spells">
              <h3 className="font-medium">Known Spells:</h3>
              <ul>
                {knownSpells.map((spell, index) => (
                  <li key={index}>{spell}</li>
                ))}
              </ul>
            </div>
          </div>
        </form>
      </div>

      {/* Right Section - Class proficiencies */}
      <div className="w-1/4 bg-gray-200 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-2 cursor-pointer" onClick={() => setShowClassProficiencies(!showClassProficiencies)}>
          Class Proficiencies {showClassProficiencies ? "▼" : "▲"}
        </h2>
      {showClassProficiencies && (
        <div>
          <p><strong>Starting Proficiencies:</strong> {character.startingProficiencies.join(", ")}</p>
          <p><strong>Class Proficiency Choices:</strong> {character.classProficiencies.join(", ")}</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default CharacterSheet;
