import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router, RouterModule } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { AuthAction } from '../../store/auth/auth.action';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthState } from '../../store/auth/auth.state';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NzIconModule,
    RouterModule,
    NzFormModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  imagePath = '/sample-bg.png';
  tempAvt = '/temp-avt.jpeg'; // Path to public file in the `assets` folder
  registerForm: FormGroup;
  status$: Observable<boolean>;
  private destroy$ = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _store: Store,
    private _router: Router,
    private _msg: NzMessageService,
  ) {
    this.registerForm = this._fb.group(
      {
        username: ['', Validators.required],
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
        password: ['', [Validators.required, this.passwordStrengthValidator]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.confirmPasswordValidator },
    );

    this.status$ = this._store.select(AuthState.RegisterStatus);
    this.status$.pipe(takeUntil(this.destroy$)).subscribe((status) => {
      if (status === true) {
        this._msg.success('Register successfully');
        this._router.navigate(['/auth']);
      }
    });
  }

  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password && confirmPassword && password === confirmPassword
      ? null
      : { passwordMismatch: true };
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
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

  async getFileFromPublicAssets(url: string, fileName: string): Promise<File> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch the image from public assets');
      }

      const blob = await response.blob();
      return new File([blob], fileName, { type: blob.type });
    } catch (error) {
      console.error('Error fetching the file:', error);
      throw error;
    }
  }

  async onRegister() {
    if (this.registerForm.invalid) {
      this._msg.error('Please ensure the form is filled correctly');
      return;
    }

    try {
      // Ensure `tempAvt` is fetched as a file
      const avatarFile = await this.getFileFromPublicAssets(
        this.tempAvt,
        'temp-avt.jpeg',
      );
      if (avatarFile) {
        const formData = new FormData();
        let user = {
          username: this.registerForm.get('username')?.value,
          email: this.registerForm.get('email')?.value,
          password: this.registerForm.get('password')?.value,
          nameTag: this.registerForm.get('username')?.value,
        };
        let userPayload = new Blob([JSON.stringify(user)], {
          type: 'application/json',
        });
        formData.append('user', userPayload);
        formData.append('file', avatarFile);
        console.log('asd');

        // Dispatch the FormData payload
        this._store.dispatch(new AuthAction.Register(formData));
      }
    } catch (error) {
      this._msg.error('Failed to load default avatar');
      console.error('Error in registration process:', error);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
