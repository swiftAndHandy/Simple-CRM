import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, doc } from '@angular/fire/firestore';
import { ContactInterface } from '../../../interfaces/contact.interface';
import { updateDoc } from 'firebase/firestore';


@Component({
  selector: 'app-edit-contact',
  standalone: true,
  providers: provideNativeDateAdapter(),
  imports: [MatDialogModule, MatButton, MatInputModule, MatFormFieldModule, FormsModule, MatDatepickerModule, MatProgressSpinnerModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditContactComponent {
  firestore: Firestore = inject(Firestore);
  dialog: MatDialogRef<EditContactComponent> = inject(MatDialogRef);
  loading: boolean = false;
  contact!: ContactInterface;
  birthdate: any;
  id: string = '';

  ngOnInit() {
    if (this.contact) {
      this.birthdate = new Date(this.contact.birthdate as number);
    } else {
      this.contact = {
        name: {
          first: '',
          last: ''
        },
        birthdate: new Date().getDate(),
        address: {
          street: '',
          zip: undefined,
          city: ''
        }
      }
    }
  }


saveContact() {
  this.loading = true;
  this.dialog.close();
  const ref = doc(collection(this.firestore, 'contacts'), this.id);
  updateDoc(ref, this.contact as object);

}
}
