import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddUserComponent } from './dialogs/add-user/add-user.component';
import { MatCardModule } from '@angular/material/card';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { ContactInterface } from '../interfaces/contact.interface';





@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatIcon, MatTooltipModule, MatDialogModule, MatCardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  readonly dialog = inject(MatDialog);
  firestore: Firestore = inject(Firestore);

  contacts: ContactInterface[] = [];
  unsubContacts = this.subContacts();

  openDialog() {
    this.dialog.open(AddUserComponent);
  }

  subContacts() {

    // return onSnapshot(collection(this.firestore, 'contacts'), (contacts) => {
    //   this.contacts = [];
    //   contacts.forEach(contact => {
    //     this.contacts.push(contact.data());
    //     this.contacts.forEach((contact) => console.log(contact));

    //   });
    // });

    return onSnapshot(collection(this.firestore, 'contacts'), (contacts) => {
      contacts.forEach(contact => {
        this.contacts.push(this.contactObject(contact.data()));
      });
    });

  }

  contactObject(obj: any): ContactInterface {
    return {
      'name': {
        first: obj.name.first,
        last: obj.name.last
      },
      mail: obj.mail,
      birthdate: obj.birthdate,
      address: {
        street: obj.address.street,
        zip: obj.address.zip,
        city: obj.address.city
      }
    }
  }

}
