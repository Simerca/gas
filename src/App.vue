<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import 'bootstrap';
export default {
  mounted(){
    this.$store.dispatch('getUser');
  }
}
</script>
<style lang="scss">
$theme-colors: (
  "primary":    #FF6A87,
);
@import "~bootswatch/dist/darkly/variables";
@import 'bootstrap/scss/bootstrap';
@import "~bootswatch/dist/darkly/bootswatch";
body {
  font-family: 'Montserrat', sans-serif;
}

.row {
  --bs-gutter-x: inherit;
}
</style>
