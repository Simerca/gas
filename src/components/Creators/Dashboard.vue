<template>
  <div class="row mt-2">
    <div class="col-6"><h3>{{ $t('creators.yourApplications') }}</h3></div>
    <div class="col-6 text-right">
      <router-link
        tag="button"
        to="/creators/add"
        class="btn btn-outline-primary btn-sm"
        >{{$t('button.publish')}}</router-link
      >
    </div>
    <div class="col-12 my-2" v-for="(app, i) in apps" :key="i">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-2">
                <img style="width:50%" v-if="app.icon" :src="`${$api}${app.icon.url}`" class="img-fluid img-thumbnail"/>
            </div>
            <div class="col-md-6 px-2"><h4>{{ app.name }}</h4></div>
            <div class="col-md-2">{{ $t("apps.status_" + app.status) }}</div>
            <div class="col-md-2 text-right">
              <router-link
                tag="button"
                :to="`/creators/edit/${app.id}`"
                class="btn btn-outline-primary btn-block btn-sm"
                >{{ $t('button.edit') }}</router-link>
                <button @click="deleteApp(app.id)" class="btn btn-sm btn-outline-danger btn-block">{{ $t('button.delete') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
  },
  data: () => ({
    apps: [],
  }),
  methods: {
    async loadMyApp() {
      const apps = await this.$axios.get(
        `${this.$api}/apps?created_by=${this.user.id}`
      );
      this.apps = apps.data;
    },
    async deleteApp(id){
        await this.$axios.delete(`${this.$api}/apps/${id}`);
        await this.loadMyApp();
    }
  },
  async mounted() {
    await this.loadMyApp();
  },
};
</script>

<style>
</style>