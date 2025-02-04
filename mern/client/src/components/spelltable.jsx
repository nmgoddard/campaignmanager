/*=========================== 
*   Title: SpellTable
*   Author: Grimm_mmirG
*   Date: 2025-02-03
=============================*/

import React, { useState, useEffect } from "react";

const SpellTable = ({ selectedClass }) => {
  const [spellsByLevel, setSpellsByLevel] = useState({});
  const [expandedLevels, setExpandedLevels] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedClass) {
      setSpellsByLevel({}); 
      return;
    }

    const fetchSpells = async () => {
      setIsLoading(true);
      setError(null);

      try {
        /* Fetch spells for the selected class */
        const response = await fetch(`https://www.dnd5eapi.co/api/classes/${selectedClass}/spells`);
        if (!response.ok) throw new Error("Failed to fetch spells");
        const data = await response.json();

        /* Fetch details for each spell */
        const spellDetails = await Promise.all(
          data.results.map(async (spell) => {
            const spellResponse = await fetch(`https://www.dnd5eapi.co${spell.url}`);
            if (!spellResponse.ok) throw new Error("Failed to fetch spell details");
            return spellResponse.json();
          })
        );

        /* Group spells by level */
        const groupedSpells = spellDetails.reduce((acc, spell) => {
          acc[spell.level] = acc[spell.level] || [];
          acc[spell.level].push(spell);
          return acc;
        }, {});

        setSpellsByLevel(groupedSpells);
      } catch (error) {
        console.error("Error fetching spells:", error);
        setError("Failed to load spells. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpells();
  }, [selectedClass]);

  const toggleLevel = (level) => {
    setExpandedLevels((prev) => ({ ...prev, [level]: !prev[level] }));
  };

  const filteredSpellsByLevel = Object.entries(spellsByLevel).reduce((acc, [level, spells]) => {
    const filteredSpells = spells.filter((spell) =>
      spell.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      level.toString().includes(searchQuery)
    );
    if (filteredSpells.length > 0) acc[level] = filteredSpells;
    return acc;
  }, {});

  return (
    <div className="spell-table">
      <h2 className="text-xl font-bold mb-4">Spells for {selectedClass}</h2>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search spells by name or level..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded pr-10"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>

      {isLoading && <p className="text-center">Loading spells...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!isLoading && !error && Object.entries(filteredSpellsByLevel).length === 0 && (
        <p className="text-center">No spells found.</p>
      )}

      {Object.entries(filteredSpellsByLevel).map(([level, spells]) => (
        <div key={level} className="spell-level mb-4">
          <button
            onClick={() => toggleLevel(level)}
            className="text-left w-full bg-gray-200 p-2 rounded hover:bg-gray-300 transition-colors"
          >
            {expandedLevels[level] ? "▼" : "▲"} Level {level} Spells
          </button>
          {expandedLevels[level] && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {spells.map((spell) => (
                <div key={spell.index} className="p-4 border rounded shadow hover:shadow-md transition-shadow">
                  <h3 className="font-bold">{spell.name}</h3>
                  <p>Level: {spell.level}</p>
                  <p>School: {spell.school.name}</p>
                  <p>Casting Time: {spell.casting_time}</p>
                  <p>Range: {spell.range}</p>
                  <p>Duration: {spell.duration}</p>
                  <p>Components: {spell.components.join(", ")}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SpellTable;