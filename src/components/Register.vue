<template>
<!-- Modal -->
<div>
    <div class="modal modal-open fade show" style="display:block;" v-if="isShow" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ $t('form.signin') }}</h5>
                    <button type="button" class="close" data-dismiss="modal" @click="close()" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="form-group my-2">
                            <label>{{ $t('form.email') }}</label>
                            <input class="form-control" v-model="email" />
                        </div>
                        <div class="form-group my-2">
                            <label>{{ $t('form.password') }}</label>
                            <input class="form-control" type="password" v-model="password" />
                        </div>
                        <div class="form-group my-2">
                            <label>{{ $t('form.passwordConfirm') }}</label>
                            <input class="form-control" v-model="passwordConfirm" />
                        </div>
                        <div class="form-group my-2">
                            <label>
                                <input type="checkbox" v-model="agree">{{ $t('form.agreeRgpd') }}
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="register()">{{ $t('form.signInButton') }}</button>
                </div>
            </div>
        </div>
    </div>
    <div  v-if="isShow" class="modal-backdrop fade show"></div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['isShow'],
    data() {
        return {
            email: null,
            password: null,
            passwordConfirm: null,
            agree:false
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        register() {
            console.log(this.agree)
            if (this.password == this.passwordConfirm && this.agree && this.email.includes('@')) {
                axios
                    .post(`${this.$api}/auth/local/register`, {
                        username: this.email,
                        email: this.email,
                        password: this.password,
                    })
                    .then(response => {
                        // Handle success.
                        console.log('Well done!');
                        console.log('User profile', response.data.user);
                        console.log('User token', response.data.jwt);
                        this.$toasted.show(this.$t('form.successSignin'),{
                            type:'success',
                            duration:2000
                        })
                        this.$store.dispatch('setToken', response.data.jwt);
                        this.$store.dispatch('setUserData', response.data.user);
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
            }else{
                this.$toasted.show(this.$t('form.errorSignin'),{
                            type:'error',
                            duration:2000
                        })
            }
        }
    }
}
</script>

<style>

</style>
