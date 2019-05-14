
export default class JSONFormData {
  constructor(node) {
    try {
      if (!node) {
        throw new Error('JSONFormData constructor must be passed a form element');
      }

      if (node.tagName !== 'FORM') {
        throw new Error('JSONFormData constructor must be passed a form element');
      }
      this._data = this._parseForm(node);
    }
    catch (e) {
      // istanbul ignore next
      // this is test and debug environment specific behavior
      if (process.env.NODE_ENV === 'debug' || process.env.NODE_ENV === 'test') {
        console.error(e);
      }
    }
  }
  
  _parseForm(node) {
    const data = {};
    for (i = 0; i < node.elements.length; i++) {
      if (node.elements[i].name) {
        data[node.elements[i].name] = node.elements[i].value;
      }
    }
    
    return data;
  }
}
