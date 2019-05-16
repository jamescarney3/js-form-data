'use-strict';

import $ from 'jquery';

import JSONFormData from '../src/form-data';


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


test('appends k/v pair to _data instance variable', () => {
  const formData = new JSONFormData();
  
  formData.append('foo', 'bar');
  expect(formData._data).toHaveProperty('foo', ['bar']);
});


test('throws exception when 2nd positional argument is not passed', () => {
  const formData = new JSONFormData();
  
  const errorSpy = jest.spyOn(global.console, 'error');
  formData.append('foo');
  expect(errorSpy).toHaveBeenCalled();
});

test('updates existing k/v pair when key already exists on _data instance variable', () => {
  const formData = new JSONFormData();

  formData._data = { foo: ['bar'] };
  formData.append('foo', 'baz');
  expect(formData._data).toHaveProperty('foo', ['bar', 'baz']);
});


test('appends k/v pair with provided filename when value arguement is a Blob', () => {
  const formData = new JSONFormData();
  
  const blob = new Blob([JSON.stringify({ foo: 'bar' })], { type: 'application/json'});
  formData.append('blob', blob, 'test-blob');
  expect(formData._data['blob'][0]).toHaveProperty('name', 'test-blob');
});


test('appends k/v pair without provided filename when value argument is not a Blob instance', () => {
  const formData = new JSONFormData();
  
  formData.append('test-key', 'not-a-blob', 'test-non-blob');
  expect(formData._data['test-key'][0]).not.toHaveProperty('name', ['test-blob']);
});


test('clones passed blob value arguments', () => {
  const formData = new JSONFormData();
  
  const blob = new Blob([JSON.stringify({ foo: 'bar' })], { type: 'application/json'});
  formData.append('blob', blob);
  expect(formData._data['blob'][0]).not.toBe(blob);
  expect(formData._data['blob'][0].size).toEqual(blob.size);
})