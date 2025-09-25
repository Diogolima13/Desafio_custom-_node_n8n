import crypto from 'node:crypto';
import type { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { randomIntegerDescription } from './descriptions';

export class RandomInteger implements INodeType {
  description: INodeTypeDescription = randomIntegerDescription;

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const minRaw = this.getNodeParameter('min', i) as number;
      const maxRaw = this.getNodeParameter('max', i) as number;
      const useRandomOrg = this.getNodeParameter('useRandomOrg', i, false) as boolean;

      if (!Number.isFinite(minRaw) || !Number.isFinite(maxRaw)) {
        throw new NodeOperationError(this.getNode(), 'min e max devem ser números finitos.');
      }
      const min = Math.trunc(minRaw);
      const max = Math.trunc(maxRaw);

      if (min > max) throw new NodeOperationError(this.getNode(), 'min não pode ser maior que max.');

      const RANGE_LIMIT = 1_000_000_000;
      if (max - min > RANGE_LIMIT) {
        throw new NodeOperationError(this.getNode(), `O intervalo é muito grande (>${RANGE_LIMIT}).`);
      }

      let value: number | undefined;

      if (useRandomOrg) {
        const apiKey = (this.getNodeParameter('randomOrgApiKey', i, '') as string).trim();
        if (!apiKey) throw new NodeOperationError(this.getNode(), 'API Key da RANDOM.ORG é obrigatória.');

        const body = {
          jsonrpc: "2.0",
          method: "generateIntegers",
          params: { apiKey, n: 1, min, max, replacement: true },
          id: Date.now()
        };

        const response = await this.helpers.httpRequest({
          method: 'POST',
          url: 'https://api.random.org/json-rpc/4/invoke',
          body,
          json: true,
          timeout: 10000,
        });

        value = response?.result?.random?.data?.[0];
        if (typeof value !== 'number') {
          throw new NodeOperationError(this.getNode(), 'Resposta inválida da RANDOM.ORG');
        }
      } else {
        const span = max - min + 1;
        value = crypto.randomInt(0, span) + min;
      }

      returnData.push({
        json: {
          value,
          min,
          max,
          provider: useRandomOrg ? 'random.org' : 'node:crypto',
          generatedAt: new Date().toISOString(),
        },
      });
    }

    return [returnData];
  }
}