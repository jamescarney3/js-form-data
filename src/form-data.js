
import { first, every, forEach, has, head, includes, keys, last, map, nth, reduce, toPairs, unset, values } from 'lodash';


const LOGGING_ENVS = ['debug', 'test', 'dev'];


export default class JSFormData {
  constructor(node) {
    if (!node) {
      this._data = {};
    }
    else {
      try {
        if (node.tagName !== 'FORM') {
          throw new Error('JSFormData constructor must be passed a form element');
        }

        this._data = parseForm(node);
      }
      catch (e) {
        // istanbul ignore next
        // this is test and debug environment specific behavior
        if (includes(LOGGING_ENVS, process.env.NODE_ENV)) {
          console.error(e);
        }
      }
    }
  }

  static parse(data = {}) {
    try {
      if (data.constructor !== Object) throw new Error('JSFormData#parse must be passed a plain object');

      const _data = reduce(data, (acc, v, k) => {
        if (v.constructor === Array) acc[k] = v;
        else acc[k] = [v];
        return acc;
      }, {});
      const formData = new JSFormData();
      formData._data = _data;
      return formData;
    }
    catch (e) {
      // istanbul ignore next
      // this is test and debug environment specific behavior
      if (includes(LOGGING_ENVS, process.env.NODE_ENV)) {
        console.error(e);
      }
    }
  }

  serialize() {
    return reduce(this._data, (acc, v, k) => {
      const value = v.length === 1 ? first(v) : v;
      return { ...acc, [k]: value };
    }, {});
  }

  generate() {
    const formData = new FormData();
    forEach(this._data, (v, k) => {
      forEach(v, el => {
        formData.append(k, el);
      });
    });

    return formData;
  }

  append(...args) {
    try {
      if (matchArgsToTypes(args, [String, Blob, 'any'])) {
        const [name, value, filename] = args;
        const clone = value.slice();
        
        if (!!filename) clone.name = filename;
        pushValue(this._data, name, clone);
      }
      
      else if (matchArgsToTypes(args, [String, 'any'])) {
        const [name, value, filename] = args;
        
        pushValue(this._data, name, value);
      }

      else if (matchArgsToTypes(args, [Object])) {
        const [obj] = args;
        
        mergeValue(this._data, obj);
      }
      
      
      else {
        throw new Error('Invalid param types passed to JSFormData.append')
      };
    }
    catch (e) {
      // istanbul ignore next
      if (includes(LOGGING_ENVS, process.env.NODE_ENV)) console.error(e);
    }
  }
  
  delete(key) {
    try {
      if (matchArgsToTypes([key], [String])) {
        const target = this._data[key] || null;
        this._data = unset(this._data, key);
        return target;
      }
      else {
        throw new Error('Invalid param types passed to JSFormData.delete')
      }
    }
    catch (e) {
      // istanbul ignore next
      if (includes(LOGGING_ENVS, process.env.NODE_ENV)) console.error(e);
    }
  }

  entries() {
    return map(toPairs(this._data), pair => [head(pair), head(last(pair))]);
  }

  get(key) {
    try {
      if (matchArgsToTypes([key], [String])) {
        return head(this._data[key]) || null;
      }
      else {
        throw new Error('Invalid param types passed to JSFormData.get')
      }
    }
    catch (e) {
      // istanbul ignore next
      if (includes(LOGGING_ENVS, process.env.NODE_ENV)) console.error(e);
    }
  }

  getAll(key) {
    try {
      if (matchArgsToTypes([key], [String])) {
        return this._data[key] || [];
      }
      else {
        throw new Error('Invalid param types passed to JSFormData.getAll')
      }
    }
    catch (e) {
      // istanbul ignore next
      if (includes(LOGGING_ENVS, process.env.NODE_ENV)) console.error(e);
    }
  }

  has(key) {
    try {
      if (matchArgsToTypes([key], [String])) {
        return has(this._data, key);
      }
      else {
        throw new Error('Invalid param types passed to JSFormData.getAll')
      }
    }
    catch (e) {
      // istanbul ignore next
      if (includes(LOGGING_ENVS, process.env.NODE_ENV)) console.error(e);
    }
  }

  keys() {
    return keys(this._data);
  }

  set(...args) {
    try {
      if (matchArgsToTypes(args, [String, Blob, 'any'])) {
        const [name, value, filename] = args;
        const clone = value.slice();
        
        if (!!filename) clone.name = filename;
        this._data[name] = [clone];
      }
      
      else if (matchArgsToTypes(args, [String, 'any'])) {
        const [name, value] = args;
        
        this._data[name] = [value];
      }

      else if (matchArgsToTypes(args, [Object])) {
        const [obj] = args;
        
        setValue(this._data, obj);
      }
      
      
      else {
        throw new Error('Invalid param types passed to JSFormData.set')
      };
    }
    catch (e) {
      // istanbul ignore next
      if (includes(LOGGING_ENVS, process.env.NODE_ENV)) console.error(e);
    }
  }

  values() {
    return map(values(this._data), head);
  }
}


function parseForm(node) {
  const data = {};

  for (var i = 0; i < node.elements.length; i++) {
    const element = node.elements[i];

    if (element.name && element.tagName !== 'FIELDSET') {
      if (element.type === 'checkbox' || element.type === 'radio') {
        if (!!element.checked) pushValue(data, element.name, element.value)
      } else if (element.type === 'file') {
        pushValue(data, element.name, element.files)
      } else {
        pushValue(data, element.name, element.value)
      }
    }
  }
  return data;
}


// ----- UPDATERS -----
function pushValue(data, name, value) {
  if (!data[name]) {
    data[name] = [value];
  }
  else {
    data[name] = [...data[name], value];
  }
}

function mergeValue(data, obj) {
  forEach(toPairs(obj), pair => {
    const [key, val] = pair;
    
    if (has(data, key)) data[key] = [...data[key], val];
    else data[key] = [val];
  });
}

function setValue(data, obj) {
  forEach(toPairs(obj), pair => {
    const [key, val] = pair;
    
    data[key] = Array.isArray(val) ? val : [val];
  });
}

// ----- RUNTIME TYPE CHECKING -----
// this might be more tightly opinionated than it needs to be, TBD
function matchArgToType(arg, type) {
  if (type === 'any') return true;
  
  // not currently applicable, but number primitives don't have constructors
  // if (type === Number) return typeof arg === 'number' ? true : false;
  
  return arg.constructor === type;
}

function matchArgsToTypes(args, types) {
  return every(types, (type, idx) => matchArgToType(args[idx], type));
}
