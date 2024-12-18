import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputGroupComponent, NzInputModule } from 'ng-zorro-antd/input';
import { UserAction } from '../../../store/user/user.action';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-setting-security',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputGroupComponent,
    NzIconModule,
    NzInputModule,
    CommonModule,
  ],
  templateUrl: './setting-security.component.html',
  styleUrls: ['./setting-security.component.scss'],
})
export class SettingSecurityComponent {
  emailForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    // Email Form
    this.emailForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          ),
        ],
      ],
    });

    // Password Form
    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, this.strongPasswordValidator]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  // Strong Password Validator
  strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isValidLength = value.length >= 8;

    const passwordValid =
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar &&
      isValidLength;

    return passwordValid
      ? null
      : {
          weakPassword: true,
        };
  }

  // Password Match Validator
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  // Submit Email Form
  onChangeEmail() {
    if (this.emailForm.valid) {
      console.log('Email Updated:', this.emailForm.value);
    } else {
      console.error('Email form is invalid');
    }
  }

  // Submit Password Form
  onChangePassword() {
    if (this.passwordForm.valid) {
      const payload = {
        oldPassword: this.passwordForm.value.currentPassword,
        newPassword: this.passwordForm.value.newPassword,
      };
      this.store.dispatch(new UserAction.changePassword(payload));
    } else {
      console.error('Password form is invalid');
    }
  }
}
