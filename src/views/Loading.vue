<template>
<div class="centered">
    <div class="d-flex justify-content-center">
        <div class="spinner-border text-primary m-5" role="status">
            <span class="sr-only">Loading...</span>
        </div>

    </div>
    <div class="col-10 mx-auto">
        <transition name="fade" mode="out-in">
            <template v-for="(m, i) in msg">
                <div class="col-12 text-center" v-if="currentMsg==i" :key="i">
                    <p>{{ msg[i] }}</p>
                </div>
            </template>
        </transition>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            currentMsg: 0,
            msg: [
                'Chargement en cours....',
                'Vous saviez que ne pas tondre un mouton peut causer sa mort. ...',
                'Larguage des turbos fusée...',
                'Un peu d\'huile de Cloud...',
                'Tout ce qu\'un caneton rencontre 10 minutes après sa naissance devient son parent',
            ]
        }
    },
    methods: {
        currentImgNext() {
            setTimeout(function () {
                if (this.currentMsg < this.msg.length - 1) {
                    this.currentMsg++
                } else {
                    this.currentMsg = 0
                }
                this.currentImgNext();
            }.bind(this), 6000)
        }
    },
    mounted() {
        this.currentImgNext();
    }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
    {
    opacity: 0;
}

.centered {
    position: absolute;
  top: 50%;
  left: 50%;
  width:100%;
  -ms-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
}
</style>
