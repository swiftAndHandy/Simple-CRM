import { Component, inject } from '@angular/core';
import { collection, doc, DocumentData, Firestore, onSnapshot } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { ContactInterface } from '../../interfaces/contact.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../dialogs/edit/edit.component';


@Component({
  selector: 'app-detail-view',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './detail-view.component.html',
  styleUrl: './detail-view.component.scss'
})
export class DetailViewComponent {


  readonly dialog = inject(MatDialog);
  private activatedRoute = inject(ActivatedRoute);
  private firestore = inject(Firestore)

  contactSnapshot: any;
  contactInfo!: ContactInterface;

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];

    this.contactSnapshot = onSnapshot(doc(collection(this.firestore, 'contacts'), id), contact => {
      this.contactInfo = this.setContactInfo(contact.data());
    });

  }

  ngOnDestroy() {
    this.contactSnapshot();
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

  editMenu(){
    setTimeout(() => {
      const dialog = this.dialog.open(EditComponent);
      dialog.componentInstance.contact = this.contactInfo;
    }, 10);
  }

}
