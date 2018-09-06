import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http : HttpClient) { }


  

  getBooksAtStart()
  {
     return this.http.get('https://www.googleapis.com/books/v1/volumes?q=ebooks')
  }

}
