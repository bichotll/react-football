/** @jsx React.DOM */

jest.dontMock('../LeagueTable');

describe('LeagueRow', function () {
    var React = require('react/addons');
    var LeagueTable = require('../LeagueTable');
    var LeagueService = require('../../services/league-service');

    var TestUtils = React.addons.TestUtils;
    var leagueService = null;

    var leagueData;

    beforeEach(function () {
        LeagueService.initLeagueObject();
        leagueTable = TestUtils.renderIntoDocument(<LeagueTable leagueData={LeagueService.league} />);
    });

    it('creates leagueRows from league object', function () {
        var leagueRows = TestUtils.scryRenderedDOMComponentsWithTag(
            leagueTable, 'LeagueRow');

        expect(leagueRows.getDOMNode().length).not.toEqual(0);
    });
});

