# partial keyframes are not supported in vuetify 3



记一个奇怪的报错: `partial keyframes are not supported`

在最近使用[Vuetify 3](https://next.vuetifyjs.com)开发的时候, 要求针对Chrome 88之前的更早版本进行兼容(甚至不支持Top Level await).

原本一切顺利, 直到在使用 `v-select`组件时, 浏览器出现了这个报错.

追踪溯源之后发现是因为 `VField.mjs ` 这个组件在执行时调用了 `animate`方法导致的.

解决方法也很简单, 需要给每一个 `keyframe` 指定 `opacity` 和 `translate` 的值即可.



贴一下diff

```diff
diff --git a/node_modules/vuetify/lib/components/VField/VField.mjs b/node_modules/vuetify/lib/components/VField/VField.mjs
index 2810ad7..8a7d55a 100644
--- a/node_modules/vuetify/lib/components/VField/VField.mjs
+++ b/node_modules/vuetify/lib/components/VField/VField.mjs
@@ -113,11 +113,15 @@ export const VField = genericComponent()({
         const color = targetStyle.getPropertyValue('color');
         el.style.visibility = 'visible';
         targetEl.style.visibility = 'hidden';
-        animate(el, {
+        animate(el, [{
+          transform: `translate(0px, 0px) scale(1)`,
+          color,
+          ...width
+        },{
           transform: `translate(${x}px, ${y}px) scale(${scale})`,
           color,
           ...width
-        }, {
+        }], {
           duration,
           easing: standardEasing,
           direction: val ? 'normal' : 'reverse'
diff --git a/node_modules/vuetify/lib/components/transitions/dialog-transition.mjs b/node_modules/vuetify/lib/components/transitions/dialog-transition.mjs
index fb29634..e67394c 100644
--- a/node_modules/vuetify/lib/components/transitions/dialog-transition.mjs
+++ b/node_modules/vuetify/lib/components/transitions/dialog-transition.mjs
@@ -31,7 +31,8 @@ export const VDialogTransition = defineComponent({
           transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
           opacity: 0
         }, {
-          transform: ''
+          transform: 'translate(0px, 0px) scale(1, 1)',
+          opacity: 1,
         }], {
           duration: 225 * speed,
           easing: deceleratedEasing
@@ -68,7 +69,8 @@ export const VDialogTransition = defineComponent({
           speed
         } = getDimensions(props.target, el);
         const animation = animate(el, [{
-          transform: ''
+          transform: 'translate(0px, 0px) scale(1, 1)',
+          opacity: 1
         }, {
           transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`,
           opacity: 0
@@ -78,7 +80,9 @@ export const VDialogTransition = defineComponent({
         });
         animation.finished.then(() => done());
         (_getChildren2 = getChildren(el)) == null ? void 0 : _getChildren2.forEach(el => {
-          animate(el, [{}, {
+          animate(el, [{
+            opacity: 1
+          }, {
             opacity: 0,
             offset: 0.2
           }, {
```

