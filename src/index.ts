import { VueGoogleComponentsOptions } from './types'

import GooglePlaceAutocomplete from './components/GooglePlaceAutocomplete.vue'
import GoogleMap from './components/GoogleMap.vue'
import { VueConstructor } from 'vue/types/umd'
import GoogleMapsService from './services/google-maps'


function injectGoogleSdk(apiKey: string, optionsLibraries: { [library: string]: boolean }): Promise<boolean> {
    console.log('optionsLibraries', optionsLibraries)

    const libraries = Object.keys(optionsLibraries || [])
        .filter(library => optionsLibraries[library]);
    console.log('libraries', libraries)

    const sdkUrl = 'https://maps.googleapis.com/maps/api/js'
        + '?key=' + apiKey
        + '&libraries=' + libraries.join(',')

    console.log('sdkUrl', sdkUrl)


    return new Promise(resolve => {
        // create element
        const script = document.createElement('script')
        script.src = sdkUrl;
        //script.defer = true;
        script.type = 'text/javascript';
        script.onload = () => resolve(true);
        document.body.appendChild(script);
    })
}

export default {
    // called by Vue.use(VueGoogleComponents)
    install(vue: VueConstructor, options: VueGoogleComponentsOptions) {
        // register plugin's components
        vue.component('google-place-autocomplete', GooglePlaceAutocomplete);
        vue.component('google-map', GoogleMap);

        // inject google sdk in vue once loaded with appropriate libraries
        // usage in component: this.$google.then(google => {...})

        const promise = injectGoogleSdk(options.apiKey, options.libraries)
        GoogleMapsService.setSdkLoadedPromise(promise);
    }
}