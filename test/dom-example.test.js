'use-strict';

test('runs a test with jsdom virtual dom', () => {
  document.body.innerHTML = `
    <form id="test-form">
      <input type="text" value="foo" />
    </form>
  `;
  
  expect(true).toEqual(true);
});