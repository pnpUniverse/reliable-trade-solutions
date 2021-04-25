import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
declare let paypal: any;

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnInit, AfterViewInit {
	memberships:any;
	payPalConfig?: IPayPalConfig;
	showSuccess:any;
	
	description: string = '';
	amount: string = '';
	descriptionError: any;
	priceError: any;
	invoiceid: any;
	invoiceidError: any;
	invoiceidDiv: any;
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

  	ngAfterViewInit(): void {
  		// this.description = document.querySelector('#smart-button-container #description');
	   //  this.amount = document.querySelector('#smart-button-container #amount');
	    this.descriptionError = document.querySelector('#smart-button-container #descriptionError');
	    this.priceError = document.querySelector('#smart-button-container #priceLabelError');
	    this.invoiceid = document.querySelector('#smart-button-container #invoiceid');
	    this.invoiceidError = document.querySelector('#smart-button-container #invoiceidError');
	    this.invoiceidDiv = document.querySelector('#smart-button-container #invoiceidDiv');
	    var elArr = [this.description, this.amount];

	    if (this.invoiceidDiv && this.invoiceidDiv.firstChild.innerHTML.length > 1) {
	      	this.invoiceidDiv.style.display = "block";
	    }

	    var purchase_units = [];
	    purchase_units[0] = {};
	    purchase_units[0].amount = {};

		console.log('paypal: ', this)
		paypal.Buttons({
	      	style: {
		        color: 'gold',
		        shape: 'rect',
		        label: 'pay',
		        layout: 'vertical',
	      	},
      		onInit: function (data, actions) {
        		actions.disable();
        		// if(this.invoiceidDiv && this.invoiceidDiv.style.display === "block") {
          // 			elArr.push(this.invoiceid);
        		// }
        		// elArr.forEach(function (item) {
          // 			item.addEventListener('keyup', function (event) {
          //   			var result = elArr.every(this.validate);
          //   			if (result) {
          //     				actions.enable();
          //   			} else {
          //     				actions.disable();
          //   			}
          // 			});
        		// });
      		},
      		onClick: function () {
      			// if(this.descriptionError){
	        // 		if (this.description && this.description.value.length < 1) {
	        //   			this.descriptionError.style.visibility = "visible";
	        // 		} else {
	        //   			this.descriptionError.style.visibility = "hidden";
	        // 		}
      			// }

      			if(this.priceError){
	        		if (this.amount && this.amount.value.length < 1) {
	          			this.priceError.style.visibility = "visible";
	        		} else {
	          			this.priceError.style.visibility = "hidden";
	        		}
      			}

      			// if(this.invoiceidError){
	        // 		if (this.invoiceid.value.length < 1 && this.invoiceidDiv.style.display === "block") {
	        //   			this.invoiceidError.style.visibility = "visible";
	        // 		} else {
	        //   			this.invoiceidError.style.visibility = "hidden";
	        // 		}
      			// }

      			if(this.description) purchase_units[0].description = this.description.value;
        		if(this.amount) purchase_units[0].amount.value = this.amount.value;
        		// if(this.invoiceid && this.invoiceid.value !== '') {
          // 			purchase_units[0].invoice_id = this.invoiceid.value;
        		// }
      		},
      		createOrder: function (data, actions) {
        		return actions.order.create({
          			purchase_units: purchase_units,
        		});
      		},
      		onApprove: function (data, actions) {
        		return actions.order.capture().then(function (details) {
          			alert('Transaction completed by ' + details.payer.name.given_name + '!');
        		});
      		},
      		onError: function (err) {
        		console.log('Error Recieved: ', err);
      		}
    	}).render('#paypal-button-container');
	    // this.loadExternalScript("https://www.paypal.com/sdk/js?client-id=AcgDMCAxYPlMVrqv4gbUt6cQMttDges-zEvKEkrFNKNs0YxotG2kkMSaozBaN0C4H0QQKtHrmO3pG3Ww&currency=USD").then(() => {
	    // 	paypal.Button.render({
	    //     	env: 'sandbox',
	    //     	client: {
	    //       		production: 'test',
	    //       		sandbox: 'AQH0JsaJZ0sLCw8h4RmJcUBWTLTPb_k1Yr-SgXqjkM93y5EpBjD6WTpLkqasF8Vllxc407vHVTkb0yIK'
	    //     	},
		   //      commit: true,
		   //      payment: function (data, actions) {
	    //       		return actions.payment.create({
	    //         		payment: {
	    //           			transactions: [
	    //             			{
	    //               				amount: { total: '1.00', currency: 'USD' }
	    //             			}
	    //           			]
	    //         		}
	    //       		})
	    //     	},
	    //     	onAuthorize: function(data, actions) {
	    //       		return actions.payment.execute().then(function(payment) {
	    //         		// TODO
	    //       		})
	    //     	}
	    //   	}, '#paypal-button');
	    // });
	}

  	// initConfig_newService(slug, currency, price): void {
  	// 	this[`payPalConfig_${slug}`] = {
	  //     	currency: currency,
	  //     	clientId: 'sb',
	  //     	createOrderOnClient: (data) => <ICreateOrderRequest>{
		 //        intent: 'CAPTURE',
		 //        purchase_units: [
		 //          	{
		 //            	amount: {
		 //              		currency_code: currency,
		 //              		value: price,
		 //              		breakdown: {
		 //                		item_total: {
		 //                  			currency_code: currency,
		 //                  			value: price
		 //                		}
		 //              		}
		 //            	},
		 //            	items: [
		 //              		{
		 //                		name: 'Enterprise Subscription',
		 //                		quantity: '1',
		 //                		category: 'DIGITAL_GOODS',
		 //                		unit_amount: {
		 //                  		currency_code: currency,
		 //                  		value: price,
			//                 	},
			//               	}
			//             ]
		 //          	}
		 //        ]
		 //    },
		 //    advanced: {
		 //        commit: 'true'
	  //     	},
	  //     	style: {
	  //       	label: 'paypal',
	  //       	layout: 'vertical'
			// },
			// onApprove: (data, actions) => {
	  //       	console.log('onApprove - transaction was approved, but not authorized', data, actions);
	  //       	actions.order.get().then(details => {
	  //         		console.log('onApprove - you can get full order details inside onApprove: ', details);
	  //       	});
			// },
			// onClientAuthorization: (data) => {
	  //       	console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
	  //       	this.showSuccess = true;
			// },
			// onCancel: (data, actions) => {
	  //       	console.log('OnCancel', data, actions);
			// },
			// onError: err => {
		 //        console.log('OnError', err);
			// },
			// onClick: (data, actions) => {
		 //        console.log('onClick', data, actions);
	  //     	},
	  //   };
  	// }

  	// initConfig(): void {
	  //   this.payPalConfig = {
	  //     	currency: 'USD',
	  //     	clientId: 'sb',
	  //     	createOrderOnClient: (data) => <ICreateOrderRequest>{
		 //        intent: 'CAPTURE',
		 //        purchase_units: [
		 //          	{
		 //            	amount: {
		 //              		currency_code: 'USD',
		 //              		value: '100',
		 //              		breakdown: {
		 //                		item_total: {
		 //                  			currency_code: 'USD',
		 //                  			value: '100'
		 //                		}
		 //              		}
		 //            	},
		 //            	items: [
		 //              		{
		 //                		name: 'Enterprise Subscription',
		 //                		quantity: '1',
		 //                		category: 'DIGITAL_GOODS',
		 //                		unit_amount: {
		 //                  		currency_code: 'USD',
		 //                  		value: '100',
			//                 	},
			//               	}
			//             ]
		 //          	}
		 //        ]
		 //    },
		 //    advanced: {
		 //        commit: 'true'
	  //     	},
	  //     	style: {
	  //       	label: 'paypal',
	  //       	layout: 'vertical'
			// },
			// onApprove: (data, actions) => {
	  //       	console.log('onApprove - transaction was approved, but not authorized', data, actions);
	  //       	actions.order.get().then(details => {
	  //         		console.log('onApprove - you can get full order details inside onApprove: ', details);
	  //       	});
			// },
			// onClientAuthorization: (data) => {
	  //       	console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
	  //       	this.showSuccess = true;
			// },
			// onCancel: (data, actions) => {
	  //       	console.log('OnCancel', data, actions);
			// },
			// onError: err => {
		 //        console.log('OnError', err);
			// },
			// onClick: (data, actions) => {
		 //        console.log('onClick', data, actions);
	  //     	},
	  //   };
  	// }
}
