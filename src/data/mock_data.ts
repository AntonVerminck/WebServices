export const CINEMAS = [
  {
    id: 1,
    name: 'Kinepolis Brugge',
    postcode:8000,
    adres:'',
  },
  {
    id: 2,
    name: 'Kinepolis Gent',
    postcode:9000,
    adres:'',
  },
  {
    id: 3,
    name: 'Sphinx Cinema',
    postcode: 9000,
    adres:'',
  },
];
export const FILMS = [
  {
    id: 1,
    name: 'Five Nights at Freddy\'s ',
    genre:'horror',
    regisseur:'Emma Tammi',
  },
  {
    id:2,
    name: 'The Marvels',
    genre:'Superhero',
    regisseur:'Nia DaCosta',
  },
];
export const TIJDSLOTS = [
  {
    id: 1,
    date: '2021-05-21T17:30:00.000Z',
    cinema: {
      id:2,
      name:'Kinepolis Brugge',
    },
    film: {
      id:1,
      name: 'Five Nights at Freddy\'s',
    },
  },

  {
    id: 2,
    date: '2021-05-21T18:30:00.000Z',
    cinema: {
      id:3,
      name:'Sphinx Cinema',
    },
    film: {
      id:1,
      name: 'Five Nights at Freddy\'s',
    },
  },
  {
    id: 2,
    date: '2021-05-21T18:30:00.000Z',
    cinema: {
      id:3,
      name:'Sphinx Cinema',
    },
    film: {
      id:2,
      name: 'The Marvels',
    },
  },
];

