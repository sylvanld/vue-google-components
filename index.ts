import Vue from 'vue'
import GooglePlaceAutocomplete from './components/GooglePlaceAutocomplete.vue'

export default {
    // called by Vue.use(FirstPlugin)
    install(vue: typeof Vue) {
        vue.component('google-place-autocomplete', GooglePlaceAutocomplete);

        // create a mixin 
        vue.mixin({

            created() {
                console.log('vue mixin created');
            }
        });
    }
}