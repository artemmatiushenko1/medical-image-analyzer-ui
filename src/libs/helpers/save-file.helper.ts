import FileSaver from 'file-saver';

const saveFile = (blob: Blob | string, filename: string) =>
  FileSaver.saveAs(blob, filename);

export { saveFile };
