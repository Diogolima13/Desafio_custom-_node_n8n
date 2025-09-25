# n8n-nodes-random-int

Gera um inteiro aleatório **inclusivo** entre `min` e `max`.
Por padrão usa `crypto.randomInt`. Opcionalmente, pode usar RANDOM.ORG.

## Como usar (local)

1. Suba o n8n com Postgres (pasta `n8n-lab/`):
   ```bash
   docker compose up -d
   ```

2. Compile o node:
   ```bash
   cd random-int-node
   npm install
   npm run build
   ```

3. Monte os arquivos compilados no volume de extensões do n8n.
   Com o `docker-compose.yml` fornecido, crie a pasta `extensions` ao lado do compose e copie o `dist`:
   ```bash
   mkdir -p ../extensions/nodes/random-int
   cp -R dist ../extensions/nodes/random-int/
   ```

4. Reinicie o n8n:
   ```bash
   cd ../n8n-lab
   docker compose restart n8n
   ```

No editor do n8n, procure por **Random Integer**.

## Parâmetros

- **min**: inteiro mínimo (inclusivo)
- **max**: inteiro máximo (inclusivo)
- **Usar RANDOM.ORG**: ao habilitar, usa a API JSON-RPC para gerar o inteiro verdadeiro aleatório
- **API Key (RANDOM.ORG)**: chave da sua conta

## Saída

```json
{ "value": 69, "min": 1, "max": 100, "provider": "node:crypto", "generatedAt": "2025-04-07T21:00:05.000Z" }
```

## Segurança e validações
- Validação estrita de entrada (finito, inteiro, `min ≤ max`).
- Limite defensivo de intervalo para prevenir abusos.
- Nenhum segredo é logado. Se usar RANDOM.ORG, prefira credenciais do n8n.

## Licença
MIT
