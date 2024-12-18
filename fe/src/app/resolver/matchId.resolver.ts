import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserIdMatchResolver implements Resolve<boolean> {
  constructor(private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userId = localStorage.getItem('nameTag'); // Get userId from local storage
    const idFromRoute = route.paramMap.get('nametag'); // Get id from route parameters
    if (userId && idFromRoute === userId) {
      this.router.navigate(['/profile']);
      return false;
    } else {
      return true;
    }
  }
}
