'use strict';

import JSFormData from '../src/form-data';


test('serializes sole element of single-index value as value of associated key in returned object', () => {
  const formData = new JSFormData();

  formData._data = { foo: ['bar'] };
  expect(formData.serialize()).toEqual({ foo: 'bar' });
});

test('serializes multi-index value array as value of associated key in returned object', () => {
  const formData = new JSFormData();

  formData._data = { foo: ['bar', 'baz', 'qux'] };
  expect(formData.serialize()).toEqual({ foo: ['bar', 'baz', 'qux'] });
});
