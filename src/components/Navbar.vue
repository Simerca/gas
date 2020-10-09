<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 text-center d-md-block d-none">
          <router-link tag="a" class="navbar-brand text-primary" to="/"
            >PWApp.store</router-link
          >
        </div>
        <div class="col-4 d-md-none d-sm-block">
          <router-link tag="a" class="navbar-brand text-primary" to="/"
            >PWApp.store</router-link
          >
        </div>
        <div class="col-md-12 col-8 text-right">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item" v-for="(menu, i) in menus" :key="i">
                <router-link
                  tag="a"
                  :to="menu.path"
                  class="nav-link"
                  aria-current="page"
                  active-class="active"
                  exact
                  >{{ $t(`menu.${menu.name}`) }}</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    menus: [],
  }),
  methods: {
    async loadMenu() {
      const menus = await this.$axios.get(`${this.$api}/menus?_sort=order:asc`);
      this.menus = menus.data;
    },
  },
  async created() {
    await this.loadMenu();
  },
};
</script>

<style>
</style>
