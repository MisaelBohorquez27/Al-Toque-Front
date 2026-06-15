export const getResponsiveColumns = (width: number): number => {
  if (width < 640) return 1; // mobile
  if (width < 768) return 2; // mobile-md
  if (width < 1024) return 2; // tablet
  if (width < 1280) return 3; // desktop-sm
  return 4; // desktop-lg
};

export const getResponsiveAspectRatio = (width: number): string => {
  return width < 768 ? 'aspect-[4/3]' : 'aspect-[3/2]';
};

export const getSpacing = (width: number, multiplier: number = 1): string => {
  const baseSpacing = width < 768 ? '4' : '6';
  return `${parseInt(baseSpacing) * multiplier}`;
};