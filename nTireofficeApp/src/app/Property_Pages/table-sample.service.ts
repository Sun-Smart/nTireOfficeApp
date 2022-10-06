import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TableSampleService {

    constructor() { }

    public getData() {
        return [
            {
                "Category": "Escape Room",
                "QTY": "12",
                "UpPrice": "Horror",
                "disc%": "30%",
                "tax1": "876576578",
                "tax2": "654678",
                "Tc": "American Hangman",
                "Base V": "Hangman Productions",
                "Bid V": "Thriller",
                "Exp Date": "12/09/2022",
                "Delivary Date": "12/09/2022",
            },
            {
              "Category": "Escape Room",
              "QTY": "12",
              "UpPrice": "Horror",
              "disc%": "30%",
              "tax1": "8765",
              "tax2": "654678",
              "Tc": "American Hangman",
              "Base V": "Hangman Productions",
              "Bid V": "Thriller",
              "Exp Date": "12/09/2022",
              "Delivary Date": "12/09/2022",
            },
            {
              "Category": "Escape Room",
              "QTY": "12",
              "UpPrice": "Horror",
              "disc%": "30%",
              "tax1": "8765",
              "tax2": "654678",
              "Tc": "American Hangman",
              "Base V": "Hangman Productions",
              "Bid V": "Thriller",
              "Exp Date": "12/09/2022",
              "Delivary Date": "12/09/2022",
            },
            {
              "Category": "Escape Room",
              "QTY": "12",
              "UpPrice": "Horror",
              "disc%": "30%",
              "tax1": "8765",
              "tax2": "654678",
              "Tc": "American Hangman",
              "Base V": "Hangman Productions",
              "Bid V": "Thriller",
              "Exp Date": "12/09/2022",
              "Delivary Date": "12/09/2022",
            },
            {
              "Category": "Escape Room",
                "QTY": "12",
                "UpPrice": "Horror",
                "disc%": "30%",
                "tax1": "8765",
                "tax2": "654678",
                "Tc": "American Hangman",
                "Base V": "Hangman Productions",
                "Bid V": "Thriller",
                "Exp Date": "12/09/2022",
                "Delivary Date": "12/09/2022",
            },
        ]
    }

    public getDashbTable1() {
        return [
            {
                "sno": "1.",
                "invoice": "224",
                "month": "August",
                "amount": "3000",
                "status": "Active"
            },
            {
                "sno": " 2.",
                "invoice": "225",
                "month": "Sept",
                "amount": "4000",
                "status": "Active"
            },
            {
                "sno": "3.",
                "invoice": "226",
                "month": "October",
                "amount": "5000",
                "status": "Active"
            },
            {
                "sno": "4.",
                "invoice": "227",
                "month": "November",
                "amount": "6000",
                "status": "Active"
            },
            {
                "sno": "5.",
                "invoice": "228",
                "month": "December",
                "amount": "7000",
                "status": "Active"
            }
        ]
    }

    public getDashbTable2() {
        return [
            {
                "sno": "1.",
                "readBy": "Prakash",
                "description": "Prakash",
                "status": "Active"
            },
            {
                "sno": "2.",
                "readBy": "Surya",
                "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid dignissimos sapiente sint quasi",
                "status": "Active"
            },
            {
                "sno": "3.",
                "readBy": "Ramiz",
                "description": "consectetur adipisicing elit. Aliquid dignissimos sapiente sint quasi",
                "status": "Active"
            },
            {
                "sno": "4.",
                "readBy": "Stobart",
                "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                "status": "Active"
            },
            {
                "sno": "5.",
                "readBy": "Ram",
                "description": "Aliquid dignissimos sapiente sint quasi. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                "status": "Active"
            },
        ]
    }

    public getDashbTable3() {
        return [
            {
                "sno": "1.",
                "propertycode": "224",
                "issuedescription": "Bad",
                "status": "Active"
            },
            {
                "sno": " 2.",
                "propertycode": "225",
                "issuedescription": "common",
                "status": "Active"
            },
            {
                "sno": "3.",
                "propertycode": "226",
                "issuedescription": "decribe",
                "status": "Active"
            },
            {
                "sno": "4.",
                "propertycode": "227",
                "issuedescription": "develop",
                "status": "Active"
            },
            {
                "sno": "5.",
                "propertycode": "228",
                "issuedescription": "develop",
                "status": "Active"
            }
        ]
    }

    public getDashbTable4() {
        return [
            {
                "sno": "1.",
                "propertycode": "224",
                "issuedescription": "Bad",
                "flat": "Active"
            },
            {
                "sno": " 2.",
                "propertycode": "225",
                "issuedescription": "common",
                "flat": "Active"
            },
            {
                "sno": "3.",
                "propertycode": "226",
                "issuedescription": "decribe",
                "flat": "Active"
            },
            {
                "sno": "4.",
                "propertycode": "227",
                "issuedescription": "develop",
                "flat": "Active"
            },
            {
                "sno": "5.",
                "propertycode": "228",
                "issuedescription": "develop",
                "flat": "Active"
            }
        ]
    }

    public getDashbTable5() {
        return [
            {
                "sno": "1.",
                "propertycode": "224",
                "invoice": "1234",
                "amount": "2000",
                "status": "Active"
            },
            {
                "sno": " 2.",
                "propertycode": "225",
                "invoice": "123",
                "amount": "2000",
                "status": "Active"
            },
            {
                "sno": "3.",
                "propertycode": "226",
                "invoice": "132",
                "amount": "2000",
                "status": "Active"
            },
            {
                "sno": "4.",
                "propertycode": "227",
                "invoice": "546",
                "amount": "2000",
                "status": "Active"
            },
            {
                "sno": "5.",
                "propertycode": "228",
                "invoice": "234",
                "amount": "2000",
                "status": "Active"
            }
        ]
    }

}
