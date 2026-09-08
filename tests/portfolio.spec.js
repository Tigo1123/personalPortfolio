import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const widths = [320, 375, 430, 768, 1024, 1440];
for (const width of widths) {
  test(`layout and accessibility at ${width}px in both themes`, async ({
    page,
  }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "light" });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "TageldinGasmalla.",
    );
    for (const theme of ["light", "dark"]) {
      if (theme === "dark")
        await page.getByRole("button", { name: "Switch to dark mode" }).click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      for (const section of await page.locator("main > section").all()) {
        await section.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
          )
          .toBe(true);
      }
      for (const card of await page.locator("#projects .project-card").all()) {
        expect(
          await card.evaluate(
            (element) => element.scrollWidth <= element.clientWidth,
          ),
        ).toBe(true);
        const preview = card.locator(".project-image, .project-visual");
        const bounds = await preview.boundingBox();
        expect(Math.abs(bounds.width / bounds.height - 16 / 9)).toBeLessThan(
          0.02,
        );
      }
      expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
      if (width === 1440 || width === 375) {
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({
          path: `test-results/portfolio-${width}-${theme}.png`,
          fullPage: true,
        });
      }
    }
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    expect(errors).toEqual([]);
  });
}
test("mobile navigation, Escape, selection, active section, and resize", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 700 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const toggle = page.locator('button[aria-controls="mobile-navigation"]');
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(
    page
      .getByRole("navigation", { name: "Mobile" })
      .getByRole("link", { name: "Home", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page
    .getByRole("navigation", { name: "Mobile" })
    .getByRole("link", { name: "Projects" })
    .click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#projects")).toBeFocused();
  // Click the visible sticky control without Playwright scrolling it into view.
  const box = await toggle.boundingBox();
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await expect(
    page
      .getByRole("navigation", { name: "Mobile" })
      .getByRole("link", { name: "Projects" }),
  ).toHaveAttribute("aria-current", "location");
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(
    page.getByRole("navigation", { name: "Main", exact: true }),
  ).toBeVisible();
  await page.setViewportSize({ width: 375, height: 700 });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});
test("OS theme, reduced motion, local assets, and contact links", async ({
  page,
  request,
}) => {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(
    await page
      .locator("html")
      .evaluate((element) => getComputedStyle(element).scrollBehavior),
  ).toBe("auto");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  const urls = await page
    .locator('img, a[href*=".pdf"], a[href*="my_certification"]')
    .evaluateAll((elements) => [
      ...new Set(elements.map((element) => element.src || element.href)),
    ]);
  for (const url of urls) {
    const response = await request.get(url);
    expect(response.status(), url).toBe(200);
    expect(response.headers()["content-type"], url).toMatch(
      /image\/|application\/pdf/,
    );
  }
  await expect(
    page.getByRole("link", { name: "Download Resume", exact: true }),
  ).toHaveAttribute("download", "");
  await expect(
    page.locator('a[href="mailto:al.taj.gsm@gmail.com"]'),
  ).toHaveCount(3);
  await expect(
    page.locator('a[href="https://github.com/Tigo1123"]'),
  ).toHaveCount(2);
  await expect(
    page.locator(
      'a[href="https://www.linkedin.com/in/tageldin-gasmalla-6685a2202/"]',
    ),
  ).toHaveCount(2);
  await expect(page.locator('a[href="#"]')).toHaveCount(0);
});
