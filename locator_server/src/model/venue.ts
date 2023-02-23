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

// const venue = {
//     "fsq_id": "585bb8ca0037eb3be7f380a6",
//     "categories":
//         [
//             {
//                 "id": 13035, "name": "Coffee Shop", "icon":
//                     { "prefix": "https://ss3.4sqi.net/img/categories_v2/food/coffeeshop_", "suffix": ".png" }
//             }
//         ],
//     "chains": [],
//     "distance": 1504,
//     "geocodes":
//     {
//         "main": {
//             "latitude": 49.826466, "longitude": 23.98985
//         }
//     }, "link": "/v3/places/585bb8ca0037eb3be7f380a6",
//     "location": {
//         "address": "Кульпарківська, 59", "country": "UA", "cross_street": "",
//         "formatted_address": "Кульпарківська, 59"
//     },
//     "name": "2 cups",
//     "related_places": {},
//     "timezone": "Europe/Kiev"
// }