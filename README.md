# 🛒 Testes de Fluxo de Compras - E-commerce

Este projeto contém automações de teste do fluxo de compras em um e-commerce público utilizando **Playwright**.

---

## ⚙️ Arquivos Importantes

### `fixtures/test-data.ts`
Contém **massa de dados centralizada** usada nos testes:  
- Usuários (válidos e inválidos)  
- Produtos (disponível e indisponível)  
- Endereços (válido e inválido)  
- Cartões (válido e inválido - mockados)  

Exemplo:
```ts
import { users, products, addresses } from '../fixtures/test-data';

users.validUser.email // retorna "usuario@teste.com"
products.availableProduct.searchTerm // retorna "notebook"
```

### `utils/helpers.ts`
**Contém funções auxiliares para ações repetitivas:**

- `login(page)` → faz login com usuário padrão ou customizado
- `searchAndOpenProduct(page, searchTerm)` → busca e abre página de produto
- `addToCart(page, searchTerm)` → adiciona produto ao carrinho
- `goToCheckout(page)` → abre o checkout com carrinho preenchido

Exemplo:
```ts
import { login, addToCart } from '../utils/helpers';

await login(page);
await addToCart(page, 'notebook');
```

## 🚀 Como executar

# 1. Instalar dependências
`npm install`

# 2. Executar todos os testes
`npx playwaright test`

# 3. Executar em modo interativo (UI)
`npx playwright test --ui`

# 4. Executar apenas uma suíte (ex: checkout)
`npx playwright test tests/checkout`

# 5. Gerar e abrir relatório
`npx playwright show-report`

## ✅ Casos de Teste Automatizados

# Busca
- CT01: Buscar produto existente
- CT02: Buscar produto inexistente

# Produto
- CT04: Visualizar detalhes do produto
- CT05: Adicionar ao carrinho
- CT06: Produto indisponível (mock)

# Carrinho
- CT07: Visualizar carrinho
- CT09: Remover item do carrinho

# Checkout
- CT11: Finalizar compra sem login
- CT12: Informar endereço válido
- CT13: Informar endereço inválido

## 📌 Observação

- Alguns cenários foram mockados (produto indisponível e login) para simular situações que não conseguimos reproduzir em e-commerces reais.
- Outros cenários não foram automatizados por serem de finalização de compra.

por Jean Anjos.