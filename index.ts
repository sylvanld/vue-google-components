import Vue from 'vue'
import { VueGoogleComponentsOptions } from './types'

import GooglePlaceAutocomplete from './components/GooglePlaceAutocomplete.vue'
import GoogleMap from './components/GoogleMap.vue'


function injectGoogleSdk(apiKey: string, optionsLibraries: { [library: string]: boolean }, callback: () => void) {
    console.log('optionsLibraries', optionsLibraries)

    const libraries = Object.keys(optionsLibraries || [])
        .filter(library => optionsLibraries[library]);
    console.log('libraries', libraries)

    const sdkUrl = 'https://maps.googleapis.com/maps/api/js'
        + '?key=' + apiKey
        + '&libraries=' + libraries.join(',')

    console.log('sdkUrl', sdkUrl)


    // create element
    const script = document.createElement('script')
    script.src = sdkUrl;
    //script.defer = true;
    script.type = 'text/javascript';
    script.onload = callback;
    document.body.appendChild(script);
}

export default {
    // called by Vue.use(VueGoogleComponents)
    install(vue: typeof Vue, options: VueGoogleComponentsOptions) {
        // register plugin's components
        vue.component('google-place-autocomplete', GooglePlaceAutocomplete);
        vue.component('google-map', GoogleMap);

        // inject google sdk in vue once loaded with appropriate libraries
        // usage in component: this.$google.then(google => {...})
        vue.prototype.$google = new Promise(resolve => {
            injectGoogleSdk(options.apiKey, options.libraries, () => {
                resolve(google);
            });
        })
    }
}