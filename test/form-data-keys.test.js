'use-strict';

import JSONFormData from '../src/form-data';


test('returns array of keys from _data instance variable when one key is present', () => {
  const formData = new JSONFormData();
  
  formData._data = { foo: ['bar'] };
  expect(formData.keys()).toEqual(['foo']);
});


test('returns array of keys from _data instance variable when multiple keys are present', () => {
  const formData = new JSONFormData();
  
  formData._data = { foo: ['bar'], baz: ['quz'], quux: ['garply'] };
  expect(formData.keys()).toEqual(['foo', 'baz', 'quux']);
});


test('returns empty array if no keys present in _data instance variable', () => {
  const formData = new JSONFormData();
  
  expect(formData.keys()).toEqual([]);
});