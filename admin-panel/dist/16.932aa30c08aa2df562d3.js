(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{oTzW:function(n,t,e){"use strict";e.r(t),e.d(t,"LandingPageModule",(function(){return x}));var o=e("Valr"),i=e("qiSS"),r=e("W/RB"),a=e("QJY3"),c=e("DUip"),g=e("IYfF"),l=e("AytR"),f=e("TYT/"),s=e("uLXW"),u=e("eHTH"),b=e("cSbt"),p=e("p+mS");function d(n,t){if(1&n&&(f.Ub(0,"span",14),f.Ac(1),f.Tb()),2&n){var e=f.gc();f.Cb(1),f.Bc(e.loginError)}}function m(n,t){if(1&n){var e=f.Vb();f.Ub(0,"div",15),f.Pb(1,"img",16),f.Ub(2,"span",17),f.cc("click",(function(){f.tc(e);var n=t.$implicit;return f.gc().deleteImage(n)})),f.Ac(3,"x"),f.Tb(),f.Tb()}if(2&n){var o=t.$implicit;f.Cb(1),f.mc("src",o,f.uc)}}var h=l.a.fileLocation,_=[{path:"",component:function(){function n(n,t,e){this.fb=n,this.authService=t,this.router=e,this.images=[],this.loginError="",this.filesrc=[]}return n.prototype.ngOnInit=function(){var n=this;this.buildForm(),this.authService.retrieveBySlug("home","home").subscribe((function(t){if(t&&t.data&&t.data._id&&t.data.banner_image_path){n._id=t.data._id,console.log("this._id: ",n._id);for(var e=0,o=t.data.banner_image_path;e<o.length;e++)n.images.push(""+h+o[e]);n.loginForm.patchValue({name:t.data.name,our_vision:t.data.our_vision,banner_message:t.data.banner_message,fileSource:t.data.banner_image_path}),console.log("form: ",n.loginForm)}}))},n.prototype.deleteImage=function(n){this.images=this.images.filter((function(t){return t!==n}))},n.prototype.buildForm=function(){this.loginForm=this.fb.group({name:["",[a.n.required]],our_vision:["",[a.n.required]],banner_message:["",[a.n.required]],file:[""],fileSource:[""]})},Object.defineProperty(n.prototype,"f",{get:function(){return this.loginForm.value},enumerable:!0,configurable:!0}),n.prototype.onFileChange=function(n){var t=this;if(n.target.files&&n.target.files[0]){this.files=[];for(var e=n.target.files.length,o=0;o<e;o++){var i=new FileReader;i.onload=function(n){t.images.push(n.target.result),t.loginForm.patchValue({fileSource:t.images})},this.files.push(n.target.files[o]),i.readAsDataURL(n.target.files[o])}}},n.prototype.onLogin=function(){var n=this,t=new FormData;["name","our_vision","banner_message"].map((function(e){return t.append(e,n.loginForm.value[e])})),this.files.forEach((function(n){return t.append("file",n)})),this._id&&t.append("_id",this._id),this.authService.landing_page(t).subscribe((function(t){t.status?(n.loginError="",n._id=t._id,n.router.navigate(["/dashboard"])):n.loginError=t.message}))},n.\u0275fac=function(t){return new(t||n)(f.Ob(a.c),f.Ob(g.a),f.Ob(c.c))},n.\u0275cmp=f.Ib({type:n,selectors:[["app-landing-page"]],decls:25,vars:7,consts:[[1,"wrapper"],[1,"content"],["fxFlex","",1,"login-form",3,"formGroup","submit"],["fxFlex","","class","text-center text-danger","style","color: #f44336;",4,"ngIf"],["fxFlex","","fxlayout","row","fxlayout.lt-md","column"],["fxFlexFill",""],[1,"w-100"],["matInput","","placeholder","Site Name","formControlName","name"],["matInput","","placeholder","Our Vision","formControlName","our_vision"],["matInput","","placeholder","Home Message","formControlName","banner_message"],["fxFlex","","fxLayout","row","fxLayout.lt-md","column"],["type","file","formControlName","file","accept","image/*","multiple","",3,"change"],["class","Upcard",4,"ngFor","ngForOf"],["type","submit","mat-raised-button","","color","primary",1,"w-100",3,"disabled"],["fxFlex","",1,"text-center","text-danger",2,"color","#f44336"],[1,"Upcard"],["height","150","width","200px",2,"margin","3px",3,"src"],[1,"delete-entry",2,"cursor","pointer",3,"click"]],template:function(n,t){1&n&&(f.Ub(0,"div",0),f.Ub(1,"div",1),f.Ub(2,"form",2),f.cc("submit",(function(){return t.onLogin()})),f.zc(3,d,2,1,"span",3),f.Ub(4,"div",4),f.Ub(5,"div",5),f.Ub(6,"mat-form-field",6),f.Pb(7,"input",7),f.Tb(),f.Tb(),f.Tb(),f.Ub(8,"div",4),f.Ub(9,"div",5),f.Ub(10,"mat-form-field",6),f.Pb(11,"input",8),f.Tb(),f.Tb(),f.Tb(),f.Ub(12,"div",4),f.Ub(13,"div",5),f.Ub(14,"mat-form-field",6),f.Pb(15,"input",9),f.Tb(),f.Tb(),f.Tb(),f.Ub(16,"div",10),f.Ub(17,"div",5),f.Ub(18,"input",11),f.cc("change",(function(n){return t.onFileChange(n)})),f.Tb(),f.Tb(),f.Tb(),f.zc(19,m,4,1,"div",12),f.hc(20,"slice"),f.Ub(21,"div",10),f.Ub(22,"div",5),f.Ub(23,"button",13),f.Ac(24,"Save"),f.Tb(),f.Tb(),f.Tb(),f.Tb(),f.Tb(),f.Tb()),2&n&&(f.Cb(2),f.mc("formGroup",t.loginForm),f.Cb(1),f.mc("ngIf",""!=t.loginError),f.Cb(16),f.mc("ngForOf",f.jc(20,4,t.images,1)),f.Cb(4),f.mc("disabled",t.loginForm.invalid))},directives:[a.o,a.k,s.a,a.e,o.k,s.e,u.b,b.b,a.b,a.j,a.d,s.c,o.j,p.b],pipes:[o.s],styles:['.login-page[_ngcontent-%COMP%]{height:100%;position:relative}.login-page[_ngcontent-%COMP%], .login-page[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center}.login-page[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{z-index:1}.login-page[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .app-name[_ngcontent-%COMP%]{margin-top:0;padding-bottom:10px;font-size:32px}.login-page[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]{padding:40px;background:#fff;width:500px;box-shadow:0 0 10px #ddd}.login-page[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:-webkit-autofill{-webkit-box-shadow:0 0 0 30px #fff inset}.login-page[_ngcontent-%COMP%]:after{background:#fff;top:0;bottom:50%}.login-page[_ngcontent-%COMP%]:after, .login-page[_ngcontent-%COMP%]:before{content:"";position:absolute;left:0;right:0}.login-page[_ngcontent-%COMP%]:before{background:#3f51b5;top:50%;bottom:0}.text-center[_ngcontent-%COMP%]{text-align:center}.w-100[_ngcontent-%COMP%]{width:100%}']}),n}()}],v=function(){function n(){}return n.\u0275mod=f.Mb({type:n}),n.\u0275inj=f.Lb({factory:function(t){return new(t||n)},imports:[[c.f.forChild(_)],c.f]}),n}(),x=function(){function n(){}return n.\u0275mod=f.Mb({type:n}),n.\u0275inj=f.Lb({factory:function(t){return new(t||n)},imports:[[o.c,i.a.withConfig({addFlexToParent:!1}),a.f,r.a,a.m,v]]}),n}()}}]);