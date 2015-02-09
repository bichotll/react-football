'use strict';

var _ = require('lazy.js');

var GamesWebsocket = require('./games-websocket');
var TeamsService = require('./teams-rest');

/**
 * League object to connect with the games and teams services and do logic
 * @constructor
 */
var LeagueService = function () {
    var teams = [];
    var games = [];

    /**
     * All the league data (updated all the time)
     * @type {Array}
     */
    this.league = [];

    /**
     * Fire it
     * @param {requestCallback} The callback that is called whenever the service has new data
     */
    this.init = function (callback) {
        TeamsService.getTeams().then(function (teamsArray) {
            teams = teamsArray;
            initLeagueObject();
            //fire websocket
            fireWebsocket(callback);
        });
    };

    /**
     * Creates the league object
     * @private
     * @type {function(this:LeagueService)|*}
     */
    var initLeagueObject = function () {
        this.league = _(teams).map(function (team) {
            //{id: 1, name: "Blackburn"}
            return {
                position: 0,
                teamId: team.id,
                teamName: team.name,
                played: 0,
                won: 0,
                drawn: 0,
                lost: 0,
                goalsFor: 0,
                goalsAgainst: 0,
                goalsDifference: 0,
                points: 0
            }
        }).value();
    }.bind(this);

    /**
     * Updates the league object
     * @private
     * @type {function(this:LeagueService)|*}
     * @param {Object[]} example [0:{"date":"13/05/12","homeTeamId":19,"awayTeamId":7,"homeGoals":"3","awayGoals":"1"}...]
     */
    var updateLeague = function (match) {
        //map n change team properties by team news
        this.league = _(this.league).map(function (leagueRow) {

            //common
            if (leagueRow.teamId === match.homeTeamId || leagueRow.teamId === match.awayTeamId) {

                ++leagueRow.played;

                if (+match.homeGoals === +match.awayGoals) {
                    ++leagueRow.points;
                    ++leagueRow.drawn;
                    //goals
                    leagueRow.goalsFor = +leagueRow.goalsFor + +match.homeGoals;
                    leagueRow.goalsAgainst = +leagueRow.goalsAgainst + +match.awayGoals;
                }

                //home
                if (leagueRow.teamId === match.homeTeamId) {
                    if (match.homeGoals > match.awayGoals) {
                        ++leagueRow.won;
                        leagueRow.points = leagueRow.points + 3;
                        //goals
                        leagueRow.goalsFor = +leagueRow.goalsFor + +match.homeGoals;
                        leagueRow.goalsAgainst = +leagueRow.goalsAgainst + +match.awayGoals;
                    } else if (match.homeGoals < match.awayGoals) {
                        ++leagueRow.lost;
                        //goals
                        leagueRow.goalsFor = +leagueRow.goalsFor + +match.homeGoals;
                        leagueRow.goalsAgainst = +leagueRow.goalsAgainst + +match.awayGoals;
                    }
                    //away
                } else if (leagueRow.teamId === match.awayTeamId) {
                    if (match.awayGoals > match.homeGoals) {
                        ++leagueRow.won;
                        leagueRow.points = leagueRow.points + 3;
                        //goals
                        leagueRow.goalsFor = +leagueRow.goalsFor + +match.awayGoals;
                        leagueRow.goalsAgainst = +leagueRow.goalsAgainst + +match.homeGoals;
                    } else if (match.awayGoals < match.homeGoals) {
                        ++leagueRow.lost;
                        //goals
                        leagueRow.goalsFor = +leagueRow.goalsFor + +match.awayGoals;
                        leagueRow.goalsAgainst = +leagueRow.goalsAgainst + +match.homeGoals;
                    }
                }

                leagueRow.goalsDifference = leagueRow.goalsFor - leagueRow.goalsAgainst;
            }
            return leagueRow;
        })
            //order by...
            .sortBy(function(leagueRow){ return leagueRow.teamName }, true)
            .sortBy(function(leagueRow){ return leagueRow.goalsFor }, true)
            .sortBy(function(leagueRow){ return leagueRow.goalsDifference }, true)
            .sortBy(function(leagueRow){ return leagueRow.points }, true)
            .value()
    }.bind(this);

    /**
     * Fires the websocket
     * @private
     * @type {function(this:LeagueService)|*}
     */
    var fireWebsocket = function (callback) {
        GamesWebsocket.init();
        GamesWebsocket.webSocket.onmessage = function (message) {
            updateLeague(JSON.parse(message.data));

            callback();
        }.bind(this);
    }.bind(this);
};

module.exports = new LeagueService();
