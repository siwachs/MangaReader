export const imageFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      resolve(fileReader.result as string);
    };

    fileReader.onerror = reject;
    fileReader.readAsDataURL(file);
  });
};
