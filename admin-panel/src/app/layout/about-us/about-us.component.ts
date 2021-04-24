import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  loginForm: FormGroup;
  _id:any;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

    public tools: object = {
    items: [
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
      'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|', 'CreateLink','CreateTable',
      'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen'
    ]
  };

  loginError = '';

  ngOnInit() {
    this.buildForm();
    this.authService.retrieveBySlug('about_us', 'about_us').subscribe((res) => {
      if(res && res['data'] && res['data']['_id']){
        this._id = res['data']['_id'];
        this.loginForm.patchValue({
          content: res['data']['content'],
          mission: res['data']['mission'],
          vision: res['data']['vision'],
          purpose: res['data']['purpose']
        });
      }
    });
  }

  buildForm() {
    this.loginForm = this.fb.group({
      content: ['', [Validators.required]],
      mission: ['', [Validators.required]],
      vision: ['', [Validators.required]],
      purpose: ['', [Validators.required]]
    });
  }
  get f() {
    return this.loginForm.value;
  }

  onLogin() {
    const obj = {
      content : this.loginForm.controls.content.value,
      mission : this.loginForm.controls.mission.value,
      vision : this.loginForm.controls.vision.value,
      purpose : this.loginForm.controls.purpose.value,
      slug: 'about_us'
    }
    if(this._id){
      this.authService.update(obj, 'about_us', this._id).subscribe((res) => {
        if (res['data']) {
          this.loginError = '';
          this.router.navigate(['/dashboard']);
        } else {
          this.loginError = res['message'];
        }
      });
    } else {
      this.authService.create(obj, 'about_us').subscribe((res) => {
        if (res['_id']) {
          this.loginError = '';
          this.router.navigate(['/dashboard']);
        } else {
          this.loginError = res['message'];
        }
      });
    }
  }
}