<template>
  <div id="carouselExampleControls" class="carousel slide" data-ride="carousel" v-if="apps.length>0">
  <div class="carousel-inner">
    <router-link tag="div" :to="`/app/${app.id}`" class="carousel-item" v-for="(app, i) in apps" :key="i" :class="{'active':i==0}">
      <img v-if="app.images.length>0" :src="$api+app.images[0].url" class="d-block w-100 carousel-img" alt="">
    </router-link>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
</template>

<script>
export default {
  data:()=>({
    apps:[]
  }),
  methods:{
    async getFeaturedApps(){
      const apps = await this.$axios.get(`${this.$api}/apps?featured=true`)
      this.apps = apps.data
    }
  },
  async mounted(){
    await this.getFeaturedApps();
  }
}
</script>

<style scoped>

.carousel-img {
    max-height: 50vh;
    object-fit: cover;
}

</style>