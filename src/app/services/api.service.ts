import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getRegions = () => {
    return this.http.get(`${this.url}/regions`)
  }

  getContacts = () => {
    return this.http.get(`${this.url}/contacts`)
  }

  getCities = (id: any) => {
    return this.http.get(`${this.url}/${id}/cities`)
  }

  getSuburbs = (id: any) => {
    return this.http.get(`${this.url}/${id}/suburbs`)
  }

  getContact = (id: any) => {
    return this.http.get(`${this.url}/contact/${id}`)
  }

  addContact = (contact: Contact) => {
    return this.http.post(`${this.url}/contact`, {
      firstname: contact.firstname,
      lastname: contact.lastname,
      phone: contact.phone,
      regionId: contact.location.region,
      cityId: contact.location.city,
      suburbId: contact.location.suburb
    })
  }

  updateContact = (contact: Contact, id:any) => {
    return this.http.put(`${this.url}/contact/update/${id}`, {
      firstname: contact.firstname,
      lastname: contact.lastname,
      phone: contact.phone,
      regionId: contact.location.region,
      cityId: contact.location.city,
      suburbId: contact.location.suburb
    })
  }

  deleteContact = (id: any) => {
    return this.http.delete(`${this.url}/contact/delete/${id}`)
  }

}
