import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddContactComponent } from './dialogs/add-contact/add-contact.component';
import { MatCardModule } from '@angular/material/card';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { ContactInterface } from '../interfaces/contact.interface';
import { RouterModule } from '@angular/router';





@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatIcon, MatTooltipModule, MatDialogModule, MatCardModule, RouterModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class UserComponent {
  readonly dialog = inject(MatDialog);
  firestore: Firestore = inject(Firestore);

  contacts: ContactInterface[] = [];
  unsubContacts = this.subContacts();

  openDialog() {
    this.dialog.open(AddContactComponent);
  }

  subContacts() {
    return onSnapshot(collection(this.firestore, 'contacts'), (contacts) => {
      this.contacts = [];
      contacts.forEach(contact => {
        this.contacts.push(this.contactObject(contact));
      });
    });
  }

  contactObject(obj: any): ContactInterface {
    const contact = obj.data();
    return {
      id: obj.id,
      name: {
        first: contact.name.first,
        last: contact.name.last
      },
      mail: contact.mail,
      birthdate: contact.birthdate,
      address: {
        street: contact.address.street,
        zip: contact.address.zip,
        city: contact.address.city
      }
    }
  }

}
