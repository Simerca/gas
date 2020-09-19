<template>
<div class="home">
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
        <div class="row">
            <div class="col-12">
                <h4>Top des jeux gratuit</h4>
            </div>
            <AppSlider />
            <div class="col-12 text-right">
                <router-link to="/" tag="a" class="text-primary">Tout voir</router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h4>Top des apps gratuit</h4>
            </div>
            <AppSlider />
            <div class="col-12 text-right">
                <router-link to="/" tag="a" class="text-primary">Tout voir</router-link>
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
    }
}
</script>
