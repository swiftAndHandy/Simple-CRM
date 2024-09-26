import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../../models/contact.class';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';


@Component({
  selector: 'app-add-user',
  standalone: true,
  providers: provideNativeDateAdapter(),
  imports: [MatDialogModule, MatButton, MatInputModule, MatFormFieldModule, FormsModule, MatDatepickerModule, MatProgressSpinnerModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  firestore: Firestore = inject(Firestore);
  dialog: MatDialogRef<AddUserComponent> = inject(MatDialogRef);
  loading: boolean = false;
  contact: Contact = new Contact();
  birthdate: Date | undefined;

  saveContact() {
    this.loading = true;
    this.contact.birthdate = this.birthdate?.getTime() ? this.birthdate.getTime() : '';
    const col = collection(this.firestore, 'contacts');
    try {
      addDoc(col, this.contact.toJason())
      this.dialog.close();
    } catch (error) {
      console.warn(error);
    }
  }

}
