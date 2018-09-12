import { Component, OnInit, OnDestroy } from '@angular/core';
import { BooksService } from '../services/books.service';
import {Subscription } from 'rxjs';
import {MatDialog} from '@angular/material';
import { AddBookComponent }  from '../add-book/add-book.component'
import {MessageService} from 'primeng/components/common/messageservice';
import {Book} from '../book.modal'
import { RemoveSpecialCharsPipe } from '../remove-special-chars.pipe'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers:[RemoveSpecialCharsPipe]
})
export class BooksComponent implements OnInit, OnDestroy{


    books:Book[]
    getBooksSub:Subscription
    addBookSub:Subscription



  constructor(private booksService : BooksService, 
              private addBookDialog : MatDialog,
              private messageService: MessageService, 
              private removeSpecialChars : RemoveSpecialCharsPipe
  ) { }


  checkForDuplicateTitle(title)
  {
       const fillterdArray = this.books.filter(book => {
        return  this.removeSpecialChars.transform(book.volumeInfo.title.toLowerCase()) == this.removeSpecialChars.transform(title.toLowerCase()) 
      } )
        return fillterdArray
  }


  addNewBook()
  {
    let dialog = this.addBookDialog.open(AddBookComponent)
    this.addBookSub = dialog.afterClosed().subscribe((res)=>
    {     
          if(!res)
          {
            return null
          }
          else if(this.checkForDuplicateTitle(res.volumeInfo.title).length == 0)
          {
            this.books.unshift(res)
            this.messageService.add({severity:'success', summary:'Book Added', detail:'You added a new book "' + this.removeSpecialChars.transform(res.volumeInfo.title) + '"'});
          }
          else
          {
             this.messageService.add({severity:'error', summary:'Duplicate Title', detail:'A Book with the title "' + this.removeSpecialChars.transform(res.volumeInfo.title) + '" already exists'});
          }
    })
  }



editBook(book, index)
{
    if(this.checkForDuplicateTitle(book.title).length == 0)
    { 
       this.messageService.add({severity:'success', summary:'Book Edited', detail:'You Edited the book ' +  this.removeSpecialChars.transform(this.books[index].volumeInfo.title) });
       this.books[index].volumeInfo.title = book.title
       this.books[index].volumeInfo.authors = book.author,
       this.books[index].volumeInfo.publishedDate = book.published
    }  
    else
    {
       this.messageService.add({severity:'error', summary:'Duplicate Title', detail:'A Book with the title "' + this.removeSpecialChars.transform(book.title)  + '" already exists'});
    }
}



deleteBook(index)
{
  this.books.splice(index,1)
  this.messageService.add({severity:'success', summary:'Book Deleted', detail:'You deleted the book "' + this.removeSpecialChars.transform(this.books[index].volumeInfo.title) + '"'});

}

  ngOnInit() {

    this.getBooksSub = this.booksService.getBooksAtStart().subscribe((res:any)=>
    {
        this.books = res.items
    })    
  }


  ngOnDestroy()
  {     
      this.addBookSub.unsubscribe()
      this.getBooksSub.unsubscribe()
  }


}
