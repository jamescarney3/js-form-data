'use strict';

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


test('throws exception with unrecognized param signature passed', () => {
  const formData = new JSFormData();  
  const errorSpy = jest.spyOn(global.console, 'error');

  // see method for valid param signatures
  formData.getAll();
  formData.getAll(1);
  formData.getAll(true);
  formData.getAll(['foo']);
  formData.getAll({ foo: 'bar' });
  expect(errorSpy).toHaveBeenCalledTimes(5);
});


test('returns the value of a present key', () => {
  const formData = new JSFormData();
  
  formData._data = { foo: ['bar'] };
  expect(formData.getAll('foo')).toEqual(['bar'])
});


test('returns null if key not present', () => {
  const formData = new JSFormData();
  
  expect(formData.getAll('foo')).toEqual([]);
});