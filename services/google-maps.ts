import axios from 'axios'

export default class GoogleMapsService {
    private static googleApiBaseUrl = "";
    private static googleApiToken: string | null = null;

    public static setToken(token: string) {
        this.googleApiToken = token;
    }

    public static searchPlace(query: string, fields = ['formatted_address', 'geometry']) {
        return new Promise((resolve) => {
            axios.get(
                this.googleApiBaseUrl + '/place/findplacefromtext/json?'
                + 'input=' + encodeURIComponent(query)
                + '&fields=' + fields.join(',')
                + '&key=' + this.googleApiToken
                + '&inputtype=textquery'
            )
                .then(response => {
                    resolve(response.data.candidates)
                })
        })
    }
}
