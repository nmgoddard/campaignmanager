//this module has functions to generate random number(s) and stats (ability scores), simulating dice rolls
const PickANumber = (min, max) => {
    return (Math.floor(Math.random() * (max - min + 1) + min));
}

const PickSeveralNumbers = (min, max, count) => {
    let severalNumbers = [];

    //Array of all possible numbers
    let allNumbers = [];
    for (let i = min; i <= max; i++) {
        allNumbers.push(i);
    }

    //Randomly select a number from allNumbers 'count' times
    for (let i = 0; i < count; i++) {
        let randomIndex = Math.floor(Math.random() * allNumbers.length);
        //Push that number to severalNumber
        severalNumbers.push(allNumbers[randomIndex]);
        //Remove that number from allNumbers to prevent repeats
        allNumbers.splice(randomIndex, 1);
    }
    return severalNumbers;
}

const RNGesusStats = () => {
    const stats = [];
    //Do character 6 times
    for (let i = 0; i < 6; i++) {
        
        //set variables
        const statRoll = [];
        let stat = 0;
        
        //Roll 4d6
        for (let j = 0; j < 4; j++) {
            statRoll.push(PickANumber(1, 6));
        }
        //Drop lowest
        statRoll.sort(function(a, b){return a - b});
        statRoll.shift();
        statRoll.forEach(function(roll) {
            stat += roll
        });
        stats.push(stat);
    }

    //Leave sorted stat array for archetypes
    //stats.sort(function(a, b){return a - b});
    return stats;
}

export { PickANumber, PickSeveralNumbers, RNGesusStats }