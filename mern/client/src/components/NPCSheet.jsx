import { useState } from 'react';
import PropTypes from 'prop-types';
import { randGen } from '../utils/randomGeneration/characterGenerator.mjs';
import './npcStyles.css';

const NPCSheet = ({ npc, onSave, onCancel, isNew }) => {
  const [editableNPC, setEditableNPC] = useState({ ...npc });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setEditableNPC((prev) => {
      if (['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].includes(name)) {
        return {
          ...prev,
          stats: {
            ...prev.stats,
            [name]: Number(value) || 10,  // Store stats inside the `stats` object only
          },
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  
  

  const handleGenerate = () => {
    setEditableNPC(randGen());
  };

  const handleSave = () => {
    const { strength, dexterity, constitution, intelligence, wisdom, charisma, ...npcData } = editableNPC;
  
    const formattedNPC = {
      ...npcData,  // Remove duplicate top-level stats
      stats: {
        strength: editableNPC.stats?.strength || 10,
        dexterity: editableNPC.stats?.dexterity || 10,
        constitution: editableNPC.stats?.constitution || 10,
        intelligence: editableNPC.stats?.intelligence || 10,
        wisdom: editableNPC.stats?.wisdom || 10,
        charisma: editableNPC.stats?.charisma || 10,
      },
    };
  
    onSave(formattedNPC);
  };
  
  

  return (
    <div className="npc-sheet">
      <h2>Edit NPC: {editableNPC.charName || 'Unnamed'}</h2>
      <label>Name:</label>
      <input
        type="text"
        name="charName"
        value={editableNPC.charName || ''}
        onChange={handleChange}
      />

      <label>Age:</label>
      <input
        type="number"
        name="age"
        value={editableNPC.age || ''}
        onChange={handleChange}
      />

      <label>Race:</label>
      <input
        type="text"
        name="race"
        value={editableNPC.race || ''}
        onChange={handleChange}
      />

      <label>Gender:</label>
      <input
        type="text"
        name="gender"
        value={editableNPC.gender || ''}
        onChange={handleChange}
      />

      <label>Alignment:</label>
      <input
        type="text"
        name="alignment"
        value={editableNPC.alignment || ''}
        onChange={handleChange}
      />

      <div className="npc-stats">
        <label>Stats:</label>
        <div className="stat-block">
          <div className="stat"><p>Str</p><input type="number" name="strength" value={editableNPC.stats?.strength || 10} onChange={handleChange} /></div>
          <div className="stat"><p>Dex</p><input type="number" name="dexterity" value={editableNPC.stats?.dexterity || 10} onChange={handleChange} /></div>
          <div className="stat"><p>Con</p><input type="number" name="constitution" value={editableNPC.stats?.constitution || 10} onChange={handleChange} /></div>
          <div className="stat"><p>Int</p><input type="number" name="intelligence" value={editableNPC.stats?.intelligence || 10} onChange={handleChange} /></div>
          <div className="stat"><p>Wis</p><input type="number" name="wisdom" value={editableNPC.stats?.wisdom || 10} onChange={handleChange} /></div>
          <div className="stat"><p>Cha</p><input type="number" name="charisma" value={editableNPC.stats?.charisma || 10} onChange={handleChange} /></div>
        </div>
      </div>


      <label>Class:</label>
      <input
        type="text"
        name="className"
        value={editableNPC.className || ''}
        onChange={handleChange}
      />

      <label>Quirks:</label>
      <input
        type="text"
        name="quirks"
        value={editableNPC.quirks || ''}
        onChange={handleChange}
      />

      <label>Vices:</label>
      <input
        type="text"
        name="vices"
        value={editableNPC.vices || ''}
        onChange={handleChange}
      />

      <label>Virtues:</label>
      <input
        type="text"
        name="virtues"
        value={editableNPC.virtues || ''}
        onChange={handleChange}
      />

      <label>Ideals:</label>
      <input
        type="text"
        name="ideals"
        value={editableNPC.ideals || ''}
        onChange={handleChange}
      />

      {isNew && <button onClick={handleGenerate}>Generate</button>}
      <button onClick={handleSave}>Save NPC</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

NPCSheet.propTypes = {
    npc: PropTypes.shape({
      charName: PropTypes.string,
      race: PropTypes.string,
      gender: PropTypes.string,
      alignment: PropTypes.string,
      age: PropTypes.number,
      className: PropTypes.string,
      quirks: PropTypes.string,
      vices: PropTypes.string,
      virtues: PropTypes.string,
      ideals: PropTypes.string,
      campaignID: PropTypes.number,
      locationID: PropTypes.number,
      stats: PropTypes.shape({
        strength: PropTypes.number,
        dexterity: PropTypes.number,
        constitution: PropTypes.number,
        intelligence: PropTypes.number,
        wisdom: PropTypes.number,
        charisma: PropTypes.number,
      }).isRequired,
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isNew: PropTypes.bool.isRequired,
  };
  

export default NPCSheet;
