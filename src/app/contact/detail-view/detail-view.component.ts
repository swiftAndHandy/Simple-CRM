import { Component, inject } from '@angular/core';
import { collection, doc, Firestore, onSnapshot } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { ContactInterface } from '../../interfaces/contact.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { EditContactComponent } from '../dialogs/edit/edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Contact } from '../../models/contact.class';


@Component({
  selector: 'app-detail-view',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule, MatFormFieldModule],
  templateUrl: './detail-view.component.html',
  styleUrl: './detail-view.component.scss'
})
export class DetailViewComponent {


  readonly dialog = inject(MatDialog);
  private activatedRoute = inject(ActivatedRoute);
  private firestore = inject(Firestore)

  contactSnapshot: any;
  contactInfo!: ContactInterface;
  id: string = '';

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.contactSnapshot = onSnapshot(doc(collection(this.firestore, 'contacts'), this.id), contact => {
        this.contactInfo = this.setContactInfo(contact.data());
      });
    }
  }

  ngOnDestroy() {
    if (this.contactSnapshot) {
      this.contactSnapshot();
    }
  }

  setContactInfo(obj: any): ContactInterface {
    return {
      name: {
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

  editMenu() {
    setTimeout(() => {
      const dialog = this.dialog.open(EditContactComponent);
      dialog.componentInstance.contact = new Contact(this.contactInfo).toJson() as ContactInterface;
      dialog.componentInstance.id = this.id;
    }, 10);
  }

}
