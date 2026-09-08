import { test, expect } from "@playwright/test";

const expectedProjects = [
  [
    "Clinic Management System",
    "https://github.com/Tigo1123/clinic_",
    "https://clinic-staging-web.onrender.com/",
  ],
  [
    "Student Planner",
    "https://github.com/Tigo1123/student-planner",
    "https://student-planner-web-v2.onrender.com/",
  ],
  [
    "Guess My Number",
    "https://github.com/Tigo1123/Guess-My-Number",
    "https://guess-my-number-elg5.onrender.com/",
  ],
  ["Academic System", "https://github.com/Tigo1123/academic-system", null],
];

test("curated project order, featured content, and verified repository and demo targets", async ({
  page,
}) => {
  await page.goto("/#projects");
  const cards = page.locator("#projects .project-card");
  await expect(cards.locator("h3")).toHaveText(
    expectedProjects.map(([title]) => title),
  );
  await expect(
    cards
      .filter({ has: page.locator(".project-featured-label") })
      .locator("h3"),
  ).toHaveText(["Clinic Management System", "Student Planner"]);
  for (const [title, url, liveUrl] of expectedProjects) {
    const card = page.getByRole("article", { name: title, exact: true });
    await expect(
      card.getByRole("link", {
        name: `${title} on GitHub (opens in a new tab)`,
        exact: true,
      }),
    ).toHaveAttribute("href", url);
    const demo = card.getByRole("link", { name: /live demo/i });
    if (liveUrl) {
      await expect(demo).toBeVisible();
      await expect(demo).toHaveAttribute("href", liveUrl);
    } else {
      await expect(demo).toHaveCount(0);
    }
  }
  for (const link of await cards.getByRole("link").all()) {
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    await expect(link).toHaveAccessibleName(/opens in a new tab/);
    expect([
      ...expectedProjects.flatMap(([, url, liveUrl]) =>
        liveUrl ? [url, liveUrl] : [url],
      ),
    ]).toContain(await link.getAttribute("href"));
  }
  await expect(cards.locator('a[href="#"]')).toHaveCount(0);
  await expect(cards.locator("img")).toHaveCount(3);
  for (const id of [
    "clinic-management",
    "student-planner",
    "guess-my-number",
  ]) {
    const screenshot = cards
      .filter({ has: page.locator(`#project-${id}`) })
      .locator("img");
    await expect(screenshot).toHaveAttribute("src", `/projects/${id}.webp`);
    await screenshot.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        screenshot.evaluate(
          (img) =>
            img.complete &&
            img.naturalWidth === 1600 &&
            img.naturalHeight === 900,
        ),
      )
      .toBe(true);
  }
  const academic = page.getByRole("article", {
    name: "Academic System",
    exact: true,
  });
  await expect(academic.locator("img")).toHaveCount(0);
  await expect(academic.locator(".project-visual")).toBeVisible();
  await expect(
    cards
      .first()
      .getByRole("list", { name: /highlights/ })
      .getByRole("listitem"),
  ).toHaveCount(3);
});

for (const mode of ["none", "github", "live", "image", "broken-image"]) {
  test(`optional project fields and preview: ${mode}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(
      `http://127.0.0.1:4174/tests/fixtures/project-card.html?mode=${mode}`,
    );
    const card = page.getByRole("article", { name: "Component fixture" });
    await expect(card).toBeVisible();
    await expect(card.getByRole("link", { name: /on GitHub/ })).toHaveCount(
      mode === "github" ? 1 : 0,
    );
    await expect(card.getByRole("link", { name: /live demo/ })).toHaveCount(
      mode === "live" ? 1 : 0,
    );
    if (mode === "github" || mode === "live") {
      await expect(card.getByRole("link")).toHaveAttribute("target", "_blank");
      await expect(card.getByRole("link")).toHaveAttribute(
        "rel",
        "noopener noreferrer",
      );
    } else
      await expect(
        card.getByText("Project links not yet available"),
      ).toBeVisible();
    if (mode === "image") {
      await expect
        .poll(() =>
          card
            .locator("img")
            .evaluate((image) => image.complete && image.naturalWidth > 0),
        )
        .toBe(true);
      expect(
        await card
          .locator("img")
          .evaluate((image) => getComputedStyle(image).objectFit),
      ).toBe("contain");
      const bounds = await card.locator("img").boundingBox();
      expect(Math.abs(bounds.width / bounds.height - 16 / 9)).toBeLessThan(
        0.02,
      );
    } else {
      await expect(card.locator(".project-visual")).toBeVisible();
      await expect(card.locator("img")).toHaveCount(0);
    }
    expect(
      await card.evaluate(
        (element) => element.scrollWidth <= element.clientWidth,
      ),
    ).toBe(true);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}

for (const width of [320, 768, 1440]) {
  test(`project cards at ${width}px in light and dark themes`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
    await page.goto("/#projects");
    for (const theme of ["light", "dark"]) {
      if (theme === "dark")
        await page.getByRole("button", { name: "Switch to dark mode" }).click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      for (const card of await page.locator("#projects .project-card").all()) {
        await card.scrollIntoViewIfNeeded();
        const preview = card.locator(".project-image, .project-visual");
        await expect(preview).toBeVisible();
        const bounds = await preview.boundingBox();
        expect(Math.abs(bounds.width / bounds.height - 16 / 9)).toBeLessThan(
          0.02,
        );
        expect(
          await card.evaluate(
            (element) => element.scrollWidth <= element.clientWidth,
          ),
        ).toBe(true);
        const img = card.locator("img");
        if (await img.count())
          await expect
            .poll(() =>
              img.evaluate(
                (element) => element.complete && element.naturalWidth > 0,
              ),
            )
            .toBe(true);
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  });
}
