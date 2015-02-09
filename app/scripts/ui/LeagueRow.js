/** @jsx React.DOM */
var React = require('react');
var _ = require('lazy.js');

var LeagueRow = React.createClass({
    getInitialState: function() {
        return null;
    },
    render: function() {
        return (
            <tr>
                <td>{this.props.position}</td>
                <td>{this.props.teamData.teamName}</td>
                <td>{this.props.teamData.played}</td>
                <td>{this.props.teamData.won}</td>
                <td>{this.props.teamData.drawn}</td>
                <td>{this.props.teamData.lost}</td>
                <td>{this.props.teamData.goalsFor}</td>
                <td>{this.props.teamData.goalsAgainst}</td>
                <td>{this.props.teamData.goalsDifference}</td>
                <td>{this.props.teamData.points}</td>
            </tr>
        );
    }
});


module.exports = LeagueRow;
