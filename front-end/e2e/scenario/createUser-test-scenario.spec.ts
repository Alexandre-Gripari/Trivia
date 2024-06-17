import { test, expect } from '@playwright/test';
import { testUserUrl } from 'e2e/e2e.config';

// This file is here to test the playwright integration.
test.describe('Initial test display', () => {
    test('Verify buttons are visible and clickable', async ({ page }) => {
        await page.goto(`${testUserUrl}`);

        
    
        
      });
});