import heic2any from 'heic2any';

export function getFileType(file: File): string {
  return 'jpeg';
}

export const convertHEICUrlToBlob = async (url: string) => {
  try {
    const response = await fetch(url);
    const HEICBlob = await response.blob();

    const convertedBlob = await heic2any({
      blob: HEICBlob,
      toType: 'image/jpeg', // 你也可以选择 'image/png' 等其他格式
      quality: 0.35,
    });

    return URL.createObjectURL(convertedBlob);
  } catch (error) {
    console.error('Error converting HEIC file:', error);
  }
};
