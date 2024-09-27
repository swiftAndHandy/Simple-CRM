import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { DetailViewComponent } from './contact/detail-view/detail-view.component';

export const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'user', component: ContactComponent},
    {path: 'user/:id', component: DetailViewComponent}
];
