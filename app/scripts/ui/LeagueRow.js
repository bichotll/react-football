/** @jsx React.DOM */
var React = require('react');

var LeagueRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td><strong>{this.props.position}</strong></td>
                <td><strong>{this.props.teamData.teamName}</strong></td>
                <td>{this.props.teamData.played}</td>
                <td>{this.props.teamData.won}</td>
                <td>{this.props.teamData.drawn}</td>
                <td>{this.props.teamData.lost}</td>
                <td>{this.props.teamData.goalsFor}</td>
                <td>{this.props.teamData.goalsAgainst}</td>
                <td>{this.props.teamData.goalsDifference}</td>
                <td><strong>{this.props.teamData.points}</strong></td>
            </tr>
        );
    }
});


module.exports = LeagueRow;
