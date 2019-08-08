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

export const maskFormat = (value: any, maskDefault: string): string => {
  let valueCleaned = cleanUp(value);

  const pad = cleanUp(maskDefault).replace(/9/g, '_');
  const valueMask = valueCleaned + pad.substring(0, pad.length - valueCleaned.length);

  let valuePos = 0;

  valueCleaned = '';

  for (let i = 0; i < maskDefault.length; i++) {
    valueCleaned += isNaN(parseInt(maskDefault.charAt(i), 10)) ? maskDefault.charAt(i) : valueMask[valuePos++];
  }

  if (valueCleaned.indexOf('_') > -1) {
    valueCleaned = valueCleaned.substr(0, valueCleaned.indexOf('_'));
  }

  value = valueCleaned;

  return value;

};