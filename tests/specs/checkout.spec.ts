import { test, expect } from '@playwright/test';
import { goToCheckout } from '../../utils/helpers';
import { addresses } from '../../fixtures/test-data';

test.beforeEach(async ({ page }) => {
  await page.goto('/notebook-lenovo-ideapad-slim-3-15irh10-intel-core-i5-13420h-16gb-512gb-ssd-windows-11-15-3-83ns0001br-luna-grey-1o749498c48520a5/p');

  await page.locator('#privacytools-banner-consent > span').click();

  await page.getByRole('button', { name: 'comprar' }).click();
  await expect(page.getByText(/minha cesta/i)).toBeVisible();
});

test.describe('Checkout - Endereço e finalização', () => {

  test('CT11 - Finalizar compra sem login', async ({ page }) => {
    // Aguarda o botão continuar
    const continueButton = page.locator('body > div.section.CartSidebar_section__tbZKG.section-cart-sidebar > div:nth-child(2) > footer > button > div');
    await continueButton.waitFor({ state: 'visible', timeout: 8000 });
    await expect(continueButton).toBeVisible();
    await continueButton.click();

    // Clique no botão continuar dentro de checkout
    page.click('#cart-to-orderform')

    // Clique no botão continuar no email
    page.click('#btn-client-pre-email')

    // Validação de campo obrigatório
    const campoObrigatorioMessage = page.getByText(/campo obrigatório./i);
    await campoObrigatorioMessage.waitFor({ state: 'visible', timeout: 8000 });
    await expect(campoObrigatorioMessage).toBeVisible();
  });

  test('CT12 - Informar endereço válido', async ({ page }) => {
    await goToCheckout(page);

    // Preenche CEP
    const cepInput = page.locator('#ship-postalCode');
    await expect(cepInput).toBeVisible({ timeout: 5000 });
    await expect(cepInput).toBeEnabled();
    await cepInput.fill(addresses.validAddress.cep);

    //Valida mensagem de CEP
    const freteText = page.locator('#shipping-preview-container > div > div > div > div.srp-delivery-info.mb6 > label > div > div.srp-shipping-current-single__description.flex.items-center.flex-auto.tl > div.srp-shipping-current-single__text.flex-auto.br.b--light-silver.truncate > div');
    await freteText.waitFor({ state: 'visible', timeout: 8000 });
    await expect(freteText).toBeVisible();
    await expect(freteText).toHaveText('Em até 6 dias úteis')
  });

  test('CT13 - Informar endereço inválido', async ({ page }) => {
    await goToCheckout(page);

    // Preenche CEP
    const cepInput = page.locator('#ship-postalCode');
    await expect(cepInput).toBeVisible({ timeout: 5000 });
    await expect(cepInput).toBeEnabled();
    await cepInput.fill(addresses.invalidAddress.cep);

    //Valida mensagem de CEP
    const freteText = page.locator('#shp-unavailable-delivery-available-pickup');
    await freteText.waitFor({ state: 'visible', timeout: 8000 });
    await expect(freteText).toBeVisible();
    await expect(freteText).toContainText('item não está disponível')
  });

});
