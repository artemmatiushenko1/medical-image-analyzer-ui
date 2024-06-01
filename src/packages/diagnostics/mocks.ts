import dayjs from 'dayjs';
import { Diagnostic, Model, ModelVersion } from './types';

const MOCK_DIAGNOSTICS: Diagnostic[] = [
  {
    id: '1',
    previewImg: 'https://med.comsys.kpi.ua/images/services/1.jpg',
    name: 'Класифікація аномалій в легенях',
  },
  {
    id: '2',
    previewImg: 'https://med.comsys.kpi.ua/images/services/2.jpg',
    name: 'Детекція аномалій в легенях',
  },
  {
    id: '3',
    previewImg: 'https://med.comsys.kpi.ua/images/services/3.jpg',
    name: 'Діагностування COVID-19',
  },
  {
    id: '4',
    previewImg: 'https://med.comsys.kpi.ua/images/services/4.jpg',
    name: 'Діагностування меланоми',
  },
  {
    id: '5',
    previewImg: 'https://med.comsys.kpi.ua/images/services/5.jpg',
    name: 'Діагностування хвороби Лайма',
  },
  {
    id: '6',
    previewImg: 'https://med.comsys.kpi.ua/images/services/6.jpg',
    name: 'Класифікація аномалій в клітинах (гістологія)',
  },
];

const MOCK_MODEL_VERSIONS: ModelVersion[] = [
  {
    id: crypto.randomUUID(),
    createdAt: dayjs().toISOString(),
    revision: 4,
    name: 'Increased accuracy',
    notes: '',
  },
  {
    id: crypto.randomUUID(),
    createdAt: dayjs().toISOString(),
    revision: 3,
    name: 'Increased accuracy',
    notes: '',
  },
  {
    id: crypto.randomUUID(),
    createdAt: dayjs().toISOString(),
    revision: 2,
    name: 'Increased accuracy',
    notes: '',
  },
  {
    id: crypto.randomUUID(),
    createdAt: dayjs().toISOString(),
    revision: 1,
    name: 'Increased accuracy',
    notes: '',
  },
];

const MOCK_MODELS: Model[] = [
  {
    name: 'CoviScanNet',
    id: '1',
    currentVersion: MOCK_MODEL_VERSIONS[0],
    enabled: true,
  },
  {
    name: 'SARS-CoV-2Analyzer',
    id: '2',
    currentVersion: MOCK_MODEL_VERSIONS[0],
    enabled: true,
  },
  {
    name: 'CovidVisionAI',
    id: '3',
    currentVersion: MOCK_MODEL_VERSIONS[0],
    enabled: false,
  },
  {
    name: 'CoviScanNet-2',
    id: '4',
    currentVersion: MOCK_MODEL_VERSIONS[0],
    enabled: true,
  },
];

export { MOCK_DIAGNOSTICS, MOCK_MODELS };
