'use strict';

var _ = require('lodash');

var GamesWebsocket = require('./games-websocket');
var TeamsService = require('./teams-rest');

/**
 * League object to connect with the games and teams services and do logic
 * @constructor
 */
var LeagueService = function () {
    var teams = [];
    var games = [];

    this.league = [];

    /**
     * Fire it
     * @param callback
     */
    this.init = function (callback) {
        TeamsService.then(function (teamsArray) {
            teams = teamsArray;
            initLeague();
            //fire websocket
            fireWebsocket(callback);
        });
    };

    /**
     * Creates the league object
     * @type {function(this:LeagueService)|*}
     */
    var initLeague = function () {
        this.league = _.map(teams, function (team) {
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
        });
    }.bind(this);

    /**
     * Updates the league object
     * @type {function(this:LeagueService)|*}
     * @param {Object[]} example [0:{"date":"13/05/12","homeTeamId":19,"awayTeamId":7,"homeGoals":"3","awayGoals":"1"}...]
     */
    var updateLeague = function (match) {
        //map n change team properties by team news
        this.league = _.chain(this.league).map(function (leagueRow) {
            //common
            if (leagueRow.teamId == match.homeTeamId || leagueRow.teamId == match.awayTeamId) {
                ++leagueRow.played;
                if (leagueRow.homeGoals === leagueRow.awayGoals) {
                    ++leagueRow.points;
                }

                //home
                if (leagueRow.teamId == match.homeTeamId) {
                    if (leagueRow.homeGoals > leagueRow.awayGoals) {
                        ++leagueRow.won;
                        leagueRow.goalsFor += match.homeGoals;
                    } else if (leagueRow.homeGoals < leagueRow.awayGoals) {
                        ++leagueRow.lost;
                        leagueRow.goalsAgainst += match.awayGoals;
                    }
                    //away
                } else if (leagueRow.teamId == match.awayTeamId) {
                    if (leagueRow.awayGoals > leagueRow.homeGoals) {
                        ++leagueRow.won;
                        leagueRow.goalsFor += match.homeGoals;
                    } else if (leagueRow.awayGoals < leagueRow.homeGoals) {
                        ++leagueRow.lost;
                        leagueRow.goalsAgainst += match.awayGoals;
                    }
                }

                leagueRow.goalsDifference = leagueRow.goalsFor - leagueRow.goalsAgainst;
            }
            return leagueRow;
        })
            //order by...
            .sortByAll(['points', 'goalsDifference', 'goalsFor', 'teamName'])
            .value();
    }.bind(this);

    /**
     * Fires the websocket
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
