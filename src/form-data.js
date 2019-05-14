
import { has } from 'lodash';


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
        if (process.env.NODE_ENV === 'debug' || process.env.NODE_ENV === 'test') {
          console.error(e);
        }
      }
    }
  }
  
  append(name, value, filename) {
    if (!has(this._data, name)) {
      this._data[name] = value;
    }
    
    // if (value instanceof Blob) {
    //   const reader = new FileReader();
    //   reader.onload = function(e) {
    //     const file = new File([e.target.result], filename);
    //     this._data[name] = file;
    //   }
    //   reader.readAsDataUrl(value);
    // }
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

