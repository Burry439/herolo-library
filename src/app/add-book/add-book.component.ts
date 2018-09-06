import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<AddBookComponent>) { }



  addBook(title, author,published, image)
  { 




      let newBook = {
        id :  Math.random().toString(12).replace('0.', ''),
        volumeInfo: {
          title : title,
          authors : author,
          imageLinks:{thumbnail:image},
          publishedDate: published
        }
      }
      this.dialogRef.close(newBook)
  }


  cancel()
  {
    this.dialogRef.close()
  }


  ngOnInit() {
  
  }

}
