import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../models/Contact'
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  contacts: any = []
  searchTerm: string = ''

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getContacts()
      .subscribe((data: any) => {
        this.contacts = data
      })
  }

  onChange() {
    console.log(this.contacts)
    if (this.searchTerm == '') {
      this.apiService.getContacts()
        .subscribe((data: any) => {
          this.contacts = data
        })
    }
    else {
      var nw = this.contacts.filter((contact: any) =>
        contact.firstname.includes(this.searchTerm) || contact.lastname.includes(this.searchTerm)
      )
      this.contacts = nw
    }
  }

  delete(i:number){
    console.log('deleteing' + i)
  }

}
