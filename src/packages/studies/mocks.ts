import { StudyStatus } from './enums';
import { Study } from './types';

const IMAGE_SRC =
  'https://prod-images-static.radiopaedia.org/images/1371188/0a1f5edc85aa58d5780928cb39b08659c1fc4d6d7c7dce2f8db1d63c7c737234_big_gallery.jpeg';

const MOCK_STUDIES: Study[] = [
  {
    id: '3465',
    diagnostic: 'Детекція аномалій в легенях',
    status: StudyStatus.COMPLETED,
    imageSrc: IMAGE_SRC,
    date: '23 May 2024',
  },
  {
    id: '3466',
    diagnostic: 'Класифікація COVID-аномалій',
    status: StudyStatus.PENDING,
    imageSrc: IMAGE_SRC,
    date: '24 May 2024',
  },
  {
    id: '3467',
    diagnostic: 'Класифікація аномалій шкіри (хвороба Лайма)',
    status: StudyStatus.COMPLETED,
    imageSrc: IMAGE_SRC,
    date: '25 May 2024',
  },
];

export { MOCK_STUDIES };
