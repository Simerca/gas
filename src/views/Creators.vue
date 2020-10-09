<template>
  <div class="container-fluid">
    <Navbar />
    <div class="wrapper">
      <div class="container">
        <div class="row">
          <div class="col-md-3">
            <Sidebar />
          </div>
          <div class="col-md-8 mx-auto">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Sidebar: () => import("@/components/Creators/Sidebar.vue"),
    Navbar: () => import("@/components/Navbar"),
  },
};
</script>

<style>
</style>