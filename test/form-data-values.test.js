'use-strict';

import JSONFormData from '../src/form-data';


test('returns array of keys from _data instance variable when one key is present', () => {
  const formData = new JSONFormData();
  
  formData._data = { foo: ['bar'] };
  expect(formData.values()).toEqual(['bar']);
});


test('returns array of keys from _data instance variable when multiple keys are present', () => {
  const formData = new JSONFormData();
  
  formData._data = { foo: ['bar'], baz: ['qux'], quux: ['garply'] };
  expect(formData.values()).toEqual(['bar', 'qux', 'garply']);
});


test('returns array of first values when multiples are present for a single key', () => {
  const formData = new JSONFormData();
  
  formData._data = { foo: ['bar', 'baz', 'qux'] };
  expect(formData.values()).toEqual(['bar']);
})


test('returns empty array if no keys present in _data instance variable', () => {
  const formData = new JSONFormData();
  
  expect(formData.values()).toEqual([]);
});