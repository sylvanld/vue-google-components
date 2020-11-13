import { GPlace, GLocation } from '../types';


export class GoogleMapsService {
    private static googleMapService: Promise<google.maps.places.PlacesService>;
    public static ready: Promise<boolean>;

    public static setSdkLoadedPromise(readyPromise: Promise<boolean>) {
        this.ready = readyPromise;
        this.googleMapService = new Promise(resolve => {
            readyPromise.then(() => {
                const map = new google.maps.Map(document.createElement('div'));
                resolve(new google.maps.places.PlacesService(map));
            });
        });
    }

    public static searchPlace(query: string, fields = ['formatted_address', 'geometry']): Promise<GPlace[]> {
        return new Promise(resolve => {
            this.googleMapService
                .then(service => service.findPlaceFromQuery({ query, fields }, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        resolve(
                            results.map(result => {
                                if (!result.formatted_address || !result.geometry) {
                                    throw "Wrong response from google API...";
                                }

                                return {
                                    name: result.formatted_address,
                                    location: {
                                        lat: result.geometry.location.lat(),
                                        lng: result.geometry.location.lng()
                                    }
                                }
                            })
                        );
                    }
                })
                )
        })
    }

    public static createMap(options: { mapRoot: Element | null; place: GPlace; center: GLocation; zoom?: number }) {
        this.ready
            .then(() => {
                if (location && options.mapRoot) {
                    const centerLatLng = new google.maps.LatLng(options.center.lat, options.center.lng);
                    const placeLatLng = new google.maps.LatLng(options.place.location.lat, options.place.location.lng);

                    const map = new google.maps.Map(options.mapRoot, {
                        center: centerLatLng,
                        zoom: options.zoom || 13
                    });

                    new google.maps.Marker({
                        position: placeLatLng, map: map
                    });
                }
            })
    }
}

export default GoogleMapsService