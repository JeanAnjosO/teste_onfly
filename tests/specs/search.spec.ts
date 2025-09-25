import { test, expect } from '@playwright/test';
import { products } from '../../fixtures/test-data.ts';

test.beforeEach(async ({ page }) => {
  await page.goto('/');

  // Fecha banner
  const closeBanner = page.locator('#close-button-1454703513200');
  if (await closeBanner.isVisible().catch(() => false)) {
    await closeBanner.waitFor({ state: 'visible', timeout: 5000 });
    await closeBanner.click();
  }

  // Espera o input de busca estar visível e habilitado
  const searchInput = page.locator('#search-input');
  await expect(searchInput).toBeVisible({ timeout: 5000 });
  await expect(searchInput).toBeEnabled({ timeout: 5000 });
});

test.describe('Busca de produtos', () => {

  test('CT01 - Buscar produto existente', async ({ page }) => {
    const searchInput = page.locator('#search-input');
    
    // Preenche e envia a busca
    await searchInput.click();
    await searchInput.fill(products.availableProduct.searchTerm);                      
    await page.keyboard.press('Enter');

    // Espera pelo resultado antes de validar
    const searchResult = page.getByText(/notebooks/i);
    await searchResult.waitFor({ state: 'visible', timeout: 5000 });
    await expect(searchResult).toBeVisible();
  });

  test('CT02 - Buscar produto inexistente', async ({ page }) => {
    const searchInput = page.locator('#search-input');

    // Preenche e envia a busca
    await searchInput.fill(products.unavailableProduct.searchTerm);
    await page.keyboard.press('Enter');

    // Espera pelo resultado "nenhum resultado"
    const noResult = page.getByText(/ops!/i);
    await noResult.waitFor({ state: 'visible', timeout: 5000 });
    await expect(noResult).toBeVisible();
  });

});
