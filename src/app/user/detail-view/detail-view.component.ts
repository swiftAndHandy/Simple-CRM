import { Component, inject } from '@angular/core';
import { collection, doc, DocumentData, Firestore, onSnapshot } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { ContactInterface } from '../../interfaces/contact.interface';




@Component({
  selector: 'app-detail-view',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './detail-view.component.html',
  styleUrl: './detail-view.component.scss'
})
export class DetailViewComponent {
  private activatedRoute = inject(ActivatedRoute);
  private firestore = inject(Firestore)

  contactSnapshot: any;
  contactInfo!: ContactInterface;

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];

    this.contactSnapshot = onSnapshot(doc(collection(this.firestore, 'contacts'), id), contact => {
      this.contactInfo = this.setContactInfo(contact.data()) ;
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
}
