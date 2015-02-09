/** @jsx React.DOM */

jest.dontMock('../LeagueTable');

describe('LeagueTable', function () {
    var React = require('react/addons');
    var LeagueTable = require('../LeagueTable');
    var LeagueRow = require('../LeagueRow');

    var TestUtils = React.addons.TestUtils;
    var leagueTable;
    var leagueData;

    var _ = require('../../../../node_modules/lazy.js/lazy');

    beforeEach(function () {
        leagueData = [
            {
                position: 0,
                teamId: '1',
                teamName: 'testTeamName',
                played: 0,
                won: 0,
                drawn: 0,
                lost: 0,
                goalsFor: 0,
                goalsAgainst: 0,
                goalsDifference: 0,
                points: 0
            },
            {
                position: 0,
                teamId: '2',
                teamName: 'testTeamName2',
                played: 0,
                won: 0,
                drawn: 0,
                lost: 0,
                goalsFor: 0,
                goalsAgainst: 0,
                goalsDifference: 0,
                points: 0
            }
        ];

        leagueTable = TestUtils.renderIntoDocument(<LeagueTable leagueData={leagueData} />);
    });

    it('creates leagueRows from league object', function () {
        var leagueRows = TestUtils.scryRenderedComponentsWithType(
            leagueTable, LeagueRow);
        expect(leagueRows.length).toEqual(2);
    });
});

