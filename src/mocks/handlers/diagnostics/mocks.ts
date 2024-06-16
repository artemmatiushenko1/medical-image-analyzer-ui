import dayjs from 'dayjs';
import {
  ModelStatus,
  Diagnostic,
  Model,
  ModelVersion,
} from '@/packages/diagnostics';

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
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    status: ModelStatus.ENABLED,
    description: null,
    queueName: crypto.randomUUID(),
    typeId: crypto.randomUUID(),
  },
  {
    name: 'PneumoCheck',
    id: '2',
    currentVersion: MOCK_MODEL_VERSIONS[0],
    enabled: true,
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    status: ModelStatus.ENABLED,
    description: null,
    queueName: crypto.randomUUID(),
    typeId: crypto.randomUUID(),
  },
  {
    name: 'LymeXpert',
    id: '3',
    currentVersion: MOCK_MODEL_VERSIONS[0],
    enabled: false,
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    status: ModelStatus.ENABLED,
    description: null,
    queueName: crypto.randomUUID(),
    typeId: crypto.randomUUID(),
  },
  {
    name: 'CoviScanNet-2',
    id: '4',
    currentVersion: MOCK_MODEL_VERSIONS[0],
    enabled: true,
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    status: ModelStatus.ENABLED,
    description: null,
    queueName: crypto.randomUUID(),
    typeId: crypto.randomUUID(),
  },
];

export { MOCK_DIAGNOSTICS, MOCK_MODELS, MOCK_MODEL_VERSIONS };
