import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit',
  standalone: true,
  providers: provideNativeDateAdapter(),
  imports: [MatDialogModule, MatFormFieldModule, FormsModule, MatProgressSpinnerModule, MatDatepickerModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  dialog: MatDialogRef<EditComponent> = inject(MatDialogRef);
  contact: any;
  loading: boolean = false;
  birthdate: Date | undefined;


  saveContact() {

  }

}
