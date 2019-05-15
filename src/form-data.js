
import { has, includes } from 'lodash';


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
  
  append(name, value, filename) {
    try {
      if (!value) {
        throw new Error('JSONFormData#append requires 2 arguments, but only 1 present');
      }
      
      if (value instanceof Blob) {
        const cloneValue = value.slice();
        
        if (!!filename) {
          cloneValue.name = filename;
        }
        
        this._data[name] = cloneValue;
      }
      
      else if (!has(this._data, name)) {
        this._data[name] = value;
      }
    }
    catch (e) {
      // istanbul ignore next
      if (includes(LOGGING_ENVS, process.env.NODE_ENV)) {
        console.error(e);
      }
    }
  }
}


function parseForm(node) {
  const data = {};

  for (var i = 0; i < node.elements.length; i++) {
    const element = node.elements[i];
    
    if (element.name && element.tagName !== 'FIELDSET') {
      if (element.type === 'checkbox' || element.type === 'radio') {
        if (!!element.checked) data[element.name] = element.value;
      } else if (element.type === 'file') {
        data[element.name] = element.files;
      } else {
        data[element.name] = element.value;
      }
    }
  }
  return data;
}

