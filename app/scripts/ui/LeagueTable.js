/** @jsx React.DOM */
var React = require('react');
var _ = require('lazy.js');

var LeagueRow = require('./LeagueRow');

var LeagueTable = React.createClass({
    getInitialState: function() {
        return null;
    },
    render: function() {
        var leagueRows = function(){
            var position = 0;
            return _(this.props.leagueData).map(function(teamInfo){
                position++;
                return (<LeagueRow teamData={teamInfo} position={position} />);
            }).value();
        }.bind(this);

        return (
            <table className="table table-bordered" >
                <tr>
                    <td>Position</td>
                    <td>Team</td>
                    <td>Pld</td>
                    <td>W</td>
                    <td>D</td>
                    <td>L</td>
                    <td>GF</td>
                    <td>GA</td>
                    <td>GD</td>
                    <td>Pts</td>
                </tr>
                {leagueRows()}
            </table>
        );
    }
});


module.exports = LeagueTable;
