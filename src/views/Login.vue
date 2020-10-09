<template>
<div class="container-fluid vh-100 bg-login p-5">
    <div class="row">
        <div class="col-md-12 text-primary text-center">
            <h3>PWApp.store</h3>
        </div>
        <div class="col-md-12 my-2">
            <input type="email" class="form-control" v-model="email" :placeholder="$t('form.emailPlaceholder')"/>
        </div>
        <div class="col-md-12 my-2">
            <input type="password" class="form-control" v-model="password" :placeholder="$t('form.passwordPlaceholder')"/>
        </div>
        <div class="col-md-12 my-2">
            <button class="btn btn-block btn-primary font-weight-bold text-white" @click="login()">{{ $t('form.login') }}</button>
        </div>
        <div class="col-md-12 my-2">
            <button class="btn btn-block btn-light font-weight-bold" @click="register=true">{{ $t('form.signin') }}</button>
        </div>
    </div>
    <Register @close="register=false" :isShow="register"/>
</div>
</template>

<script>
import axios from 'axios';

export default {
    components:{
        Register: ()=>import('../components/Register.vue')
    },
    data(){
        return {
            email:null,
            password:null,
            register:false,
        }
    },
    methods: {
        login() {
            // Request API.
            axios
                .post('http://localhost:1337/auth/local', {
                    identifier: this.email,
                    password: this.password,
                })
                .then(response => {
                    // Handle success.
                    console.log('Well done!');
                    console.log('User profile', response.data.user);
                    console.log('User token', response.data.jwt);
                    this.$store.dispatch('setToken', response.data.jwt);
                    this.$store.dispatch('setUserData', response.data.user);
                    this.$toasted.show('Connexion réussi...',{
                            type:'success',
                            duration:2000
                    })
                    if(this.$route.query.redirect){
                        this.$router.push(this.$route.query.redirect)
                    }else{
                        this.$router.push('/')
                    }
                })
                .catch(error => {
                    // Handle error.
                    console.log('An error occurred:', error.response);
                    this.$toasted.show(error.message,{
                        type:'error',
                            duration:2000
                    })
                });
        }
    },
    mounted(){
        console.log('route is',this.$route);
    }
}
</script>

<style scopped>
.bg-login {
    background-image: url('/img/background.png');
    background-size: cover;
}
.vh-100{
    height:100vh;
}
</style>
