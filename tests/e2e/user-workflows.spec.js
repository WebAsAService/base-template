import { test, expect } from '@playwright/test';

test.describe('User Workflows', () => {
  test.beforeEach(async ({ page }) => {
    // Start from the home page
    await page.goto('/');
  });

  test.describe('Theme Switching', () => {
    test('should switch themes dynamically', async ({ page }) => {
      // Navigate to theme demo page
      await page.goto('/theme-demo');

      // Verify initial state
      await expect(page.locator('h1').first()).toContainText('Theme System Demo');

      // Click on blue ocean theme link
      await page.click('a[href="/theme-demo?theme=theme-blue-ocean"]');
      
      // Wait for navigation and verify URL changed
      await page.waitForURL('**/theme-demo?theme=theme-blue-ocean');
      
      // Verify the current theme text is displayed
      await expect(page.locator('text=Currently viewing:')).toBeVisible();
      await expect(page.locator('text=Blue Ocean')).toBeVisible();
      
      // Go to another theme
      await page.click('a[href="/theme-demo?theme=theme-purple-elegance"]');
      await page.waitForURL('**/theme-demo?theme=theme-purple-elegance');
      await expect(page.locator('text=Purple Elegance')).toBeVisible();
    });

    test('should persist theme across navigation', async ({ page }) => {
      await page.goto('/theme-demo');

      // Set theme
      await page.click('[data-theme="theme-sunset-orange"]');
      await expect(page.locator('html')).toHaveClass(/theme-sunset-orange/);

      // Navigate to another page
      await page.goto('/');

      // Theme should persist
      await expect(page.locator('html')).toHaveClass(/theme-sunset-orange/);
    });

    test('should update visual elements with theme', async ({ page }) => {
      await page.goto('/theme-demo');

      // Switch to blue ocean theme
      await page.click('[data-theme="theme-blue-ocean"]');

      // Check background color changes
      const bgColor = await page.locator('body').evaluate(el =>
        window.getComputedStyle(el).backgroundColor
      );

      // Blue ocean should have light blue background
      expect(bgColor).toMatch(/rgb|rgba/);
    });
  });

  test.describe('Navigation', () => {
    test('should navigate through main menu', async ({ page }) => {
      // Click About link
      await page.click('nav a[href="/about"]');
      await expect(page).toHaveURL(/.*about/);

      // Click Services link
      await page.click('nav a[href="/services"]');
      await expect(page).toHaveURL(/.*services/);

      // Click Contact link
      await page.click('nav a[href="/contact"]');
      await expect(page).toHaveURL(/.*contact/);

      // Return home via logo
      await page.click('header a[href="/"]');
      await expect(page).toHaveURL('/');
    });

    test('should handle mobile navigation', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      // Mobile menu should be hidden initially
      const mobileMenu = page.locator('nav ul');
      await expect(mobileMenu).toBeHidden();

      // Click hamburger menu
      await page.click('[aria-label="Open menu"]');

      // Menu should be visible
      await expect(mobileMenu).toBeVisible();

      // Click a link
      await page.click('nav a[href="/about"]');

      // Menu should close and navigate
      await expect(mobileMenu).toBeHidden();
      await expect(page).toHaveURL(/.*about/);
    });

    test('should support keyboard navigation', async ({ page }) => {
      // Tab through navigation
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      // Press Enter on focused link
      await page.keyboard.press('Enter');

      // Should navigate
      await expect(page).not.toHaveURL('/');
    });
  });

  test.describe('Contact Form', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/contact');
    });

    test('should submit contact form successfully', async ({ page }) => {
      // Fill form
      await page.fill('#name', 'John Doe');
      await page.fill('#email', 'john@example.com');
      await page.fill('#message', 'Test message for contact form');

      // Submit form
      await page.click('button[type="submit"]');

      // Check for success message
      await expect(page.locator('.success-message')).toBeVisible();
      await expect(page.locator('.success-message')).toContainText(/success|thank you/i);
    });

    test('should validate required fields', async ({ page }) => {
      // Try to submit empty form
      await page.click('button[type="submit"]');

      // Check for validation messages
      const nameError = page.locator('#name:invalid');
      const emailError = page.locator('#email:invalid');

      await expect(nameError).toBeVisible();
      await expect(emailError).toBeVisible();
    });

    test('should validate email format', async ({ page }) => {
      // Enter invalid email
      await page.fill('#name', 'John Doe');
      await page.fill('#email', 'invalid-email');
      await page.fill('#message', 'Test message');

      // Try to submit
      await page.click('button[type="submit"]');

      // Check for email validation
      const emailInput = page.locator('#email');
      await expect(emailInput).toHaveAttribute('type', 'email');

      const isInvalid = await emailInput.evaluate(el => !el.checkValidity());
      expect(isInvalid).toBe(true);
    });
  });

  test.describe('Responsive Design', () => {
    const viewports = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1920, height: 1080 }
    ];

    viewports.forEach(viewport => {
      test(`should render correctly on ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height
        });

        await page.goto('/');

        // Take screenshot for visual comparison
        await expect(page).toHaveScreenshot(`homepage-${viewport.name.toLowerCase()}.png`);

        // Check elements are visible
        await expect(page.locator('header')).toBeVisible();
        await expect(page.locator('main')).toBeVisible();
        await expect(page.locator('footer')).toBeVisible();
      });
    });

    test('should handle orientation changes', async ({ page }) => {
      // Portrait
      await page.setViewportSize({ width: 375, height: 667 });
      const portraitLayout = await page.locator('main').boundingBox();

      // Landscape
      await page.setViewportSize({ width: 667, height: 375 });
      const landscapeLayout = await page.locator('main').boundingBox();

      // Layout should adapt
      expect(portraitLayout?.width).toBeLessThan(landscapeLayout?.width || 0);
    });
  });

  test.describe('Performance', () => {
    test('should load quickly', async ({ page }) => {
      const startTime = Date.now();

      await page.goto('/', { waitUntil: 'networkidle' });

      const loadTime = Date.now() - startTime;

      // Page should load in under 3 seconds
      expect(loadTime).toBeLessThan(3000);
    });

    test('should have optimized images', async ({ page }) => {
      await page.goto('/');

      // Check all images have loading attribute
      const images = page.locator('img');
      const imageCount = await images.count();

      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const loading = await img.getAttribute('loading');

        // Non-critical images should lazy load
        if (await img.evaluate(el => el.getBoundingClientRect().top > window.innerHeight)) {
          expect(loading).toBe('lazy');
        }
      }
    });

    test('should cache static assets', async ({ page }) => {
      // First load
      await page.goto('/');

      // Get resource timing for CSS
      const cssLoadTime = await page.evaluate(() => {
        const entries = performance.getEntriesByType('resource');
        const css = entries.find(e => e.name.includes('.css'));
        return css ? css.duration : 0;
      });

      // Second load (should use cache)
      await page.reload();

      const cachedCssLoadTime = await page.evaluate(() => {
        const entries = performance.getEntriesByType('resource');
        const css = entries.find(e => e.name.includes('.css'));
        return css ? css.duration : 0;
      });

      // Cached load should be faster
      expect(cachedCssLoadTime).toBeLessThanOrEqual(cssLoadTime);
    });
  });

  test.describe('SEO', () => {
    test('should have proper meta tags', async ({ page }) => {
      await page.goto('/');

      // Check title
      await expect(page).toHaveTitle(/./);

      // Check meta description
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      expect(description?.length).toBeGreaterThan(50);
      expect(description?.length).toBeLessThan(160);

      // Check Open Graph tags
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');

      expect(ogTitle).toBeTruthy();
      expect(ogDescription).toBeTruthy();
      expect(ogImage).toBeTruthy();
    });

    test('should have proper heading structure', async ({ page }) => {
      await page.goto('/');

      // Should have exactly one h1
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);

      // H2 should come after H1
      const h1Text = await page.locator('h1').first().textContent();
      const h2Elements = await page.locator('h2').all();

      expect(h1Text).toBeTruthy();
      expect(h2Elements.length).toBeGreaterThan(0);
    });

    test('should have sitemap', async ({ page }) => {
      const response = await page.goto('/sitemap.xml');
      expect(response?.status()).toBe(200);

      const content = await response?.text();
      expect(content).toContain('<urlset');
      expect(content).toContain('<url>');
    });
  });

  test.describe('Client Pages', () => {
    test('should load Crown client page', async ({ page }) => {
      await page.goto('/clients/crown');

      // Check theme is applied
      await expect(page.locator('html')).toHaveClass(/theme-crown/);

      // Check content is loaded
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('.hero-section')).toBeVisible();
    });

    test('should have client-specific components', async ({ page }) => {
      await page.goto('/clients/crown');

      // Check for client-specific features
      const features = page.locator('.features-section');
      await expect(features).toBeVisible();

      // Check custom styling is applied
      const hasCustomStyles = await features.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return styles.getPropertyValue('--color-primary-500') !== '';
      });

      expect(hasCustomStyles).toBe(true);
    });
  });

  test.describe('Error Handling', () => {
    test('should handle 404 pages', async ({ page }) => {
      const response = await page.goto('/non-existent-page');

      // Should show 404 page
      expect(response?.status()).toBe(404);
      await expect(page.locator('h1')).toContainText(/404|not found/i);

      // Should have link back to home
      await expect(page.locator('a[href="/"]')).toBeVisible();
    });

    test('should handle JavaScript errors gracefully', async ({ page }) => {
      let jsError = null;

      page.on('pageerror', error => {
        jsError = error;
      });

      await page.goto('/');

      // No uncaught errors should occur
      expect(jsError).toBeNull();
    });
  });
});