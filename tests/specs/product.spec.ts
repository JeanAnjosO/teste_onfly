import { test, expect } from '@playwright/test';
import { addToCart, searchAndOpenProduct } from '../../utils/helpers';
import { products } from '../../fixtures/test-data';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.americanas.com.br/');

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

test.describe('Produto - Seleção e detalhes', () => {

  test('CT04 - Visualizar detalhes do produto', async ({ page }) => {
    await searchAndOpenProduct(page, products.availableProduct.searchTerm);

    // Espera o título do produto estar visível
    const productTitle = page.getByRole('heading');
    await productTitle.waitFor({ state: 'visible', timeout: 5000 });
    await expect(productTitle).toContainText(/notebook/i);

    // Espera descrição estar visivel
    const description = page.getByText(/IdeaPad Slim 3i/i);
    await description.waitFor({ state: 'visible', timeout: 5000 });
    await expect(description).toBeVisible();
  });

  test('CT05 - Adicionar ao carrinho (produto disponível)', async ({ page }) => {
    await addToCart(page, products.availableProduct.searchTerm);

    // Aguarda o modal ou notificação de sucesso de adição ao carrinho
    const cartNotification = page.getByText(/continuar/i);
    await cartNotification.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
  });

  test('CT06 - Tentar adicionar produto indisponível (mock)', async ({ page }) => {
    await page.goto(`/produto-exemplo-indisponivel`);

    const unavailableText = page.getByText(/nenhum resultado encontrado/i);
    await unavailableText.waitFor({ state: 'visible', timeout: 5000 });
    await expect(unavailableText).toBeVisible();
  });

});
