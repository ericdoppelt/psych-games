const assert = require('assert');
const DB_API = require('../db/db_api.js');
const BOT = require('../db/bot.js');
const mongoose = require('mongoose')
describe('Test database query API', () => {
    before(function (done) {
        mongoose.connect('mongodb+srv://xipu:k5q1J0qhOrVb1F65@cluster0.jcnnf.azure.mongodb.net/psych_game_test?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once('open', function() {
            console.log("Connected to test db successfully.");
            done();
        });
    });
    it('finds the player with the correct prolific ID', (done) => {
        const testID = 'test_id';
        DB_API.saveNewPlayerToDB(testID);
        DB_API.findPlayerByID(testID).then(function(result) {
            assert(result.prolificID===testID);
        }).catch(function(err){
            console.log(err);
        });
        done();
    });
    it('saves the player choice into database', (done) => {
        const testID = 'test_id';
        var choices = ['player1', 'player2', 'player3'];
        const num = 1;
        const bot = false;
        DB_API.savePlayerChoiceToDB(testID, choices, num, bot);
        DB_API.findChoicesByID(testID, num).then(function(result) {
            assert(JSON.stringify(result.selectedPlayerID)===JSON.stringify(choices));
        }).catch(function(err){
            console.log(err);
        });
        done();
    });
    it('saves the player choice into database for new round', (done) => {
        const testID = 'test_id';
        var choices = ['player4', 'player5', 'player9'];
        const num = 3;
        const bot = false;
        DB_API.savePlayerChoiceToDB(testID, choices, num, bot);
        DB_API.findChoicesByID(testID, num).then(function(result) {
            assert(JSON.stringify(result.selectedPlayerID)===JSON.stringify(choices));
        }).catch(function(err){
            console.log(err);
        });
        done();
    });
    it('saves the player choice by Bot', (done) => {
        const testID = 'test_id';
        const num = 8;
        const bot = true;
        BOT.saveBotChoiceToDB(testID, num, bot);
        DB_API.findChoicesByID(testID, num).then(function(result) {
            console.log(result);
            assert(result.selectedPlayerID.length <= 3);
        }).catch(function(err){
            console.log(err);
        });
        done();
    });
    after(function(done){
        mongoose.connection.db.dropDatabase(function(){
            mongoose.connection.close(done);
        });
        // done();
    });
})
