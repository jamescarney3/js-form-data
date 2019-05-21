[![Build Status][build]][buildUrl] [![Coverage Status][coverage]][coverageUrl] [![License][license]][licenseUrl]
# JS Form Data
Plain-old-JS near-implementation of the [FormData][1] web API with analogue methods for browsers with limited support and ergonomic parsing & serialization functionality


<br/>





### Constructor
_Every class that instantiates has one!_

`JSFormData()`
Creates a new `JSFormData` object.
```
// in document body
//<form id="example">
//	<input name="foo" value="bar" />
//	<input name="baz" value="qux" />
//	<input name="bool" value="true" />
//	<input name="bool" value="false" />
//</form>

const formData = new JSFormData(document.getElementById('example'));
formData.serialize();
// => { foo: 'bar', baz: 'qux', bool: [true, false] }
```

### Class Methods
_The JSFormData class has one util method but it's an important one if you need an instance but don't have a DOM element to pass to the constructor_

`JSFormData::parse(<obj>)`
Creates a new `JSFormData` object from k/v pairs in a plain JS object argument.
```
const formData = JSFormData.parse({ foo: 'bar', baz: true, qux: [1, 2, 3] });
formData.serialize();
// => { foo: 'bar', baz: true, qux: [1, 2, 3] }
```

### Instance Methods
_JSFormData instance methods are analogues of the regular FormData web API instance methods, modified to accept and return friendlier objects for easier integration with other processing logic_

`JSFormData.append(<str>, <_>)`
Appends a new value onto an existing key in a `JSFormData` internal data structure, or adds the key and value if it does not already exist.
```
const formData = new JSFormData();
formData.append('foo', 'bar');
formData.append('foo', 'baz');
formData.append('qux', true);
formData.serialize();
// => { foo: ['bar', 'baz'], qux: true };
```
<br/>

`JSFormData.delete(<str>)`
Deletes a k/v pair from a `JSFormData` internal data structure.
```
const formData = JSFormData.parse({ foo: 'bar', baz: 'qux'});
formData.delete('foo');
formData.serialize();
// => { baz: 'qux' }
```
<br/>

`JSFormData.entries()`
Returns an `Array` of 2-element `Array`s from k/v pairs in `JSFormData`'s internal data structure.
```
const formData = JSFormData.parse({ foo: 'bar', baz: ['qux', 'quux']});
formData.serialize();
// => [['foo', 'bar'], ['baz', ['qux', 'quux]]]
```
<br/>

`JSFormData.get(<str>)`
Returns the first value associated with a given key in a `JSFormData` instance.
```
const formData = JSFormData.parse({ foo: 'bar', baz: [1, 2] });
formData.get('foo');
// => 'bar'
formData.get('baz');
// => 1
```
<br/>

`JSFormData.getAll(<str>)`
Returns an `Array` of all values associated with a given key in a `JSFormData` instance.
```
const formData = JSFormData.parse({ foo: 'bar', baz: [1, 2] });
formData.getAll('foo');
// => ['bar']
formData.getAll('baz');
// => [1, 2]
```
<br/>

`JSFormData.has(<str>)`
Returns a boolean indicating whether a `JSFormData` instance contains a given key.
```
const formData = JSFormData.parse({ foo: 'bar', baz: false });
formData.has('foo');
// => true
formData.has('baz');
// => true
formData.has('qux');
// => false
```
<br/>

`JSFormData.keys()`
Returns an `Array` of all the keys in a `JSFormData` instance.
```
const formData = JSFormData.parse({ foo: 'bar', baz: false, qux: [1, 2, 3] });
formData.keys();
// => ['foo', 'baz', 'qux']
```
<br/>

`JSFormData.set(<str>, <_>)`
Sets a new value for an existing key in a `JSFormData` instance, or adds a k/v pair if the given key does not already exist.
```
const formData = JSFormData({ foo: 'bar' });
formData.set('foo', 'baz');
formData.serialize();
 // => { foo: 'baz' }
```
<br/>

`JSFormData.values()`
Returns an `Array` of values in a `JSFormData` instance; `Array` elements are either single values associated 1:1 with a key, or the first of a set of values associated many:1 with a key.
```
const formData = JSFormData.parse({ foo: 'bar', baz: false, qux: [1, 2, 3] });
JSFormData.values();
// => ['bar', false, 1]
```






[1]: [https://developer.mozilla.org/en-US/docs/Web/API/FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)

[build]: https://travis-ci.com/jamescarney3/js-form-data.svg?branch=dev
[buildUrl]: https://travis-ci.com/jamescarney3/js-form-data
[coverage]: https://coveralls.io/repos/github/jamescarney3/js-form-data/badge.svg?branch=dev
[coverageUrl]: https://coveralls.io/github/jamescarney3/js-form-data?branch=dev
[license]: https://img.shields.io/badge/License-BSD%202--Clause-orange.svg
[licenseUrl]: https://opensource.org/licenses/BSD-2-Clause