import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';

import { FormsModule } from '@angular/forms';
import { Contact } from '../../../models/contact.class';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';


@Component({
  selector: 'app-add-user',
  standalone: true,
  providers: provideNativeDateAdapter(),
  imports: [MatDialogModule, MatButton, MatInputModule, MatFormFieldModule, FormsModule, MatDatepickerModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  firestore: Firestore = inject(Firestore);
  contact: Contact = new Contact();
  birthdate: Date | undefined;

  saveContact() {
    this.contact.birthdate = this.birthdate?.getTime();
    const col = collection(this.firestore, 'contacts');
    try {
      addDoc(col, { 
        'firstname': this.contact.name.first, 
        'lastname': this.contact.name.last, 
        'birthdate': this.contact.birthdate, 
        'street': this.contact.address.street, 
        'zipcode': this.contact.address.zip, 
        'city': this.contact.address.city, 
      })
    } catch (error) {

    }

  }

}
