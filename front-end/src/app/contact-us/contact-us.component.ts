import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toaster: Toaster,
    public sanitizer: DomSanitizer
  ) { }

  contact_us_content: any;
  url: any;
  urlSafe: SafeResourceUrl;

  profileForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });  
  ngOnInit(): void {
  	this.authService.retrieveBySlug('contact_us_content', 'contact_us_content').subscribe((res) => {
      if(res && res['data'] && res['data']['_id']){
        this.contact_us_content = res['data'];
        this.url = `https://maps.google.com/maps?q=${this.contact_us_content.lat},${this.contact_us_content.lng}&hl=es;z=14&output=embed`;
        this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      }
    });
  }

  onSubmit() {
  // TODO: Use EventEmitter with form value
    this.authService.create(this.profileForm.value, 'contact_us_mail').subscribe((res) => {
      if (res) {
        this.toaster.open({
          text: 'Our Representative will get back to you soon !!',
          caption: 'Contact Us Notification',
          type: 'success',
        });
        this.profileForm.reset();
      }
    });
  }
}
