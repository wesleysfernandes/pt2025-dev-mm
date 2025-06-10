export const applyCardMask = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  let formatted = '';
  
  for (let i = 0; i < cleaned.length && i < 16; i++) {
    if (i > 0 && i % 4 === 0) formatted += ' ';
    formatted += cleaned[i];
  }
  
  return formatted;
};

export const applyCPFMask = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  let formatted = '';
  
  if (cleaned.length > 0) formatted += cleaned.substring(0, 3);
  if (cleaned.length > 3) formatted += '.' + cleaned.substring(3, 6);
  if (cleaned.length > 6) formatted += '.' + cleaned.substring(6, 9);
  if (cleaned.length > 9) formatted += '-' + cleaned.substring(9, 11);
  
  return formatted;
};

export const applyExpiryMask = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  
  if (cleaned.length > 4) {
    return cleaned.substring(0, 4);
  }
  
  if (cleaned.length > 2) {
    return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
  }
  
  return cleaned;
};

export const applyBirthDateMask = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  
  if (cleaned.length > 8) {
    return cleaned.substring(0, 8);
  }

  let formatted = '';
  
  if (cleaned.length > 0) {
    formatted = cleaned.substring(0, 2);
  }
  
  if (cleaned.length > 2) {
    formatted += '/' + cleaned.substring(2, 4);
  }
  
  if (cleaned.length > 4) {
    formatted += '/' + cleaned.substring(4, 8);
  }
  
  return formatted;
};