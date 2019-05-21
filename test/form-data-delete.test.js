'use-strict';

import JSFormData from '../src/form-data';


test('deletes a k/v pair and returns value', () => {
  const formData = new JSFormData();
  
  formData._data = { foo: ['bar'] };
  expect(formData.delete('foo')).toEqual(['bar']);
  expect(formData).not.toHaveProperty('foo');
});

test('doesn\'t throw error for nonexistent key and returns null', () => {
  const formData = new JSFormData();
  
  const deletedValue = formData.delete('foo');
  expect(deletedValue).toBe(null);
})