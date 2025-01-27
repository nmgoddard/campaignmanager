import { RNGesusStats, PickANumber } from "./rnGesus.mjs";

//the race based fields such as name, age etc. are generated here
//the class based fields  will be displayed in the character component by the API
class BaseCharacter{
    constructor() {
        this.level = 1;

        //randomly generated fields (some based on race)
        this.age = "";
        this.gender = "";
        this.alignment = "";
        this.quirks = "";
        this.features = "";
        this.vices = "";
        this.virtues = "";
        this.ideals = "";
        this.className = "";

        //race fields
        this.charName = "";
        this.stats = RNGesusStats(); //aka ability scores
        this.age = null;
        this.race = "";
        this.size = "";
        this.speed = "";

        //optional fields for DM to fill in
        // this.inspiration = "";
        // this.condition = "";
        // this.image = "";
        // this.equipment = "";
        // this.coins = "";
        // this.appearance = "";
        // this.notes = "";
    }
}

//races here add to the ability scores (stats) depending on the race
class Human extends BaseCharacter {
    
    //No arg CTOR
    constructor() {
        super();
        for (let i = 0; i < this.stats.length; i++) {
            this.stats[i] += 1;
        }

        this.strength = this.stats.pop();
        this.dexterity = this.stats.pop();
        this.constitution = this.stats.pop();
        this.intelligence = this.stats.pop();
        this.wisdom = this.stats.pop();
        this.charisma = this.stats.pop();

        this.stats = {
            strength: this.strength,
            dexterity: this.dexterity,
            constitution: this.constitution,
            intelligence: this.intelligence,
            wisdom: this.wisdom,
            charisma: this.charisma,
          };
          
        this.charName = "";
        this.age = PickANumber(14, 70);
        this.race = "Human";
        this.size = "Medium";
        this.speed = "30";
    }
}

class Dwarf extends BaseCharacter {
    
    //No arg CTOR
    constructor() {
        super();
        
        this.strength = this.stats.pop();
        this.dexterity = this.stats.pop();
        this.constitution = this.stats.pop() + 2;
        this.intelligence = this.stats.pop();
        this.wisdom = this.stats.pop();
        this.charisma = this.stats.pop();

        this.stats = {
            strength: this.strength,
            dexterity: this.dexterity,
            constitution: this.constitution,
            intelligence: this.intelligence,
            wisdom: this.wisdom,
            charisma: this.charisma,
          };

        this.charName = "";
        this.age = PickANumber(30, 350);
        this.race = "Dwarf";
        this.size = "Medium";
        this.speed = "25";
    }
}

class Elf extends BaseCharacter {
    
    //No arg CTOR
    constructor() {
        super();
        
        this.strength = this.stats.pop();
        this.dexterity = this.stats.pop() + 2;
        this.constitution = this.stats.pop();
        this.intelligence = this.stats.pop();
        this.wisdom = this.stats.pop();
        this.charisma = this.stats.pop();

        this.stats = {
            strength: this.strength,
            dexterity: this.dexterity,
            constitution: this.constitution,
            intelligence: this.intelligence,
            wisdom: this.wisdom,
            charisma: this.charisma,
          };

        this.charName = "";
        this.age = PickANumber(75, 750);
        this.race = "Elf";
        this.size = "Medium";
        this.speed = "30";
    }
}

class Halfing extends BaseCharacter {
    
    //No arg CTOR
    constructor() {
        super();
        
        this.strength = this.stats.pop();
        this.dexterity = this.stats.pop() + 2;
        this.constitution = this.stats.pop();
        this.intelligence = this.stats.pop();
        this.wisdom = this.stats.pop();
        this.charisma = this.stats.pop();

        this.stats = {
            strength: this.strength,
            dexterity: this.dexterity,
            constitution: this.constitution,
            intelligence: this.intelligence,
            wisdom: this.wisdom,
            charisma: this.charisma,
          };

        this.charName = "";
        this.age = PickANumber(14, 150);
        this.race = "Halfling";
        this.size = "Small";
        this.speed = "25";
    }
}

class Gnome extends BaseCharacter {
    
    //No arg CTOR
    constructor() {
        super();
        
        this.strength = this.stats.pop();
        this.dexterity = this.stats.pop();
        this.constitution = this.stats.pop();
        this.intelligence = this.stats.pop() + 2;
        this.wisdom = this.stats.pop();
        this.charisma = this.stats.pop();

        this.stats = {
            strength: this.strength,
            dexterity: this.dexterity,
            constitution: this.constitution,
            intelligence: this.intelligence,
            wisdom: this.wisdom,
            charisma: this.charisma,
          };

        this.charName = "";
        this.age = PickANumber(25, 400);
        this.race = "Gnome";
        this.size = "Small";
        this.speed = "25";
    }
}

class Tiefling extends BaseCharacter {
    
    //No arg CTOR
    constructor() {
        super();
        
        this.strength = this.stats.pop();
        this.dexterity = this.stats.pop();
        this.constitution = this.stats.pop();
        this.intelligence = this.stats.pop();
        this.wisdom = this.stats.pop();
        this.charisma = this.stats.pop() + 2;

        this.stats = {
            strength: this.strength,
            dexterity: this.dexterity,
            constitution: this.constitution,
            intelligence: this.intelligence,
            wisdom: this.wisdom,
            charisma: this.charisma,
          };

        this.charName = "";
        this.age = PickANumber(14, 70);
        this.race = "Tiefling";
        this.size = "Medium";
        this.speed = "30";
    }
}

const racesArray = [Human, Dwarf, Elf, Halfing, Gnome, Tiefling];

const racesList = [];
racesArray.forEach(function(template) {
    const instance = new template();
    racesList.push(instance.race)
});

export { racesArray, racesList, BaseCharacter };