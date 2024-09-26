import { ContactInterface } from "../interfaces/contact";

export class Contact {

    name = {
        first: '',
        last: '',
    };
    birthdate: number | undefined;
    address: {
        street: string,
        zip: number | undefined,
        city: string
    } = {
        street: '',
        zip: 0,
        city: ''
    }

    constructor(contact?: ContactInterface) {
        this.name.first = contact?.name.first ? contact.name.first : '';
        this.name.last = contact?.name.last ? contact.name.last : '';
        this.birthdate = contact?.birthdate ? contact.birthdate : undefined;
        this.address.street = contact?.address.street ? contact.address.street : '';
        this.address.zip = contact?.address.zip ? contact.address.zip : undefined;
        this.address.city = contact?.address.city ? contact.address.city : '';
    }
}