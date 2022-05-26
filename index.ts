import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({
    headless: false,
    // 50msだと5.4~5秒くらいになり、結構速い人間くらいの速度になる
    // 逆にここを指定しないと0秒になってしまう
    slowMo: 50,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://engawa.takurinton.dev");
  await page.waitForSelector("#root");

  await page.keyboard.press("Enter");
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press("t");
    await page.keyboard.press("a");
    await page.keyboard.press("k");
    await page.keyboard.press("u");
    await page.keyboard.press("r");
    await page.keyboard.press("i");
    await page.keyboard.press("n");
    await page.keyboard.press("t");
    await page.keyboard.press("o");
    await page.keyboard.press("n");
  }

  const target = ".css-1mfvp4a";
  const element = await page.$(target);
  if (!element) throw new Error(`selector ${target} is not found`);
  await element.screenshot({
    path: `./engawa.png`,
  });

  await browser.close();
})();
