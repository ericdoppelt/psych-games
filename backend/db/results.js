const e = require('express');
const DB_API = require('../db/db_api.js');
const choice = require('./models/choice.js');
const lobby = require('../lobby.js').LobbyInstance;

function getResultsByProlificId(prolificIDArray, room) {
    let allChoices = room.getEveryoneChoiceAtCurrentTurn();
    let allLocations = room.playerLocation;
    // let allChoices = DB_API.findChoicesByID(prolificId, turnNum);
    allResults = [];
    for(var i = 0; i < prolificIDArray.length; i++){
        let playerProlific = prolificIDArray[i];
        let playerRoundResult = calculateResultOfID( playerProlific, allChoices);
        let playerInitialLocation = allLocations.get(playerProlific);
        let newPlayerLocation = playerInitialLocation + playerRoundResult;
        room.setPlayerLocation(playerProlific, newPlayerLocation);
        allResults.push(newPlayerLocation);
    }
    return allResults;
}

function calculateResultOfID(playerProlific, allChoices){
    let choicesProlific = allChoices.get(playerProlific);
    let count = 0;
    for(var i = 0; i < choicesProlific.length; i++){
        let playerChosen = choicesProlific[i];
        let choicesChosenPlayer = allChoices.get(playerChosen);
        for (var j = 0; j < choicesChosenPlayer.length; j++) {
            if (choicesChosenPlayer[j] === (playerProlific)) {
                count += 4;
            }
        }
    }
    if(count == 8){
        console.log('TRIPLE BONUS');
        return (count - 1);
    }
    return count;
}

function isGameOneDone(room){
    let allLocations = room.playerLocation;
    var playerMax = 0;
    for(let location of allLocations.values()){
        if(location >= 100){
            playerMax += 1;
        }
    }
    if(playerMax >= 3){
        return true;
    }
    else{
        return false;
    }
}

function getWinnersAndLosers(room) {
    let allLocations = room.playerLocation;
    var losers = [];
    var winners = [];
    for(let tempPlayer of allLocations.keys()){
        if(allLocations.get(tempPlayer) >= 100){
            winners.push(tempPlayer);
        }
        else{
            losers.push(tempPlayer);
        }
    }
    return winners, losers;
}

module.exports = {
    getResultsByProlificId : getResultsByProlificId,
    isGameOneDone : isGameOneDone,
    getWinnersAndLosers : getWinnersAndLosers,
}