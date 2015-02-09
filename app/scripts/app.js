/**
 * @jsx React.DOM
 */

var React = window.React = require('react'),
    LeagueTable = require('./ui/LeagueTable');
    LeagueService = require('./services/league-service');

var mountNode = document.getElementById("app");

var App = React.createClass({
    setLeagueState: function () {
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
    render: function () {
        return (
            <div>
                <h3>League</h3>
                <LeagueTable leagueData={this.state.league} />
            </div>
        );
    }
});


React.render(<App leagueService={LeagueService} />, mountNode);

