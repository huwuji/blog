import Decimal from "decimal.js";

export default (a, b) => {
  return Decimal(a).add(b).toNumber();
};
