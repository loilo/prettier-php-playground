<template>
  <header id="unsupported-ie">
    Sorry, we don't support Internet Explorer here — please
    <a
      href="http://outdatedbrowser.com/en"
    >install a modern browser</a>
    to use this site.
    <script>
  document.addEventListener('DOMContentLoaded', function() {
    if (window.navigator.appVersion.indexOf('Trident') !== -1) {
      document.getElementById('unsupported-ie').style.display = 'block'
    }
  })
    </script>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
#unsupported-ie {
  display: none;

  padding: 1.25em 2em;
  background: #ffd88f;
  color: #444;

  a {
    color: #419395;
    text-shadow: 0 1px #ffebc6;
  }
}
</style>
