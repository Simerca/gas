<template>
<div class="container-fluid">
    <Navbar />
    <div class="container-fluid mx-0 px-0 mb-2">
        <div class="row col-12">
        <SubMenu />
        </div>
        <div class="row col-12">
            <AppCarousel />
        </div>
    </div>
    <div class="container-fluid">
        <div class="row" v-for="(cat, i) in categories" :key="i">
            <div class="col-12">
                <h4>{{ $t('home.TopOfCatName', {name:$t(`categories.${cat.titre}`)}) }}</h4>
            </div>
            <AppSlider :categorie="cat.id" />
            <div class="col-12 text-right">
                <router-link :to="`/categorie/${cat.titre}`" tag="a" class="text-primary">{{ $t('home.seeAll') }}</router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Home',
    components: {
        Navbar: () => import('../components/Navbar.vue'),
        AppSlider: () => import('../components/AppSlider.vue'),
        AppCarousel: () => import('../components/AppCarousel.vue'),
        SubMenu: () => import('../components/SubMenu.vue'),
    },
    data:()=>({
        categories:[]
    }),
    methods:{
        async loadCat(){
            const categories = await this.$axios.get(`${this.$api}/categories`)
            this.categories = categories.data
        }
    },
    async mounted(){
        await this.loadCat();
    }
}
</script>
