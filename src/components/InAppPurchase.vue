<template>
<!-- Modal -->
<div>
    <div class="modal modal-open fade show" style="display:block;" v-if="isShow" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" @click="close()" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- Prices -->
                    <div class="row my-2" v-for="(offer,i) in offers" :key="i">
                        <div class="col-6">
                            <h1 class="text-primary m-0 p-0 font-weight-bold">{{offer.amount}}€</h1> / {{ $t('message.'+offer.period) }}
                        </div>
                        <div class="col-6">
                            <button @click="subscribe(offer.id)" class="btn btn-primary btn-block text-white font-weight-bold">Je m'abonne</button>
                        </div>
                        <div class="col-12 my-2">
                            {{ offer.description }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="isShow" class="modal-backdrop fade show"></div>
</div>
</template>

<script>
/* eslint-disable */
import iap from 'in-app-purchase';
import gql from 'graphql-tag'
export default {
    props: ['isShow'],
    apollo: {
        offers() {
            return {
                query: gql `
                    {
                    offers{
                        id
                        name
                        amount
                        description
                        period
                    }
                }
                `
            }
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        subscribe(id) {
            this.$apollo.mutate({
                mutation: gql `
                mutation{createOrder(input:{data:{offer:"${id}", state:accepted}}){order{id}}}
                `,
            }).then(res=>{
                console.log('you win')
                console.log(res);
                this.$router.push('/loading')
            })
        },
        initIap() {
            iap.config({

                /* Configurations for HTTP request */
                requestDefaults: {
                    /* Please refer to the request module documentation here: https://www.npmjs.com/package/request#requestoptions-callback */
                },

                /* Configurations for Google Service Account validation: You can validate with just packageName, productId, and purchaseToken */
                googleServiceAccount: {
                    clientEmail: '<client email from Google API service account JSON key file>',
                    privateKey: '<private key string from Google API service account JSON key file>'
                },

                /* Configurations for Google Play */
                googlePublicKeyPath: 'path/to/public/key/directory/', // this is the path to the directory containing iap-sanbox/iap-live files
                googlePublicKeyStrSandBox: 'publicKeySandboxString', // this is the google iap-sandbox public key string
                googlePublicKeyStrLive: 'publicKeyLiveString', // this is the google iap-live public key string
                googleAccToken: 'abcdef...', // optional, for Google Play subscriptions
                googleRefToken: 'dddd...', // optional, for Google Play subscritions
                googleClientID: 'aaaa', // optional, for Google Play subscriptions
                googleClientSecret: 'bbbb', // optional, for Google Play subscriptions

                /* Configurations all platforms */
                test: true, // For Apple and Googl Play to force Sandbox validation only
                verbose: true // Output debug logs to stdout stream
            });
            iap.setup()
                .then(() => {
                    // iap.validate(...) automatically detects what type of receipt you are trying to validate
                    iap.validate(receipt).then(onSuccess).catch(onError);
                })
                .catch((error) => {
                    // error...
                });

        },
        onSuccess(validatedData) {
            // validatedData: the actual content of the validated receipt
            // validatedData also contains the original receipt
            var options = {
                ignoreCanceled: true, // Apple ONLY (for now...): purchaseData will NOT contain cancceled items
                ignoreExpired: true // purchaseData will NOT contain exipired subscription items
            };
            // validatedData contains sandbox: true/false for Apple and Amazon
            var purchaseData = iap.getPurchaseData(validatedData, options);
        },
        onError(error) {
            // failed to validate the receipt...
        }
    }

}
</script>

<style>

</style>
