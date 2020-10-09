<template>
  <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner" v-for="(image,i) in images" :key="i">
    <div class="carousel-item" :class="{'active':i==0}">
      <img :src="$api+image.url" class="d-block w-100 carousel-img ">
    </div>
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
    props:['images']
}
</script>

<style scoped>

.carousel-img {
    max-height: 50vh;
    object-fit: cover;
}

</style>