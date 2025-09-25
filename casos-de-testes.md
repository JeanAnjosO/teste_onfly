# 📋 Casos de Teste – Fluxo de Compras

## 1. Navegação e busca de produto

### CT01 – Buscar produto existente
Dado que o usuário acessa a home
Quando pesquisa por "notebook"
Então a lista de notebooks disponíveis deve ser exibida.

### CT02 – Buscar produto inexistente
Dado que o usuário pesquisa por "produtoXYZ123"
Então o sistema deve exibir mensagem "nenhum resultado encontrado".

### CT03 – Filtrar por categoria
Quando o usuário aplica o filtro "Eletrônicos"
Então apenas produtos desta categoria devem ser exibidos.

## 2. Seleção de produto

### CT04 – Visualizar detalhes do produto
Quando o usuário clica em um produto
Então deve visualizar nome, preço, descrição, fotos e avaliações.

### CT05 – Adicionar ao carrinho (produto disponível)
Quando o usuário seleciona "Comprar"
Então o produto deve ser adicionado ao carrinho com sucesso.

### CT06 – Tentar adicionar produto indisponível
Quando o usuário tenta adicionar um produto fora de estoque
Então deve receber a mensagem "Produto indisponível".

## 3. Carrinho de compras

### CT07 – Visualizar carrinho
Quando o usuário abre o carrinho
Então deve ver a lista de itens, valores e subtotal.

### CT08 – Alterar quantidade de item
Quando o usuário aumenta a quantidade de um produto de 1 para 2
Então o valor total deve ser recalculado corretamente.

### CT09 – Remover item do carrinho
Quando o usuário remove um produto
Então ele não deve mais aparecer no carrinho.

## 4. Checkout

### CT10 – Finalizar compra com login existente
Dado que o usuário tem conta e está logado
Quando clica em "Finalizar compra"
Então deve prosseguir para a tela de entrega e pagamento.

### CT11 – Finalizar compra sem login
Dado que o usuário não está logado
Quando clica em "Finalizar compra"
Então deve ser direcionado para a tela de login/cadastro.

### CT12 – Informar endereço válido
Quando o usuário insere CEP e endereço
Então deve ver o cálculo correto de frete.

### CT13 – Informar endereço inválido
Quando o usuário insere um CEP inexistente
Então deve receber mensagem de erro.

## 5. Pagamento

### CT14 – Pagar com cartão de crédito válido
Quando insere dados corretos do cartão
Então a compra deve ser aprovada.

### CT15 – Pagar com cartão inválido
Quando insere número de cartão incorreto
Então deve receber mensagem "Pagamento recusado".

### CT16 – Pagar com boleto
Quando o usuário escolhe "Boleto bancário"
Então o boleto deve ser gerado corretamente.

### CT17 – Pagar com Pix
Quando o usuário seleciona "Pix"
Então o QR Code deve ser exibido para pagamento.

## 6. Confirmação e pós-compra

### CT18 – Receber confirmação de pedido
Quando o pagamento é aprovado
Então o usuário deve receber número do pedido e e-mail de confirmação.

### CT19 – Acompanhar pedido
Dado que o pedido foi realizado
Quando o usuário acessa "Meus pedidos"
Então deve visualizar status do pedido (em preparação, enviado, entregue).

### CT20 – Cancelar pedido antes do envio
Quando o usuário solicita cancelamento
Então o sistema deve registrar o cancelamento e reembolso.