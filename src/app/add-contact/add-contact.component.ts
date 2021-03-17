import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../models/Contact';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  contact: Contact = {
    email: '', name: '', phone: ''
  }
  contacts: Contact[] = []

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.contacts = JSON.parse(localStorage.getItem('contacts') || '[]') 
  }

  // add contact
  addContact() {
    this.contacts.push(new Contact(this.contact.email, this.contact.name, this.contact.phone))
    localStorage.setItem('contacts',  JSON.stringify(this.contacts))
    this.router.navigateByUrl('/')
  }

}
