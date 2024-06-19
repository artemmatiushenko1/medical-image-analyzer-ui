import { Study, StudyStatus } from '@/packages/studies';
import dayjs from 'dayjs';

const MOCK_STUDY_SUMMARIES: Study[] = [
  {
    id: '3465',
    name: 'Детекція пневмнонії',
    description:
      'Дослідження після захворювання. Дослідження після захворювання. Дослідження після захворювання',
    status: StudyStatus.COMPLETED,
    image: {
      src: 'https://prod-images-static.radiopaedia.org/images/1371188/0a1f5edc85aa58d5780928cb39b08659c1fc4d6d7c7dce2f8db1d63c7c737234_big_gallery.jpeg',
    },
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
    confidence: 0.856,
  },
  {
    id: '3467',
    name: 'Діагностування хвороби Лайма',
    image: {
      src: 'https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/05/shutterstock_537518422_header-1024x575.jpg?w=1155&h=1528',
    },
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
    status: StudyStatus.COMPLETED,
    confidence: 0.1,
  },
  {
    id: '3466',
    name: 'Діагностування COVID-19',
    status: StudyStatus.PENDING,
    image: {
      src: 'https://www.princeton.edu/sites/default/files/styles/scale_1440/public/images/2020/05/x-ray-image-2b_full.jpg?itok=2FO93vqG',
    },
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
  },
  {
    id: '3468',
    name: 'Діагностування меланоми',
    status: StudyStatus.COMPLETED,
    image: {
      src: 'https://media.post.rvohealth.io/wp-content/uploads/2024/03/superficial-spreading-melanoma-body1.jpg',
    },
    createdAt: dayjs().toISOString(),
    updatedAt: dayjs().toISOString(),
    confidence: 0.4,
  },
];

export { MOCK_STUDY_SUMMARIES };
