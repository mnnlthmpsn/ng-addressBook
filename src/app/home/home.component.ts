import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../models/Contact'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  contacts: Contact[] = []
  searchTerm: string = ''

  constructor() { }

  ngOnInit(): void {
    this.contacts = JSON.parse(localStorage.getItem('contacts') || '[]')
  }

  onChange() {
    if (this.searchTerm == '') {
      this.contacts = JSON.parse(localStorage.getItem('contacts') || '[]')
    }
    else {
      var nw = this.contacts.filter((contact, index) =>
        contact.name.includes(this.searchTerm)
      )
      this.contacts = nw
    }
  }

  delete(i: any) {
    var nw = this.contacts.filter((contact, index) => index != i)
    localStorage.setItem('contacts', JSON.stringify(nw))
    window.location.reload()
  }

}
