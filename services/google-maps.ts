import { Place } from '../types';


export class GoogleMapsService {
    public static mapService() {
        const map = new google.maps.Map(document.createElement('div'));
        const mapsService = new google.maps.places.PlacesService(map);
        return mapsService;
    }

    public static searchPlace(query: string, fields = ['formatted_address', 'geometry']): Promise<Place[]> {
        return new Promise(resolve => {
            this.mapService().findPlaceFromQuery({ query, fields }, (results, status) => {
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
        })
    }

    public static createMap(options: { mapRoot: HTMLElement; place: Place; center: Place }) {
        console.log('place', options.place, 'geometry', location)
        if (location) {
            const centerLatLng = new google.maps.LatLng(options.place.location.lat, options.place.location.lng);
            console.log(centerLatLng)

            new google.maps.Map(options.mapRoot, {
                center: centerLatLng,
                zoom: 15,
            });
        }



        /*
        const map = new google.maps.Map(options.mapRoot, {
            center: options.place.geometry?.location,
            zoom: 14
        });
        return map;
        */
    }
}

export default GoogleMapsService