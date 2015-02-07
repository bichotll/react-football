'use strict';

var $ = require('jquery');

/**
 * Service to connect to the teams rest api
 * @returns {$.get()}
 * @constructor
 */
var TeamsService = function(){
    var url = 'http://localhost:8080/teams';

    return $.get(url);
};

module.exports = new TeamsService();
