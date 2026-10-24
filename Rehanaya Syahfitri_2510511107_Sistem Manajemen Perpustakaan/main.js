import readline from "readline";
import {
    addBook,
    getBook,
    getBookByKeyword,
    searchBookById,
    updateBook,
    deleteBook
} from "./functions.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function showMenu() {
    console.log(`
==============================
📚  SISTEM MANAJEMEN PERPUSTAKAAN
==============================
1. Lihat semua buku
2. Tambah buku baru
3. Cari buku berdasarkan ID
4. Cari buku berdasarkan Keyword (Judul/Penulis)
5. Ubah data buku
6. Hapus buku
0. Keluar
==============================
`);
}

function askMenu() {
    rl.question("Pilih menu (0-6): ", (choice) => {
        switch (choice.trim()) {
            case "1":
                console.log("\n--- DAFTAR BUKU ---");
                console.table(getBook());
                askMenu();
                break;

            case "2":
                rl.question("Masukkan judul buku: ", (title) => {
                    rl.question("Masukkan nama penulis: ", (author) => {
                        rl.question("Masukkan tahun terbit (angka): ", (yearInput) => {
                            const year = parseInt(yearInput, 10);
                            addBook(title, author, year);
                            askMenu();
                        });
                    });
                });
                break;

            case "3":
                rl.question("Masukkan ID buku yang dicari: ", (idInput) => {
                    const id = parseInt(idInput, 10);
                    const book = searchBookById(id);
                    if (book) {
                        console.log("\nBuku ditemukan:");
                        console.table([book]);
                    } else {
                        console.log(`\nBuku dengan ID ${id} tidak ditemukan.`);
                    }
                    askMenu();
                });
                break;

            case "4":
                rl.question("Masukkan keyword (judul atau penulis): ", (keyword) => {
                    const results = getBookByKeyword(keyword);
                    if (results.length > 0) {
                        console.log(`\nBuku dengan keyword ${results.length} ditemukan.`);
                        console.table(results);
                    } else {
                        console.log("\nTidak ada buku yang cocok dengan keyword tersebut.");
                    }
                    askMenu();
                });
                break;

            case "5":
                rl.question("Masukkan ID buku yang ingin diubah: ", (idInput) => {
                    const id = parseInt(idInput, 10);
                    const book = searchBookById(id);
                    if (!book) {
                        console.log(`Buku dengan ID ${id} tidak ditemukan.`);
                        return askMenu();
                    }

                    const statusSaatIni = book.available ? "Avail (Tersedia)" : "Borrowed (Dipinjam)";
                    console.log(`Mengubah buku: "${book.title}". Kosongkan jika tidak ingin mengubah.`);
                    rl.question(`Judul baru [${book.title}]: `, (newTitle) => {
                        rl.question(`Penulis baru [${book.author}]: `, (newAuthor) => {
                            rl.question(`Tahun baru [${book.year}]: `, (newYearInput) => {
                                rl.question(`Status ketersediaan baru [1 = Avail, 0 = Borrowed] saat ini [${statusSaatIni}]: `, (newAvailInput) => {
                                    const newData = {};
                                    if (newTitle.trim() !== "") newData.title = newTitle;
                                    if (newAuthor.trim() !== "") newData.author = newAuthor;
                                    if (newYearInput.trim() !== "") newData.year = parseInt(newYearInput, 10);
                                    if (newAvailInput.trim() === "1") {
                                        newData.available = true;
                                    } else if (newAvailInput.trim() === "0") {
                                        newData.available = false;
                                    }
                                    updateBook(id, newData);
                                    askMenu();
                                });
                            });
                        });
                    });
                });
                break;

            case "6":
                rl.question("Masukkan ID buku yang ingin dihapus: ", (idInput) => {
                    const id = parseInt(idInput, 10);
                    deleteBook(id);
                    askMenu();
                });
                break;

            case "0":
                console.log("Keluar dari sistem. Terima kasih!");
                rl.close();
                break;

            default:
                console.log("Pilihan tidak valid, coba lagi!");
                askMenu();
                break;
        }
    });
}

// Jalankan program
showMenu();
askMenu();