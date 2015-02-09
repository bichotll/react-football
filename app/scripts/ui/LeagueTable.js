/** @jsx React.DOM */
var React = require('react');
var _ = require('lazy.js');

var LeagueRow = require('./LeagueRow');

var LeagueTable = React.createClass({
    render: function () {
        var leagueRows = function () {
            var position = 0;
            return _(this.props.leagueData).map(function (teamInfo) {
                position++;
                return (<LeagueRow teamData={teamInfo} position={position} />);
            }).value();
        }.bind(this);

        return (
            <table className="table table-bordered" >
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Team</th>
                        <th>Pld</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>GF</th>
                        <th>GA</th>
                        <th>GD</th>
                        <th>Pts</th>
                    </tr>
                </thead>
                <tbody>
                {leagueRows()}
                </tbody>
            </table>
        );
    }
});


module.exports = LeagueTable;
