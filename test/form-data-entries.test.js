'use-strict';

import JSFormData from '../src/form-data';


test('returns array of associated k/v pairs from _data instance variable when one key is present', () => {
  const formData = new JSFormData();
  
  formData._data = { foo: ['bar'] };
  expect(formData.entries()).toEqual([['foo', 'bar']]);
});


test('returns array of associated k/v pairs from _data instance variable when multiple keys are present', () => {
  const formData = new JSFormData();
  
  formData._data = { foo: ['bar'], baz: ['qux'], quux: ['garply'] };
  expect(formData.entries()).toEqual([['foo', 'bar'], ['baz', 'qux'], ['quux', 'garply']]);
});

test('uses first value in pair when multiples are present for a single key', () => {
  const formData = new JSFormData();
  
  formData._data = { foo: ['bar', 'baz', 'qux'] };
  expect(formData.entries()).toEqual([['foo', 'bar']]);
})


test('returns empty array if no keys present in _data instance variable', () => {
  const formData = new JSFormData();
  
  expect(formData.entries()).toEqual([]);
});