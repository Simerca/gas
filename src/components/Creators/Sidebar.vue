<template>
  <ul class="list-group list-group-flush">
    <router-link tag="li" to="/creators" class="list-group-item pointer">{{ $t('creators.yourApplications') }}</router-link>
    <li class="list-group-item pointer" @click="logout()">{{ $t('creators.logout') }}</li>
  </ul>
</template>

<script>
export default {
    methods:{
        logout(){
            localStorage.clear();
            this.$router.push('/');
        }
    }
};
</script>

<style scoped>
.pointer{
    cursor:pointer;
}
</style>