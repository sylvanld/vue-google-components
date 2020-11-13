
export interface VueGoogleComponentsOptions {
    apiKey: string;
    libraries: {
        [library: string]: boolean
    }
}

export interface GLocation {
    lat: number;
    lng: number;
}

export interface GPlace {
    name: string;
    location: GLocation;
}