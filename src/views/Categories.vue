<template>
<div class="container-fluid">
    <Navbar />
    <div class="container-fluid mx-0 px-0 mb-2">
        <div class="row col-12">
        <SubMenu />
        </div>
    </div>
    <div class="container-fluid">
        <router-view />
    </div>
</div>
</template>

<script>
export default {
    name: 'Categories',
    components: {
        Navbar: () => import('../components/Navbar.vue'),
        SubMenu: () => import('../components/SubMenu.vue'),
    },
}
</script>
