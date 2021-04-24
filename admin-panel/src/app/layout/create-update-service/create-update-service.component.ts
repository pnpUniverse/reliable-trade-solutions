import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-create-update-service',
  templateUrl: './create-update-service.component.html',
  styleUrls: ['./create-update-service.component.scss']
})
export class CreateUpdateServiceComponent implements OnInit {
  loginForm: FormGroup;
  ckeditorContent: string = '<p>Some html</p>';
  service_id: any;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _activatedRoute: ActivatedRoute
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
    if(this._activatedRoute.snapshot.params && this._activatedRoute.snapshot.params.service_id) {
      this.service_id = this._activatedRoute.snapshot.params.service_id
      this.authService.retrieveById('services', this.service_id).subscribe((res) => {
        if(res && res['data'] && res['data']['_id']){
          this.loginForm.patchValue({
            serviceName: res['data']['serviceName'],
            serviceDesc: res['data']['serviceDesc'],
            serviceServices: res['data']['serviceServices']
          });
        }
      });
    }
  }

  buildForm() {
    this.loginForm = this.fb.group({
      serviceName: ['', [Validators.required]],
      serviceDesc: ['', [Validators.required]],
      serviceServices: []
    });
  }
  get f() {
    return this.loginForm.value;
  }

  onLogin() {
    const obj = {
      serviceName : this.loginForm.controls.serviceName.value.toUpperCase(),
      service_slug : this.loginForm.controls.serviceName.value ? this.loginForm.controls.serviceName.value.replace(' ', '_').toLowerCase():'',
      serviceDesc : this.loginForm.controls.serviceDesc.value,
      serviceServices : this.loginForm.controls.serviceServices.value
    }

    if(this.service_id){
      this.authService.update(obj, 'services', this.service_id).subscribe((res) => {
        if (res && res['data'] && res['data']['_id']) {
          this.loginError = '';
          this.router.navigate(['/services']);
        } else {
          this.loginError = res['message'];
        }
      });
    } else {
      this.authService.create(obj, 'services').subscribe((res) => {
        if (res['_id']) {
          this.loginError = '';
          this.router.navigate(['/services']);
        } else {
          this.loginError = res['message'];
        }
      });
    }
  }
}
