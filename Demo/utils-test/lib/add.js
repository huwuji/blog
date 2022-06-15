(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('decimal.js')) :
  typeof define === 'function' && define.amd ? define(['decimal.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["utils/add"] = factory(global.Decimal));
})(this, (function (Decimal) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Decimal__default = /*#__PURE__*/_interopDefaultLegacy(Decimal);

  var add = (a, b) => {
    return Decimal__default["default"](a).add(b).toNumber();
  };

  return add;

}));
