<template>
<div class="row row-cols-4">
    <template v-if="apps.length>0">
    <router-link tag="div" :to="`/app/${data.id}`" class="col" v-for="(data,i) in apps" :key="i">
        <div class="col-12 pl-1 pr-1 text-center">
            <template v-if="data.icon">
                <img class="img-fluid rounded" :src="$api+data.icon.url" />
            </template>
            <template v-else>
                <img class="img-fluid rounded" src="https://via.placeholder.com/150" />
            </template>
        </div>
        <div class="col-12 text-center pl-1 pr-1">
            {{ data.name }}
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
    props:['categorie'],
    components:{
        NoApp:()=>import('@/components/NoApp.vue')
    },
    data:()=>({
        apps:[]
    }),
    methods:{
        async loadApps(){
            const apps = await this.$axios.get(`${this.$api}/apps?categorie.id=${this.categorie}&_limit=4&_sort=id:desc`)
            this.apps = apps.data
        }
    },
    async mounted(){
        await this.loadApps();
    }
}
</script>

<style>

</style>
