'use-strict';

import JSFormData from '../src/form-data';


test('returns a FormData object', () => {
  const formData = new JSFormData();

  expect(formData.generate() instanceof FormData).toBe(true);
});

test('appends each element of length == 1 array type value to returned FormData object', () => {
  const formData = new JSFormData();

  formData._data = { foo: ['bar'] };
  expect(formData.generate().get('foo')).toEqual('bar');
});

test('appends each element of length > 1 array type value to returned FormData object', () => {
  const formData = new JSFormData();

  formData._data = { foo: ['bar', 'baz', 'qux'] };
  expect(formData.generate().getAll('foo')).toEqual(['bar', 'baz', 'qux']);
});
