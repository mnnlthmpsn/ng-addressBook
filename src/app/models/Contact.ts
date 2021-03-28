import { Location } from "./location"

export class Contact {
    firstname: string
    lastname: string
    phone: string
    location: Location

    constructor(firstname: string, lastname: string, phone: string, location: Location) {
        this.firstname = firstname
        this.lastname = lastname
        this.phone = phone
        this.location = location
    }
}