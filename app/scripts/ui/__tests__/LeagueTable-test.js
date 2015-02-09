/** @jsx React.DOM */

jest.dontMock('../LeagueTable');

describe('LeagueRow', function () {
    var LeagueTable = require('../LeagueTable');
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var leagueRow = null;

    var leagueData;

    beforeEach(function () {
        leagueRow = TestUtils.renderIntoDocument(<LeagueRow teamData={teamData} position={position} />);
    });

    it('creates leagueRows from league object', function () {
        var strongElement = TestUtils.scryRenderedDOMComponentsWithTag(
            leagueRow, 'strong');

        expect(strongElement[0].getDOMNode().textContent).toEqual(position);
        expect(strongElement[1].getDOMNode().textContent).toEqual(teamData.teamName);
    });
});

