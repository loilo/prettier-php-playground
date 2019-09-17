<template>
  <section>
    <client-only placeholder="Codemirror Loading...">
      <codemirror v-bind="$attrs" v-on="$listeners" />
    </client-only>
  </section>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
