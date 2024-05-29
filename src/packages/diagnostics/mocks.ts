import { Diagnostic } from './types';

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

const MOCK_MODELS = [
  { name: 'CoviScanNet', id: '1', version: 1, enabled: true },
  { name: 'SARS-CoV-2Analyzer', id: '2', version: 2, enabled: true },
  { name: 'CovidVisionAI', id: '3', version: 1, enabled: false },
  { name: 'CoviScanNet-2', id: '4', version: 3, enabled: true },
];

export { MOCK_DIAGNOSTICS, MOCK_MODELS };
