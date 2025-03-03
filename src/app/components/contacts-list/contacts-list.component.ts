import {
  Component,
  computed,
  effect,
  inject,
  resource,
  signal,
} from '@angular/core';
import { Contact } from '../../model/contact';
import { MatListModule } from '@angular/material/list';
import { ApiService } from '../../services/api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contacts-list',
  imports: [
    MatListModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatSnackBarModule,
  ],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss',
})
export class ContactsListComponent {
  apiService = inject(ApiService);
  snackbar = inject(MatSnackBar);
  contactsResource = resource({
    loader: () => this.apiService.getContacts(),
  });
  deleting = signal(false);

  async deleteContact(contactId: string) {
    this.deleting.set(true);
    await this.apiService.deleteContact(contactId);
    this.deleting.set(false);
    this.contactsResource.reload();
  }

  isloading = computed(
    () => this.deleting() || this.contactsResource.isLoading()
  );

  showError = effect(() => {
    const error = this.contactsResource.error() as Error;
    if (error) {
      this.snackbar.open(error.message, 'Close');
    }
  });
}
