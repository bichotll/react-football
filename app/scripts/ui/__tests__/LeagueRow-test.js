/** @jsx React.DOM */

jest.dontMock('../LeagueRow');

describe('LeagueRow', function () {
    var LeagueRow = require('../LeagueRow');
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var leagueRow = null;

    var teamData;
    var position;

    beforeEach(function () {
        teamData = {
            teamName: 'teamNameTest'
        };
        position = '1';
        leagueRow = TestUtils.renderIntoDocument(<LeagueRow teamData={teamData} position={position} />);
    });

    it('shows the props passed', function () {
        var strongElement = TestUtils.scryRenderedDOMComponentsWithTag(
            leagueRow, 'strong');

        expect(strongElement[0].getDOMNode().textContent).toEqual(position);
        expect(strongElement[1].getDOMNode().textContent).toEqual(teamData.teamName);
    });
});

