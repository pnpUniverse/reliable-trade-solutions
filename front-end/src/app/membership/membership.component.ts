import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnInit {
	memberships:any;
	payPalConfig?: IPayPalConfig;
	showSuccess:any;
  	constructor(
		private authService: AuthService
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
					  	this[`payPalConfig_${serv.service_slug}`] = this.payPalConfig;
					  	this.initConfig_newService(serv.service_slug, serv.currency_used, serv.service_price);
				  	}
	        	}
	      	}
	  	});
	  	this.initConfig();
  	}

  	initConfig_newService(slug, currency, price): void {
  		this[`payPalConfig_${slug}`] = {
	      	currency: currency,
	      	clientId: 'sb',
	      	createOrderOnClient: (data) => <ICreateOrderRequest>{
		        intent: 'CAPTURE',
		        purchase_units: [
		          	{
		            	amount: {
		              		currency_code: currency,
		              		value: price,
		              		breakdown: {
		                		item_total: {
		                  			currency_code: currency,
		                  			value: price
		                		}
		              		}
		            	},
		            	items: [
		              		{
		                		name: 'Enterprise Subscription',
		                		quantity: '1',
		                		category: 'DIGITAL_GOODS',
		                		unit_amount: {
		                  		currency_code: currency,
		                  		value: price,
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

  	initConfig(): void {
	    this.payPalConfig = {
	      	currency: 'USD',
	      	clientId: 'sb',
	      	createOrderOnClient: (data) => <ICreateOrderRequest>{
		        intent: 'CAPTURE',
		        purchase_units: [
		          	{
		            	amount: {
		              		currency_code: 'USD',
		              		value: '100',
		              		breakdown: {
		                		item_total: {
		                  			currency_code: 'USD',
		                  			value: '100'
		                		}
		              		}
		            	},
		            	items: [
		              		{
		                		name: 'Enterprise Subscription',
		                		quantity: '1',
		                		category: 'DIGITAL_GOODS',
		                		unit_amount: {
		                  		currency_code: 'USD',
		                  		value: '100',
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
}
