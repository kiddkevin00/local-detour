import moment from 'moment';


export const SAMPLE_EVENT = {
  name: 'Sample Event',
  type: 'Public',
  editorComment: 'Stay tuned! Coming soon...',
  detail: 'typing...',
  cost: '$0',
  where: {
    venue: 'Typing Venue...',
    address: 'typing address...',
    coordinate: {
      latitude: 40.7582904,
      longitude: -73.9668905,
    },
  },
  when: {
    startTimestamp: moment('2107-01-01T00:00').valueOf(),
    endTimestamp: moment('2107-01-02T00:00').valueOf(),
  },
  externalLink: 'https://localdetour.herokuapp.com/',
  previousPhotos: [
    'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/public%2Fimage-coming-soon.png?alt=media&token=a1c411af-8ac3-4657-bab5-e5063cfe1ced',
  ],
  photos: [
    'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/public%2Fimage-coming-soon.png?alt=media&token=a1c411af-8ac3-4657-bab5-e5063cfe1ced',
    'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/public%2Fimage-coming-soon_2.png?alt=media&token=99e76ff0-1c65-41a9-8650-5f65f3ea00ed',
    'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/public%2Fimage-coming-soon_3.png?alt=media&token=64f9720f-7810-4c63-8059-4f8658ce74fd',
    'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/public%2Fimage-coming-soon_4.png?alt=media&token=d1ccfaa7-f157-4235-98a9-e15183054745',
    'https://firebasestorage.googleapis.com/v0/b/spiritual-guide-476dd.appspot.com/o/public%2Fimage-coming-soon_5.png?alt=media&token=64385e44-9e30-45cf-b381-94982f00f9cf',
  ],
  tags: ['#Placeholder'],
};
