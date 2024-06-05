import dayjs from 'dayjs';
import { StudyStatus } from './enums';
import { Study } from './types';
import { MOCK_DIAGNOSTICS, MOCK_MODELS } from '../diagnostics/mocks';

const MOCK_STUDIES: Study[] = [
  {
    id: '3465',
    diagnostic: MOCK_DIAGNOSTICS[1],
    model: MOCK_MODELS[0],
    status: StudyStatus.COMPLETED,
    imageSrc:
      'https://www.shutterstock.com/shutterstock/photos/114216295/display_1500/stock-photo-x-ray-114216295.jpg',
    date: dayjs().toISOString(),
    confidence: 0.856,
  },
  {
    id: '3466',
    diagnostic: MOCK_DIAGNOSTICS[2],
    model: MOCK_MODELS[1],
    status: StudyStatus.PENDING,
    imageSrc:
      'https://www.princeton.edu/sites/default/files/styles/scale_1440/public/images/2020/05/x-ray-image-2b_full.jpg?itok=2FO93vqG',
    date: dayjs().toISOString(),
  },
  {
    id: '3467',
    diagnostic: MOCK_DIAGNOSTICS[4],
    model: MOCK_MODELS[0],
    imageSrc:
      'https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/05/shutterstock_537518422_header-1024x575.jpg?w=1155&h=1528',
    date: dayjs().toISOString(),
    status: StudyStatus.COMPLETED,
    confidence: 0.1,
  },
  {
    id: '3468',
    diagnostic: MOCK_DIAGNOSTICS[5],
    model: MOCK_MODELS[0],
    status: StudyStatus.COMPLETED,
    imageSrc:
      'https://media.post.rvohealth.io/wp-content/uploads/2024/03/superficial-spreading-melanoma-body1.jpg',
    date: dayjs().toISOString(),
    confidence: 0.4,
  },
];

export { MOCK_STUDIES };
