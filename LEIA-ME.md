# BELLATRIX — etapa inicial

Esta é a base do projeto escrita do zero com HTML, CSS e JavaScript. Inclui uma tela demonstrativa, seleção entre os perfis fictícios Vendedor/Gerente, ranking ilustrativo de produtos, mapa de calor regional, pesquisa de pedidos com filtros e o pet animado.

## Abrir durante o desenvolvimento

É necessário ter Node.js instalado. Na pasta do projeto, execute `npm run dev` e abra `http://localhost:4173` no navegador. O servidor local usa apenas recursos nativos do Node e não instala bibliotecas.

Para instalar o protótipo como app, abra-o por `localhost` durante o desenvolvimento ou hospede-o em um endereço HTTPS. Abrir `index.html` diretamente como arquivo não ativa o service worker nem a instalação PWA. O suporte ao fluxo de instalação varia conforme o navegador e o dispositivo. [Requisitos atuais de instalação de PWAs (MDN)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable).

## Arquivos

- `index.html`: estrutura e textos da tela.
- `style.css`: cores, organização visual, adaptação para celular e animações.
- `script.js`: dados fictícios, seletor de perfil/região e expressões do pet.
- `manifest.webmanifest`: nome, cores, ícones e modo de exibição do app instalado.
- `service-worker.js`: guarda a interface estática para abrir depois de uma visita.
- `server.mjs`: servidor local simples para desenvolvimento, sem API.
- `assets/`: dez expressões SVG do pet.
- `icons/`: ícones do app em 192 e 512 pixels.

## O que ainda é demonstração

O seletor Vendedor/Gerente não cria contas nem protege dados. As vendas, projeções, regiões, pedidos e produtos são inventados. A projeção usa uma regra fixa de exemplo, não uma previsão real. Ainda não há banco de dados, API, leitura de PDF nem conexão com o MSI. O service worker guarda somente arquivos da interface.

## Como vamos continuar

1. Entender juntos as partes de HTML, CSS e JavaScript desta primeira tela.
2. Definir o modelo de dados e as permissões de vendedor e gerente.
3. Criar o servidor e o banco de dados compartilhado.
4. Examinar um relatório de exemplo anonimizado e definir a importação.
5. Integrar com o MSI quando o desenvolvedor informar os meios de consulta disponíveis.

Para aprender: altere uma fala em `script.js`, o texto de um botão em `index.html` e a variável `--cyan` no início de `style.css`.
