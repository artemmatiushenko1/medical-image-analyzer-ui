import dayjs from 'dayjs';
import {
  ModelStatus,
  Diagnostic,
  Model,
  ModelVersion,
  ModelVersionStatus,
  ModelExtended,
} from '@/packages/diagnostics';

const MOCK_DIAGNOSTICS: Diagnostic[] = [
  {
    id: '2',
    name: 'Detection of pneumonia',
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    description:
      'Pneumonia is an inflammatory lung condition primarily affecting the alveoli, typically caused by bacterial, viral, or fungal infections. It is characterized by symptoms such as cough, fever, and difficulty breathing, often confirmed by imaging techniques like chest X-rays showing lung consolidation or infiltrates.',
  },
  {
    id: '3',
    name: 'Diagnosis of COVID-19',
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    description:
      'COVID-19 is a contagious respiratory disease caused by the SARS-CoV-2 virus, leading to symptoms ranging from mild respiratory issues to severe pneumonia. It is characterized by fever, cough, and shortness of breath.',
  },
  {
    id: '4',
    name: 'Diagnosis of melanoma',
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    description:
      'Melanoma is an aggressive form of skin cancer that originates in the melanocytes, the cells responsible for pigment production. It is characterized by the appearance of new or changing moles or skin lesions.',
  },
  {
    id: '5',
    name: 'Diagnosis of Lyme disease',
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    description:
      'Lyme disease is an infectious disease caused by the bacterium Borrelia burgdorferi, transmitted through the bite of infected black-legged ticks. It is characterized by symptoms such as fever, headache, fatigue, and a distinctive “bull’s-eye” rash.',
  },
];

const MOCK_MODEL_VERSIONS: ModelVersion[] = [
  {
    id: crypto.randomUUID(),
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
    version: 4,
    name: 'Increased accuracy up to 99%',
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
    name: 'Enhenced accuracy',
    status: ModelVersionStatus.DISABLED,
  },
  {
    id: crypto.randomUUID(),
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
    version: 1,
    name: 'Initial release',
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
    description: 'Tensorflow Custom model for Melanoma',
    queueName: crypto.randomUUID(),
    type: MOCK_DIAGNOSTICS[2],
    versions: MOCK_MODEL_VERSIONS,
    // currentVersion: MOCK_MODEL_VERSIONS[0],
  },
  {
    name: 'PneumoCheck',
    id: '2',
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    status: ModelStatus.ENABLED,
    description:
      'PneumoCheck is an AI model designed for the automated detection of pneumonia from chest X-ray images. It employs deep learning techniques to analyze radiographic features indicative of pneumonia, aiding radiologists in accurate and efficient diagnosis.',
    queueName: crypto.randomUUID(),
    type: MOCK_DIAGNOSTICS[0],
    versions: MOCK_MODEL_VERSIONS,
    // currentVersion: MOCK_MODEL_VERSIONS[0],
  },
  {
    name: 'LymeXpert',
    id: '3',
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    status: ModelStatus.ENABLED,
    description:
      'LymeXpert is an AI model developed for the detection and diagnosis of Lyme disease. Using advanced machine learning algorithms, LymeXpert analyzes symptoms, medical history, and potentially relevant diagnostic tests to provide healthcare professionals with a comprehensive assessment for Lyme disease. ',
    queueName: crypto.randomUUID(),
    type: MOCK_DIAGNOSTICS[3],
    versions: MOCK_MODEL_VERSIONS,
    // currentVersion: MOCK_MODEL_VERSIONS[0],
  },
  {
    name: 'CoviScanNet-2',
    id: '4',
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    status: ModelStatus.ENABLED,
    description:
      'CoviScanNet-2 is an advanced AI model designed for the detection and classification of COVID-19 from chest X-ray and CT scan images. Building upon the original CoviScanNet, this model incorporates state-of-the-art deep learning techniques to enhance accuracy and speed in COVID-19 diagnosis.',
    queueName: crypto.randomUUID(),
    type: MOCK_DIAGNOSTICS[1],
    versions: MOCK_MODEL_VERSIONS,
    // currentVersion: MOCK_MODEL_VERSIONS[0],
  },
].map((item) => ModelExtended.fromPlainObject(item as Model));

export { MOCK_DIAGNOSTICS, MOCK_MODELS, MOCK_MODEL_VERSIONS };
