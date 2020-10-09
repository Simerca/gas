<template>
  <div class="row row-cols-3">
      <template v-if="apps.length>0">
      <router-link :to="`/app/${app.id}`" tag="div" class="col" v-for="(app,i) in apps" :key="i">
          <div class="card shadow-sm">
              <img :src="$api+app.icon.url" class="img-fluid"/>
                  <div class="card-body">
                  <h5 class="card-title">{{app.name}}</h5>

                  </div>
          </div>
      </router-link>
      </template>
      <template v-else>
          <NoApp />
      </template>
  </div>
</template>

<script>
export default {
    components:{
        NoApp:()=>import('@/components/NoApp.vue')
    },
    data:()=>({
        apps:[]
    }),
    methods:{
        async getApps(categorie){
            const apps = await this.$axios.get(`${this.$api}/apps?categorie.titre=${categorie}`)
            this.apps = apps.data;
        }
    },
    async mounted(){
        await this.getApps(this.$route.params.categorie);
    },
    watch:{
        $route(){
            this.getApps();
        }
    }
}
</script>

<style>

</style>