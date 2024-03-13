import {
  SvgIcon_default,
  init_SvgIcon
} from "./chunk-MBMARUC4.js";
import {
  require_jsx_runtime
} from "./chunk-77UYNY4E.js";
import {
  _extends,
  init_extends
} from "./chunk-JUZ4T53K.js";
import {
  require_react
} from "./chunk-5TQB74YF.js";
import {
  __esm,
  __toESM
} from "./chunk-TIUEEL27.js";

// node_modules/@mui/material/utils/createSvgIcon.js
function createSvgIcon(path, displayName) {
  function Component(props, ref) {
    return (0, import_jsx_runtime.jsx)(SvgIcon_default, _extends({
      "data-testid": `${displayName}Icon`,
      ref
    }, props, {
      children: path
    }));
  }
  if (true) {
    Component.displayName = `${displayName}Icon`;
  }
  Component.muiName = SvgIcon_default.muiName;
  return React.memo(React.forwardRef(Component));
}
var React, import_jsx_runtime;
var init_createSvgIcon = __esm({
  "node_modules/@mui/material/utils/createSvgIcon.js"() {
    "use client";
    init_extends();
    React = __toESM(require_react());
    init_SvgIcon();
    import_jsx_runtime = __toESM(require_jsx_runtime());
  }
});

export {
  createSvgIcon,
  init_createSvgIcon
};
//# sourceMappingURL=chunk-U3KOIFJE.js.map
