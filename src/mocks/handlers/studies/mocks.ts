import { Study, StudyStatus } from '@/packages/studies';
import dayjs from 'dayjs';
import { MOCK_DIAGNOSTICS, MOCK_MODELS } from '../diagnostics/mocks';

const MOCK_STUDY_SUMMARIES: Study[] = [
  {
    id: '3465',
    name: 'Detection of pneumonia',
    description: 'Image was taken after the hard disease.',
    status: StudyStatus.COMPLETED,
    image: {
      src: 'https://prod-images-static.radiopaedia.org/images/1371188/0a1f5edc85aa58d5780928cb39b08659c1fc4d6d7c7dce2f8db1d63c7c737234_big_gallery.jpeg',
    },
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
    confidence: 0.1,
    type: MOCK_DIAGNOSTICS[0],
    model: MOCK_MODELS[1],
  },
  {
    id: '3467',
    name: 'Diagnosis of Lyme disease',
    description:
      'Probably the bite was received during the morning walk on Sunday.',
    image: {
      src: 'https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/05/shutterstock_537518422_header-1024x575.jpg?w=1155&h=1528',
    },
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
    status: StudyStatus.COMPLETED,
    confidence: 0.856,
    type: MOCK_DIAGNOSTICS[3],
    model: MOCK_MODELS[2],
  },
  {
    id: '3466',
    name: 'Diagnosis of COVID-19',
    status: StudyStatus.PENDING,
    image: {
      src: 'https://www.princeton.edu/sites/default/files/styles/scale_1440/public/images/2020/05/x-ray-image-2b_full.jpg?itok=2FO93vqG',
    },
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
    type: MOCK_DIAGNOSTICS[1],
    model: MOCK_MODELS[3],
  },
  {
    id: '3468',
    name: 'Diagnosis of melanoma',
    status: StudyStatus.COMPLETED,
    image: {
      src: 'https://media.post.rvohealth.io/wp-content/uploads/2024/03/superficial-spreading-melanoma-body1.jpg',
    },
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
    confidence: 0.4,
    type: MOCK_DIAGNOSTICS[2],
    model: MOCK_MODELS[0],
  },
];

export { MOCK_STUDY_SUMMARIES };
