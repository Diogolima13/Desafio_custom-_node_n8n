import type { INodeTypeDescription } from 'n8n-workflow';

export const randomIntegerDescription: INodeTypeDescription = {
  displayName: 'Random Integer',
  name: 'randomInteger',
  icon: 'fa:hashtag',
  group: ['transform'],
  version: 1,
  description: 'Gera um número inteiro aleatório inclusivo entre min e max',
  defaults: { name: 'Random Integer' },
  inputs: ['main'],
  outputs: ['main'],
  properties: [
    {
      displayName: 'Mínimo',
      name: 'min',
      type: 'number',
      typeOptions: { minValue: Number.MIN_SAFE_INTEGER, numberPrecision: 0 },
      default: 1,
      description: 'Valor inteiro mínimo (inclusivo)',
      required: true,
    },
    {
      displayName: 'Máximo',
      name: 'max',
      type: 'number',
      typeOptions: { maxValue: Number.MAX_SAFE_INTEGER, numberPrecision: 0 },
      default: 100,
      description: 'Valor inteiro máximo (inclusivo)',
      required: true,
    },
    {
      displayName: 'Usar RANDOM.ORG',
      name: 'useRandomOrg',
      type: 'boolean',
      default: false,
      description: 'Se habilitado, usa a API de integers da RANDOM.ORG (requer API Key).'
    },
    {
      displayName: 'API Key (RANDOM.ORG)',
      name: 'randomOrgApiKey',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      displayOptions: { show: { useRandomOrg: [true] } },
      description: 'Sua API Key da RANDOM.ORG'
    },
  ],
};