'use-strict';

const $ = require('jquery');

test('runs a test with jsdom virtual dom', () => {
  document.body.innerHTML = `
    <form id="test-form">
      <input type="text" value="foo" />
    </form>
  `;
  
  expect($('#test-form')).not.toBeNull();
});
