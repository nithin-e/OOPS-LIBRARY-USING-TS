//person
class Person {
    constructor(public name: string, public email: string) {}
  
    displayInfo(): void {
      console.log(`Name: ${this.name}, Email: ${this.email}`);
    }
  }
  
  //book
  class Book {
    constructor(public title: string, public author: string) {}
  
    displayInfo(): void {
      console.log(`Title: ${this.title}, Author: ${this.author}`);
    }
  }
  
  //borrowing record
  class BorrowingRecord {
    constructor(
      public member: Member,
      public book: Book,
      public borrowDate: Date
    ) {}
  
    displayInfo(): void {
      console.log(
        `${this.member.name} borrowed "${this.book.title}" on ${this.borrowDate}`
      );
    }
  }
  
  //librarian
  class Librarian extends Person {
    constructor(name: string, email: string) {
      super(name, email);
    }
  
    addBook(library: Library, book: Book): void {
      library.addBook(book);
      console.log(`${this.name} added the book: ${book.title}`);
    }
  
    removeBook(library: Library, bookTitle: string): void {
      library.removeBook(bookTitle);
      console.log(`${this.name} removed the book: ${bookTitle}`);
    }
  }
  
  //member
  class Member extends Person {
    constructor(name: string, email: string, public memberType: string) {
      super(name, email);
    }
  
    borrowBook(library: Library, bookTitle: string): void {
      library.borrow(this, bookTitle);
    }
  
    returnBook(library: Library, bookTitle: string): void {
      library.returnBook(this, bookTitle);
    }
  
    displayInfo(): void {
      console.log(
        `Name: ${this.name}, Email: ${this.email}, Member Type: ${this.memberType}`
      );
    }
  }
  
  //library
  class Library {
    private books: Book[] = [];
    private records: BorrowingRecord[] = [];
  
    addBook(book: Book): void {
      this.books.push(book);
    }
  
    removeBook(bookTitle: string): void {
      this.books = this.books.filter((book) => book.title !== bookTitle);
    }
  
    borrow(member: Member, bookTitle: string): void {
      const book = this.books.find((b) => b.title === bookTitle);
      if (book) {
        this.records.push(new BorrowingRecord(member, book, new Date()));
        this.books = this.books.filter((b) => b.title !== bookTitle);
        console.log(`${member.name} borrowed "${bookTitle}"`);
      } else {
        console.log(`Book "${bookTitle}" is not available`);
      }
    }
  
    returnBook(member: Member, bookTitle: string): void {
      const record = this.records.find(
        (r) => r.book.title === bookTitle && r.member === member
      );
      if (record) {
        this.books.push(record.book);
        this.records = this.records.filter((r) => r !== record);
        console.log(`${member.name} returned "${bookTitle}"`);
      } else {
        console.log(
          `No record found for ${member.name} borrowing "${bookTitle}"`
        );
      }
    }
  
    listAvailableBooks(): void {
      console.log("Available books in the library:");
      this.books.forEach((book) => book.displayInfo());
    }
  
    listBorrowedBooks(): void {
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