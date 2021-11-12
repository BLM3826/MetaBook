beforeAll(async () => {
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (request.url().includes('user')) request.respond({ body: JSON.stringify({ name: 'Username' }) });
    else request.continue();
  });
  await page.goto('http://localhost:4444');
});

it('should display username', async () => {
  const htmlHeader = await page.$eval('app-header', el => el.innerHTML);
  expect(htmlHeader).toContain('Username');
});
