<template>
<div class="app-page">
    <div class="container-fluid mx-0 px-0">
        <div class="col-12" v-if="app">
            <SingleAppCarousel :images="app.images" />
        </div>
    </div>
    <div class="container-fluid" v-if="app">
        <div class="row">
            <!-- Titre -->
            <div class="col-12 my-2">
                <h4>{{app.name}}</h4>
            </div>
            <!-- Description -->
            <div class="col-12 mh-200 my-2">
                <vue-markdown>
                    {{app.description}}
                </vue-markdown>
            </div>
            <!-- Play button  -->
            <div class="col-12 my-2">
                <button class="btn btn-primary btn-block text-white font-weight-bold" @click="play()">Jouer maintenant</button>
            </div>
            <!-- Information -->
            <div class="col-12 my-2">
                {{ $t('message.editor') }} : <b>{{ app.editeur }}</b><br>
                {{ $t('message.publish_date') }} : <b>{{ app.publish_date }}</b>
            </div>
            <!-- Review -->
            <div class="col-12">

            </div>
            <!-- Cross Selling -->
            <div class="col-12">
                <AppSlider />
            </div>
        </div>
    </div>
    <InAppPurchase @close="inApp=false" :isShow="inApp" />
</div>
</template>

<script>
import gql from 'graphql-tag'
import {
    mapState
} from 'vuex';
export default {
    name: 'AppPage',
    computed: {
        ...mapState(['user'])
    },
    components: {
        VueMarkdown: () => import('vue-markdown'),
        InAppPurchase: () => import('../components/InAppPurchase.vue'),
        AppSlider: () => import('../components/AppSlider.vue'),
        SingleAppCarousel: () => import('../components/SingleAppCarousel.vue')
    },
    data() {
        return {
            inApp: false
        }
    },
    methods: {
        play() {
            this.$apollo.queries.userData.refetch();

            if (!this.userData.current_offer) {
                this.inApp = true;
            }

        }
    },
    apollo: {
        app() {
            return {
                query: gql `               
                {
                    app(id:${this.$route.params.id}){
                        name
                        description
                        editeur
                        publish_date
                        icon { url }
                        images { url }
                    }
                }
                `,
            }
        },
        userData() {
            return {
                query: gql `
                {
                        userData:user(id:${this.user.id}){
                            current_offer {
                                name
                            }
                        }
                    }
                `
            }
        }

    }
}
</script>

<style scoped>
.mh-200 {
    max-height: 200px;
    overflow: scroll;
}
</style>
