# FinTrack

Aplicativo financeiro pessoal estático, sem dependências externas.

## Publicar no GitHub Pages
1. Crie um repositório no GitHub.
2. Envie todos os arquivos e pastas deste pacote para a raiz do repositório: `index.html`, `manifest.json`, `service-worker.js` e `icons/`.
3. No repositório, abra **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**, selecione `main` e `/ (root)`, e salve.
5. Aguarde a publicação e abra o endereço HTTPS do GitHub Pages no Chrome Android.

## Instalar no Android
No Chrome, abra o endereço HTTPS publicado, aguarde a página carregar e abra o menu ⋮. Toque em **Instalar app** ou **Adicionar à tela inicial** (o texto varia conforme a versão do Chrome). A instalação PWA e o cache offline exigem HTTPS; abrir `index.html` diretamente como arquivo não permite registrar service worker.

## Dados
Os lançamentos ficam no armazenamento local do navegador/dispositivo. Não há sincronização automática entre aparelhos. Use regularmente a opção de exportar backup JSON.

## Ticket alimentação
O ticket possui saldo separado: cadastre um lançamento do tipo **Ticket alimentação** como crédito recebido ou gasto/utilização. Esse saldo não altera o saldo em dinheiro, as receitas/despesas comuns nem o orçamento de gastos.
