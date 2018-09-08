import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit 
{

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private dialogRef: MatDialogRef<DeleteComponent>
              ) { }


  
    confirmDelete()
    {
       this.dialogRef.close('delete')
    }
              
    cancel()
    { 
      this.dialogRef.close()
    }

  ngOnInit() 
  {
  }

}
