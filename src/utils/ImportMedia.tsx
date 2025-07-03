export const importImage = (imgName: string): string =>
    new URL(`../assets/images/${imgName}`, import.meta.url).href;