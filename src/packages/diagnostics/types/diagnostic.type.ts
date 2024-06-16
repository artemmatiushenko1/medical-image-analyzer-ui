type Diagnostic = {
  id: string;
  /**
   * @deprecated Preview image is currently not supported.
   */
  previewImg: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export { type Diagnostic };
