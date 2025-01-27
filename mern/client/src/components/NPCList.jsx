import { useState } from 'react';
import PropTypes from 'prop-types';
import NPCSheet from './NPCSheet';
import './npcStyles.css';

const NPCList = ({ npcs, onSaveNPC, onDeleteNPC }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleCreateNPC = () => {
    setIsAdding(true);
  };

  const handleSaveNewNPC = async (npc) => {
    const npcWithDefaults = {
      ...npc,
      campaignID: npc.campaignID || 1,
      locationID: npc.locationID || 1,
      characterID: npc.characterID || 1,
    };
  
    console.log("NPC being sent to the server:", JSON.stringify(npcWithDefaults, null, 2));
  
    try {
      const response = await fetch('http://localhost:5050/npcs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(npcWithDefaults),
      });
  
      if (response.ok) {
        const savedNPC = await response.json();
        onSaveNPC(savedNPC);
      } else {
        console.error('Failed to save NPC:', await response.text());
      }
    } catch (error) {
      console.error('Error saving NPC:', error);
    }
  
    setIsAdding(false);
  };
  
  

const handleCancel = () => {
  setIsAdding(false);
}

  const handleDeleteNPC = (npc) => {
    onDeleteNPC(npc);
    setIsAdding(false);
  };

  return (
    <div className="npc-list">
      <h2>NPC List</h2>
      <ul>
        {npcs
          .filter(npc => npc.campaignID === 1 && npc.locationID === 1)
          .map((npc, index) => (
          <li key={index} className="npc-item">
            <button>
              {npc.charName || `NPC ${index + 1}`}
            </button>
            <button className="delete-btn" onClick={() => handleDeleteNPC(npc)}>Delete</button>
          </li>
        ))}
      </ul>
      {isAdding && (
        <div className="npc-details">
          <NPCSheet 
            npc={{
              charName: '',
              race: '',
              gender: '',
              alignment: '',
              age: 0,
              className: '',
              quirks: '',
              vices: '',
              virtues: '',
              ideals: '',
              campaignID: 1,
              locationID: 1,
              stats: {
                strength: 10,
                dexterity: 10,
                constitution: 10,
                intelligence: 10,
                wisdom: 10,
                charisma: 10,
              },
            }} 
            onSave={handleSaveNewNPC}
            onCancel={handleCancel}
            isNew={true}
          />
        </div>
      )}
      <button className="add-npc-btn" onClick={handleCreateNPC}>+</button>
    </div>
  );
};

NPCList.propTypes = {
  npcs: PropTypes.arrayOf(PropTypes.shape({
    charName: PropTypes.string,
    campaignID: PropTypes.number,
    locationID: PropTypes.number,
  })).isRequired,
  onSaveNPC: PropTypes.func.isRequired,
  onCreateNPC: PropTypes.func.isRequired,
  onDeleteNPC: PropTypes.func.isRequired,
};

export default NPCList;
