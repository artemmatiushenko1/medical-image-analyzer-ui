import dayjs from 'dayjs';
import {
  Diagnostic,
  Model,
  ModelVersion,
} from '../../../packages/diagnostics/types';

const MOCK_DIAGNOSTICS: Diagnostic[] = [
  {
    id: '2',
    previewImg: 'https://med.comsys.kpi.ua/images/services/2.jpg',
    name: 'Детекція пневмнонії',
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    description: null,
  },
  {
    id: '3',
    previewImg: 'https://med.comsys.kpi.ua/images/services/3.jpg',
    name: 'Діагностування COVID-19',
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    description: null,
  },
  {
    id: '4',
    previewImg: 'https://med.comsys.kpi.ua/images/services/4.jpg',
    name: 'Діагностування меланоми',
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    description: null,
  },
  {
    id: '5',
    previewImg: 'https://med.comsys.kpi.ua/images/services/5.jpg',
    name: 'Діагностування хвороби Лайма',
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    description: null,
  },
];

const MOCK_MODEL_VERSIONS: ModelVersion[] = [
  {
    id: crypto.randomUUID(),
    createdAt: dayjs().toISOString(),
    revision: 4,
    name: 'Increased accuracy',
  },
  {
    id: crypto.randomUUID(),
    createdAt: dayjs().toISOString(),
    revision: 3,
    name: 'Increased accuracy',
  },
  {
    id: crypto.randomUUID(),
    createdAt: dayjs().toISOString(),
    revision: 2,
    name: 'Increased accuracy',
  },
  {
    id: crypto.randomUUID(),
    createdAt: dayjs().toISOString(),
    revision: 1,
    name: 'Increased accuracy',
  },
];

const MOCK_MODELS: Model[] = [
  {
    name: 'MelaDiagnose',
    id: '1',
    currentVersion: MOCK_MODEL_VERSIONS[1],
    enabled: true,
  },
  {
    name: 'PneumoCheck',
    id: '2',
    currentVersion: MOCK_MODEL_VERSIONS[0],
    enabled: true,
  },
  {
    name: 'LymeXpert',
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

export { MOCK_DIAGNOSTICS, MOCK_MODELS, MOCK_MODEL_VERSIONS };
