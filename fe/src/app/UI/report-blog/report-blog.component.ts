import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import jQuery from 'jquery';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-report-blog',
  standalone: true,
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    NzSelectModule,
    CommonModule,
    NzInputModule,
  ],
  templateUrl: './report-blog.component.html',
  styleUrl: './report-blog.component.scss',
})
export class ReportBlogComponent {
  @Input() form = new FormGroup<any>({});
  reportReason = [
    { label: 'Spam', value: 'SPAM' },
    { label: 'Offensive', value: 'OFFENSIVE' },
    { label: 'Incorrect', value: 'INCORRECT' },
    { label: 'Other', value: 'OTHER' },
  ];

  constructor(private msg: NzMessageService) {}
  onSubmit() {
    const userInput = jQuery('#user-input').val();
    jQuery('#output').html(userInput);
    this.msg.success('Report submitted');
    this.form.reset();
  }
}
