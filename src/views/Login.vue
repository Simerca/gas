<template>
<div class="container-fluid vh-100 bg-login">
    <div class="row">
        <div class="col-md-12">
            GaS
        </div>
        <div class="col-md-12 my-2">
            <input type="email" class="form-control" v-model="email" />
        </div>
        <div class="col-md-12 my-2">
            <input type="password" class="form-control" v-model="password"/>
        </div>
        <div class="col-md-12 my-2">
            <button class="btn btn-block btn-primary font-weight-bold text-white" @click="login()">Se connecter</button>
        </div>
        <div class="col-md-12 my-2">
            <button class="btn btn-block btn-light font-weight-bold" @click="register=true">S'enregistrer</button>
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
                    this.$router.push('/')
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
