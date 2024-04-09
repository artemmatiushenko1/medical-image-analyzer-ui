const readFileAsBase64 = (file: File): Promise<string | null> => {
  return new Promise((res) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) =>
      res(e.target?.result as string);
    reader.onerror = () => res(null);
    reader.readAsDataURL(file);
  });
};

export { readFileAsBase64 };
