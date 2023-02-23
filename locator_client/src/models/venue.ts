export interface Location {
    result: IVenue;
    placesNearby: IVenue[];
}

export interface IVenue {
    fsq_id: string;
    categories: ICategory[]
    chains: any[],
    distance: number;
    geocodes: {
        main: {
            latitude: number;
            longitude: number;
        },
        link: string,
    }
    location: {
        address: string
        formatted_address: string;
    }
    name: string;
    related_places?: {
        parent: {
            fsq_id: string;
            name: string;
        },
        children: [
            {
                fsq_i: string,
                name: string
            }]
    };
    timezone: string;
}

export interface ICategory {
    id: number;
    name: string;
    icon: {
        prefix: string;
        suffix: string;
    }
}