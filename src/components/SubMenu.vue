<template>
  <div class="row mw-100">
      <div class="col text-center" v-for="(link, i) in links" :key="i">
          <h6 :class="link.class">{{link.name}}</h6>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            links:[
                {
                    name:'Accueil',
                    class:'text-primary'
                },
                {
                    name:'Jeux'
                },
                {
                    name:'Applis'
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
</style>