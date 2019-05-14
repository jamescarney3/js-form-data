'use-strict';

import $ from 'jquery';

import JSONFormData from '../src/form-data';


test('appends k/v pair to _data instance variable', () => {
  const formData = new JSONFormData();
  
  formData.append('foo', 'bar');
  expect(formData._data).toHaveProperty('foo', 'bar');
});


test('does not append k/v pair when key already exists on _data instance variable', () => {
  document.body.innerHTML = `<form id="test-form"><input name="foo" value="bar"/></form>`;
  
  const formData = new JSONFormData($('#test-form')[0]);
  formData.append('foo', 'baz');
  expect(formData._data).toHaveProperty('foo', 'bar');
});
