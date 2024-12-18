import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { CategorysAction } from '../../store/category/category.actions';
import { Observable } from 'rxjs';
import { CategoryState } from '../../store/category/category.state';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  categories$: Observable<any>;
  selectCategory(cate: any) {
    this.router.navigate(['/blog/discover', cate.title, cate.id]);
    this.store.dispatch(new CategorysAction.GetBlogByCategory(cate.id));
  }
  constructor(
    private store: Store,
    private router: Router,
  ) {
    this.categories$ = this.store.select(CategoryState.categories);
    this.store.dispatch(new CategorysAction.GetCategory());
  }
  // groups = [
  //   {
  //     name: 'Group 1',
  //   },
  //   {
  //     name: 'Group 2',
  //   },
  //   {
  //     name: 'Group 3',
  //   },
  //   {
  //     name: 'Group 4',
  //   },
  // ];
}
