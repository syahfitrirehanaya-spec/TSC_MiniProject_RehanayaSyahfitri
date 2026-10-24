import { books, createID } from "./books.js";

// Helper
const isIdValid = (id) => Number.isInteger(id) && id > 0;

// CREATE
export const addBook = (title, author, year) => {
    // Validasi
    if (!title || !author || !year) {
        console.log("Semua field (title, author, year) wajib diisi!");
        return;
    }

    // Validasi tahun
    if (!Number.isInteger(year) || year < 1800 || year > 2026) {
        console.log("Tahun tidak valid! Rentang tahun antara 1800 - 2026.");
        return;
    }

    // Cek duplikat judul buku
    const isDuplicate = books.some(
        (b) => b.title.toLowerCase() === title.trim().toLowerCase()
    );
    
    if (isDuplicate) {
        console.log(`Buku dengan judul "${title}" sudah terdaftar!`);
        return null;
    }

    // Generate dan validasi ID baru
    const newId = createID();
    if (!isIdValid(newId)) {
        console.log("Gagal membuat ID yang valid!");
        return null;
    }

    const newBook = { 
        id: newId, 
        title: title.trim(), 
        author: author.trim(), 
        year, 
        available: true 
    };
    books.push(newBook);
    return newBook;
}

// READ ALL
export const getBook = () =>
    books.map((b) => ({
        ID: b.id,
        Title: b.title,
        Author: b.author,
        Year: b.year,
        Available: b.available ? "Avail" : "Borrowed",
    }));

// READ BY KEYWORD
export const getBookByKeyword = (keyword) => {
    const word = keyword.toLowerCase();
    return books.filter(
        (b) =>
            b.title.toLowerCase().includes(word) || 
            b.author.toLowerCase().includes(word)
    );
};

// SEARCH
export const searchBookById = (id) => books.find((b) => b.id === id);

// UPDATE
export const updateBook = (id, newData)  => {
    const book = searchBookById(id);
    if (!book) {
        console.log(`Buku dengan ID ${id} tidak ditemukan.`);
        return;
    }

    if (newData.title) {
        book.title = newData.title.trim();
    }

    if (newData.author) {
        book.author = newData.author.trim();
    }

    if (newData.year) {
        if (!Number.isInteger(newData.year) || newData.year < 1800 || newData.year > 2026) {
            console.log("Tahun pembaruan tidak valid!");
            return;
        }
        book.year = newData.year;
    }

    if (newData.available) {
        book.available = Boolean(newData.available);
    }
    console.log(`Buku dengan ID ${id} berhasil diperbarui.`);
    return book;
}

// DELETE
export const deleteBook = (id) => {
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) {
        console.log(`Buku dengan Id ${id} tidak ditemukan.`);
        return;
    }
    books.splice(index, 1);
    console.log(`Buku dengan Id ${id} berhasil dihapus.`);
}