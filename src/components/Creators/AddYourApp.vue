<template>
  <div class="row">
    <div class="col-12">
      <label>{{ $t("label.yourAppName") }} *</label>
      <input class="form-control" v-model="form.name" />
    </div>
    <div class="col-12">
      <label>{{ $t("label.yourAppCategorie") }} *</label>
      <select class="form-control" v-model="form.categorie.id">
        <option v-for="(cat, i) in categories" :key="i" :value="cat.id">
          {{ $t('categories.'+cat.titre) }}
        </option>
      </select>
    </div>
    <div class="col-12">
      <label>{{ $t("label.yourAppUrl") }}</label>
      <input class="form-control" v-model="form.url" />
    </div>
    <div class="col-12">
      <label>{{ $t("label.yourAppLogo") }}</label>
      <div class="input-group mb-3">
        <div class="form-file">
          <input
            type="file"
            class="form-file-input"
            id="inputGroupFile01"
            @change="upload($event, 'icon')"
            aria-describedby="inputGroupFileAddon01"
          />
          <input type="hidden" v-if="form.icon" v-model="form.icon.id" />
          <label class="form-file-label" for="inputGroupFile01">
            <span class="form-file-text">{{ $t("label.chooseFile") }}</span>
            <span class="form-file-button text-white">{{
              $t("message.upload")
            }}</span>
          </label>
        </div>
      </div>
    </div>

    <div class="col-12">
      <img
        v-if="form.icon.url"
        :src="$api + form.icon.url"
        class="img-fluid img-thumbnail"
      />
    </div>

    <div class="col-12">
      <label>{{ $t("label.yourAppDescription") }}</label>
      <vue-pell-editor
        v-model="form.description"
        :actions="editorOptions"
        :placeholder="editorPlaceholder"
        :style-with-css="false"
        :classes="editorClasses"
        default-paragraph-separator="p"
      />
    </div>

    <div class="col-12">
      <label>{{ $t("label.yourAppImages") }}</label>
      <div class="input-group mb-3">
        <div class="form-file">
          <input
            type="file"
            class="form-file-input"
            id="inputGroupFile02"
            @change="upload($event, 'image')"
            aria-describedby="inputGroupFileAddon01"
          />
          <label class="form-file-label" for="inputGroupFile02">
            <span class="form-file-text">{{ $t("label.chooseFile") }}</span>
            <span class="form-file-button text-white">{{
              $t("message.upload")
            }}</span>
          </label>
        </div>
      </div>
    </div>

    <div class="col-12">
      <div class="row row-cols-2">
        <div class="col" v-for="(img, i) in form.images" :key="i">
          <img :src="$api + img.url" class="img-thumbnail img-fluid" />
          <input type="hidden" v-model="form.images[i].url" />
        </div>
      </div>
    </div>

    <div class="col-12">
      <label>{{ $t("label.yourAppEditor") }}</label>
      <input class="form-control" v-model="form.editeur" />
    </div>
    <div class="col-12 my-2">
      <button
        @click="submitApp('draft')"
        class="btn btn-sm btn-block btn-outline-secondary"
      >
        {{ $t("button.submit_draft") }}
      </button>
    </div>
    <div class="col-12 my-2">
      <button
        @click="submitApp()"
        class="btn btn-sm btn-block btn-outline-primary"
      >
        <template v-if="edit">
          {{ $t("button.submit_for_update") }}
        </template>
        <template v-else>
          {{ $t("button.submit_for_check") }}
        </template>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["token"]),
  },
  data: () => ({
    edit: false,
    categories: [],
    form: {
      name: null,
      url: null,
      categorie: {
        id: null,
      },
      icon: {
        id: null,
        url: null,
      },
      images: [],
      description: null,
      editeur: null,
      status: "pending",
    },
    editorOptions: [
      "bold",
      "underline",
      {
        name: "italic",
        result: () => window.pell.exec("italic"),
      },
    ],
    editorPlaceholder: "Write something amazing...",
    editorContent: "<div>Predefined Content</div>",
    editorClasses: {
      actionbar: "pell-actionbar",
      button: "pell-button",
      content: "pell-content",
      selected: "pell-button-selected",
    },
  }),
  methods: {
    async submitApp(status = "pending") {
      if (!this.form.categorie.id || !this.form.name) {
        this.$toasted.show(this.$t('error.fieldsForgot'), {
          type:'error',
          duration:5000,
        })
      } else {
        this.form.created_by = this.user.id;
        this.form.status = status;
        let app = null;
        if (this.edit) {
          app = await this.$axios.put(
            `${this.$api}/apps/${this.$route.params.id_app}`,
            this.form
          );
        } else {
          app = await this.$axios.post(`${this.$api}/apps`, this.form);
        }
        this.$toasted.show(this.$t('success.submitSuccess'), {
          type:'success',
          duration:5000,
        })
        this.$router.push(`/creators/edit/${app.data.id}`);
      }
    },
    async loadApp(id) {
      const app = await this.$axios.get(`${this.$api}/apps/${id}`);
      this.form = app.data;
      console.log("form", this.form);
    },
    async loadCategories() {
      const categories = await this.$axios.get(`${this.$api}/categories`);
      this.categories = categories.data;
    },
    async upload(event, type) {
      console.log("event", event);
      let file = event.target.files[0];
      let formData = new FormData();
      formData.append("files", file);
      console.log("file", file);
      console.log("formData", formData);
      const upload = await this.$axios.post(`${this.$api}/upload`, formData);
      console.log("upload", upload);
      upload.data.forEach((element) => {
        if (type == "icon") {
          this.form.icon = element;
        } else if (type == "image") {
          this.form.images.push(element);
        }
      });
    },
  },
  async mounted() {
    await this.loadCategories();
    if (this.$route.params.id_app) {
      this.edit = true;
      this.loadApp(this.$route.params.id_app);
    }
  },
  watch: {
    $route() {
      if (this.$route.params.id_app) {
        this.edit = true;
        this.loadApp(this.$route.params.id_app);
      }
    },
  },
};
</script>

<style>
</style>