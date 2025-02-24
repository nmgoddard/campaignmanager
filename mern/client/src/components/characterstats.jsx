/*=========================== 
*   Title: PlayerCharacterStats
*   Author: Grimm_mmirG
*   Date: 2025-25-01
=============================*/

import React, { useState, useEffect } from "react";
import axios from "axios";

/* This section uses useState to store data for races, classes, selected classes and races and character stats */

const CharacterStats = ({ onClassSelect }) => {
  const [races, setRaces] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedRace, setSelectedRace] = useState(null);
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
    level: 1,
    classFeatures: [],
  });

 /* States for collapsible menus */
  const [showRaceDetails, setShowRaceDetails] = useState(false);
  const [showClassProficiencies, setShowClassProficiencies] = useState(false);
  const [showClassFeatures, setShowClassFeatures] = useState(false);

/* This is where our program will fetch race/class details to be used later */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [raceRes, classRes] = await Promise.all([
          axios.get("https://www.dnd5eapi.co/api/races"),
          axios.get("https://www.dnd5eapi.co/api/classes"),
        ]);
        setRaces(raceRes.data.results);
        setClasses(classRes.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

/* This is where the character stats become updated whenever a race is selected or changed to another */
  const handleRaceChange = async (index) => {
    if (index === "") {
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
    setSelectedRace(raceDetails.data);
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
    applyRaceBonuses(raceDetails.data.ability_bonuses);
  };

/* This is where the character stats become updated whenever a class is selected or changed to another */
  const handleClassChange = async (index) => {
    if (!index) {
      setSelectedClass(null);
      setCharacter((prev) => ({
        ...prev,
        class: "",
        hitDice: "",
        proficiencies: [],
        startingProficiencies: [],
        classProficiencies: [],
        classFeatures: [],
      }));
      onClassSelect(""); 
      return;
    }

    const classDetails = await axios.get(`https://www.dnd5eapi.co/api/classes/${index}`);
    setSelectedClass(classDetails.data);
    setCharacter((prev) => ({
      ...prev,
      class: classDetails.data.name,
      hitDice: `d${classDetails.data.hit_die}`,
      proficiencies: classDetails.data.proficiencies.map((p) => p.name),
      startingProficiencies: classDetails.data.proficiencies.map((p) => p.name),
      classProficiencies: classDetails.data.proficiency_choices.map((p) => p.desc),
    }));
    onClassSelect(index); 

/* Fetch class features for all levels up to the current level */
    fetchClassFeatures(index, character.level);
  };

  const handleLevelChange = async (newLevel) => {
    setCharacter((prev) => ({
      ...prev,
      level: newLevel,
    }));

/* Fetch class features for all levels up to the new level */
    if (selectedClass) {
      fetchClassFeatures(selectedClass.index, newLevel);
    }
  };

/* Fetch class features as per selected class */  
  const fetchClassFeatures = async (classIndex, level) => {
    try {
      const features = [];
      for (let i = 1; i <= level; i++) {
        const response = await axios.get(`https://www.dnd5eapi.co/api/classes/${classIndex}/levels/${i}`);
        console.log(`Level ${i} Features:`, response.data.features); 
        features.push(...response.data.features.map((feature) => `Level ${i}: ${feature.name}`));
      }
      console.log("Class Features:", features); 

/* Update character state with selected class attributes */ 
      setCharacter((prev) => ({
        ...prev,
        classFeatures: features,
      }));
    } catch (error) {
      console.error("Error fetching class features:", error);
    }
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
    const updatedStats = { ...baseStats };
    abilityBonuses.forEach((bonus) => {
      const statKey = statMap[bonus.ability_score.index];
      if (statKey && updatedStats[statKey] !== undefined) {
        updatedStats[statKey] += bonus.bonus;
      }
    });

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
        [stat]: parseInt(value) || 0,
      },
    }));
    setBaseStats((prev) => ({
      ...prev,
      [stat]: parseInt(value) || 0,
    }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md flex gap-6">
      {/* Left Section - Display race details */}
      <div className="w-1/4 bg-gray-200 p-4 rounded-lg shadow-md">
        <h2
          className="text-lg font-bold mb-2 cursor-pointer"
          onClick={() => setShowRaceDetails(!showRaceDetails)}
        >
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
            <select
              className="w-full p-2 border rounded hover:bg-gray-100 focus:outline-none"
              onChange={(e) => handleRaceChange(e.target.value || "")}
            >
              <option value="">Select a Race</option>
              {races.map((race) => (
                <option key={race.index} value={race.index}>
                  {race.name}
                </option>
              ))}
            </select>
          </div>

          {/* Class dropdown */}
          <div>
            <label className="block font-medium">Class:</label>
            <select
              className="w-full p-2 border rounded hover:bg-gray-100 focus:outline-none"
              onChange={(e) => handleClassChange(e.target.value || "")}
            >
              <option value="">Select a Class</option>
              {classes.map((cls) => (
                <option key={cls.index} value={cls.index}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          {/* Level input */}
          <div>
            <label className="block font-medium">Level:</label>
            <input
              type="number"
              className="w-full p-2 border rounded hover:bg-gray-100 focus:outline-none"
              value={character.level}
              onChange={(e) => handleLevelChange(parseInt(e.target.value) || 1)}
              min="1"
              max="20"
            />
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
                value={10 + Math.floor((character.stats.wisdom - 10) / 2)}
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
        </form>
      </div>

      {/* Right Section - Class proficiencies and features */}
      <div className="w-1/4 bg-gray-200 p-4 rounded-lg shadow-md space-y-4">
        {/* Class Proficiencies */}
        <div>
          <h2
            className="text-lg font-bold mb-2 cursor-pointer"
            onClick={() => setShowClassProficiencies(!showClassProficiencies)}
          >
            Class Proficiencies {showClassProficiencies ? "▼" : "▲"}
          </h2>
          {showClassProficiencies && (
            <div>
              <p><strong>Starting Proficiencies:</strong> {character.startingProficiencies.join(", ")}</p>
              <p><strong>Class Proficiency Choices:</strong> {character.classProficiencies.join(", ")}</p>
            </div>
          )}
        </div>

        {/* Class Features */}
        <div>
          <h2
            className="text-lg font-bold mb-2 cursor-pointer"
            onClick={() => setShowClassFeatures(!showClassFeatures)}
          >
            Class Features {showClassFeatures ? "▼" : "▲"}
          </h2>
          {showClassFeatures && (
            <ul className="list-disc pl-5">
              {character.classFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterStats;