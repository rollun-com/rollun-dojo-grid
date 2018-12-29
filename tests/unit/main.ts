import intern from 'intern';

const {suite, test} = intern.getPlugin('interface.tdd');
const {assert} = intern.getPlugin('chai');

suite('Grid unit tests placeholder', () => {
	test('test placeholder', () => {
		assert.equal(1, 1);
	});
});
