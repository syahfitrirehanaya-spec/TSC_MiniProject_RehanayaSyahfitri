export const books = [
    {
        id: 1,
        title: "Laut Bercerita",
        author: "Leila S Chudori",
        year: 2022,
        available: true
    },
    {
        id: 2,
        title: "Toko Kelontong Namiya",
        author: "Keigo Higashino",
        year: 2020,
        available: false
    },
    {
        id: 3,
        title: "Animal Farm",
        author: "George Orwell",
        year: 2021,
        available: false
    }
];

// Penghitung ID
let lastId = books.length;
export const createID = () => ++lastId;