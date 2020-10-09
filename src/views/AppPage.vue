<template>
  <div class="app-page">
    <div class="container-fluid mx-0 px-0">
      <div class="col-12">
        <Navbar/>
      </div>
      <div class="col-12" v-if="app.images">
        <SingleAppCarousel v-if="app.images.length>0" :images="app.images" />
      </div>
    </div>
    <div class="container-fluid" v-if="app">
      <div class="row">
        <!-- Titre -->
        <div class="col-12 my-2">
          <img style="width:100px;" :src="$api+app.icon.url" class="img-fluid img-thumbnail"/>
        </div>
        <div class="col-12 my-2">
          <h4>{{ app.name }}</h4>
        </div>
        <!-- Description -->
        <div class="col-12 mh-200 my-2">
          <vue-markdown>
            {{ app.description }}
          </vue-markdown>
        </div>
        <!-- Play button  -->
        <div class="col-12 my-2">
          <a target="_blank" :href="app.url" 
            class="btn btn-primary btn-block text-white font-weight-bold"
          >
            {{ $t('app.go') }}
          </a>
        </div>
        <!-- Information -->
        <div class="col-12 my-2">
          {{ $t("message.editor") }} : <b>{{ app.editeur }}</b
          ><br />
          {{ $t("message.publish_date") }} : <b>{{ moment(app.created_at).format('ddd DD MMM YYYY') }}</b><br />
          {{ $t("message.update_at") }} : <b>{{ moment(app.updated_at).format('ddd DD MMM YYYY') }}</b>
        </div>
        <!-- Review -->
        <div class="col-12"></div>
        <!-- Cross Selling -->
        <div class="col-12">
          <AppSlider />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from 'axios';
import moment from 'moment';
export default {
  name: "AppPage",
  computed: {
    ...mapState(["user"]),
  },
  components: {
    VueMarkdown: () => import("vue-markdown"),
    AppSlider: () => import("../components/AppSlider.vue"),
    SingleAppCarousel: () => import("../components/SingleAppCarousel.vue"),
    Navbar: ()=>import("@/components/Navbar.vue")
  },
  data() {
    return {
      inApp: false,
      moment:moment,
      app: false,
      appId:this.$route.params.id_app,
      userData:null
    };
  },
  methods: {
    async getApp() {
      const app = await axios.get(`${this.$api}/apps/${this.appId}`);
      this.app = app.data;
    },
  },
  mounted() {
    console.log("this user id", this.user.id);
    this.getApp();
  },
};
</script>

<style scoped>
.mh-200 {
  max-height: 200px;
  overflow: scroll;
}
</style>
