(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('decimal.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'decimal.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.sub = {}, global.Decimal));
})(this, (function (exports, Decimal) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Decimal__default = /*#__PURE__*/_interopDefaultLegacy(Decimal);

  var sub = (a, b) => {
    return Decimal__default["default"](a).sub(b).toNumber();
  };

  exports["default"] = sub;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
