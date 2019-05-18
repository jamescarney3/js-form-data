
import { first, forEach, has, head, includes, keys, last, map, reduce, toPairs, unset, values } from 'lodash';


const LOGGING_ENVS = ['debug', 'test', 'dev'];


export default class JSONFormData {
  constructor(node) {
    if (!node) {
      this._data = {};
    }
    else {
      try {
        if (node.tagName !== 'FORM') {
          throw new Error('JSONFormData constructor must be passed a form element');
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

  append(name, value, filename) {
    try {
      if (!value) throw new Error('JSONFormData#append requires 2 arguments, but only 1 present');

      if (value instanceof Blob) {
        const cloneValue = value.slice();
        if (!!filename) cloneValue.name = filename;
        pushValue(this._data, name, cloneValue);
      }

      else pushValue(this._data, name, value);
    }
    catch (e) {
      // istanbul ignore next
      if (includes(LOGGING_ENVS, process.env.NODE_ENV)) {
        console.error(e);
      }
    }
  }

  entries() {
    return map(toPairs(this._data), pair => [head(pair), head(last(pair))]);
  }

  delete(name) {
    const target = this._data[name] || null;
    this._data = unset(this._data, name);
    return target;
  }

  get(name) {
    return head(this._data[name]) || null;
  }

  getAll(name) {
    return this._data[name] || [];
  }

  has(name) {
    if (!name) return null;
    return has(this._data, name);
  }

  keys() {
    return keys(this._data);
  }

  set(name, value, filename) {
    try {
      if (!value) throw new Error('JSONFormData#set requires 2 arguments, but only 1 present');

      if (value instanceof Blob) {
        const cloneValue = value.slice();
        if (!!filename) cloneValue.name = filename;
        this._data[name] = [cloneValue];
      }

      else this._data[name] = [value];
    }
    catch (e) {
      // istanbul ignore next
      if (includes(LOGGING_ENVS, process.env.NODE_ENV)) {
        console.error(e);
      }
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

function pushValue(data, name, value) {
  if (!data[name]) {
    data[name] = [value]
  }
  else {
    data[name] = [...data[name], value]
  }
}
