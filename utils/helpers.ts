import { Page, expect } from '@playwright/test';
import { users, products } from '../fixtures/test-data';

// 🔍 Buscar produto e abrir página de detalhes
export async function searchAndOpenProduct(page: Page, searchTerm?: string) {
  const product = page.getByTitle('Notebook Lenovo IdeaPad Slim 3 15IRH10 Intel Core i5-13420H 16GB 512GB SSD Windows 11 15.3" - 83NS0001BR Luna Grey');

  await page.locator('#search-input').fill(products.availableProduct.searchTerm);
  await page.keyboard.press('Enter');
  await product.waitFor({ state: 'visible', timeout: 10000 });
  await product.click();
}

// 🛒 Adicionar produto ao carrinho
export async function addToCart(page: Page, searchTerm?: string) {
  await searchAndOpenProduct(page, searchTerm);
  await page.getByRole('button', { name: 'comprar' }).click();
  await expect(page.getByText(/minha cesta/i)).toBeVisible();
}

// 🧾 Ir para checkout (com produto no carrinho)
export async function goToCheckout(page: Page) {
  // Aguarda side bar de sucesso
  const cartNotification = page.getByText(/carregando/i);
  await cartNotification.waitFor({ state: 'visible', timeout: 8000 });
  await expect(cartNotification).toBeVisible();

  // Clique no botão continuar
  page.click('body > div.section.CartSidebar_section__tbZKG.section-cart-sidebar > div:nth-child(2) > footer > button > div');

  // Wait para aguardar abrir a pagina
  const continueCheckoutButton = page.locator('#cart-to-orderform')
  await continueCheckoutButton.waitFor({ state: 'visible', timeout: 8000 });
  await expect(continueCheckoutButton).toBeVisible();

  // Clique no botão Calcular
  page.click('#shipping-calculate-link');
}
