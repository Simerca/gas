<template>
<div class="row row-cols-4">
    <router-link tag="div" :to="'/app/'+data.id" class="col" v-for="(data,i) in apps" :key="i">
        <div class="col-12 pl-1 pr-1">
            <template v-if="data.icon">
                <img class="img-fluid rounded" :src="'http://localhost:1337'+data.icon.url" />
            </template>
            <template v-else>
                <img class="img-fluid rounded" src="https://via.placeholder.com/150" />
            </template>
        </div>
        <div class="col-12 text-center pl-1 pr-1">
            {{ data.name }}
        </div>
    </router-link>
</div>
</template>

<script>
import gql from 'graphql-tag'
export default {
    apollo: {
        apps() {
            return {
                query: gql `
                    {apps(limit:4){
                        id
                        name
                        description
                        icon {
                            url
                        }
                        images {
                            url
                        }
                        packageid
                    }}
             `
            }
        }
    }
}
</script>

<style>

</style>
