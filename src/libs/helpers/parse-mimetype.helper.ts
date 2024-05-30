import { MimeType } from '../enums';
import { ValueOf } from '../types';

const parseMimeType = (mimeType: ValueOf<typeof MimeType>) => {
  const [mediaType, subType] = mimeType.split('/');
  return { mediaType, subType };
};

export { parseMimeType };
