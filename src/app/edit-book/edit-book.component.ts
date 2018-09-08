import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit 
{

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private dialogRef: MatDialogRef<EditBookComponent>
              ) { }


  saveChanges(title,author,published)
  {
      this.dialogRef.close({title:title.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),author:author,published:published})
  }

  cancel()
  { 
    this.dialogRef.close()
  }

  ngOnInit() 
  {
  }

}
