'use-strict';

import JSFormData from '../src/form-data';


if (process.env.NODE_ENV !== 'debug') {
  beforeAll(() => {
    // Create a spy on console (console.log in this case) and provide some mocked implementation
    // In mocking global objects it's usually better than simple `jest.fn()`
    // because you can `unmock` it in clean way doing `mockRestore`
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    // Restore mock after all tests are done, so it won't affect other test suites
    console.error.mockRestore();
  });

  afterEach(() => {
    // Clear mock (all calls etc) after each test.
    // It's needed when you're using console somewhere in the tests so you have clean mock each time
    console.error.mockClear();
  });
}

test('returns an instance of JSFormData', () => {
  const formData = JSFormData.parse({});

  expect(formData.constructor === JSFormData).toBe(true);
});

test('sets new instance _data k/v pairs from argument object k/v pairs', () => {
  const formData = JSFormData.parse({ foo: true });

  expect(formData._data['foo']).toEqual([true]);
});

test('sets new instance _data value from non-array argument object value as array', () => {
  const formData = JSFormData.parse({ foo: true });

  expect(formData._data['foo'].constructor === Array).toBe(true);
});

test('sets new instance _data value from array argument object value as array', () => {
  const formData = JSFormData.parse({ foo: [1, 2, 3] });

  expect(formData._data['foo'].constructor === Array).toBe(true);
});

test('throws error if constructor argument is defined but not a plain object', () => {
  const errorSpy = jest.spyOn(global.console, 'error');
  const formData = JSFormData.parse('foo');

  expect(errorSpy).toHaveBeenCalled();
});

test('returns a JSFormData instance when no argument / undefined is passed', () => {
  const formData = JSFormData.parse();

  expect(formData instanceof JSFormData).toBe(true);
});
