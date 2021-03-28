import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../models/Contact';
import { Location } from '../models/location';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  location: Location = new Location('', '', '')
  contact: Contact = new Contact('', '', '', this.location)
  contacts: Contact[] = []

  regions: any = []
  cities: any = []
  suburbs: any = []

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getRegions()
      .subscribe((data: any) => {
        this.regions = data
      })
  }


  // add contact
  addContact() {
    this.apiService.addContact(this.contact)
      .subscribe((data: any) => {
        console.log(data)
      })
    this.router.navigateByUrl('/')
  }

  regionChange(){
    this.apiService.getCities(this.contact.location.region)
      .subscribe((data: any) => {
        this.cities = data
      })
  }

  cityChange(){
    this.apiService.getSuburbs(this.contact.location.city)
      .subscribe((data: any) => {
        this.suburbs = data
      })
  }

}
