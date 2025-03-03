import {
  Component,
  computed,
  inject,
  input,
  Input,
  linkedSignal,
  OnInit,
  resource,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-edit-contact',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    FormsModule,
    MatProgressSpinner,
  ],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.scss',
})
export class EditContactComponent {
  apiService = inject(ApiService);
  router = inject(Router);

  id = input('');
  name = linkedSignal(() => this.contactResource.value()?.name ?? '');
  email = linkedSignal(() => this.contactResource.value()?.email ?? '');
  phone = linkedSignal(() => this.contactResource.value()?.phone ?? '');

  saving = signal(false);
  isLoading = computed(() => this.contactResource.isLoading() || this.saving())

  contactResource = resource({
    request: this.id,
    loader: ({ request: id }) => this.apiService.getContact(id),
  });

  async onSave() {
    this.saving.set(true);
    await this.apiService.updateContact({
      id: this.id(),
      name: this.name(),
      email: this.email(),
      phone: this.phone(),
    });
    this.saving.set(false);
    this.router.navigate(['/']);
  }
}
