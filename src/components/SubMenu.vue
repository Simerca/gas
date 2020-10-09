<template>
  <div class="row mw-100">
      <div class="col text-center pointer" v-for="(link, i) in links" :key="i">
          <router-link active-class="text-primary" tag="h6" :to="link.to" :class="link.class" exact>{{link.name}}</router-link>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            links:[
                {
                    name:this.$t('menu.home'),
                    to:"/"
                },
                {
                    name:this.$t('categories.games'),
                    to:"/categorie/games"
                },
                {
                    name:this.$t('categories.apps'),
                    to:"/categorie/apps"
                },
            ]
        }
    }
}
</script>

<style scoped>
.mw-100{
    max-width:100%;
    overflow-x: scroll;
}

.pointer{
    cursor:pointer;
}
</style>