import { Component, OnInit, ViewChild, TemplateRef,  AfterViewInit  } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('mymodal') mymodal : TemplateRef<any>;
  payPalConfig?: IPayPalConfig;
  title = 'reliable-trade-solutions';
  collapse: boolean = true;
  selectedIndex: any = null;
  selectedIndexBottom: any = null;
  loginForm: FormGroup;
  loginError: any;
  myRoutes = [
    {
      name : 'Home',
      url: '/'
    },
    {
      name : 'About US',
      url: '/about-us'
    },
    {
      name : 'Services',
      url: '/services'
    },
    {
      name : 'Membership',
      url: '/membership'
    },
    {
      name : 'Performance',
      url: '/performance'
    },
    {
      name : 'Contact US',
      url: '/contact-us'
    }
  ]

  myRoutesBottom = [
    {
      name : 'Home',
      url: '/'
    },
    {
      name : 'About US',
      url: '/about-us'
    },
    {
      name : 'Services',
      url: '/services'
    },
    {
      name : 'Membership',
      url: '/membership'
    },
    {
      name : 'Performance',
      url: '/performance'
    },
    {
      name : 'Contact US',
      url: '/contact-us'
    },
    {
      name : 'Privacy Policy',
      url: '/privacy_policy'
    },
    {
      name : 'Terms & Condition',
      url: '/terms_and_condition'
    },
    {
      name : 'Disclaimer',
      url: '/disclaimer'
    },
    {
      name : 'Refund Policy',
      url: '/refund_policy'
    }
  ]
  services:any;
  contact_us_content: any;
  closeResult: string;
  showSuccess:any;
  currency:any = 'SGD';
  constructor(
    private router: Router,
    private authService: AuthService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toaster: Toaster
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        const resultBottom = this.myRoutesBottom.findIndex(function(object) {
          return object.url == val.url;
        });
        if(resultBottom > -1) {
          this.selectedIndexBottom = resultBottom; 
        }
        const result = this.myRoutes.findIndex(function(object) {
          return object.url == val.url;
        });
        if(result > -1) {
          this.selectedIndex = result; 
        }
        window.scrollTo(0, 0);
      }
    });
    this.authService.retrieve('services').subscribe((res) => {
      if(res && res['data'] && res['data']){
        this.services = res['data'];
      }
    });

    this.authService.retrieveBySlug('contact_us_content', 'contact_us_content').subscribe((res) => {
      if(res && res['data'] && res['data']['_id']){
        this.contact_us_content = res['data'];
      }
    });
    this.buildForm();
    this.initConfig('USD');
  }

  ngAfterViewInit() {
    // this.open(this.mymodal);
  }

  changeCurrency(currency){
    this.currency = currency;
    this.initConfig(currency);
  }

  initConfig(currency): void {
    this.payPalConfig = {
      currency: this.currency,
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: this.currency,
              value: '9.99',
              breakdown: {
                item_total: {
                  currency_code: this.currency,
                  value: '9.99'
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: this.currency,
                  value: '9.99',
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  buildForm() {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required]],
      service: ['', [Validators.required]]
    });
  }

  get f() {
    return this.loginForm.value;
  }

  loginUser() {
    // const formData = new FormData();
    // const obj = {
    //   name 
    // }
    // ['name', 'mobile', 'email', 'service'].map(d => formData.append(d, this.f[d]));

    this.authService.create(this.loginForm.value, 'free_trial_request').subscribe((res) => {
      if (res) {
        this.toaster.open({
          text: 'Our Representative will get back to you soon !!',
          caption: 'Free Trial Request Notification',
          type: 'success',
        });
        this.loginForm.reset();
        this.loginForm.patchValue({
          service: ''
        })
      }
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  setIndex(index: number) {
    this.selectedIndex = index;
  }

  setIndexBottom(index: number) {
    this.selectedIndexBottom = index;
  }
}
