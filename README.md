# Github Profile App

Este projeto utiliza a API do GitHub para buscar informações de perfil e exibir dados relevantes.

## Configuração do Token de Acesso Pessoal

### 1. Gerar um Token de Acesso Pessoal

1. Acesse [Configurações do GitHub](https://github.com/settings/tokens).
2. Clique em **Generate new token**.
3. Dê um nome ao seu token e selecione as permissões necessárias.
4. Clique em **Generate token**.
5. **Copie o token gerado**

### 2. Configurar o Token no Código

1. Abra o arquivo **app.js**.
2. **Na linha 1 do arquivo**, substitua `'YOUR_PERSONAL_ACCESS_TOKEN'` pelo token que você gerou.

   ```javascript
   const token = 'YOUR_PERSONAL_ACCESS_TOKEN'; // Substitua pelo seu token
    ```
