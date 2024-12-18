import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Inject,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { select, Store } from '@ngxs/store';
import { BlogAction } from '../../../store/blog/blog.action';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  Heading,
  Font,
  Code,
  CodeBlock,
  BlockQuote,
  Table,
  Alignment,
  Link,
  ImageUpload,
  EditorConfig,
  MediaEmbed,
  Image,
  ImageInsert,
  SimpleUploadAdapter,
} from 'ckeditor5';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Blog, BlogState, Status } from '../../../store/blog/blog.state';
import { Tags, TagsState } from '../../../store/tags/tags.state';
import { TagsAction } from '../../../store/tags/tags.actions';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CreateTagComponent } from '../../create-tag/create-tag.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CategoryState } from '../../../store/category/category.state';
import { CategorysAction } from '../../../store/category/category.actions';
import { environment } from '../../../../environments/environment.development';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [
    NzUploadModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    CommonModule,
    ReactiveFormsModule,
    CKEditorModule,
    NzModalModule,
    CreateTagComponent,
    NzSpinModule,
    NzIconModule,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.scss',
})
export class CreateBlogComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() tagForm: FormGroup;
  @Input() existingBlog?: Blog;
  title: string = '';
  content: string = '';
  tags: string[] = [];
  categories: string[] = [];
  uploadedFiles: any[] = [];
  blog: any;
  form: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  isModalVisible = false;
  isLoading = false;
  private apiUrl = environment.apiUrl;
  status$: Observable<Status>;
  tagStatus$: Observable<boolean>;
  tags$: Observable<any>;
  categories$: Observable<any>;
  private destroy$ = new Subject<void>();
  token = inject(ApiService).auth.getToken();
  editor = ClassicEditor;

  editorConfig: EditorConfig = {
    plugins: [
      Bold,
      Essentials,
      Italic,
      Mention,
      Paragraph,
      Undo,
      Heading,
      Font,
      Code,
      CodeBlock,
      BlockQuote,
      Table,
      Alignment,
      Link,
      MediaEmbed,
      Image,
      ImageInsert,
      ImageUpload,
      SimpleUploadAdapter,
    ],
    toolbar: [
      'fontSize',
      'fontFamily',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'bold',
      'italic',
      '|',
      'link',
      'blockQuote',
      'code',

      '|',
      'mediaEmbed',
      'insertImage',
      '|',
      'alignment',
    ],
    simpleUpload: {
      uploadUrl: `https://www.yourrlove.com/blogs/images/upload`, // Backend endpoint to handle image uploads
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    },
    mediaEmbed: {
      previewsInData: true,
    },
  };

  onClose() {
    this.close.emit();
  }
  constructor(
    private msg: NzMessageService,
    private store: Store,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: [[], Validators.required],
      category: [[''], Validators.required],
      file: [null],
    });

    this.tagForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.status$ = this.store.select(BlogState.status);
    this.tagStatus$ = this.store.select(TagsState.status);
    this.tags$ = this.store.select(TagsState.tags);
    this.categories$ = this.store.select(CategoryState.categories);

    this.status$.pipe(takeUntil(this.destroy$)).subscribe((response) => {
      if (response.status === true) {
        this.isLoading = false;
        this.msg.success('Blog created successfully');
        this.onClose();
      }
      if (response.code !== 200 && response.status === false) {
        this.isLoading = false;
      }
    });
    this.tagStatus$.pipe(takeUntil(this.destroy$)).subscribe((response) => {
      if (response === true) {
        this.store.dispatch(new TagsAction.GetTags());
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new TagsAction.GetTags());
    this.store.dispatch(new CategorysAction.GetCategory());

    if (this.existingBlog) {
      let tagsPatch: string[] = [];

      this.existingBlog.tags.forEach((tag: { name: string }) => {
        tagsPatch.push(tag.name);
      });

      this.form.patchValue({
        title: this.existingBlog.title,
        content: this.existingBlog.content,
        tags: tagsPatch,
        category: this.existingBlog.category.title,
        file: this.existingBlog.thumbnail,
      });
      this.imagePreview = this.existingBlog.thumbnail;
      this.cdr.detectChanges();
    }
  }

  onSubmit() {
    if (this.isLoading === true) {
      return;
    }
    console.log(this.form.value);
    this.isLoading = true;
    const formData = new FormData();
    this.blog = {
      title: this.form.value.title,
      content: this.form.value.content,
      tags: this.form.value.tags,
      categoryName: this.form.value.category,
    };

    let blogdata = new Blob([JSON.stringify(this.blog)], {
      type: 'application/json',
    });

    formData.append('blog', blogdata);
    formData.append('file', this.uploadedFiles[0]);

    if (this.existingBlog) {
      this.store.dispatch(
        new BlogAction.UpdateBlog(this.existingBlog.id, formData),
      );
    } else {
      this.store.dispatch(new BlogAction.CreateBlog(formData));
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const fileUpload = input.files[0];
      if (fileUpload.size > 1 * 1024 * 1024) {
        this.msg.error('File size should not exceed 1MB');
        return;
      }
      this.uploadedFiles = Array.from(input.files);
      this.form.patchValue({ file: this.uploadedFiles[0].name });
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string | ArrayBuffer | null; // Store the image data URL for preview
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  openCreateTag() {
    this.isModalVisible = true;
  }
  handleTagCreation(form: any): void {
    this.isModalVisible = false;
    this.store.dispatch(new TagsAction.CreateTag(form));
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }
  onReady(editor: any) {
    const toolbarContainer = document.querySelector('#toolbar-container');
    if (toolbarContainer) {
      toolbarContainer.appendChild(editor.ui.view.toolbar.element);
    }
  }

  onChange(event: any) {
    const editorData = event.editor.getData();
    console.log('Editor content:', editorData);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
