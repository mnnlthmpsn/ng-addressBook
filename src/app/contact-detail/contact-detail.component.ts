import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../models/Contact';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  id: any
  regions: any = []
  cities: any = []
  suburbs: any = []

  contact: Contact = { firstname: '', lastname: '', phone: '', location: { region: '', city: '', suburb: '' } }

  constructor(private currentRoute: ActivatedRoute, private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.id = this.currentRoute.snapshot.paramMap.get('id') || ''
    this.getContact(this.id)
    this.getRegions()
  }


  getContact = (id: any) => {
    this.apiService.getContact(id)
      .subscribe((data: any) => {
        this.contact = {firstname: data.firstname, lastname: data.lastname, phone: data.phone, location: {region: data.regionId, city: data.cityId, suburb: data.suburbId}}
        this.getCities(data.regionId)
      })
  }

  getRegions = () => {
    this.apiService.getRegions()
      .subscribe((data: any) => {
        this.regions = data
      })
  }

  getCities = (id: any) => {
    this.apiService.getCities(id)
      .subscribe((data: any) => {
        this.cities = data
        this.getSuburbs(this.contact.location.city)
      })
  }

  getSuburbs = (id: any) => {
    this.apiService.getSuburbs(id)
      .subscribe((data:any) => {
        this.suburbs = data
      })
  }

  regionChange = () => {
    this.getCities(this.contact.location.region)
    this.contact.location.suburb = ''
  }

  cityChange = () => {
    this.getSuburbs(this.contact.location.city)
  }

  updateContact() {
    this.apiService.updateContact(this.contact, this.id)
      .subscribe((data: any) => console.log('Success'))
    this.router.navigateByUrl('/')
  }

}
