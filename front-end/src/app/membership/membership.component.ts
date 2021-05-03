import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Router } from '@angular/router';
declare let paypal: any;

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnInit, AfterViewInit {
	memberships:any;
	usdPayPalConfig?: IPayPalConfig;
	sgdPayPalConfig?: IPayPalConfig;
	config?: IPayPalConfig;
	showSuccess:any;
	
	description: string = '';
	amount: string = '';
	descriptionError: any;
	priceError: any;
	invoiceid: any;
	invoiceidError: any;
	invoiceidDiv: any;

	showModal : boolean;
	UserId    : string;
	Firstname : string;
	Lastname  : string;
	Email     : string;
	service_obj: any;
  	constructor(
		private authService: AuthService,
		private router: Router
	) { }
  	ngOnInit(): void {
  		this.authService.retrieve('memberships').subscribe((res) => {
	      	if(res && res['data'] && res['data']){
	      		this.memberships = res['data'];
	        	for(let membershipIndex in this.memberships){
	        		this.memberships[membershipIndex]['service_name_slug'] = this.memberships[membershipIndex].service_name.toLowerCase().replace(' ', '_');
					this.memberships[membershipIndex]['service_monthly_slug'] = this.memberships[membershipIndex].service_name_slug + '_service_monthly_' + ( Number(membershipIndex) + 1 );
					this.memberships[membershipIndex]['service_quarterly_slug'] = this.memberships[membershipIndex].service_name_slug + '_service_quarterly_slug_' + ( Number(membershipIndex) + 2 );
					this.memberships[membershipIndex]['service_half_yearly_slug'] = this.memberships[membershipIndex].service_name_slug + '_service_half_yearly_slug_' + ( Number(membershipIndex) + 3 );
					this.memberships[membershipIndex]['service_yearly_slug'] = this.memberships[membershipIndex].service_name_slug + '_service_yearly_slug_' + ( Number(membershipIndex) + 4 );
	        		const service_monthly_obj = {
				  		service_tenure: 'Monthly Membership',
				  		service_price: this.memberships[membershipIndex].service_monthly,
				  		service_slug: this.memberships[membershipIndex].service_monthly_slug,
				  		currency_used: this.memberships[membershipIndex].currency_used
				  	}
				  	const service_quarterly_obj = {
				  		service_tenure: 'Quarterly Membership',
				  		service_price: this.memberships[membershipIndex].service_quarterly,
				  		service_slug: this.memberships[membershipIndex].service_quarterly_slug,
				  		currency_used: this.memberships[membershipIndex].currency_used
				  	}
				  	const service_half_yearly_obj = {
				  		service_tenure: 'Half Yearly Membership',
				  		service_price: this.memberships[membershipIndex].service_half_yearly,
				  		service_slug: this.memberships[membershipIndex].service_half_yearly_slug,
				  		currency_used: this.memberships[membershipIndex].currency_used
				  	}
				  	const service_yearly_obj = {
				  		service_tenure: 'Yearly Membership',
				  		service_price: this.memberships[membershipIndex].service_yearly,
				  		service_slug: this.memberships[membershipIndex].service_yearly_slug,
				  		currency_used: this.memberships[membershipIndex].currency_used
				  	}
				  	this.memberships[membershipIndex]['service_details_arr'] = [service_monthly_obj, service_quarterly_obj, service_half_yearly_obj, service_yearly_obj];
				  	for(let serv of this.memberships[membershipIndex]['service_details_arr']){
					  	// this[`payPalConfig_${serv.service_slug}`] = this.payPalConfig;
					  	// this.initConfig_newService(serv.service_slug, serv.currency_used, serv.service_price);
				  	}
	        	}
	      	}
	  	});
	  	// this.initConfig();
  	}

  	private loadExternalScript(scriptUrl: string) {
	    return new Promise((resolve, reject) => {
	    	console.log('url: ', scriptUrl);
	      	const scriptElement = document.createElement('script')
	      	scriptElement.src = scriptUrl
	      	scriptElement.onload = resolve
      		document.body.appendChild(scriptElement)
  		})
  	}

  	validate(event) {
      return event.value.length > 0;
    }

    handleModel(service_name, detail) {
    	this.service_obj = detail;
    	this.service_obj['service_name'] = service_name;
    	if(this.service_obj.currency_used == 'USD' ){
	  		this.usdPayPalConfig = {
		      	currency: this.service_obj.currency_used,
		      	clientId: 'AcgDMCAxYPlMVrqv4gbUt6cQMttDges-zEvKEkrFNKNs0YxotG2kkMSaozBaN0C4H0QQKtHrmO3pG3Ww',
		      	createOrderOnClient: (data) => <ICreateOrderRequest>{
			        intent: 'CAPTURE',
			        purchase_units: [
			          	{
			            	amount: {
			              		currency_code: this.service_obj.currency_used,
			              		value: this.service_obj.service_price,
			              		breakdown: {
			                		item_total: {
			                  			currency_code: this.service_obj.currency_used,
			                  			value: this.service_obj.service_price
			                		}
			              		}
			            	},
			            	items: [
			              		{
			                		name: 'Enterprise Subscription',
			                		quantity: '1',
			                		category: 'DIGITAL_GOODS',
			                		unit_amount: {
				                  		currency_code: this.service_obj.currency_used,
				                  		value: this.service_obj.service_price,
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
    	} else {
    		this.sgdPayPalConfig = {
		      	currency: 'SGD',
		      	clientId: 'AcgDMCAxYPlMVrqv4gbUt6cQMttDges-zEvKEkrFNKNs0YxotG2kkMSaozBaN0C4H0QQKtHrmO3pG3Ww',
		      	createOrderOnClient: (data) => <ICreateOrderRequest>{
			        intent: 'CAPTURE',
			        purchase_units: [
			          	{
			            	amount: {
			              		currency_code: 'SGD',
			              		value: this.service_obj.service_price,
			              		breakdown: {
			                		item_total: {
			                  			currency_code: 'SGD',
			                  			value: this.service_obj.service_price
			                		}
			              		}
			            	},
			            	items: [
			              		{
			                		name: 'Enterprise Subscription',
			                		quantity: '1',
			                		category: 'DIGITAL_GOODS',
			                		unit_amount: {
				                  		currency_code: 'SGD',
				                  		value: this.service_obj.service_price,
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
	    setTimeout(x => {
	    	this.showModal = true;
	    },200)
  	}
  	hide() {
    	this.showModal = false;
    	this.usdPayPalConfig = undefined;
    	this.sgdPayPalConfig =  undefined;
    	this.reloadComponent();
  	}

  	reloadComponent() {
  		let currentUrl = this.router.url;
      	this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      	this.router.onSameUrlNavigation = 'reload';
      	this.router.navigate([currentUrl]);
  	}

  	ngAfterViewInit(): void {
	}
}
