import {
  script
} from "./chunk-IVPXFQ63.js";
import {
  BaseStyle
} from "./chunk-R5DHDY7V.js";
import "./chunk-5KY5SIIS.js";
import {
  createElementBlock,
  mergeProps,
  openBlock,
  renderSlot
} from "./chunk-GI7C4HJS.js";
import "./chunk-AMBSP7Z4.js";

// node_modules/.pnpm/primevue@4.0.2_vue@3.4.31_typescript@5.5.3_/node_modules/primevue/inputgroupaddon/style/index.mjs
var classes = {
  root: "p-inputgroupaddon"
};
var InputGroupAddonStyle = BaseStyle.extend({
  name: "inputgroupaddon",
  classes
});

// node_modules/.pnpm/primevue@4.0.2_vue@3.4.31_typescript@5.5.3_/node_modules/primevue/inputgroupaddon/index.mjs
var script$1 = {
  name: "BaseInputGroupAddon",
  "extends": script,
  style: InputGroupAddonStyle,
  provide: function provide() {
    return {
      $pcInputGroupAddon: this,
      $parentInstance: this
    };
  }
};
var script2 = {
  name: "InputGroupAddon",
  "extends": script$1,
  inheritAttrs: false
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptmi("root")), [renderSlot(_ctx.$slots, "default")], 16);
}
script2.render = render;
export {
  script2 as default
};
//# sourceMappingURL=primevue_inputgroupaddon.js.map
