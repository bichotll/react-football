/**
 * @jsx React.DOM
 */

var React = window.React = require('react'),
    Timer = require("./ui/Timer"),
//GamesWebsocket = require('./services/games-websocket'),
//TeamsRest = require('./services/teams-rest'),
    LeagueService = require('./services/league-service'),
    mountNode = document.getElementById("app");

var callback = function () {
    console.log(true);
};

var TodoApp = React.createClass({
    setLeagueState: function () {
        console.log('league',this.props.leagueService.league);
        this.setState({
            'league': this.props.leagueService.league
        });
    },
    getInitialState: function () {
        return {league: []};
    },
    componentDidMount: function () {
        this.props.leagueService.init(this.setLeagueState);
    },
    componentWillReceiveProps: function (nextProps) {
        console.log('nextProps', nextProps);
    },
    render: function () {
        return (
            <div>
                <h3>League</h3>
            {this.state.league}
            </div>
        );
    }
});


React.render(<TodoApp leagueService={LeagueService} />, mountNode);

