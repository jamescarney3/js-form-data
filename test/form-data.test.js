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


test('thows error when passed falsey argument', () => {
  
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


test('parses k/v pair value from input name & value attr', () => {
  document.body.innerHTML = `
    <form id="test-form">
      <input value="bar" name="foo" />
    </form>
  `;
  
  const formData = new JSONFormData($('#test-form')[0]);
  console.log(formData);
  
  expect(formData._data).toHaveProperty('foo', 'bar');
});