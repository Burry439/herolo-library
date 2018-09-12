import { Component, OnInit,OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { EditBookComponent }  from '../edit-book/edit-book.component'
import { DeleteComponent }  from '../delete/delete.component'
import {MatDialog} from '@angular/material';
import {Subscription } from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnDestroy {

  constructor(
              private editDialog: MatDialog,
              private deleteDialog : MatDialog, 
        
            ) { }
             

    
    editBookSub:Subscription
    deleteBookSub:Subscription

    @Input()book
    @Output() deleteBook = new EventEmitter<String>()
    @Output() editBook = new EventEmitter<Object>()

  

  openEditDialog()
  { 

    let dialog = this.editDialog.open(EditBookComponent, 
    { 
      data: 
      {
        book: this.book
      }
    })

    this.editBookSub = dialog.afterClosed().subscribe((res)=>
    {

        if(res)
        {
          this.editBook.emit(res)

        }
    })
  }


  deleteBookDialog()
  {
     let dialog = this.deleteDialog.open(DeleteComponent)
     this.deleteBookSub = dialog.afterClosed().subscribe((res)=>
     {
       if(res)
       {  
          this.deleteBook.emit("delete")
       }
     })
  }


  ngOnInit() 
  {

  }

  ngOnDestroy()
  {
      this.editBookSub.unsubscribe()
      this.deleteBookSub.unsubscribe()
  }


}
