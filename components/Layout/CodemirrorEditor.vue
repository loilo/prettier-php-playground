<template>
  <section>
    <no-ssr placeholder="Codemirror Loading...">
      <codemirror v-bind="$attrs" v-on="$listeners"/>
    </no-ssr>
  </section>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
