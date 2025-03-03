import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-contact',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    FormsModule,
    MatProgressSpinner,
  ],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss',
})
export class AddContactComponent {
  apiService = inject(ApiService);
  router = inject(Router);
  name = signal('');
  email = signal('');
  phone = signal('');

  saving = signal(false);

  async onSave() {
    this.saving.set(true);
    await this.apiService.addContact({
      id: '',
      name: this.name(),
      email: this.email(),
      phone: this.phone(),
    });
    this.saving.set(false);
    this.router.navigate(['/']);
  }
}
