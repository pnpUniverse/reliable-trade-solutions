import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
const { fileLocation } = environment;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  loginForm: FormGroup;
  images = [];
  _id: any;
  deletedImages = [];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  loginError = '';
  files : any;
  filesrc = [];
  server_images=[];

  ngOnInit() {
    this.buildForm();
    this.authService.retrieveBySlug('home', 'home').subscribe((res) => {
      if(res && res['data'] && res['data']['_id']){
        this._id = res['data']['_id'];
        if(res['data']['banner_image_path'] && res['data']['banner_image_path'].length){
          for(let srcs of res['data']['banner_image_path']){
            this.server_images.push({imageName: srcs, serverPath: `${fileLocation}${srcs}`})
          }
          this.loginForm.patchValue({
            name: res['data']['name'],
            our_vision: res['data']['our_vision'],
            banner_message: res['data']['banner_message'],
            fileSource: res['data']['banner_image_path']
          });
        } else {
          this.loginForm.patchValue({
            name: res['data']['name'],
            our_vision: res['data']['our_vision'],
            banner_message: res['data']['banner_message']
          });
        }
      }
    });
  }

  deleteServerImage(url: any, i): void {
    if(this.server_images[i]){
      this.deletedImages.push(url);
      this.server_images.splice(i, 1);
    }
  }

  deleteImage(url: any, i): void {
    if(this.images[i]){
      this.images.splice(i, 1);
      this.files.splice(i, 1);
    }
  }

  buildForm() {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required]],
      our_vision: ['', [Validators.required]],
      banner_message: ['', [Validators.required]],
      file: [''],
      fileSource: ['']
    });
  }
  get f() {
    return this.loginForm.value;
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      this.files = [];
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event:any) => {
          this.images.push(event.target.result);
          this.loginForm.patchValue({
            fileSource: this.images
          });
        }
        this.files.push(event.target.files[i]);
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  onLogin() {
    const formData = new FormData();
    ['name', 'our_vision', 'banner_message'].map(d => formData.append(d, this.loginForm.value[d]));
    if(this.files) this.files.forEach(file => formData.append('file', file))
    if(this._id) {
      formData.append('_id', this._id);
      if(this.deletedImages){
        formData.append('deletable_images', JSON.stringify(this.deletedImages));
      }

      if(this.deletedImages){
        formData.append('existing_images', JSON.stringify(this.server_images));
      }
    }
    this.authService.fileUploadApi('landing_page', formData).subscribe((res) => {
      if (res['status']) {
        this.loginError = '';
        this._id =  res['_id'];
        this.router.navigate(['/dashboard']);
      } else {
        this.loginError = res['message'];
      }
    });
  }
}
