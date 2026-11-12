# Biblioteca de imagens do Canvas

Esta pasta é a biblioteca local do projeto. Ela deve ser publicada junto com o
Canvas e pode ser versionada no mesmo repositório. Não depende de um serviço de
hospedagem de imagens separado.

- `manifest.json`: origem de cada imagem, caminho local e resultado da recuperação.
- `catalog.js`: associação entre URLs antigas e cópias locais, utilizada na
  importação de JSONs antigos. Gerado pelo script de sincronização.
- Imagens: cópias dos arquivos usados pelo Canvas, sem recriar ou redesenhar logos.

## Adicionar uma imagem própria

1. Salve o arquivo nesta pasta com um nome estável, por exemplo `minha-marca.png`.
2. No campo de URL do logo do bloco, use `./assets/images/minha-marca.png`.
3. Publique o arquivo junto com o restante de `architecture ct/`.

Para substituir um link antigo que deixou de funcionar, salve seu arquivo original
na pasta e registre uma entrada em `manifest.json`:

```json
"https://origem.example/logo.png": {
  "file": "assets/images/minha-marca.png",
  "status": "local"
}
```

Execute o script para atualizar `catalog.js`. Os arquivos já existentes são
preservados; downloads pendentes são tentados novamente:

```sh
python3 "architecture ct/scripts/sync-images.py"
```

O script usa Python 3 e curl, valida o conteúdo recebido e não salva páginas de erro
como imagens. Os nomes gerados incluem um hash da URL para evitar colisões.
Novos links no código são identificados automaticamente. Para links usados apenas
em JSONs pessoais, acrescente a URL ao manifesto com `{"status":"unavailable"}`.

Entradas com `status: unavailable` ainda precisam do arquivo original ou de uma URL
válida. Elas continuam usando o comportamento anterior de carregamento; uma imagem
indisponível não é substituída silenciosamente por uma marca diferente.

Os JSONs mantêm o formato atual. URLs antigas catalogadas apontam para a cópia local;
cópias locais catalogadas também são resolvidas ao importar um JSON salvo em outro
host. URLs de imagens não catalogadas continuam funcionando como antes.

Depois de alterar o catálogo, atualize sua versão em `index.html` na publicação.
O catálogo conserva as URLs de origem para facilitar manutenção e atribuição.
