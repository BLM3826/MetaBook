beforeAll(async () => {
  await page.goto('http://localhost:4444/page2');
});

it('should change header', async () => {
  await page.click('app-page-2 button');
  const text = await page.$eval('app-header', el => el.innerHTML);
  expect(text.toLowerCase()).toContain('awesome');
});
