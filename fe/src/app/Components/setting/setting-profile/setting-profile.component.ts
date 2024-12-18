import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Observable } from 'rxjs';
import { UserState } from '../../../store/user/user.state';
import { CommonModule } from '@angular/common';
import { UserAction } from '../../../store/user/user.action';

@Component({
  selector: 'app-setting-profile',
  standalone: true,
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzIconModule,
    CommonModule,
  ],
  templateUrl: './setting-profile.component.html',
  styleUrls: ['./setting-profile.component.scss'],
})
export class SettingProfileComponent {
  profileForm: FormGroup;
  userProfile$: Observable<any>; // Adjust type as needed
  selectedImage: any; // For image preview
  profilePicture: string = '';
  imagePreview: string | ArrayBuffer | null = null;
  isUploading: boolean = false;
  updateStatus$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    // this.profilePicture = localStorage.getItem('avatar') ?? '';
    this.updateStatus$ = this.store.select(UserState.updateStatus);
    this.profileForm = this.fb.group({
      username: [''],
      nameTag: [''],
      bio: [''],
    });
    this.store.dispatch(new UserAction.getMe());
    // Fetch user profile from state
    this.userProfile$ = this.store.select(UserState.user);
    // Patch the form with profile data
    this.userProfile$.subscribe((profile) => {
      if (profile) {
        this.profileForm.patchValue({
          username: profile.username,
          nameTag: profile.nameTag,
          bio: profile.bio,
        });
        this.selectedImage = profile.avatar;
      }
    });
    this.updateStatus$.subscribe((response) => {
      if (response) {
        this.isUploading = false;
      }
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedImage = file;

      this.profileForm.patchValue({ file: file.name });

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
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

  async onSubmit() {
    if (this.profileForm.valid) {
      this.isUploading = true;
      const formData = new FormData();
      const userProfile = {
        username: this.profileForm.value.username,
        nameTag: this.profileForm.value.nameTag,
        bio: this.profileForm.value.bio,
      };
      const userProfilePayload = new Blob([JSON.stringify(userProfile)], {
        type: 'application/json',
      });

      let avatarBlob: Blob;

      // Convert the selected image to a Blob if necessary
      if (this.selectedImage instanceof File) {
        avatarBlob = this.selectedImage; // File is already a Blob
      } else {
        const avatarFile = await this.getFileFromPublicAssets(
          this.selectedImage,
          'temp-avt.jpeg',
        );
        avatarBlob = avatarFile;
      }

      // Append the profile data and file blob to FormData
      formData.append('userProfile', userProfilePayload);
      formData.append(
        'file',
        avatarBlob,
        avatarBlob instanceof File ? avatarBlob.name : 'uploaded-image.jpeg',
      );

      this.store.dispatch(new UserAction.updateUser(formData));
    }
  }
}
