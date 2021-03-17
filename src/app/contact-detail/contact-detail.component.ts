import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../models/Contact';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  index: string = ''
  contacts: Contact[] = []

  contact: Contact = {name: '', email: '', phone: ''}

  constructor(private currentRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.index = this.currentRoute.snapshot.paramMap.get('index') || ''
    this.contacts = JSON.parse(localStorage.getItem('contacts') || '[]')
    this.contact = this.contacts[parseInt(this.index)]
  }

  updateContact(){
    this.contacts[parseInt(this.index)] = new Contact(this.contact.email, this.contact.name, this.contact.phone)
    localStorage.setItem('contacts',  JSON.stringify(this.contacts))
    this.router.navigateByUrl('/')
  }

}
