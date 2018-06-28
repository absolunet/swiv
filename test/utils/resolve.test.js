const resolve = require('./../../src/utils/resolve');

describe('utils', () => {
	describe('filter', () => {
		test('Filter properly works with simple objects', () => {
			const baseObject = {
				foo: {
					bar: {
						baz: 'test'
					}
				}
			};

			expect(resolve('foo', baseObject)).toMatchObject({ bar: { baz: 'test' } });
			expect(resolve('foo.bar', baseObject)).toMatchObject({ baz: 'test' });
			expect(resolve('foo.bar.baz', baseObject)).toBe('test');
			expect(resolve('foo.bar.baz.test', baseObject)).toBe(undefined);
		});

		test('Filter properly works with simple arrays', () => {
			const baseArray = [[['test']]];

			expect(resolve('0', baseArray)).toMatchObject(baseArray[0])
			expect(resolve('0.0', baseArray)).toMatchObject(baseArray[0][0]);
			expect(resolve('0.0.0', baseArray)).toBe(baseArray[0][0][0]);
		});

		test('Filter properly works with simple mixed objects and arrays', () => {
			const baseObject = {
				foo: [
					{
						bar: 'test',
						baz: 'hello'
					},
					{
						bar: 'test 2',
						baz: 'hello 2'
					}
				]
			};

			expect(resolve('foo', baseObject)).toMatchObject(baseObject.foo);
			expect(resolve('foo.0', baseObject)).toMatchObject(baseObject.foo[0]);
			expect(resolve('foo.1', baseObject)).toMatchObject(baseObject.foo[1]);
			expect(resolve('foo.0.bar', baseObject)).toBe(baseObject.foo[0].bar);
			expect(resolve('foo.0.baz', baseObject)).toBe(baseObject.foo[0].baz);
			expect(resolve('foo.1.bar', baseObject)).toBe(baseObject.foo[1].bar);
			expect(resolve('foo.1.baz', baseObject)).toBe(baseObject.foo[1].baz);
		});
	});
});
