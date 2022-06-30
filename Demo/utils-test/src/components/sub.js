import Decimal from 'decimal.js';

export default (a, b) => {
  return Decimal(a).sub(b).toNumber();
};
