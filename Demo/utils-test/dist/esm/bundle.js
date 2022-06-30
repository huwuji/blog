import { max } from 'lodash';
import Decimal from 'decimal.js';

const add = (a, b) => {
  return Decimal(a).add(b).toNumber();
};

const sub = (a, b) => {
  return Decimal(a).sub(b).toNumber();
};

class Utils {
  constructor() {
    console.log('init utils');
  }

  add(a, b) {
    return add(a, b);
  }

  sub(a, b) {
    return sub(a, b);
  }

  max(a, b) {
    return max(a, b);
  }
}

export { Utils as default };
