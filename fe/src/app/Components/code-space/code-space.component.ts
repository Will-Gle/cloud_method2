import { Component, OnInit } from '@angular/core';
import { MonacoEditorModule } from 'ngx-monaco-editor';

@Component({
  selector: 'app-code-space',
  standalone: true,
  imports: [MonacoEditorModule],
  templateUrl: './code-space.component.html',
  styleUrls: ['./code-space.component.scss'],
})
export class CodeSpaceComponent {
  editorOptions = { theme: 'vs-dark', language: 'javascript' };
  code: string = 'console.log("Hello World")';
}
