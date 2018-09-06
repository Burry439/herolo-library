import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule }   from '@angular/forms';


import {MatCardModule} from '@angular/material/card'
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {GrowlModule} from 'primeng/growl';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MessageService} from 'primeng/components/common/messageservice';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { DeleteComponent } from './delete/delete.component';
import { AddBookComponent } from './add-book/add-book.component';
import { RemoveSpecialCharsPipe } from './remove-special-chars.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditBookComponent,
    DeleteComponent,
    AddBookComponent,
    RemoveSpecialCharsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
    BrowserAnimationsModule,
    GrowlModule,
    NgbModule.forRoot(),

  ],
  entryComponents: [EditBookComponent,DeleteComponent,AddBookComponent],

  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
