(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a84d071a"],{"13cf":function(t,e,n){"use strict";n.d(e,"b",(function(){return s})),n.d(e,"a",(function(){return c})),n.d(e,"c",(function(){return l}));var o=n("e55b"),i=n("6e6d"),r=["ref","style","class","attrs","nativeOn","directives","staticClass","staticStyle"],a={nativeOn:"on"};function s(t,e){var n=r.reduce((function(e,n){return t.data[n]&&(e[a[n]||n]=t.data[n]),e}),{});return e&&(n.on=n.on||{},Object(o["a"])(n.on,t.data.on)),n}function c(t,e){for(var n=arguments.length,o=new Array(n>2?n-2:0),i=2;i<n;i++)o[i-2]=arguments[i];var r=t.listeners[e];r&&(Array.isArray(r)?r.forEach((function(t){t.apply(void 0,o)})):r.apply(void 0,o))}function l(t,e){var n=new i["a"]({el:document.createElement("div"),props:t.props,render:function(n){return n(t,Object(o["a"])({props:this.$props},e))}});return document.body.appendChild(n.$el),n}},2017:function(t,e,n){"use strict";var o=n("72fd"),i=n.n(o);i.a},"23c4":function(t,e,n){"use strict";function o(){return o=Object.assign||function(t){for(var e,n=1;n<arguments.length;n++)for(var o in e=arguments[n],e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},o.apply(this,arguments)}var i=["attrs","props","domProps"],r=["class","style","directives"],a=["on","nativeOn"],s=function(t){return t.reduce((function(t,e){for(var n in e)if(t[n])if(-1!==i.indexOf(n))t[n]=o({},t[n],e[n]);else if(-1!==r.indexOf(n)){var s=t[n]instanceof Array?t[n]:[t[n]],l=e[n]instanceof Array?e[n]:[e[n]];t[n]=s.concat(l)}else if(-1!==a.indexOf(n))for(var u in e[n])if(t[n][u]){var d=t[n][u]instanceof Array?t[n][u]:[t[n][u]],f=e[n][u]instanceof Array?e[n][u]:[e[n][u]];t[n][u]=d.concat(f)}else t[n][u]=e[n][u];else if("hook"==n)for(var h in e[n])t[n][h]=t[n][h]?c(t[n][h],e[n][h]):e[n][h];else t[n]=e[n];else t[n]=e[n];return t}),{})},c=function(t,e){return function(){t&&t.apply(this,arguments),e&&e.apply(this,arguments)}};t.exports=s},"264c":function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"h",(function(){return i})),n.d(e,"g",(function(){return r})),n.d(e,"d",(function(){return s})),n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return l})),n.d(e,"e",(function(){return u})),n.d(e,"f",(function(){return d}));var o="#1989fa",i="#fff",r="#969799",a="van-hairline",s=a+"--top",c=a+"--left",l=a+"--surround",u=a+"--top-bottom",d=a+"-unset--top-bottom"},3115:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var o=n("6e6d");function i(t){return"string"===typeof t?document.querySelector(t):t()}function r(t){var e=t.ref,n=t.afterPortal;return o["a"].extend({props:{getContainer:[String,Function]},watch:{getContainer:"portal"},mounted:function(){this.getContainer&&this.portal()},methods:{portal:function(){var t,o=this.getContainer,r=e?this.$refs[e]:this.$el;o?t=i(o):this.$parent&&(t=this.$parent.$el),t&&t!==r.parentNode&&t.appendChild(r),n&&n.call(this)}}})}},"3aef":function(t,e,n){},5472:function(t,e,n){"use strict";var o={zIndex:2e3,lockCount:0,stack:[],get top(){return this.stack[this.stack.length-1]}},i=n("9ea0"),r=n("3115"),a=n("6e6d"),s=n("c1b9"),c=n("a9e2"),l=a["a"].extend({mixins:[Object(c["a"])((function(t,e){this.handlePopstate(e&&this.closeOnPopstate)}))],props:{closeOnPopstate:Boolean},data:function(){return{bindStatus:!1}},watch:{closeOnPopstate:function(t){this.handlePopstate(t)}},methods:{handlePopstate:function(t){if(!this.$isServer&&this.bindStatus!==t){this.bindStatus=t;var e=t?s["b"]:s["a"];e(window,"popstate",this.close)}}}}),u=n("e55b"),d=n("23c4"),f=n.n(d),h=n("280f"),p=n("bb85"),v=n("13cf"),m=Object(h["a"])("overlay"),g=m[0],b=m[1];function y(t){Object(s["c"])(t,!0)}function O(t,e,n,o){var i=Object(u["a"])({zIndex:e.zIndex},e.customStyle);return Object(p["b"])(e.duration)&&(i.animationDuration=e.duration+"s"),t("transition",{attrs:{name:"van-fade"}},[t("div",f()([{directives:[{name:"show",value:e.show}],style:i,class:[b(),e.className],on:{touchmove:y}},Object(v["b"])(o,!0)]),[n.default&&n.default()])])}O.props={show:Boolean,duration:[Number,String],className:null,customStyle:Object,zIndex:{type:[Number,String],default:1}};var k,S=g(O),w={className:"",customStyle:{}};function C(){if(o.top){var t=o.top.vm;t.$emit("click-overlay"),t.closeOnClickOverlay&&(t.onClickOverlay?t.onClickOverlay():t.close())}}function j(){if(k||(k=Object(v["c"])(S,{on:{click:C}})),o.top){var t=o.top,e=t.vm,n=t.config,i=e.$el;i&&i.parentNode?i.parentNode.insertBefore(k.$el,i):document.body.appendChild(k.$el),Object(u["a"])(k,w,n,{show:!0})}else k.show=!1}function $(t,e){o.stack.some((function(e){return e.vm===t}))||(o.stack.push({vm:t,config:e}),j())}function x(t){var e=o.stack;e.length&&(o.top.vm===t?(e.pop(),j()):o.stack=e.filter((function(e){return e.vm!==t})))}var z=n("005b");n.d(e,"a",(function(){return I}));var I={mixins:[i["a"],l,Object(r["a"])({afterPortal:function(){this.overlay&&j()}})],props:{value:Boolean,overlay:Boolean,overlayStyle:Object,overlayClass:String,closeOnClickOverlay:Boolean,zIndex:[Number,String],lockScroll:{type:Boolean,default:!0},lazyRender:{type:Boolean,default:!0}},data:function(){return{inited:this.value}},computed:{shouldRender:function(){return this.inited||!this.lazyRender}},watch:{value:function(t){var e=t?"open":"close";this.inited=this.inited||this.value,this[e](),this.$emit(e)},overlay:"renderOverlay"},mounted:function(){this.value&&this.open()},activated:function(){this.value&&this.open()},beforeDestroy:function(){this.close(),this.getContainer&&this.$parent&&this.$parent.$el&&this.$parent.$el.appendChild(this.$el)},deactivated:function(){this.close()},methods:{open:function(){this.$isServer||this.opened||(void 0!==this.zIndex&&(o.zIndex=this.zIndex),this.opened=!0,this.renderOverlay(),this.lockScroll&&(Object(s["b"])(document,"touchstart",this.touchStart),Object(s["b"])(document,"touchmove",this.onTouchMove),o.lockCount||document.body.classList.add("van-overflow-hidden"),o.lockCount++))},close:function(){this.opened&&(this.lockScroll&&(o.lockCount--,Object(s["a"])(document,"touchstart",this.touchStart),Object(s["a"])(document,"touchmove",this.onTouchMove),o.lockCount||document.body.classList.remove("van-overflow-hidden")),this.opened=!1,x(this),this.$emit("input",!1))},onTouchMove:function(t){this.touchMove(t);var e=this.deltaY>0?"10":"01",n=Object(z["c"])(t.target,this.$el),o=n.scrollHeight,i=n.offsetHeight,r=n.scrollTop,a="11";0===r?a=i>=o?"00":"01":r+i>=o&&(a="10"),"11"===a||"vertical"!==this.direction||parseInt(a,2)&parseInt(e,2)||Object(s["c"])(t,!0)},renderOverlay:function(){var t=this;!this.$isServer&&this.value&&this.$nextTick((function(){t.updateZIndex(t.overlay?1:0),t.overlay?$(t,{zIndex:o.zIndex++,duration:t.duration,className:t.overlayClass,customStyle:t.overlayStyle}):x(t)}))},updateZIndex:function(t){void 0===t&&(t=0),this.$el.style.zIndex=++o.zIndex+t}}}},"72fd":function(t,e,n){},"7a9a":function(t,e,n){"use strict";var o=n("280f"),i=n("bb85"),r=n("5472"),a=n("a0c8"),s=Object(o["a"])("popup"),c=s[0],l=s[1];e["a"]=c({mixins:[r["a"]],props:{round:Boolean,duration:Number,closeable:Boolean,transition:String,safeAreaInsetBottom:Boolean,closeIcon:{type:String,default:"cross"},closeIconPosition:{type:String,default:"top-right"},position:{type:String,default:"center"},overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!0}},beforeCreate:function(){var t=this,e=function(e){return function(n){return t.$emit(e,n)}};this.onClick=e("click"),this.onOpened=e("opened"),this.onClosed=e("closed")},render:function(){var t,e=arguments[0];if(this.shouldRender){var n=this.round,o=this.position,r=this.duration,s=this.transition||("center"===o?"van-fade":"van-popup-slide-"+o),c={};return Object(i["b"])(r)&&(c.transitionDuration=r+"s"),e("transition",{attrs:{name:s},on:{afterEnter:this.onOpened,afterLeave:this.onClosed}},[e("div",{directives:[{name:"show",value:this.value}],style:c,class:l((t={round:n},t[o]=o,t["safe-area-inset-bottom"]=this.safeAreaInsetBottom,t)),on:{click:this.onClick}},[this.slots(),this.closeable&&e(a["a"],{attrs:{role:"button",tabindex:"0",name:this.closeIcon},class:l("close-icon",this.closeIconPosition),on:{click:this.close}})])])}}})},"7c99":function(t,e,n){},"89a7":function(t,e,n){"use strict";n("067d"),n("ee9e"),n("3aef"),n("7c99")},"9ed6":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"box"},[n("div",{staticClass:"header-login"},[n("button",{staticClass:"backage",on:{click:t.backage}},[t._v("×")])]),n("div",{staticClass:"show"},[t._v("登录NIKE账号")]),n("div",{staticClass:"content"},[n("div",{staticClass:"loginForm"},[n("div",[n("i",[t._v("+86")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.tel,expression:"tel",modifiers:{trim:!0}}],staticClass:"phone",attrs:{type:"text",placeholder:"请输入手机号"},domProps:{value:t.tel},on:{input:function(e){e.target.composing||(t.tel=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),n("br"),n("p",{staticClass:"tip",domProps:{innerHTML:t._s(t.teltip)}})]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.password,expression:"password",modifiers:{trim:!0}}],attrs:{type:"password",placeholder:"请输入密码"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),n("p",{staticClass:"tip",domProps:{innerHTML:t._s(t.passwordtip)}}),n("span",{staticClass:"emil"},[t._v("使用电子邮件登录")]),n("div",{staticClass:"choose"},[n("input",{staticClass:"cb",attrs:{type:"checkbox",checked:"checked"}}),n("span",[t._v("保持登录")]),n("p",{on:{click:t.forget}},[t._v("忘记密码？")])]),t._m(0),n("button",{staticClass:"login",class:{active:t.flag},attrs:{disabled:!t.flag},on:{click:t.login}},[t._v("登录")]),n("span",{staticClass:"reg"},[t._v("还不是会员？"),n("router-link",{attrs:{to:"/register",tag:"a"}},[t._v("立即加入")])],1),n("div",{staticClass:"errortip"},[t._v(t._s(t.errortip))])])])])},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"low"},[t._v("一旦登录，即表明你同意 Nike 的"),n("a",[t._v("隐私政策")]),t._v(" 和 "),n("a",[t._v("使用条款")])])}],r=(n("89a7"),n("e841")),a=n("2427"),s=n.n(a),c=n("6e6d");c["a"].use(r["a"]);var l={data:function(){return{tel:"",password:"",errortip:""}},methods:{backage:function(){this.$router.push("/home")},forget:function(){this.$router.push("/register2")},login:function(){var t=this;console.log("点击了登录按钮"),s.a.post("/api/users/login",{tel:this.tel,password:this.password}).then((function(e){console.log(e),"10006"===e.data.code?t.errortip="用户还未注册，请先注册":"10007"===e.data.code?(Object(r["a"])({message:"密码错误",color:"#333",background:"#e5e5e5"}),t.password=""):(localStorage.setItem("userid",e.data.data.userid),localStorage.setItem("username",e.data.data.username),localStorage.setItem("token",e.data.data.token),t.$store.commit("changeLoginState",!0),localStorage.setItem("loginstate",!0),Object(r["a"])({message:"登录成功",color:"#333",background:"#e5e5e5"}),t.$router.push("/user"))}))}},computed:{teltip:function(){return""===this.tel?"":11!==this.tel.length?'<span class="error">请输入正确的手机号码</span>':"手机格式正确"},passwordtip:function(){return""===this.password?"":this.password.length<6?'<span class="error">密码长度必须大于6位</span>':"密码格式正确"},flag:function(){return"手机格式正确"===this.teltip&&"密码格式正确"===this.passwordtip}}},u=l,d=(n("2017"),n("4e82")),f=Object(d["a"])(u,o,i,!1,null,null,null);e["default"]=f.exports},a0c8:function(t,e,n){"use strict";var o=n("23c4"),i=n.n(o),r=n("280f"),a=n("e823"),s=n("13cf"),c=n("bb85"),l=Object(r["a"])("info"),u=l[0],d=l[1];function f(t,e,n,o){var r=e.dot,a=e.info,l=Object(c["b"])(a)&&""!==a;if(r||l)return t("div",i()([{class:d({dot:r})},Object(s["b"])(o,!0)]),[r?"":e.info])}f.props={dot:Boolean,info:[Number,String]};var h=u(f),p=Object(r["a"])("image"),v=p[0],m=p[1],g=v({props:{src:String,fit:String,alt:String,round:Boolean,width:[Number,String],height:[Number,String],radius:[Number,String],lazyLoad:Boolean,showError:{type:Boolean,default:!0},showLoading:{type:Boolean,default:!0}},data:function(){return{loading:!0,error:!1}},watch:{src:function(){this.loading=!0,this.error=!1}},computed:{style:function(){var t={};return Object(c["b"])(this.width)&&(t.width=Object(a["a"])(this.width)),Object(c["b"])(this.height)&&(t.height=Object(a["a"])(this.height)),Object(c["b"])(this.radius)&&(t.overflow="hidden",t.borderRadius=Object(a["a"])(this.radius)),t}},created:function(){var t=this.$Lazyload;t&&(t.$on("loaded",this.onLazyLoaded),t.$on("error",this.onLazyLoadError))},beforeDestroy:function(){var t=this.$Lazyload;t&&(t.$off("loaded",this.onLazyLoaded),t.$off("error",this.onLazyLoadError))},methods:{onLoad:function(t){this.loading=!1,this.$emit("load",t)},onLazyLoaded:function(t){var e=t.el;e===this.$refs.image&&this.loading&&this.onLoad()},onLazyLoadError:function(t){var e=t.el;e!==this.$refs.image||this.error||this.onError()},onError:function(t){this.error=!0,this.loading=!1,this.$emit("error",t)},onClick:function(t){this.$emit("click",t)},genPlaceholder:function(){var t=this.$createElement;return this.loading&&this.showLoading?t("div",{class:m("loading")},[this.slots("loading")||t(w,{attrs:{name:"photo-o",size:"22"}})]):this.error&&this.showError?t("div",{class:m("error")},[this.slots("error")||t(w,{attrs:{name:"warning-o",size:"22"}})]):void 0},genImage:function(){var t=this.$createElement,e={class:m("img"),attrs:{alt:this.alt},style:{objectFit:this.fit}};if(!this.error)return this.lazyLoad?t("img",i()([{ref:"image",directives:[{name:"lazy",value:this.src}]},e])):t("img",i()([{attrs:{src:this.src},on:{load:this.onLoad,error:this.onError}},e]))}},render:function(){var t=arguments[0];return t("div",{class:m({round:this.round}),style:this.style,on:{click:this.onClick}},[this.genImage(),this.genPlaceholder()])}}),b=Object(r["a"])("icon"),y=b[0],O=b[1];function k(t){return!!t&&-1!==t.indexOf("/")}function S(t,e,n,o){var r=k(e.name);return t(e.tag,i()([{class:[e.classPrefix,r?"":e.classPrefix+"-"+e.name],style:{color:e.color,fontSize:Object(a["a"])(e.size)}},Object(s["b"])(o,!0)]),[n.default&&n.default(),r&&t(g,{class:O("image"),attrs:{fit:"contain",src:e.name,showLoading:!1}}),t(h,{attrs:{dot:e.dot,info:e.info}})])}S.props={dot:Boolean,name:String,size:[Number,String],info:[Number,String],color:String,tag:{type:String,default:"i"},classPrefix:{type:String,default:O()}};var w=e["a"]=y(S)},e841:function(t,e,n){"use strict";var o=n("e55b"),i=n("6e6d"),r=n("23c4"),a=n.n(r),s=n("280f"),c=n("264c"),l=n("13cf"),u=n("5472"),d=n("7a9a"),f=Object(s["a"])("notify"),h=f[0],p=f[1];function v(t,e,n,o){var i={color:e.color,background:e.background};return t(d["a"],a()([{attrs:{value:e.value,position:"top",overlay:!1,duration:.2,lockScroll:!1},style:i,class:[p([e.type]),e.className]},Object(l["b"])(o,!0)]),[e.message])}v.props=Object(o["a"])({},u["a"].props,{background:String,className:null,message:[Number,String],getContainer:[String,Function],type:{type:String,default:"danger"},color:{type:String,default:c["h"]},duration:{type:Number,default:3e3}});var m,g,b=h(v),y=n("bb85");function O(t){return Object(y["c"])(t)?t:{message:t}}function k(t){if(!y["d"])return g||(g=Object(l["c"])(b,{on:{click:function(t){g.onClick&&g.onClick(t)},close:function(){g.onClose&&g.onClose()},opened:function(){g.onOpened&&g.onOpened()}}})),t=Object(o["a"])({},k.currentOptions,{},O(t)),Object(o["a"])(g,t),clearTimeout(m),t.duration&&t.duration>0&&(m=setTimeout(k.clear,t.duration)),g}function S(){return{type:"danger",value:!0,message:"",color:c["h"],background:void 0,duration:3e3,className:"",onClose:null,onClick:null,onOpened:null}}k.clear=function(){g&&(g.value=!1)},k.currentOptions=S(),k.setDefaultOptions=function(t){Object(o["a"])(k.currentOptions,t)},k.resetDefaultOptions=function(){k.currentOptions=S()},k.install=function(){i["a"].use(b)},i["a"].prototype.$notify=k;e["a"]=k},ee9e:function(t,e,n){}}]);
//# sourceMappingURL=chunk-a84d071a.1b2510a7.js.map