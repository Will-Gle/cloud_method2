import { Component } from '@angular/core';
import { SideBarComponent } from '../../../UI/side-bar/side-bar.component';
import { SettingProfileComponent } from '../setting-profile/setting-profile.component';
import { SettingSecurityComponent } from '../setting-security/setting-security.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-setting-layout',
  standalone: true,
  imports: [
    SideBarComponent,
    NzMenuModule,
    CommonModule,
    RouterModule,
    NzIconModule,
  ],
  templateUrl: './setting-layout.component.html',
  styleUrl: './setting-layout.component.scss',
})
export class SettingLayoutComponent {
  constructor(private router: Router) {}
  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
