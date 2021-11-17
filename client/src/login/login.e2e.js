beforeAll(async () => {
  await page.goto('http://localhost:4444/login');
});

it('should change header', async () => {
  await page.click('app-login button');
  const text = await page.$eval('app-header', el => el.innerHTML);
  expect(text.toLowerCase()).toContain('awesome');
});
