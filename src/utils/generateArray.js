export const generateArray = (size = 150) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
};
