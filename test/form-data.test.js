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


test('instantiates with a form element as argument', () => {
  document.body.innerHTML = `
    <form id="test-form"><input type="text" name="test-input" /></form>
  `;
  
  const formData = new JSONFormData($('#test-form')[0]);
  expect(formData).not.toBeNull();
});


test('thows exception when passed falsey argument', () => {
  
  const errorSpy = jest.spyOn(global.console, 'error');
  const formData = new JSONFormData();
  
  expect(errorSpy).toHaveBeenCalled();
});


test('throws exception when passed non-form element as argument', () => {
  document.body.innerHTML = `
    <div id="test-form">I am not a form</div>
  `;
  
  const errorSpy = jest.spyOn(global.console, 'error');
  const formData = new JSONFormData($('#test-form')[0]);
  
  expect(errorSpy).toHaveBeenCalled();
});


test('parses key from input name attr', () => {
  document.body.innerHTML = `
    <form id="test-form"><input name="foo" /></form>
  `;
  
  const formData = new JSONFormData($('#test-form')[0]);
  
  expect(formData._data).toHaveProperty('foo');
});


test('does not parse key from input with no name attr', () => {
  document.body.innerHTML = `
    <form id="test-form"><input /></form>
  `;
  
  const formData = new JSONFormData($('#test-form')[0]);
  
  expect(formData._data).toEqual({});
});


test('parses k/v pair from input name & value attr', () => {
  document.body.innerHTML = `
    <form id="test-form">
      <input value="bar" name="foo" />
    </form>
  `;
  
  const formData = new JSONFormData($('#test-form')[0]);
  
  expect(formData._data).toHaveProperty('foo', 'bar');
});


test('parses k/v pair from text input with text supplied', () => {
  document.body.innerHTML = `
    <form id="test-form">
      <input id="test-input" type="text" value="" name="test-text-input" />
    </form>
  `;
  
  const input = $('#test-input')[0];
  input.value = 'test-value';
  const formData = new JSONFormData($('#test-form')[0]);
  
  expect(formData._data).toHaveProperty('test-text-input', 'test-value');
});


test('does not parse k/v pair from unchecked checkbox', () => {
  document.body.innerHTML = `
    <form id="test-form">
      <input type="checkbox" name="test-checkbox-input" />
    </form>
  `;
  
  const formData = new JSONFormData($('#test-form')[0]);
  expect(formData._data).not.toHaveProperty('test-checkbox-input');
});


test('parses k/v pair from checked checkbox', () => {
  document.body.innerHTML = `
    <form id="test-form">
      <input type="checkbox" name="test-checkbox-input" checked />
    </form>
  `;
  
  const formData = new JSONFormData($('#test-form')[0]);
  expect(formData._data).toHaveProperty('test-checkbox-input', 'on');
});


test('does not parse k/v pair from unchecked radio group', () => {
  document.body.innerHTML = `
    <form id="test-form">
      <input type="radio" value="foo" name="test-radio-input" />
      <input type="radio" value="bar" name="test-radio-input" />
      <input type="radio" value="baz" name="test-radio-input" />
    </form>
  `;
  
  const formData = new JSONFormData($('#test-form')[0]);
  expect(formData._data).not.toHaveProperty('test-radio-input');
});


test('parses k/v pair from checked radio group', () => {
  document.body.innerHTML = `
    <form id="test-form">
      <input type="radio" value="foo" name="test-radio-input" />
      <input type="radio" value="bar" name="test-radio-input" />
      <input type="radio" value="baz" name="test-radio-input" checked />
    </form>
  `;
  
  const formData = new JSONFormData($('#test-form')[0]);
  expect(formData._data).toHaveProperty('test-radio-input', 'baz');
});
