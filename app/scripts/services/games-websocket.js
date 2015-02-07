'use strict';

/**
 * Service to connect to the games websocket
 * @constructor
 */
var GamesWebsocket = function(){
    var wsUri = 'ws://127.0.0.1:8080/games';

    /**
     * @type {WebSocket}
     */
    this.webSocket;

    this.init = function(){
        this.webSocket = new WebSocket(wsUri);
    };
};

module.exports = new GamesWebsocket();
