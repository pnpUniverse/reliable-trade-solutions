import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
const { fileLocation } = environment;

@Component({
  selector: 'app-track-records',
  templateUrl: './track-records.component.html',
  styleUrls: ['./track-records.component.scss']
})
export class TrackRecordsComponent implements OnInit {
	loginForm: FormGroup;
	loginError = '';
	files : any;
	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
  	private router: Router
 	) { }

	ngOnInit() {
		this.loginForm = this.fb.group({
    	file: ['', [Validators.required]]
    });
	}

	onFileChange(event) {
  	if (event.target.files && event.target.files[0]) {
    	this.files = [];
    	var filesAmount = event.target.files.length;
  		for (let i = 0; i < filesAmount; i++) {
    		this.files.push(event.target.files[i]);
  		}
  	}
	}

	onLogin() {
  	const formData = new FormData();
  	if(this.files) this.files.forEach(file => formData.append('file', file))
  	console.log('files: ', this.files);
  	this.authService.fileUploadApi('upload_tracksheet', formData).subscribe((res) => {
  		if (res['status']) {
    		this.loginError = '';
    		this.router.navigate(['/dashboard']);
  		} else {
    		this.loginError = res['message'];
  		}
  	});
	}
}
