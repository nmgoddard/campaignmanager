import React, { useState } from "react";
import CharacterStats from "./characterstats";
import SpellTable from "./spelltable";

const CharacterDisplay = () => {
  const [selectedClass, setSelectedClass] = useState("");

  return (
    <div>
      <CharacterStats onClassSelect={setSelectedClass} />
      <SpellTable selectedClass={selectedClass} />
    </div>
  );
};

export default CharacterDisplay;