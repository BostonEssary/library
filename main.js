function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.readSentence = function(){
        return this.read ? "already read" : "not read yet"
    }
    this.info = function() {
        let info = `${this.title}, ${this.author}, ${this.pages}, ${this.readSentence()}`
        console.log(info)
    }
}

const hp = new Book('Chamber of Secrets', 'JK Rowling', 234, true )

hp.info()