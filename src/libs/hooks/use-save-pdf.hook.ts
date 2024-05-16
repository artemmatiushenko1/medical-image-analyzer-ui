import { pdf } from '@react-pdf/renderer';
import { useState } from 'react';
import { saveFile } from '../helpers';

const useSavePdf = () => {
  const [isLoading, setIsLoading] = useState(false);

  const savePdf = async (document: React.ReactElement, filename: string) => {
    setIsLoading(true);
    const blob = await pdf(document).toBlob();
    saveFile(blob, filename);
    setIsLoading(false);
  };

  return { savePdf, isLoading };
};

export { useSavePdf };
