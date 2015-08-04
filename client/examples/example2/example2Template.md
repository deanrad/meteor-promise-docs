{{#template name="example2Template"}}
```html
<template name="example2Demo">
  <input id="arg1" class="dynamic" value="foo"/>
  <input id="arg2" class="dynamic" value="foo"/>
  <textarea>{{|chainedServerCall "arg1" "arg2"}}</textarea>
</template>
```
{{/template}}
