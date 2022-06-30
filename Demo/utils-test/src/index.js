import { max } from 'lodash';
import { add, sub } from './components';

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

export default Utils;
