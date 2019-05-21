'use-strict';

import JSFormData from '../src/form-data';


test('returns array of keys from _data instance variable when one key is present', () => {
  const formData = new JSFormData();
  
  formData._data = { foo: ['bar'] };
  expect(formData.keys()).toEqual(['foo']);
});


test('returns array of keys from _data instance variable when multiple keys are present', () => {
  const formData = new JSFormData();
  
  formData._data = { foo: ['bar'], baz: ['quz'], quux: ['garply'] };
  expect(formData.keys()).toEqual(['foo', 'baz', 'quux']);
});


test('returns empty array if no keys present in _data instance variable', () => {
  const formData = new JSFormData();
  
  expect(formData.keys()).toEqual([]);
});