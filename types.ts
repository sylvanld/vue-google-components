
export interface VueGoogleComponentsOptions {
    apiKey: string;
    libraries: {
        [library: string]: boolean
    }
}

export interface Place {
    name: string;
    location: {
        lat: number;
        lng: number;
    }
}