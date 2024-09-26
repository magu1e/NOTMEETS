export const roomsMock = [
  {
    id: 1,
    name: 'Sala 1',
    location: 1,
    capacity: 50,
    bookings: [
      {
        id: 1,
        roomId: 1,
        startDate: "2024-10-10T09:00:40.542Z",
        endDate: "2024-10-10T13:00:40.542Z",
        username: 'username1',
        priority: 1,
        attendees: 10,
        timestamp: 123456789
      },
      {
        id: 2,
        roomId: 2,
        startDate: "2024-10-11T09:00:40.542Z",
        endDate: "2024-10-11T13:00:40.542Z",
        username: 'username2',
        priority: 2,
        attendees: 10,
        timestamp: 1111111111
      },
      {
          id: 1,
          roomId: 1,
          startDate: "2024-10-10T09:00:40.542Z",
          endDate: "2024-10-10T13:00:40.542Z",
          username: 'username1',
          priority: 3,
          attendees: 10,
          timestamp: 222222222
        },
        {
          id: 2,
          roomId: 2,
          startDate: "2024-10-11T09:00:40.542Z",
          endDate: "2024-10-11T13:00:40.542Z",
          username: 'username2',
          priority: 2,
          attendees: 10,
          timestamp: 3333333333
        },
    ]
  },
  {
    id: 2,
    name: 'Sala 2',
    location: 2,
    capacity: 25,
    bookings: [
      {
        id: 1,
        roomId: 1,
        startDate: '2024-10-10T09:00:40.542Z',
        endDate: '2024-10-10T13:00:40.542Z',
        username: 'username1',
        priority: 1,
        attendees: 10,
        timestamp: 123456781,
      },
      {
        id: 2,
        roomId: 2,
        startDate: '2024-10-13T09:00:40.542Z',
        endDate: '2024-10-13T13:00:40.542Z',
        username: 'username2',
        priority: 2,
        attendees: 10,
        timestamp: 123456781,
      },
    ]
  },
  {
    id: 3,
    name: 'Sala 3',
    location: 3,
    capacity: 5,
    bookings: [
      {
        id: 1,
        roomId: 1,
        startDate: '2024-10-14T09:00:40.542Z',
        endDate: '2024-10-14T13:00:40.542Z',
        username: 'username1',
        priority: 1,
        attendees: 10,
        timestamp: 123456782,
      },
      {
        id: 2,
        roomId: 2,
        startDate: '2024-10-15T09:00:40.542Z',
        endDate: '2024-10-15T13:00:40.542Z',
        username: 'username2',
        priority: 2,
        attendees: 10,
        timestamp: 123456782,
      },
    ]
  },
  {
    id: 4,
    name: 'Sala 4',
    location: 4,
    capacity: 100,
    bookings: [
      {
        id: 1,
        roomId: 1,
        startDate: '2024-10-16T09:00:40.542Z',
        endDate: '2024-10-16T13:00:40.542Z',
        username: 'username1',
        priority: 1,
        attendees: 10,
        timestamp: 123456782,
      },
      {
        id: 2,
        roomId: 2,
        startDate: '2024-10-17T09:00:40.542Z',
        endDate: '2024-10-17T13:00:40.542Z',
        username: 'username2',
        priority: 2,
        attendees: 10,
        timestamp: 123456782,
      },
    ]
  },
  {
    id: 5,
    name: 'Sala 5',
    location: 2,
    capacity: 10,
    bookings: [
      {
        id: 1,
        roomId: 1,
        startDate: '2024-10-18T09:00:40.542Z',
        endDate: '2024-10-18T13:00:40.542Z',
        username: 'username1',
        priority: 1,
        attendees: 10,
        timestamp: 123456783,
      },
      {
        id: 2,
        roomId: 2,
        startDate: '2024-10-19T09:00:40.542Z',
        endDate: '2024-10-19T13:00:40.542Z',
        username: 'username2',
        priority: 2,
        attendees: 10,
        timestamp: 123456783,
      },
    ]
  },
  {
    id: 6,
    name: 'Sala 6',
    location: 3,
    capacity: 60,
    bookings: [
      {
        id: 1,
        roomId: 1,
        startDate: '2024-10-20T09:00:40.542Z',
        endDate: '2024-10-20T13:00:40.542Z',
        username: 'username1',
        priority: 1,
        attendees: 10,
        timestamp: 123456785,
      },
      {
        id: 2,
        roomId: 2,
        startDate: '2024-10-21T09:00:40.542Z',
        endDate: '2024-10-21T13:00:40.542Z',
        username: 'username2',
        priority: 2,
        attendees: 10,
        timestamp: 123456785,
      },
    ]
  }
]