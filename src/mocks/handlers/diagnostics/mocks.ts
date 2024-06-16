import dayjs from 'dayjs';
import {
  ModelStatus,
  Diagnostic,
  Model,
  ModelVersion,
  ModelVersionStatus,
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
    updatedAt: dayjs().toISOString(),
    version: 4,
    name: 'Increased accuracy',
    status: ModelVersionStatus.ENABLED,
  },
  {
    id: crypto.randomUUID(),
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
    version: 3,
    name: 'Increased accuracy',
    status: ModelVersionStatus.DISABLED,
  },
  {
    id: crypto.randomUUID(),
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
    version: 2,
    name: 'Increased accuracy',
    status: ModelVersionStatus.DISABLED,
  },
  {
    id: crypto.randomUUID(),
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
    version: 1,
    name: 'Increased accuracy',
    status: ModelVersionStatus.DISABLED,
  },
];

const MOCK_MODELS: Model[] = [
  {
    name: 'MelaDiagnose',
    id: '1',
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    status: ModelStatus.ENABLED,
    description: null,
    queueName: crypto.randomUUID(),
    type: MOCK_DIAGNOSTICS[0],
    versions: MOCK_MODEL_VERSIONS,
    currentVersion: MOCK_MODEL_VERSIONS[0],
  },
  {
    name: 'PneumoCheck',
    id: '2',
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    status: ModelStatus.ENABLED,
    description: null,
    queueName: crypto.randomUUID(),
    type: MOCK_DIAGNOSTICS[0],
    versions: MOCK_MODEL_VERSIONS,
    currentVersion: MOCK_MODEL_VERSIONS[0],
  },
  {
    name: 'LymeXpert',
    id: '3',
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    status: ModelStatus.ENABLED,
    description: null,
    queueName: crypto.randomUUID(),
    type: MOCK_DIAGNOSTICS[0],
    versions: MOCK_MODEL_VERSIONS,
    currentVersion: MOCK_MODEL_VERSIONS[0],
  },
  {
    name: 'CoviScanNet-2',
    id: '4',
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    status: ModelStatus.ENABLED,
    description: null,
    queueName: crypto.randomUUID(),
    type: MOCK_DIAGNOSTICS[0],
    versions: MOCK_MODEL_VERSIONS,
    currentVersion: MOCK_MODEL_VERSIONS[0],
  },
];

export { MOCK_DIAGNOSTICS, MOCK_MODELS, MOCK_MODEL_VERSIONS };
