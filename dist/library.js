"use strict";
//person
class Person {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    displayInfo() {
        console.log(`Name: ${this.name}, Email: ${this.email}`);
    }
}
//book
class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
    displayInfo() {
        console.log(`Title: ${this.title}, Author: ${this.author}`);
    }
}
//borrowing record
class BorrowingRecord {
    constructor(member, book, borrowDate) {
        this.member = member;
        this.book = book;
        this.borrowDate = borrowDate;
    }
    displayInfo() {
        console.log(`${this.member.name} borrowed "${this.book.title}" on ${this.borrowDate}`);
    }
}
//librarian
class Librarian extends Person {
    constructor(name, email) {
        super(name, email);
    }
    addBook(library, book) {
        library.addBook(book);
        console.log(`${this.name} added the book: ${book.title}`);
    }
    removeBook(library, bookTitle) {
        library.removeBook(bookTitle);
        console.log(`${this.name} removed the book: ${bookTitle}`);
    }
}
//member
class Member extends Person {
    constructor(name, email, memberType) {
        super(name, email);
        this.memberType = memberType;
    }
    borrowBook(library, bookTitle) {
        library.borrow(this, bookTitle);
    }
    returnBook(library, bookTitle) {
        library.returnBook(this, bookTitle);
    }
    displayInfo() {
        console.log(`Name: ${this.name}, Email: ${this.email}, Member Type: ${this.memberType}`);
    }
}
//library
class Library {
    constructor() {
        this.books = [];
        this.records = [];
    }
    addBook(book) {
        this.books.push(book);
    }
    removeBook(bookTitle) {
        this.books = this.books.filter((book) => book.title !== bookTitle);
    }
    borrow(member, bookTitle) {
        const book = this.books.find((b) => b.title === bookTitle);
        if (book) {
            this.records.push(new BorrowingRecord(member, book, new Date()));
            this.books = this.books.filter((b) => b.title !== bookTitle);
            console.log(`${member.name} borrowed "${bookTitle}"`);
        }
        else {
            console.log(`Book "${bookTitle}" is not available`);
        }
    }
    returnBook(member, bookTitle) {
        const record = this.records.find((r) => r.book.title === bookTitle && r.member === member);
        if (record) {
            this.books.push(record.book);
            this.records = this.records.filter((r) => r !== record);
            console.log(`${member.name} returned "${bookTitle}"`);
        }
        else {
            console.log(`No record found for ${member.name} borrowing "${bookTitle}"`);
        }
    }
    listAvailableBooks() {
        console.log("Available books in the library:");
        this.books.forEach((book) => book.displayInfo());
    }
    listBorrowedBooks() {
        console.log("Borrowed books:");
        this.records.forEach((record) => record.displayInfo());
    }
}
const library = new Library();
const librarian = new Librarian("Sribin", "sribin@gmail.com");
const regularMember = new Member("Nithin", "nithin@gmail.com", "Regular");
const premiumMember = new Member("Amal", "amal@gmail.com", "Premium");
const book1 = new Book("Atomic Habit", "James Clear");
const book2 = new Book("Rich Dad Poor Dad", " Robert Kiyosaki");
librarian.addBook(library, book1);
librarian.addBook(library, book2);
library.listAvailableBooks();
regularMember.borrowBook(library, "Rich Dad Poor Dad");
premiumMember.borrowBook(library, "Atomic Habit");
library.listAvailableBooks();
library.listBorrowedBooks();
regularMember.returnBook(library, "Rich Dad Poor Dad");
premiumMember.returnBook(library, "Atomic Habit");
library.listAvailableBooks();
library.listBorrowedBooks();
