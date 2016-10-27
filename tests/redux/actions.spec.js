var actions = require('kb-scripts/redux/actions');

describe('Action::Question', () => {
  describe('#loadQuestions()', () => {
    it('returns action CALL_API info', () => {
      let action = actions.addCard('test_name', 'test_message', { x: 0, y: 0 });
      var expectedAction = {
        type: 'ADD_CARD',
        card: {
          id: 0,
          title: 'test_name',
          message: 'test_message',
          positionObj: { x: 0, y: 0, z: 0 },
        }
      }
      expect(action).to.deep.equal(expectedAction);
    });
  });
});
