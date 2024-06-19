import { MimeType } from '../enums';
import { ValueOf } from '../types';

const base64ToFile = (
  base64String: string,
  filenameWithoutExtension: string,
) => {
  // Decode the base64 string
  const byteString = atob(base64String.split(',')[1]);

  // Create an array buffer and a view (Uint8Array)
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  // Fill the Uint8Array with byte values
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  // Determine the MIME type from the base64 string
  const mimeString = base64String
    .split(',')[0]
    .split(':')[1]
    .split(';')[0] as ValueOf<typeof MimeType>;

  // Create a Blob object
  const blob = new Blob([uint8Array], { type: mimeString });

  // MIME type to file extension lookup table
  const mimeToExtension: Record<ValueOf<typeof MimeType>, string> = {
    [MimeType.JPEG]: 'jpg',
    [MimeType.PNG]: 'png',
    [MimeType.HDF5]: 'h5',
    [MimeType.JSON]: 'json',
    [MimeType.MULTIPART]: '',
  };

  // Get the file extension from the MIME type
  const extension = mimeToExtension[mimeString] ?? '';

  // Create the final filename
  const filename = `${filenameWithoutExtension}.${extension}`;

  // Optionally convert Blob to File
  const file = new File([blob], filename, { type: mimeString });

  return file;
};

export { base64ToFile };
