{{#template name="example1Template"}}
```html
<template name="example1Demo">
  <input id="arg1" class="dynamic" value="foo"/>
  <input id="arg2" class="dynamic" value="foo"/>
  <textarea>{{|serverCallWithLatency "arg1" "arg2"}}</textarea>
</template>
```
{{/template}}
