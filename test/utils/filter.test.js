const filter = require('./../../src/utils/filter');

describe('utils', () => {
	describe('filter', () => {
		test('Filter properly work', () => {
			expect(filter({
				foo: "foo",
				bar: "bar",
				baz: "hello"
			}, (value, index) => {
				return value === index;
			})).toMatchObject({
				foo: "foo",
				bar: "bar"
			});
		});
	});
});
