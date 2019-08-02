export const cleanUp = (value: string): string => {
  return value.toString().replace(/\D/g, '');
};

export const clean = (value: string): string => {
  return value
    .toLowerCase()
    .replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a')
    .replace(new RegExp('[ÉÈÊ]', 'gi'), 'e')
    .replace(new RegExp('[ÍÌÎ]', 'gi'), 'i')
    .replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o')
    .replace(new RegExp('[ÚÙÛÜ]', 'gi'), 'u');
};
