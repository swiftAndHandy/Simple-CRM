import { ContactInterface } from "../interfaces/contact.interface";

export class Contact {

    name = {
        first: '',
        last: '',
    };
    mail: string;
    birthdate: number | '';
    address: {
        street: string,
        zip: number | '',
        city: string
    } = {
            street: '',
            zip: 0,
            city: ''
        }

    constructor(contact?: ContactInterface) {
        this.name.first = contact?.name.first ? contact.name.first : '';
        this.name.last = contact?.name.last ? contact.name.last : '';
        this.birthdate = contact?.birthdate ? contact.birthdate : '';
        this.address.street = contact?.address.street ? contact.address.street : '';
        this.address.zip = contact?.address.zip ? contact.address.zip : '';
        this.address.city = contact?.address.city ? contact.address.city : '';
        this.mail = contact?.mail ? contact.mail : '';
    }

    public toJson() {
        return {
            name: {
                first: this.name.first,
                last: this.name.last,
            },
            mail: this.mail,
            birthdate: this.birthdate,
            address: {
                street: this.address.street,
                zip: this.address.zip,
                city: this.address.city
            }
        }
    }
}