import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';


export interface Data {
  movies: string;
}

@Component({
  selector: 'app-pms-transaction',
  templateUrl: './pms-transaction.page.html',
  styleUrls: ['./pms-transaction.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PmsTransactionPage implements OnInit {

  public data: Data;
  public columns: any;
  public rows: any;

  constructor(private modalCtrl: ModalController, private http:HttpClient) { 
    this.columns = [
      { name: 'Name' },
      { name: 'Company' },
      { name: 'Genre' },
      { name: 'Mobile Number' },
      { name: 'Address' }
    ];

    {
this.rows=      [
          {
              "name": "Escape Room",
              "company": "Columbia Pictures",
              "genre": "Horror",
              "number":9788668765,
              "address": "Pillayar kovil st"
          },
          {
              "name": "Rust Creek",
              "company": "IFC Films",
              "genre": "Drama",
              "number":6895668765,
              "address": "Pillayar kovil st"
          },
          {
              "name": "American Hangman",
              "company": "Hangman Productions",
              "genre": "Thriller",
              "number":9156668765,
              "address": "Pillayar kovil st"
          },
          {
              "name": "The Upside",
              "company": "STX Entertainment",
              "genre": "Comedy",
              "number":9788668765,
              "address": "Pillayar kovil st"
          },
          {
              "name": "Replicas",
              "company": "Entertainment Studios",
              "genre": "Sci-Fi",
              "number":9787638765,
              "address": "Pillayar kovil st"
          },
          {
              "name": "After Darkness",
              "company": "Grindstone Group",
              "genre": "Drama",
              "number":97886689675,
              "address": "Pillayar kovil st"
          },
          {
              "name": "Glass",
              "company": "Universal Pictures",
              "genre": "Superhero",
              "number":9098268765,
              "address": "Pillayar kovil st"
          },

      ]
  }
    // this.http.get<Data>('../../assets/movies.json')
    //   .subscribe((res) => {
    //     console.log(res)
    //     this.rows = res.movies;
    //   });
      console.log(this.rows)
  }

  ngOnInit() {
   
  }
  transCancel(){
    this.modalCtrl.dismiss();
  }
  }
 
