import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddUserComponent } from './dialogs/add-user/add-user.component';
// import { Contact } from '../models/contact.class';



@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatIcon, MatTooltipModule, MatDialogModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  // contact: Contact = new Contact();

  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(AddUserComponent);
  }

}
