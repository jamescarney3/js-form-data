'use-strict';

import JSFormData from '../src/form-data';


test('returns true for present key', () => {
  const formData = new JSFormData();
  formData._data = { foo: ['bar'] };
  
  expect(formData.has('foo')).toBe(true);
});


test('returns false for missing key', () => {
  const formData = new JSFormData();
  
  expect(formData.has('foo')).toBe(false);
});


test('returns null if no argument passed', () => {
  const formData = new JSFormData();
  
  expect(formData.has()).toBe(null);
});