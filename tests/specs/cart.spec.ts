import { test, expect } from '@playwright/test';
import { addToCart } from '../../utils/helpers';
import { products } from '../../fixtures/test-data';

test.beforeEach(async ({ page }) => {
  await page.goto('/');

  // Fecha banner se aparecer
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

test.describe('Carrinho de compras', () => {
  test('CT07 - Visualizar carrinho', async ({ page }) => {
    // Adiciona produto ao carrinho
    await addToCart(page, products.availableProduct.searchTerm);

    // Aguarda side bar de sucesso
    const cartNotification = page.getByText(/carregando/i);
    await cartNotification.waitFor({ state: 'visible', timeout: 8000 });
    await expect(cartNotification).toBeVisible();

    // Valida que o ícone da carrinho mostra 1 item
    const cartCount = page.locator('#quantity-selector-input');
    await cartCount.waitFor({ state: 'visible', timeout: 5000 });
    await expect(cartCount).toHaveCount(1);
  });

  test('CT09 - Remover item do carrinho', async ({ page }) => {
    // Adiciona produto para garantir que o carrinho não está vazio
    await addToCart(page, products.availableProduct.searchTerm);

    // Aguarda side bar de sucesso
    const cartNotification = page.getByText(/carregando/i);
    await cartNotification.waitFor({ state: 'visible', timeout: 5000 });
    await expect(cartNotification).toBeVisible();

    // Clica no botão remover
    const removeButton = page.locator('body > div.section.CartSidebar_section__tbZKG.section-cart-sidebar > div:nth-child(2) > ul > li > article > button > div > span > svg');
    await removeButton.waitFor({ state: 'visible', timeout: 5000 });
    await removeButton.click();

    // Valida que o carrinho está vazio
    const emptyCartMessage = page.getByText(/Your Cart is empty/i);
    await emptyCartMessage.waitFor({ state: 'visible', timeout: 5000 });
    await expect(emptyCartMessage).toBeVisible();
  });
});
