(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{x5bZ:function(n,t,o){"use strict";o.r(t),o.d(t,"RegisterModule",(function(){return h}));var e=o("Valr"),i=o("qiSS"),r=o("DUip"),a=o("QJY3"),l=o("IYfF"),c=o("TYT/"),b=o("uLXW"),g=o("eHTH"),f=o("cSbt"),u=o("p+mS");function s(n,t){if(1&n&&(c.Ub(0,"span",18),c.zc(1),c.Tb()),2&n){var o=c.gc();c.Cb(1),c.Ac(o.loginError)}}var m=function(){return["/login"]},p=[{path:"",component:function(){function n(n,t,o){this.fb=n,this.authService=t,this.router=o,this.loginError=""}return n.prototype.ngOnInit=function(){this.buildForm()},n.prototype.buildForm=function(){this.loginForm=this.fb.group({firstName:["",[a.n.required,a.n.minLength(4)]],lastName:["",[a.n.required,a.n.minLength(4)]],email:this.fb.control(null,[a.n.required,a.n.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]),password:["",[a.n.required,a.n.minLength(6)]]})},Object.defineProperty(n.prototype,"f",{get:function(){return this.loginForm.value},enumerable:!0,configurable:!0}),n.prototype.onLogin=function(){var n=this;new FormData,this.authService.register({firstName:this.loginForm.controls.firstName.value,lastName:this.loginForm.controls.lastName.value,email:this.loginForm.controls.email.value,password:this.loginForm.controls.password.value}).subscribe((function(t){t.status?(n.loginError="",n.router.navigate(["/login"])):n.loginError=t.message}))},n.\u0275fac=function(t){return new(t||n)(c.Ob(a.c),c.Ob(l.a),c.Ob(r.c))},n.\u0275cmp=c.Ib({type:n,selectors:[["app-register"]],decls:31,vars:5,consts:[[1,"login-page"],[1,"content"],["fxFlex","",1,"login-form",3,"formGroup","submit"],[1,"text-center"],[1,"app-name"],["fxFlex","","class","text-center text-danger","style","color: #f44336;",4,"ngIf"],["fxFlex","","fxlayout","row","fxlayout.lt-md","column"],["fxFlexFill",""],[1,"w-100"],["matInput","","placeholder","First Name","formControlName","firstName"],["matInput","","placeholder","Last Name","formControlName","lastName"],["matInput","","placeholder","Email","formControlName","email"],["fxFlex","","fxLayout","row","fxLayout.lt-md","column"],["matInput","","type","password","formControlName","password","placeholder","Password"],["fxFlex","","fxLayout","row","fxLayout.lt-md","column",2,"margin","20px 0 30px 0"],["fxFlex","","fxLayoutAlign","end"],["routerLinkActive","currentUrl!='/register'",3,"routerLink"],["type","submit","mat-raised-button","","color","primary",1,"w-100",3,"disabled"],["fxFlex","",1,"text-center","text-danger",2,"color","#f44336"]],template:function(n,t){1&n&&(c.Ub(0,"div",0),c.Ub(1,"div",1),c.Ub(2,"form",2),c.cc("submit",(function(){return t.onLogin()})),c.Ub(3,"div",3),c.Ub(4,"h2",4),c.zc(5,"Admin Register"),c.Tb(),c.Tb(),c.yc(6,s,2,1,"span",5),c.Ub(7,"div",6),c.Ub(8,"div",7),c.Ub(9,"mat-form-field",8),c.Pb(10,"input",9),c.Tb(),c.Tb(),c.Tb(),c.Ub(11,"div",6),c.Ub(12,"div",7),c.Ub(13,"mat-form-field",8),c.Pb(14,"input",10),c.Tb(),c.Tb(),c.Tb(),c.Ub(15,"div",6),c.Ub(16,"div",7),c.Ub(17,"mat-form-field",8),c.Pb(18,"input",11),c.Tb(),c.Tb(),c.Tb(),c.Ub(19,"div",12),c.Ub(20,"div",7),c.Ub(21,"mat-form-field",8),c.Pb(22,"input",13),c.Tb(),c.Tb(),c.Tb(),c.Ub(23,"div",14),c.Ub(24,"div",15),c.Ub(25,"a",16),c.zc(26,"Already have an account?"),c.Tb(),c.Tb(),c.Tb(),c.Ub(27,"div",12),c.Ub(28,"div",7),c.Ub(29,"button",17),c.zc(30,"Sign UP"),c.Tb(),c.Tb(),c.Tb(),c.Tb(),c.Tb(),c.Tb()),2&n&&(c.Cb(2),c.lc("formGroup",t.loginForm),c.Cb(4),c.lc("ngIf",""!=t.loginError),c.Cb(19),c.lc("routerLink",c.mc(4,m)),c.Cb(4),c.lc("disabled",t.loginForm.invalid))},directives:[a.o,a.k,b.a,a.e,e.k,b.e,g.b,f.b,a.b,a.j,a.d,b.c,b.b,r.e,r.d,u.b],styles:['.login-page[_ngcontent-%COMP%]{height:100%;position:relative}.login-page[_ngcontent-%COMP%], .login-page[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center}.login-page[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{z-index:1}.login-page[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .app-name[_ngcontent-%COMP%]{margin-top:0;padding-bottom:10px;font-size:32px}.login-page[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]{padding:40px;background:#fff;width:500px;box-shadow:0 0 10px #ddd}.login-page[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]   .login-form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:-webkit-autofill{-webkit-box-shadow:0 0 0 30px #fff inset}.login-page[_ngcontent-%COMP%]:after{background:#fff;top:0;bottom:50%}.login-page[_ngcontent-%COMP%]:after, .login-page[_ngcontent-%COMP%]:before{content:"";position:absolute;left:0;right:0}.login-page[_ngcontent-%COMP%]:before{background:#3f51b5;top:50%;bottom:0}.text-center[_ngcontent-%COMP%]{text-align:center}.w-100[_ngcontent-%COMP%]{width:100%}']}),n}()}],d=function(){function n(){}return n.\u0275mod=c.Mb({type:n}),n.\u0275inj=c.Lb({factory:function(t){return new(t||n)},imports:[[r.f.forChild(p)],r.f]}),n}(),x=o("W/RB"),h=function(){function n(){}return n.\u0275mod=c.Mb({type:n}),n.\u0275inj=c.Lb({factory:function(t){return new(t||n)},imports:[[e.c,d,x.a,i.a.withConfig({addFlexToParent:!1}),a.f,a.m]]}),n}()}}]);