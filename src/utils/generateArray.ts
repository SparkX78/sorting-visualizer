

export const generateArray = (size: number = 150): number[] => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
};

