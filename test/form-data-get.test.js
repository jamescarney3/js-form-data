'use strict';

import JSONFormData from '../src/form-data';


test('returns the value of a present key', () => {
  const formData = new JSONFormData();
  
  formData._data = { foo: ['bar'] };
  expect(formData.get('foo')).toEqual('bar')
});


test('returns null if key not present', () => {
  const formData = new JSONFormData();
  
  expect(formData.get('foo')).toEqual(null);
});