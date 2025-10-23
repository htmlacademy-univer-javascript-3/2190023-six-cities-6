export type Offer = {
    id: string;
    title: string;
    type: string;
    price: number;
    rating: number;
    isPremium: boolean;
    isFavorite: boolean;
    previewImage: string;
    images: string[];
    bedrooms: number;
    maxAdults: number;
    goods: string[];
    host: {
        name: string;
        avatarUrl: string;
        isPro: boolean;
    };
    description: string;
    city: string;
    location: {
        latitude: number;
        longitude: number;
    };
};

export const offers: Offer[] = [
    {
        id: '1',
        title: 'Beautiful & luxurious studio at great location',
        type: 'Apartment',
        price: 120,
        rating: 4,
        isPremium: true,
        isFavorite: false,
        previewImage: 'img/apartment-01.jpg',
        images: [
            'img/room.jpg',
            'img/apartment-01.jpg',
            'img/apartment-02.jpg',
            'img/apartment-03.jpg',
            'img/studio-01.jpg',
            'img/apartment-01.jpg',
        ],
        bedrooms: 3,
        maxAdults: 4,
        goods: [
            'Wi-Fi',
            'Washing machine',
            'Towels',
            'Heating',
            'Coffee machine',
            'Baby seat',
            'Kitchen',
            'Dishwasher',
            'Cable TV',
            'Fridge',
        ],
        host: {
            name: 'Angelina',
            avatarUrl: 'img/avatar-angelina.jpg',
            isPro: true,
        },
        description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
        city: 'Amsterdam',
        location: {
            latitude: 52.3909553943508,
            longitude: 4.85309666406198,
        },
    },
    {
        id: '2',
        title: 'Wood and stone place',
        type: 'Private room',
        price: 80,
        rating: 3,
        isPremium: false,
        isFavorite: true,
        previewImage: 'img/room.jpg',
        images: [
            'img/room.jpg',
            'img/apartment-01.jpg',
            'img/apartment-02.jpg',
        ],
        bedrooms: 1,
        maxAdults: 2,
        goods: [
            'Wi-Fi',
            'Heating',
            'Kitchen',
            'Fridge',
        ],
        host: {
            name: 'Max',
            avatarUrl: 'img/avatar-max.jpg',
            isPro: false,
        },
        description: 'A cozy private room in the heart of the city. Perfect for solo travelers or couples.',
        city: 'Amsterdam',
        location: {
            latitude: 52.3609553943508,
            longitude: 4.85309666406198,
        },
    },
    {
        id: '3',
        title: 'Canal View Prinsengracht',
        type: 'Apartment',
        price: 132,
        rating: 4,
        isPremium: false,
        isFavorite: false,
        previewImage: 'img/apartment-02.jpg',
        images: [
            'img/apartment-02.jpg',
            'img/apartment-03.jpg',
            'img/room.jpg',
        ],
        bedrooms: 2,
        maxAdults: 3,
        goods: [
            'Wi-Fi',
            'Kitchen',
            'Cable TV',
            'Fridge',
        ],
        host: {
            name: 'Anna',
            avatarUrl: 'img/avatar-angelina.jpg',
            isPro: true,
        },
        description: 'Spacious apartment with a beautiful canal view. Enjoy the city from your window.',
        city: 'Amsterdam',
        location: {
            latitude: 52.3909553943508,
            longitude: 4.929309666406198,
        },
    },
    {
        id: '4',
        title: 'Nice, cozy, warm big bed apartment',
        type: 'Apartment',
        price: 180,
        rating: 5,
        isPremium: true,
        isFavorite: true,
        previewImage: 'img/apartment-03.jpg',
        images: [
            'img/apartment-03.jpg',
            'img/apartment-01.jpg',
            'img/room.jpg',
        ],
        bedrooms: 2,
        maxAdults: 4,
        goods: [
            'Wi-Fi',
            'Washing machine',
            'Towels',
            'Heating',
            'Coffe machine',
            'Kitchen',
            'Dishwasher',
            'Cable TV',
            'Fridge',
        ],
        host: {
            name: 'Michael',
            avatarUrl: 'img/avatar-max.jpg',
            isPro: false,
        },
        description: 'A nice and cozy apartment with a big bed. Perfect for families and groups.',
        city: 'Amsterdam',
        location: {
            latitude: 52.3809553943508,
            longitude: 4.939309666406198,
        },
    },
]