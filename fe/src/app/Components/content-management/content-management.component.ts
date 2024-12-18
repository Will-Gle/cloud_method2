import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CreateTagComponent } from '../../UI/create-tag/create-tag.component';
import { TagsAction } from '../../store/tags/tags.actions';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Tags, TagsState } from '../../store/tags/tags.state';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Category, CategoryState } from '../../store/category/category.state';
import { CategorysAction } from '../../store/category/category.actions';
import { CreateCategoryComponent } from '../../UI/create-category/create-category.component';

@Component({
  selector: 'app-content-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzModalModule,
    CreateTagComponent,
    CreateCategoryComponent,
  ],
  templateUrl: './content-management.component.html',
  styleUrl: './content-management.component.scss',
})
export class ContentManagementComponent {
  isTagModalVisible = false;
  isCategoryModalVisible = false;
  tagForm: FormGroup;
  categoryForm: FormGroup;
  tags$: Observable<Tags[]>;
  tagStatus$: Observable<boolean>;
  categoryStatus$: Observable<boolean>;
  destroy$: Subject<void> = new Subject<void>();
  tagList$: Observable<Tags[]>;
  categoryList$: Observable<Category[]>;
  categoryList: Category[] = [];
  tagList: Tags[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private msg: NzMessageService,
  ) {
    this.tagForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.categoryForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });

    this.tagList$ = this.store.select(TagsState.tags);
    this.tagStatus$ = this.store.select(TagsState.status);
    this.categoryList$ = this.store.select(CategoryState.categories);
    this.categoryStatus$ = this.store.select(CategoryState.status);
    this.tags$ = this.store.select(TagsState.tags);

    this.store.dispatch(new TagsAction.GetTags());
    this.store.dispatch(new CategorysAction.GetCategory());

    this.tagStatus$.pipe(takeUntil(this.destroy$)).subscribe((response) => {
      if (response === true) {
        this.msg.success('Tag created successfully');
        this.tagForm.reset();
        this.store.dispatch(new TagsAction.GetTags());
      }
    });

    this.categoryStatus$
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        if (response === true) {
          this.msg.success('Category created successfully');
          this.categoryForm.reset();
          this.store.dispatch(new CategorysAction.GetCategory());
        }
      });

    this.tagList$.subscribe((tag) => {
      this.tagList = tag;
    });

    this.categoryList$.subscribe((category) => {
      this.categoryList = category;
    });
  }

  openCreateTag() {
    this.isTagModalVisible = true;
  }

  openCreateCategory() {
    this.isCategoryModalVisible = true;
  }

  handleTagCreation(form: any): void {
    this.isTagModalVisible = false;
    this.store.dispatch(new TagsAction.CreateTag(form));
  }

  handleCategoryCreation(form: any): void {
    this.isCategoryModalVisible = false;
    this.store.dispatch(new CategorysAction.CreateCategory(form));
  }

  handleTagCancel(): void {
    this.isTagModalVisible = false;
  }

  handleCategoryCancel(): void {
    this.isCategoryModalVisible = false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
