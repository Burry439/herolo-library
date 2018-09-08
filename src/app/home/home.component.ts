import { Component, OnInit, OnDestroy } from '@angular/core';
import { BooksService } from '../services/books.service';
import { EditBookComponent }  from '../edit-book/edit-book.component'
import { AddBookComponent }  from '../add-book/add-book.component'
import { DeleteComponent }  from '../delete/delete.component'
import {MessageService} from 'primeng/components/common/messageservice';
import {MatDialog} from '@angular/material';
import {Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private booksService : BooksService,   
              private editDialog: MatDialog,
              private deleteDialog : MatDialog, 
              private addBookDialog : MatDialog, 
              private messageService: MessageService ,
            ) { }
             

    books:any = []
    getBooksSub:Subscription
    editBookSub:Subscription
    deleteBookSub:Subscription
    addBookSub:Subscription


  checkForDuplicateTitle(title):boolean
  { 

    let duplicate : boolean = true

    this.books.map((book) =>
    {   
        if (book.volumeInfo.title.toLowerCase().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '') == title.toLowerCase()) duplicate = false    
    });

    if(duplicate) return true
  
    else return false
  
  }


  openEditDialog(index)
  { 

    let dialog = this.editDialog.open(EditBookComponent, 
    { 
      data: 
      {
        book: this.books[index]
      }
    })

    this.editBookSub = dialog.afterClosed().subscribe((res)=>
    {

          if(!res)
          {
             return null
          }

          else if(res && this.checkForDuplicateTitle(res.title))
          { 
            this.messageService.add({severity:'success', summary:'Book Edited', detail:'You Edited the book ' + this.books[index].volumeInfo.title });
            this.books[index].volumeInfo.title = res.title
            this.books[index].volumeInfo.authors = res.author,
            this.books[index].volumeInfo.publishedDate = res.published
          }
          else if(res.title != undefined && !this.checkForDuplicateTitle(res.title))
          {
            this.messageService.add({severity:'error', summary:'Duplicate Title', detail:'A Book with the title "' + res.title + '" already exists'});
          }
    })
  }


  addNewBook()
  {
    let dialog = this.addBookDialog.open(AddBookComponent)
    this.addBookSub = dialog.afterClosed().subscribe((res)=>
    {
        if(res && !this.checkForDuplicateTitle(res.volumeInfo.title))
        { 
          this.messageService.add({severity:'error', summary:'Duplicate Title', detail:'A Book with the title "' + res.volumeInfo.title + '" already exists'});
        }
        else if (res)
        { 
          this.messageService.add({severity:'success', summary:'Book Added', detail:'You added a new book "' + res.volumeInfo.title + '"'});
          this.books.unshift(res)
        }
    })
  }


  deleteBook(i)
  {
     let dialog = this.deleteDialog.open(DeleteComponent)
     this.deleteBookSub = dialog.afterClosed().subscribe((res)=>
     {
       if(res)
       {  
         this.messageService.add({severity:'success', summary:'Book Deleted', detail:'You deleted the book "' + this.books[i].volumeInfo.title + '"'});
         this.books.splice(i,1)
       }
     })
  }


  ngOnInit() 
  {
    this.getBooksSub = this.booksService.getBooksAtStart().subscribe((res:any)=>
    {
        this.books = res.items
    })    
  }


  ngOnDestroy()
  {     
      this.getBooksSub.unsubscribe()
      this.editBookSub.unsubscribe()
      this.getBooksSub.unsubscribe()
      this.editBookSub.unsubscribe()
  }
}
