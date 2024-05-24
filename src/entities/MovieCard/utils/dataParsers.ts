const thousandsDivider = 1000;
const millionsDivider = thousandsDivider * thousandsDivider;

export const currencyParses = (currency?: number) => {
  if(!currency) {
    return;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(currency);
};

export const dateParser = (date?: string) => {
  if(!date) {
    return;
  }
  return new Date(date).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export const durationParser = (duration?: number) => {
  if(!duration) {
    return;
  }

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return (hours ? `${hours}h` : '') + ' ' + (minutes ? `${minutes}m` : '');
};

export const voteParser = (voteCount: number) => {
  const millions= (voteCount / millionsDivider);
  const thousands = (voteCount / thousandsDivider);

  if(millions >= 1) {
    return `(${millions.toFixed(1)}M)`;
  }

  if(thousands >= 1) {
    return `(${thousands.toFixed(1)}K)`;
  }

  return `(${voteCount || 0})`;
};
