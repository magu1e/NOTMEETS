export const usersMock = [
    {
        id: 1,
        username: 'usertest1',
        email: 'user@test.com',
        location: 2,
        role: 'admin',
        bookings: [
            {
                id: 1,
                room: 1,
                startDate: '2024-10-10 09:00',
                endDate: '2024-10-10 13:00',
                user: 'username1',
                priority: 1,
              },
              {
                id: 2,
                room: 1,
                startDate: '2024-10-23 16:00',
                endDate: '2024-10-23 17:00',
                user: 'username1',
                priority: 2,
              },
        ]
    },
    {
        id: 2,
        username: 'usertest2',
        email: 'user2@test.com',
        location: 1,
        role: 'user',
        bookings: [
            {
                id: 1,
                room: 1,
                startDate: '2024-10-15 09:00',
                endDate: '2024-10-15 13:00',
                user: 'username2',
                priority: 1,
              },
              {
                id: 2,
                room: 1,
                startDate: '2024-10-17 16:00',
                endDate: '2024-10-17 17:00',
                user: 'username2',
                priority: 2,
              },
        ]
    },
    {
        id: 3,
        username: 'usertest3',
        email: 'user3@test.com',
        location: 4,
        role: 'user',
        bookings: [
            {
                id: 1,
                room: 1,
                startDate: '2024-10-09 09:00',
                endDate: '2024-10-09 13:00',
                user: 'username3',
                priority: 1,
              },
              {
                id: 2,
                room: 1,
                startDate: '2024-10-02 16:00',
                endDate: '2024-10-02 17:00',
                user: 'username3',
                priority: 3,
              },
        ]
    },
    
]