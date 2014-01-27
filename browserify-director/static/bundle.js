(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $ = require('jquery');
require('bootstrap');

var Router = require('director').Router;
var router;

// Notes:
// - Don't use both once and on
var routes = {
  '/': {
    on: 'index'
  },
  '/network/:networkId': {
    once: 'setup',
    on: 'show',

    '/:resource': {
      on: 'resource',

      '/:action': {
        on: 'resourceAction'
      }
    }
  }
};

router = Router(routes);

var network = require('./lib/network')(router);

router.configure({
  recurse: 'forward',
  resource: network,
  on: function(){console.log('global-on'); console.log('--------------------')},
  notfound: function(){console.log('notfound', arguments)},
  before: function(){console.log('global-before', arguments)}
});

$('document').ready(function(){
  console.log('Ready');
  router.init();
});

// TODO
// 2. Back to list button
// 3. Ractive!

},{"./lib/network":4,"bootstrap":2,"director":10,"jquery":3}],2:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};(function browserifyShim(module, define) {

; $ = global.$ = require("/Users/matt/code/routing_demo/bower_components/jquery/jquery.min.js");
/*!
 * Bootstrap v3.0.3 (http://getbootstrap.com)
 * Copyright 2013 Twitter, Inc.
 * Licensed under http://www.apache.org/licenses/LICENSE-2.0
 */

if("undefined"==typeof jQuery)throw new Error("Bootstrap requires jQuery");+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]}}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one(a.support.transition.end,function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b()})}(jQuery),+function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype.close=function(b){function c(){f.trigger("closed.bs.alert").remove()}var d=a(this),e=d.attr("data-target");e||(e=d.attr("href"),e=e&&e.replace(/.*(?=#[^\s]*$)/,""));var f=a(e);b&&b.preventDefault(),f.length||(f=d.hasClass("alert")?d:d.parent()),f.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one(a.support.transition.end,c).emulateTransitionEnd(150):c())};var d=a.fn.alert;a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("bs.alert");e||d.data("bs.alert",e=new c(this)),"string"==typeof b&&e[b].call(d)})},a.fn.alert.Constructor=c,a.fn.alert.noConflict=function(){return a.fn.alert=d,this},a(document).on("click.bs.alert.data-api",b,c.prototype.close)}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d)};b.DEFAULTS={loadingText:"loading..."},b.prototype.setState=function(a){var b="disabled",c=this.$element,d=c.is("input")?"val":"html",e=c.data();a+="Text",e.resetText||c.data("resetText",c[d]()),c[d](e[a]||this.options[a]),setTimeout(function(){"loadingText"==a?c.addClass(b).attr(b,b):c.removeClass(b).removeAttr(b)},0)},b.prototype.toggle=function(){var a=this.$element.closest('[data-toggle="buttons"]'),b=!0;if(a.length){var c=this.$element.find("input");"radio"===c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?b=!1:a.find(".active").removeClass("active")),b&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}b&&this.$element.toggleClass("active")};var c=a.fn.button;a.fn.button=function(c){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof c&&c;e||d.data("bs.button",e=new b(this,f)),"toggle"==c?e.toggle():c&&e.setState(c)})},a.fn.button.Constructor=b,a.fn.button.noConflict=function(){return a.fn.button=c,this},a(document).on("click.bs.button.data-api","[data-toggle^=button]",function(b){var c=a(b.target);c.hasClass("btn")||(c=c.closest(".btn")),c.button("toggle"),b.preventDefault()})}(jQuery),+function(a){"use strict";var b=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=this.sliding=this.interval=this.$active=this.$items=null,"hover"==this.options.pause&&this.$element.on("mouseenter",a.proxy(this.pause,this)).on("mouseleave",a.proxy(this.cycle,this))};b.DEFAULTS={interval:5e3,pause:"hover",wrap:!0},b.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},b.prototype.getActiveIndex=function(){return this.$active=this.$element.find(".item.active"),this.$items=this.$active.parent().children(),this.$items.index(this.$active)},b.prototype.to=function(b){var c=this,d=this.getActiveIndex();return b>this.$items.length-1||0>b?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){c.to(b)}):d==b?this.pause().cycle():this.slide(b>d?"next":"prev",a(this.$items[b]))},b.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition.end&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},b.prototype.next=function(){return this.sliding?void 0:this.slide("next")},b.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},b.prototype.slide=function(b,c){var d=this.$element.find(".item.active"),e=c||d[b](),f=this.interval,g="next"==b?"left":"right",h="next"==b?"first":"last",i=this;if(!e.length){if(!this.options.wrap)return;e=this.$element.find(".item")[h]()}this.sliding=!0,f&&this.pause();var j=a.Event("slide.bs.carousel",{relatedTarget:e[0],direction:g});if(!e.hasClass("active")){if(this.$indicators.length&&(this.$indicators.find(".active").removeClass("active"),this.$element.one("slid.bs.carousel",function(){var b=a(i.$indicators.children()[i.getActiveIndex()]);b&&b.addClass("active")})),a.support.transition&&this.$element.hasClass("slide")){if(this.$element.trigger(j),j.isDefaultPrevented())return;e.addClass(b),e[0].offsetWidth,d.addClass(g),e.addClass(g),d.one(a.support.transition.end,function(){e.removeClass([b,g].join(" ")).addClass("active"),d.removeClass(["active",g].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger("slid.bs.carousel")},0)}).emulateTransitionEnd(600)}else{if(this.$element.trigger(j),j.isDefaultPrevented())return;d.removeClass("active"),e.addClass("active"),this.sliding=!1,this.$element.trigger("slid.bs.carousel")}return f&&this.cycle(),this}};var c=a.fn.carousel;a.fn.carousel=function(c){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c),g="string"==typeof c?c:f.slide;e||d.data("bs.carousel",e=new b(this,f)),"number"==typeof c?e.to(c):g?e[g]():f.interval&&e.pause().cycle()})},a.fn.carousel.Constructor=b,a.fn.carousel.noConflict=function(){return a.fn.carousel=c,this},a(document).on("click.bs.carousel.data-api","[data-slide], [data-slide-to]",function(b){var c,d=a(this),e=a(d.attr("data-target")||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"")),f=a.extend({},e.data(),d.data()),g=d.attr("data-slide-to");g&&(f.interval=!1),e.carousel(f),(g=d.attr("data-slide-to"))&&e.data("bs.carousel").to(g),b.preventDefault()}),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var b=a(this);b.carousel(b.data())})})}(jQuery),+function(a){"use strict";var b=function(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,d),this.transitioning=null,this.options.parent&&(this.$parent=a(this.options.parent)),this.options.toggle&&this.toggle()};b.DEFAULTS={toggle:!0},b.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},b.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b=a.Event("show.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.$parent&&this.$parent.find("> .panel > .in");if(c&&c.length){var d=c.data("bs.collapse");if(d&&d.transitioning)return;c.collapse("hide"),d||c.data("bs.collapse",null)}var e=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[e](0),this.transitioning=1;var f=function(){this.$element.removeClass("collapsing").addClass("in")[e]("auto"),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return f.call(this);var g=a.camelCase(["scroll",e].join("-"));this.$element.one(a.support.transition.end,a.proxy(f,this)).emulateTransitionEnd(350)[e](this.$element[0][g])}}},b.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var d=function(){this.transitioning=0,this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")};return a.support.transition?(this.$element[c](0).one(a.support.transition.end,a.proxy(d,this)).emulateTransitionEnd(350),void 0):d.call(this)}}},b.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};var c=a.fn.collapse;a.fn.collapse=function(c){return this.each(function(){var d=a(this),e=d.data("bs.collapse"),f=a.extend({},b.DEFAULTS,d.data(),"object"==typeof c&&c);e||d.data("bs.collapse",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.collapse.Constructor=b,a.fn.collapse.noConflict=function(){return a.fn.collapse=c,this},a(document).on("click.bs.collapse.data-api","[data-toggle=collapse]",function(b){var c,d=a(this),e=d.attr("data-target")||b.preventDefault()||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,""),f=a(e),g=f.data("bs.collapse"),h=g?"toggle":d.data(),i=d.attr("data-parent"),j=i&&a(i);g&&g.transitioning||(j&&j.find('[data-toggle=collapse][data-parent="'+i+'"]').not(d).addClass("collapsed"),d[f.hasClass("in")?"addClass":"removeClass"]("collapsed")),f.collapse(h)})}(jQuery),+function(a){"use strict";function b(){a(d).remove(),a(e).each(function(b){var d=c(a(this));d.hasClass("open")&&(d.trigger(b=a.Event("hide.bs.dropdown")),b.isDefaultPrevented()||d.removeClass("open").trigger("hidden.bs.dropdown"))})}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}var d=".dropdown-backdrop",e="[data-toggle=dropdown]",f=function(b){a(b).on("click.bs.dropdown",this.toggle)};f.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){if("ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b),f.trigger(d=a.Event("show.bs.dropdown")),d.isDefaultPrevented())return;f.toggleClass("open").trigger("shown.bs.dropdown"),e.focus()}return!1}},f.prototype.keydown=function(b){if(/(38|40|27)/.test(b.keyCode)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var f=c(d),g=f.hasClass("open");if(!g||g&&27==b.keyCode)return 27==b.which&&f.find(e).focus(),d.click();var h=a("[role=menu] li:not(.divider):visible a",f);if(h.length){var i=h.index(h.filter(":focus"));38==b.keyCode&&i>0&&i--,40==b.keyCode&&i<h.length-1&&i++,~i||(i=0),h.eq(i).focus()}}}};var g=a.fn.dropdown;a.fn.dropdown=function(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new f(this)),"string"==typeof b&&d[b].call(c)})},a.fn.dropdown.Constructor=f,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=g,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",e,f.prototype.toggle).on("keydown.bs.dropdown.data-api",e+", [role=menu]",f.prototype.keydown)}(jQuery),+function(a){"use strict";var b=function(b,c){this.options=c,this.$element=a(b),this.$backdrop=this.isShown=null,this.options.remote&&this.$element.load(this.options.remote)};b.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},b.prototype.toggle=function(a){return this[this.isShown?"hide":"show"](a)},b.prototype.show=function(b){var c=this,d=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(d),this.isShown||d.isDefaultPrevented()||(this.isShown=!0,this.escape(),this.$element.on("click.dismiss.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.backdrop(function(){var d=a.support.transition&&c.$element.hasClass("fade");c.$element.parent().length||c.$element.appendTo(document.body),c.$element.show(),d&&c.$element[0].offsetWidth,c.$element.addClass("in").attr("aria-hidden",!1),c.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:b});d?c.$element.find(".modal-dialog").one(a.support.transition.end,function(){c.$element.focus().trigger(e)}).emulateTransitionEnd(300):c.$element.focus().trigger(e)}))},b.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one(a.support.transition.end,a.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},b.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.focus()},this))},b.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.modal")},b.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.removeBackdrop(),a.$element.trigger("hidden.bs.modal")})},b.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},b.prototype.backdrop=function(b){var c=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var d=a.support.transition&&c;if(this.$backdrop=a('<div class="modal-backdrop '+c+'" />').appendTo(document.body),this.$element.on("click.dismiss.modal",a.proxy(function(a){a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),d&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;d?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(a.support.transition.end,b).emulateTransitionEnd(150):b()):b&&b()};var c=a.fn.modal;a.fn.modal=function(c,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},b.DEFAULTS,e.data(),"object"==typeof c&&c);f||e.data("bs.modal",f=new b(this,g)),"string"==typeof c?f[c](d):g.show&&f.show(d)})},a.fn.modal.Constructor=b,a.fn.modal.noConflict=function(){return a.fn.modal=c,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(b){var c=a(this),d=c.attr("href"),e=a(c.attr("data-target")||d&&d.replace(/.*(?=#[^\s]+$)/,"")),f=e.data("modal")?"toggle":a.extend({remote:!/#/.test(d)&&d},e.data(),c.data());b.preventDefault(),e.modal(f,this).one("hide",function(){c.is(":visible")&&c.focus()})}),a(document).on("show.bs.modal",".modal",function(){a(document.body).addClass("modal-open")}).on("hidden.bs.modal",".modal",function(){a(document.body).removeClass("modal-open")})}(jQuery),+function(a){"use strict";var b=function(a,b){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",a,b)};b.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1},b.prototype.init=function(b,c,d){this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d);for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focus",i="hover"==g?"mouseleave":"blur";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},b.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},b.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show),void 0):c.show()},b.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type);return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide),void 0):c.hide()},b.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){if(this.$element.trigger(b),b.isDefaultPrevented())return;var c=this.tip();this.setContent(),this.options.animation&&c.addClass("fade");var d="function"==typeof this.options.placement?this.options.placement.call(this,c[0],this.$element[0]):this.options.placement,e=/\s?auto?\s?/i,f=e.test(d);f&&(d=d.replace(e,"")||"top"),c.detach().css({top:0,left:0,display:"block"}).addClass(d),this.options.container?c.appendTo(this.options.container):c.insertAfter(this.$element);var g=this.getPosition(),h=c[0].offsetWidth,i=c[0].offsetHeight;if(f){var j=this.$element.parent(),k=d,l=document.documentElement.scrollTop||document.body.scrollTop,m="body"==this.options.container?window.innerWidth:j.outerWidth(),n="body"==this.options.container?window.innerHeight:j.outerHeight(),o="body"==this.options.container?0:j.offset().left;d="bottom"==d&&g.top+g.height+i-l>n?"top":"top"==d&&g.top-l-i<0?"bottom":"right"==d&&g.right+h>m?"left":"left"==d&&g.left-h<o?"right":d,c.removeClass(k).addClass(d)}var p=this.getCalculatedOffset(d,g,h,i);this.applyPlacement(p,d),this.$element.trigger("shown.bs."+this.type)}},b.prototype.applyPlacement=function(a,b){var c,d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),a.top=a.top+g,a.left=a.left+h,d.offset(a).addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;if("top"==b&&j!=f&&(c=!0,a.top=a.top+f-j),/bottom|top/.test(b)){var k=0;a.left<0&&(k=-2*a.left,a.left=0,d.offset(a),i=d[0].offsetWidth,j=d[0].offsetHeight),this.replaceArrow(k-e+i,i,"left")}else this.replaceArrow(j-f,j,"top");c&&d.offset(a)},b.prototype.replaceArrow=function(a,b,c){this.arrow().css(c,a?50*(1-a/b)+"%":"")},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},b.prototype.hide=function(){function b(){"in"!=c.hoverState&&d.detach()}var c=this,d=this.tip(),e=a.Event("hide.bs."+this.type);return this.$element.trigger(e),e.isDefaultPrevented()?void 0:(d.removeClass("in"),a.support.transition&&this.$tip.hasClass("fade")?d.one(a.support.transition.end,b).emulateTransitionEnd(150):b(),this.$element.trigger("hidden.bs."+this.type),this)},b.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},b.prototype.hasContent=function(){return this.getTitle()},b.prototype.getPosition=function(){var b=this.$element[0];return a.extend({},"function"==typeof b.getBoundingClientRect?b.getBoundingClientRect():{width:b.offsetWidth,height:b.offsetHeight},this.$element.offset())},b.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},b.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},b.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},b.prototype.validate=function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},b.prototype.enable=function(){this.enabled=!0},b.prototype.disable=function(){this.enabled=!1},b.prototype.toggleEnabled=function(){this.enabled=!this.enabled},b.prototype.toggle=function(b){var c=b?a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs."+this.type):this;c.tip().hasClass("in")?c.leave(c):c.enter(c)},b.prototype.destroy=function(){this.hide().$element.off("."+this.type).removeData("bs."+this.type)};var c=a.fn.tooltip;a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof c&&c;e||d.data("bs.tooltip",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.tooltip.Constructor=b,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=c,this}}(jQuery),+function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");b.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),b.prototype.constructor=b,b.prototype.getDefaults=function(){return b.DEFAULTS},b.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content")[this.options.html?"html":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},b.prototype.hasContent=function(){return this.getTitle()||this.getContent()},b.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},b.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},b.prototype.tip=function(){return this.$tip||(this.$tip=a(this.options.template)),this.$tip};var c=a.fn.popover;a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof c&&c;e||d.data("bs.popover",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.popover.Constructor=b,a.fn.popover.noConflict=function(){return a.fn.popover=c,this}}(jQuery),+function(a){"use strict";function b(c,d){var e,f=a.proxy(this.process,this);this.$element=a(c).is("body")?a(window):a(c),this.$body=a("body"),this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",f),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||(e=a(c).attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.offsets=a([]),this.targets=a([]),this.activeTarget=null,this.refresh(),this.process()}b.DEFAULTS={offset:10},b.prototype.refresh=function(){var b=this.$element[0]==window?"offset":"position";this.offsets=a([]),this.targets=a([]);var c=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#\w/.test(e)&&a(e);return f&&f.length&&[[f[b]().top+(!a.isWindow(c.$scrollElement.get(0))&&c.$scrollElement.scrollTop()),e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){c.offsets.push(this[0]),c.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,d=c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(b>=d)return g!=(a=f.last()[0])&&this.activate(a);for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parents(".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")};var c=a.fn.scrollspy;a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=c,this},a(window).on("load",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(jQuery),+function(a){"use strict";var b=function(b){this.element=a(b)};b.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a")[0],f=a.Event("show.bs.tab",{relatedTarget:e});if(b.trigger(f),!f.isDefaultPrevented()){var g=a(d);this.activate(b.parent("li"),c),this.activate(g,g.parent(),function(){b.trigger({type:"shown.bs.tab",relatedTarget:e})})}}},b.prototype.activate=function(b,c,d){function e(){f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),b.addClass("active"),g?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu")&&b.closest("li.dropdown").addClass("active"),d&&d()}var f=c.find("> .active"),g=d&&a.support.transition&&f.hasClass("fade");g?f.one(a.support.transition.end,e).emulateTransitionEnd(150):e(),f.removeClass("in")};var c=a.fn.tab;a.fn.tab=function(c){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new b(this)),"string"==typeof c&&e[c]()})},a.fn.tab.Constructor=b,a.fn.tab.noConflict=function(){return a.fn.tab=c,this},a(document).on("click.bs.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(b){b.preventDefault(),a(this).tab("show")})}(jQuery),+function(a){"use strict";var b=function(c,d){this.options=a.extend({},b.DEFAULTS,d),this.$window=a(window).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(c),this.affixed=this.unpin=null,this.checkPosition()};b.RESET="affix affix-top affix-bottom",b.DEFAULTS={offset:0},b.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},b.prototype.checkPosition=function(){if(this.$element.is(":visible")){var c=a(document).height(),d=this.$window.scrollTop(),e=this.$element.offset(),f=this.options.offset,g=f.top,h=f.bottom;"object"!=typeof f&&(h=g=f),"function"==typeof g&&(g=f.top()),"function"==typeof h&&(h=f.bottom());var i=null!=this.unpin&&d+this.unpin<=e.top?!1:null!=h&&e.top+this.$element.height()>=c-h?"bottom":null!=g&&g>=d?"top":!1;this.affixed!==i&&(this.unpin&&this.$element.css("top",""),this.affixed=i,this.unpin="bottom"==i?e.top-d:null,this.$element.removeClass(b.RESET).addClass("affix"+(i?"-"+i:"")),"bottom"==i&&this.$element.offset({top:document.body.offsetHeight-h-this.$element.height()}))}};var c=a.fn.affix;a.fn.affix=function(c){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof c&&c;e||d.data("bs.affix",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.affix.Constructor=b,a.fn.affix.noConflict=function(){return a.fn.affix=c,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var b=a(this),c=b.data();c.offset=c.offset||{},c.offsetBottom&&(c.offset.bottom=c.offsetBottom),c.offsetTop&&(c.offset.top=c.offsetTop),b.affix(c)})})}(jQuery);
}).call(global, module, undefined);

},{"/Users/matt/code/routing_demo/bower_components/jquery/jquery.min.js":3}],3:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};(function browserifyShim(module, exports, define, browserify_shim__define__module__export__) {
/*! jQuery v2.1.0 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k="".trim,l={},m=a.document,n="2.1.0",o=function(a,b){return new o.fn.init(a,b)},p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};o.fn=o.prototype={jquery:n,constructor:o,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=o.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return o.each(this,a,b)},map:function(a){return this.pushStack(o.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},o.extend=o.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||o.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(o.isPlainObject(d)||(e=o.isArray(d)))?(e?(e=!1,f=c&&o.isArray(c)?c:[]):f=c&&o.isPlainObject(c)?c:{},g[b]=o.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},o.extend({expando:"jQuery"+(n+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===o.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return a-parseFloat(a)>=0},isPlainObject:function(a){if("object"!==o.type(a)||a.nodeType||o.isWindow(a))return!1;try{if(a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(b){return!1}return!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=o.trim(a),a&&(1===a.indexOf("use strict")?(b=m.createElement("script"),b.text=a,m.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":k.call(a)},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?o.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),o.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||o.guid++,f):void 0},now:Date.now,support:l}),o.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=o.type(a);return"function"===c||o.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s="sizzle"+-new Date,t=a.document,u=0,v=0,w=eb(),x=eb(),y=eb(),z=function(a,b){return a===b&&(j=!0),0},A="undefined",B=1<<31,C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=D.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",M=L.replace("w","w#"),N="\\["+K+"*("+L+")"+K+"*(?:([*^$|!~]?=)"+K+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+M+")|)|)"+K+"*\\]",O=":("+L+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+N.replace(3,8)+")*)|.*)\\)|)",P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(O),U=new RegExp("^"+M+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L.replace("w","w*")+")"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=/'|\\/g,ab=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),bb=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{G.apply(D=H.call(t.childNodes),t.childNodes),D[t.childNodes.length].nodeType}catch(cb){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function db(a,b,d,e){var f,g,h,i,j,m,p,q,u,v;if((b?b.ownerDocument||b:t)!==l&&k(b),b=b||l,d=d||[],!a||"string"!=typeof a)return d;if(1!==(i=b.nodeType)&&9!==i)return[];if(n&&!e){if(f=Z.exec(a))if(h=f[1]){if(9===i){if(g=b.getElementById(h),!g||!g.parentNode)return d;if(g.id===h)return d.push(g),d}else if(b.ownerDocument&&(g=b.ownerDocument.getElementById(h))&&r(b,g)&&g.id===h)return d.push(g),d}else{if(f[2])return G.apply(d,b.getElementsByTagName(a)),d;if((h=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(h)),d}if(c.qsa&&(!o||!o.test(a))){if(q=p=s,u=b,v=9===i&&a,1===i&&"object"!==b.nodeName.toLowerCase()){m=ob(a),(p=b.getAttribute("id"))?q=p.replace(_,"\\$&"):b.setAttribute("id",q),q="[id='"+q+"'] ",j=m.length;while(j--)m[j]=q+pb(m[j]);u=$.test(a)&&mb(b.parentNode)||b,v=m.join(",")}if(v)try{return G.apply(d,u.querySelectorAll(v)),d}catch(w){}finally{p||b.removeAttribute("id")}}}return xb(a.replace(P,"$1"),b,d,e)}function eb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function fb(a){return a[s]=!0,a}function gb(a){var b=l.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function hb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function ib(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||B)-(~a.sourceIndex||B);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function jb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function kb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function lb(a){return fb(function(b){return b=+b,fb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function mb(a){return a&&typeof a.getElementsByTagName!==A&&a}c=db.support={},f=db.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},k=db.setDocument=function(a){var b,e=a?a.ownerDocument||a:t,g=e.defaultView;return e!==l&&9===e.nodeType&&e.documentElement?(l=e,m=e.documentElement,n=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){k()},!1):g.attachEvent&&g.attachEvent("onunload",function(){k()})),c.attributes=gb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=gb(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(e.getElementsByClassName)&&gb(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=gb(function(a){return m.appendChild(a).id=s,!e.getElementsByName||!e.getElementsByName(s).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==A&&n){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){var c=typeof a.getAttributeNode!==A&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==A?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==A&&n?b.getElementsByClassName(a):void 0},p=[],o=[],(c.qsa=Y.test(e.querySelectorAll))&&(gb(function(a){a.innerHTML="<select t=''><option selected=''></option></select>",a.querySelectorAll("[t^='']").length&&o.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||o.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll(":checked").length||o.push(":checked")}),gb(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&o.push("name"+K+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||o.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),o.push(",.*:")})),(c.matchesSelector=Y.test(q=m.webkitMatchesSelector||m.mozMatchesSelector||m.oMatchesSelector||m.msMatchesSelector))&&gb(function(a){c.disconnectedMatch=q.call(a,"div"),q.call(a,"[s!='']:x"),p.push("!=",O)}),o=o.length&&new RegExp(o.join("|")),p=p.length&&new RegExp(p.join("|")),b=Y.test(m.compareDocumentPosition),r=b||Y.test(m.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},z=b?function(a,b){if(a===b)return j=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===t&&r(t,a)?-1:b===e||b.ownerDocument===t&&r(t,b)?1:i?I.call(i,a)-I.call(i,b):0:4&d?-1:1)}:function(a,b){if(a===b)return j=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],k=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:i?I.call(i,a)-I.call(i,b):0;if(f===g)return ib(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)k.unshift(c);while(h[d]===k[d])d++;return d?ib(h[d],k[d]):h[d]===t?-1:k[d]===t?1:0},e):l},db.matches=function(a,b){return db(a,null,null,b)},db.matchesSelector=function(a,b){if((a.ownerDocument||a)!==l&&k(a),b=b.replace(S,"='$1']"),!(!c.matchesSelector||!n||p&&p.test(b)||o&&o.test(b)))try{var d=q.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return db(b,l,null,[a]).length>0},db.contains=function(a,b){return(a.ownerDocument||a)!==l&&k(a),r(a,b)},db.attr=function(a,b){(a.ownerDocument||a)!==l&&k(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!n):void 0;return void 0!==f?f:c.attributes||!n?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},db.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},db.uniqueSort=function(a){var b,d=[],e=0,f=0;if(j=!c.detectDuplicates,i=!c.sortStable&&a.slice(0),a.sort(z),j){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return i=null,a},e=db.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=db.selectors={cacheLength:50,createPseudo:fb,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ab,bb),a[3]=(a[4]||a[5]||"").replace(ab,bb),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||db.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&db.error(a[0]),a},PSEUDO:function(a){var b,c=!a[5]&&a[2];return V.CHILD.test(a[0])?null:(a[3]&&void 0!==a[4]?a[2]=a[4]:c&&T.test(c)&&(b=ob(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ab,bb).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=w[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&w(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==A&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=db.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),t=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&t){k=q[s]||(q[s]={}),j=k[a]||[],n=j[0]===u&&j[1],m=j[0]===u&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[u,n,m];break}}else if(t&&(j=(b[s]||(b[s]={}))[a])&&j[0]===u)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(t&&((l[s]||(l[s]={}))[a]=[u,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||db.error("unsupported pseudo: "+a);return e[s]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?fb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:fb(function(a){var b=[],c=[],d=g(a.replace(P,"$1"));return d[s]?fb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:fb(function(a){return function(b){return db(a,b).length>0}}),contains:fb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:fb(function(a){return U.test(a||"")||db.error("unsupported lang: "+a),a=a.replace(ab,bb).toLowerCase(),function(b){var c;do if(c=n?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===m},focus:function(a){return a===l.activeElement&&(!l.hasFocus||l.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:lb(function(){return[0]}),last:lb(function(a,b){return[b-1]}),eq:lb(function(a,b,c){return[0>c?c+b:c]}),even:lb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:lb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:lb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:lb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=jb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=kb(b);function nb(){}nb.prototype=d.filters=d.pseudos,d.setFilters=new nb;function ob(a,b){var c,e,f,g,h,i,j,k=x[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=Q.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?db.error(a):x(a,i).slice(0)}function pb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function qb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=v++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[u,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[s]||(b[s]={}),(h=i[d])&&h[0]===u&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function rb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function sb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function tb(a,b,c,d,e,f){return d&&!d[s]&&(d=tb(d)),e&&!e[s]&&(e=tb(e,f)),fb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||wb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:sb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=sb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=sb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ub(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],i=g||d.relative[" "],j=g?1:0,k=qb(function(a){return a===b},i,!0),l=qb(function(a){return I.call(b,a)>-1},i,!0),m=[function(a,c,d){return!g&&(d||c!==h)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>j;j++)if(c=d.relative[a[j].type])m=[qb(rb(m),c)];else{if(c=d.filter[a[j].type].apply(null,a[j].matches),c[s]){for(e=++j;f>e;e++)if(d.relative[a[e].type])break;return tb(j>1&&rb(m),j>1&&pb(a.slice(0,j-1).concat({value:" "===a[j-2].type?"*":""})).replace(P,"$1"),c,e>j&&ub(a.slice(j,e)),f>e&&ub(a=a.slice(e)),f>e&&pb(a))}m.push(c)}return rb(m)}function vb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,i,j,k){var m,n,o,p=0,q="0",r=f&&[],s=[],t=h,v=f||e&&d.find.TAG("*",k),w=u+=null==t?1:Math.random()||.1,x=v.length;for(k&&(h=g!==l&&g);q!==x&&null!=(m=v[q]);q++){if(e&&m){n=0;while(o=a[n++])if(o(m,g,i)){j.push(m);break}k&&(u=w)}c&&((m=!o&&m)&&p--,f&&r.push(m))}if(p+=q,c&&q!==p){n=0;while(o=b[n++])o(r,s,g,i);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=E.call(j));s=sb(s)}G.apply(j,s),k&&!f&&s.length>0&&p+b.length>1&&db.uniqueSort(j)}return k&&(u=w,h=t),r};return c?fb(f):f}g=db.compile=function(a,b){var c,d=[],e=[],f=y[a+" "];if(!f){b||(b=ob(a)),c=b.length;while(c--)f=ub(b[c]),f[s]?d.push(f):e.push(f);f=y(a,vb(e,d))}return f};function wb(a,b,c){for(var d=0,e=b.length;e>d;d++)db(a,b[d],c);return c}function xb(a,b,e,f){var h,i,j,k,l,m=ob(a);if(!f&&1===m.length){if(i=m[0]=m[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&c.getById&&9===b.nodeType&&n&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(ab,bb),b)||[])[0],!b)return e;a=a.slice(i.shift().value.length)}h=V.needsContext.test(a)?0:i.length;while(h--){if(j=i[h],d.relative[k=j.type])break;if((l=d.find[k])&&(f=l(j.matches[0].replace(ab,bb),$.test(i[0].type)&&mb(b.parentNode)||b))){if(i.splice(h,1),a=f.length&&pb(i),!a)return G.apply(e,f),e;break}}}return g(a,m)(f,b,!n,e,$.test(a)&&mb(b.parentNode)||b),e}return c.sortStable=s.split("").sort(z).join("")===s,c.detectDuplicates=!!j,k(),c.sortDetached=gb(function(a){return 1&a.compareDocumentPosition(l.createElement("div"))}),gb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||hb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&gb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||hb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),gb(function(a){return null==a.getAttribute("disabled")})||hb(J,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),db}(a);o.find=t,o.expr=t.selectors,o.expr[":"]=o.expr.pseudos,o.unique=t.uniqueSort,o.text=t.getText,o.isXMLDoc=t.isXML,o.contains=t.contains;var u=o.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(o.isFunction(b))return o.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return o.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return o.filter(b,a,c);b=o.filter(b,a)}return o.grep(a,function(a){return g.call(b,a)>=0!==c})}o.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?o.find.matchesSelector(d,a)?[d]:[]:o.find.matches(a,o.grep(b,function(a){return 1===a.nodeType}))},o.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(o(a).filter(function(){for(b=0;c>b;b++)if(o.contains(e[b],this))return!0}));for(b=0;c>b;b++)o.find(a,e[b],d);return d=this.pushStack(c>1?o.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?o(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=o.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof o?b[0]:b,o.merge(this,o.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:m,!0)),v.test(c[1])&&o.isPlainObject(b))for(c in b)o.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=m.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=m,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):o.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(o):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),o.makeArray(a,this))};A.prototype=o.fn,y=o(m);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};o.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&o(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),o.fn.extend({has:function(a){var b=o(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(o.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?o(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&o.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?o.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(o(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(o.unique(o.merge(this.get(),o(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}o.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return o.dir(a,"parentNode")},parentsUntil:function(a,b,c){return o.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return o.dir(a,"nextSibling")},prevAll:function(a){return o.dir(a,"previousSibling")},nextUntil:function(a,b,c){return o.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return o.dir(a,"previousSibling",c)},siblings:function(a){return o.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return o.sibling(a.firstChild)},contents:function(a){return a.contentDocument||o.merge([],a.childNodes)}},function(a,b){o.fn[a]=function(c,d){var e=o.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=o.filter(d,e)),this.length>1&&(C[a]||o.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return o.each(a.match(E)||[],function(a,c){b[c]=!0}),b}o.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):o.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){o.each(b,function(b,c){var d=o.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&o.each(arguments,function(a,b){var c;while((c=o.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?o.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},o.extend({Deferred:function(a){var b=[["resolve","done",o.Callbacks("once memory"),"resolved"],["reject","fail",o.Callbacks("once memory"),"rejected"],["notify","progress",o.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return o.Deferred(function(c){o.each(b,function(b,f){var g=o.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&o.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?o.extend(a,d):d}},e={};return d.pipe=d.then,o.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&o.isFunction(a.promise)?e:0,g=1===f?a:o.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&o.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;o.fn.ready=function(a){return o.ready.promise().done(a),this},o.extend({isReady:!1,readyWait:1,holdReady:function(a){a?o.readyWait++:o.ready(!0)},ready:function(a){(a===!0?--o.readyWait:o.isReady)||(o.isReady=!0,a!==!0&&--o.readyWait>0||(H.resolveWith(m,[o]),o.fn.trigger&&o(m).trigger("ready").off("ready")))}});function I(){m.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),o.ready()}o.ready.promise=function(b){return H||(H=o.Deferred(),"complete"===m.readyState?setTimeout(o.ready):(m.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},o.ready.promise();var J=o.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===o.type(c)){e=!0;for(h in c)o.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,o.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(o(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};o.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=o.expando+Math.random()}K.uid=1,K.accepts=o.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,o.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(o.isEmptyObject(f))o.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,o.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{o.isArray(b)?d=b.concat(b.map(o.camelCase)):(e=o.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!o.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?o.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}o.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),o.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;
while(c--)d=g[c].name,0===d.indexOf("data-")&&(d=o.camelCase(d.slice(5)),P(f,d,e[d]));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=o.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),o.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||o.isArray(c)?d=L.access(a,b,o.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=o.queue(a,b),d=c.length,e=c.shift(),f=o._queueHooks(a,b),g=function(){o.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:o.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),o.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?o.queue(this[0],a):void 0===b?this:this.each(function(){var c=o.queue(this,a,b);o._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&o.dequeue(this,a)})},dequeue:function(a){return this.each(function(){o.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=o.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===o.css(a,"display")||!o.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=m.createDocumentFragment(),b=a.appendChild(m.createElement("div"));b.innerHTML="<input type='radio' checked='checked' name='t'/>",l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";l.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return m.activeElement}catch(a){}}o.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=o.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof o!==U&&o.event.triggered!==b.type?o.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n&&(l=o.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=o.event.special[n]||{},k=o.extend({type:n,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&o.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(n,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),o.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],n=q=h[1],p=(h[2]||"").split(".").sort(),n){l=o.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||o.removeEvent(a,n,r.handle),delete i[n])}else for(n in i)o.event.remove(a,n+b[j],c,d,!0);o.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,n,p=[d||m],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||m,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+o.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[o.expando]?b:new o.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:o.makeArray(c,[b]),n=o.event.special[q]||{},e||!n.trigger||n.trigger.apply(d,c)!==!1)){if(!e&&!n.noBubble&&!o.isWindow(d)){for(i=n.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||m)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:n.bindType||q,l=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),l&&l.apply(g,c),l=k&&g[k],l&&l.apply&&o.acceptData(g)&&(b.result=l.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||n._default&&n._default.apply(p.pop(),c)!==!1||!o.acceptData(d)||k&&o.isFunction(d[q])&&!o.isWindow(d)&&(h=d[k],h&&(d[k]=null),o.event.triggered=q,d[q](),o.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=o.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=o.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=o.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((o.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?o(e,this).index(i)>=0:o.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||m,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[o.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new o.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=m),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&o.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return o.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=o.extend(new o.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?o.event.trigger(e,null,b):o.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},o.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},o.Event=function(a,b){return this instanceof o.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.getPreventDefault&&a.getPreventDefault()?Z:$):this.type=a,b&&o.extend(this,b),this.timeStamp=a&&a.timeStamp||o.now(),void(this[o.expando]=!0)):new o.Event(a,b)},o.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=Z,this.stopPropagation()}},o.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){o.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!o.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.focusinBubbles||o.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){o.event.simulate(b,a.target,o.event.fix(a),!0)};o.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),o.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return o().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=o.guid++)),this.each(function(){o.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,o(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){o.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){o.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?o.event.trigger(a,b,c,!0):void 0}});var ab=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bb=/<([\w:]+)/,cb=/<|&#?\w+;/,db=/<(?:script|style|link)/i,eb=/checked\s*(?:[^=]|=\s*.checked.)/i,fb=/^$|\/(?:java|ecma)script/i,gb=/^true\/(.*)/,hb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ib={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ib.optgroup=ib.option,ib.tbody=ib.tfoot=ib.colgroup=ib.caption=ib.thead,ib.th=ib.td;function jb(a,b){return o.nodeName(a,"table")&&o.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function kb(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function lb(a){var b=gb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function mb(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function nb(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)o.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=o.extend({},h),M.set(b,i))}}function ob(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&o.nodeName(a,b)?o.merge([a],c):c}function pb(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}o.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=o.contains(a.ownerDocument,a);if(!(l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||o.isXMLDoc(a)))for(g=ob(h),f=ob(a),d=0,e=f.length;e>d;d++)pb(f[d],g[d]);if(b)if(c)for(f=f||ob(a),g=g||ob(h),d=0,e=f.length;e>d;d++)nb(f[d],g[d]);else nb(a,h);return g=ob(h,"script"),g.length>0&&mb(g,!i&&ob(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,n=a.length;n>m;m++)if(e=a[m],e||0===e)if("object"===o.type(e))o.merge(l,e.nodeType?[e]:e);else if(cb.test(e)){f=f||k.appendChild(b.createElement("div")),g=(bb.exec(e)||["",""])[1].toLowerCase(),h=ib[g]||ib._default,f.innerHTML=h[1]+e.replace(ab,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;o.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===o.inArray(e,d))&&(i=o.contains(e.ownerDocument,e),f=ob(k.appendChild(e),"script"),i&&mb(f),c)){j=0;while(e=f[j++])fb.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f,g,h=o.event.special,i=0;void 0!==(c=a[i]);i++){if(o.acceptData(c)&&(f=c[L.expando],f&&(b=L.cache[f]))){if(d=Object.keys(b.events||{}),d.length)for(g=0;void 0!==(e=d[g]);g++)h[e]?o.event.remove(c,e):o.removeEvent(c,e,b.handle);L.cache[f]&&delete L.cache[f]}delete M.cache[c[M.expando]]}}}),o.fn.extend({text:function(a){return J(this,function(a){return void 0===a?o.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=jb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?o.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||o.cleanData(ob(c)),c.parentNode&&(b&&o.contains(c.ownerDocument,c)&&mb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(o.cleanData(ob(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return o.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!db.test(a)&&!ib[(bb.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(ab,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(o.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,o.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,k=this.length,m=this,n=k-1,p=a[0],q=o.isFunction(p);if(q||k>1&&"string"==typeof p&&!l.checkClone&&eb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(k&&(c=o.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=o.map(ob(c,"script"),kb),g=f.length;k>j;j++)h=c,j!==n&&(h=o.clone(h,!0,!0),g&&o.merge(f,ob(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,o.map(f,lb),j=0;g>j;j++)h=f[j],fb.test(h.type||"")&&!L.access(h,"globalEval")&&o.contains(i,h)&&(h.src?o._evalUrl&&o._evalUrl(h.src):o.globalEval(h.textContent.replace(hb,"")))}return this}}),o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){o.fn[a]=function(a){for(var c,d=[],e=o(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),o(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qb,rb={};function sb(b,c){var d=o(c.createElement(b)).appendTo(c.body),e=a.getDefaultComputedStyle?a.getDefaultComputedStyle(d[0]).display:o.css(d[0],"display");return d.detach(),e}function tb(a){var b=m,c=rb[a];return c||(c=sb(a,b),"none"!==c&&c||(qb=(qb||o("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qb[0].contentDocument,b.write(),b.close(),c=sb(a,b),qb.detach()),rb[a]=c),c}var ub=/^margin/,vb=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wb=function(a){return a.ownerDocument.defaultView.getComputedStyle(a,null)};function xb(a,b,c){var d,e,f,g,h=a.style;return c=c||wb(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||o.contains(a.ownerDocument,a)||(g=o.style(a,b)),vb.test(g)&&ub.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function yb(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",e=m.documentElement,f=m.createElement("div"),g=m.createElement("div");g.style.backgroundClip="content-box",g.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===g.style.backgroundClip,f.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",f.appendChild(g);function h(){g.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",e.appendChild(f);var d=a.getComputedStyle(g,null);b="1%"!==d.top,c="4px"===d.width,e.removeChild(f)}a.getComputedStyle&&o.extend(l,{pixelPosition:function(){return h(),b},boxSizingReliable:function(){return null==c&&h(),c},reliableMarginRight:function(){var b,c=g.appendChild(m.createElement("div"));return c.style.cssText=g.style.cssText=d,c.style.marginRight=c.style.width="0",g.style.width="1px",e.appendChild(f),b=!parseFloat(a.getComputedStyle(c,null).marginRight),e.removeChild(f),g.innerHTML="",b}})}(),o.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var zb=/^(none|table(?!-c[ea]).+)/,Ab=new RegExp("^("+Q+")(.*)$","i"),Bb=new RegExp("^([+-])=("+Q+")","i"),Cb={position:"absolute",visibility:"hidden",display:"block"},Db={letterSpacing:0,fontWeight:400},Eb=["Webkit","O","Moz","ms"];function Fb(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Eb.length;while(e--)if(b=Eb[e]+c,b in a)return b;return d}function Gb(a,b,c){var d=Ab.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Hb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=o.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=o.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=o.css(a,"border"+R[f]+"Width",!0,e))):(g+=o.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=o.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ib(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wb(a),g="border-box"===o.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xb(a,b,f),(0>e||null==e)&&(e=a.style[b]),vb.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Hb(a,b,c||(g?"border":"content"),d,f)+"px"}function Jb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",tb(d.nodeName)))):f[g]||(e=S(d),(c&&"none"!==c||!e)&&L.set(d,"olddisplay",e?c:o.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}o.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xb(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=o.camelCase(b),i=a.style;return b=o.cssProps[h]||(o.cssProps[h]=Fb(i,h)),g=o.cssHooks[b]||o.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Bb.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(o.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||o.cssNumber[h]||(c+="px"),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]="",i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=o.camelCase(b);return b=o.cssProps[h]||(o.cssProps[h]=Fb(a.style,h)),g=o.cssHooks[b]||o.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xb(a,b,d)),"normal"===e&&b in Db&&(e=Db[b]),""===c||c?(f=parseFloat(e),c===!0||o.isNumeric(f)?f||0:e):e}}),o.each(["height","width"],function(a,b){o.cssHooks[b]={get:function(a,c,d){return c?0===a.offsetWidth&&zb.test(o.css(a,"display"))?o.swap(a,Cb,function(){return Ib(a,b,d)}):Ib(a,b,d):void 0},set:function(a,c,d){var e=d&&wb(a);return Gb(a,c,d?Hb(a,b,d,"border-box"===o.css(a,"boxSizing",!1,e),e):0)}}}),o.cssHooks.marginRight=yb(l.reliableMarginRight,function(a,b){return b?o.swap(a,{display:"inline-block"},xb,[a,"marginRight"]):void 0}),o.each({margin:"",padding:"",border:"Width"},function(a,b){o.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ub.test(a)||(o.cssHooks[a+b].set=Gb)}),o.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(o.isArray(b)){for(d=wb(a),e=b.length;e>g;g++)f[b[g]]=o.css(a,b[g],!1,d);return f}return void 0!==c?o.style(a,b,c):o.css(a,b)},a,b,arguments.length>1)},show:function(){return Jb(this,!0)},hide:function(){return Jb(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?o(this).show():o(this).hide()})}});function Kb(a,b,c,d,e){return new Kb.prototype.init(a,b,c,d,e)}o.Tween=Kb,Kb.prototype={constructor:Kb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(o.cssNumber[c]?"":"px")},cur:function(){var a=Kb.propHooks[this.prop];return a&&a.get?a.get(this):Kb.propHooks._default.get(this)},run:function(a){var b,c=Kb.propHooks[this.prop];return this.pos=b=this.options.duration?o.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Kb.propHooks._default.set(this),this}},Kb.prototype.init.prototype=Kb.prototype,Kb.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=o.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){o.fx.step[a.prop]?o.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[o.cssProps[a.prop]]||o.cssHooks[a.prop])?o.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Kb.propHooks.scrollTop=Kb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},o.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},o.fx=Kb.prototype.init,o.fx.step={};var Lb,Mb,Nb=/^(?:toggle|show|hide)$/,Ob=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pb=/queueHooks$/,Qb=[Vb],Rb={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Ob.exec(b),f=e&&e[3]||(o.cssNumber[a]?"":"px"),g=(o.cssNumber[a]||"px"!==f&&+d)&&Ob.exec(o.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,o.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sb(){return setTimeout(function(){Lb=void 0}),Lb=o.now()}function Tb(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ub(a,b,c){for(var d,e=(Rb[b]||[]).concat(Rb["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Vb(a,b,c){var d,e,f,g,h,i,j,k=this,l={},m=a.style,n=a.nodeType&&S(a),p=L.get(a,"fxshow");c.queue||(h=o._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,k.always(function(){k.always(function(){h.unqueued--,o.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[m.overflow,m.overflowX,m.overflowY],j=o.css(a,"display"),"none"===j&&(j=tb(a.nodeName)),"inline"===j&&"none"===o.css(a,"float")&&(m.display="inline-block")),c.overflow&&(m.overflow="hidden",k.always(function(){m.overflow=c.overflow[0],m.overflowX=c.overflow[1],m.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Nb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(n?"hide":"show")){if("show"!==e||!p||void 0===p[d])continue;n=!0}l[d]=p&&p[d]||o.style(a,d)}if(!o.isEmptyObject(l)){p?"hidden"in p&&(n=p.hidden):p=L.access(a,"fxshow",{}),f&&(p.hidden=!n),n?o(a).show():k.done(function(){o(a).hide()}),k.done(function(){var b;L.remove(a,"fxshow");for(b in l)o.style(a,b,l[b])});for(d in l)g=Ub(n?p[d]:0,d,k),d in p||(p[d]=g.start,n&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wb(a,b){var c,d,e,f,g;for(c in a)if(d=o.camelCase(c),e=b[d],f=a[c],o.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=o.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xb(a,b,c){var d,e,f=0,g=Qb.length,h=o.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Lb||Sb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:o.extend({},b),opts:o.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:Lb||Sb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=o.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wb(k,j.opts.specialEasing);g>f;f++)if(d=Qb[f].call(j,a,k,j.opts))return d;return o.map(k,Ub,j),o.isFunction(j.opts.start)&&j.opts.start.call(a,j),o.fx.timer(o.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}o.Animation=o.extend(Xb,{tweener:function(a,b){o.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Rb[c]=Rb[c]||[],Rb[c].unshift(b)},prefilter:function(a,b){b?Qb.unshift(a):Qb.push(a)}}),o.speed=function(a,b,c){var d=a&&"object"==typeof a?o.extend({},a):{complete:c||!c&&b||o.isFunction(a)&&a,duration:a,easing:c&&b||b&&!o.isFunction(b)&&b};return d.duration=o.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in o.fx.speeds?o.fx.speeds[d.duration]:o.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){o.isFunction(d.old)&&d.old.call(this),d.queue&&o.dequeue(this,d.queue)},d},o.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=o.isEmptyObject(a),f=o.speed(b,c,d),g=function(){var b=Xb(this,o.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=o.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&o.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=o.timers,g=d?d.length:0;for(c.finish=!0,o.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),o.each(["toggle","show","hide"],function(a,b){var c=o.fn[b];o.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Tb(b,!0),a,d,e)}}),o.each({slideDown:Tb("show"),slideUp:Tb("hide"),slideToggle:Tb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){o.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),o.timers=[],o.fx.tick=function(){var a,b=0,c=o.timers;for(Lb=o.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||o.fx.stop(),Lb=void 0},o.fx.timer=function(a){o.timers.push(a),a()?o.fx.start():o.timers.pop()},o.fx.interval=13,o.fx.start=function(){Mb||(Mb=setInterval(o.fx.tick,o.fx.interval))},o.fx.stop=function(){clearInterval(Mb),Mb=null},o.fx.speeds={slow:600,fast:200,_default:400},o.fn.delay=function(a,b){return a=o.fx?o.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=m.createElement("input"),b=m.createElement("select"),c=b.appendChild(m.createElement("option"));a.type="checkbox",l.checkOn=""!==a.value,l.optSelected=c.selected,b.disabled=!0,l.optDisabled=!c.disabled,a=m.createElement("input"),a.value="t",a.type="radio",l.radioValue="t"===a.value}();var Yb,Zb,$b=o.expr.attrHandle;o.fn.extend({attr:function(a,b){return J(this,o.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){o.removeAttr(this,a)})}}),o.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?o.prop(a,b,c):(1===f&&o.isXMLDoc(a)||(b=b.toLowerCase(),d=o.attrHooks[b]||(o.expr.match.bool.test(b)?Zb:Yb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=o.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void o.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=o.propFix[c]||c,o.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&o.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Zb={set:function(a,b,c){return b===!1?o.removeAttr(a,c):a.setAttribute(c,c),c}},o.each(o.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$b[b]||o.find.attr;$b[b]=function(a,b,d){var e,f;
return d||(f=$b[b],$b[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$b[b]=f),e}});var _b=/^(?:input|select|textarea|button)$/i;o.fn.extend({prop:function(a,b){return J(this,o.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[o.propFix[a]||a]})}}),o.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!o.isXMLDoc(a),f&&(b=o.propFix[b]||b,e=o.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_b.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),l.optSelected||(o.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),o.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){o.propFix[this.toLowerCase()]=this});var ac=/[\t\r\n\f]/g;o.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=o.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(o.isFunction(a))return this.each(function(b){o(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ac," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?o.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(o.isFunction(a)?function(c){o(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=o(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ac," ").indexOf(b)>=0)return!0;return!1}});var bc=/\r/g;o.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=o.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,o(this).val()):a,null==e?e="":"number"==typeof e?e+="":o.isArray(e)&&(e=o.map(e,function(a){return null==a?"":a+""})),b=o.valHooks[this.type]||o.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=o.valHooks[e.type]||o.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bc,""):null==c?"":c)}}}),o.extend({valHooks:{select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(l.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&o.nodeName(c.parentNode,"optgroup"))){if(b=o(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=o.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=o.inArray(o(d).val(),f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),o.each(["radio","checkbox"],function(){o.valHooks[this]={set:function(a,b){return o.isArray(b)?a.checked=o.inArray(o(a).val(),b)>=0:void 0}},l.checkOn||(o.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),o.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){o.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),o.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cc=o.now(),dc=/\?/;o.parseJSON=function(a){return JSON.parse(a+"")},o.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&o.error("Invalid XML: "+a),b};var ec,fc,gc=/#.*$/,hc=/([?&])_=[^&]*/,ic=/^(.*?):[ \t]*([^\r\n]*)$/gm,jc=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,kc=/^(?:GET|HEAD)$/,lc=/^\/\//,mc=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,nc={},oc={},pc="*/".concat("*");try{fc=location.href}catch(qc){fc=m.createElement("a"),fc.href="",fc=fc.href}ec=mc.exec(fc.toLowerCase())||[];function rc(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(o.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function sc(a,b,c,d){var e={},f=a===oc;function g(h){var i;return e[h]=!0,o.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function tc(a,b){var c,d,e=o.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&o.extend(!0,a,d),a}function uc(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function vc(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}o.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:fc,type:"GET",isLocal:jc.test(ec[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":pc,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":o.parseJSON,"text xml":o.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?tc(tc(a,o.ajaxSettings),b):tc(o.ajaxSettings,a)},ajaxPrefilter:rc(nc),ajaxTransport:rc(oc),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=o.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?o(l):o.event,n=o.Deferred(),p=o.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=ic.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(n.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||fc)+"").replace(gc,"").replace(lc,ec[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=o.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=mc.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===ec[1]&&h[2]===ec[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(ec[3]||("http:"===ec[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=o.param(k.data,k.traditional)),sc(nc,k,b,v),2===t)return v;i=k.global,i&&0===o.active++&&o.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!kc.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(dc.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=hc.test(d)?d.replace(hc,"$1_="+cc++):d+(dc.test(d)?"&":"?")+"_="+cc++)),k.ifModified&&(o.lastModified[d]&&v.setRequestHeader("If-Modified-Since",o.lastModified[d]),o.etag[d]&&v.setRequestHeader("If-None-Match",o.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+pc+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=sc(oc,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=uc(k,v,f)),u=vc(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(o.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(o.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?n.resolveWith(l,[r,x,v]):n.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--o.active||o.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return o.get(a,b,c,"json")},getScript:function(a,b){return o.get(a,void 0,b,"script")}}),o.each(["get","post"],function(a,b){o[b]=function(a,c,d,e){return o.isFunction(c)&&(e=e||d,d=c,c=void 0),o.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),o.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){o.fn[b]=function(a){return this.on(b,a)}}),o._evalUrl=function(a){return o.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},o.fn.extend({wrapAll:function(a){var b;return o.isFunction(a)?this.each(function(b){o(this).wrapAll(a.call(this,b))}):(this[0]&&(b=o(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(o.isFunction(a)?function(b){o(this).wrapInner(a.call(this,b))}:function(){var b=o(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=o.isFunction(a);return this.each(function(c){o(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){o.nodeName(this,"body")||o(this).replaceWith(this.childNodes)}).end()}}),o.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},o.expr.filters.visible=function(a){return!o.expr.filters.hidden(a)};var wc=/%20/g,xc=/\[\]$/,yc=/\r?\n/g,zc=/^(?:submit|button|image|reset|file)$/i,Ac=/^(?:input|select|textarea|keygen)/i;function Bc(a,b,c,d){var e;if(o.isArray(b))o.each(b,function(b,e){c||xc.test(a)?d(a,e):Bc(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==o.type(b))d(a,b);else for(e in b)Bc(a+"["+e+"]",b[e],c,d)}o.param=function(a,b){var c,d=[],e=function(a,b){b=o.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=o.ajaxSettings&&o.ajaxSettings.traditional),o.isArray(a)||a.jquery&&!o.isPlainObject(a))o.each(a,function(){e(this.name,this.value)});else for(c in a)Bc(c,a[c],b,e);return d.join("&").replace(wc,"+")},o.fn.extend({serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=o.prop(this,"elements");return a?o.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!o(this).is(":disabled")&&Ac.test(this.nodeName)&&!zc.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=o(this).val();return null==c?null:o.isArray(c)?o.map(c,function(a){return{name:b.name,value:a.replace(yc,"\r\n")}}):{name:b.name,value:c.replace(yc,"\r\n")}}).get()}}),o.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Cc=0,Dc={},Ec={0:200,1223:204},Fc=o.ajaxSettings.xhr();a.ActiveXObject&&o(a).on("unload",function(){for(var a in Dc)Dc[a]()}),l.cors=!!Fc&&"withCredentials"in Fc,l.ajax=Fc=!!Fc,o.ajaxTransport(function(a){var b;return l.cors||Fc&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Cc;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Dc[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Ec[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Dc[g]=b("abort"),f.send(a.hasContent&&a.data||null)},abort:function(){b&&b()}}:void 0}),o.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return o.globalEval(a),a}}}),o.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),o.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=o("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),m.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Gc=[],Hc=/(=)\?(?=&|$)|\?\?/;o.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Gc.pop()||o.expando+"_"+cc++;return this[a]=!0,a}}),o.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Hc.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Hc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=o.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Hc,"$1"+e):b.jsonp!==!1&&(b.url+=(dc.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||o.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Gc.push(e)),g&&o.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),o.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||m;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=o.buildFragment([a],b,e),e&&e.length&&o(e).remove(),o.merge([],d.childNodes))};var Ic=o.fn.load;o.fn.load=function(a,b,c){if("string"!=typeof a&&Ic)return Ic.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=a.slice(h),a=a.slice(0,h)),o.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&o.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?o("<div>").append(o.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},o.expr.filters.animated=function(a){return o.grep(o.timers,function(b){return a===b.elem}).length};var Jc=a.document.documentElement;function Kc(a){return o.isWindow(a)?a:9===a.nodeType&&a.defaultView}o.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=o.css(a,"position"),l=o(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=o.css(a,"top"),i=o.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),o.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},o.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){o.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,o.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Kc(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===o.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),o.nodeName(a[0],"html")||(d=a.offset()),d.top+=o.css(a[0],"borderTopWidth",!0),d.left+=o.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-o.css(c,"marginTop",!0),left:b.left-d.left-o.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Jc;while(a&&!o.nodeName(a,"html")&&"static"===o.css(a,"position"))a=a.offsetParent;return a||Jc})}}),o.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;o.fn[b]=function(e){return J(this,function(b,e,f){var g=Kc(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),o.each(["top","left"],function(a,b){o.cssHooks[b]=yb(l.pixelPosition,function(a,c){return c?(c=xb(a,b),vb.test(c)?o(a).position()[b]+"px":c):void 0})}),o.each({Height:"height",Width:"width"},function(a,b){o.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){o.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return o.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?o.css(b,c,g):o.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),o.fn.size=function(){return this.length},o.fn.andSelf=o.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return o});var Lc=a.jQuery,Mc=a.$;return o.noConflict=function(b){return a.$===o&&(a.$=Mc),b&&a.jQuery===o&&(a.jQuery=Lc),o},typeof b===U&&(a.jQuery=a.$=o),o});

; browserify_shim__define__module__export__(typeof $ != "undefined" ? $ : window.$);

}).call(global, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

},{}],4:[function(require,module,exports){
var url = require('url');

module.exports = function(router) {
  return {
    setup: function(){
      $('.nav-tabs a').on('click', function(e) {
        e.preventDefault();
        console.log('click')
        var href = url.parse(this.href);
        if (!$(this).parent().hasClass('active')) {
          router.setRoute(2, href.hash.substr(1))
        }
      });
    },

    index: function(id, resource, action) {
      console.log('ROOT', id, id === undefined)
      if (id === undefined) {
        $('#list').slideDown();
        $('#show').slideUp();
      }
    },

    show: function (id, resource, action) {
      console.log('networkShow')
      $('#list').slideUp();
      $('#show').slideDown();

      $('h2.text-muted').text('Showing network '+id)

      if (!resource)
        $('.nav-tabs a:first').tab('show')

    },

    resource: function(networkId, resource, action) {
      console.log('resourceShow')
      $('.nav-tabs a[href="#'+resource+'"]').tab('show')
    },

    resourceAction: function(networkId, resource, action) {
      console.log('resourceAction')
      $('#'+resource+' strong').text(action)
    }
  }
}

},{"url":9}],5:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};/*! http://mths.be/punycode v1.2.3 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports;
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^ -~]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /\x2E|\u3002|\uFF0E|\uFF61/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		while (length--) {
			array[length] = fn(array[length]);
		}
		return array;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings.
	 * @private
	 * @param {String} domain The domain name.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		return map(string.split(regexSeparators), fn).join('.');
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <http://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    length,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols to a Punycode string of ASCII-only
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name to Unicode. Only the
	 * Punycoded parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it on a string that has already been converted to
	 * Unicode.
	 * @memberOf punycode
	 * @param {String} domain The Punycode domain name to convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(domain) {
		return mapDomain(domain, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name to Punycode. Only the
	 * non-ASCII parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it with a domain that's already in ASCII.
	 * @memberOf punycode
	 * @param {String} domain The domain name to convert, as a Unicode string.
	 * @returns {String} The Punycode representation of the given domain name.
	 */
	function toASCII(domain) {
		return mapDomain(domain, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.2.3',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <http://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define(function() {
			return punycode;
		});
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

},{}],6:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],7:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return obj[k].map(function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],8:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":6,"./encode":7}],9:[function(require,module,exports){
/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true*/
(function () {
  "use strict";

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var punycode = require('punycode');

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '~', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(delims),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#']
      .concat(unwise).concat(autoEscape),
    nonAuthChars = ['/', '@', '?', '#'].concat(delims),
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[a-zA-Z0-9][a-z0-9A-Z_-]{0,62}$/,
    hostnamePartStart = /^([a-zA-Z0-9][a-z0-9A-Z_-]{0,62})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always have a path component.
    pathedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = require('querystring');

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && typeof(url) === 'object' && url.href) return url;

  if (typeof url !== 'string') {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  var out = {},
      rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    out.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      out.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {
    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    // don't enforce full RFC correctness, just be unstupid about it.

    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the first @ sign, unless some non-auth character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    var atSign = rest.indexOf('@');
    if (atSign !== -1) {
      var auth = rest.slice(0, atSign);

      // there *may be* an auth
      var hasAuth = true;
      for (var i = 0, l = nonAuthChars.length; i < l; i++) {
        if (auth.indexOf(nonAuthChars[i]) !== -1) {
          // not a valid auth.  Something like http://foo.com/bar@baz/
          hasAuth = false;
          break;
        }
      }

      if (hasAuth) {
        // pluck off the auth portion.
        out.auth = decodeURIComponent(auth);
        rest = rest.substr(atSign + 1);
      }
    }

    var firstNonHost = -1;
    for (var i = 0, l = nonHostChars.length; i < l; i++) {
      var index = rest.indexOf(nonHostChars[i]);
      if (index !== -1 &&
          (firstNonHost < 0 || index < firstNonHost)) firstNonHost = index;
    }

    if (firstNonHost !== -1) {
      out.host = rest.substr(0, firstNonHost);
      rest = rest.substr(firstNonHost);
    } else {
      out.host = rest;
      rest = '';
    }

    // pull out port.
    var p = parseHost(out.host);
    var keys = Object.keys(p);
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      out[key] = p[key];
    }

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    out.hostname = out.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = out.hostname[0] === '[' &&
        out.hostname[out.hostname.length - 1] === ']';

    // validate a little.
    if (out.hostname.length > hostnameMaxLen) {
      out.hostname = '';
    } else if (!ipv6Hostname) {
      var hostparts = out.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            out.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    // hostnames are always lower case.
    out.hostname = out.hostname.toLowerCase();

    if (!ipv6Hostname) {
      // IDNA Support: Returns a puny coded representation of "domain".
      // It only converts the part of the domain name that
      // has non ASCII characters. I.e. it dosent matter if
      // you call it with a domain that already is in ASCII.
      var domainArray = out.hostname.split('.');
      var newOut = [];
      for (var i = 0; i < domainArray.length; ++i) {
        var s = domainArray[i];
        newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
            'xn--' + punycode.encode(s) : s);
      }
      out.hostname = newOut.join('.');
    }

    out.host = (out.hostname || '') +
        ((out.port) ? ':' + out.port : '');
    out.href += out.host;

    // strip [ and ] from the hostname
    if (ipv6Hostname) {
      out.hostname = out.hostname.substr(1, out.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    out.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    out.search = rest.substr(qm);
    out.query = rest.substr(qm + 1);
    if (parseQueryString) {
      out.query = querystring.parse(out.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    out.search = '';
    out.query = {};
  }
  if (rest) out.pathname = rest;
  if (slashedProtocol[proto] &&
      out.hostname && !out.pathname) {
    out.pathname = '/';
  }

  //to support http.request
  if (out.pathname || out.search) {
    out.path = (out.pathname ? out.pathname : '') +
               (out.search ? out.search : '');
  }

  // finally, reconstruct the href based on what has been validated.
  out.href = urlFormat(out);
  return out;
}

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (typeof(obj) === 'string') obj = urlParse(obj);

  var auth = obj.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = obj.protocol || '',
      pathname = obj.pathname || '',
      hash = obj.hash || '',
      host = false,
      query = '';

  if (obj.host !== undefined) {
    host = auth + obj.host;
  } else if (obj.hostname !== undefined) {
    host = auth + (obj.hostname.indexOf(':') === -1 ?
        obj.hostname :
        '[' + obj.hostname + ']');
    if (obj.port) {
      host += ':' + obj.port;
    }
  }

  if (obj.query && typeof obj.query === 'object' &&
      Object.keys(obj.query).length) {
    query = querystring.stringify(obj.query);
  }

  var search = obj.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (obj.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  return protocol + host + pathname + search + hash;
}

function urlResolve(source, relative) {
  return urlFormat(urlResolveObject(source, relative));
}

function urlResolveObject(source, relative) {
  if (!source) return relative;

  source = urlParse(urlFormat(source), false, true);
  relative = urlParse(urlFormat(relative), false, true);

  // hash is always overridden, no matter what.
  source.hash = relative.hash;

  if (relative.href === '') {
    source.href = urlFormat(source);
    return source;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    relative.protocol = source.protocol;
    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[relative.protocol] &&
        relative.hostname && !relative.pathname) {
      relative.path = relative.pathname = '/';
    }
    relative.href = urlFormat(relative);
    return relative;
  }

  if (relative.protocol && relative.protocol !== source.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      relative.href = urlFormat(relative);
      return relative;
    }
    source.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      relative.pathname = relPath.join('/');
    }
    source.pathname = relative.pathname;
    source.search = relative.search;
    source.query = relative.query;
    source.host = relative.host || '';
    source.auth = relative.auth;
    source.hostname = relative.hostname || relative.host;
    source.port = relative.port;
    //to support http.request
    if (source.pathname !== undefined || source.search !== undefined) {
      source.path = (source.pathname ? source.pathname : '') +
                    (source.search ? source.search : '');
    }
    source.slashes = source.slashes || relative.slashes;
    source.href = urlFormat(source);
    return source;
  }

  var isSourceAbs = (source.pathname && source.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host !== undefined ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (source.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = source.pathname && source.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = source.protocol &&
          !slashedProtocol[source.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // source.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {

    delete source.hostname;
    delete source.port;
    if (source.host) {
      if (srcPath[0] === '') srcPath[0] = source.host;
      else srcPath.unshift(source.host);
    }
    delete source.host;
    if (relative.protocol) {
      delete relative.hostname;
      delete relative.port;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      delete relative.host;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    source.host = (relative.host || relative.host === '') ?
                      relative.host : source.host;
    source.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : source.hostname;
    source.search = relative.search;
    source.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    source.search = relative.search;
    source.query = relative.query;
  } else if ('search' in relative) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      source.hostname = source.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especialy happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = source.host && source.host.indexOf('@') > 0 ?
                       source.host.split('@') : false;
      if (authInHost) {
        source.auth = authInHost.shift();
        source.host = source.hostname = authInHost.shift();
      }
    }
    source.search = relative.search;
    source.query = relative.query;
    //to support http.request
    if (source.pathname !== undefined || source.search !== undefined) {
      source.path = (source.pathname ? source.pathname : '') +
                    (source.search ? source.search : '');
    }
    source.href = urlFormat(source);
    return source;
  }
  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    delete source.pathname;
    //to support http.request
    if (!source.search) {
      source.path = '/' + source.search;
    } else {
      delete source.path;
    }
    source.href = urlFormat(source);
    return source;
  }
  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (source.host || relative.host) && (last === '.' || last === '..') ||
      last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last == '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    source.hostname = source.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especialy happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = source.host && source.host.indexOf('@') > 0 ?
                     source.host.split('@') : false;
    if (authInHost) {
      source.auth = authInHost.shift();
      source.host = source.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (source.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  source.pathname = srcPath.join('/');
  //to support request.http
  if (source.pathname !== undefined || source.search !== undefined) {
    source.path = (source.pathname ? source.pathname : '') +
                  (source.search ? source.search : '');
  }
  source.auth = relative.auth || source.auth;
  source.slashes = source.slashes || relative.slashes;
  source.href = urlFormat(source);
  return source;
}

function parseHost(host) {
  var out = {};
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      out.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) out.hostname = host;
  return out;
}

}());

},{"punycode":5,"querystring":8}],10:[function(require,module,exports){


//
// Generated on Sun Jan 26 2014 21:58:12 GMT-0500 (EST) by Nodejitsu, Inc (Using Codesurgeon).
// Version 1.2.2
//

(function (exports) {

/*
 * browser.js: Browser specific functionality for director.
 *
 * (C) 2011, Nodejitsu Inc.
 * MIT LICENSE
 *
 */

if (!Array.prototype.filter) {
  Array.prototype.filter = function(filter, that) {
    var other = [], v;
    for (var i = 0, n = this.length; i < n; i++) {
      if (i in this && filter.call(that, v = this[i], i, this)) {
        other.push(v);
      }
    }
    return other;
  };
}

if (!Array.isArray){
  Array.isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };
}

var dloc = document.location;

function dlocHashEmpty() {
  // Non-IE browsers return '' when the address bar shows '#'; Director's logic
  // assumes both mean empty.
  return dloc.hash === '' || dloc.hash === '#';
}

var listener = {
  mode: 'modern',
  hash: dloc.hash,
  history: false,

  check: function () {
    var h = dloc.hash;
    if (h != this.hash) {
      this.hash = h;
      this.onHashChanged();
    }
  },

  fire: function () {
    if (this.mode === 'modern') {
      this.history === true ? window.onpopstate() : window.onhashchange();
    }
    else {
      this.onHashChanged();
    }
  },

  init: function (fn, history) {
    var self = this;
    this.history = history;

    if (!Router.listeners) {
      Router.listeners = [];
    }

    function onchange(onChangeEvent) {
      for (var i = 0, l = Router.listeners.length; i < l; i++) {
        Router.listeners[i](onChangeEvent);
      }
    }

    //note IE8 is being counted as 'modern' because it has the hashchange event
    if ('onhashchange' in window && (document.documentMode === undefined
      || document.documentMode > 7)) {
      // At least for now HTML5 history is available for 'modern' browsers only
      if (this.history === true) {
        // There is an old bug in Chrome that causes onpopstate to fire even
        // upon initial page load. Since the handler is run manually in init(),
        // this would cause Chrome to run it twise. Currently the only
        // workaround seems to be to set the handler after the initial page load
        // http://code.google.com/p/chromium/issues/detail?id=63040
        setTimeout(function() {
          window.onpopstate = onchange;
        }, 500);
      }
      else {
        window.onhashchange = onchange;
      }
      this.mode = 'modern';
    }
    else {
      //
      // IE support, based on a concept by Erik Arvidson ...
      //
      var frame = document.createElement('iframe');
      frame.id = 'state-frame';
      frame.style.display = 'none';
      document.body.appendChild(frame);
      this.writeFrame('');

      if ('onpropertychange' in document && 'attachEvent' in document) {
        document.attachEvent('onpropertychange', function () {
          if (event.propertyName === 'location') {
            self.check();
          }
        });
      }

      window.setInterval(function () { self.check(); }, 50);

      this.onHashChanged = onchange;
      this.mode = 'legacy';
    }

    Router.listeners.push(fn);

    return this.mode;
  },

  destroy: function (fn) {
    if (!Router || !Router.listeners) {
      return;
    }

    var listeners = Router.listeners;

    for (var i = listeners.length - 1; i >= 0; i--) {
      if (listeners[i] === fn) {
        listeners.splice(i, 1);
      }
    }
  },

  setHash: function (s) {
    // Mozilla always adds an entry to the history
    if (this.mode === 'legacy') {
      this.writeFrame(s);
    }

    if (this.history === true) {
      window.history.pushState({}, document.title, s);
      // Fire an onpopstate event manually since pushing does not obviously
      // trigger the pop event.
      this.fire();
    } else {
      dloc.hash = (s[0] === '/') ? s : '/' + s;
    }
    return this;
  },

  writeFrame: function (s) {
    // IE support...
    var f = document.getElementById('state-frame');
    var d = f.contentDocument || f.contentWindow.document;
    d.open();
    d.write("<script>_hash = '" + s + "'; onload = parent.listener.syncHash;<script>");
    d.close();
  },

  syncHash: function () {
    // IE support...
    var s = this._hash;
    if (s != dloc.hash) {
      dloc.hash = s;
    }
    return this;
  },

  onHashChanged: function () {}
};

var Router = exports.Router = function (routes) {
  if (!(this instanceof Router)) return new Router(routes);

  this.params   = {};
  this.routes   = {};
  this.methods  = ['on', 'once', 'after', 'before'];
  this.scope    = [];
  this._methods = {};

  this._insert = this.insert;
  this.insert = this.insertEx;

  this.historySupport = (window.history != null ? window.history.pushState : null) != null

  this.configure();
  this.mount(routes || {});
};

Router.prototype.init = function (r) {
  var self = this;
  this.handler = function(onChangeEvent) {
    var newURL = onChangeEvent && onChangeEvent.newURL || window.location.hash;
    var url = self.history === true ? self.getPath() : newURL.replace(/.*#/, '');
    self.dispatch('on', url.charAt(0) === '/' ? url : '/' + url);
  };

  listener.init(this.handler, this.history);

  if (this.history === false) {
    if (dlocHashEmpty() && r) {
      dloc.hash = r;
    } else if (!dlocHashEmpty()) {
      self.dispatch('on', '/' + dloc.hash.replace(/^(#\/|#|\/)/, ''));
    }
  }
  else {
    var routeTo = dlocHashEmpty() && r ? r : !dlocHashEmpty() ? dloc.hash.replace(/^#/, '') : null;
    if (routeTo) {
      window.history.replaceState({}, document.title, routeTo);
    }

    // Router has been initialized, but due to the chrome bug it will not
    // yet actually route HTML5 history state changes. Thus, decide if should route.
    if (routeTo || this.run_in_init === true) {
      this.handler();
    }
  }

  return this;
};

Router.prototype.explode = function () {
  var v = this.history === true ? this.getPath() : dloc.hash;
  if (v.charAt(1) === '/') { v=v.slice(1) }
  return v.slice(1, v.length).split("/");
};

Router.prototype.setRoute = function (i, v, val) {
  var url = this.explode();

  if (typeof i === 'number' && typeof v === 'string') {
    url[i] = v;
  }
  else if (typeof val === 'string') {
    url.splice(i, v, s);
  }
  else {
    url = [i];
  }

  listener.setHash(url.join('/'));
  return url;
};

//
// ### function insertEx(method, path, route, parent)
// #### @method {string} Method to insert the specific `route`.
// #### @path {Array} Parsed path to insert the `route` at.
// #### @route {Array|function} Route handlers to insert.
// #### @parent {Object} **Optional** Parent "routes" to insert into.
// insert a callback that will only occur once per the matched route.
//
Router.prototype.insertEx = function(method, path, route, parent) {
  var self = this;
  if (method === "once") {
    method = "on";
    route = function(route) {
      var once = false;
      return function() {
        if (once) return;
        once = true;
        if (self.resource && typeof route === 'string') {
          return self.resource[route].apply(this, arguments);
        } else {
          return route.apply(this, arguments);
        }
      };
    }(route);
  }
  return this._insert(method, path, route, parent);
};

Router.prototype.getRoute = function (v) {
  var ret = v;

  if (typeof v === "number") {
    ret = this.explode()[v];
  }
  else if (typeof v === "string"){
    var h = this.explode();
    ret = h.indexOf(v);
  }
  else {
    ret = this.explode();
  }

  return ret;
};

Router.prototype.destroy = function () {
  listener.destroy(this.handler);
  return this;
};

Router.prototype.getPath = function () {
  var path = window.location.pathname;
  if (path.substr(0, 1) !== '/') {
    path = '/' + path;
  }
  return path;
};
function _every(arr, iterator) {
  for (var i = 0; i < arr.length; i += 1) {
    if (iterator(arr[i], i, arr) === false) {
      return;
    }
  }
}

function _flatten(arr) {
  var flat = [];
  for (var i = 0, n = arr.length; i < n; i++) {
    flat = flat.concat(arr[i]);
  }
  return flat;
}

function _asyncEverySeries(arr, iterator, callback) {
  if (!arr.length) {
    return callback();
  }
  var completed = 0;
  (function iterate() {
    iterator(arr[completed], function(err) {
      if (err || err === false) {
        callback(err);
        callback = function() {};
      } else {
        completed += 1;
        if (completed === arr.length) {
          callback();
        } else {
          iterate();
        }
      }
    });
  })();
}

function paramifyString(str, params, mod) {
  mod = str;
  for (var param in params) {
    if (params.hasOwnProperty(param)) {
      mod = params[param](str);
      if (mod !== str) {
        break;
      }
    }
  }
  return mod === str ? "([._a-zA-Z0-9-]+)" : mod;
}

function regifyString(str, params) {
  var matches, last = 0, out = "";
  while (matches = str.substr(last).match(/[^\w\d\- %@&]*\*[^\w\d\- %@&]*/)) {
    last = matches.index + matches[0].length;
    matches[0] = matches[0].replace(/^\*/, "([_.()!\\ %@&a-zA-Z0-9-]+)");
    out += str.substr(0, matches.index) + matches[0];
  }
  str = out += str.substr(last);
  var captures = str.match(/:([^\/]+)/ig), capture, length;
  if (captures) {
    length = captures.length;
    for (var i = 0; i < length; i++) {
      capture = captures[i];
      if (capture.slice(0, 2) === "::") {
        str = capture.slice(1);
      } else {
        str = str.replace(capture, paramifyString(capture, params));
      }
    }
  }
  return str;
}

function terminator(routes, delimiter, start, stop) {
  var last = 0, left = 0, right = 0, start = (start || "(").toString(), stop = (stop || ")").toString(), i;
  for (i = 0; i < routes.length; i++) {
    var chunk = routes[i];
    if (chunk.indexOf(start, last) > chunk.indexOf(stop, last) || ~chunk.indexOf(start, last) && !~chunk.indexOf(stop, last) || !~chunk.indexOf(start, last) && ~chunk.indexOf(stop, last)) {
      left = chunk.indexOf(start, last);
      right = chunk.indexOf(stop, last);
      if (~left && !~right || !~left && ~right) {
        var tmp = routes.slice(0, (i || 1) + 1).join(delimiter);
        routes = [ tmp ].concat(routes.slice((i || 1) + 1));
      }
      last = (right > left ? right : left) + 1;
      i = 0;
    } else {
      last = 0;
    }
  }
  return routes;
}

Router.prototype.configure = function(options) {
  options = options || {};
  for (var i = 0; i < this.methods.length; i++) {
    this._methods[this.methods[i]] = true;
  }
  this.recurse = options.recurse || this.recurse || false;
  this.async = options.async || false;
  this.delimiter = options.delimiter || "/";
  this.strict = typeof options.strict === "undefined" ? true : options.strict;
  this.notfound = options.notfound;
  this.resource = options.resource;
  this.history = options.html5history && this.historySupport || false;
  this.run_in_init = this.history === true && options.run_handler_in_init !== false;
  this.every = {
    after: options.after || null,
    before: options.before || null,
    on: options.on || null
  };
  return this;
};

Router.prototype.param = function(token, matcher) {
  if (token[0] !== ":") {
    token = ":" + token;
  }
  var compiled = new RegExp(token, "g");
  this.params[token] = function(str) {
    return str.replace(compiled, matcher.source || matcher);
  };
};

Router.prototype.on = Router.prototype.route = function(method, path, route) {
  var self = this;
  if (!route && typeof path == "function") {
    route = path;
    path = method;
    method = "on";
  }
  if (Array.isArray(path)) {
    return path.forEach(function(p) {
      self.on(method, p, route);
    });
  }
  if (path.source) {
    path = path.source.replace(/\\\//ig, "/");
  }
  if (Array.isArray(method)) {
    return method.forEach(function(m) {
      self.on(m.toLowerCase(), path, route);
    });
  }
  path = path.split(new RegExp(this.delimiter));
  path = terminator(path, this.delimiter);
  this.insert(method, this.scope.concat(path), route);
};

Router.prototype.dispatch = function(method, path, callback) {
  var self = this, fns = this.traverse(method, path, this.routes, ""), invoked = this._invoked, after;
  this._invoked = true;
  if (!fns || fns.length === 0) {
    this.last = [];
    if (typeof this.notfound === "function") {
      this.invoke([ this.notfound ], {
        method: method,
        path: path
      }, callback);
    }
    return false;
  }
  if (this.recurse === "forward") {
    fns = fns.reverse();
  }
  function updateAndInvoke() {
    self.last = fns.after;
    self.invoke(self.runlist(fns), self, callback);
  }
  after = this.every && this.every.after ? [ this.every.after ].concat(this.last) : [ this.last ];
  if (after && after.length > 0 && invoked) {
    if (this.async) {
      this.invoke(after, this, updateAndInvoke);
    } else {
      this.invoke(after, this);
      updateAndInvoke();
    }
    return true;
  }
  updateAndInvoke();
  return true;
};

Router.prototype.invoke = function(fns, thisArg, callback) {
  var self = this;
  var apply;
  if (this.async) {
    apply = function(fn, next) {
      if (Array.isArray(fn)) {
        return _asyncEverySeries(fn, apply, next);
      } else if (typeof fn == "function") {
        fn.apply(thisArg, fns.captures.concat(next));
      }
    };
    _asyncEverySeries(fns, apply, function() {
      if (callback) {
        callback.apply(thisArg, arguments);
      }
    });
  } else {
    apply = function(fn) {
      if (Array.isArray(fn)) {
        return _every(fn, apply);
      } else if (typeof fn === "function") {
        return fn.apply(thisArg, fns.captures || []);
      } else if (typeof fn === "string" && self.resource) {
        self.resource[fn].apply(thisArg, fns.captures || []);
      }
    };
    _every(fns, apply);
  }
};

Router.prototype.traverse = function(method, path, routes, regexp, filter) {
  var fns = [], current, exact, match, next, that;
  function filterRoutes(routes) {
    if (!filter) {
      return routes;
    }
    function deepCopy(source) {
      var result = [];
      for (var i = 0; i < source.length; i++) {
        result[i] = Array.isArray(source[i]) ? deepCopy(source[i]) : source[i];
      }
      return result;
    }
    function applyFilter(fns) {
      for (var i = fns.length - 1; i >= 0; i--) {
        if (Array.isArray(fns[i])) {
          applyFilter(fns[i]);
          if (fns[i].length === 0) {
            fns.splice(i, 1);
          }
        } else {
          if (!filter(fns[i])) {
            fns.splice(i, 1);
          }
        }
      }
    }
    var newRoutes = deepCopy(routes);
    newRoutes.matched = routes.matched;
    newRoutes.captures = routes.captures;
    newRoutes.after = routes.after.filter(filter);
    applyFilter(newRoutes);
    return newRoutes;
  }
  if (path === this.delimiter && routes[method]) {
    next = [ [ routes.before, routes[method] ].filter(Boolean) ];
    next.after = [ routes.after ].filter(Boolean);
    next.matched = true;
    next.captures = [];
    return filterRoutes(next);
  }
  for (var r in routes) {
    if (routes.hasOwnProperty(r) && (!this._methods[r] || this._methods[r] && typeof routes[r] === "object" && !Array.isArray(routes[r]))) {
      current = exact = regexp + this.delimiter + r;
      if (!this.strict) {
        exact += "[" + this.delimiter + "]?";
      }
      match = path.match(new RegExp("^" + exact));
      if (!match) {
        continue;
      }
      if (match[0] && match[0] == path && routes[r][method]) {
        next = [ [ routes[r].before, routes[r][method] ].filter(Boolean) ];
        next.after = [ routes[r].after ].filter(Boolean);
        next.matched = true;
        next.captures = match.slice(1);
        if (this.recurse && routes === this.routes) {
          next.push([ routes.before, routes.on ].filter(Boolean));
          next.after = next.after.concat([ routes.after ].filter(Boolean));
        }
        return filterRoutes(next);
      }
      next = this.traverse(method, path, routes[r], current);
      if (next.matched) {
        if (next.length > 0) {
          fns = fns.concat(next);
        }
        if (this.recurse) {
          fns.push([ routes[r].before, routes[r].on ].filter(Boolean));
          next.after = next.after.concat([ routes[r].after ].filter(Boolean));
          if (routes === this.routes) {
            fns.push([ routes["before"], routes["on"] ].filter(Boolean));
            next.after = next.after.concat([ routes["after"] ].filter(Boolean));
          }
        }
        fns.matched = true;
        fns.captures = next.captures;
        fns.after = next.after;
        return filterRoutes(fns);
      }
    }
  }
  return false;
};

Router.prototype.insert = function(method, path, route, parent) {
  var methodType, parentType, isArray, nested, part;
  path = path.filter(function(p) {
    return p && p.length > 0;
  });
  parent = parent || this.routes;
  part = path.shift();
  if (/\:|\*/.test(part) && !/\\d|\\w/.test(part)) {
    part = regifyString(part, this.params);
  }
  if (path.length > 0) {
    parent[part] = parent[part] || {};
    return this.insert(method, path, route, parent[part]);
  }
  if (!part && !path.length && parent === this.routes) {
    methodType = typeof parent[method];
    switch (methodType) {
     case "function":
      parent[method] = [ parent[method], route ];
      return;
     case "object":
      parent[method].push(route);
      return;
     case "undefined":
      parent[method] = route;
      return;
    }
    return;
  }
  parentType = typeof parent[part];
  isArray = Array.isArray(parent[part]);
  if (parent[part] && !isArray && parentType == "object") {
    methodType = typeof parent[part][method];
    switch (methodType) {
     case "function":
      parent[part][method] = [ parent[part][method], route ];
      return;
     case "object":
      parent[part][method].push(route);
      return;
     case "undefined":
      parent[part][method] = route;
      return;
    }
  } else if (parentType == "undefined") {
    nested = {};
    nested[method] = route;
    parent[part] = nested;
    return;
  }
  throw new Error("Invalid route context: " + parentType);
};



Router.prototype.extend = function(methods) {
  var self = this, len = methods.length, i;
  function extend(method) {
    self._methods[method] = true;
    self[method] = function() {
      var extra = arguments.length === 1 ? [ method, "" ] : [ method ];
      self.on.apply(self, extra.concat(Array.prototype.slice.call(arguments)));
    };
  }
  for (i = 0; i < len; i++) {
    extend(methods[i]);
  }
};

Router.prototype.runlist = function(fns) {
  var runlist = this.every && this.every.before ? [ this.every.before ].concat(_flatten(fns)) : _flatten(fns);
  if (this.every && this.every.on) {
    runlist.push(this.every.on);
  }
  runlist.captures = fns.captures;
  runlist.source = fns.source;
  return runlist;
};

Router.prototype.mount = function(routes, path) {
  if (!routes || typeof routes !== "object" || Array.isArray(routes)) {
    return;
  }
  var self = this;
  path = path || [];
  if (!Array.isArray(path)) {
    path = path.split(self.delimiter);
  }
  function insertOrMount(route, local) {
    var rename = route, parts = route.split(self.delimiter), routeType = typeof routes[route], isRoute = parts[0] === "" || !self._methods[parts[0]], event = isRoute ? "on" : rename;
    if (isRoute) {
      rename = rename.slice((rename.match(new RegExp("^" + self.delimiter)) || [ "" ])[0].length);
      parts.shift();
    }
    if (isRoute && routeType === "object" && !Array.isArray(routes[route])) {
      local = local.concat(parts);
      self.mount(routes[route], local);
      return;
    }
    if (isRoute) {
      local = local.concat(rename.split(self.delimiter));
      local = terminator(local, self.delimiter);
    }
    self.insert(event, local, routes[route]);
  }
  for (var route in routes) {
    if (routes.hasOwnProperty(route)) {
      insertOrMount(route, path.slice(0));
    }
  }
};



}(typeof exports === "object" ? exports : window));
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvbWF0dC9jb2RlL3JvdXRpbmdfZGVtby9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL21hdHQvY29kZS9yb3V0aW5nX2RlbW8vYXBwLmpzIiwiL1VzZXJzL21hdHQvY29kZS9yb3V0aW5nX2RlbW8vYm93ZXJfY29tcG9uZW50cy9ib290c3RyYXAvZGlzdC9qcy9ib290c3RyYXAubWluLmpzIiwiL1VzZXJzL21hdHQvY29kZS9yb3V0aW5nX2RlbW8vYm93ZXJfY29tcG9uZW50cy9qcXVlcnkvanF1ZXJ5Lm1pbi5qcyIsIi9Vc2Vycy9tYXR0L2NvZGUvcm91dGluZ19kZW1vL2xpYi9uZXR3b3JrLmpzIiwiL1VzZXJzL21hdHQvY29kZS9yb3V0aW5nX2RlbW8vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3B1bnljb2RlL3B1bnljb2RlLmpzIiwiL1VzZXJzL21hdHQvY29kZS9yb3V0aW5nX2RlbW8vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nL2RlY29kZS5qcyIsIi9Vc2Vycy9tYXR0L2NvZGUvcm91dGluZ19kZW1vL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy9lbmNvZGUuanMiLCIvVXNlcnMvbWF0dC9jb2RlL3JvdXRpbmdfZGVtby9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmcvaW5kZXguanMiLCIvVXNlcnMvbWF0dC9jb2RlL3JvdXRpbmdfZGVtby9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvdXJsL3VybC5qcyIsIi9Vc2Vycy9tYXR0L2NvZGUvcm91dGluZ19kZW1vL25vZGVfbW9kdWxlcy9kaXJlY3Rvci9idWlsZC9kaXJlY3Rvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5yZXF1aXJlKCdib290c3RyYXAnKTtcblxudmFyIFJvdXRlciA9IHJlcXVpcmUoJ2RpcmVjdG9yJykuUm91dGVyO1xudmFyIHJvdXRlcjtcblxuLy8gTm90ZXM6XG4vLyAtIERvbid0IHVzZSBib3RoIG9uY2UgYW5kIG9uXG52YXIgcm91dGVzID0ge1xuICAnLyc6IHtcbiAgICBvbjogJ2luZGV4J1xuICB9LFxuICAnL25ldHdvcmsvOm5ldHdvcmtJZCc6IHtcbiAgICBvbmNlOiAnc2V0dXAnLFxuICAgIG9uOiAnc2hvdycsXG5cbiAgICAnLzpyZXNvdXJjZSc6IHtcbiAgICAgIG9uOiAncmVzb3VyY2UnLFxuXG4gICAgICAnLzphY3Rpb24nOiB7XG4gICAgICAgIG9uOiAncmVzb3VyY2VBY3Rpb24nXG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5yb3V0ZXIgPSBSb3V0ZXIocm91dGVzKTtcblxudmFyIG5ldHdvcmsgPSByZXF1aXJlKCcuL2xpYi9uZXR3b3JrJykocm91dGVyKTtcblxucm91dGVyLmNvbmZpZ3VyZSh7XG4gIHJlY3Vyc2U6ICdmb3J3YXJkJyxcbiAgcmVzb3VyY2U6IG5ldHdvcmssXG4gIG9uOiBmdW5jdGlvbigpe2NvbnNvbGUubG9nKCdnbG9iYWwtb24nKTsgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tJyl9LFxuICBub3Rmb3VuZDogZnVuY3Rpb24oKXtjb25zb2xlLmxvZygnbm90Zm91bmQnLCBhcmd1bWVudHMpfSxcbiAgYmVmb3JlOiBmdW5jdGlvbigpe2NvbnNvbGUubG9nKCdnbG9iYWwtYmVmb3JlJywgYXJndW1lbnRzKX1cbn0pO1xuXG4kKCdkb2N1bWVudCcpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gIGNvbnNvbGUubG9nKCdSZWFkeScpO1xuICByb3V0ZXIuaW5pdCgpO1xufSk7XG5cbi8vIFRPRE9cbi8vIDIuIEJhY2sgdG8gbGlzdCBidXR0b25cbi8vIDMuIFJhY3RpdmUhXG4iLCJ2YXIgZ2xvYmFsPXR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fTsoZnVuY3Rpb24gYnJvd3NlcmlmeVNoaW0obW9kdWxlLCBkZWZpbmUpIHtcblxuOyAkID0gZ2xvYmFsLiQgPSByZXF1aXJlKFwiL1VzZXJzL21hdHQvY29kZS9yb3V0aW5nX2RlbW8vYm93ZXJfY29tcG9uZW50cy9qcXVlcnkvanF1ZXJ5Lm1pbi5qc1wiKTtcbi8qIVxuICogQm9vdHN0cmFwIHYzLjAuMyAoaHR0cDovL2dldGJvb3RzdHJhcC5jb20pXG4gKiBDb3B5cmlnaHQgMjAxMyBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqL1xuXG5pZihcInVuZGVmaW5lZFwiPT10eXBlb2YgalF1ZXJ5KXRocm93IG5ldyBFcnJvcihcIkJvb3RzdHJhcCByZXF1aXJlcyBqUXVlcnlcIik7K2Z1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoKXt2YXIgYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYm9vdHN0cmFwXCIpLGI9e1dlYmtpdFRyYW5zaXRpb246XCJ3ZWJraXRUcmFuc2l0aW9uRW5kXCIsTW96VHJhbnNpdGlvbjpcInRyYW5zaXRpb25lbmRcIixPVHJhbnNpdGlvbjpcIm9UcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kXCIsdHJhbnNpdGlvbjpcInRyYW5zaXRpb25lbmRcIn07Zm9yKHZhciBjIGluIGIpaWYodm9pZCAwIT09YS5zdHlsZVtjXSlyZXR1cm57ZW5kOmJbY119fWEuZm4uZW11bGF0ZVRyYW5zaXRpb25FbmQ9ZnVuY3Rpb24oYil7dmFyIGM9ITEsZD10aGlzO2EodGhpcykub25lKGEuc3VwcG9ydC50cmFuc2l0aW9uLmVuZCxmdW5jdGlvbigpe2M9ITB9KTt2YXIgZT1mdW5jdGlvbigpe2N8fGEoZCkudHJpZ2dlcihhLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQpfTtyZXR1cm4gc2V0VGltZW91dChlLGIpLHRoaXN9LGEoZnVuY3Rpb24oKXthLnN1cHBvcnQudHJhbnNpdGlvbj1iKCl9KX0oalF1ZXJ5KSwrZnVuY3Rpb24oYSl7XCJ1c2Ugc3RyaWN0XCI7dmFyIGI9J1tkYXRhLWRpc21pc3M9XCJhbGVydFwiXScsYz1mdW5jdGlvbihjKXthKGMpLm9uKFwiY2xpY2tcIixiLHRoaXMuY2xvc2UpfTtjLnByb3RvdHlwZS5jbG9zZT1mdW5jdGlvbihiKXtmdW5jdGlvbiBjKCl7Zi50cmlnZ2VyKFwiY2xvc2VkLmJzLmFsZXJ0XCIpLnJlbW92ZSgpfXZhciBkPWEodGhpcyksZT1kLmF0dHIoXCJkYXRhLXRhcmdldFwiKTtlfHwoZT1kLmF0dHIoXCJocmVmXCIpLGU9ZSYmZS5yZXBsYWNlKC8uKig/PSNbXlxcc10qJCkvLFwiXCIpKTt2YXIgZj1hKGUpO2ImJmIucHJldmVudERlZmF1bHQoKSxmLmxlbmd0aHx8KGY9ZC5oYXNDbGFzcyhcImFsZXJ0XCIpP2Q6ZC5wYXJlbnQoKSksZi50cmlnZ2VyKGI9YS5FdmVudChcImNsb3NlLmJzLmFsZXJ0XCIpKSxiLmlzRGVmYXVsdFByZXZlbnRlZCgpfHwoZi5yZW1vdmVDbGFzcyhcImluXCIpLGEuc3VwcG9ydC50cmFuc2l0aW9uJiZmLmhhc0NsYXNzKFwiZmFkZVwiKT9mLm9uZShhLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQsYykuZW11bGF0ZVRyYW5zaXRpb25FbmQoMTUwKTpjKCkpfTt2YXIgZD1hLmZuLmFsZXJ0O2EuZm4uYWxlcnQ9ZnVuY3Rpb24oYil7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBkPWEodGhpcyksZT1kLmRhdGEoXCJicy5hbGVydFwiKTtlfHxkLmRhdGEoXCJicy5hbGVydFwiLGU9bmV3IGModGhpcykpLFwic3RyaW5nXCI9PXR5cGVvZiBiJiZlW2JdLmNhbGwoZCl9KX0sYS5mbi5hbGVydC5Db25zdHJ1Y3Rvcj1jLGEuZm4uYWxlcnQubm9Db25mbGljdD1mdW5jdGlvbigpe3JldHVybiBhLmZuLmFsZXJ0PWQsdGhpc30sYShkb2N1bWVudCkub24oXCJjbGljay5icy5hbGVydC5kYXRhLWFwaVwiLGIsYy5wcm90b3R5cGUuY2xvc2UpfShqUXVlcnkpLCtmdW5jdGlvbihhKXtcInVzZSBzdHJpY3RcIjt2YXIgYj1mdW5jdGlvbihjLGQpe3RoaXMuJGVsZW1lbnQ9YShjKSx0aGlzLm9wdGlvbnM9YS5leHRlbmQoe30sYi5ERUZBVUxUUyxkKX07Yi5ERUZBVUxUUz17bG9hZGluZ1RleHQ6XCJsb2FkaW5nLi4uXCJ9LGIucHJvdG90eXBlLnNldFN0YXRlPWZ1bmN0aW9uKGEpe3ZhciBiPVwiZGlzYWJsZWRcIixjPXRoaXMuJGVsZW1lbnQsZD1jLmlzKFwiaW5wdXRcIik/XCJ2YWxcIjpcImh0bWxcIixlPWMuZGF0YSgpO2ErPVwiVGV4dFwiLGUucmVzZXRUZXh0fHxjLmRhdGEoXCJyZXNldFRleHRcIixjW2RdKCkpLGNbZF0oZVthXXx8dGhpcy5vcHRpb25zW2FdKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XCJsb2FkaW5nVGV4dFwiPT1hP2MuYWRkQ2xhc3MoYikuYXR0cihiLGIpOmMucmVtb3ZlQ2xhc3MoYikucmVtb3ZlQXR0cihiKX0sMCl9LGIucHJvdG90eXBlLnRvZ2dsZT1mdW5jdGlvbigpe3ZhciBhPXRoaXMuJGVsZW1lbnQuY2xvc2VzdCgnW2RhdGEtdG9nZ2xlPVwiYnV0dG9uc1wiXScpLGI9ITA7aWYoYS5sZW5ndGgpe3ZhciBjPXRoaXMuJGVsZW1lbnQuZmluZChcImlucHV0XCIpO1wicmFkaW9cIj09PWMucHJvcChcInR5cGVcIikmJihjLnByb3AoXCJjaGVja2VkXCIpJiZ0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKFwiYWN0aXZlXCIpP2I9ITE6YS5maW5kKFwiLmFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKSksYiYmYy5wcm9wKFwiY2hlY2tlZFwiLCF0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKFwiYWN0aXZlXCIpKS50cmlnZ2VyKFwiY2hhbmdlXCIpfWImJnRoaXMuJGVsZW1lbnQudG9nZ2xlQ2xhc3MoXCJhY3RpdmVcIil9O3ZhciBjPWEuZm4uYnV0dG9uO2EuZm4uYnV0dG9uPWZ1bmN0aW9uKGMpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgZD1hKHRoaXMpLGU9ZC5kYXRhKFwiYnMuYnV0dG9uXCIpLGY9XCJvYmplY3RcIj09dHlwZW9mIGMmJmM7ZXx8ZC5kYXRhKFwiYnMuYnV0dG9uXCIsZT1uZXcgYih0aGlzLGYpKSxcInRvZ2dsZVwiPT1jP2UudG9nZ2xlKCk6YyYmZS5zZXRTdGF0ZShjKX0pfSxhLmZuLmJ1dHRvbi5Db25zdHJ1Y3Rvcj1iLGEuZm4uYnV0dG9uLm5vQ29uZmxpY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gYS5mbi5idXR0b249Yyx0aGlzfSxhKGRvY3VtZW50KS5vbihcImNsaWNrLmJzLmJ1dHRvbi5kYXRhLWFwaVwiLFwiW2RhdGEtdG9nZ2xlXj1idXR0b25dXCIsZnVuY3Rpb24oYil7dmFyIGM9YShiLnRhcmdldCk7Yy5oYXNDbGFzcyhcImJ0blwiKXx8KGM9Yy5jbG9zZXN0KFwiLmJ0blwiKSksYy5idXR0b24oXCJ0b2dnbGVcIiksYi5wcmV2ZW50RGVmYXVsdCgpfSl9KGpRdWVyeSksK2Z1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO3ZhciBiPWZ1bmN0aW9uKGIsYyl7dGhpcy4kZWxlbWVudD1hKGIpLHRoaXMuJGluZGljYXRvcnM9dGhpcy4kZWxlbWVudC5maW5kKFwiLmNhcm91c2VsLWluZGljYXRvcnNcIiksdGhpcy5vcHRpb25zPWMsdGhpcy5wYXVzZWQ9dGhpcy5zbGlkaW5nPXRoaXMuaW50ZXJ2YWw9dGhpcy4kYWN0aXZlPXRoaXMuJGl0ZW1zPW51bGwsXCJob3ZlclwiPT10aGlzLm9wdGlvbnMucGF1c2UmJnRoaXMuJGVsZW1lbnQub24oXCJtb3VzZWVudGVyXCIsYS5wcm94eSh0aGlzLnBhdXNlLHRoaXMpKS5vbihcIm1vdXNlbGVhdmVcIixhLnByb3h5KHRoaXMuY3ljbGUsdGhpcykpfTtiLkRFRkFVTFRTPXtpbnRlcnZhbDo1ZTMscGF1c2U6XCJob3ZlclwiLHdyYXA6ITB9LGIucHJvdG90eXBlLmN5Y2xlPWZ1bmN0aW9uKGIpe3JldHVybiBifHwodGhpcy5wYXVzZWQ9ITEpLHRoaXMuaW50ZXJ2YWwmJmNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCksdGhpcy5vcHRpb25zLmludGVydmFsJiYhdGhpcy5wYXVzZWQmJih0aGlzLmludGVydmFsPXNldEludGVydmFsKGEucHJveHkodGhpcy5uZXh0LHRoaXMpLHRoaXMub3B0aW9ucy5pbnRlcnZhbCkpLHRoaXN9LGIucHJvdG90eXBlLmdldEFjdGl2ZUluZGV4PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuJGFjdGl2ZT10aGlzLiRlbGVtZW50LmZpbmQoXCIuaXRlbS5hY3RpdmVcIiksdGhpcy4kaXRlbXM9dGhpcy4kYWN0aXZlLnBhcmVudCgpLmNoaWxkcmVuKCksdGhpcy4kaXRlbXMuaW5kZXgodGhpcy4kYWN0aXZlKX0sYi5wcm90b3R5cGUudG89ZnVuY3Rpb24oYil7dmFyIGM9dGhpcyxkPXRoaXMuZ2V0QWN0aXZlSW5kZXgoKTtyZXR1cm4gYj50aGlzLiRpdGVtcy5sZW5ndGgtMXx8MD5iP3ZvaWQgMDp0aGlzLnNsaWRpbmc/dGhpcy4kZWxlbWVudC5vbmUoXCJzbGlkLmJzLmNhcm91c2VsXCIsZnVuY3Rpb24oKXtjLnRvKGIpfSk6ZD09Yj90aGlzLnBhdXNlKCkuY3ljbGUoKTp0aGlzLnNsaWRlKGI+ZD9cIm5leHRcIjpcInByZXZcIixhKHRoaXMuJGl0ZW1zW2JdKSl9LGIucHJvdG90eXBlLnBhdXNlPWZ1bmN0aW9uKGIpe3JldHVybiBifHwodGhpcy5wYXVzZWQ9ITApLHRoaXMuJGVsZW1lbnQuZmluZChcIi5uZXh0LCAucHJldlwiKS5sZW5ndGgmJmEuc3VwcG9ydC50cmFuc2l0aW9uLmVuZCYmKHRoaXMuJGVsZW1lbnQudHJpZ2dlcihhLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQpLHRoaXMuY3ljbGUoITApKSx0aGlzLmludGVydmFsPWNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCksdGhpc30sYi5wcm90b3R5cGUubmV4dD1mdW5jdGlvbigpe3JldHVybiB0aGlzLnNsaWRpbmc/dm9pZCAwOnRoaXMuc2xpZGUoXCJuZXh0XCIpfSxiLnByb3RvdHlwZS5wcmV2PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc2xpZGluZz92b2lkIDA6dGhpcy5zbGlkZShcInByZXZcIil9LGIucHJvdG90eXBlLnNsaWRlPWZ1bmN0aW9uKGIsYyl7dmFyIGQ9dGhpcy4kZWxlbWVudC5maW5kKFwiLml0ZW0uYWN0aXZlXCIpLGU9Y3x8ZFtiXSgpLGY9dGhpcy5pbnRlcnZhbCxnPVwibmV4dFwiPT1iP1wibGVmdFwiOlwicmlnaHRcIixoPVwibmV4dFwiPT1iP1wiZmlyc3RcIjpcImxhc3RcIixpPXRoaXM7aWYoIWUubGVuZ3RoKXtpZighdGhpcy5vcHRpb25zLndyYXApcmV0dXJuO2U9dGhpcy4kZWxlbWVudC5maW5kKFwiLml0ZW1cIilbaF0oKX10aGlzLnNsaWRpbmc9ITAsZiYmdGhpcy5wYXVzZSgpO3ZhciBqPWEuRXZlbnQoXCJzbGlkZS5icy5jYXJvdXNlbFwiLHtyZWxhdGVkVGFyZ2V0OmVbMF0sZGlyZWN0aW9uOmd9KTtpZighZS5oYXNDbGFzcyhcImFjdGl2ZVwiKSl7aWYodGhpcy4kaW5kaWNhdG9ycy5sZW5ndGgmJih0aGlzLiRpbmRpY2F0b3JzLmZpbmQoXCIuYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpLHRoaXMuJGVsZW1lbnQub25lKFwic2xpZC5icy5jYXJvdXNlbFwiLGZ1bmN0aW9uKCl7dmFyIGI9YShpLiRpbmRpY2F0b3JzLmNoaWxkcmVuKClbaS5nZXRBY3RpdmVJbmRleCgpXSk7YiYmYi5hZGRDbGFzcyhcImFjdGl2ZVwiKX0pKSxhLnN1cHBvcnQudHJhbnNpdGlvbiYmdGhpcy4kZWxlbWVudC5oYXNDbGFzcyhcInNsaWRlXCIpKXtpZih0aGlzLiRlbGVtZW50LnRyaWdnZXIoaiksai5pc0RlZmF1bHRQcmV2ZW50ZWQoKSlyZXR1cm47ZS5hZGRDbGFzcyhiKSxlWzBdLm9mZnNldFdpZHRoLGQuYWRkQ2xhc3MoZyksZS5hZGRDbGFzcyhnKSxkLm9uZShhLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQsZnVuY3Rpb24oKXtlLnJlbW92ZUNsYXNzKFtiLGddLmpvaW4oXCIgXCIpKS5hZGRDbGFzcyhcImFjdGl2ZVwiKSxkLnJlbW92ZUNsYXNzKFtcImFjdGl2ZVwiLGddLmpvaW4oXCIgXCIpKSxpLnNsaWRpbmc9ITEsc2V0VGltZW91dChmdW5jdGlvbigpe2kuJGVsZW1lbnQudHJpZ2dlcihcInNsaWQuYnMuY2Fyb3VzZWxcIil9LDApfSkuZW11bGF0ZVRyYW5zaXRpb25FbmQoNjAwKX1lbHNle2lmKHRoaXMuJGVsZW1lbnQudHJpZ2dlcihqKSxqLmlzRGVmYXVsdFByZXZlbnRlZCgpKXJldHVybjtkLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpLGUuYWRkQ2xhc3MoXCJhY3RpdmVcIiksdGhpcy5zbGlkaW5nPSExLHRoaXMuJGVsZW1lbnQudHJpZ2dlcihcInNsaWQuYnMuY2Fyb3VzZWxcIil9cmV0dXJuIGYmJnRoaXMuY3ljbGUoKSx0aGlzfX07dmFyIGM9YS5mbi5jYXJvdXNlbDthLmZuLmNhcm91c2VsPWZ1bmN0aW9uKGMpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgZD1hKHRoaXMpLGU9ZC5kYXRhKFwiYnMuY2Fyb3VzZWxcIiksZj1hLmV4dGVuZCh7fSxiLkRFRkFVTFRTLGQuZGF0YSgpLFwib2JqZWN0XCI9PXR5cGVvZiBjJiZjKSxnPVwic3RyaW5nXCI9PXR5cGVvZiBjP2M6Zi5zbGlkZTtlfHxkLmRhdGEoXCJicy5jYXJvdXNlbFwiLGU9bmV3IGIodGhpcyxmKSksXCJudW1iZXJcIj09dHlwZW9mIGM/ZS50byhjKTpnP2VbZ10oKTpmLmludGVydmFsJiZlLnBhdXNlKCkuY3ljbGUoKX0pfSxhLmZuLmNhcm91c2VsLkNvbnN0cnVjdG9yPWIsYS5mbi5jYXJvdXNlbC5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIGEuZm4uY2Fyb3VzZWw9Yyx0aGlzfSxhKGRvY3VtZW50KS5vbihcImNsaWNrLmJzLmNhcm91c2VsLmRhdGEtYXBpXCIsXCJbZGF0YS1zbGlkZV0sIFtkYXRhLXNsaWRlLXRvXVwiLGZ1bmN0aW9uKGIpe3ZhciBjLGQ9YSh0aGlzKSxlPWEoZC5hdHRyKFwiZGF0YS10YXJnZXRcIil8fChjPWQuYXR0cihcImhyZWZcIikpJiZjLnJlcGxhY2UoLy4qKD89I1teXFxzXSskKS8sXCJcIikpLGY9YS5leHRlbmQoe30sZS5kYXRhKCksZC5kYXRhKCkpLGc9ZC5hdHRyKFwiZGF0YS1zbGlkZS10b1wiKTtnJiYoZi5pbnRlcnZhbD0hMSksZS5jYXJvdXNlbChmKSwoZz1kLmF0dHIoXCJkYXRhLXNsaWRlLXRvXCIpKSYmZS5kYXRhKFwiYnMuY2Fyb3VzZWxcIikudG8oZyksYi5wcmV2ZW50RGVmYXVsdCgpfSksYSh3aW5kb3cpLm9uKFwibG9hZFwiLGZ1bmN0aW9uKCl7YSgnW2RhdGEtcmlkZT1cImNhcm91c2VsXCJdJykuZWFjaChmdW5jdGlvbigpe3ZhciBiPWEodGhpcyk7Yi5jYXJvdXNlbChiLmRhdGEoKSl9KX0pfShqUXVlcnkpLCtmdW5jdGlvbihhKXtcInVzZSBzdHJpY3RcIjt2YXIgYj1mdW5jdGlvbihjLGQpe3RoaXMuJGVsZW1lbnQ9YShjKSx0aGlzLm9wdGlvbnM9YS5leHRlbmQoe30sYi5ERUZBVUxUUyxkKSx0aGlzLnRyYW5zaXRpb25pbmc9bnVsbCx0aGlzLm9wdGlvbnMucGFyZW50JiYodGhpcy4kcGFyZW50PWEodGhpcy5vcHRpb25zLnBhcmVudCkpLHRoaXMub3B0aW9ucy50b2dnbGUmJnRoaXMudG9nZ2xlKCl9O2IuREVGQVVMVFM9e3RvZ2dsZTohMH0sYi5wcm90b3R5cGUuZGltZW5zaW9uPWZ1bmN0aW9uKCl7dmFyIGE9dGhpcy4kZWxlbWVudC5oYXNDbGFzcyhcIndpZHRoXCIpO3JldHVybiBhP1wid2lkdGhcIjpcImhlaWdodFwifSxiLnByb3RvdHlwZS5zaG93PWZ1bmN0aW9uKCl7aWYoIXRoaXMudHJhbnNpdGlvbmluZyYmIXRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoXCJpblwiKSl7dmFyIGI9YS5FdmVudChcInNob3cuYnMuY29sbGFwc2VcIik7aWYodGhpcy4kZWxlbWVudC50cmlnZ2VyKGIpLCFiLmlzRGVmYXVsdFByZXZlbnRlZCgpKXt2YXIgYz10aGlzLiRwYXJlbnQmJnRoaXMuJHBhcmVudC5maW5kKFwiPiAucGFuZWwgPiAuaW5cIik7aWYoYyYmYy5sZW5ndGgpe3ZhciBkPWMuZGF0YShcImJzLmNvbGxhcHNlXCIpO2lmKGQmJmQudHJhbnNpdGlvbmluZylyZXR1cm47Yy5jb2xsYXBzZShcImhpZGVcIiksZHx8Yy5kYXRhKFwiYnMuY29sbGFwc2VcIixudWxsKX12YXIgZT10aGlzLmRpbWVuc2lvbigpO3RoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKS5hZGRDbGFzcyhcImNvbGxhcHNpbmdcIilbZV0oMCksdGhpcy50cmFuc2l0aW9uaW5nPTE7dmFyIGY9ZnVuY3Rpb24oKXt0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKFwiY29sbGFwc2luZ1wiKS5hZGRDbGFzcyhcImluXCIpW2VdKFwiYXV0b1wiKSx0aGlzLnRyYW5zaXRpb25pbmc9MCx0aGlzLiRlbGVtZW50LnRyaWdnZXIoXCJzaG93bi5icy5jb2xsYXBzZVwiKX07aWYoIWEuc3VwcG9ydC50cmFuc2l0aW9uKXJldHVybiBmLmNhbGwodGhpcyk7dmFyIGc9YS5jYW1lbENhc2UoW1wic2Nyb2xsXCIsZV0uam9pbihcIi1cIikpO3RoaXMuJGVsZW1lbnQub25lKGEuc3VwcG9ydC50cmFuc2l0aW9uLmVuZCxhLnByb3h5KGYsdGhpcykpLmVtdWxhdGVUcmFuc2l0aW9uRW5kKDM1MClbZV0odGhpcy4kZWxlbWVudFswXVtnXSl9fX0sYi5wcm90b3R5cGUuaGlkZT1mdW5jdGlvbigpe2lmKCF0aGlzLnRyYW5zaXRpb25pbmcmJnRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoXCJpblwiKSl7dmFyIGI9YS5FdmVudChcImhpZGUuYnMuY29sbGFwc2VcIik7aWYodGhpcy4kZWxlbWVudC50cmlnZ2VyKGIpLCFiLmlzRGVmYXVsdFByZXZlbnRlZCgpKXt2YXIgYz10aGlzLmRpbWVuc2lvbigpO3RoaXMuJGVsZW1lbnRbY10odGhpcy4kZWxlbWVudFtjXSgpKVswXS5vZmZzZXRIZWlnaHQsdGhpcy4kZWxlbWVudC5hZGRDbGFzcyhcImNvbGxhcHNpbmdcIikucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZVwiKS5yZW1vdmVDbGFzcyhcImluXCIpLHRoaXMudHJhbnNpdGlvbmluZz0xO3ZhciBkPWZ1bmN0aW9uKCl7dGhpcy50cmFuc2l0aW9uaW5nPTAsdGhpcy4kZWxlbWVudC50cmlnZ2VyKFwiaGlkZGVuLmJzLmNvbGxhcHNlXCIpLnJlbW92ZUNsYXNzKFwiY29sbGFwc2luZ1wiKS5hZGRDbGFzcyhcImNvbGxhcHNlXCIpfTtyZXR1cm4gYS5zdXBwb3J0LnRyYW5zaXRpb24/KHRoaXMuJGVsZW1lbnRbY10oMCkub25lKGEuc3VwcG9ydC50cmFuc2l0aW9uLmVuZCxhLnByb3h5KGQsdGhpcykpLmVtdWxhdGVUcmFuc2l0aW9uRW5kKDM1MCksdm9pZCAwKTpkLmNhbGwodGhpcyl9fX0sYi5wcm90b3R5cGUudG9nZ2xlPWZ1bmN0aW9uKCl7dGhpc1t0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKFwiaW5cIik/XCJoaWRlXCI6XCJzaG93XCJdKCl9O3ZhciBjPWEuZm4uY29sbGFwc2U7YS5mbi5jb2xsYXBzZT1mdW5jdGlvbihjKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGQ9YSh0aGlzKSxlPWQuZGF0YShcImJzLmNvbGxhcHNlXCIpLGY9YS5leHRlbmQoe30sYi5ERUZBVUxUUyxkLmRhdGEoKSxcIm9iamVjdFwiPT10eXBlb2YgYyYmYyk7ZXx8ZC5kYXRhKFwiYnMuY29sbGFwc2VcIixlPW5ldyBiKHRoaXMsZikpLFwic3RyaW5nXCI9PXR5cGVvZiBjJiZlW2NdKCl9KX0sYS5mbi5jb2xsYXBzZS5Db25zdHJ1Y3Rvcj1iLGEuZm4uY29sbGFwc2Uubm9Db25mbGljdD1mdW5jdGlvbigpe3JldHVybiBhLmZuLmNvbGxhcHNlPWMsdGhpc30sYShkb2N1bWVudCkub24oXCJjbGljay5icy5jb2xsYXBzZS5kYXRhLWFwaVwiLFwiW2RhdGEtdG9nZ2xlPWNvbGxhcHNlXVwiLGZ1bmN0aW9uKGIpe3ZhciBjLGQ9YSh0aGlzKSxlPWQuYXR0cihcImRhdGEtdGFyZ2V0XCIpfHxiLnByZXZlbnREZWZhdWx0KCl8fChjPWQuYXR0cihcImhyZWZcIikpJiZjLnJlcGxhY2UoLy4qKD89I1teXFxzXSskKS8sXCJcIiksZj1hKGUpLGc9Zi5kYXRhKFwiYnMuY29sbGFwc2VcIiksaD1nP1widG9nZ2xlXCI6ZC5kYXRhKCksaT1kLmF0dHIoXCJkYXRhLXBhcmVudFwiKSxqPWkmJmEoaSk7ZyYmZy50cmFuc2l0aW9uaW5nfHwoaiYmai5maW5kKCdbZGF0YS10b2dnbGU9Y29sbGFwc2VdW2RhdGEtcGFyZW50PVwiJytpKydcIl0nKS5ub3QoZCkuYWRkQ2xhc3MoXCJjb2xsYXBzZWRcIiksZFtmLmhhc0NsYXNzKFwiaW5cIik/XCJhZGRDbGFzc1wiOlwicmVtb3ZlQ2xhc3NcIl0oXCJjb2xsYXBzZWRcIikpLGYuY29sbGFwc2UoaCl9KX0oalF1ZXJ5KSwrZnVuY3Rpb24oYSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gYigpe2EoZCkucmVtb3ZlKCksYShlKS5lYWNoKGZ1bmN0aW9uKGIpe3ZhciBkPWMoYSh0aGlzKSk7ZC5oYXNDbGFzcyhcIm9wZW5cIikmJihkLnRyaWdnZXIoYj1hLkV2ZW50KFwiaGlkZS5icy5kcm9wZG93blwiKSksYi5pc0RlZmF1bHRQcmV2ZW50ZWQoKXx8ZC5yZW1vdmVDbGFzcyhcIm9wZW5cIikudHJpZ2dlcihcImhpZGRlbi5icy5kcm9wZG93blwiKSl9KX1mdW5jdGlvbiBjKGIpe3ZhciBjPWIuYXR0cihcImRhdGEtdGFyZ2V0XCIpO2N8fChjPWIuYXR0cihcImhyZWZcIiksYz1jJiYvIy8udGVzdChjKSYmYy5yZXBsYWNlKC8uKig/PSNbXlxcc10qJCkvLFwiXCIpKTt2YXIgZD1jJiZhKGMpO3JldHVybiBkJiZkLmxlbmd0aD9kOmIucGFyZW50KCl9dmFyIGQ9XCIuZHJvcGRvd24tYmFja2Ryb3BcIixlPVwiW2RhdGEtdG9nZ2xlPWRyb3Bkb3duXVwiLGY9ZnVuY3Rpb24oYil7YShiKS5vbihcImNsaWNrLmJzLmRyb3Bkb3duXCIsdGhpcy50b2dnbGUpfTtmLnByb3RvdHlwZS50b2dnbGU9ZnVuY3Rpb24oZCl7dmFyIGU9YSh0aGlzKTtpZighZS5pcyhcIi5kaXNhYmxlZCwgOmRpc2FibGVkXCIpKXt2YXIgZj1jKGUpLGc9Zi5oYXNDbGFzcyhcIm9wZW5cIik7aWYoYigpLCFnKXtpZihcIm9udG91Y2hzdGFydFwiaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50JiYhZi5jbG9zZXN0KFwiLm5hdmJhci1uYXZcIikubGVuZ3RoJiZhKCc8ZGl2IGNsYXNzPVwiZHJvcGRvd24tYmFja2Ryb3BcIi8+JykuaW5zZXJ0QWZ0ZXIoYSh0aGlzKSkub24oXCJjbGlja1wiLGIpLGYudHJpZ2dlcihkPWEuRXZlbnQoXCJzaG93LmJzLmRyb3Bkb3duXCIpKSxkLmlzRGVmYXVsdFByZXZlbnRlZCgpKXJldHVybjtmLnRvZ2dsZUNsYXNzKFwib3BlblwiKS50cmlnZ2VyKFwic2hvd24uYnMuZHJvcGRvd25cIiksZS5mb2N1cygpfXJldHVybiExfX0sZi5wcm90b3R5cGUua2V5ZG93bj1mdW5jdGlvbihiKXtpZigvKDM4fDQwfDI3KS8udGVzdChiLmtleUNvZGUpKXt2YXIgZD1hKHRoaXMpO2lmKGIucHJldmVudERlZmF1bHQoKSxiLnN0b3BQcm9wYWdhdGlvbigpLCFkLmlzKFwiLmRpc2FibGVkLCA6ZGlzYWJsZWRcIikpe3ZhciBmPWMoZCksZz1mLmhhc0NsYXNzKFwib3BlblwiKTtpZighZ3x8ZyYmMjc9PWIua2V5Q29kZSlyZXR1cm4gMjc9PWIud2hpY2gmJmYuZmluZChlKS5mb2N1cygpLGQuY2xpY2soKTt2YXIgaD1hKFwiW3JvbGU9bWVudV0gbGk6bm90KC5kaXZpZGVyKTp2aXNpYmxlIGFcIixmKTtpZihoLmxlbmd0aCl7dmFyIGk9aC5pbmRleChoLmZpbHRlcihcIjpmb2N1c1wiKSk7Mzg9PWIua2V5Q29kZSYmaT4wJiZpLS0sNDA9PWIua2V5Q29kZSYmaTxoLmxlbmd0aC0xJiZpKyssfml8fChpPTApLGguZXEoaSkuZm9jdXMoKX19fX07dmFyIGc9YS5mbi5kcm9wZG93bjthLmZuLmRyb3Bkb3duPWZ1bmN0aW9uKGIpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgYz1hKHRoaXMpLGQ9Yy5kYXRhKFwiYnMuZHJvcGRvd25cIik7ZHx8Yy5kYXRhKFwiYnMuZHJvcGRvd25cIixkPW5ldyBmKHRoaXMpKSxcInN0cmluZ1wiPT10eXBlb2YgYiYmZFtiXS5jYWxsKGMpfSl9LGEuZm4uZHJvcGRvd24uQ29uc3RydWN0b3I9ZixhLmZuLmRyb3Bkb3duLm5vQ29uZmxpY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gYS5mbi5kcm9wZG93bj1nLHRoaXN9LGEoZG9jdW1lbnQpLm9uKFwiY2xpY2suYnMuZHJvcGRvd24uZGF0YS1hcGlcIixiKS5vbihcImNsaWNrLmJzLmRyb3Bkb3duLmRhdGEtYXBpXCIsXCIuZHJvcGRvd24gZm9ybVwiLGZ1bmN0aW9uKGEpe2Euc3RvcFByb3BhZ2F0aW9uKCl9KS5vbihcImNsaWNrLmJzLmRyb3Bkb3duLmRhdGEtYXBpXCIsZSxmLnByb3RvdHlwZS50b2dnbGUpLm9uKFwia2V5ZG93bi5icy5kcm9wZG93bi5kYXRhLWFwaVwiLGUrXCIsIFtyb2xlPW1lbnVdXCIsZi5wcm90b3R5cGUua2V5ZG93bil9KGpRdWVyeSksK2Z1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO3ZhciBiPWZ1bmN0aW9uKGIsYyl7dGhpcy5vcHRpb25zPWMsdGhpcy4kZWxlbWVudD1hKGIpLHRoaXMuJGJhY2tkcm9wPXRoaXMuaXNTaG93bj1udWxsLHRoaXMub3B0aW9ucy5yZW1vdGUmJnRoaXMuJGVsZW1lbnQubG9hZCh0aGlzLm9wdGlvbnMucmVtb3RlKX07Yi5ERUZBVUxUUz17YmFja2Ryb3A6ITAsa2V5Ym9hcmQ6ITAsc2hvdzohMH0sYi5wcm90b3R5cGUudG9nZ2xlPWZ1bmN0aW9uKGEpe3JldHVybiB0aGlzW3RoaXMuaXNTaG93bj9cImhpZGVcIjpcInNob3dcIl0oYSl9LGIucHJvdG90eXBlLnNob3c9ZnVuY3Rpb24oYil7dmFyIGM9dGhpcyxkPWEuRXZlbnQoXCJzaG93LmJzLm1vZGFsXCIse3JlbGF0ZWRUYXJnZXQ6Yn0pO3RoaXMuJGVsZW1lbnQudHJpZ2dlcihkKSx0aGlzLmlzU2hvd258fGQuaXNEZWZhdWx0UHJldmVudGVkKCl8fCh0aGlzLmlzU2hvd249ITAsdGhpcy5lc2NhcGUoKSx0aGlzLiRlbGVtZW50Lm9uKFwiY2xpY2suZGlzbWlzcy5tb2RhbFwiLCdbZGF0YS1kaXNtaXNzPVwibW9kYWxcIl0nLGEucHJveHkodGhpcy5oaWRlLHRoaXMpKSx0aGlzLmJhY2tkcm9wKGZ1bmN0aW9uKCl7dmFyIGQ9YS5zdXBwb3J0LnRyYW5zaXRpb24mJmMuJGVsZW1lbnQuaGFzQ2xhc3MoXCJmYWRlXCIpO2MuJGVsZW1lbnQucGFyZW50KCkubGVuZ3RofHxjLiRlbGVtZW50LmFwcGVuZFRvKGRvY3VtZW50LmJvZHkpLGMuJGVsZW1lbnQuc2hvdygpLGQmJmMuJGVsZW1lbnRbMF0ub2Zmc2V0V2lkdGgsYy4kZWxlbWVudC5hZGRDbGFzcyhcImluXCIpLmF0dHIoXCJhcmlhLWhpZGRlblwiLCExKSxjLmVuZm9yY2VGb2N1cygpO3ZhciBlPWEuRXZlbnQoXCJzaG93bi5icy5tb2RhbFwiLHtyZWxhdGVkVGFyZ2V0OmJ9KTtkP2MuJGVsZW1lbnQuZmluZChcIi5tb2RhbC1kaWFsb2dcIikub25lKGEuc3VwcG9ydC50cmFuc2l0aW9uLmVuZCxmdW5jdGlvbigpe2MuJGVsZW1lbnQuZm9jdXMoKS50cmlnZ2VyKGUpfSkuZW11bGF0ZVRyYW5zaXRpb25FbmQoMzAwKTpjLiRlbGVtZW50LmZvY3VzKCkudHJpZ2dlcihlKX0pKX0sYi5wcm90b3R5cGUuaGlkZT1mdW5jdGlvbihiKXtiJiZiLnByZXZlbnREZWZhdWx0KCksYj1hLkV2ZW50KFwiaGlkZS5icy5tb2RhbFwiKSx0aGlzLiRlbGVtZW50LnRyaWdnZXIoYiksdGhpcy5pc1Nob3duJiYhYi5pc0RlZmF1bHRQcmV2ZW50ZWQoKSYmKHRoaXMuaXNTaG93bj0hMSx0aGlzLmVzY2FwZSgpLGEoZG9jdW1lbnQpLm9mZihcImZvY3VzaW4uYnMubW9kYWxcIiksdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcyhcImluXCIpLmF0dHIoXCJhcmlhLWhpZGRlblwiLCEwKS5vZmYoXCJjbGljay5kaXNtaXNzLm1vZGFsXCIpLGEuc3VwcG9ydC50cmFuc2l0aW9uJiZ0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKFwiZmFkZVwiKT90aGlzLiRlbGVtZW50Lm9uZShhLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQsYS5wcm94eSh0aGlzLmhpZGVNb2RhbCx0aGlzKSkuZW11bGF0ZVRyYW5zaXRpb25FbmQoMzAwKTp0aGlzLmhpZGVNb2RhbCgpKX0sYi5wcm90b3R5cGUuZW5mb3JjZUZvY3VzPWZ1bmN0aW9uKCl7YShkb2N1bWVudCkub2ZmKFwiZm9jdXNpbi5icy5tb2RhbFwiKS5vbihcImZvY3VzaW4uYnMubW9kYWxcIixhLnByb3h5KGZ1bmN0aW9uKGEpe3RoaXMuJGVsZW1lbnRbMF09PT1hLnRhcmdldHx8dGhpcy4kZWxlbWVudC5oYXMoYS50YXJnZXQpLmxlbmd0aHx8dGhpcy4kZWxlbWVudC5mb2N1cygpfSx0aGlzKSl9LGIucHJvdG90eXBlLmVzY2FwZT1mdW5jdGlvbigpe3RoaXMuaXNTaG93biYmdGhpcy5vcHRpb25zLmtleWJvYXJkP3RoaXMuJGVsZW1lbnQub24oXCJrZXl1cC5kaXNtaXNzLmJzLm1vZGFsXCIsYS5wcm94eShmdW5jdGlvbihhKXsyNz09YS53aGljaCYmdGhpcy5oaWRlKCl9LHRoaXMpKTp0aGlzLmlzU2hvd258fHRoaXMuJGVsZW1lbnQub2ZmKFwia2V5dXAuZGlzbWlzcy5icy5tb2RhbFwiKX0sYi5wcm90b3R5cGUuaGlkZU1vZGFsPWZ1bmN0aW9uKCl7dmFyIGE9dGhpczt0aGlzLiRlbGVtZW50LmhpZGUoKSx0aGlzLmJhY2tkcm9wKGZ1bmN0aW9uKCl7YS5yZW1vdmVCYWNrZHJvcCgpLGEuJGVsZW1lbnQudHJpZ2dlcihcImhpZGRlbi5icy5tb2RhbFwiKX0pfSxiLnByb3RvdHlwZS5yZW1vdmVCYWNrZHJvcD1mdW5jdGlvbigpe3RoaXMuJGJhY2tkcm9wJiZ0aGlzLiRiYWNrZHJvcC5yZW1vdmUoKSx0aGlzLiRiYWNrZHJvcD1udWxsfSxiLnByb3RvdHlwZS5iYWNrZHJvcD1mdW5jdGlvbihiKXt2YXIgYz10aGlzLiRlbGVtZW50Lmhhc0NsYXNzKFwiZmFkZVwiKT9cImZhZGVcIjpcIlwiO2lmKHRoaXMuaXNTaG93biYmdGhpcy5vcHRpb25zLmJhY2tkcm9wKXt2YXIgZD1hLnN1cHBvcnQudHJhbnNpdGlvbiYmYztpZih0aGlzLiRiYWNrZHJvcD1hKCc8ZGl2IGNsYXNzPVwibW9kYWwtYmFja2Ryb3AgJytjKydcIiAvPicpLmFwcGVuZFRvKGRvY3VtZW50LmJvZHkpLHRoaXMuJGVsZW1lbnQub24oXCJjbGljay5kaXNtaXNzLm1vZGFsXCIsYS5wcm94eShmdW5jdGlvbihhKXthLnRhcmdldD09PWEuY3VycmVudFRhcmdldCYmKFwic3RhdGljXCI9PXRoaXMub3B0aW9ucy5iYWNrZHJvcD90aGlzLiRlbGVtZW50WzBdLmZvY3VzLmNhbGwodGhpcy4kZWxlbWVudFswXSk6dGhpcy5oaWRlLmNhbGwodGhpcykpfSx0aGlzKSksZCYmdGhpcy4kYmFja2Ryb3BbMF0ub2Zmc2V0V2lkdGgsdGhpcy4kYmFja2Ryb3AuYWRkQ2xhc3MoXCJpblwiKSwhYilyZXR1cm47ZD90aGlzLiRiYWNrZHJvcC5vbmUoYS5zdXBwb3J0LnRyYW5zaXRpb24uZW5kLGIpLmVtdWxhdGVUcmFuc2l0aW9uRW5kKDE1MCk6YigpfWVsc2UhdGhpcy5pc1Nob3duJiZ0aGlzLiRiYWNrZHJvcD8odGhpcy4kYmFja2Ryb3AucmVtb3ZlQ2xhc3MoXCJpblwiKSxhLnN1cHBvcnQudHJhbnNpdGlvbiYmdGhpcy4kZWxlbWVudC5oYXNDbGFzcyhcImZhZGVcIik/dGhpcy4kYmFja2Ryb3Aub25lKGEuc3VwcG9ydC50cmFuc2l0aW9uLmVuZCxiKS5lbXVsYXRlVHJhbnNpdGlvbkVuZCgxNTApOmIoKSk6YiYmYigpfTt2YXIgYz1hLmZuLm1vZGFsO2EuZm4ubW9kYWw9ZnVuY3Rpb24oYyxkKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGU9YSh0aGlzKSxmPWUuZGF0YShcImJzLm1vZGFsXCIpLGc9YS5leHRlbmQoe30sYi5ERUZBVUxUUyxlLmRhdGEoKSxcIm9iamVjdFwiPT10eXBlb2YgYyYmYyk7Znx8ZS5kYXRhKFwiYnMubW9kYWxcIixmPW5ldyBiKHRoaXMsZykpLFwic3RyaW5nXCI9PXR5cGVvZiBjP2ZbY10oZCk6Zy5zaG93JiZmLnNob3coZCl9KX0sYS5mbi5tb2RhbC5Db25zdHJ1Y3Rvcj1iLGEuZm4ubW9kYWwubm9Db25mbGljdD1mdW5jdGlvbigpe3JldHVybiBhLmZuLm1vZGFsPWMsdGhpc30sYShkb2N1bWVudCkub24oXCJjbGljay5icy5tb2RhbC5kYXRhLWFwaVwiLCdbZGF0YS10b2dnbGU9XCJtb2RhbFwiXScsZnVuY3Rpb24oYil7dmFyIGM9YSh0aGlzKSxkPWMuYXR0cihcImhyZWZcIiksZT1hKGMuYXR0cihcImRhdGEtdGFyZ2V0XCIpfHxkJiZkLnJlcGxhY2UoLy4qKD89I1teXFxzXSskKS8sXCJcIikpLGY9ZS5kYXRhKFwibW9kYWxcIik/XCJ0b2dnbGVcIjphLmV4dGVuZCh7cmVtb3RlOiEvIy8udGVzdChkKSYmZH0sZS5kYXRhKCksYy5kYXRhKCkpO2IucHJldmVudERlZmF1bHQoKSxlLm1vZGFsKGYsdGhpcykub25lKFwiaGlkZVwiLGZ1bmN0aW9uKCl7Yy5pcyhcIjp2aXNpYmxlXCIpJiZjLmZvY3VzKCl9KX0pLGEoZG9jdW1lbnQpLm9uKFwic2hvdy5icy5tb2RhbFwiLFwiLm1vZGFsXCIsZnVuY3Rpb24oKXthKGRvY3VtZW50LmJvZHkpLmFkZENsYXNzKFwibW9kYWwtb3BlblwiKX0pLm9uKFwiaGlkZGVuLmJzLm1vZGFsXCIsXCIubW9kYWxcIixmdW5jdGlvbigpe2EoZG9jdW1lbnQuYm9keSkucmVtb3ZlQ2xhc3MoXCJtb2RhbC1vcGVuXCIpfSl9KGpRdWVyeSksK2Z1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO3ZhciBiPWZ1bmN0aW9uKGEsYil7dGhpcy50eXBlPXRoaXMub3B0aW9ucz10aGlzLmVuYWJsZWQ9dGhpcy50aW1lb3V0PXRoaXMuaG92ZXJTdGF0ZT10aGlzLiRlbGVtZW50PW51bGwsdGhpcy5pbml0KFwidG9vbHRpcFwiLGEsYil9O2IuREVGQVVMVFM9e2FuaW1hdGlvbjohMCxwbGFjZW1lbnQ6XCJ0b3BcIixzZWxlY3RvcjohMSx0ZW1wbGF0ZTonPGRpdiBjbGFzcz1cInRvb2x0aXBcIj48ZGl2IGNsYXNzPVwidG9vbHRpcC1hcnJvd1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJ0b29sdGlwLWlubmVyXCI+PC9kaXY+PC9kaXY+Jyx0cmlnZ2VyOlwiaG92ZXIgZm9jdXNcIix0aXRsZTpcIlwiLGRlbGF5OjAsaHRtbDohMSxjb250YWluZXI6ITF9LGIucHJvdG90eXBlLmluaXQ9ZnVuY3Rpb24oYixjLGQpe3RoaXMuZW5hYmxlZD0hMCx0aGlzLnR5cGU9Yix0aGlzLiRlbGVtZW50PWEoYyksdGhpcy5vcHRpb25zPXRoaXMuZ2V0T3B0aW9ucyhkKTtmb3IodmFyIGU9dGhpcy5vcHRpb25zLnRyaWdnZXIuc3BsaXQoXCIgXCIpLGY9ZS5sZW5ndGg7Zi0tOyl7dmFyIGc9ZVtmXTtpZihcImNsaWNrXCI9PWcpdGhpcy4kZWxlbWVudC5vbihcImNsaWNrLlwiK3RoaXMudHlwZSx0aGlzLm9wdGlvbnMuc2VsZWN0b3IsYS5wcm94eSh0aGlzLnRvZ2dsZSx0aGlzKSk7ZWxzZSBpZihcIm1hbnVhbFwiIT1nKXt2YXIgaD1cImhvdmVyXCI9PWc/XCJtb3VzZWVudGVyXCI6XCJmb2N1c1wiLGk9XCJob3ZlclwiPT1nP1wibW91c2VsZWF2ZVwiOlwiYmx1clwiO3RoaXMuJGVsZW1lbnQub24oaCtcIi5cIit0aGlzLnR5cGUsdGhpcy5vcHRpb25zLnNlbGVjdG9yLGEucHJveHkodGhpcy5lbnRlcix0aGlzKSksdGhpcy4kZWxlbWVudC5vbihpK1wiLlwiK3RoaXMudHlwZSx0aGlzLm9wdGlvbnMuc2VsZWN0b3IsYS5wcm94eSh0aGlzLmxlYXZlLHRoaXMpKX19dGhpcy5vcHRpb25zLnNlbGVjdG9yP3RoaXMuX29wdGlvbnM9YS5leHRlbmQoe30sdGhpcy5vcHRpb25zLHt0cmlnZ2VyOlwibWFudWFsXCIsc2VsZWN0b3I6XCJcIn0pOnRoaXMuZml4VGl0bGUoKX0sYi5wcm90b3R5cGUuZ2V0RGVmYXVsdHM9ZnVuY3Rpb24oKXtyZXR1cm4gYi5ERUZBVUxUU30sYi5wcm90b3R5cGUuZ2V0T3B0aW9ucz1mdW5jdGlvbihiKXtyZXR1cm4gYj1hLmV4dGVuZCh7fSx0aGlzLmdldERlZmF1bHRzKCksdGhpcy4kZWxlbWVudC5kYXRhKCksYiksYi5kZWxheSYmXCJudW1iZXJcIj09dHlwZW9mIGIuZGVsYXkmJihiLmRlbGF5PXtzaG93OmIuZGVsYXksaGlkZTpiLmRlbGF5fSksYn0sYi5wcm90b3R5cGUuZ2V0RGVsZWdhdGVPcHRpb25zPWZ1bmN0aW9uKCl7dmFyIGI9e30sYz10aGlzLmdldERlZmF1bHRzKCk7cmV0dXJuIHRoaXMuX29wdGlvbnMmJmEuZWFjaCh0aGlzLl9vcHRpb25zLGZ1bmN0aW9uKGEsZCl7Y1thXSE9ZCYmKGJbYV09ZCl9KSxifSxiLnByb3RvdHlwZS5lbnRlcj1mdW5jdGlvbihiKXt2YXIgYz1iIGluc3RhbmNlb2YgdGhpcy5jb25zdHJ1Y3Rvcj9iOmEoYi5jdXJyZW50VGFyZ2V0KVt0aGlzLnR5cGVdKHRoaXMuZ2V0RGVsZWdhdGVPcHRpb25zKCkpLmRhdGEoXCJicy5cIit0aGlzLnR5cGUpO3JldHVybiBjbGVhclRpbWVvdXQoYy50aW1lb3V0KSxjLmhvdmVyU3RhdGU9XCJpblwiLGMub3B0aW9ucy5kZWxheSYmYy5vcHRpb25zLmRlbGF5LnNob3c/KGMudGltZW91dD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XCJpblwiPT1jLmhvdmVyU3RhdGUmJmMuc2hvdygpfSxjLm9wdGlvbnMuZGVsYXkuc2hvdyksdm9pZCAwKTpjLnNob3coKX0sYi5wcm90b3R5cGUubGVhdmU9ZnVuY3Rpb24oYil7dmFyIGM9YiBpbnN0YW5jZW9mIHRoaXMuY29uc3RydWN0b3I/YjphKGIuY3VycmVudFRhcmdldClbdGhpcy50eXBlXSh0aGlzLmdldERlbGVnYXRlT3B0aW9ucygpKS5kYXRhKFwiYnMuXCIrdGhpcy50eXBlKTtyZXR1cm4gY2xlYXJUaW1lb3V0KGMudGltZW91dCksYy5ob3ZlclN0YXRlPVwib3V0XCIsYy5vcHRpb25zLmRlbGF5JiZjLm9wdGlvbnMuZGVsYXkuaGlkZT8oYy50aW1lb3V0PXNldFRpbWVvdXQoZnVuY3Rpb24oKXtcIm91dFwiPT1jLmhvdmVyU3RhdGUmJmMuaGlkZSgpfSxjLm9wdGlvbnMuZGVsYXkuaGlkZSksdm9pZCAwKTpjLmhpZGUoKX0sYi5wcm90b3R5cGUuc2hvdz1mdW5jdGlvbigpe3ZhciBiPWEuRXZlbnQoXCJzaG93LmJzLlwiK3RoaXMudHlwZSk7aWYodGhpcy5oYXNDb250ZW50KCkmJnRoaXMuZW5hYmxlZCl7aWYodGhpcy4kZWxlbWVudC50cmlnZ2VyKGIpLGIuaXNEZWZhdWx0UHJldmVudGVkKCkpcmV0dXJuO3ZhciBjPXRoaXMudGlwKCk7dGhpcy5zZXRDb250ZW50KCksdGhpcy5vcHRpb25zLmFuaW1hdGlvbiYmYy5hZGRDbGFzcyhcImZhZGVcIik7dmFyIGQ9XCJmdW5jdGlvblwiPT10eXBlb2YgdGhpcy5vcHRpb25zLnBsYWNlbWVudD90aGlzLm9wdGlvbnMucGxhY2VtZW50LmNhbGwodGhpcyxjWzBdLHRoaXMuJGVsZW1lbnRbMF0pOnRoaXMub3B0aW9ucy5wbGFjZW1lbnQsZT0vXFxzP2F1dG8/XFxzPy9pLGY9ZS50ZXN0KGQpO2YmJihkPWQucmVwbGFjZShlLFwiXCIpfHxcInRvcFwiKSxjLmRldGFjaCgpLmNzcyh7dG9wOjAsbGVmdDowLGRpc3BsYXk6XCJibG9ja1wifSkuYWRkQ2xhc3MoZCksdGhpcy5vcHRpb25zLmNvbnRhaW5lcj9jLmFwcGVuZFRvKHRoaXMub3B0aW9ucy5jb250YWluZXIpOmMuaW5zZXJ0QWZ0ZXIodGhpcy4kZWxlbWVudCk7dmFyIGc9dGhpcy5nZXRQb3NpdGlvbigpLGg9Y1swXS5vZmZzZXRXaWR0aCxpPWNbMF0ub2Zmc2V0SGVpZ2h0O2lmKGYpe3ZhciBqPXRoaXMuJGVsZW1lbnQucGFyZW50KCksaz1kLGw9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcHx8ZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AsbT1cImJvZHlcIj09dGhpcy5vcHRpb25zLmNvbnRhaW5lcj93aW5kb3cuaW5uZXJXaWR0aDpqLm91dGVyV2lkdGgoKSxuPVwiYm9keVwiPT10aGlzLm9wdGlvbnMuY29udGFpbmVyP3dpbmRvdy5pbm5lckhlaWdodDpqLm91dGVySGVpZ2h0KCksbz1cImJvZHlcIj09dGhpcy5vcHRpb25zLmNvbnRhaW5lcj8wOmoub2Zmc2V0KCkubGVmdDtkPVwiYm90dG9tXCI9PWQmJmcudG9wK2cuaGVpZ2h0K2ktbD5uP1widG9wXCI6XCJ0b3BcIj09ZCYmZy50b3AtbC1pPDA/XCJib3R0b21cIjpcInJpZ2h0XCI9PWQmJmcucmlnaHQraD5tP1wibGVmdFwiOlwibGVmdFwiPT1kJiZnLmxlZnQtaDxvP1wicmlnaHRcIjpkLGMucmVtb3ZlQ2xhc3MoaykuYWRkQ2xhc3MoZCl9dmFyIHA9dGhpcy5nZXRDYWxjdWxhdGVkT2Zmc2V0KGQsZyxoLGkpO3RoaXMuYXBwbHlQbGFjZW1lbnQocCxkKSx0aGlzLiRlbGVtZW50LnRyaWdnZXIoXCJzaG93bi5icy5cIit0aGlzLnR5cGUpfX0sYi5wcm90b3R5cGUuYXBwbHlQbGFjZW1lbnQ9ZnVuY3Rpb24oYSxiKXt2YXIgYyxkPXRoaXMudGlwKCksZT1kWzBdLm9mZnNldFdpZHRoLGY9ZFswXS5vZmZzZXRIZWlnaHQsZz1wYXJzZUludChkLmNzcyhcIm1hcmdpbi10b3BcIiksMTApLGg9cGFyc2VJbnQoZC5jc3MoXCJtYXJnaW4tbGVmdFwiKSwxMCk7aXNOYU4oZykmJihnPTApLGlzTmFOKGgpJiYoaD0wKSxhLnRvcD1hLnRvcCtnLGEubGVmdD1hLmxlZnQraCxkLm9mZnNldChhKS5hZGRDbGFzcyhcImluXCIpO3ZhciBpPWRbMF0ub2Zmc2V0V2lkdGgsaj1kWzBdLm9mZnNldEhlaWdodDtpZihcInRvcFwiPT1iJiZqIT1mJiYoYz0hMCxhLnRvcD1hLnRvcCtmLWopLC9ib3R0b218dG9wLy50ZXN0KGIpKXt2YXIgaz0wO2EubGVmdDwwJiYoaz0tMiphLmxlZnQsYS5sZWZ0PTAsZC5vZmZzZXQoYSksaT1kWzBdLm9mZnNldFdpZHRoLGo9ZFswXS5vZmZzZXRIZWlnaHQpLHRoaXMucmVwbGFjZUFycm93KGstZStpLGksXCJsZWZ0XCIpfWVsc2UgdGhpcy5yZXBsYWNlQXJyb3coai1mLGosXCJ0b3BcIik7YyYmZC5vZmZzZXQoYSl9LGIucHJvdG90eXBlLnJlcGxhY2VBcnJvdz1mdW5jdGlvbihhLGIsYyl7dGhpcy5hcnJvdygpLmNzcyhjLGE/NTAqKDEtYS9iKStcIiVcIjpcIlwiKX0sYi5wcm90b3R5cGUuc2V0Q29udGVudD1mdW5jdGlvbigpe3ZhciBhPXRoaXMudGlwKCksYj10aGlzLmdldFRpdGxlKCk7YS5maW5kKFwiLnRvb2x0aXAtaW5uZXJcIilbdGhpcy5vcHRpb25zLmh0bWw/XCJodG1sXCI6XCJ0ZXh0XCJdKGIpLGEucmVtb3ZlQ2xhc3MoXCJmYWRlIGluIHRvcCBib3R0b20gbGVmdCByaWdodFwiKX0sYi5wcm90b3R5cGUuaGlkZT1mdW5jdGlvbigpe2Z1bmN0aW9uIGIoKXtcImluXCIhPWMuaG92ZXJTdGF0ZSYmZC5kZXRhY2goKX12YXIgYz10aGlzLGQ9dGhpcy50aXAoKSxlPWEuRXZlbnQoXCJoaWRlLmJzLlwiK3RoaXMudHlwZSk7cmV0dXJuIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihlKSxlLmlzRGVmYXVsdFByZXZlbnRlZCgpP3ZvaWQgMDooZC5yZW1vdmVDbGFzcyhcImluXCIpLGEuc3VwcG9ydC50cmFuc2l0aW9uJiZ0aGlzLiR0aXAuaGFzQ2xhc3MoXCJmYWRlXCIpP2Qub25lKGEuc3VwcG9ydC50cmFuc2l0aW9uLmVuZCxiKS5lbXVsYXRlVHJhbnNpdGlvbkVuZCgxNTApOmIoKSx0aGlzLiRlbGVtZW50LnRyaWdnZXIoXCJoaWRkZW4uYnMuXCIrdGhpcy50eXBlKSx0aGlzKX0sYi5wcm90b3R5cGUuZml4VGl0bGU9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLiRlbGVtZW50OyhhLmF0dHIoXCJ0aXRsZVwiKXx8XCJzdHJpbmdcIiE9dHlwZW9mIGEuYXR0cihcImRhdGEtb3JpZ2luYWwtdGl0bGVcIikpJiZhLmF0dHIoXCJkYXRhLW9yaWdpbmFsLXRpdGxlXCIsYS5hdHRyKFwidGl0bGVcIil8fFwiXCIpLmF0dHIoXCJ0aXRsZVwiLFwiXCIpfSxiLnByb3RvdHlwZS5oYXNDb250ZW50PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZ2V0VGl0bGUoKX0sYi5wcm90b3R5cGUuZ2V0UG9zaXRpb249ZnVuY3Rpb24oKXt2YXIgYj10aGlzLiRlbGVtZW50WzBdO3JldHVybiBhLmV4dGVuZCh7fSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBiLmdldEJvdW5kaW5nQ2xpZW50UmVjdD9iLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOnt3aWR0aDpiLm9mZnNldFdpZHRoLGhlaWdodDpiLm9mZnNldEhlaWdodH0sdGhpcy4kZWxlbWVudC5vZmZzZXQoKSl9LGIucHJvdG90eXBlLmdldENhbGN1bGF0ZWRPZmZzZXQ9ZnVuY3Rpb24oYSxiLGMsZCl7cmV0dXJuXCJib3R0b21cIj09YT97dG9wOmIudG9wK2IuaGVpZ2h0LGxlZnQ6Yi5sZWZ0K2Iud2lkdGgvMi1jLzJ9OlwidG9wXCI9PWE/e3RvcDpiLnRvcC1kLGxlZnQ6Yi5sZWZ0K2Iud2lkdGgvMi1jLzJ9OlwibGVmdFwiPT1hP3t0b3A6Yi50b3ArYi5oZWlnaHQvMi1kLzIsbGVmdDpiLmxlZnQtY306e3RvcDpiLnRvcCtiLmhlaWdodC8yLWQvMixsZWZ0OmIubGVmdCtiLndpZHRofX0sYi5wcm90b3R5cGUuZ2V0VGl0bGU9ZnVuY3Rpb24oKXt2YXIgYSxiPXRoaXMuJGVsZW1lbnQsYz10aGlzLm9wdGlvbnM7cmV0dXJuIGE9Yi5hdHRyKFwiZGF0YS1vcmlnaW5hbC10aXRsZVwiKXx8KFwiZnVuY3Rpb25cIj09dHlwZW9mIGMudGl0bGU/Yy50aXRsZS5jYWxsKGJbMF0pOmMudGl0bGUpfSxiLnByb3RvdHlwZS50aXA9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy4kdGlwPXRoaXMuJHRpcHx8YSh0aGlzLm9wdGlvbnMudGVtcGxhdGUpfSxiLnByb3RvdHlwZS5hcnJvdz1mdW5jdGlvbigpe3JldHVybiB0aGlzLiRhcnJvdz10aGlzLiRhcnJvd3x8dGhpcy50aXAoKS5maW5kKFwiLnRvb2x0aXAtYXJyb3dcIil9LGIucHJvdG90eXBlLnZhbGlkYXRlPWZ1bmN0aW9uKCl7dGhpcy4kZWxlbWVudFswXS5wYXJlbnROb2RlfHwodGhpcy5oaWRlKCksdGhpcy4kZWxlbWVudD1udWxsLHRoaXMub3B0aW9ucz1udWxsKX0sYi5wcm90b3R5cGUuZW5hYmxlPWZ1bmN0aW9uKCl7dGhpcy5lbmFibGVkPSEwfSxiLnByb3RvdHlwZS5kaXNhYmxlPWZ1bmN0aW9uKCl7dGhpcy5lbmFibGVkPSExfSxiLnByb3RvdHlwZS50b2dnbGVFbmFibGVkPWZ1bmN0aW9uKCl7dGhpcy5lbmFibGVkPSF0aGlzLmVuYWJsZWR9LGIucHJvdG90eXBlLnRvZ2dsZT1mdW5jdGlvbihiKXt2YXIgYz1iP2EoYi5jdXJyZW50VGFyZ2V0KVt0aGlzLnR5cGVdKHRoaXMuZ2V0RGVsZWdhdGVPcHRpb25zKCkpLmRhdGEoXCJicy5cIit0aGlzLnR5cGUpOnRoaXM7Yy50aXAoKS5oYXNDbGFzcyhcImluXCIpP2MubGVhdmUoYyk6Yy5lbnRlcihjKX0sYi5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe3RoaXMuaGlkZSgpLiRlbGVtZW50Lm9mZihcIi5cIit0aGlzLnR5cGUpLnJlbW92ZURhdGEoXCJicy5cIit0aGlzLnR5cGUpfTt2YXIgYz1hLmZuLnRvb2x0aXA7YS5mbi50b29sdGlwPWZ1bmN0aW9uKGMpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgZD1hKHRoaXMpLGU9ZC5kYXRhKFwiYnMudG9vbHRpcFwiKSxmPVwib2JqZWN0XCI9PXR5cGVvZiBjJiZjO2V8fGQuZGF0YShcImJzLnRvb2x0aXBcIixlPW5ldyBiKHRoaXMsZikpLFwic3RyaW5nXCI9PXR5cGVvZiBjJiZlW2NdKCl9KX0sYS5mbi50b29sdGlwLkNvbnN0cnVjdG9yPWIsYS5mbi50b29sdGlwLm5vQ29uZmxpY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gYS5mbi50b29sdGlwPWMsdGhpc319KGpRdWVyeSksK2Z1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO3ZhciBiPWZ1bmN0aW9uKGEsYil7dGhpcy5pbml0KFwicG9wb3ZlclwiLGEsYil9O2lmKCFhLmZuLnRvb2x0aXApdGhyb3cgbmV3IEVycm9yKFwiUG9wb3ZlciByZXF1aXJlcyB0b29sdGlwLmpzXCIpO2IuREVGQVVMVFM9YS5leHRlbmQoe30sYS5mbi50b29sdGlwLkNvbnN0cnVjdG9yLkRFRkFVTFRTLHtwbGFjZW1lbnQ6XCJyaWdodFwiLHRyaWdnZXI6XCJjbGlja1wiLGNvbnRlbnQ6XCJcIix0ZW1wbGF0ZTonPGRpdiBjbGFzcz1cInBvcG92ZXJcIj48ZGl2IGNsYXNzPVwiYXJyb3dcIj48L2Rpdj48aDMgY2xhc3M9XCJwb3BvdmVyLXRpdGxlXCI+PC9oMz48ZGl2IGNsYXNzPVwicG9wb3Zlci1jb250ZW50XCI+PC9kaXY+PC9kaXY+J30pLGIucHJvdG90eXBlPWEuZXh0ZW5kKHt9LGEuZm4udG9vbHRpcC5Db25zdHJ1Y3Rvci5wcm90b3R5cGUpLGIucHJvdG90eXBlLmNvbnN0cnVjdG9yPWIsYi5wcm90b3R5cGUuZ2V0RGVmYXVsdHM9ZnVuY3Rpb24oKXtyZXR1cm4gYi5ERUZBVUxUU30sYi5wcm90b3R5cGUuc2V0Q29udGVudD1mdW5jdGlvbigpe3ZhciBhPXRoaXMudGlwKCksYj10aGlzLmdldFRpdGxlKCksYz10aGlzLmdldENvbnRlbnQoKTthLmZpbmQoXCIucG9wb3Zlci10aXRsZVwiKVt0aGlzLm9wdGlvbnMuaHRtbD9cImh0bWxcIjpcInRleHRcIl0oYiksYS5maW5kKFwiLnBvcG92ZXItY29udGVudFwiKVt0aGlzLm9wdGlvbnMuaHRtbD9cImh0bWxcIjpcInRleHRcIl0oYyksYS5yZW1vdmVDbGFzcyhcImZhZGUgdG9wIGJvdHRvbSBsZWZ0IHJpZ2h0IGluXCIpLGEuZmluZChcIi5wb3BvdmVyLXRpdGxlXCIpLmh0bWwoKXx8YS5maW5kKFwiLnBvcG92ZXItdGl0bGVcIikuaGlkZSgpfSxiLnByb3RvdHlwZS5oYXNDb250ZW50PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZ2V0VGl0bGUoKXx8dGhpcy5nZXRDb250ZW50KCl9LGIucHJvdG90eXBlLmdldENvbnRlbnQ9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLiRlbGVtZW50LGI9dGhpcy5vcHRpb25zO3JldHVybiBhLmF0dHIoXCJkYXRhLWNvbnRlbnRcIil8fChcImZ1bmN0aW9uXCI9PXR5cGVvZiBiLmNvbnRlbnQ/Yi5jb250ZW50LmNhbGwoYVswXSk6Yi5jb250ZW50KX0sYi5wcm90b3R5cGUuYXJyb3c9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy4kYXJyb3c9dGhpcy4kYXJyb3d8fHRoaXMudGlwKCkuZmluZChcIi5hcnJvd1wiKX0sYi5wcm90b3R5cGUudGlwPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuJHRpcHx8KHRoaXMuJHRpcD1hKHRoaXMub3B0aW9ucy50ZW1wbGF0ZSkpLHRoaXMuJHRpcH07dmFyIGM9YS5mbi5wb3BvdmVyO2EuZm4ucG9wb3Zlcj1mdW5jdGlvbihjKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGQ9YSh0aGlzKSxlPWQuZGF0YShcImJzLnBvcG92ZXJcIiksZj1cIm9iamVjdFwiPT10eXBlb2YgYyYmYztlfHxkLmRhdGEoXCJicy5wb3BvdmVyXCIsZT1uZXcgYih0aGlzLGYpKSxcInN0cmluZ1wiPT10eXBlb2YgYyYmZVtjXSgpfSl9LGEuZm4ucG9wb3Zlci5Db25zdHJ1Y3Rvcj1iLGEuZm4ucG9wb3Zlci5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIGEuZm4ucG9wb3Zlcj1jLHRoaXN9fShqUXVlcnkpLCtmdW5jdGlvbihhKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBiKGMsZCl7dmFyIGUsZj1hLnByb3h5KHRoaXMucHJvY2Vzcyx0aGlzKTt0aGlzLiRlbGVtZW50PWEoYykuaXMoXCJib2R5XCIpP2Eod2luZG93KTphKGMpLHRoaXMuJGJvZHk9YShcImJvZHlcIiksdGhpcy4kc2Nyb2xsRWxlbWVudD10aGlzLiRlbGVtZW50Lm9uKFwic2Nyb2xsLmJzLnNjcm9sbC1zcHkuZGF0YS1hcGlcIixmKSx0aGlzLm9wdGlvbnM9YS5leHRlbmQoe30sYi5ERUZBVUxUUyxkKSx0aGlzLnNlbGVjdG9yPSh0aGlzLm9wdGlvbnMudGFyZ2V0fHwoZT1hKGMpLmF0dHIoXCJocmVmXCIpKSYmZS5yZXBsYWNlKC8uKig/PSNbXlxcc10rJCkvLFwiXCIpfHxcIlwiKStcIiAubmF2IGxpID4gYVwiLHRoaXMub2Zmc2V0cz1hKFtdKSx0aGlzLnRhcmdldHM9YShbXSksdGhpcy5hY3RpdmVUYXJnZXQ9bnVsbCx0aGlzLnJlZnJlc2goKSx0aGlzLnByb2Nlc3MoKX1iLkRFRkFVTFRTPXtvZmZzZXQ6MTB9LGIucHJvdG90eXBlLnJlZnJlc2g9ZnVuY3Rpb24oKXt2YXIgYj10aGlzLiRlbGVtZW50WzBdPT13aW5kb3c/XCJvZmZzZXRcIjpcInBvc2l0aW9uXCI7dGhpcy5vZmZzZXRzPWEoW10pLHRoaXMudGFyZ2V0cz1hKFtdKTt2YXIgYz10aGlzO3RoaXMuJGJvZHkuZmluZCh0aGlzLnNlbGVjdG9yKS5tYXAoZnVuY3Rpb24oKXt2YXIgZD1hKHRoaXMpLGU9ZC5kYXRhKFwidGFyZ2V0XCIpfHxkLmF0dHIoXCJocmVmXCIpLGY9L14jXFx3Ly50ZXN0KGUpJiZhKGUpO3JldHVybiBmJiZmLmxlbmd0aCYmW1tmW2JdKCkudG9wKyghYS5pc1dpbmRvdyhjLiRzY3JvbGxFbGVtZW50LmdldCgwKSkmJmMuJHNjcm9sbEVsZW1lbnQuc2Nyb2xsVG9wKCkpLGVdXXx8bnVsbH0pLnNvcnQoZnVuY3Rpb24oYSxiKXtyZXR1cm4gYVswXS1iWzBdfSkuZWFjaChmdW5jdGlvbigpe2Mub2Zmc2V0cy5wdXNoKHRoaXNbMF0pLGMudGFyZ2V0cy5wdXNoKHRoaXNbMV0pfSl9LGIucHJvdG90eXBlLnByb2Nlc3M9ZnVuY3Rpb24oKXt2YXIgYSxiPXRoaXMuJHNjcm9sbEVsZW1lbnQuc2Nyb2xsVG9wKCkrdGhpcy5vcHRpb25zLm9mZnNldCxjPXRoaXMuJHNjcm9sbEVsZW1lbnRbMF0uc2Nyb2xsSGVpZ2h0fHx0aGlzLiRib2R5WzBdLnNjcm9sbEhlaWdodCxkPWMtdGhpcy4kc2Nyb2xsRWxlbWVudC5oZWlnaHQoKSxlPXRoaXMub2Zmc2V0cyxmPXRoaXMudGFyZ2V0cyxnPXRoaXMuYWN0aXZlVGFyZ2V0O2lmKGI+PWQpcmV0dXJuIGchPShhPWYubGFzdCgpWzBdKSYmdGhpcy5hY3RpdmF0ZShhKTtmb3IoYT1lLmxlbmd0aDthLS07KWchPWZbYV0mJmI+PWVbYV0mJighZVthKzFdfHxiPD1lW2ErMV0pJiZ0aGlzLmFjdGl2YXRlKGZbYV0pfSxiLnByb3RvdHlwZS5hY3RpdmF0ZT1mdW5jdGlvbihiKXt0aGlzLmFjdGl2ZVRhcmdldD1iLGEodGhpcy5zZWxlY3RvcikucGFyZW50cyhcIi5hY3RpdmVcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7dmFyIGM9dGhpcy5zZWxlY3RvcisnW2RhdGEtdGFyZ2V0PVwiJytiKydcIl0sJyt0aGlzLnNlbGVjdG9yKydbaHJlZj1cIicrYisnXCJdJyxkPWEoYykucGFyZW50cyhcImxpXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO2QucGFyZW50KFwiLmRyb3Bkb3duLW1lbnVcIikubGVuZ3RoJiYoZD1kLmNsb3Nlc3QoXCJsaS5kcm9wZG93blwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKSksZC50cmlnZ2VyKFwiYWN0aXZhdGUuYnMuc2Nyb2xsc3B5XCIpfTt2YXIgYz1hLmZuLnNjcm9sbHNweTthLmZuLnNjcm9sbHNweT1mdW5jdGlvbihjKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGQ9YSh0aGlzKSxlPWQuZGF0YShcImJzLnNjcm9sbHNweVwiKSxmPVwib2JqZWN0XCI9PXR5cGVvZiBjJiZjO2V8fGQuZGF0YShcImJzLnNjcm9sbHNweVwiLGU9bmV3IGIodGhpcyxmKSksXCJzdHJpbmdcIj09dHlwZW9mIGMmJmVbY10oKX0pfSxhLmZuLnNjcm9sbHNweS5Db25zdHJ1Y3Rvcj1iLGEuZm4uc2Nyb2xsc3B5Lm5vQ29uZmxpY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gYS5mbi5zY3JvbGxzcHk9Yyx0aGlzfSxhKHdpbmRvdykub24oXCJsb2FkXCIsZnVuY3Rpb24oKXthKCdbZGF0YS1zcHk9XCJzY3JvbGxcIl0nKS5lYWNoKGZ1bmN0aW9uKCl7dmFyIGI9YSh0aGlzKTtiLnNjcm9sbHNweShiLmRhdGEoKSl9KX0pfShqUXVlcnkpLCtmdW5jdGlvbihhKXtcInVzZSBzdHJpY3RcIjt2YXIgYj1mdW5jdGlvbihiKXt0aGlzLmVsZW1lbnQ9YShiKX07Yi5wcm90b3R5cGUuc2hvdz1mdW5jdGlvbigpe3ZhciBiPXRoaXMuZWxlbWVudCxjPWIuY2xvc2VzdChcInVsOm5vdCguZHJvcGRvd24tbWVudSlcIiksZD1iLmRhdGEoXCJ0YXJnZXRcIik7aWYoZHx8KGQ9Yi5hdHRyKFwiaHJlZlwiKSxkPWQmJmQucmVwbGFjZSgvLiooPz0jW15cXHNdKiQpLyxcIlwiKSksIWIucGFyZW50KFwibGlcIikuaGFzQ2xhc3MoXCJhY3RpdmVcIikpe3ZhciBlPWMuZmluZChcIi5hY3RpdmU6bGFzdCBhXCIpWzBdLGY9YS5FdmVudChcInNob3cuYnMudGFiXCIse3JlbGF0ZWRUYXJnZXQ6ZX0pO2lmKGIudHJpZ2dlcihmKSwhZi5pc0RlZmF1bHRQcmV2ZW50ZWQoKSl7dmFyIGc9YShkKTt0aGlzLmFjdGl2YXRlKGIucGFyZW50KFwibGlcIiksYyksdGhpcy5hY3RpdmF0ZShnLGcucGFyZW50KCksZnVuY3Rpb24oKXtiLnRyaWdnZXIoe3R5cGU6XCJzaG93bi5icy50YWJcIixyZWxhdGVkVGFyZ2V0OmV9KX0pfX19LGIucHJvdG90eXBlLmFjdGl2YXRlPWZ1bmN0aW9uKGIsYyxkKXtmdW5jdGlvbiBlKCl7Zi5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKS5maW5kKFwiPiAuZHJvcGRvd24tbWVudSA+IC5hY3RpdmVcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIiksYi5hZGRDbGFzcyhcImFjdGl2ZVwiKSxnPyhiWzBdLm9mZnNldFdpZHRoLGIuYWRkQ2xhc3MoXCJpblwiKSk6Yi5yZW1vdmVDbGFzcyhcImZhZGVcIiksYi5wYXJlbnQoXCIuZHJvcGRvd24tbWVudVwiKSYmYi5jbG9zZXN0KFwibGkuZHJvcGRvd25cIikuYWRkQ2xhc3MoXCJhY3RpdmVcIiksZCYmZCgpfXZhciBmPWMuZmluZChcIj4gLmFjdGl2ZVwiKSxnPWQmJmEuc3VwcG9ydC50cmFuc2l0aW9uJiZmLmhhc0NsYXNzKFwiZmFkZVwiKTtnP2Yub25lKGEuc3VwcG9ydC50cmFuc2l0aW9uLmVuZCxlKS5lbXVsYXRlVHJhbnNpdGlvbkVuZCgxNTApOmUoKSxmLnJlbW92ZUNsYXNzKFwiaW5cIil9O3ZhciBjPWEuZm4udGFiO2EuZm4udGFiPWZ1bmN0aW9uKGMpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgZD1hKHRoaXMpLGU9ZC5kYXRhKFwiYnMudGFiXCIpO2V8fGQuZGF0YShcImJzLnRhYlwiLGU9bmV3IGIodGhpcykpLFwic3RyaW5nXCI9PXR5cGVvZiBjJiZlW2NdKCl9KX0sYS5mbi50YWIuQ29uc3RydWN0b3I9YixhLmZuLnRhYi5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIGEuZm4udGFiPWMsdGhpc30sYShkb2N1bWVudCkub24oXCJjbGljay5icy50YWIuZGF0YS1hcGlcIiwnW2RhdGEtdG9nZ2xlPVwidGFiXCJdLCBbZGF0YS10b2dnbGU9XCJwaWxsXCJdJyxmdW5jdGlvbihiKXtiLnByZXZlbnREZWZhdWx0KCksYSh0aGlzKS50YWIoXCJzaG93XCIpfSl9KGpRdWVyeSksK2Z1bmN0aW9uKGEpe1widXNlIHN0cmljdFwiO3ZhciBiPWZ1bmN0aW9uKGMsZCl7dGhpcy5vcHRpb25zPWEuZXh0ZW5kKHt9LGIuREVGQVVMVFMsZCksdGhpcy4kd2luZG93PWEod2luZG93KS5vbihcInNjcm9sbC5icy5hZmZpeC5kYXRhLWFwaVwiLGEucHJveHkodGhpcy5jaGVja1Bvc2l0aW9uLHRoaXMpKS5vbihcImNsaWNrLmJzLmFmZml4LmRhdGEtYXBpXCIsYS5wcm94eSh0aGlzLmNoZWNrUG9zaXRpb25XaXRoRXZlbnRMb29wLHRoaXMpKSx0aGlzLiRlbGVtZW50PWEoYyksdGhpcy5hZmZpeGVkPXRoaXMudW5waW49bnVsbCx0aGlzLmNoZWNrUG9zaXRpb24oKX07Yi5SRVNFVD1cImFmZml4IGFmZml4LXRvcCBhZmZpeC1ib3R0b21cIixiLkRFRkFVTFRTPXtvZmZzZXQ6MH0sYi5wcm90b3R5cGUuY2hlY2tQb3NpdGlvbldpdGhFdmVudExvb3A9ZnVuY3Rpb24oKXtzZXRUaW1lb3V0KGEucHJveHkodGhpcy5jaGVja1Bvc2l0aW9uLHRoaXMpLDEpfSxiLnByb3RvdHlwZS5jaGVja1Bvc2l0aW9uPWZ1bmN0aW9uKCl7aWYodGhpcy4kZWxlbWVudC5pcyhcIjp2aXNpYmxlXCIpKXt2YXIgYz1hKGRvY3VtZW50KS5oZWlnaHQoKSxkPXRoaXMuJHdpbmRvdy5zY3JvbGxUb3AoKSxlPXRoaXMuJGVsZW1lbnQub2Zmc2V0KCksZj10aGlzLm9wdGlvbnMub2Zmc2V0LGc9Zi50b3AsaD1mLmJvdHRvbTtcIm9iamVjdFwiIT10eXBlb2YgZiYmKGg9Zz1mKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBnJiYoZz1mLnRvcCgpKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBoJiYoaD1mLmJvdHRvbSgpKTt2YXIgaT1udWxsIT10aGlzLnVucGluJiZkK3RoaXMudW5waW48PWUudG9wPyExOm51bGwhPWgmJmUudG9wK3RoaXMuJGVsZW1lbnQuaGVpZ2h0KCk+PWMtaD9cImJvdHRvbVwiOm51bGwhPWcmJmc+PWQ/XCJ0b3BcIjohMTt0aGlzLmFmZml4ZWQhPT1pJiYodGhpcy51bnBpbiYmdGhpcy4kZWxlbWVudC5jc3MoXCJ0b3BcIixcIlwiKSx0aGlzLmFmZml4ZWQ9aSx0aGlzLnVucGluPVwiYm90dG9tXCI9PWk/ZS50b3AtZDpudWxsLHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoYi5SRVNFVCkuYWRkQ2xhc3MoXCJhZmZpeFwiKyhpP1wiLVwiK2k6XCJcIikpLFwiYm90dG9tXCI9PWkmJnRoaXMuJGVsZW1lbnQub2Zmc2V0KHt0b3A6ZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQtaC10aGlzLiRlbGVtZW50LmhlaWdodCgpfSkpfX07dmFyIGM9YS5mbi5hZmZpeDthLmZuLmFmZml4PWZ1bmN0aW9uKGMpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgZD1hKHRoaXMpLGU9ZC5kYXRhKFwiYnMuYWZmaXhcIiksZj1cIm9iamVjdFwiPT10eXBlb2YgYyYmYztlfHxkLmRhdGEoXCJicy5hZmZpeFwiLGU9bmV3IGIodGhpcyxmKSksXCJzdHJpbmdcIj09dHlwZW9mIGMmJmVbY10oKX0pfSxhLmZuLmFmZml4LkNvbnN0cnVjdG9yPWIsYS5mbi5hZmZpeC5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIGEuZm4uYWZmaXg9Yyx0aGlzfSxhKHdpbmRvdykub24oXCJsb2FkXCIsZnVuY3Rpb24oKXthKCdbZGF0YS1zcHk9XCJhZmZpeFwiXScpLmVhY2goZnVuY3Rpb24oKXt2YXIgYj1hKHRoaXMpLGM9Yi5kYXRhKCk7Yy5vZmZzZXQ9Yy5vZmZzZXR8fHt9LGMub2Zmc2V0Qm90dG9tJiYoYy5vZmZzZXQuYm90dG9tPWMub2Zmc2V0Qm90dG9tKSxjLm9mZnNldFRvcCYmKGMub2Zmc2V0LnRvcD1jLm9mZnNldFRvcCksYi5hZmZpeChjKX0pfSl9KGpRdWVyeSk7XG59KS5jYWxsKGdsb2JhbCwgbW9kdWxlLCB1bmRlZmluZWQpO1xuIiwidmFyIGdsb2JhbD10eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge307KGZ1bmN0aW9uIGJyb3dzZXJpZnlTaGltKG1vZHVsZSwgZXhwb3J0cywgZGVmaW5lLCBicm93c2VyaWZ5X3NoaW1fX2RlZmluZV9fbW9kdWxlX19leHBvcnRfXykge1xuLyohIGpRdWVyeSB2Mi4xLjAgfCAoYykgMjAwNSwgMjAxNCBqUXVlcnkgRm91bmRhdGlvbiwgSW5jLiB8IGpxdWVyeS5vcmcvbGljZW5zZSAqL1xuIWZ1bmN0aW9uKGEsYil7XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPWEuZG9jdW1lbnQ/YihhLCEwKTpmdW5jdGlvbihhKXtpZighYS5kb2N1bWVudCl0aHJvdyBuZXcgRXJyb3IoXCJqUXVlcnkgcmVxdWlyZXMgYSB3aW5kb3cgd2l0aCBhIGRvY3VtZW50XCIpO3JldHVybiBiKGEpfTpiKGEpfShcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp0aGlzLGZ1bmN0aW9uKGEsYil7dmFyIGM9W10sZD1jLnNsaWNlLGU9Yy5jb25jYXQsZj1jLnB1c2gsZz1jLmluZGV4T2YsaD17fSxpPWgudG9TdHJpbmcsaj1oLmhhc093blByb3BlcnR5LGs9XCJcIi50cmltLGw9e30sbT1hLmRvY3VtZW50LG49XCIyLjEuMFwiLG89ZnVuY3Rpb24oYSxiKXtyZXR1cm4gbmV3IG8uZm4uaW5pdChhLGIpfSxwPS9eLW1zLS8scT0vLShbXFxkYS16XSkvZ2kscj1mdW5jdGlvbihhLGIpe3JldHVybiBiLnRvVXBwZXJDYXNlKCl9O28uZm49by5wcm90b3R5cGU9e2pxdWVyeTpuLGNvbnN0cnVjdG9yOm8sc2VsZWN0b3I6XCJcIixsZW5ndGg6MCx0b0FycmF5OmZ1bmN0aW9uKCl7cmV0dXJuIGQuY2FsbCh0aGlzKX0sZ2V0OmZ1bmN0aW9uKGEpe3JldHVybiBudWxsIT1hPzA+YT90aGlzW2ErdGhpcy5sZW5ndGhdOnRoaXNbYV06ZC5jYWxsKHRoaXMpfSxwdXNoU3RhY2s6ZnVuY3Rpb24oYSl7dmFyIGI9by5tZXJnZSh0aGlzLmNvbnN0cnVjdG9yKCksYSk7cmV0dXJuIGIucHJldk9iamVjdD10aGlzLGIuY29udGV4dD10aGlzLmNvbnRleHQsYn0sZWFjaDpmdW5jdGlvbihhLGIpe3JldHVybiBvLmVhY2godGhpcyxhLGIpfSxtYXA6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMucHVzaFN0YWNrKG8ubWFwKHRoaXMsZnVuY3Rpb24oYixjKXtyZXR1cm4gYS5jYWxsKGIsYyxiKX0pKX0sc2xpY2U6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5wdXNoU3RhY2soZC5hcHBseSh0aGlzLGFyZ3VtZW50cykpfSxmaXJzdDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmVxKDApfSxsYXN0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZXEoLTEpfSxlcTpmdW5jdGlvbihhKXt2YXIgYj10aGlzLmxlbmd0aCxjPSthKygwPmE/YjowKTtyZXR1cm4gdGhpcy5wdXNoU3RhY2soYz49MCYmYj5jP1t0aGlzW2NdXTpbXSl9LGVuZDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnByZXZPYmplY3R8fHRoaXMuY29uc3RydWN0b3IobnVsbCl9LHB1c2g6Zixzb3J0OmMuc29ydCxzcGxpY2U6Yy5zcGxpY2V9LG8uZXh0ZW5kPW8uZm4uZXh0ZW5kPWZ1bmN0aW9uKCl7dmFyIGEsYixjLGQsZSxmLGc9YXJndW1lbnRzWzBdfHx7fSxoPTEsaT1hcmd1bWVudHMubGVuZ3RoLGo9ITE7Zm9yKFwiYm9vbGVhblwiPT10eXBlb2YgZyYmKGo9ZyxnPWFyZ3VtZW50c1toXXx8e30saCsrKSxcIm9iamVjdFwiPT10eXBlb2YgZ3x8by5pc0Z1bmN0aW9uKGcpfHwoZz17fSksaD09PWkmJihnPXRoaXMsaC0tKTtpPmg7aCsrKWlmKG51bGwhPShhPWFyZ3VtZW50c1toXSkpZm9yKGIgaW4gYSljPWdbYl0sZD1hW2JdLGchPT1kJiYoaiYmZCYmKG8uaXNQbGFpbk9iamVjdChkKXx8KGU9by5pc0FycmF5KGQpKSk/KGU/KGU9ITEsZj1jJiZvLmlzQXJyYXkoYyk/YzpbXSk6Zj1jJiZvLmlzUGxhaW5PYmplY3QoYyk/Yzp7fSxnW2JdPW8uZXh0ZW5kKGosZixkKSk6dm9pZCAwIT09ZCYmKGdbYl09ZCkpO3JldHVybiBnfSxvLmV4dGVuZCh7ZXhwYW5kbzpcImpRdWVyeVwiKyhuK01hdGgucmFuZG9tKCkpLnJlcGxhY2UoL1xcRC9nLFwiXCIpLGlzUmVhZHk6ITAsZXJyb3I6ZnVuY3Rpb24oYSl7dGhyb3cgbmV3IEVycm9yKGEpfSxub29wOmZ1bmN0aW9uKCl7fSxpc0Z1bmN0aW9uOmZ1bmN0aW9uKGEpe3JldHVyblwiZnVuY3Rpb25cIj09PW8udHlwZShhKX0saXNBcnJheTpBcnJheS5pc0FycmF5LGlzV2luZG93OmZ1bmN0aW9uKGEpe3JldHVybiBudWxsIT1hJiZhPT09YS53aW5kb3d9LGlzTnVtZXJpYzpmdW5jdGlvbihhKXtyZXR1cm4gYS1wYXJzZUZsb2F0KGEpPj0wfSxpc1BsYWluT2JqZWN0OmZ1bmN0aW9uKGEpe2lmKFwib2JqZWN0XCIhPT1vLnR5cGUoYSl8fGEubm9kZVR5cGV8fG8uaXNXaW5kb3coYSkpcmV0dXJuITE7dHJ5e2lmKGEuY29uc3RydWN0b3ImJiFqLmNhbGwoYS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUsXCJpc1Byb3RvdHlwZU9mXCIpKXJldHVybiExfWNhdGNoKGIpe3JldHVybiExfXJldHVybiEwfSxpc0VtcHR5T2JqZWN0OmZ1bmN0aW9uKGEpe3ZhciBiO2ZvcihiIGluIGEpcmV0dXJuITE7cmV0dXJuITB9LHR5cGU6ZnVuY3Rpb24oYSl7cmV0dXJuIG51bGw9PWE/YStcIlwiOlwib2JqZWN0XCI9PXR5cGVvZiBhfHxcImZ1bmN0aW9uXCI9PXR5cGVvZiBhP2hbaS5jYWxsKGEpXXx8XCJvYmplY3RcIjp0eXBlb2YgYX0sZ2xvYmFsRXZhbDpmdW5jdGlvbihhKXt2YXIgYixjPWV2YWw7YT1vLnRyaW0oYSksYSYmKDE9PT1hLmluZGV4T2YoXCJ1c2Ugc3RyaWN0XCIpPyhiPW0uY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSxiLnRleHQ9YSxtLmhlYWQuYXBwZW5kQ2hpbGQoYikucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChiKSk6YyhhKSl9LGNhbWVsQ2FzZTpmdW5jdGlvbihhKXtyZXR1cm4gYS5yZXBsYWNlKHAsXCJtcy1cIikucmVwbGFjZShxLHIpfSxub2RlTmFtZTpmdW5jdGlvbihhLGIpe3JldHVybiBhLm5vZGVOYW1lJiZhLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk9PT1iLnRvTG93ZXJDYXNlKCl9LGVhY2g6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkLGU9MCxmPWEubGVuZ3RoLGc9cyhhKTtpZihjKXtpZihnKXtmb3IoO2Y+ZTtlKyspaWYoZD1iLmFwcGx5KGFbZV0sYyksZD09PSExKWJyZWFrfWVsc2UgZm9yKGUgaW4gYSlpZihkPWIuYXBwbHkoYVtlXSxjKSxkPT09ITEpYnJlYWt9ZWxzZSBpZihnKXtmb3IoO2Y+ZTtlKyspaWYoZD1iLmNhbGwoYVtlXSxlLGFbZV0pLGQ9PT0hMSlicmVha31lbHNlIGZvcihlIGluIGEpaWYoZD1iLmNhbGwoYVtlXSxlLGFbZV0pLGQ9PT0hMSlicmVhaztyZXR1cm4gYX0sdHJpbTpmdW5jdGlvbihhKXtyZXR1cm4gbnVsbD09YT9cIlwiOmsuY2FsbChhKX0sbWFrZUFycmF5OmZ1bmN0aW9uKGEsYil7dmFyIGM9Ynx8W107cmV0dXJuIG51bGwhPWEmJihzKE9iamVjdChhKSk/by5tZXJnZShjLFwic3RyaW5nXCI9PXR5cGVvZiBhP1thXTphKTpmLmNhbGwoYyxhKSksY30saW5BcnJheTpmdW5jdGlvbihhLGIsYyl7cmV0dXJuIG51bGw9PWI/LTE6Zy5jYWxsKGIsYSxjKX0sbWVyZ2U6ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM9K2IubGVuZ3RoLGQ9MCxlPWEubGVuZ3RoO2M+ZDtkKyspYVtlKytdPWJbZF07cmV0dXJuIGEubGVuZ3RoPWUsYX0sZ3JlcDpmdW5jdGlvbihhLGIsYyl7Zm9yKHZhciBkLGU9W10sZj0wLGc9YS5sZW5ndGgsaD0hYztnPmY7ZisrKWQ9IWIoYVtmXSxmKSxkIT09aCYmZS5wdXNoKGFbZl0pO3JldHVybiBlfSxtYXA6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkLGY9MCxnPWEubGVuZ3RoLGg9cyhhKSxpPVtdO2lmKGgpZm9yKDtnPmY7ZisrKWQ9YihhW2ZdLGYsYyksbnVsbCE9ZCYmaS5wdXNoKGQpO2Vsc2UgZm9yKGYgaW4gYSlkPWIoYVtmXSxmLGMpLG51bGwhPWQmJmkucHVzaChkKTtyZXR1cm4gZS5hcHBseShbXSxpKX0sZ3VpZDoxLHByb3h5OmZ1bmN0aW9uKGEsYil7dmFyIGMsZSxmO3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiBiJiYoYz1hW2JdLGI9YSxhPWMpLG8uaXNGdW5jdGlvbihhKT8oZT1kLmNhbGwoYXJndW1lbnRzLDIpLGY9ZnVuY3Rpb24oKXtyZXR1cm4gYS5hcHBseShifHx0aGlzLGUuY29uY2F0KGQuY2FsbChhcmd1bWVudHMpKSl9LGYuZ3VpZD1hLmd1aWQ9YS5ndWlkfHxvLmd1aWQrKyxmKTp2b2lkIDB9LG5vdzpEYXRlLm5vdyxzdXBwb3J0Omx9KSxvLmVhY2goXCJCb29sZWFuIE51bWJlciBTdHJpbmcgRnVuY3Rpb24gQXJyYXkgRGF0ZSBSZWdFeHAgT2JqZWN0IEVycm9yXCIuc3BsaXQoXCIgXCIpLGZ1bmN0aW9uKGEsYil7aFtcIltvYmplY3QgXCIrYitcIl1cIl09Yi50b0xvd2VyQ2FzZSgpfSk7ZnVuY3Rpb24gcyhhKXt2YXIgYj1hLmxlbmd0aCxjPW8udHlwZShhKTtyZXR1cm5cImZ1bmN0aW9uXCI9PT1jfHxvLmlzV2luZG93KGEpPyExOjE9PT1hLm5vZGVUeXBlJiZiPyEwOlwiYXJyYXlcIj09PWN8fDA9PT1ifHxcIm51bWJlclwiPT10eXBlb2YgYiYmYj4wJiZiLTEgaW4gYX12YXIgdD1mdW5jdGlvbihhKXt2YXIgYixjLGQsZSxmLGcsaCxpLGosayxsLG0sbixvLHAscSxyLHM9XCJzaXp6bGVcIistbmV3IERhdGUsdD1hLmRvY3VtZW50LHU9MCx2PTAsdz1lYigpLHg9ZWIoKSx5PWViKCksej1mdW5jdGlvbihhLGIpe3JldHVybiBhPT09YiYmKGo9ITApLDB9LEE9XCJ1bmRlZmluZWRcIixCPTE8PDMxLEM9e30uaGFzT3duUHJvcGVydHksRD1bXSxFPUQucG9wLEY9RC5wdXNoLEc9RC5wdXNoLEg9RC5zbGljZSxJPUQuaW5kZXhPZnx8ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPTAsYz10aGlzLmxlbmd0aDtjPmI7YisrKWlmKHRoaXNbYl09PT1hKXJldHVybiBiO3JldHVybi0xfSxKPVwiY2hlY2tlZHxzZWxlY3RlZHxhc3luY3xhdXRvZm9jdXN8YXV0b3BsYXl8Y29udHJvbHN8ZGVmZXJ8ZGlzYWJsZWR8aGlkZGVufGlzbWFwfGxvb3B8bXVsdGlwbGV8b3BlbnxyZWFkb25seXxyZXF1aXJlZHxzY29wZWRcIixLPVwiW1xcXFx4MjBcXFxcdFxcXFxyXFxcXG5cXFxcZl1cIixMPVwiKD86XFxcXFxcXFwufFtcXFxcdy1dfFteXFxcXHgwMC1cXFxceGEwXSkrXCIsTT1MLnJlcGxhY2UoXCJ3XCIsXCJ3I1wiKSxOPVwiXFxcXFtcIitLK1wiKihcIitMK1wiKVwiK0srXCIqKD86KFsqXiR8IX5dPz0pXCIrSytcIiooPzooWydcXFwiXSkoKD86XFxcXFxcXFwufFteXFxcXFxcXFxdKSo/KVxcXFwzfChcIitNK1wiKXwpfClcIitLK1wiKlxcXFxdXCIsTz1cIjooXCIrTCtcIikoPzpcXFxcKCgoWydcXFwiXSkoKD86XFxcXFxcXFwufFteXFxcXFxcXFxdKSo/KVxcXFwzfCgoPzpcXFxcXFxcXC58W15cXFxcXFxcXCgpW1xcXFxdXXxcIitOLnJlcGxhY2UoMyw4KStcIikqKXwuKilcXFxcKXwpXCIsUD1uZXcgUmVnRXhwKFwiXlwiK0srXCIrfCgoPzpefFteXFxcXFxcXFxdKSg/OlxcXFxcXFxcLikqKVwiK0srXCIrJFwiLFwiZ1wiKSxRPW5ldyBSZWdFeHAoXCJeXCIrSytcIiosXCIrSytcIipcIiksUj1uZXcgUmVnRXhwKFwiXlwiK0srXCIqKFs+K35dfFwiK0srXCIpXCIrSytcIipcIiksUz1uZXcgUmVnRXhwKFwiPVwiK0srXCIqKFteXFxcXF0nXFxcIl0qPylcIitLK1wiKlxcXFxdXCIsXCJnXCIpLFQ9bmV3IFJlZ0V4cChPKSxVPW5ldyBSZWdFeHAoXCJeXCIrTStcIiRcIiksVj17SUQ6bmV3IFJlZ0V4cChcIl4jKFwiK0wrXCIpXCIpLENMQVNTOm5ldyBSZWdFeHAoXCJeXFxcXC4oXCIrTCtcIilcIiksVEFHOm5ldyBSZWdFeHAoXCJeKFwiK0wucmVwbGFjZShcIndcIixcIncqXCIpK1wiKVwiKSxBVFRSOm5ldyBSZWdFeHAoXCJeXCIrTiksUFNFVURPOm5ldyBSZWdFeHAoXCJeXCIrTyksQ0hJTEQ6bmV3IFJlZ0V4cChcIl46KG9ubHl8Zmlyc3R8bGFzdHxudGh8bnRoLWxhc3QpLShjaGlsZHxvZi10eXBlKSg/OlxcXFwoXCIrSytcIiooZXZlbnxvZGR8KChbKy1dfCkoXFxcXGQqKW58KVwiK0srXCIqKD86KFsrLV18KVwiK0srXCIqKFxcXFxkKyl8KSlcIitLK1wiKlxcXFwpfClcIixcImlcIiksYm9vbDpuZXcgUmVnRXhwKFwiXig/OlwiK0orXCIpJFwiLFwiaVwiKSxuZWVkc0NvbnRleHQ6bmV3IFJlZ0V4cChcIl5cIitLK1wiKls+K35dfDooZXZlbnxvZGR8ZXF8Z3R8bHR8bnRofGZpcnN0fGxhc3QpKD86XFxcXChcIitLK1wiKigoPzotXFxcXGQpP1xcXFxkKilcIitLK1wiKlxcXFwpfCkoPz1bXi1dfCQpXCIsXCJpXCIpfSxXPS9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGJ1dHRvbikkL2ksWD0vXmhcXGQkL2ksWT0vXltee10rXFx7XFxzKlxcW25hdGl2ZSBcXHcvLFo9L14oPzojKFtcXHctXSspfChcXHcrKXxcXC4oW1xcdy1dKykpJC8sJD0vWyt+XS8sXz0vJ3xcXFxcL2csYWI9bmV3IFJlZ0V4cChcIlxcXFxcXFxcKFtcXFxcZGEtZl17MSw2fVwiK0srXCI/fChcIitLK1wiKXwuKVwiLFwiaWdcIiksYmI9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPVwiMHhcIitiLTY1NTM2O3JldHVybiBkIT09ZHx8Yz9iOjA+ZD9TdHJpbmcuZnJvbUNoYXJDb2RlKGQrNjU1MzYpOlN0cmluZy5mcm9tQ2hhckNvZGUoZD4+MTB8NTUyOTYsMTAyMyZkfDU2MzIwKX07dHJ5e0cuYXBwbHkoRD1ILmNhbGwodC5jaGlsZE5vZGVzKSx0LmNoaWxkTm9kZXMpLERbdC5jaGlsZE5vZGVzLmxlbmd0aF0ubm9kZVR5cGV9Y2F0Y2goY2Ipe0c9e2FwcGx5OkQubGVuZ3RoP2Z1bmN0aW9uKGEsYil7Ri5hcHBseShhLEguY2FsbChiKSl9OmZ1bmN0aW9uKGEsYil7dmFyIGM9YS5sZW5ndGgsZD0wO3doaWxlKGFbYysrXT1iW2QrK10pO2EubGVuZ3RoPWMtMX19fWZ1bmN0aW9uIGRiKGEsYixkLGUpe3ZhciBmLGcsaCxpLGosbSxwLHEsdSx2O2lmKChiP2Iub3duZXJEb2N1bWVudHx8Yjp0KSE9PWwmJmsoYiksYj1ifHxsLGQ9ZHx8W10sIWF8fFwic3RyaW5nXCIhPXR5cGVvZiBhKXJldHVybiBkO2lmKDEhPT0oaT1iLm5vZGVUeXBlKSYmOSE9PWkpcmV0dXJuW107aWYobiYmIWUpe2lmKGY9Wi5leGVjKGEpKWlmKGg9ZlsxXSl7aWYoOT09PWkpe2lmKGc9Yi5nZXRFbGVtZW50QnlJZChoKSwhZ3x8IWcucGFyZW50Tm9kZSlyZXR1cm4gZDtpZihnLmlkPT09aClyZXR1cm4gZC5wdXNoKGcpLGR9ZWxzZSBpZihiLm93bmVyRG9jdW1lbnQmJihnPWIub3duZXJEb2N1bWVudC5nZXRFbGVtZW50QnlJZChoKSkmJnIoYixnKSYmZy5pZD09PWgpcmV0dXJuIGQucHVzaChnKSxkfWVsc2V7aWYoZlsyXSlyZXR1cm4gRy5hcHBseShkLGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoYSkpLGQ7aWYoKGg9ZlszXSkmJmMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSYmYi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKXJldHVybiBHLmFwcGx5KGQsYi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGgpKSxkfWlmKGMucXNhJiYoIW98fCFvLnRlc3QoYSkpKXtpZihxPXA9cyx1PWIsdj05PT09aSYmYSwxPT09aSYmXCJvYmplY3RcIiE9PWIubm9kZU5hbWUudG9Mb3dlckNhc2UoKSl7bT1vYihhKSwocD1iLmdldEF0dHJpYnV0ZShcImlkXCIpKT9xPXAucmVwbGFjZShfLFwiXFxcXCQmXCIpOmIuc2V0QXR0cmlidXRlKFwiaWRcIixxKSxxPVwiW2lkPSdcIitxK1wiJ10gXCIsaj1tLmxlbmd0aDt3aGlsZShqLS0pbVtqXT1xK3BiKG1bal0pO3U9JC50ZXN0KGEpJiZtYihiLnBhcmVudE5vZGUpfHxiLHY9bS5qb2luKFwiLFwiKX1pZih2KXRyeXtyZXR1cm4gRy5hcHBseShkLHUucXVlcnlTZWxlY3RvckFsbCh2KSksZH1jYXRjaCh3KXt9ZmluYWxseXtwfHxiLnJlbW92ZUF0dHJpYnV0ZShcImlkXCIpfX19cmV0dXJuIHhiKGEucmVwbGFjZShQLFwiJDFcIiksYixkLGUpfWZ1bmN0aW9uIGViKCl7dmFyIGE9W107ZnVuY3Rpb24gYihjLGUpe3JldHVybiBhLnB1c2goYytcIiBcIik+ZC5jYWNoZUxlbmd0aCYmZGVsZXRlIGJbYS5zaGlmdCgpXSxiW2MrXCIgXCJdPWV9cmV0dXJuIGJ9ZnVuY3Rpb24gZmIoYSl7cmV0dXJuIGFbc109ITAsYX1mdW5jdGlvbiBnYihhKXt2YXIgYj1sLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7dHJ5e3JldHVybiEhYShiKX1jYXRjaChjKXtyZXR1cm4hMX1maW5hbGx5e2IucGFyZW50Tm9kZSYmYi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGIpLGI9bnVsbH19ZnVuY3Rpb24gaGIoYSxiKXt2YXIgYz1hLnNwbGl0KFwifFwiKSxlPWEubGVuZ3RoO3doaWxlKGUtLSlkLmF0dHJIYW5kbGVbY1tlXV09Yn1mdW5jdGlvbiBpYihhLGIpe3ZhciBjPWImJmEsZD1jJiYxPT09YS5ub2RlVHlwZSYmMT09PWIubm9kZVR5cGUmJih+Yi5zb3VyY2VJbmRleHx8QiktKH5hLnNvdXJjZUluZGV4fHxCKTtpZihkKXJldHVybiBkO2lmKGMpd2hpbGUoYz1jLm5leHRTaWJsaW5nKWlmKGM9PT1iKXJldHVybi0xO3JldHVybiBhPzE6LTF9ZnVuY3Rpb24gamIoYSl7cmV0dXJuIGZ1bmN0aW9uKGIpe3ZhciBjPWIubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtyZXR1cm5cImlucHV0XCI9PT1jJiZiLnR5cGU9PT1hfX1mdW5jdGlvbiBrYihhKXtyZXR1cm4gZnVuY3Rpb24oYil7dmFyIGM9Yi5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO3JldHVybihcImlucHV0XCI9PT1jfHxcImJ1dHRvblwiPT09YykmJmIudHlwZT09PWF9fWZ1bmN0aW9uIGxiKGEpe3JldHVybiBmYihmdW5jdGlvbihiKXtyZXR1cm4gYj0rYixmYihmdW5jdGlvbihjLGQpe3ZhciBlLGY9YShbXSxjLmxlbmd0aCxiKSxnPWYubGVuZ3RoO3doaWxlKGctLSljW2U9ZltnXV0mJihjW2VdPSEoZFtlXT1jW2VdKSl9KX0pfWZ1bmN0aW9uIG1iKGEpe3JldHVybiBhJiZ0eXBlb2YgYS5nZXRFbGVtZW50c0J5VGFnTmFtZSE9PUEmJmF9Yz1kYi5zdXBwb3J0PXt9LGY9ZGIuaXNYTUw9ZnVuY3Rpb24oYSl7dmFyIGI9YSYmKGEub3duZXJEb2N1bWVudHx8YSkuZG9jdW1lbnRFbGVtZW50O3JldHVybiBiP1wiSFRNTFwiIT09Yi5ub2RlTmFtZTohMX0saz1kYi5zZXREb2N1bWVudD1mdW5jdGlvbihhKXt2YXIgYixlPWE/YS5vd25lckRvY3VtZW50fHxhOnQsZz1lLmRlZmF1bHRWaWV3O3JldHVybiBlIT09bCYmOT09PWUubm9kZVR5cGUmJmUuZG9jdW1lbnRFbGVtZW50PyhsPWUsbT1lLmRvY3VtZW50RWxlbWVudCxuPSFmKGUpLGcmJmchPT1nLnRvcCYmKGcuYWRkRXZlbnRMaXN0ZW5lcj9nLmFkZEV2ZW50TGlzdGVuZXIoXCJ1bmxvYWRcIixmdW5jdGlvbigpe2soKX0sITEpOmcuYXR0YWNoRXZlbnQmJmcuYXR0YWNoRXZlbnQoXCJvbnVubG9hZFwiLGZ1bmN0aW9uKCl7aygpfSkpLGMuYXR0cmlidXRlcz1nYihmdW5jdGlvbihhKXtyZXR1cm4gYS5jbGFzc05hbWU9XCJpXCIsIWEuZ2V0QXR0cmlidXRlKFwiY2xhc3NOYW1lXCIpfSksYy5nZXRFbGVtZW50c0J5VGFnTmFtZT1nYihmdW5jdGlvbihhKXtyZXR1cm4gYS5hcHBlbmRDaGlsZChlLmNyZWF0ZUNvbW1lbnQoXCJcIikpLCFhLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKS5sZW5ndGh9KSxjLmdldEVsZW1lbnRzQnlDbGFzc05hbWU9WS50ZXN0KGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSkmJmdiKGZ1bmN0aW9uKGEpe3JldHVybiBhLmlubmVySFRNTD1cIjxkaXYgY2xhc3M9J2EnPjwvZGl2PjxkaXYgY2xhc3M9J2EgaSc+PC9kaXY+XCIsYS5maXJzdENoaWxkLmNsYXNzTmFtZT1cImlcIiwyPT09YS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaVwiKS5sZW5ndGh9KSxjLmdldEJ5SWQ9Z2IoZnVuY3Rpb24oYSl7cmV0dXJuIG0uYXBwZW5kQ2hpbGQoYSkuaWQ9cywhZS5nZXRFbGVtZW50c0J5TmFtZXx8IWUuZ2V0RWxlbWVudHNCeU5hbWUocykubGVuZ3RofSksYy5nZXRCeUlkPyhkLmZpbmQuSUQ9ZnVuY3Rpb24oYSxiKXtpZih0eXBlb2YgYi5nZXRFbGVtZW50QnlJZCE9PUEmJm4pe3ZhciBjPWIuZ2V0RWxlbWVudEJ5SWQoYSk7cmV0dXJuIGMmJmMucGFyZW50Tm9kZT9bY106W119fSxkLmZpbHRlci5JRD1mdW5jdGlvbihhKXt2YXIgYj1hLnJlcGxhY2UoYWIsYmIpO3JldHVybiBmdW5jdGlvbihhKXtyZXR1cm4gYS5nZXRBdHRyaWJ1dGUoXCJpZFwiKT09PWJ9fSk6KGRlbGV0ZSBkLmZpbmQuSUQsZC5maWx0ZXIuSUQ9ZnVuY3Rpb24oYSl7dmFyIGI9YS5yZXBsYWNlKGFiLGJiKTtyZXR1cm4gZnVuY3Rpb24oYSl7dmFyIGM9dHlwZW9mIGEuZ2V0QXR0cmlidXRlTm9kZSE9PUEmJmEuZ2V0QXR0cmlidXRlTm9kZShcImlkXCIpO3JldHVybiBjJiZjLnZhbHVlPT09Yn19KSxkLmZpbmQuVEFHPWMuZ2V0RWxlbWVudHNCeVRhZ05hbWU/ZnVuY3Rpb24oYSxiKXtyZXR1cm4gdHlwZW9mIGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUhPT1BP2IuZ2V0RWxlbWVudHNCeVRhZ05hbWUoYSk6dm9pZCAwfTpmdW5jdGlvbihhLGIpe3ZhciBjLGQ9W10sZT0wLGY9Yi5nZXRFbGVtZW50c0J5VGFnTmFtZShhKTtpZihcIipcIj09PWEpe3doaWxlKGM9ZltlKytdKTE9PT1jLm5vZGVUeXBlJiZkLnB1c2goYyk7cmV0dXJuIGR9cmV0dXJuIGZ9LGQuZmluZC5DTEFTUz1jLmdldEVsZW1lbnRzQnlDbGFzc05hbWUmJmZ1bmN0aW9uKGEsYil7cmV0dXJuIHR5cGVvZiBiLmdldEVsZW1lbnRzQnlDbGFzc05hbWUhPT1BJiZuP2IuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShhKTp2b2lkIDB9LHA9W10sbz1bXSwoYy5xc2E9WS50ZXN0KGUucXVlcnlTZWxlY3RvckFsbCkpJiYoZ2IoZnVuY3Rpb24oYSl7YS5pbm5lckhUTUw9XCI8c2VsZWN0IHQ9Jyc+PG9wdGlvbiBzZWxlY3RlZD0nJz48L29wdGlvbj48L3NlbGVjdD5cIixhLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbdF49JyddXCIpLmxlbmd0aCYmby5wdXNoKFwiWypeJF09XCIrSytcIiooPzonJ3xcXFwiXFxcIilcIiksYS5xdWVyeVNlbGVjdG9yQWxsKFwiW3NlbGVjdGVkXVwiKS5sZW5ndGh8fG8ucHVzaChcIlxcXFxbXCIrSytcIiooPzp2YWx1ZXxcIitKK1wiKVwiKSxhLnF1ZXJ5U2VsZWN0b3JBbGwoXCI6Y2hlY2tlZFwiKS5sZW5ndGh8fG8ucHVzaChcIjpjaGVja2VkXCIpfSksZ2IoZnVuY3Rpb24oYSl7dmFyIGI9ZS5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7Yi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsXCJoaWRkZW5cIiksYS5hcHBlbmRDaGlsZChiKS5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsXCJEXCIpLGEucXVlcnlTZWxlY3RvckFsbChcIltuYW1lPWRdXCIpLmxlbmd0aCYmby5wdXNoKFwibmFtZVwiK0srXCIqWypeJHwhfl0/PVwiKSxhLnF1ZXJ5U2VsZWN0b3JBbGwoXCI6ZW5hYmxlZFwiKS5sZW5ndGh8fG8ucHVzaChcIjplbmFibGVkXCIsXCI6ZGlzYWJsZWRcIiksYS5xdWVyeVNlbGVjdG9yQWxsKFwiKiw6eFwiKSxvLnB1c2goXCIsLio6XCIpfSkpLChjLm1hdGNoZXNTZWxlY3Rvcj1ZLnRlc3QocT1tLndlYmtpdE1hdGNoZXNTZWxlY3Rvcnx8bS5tb3pNYXRjaGVzU2VsZWN0b3J8fG0ub01hdGNoZXNTZWxlY3Rvcnx8bS5tc01hdGNoZXNTZWxlY3RvcikpJiZnYihmdW5jdGlvbihhKXtjLmRpc2Nvbm5lY3RlZE1hdGNoPXEuY2FsbChhLFwiZGl2XCIpLHEuY2FsbChhLFwiW3MhPScnXTp4XCIpLHAucHVzaChcIiE9XCIsTyl9KSxvPW8ubGVuZ3RoJiZuZXcgUmVnRXhwKG8uam9pbihcInxcIikpLHA9cC5sZW5ndGgmJm5ldyBSZWdFeHAocC5qb2luKFwifFwiKSksYj1ZLnRlc3QobS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbikscj1ifHxZLnRlc3QobS5jb250YWlucyk/ZnVuY3Rpb24oYSxiKXt2YXIgYz05PT09YS5ub2RlVHlwZT9hLmRvY3VtZW50RWxlbWVudDphLGQ9YiYmYi5wYXJlbnROb2RlO3JldHVybiBhPT09ZHx8ISghZHx8MSE9PWQubm9kZVR5cGV8fCEoYy5jb250YWlucz9jLmNvbnRhaW5zKGQpOmEuY29tcGFyZURvY3VtZW50UG9zaXRpb24mJjE2JmEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oZCkpKX06ZnVuY3Rpb24oYSxiKXtpZihiKXdoaWxlKGI9Yi5wYXJlbnROb2RlKWlmKGI9PT1hKXJldHVybiEwO3JldHVybiExfSx6PWI/ZnVuY3Rpb24oYSxiKXtpZihhPT09YilyZXR1cm4gaj0hMCwwO3ZhciBkPSFhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uLSFiLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uO3JldHVybiBkP2Q6KGQ9KGEub3duZXJEb2N1bWVudHx8YSk9PT0oYi5vd25lckRvY3VtZW50fHxiKT9hLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKGIpOjEsMSZkfHwhYy5zb3J0RGV0YWNoZWQmJmIuY29tcGFyZURvY3VtZW50UG9zaXRpb24oYSk9PT1kP2E9PT1lfHxhLm93bmVyRG9jdW1lbnQ9PT10JiZyKHQsYSk/LTE6Yj09PWV8fGIub3duZXJEb2N1bWVudD09PXQmJnIodCxiKT8xOmk/SS5jYWxsKGksYSktSS5jYWxsKGksYik6MDo0JmQ/LTE6MSl9OmZ1bmN0aW9uKGEsYil7aWYoYT09PWIpcmV0dXJuIGo9ITAsMDt2YXIgYyxkPTAsZj1hLnBhcmVudE5vZGUsZz1iLnBhcmVudE5vZGUsaD1bYV0saz1bYl07aWYoIWZ8fCFnKXJldHVybiBhPT09ZT8tMTpiPT09ZT8xOmY/LTE6Zz8xOmk/SS5jYWxsKGksYSktSS5jYWxsKGksYik6MDtpZihmPT09ZylyZXR1cm4gaWIoYSxiKTtjPWE7d2hpbGUoYz1jLnBhcmVudE5vZGUpaC51bnNoaWZ0KGMpO2M9Yjt3aGlsZShjPWMucGFyZW50Tm9kZSlrLnVuc2hpZnQoYyk7d2hpbGUoaFtkXT09PWtbZF0pZCsrO3JldHVybiBkP2liKGhbZF0sa1tkXSk6aFtkXT09PXQ/LTE6a1tkXT09PXQ/MTowfSxlKTpsfSxkYi5tYXRjaGVzPWZ1bmN0aW9uKGEsYil7cmV0dXJuIGRiKGEsbnVsbCxudWxsLGIpfSxkYi5tYXRjaGVzU2VsZWN0b3I9ZnVuY3Rpb24oYSxiKXtpZigoYS5vd25lckRvY3VtZW50fHxhKSE9PWwmJmsoYSksYj1iLnJlcGxhY2UoUyxcIj0nJDEnXVwiKSwhKCFjLm1hdGNoZXNTZWxlY3Rvcnx8IW58fHAmJnAudGVzdChiKXx8byYmby50ZXN0KGIpKSl0cnl7dmFyIGQ9cS5jYWxsKGEsYik7aWYoZHx8Yy5kaXNjb25uZWN0ZWRNYXRjaHx8YS5kb2N1bWVudCYmMTEhPT1hLmRvY3VtZW50Lm5vZGVUeXBlKXJldHVybiBkfWNhdGNoKGUpe31yZXR1cm4gZGIoYixsLG51bGwsW2FdKS5sZW5ndGg+MH0sZGIuY29udGFpbnM9ZnVuY3Rpb24oYSxiKXtyZXR1cm4oYS5vd25lckRvY3VtZW50fHxhKSE9PWwmJmsoYSkscihhLGIpfSxkYi5hdHRyPWZ1bmN0aW9uKGEsYil7KGEub3duZXJEb2N1bWVudHx8YSkhPT1sJiZrKGEpO3ZhciBlPWQuYXR0ckhhbmRsZVtiLnRvTG93ZXJDYXNlKCldLGY9ZSYmQy5jYWxsKGQuYXR0ckhhbmRsZSxiLnRvTG93ZXJDYXNlKCkpP2UoYSxiLCFuKTp2b2lkIDA7cmV0dXJuIHZvaWQgMCE9PWY/ZjpjLmF0dHJpYnV0ZXN8fCFuP2EuZ2V0QXR0cmlidXRlKGIpOihmPWEuZ2V0QXR0cmlidXRlTm9kZShiKSkmJmYuc3BlY2lmaWVkP2YudmFsdWU6bnVsbH0sZGIuZXJyb3I9ZnVuY3Rpb24oYSl7dGhyb3cgbmV3IEVycm9yKFwiU3ludGF4IGVycm9yLCB1bnJlY29nbml6ZWQgZXhwcmVzc2lvbjogXCIrYSl9LGRiLnVuaXF1ZVNvcnQ9ZnVuY3Rpb24oYSl7dmFyIGIsZD1bXSxlPTAsZj0wO2lmKGo9IWMuZGV0ZWN0RHVwbGljYXRlcyxpPSFjLnNvcnRTdGFibGUmJmEuc2xpY2UoMCksYS5zb3J0KHopLGope3doaWxlKGI9YVtmKytdKWI9PT1hW2ZdJiYoZT1kLnB1c2goZikpO3doaWxlKGUtLSlhLnNwbGljZShkW2VdLDEpfXJldHVybiBpPW51bGwsYX0sZT1kYi5nZXRUZXh0PWZ1bmN0aW9uKGEpe3ZhciBiLGM9XCJcIixkPTAsZj1hLm5vZGVUeXBlO2lmKGYpe2lmKDE9PT1mfHw5PT09Znx8MTE9PT1mKXtpZihcInN0cmluZ1wiPT10eXBlb2YgYS50ZXh0Q29udGVudClyZXR1cm4gYS50ZXh0Q29udGVudDtmb3IoYT1hLmZpcnN0Q2hpbGQ7YTthPWEubmV4dFNpYmxpbmcpYys9ZShhKX1lbHNlIGlmKDM9PT1mfHw0PT09ZilyZXR1cm4gYS5ub2RlVmFsdWV9ZWxzZSB3aGlsZShiPWFbZCsrXSljKz1lKGIpO3JldHVybiBjfSxkPWRiLnNlbGVjdG9ycz17Y2FjaGVMZW5ndGg6NTAsY3JlYXRlUHNldWRvOmZiLG1hdGNoOlYsYXR0ckhhbmRsZTp7fSxmaW5kOnt9LHJlbGF0aXZlOntcIj5cIjp7ZGlyOlwicGFyZW50Tm9kZVwiLGZpcnN0OiEwfSxcIiBcIjp7ZGlyOlwicGFyZW50Tm9kZVwifSxcIitcIjp7ZGlyOlwicHJldmlvdXNTaWJsaW5nXCIsZmlyc3Q6ITB9LFwiflwiOntkaXI6XCJwcmV2aW91c1NpYmxpbmdcIn19LHByZUZpbHRlcjp7QVRUUjpmdW5jdGlvbihhKXtyZXR1cm4gYVsxXT1hWzFdLnJlcGxhY2UoYWIsYmIpLGFbM109KGFbNF18fGFbNV18fFwiXCIpLnJlcGxhY2UoYWIsYmIpLFwifj1cIj09PWFbMl0mJihhWzNdPVwiIFwiK2FbM10rXCIgXCIpLGEuc2xpY2UoMCw0KX0sQ0hJTEQ6ZnVuY3Rpb24oYSl7cmV0dXJuIGFbMV09YVsxXS50b0xvd2VyQ2FzZSgpLFwibnRoXCI9PT1hWzFdLnNsaWNlKDAsMyk/KGFbM118fGRiLmVycm9yKGFbMF0pLGFbNF09KyhhWzRdP2FbNV0rKGFbNl18fDEpOjIqKFwiZXZlblwiPT09YVszXXx8XCJvZGRcIj09PWFbM10pKSxhWzVdPSsoYVs3XSthWzhdfHxcIm9kZFwiPT09YVszXSkpOmFbM10mJmRiLmVycm9yKGFbMF0pLGF9LFBTRVVETzpmdW5jdGlvbihhKXt2YXIgYixjPSFhWzVdJiZhWzJdO3JldHVybiBWLkNISUxELnRlc3QoYVswXSk/bnVsbDooYVszXSYmdm9pZCAwIT09YVs0XT9hWzJdPWFbNF06YyYmVC50ZXN0KGMpJiYoYj1vYihjLCEwKSkmJihiPWMuaW5kZXhPZihcIilcIixjLmxlbmd0aC1iKS1jLmxlbmd0aCkmJihhWzBdPWFbMF0uc2xpY2UoMCxiKSxhWzJdPWMuc2xpY2UoMCxiKSksYS5zbGljZSgwLDMpKX19LGZpbHRlcjp7VEFHOmZ1bmN0aW9uKGEpe3ZhciBiPWEucmVwbGFjZShhYixiYikudG9Mb3dlckNhc2UoKTtyZXR1cm5cIipcIj09PWE/ZnVuY3Rpb24oKXtyZXR1cm4hMH06ZnVuY3Rpb24oYSl7cmV0dXJuIGEubm9kZU5hbWUmJmEubm9kZU5hbWUudG9Mb3dlckNhc2UoKT09PWJ9fSxDTEFTUzpmdW5jdGlvbihhKXt2YXIgYj13W2ErXCIgXCJdO3JldHVybiBifHwoYj1uZXcgUmVnRXhwKFwiKF58XCIrSytcIilcIithK1wiKFwiK0srXCJ8JClcIikpJiZ3KGEsZnVuY3Rpb24oYSl7cmV0dXJuIGIudGVzdChcInN0cmluZ1wiPT10eXBlb2YgYS5jbGFzc05hbWUmJmEuY2xhc3NOYW1lfHx0eXBlb2YgYS5nZXRBdHRyaWJ1dGUhPT1BJiZhLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpfHxcIlwiKX0pfSxBVFRSOmZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gZnVuY3Rpb24oZCl7dmFyIGU9ZGIuYXR0cihkLGEpO3JldHVybiBudWxsPT1lP1wiIT1cIj09PWI6Yj8oZSs9XCJcIixcIj1cIj09PWI/ZT09PWM6XCIhPVwiPT09Yj9lIT09YzpcIl49XCI9PT1iP2MmJjA9PT1lLmluZGV4T2YoYyk6XCIqPVwiPT09Yj9jJiZlLmluZGV4T2YoYyk+LTE6XCIkPVwiPT09Yj9jJiZlLnNsaWNlKC1jLmxlbmd0aCk9PT1jOlwifj1cIj09PWI/KFwiIFwiK2UrXCIgXCIpLmluZGV4T2YoYyk+LTE6XCJ8PVwiPT09Yj9lPT09Y3x8ZS5zbGljZSgwLGMubGVuZ3RoKzEpPT09YytcIi1cIjohMSk6ITB9fSxDSElMRDpmdW5jdGlvbihhLGIsYyxkLGUpe3ZhciBmPVwibnRoXCIhPT1hLnNsaWNlKDAsMyksZz1cImxhc3RcIiE9PWEuc2xpY2UoLTQpLGg9XCJvZi10eXBlXCI9PT1iO3JldHVybiAxPT09ZCYmMD09PWU/ZnVuY3Rpb24oYSl7cmV0dXJuISFhLnBhcmVudE5vZGV9OmZ1bmN0aW9uKGIsYyxpKXt2YXIgaixrLGwsbSxuLG8scD1mIT09Zz9cIm5leHRTaWJsaW5nXCI6XCJwcmV2aW91c1NpYmxpbmdcIixxPWIucGFyZW50Tm9kZSxyPWgmJmIubm9kZU5hbWUudG9Mb3dlckNhc2UoKSx0PSFpJiYhaDtpZihxKXtpZihmKXt3aGlsZShwKXtsPWI7d2hpbGUobD1sW3BdKWlmKGg/bC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpPT09cjoxPT09bC5ub2RlVHlwZSlyZXR1cm4hMTtvPXA9XCJvbmx5XCI9PT1hJiYhbyYmXCJuZXh0U2libGluZ1wifXJldHVybiEwfWlmKG89W2c/cS5maXJzdENoaWxkOnEubGFzdENoaWxkXSxnJiZ0KXtrPXFbc118fChxW3NdPXt9KSxqPWtbYV18fFtdLG49alswXT09PXUmJmpbMV0sbT1qWzBdPT09dSYmalsyXSxsPW4mJnEuY2hpbGROb2Rlc1tuXTt3aGlsZShsPSsrbiYmbCYmbFtwXXx8KG09bj0wKXx8by5wb3AoKSlpZigxPT09bC5ub2RlVHlwZSYmKyttJiZsPT09Yil7a1thXT1bdSxuLG1dO2JyZWFrfX1lbHNlIGlmKHQmJihqPShiW3NdfHwoYltzXT17fSkpW2FdKSYmalswXT09PXUpbT1qWzFdO2Vsc2Ugd2hpbGUobD0rK24mJmwmJmxbcF18fChtPW49MCl8fG8ucG9wKCkpaWYoKGg/bC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpPT09cjoxPT09bC5ub2RlVHlwZSkmJisrbSYmKHQmJigobFtzXXx8KGxbc109e30pKVthXT1bdSxtXSksbD09PWIpKWJyZWFrO3JldHVybiBtLT1lLG09PT1kfHxtJWQ9PT0wJiZtL2Q+PTB9fX0sUFNFVURPOmZ1bmN0aW9uKGEsYil7dmFyIGMsZT1kLnBzZXVkb3NbYV18fGQuc2V0RmlsdGVyc1thLnRvTG93ZXJDYXNlKCldfHxkYi5lcnJvcihcInVuc3VwcG9ydGVkIHBzZXVkbzogXCIrYSk7cmV0dXJuIGVbc10/ZShiKTplLmxlbmd0aD4xPyhjPVthLGEsXCJcIixiXSxkLnNldEZpbHRlcnMuaGFzT3duUHJvcGVydHkoYS50b0xvd2VyQ2FzZSgpKT9mYihmdW5jdGlvbihhLGMpe3ZhciBkLGY9ZShhLGIpLGc9Zi5sZW5ndGg7d2hpbGUoZy0tKWQ9SS5jYWxsKGEsZltnXSksYVtkXT0hKGNbZF09ZltnXSl9KTpmdW5jdGlvbihhKXtyZXR1cm4gZShhLDAsYyl9KTplfX0scHNldWRvczp7bm90OmZiKGZ1bmN0aW9uKGEpe3ZhciBiPVtdLGM9W10sZD1nKGEucmVwbGFjZShQLFwiJDFcIikpO3JldHVybiBkW3NdP2ZiKGZ1bmN0aW9uKGEsYixjLGUpe3ZhciBmLGc9ZChhLG51bGwsZSxbXSksaD1hLmxlbmd0aDt3aGlsZShoLS0pKGY9Z1toXSkmJihhW2hdPSEoYltoXT1mKSl9KTpmdW5jdGlvbihhLGUsZil7cmV0dXJuIGJbMF09YSxkKGIsbnVsbCxmLGMpLCFjLnBvcCgpfX0pLGhhczpmYihmdW5jdGlvbihhKXtyZXR1cm4gZnVuY3Rpb24oYil7cmV0dXJuIGRiKGEsYikubGVuZ3RoPjB9fSksY29udGFpbnM6ZmIoZnVuY3Rpb24oYSl7cmV0dXJuIGZ1bmN0aW9uKGIpe3JldHVybihiLnRleHRDb250ZW50fHxiLmlubmVyVGV4dHx8ZShiKSkuaW5kZXhPZihhKT4tMX19KSxsYW5nOmZiKGZ1bmN0aW9uKGEpe3JldHVybiBVLnRlc3QoYXx8XCJcIil8fGRiLmVycm9yKFwidW5zdXBwb3J0ZWQgbGFuZzogXCIrYSksYT1hLnJlcGxhY2UoYWIsYmIpLnRvTG93ZXJDYXNlKCksZnVuY3Rpb24oYil7dmFyIGM7ZG8gaWYoYz1uP2IubGFuZzpiLmdldEF0dHJpYnV0ZShcInhtbDpsYW5nXCIpfHxiLmdldEF0dHJpYnV0ZShcImxhbmdcIikpcmV0dXJuIGM9Yy50b0xvd2VyQ2FzZSgpLGM9PT1hfHwwPT09Yy5pbmRleE9mKGErXCItXCIpO3doaWxlKChiPWIucGFyZW50Tm9kZSkmJjE9PT1iLm5vZGVUeXBlKTtyZXR1cm4hMX19KSx0YXJnZXQ6ZnVuY3Rpb24oYil7dmFyIGM9YS5sb2NhdGlvbiYmYS5sb2NhdGlvbi5oYXNoO3JldHVybiBjJiZjLnNsaWNlKDEpPT09Yi5pZH0scm9vdDpmdW5jdGlvbihhKXtyZXR1cm4gYT09PW19LGZvY3VzOmZ1bmN0aW9uKGEpe3JldHVybiBhPT09bC5hY3RpdmVFbGVtZW50JiYoIWwuaGFzRm9jdXN8fGwuaGFzRm9jdXMoKSkmJiEhKGEudHlwZXx8YS5ocmVmfHx+YS50YWJJbmRleCl9LGVuYWJsZWQ6ZnVuY3Rpb24oYSl7cmV0dXJuIGEuZGlzYWJsZWQ9PT0hMX0sZGlzYWJsZWQ6ZnVuY3Rpb24oYSl7cmV0dXJuIGEuZGlzYWJsZWQ9PT0hMH0sY2hlY2tlZDpmdW5jdGlvbihhKXt2YXIgYj1hLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7cmV0dXJuXCJpbnB1dFwiPT09YiYmISFhLmNoZWNrZWR8fFwib3B0aW9uXCI9PT1iJiYhIWEuc2VsZWN0ZWR9LHNlbGVjdGVkOmZ1bmN0aW9uKGEpe3JldHVybiBhLnBhcmVudE5vZGUmJmEucGFyZW50Tm9kZS5zZWxlY3RlZEluZGV4LGEuc2VsZWN0ZWQ9PT0hMH0sZW1wdHk6ZnVuY3Rpb24oYSl7Zm9yKGE9YS5maXJzdENoaWxkO2E7YT1hLm5leHRTaWJsaW5nKWlmKGEubm9kZVR5cGU8NilyZXR1cm4hMTtyZXR1cm4hMH0scGFyZW50OmZ1bmN0aW9uKGEpe3JldHVybiFkLnBzZXVkb3MuZW1wdHkoYSl9LGhlYWRlcjpmdW5jdGlvbihhKXtyZXR1cm4gWC50ZXN0KGEubm9kZU5hbWUpfSxpbnB1dDpmdW5jdGlvbihhKXtyZXR1cm4gVy50ZXN0KGEubm9kZU5hbWUpfSxidXR0b246ZnVuY3Rpb24oYSl7dmFyIGI9YS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO3JldHVyblwiaW5wdXRcIj09PWImJlwiYnV0dG9uXCI9PT1hLnR5cGV8fFwiYnV0dG9uXCI9PT1ifSx0ZXh0OmZ1bmN0aW9uKGEpe3ZhciBiO3JldHVyblwiaW5wdXRcIj09PWEubm9kZU5hbWUudG9Mb3dlckNhc2UoKSYmXCJ0ZXh0XCI9PT1hLnR5cGUmJihudWxsPT0oYj1hLmdldEF0dHJpYnV0ZShcInR5cGVcIikpfHxcInRleHRcIj09PWIudG9Mb3dlckNhc2UoKSl9LGZpcnN0OmxiKGZ1bmN0aW9uKCl7cmV0dXJuWzBdfSksbGFzdDpsYihmdW5jdGlvbihhLGIpe3JldHVybltiLTFdfSksZXE6bGIoZnVuY3Rpb24oYSxiLGMpe3JldHVyblswPmM/YytiOmNdfSksZXZlbjpsYihmdW5jdGlvbihhLGIpe2Zvcih2YXIgYz0wO2I+YztjKz0yKWEucHVzaChjKTtyZXR1cm4gYX0pLG9kZDpsYihmdW5jdGlvbihhLGIpe2Zvcih2YXIgYz0xO2I+YztjKz0yKWEucHVzaChjKTtyZXR1cm4gYX0pLGx0OmxiKGZ1bmN0aW9uKGEsYixjKXtmb3IodmFyIGQ9MD5jP2MrYjpjOy0tZD49MDspYS5wdXNoKGQpO3JldHVybiBhfSksZ3Q6bGIoZnVuY3Rpb24oYSxiLGMpe2Zvcih2YXIgZD0wPmM/YytiOmM7KytkPGI7KWEucHVzaChkKTtyZXR1cm4gYX0pfX0sZC5wc2V1ZG9zLm50aD1kLnBzZXVkb3MuZXE7Zm9yKGIgaW57cmFkaW86ITAsY2hlY2tib3g6ITAsZmlsZTohMCxwYXNzd29yZDohMCxpbWFnZTohMH0pZC5wc2V1ZG9zW2JdPWpiKGIpO2ZvcihiIGlue3N1Ym1pdDohMCxyZXNldDohMH0pZC5wc2V1ZG9zW2JdPWtiKGIpO2Z1bmN0aW9uIG5iKCl7fW5iLnByb3RvdHlwZT1kLmZpbHRlcnM9ZC5wc2V1ZG9zLGQuc2V0RmlsdGVycz1uZXcgbmI7ZnVuY3Rpb24gb2IoYSxiKXt2YXIgYyxlLGYsZyxoLGksaixrPXhbYStcIiBcIl07aWYoaylyZXR1cm4gYj8wOmsuc2xpY2UoMCk7aD1hLGk9W10saj1kLnByZUZpbHRlcjt3aGlsZShoKXsoIWN8fChlPVEuZXhlYyhoKSkpJiYoZSYmKGg9aC5zbGljZShlWzBdLmxlbmd0aCl8fGgpLGkucHVzaChmPVtdKSksYz0hMSwoZT1SLmV4ZWMoaCkpJiYoYz1lLnNoaWZ0KCksZi5wdXNoKHt2YWx1ZTpjLHR5cGU6ZVswXS5yZXBsYWNlKFAsXCIgXCIpfSksaD1oLnNsaWNlKGMubGVuZ3RoKSk7Zm9yKGcgaW4gZC5maWx0ZXIpIShlPVZbZ10uZXhlYyhoKSl8fGpbZ10mJiEoZT1qW2ddKGUpKXx8KGM9ZS5zaGlmdCgpLGYucHVzaCh7dmFsdWU6Yyx0eXBlOmcsbWF0Y2hlczplfSksaD1oLnNsaWNlKGMubGVuZ3RoKSk7aWYoIWMpYnJlYWt9cmV0dXJuIGI/aC5sZW5ndGg6aD9kYi5lcnJvcihhKTp4KGEsaSkuc2xpY2UoMCl9ZnVuY3Rpb24gcGIoYSl7Zm9yKHZhciBiPTAsYz1hLmxlbmd0aCxkPVwiXCI7Yz5iO2IrKylkKz1hW2JdLnZhbHVlO3JldHVybiBkfWZ1bmN0aW9uIHFiKGEsYixjKXt2YXIgZD1iLmRpcixlPWMmJlwicGFyZW50Tm9kZVwiPT09ZCxmPXYrKztyZXR1cm4gYi5maXJzdD9mdW5jdGlvbihiLGMsZil7d2hpbGUoYj1iW2RdKWlmKDE9PT1iLm5vZGVUeXBlfHxlKXJldHVybiBhKGIsYyxmKX06ZnVuY3Rpb24oYixjLGcpe3ZhciBoLGksaj1bdSxmXTtpZihnKXt3aGlsZShiPWJbZF0paWYoKDE9PT1iLm5vZGVUeXBlfHxlKSYmYShiLGMsZykpcmV0dXJuITB9ZWxzZSB3aGlsZShiPWJbZF0paWYoMT09PWIubm9kZVR5cGV8fGUpe2lmKGk9YltzXXx8KGJbc109e30pLChoPWlbZF0pJiZoWzBdPT09dSYmaFsxXT09PWYpcmV0dXJuIGpbMl09aFsyXTtpZihpW2RdPWosalsyXT1hKGIsYyxnKSlyZXR1cm4hMH19fWZ1bmN0aW9uIHJiKGEpe3JldHVybiBhLmxlbmd0aD4xP2Z1bmN0aW9uKGIsYyxkKXt2YXIgZT1hLmxlbmd0aDt3aGlsZShlLS0paWYoIWFbZV0oYixjLGQpKXJldHVybiExO3JldHVybiEwfTphWzBdfWZ1bmN0aW9uIHNiKGEsYixjLGQsZSl7Zm9yKHZhciBmLGc9W10saD0wLGk9YS5sZW5ndGgsaj1udWxsIT1iO2k+aDtoKyspKGY9YVtoXSkmJighY3x8YyhmLGQsZSkpJiYoZy5wdXNoKGYpLGomJmIucHVzaChoKSk7cmV0dXJuIGd9ZnVuY3Rpb24gdGIoYSxiLGMsZCxlLGYpe3JldHVybiBkJiYhZFtzXSYmKGQ9dGIoZCkpLGUmJiFlW3NdJiYoZT10YihlLGYpKSxmYihmdW5jdGlvbihmLGcsaCxpKXt2YXIgaixrLGwsbT1bXSxuPVtdLG89Zy5sZW5ndGgscD1mfHx3YihifHxcIipcIixoLm5vZGVUeXBlP1toXTpoLFtdKSxxPSFhfHwhZiYmYj9wOnNiKHAsbSxhLGgsaSkscj1jP2V8fChmP2E6b3x8ZCk/W106ZzpxO2lmKGMmJmMocSxyLGgsaSksZCl7aj1zYihyLG4pLGQoaixbXSxoLGkpLGs9ai5sZW5ndGg7d2hpbGUoay0tKShsPWpba10pJiYocltuW2tdXT0hKHFbbltrXV09bCkpfWlmKGYpe2lmKGV8fGEpe2lmKGUpe2o9W10saz1yLmxlbmd0aDt3aGlsZShrLS0pKGw9cltrXSkmJmoucHVzaChxW2tdPWwpO2UobnVsbCxyPVtdLGosaSl9az1yLmxlbmd0aDt3aGlsZShrLS0pKGw9cltrXSkmJihqPWU/SS5jYWxsKGYsbCk6bVtrXSk+LTEmJihmW2pdPSEoZ1tqXT1sKSl9fWVsc2Ugcj1zYihyPT09Zz9yLnNwbGljZShvLHIubGVuZ3RoKTpyKSxlP2UobnVsbCxnLHIsaSk6Ry5hcHBseShnLHIpfSl9ZnVuY3Rpb24gdWIoYSl7Zm9yKHZhciBiLGMsZSxmPWEubGVuZ3RoLGc9ZC5yZWxhdGl2ZVthWzBdLnR5cGVdLGk9Z3x8ZC5yZWxhdGl2ZVtcIiBcIl0saj1nPzE6MCxrPXFiKGZ1bmN0aW9uKGEpe3JldHVybiBhPT09Yn0saSwhMCksbD1xYihmdW5jdGlvbihhKXtyZXR1cm4gSS5jYWxsKGIsYSk+LTF9LGksITApLG09W2Z1bmN0aW9uKGEsYyxkKXtyZXR1cm4hZyYmKGR8fGMhPT1oKXx8KChiPWMpLm5vZGVUeXBlP2soYSxjLGQpOmwoYSxjLGQpKX1dO2Y+ajtqKyspaWYoYz1kLnJlbGF0aXZlW2Fbal0udHlwZV0pbT1bcWIocmIobSksYyldO2Vsc2V7aWYoYz1kLmZpbHRlclthW2pdLnR5cGVdLmFwcGx5KG51bGwsYVtqXS5tYXRjaGVzKSxjW3NdKXtmb3IoZT0rK2o7Zj5lO2UrKylpZihkLnJlbGF0aXZlW2FbZV0udHlwZV0pYnJlYWs7cmV0dXJuIHRiKGo+MSYmcmIobSksaj4xJiZwYihhLnNsaWNlKDAsai0xKS5jb25jYXQoe3ZhbHVlOlwiIFwiPT09YVtqLTJdLnR5cGU/XCIqXCI6XCJcIn0pKS5yZXBsYWNlKFAsXCIkMVwiKSxjLGU+aiYmdWIoYS5zbGljZShqLGUpKSxmPmUmJnViKGE9YS5zbGljZShlKSksZj5lJiZwYihhKSl9bS5wdXNoKGMpfXJldHVybiByYihtKX1mdW5jdGlvbiB2YihhLGIpe3ZhciBjPWIubGVuZ3RoPjAsZT1hLmxlbmd0aD4wLGY9ZnVuY3Rpb24oZixnLGksaixrKXt2YXIgbSxuLG8scD0wLHE9XCIwXCIscj1mJiZbXSxzPVtdLHQ9aCx2PWZ8fGUmJmQuZmluZC5UQUcoXCIqXCIsayksdz11Kz1udWxsPT10PzE6TWF0aC5yYW5kb20oKXx8LjEseD12Lmxlbmd0aDtmb3IoayYmKGg9ZyE9PWwmJmcpO3EhPT14JiZudWxsIT0obT12W3FdKTtxKyspe2lmKGUmJm0pe249MDt3aGlsZShvPWFbbisrXSlpZihvKG0sZyxpKSl7ai5wdXNoKG0pO2JyZWFrfWsmJih1PXcpfWMmJigobT0hbyYmbSkmJnAtLSxmJiZyLnB1c2gobSkpfWlmKHArPXEsYyYmcSE9PXApe249MDt3aGlsZShvPWJbbisrXSlvKHIscyxnLGkpO2lmKGYpe2lmKHA+MCl3aGlsZShxLS0pcltxXXx8c1txXXx8KHNbcV09RS5jYWxsKGopKTtzPXNiKHMpfUcuYXBwbHkoaixzKSxrJiYhZiYmcy5sZW5ndGg+MCYmcCtiLmxlbmd0aD4xJiZkYi51bmlxdWVTb3J0KGopfXJldHVybiBrJiYodT13LGg9dCkscn07cmV0dXJuIGM/ZmIoZik6Zn1nPWRiLmNvbXBpbGU9ZnVuY3Rpb24oYSxiKXt2YXIgYyxkPVtdLGU9W10sZj15W2ErXCIgXCJdO2lmKCFmKXtifHwoYj1vYihhKSksYz1iLmxlbmd0aDt3aGlsZShjLS0pZj11YihiW2NdKSxmW3NdP2QucHVzaChmKTplLnB1c2goZik7Zj15KGEsdmIoZSxkKSl9cmV0dXJuIGZ9O2Z1bmN0aW9uIHdiKGEsYixjKXtmb3IodmFyIGQ9MCxlPWIubGVuZ3RoO2U+ZDtkKyspZGIoYSxiW2RdLGMpO3JldHVybiBjfWZ1bmN0aW9uIHhiKGEsYixlLGYpe3ZhciBoLGksaixrLGwsbT1vYihhKTtpZighZiYmMT09PW0ubGVuZ3RoKXtpZihpPW1bMF09bVswXS5zbGljZSgwKSxpLmxlbmd0aD4yJiZcIklEXCI9PT0oaj1pWzBdKS50eXBlJiZjLmdldEJ5SWQmJjk9PT1iLm5vZGVUeXBlJiZuJiZkLnJlbGF0aXZlW2lbMV0udHlwZV0pe2lmKGI9KGQuZmluZC5JRChqLm1hdGNoZXNbMF0ucmVwbGFjZShhYixiYiksYil8fFtdKVswXSwhYilyZXR1cm4gZTthPWEuc2xpY2UoaS5zaGlmdCgpLnZhbHVlLmxlbmd0aCl9aD1WLm5lZWRzQ29udGV4dC50ZXN0KGEpPzA6aS5sZW5ndGg7d2hpbGUoaC0tKXtpZihqPWlbaF0sZC5yZWxhdGl2ZVtrPWoudHlwZV0pYnJlYWs7aWYoKGw9ZC5maW5kW2tdKSYmKGY9bChqLm1hdGNoZXNbMF0ucmVwbGFjZShhYixiYiksJC50ZXN0KGlbMF0udHlwZSkmJm1iKGIucGFyZW50Tm9kZSl8fGIpKSl7aWYoaS5zcGxpY2UoaCwxKSxhPWYubGVuZ3RoJiZwYihpKSwhYSlyZXR1cm4gRy5hcHBseShlLGYpLGU7YnJlYWt9fX1yZXR1cm4gZyhhLG0pKGYsYiwhbixlLCQudGVzdChhKSYmbWIoYi5wYXJlbnROb2RlKXx8YiksZX1yZXR1cm4gYy5zb3J0U3RhYmxlPXMuc3BsaXQoXCJcIikuc29ydCh6KS5qb2luKFwiXCIpPT09cyxjLmRldGVjdER1cGxpY2F0ZXM9ISFqLGsoKSxjLnNvcnREZXRhY2hlZD1nYihmdW5jdGlvbihhKXtyZXR1cm4gMSZhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKGwuY3JlYXRlRWxlbWVudChcImRpdlwiKSl9KSxnYihmdW5jdGlvbihhKXtyZXR1cm4gYS5pbm5lckhUTUw9XCI8YSBocmVmPScjJz48L2E+XCIsXCIjXCI9PT1hLmZpcnN0Q2hpbGQuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKX0pfHxoYihcInR5cGV8aHJlZnxoZWlnaHR8d2lkdGhcIixmdW5jdGlvbihhLGIsYyl7cmV0dXJuIGM/dm9pZCAwOmEuZ2V0QXR0cmlidXRlKGIsXCJ0eXBlXCI9PT1iLnRvTG93ZXJDYXNlKCk/MToyKX0pLGMuYXR0cmlidXRlcyYmZ2IoZnVuY3Rpb24oYSl7cmV0dXJuIGEuaW5uZXJIVE1MPVwiPGlucHV0Lz5cIixhLmZpcnN0Q2hpbGQuc2V0QXR0cmlidXRlKFwidmFsdWVcIixcIlwiKSxcIlwiPT09YS5maXJzdENoaWxkLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpfSl8fGhiKFwidmFsdWVcIixmdW5jdGlvbihhLGIsYyl7cmV0dXJuIGN8fFwiaW5wdXRcIiE9PWEubm9kZU5hbWUudG9Mb3dlckNhc2UoKT92b2lkIDA6YS5kZWZhdWx0VmFsdWV9KSxnYihmdW5jdGlvbihhKXtyZXR1cm4gbnVsbD09YS5nZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKX0pfHxoYihKLGZ1bmN0aW9uKGEsYixjKXt2YXIgZDtyZXR1cm4gYz92b2lkIDA6YVtiXT09PSEwP2IudG9Mb3dlckNhc2UoKTooZD1hLmdldEF0dHJpYnV0ZU5vZGUoYikpJiZkLnNwZWNpZmllZD9kLnZhbHVlOm51bGx9KSxkYn0oYSk7by5maW5kPXQsby5leHByPXQuc2VsZWN0b3JzLG8uZXhwcltcIjpcIl09by5leHByLnBzZXVkb3Msby51bmlxdWU9dC51bmlxdWVTb3J0LG8udGV4dD10LmdldFRleHQsby5pc1hNTERvYz10LmlzWE1MLG8uY29udGFpbnM9dC5jb250YWluczt2YXIgdT1vLmV4cHIubWF0Y2gubmVlZHNDb250ZXh0LHY9L148KFxcdyspXFxzKlxcLz8+KD86PFxcL1xcMT58KSQvLHc9L14uW146I1xcW1xcLixdKiQvO2Z1bmN0aW9uIHgoYSxiLGMpe2lmKG8uaXNGdW5jdGlvbihiKSlyZXR1cm4gby5ncmVwKGEsZnVuY3Rpb24oYSxkKXtyZXR1cm4hIWIuY2FsbChhLGQsYSkhPT1jfSk7aWYoYi5ub2RlVHlwZSlyZXR1cm4gby5ncmVwKGEsZnVuY3Rpb24oYSl7cmV0dXJuIGE9PT1iIT09Y30pO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBiKXtpZih3LnRlc3QoYikpcmV0dXJuIG8uZmlsdGVyKGIsYSxjKTtiPW8uZmlsdGVyKGIsYSl9cmV0dXJuIG8uZ3JlcChhLGZ1bmN0aW9uKGEpe3JldHVybiBnLmNhbGwoYixhKT49MCE9PWN9KX1vLmZpbHRlcj1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9YlswXTtyZXR1cm4gYyYmKGE9XCI6bm90KFwiK2ErXCIpXCIpLDE9PT1iLmxlbmd0aCYmMT09PWQubm9kZVR5cGU/by5maW5kLm1hdGNoZXNTZWxlY3RvcihkLGEpP1tkXTpbXTpvLmZpbmQubWF0Y2hlcyhhLG8uZ3JlcChiLGZ1bmN0aW9uKGEpe3JldHVybiAxPT09YS5ub2RlVHlwZX0pKX0sby5mbi5leHRlbmQoe2ZpbmQ6ZnVuY3Rpb24oYSl7dmFyIGIsYz10aGlzLmxlbmd0aCxkPVtdLGU9dGhpcztpZihcInN0cmluZ1wiIT10eXBlb2YgYSlyZXR1cm4gdGhpcy5wdXNoU3RhY2sobyhhKS5maWx0ZXIoZnVuY3Rpb24oKXtmb3IoYj0wO2M+YjtiKyspaWYoby5jb250YWlucyhlW2JdLHRoaXMpKXJldHVybiEwfSkpO2ZvcihiPTA7Yz5iO2IrKylvLmZpbmQoYSxlW2JdLGQpO3JldHVybiBkPXRoaXMucHVzaFN0YWNrKGM+MT9vLnVuaXF1ZShkKTpkKSxkLnNlbGVjdG9yPXRoaXMuc2VsZWN0b3I/dGhpcy5zZWxlY3RvcitcIiBcIithOmEsZH0sZmlsdGVyOmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLnB1c2hTdGFjayh4KHRoaXMsYXx8W10sITEpKX0sbm90OmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLnB1c2hTdGFjayh4KHRoaXMsYXx8W10sITApKX0saXM6ZnVuY3Rpb24oYSl7cmV0dXJuISF4KHRoaXMsXCJzdHJpbmdcIj09dHlwZW9mIGEmJnUudGVzdChhKT9vKGEpOmF8fFtdLCExKS5sZW5ndGh9fSk7dmFyIHksej0vXig/OlxccyooPFtcXHdcXFddKz4pW14+XSp8IyhbXFx3LV0qKSkkLyxBPW8uZm4uaW5pdD1mdW5jdGlvbihhLGIpe3ZhciBjLGQ7aWYoIWEpcmV0dXJuIHRoaXM7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGEpe2lmKGM9XCI8XCI9PT1hWzBdJiZcIj5cIj09PWFbYS5sZW5ndGgtMV0mJmEubGVuZ3RoPj0zP1tudWxsLGEsbnVsbF06ei5leGVjKGEpLCFjfHwhY1sxXSYmYilyZXR1cm4hYnx8Yi5qcXVlcnk/KGJ8fHkpLmZpbmQoYSk6dGhpcy5jb25zdHJ1Y3RvcihiKS5maW5kKGEpO2lmKGNbMV0pe2lmKGI9YiBpbnN0YW5jZW9mIG8/YlswXTpiLG8ubWVyZ2UodGhpcyxvLnBhcnNlSFRNTChjWzFdLGImJmIubm9kZVR5cGU/Yi5vd25lckRvY3VtZW50fHxiOm0sITApKSx2LnRlc3QoY1sxXSkmJm8uaXNQbGFpbk9iamVjdChiKSlmb3IoYyBpbiBiKW8uaXNGdW5jdGlvbih0aGlzW2NdKT90aGlzW2NdKGJbY10pOnRoaXMuYXR0cihjLGJbY10pO3JldHVybiB0aGlzfXJldHVybiBkPW0uZ2V0RWxlbWVudEJ5SWQoY1syXSksZCYmZC5wYXJlbnROb2RlJiYodGhpcy5sZW5ndGg9MSx0aGlzWzBdPWQpLHRoaXMuY29udGV4dD1tLHRoaXMuc2VsZWN0b3I9YSx0aGlzfXJldHVybiBhLm5vZGVUeXBlPyh0aGlzLmNvbnRleHQ9dGhpc1swXT1hLHRoaXMubGVuZ3RoPTEsdGhpcyk6by5pc0Z1bmN0aW9uKGEpP1widW5kZWZpbmVkXCIhPXR5cGVvZiB5LnJlYWR5P3kucmVhZHkoYSk6YShvKToodm9pZCAwIT09YS5zZWxlY3RvciYmKHRoaXMuc2VsZWN0b3I9YS5zZWxlY3Rvcix0aGlzLmNvbnRleHQ9YS5jb250ZXh0KSxvLm1ha2VBcnJheShhLHRoaXMpKX07QS5wcm90b3R5cGU9by5mbix5PW8obSk7dmFyIEI9L14oPzpwYXJlbnRzfHByZXYoPzpVbnRpbHxBbGwpKS8sQz17Y2hpbGRyZW46ITAsY29udGVudHM6ITAsbmV4dDohMCxwcmV2OiEwfTtvLmV4dGVuZCh7ZGlyOmZ1bmN0aW9uKGEsYixjKXt2YXIgZD1bXSxlPXZvaWQgMCE9PWM7d2hpbGUoKGE9YVtiXSkmJjkhPT1hLm5vZGVUeXBlKWlmKDE9PT1hLm5vZGVUeXBlKXtpZihlJiZvKGEpLmlzKGMpKWJyZWFrO2QucHVzaChhKX1yZXR1cm4gZH0sc2libGluZzpmdW5jdGlvbihhLGIpe2Zvcih2YXIgYz1bXTthO2E9YS5uZXh0U2libGluZykxPT09YS5ub2RlVHlwZSYmYSE9PWImJmMucHVzaChhKTtyZXR1cm4gY319KSxvLmZuLmV4dGVuZCh7aGFzOmZ1bmN0aW9uKGEpe3ZhciBiPW8oYSx0aGlzKSxjPWIubGVuZ3RoO3JldHVybiB0aGlzLmZpbHRlcihmdW5jdGlvbigpe2Zvcih2YXIgYT0wO2M+YTthKyspaWYoby5jb250YWlucyh0aGlzLGJbYV0pKXJldHVybiEwfSl9LGNsb3Nlc3Q6ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGMsZD0wLGU9dGhpcy5sZW5ndGgsZj1bXSxnPXUudGVzdChhKXx8XCJzdHJpbmdcIiE9dHlwZW9mIGE/byhhLGJ8fHRoaXMuY29udGV4dCk6MDtlPmQ7ZCsrKWZvcihjPXRoaXNbZF07YyYmYyE9PWI7Yz1jLnBhcmVudE5vZGUpaWYoYy5ub2RlVHlwZTwxMSYmKGc/Zy5pbmRleChjKT4tMToxPT09Yy5ub2RlVHlwZSYmby5maW5kLm1hdGNoZXNTZWxlY3RvcihjLGEpKSl7Zi5wdXNoKGMpO2JyZWFrfXJldHVybiB0aGlzLnB1c2hTdGFjayhmLmxlbmd0aD4xP28udW5pcXVlKGYpOmYpfSxpbmRleDpmdW5jdGlvbihhKXtyZXR1cm4gYT9cInN0cmluZ1wiPT10eXBlb2YgYT9nLmNhbGwobyhhKSx0aGlzWzBdKTpnLmNhbGwodGhpcyxhLmpxdWVyeT9hWzBdOmEpOnRoaXNbMF0mJnRoaXNbMF0ucGFyZW50Tm9kZT90aGlzLmZpcnN0KCkucHJldkFsbCgpLmxlbmd0aDotMX0sYWRkOmZ1bmN0aW9uKGEsYil7cmV0dXJuIHRoaXMucHVzaFN0YWNrKG8udW5pcXVlKG8ubWVyZ2UodGhpcy5nZXQoKSxvKGEsYikpKSl9LGFkZEJhY2s6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuYWRkKG51bGw9PWE/dGhpcy5wcmV2T2JqZWN0OnRoaXMucHJldk9iamVjdC5maWx0ZXIoYSkpfX0pO2Z1bmN0aW9uIEQoYSxiKXt3aGlsZSgoYT1hW2JdKSYmMSE9PWEubm9kZVR5cGUpO3JldHVybiBhfW8uZWFjaCh7cGFyZW50OmZ1bmN0aW9uKGEpe3ZhciBiPWEucGFyZW50Tm9kZTtyZXR1cm4gYiYmMTEhPT1iLm5vZGVUeXBlP2I6bnVsbH0scGFyZW50czpmdW5jdGlvbihhKXtyZXR1cm4gby5kaXIoYSxcInBhcmVudE5vZGVcIil9LHBhcmVudHNVbnRpbDpmdW5jdGlvbihhLGIsYyl7cmV0dXJuIG8uZGlyKGEsXCJwYXJlbnROb2RlXCIsYyl9LG5leHQ6ZnVuY3Rpb24oYSl7cmV0dXJuIEQoYSxcIm5leHRTaWJsaW5nXCIpfSxwcmV2OmZ1bmN0aW9uKGEpe3JldHVybiBEKGEsXCJwcmV2aW91c1NpYmxpbmdcIil9LG5leHRBbGw6ZnVuY3Rpb24oYSl7cmV0dXJuIG8uZGlyKGEsXCJuZXh0U2libGluZ1wiKX0scHJldkFsbDpmdW5jdGlvbihhKXtyZXR1cm4gby5kaXIoYSxcInByZXZpb3VzU2libGluZ1wiKX0sbmV4dFVudGlsOmZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gby5kaXIoYSxcIm5leHRTaWJsaW5nXCIsYyl9LHByZXZVbnRpbDpmdW5jdGlvbihhLGIsYyl7cmV0dXJuIG8uZGlyKGEsXCJwcmV2aW91c1NpYmxpbmdcIixjKX0sc2libGluZ3M6ZnVuY3Rpb24oYSl7cmV0dXJuIG8uc2libGluZygoYS5wYXJlbnROb2RlfHx7fSkuZmlyc3RDaGlsZCxhKX0sY2hpbGRyZW46ZnVuY3Rpb24oYSl7cmV0dXJuIG8uc2libGluZyhhLmZpcnN0Q2hpbGQpfSxjb250ZW50czpmdW5jdGlvbihhKXtyZXR1cm4gYS5jb250ZW50RG9jdW1lbnR8fG8ubWVyZ2UoW10sYS5jaGlsZE5vZGVzKX19LGZ1bmN0aW9uKGEsYil7by5mblthXT1mdW5jdGlvbihjLGQpe3ZhciBlPW8ubWFwKHRoaXMsYixjKTtyZXR1cm5cIlVudGlsXCIhPT1hLnNsaWNlKC01KSYmKGQ9YyksZCYmXCJzdHJpbmdcIj09dHlwZW9mIGQmJihlPW8uZmlsdGVyKGQsZSkpLHRoaXMubGVuZ3RoPjEmJihDW2FdfHxvLnVuaXF1ZShlKSxCLnRlc3QoYSkmJmUucmV2ZXJzZSgpKSx0aGlzLnB1c2hTdGFjayhlKX19KTt2YXIgRT0vXFxTKy9nLEY9e307ZnVuY3Rpb24gRyhhKXt2YXIgYj1GW2FdPXt9O3JldHVybiBvLmVhY2goYS5tYXRjaChFKXx8W10sZnVuY3Rpb24oYSxjKXtiW2NdPSEwfSksYn1vLkNhbGxiYWNrcz1mdW5jdGlvbihhKXthPVwic3RyaW5nXCI9PXR5cGVvZiBhP0ZbYV18fEcoYSk6by5leHRlbmQoe30sYSk7dmFyIGIsYyxkLGUsZixnLGg9W10saT0hYS5vbmNlJiZbXSxqPWZ1bmN0aW9uKGwpe2ZvcihiPWEubWVtb3J5JiZsLGM9ITAsZz1lfHwwLGU9MCxmPWgubGVuZ3RoLGQ9ITA7aCYmZj5nO2crKylpZihoW2ddLmFwcGx5KGxbMF0sbFsxXSk9PT0hMSYmYS5zdG9wT25GYWxzZSl7Yj0hMTticmVha31kPSExLGgmJihpP2kubGVuZ3RoJiZqKGkuc2hpZnQoKSk6Yj9oPVtdOmsuZGlzYWJsZSgpKX0saz17YWRkOmZ1bmN0aW9uKCl7aWYoaCl7dmFyIGM9aC5sZW5ndGg7IWZ1bmN0aW9uIGcoYil7by5lYWNoKGIsZnVuY3Rpb24oYixjKXt2YXIgZD1vLnR5cGUoYyk7XCJmdW5jdGlvblwiPT09ZD9hLnVuaXF1ZSYmay5oYXMoYyl8fGgucHVzaChjKTpjJiZjLmxlbmd0aCYmXCJzdHJpbmdcIiE9PWQmJmcoYyl9KX0oYXJndW1lbnRzKSxkP2Y9aC5sZW5ndGg6YiYmKGU9YyxqKGIpKX1yZXR1cm4gdGhpc30scmVtb3ZlOmZ1bmN0aW9uKCl7cmV0dXJuIGgmJm8uZWFjaChhcmd1bWVudHMsZnVuY3Rpb24oYSxiKXt2YXIgYzt3aGlsZSgoYz1vLmluQXJyYXkoYixoLGMpKT4tMSloLnNwbGljZShjLDEpLGQmJihmPj1jJiZmLS0sZz49YyYmZy0tKX0pLHRoaXN9LGhhczpmdW5jdGlvbihhKXtyZXR1cm4gYT9vLmluQXJyYXkoYSxoKT4tMTohKCFofHwhaC5sZW5ndGgpfSxlbXB0eTpmdW5jdGlvbigpe3JldHVybiBoPVtdLGY9MCx0aGlzfSxkaXNhYmxlOmZ1bmN0aW9uKCl7cmV0dXJuIGg9aT1iPXZvaWQgMCx0aGlzfSxkaXNhYmxlZDpmdW5jdGlvbigpe3JldHVybiFofSxsb2NrOmZ1bmN0aW9uKCl7cmV0dXJuIGk9dm9pZCAwLGJ8fGsuZGlzYWJsZSgpLHRoaXN9LGxvY2tlZDpmdW5jdGlvbigpe3JldHVybiFpfSxmaXJlV2l0aDpmdW5jdGlvbihhLGIpe3JldHVybiFofHxjJiYhaXx8KGI9Ynx8W10sYj1bYSxiLnNsaWNlP2Iuc2xpY2UoKTpiXSxkP2kucHVzaChiKTpqKGIpKSx0aGlzfSxmaXJlOmZ1bmN0aW9uKCl7cmV0dXJuIGsuZmlyZVdpdGgodGhpcyxhcmd1bWVudHMpLHRoaXN9LGZpcmVkOmZ1bmN0aW9uKCl7cmV0dXJuISFjfX07cmV0dXJuIGt9LG8uZXh0ZW5kKHtEZWZlcnJlZDpmdW5jdGlvbihhKXt2YXIgYj1bW1wicmVzb2x2ZVwiLFwiZG9uZVwiLG8uQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIiksXCJyZXNvbHZlZFwiXSxbXCJyZWplY3RcIixcImZhaWxcIixvLkNhbGxiYWNrcyhcIm9uY2UgbWVtb3J5XCIpLFwicmVqZWN0ZWRcIl0sW1wibm90aWZ5XCIsXCJwcm9ncmVzc1wiLG8uQ2FsbGJhY2tzKFwibWVtb3J5XCIpXV0sYz1cInBlbmRpbmdcIixkPXtzdGF0ZTpmdW5jdGlvbigpe3JldHVybiBjfSxhbHdheXM6ZnVuY3Rpb24oKXtyZXR1cm4gZS5kb25lKGFyZ3VtZW50cykuZmFpbChhcmd1bWVudHMpLHRoaXN9LHRoZW46ZnVuY3Rpb24oKXt2YXIgYT1hcmd1bWVudHM7cmV0dXJuIG8uRGVmZXJyZWQoZnVuY3Rpb24oYyl7by5lYWNoKGIsZnVuY3Rpb24oYixmKXt2YXIgZz1vLmlzRnVuY3Rpb24oYVtiXSkmJmFbYl07ZVtmWzFdXShmdW5jdGlvbigpe3ZhciBhPWcmJmcuYXBwbHkodGhpcyxhcmd1bWVudHMpO2EmJm8uaXNGdW5jdGlvbihhLnByb21pc2UpP2EucHJvbWlzZSgpLmRvbmUoYy5yZXNvbHZlKS5mYWlsKGMucmVqZWN0KS5wcm9ncmVzcyhjLm5vdGlmeSk6Y1tmWzBdK1wiV2l0aFwiXSh0aGlzPT09ZD9jLnByb21pc2UoKTp0aGlzLGc/W2FdOmFyZ3VtZW50cyl9KX0pLGE9bnVsbH0pLnByb21pc2UoKX0scHJvbWlzZTpmdW5jdGlvbihhKXtyZXR1cm4gbnVsbCE9YT9vLmV4dGVuZChhLGQpOmR9fSxlPXt9O3JldHVybiBkLnBpcGU9ZC50aGVuLG8uZWFjaChiLGZ1bmN0aW9uKGEsZil7dmFyIGc9ZlsyXSxoPWZbM107ZFtmWzFdXT1nLmFkZCxoJiZnLmFkZChmdW5jdGlvbigpe2M9aH0sYlsxXmFdWzJdLmRpc2FibGUsYlsyXVsyXS5sb2NrKSxlW2ZbMF1dPWZ1bmN0aW9uKCl7cmV0dXJuIGVbZlswXStcIldpdGhcIl0odGhpcz09PWU/ZDp0aGlzLGFyZ3VtZW50cyksdGhpc30sZVtmWzBdK1wiV2l0aFwiXT1nLmZpcmVXaXRofSksZC5wcm9taXNlKGUpLGEmJmEuY2FsbChlLGUpLGV9LHdoZW46ZnVuY3Rpb24oYSl7dmFyIGI9MCxjPWQuY2FsbChhcmd1bWVudHMpLGU9Yy5sZW5ndGgsZj0xIT09ZXx8YSYmby5pc0Z1bmN0aW9uKGEucHJvbWlzZSk/ZTowLGc9MT09PWY/YTpvLkRlZmVycmVkKCksaD1mdW5jdGlvbihhLGIsYyl7cmV0dXJuIGZ1bmN0aW9uKGUpe2JbYV09dGhpcyxjW2FdPWFyZ3VtZW50cy5sZW5ndGg+MT9kLmNhbGwoYXJndW1lbnRzKTplLGM9PT1pP2cubm90aWZ5V2l0aChiLGMpOi0tZnx8Zy5yZXNvbHZlV2l0aChiLGMpfX0saSxqLGs7aWYoZT4xKWZvcihpPW5ldyBBcnJheShlKSxqPW5ldyBBcnJheShlKSxrPW5ldyBBcnJheShlKTtlPmI7YisrKWNbYl0mJm8uaXNGdW5jdGlvbihjW2JdLnByb21pc2UpP2NbYl0ucHJvbWlzZSgpLmRvbmUoaChiLGssYykpLmZhaWwoZy5yZWplY3QpLnByb2dyZXNzKGgoYixqLGkpKTotLWY7cmV0dXJuIGZ8fGcucmVzb2x2ZVdpdGgoayxjKSxnLnByb21pc2UoKX19KTt2YXIgSDtvLmZuLnJlYWR5PWZ1bmN0aW9uKGEpe3JldHVybiBvLnJlYWR5LnByb21pc2UoKS5kb25lKGEpLHRoaXN9LG8uZXh0ZW5kKHtpc1JlYWR5OiExLHJlYWR5V2FpdDoxLGhvbGRSZWFkeTpmdW5jdGlvbihhKXthP28ucmVhZHlXYWl0Kys6by5yZWFkeSghMCl9LHJlYWR5OmZ1bmN0aW9uKGEpeyhhPT09ITA/LS1vLnJlYWR5V2FpdDpvLmlzUmVhZHkpfHwoby5pc1JlYWR5PSEwLGEhPT0hMCYmLS1vLnJlYWR5V2FpdD4wfHwoSC5yZXNvbHZlV2l0aChtLFtvXSksby5mbi50cmlnZ2VyJiZvKG0pLnRyaWdnZXIoXCJyZWFkeVwiKS5vZmYoXCJyZWFkeVwiKSkpfX0pO2Z1bmN0aW9uIEkoKXttLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsSSwhMSksYS5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLEksITEpLG8ucmVhZHkoKX1vLnJlYWR5LnByb21pc2U9ZnVuY3Rpb24oYil7cmV0dXJuIEh8fChIPW8uRGVmZXJyZWQoKSxcImNvbXBsZXRlXCI9PT1tLnJlYWR5U3RhdGU/c2V0VGltZW91dChvLnJlYWR5KToobS5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLEksITEpLGEuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixJLCExKSkpLEgucHJvbWlzZShiKX0sby5yZWFkeS5wcm9taXNlKCk7dmFyIEo9by5hY2Nlc3M9ZnVuY3Rpb24oYSxiLGMsZCxlLGYsZyl7dmFyIGg9MCxpPWEubGVuZ3RoLGo9bnVsbD09YztpZihcIm9iamVjdFwiPT09by50eXBlKGMpKXtlPSEwO2ZvcihoIGluIGMpby5hY2Nlc3MoYSxiLGgsY1toXSwhMCxmLGcpfWVsc2UgaWYodm9pZCAwIT09ZCYmKGU9ITAsby5pc0Z1bmN0aW9uKGQpfHwoZz0hMCksaiYmKGc/KGIuY2FsbChhLGQpLGI9bnVsbCk6KGo9YixiPWZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gai5jYWxsKG8oYSksYyl9KSksYikpZm9yKDtpPmg7aCsrKWIoYVtoXSxjLGc/ZDpkLmNhbGwoYVtoXSxoLGIoYVtoXSxjKSkpO3JldHVybiBlP2E6aj9iLmNhbGwoYSk6aT9iKGFbMF0sYyk6Zn07by5hY2NlcHREYXRhPWZ1bmN0aW9uKGEpe3JldHVybiAxPT09YS5ub2RlVHlwZXx8OT09PWEubm9kZVR5cGV8fCErYS5ub2RlVHlwZX07ZnVuY3Rpb24gSygpe09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmNhY2hlPXt9LDAse2dldDpmdW5jdGlvbigpe3JldHVybnt9fX0pLHRoaXMuZXhwYW5kbz1vLmV4cGFuZG8rTWF0aC5yYW5kb20oKX1LLnVpZD0xLEsuYWNjZXB0cz1vLmFjY2VwdERhdGEsSy5wcm90b3R5cGU9e2tleTpmdW5jdGlvbihhKXtpZighSy5hY2NlcHRzKGEpKXJldHVybiAwO3ZhciBiPXt9LGM9YVt0aGlzLmV4cGFuZG9dO2lmKCFjKXtjPUsudWlkKys7dHJ5e2JbdGhpcy5leHBhbmRvXT17dmFsdWU6Y30sT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoYSxiKX1jYXRjaChkKXtiW3RoaXMuZXhwYW5kb109YyxvLmV4dGVuZChhLGIpfX1yZXR1cm4gdGhpcy5jYWNoZVtjXXx8KHRoaXMuY2FjaGVbY109e30pLGN9LHNldDpmdW5jdGlvbihhLGIsYyl7dmFyIGQsZT10aGlzLmtleShhKSxmPXRoaXMuY2FjaGVbZV07aWYoXCJzdHJpbmdcIj09dHlwZW9mIGIpZltiXT1jO2Vsc2UgaWYoby5pc0VtcHR5T2JqZWN0KGYpKW8uZXh0ZW5kKHRoaXMuY2FjaGVbZV0sYik7ZWxzZSBmb3IoZCBpbiBiKWZbZF09YltkXTtyZXR1cm4gZn0sZ2V0OmZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcy5jYWNoZVt0aGlzLmtleShhKV07cmV0dXJuIHZvaWQgMD09PWI/YzpjW2JdfSxhY2Nlc3M6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkO3JldHVybiB2b2lkIDA9PT1ifHxiJiZcInN0cmluZ1wiPT10eXBlb2YgYiYmdm9pZCAwPT09Yz8oZD10aGlzLmdldChhLGIpLHZvaWQgMCE9PWQ/ZDp0aGlzLmdldChhLG8uY2FtZWxDYXNlKGIpKSk6KHRoaXMuc2V0KGEsYixjKSx2b2lkIDAhPT1jP2M6Yil9LHJlbW92ZTpmdW5jdGlvbihhLGIpe3ZhciBjLGQsZSxmPXRoaXMua2V5KGEpLGc9dGhpcy5jYWNoZVtmXTtpZih2b2lkIDA9PT1iKXRoaXMuY2FjaGVbZl09e307ZWxzZXtvLmlzQXJyYXkoYik/ZD1iLmNvbmNhdChiLm1hcChvLmNhbWVsQ2FzZSkpOihlPW8uY2FtZWxDYXNlKGIpLGIgaW4gZz9kPVtiLGVdOihkPWUsZD1kIGluIGc/W2RdOmQubWF0Y2goRSl8fFtdKSksYz1kLmxlbmd0aDt3aGlsZShjLS0pZGVsZXRlIGdbZFtjXV19fSxoYXNEYXRhOmZ1bmN0aW9uKGEpe3JldHVybiFvLmlzRW1wdHlPYmplY3QodGhpcy5jYWNoZVthW3RoaXMuZXhwYW5kb11dfHx7fSl9LGRpc2NhcmQ6ZnVuY3Rpb24oYSl7YVt0aGlzLmV4cGFuZG9dJiZkZWxldGUgdGhpcy5jYWNoZVthW3RoaXMuZXhwYW5kb11dfX07dmFyIEw9bmV3IEssTT1uZXcgSyxOPS9eKD86XFx7W1xcd1xcV10qXFx9fFxcW1tcXHdcXFddKlxcXSkkLyxPPS8oW0EtWl0pL2c7ZnVuY3Rpb24gUChhLGIsYyl7dmFyIGQ7aWYodm9pZCAwPT09YyYmMT09PWEubm9kZVR5cGUpaWYoZD1cImRhdGEtXCIrYi5yZXBsYWNlKE8sXCItJDFcIikudG9Mb3dlckNhc2UoKSxjPWEuZ2V0QXR0cmlidXRlKGQpLFwic3RyaW5nXCI9PXR5cGVvZiBjKXt0cnl7Yz1cInRydWVcIj09PWM/ITA6XCJmYWxzZVwiPT09Yz8hMTpcIm51bGxcIj09PWM/bnVsbDorYytcIlwiPT09Yz8rYzpOLnRlc3QoYyk/by5wYXJzZUpTT04oYyk6Y31jYXRjaChlKXt9TS5zZXQoYSxiLGMpfWVsc2UgYz12b2lkIDA7cmV0dXJuIGN9by5leHRlbmQoe2hhc0RhdGE6ZnVuY3Rpb24oYSl7cmV0dXJuIE0uaGFzRGF0YShhKXx8TC5oYXNEYXRhKGEpfSxkYXRhOmZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gTS5hY2Nlc3MoYSxiLGMpfSxyZW1vdmVEYXRhOmZ1bmN0aW9uKGEsYil7TS5yZW1vdmUoYSxiKX0sX2RhdGE6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiBMLmFjY2VzcyhhLGIsYyl9LF9yZW1vdmVEYXRhOmZ1bmN0aW9uKGEsYil7TC5yZW1vdmUoYSxiKX19KSxvLmZuLmV4dGVuZCh7ZGF0YTpmdW5jdGlvbihhLGIpe3ZhciBjLGQsZSxmPXRoaXNbMF0sZz1mJiZmLmF0dHJpYnV0ZXM7aWYodm9pZCAwPT09YSl7aWYodGhpcy5sZW5ndGgmJihlPU0uZ2V0KGYpLDE9PT1mLm5vZGVUeXBlJiYhTC5nZXQoZixcImhhc0RhdGFBdHRyc1wiKSkpe2M9Zy5sZW5ndGg7XG53aGlsZShjLS0pZD1nW2NdLm5hbWUsMD09PWQuaW5kZXhPZihcImRhdGEtXCIpJiYoZD1vLmNhbWVsQ2FzZShkLnNsaWNlKDUpKSxQKGYsZCxlW2RdKSk7TC5zZXQoZixcImhhc0RhdGFBdHRyc1wiLCEwKX1yZXR1cm4gZX1yZXR1cm5cIm9iamVjdFwiPT10eXBlb2YgYT90aGlzLmVhY2goZnVuY3Rpb24oKXtNLnNldCh0aGlzLGEpfSk6Sih0aGlzLGZ1bmN0aW9uKGIpe3ZhciBjLGQ9by5jYW1lbENhc2UoYSk7aWYoZiYmdm9pZCAwPT09Yil7aWYoYz1NLmdldChmLGEpLHZvaWQgMCE9PWMpcmV0dXJuIGM7aWYoYz1NLmdldChmLGQpLHZvaWQgMCE9PWMpcmV0dXJuIGM7aWYoYz1QKGYsZCx2b2lkIDApLHZvaWQgMCE9PWMpcmV0dXJuIGN9ZWxzZSB0aGlzLmVhY2goZnVuY3Rpb24oKXt2YXIgYz1NLmdldCh0aGlzLGQpO00uc2V0KHRoaXMsZCxiKSwtMSE9PWEuaW5kZXhPZihcIi1cIikmJnZvaWQgMCE9PWMmJk0uc2V0KHRoaXMsYSxiKX0pfSxudWxsLGIsYXJndW1lbnRzLmxlbmd0aD4xLG51bGwsITApfSxyZW1vdmVEYXRhOmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtNLnJlbW92ZSh0aGlzLGEpfSl9fSksby5leHRlbmQoe3F1ZXVlOmZ1bmN0aW9uKGEsYixjKXt2YXIgZDtyZXR1cm4gYT8oYj0oYnx8XCJmeFwiKStcInF1ZXVlXCIsZD1MLmdldChhLGIpLGMmJighZHx8by5pc0FycmF5KGMpP2Q9TC5hY2Nlc3MoYSxiLG8ubWFrZUFycmF5KGMpKTpkLnB1c2goYykpLGR8fFtdKTp2b2lkIDB9LGRlcXVldWU6ZnVuY3Rpb24oYSxiKXtiPWJ8fFwiZnhcIjt2YXIgYz1vLnF1ZXVlKGEsYiksZD1jLmxlbmd0aCxlPWMuc2hpZnQoKSxmPW8uX3F1ZXVlSG9va3MoYSxiKSxnPWZ1bmN0aW9uKCl7by5kZXF1ZXVlKGEsYil9O1wiaW5wcm9ncmVzc1wiPT09ZSYmKGU9Yy5zaGlmdCgpLGQtLSksZSYmKFwiZnhcIj09PWImJmMudW5zaGlmdChcImlucHJvZ3Jlc3NcIiksZGVsZXRlIGYuc3RvcCxlLmNhbGwoYSxnLGYpKSwhZCYmZiYmZi5lbXB0eS5maXJlKCl9LF9xdWV1ZUhvb2tzOmZ1bmN0aW9uKGEsYil7dmFyIGM9YitcInF1ZXVlSG9va3NcIjtyZXR1cm4gTC5nZXQoYSxjKXx8TC5hY2Nlc3MoYSxjLHtlbXB0eTpvLkNhbGxiYWNrcyhcIm9uY2UgbWVtb3J5XCIpLmFkZChmdW5jdGlvbigpe0wucmVtb3ZlKGEsW2IrXCJxdWV1ZVwiLGNdKX0pfSl9fSksby5mbi5leHRlbmQoe3F1ZXVlOmZ1bmN0aW9uKGEsYil7dmFyIGM9MjtyZXR1cm5cInN0cmluZ1wiIT10eXBlb2YgYSYmKGI9YSxhPVwiZnhcIixjLS0pLGFyZ3VtZW50cy5sZW5ndGg8Yz9vLnF1ZXVlKHRoaXNbMF0sYSk6dm9pZCAwPT09Yj90aGlzOnRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBjPW8ucXVldWUodGhpcyxhLGIpO28uX3F1ZXVlSG9va3ModGhpcyxhKSxcImZ4XCI9PT1hJiZcImlucHJvZ3Jlc3NcIiE9PWNbMF0mJm8uZGVxdWV1ZSh0aGlzLGEpfSl9LGRlcXVldWU6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe28uZGVxdWV1ZSh0aGlzLGEpfSl9LGNsZWFyUXVldWU6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMucXVldWUoYXx8XCJmeFwiLFtdKX0scHJvbWlzZTpmdW5jdGlvbihhLGIpe3ZhciBjLGQ9MSxlPW8uRGVmZXJyZWQoKSxmPXRoaXMsZz10aGlzLmxlbmd0aCxoPWZ1bmN0aW9uKCl7LS1kfHxlLnJlc29sdmVXaXRoKGYsW2ZdKX07XCJzdHJpbmdcIiE9dHlwZW9mIGEmJihiPWEsYT12b2lkIDApLGE9YXx8XCJmeFwiO3doaWxlKGctLSljPUwuZ2V0KGZbZ10sYStcInF1ZXVlSG9va3NcIiksYyYmYy5lbXB0eSYmKGQrKyxjLmVtcHR5LmFkZChoKSk7cmV0dXJuIGgoKSxlLnByb21pc2UoYil9fSk7dmFyIFE9L1srLV0/KD86XFxkKlxcLnwpXFxkKyg/OltlRV1bKy1dP1xcZCt8KS8uc291cmNlLFI9W1wiVG9wXCIsXCJSaWdodFwiLFwiQm90dG9tXCIsXCJMZWZ0XCJdLFM9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gYT1ifHxhLFwibm9uZVwiPT09by5jc3MoYSxcImRpc3BsYXlcIil8fCFvLmNvbnRhaW5zKGEub3duZXJEb2N1bWVudCxhKX0sVD0vXig/OmNoZWNrYm94fHJhZGlvKSQvaTshZnVuY3Rpb24oKXt2YXIgYT1tLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxiPWEuYXBwZW5kQ2hpbGQobS5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtiLmlubmVySFRNTD1cIjxpbnB1dCB0eXBlPSdyYWRpbycgY2hlY2tlZD0nY2hlY2tlZCcgbmFtZT0ndCcvPlwiLGwuY2hlY2tDbG9uZT1iLmNsb25lTm9kZSghMCkuY2xvbmVOb2RlKCEwKS5sYXN0Q2hpbGQuY2hlY2tlZCxiLmlubmVySFRNTD1cIjx0ZXh0YXJlYT54PC90ZXh0YXJlYT5cIixsLm5vQ2xvbmVDaGVja2VkPSEhYi5jbG9uZU5vZGUoITApLmxhc3RDaGlsZC5kZWZhdWx0VmFsdWV9KCk7dmFyIFU9XCJ1bmRlZmluZWRcIjtsLmZvY3VzaW5CdWJibGVzPVwib25mb2N1c2luXCJpbiBhO3ZhciBWPS9ea2V5LyxXPS9eKD86bW91c2V8Y29udGV4dG1lbnUpfGNsaWNrLyxYPS9eKD86Zm9jdXNpbmZvY3VzfGZvY3Vzb3V0Ymx1cikkLyxZPS9eKFteLl0qKSg/OlxcLiguKyl8KSQvO2Z1bmN0aW9uIFooKXtyZXR1cm4hMH1mdW5jdGlvbiAkKCl7cmV0dXJuITF9ZnVuY3Rpb24gXygpe3RyeXtyZXR1cm4gbS5hY3RpdmVFbGVtZW50fWNhdGNoKGEpe319by5ldmVudD17Z2xvYmFsOnt9LGFkZDpmdW5jdGlvbihhLGIsYyxkLGUpe3ZhciBmLGcsaCxpLGosayxsLG0sbixwLHEscj1MLmdldChhKTtpZihyKXtjLmhhbmRsZXImJihmPWMsYz1mLmhhbmRsZXIsZT1mLnNlbGVjdG9yKSxjLmd1aWR8fChjLmd1aWQ9by5ndWlkKyspLChpPXIuZXZlbnRzKXx8KGk9ci5ldmVudHM9e30pLChnPXIuaGFuZGxlKXx8KGc9ci5oYW5kbGU9ZnVuY3Rpb24oYil7cmV0dXJuIHR5cGVvZiBvIT09VSYmby5ldmVudC50cmlnZ2VyZWQhPT1iLnR5cGU/by5ldmVudC5kaXNwYXRjaC5hcHBseShhLGFyZ3VtZW50cyk6dm9pZCAwfSksYj0oYnx8XCJcIikubWF0Y2goRSl8fFtcIlwiXSxqPWIubGVuZ3RoO3doaWxlKGotLSloPVkuZXhlYyhiW2pdKXx8W10sbj1xPWhbMV0scD0oaFsyXXx8XCJcIikuc3BsaXQoXCIuXCIpLnNvcnQoKSxuJiYobD1vLmV2ZW50LnNwZWNpYWxbbl18fHt9LG49KGU/bC5kZWxlZ2F0ZVR5cGU6bC5iaW5kVHlwZSl8fG4sbD1vLmV2ZW50LnNwZWNpYWxbbl18fHt9LGs9by5leHRlbmQoe3R5cGU6bixvcmlnVHlwZTpxLGRhdGE6ZCxoYW5kbGVyOmMsZ3VpZDpjLmd1aWQsc2VsZWN0b3I6ZSxuZWVkc0NvbnRleHQ6ZSYmby5leHByLm1hdGNoLm5lZWRzQ29udGV4dC50ZXN0KGUpLG5hbWVzcGFjZTpwLmpvaW4oXCIuXCIpfSxmKSwobT1pW25dKXx8KG09aVtuXT1bXSxtLmRlbGVnYXRlQ291bnQ9MCxsLnNldHVwJiZsLnNldHVwLmNhbGwoYSxkLHAsZykhPT0hMXx8YS5hZGRFdmVudExpc3RlbmVyJiZhLmFkZEV2ZW50TGlzdGVuZXIobixnLCExKSksbC5hZGQmJihsLmFkZC5jYWxsKGEsayksay5oYW5kbGVyLmd1aWR8fChrLmhhbmRsZXIuZ3VpZD1jLmd1aWQpKSxlP20uc3BsaWNlKG0uZGVsZWdhdGVDb3VudCsrLDAsayk6bS5wdXNoKGspLG8uZXZlbnQuZ2xvYmFsW25dPSEwKX19LHJlbW92ZTpmdW5jdGlvbihhLGIsYyxkLGUpe3ZhciBmLGcsaCxpLGosayxsLG0sbixwLHEscj1MLmhhc0RhdGEoYSkmJkwuZ2V0KGEpO2lmKHImJihpPXIuZXZlbnRzKSl7Yj0oYnx8XCJcIikubWF0Y2goRSl8fFtcIlwiXSxqPWIubGVuZ3RoO3doaWxlKGotLSlpZihoPVkuZXhlYyhiW2pdKXx8W10sbj1xPWhbMV0scD0oaFsyXXx8XCJcIikuc3BsaXQoXCIuXCIpLnNvcnQoKSxuKXtsPW8uZXZlbnQuc3BlY2lhbFtuXXx8e30sbj0oZD9sLmRlbGVnYXRlVHlwZTpsLmJpbmRUeXBlKXx8bixtPWlbbl18fFtdLGg9aFsyXSYmbmV3IFJlZ0V4cChcIihefFxcXFwuKVwiK3Auam9pbihcIlxcXFwuKD86LipcXFxcLnwpXCIpK1wiKFxcXFwufCQpXCIpLGc9Zj1tLmxlbmd0aDt3aGlsZShmLS0paz1tW2ZdLCFlJiZxIT09ay5vcmlnVHlwZXx8YyYmYy5ndWlkIT09ay5ndWlkfHxoJiYhaC50ZXN0KGsubmFtZXNwYWNlKXx8ZCYmZCE9PWsuc2VsZWN0b3ImJihcIioqXCIhPT1kfHwhay5zZWxlY3Rvcil8fChtLnNwbGljZShmLDEpLGsuc2VsZWN0b3ImJm0uZGVsZWdhdGVDb3VudC0tLGwucmVtb3ZlJiZsLnJlbW92ZS5jYWxsKGEsaykpO2cmJiFtLmxlbmd0aCYmKGwudGVhcmRvd24mJmwudGVhcmRvd24uY2FsbChhLHAsci5oYW5kbGUpIT09ITF8fG8ucmVtb3ZlRXZlbnQoYSxuLHIuaGFuZGxlKSxkZWxldGUgaVtuXSl9ZWxzZSBmb3IobiBpbiBpKW8uZXZlbnQucmVtb3ZlKGEsbitiW2pdLGMsZCwhMCk7by5pc0VtcHR5T2JqZWN0KGkpJiYoZGVsZXRlIHIuaGFuZGxlLEwucmVtb3ZlKGEsXCJldmVudHNcIikpfX0sdHJpZ2dlcjpmdW5jdGlvbihiLGMsZCxlKXt2YXIgZixnLGgsaSxrLGwsbixwPVtkfHxtXSxxPWouY2FsbChiLFwidHlwZVwiKT9iLnR5cGU6YixyPWouY2FsbChiLFwibmFtZXNwYWNlXCIpP2IubmFtZXNwYWNlLnNwbGl0KFwiLlwiKTpbXTtpZihnPWg9ZD1kfHxtLDMhPT1kLm5vZGVUeXBlJiY4IT09ZC5ub2RlVHlwZSYmIVgudGVzdChxK28uZXZlbnQudHJpZ2dlcmVkKSYmKHEuaW5kZXhPZihcIi5cIik+PTAmJihyPXEuc3BsaXQoXCIuXCIpLHE9ci5zaGlmdCgpLHIuc29ydCgpKSxrPXEuaW5kZXhPZihcIjpcIik8MCYmXCJvblwiK3EsYj1iW28uZXhwYW5kb10/YjpuZXcgby5FdmVudChxLFwib2JqZWN0XCI9PXR5cGVvZiBiJiZiKSxiLmlzVHJpZ2dlcj1lPzI6MyxiLm5hbWVzcGFjZT1yLmpvaW4oXCIuXCIpLGIubmFtZXNwYWNlX3JlPWIubmFtZXNwYWNlP25ldyBSZWdFeHAoXCIoXnxcXFxcLilcIityLmpvaW4oXCJcXFxcLig/Oi4qXFxcXC58KVwiKStcIihcXFxcLnwkKVwiKTpudWxsLGIucmVzdWx0PXZvaWQgMCxiLnRhcmdldHx8KGIudGFyZ2V0PWQpLGM9bnVsbD09Yz9bYl06by5tYWtlQXJyYXkoYyxbYl0pLG49by5ldmVudC5zcGVjaWFsW3FdfHx7fSxlfHwhbi50cmlnZ2VyfHxuLnRyaWdnZXIuYXBwbHkoZCxjKSE9PSExKSl7aWYoIWUmJiFuLm5vQnViYmxlJiYhby5pc1dpbmRvdyhkKSl7Zm9yKGk9bi5kZWxlZ2F0ZVR5cGV8fHEsWC50ZXN0KGkrcSl8fChnPWcucGFyZW50Tm9kZSk7ZztnPWcucGFyZW50Tm9kZSlwLnB1c2goZyksaD1nO2g9PT0oZC5vd25lckRvY3VtZW50fHxtKSYmcC5wdXNoKGguZGVmYXVsdFZpZXd8fGgucGFyZW50V2luZG93fHxhKX1mPTA7d2hpbGUoKGc9cFtmKytdKSYmIWIuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSliLnR5cGU9Zj4xP2k6bi5iaW5kVHlwZXx8cSxsPShMLmdldChnLFwiZXZlbnRzXCIpfHx7fSlbYi50eXBlXSYmTC5nZXQoZyxcImhhbmRsZVwiKSxsJiZsLmFwcGx5KGcsYyksbD1rJiZnW2tdLGwmJmwuYXBwbHkmJm8uYWNjZXB0RGF0YShnKSYmKGIucmVzdWx0PWwuYXBwbHkoZyxjKSxiLnJlc3VsdD09PSExJiZiLnByZXZlbnREZWZhdWx0KCkpO3JldHVybiBiLnR5cGU9cSxlfHxiLmlzRGVmYXVsdFByZXZlbnRlZCgpfHxuLl9kZWZhdWx0JiZuLl9kZWZhdWx0LmFwcGx5KHAucG9wKCksYykhPT0hMXx8IW8uYWNjZXB0RGF0YShkKXx8ayYmby5pc0Z1bmN0aW9uKGRbcV0pJiYhby5pc1dpbmRvdyhkKSYmKGg9ZFtrXSxoJiYoZFtrXT1udWxsKSxvLmV2ZW50LnRyaWdnZXJlZD1xLGRbcV0oKSxvLmV2ZW50LnRyaWdnZXJlZD12b2lkIDAsaCYmKGRba109aCkpLGIucmVzdWx0fX0sZGlzcGF0Y2g6ZnVuY3Rpb24oYSl7YT1vLmV2ZW50LmZpeChhKTt2YXIgYixjLGUsZixnLGg9W10saT1kLmNhbGwoYXJndW1lbnRzKSxqPShMLmdldCh0aGlzLFwiZXZlbnRzXCIpfHx7fSlbYS50eXBlXXx8W10saz1vLmV2ZW50LnNwZWNpYWxbYS50eXBlXXx8e307aWYoaVswXT1hLGEuZGVsZWdhdGVUYXJnZXQ9dGhpcywhay5wcmVEaXNwYXRjaHx8ay5wcmVEaXNwYXRjaC5jYWxsKHRoaXMsYSkhPT0hMSl7aD1vLmV2ZW50LmhhbmRsZXJzLmNhbGwodGhpcyxhLGopLGI9MDt3aGlsZSgoZj1oW2IrK10pJiYhYS5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpKXthLmN1cnJlbnRUYXJnZXQ9Zi5lbGVtLGM9MDt3aGlsZSgoZz1mLmhhbmRsZXJzW2MrK10pJiYhYS5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCgpKSghYS5uYW1lc3BhY2VfcmV8fGEubmFtZXNwYWNlX3JlLnRlc3QoZy5uYW1lc3BhY2UpKSYmKGEuaGFuZGxlT2JqPWcsYS5kYXRhPWcuZGF0YSxlPSgoby5ldmVudC5zcGVjaWFsW2cub3JpZ1R5cGVdfHx7fSkuaGFuZGxlfHxnLmhhbmRsZXIpLmFwcGx5KGYuZWxlbSxpKSx2b2lkIDAhPT1lJiYoYS5yZXN1bHQ9ZSk9PT0hMSYmKGEucHJldmVudERlZmF1bHQoKSxhLnN0b3BQcm9wYWdhdGlvbigpKSl9cmV0dXJuIGsucG9zdERpc3BhdGNoJiZrLnBvc3REaXNwYXRjaC5jYWxsKHRoaXMsYSksYS5yZXN1bHR9fSxoYW5kbGVyczpmdW5jdGlvbihhLGIpe3ZhciBjLGQsZSxmLGc9W10saD1iLmRlbGVnYXRlQ291bnQsaT1hLnRhcmdldDtpZihoJiZpLm5vZGVUeXBlJiYoIWEuYnV0dG9ufHxcImNsaWNrXCIhPT1hLnR5cGUpKWZvcig7aSE9PXRoaXM7aT1pLnBhcmVudE5vZGV8fHRoaXMpaWYoaS5kaXNhYmxlZCE9PSEwfHxcImNsaWNrXCIhPT1hLnR5cGUpe2ZvcihkPVtdLGM9MDtoPmM7YysrKWY9YltjXSxlPWYuc2VsZWN0b3IrXCIgXCIsdm9pZCAwPT09ZFtlXSYmKGRbZV09Zi5uZWVkc0NvbnRleHQ/byhlLHRoaXMpLmluZGV4KGkpPj0wOm8uZmluZChlLHRoaXMsbnVsbCxbaV0pLmxlbmd0aCksZFtlXSYmZC5wdXNoKGYpO2QubGVuZ3RoJiZnLnB1c2goe2VsZW06aSxoYW5kbGVyczpkfSl9cmV0dXJuIGg8Yi5sZW5ndGgmJmcucHVzaCh7ZWxlbTp0aGlzLGhhbmRsZXJzOmIuc2xpY2UoaCl9KSxnfSxwcm9wczpcImFsdEtleSBidWJibGVzIGNhbmNlbGFibGUgY3RybEtleSBjdXJyZW50VGFyZ2V0IGV2ZW50UGhhc2UgbWV0YUtleSByZWxhdGVkVGFyZ2V0IHNoaWZ0S2V5IHRhcmdldCB0aW1lU3RhbXAgdmlldyB3aGljaFwiLnNwbGl0KFwiIFwiKSxmaXhIb29rczp7fSxrZXlIb29rczp7cHJvcHM6XCJjaGFyIGNoYXJDb2RlIGtleSBrZXlDb2RlXCIuc3BsaXQoXCIgXCIpLGZpbHRlcjpmdW5jdGlvbihhLGIpe3JldHVybiBudWxsPT1hLndoaWNoJiYoYS53aGljaD1udWxsIT1iLmNoYXJDb2RlP2IuY2hhckNvZGU6Yi5rZXlDb2RlKSxhfX0sbW91c2VIb29rczp7cHJvcHM6XCJidXR0b24gYnV0dG9ucyBjbGllbnRYIGNsaWVudFkgb2Zmc2V0WCBvZmZzZXRZIHBhZ2VYIHBhZ2VZIHNjcmVlblggc2NyZWVuWSB0b0VsZW1lbnRcIi5zcGxpdChcIiBcIiksZmlsdGVyOmZ1bmN0aW9uKGEsYil7dmFyIGMsZCxlLGY9Yi5idXR0b247cmV0dXJuIG51bGw9PWEucGFnZVgmJm51bGwhPWIuY2xpZW50WCYmKGM9YS50YXJnZXQub3duZXJEb2N1bWVudHx8bSxkPWMuZG9jdW1lbnRFbGVtZW50LGU9Yy5ib2R5LGEucGFnZVg9Yi5jbGllbnRYKyhkJiZkLnNjcm9sbExlZnR8fGUmJmUuc2Nyb2xsTGVmdHx8MCktKGQmJmQuY2xpZW50TGVmdHx8ZSYmZS5jbGllbnRMZWZ0fHwwKSxhLnBhZ2VZPWIuY2xpZW50WSsoZCYmZC5zY3JvbGxUb3B8fGUmJmUuc2Nyb2xsVG9wfHwwKS0oZCYmZC5jbGllbnRUb3B8fGUmJmUuY2xpZW50VG9wfHwwKSksYS53aGljaHx8dm9pZCAwPT09Znx8KGEud2hpY2g9MSZmPzE6MiZmPzM6NCZmPzI6MCksYX19LGZpeDpmdW5jdGlvbihhKXtpZihhW28uZXhwYW5kb10pcmV0dXJuIGE7dmFyIGIsYyxkLGU9YS50eXBlLGY9YSxnPXRoaXMuZml4SG9va3NbZV07Z3x8KHRoaXMuZml4SG9va3NbZV09Zz1XLnRlc3QoZSk/dGhpcy5tb3VzZUhvb2tzOlYudGVzdChlKT90aGlzLmtleUhvb2tzOnt9KSxkPWcucHJvcHM/dGhpcy5wcm9wcy5jb25jYXQoZy5wcm9wcyk6dGhpcy5wcm9wcyxhPW5ldyBvLkV2ZW50KGYpLGI9ZC5sZW5ndGg7d2hpbGUoYi0tKWM9ZFtiXSxhW2NdPWZbY107cmV0dXJuIGEudGFyZ2V0fHwoYS50YXJnZXQ9bSksMz09PWEudGFyZ2V0Lm5vZGVUeXBlJiYoYS50YXJnZXQ9YS50YXJnZXQucGFyZW50Tm9kZSksZy5maWx0ZXI/Zy5maWx0ZXIoYSxmKTphfSxzcGVjaWFsOntsb2FkOntub0J1YmJsZTohMH0sZm9jdXM6e3RyaWdnZXI6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcyE9PV8oKSYmdGhpcy5mb2N1cz8odGhpcy5mb2N1cygpLCExKTp2b2lkIDB9LGRlbGVnYXRlVHlwZTpcImZvY3VzaW5cIn0sYmx1cjp7dHJpZ2dlcjpmdW5jdGlvbigpe3JldHVybiB0aGlzPT09XygpJiZ0aGlzLmJsdXI/KHRoaXMuYmx1cigpLCExKTp2b2lkIDB9LGRlbGVnYXRlVHlwZTpcImZvY3Vzb3V0XCJ9LGNsaWNrOnt0cmlnZ2VyOmZ1bmN0aW9uKCl7cmV0dXJuXCJjaGVja2JveFwiPT09dGhpcy50eXBlJiZ0aGlzLmNsaWNrJiZvLm5vZGVOYW1lKHRoaXMsXCJpbnB1dFwiKT8odGhpcy5jbGljaygpLCExKTp2b2lkIDB9LF9kZWZhdWx0OmZ1bmN0aW9uKGEpe3JldHVybiBvLm5vZGVOYW1lKGEudGFyZ2V0LFwiYVwiKX19LGJlZm9yZXVubG9hZDp7cG9zdERpc3BhdGNoOmZ1bmN0aW9uKGEpe3ZvaWQgMCE9PWEucmVzdWx0JiYoYS5vcmlnaW5hbEV2ZW50LnJldHVyblZhbHVlPWEucmVzdWx0KX19fSxzaW11bGF0ZTpmdW5jdGlvbihhLGIsYyxkKXt2YXIgZT1vLmV4dGVuZChuZXcgby5FdmVudCxjLHt0eXBlOmEsaXNTaW11bGF0ZWQ6ITAsb3JpZ2luYWxFdmVudDp7fX0pO2Q/by5ldmVudC50cmlnZ2VyKGUsbnVsbCxiKTpvLmV2ZW50LmRpc3BhdGNoLmNhbGwoYixlKSxlLmlzRGVmYXVsdFByZXZlbnRlZCgpJiZjLnByZXZlbnREZWZhdWx0KCl9fSxvLnJlbW92ZUV2ZW50PWZ1bmN0aW9uKGEsYixjKXthLnJlbW92ZUV2ZW50TGlzdGVuZXImJmEucmVtb3ZlRXZlbnRMaXN0ZW5lcihiLGMsITEpfSxvLkV2ZW50PWZ1bmN0aW9uKGEsYil7cmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBvLkV2ZW50PyhhJiZhLnR5cGU/KHRoaXMub3JpZ2luYWxFdmVudD1hLHRoaXMudHlwZT1hLnR5cGUsdGhpcy5pc0RlZmF1bHRQcmV2ZW50ZWQ9YS5kZWZhdWx0UHJldmVudGVkfHx2b2lkIDA9PT1hLmRlZmF1bHRQcmV2ZW50ZWQmJmEuZ2V0UHJldmVudERlZmF1bHQmJmEuZ2V0UHJldmVudERlZmF1bHQoKT9aOiQpOnRoaXMudHlwZT1hLGImJm8uZXh0ZW5kKHRoaXMsYiksdGhpcy50aW1lU3RhbXA9YSYmYS50aW1lU3RhbXB8fG8ubm93KCksdm9pZCh0aGlzW28uZXhwYW5kb109ITApKTpuZXcgby5FdmVudChhLGIpfSxvLkV2ZW50LnByb3RvdHlwZT17aXNEZWZhdWx0UHJldmVudGVkOiQsaXNQcm9wYWdhdGlvblN0b3BwZWQ6JCxpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZDokLHByZXZlbnREZWZhdWx0OmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5vcmlnaW5hbEV2ZW50O3RoaXMuaXNEZWZhdWx0UHJldmVudGVkPVosYSYmYS5wcmV2ZW50RGVmYXVsdCYmYS5wcmV2ZW50RGVmYXVsdCgpfSxzdG9wUHJvcGFnYXRpb246ZnVuY3Rpb24oKXt2YXIgYT10aGlzLm9yaWdpbmFsRXZlbnQ7dGhpcy5pc1Byb3BhZ2F0aW9uU3RvcHBlZD1aLGEmJmEuc3RvcFByb3BhZ2F0aW9uJiZhLnN0b3BQcm9wYWdhdGlvbigpfSxzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb246ZnVuY3Rpb24oKXt0aGlzLmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkPVosdGhpcy5zdG9wUHJvcGFnYXRpb24oKX19LG8uZWFjaCh7bW91c2VlbnRlcjpcIm1vdXNlb3ZlclwiLG1vdXNlbGVhdmU6XCJtb3VzZW91dFwifSxmdW5jdGlvbihhLGIpe28uZXZlbnQuc3BlY2lhbFthXT17ZGVsZWdhdGVUeXBlOmIsYmluZFR5cGU6YixoYW5kbGU6ZnVuY3Rpb24oYSl7dmFyIGMsZD10aGlzLGU9YS5yZWxhdGVkVGFyZ2V0LGY9YS5oYW5kbGVPYmo7cmV0dXJuKCFlfHxlIT09ZCYmIW8uY29udGFpbnMoZCxlKSkmJihhLnR5cGU9Zi5vcmlnVHlwZSxjPWYuaGFuZGxlci5hcHBseSh0aGlzLGFyZ3VtZW50cyksYS50eXBlPWIpLGN9fX0pLGwuZm9jdXNpbkJ1YmJsZXN8fG8uZWFjaCh7Zm9jdXM6XCJmb2N1c2luXCIsYmx1cjpcImZvY3Vzb3V0XCJ9LGZ1bmN0aW9uKGEsYil7dmFyIGM9ZnVuY3Rpb24oYSl7by5ldmVudC5zaW11bGF0ZShiLGEudGFyZ2V0LG8uZXZlbnQuZml4KGEpLCEwKX07by5ldmVudC5zcGVjaWFsW2JdPXtzZXR1cDpmdW5jdGlvbigpe3ZhciBkPXRoaXMub3duZXJEb2N1bWVudHx8dGhpcyxlPUwuYWNjZXNzKGQsYik7ZXx8ZC5hZGRFdmVudExpc3RlbmVyKGEsYywhMCksTC5hY2Nlc3MoZCxiLChlfHwwKSsxKX0sdGVhcmRvd246ZnVuY3Rpb24oKXt2YXIgZD10aGlzLm93bmVyRG9jdW1lbnR8fHRoaXMsZT1MLmFjY2VzcyhkLGIpLTE7ZT9MLmFjY2VzcyhkLGIsZSk6KGQucmVtb3ZlRXZlbnRMaXN0ZW5lcihhLGMsITApLEwucmVtb3ZlKGQsYikpfX19KSxvLmZuLmV4dGVuZCh7b246ZnVuY3Rpb24oYSxiLGMsZCxlKXt2YXIgZixnO2lmKFwib2JqZWN0XCI9PXR5cGVvZiBhKXtcInN0cmluZ1wiIT10eXBlb2YgYiYmKGM9Y3x8YixiPXZvaWQgMCk7Zm9yKGcgaW4gYSl0aGlzLm9uKGcsYixjLGFbZ10sZSk7cmV0dXJuIHRoaXN9aWYobnVsbD09YyYmbnVsbD09ZD8oZD1iLGM9Yj12b2lkIDApOm51bGw9PWQmJihcInN0cmluZ1wiPT10eXBlb2YgYj8oZD1jLGM9dm9pZCAwKTooZD1jLGM9YixiPXZvaWQgMCkpLGQ9PT0hMSlkPSQ7ZWxzZSBpZighZClyZXR1cm4gdGhpcztyZXR1cm4gMT09PWUmJihmPWQsZD1mdW5jdGlvbihhKXtyZXR1cm4gbygpLm9mZihhKSxmLmFwcGx5KHRoaXMsYXJndW1lbnRzKX0sZC5ndWlkPWYuZ3VpZHx8KGYuZ3VpZD1vLmd1aWQrKykpLHRoaXMuZWFjaChmdW5jdGlvbigpe28uZXZlbnQuYWRkKHRoaXMsYSxkLGMsYil9KX0sb25lOmZ1bmN0aW9uKGEsYixjLGQpe3JldHVybiB0aGlzLm9uKGEsYixjLGQsMSl9LG9mZjpmdW5jdGlvbihhLGIsYyl7dmFyIGQsZTtpZihhJiZhLnByZXZlbnREZWZhdWx0JiZhLmhhbmRsZU9iailyZXR1cm4gZD1hLmhhbmRsZU9iaixvKGEuZGVsZWdhdGVUYXJnZXQpLm9mZihkLm5hbWVzcGFjZT9kLm9yaWdUeXBlK1wiLlwiK2QubmFtZXNwYWNlOmQub3JpZ1R5cGUsZC5zZWxlY3RvcixkLmhhbmRsZXIpLHRoaXM7aWYoXCJvYmplY3RcIj09dHlwZW9mIGEpe2ZvcihlIGluIGEpdGhpcy5vZmYoZSxiLGFbZV0pO3JldHVybiB0aGlzfXJldHVybihiPT09ITF8fFwiZnVuY3Rpb25cIj09dHlwZW9mIGIpJiYoYz1iLGI9dm9pZCAwKSxjPT09ITEmJihjPSQpLHRoaXMuZWFjaChmdW5jdGlvbigpe28uZXZlbnQucmVtb3ZlKHRoaXMsYSxjLGIpfSl9LHRyaWdnZXI6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7by5ldmVudC50cmlnZ2VyKGEsYix0aGlzKX0pfSx0cmlnZ2VySGFuZGxlcjpmdW5jdGlvbihhLGIpe3ZhciBjPXRoaXNbMF07cmV0dXJuIGM/by5ldmVudC50cmlnZ2VyKGEsYixjLCEwKTp2b2lkIDB9fSk7dmFyIGFiPS88KD8hYXJlYXxicnxjb2x8ZW1iZWR8aHJ8aW1nfGlucHV0fGxpbmt8bWV0YXxwYXJhbSkoKFtcXHc6XSspW14+XSopXFwvPi9naSxiYj0vPChbXFx3Ol0rKS8sY2I9Lzx8JiM/XFx3KzsvLGRiPS88KD86c2NyaXB0fHN0eWxlfGxpbmspL2ksZWI9L2NoZWNrZWRcXHMqKD86W149XXw9XFxzKi5jaGVja2VkLikvaSxmYj0vXiR8XFwvKD86amF2YXxlY21hKXNjcmlwdC9pLGdiPS9edHJ1ZVxcLyguKikvLGhiPS9eXFxzKjwhKD86XFxbQ0RBVEFcXFt8LS0pfCg/OlxcXVxcXXwtLSk+XFxzKiQvZyxpYj17b3B0aW9uOlsxLFwiPHNlbGVjdCBtdWx0aXBsZT0nbXVsdGlwbGUnPlwiLFwiPC9zZWxlY3Q+XCJdLHRoZWFkOlsxLFwiPHRhYmxlPlwiLFwiPC90YWJsZT5cIl0sY29sOlsyLFwiPHRhYmxlPjxjb2xncm91cD5cIixcIjwvY29sZ3JvdXA+PC90YWJsZT5cIl0sdHI6WzIsXCI8dGFibGU+PHRib2R5PlwiLFwiPC90Ym9keT48L3RhYmxlPlwiXSx0ZDpbMyxcIjx0YWJsZT48dGJvZHk+PHRyPlwiLFwiPC90cj48L3Rib2R5PjwvdGFibGU+XCJdLF9kZWZhdWx0OlswLFwiXCIsXCJcIl19O2liLm9wdGdyb3VwPWliLm9wdGlvbixpYi50Ym9keT1pYi50Zm9vdD1pYi5jb2xncm91cD1pYi5jYXB0aW9uPWliLnRoZWFkLGliLnRoPWliLnRkO2Z1bmN0aW9uIGpiKGEsYil7cmV0dXJuIG8ubm9kZU5hbWUoYSxcInRhYmxlXCIpJiZvLm5vZGVOYW1lKDExIT09Yi5ub2RlVHlwZT9iOmIuZmlyc3RDaGlsZCxcInRyXCIpP2EuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0Ym9keVwiKVswXXx8YS5hcHBlbmRDaGlsZChhLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRib2R5XCIpKTphfWZ1bmN0aW9uIGtiKGEpe3JldHVybiBhLnR5cGU9KG51bGwhPT1hLmdldEF0dHJpYnV0ZShcInR5cGVcIikpK1wiL1wiK2EudHlwZSxhfWZ1bmN0aW9uIGxiKGEpe3ZhciBiPWdiLmV4ZWMoYS50eXBlKTtyZXR1cm4gYj9hLnR5cGU9YlsxXTphLnJlbW92ZUF0dHJpYnV0ZShcInR5cGVcIiksYX1mdW5jdGlvbiBtYihhLGIpe2Zvcih2YXIgYz0wLGQ9YS5sZW5ndGg7ZD5jO2MrKylMLnNldChhW2NdLFwiZ2xvYmFsRXZhbFwiLCFifHxMLmdldChiW2NdLFwiZ2xvYmFsRXZhbFwiKSl9ZnVuY3Rpb24gbmIoYSxiKXt2YXIgYyxkLGUsZixnLGgsaSxqO2lmKDE9PT1iLm5vZGVUeXBlKXtpZihMLmhhc0RhdGEoYSkmJihmPUwuYWNjZXNzKGEpLGc9TC5zZXQoYixmKSxqPWYuZXZlbnRzKSl7ZGVsZXRlIGcuaGFuZGxlLGcuZXZlbnRzPXt9O2ZvcihlIGluIGopZm9yKGM9MCxkPWpbZV0ubGVuZ3RoO2Q+YztjKyspby5ldmVudC5hZGQoYixlLGpbZV1bY10pfU0uaGFzRGF0YShhKSYmKGg9TS5hY2Nlc3MoYSksaT1vLmV4dGVuZCh7fSxoKSxNLnNldChiLGkpKX19ZnVuY3Rpb24gb2IoYSxiKXt2YXIgYz1hLmdldEVsZW1lbnRzQnlUYWdOYW1lP2EuZ2V0RWxlbWVudHNCeVRhZ05hbWUoYnx8XCIqXCIpOmEucXVlcnlTZWxlY3RvckFsbD9hLnF1ZXJ5U2VsZWN0b3JBbGwoYnx8XCIqXCIpOltdO3JldHVybiB2b2lkIDA9PT1ifHxiJiZvLm5vZGVOYW1lKGEsYik/by5tZXJnZShbYV0sYyk6Y31mdW5jdGlvbiBwYihhLGIpe3ZhciBjPWIubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcImlucHV0XCI9PT1jJiZULnRlc3QoYS50eXBlKT9iLmNoZWNrZWQ9YS5jaGVja2VkOihcImlucHV0XCI9PT1jfHxcInRleHRhcmVhXCI9PT1jKSYmKGIuZGVmYXVsdFZhbHVlPWEuZGVmYXVsdFZhbHVlKX1vLmV4dGVuZCh7Y2xvbmU6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkLGUsZixnLGg9YS5jbG9uZU5vZGUoITApLGk9by5jb250YWlucyhhLm93bmVyRG9jdW1lbnQsYSk7aWYoIShsLm5vQ2xvbmVDaGVja2VkfHwxIT09YS5ub2RlVHlwZSYmMTEhPT1hLm5vZGVUeXBlfHxvLmlzWE1MRG9jKGEpKSlmb3IoZz1vYihoKSxmPW9iKGEpLGQ9MCxlPWYubGVuZ3RoO2U+ZDtkKyspcGIoZltkXSxnW2RdKTtpZihiKWlmKGMpZm9yKGY9Znx8b2IoYSksZz1nfHxvYihoKSxkPTAsZT1mLmxlbmd0aDtlPmQ7ZCsrKW5iKGZbZF0sZ1tkXSk7ZWxzZSBuYihhLGgpO3JldHVybiBnPW9iKGgsXCJzY3JpcHRcIiksZy5sZW5ndGg+MCYmbWIoZywhaSYmb2IoYSxcInNjcmlwdFwiKSksaH0sYnVpbGRGcmFnbWVudDpmdW5jdGlvbihhLGIsYyxkKXtmb3IodmFyIGUsZixnLGgsaSxqLGs9Yi5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksbD1bXSxtPTAsbj1hLmxlbmd0aDtuPm07bSsrKWlmKGU9YVttXSxlfHwwPT09ZSlpZihcIm9iamVjdFwiPT09by50eXBlKGUpKW8ubWVyZ2UobCxlLm5vZGVUeXBlP1tlXTplKTtlbHNlIGlmKGNiLnRlc3QoZSkpe2Y9Znx8ay5hcHBlbmRDaGlsZChiLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpLGc9KGJiLmV4ZWMoZSl8fFtcIlwiLFwiXCJdKVsxXS50b0xvd2VyQ2FzZSgpLGg9aWJbZ118fGliLl9kZWZhdWx0LGYuaW5uZXJIVE1MPWhbMV0rZS5yZXBsYWNlKGFiLFwiPCQxPjwvJDI+XCIpK2hbMl0saj1oWzBdO3doaWxlKGotLSlmPWYubGFzdENoaWxkO28ubWVyZ2UobCxmLmNoaWxkTm9kZXMpLGY9ay5maXJzdENoaWxkLGYudGV4dENvbnRlbnQ9XCJcIn1lbHNlIGwucHVzaChiLmNyZWF0ZVRleHROb2RlKGUpKTtrLnRleHRDb250ZW50PVwiXCIsbT0wO3doaWxlKGU9bFttKytdKWlmKCghZHx8LTE9PT1vLmluQXJyYXkoZSxkKSkmJihpPW8uY29udGFpbnMoZS5vd25lckRvY3VtZW50LGUpLGY9b2Ioay5hcHBlbmRDaGlsZChlKSxcInNjcmlwdFwiKSxpJiZtYihmKSxjKSl7aj0wO3doaWxlKGU9ZltqKytdKWZiLnRlc3QoZS50eXBlfHxcIlwiKSYmYy5wdXNoKGUpfXJldHVybiBrfSxjbGVhbkRhdGE6ZnVuY3Rpb24oYSl7Zm9yKHZhciBiLGMsZCxlLGYsZyxoPW8uZXZlbnQuc3BlY2lhbCxpPTA7dm9pZCAwIT09KGM9YVtpXSk7aSsrKXtpZihvLmFjY2VwdERhdGEoYykmJihmPWNbTC5leHBhbmRvXSxmJiYoYj1MLmNhY2hlW2ZdKSkpe2lmKGQ9T2JqZWN0LmtleXMoYi5ldmVudHN8fHt9KSxkLmxlbmd0aClmb3IoZz0wO3ZvaWQgMCE9PShlPWRbZ10pO2crKyloW2VdP28uZXZlbnQucmVtb3ZlKGMsZSk6by5yZW1vdmVFdmVudChjLGUsYi5oYW5kbGUpO0wuY2FjaGVbZl0mJmRlbGV0ZSBMLmNhY2hlW2ZdfWRlbGV0ZSBNLmNhY2hlW2NbTS5leHBhbmRvXV19fX0pLG8uZm4uZXh0ZW5kKHt0ZXh0OmZ1bmN0aW9uKGEpe3JldHVybiBKKHRoaXMsZnVuY3Rpb24oYSl7cmV0dXJuIHZvaWQgMD09PWE/by50ZXh0KHRoaXMpOnRoaXMuZW1wdHkoKS5lYWNoKGZ1bmN0aW9uKCl7KDE9PT10aGlzLm5vZGVUeXBlfHwxMT09PXRoaXMubm9kZVR5cGV8fDk9PT10aGlzLm5vZGVUeXBlKSYmKHRoaXMudGV4dENvbnRlbnQ9YSl9KX0sbnVsbCxhLGFyZ3VtZW50cy5sZW5ndGgpfSxhcHBlbmQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5kb21NYW5pcChhcmd1bWVudHMsZnVuY3Rpb24oYSl7aWYoMT09PXRoaXMubm9kZVR5cGV8fDExPT09dGhpcy5ub2RlVHlwZXx8OT09PXRoaXMubm9kZVR5cGUpe3ZhciBiPWpiKHRoaXMsYSk7Yi5hcHBlbmRDaGlsZChhKX19KX0scHJlcGVuZDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmRvbU1hbmlwKGFyZ3VtZW50cyxmdW5jdGlvbihhKXtpZigxPT09dGhpcy5ub2RlVHlwZXx8MTE9PT10aGlzLm5vZGVUeXBlfHw5PT09dGhpcy5ub2RlVHlwZSl7dmFyIGI9amIodGhpcyxhKTtiLmluc2VydEJlZm9yZShhLGIuZmlyc3RDaGlsZCl9fSl9LGJlZm9yZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmRvbU1hbmlwKGFyZ3VtZW50cyxmdW5jdGlvbihhKXt0aGlzLnBhcmVudE5vZGUmJnRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYSx0aGlzKX0pfSxhZnRlcjpmdW5jdGlvbigpe3JldHVybiB0aGlzLmRvbU1hbmlwKGFyZ3VtZW50cyxmdW5jdGlvbihhKXt0aGlzLnBhcmVudE5vZGUmJnRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYSx0aGlzLm5leHRTaWJsaW5nKX0pfSxyZW1vdmU6ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGMsZD1hP28uZmlsdGVyKGEsdGhpcyk6dGhpcyxlPTA7bnVsbCE9KGM9ZFtlXSk7ZSsrKWJ8fDEhPT1jLm5vZGVUeXBlfHxvLmNsZWFuRGF0YShvYihjKSksYy5wYXJlbnROb2RlJiYoYiYmby5jb250YWlucyhjLm93bmVyRG9jdW1lbnQsYykmJm1iKG9iKGMsXCJzY3JpcHRcIikpLGMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjKSk7cmV0dXJuIHRoaXN9LGVtcHR5OmZ1bmN0aW9uKCl7Zm9yKHZhciBhLGI9MDtudWxsIT0oYT10aGlzW2JdKTtiKyspMT09PWEubm9kZVR5cGUmJihvLmNsZWFuRGF0YShvYihhLCExKSksYS50ZXh0Q29udGVudD1cIlwiKTtyZXR1cm4gdGhpc30sY2xvbmU6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gYT1udWxsPT1hPyExOmEsYj1udWxsPT1iP2E6Yix0aGlzLm1hcChmdW5jdGlvbigpe3JldHVybiBvLmNsb25lKHRoaXMsYSxiKX0pfSxodG1sOmZ1bmN0aW9uKGEpe3JldHVybiBKKHRoaXMsZnVuY3Rpb24oYSl7dmFyIGI9dGhpc1swXXx8e30sYz0wLGQ9dGhpcy5sZW5ndGg7aWYodm9pZCAwPT09YSYmMT09PWIubm9kZVR5cGUpcmV0dXJuIGIuaW5uZXJIVE1MO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBhJiYhZGIudGVzdChhKSYmIWliWyhiYi5leGVjKGEpfHxbXCJcIixcIlwiXSlbMV0udG9Mb3dlckNhc2UoKV0pe2E9YS5yZXBsYWNlKGFiLFwiPCQxPjwvJDI+XCIpO3RyeXtmb3IoO2Q+YztjKyspYj10aGlzW2NdfHx7fSwxPT09Yi5ub2RlVHlwZSYmKG8uY2xlYW5EYXRhKG9iKGIsITEpKSxiLmlubmVySFRNTD1hKTtiPTB9Y2F0Y2goZSl7fX1iJiZ0aGlzLmVtcHR5KCkuYXBwZW5kKGEpfSxudWxsLGEsYXJndW1lbnRzLmxlbmd0aCl9LHJlcGxhY2VXaXRoOmZ1bmN0aW9uKCl7dmFyIGE9YXJndW1lbnRzWzBdO3JldHVybiB0aGlzLmRvbU1hbmlwKGFyZ3VtZW50cyxmdW5jdGlvbihiKXthPXRoaXMucGFyZW50Tm9kZSxvLmNsZWFuRGF0YShvYih0aGlzKSksYSYmYS5yZXBsYWNlQ2hpbGQoYix0aGlzKX0pLGEmJihhLmxlbmd0aHx8YS5ub2RlVHlwZSk/dGhpczp0aGlzLnJlbW92ZSgpfSxkZXRhY2g6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMucmVtb3ZlKGEsITApfSxkb21NYW5pcDpmdW5jdGlvbihhLGIpe2E9ZS5hcHBseShbXSxhKTt2YXIgYyxkLGYsZyxoLGksaj0wLGs9dGhpcy5sZW5ndGgsbT10aGlzLG49ay0xLHA9YVswXSxxPW8uaXNGdW5jdGlvbihwKTtpZihxfHxrPjEmJlwic3RyaW5nXCI9PXR5cGVvZiBwJiYhbC5jaGVja0Nsb25lJiZlYi50ZXN0KHApKXJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oYyl7dmFyIGQ9bS5lcShjKTtxJiYoYVswXT1wLmNhbGwodGhpcyxjLGQuaHRtbCgpKSksZC5kb21NYW5pcChhLGIpfSk7aWYoayYmKGM9by5idWlsZEZyYWdtZW50KGEsdGhpc1swXS5vd25lckRvY3VtZW50LCExLHRoaXMpLGQ9Yy5maXJzdENoaWxkLDE9PT1jLmNoaWxkTm9kZXMubGVuZ3RoJiYoYz1kKSxkKSl7Zm9yKGY9by5tYXAob2IoYyxcInNjcmlwdFwiKSxrYiksZz1mLmxlbmd0aDtrPmo7aisrKWg9YyxqIT09biYmKGg9by5jbG9uZShoLCEwLCEwKSxnJiZvLm1lcmdlKGYsb2IoaCxcInNjcmlwdFwiKSkpLGIuY2FsbCh0aGlzW2pdLGgsaik7aWYoZylmb3IoaT1mW2YubGVuZ3RoLTFdLm93bmVyRG9jdW1lbnQsby5tYXAoZixsYiksaj0wO2c+ajtqKyspaD1mW2pdLGZiLnRlc3QoaC50eXBlfHxcIlwiKSYmIUwuYWNjZXNzKGgsXCJnbG9iYWxFdmFsXCIpJiZvLmNvbnRhaW5zKGksaCkmJihoLnNyYz9vLl9ldmFsVXJsJiZvLl9ldmFsVXJsKGguc3JjKTpvLmdsb2JhbEV2YWwoaC50ZXh0Q29udGVudC5yZXBsYWNlKGhiLFwiXCIpKSl9cmV0dXJuIHRoaXN9fSksby5lYWNoKHthcHBlbmRUbzpcImFwcGVuZFwiLHByZXBlbmRUbzpcInByZXBlbmRcIixpbnNlcnRCZWZvcmU6XCJiZWZvcmVcIixpbnNlcnRBZnRlcjpcImFmdGVyXCIscmVwbGFjZUFsbDpcInJlcGxhY2VXaXRoXCJ9LGZ1bmN0aW9uKGEsYil7by5mblthXT1mdW5jdGlvbihhKXtmb3IodmFyIGMsZD1bXSxlPW8oYSksZz1lLmxlbmd0aC0xLGg9MDtnPj1oO2grKyljPWg9PT1nP3RoaXM6dGhpcy5jbG9uZSghMCksbyhlW2hdKVtiXShjKSxmLmFwcGx5KGQsYy5nZXQoKSk7cmV0dXJuIHRoaXMucHVzaFN0YWNrKGQpfX0pO3ZhciBxYixyYj17fTtmdW5jdGlvbiBzYihiLGMpe3ZhciBkPW8oYy5jcmVhdGVFbGVtZW50KGIpKS5hcHBlbmRUbyhjLmJvZHkpLGU9YS5nZXREZWZhdWx0Q29tcHV0ZWRTdHlsZT9hLmdldERlZmF1bHRDb21wdXRlZFN0eWxlKGRbMF0pLmRpc3BsYXk6by5jc3MoZFswXSxcImRpc3BsYXlcIik7cmV0dXJuIGQuZGV0YWNoKCksZX1mdW5jdGlvbiB0YihhKXt2YXIgYj1tLGM9cmJbYV07cmV0dXJuIGN8fChjPXNiKGEsYiksXCJub25lXCIhPT1jJiZjfHwocWI9KHFifHxvKFwiPGlmcmFtZSBmcmFtZWJvcmRlcj0nMCcgd2lkdGg9JzAnIGhlaWdodD0nMCcvPlwiKSkuYXBwZW5kVG8oYi5kb2N1bWVudEVsZW1lbnQpLGI9cWJbMF0uY29udGVudERvY3VtZW50LGIud3JpdGUoKSxiLmNsb3NlKCksYz1zYihhLGIpLHFiLmRldGFjaCgpKSxyYlthXT1jKSxjfXZhciB1Yj0vXm1hcmdpbi8sdmI9bmV3IFJlZ0V4cChcIl4oXCIrUStcIikoPyFweClbYS16JV0rJFwiLFwiaVwiKSx3Yj1mdW5jdGlvbihhKXtyZXR1cm4gYS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoYSxudWxsKX07ZnVuY3Rpb24geGIoYSxiLGMpe3ZhciBkLGUsZixnLGg9YS5zdHlsZTtyZXR1cm4gYz1jfHx3YihhKSxjJiYoZz1jLmdldFByb3BlcnR5VmFsdWUoYil8fGNbYl0pLGMmJihcIlwiIT09Z3x8by5jb250YWlucyhhLm93bmVyRG9jdW1lbnQsYSl8fChnPW8uc3R5bGUoYSxiKSksdmIudGVzdChnKSYmdWIudGVzdChiKSYmKGQ9aC53aWR0aCxlPWgubWluV2lkdGgsZj1oLm1heFdpZHRoLGgubWluV2lkdGg9aC5tYXhXaWR0aD1oLndpZHRoPWcsZz1jLndpZHRoLGgud2lkdGg9ZCxoLm1pbldpZHRoPWUsaC5tYXhXaWR0aD1mKSksdm9pZCAwIT09Zz9nK1wiXCI6Z31mdW5jdGlvbiB5YihhLGIpe3JldHVybntnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gYSgpP3ZvaWQgZGVsZXRlIHRoaXMuZ2V0Oih0aGlzLmdldD1iKS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fX0hZnVuY3Rpb24oKXt2YXIgYixjLGQ9XCJwYWRkaW5nOjA7bWFyZ2luOjA7Ym9yZGVyOjA7ZGlzcGxheTpibG9jazstd2Via2l0LWJveC1zaXppbmc6Y29udGVudC1ib3g7LW1vei1ib3gtc2l6aW5nOmNvbnRlbnQtYm94O2JveC1zaXppbmc6Y29udGVudC1ib3hcIixlPW0uZG9jdW1lbnRFbGVtZW50LGY9bS5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLGc9bS5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2cuc3R5bGUuYmFja2dyb3VuZENsaXA9XCJjb250ZW50LWJveFwiLGcuY2xvbmVOb2RlKCEwKS5zdHlsZS5iYWNrZ3JvdW5kQ2xpcD1cIlwiLGwuY2xlYXJDbG9uZVN0eWxlPVwiY29udGVudC1ib3hcIj09PWcuc3R5bGUuYmFja2dyb3VuZENsaXAsZi5zdHlsZS5jc3NUZXh0PVwiYm9yZGVyOjA7d2lkdGg6MDtoZWlnaHQ6MDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0Oi05OTk5cHg7bWFyZ2luLXRvcDoxcHhcIixmLmFwcGVuZENoaWxkKGcpO2Z1bmN0aW9uIGgoKXtnLnN0eWxlLmNzc1RleHQ9XCItd2Via2l0LWJveC1zaXppbmc6Ym9yZGVyLWJveDstbW96LWJveC1zaXppbmc6Ym9yZGVyLWJveDtib3gtc2l6aW5nOmJvcmRlci1ib3g7cGFkZGluZzoxcHg7Ym9yZGVyOjFweDtkaXNwbGF5OmJsb2NrO3dpZHRoOjRweDttYXJnaW4tdG9wOjElO3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxJVwiLGUuYXBwZW5kQ2hpbGQoZik7dmFyIGQ9YS5nZXRDb21wdXRlZFN0eWxlKGcsbnVsbCk7Yj1cIjElXCIhPT1kLnRvcCxjPVwiNHB4XCI9PT1kLndpZHRoLGUucmVtb3ZlQ2hpbGQoZil9YS5nZXRDb21wdXRlZFN0eWxlJiZvLmV4dGVuZChsLHtwaXhlbFBvc2l0aW9uOmZ1bmN0aW9uKCl7cmV0dXJuIGgoKSxifSxib3hTaXppbmdSZWxpYWJsZTpmdW5jdGlvbigpe3JldHVybiBudWxsPT1jJiZoKCksY30scmVsaWFibGVNYXJnaW5SaWdodDpmdW5jdGlvbigpe3ZhciBiLGM9Zy5hcHBlbmRDaGlsZChtLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO3JldHVybiBjLnN0eWxlLmNzc1RleHQ9Zy5zdHlsZS5jc3NUZXh0PWQsYy5zdHlsZS5tYXJnaW5SaWdodD1jLnN0eWxlLndpZHRoPVwiMFwiLGcuc3R5bGUud2lkdGg9XCIxcHhcIixlLmFwcGVuZENoaWxkKGYpLGI9IXBhcnNlRmxvYXQoYS5nZXRDb21wdXRlZFN0eWxlKGMsbnVsbCkubWFyZ2luUmlnaHQpLGUucmVtb3ZlQ2hpbGQoZiksZy5pbm5lckhUTUw9XCJcIixifX0pfSgpLG8uc3dhcD1mdW5jdGlvbihhLGIsYyxkKXt2YXIgZSxmLGc9e307Zm9yKGYgaW4gYilnW2ZdPWEuc3R5bGVbZl0sYS5zdHlsZVtmXT1iW2ZdO2U9Yy5hcHBseShhLGR8fFtdKTtmb3IoZiBpbiBiKWEuc3R5bGVbZl09Z1tmXTtyZXR1cm4gZX07dmFyIHpiPS9eKG5vbmV8dGFibGUoPyEtY1tlYV0pLispLyxBYj1uZXcgUmVnRXhwKFwiXihcIitRK1wiKSguKikkXCIsXCJpXCIpLEJiPW5ldyBSZWdFeHAoXCJeKFsrLV0pPShcIitRK1wiKVwiLFwiaVwiKSxDYj17cG9zaXRpb246XCJhYnNvbHV0ZVwiLHZpc2liaWxpdHk6XCJoaWRkZW5cIixkaXNwbGF5OlwiYmxvY2tcIn0sRGI9e2xldHRlclNwYWNpbmc6MCxmb250V2VpZ2h0OjQwMH0sRWI9W1wiV2Via2l0XCIsXCJPXCIsXCJNb3pcIixcIm1zXCJdO2Z1bmN0aW9uIEZiKGEsYil7aWYoYiBpbiBhKXJldHVybiBiO3ZhciBjPWJbMF0udG9VcHBlckNhc2UoKStiLnNsaWNlKDEpLGQ9YixlPUViLmxlbmd0aDt3aGlsZShlLS0paWYoYj1FYltlXStjLGIgaW4gYSlyZXR1cm4gYjtyZXR1cm4gZH1mdW5jdGlvbiBHYihhLGIsYyl7dmFyIGQ9QWIuZXhlYyhiKTtyZXR1cm4gZD9NYXRoLm1heCgwLGRbMV0tKGN8fDApKSsoZFsyXXx8XCJweFwiKTpifWZ1bmN0aW9uIEhiKGEsYixjLGQsZSl7Zm9yKHZhciBmPWM9PT0oZD9cImJvcmRlclwiOlwiY29udGVudFwiKT80Olwid2lkdGhcIj09PWI/MTowLGc9MDs0PmY7Zis9MilcIm1hcmdpblwiPT09YyYmKGcrPW8uY3NzKGEsYytSW2ZdLCEwLGUpKSxkPyhcImNvbnRlbnRcIj09PWMmJihnLT1vLmNzcyhhLFwicGFkZGluZ1wiK1JbZl0sITAsZSkpLFwibWFyZ2luXCIhPT1jJiYoZy09by5jc3MoYSxcImJvcmRlclwiK1JbZl0rXCJXaWR0aFwiLCEwLGUpKSk6KGcrPW8uY3NzKGEsXCJwYWRkaW5nXCIrUltmXSwhMCxlKSxcInBhZGRpbmdcIiE9PWMmJihnKz1vLmNzcyhhLFwiYm9yZGVyXCIrUltmXStcIldpZHRoXCIsITAsZSkpKTtyZXR1cm4gZ31mdW5jdGlvbiBJYihhLGIsYyl7dmFyIGQ9ITAsZT1cIndpZHRoXCI9PT1iP2Eub2Zmc2V0V2lkdGg6YS5vZmZzZXRIZWlnaHQsZj13YihhKSxnPVwiYm9yZGVyLWJveFwiPT09by5jc3MoYSxcImJveFNpemluZ1wiLCExLGYpO2lmKDA+PWV8fG51bGw9PWUpe2lmKGU9eGIoYSxiLGYpLCgwPmV8fG51bGw9PWUpJiYoZT1hLnN0eWxlW2JdKSx2Yi50ZXN0KGUpKXJldHVybiBlO2Q9ZyYmKGwuYm94U2l6aW5nUmVsaWFibGUoKXx8ZT09PWEuc3R5bGVbYl0pLGU9cGFyc2VGbG9hdChlKXx8MH1yZXR1cm4gZStIYihhLGIsY3x8KGc/XCJib3JkZXJcIjpcImNvbnRlbnRcIiksZCxmKStcInB4XCJ9ZnVuY3Rpb24gSmIoYSxiKXtmb3IodmFyIGMsZCxlLGY9W10sZz0wLGg9YS5sZW5ndGg7aD5nO2crKylkPWFbZ10sZC5zdHlsZSYmKGZbZ109TC5nZXQoZCxcIm9sZGRpc3BsYXlcIiksYz1kLnN0eWxlLmRpc3BsYXksYj8oZltnXXx8XCJub25lXCIhPT1jfHwoZC5zdHlsZS5kaXNwbGF5PVwiXCIpLFwiXCI9PT1kLnN0eWxlLmRpc3BsYXkmJlMoZCkmJihmW2ddPUwuYWNjZXNzKGQsXCJvbGRkaXNwbGF5XCIsdGIoZC5ub2RlTmFtZSkpKSk6ZltnXXx8KGU9UyhkKSwoYyYmXCJub25lXCIhPT1jfHwhZSkmJkwuc2V0KGQsXCJvbGRkaXNwbGF5XCIsZT9jOm8uY3NzKGQsXCJkaXNwbGF5XCIpKSkpO2ZvcihnPTA7aD5nO2crKylkPWFbZ10sZC5zdHlsZSYmKGImJlwibm9uZVwiIT09ZC5zdHlsZS5kaXNwbGF5JiZcIlwiIT09ZC5zdHlsZS5kaXNwbGF5fHwoZC5zdHlsZS5kaXNwbGF5PWI/ZltnXXx8XCJcIjpcIm5vbmVcIikpO3JldHVybiBhfW8uZXh0ZW5kKHtjc3NIb29rczp7b3BhY2l0eTp7Z2V0OmZ1bmN0aW9uKGEsYil7aWYoYil7dmFyIGM9eGIoYSxcIm9wYWNpdHlcIik7cmV0dXJuXCJcIj09PWM/XCIxXCI6Y319fX0sY3NzTnVtYmVyOntjb2x1bW5Db3VudDohMCxmaWxsT3BhY2l0eTohMCxmb250V2VpZ2h0OiEwLGxpbmVIZWlnaHQ6ITAsb3BhY2l0eTohMCxvcmRlcjohMCxvcnBoYW5zOiEwLHdpZG93czohMCx6SW5kZXg6ITAsem9vbTohMH0sY3NzUHJvcHM6e1wiZmxvYXRcIjpcImNzc0Zsb2F0XCJ9LHN0eWxlOmZ1bmN0aW9uKGEsYixjLGQpe2lmKGEmJjMhPT1hLm5vZGVUeXBlJiY4IT09YS5ub2RlVHlwZSYmYS5zdHlsZSl7dmFyIGUsZixnLGg9by5jYW1lbENhc2UoYiksaT1hLnN0eWxlO3JldHVybiBiPW8uY3NzUHJvcHNbaF18fChvLmNzc1Byb3BzW2hdPUZiKGksaCkpLGc9by5jc3NIb29rc1tiXXx8by5jc3NIb29rc1toXSx2b2lkIDA9PT1jP2cmJlwiZ2V0XCJpbiBnJiZ2b2lkIDAhPT0oZT1nLmdldChhLCExLGQpKT9lOmlbYl06KGY9dHlwZW9mIGMsXCJzdHJpbmdcIj09PWYmJihlPUJiLmV4ZWMoYykpJiYoYz0oZVsxXSsxKSplWzJdK3BhcnNlRmxvYXQoby5jc3MoYSxiKSksZj1cIm51bWJlclwiKSxudWxsIT1jJiZjPT09YyYmKFwibnVtYmVyXCIhPT1mfHxvLmNzc051bWJlcltoXXx8KGMrPVwicHhcIiksbC5jbGVhckNsb25lU3R5bGV8fFwiXCIhPT1jfHwwIT09Yi5pbmRleE9mKFwiYmFja2dyb3VuZFwiKXx8KGlbYl09XCJpbmhlcml0XCIpLGcmJlwic2V0XCJpbiBnJiZ2b2lkIDA9PT0oYz1nLnNldChhLGMsZCkpfHwoaVtiXT1cIlwiLGlbYl09YykpLHZvaWQgMCl9fSxjc3M6ZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGUsZixnLGg9by5jYW1lbENhc2UoYik7cmV0dXJuIGI9by5jc3NQcm9wc1toXXx8KG8uY3NzUHJvcHNbaF09RmIoYS5zdHlsZSxoKSksZz1vLmNzc0hvb2tzW2JdfHxvLmNzc0hvb2tzW2hdLGcmJlwiZ2V0XCJpbiBnJiYoZT1nLmdldChhLCEwLGMpKSx2b2lkIDA9PT1lJiYoZT14YihhLGIsZCkpLFwibm9ybWFsXCI9PT1lJiZiIGluIERiJiYoZT1EYltiXSksXCJcIj09PWN8fGM/KGY9cGFyc2VGbG9hdChlKSxjPT09ITB8fG8uaXNOdW1lcmljKGYpP2Z8fDA6ZSk6ZX19KSxvLmVhY2goW1wiaGVpZ2h0XCIsXCJ3aWR0aFwiXSxmdW5jdGlvbihhLGIpe28uY3NzSG9va3NbYl09e2dldDpmdW5jdGlvbihhLGMsZCl7cmV0dXJuIGM/MD09PWEub2Zmc2V0V2lkdGgmJnpiLnRlc3Qoby5jc3MoYSxcImRpc3BsYXlcIikpP28uc3dhcChhLENiLGZ1bmN0aW9uKCl7cmV0dXJuIEliKGEsYixkKX0pOkliKGEsYixkKTp2b2lkIDB9LHNldDpmdW5jdGlvbihhLGMsZCl7dmFyIGU9ZCYmd2IoYSk7cmV0dXJuIEdiKGEsYyxkP0hiKGEsYixkLFwiYm9yZGVyLWJveFwiPT09by5jc3MoYSxcImJveFNpemluZ1wiLCExLGUpLGUpOjApfX19KSxvLmNzc0hvb2tzLm1hcmdpblJpZ2h0PXliKGwucmVsaWFibGVNYXJnaW5SaWdodCxmdW5jdGlvbihhLGIpe3JldHVybiBiP28uc3dhcChhLHtkaXNwbGF5OlwiaW5saW5lLWJsb2NrXCJ9LHhiLFthLFwibWFyZ2luUmlnaHRcIl0pOnZvaWQgMH0pLG8uZWFjaCh7bWFyZ2luOlwiXCIscGFkZGluZzpcIlwiLGJvcmRlcjpcIldpZHRoXCJ9LGZ1bmN0aW9uKGEsYil7by5jc3NIb29rc1thK2JdPXtleHBhbmQ6ZnVuY3Rpb24oYyl7Zm9yKHZhciBkPTAsZT17fSxmPVwic3RyaW5nXCI9PXR5cGVvZiBjP2Muc3BsaXQoXCIgXCIpOltjXTs0PmQ7ZCsrKWVbYStSW2RdK2JdPWZbZF18fGZbZC0yXXx8ZlswXTtyZXR1cm4gZX19LHViLnRlc3QoYSl8fChvLmNzc0hvb2tzW2ErYl0uc2V0PUdiKX0pLG8uZm4uZXh0ZW5kKHtjc3M6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gSih0aGlzLGZ1bmN0aW9uKGEsYixjKXt2YXIgZCxlLGY9e30sZz0wO2lmKG8uaXNBcnJheShiKSl7Zm9yKGQ9d2IoYSksZT1iLmxlbmd0aDtlPmc7ZysrKWZbYltnXV09by5jc3MoYSxiW2ddLCExLGQpO3JldHVybiBmfXJldHVybiB2b2lkIDAhPT1jP28uc3R5bGUoYSxiLGMpOm8uY3NzKGEsYil9LGEsYixhcmd1bWVudHMubGVuZ3RoPjEpfSxzaG93OmZ1bmN0aW9uKCl7cmV0dXJuIEpiKHRoaXMsITApfSxoaWRlOmZ1bmN0aW9uKCl7cmV0dXJuIEpiKHRoaXMpfSx0b2dnbGU6ZnVuY3Rpb24oYSl7cmV0dXJuXCJib29sZWFuXCI9PXR5cGVvZiBhP2E/dGhpcy5zaG93KCk6dGhpcy5oaWRlKCk6dGhpcy5lYWNoKGZ1bmN0aW9uKCl7Uyh0aGlzKT9vKHRoaXMpLnNob3coKTpvKHRoaXMpLmhpZGUoKX0pfX0pO2Z1bmN0aW9uIEtiKGEsYixjLGQsZSl7cmV0dXJuIG5ldyBLYi5wcm90b3R5cGUuaW5pdChhLGIsYyxkLGUpfW8uVHdlZW49S2IsS2IucHJvdG90eXBlPXtjb25zdHJ1Y3RvcjpLYixpbml0OmZ1bmN0aW9uKGEsYixjLGQsZSxmKXt0aGlzLmVsZW09YSx0aGlzLnByb3A9Yyx0aGlzLmVhc2luZz1lfHxcInN3aW5nXCIsdGhpcy5vcHRpb25zPWIsdGhpcy5zdGFydD10aGlzLm5vdz10aGlzLmN1cigpLHRoaXMuZW5kPWQsdGhpcy51bml0PWZ8fChvLmNzc051bWJlcltjXT9cIlwiOlwicHhcIil9LGN1cjpmdW5jdGlvbigpe3ZhciBhPUtiLnByb3BIb29rc1t0aGlzLnByb3BdO3JldHVybiBhJiZhLmdldD9hLmdldCh0aGlzKTpLYi5wcm9wSG9va3MuX2RlZmF1bHQuZ2V0KHRoaXMpfSxydW46ZnVuY3Rpb24oYSl7dmFyIGIsYz1LYi5wcm9wSG9va3NbdGhpcy5wcm9wXTtyZXR1cm4gdGhpcy5wb3M9Yj10aGlzLm9wdGlvbnMuZHVyYXRpb24/by5lYXNpbmdbdGhpcy5lYXNpbmddKGEsdGhpcy5vcHRpb25zLmR1cmF0aW9uKmEsMCwxLHRoaXMub3B0aW9ucy5kdXJhdGlvbik6YSx0aGlzLm5vdz0odGhpcy5lbmQtdGhpcy5zdGFydCkqYit0aGlzLnN0YXJ0LHRoaXMub3B0aW9ucy5zdGVwJiZ0aGlzLm9wdGlvbnMuc3RlcC5jYWxsKHRoaXMuZWxlbSx0aGlzLm5vdyx0aGlzKSxjJiZjLnNldD9jLnNldCh0aGlzKTpLYi5wcm9wSG9va3MuX2RlZmF1bHQuc2V0KHRoaXMpLHRoaXN9fSxLYi5wcm90b3R5cGUuaW5pdC5wcm90b3R5cGU9S2IucHJvdG90eXBlLEtiLnByb3BIb29rcz17X2RlZmF1bHQ6e2dldDpmdW5jdGlvbihhKXt2YXIgYjtyZXR1cm4gbnVsbD09YS5lbGVtW2EucHJvcF18fGEuZWxlbS5zdHlsZSYmbnVsbCE9YS5lbGVtLnN0eWxlW2EucHJvcF0/KGI9by5jc3MoYS5lbGVtLGEucHJvcCxcIlwiKSxiJiZcImF1dG9cIiE9PWI/YjowKTphLmVsZW1bYS5wcm9wXX0sc2V0OmZ1bmN0aW9uKGEpe28uZnguc3RlcFthLnByb3BdP28uZnguc3RlcFthLnByb3BdKGEpOmEuZWxlbS5zdHlsZSYmKG51bGwhPWEuZWxlbS5zdHlsZVtvLmNzc1Byb3BzW2EucHJvcF1dfHxvLmNzc0hvb2tzW2EucHJvcF0pP28uc3R5bGUoYS5lbGVtLGEucHJvcCxhLm5vdythLnVuaXQpOmEuZWxlbVthLnByb3BdPWEubm93fX19LEtiLnByb3BIb29rcy5zY3JvbGxUb3A9S2IucHJvcEhvb2tzLnNjcm9sbExlZnQ9e3NldDpmdW5jdGlvbihhKXthLmVsZW0ubm9kZVR5cGUmJmEuZWxlbS5wYXJlbnROb2RlJiYoYS5lbGVtW2EucHJvcF09YS5ub3cpfX0sby5lYXNpbmc9e2xpbmVhcjpmdW5jdGlvbihhKXtyZXR1cm4gYX0sc3dpbmc6ZnVuY3Rpb24oYSl7cmV0dXJuLjUtTWF0aC5jb3MoYSpNYXRoLlBJKS8yfX0sby5meD1LYi5wcm90b3R5cGUuaW5pdCxvLmZ4LnN0ZXA9e307dmFyIExiLE1iLE5iPS9eKD86dG9nZ2xlfHNob3d8aGlkZSkkLyxPYj1uZXcgUmVnRXhwKFwiXig/OihbKy1dKT18KShcIitRK1wiKShbYS16JV0qKSRcIixcImlcIiksUGI9L3F1ZXVlSG9va3MkLyxRYj1bVmJdLFJiPXtcIipcIjpbZnVuY3Rpb24oYSxiKXt2YXIgYz10aGlzLmNyZWF0ZVR3ZWVuKGEsYiksZD1jLmN1cigpLGU9T2IuZXhlYyhiKSxmPWUmJmVbM118fChvLmNzc051bWJlclthXT9cIlwiOlwicHhcIiksZz0oby5jc3NOdW1iZXJbYV18fFwicHhcIiE9PWYmJitkKSYmT2IuZXhlYyhvLmNzcyhjLmVsZW0sYSkpLGg9MSxpPTIwO2lmKGcmJmdbM10hPT1mKXtmPWZ8fGdbM10sZT1lfHxbXSxnPStkfHwxO2RvIGg9aHx8XCIuNVwiLGcvPWgsby5zdHlsZShjLmVsZW0sYSxnK2YpO3doaWxlKGghPT0oaD1jLmN1cigpL2QpJiYxIT09aCYmLS1pKX1yZXR1cm4gZSYmKGc9Yy5zdGFydD0rZ3x8K2R8fDAsYy51bml0PWYsYy5lbmQ9ZVsxXT9nKyhlWzFdKzEpKmVbMl06K2VbMl0pLGN9XX07ZnVuY3Rpb24gU2IoKXtyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe0xiPXZvaWQgMH0pLExiPW8ubm93KCl9ZnVuY3Rpb24gVGIoYSxiKXt2YXIgYyxkPTAsZT17aGVpZ2h0OmF9O2ZvcihiPWI/MTowOzQ+ZDtkKz0yLWIpYz1SW2RdLGVbXCJtYXJnaW5cIitjXT1lW1wicGFkZGluZ1wiK2NdPWE7cmV0dXJuIGImJihlLm9wYWNpdHk9ZS53aWR0aD1hKSxlfWZ1bmN0aW9uIFViKGEsYixjKXtmb3IodmFyIGQsZT0oUmJbYl18fFtdKS5jb25jYXQoUmJbXCIqXCJdKSxmPTAsZz1lLmxlbmd0aDtnPmY7ZisrKWlmKGQ9ZVtmXS5jYWxsKGMsYixhKSlyZXR1cm4gZH1mdW5jdGlvbiBWYihhLGIsYyl7dmFyIGQsZSxmLGcsaCxpLGosaz10aGlzLGw9e30sbT1hLnN0eWxlLG49YS5ub2RlVHlwZSYmUyhhKSxwPUwuZ2V0KGEsXCJmeHNob3dcIik7Yy5xdWV1ZXx8KGg9by5fcXVldWVIb29rcyhhLFwiZnhcIiksbnVsbD09aC51bnF1ZXVlZCYmKGgudW5xdWV1ZWQ9MCxpPWguZW1wdHkuZmlyZSxoLmVtcHR5LmZpcmU9ZnVuY3Rpb24oKXtoLnVucXVldWVkfHxpKCl9KSxoLnVucXVldWVkKyssay5hbHdheXMoZnVuY3Rpb24oKXtrLmFsd2F5cyhmdW5jdGlvbigpe2gudW5xdWV1ZWQtLSxvLnF1ZXVlKGEsXCJmeFwiKS5sZW5ndGh8fGguZW1wdHkuZmlyZSgpfSl9KSksMT09PWEubm9kZVR5cGUmJihcImhlaWdodFwiaW4gYnx8XCJ3aWR0aFwiaW4gYikmJihjLm92ZXJmbG93PVttLm92ZXJmbG93LG0ub3ZlcmZsb3dYLG0ub3ZlcmZsb3dZXSxqPW8uY3NzKGEsXCJkaXNwbGF5XCIpLFwibm9uZVwiPT09aiYmKGo9dGIoYS5ub2RlTmFtZSkpLFwiaW5saW5lXCI9PT1qJiZcIm5vbmVcIj09PW8uY3NzKGEsXCJmbG9hdFwiKSYmKG0uZGlzcGxheT1cImlubGluZS1ibG9ja1wiKSksYy5vdmVyZmxvdyYmKG0ub3ZlcmZsb3c9XCJoaWRkZW5cIixrLmFsd2F5cyhmdW5jdGlvbigpe20ub3ZlcmZsb3c9Yy5vdmVyZmxvd1swXSxtLm92ZXJmbG93WD1jLm92ZXJmbG93WzFdLG0ub3ZlcmZsb3dZPWMub3ZlcmZsb3dbMl19KSk7Zm9yKGQgaW4gYilpZihlPWJbZF0sTmIuZXhlYyhlKSl7aWYoZGVsZXRlIGJbZF0sZj1mfHxcInRvZ2dsZVwiPT09ZSxlPT09KG4/XCJoaWRlXCI6XCJzaG93XCIpKXtpZihcInNob3dcIiE9PWV8fCFwfHx2b2lkIDA9PT1wW2RdKWNvbnRpbnVlO249ITB9bFtkXT1wJiZwW2RdfHxvLnN0eWxlKGEsZCl9aWYoIW8uaXNFbXB0eU9iamVjdChsKSl7cD9cImhpZGRlblwiaW4gcCYmKG49cC5oaWRkZW4pOnA9TC5hY2Nlc3MoYSxcImZ4c2hvd1wiLHt9KSxmJiYocC5oaWRkZW49IW4pLG4/byhhKS5zaG93KCk6ay5kb25lKGZ1bmN0aW9uKCl7byhhKS5oaWRlKCl9KSxrLmRvbmUoZnVuY3Rpb24oKXt2YXIgYjtMLnJlbW92ZShhLFwiZnhzaG93XCIpO2ZvcihiIGluIGwpby5zdHlsZShhLGIsbFtiXSl9KTtmb3IoZCBpbiBsKWc9VWIobj9wW2RdOjAsZCxrKSxkIGluIHB8fChwW2RdPWcuc3RhcnQsbiYmKGcuZW5kPWcuc3RhcnQsZy5zdGFydD1cIndpZHRoXCI9PT1kfHxcImhlaWdodFwiPT09ZD8xOjApKX19ZnVuY3Rpb24gV2IoYSxiKXt2YXIgYyxkLGUsZixnO2ZvcihjIGluIGEpaWYoZD1vLmNhbWVsQ2FzZShjKSxlPWJbZF0sZj1hW2NdLG8uaXNBcnJheShmKSYmKGU9ZlsxXSxmPWFbY109ZlswXSksYyE9PWQmJihhW2RdPWYsZGVsZXRlIGFbY10pLGc9by5jc3NIb29rc1tkXSxnJiZcImV4cGFuZFwiaW4gZyl7Zj1nLmV4cGFuZChmKSxkZWxldGUgYVtkXTtmb3IoYyBpbiBmKWMgaW4gYXx8KGFbY109ZltjXSxiW2NdPWUpfWVsc2UgYltkXT1lfWZ1bmN0aW9uIFhiKGEsYixjKXt2YXIgZCxlLGY9MCxnPVFiLmxlbmd0aCxoPW8uRGVmZXJyZWQoKS5hbHdheXMoZnVuY3Rpb24oKXtkZWxldGUgaS5lbGVtfSksaT1mdW5jdGlvbigpe2lmKGUpcmV0dXJuITE7Zm9yKHZhciBiPUxifHxTYigpLGM9TWF0aC5tYXgoMCxqLnN0YXJ0VGltZStqLmR1cmF0aW9uLWIpLGQ9Yy9qLmR1cmF0aW9ufHwwLGY9MS1kLGc9MCxpPWoudHdlZW5zLmxlbmd0aDtpPmc7ZysrKWoudHdlZW5zW2ddLnJ1bihmKTtyZXR1cm4gaC5ub3RpZnlXaXRoKGEsW2osZixjXSksMT5mJiZpP2M6KGgucmVzb2x2ZVdpdGgoYSxbal0pLCExKX0saj1oLnByb21pc2Uoe2VsZW06YSxwcm9wczpvLmV4dGVuZCh7fSxiKSxvcHRzOm8uZXh0ZW5kKCEwLHtzcGVjaWFsRWFzaW5nOnt9fSxjKSxvcmlnaW5hbFByb3BlcnRpZXM6YixvcmlnaW5hbE9wdGlvbnM6YyxzdGFydFRpbWU6TGJ8fFNiKCksZHVyYXRpb246Yy5kdXJhdGlvbix0d2VlbnM6W10sY3JlYXRlVHdlZW46ZnVuY3Rpb24oYixjKXt2YXIgZD1vLlR3ZWVuKGEsai5vcHRzLGIsYyxqLm9wdHMuc3BlY2lhbEVhc2luZ1tiXXx8ai5vcHRzLmVhc2luZyk7cmV0dXJuIGoudHdlZW5zLnB1c2goZCksZH0sc3RvcDpmdW5jdGlvbihiKXt2YXIgYz0wLGQ9Yj9qLnR3ZWVucy5sZW5ndGg6MDtpZihlKXJldHVybiB0aGlzO2ZvcihlPSEwO2Q+YztjKyspai50d2VlbnNbY10ucnVuKDEpO3JldHVybiBiP2gucmVzb2x2ZVdpdGgoYSxbaixiXSk6aC5yZWplY3RXaXRoKGEsW2osYl0pLHRoaXN9fSksaz1qLnByb3BzO2ZvcihXYihrLGoub3B0cy5zcGVjaWFsRWFzaW5nKTtnPmY7ZisrKWlmKGQ9UWJbZl0uY2FsbChqLGEsayxqLm9wdHMpKXJldHVybiBkO3JldHVybiBvLm1hcChrLFViLGopLG8uaXNGdW5jdGlvbihqLm9wdHMuc3RhcnQpJiZqLm9wdHMuc3RhcnQuY2FsbChhLGopLG8uZngudGltZXIoby5leHRlbmQoaSx7ZWxlbTphLGFuaW06aixxdWV1ZTpqLm9wdHMucXVldWV9KSksai5wcm9ncmVzcyhqLm9wdHMucHJvZ3Jlc3MpLmRvbmUoai5vcHRzLmRvbmUsai5vcHRzLmNvbXBsZXRlKS5mYWlsKGoub3B0cy5mYWlsKS5hbHdheXMoai5vcHRzLmFsd2F5cyl9by5BbmltYXRpb249by5leHRlbmQoWGIse3R3ZWVuZXI6ZnVuY3Rpb24oYSxiKXtvLmlzRnVuY3Rpb24oYSk/KGI9YSxhPVtcIipcIl0pOmE9YS5zcGxpdChcIiBcIik7Zm9yKHZhciBjLGQ9MCxlPWEubGVuZ3RoO2U+ZDtkKyspYz1hW2RdLFJiW2NdPVJiW2NdfHxbXSxSYltjXS51bnNoaWZ0KGIpfSxwcmVmaWx0ZXI6ZnVuY3Rpb24oYSxiKXtiP1FiLnVuc2hpZnQoYSk6UWIucHVzaChhKX19KSxvLnNwZWVkPWZ1bmN0aW9uKGEsYixjKXt2YXIgZD1hJiZcIm9iamVjdFwiPT10eXBlb2YgYT9vLmV4dGVuZCh7fSxhKTp7Y29tcGxldGU6Y3x8IWMmJmJ8fG8uaXNGdW5jdGlvbihhKSYmYSxkdXJhdGlvbjphLGVhc2luZzpjJiZifHxiJiYhby5pc0Z1bmN0aW9uKGIpJiZifTtyZXR1cm4gZC5kdXJhdGlvbj1vLmZ4Lm9mZj8wOlwibnVtYmVyXCI9PXR5cGVvZiBkLmR1cmF0aW9uP2QuZHVyYXRpb246ZC5kdXJhdGlvbiBpbiBvLmZ4LnNwZWVkcz9vLmZ4LnNwZWVkc1tkLmR1cmF0aW9uXTpvLmZ4LnNwZWVkcy5fZGVmYXVsdCwobnVsbD09ZC5xdWV1ZXx8ZC5xdWV1ZT09PSEwKSYmKGQucXVldWU9XCJmeFwiKSxkLm9sZD1kLmNvbXBsZXRlLGQuY29tcGxldGU9ZnVuY3Rpb24oKXtvLmlzRnVuY3Rpb24oZC5vbGQpJiZkLm9sZC5jYWxsKHRoaXMpLGQucXVldWUmJm8uZGVxdWV1ZSh0aGlzLGQucXVldWUpfSxkfSxvLmZuLmV4dGVuZCh7ZmFkZVRvOmZ1bmN0aW9uKGEsYixjLGQpe3JldHVybiB0aGlzLmZpbHRlcihTKS5jc3MoXCJvcGFjaXR5XCIsMCkuc2hvdygpLmVuZCgpLmFuaW1hdGUoe29wYWNpdHk6Yn0sYSxjLGQpfSxhbmltYXRlOmZ1bmN0aW9uKGEsYixjLGQpe3ZhciBlPW8uaXNFbXB0eU9iamVjdChhKSxmPW8uc3BlZWQoYixjLGQpLGc9ZnVuY3Rpb24oKXt2YXIgYj1YYih0aGlzLG8uZXh0ZW5kKHt9LGEpLGYpOyhlfHxMLmdldCh0aGlzLFwiZmluaXNoXCIpKSYmYi5zdG9wKCEwKX07cmV0dXJuIGcuZmluaXNoPWcsZXx8Zi5xdWV1ZT09PSExP3RoaXMuZWFjaChnKTp0aGlzLnF1ZXVlKGYucXVldWUsZyl9LHN0b3A6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPWZ1bmN0aW9uKGEpe3ZhciBiPWEuc3RvcDtkZWxldGUgYS5zdG9wLGIoYyl9O3JldHVyblwic3RyaW5nXCIhPXR5cGVvZiBhJiYoYz1iLGI9YSxhPXZvaWQgMCksYiYmYSE9PSExJiZ0aGlzLnF1ZXVlKGF8fFwiZnhcIixbXSksdGhpcy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGI9ITAsZT1udWxsIT1hJiZhK1wicXVldWVIb29rc1wiLGY9by50aW1lcnMsZz1MLmdldCh0aGlzKTtpZihlKWdbZV0mJmdbZV0uc3RvcCYmZChnW2VdKTtlbHNlIGZvcihlIGluIGcpZ1tlXSYmZ1tlXS5zdG9wJiZQYi50ZXN0KGUpJiZkKGdbZV0pO2ZvcihlPWYubGVuZ3RoO2UtLTspZltlXS5lbGVtIT09dGhpc3x8bnVsbCE9YSYmZltlXS5xdWV1ZSE9PWF8fChmW2VdLmFuaW0uc3RvcChjKSxiPSExLGYuc3BsaWNlKGUsMSkpOyhifHwhYykmJm8uZGVxdWV1ZSh0aGlzLGEpfSl9LGZpbmlzaDpmdW5jdGlvbihhKXtyZXR1cm4gYSE9PSExJiYoYT1hfHxcImZ4XCIpLHRoaXMuZWFjaChmdW5jdGlvbigpe3ZhciBiLGM9TC5nZXQodGhpcyksZD1jW2ErXCJxdWV1ZVwiXSxlPWNbYStcInF1ZXVlSG9va3NcIl0sZj1vLnRpbWVycyxnPWQ/ZC5sZW5ndGg6MDtmb3IoYy5maW5pc2g9ITAsby5xdWV1ZSh0aGlzLGEsW10pLGUmJmUuc3RvcCYmZS5zdG9wLmNhbGwodGhpcywhMCksYj1mLmxlbmd0aDtiLS07KWZbYl0uZWxlbT09PXRoaXMmJmZbYl0ucXVldWU9PT1hJiYoZltiXS5hbmltLnN0b3AoITApLGYuc3BsaWNlKGIsMSkpO2ZvcihiPTA7Zz5iO2IrKylkW2JdJiZkW2JdLmZpbmlzaCYmZFtiXS5maW5pc2guY2FsbCh0aGlzKTtkZWxldGUgYy5maW5pc2h9KX19KSxvLmVhY2goW1widG9nZ2xlXCIsXCJzaG93XCIsXCJoaWRlXCJdLGZ1bmN0aW9uKGEsYil7dmFyIGM9by5mbltiXTtvLmZuW2JdPWZ1bmN0aW9uKGEsZCxlKXtyZXR1cm4gbnVsbD09YXx8XCJib29sZWFuXCI9PXR5cGVvZiBhP2MuYXBwbHkodGhpcyxhcmd1bWVudHMpOnRoaXMuYW5pbWF0ZShUYihiLCEwKSxhLGQsZSl9fSksby5lYWNoKHtzbGlkZURvd246VGIoXCJzaG93XCIpLHNsaWRlVXA6VGIoXCJoaWRlXCIpLHNsaWRlVG9nZ2xlOlRiKFwidG9nZ2xlXCIpLGZhZGVJbjp7b3BhY2l0eTpcInNob3dcIn0sZmFkZU91dDp7b3BhY2l0eTpcImhpZGVcIn0sZmFkZVRvZ2dsZTp7b3BhY2l0eTpcInRvZ2dsZVwifX0sZnVuY3Rpb24oYSxiKXtvLmZuW2FdPWZ1bmN0aW9uKGEsYyxkKXtyZXR1cm4gdGhpcy5hbmltYXRlKGIsYSxjLGQpfX0pLG8udGltZXJzPVtdLG8uZngudGljaz1mdW5jdGlvbigpe3ZhciBhLGI9MCxjPW8udGltZXJzO2ZvcihMYj1vLm5vdygpO2I8Yy5sZW5ndGg7YisrKWE9Y1tiXSxhKCl8fGNbYl0hPT1hfHxjLnNwbGljZShiLS0sMSk7Yy5sZW5ndGh8fG8uZnguc3RvcCgpLExiPXZvaWQgMH0sby5meC50aW1lcj1mdW5jdGlvbihhKXtvLnRpbWVycy5wdXNoKGEpLGEoKT9vLmZ4LnN0YXJ0KCk6by50aW1lcnMucG9wKCl9LG8uZnguaW50ZXJ2YWw9MTMsby5meC5zdGFydD1mdW5jdGlvbigpe01ifHwoTWI9c2V0SW50ZXJ2YWwoby5meC50aWNrLG8uZnguaW50ZXJ2YWwpKX0sby5meC5zdG9wPWZ1bmN0aW9uKCl7Y2xlYXJJbnRlcnZhbChNYiksTWI9bnVsbH0sby5meC5zcGVlZHM9e3Nsb3c6NjAwLGZhc3Q6MjAwLF9kZWZhdWx0OjQwMH0sby5mbi5kZWxheT1mdW5jdGlvbihhLGIpe3JldHVybiBhPW8uZng/by5meC5zcGVlZHNbYV18fGE6YSxiPWJ8fFwiZnhcIix0aGlzLnF1ZXVlKGIsZnVuY3Rpb24oYixjKXt2YXIgZD1zZXRUaW1lb3V0KGIsYSk7Yy5zdG9wPWZ1bmN0aW9uKCl7Y2xlYXJUaW1lb3V0KGQpfX0pfSxmdW5jdGlvbigpe3ZhciBhPW0uY3JlYXRlRWxlbWVudChcImlucHV0XCIpLGI9bS5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpLGM9Yi5hcHBlbmRDaGlsZChtLmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIikpO2EudHlwZT1cImNoZWNrYm94XCIsbC5jaGVja09uPVwiXCIhPT1hLnZhbHVlLGwub3B0U2VsZWN0ZWQ9Yy5zZWxlY3RlZCxiLmRpc2FibGVkPSEwLGwub3B0RGlzYWJsZWQ9IWMuZGlzYWJsZWQsYT1tLmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSxhLnZhbHVlPVwidFwiLGEudHlwZT1cInJhZGlvXCIsbC5yYWRpb1ZhbHVlPVwidFwiPT09YS52YWx1ZX0oKTt2YXIgWWIsWmIsJGI9by5leHByLmF0dHJIYW5kbGU7by5mbi5leHRlbmQoe2F0dHI6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gSih0aGlzLG8uYXR0cixhLGIsYXJndW1lbnRzLmxlbmd0aD4xKX0scmVtb3ZlQXR0cjpmdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7by5yZW1vdmVBdHRyKHRoaXMsYSl9KX19KSxvLmV4dGVuZCh7YXR0cjpmdW5jdGlvbihhLGIsYyl7dmFyIGQsZSxmPWEubm9kZVR5cGU7aWYoYSYmMyE9PWYmJjghPT1mJiYyIT09ZilyZXR1cm4gdHlwZW9mIGEuZ2V0QXR0cmlidXRlPT09VT9vLnByb3AoYSxiLGMpOigxPT09ZiYmby5pc1hNTERvYyhhKXx8KGI9Yi50b0xvd2VyQ2FzZSgpLGQ9by5hdHRySG9va3NbYl18fChvLmV4cHIubWF0Y2guYm9vbC50ZXN0KGIpP1piOlliKSksdm9pZCAwPT09Yz9kJiZcImdldFwiaW4gZCYmbnVsbCE9PShlPWQuZ2V0KGEsYikpP2U6KGU9by5maW5kLmF0dHIoYSxiKSxudWxsPT1lP3ZvaWQgMDplKTpudWxsIT09Yz9kJiZcInNldFwiaW4gZCYmdm9pZCAwIT09KGU9ZC5zZXQoYSxjLGIpKT9lOihhLnNldEF0dHJpYnV0ZShiLGMrXCJcIiksYyk6dm9pZCBvLnJlbW92ZUF0dHIoYSxiKSl9LHJlbW92ZUF0dHI6ZnVuY3Rpb24oYSxiKXt2YXIgYyxkLGU9MCxmPWImJmIubWF0Y2goRSk7aWYoZiYmMT09PWEubm9kZVR5cGUpd2hpbGUoYz1mW2UrK10pZD1vLnByb3BGaXhbY118fGMsby5leHByLm1hdGNoLmJvb2wudGVzdChjKSYmKGFbZF09ITEpLGEucmVtb3ZlQXR0cmlidXRlKGMpfSxhdHRySG9va3M6e3R5cGU6e3NldDpmdW5jdGlvbihhLGIpe2lmKCFsLnJhZGlvVmFsdWUmJlwicmFkaW9cIj09PWImJm8ubm9kZU5hbWUoYSxcImlucHV0XCIpKXt2YXIgYz1hLnZhbHVlO3JldHVybiBhLnNldEF0dHJpYnV0ZShcInR5cGVcIixiKSxjJiYoYS52YWx1ZT1jKSxifX19fX0pLFpiPXtzZXQ6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiBiPT09ITE/by5yZW1vdmVBdHRyKGEsYyk6YS5zZXRBdHRyaWJ1dGUoYyxjKSxjfX0sby5lYWNoKG8uZXhwci5tYXRjaC5ib29sLnNvdXJjZS5tYXRjaCgvXFx3Ky9nKSxmdW5jdGlvbihhLGIpe3ZhciBjPSRiW2JdfHxvLmZpbmQuYXR0cjskYltiXT1mdW5jdGlvbihhLGIsZCl7dmFyIGUsZjtcbnJldHVybiBkfHwoZj0kYltiXSwkYltiXT1lLGU9bnVsbCE9YyhhLGIsZCk/Yi50b0xvd2VyQ2FzZSgpOm51bGwsJGJbYl09ZiksZX19KTt2YXIgX2I9L14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWF8YnV0dG9uKSQvaTtvLmZuLmV4dGVuZCh7cHJvcDpmdW5jdGlvbihhLGIpe3JldHVybiBKKHRoaXMsby5wcm9wLGEsYixhcmd1bWVudHMubGVuZ3RoPjEpfSxyZW1vdmVQcm9wOmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtkZWxldGUgdGhpc1tvLnByb3BGaXhbYV18fGFdfSl9fSksby5leHRlbmQoe3Byb3BGaXg6e1wiZm9yXCI6XCJodG1sRm9yXCIsXCJjbGFzc1wiOlwiY2xhc3NOYW1lXCJ9LHByb3A6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkLGUsZixnPWEubm9kZVR5cGU7aWYoYSYmMyE9PWcmJjghPT1nJiYyIT09ZylyZXR1cm4gZj0xIT09Z3x8IW8uaXNYTUxEb2MoYSksZiYmKGI9by5wcm9wRml4W2JdfHxiLGU9by5wcm9wSG9va3NbYl0pLHZvaWQgMCE9PWM/ZSYmXCJzZXRcImluIGUmJnZvaWQgMCE9PShkPWUuc2V0KGEsYyxiKSk/ZDphW2JdPWM6ZSYmXCJnZXRcImluIGUmJm51bGwhPT0oZD1lLmdldChhLGIpKT9kOmFbYl19LHByb3BIb29rczp7dGFiSW5kZXg6e2dldDpmdW5jdGlvbihhKXtyZXR1cm4gYS5oYXNBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKXx8X2IudGVzdChhLm5vZGVOYW1lKXx8YS5ocmVmP2EudGFiSW5kZXg6LTF9fX19KSxsLm9wdFNlbGVjdGVkfHwoby5wcm9wSG9va3Muc2VsZWN0ZWQ9e2dldDpmdW5jdGlvbihhKXt2YXIgYj1hLnBhcmVudE5vZGU7cmV0dXJuIGImJmIucGFyZW50Tm9kZSYmYi5wYXJlbnROb2RlLnNlbGVjdGVkSW5kZXgsbnVsbH19KSxvLmVhY2goW1widGFiSW5kZXhcIixcInJlYWRPbmx5XCIsXCJtYXhMZW5ndGhcIixcImNlbGxTcGFjaW5nXCIsXCJjZWxsUGFkZGluZ1wiLFwicm93U3BhblwiLFwiY29sU3BhblwiLFwidXNlTWFwXCIsXCJmcmFtZUJvcmRlclwiLFwiY29udGVudEVkaXRhYmxlXCJdLGZ1bmN0aW9uKCl7by5wcm9wRml4W3RoaXMudG9Mb3dlckNhc2UoKV09dGhpc30pO3ZhciBhYz0vW1xcdFxcclxcblxcZl0vZztvLmZuLmV4dGVuZCh7YWRkQ2xhc3M6ZnVuY3Rpb24oYSl7dmFyIGIsYyxkLGUsZixnLGg9XCJzdHJpbmdcIj09dHlwZW9mIGEmJmEsaT0wLGo9dGhpcy5sZW5ndGg7aWYoby5pc0Z1bmN0aW9uKGEpKXJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oYil7byh0aGlzKS5hZGRDbGFzcyhhLmNhbGwodGhpcyxiLHRoaXMuY2xhc3NOYW1lKSl9KTtpZihoKWZvcihiPShhfHxcIlwiKS5tYXRjaChFKXx8W107aj5pO2krKylpZihjPXRoaXNbaV0sZD0xPT09Yy5ub2RlVHlwZSYmKGMuY2xhc3NOYW1lPyhcIiBcIitjLmNsYXNzTmFtZStcIiBcIikucmVwbGFjZShhYyxcIiBcIik6XCIgXCIpKXtmPTA7d2hpbGUoZT1iW2YrK10pZC5pbmRleE9mKFwiIFwiK2UrXCIgXCIpPDAmJihkKz1lK1wiIFwiKTtnPW8udHJpbShkKSxjLmNsYXNzTmFtZSE9PWcmJihjLmNsYXNzTmFtZT1nKX1yZXR1cm4gdGhpc30scmVtb3ZlQ2xhc3M6ZnVuY3Rpb24oYSl7dmFyIGIsYyxkLGUsZixnLGg9MD09PWFyZ3VtZW50cy5sZW5ndGh8fFwic3RyaW5nXCI9PXR5cGVvZiBhJiZhLGk9MCxqPXRoaXMubGVuZ3RoO2lmKG8uaXNGdW5jdGlvbihhKSlyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGIpe28odGhpcykucmVtb3ZlQ2xhc3MoYS5jYWxsKHRoaXMsYix0aGlzLmNsYXNzTmFtZSkpfSk7aWYoaClmb3IoYj0oYXx8XCJcIikubWF0Y2goRSl8fFtdO2o+aTtpKyspaWYoYz10aGlzW2ldLGQ9MT09PWMubm9kZVR5cGUmJihjLmNsYXNzTmFtZT8oXCIgXCIrYy5jbGFzc05hbWUrXCIgXCIpLnJlcGxhY2UoYWMsXCIgXCIpOlwiXCIpKXtmPTA7d2hpbGUoZT1iW2YrK10pd2hpbGUoZC5pbmRleE9mKFwiIFwiK2UrXCIgXCIpPj0wKWQ9ZC5yZXBsYWNlKFwiIFwiK2UrXCIgXCIsXCIgXCIpO2c9YT9vLnRyaW0oZCk6XCJcIixjLmNsYXNzTmFtZSE9PWcmJihjLmNsYXNzTmFtZT1nKX1yZXR1cm4gdGhpc30sdG9nZ2xlQ2xhc3M6ZnVuY3Rpb24oYSxiKXt2YXIgYz10eXBlb2YgYTtyZXR1cm5cImJvb2xlYW5cIj09dHlwZW9mIGImJlwic3RyaW5nXCI9PT1jP2I/dGhpcy5hZGRDbGFzcyhhKTp0aGlzLnJlbW92ZUNsYXNzKGEpOnRoaXMuZWFjaChvLmlzRnVuY3Rpb24oYSk/ZnVuY3Rpb24oYyl7byh0aGlzKS50b2dnbGVDbGFzcyhhLmNhbGwodGhpcyxjLHRoaXMuY2xhc3NOYW1lLGIpLGIpfTpmdW5jdGlvbigpe2lmKFwic3RyaW5nXCI9PT1jKXt2YXIgYixkPTAsZT1vKHRoaXMpLGY9YS5tYXRjaChFKXx8W107d2hpbGUoYj1mW2QrK10pZS5oYXNDbGFzcyhiKT9lLnJlbW92ZUNsYXNzKGIpOmUuYWRkQ2xhc3MoYil9ZWxzZShjPT09VXx8XCJib29sZWFuXCI9PT1jKSYmKHRoaXMuY2xhc3NOYW1lJiZMLnNldCh0aGlzLFwiX19jbGFzc05hbWVfX1wiLHRoaXMuY2xhc3NOYW1lKSx0aGlzLmNsYXNzTmFtZT10aGlzLmNsYXNzTmFtZXx8YT09PSExP1wiXCI6TC5nZXQodGhpcyxcIl9fY2xhc3NOYW1lX19cIil8fFwiXCIpfSl9LGhhc0NsYXNzOmZ1bmN0aW9uKGEpe2Zvcih2YXIgYj1cIiBcIithK1wiIFwiLGM9MCxkPXRoaXMubGVuZ3RoO2Q+YztjKyspaWYoMT09PXRoaXNbY10ubm9kZVR5cGUmJihcIiBcIit0aGlzW2NdLmNsYXNzTmFtZStcIiBcIikucmVwbGFjZShhYyxcIiBcIikuaW5kZXhPZihiKT49MClyZXR1cm4hMDtyZXR1cm4hMX19KTt2YXIgYmM9L1xcci9nO28uZm4uZXh0ZW5kKHt2YWw6ZnVuY3Rpb24oYSl7dmFyIGIsYyxkLGU9dGhpc1swXTt7aWYoYXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZD1vLmlzRnVuY3Rpb24oYSksdGhpcy5lYWNoKGZ1bmN0aW9uKGMpe3ZhciBlOzE9PT10aGlzLm5vZGVUeXBlJiYoZT1kP2EuY2FsbCh0aGlzLGMsbyh0aGlzKS52YWwoKSk6YSxudWxsPT1lP2U9XCJcIjpcIm51bWJlclwiPT10eXBlb2YgZT9lKz1cIlwiOm8uaXNBcnJheShlKSYmKGU9by5tYXAoZSxmdW5jdGlvbihhKXtyZXR1cm4gbnVsbD09YT9cIlwiOmErXCJcIn0pKSxiPW8udmFsSG9va3NbdGhpcy50eXBlXXx8by52YWxIb29rc1t0aGlzLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCldLGImJlwic2V0XCJpbiBiJiZ2b2lkIDAhPT1iLnNldCh0aGlzLGUsXCJ2YWx1ZVwiKXx8KHRoaXMudmFsdWU9ZSkpfSk7aWYoZSlyZXR1cm4gYj1vLnZhbEhvb2tzW2UudHlwZV18fG8udmFsSG9va3NbZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpXSxiJiZcImdldFwiaW4gYiYmdm9pZCAwIT09KGM9Yi5nZXQoZSxcInZhbHVlXCIpKT9jOihjPWUudmFsdWUsXCJzdHJpbmdcIj09dHlwZW9mIGM/Yy5yZXBsYWNlKGJjLFwiXCIpOm51bGw9PWM/XCJcIjpjKX19fSksby5leHRlbmQoe3ZhbEhvb2tzOntzZWxlY3Q6e2dldDpmdW5jdGlvbihhKXtmb3IodmFyIGIsYyxkPWEub3B0aW9ucyxlPWEuc2VsZWN0ZWRJbmRleCxmPVwic2VsZWN0LW9uZVwiPT09YS50eXBlfHwwPmUsZz1mP251bGw6W10saD1mP2UrMTpkLmxlbmd0aCxpPTA+ZT9oOmY/ZTowO2g+aTtpKyspaWYoYz1kW2ldLCEoIWMuc2VsZWN0ZWQmJmkhPT1lfHwobC5vcHREaXNhYmxlZD9jLmRpc2FibGVkOm51bGwhPT1jLmdldEF0dHJpYnV0ZShcImRpc2FibGVkXCIpKXx8Yy5wYXJlbnROb2RlLmRpc2FibGVkJiZvLm5vZGVOYW1lKGMucGFyZW50Tm9kZSxcIm9wdGdyb3VwXCIpKSl7aWYoYj1vKGMpLnZhbCgpLGYpcmV0dXJuIGI7Zy5wdXNoKGIpfXJldHVybiBnfSxzZXQ6ZnVuY3Rpb24oYSxiKXt2YXIgYyxkLGU9YS5vcHRpb25zLGY9by5tYWtlQXJyYXkoYiksZz1lLmxlbmd0aDt3aGlsZShnLS0pZD1lW2ddLChkLnNlbGVjdGVkPW8uaW5BcnJheShvKGQpLnZhbCgpLGYpPj0wKSYmKGM9ITApO3JldHVybiBjfHwoYS5zZWxlY3RlZEluZGV4PS0xKSxmfX19fSksby5lYWNoKFtcInJhZGlvXCIsXCJjaGVja2JveFwiXSxmdW5jdGlvbigpe28udmFsSG9va3NbdGhpc109e3NldDpmdW5jdGlvbihhLGIpe3JldHVybiBvLmlzQXJyYXkoYik/YS5jaGVja2VkPW8uaW5BcnJheShvKGEpLnZhbCgpLGIpPj0wOnZvaWQgMH19LGwuY2hlY2tPbnx8KG8udmFsSG9va3NbdGhpc10uZ2V0PWZ1bmN0aW9uKGEpe3JldHVybiBudWxsPT09YS5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKT9cIm9uXCI6YS52YWx1ZX0pfSksby5lYWNoKFwiYmx1ciBmb2N1cyBmb2N1c2luIGZvY3Vzb3V0IGxvYWQgcmVzaXplIHNjcm9sbCB1bmxvYWQgY2xpY2sgZGJsY2xpY2sgbW91c2Vkb3duIG1vdXNldXAgbW91c2Vtb3ZlIG1vdXNlb3ZlciBtb3VzZW91dCBtb3VzZWVudGVyIG1vdXNlbGVhdmUgY2hhbmdlIHNlbGVjdCBzdWJtaXQga2V5ZG93biBrZXlwcmVzcyBrZXl1cCBlcnJvciBjb250ZXh0bWVudVwiLnNwbGl0KFwiIFwiKSxmdW5jdGlvbihhLGIpe28uZm5bYl09ZnVuY3Rpb24oYSxjKXtyZXR1cm4gYXJndW1lbnRzLmxlbmd0aD4wP3RoaXMub24oYixudWxsLGEsYyk6dGhpcy50cmlnZ2VyKGIpfX0pLG8uZm4uZXh0ZW5kKHtob3ZlcjpmdW5jdGlvbihhLGIpe3JldHVybiB0aGlzLm1vdXNlZW50ZXIoYSkubW91c2VsZWF2ZShifHxhKX0sYmluZDpmdW5jdGlvbihhLGIsYyl7cmV0dXJuIHRoaXMub24oYSxudWxsLGIsYyl9LHVuYmluZDpmdW5jdGlvbihhLGIpe3JldHVybiB0aGlzLm9mZihhLG51bGwsYil9LGRlbGVnYXRlOmZ1bmN0aW9uKGEsYixjLGQpe3JldHVybiB0aGlzLm9uKGIsYSxjLGQpfSx1bmRlbGVnYXRlOmZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gMT09PWFyZ3VtZW50cy5sZW5ndGg/dGhpcy5vZmYoYSxcIioqXCIpOnRoaXMub2ZmKGIsYXx8XCIqKlwiLGMpfX0pO3ZhciBjYz1vLm5vdygpLGRjPS9cXD8vO28ucGFyc2VKU09OPWZ1bmN0aW9uKGEpe3JldHVybiBKU09OLnBhcnNlKGErXCJcIil9LG8ucGFyc2VYTUw9ZnVuY3Rpb24oYSl7dmFyIGIsYztpZighYXx8XCJzdHJpbmdcIiE9dHlwZW9mIGEpcmV0dXJuIG51bGw7dHJ5e2M9bmV3IERPTVBhcnNlcixiPWMucGFyc2VGcm9tU3RyaW5nKGEsXCJ0ZXh0L3htbFwiKX1jYXRjaChkKXtiPXZvaWQgMH1yZXR1cm4oIWJ8fGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJwYXJzZXJlcnJvclwiKS5sZW5ndGgpJiZvLmVycm9yKFwiSW52YWxpZCBYTUw6IFwiK2EpLGJ9O3ZhciBlYyxmYyxnYz0vIy4qJC8saGM9LyhbPyZdKV89W14mXSovLGljPS9eKC4qPyk6WyBcXHRdKihbXlxcclxcbl0qKSQvZ20samM9L14oPzphYm91dHxhcHB8YXBwLXN0b3JhZ2V8ListZXh0ZW5zaW9ufGZpbGV8cmVzfHdpZGdldCk6JC8sa2M9L14oPzpHRVR8SEVBRCkkLyxsYz0vXlxcL1xcLy8sbWM9L14oW1xcdy4rLV0rOikoPzpcXC9cXC8oPzpbXlxcLz8jXSpAfCkoW15cXC8/IzpdKikoPzo6KFxcZCspfCl8KS8sbmM9e30sb2M9e30scGM9XCIqL1wiLmNvbmNhdChcIipcIik7dHJ5e2ZjPWxvY2F0aW9uLmhyZWZ9Y2F0Y2gocWMpe2ZjPW0uY3JlYXRlRWxlbWVudChcImFcIiksZmMuaHJlZj1cIlwiLGZjPWZjLmhyZWZ9ZWM9bWMuZXhlYyhmYy50b0xvd2VyQ2FzZSgpKXx8W107ZnVuY3Rpb24gcmMoYSl7cmV0dXJuIGZ1bmN0aW9uKGIsYyl7XCJzdHJpbmdcIiE9dHlwZW9mIGImJihjPWIsYj1cIipcIik7dmFyIGQsZT0wLGY9Yi50b0xvd2VyQ2FzZSgpLm1hdGNoKEUpfHxbXTtpZihvLmlzRnVuY3Rpb24oYykpd2hpbGUoZD1mW2UrK10pXCIrXCI9PT1kWzBdPyhkPWQuc2xpY2UoMSl8fFwiKlwiLChhW2RdPWFbZF18fFtdKS51bnNoaWZ0KGMpKTooYVtkXT1hW2RdfHxbXSkucHVzaChjKX19ZnVuY3Rpb24gc2MoYSxiLGMsZCl7dmFyIGU9e30sZj1hPT09b2M7ZnVuY3Rpb24gZyhoKXt2YXIgaTtyZXR1cm4gZVtoXT0hMCxvLmVhY2goYVtoXXx8W10sZnVuY3Rpb24oYSxoKXt2YXIgaj1oKGIsYyxkKTtyZXR1cm5cInN0cmluZ1wiIT10eXBlb2Yganx8Znx8ZVtqXT9mPyEoaT1qKTp2b2lkIDA6KGIuZGF0YVR5cGVzLnVuc2hpZnQoaiksZyhqKSwhMSl9KSxpfXJldHVybiBnKGIuZGF0YVR5cGVzWzBdKXx8IWVbXCIqXCJdJiZnKFwiKlwiKX1mdW5jdGlvbiB0YyhhLGIpe3ZhciBjLGQsZT1vLmFqYXhTZXR0aW5ncy5mbGF0T3B0aW9uc3x8e307Zm9yKGMgaW4gYil2b2lkIDAhPT1iW2NdJiYoKGVbY10/YTpkfHwoZD17fSkpW2NdPWJbY10pO3JldHVybiBkJiZvLmV4dGVuZCghMCxhLGQpLGF9ZnVuY3Rpb24gdWMoYSxiLGMpe3ZhciBkLGUsZixnLGg9YS5jb250ZW50cyxpPWEuZGF0YVR5cGVzO3doaWxlKFwiKlwiPT09aVswXSlpLnNoaWZ0KCksdm9pZCAwPT09ZCYmKGQ9YS5taW1lVHlwZXx8Yi5nZXRSZXNwb25zZUhlYWRlcihcIkNvbnRlbnQtVHlwZVwiKSk7aWYoZClmb3IoZSBpbiBoKWlmKGhbZV0mJmhbZV0udGVzdChkKSl7aS51bnNoaWZ0KGUpO2JyZWFrfWlmKGlbMF1pbiBjKWY9aVswXTtlbHNle2ZvcihlIGluIGMpe2lmKCFpWzBdfHxhLmNvbnZlcnRlcnNbZStcIiBcIitpWzBdXSl7Zj1lO2JyZWFrfWd8fChnPWUpfWY9Znx8Z31yZXR1cm4gZj8oZiE9PWlbMF0mJmkudW5zaGlmdChmKSxjW2ZdKTp2b2lkIDB9ZnVuY3Rpb24gdmMoYSxiLGMsZCl7dmFyIGUsZixnLGgsaSxqPXt9LGs9YS5kYXRhVHlwZXMuc2xpY2UoKTtpZihrWzFdKWZvcihnIGluIGEuY29udmVydGVycylqW2cudG9Mb3dlckNhc2UoKV09YS5jb252ZXJ0ZXJzW2ddO2Y9ay5zaGlmdCgpO3doaWxlKGYpaWYoYS5yZXNwb25zZUZpZWxkc1tmXSYmKGNbYS5yZXNwb25zZUZpZWxkc1tmXV09YiksIWkmJmQmJmEuZGF0YUZpbHRlciYmKGI9YS5kYXRhRmlsdGVyKGIsYS5kYXRhVHlwZSkpLGk9ZixmPWsuc2hpZnQoKSlpZihcIipcIj09PWYpZj1pO2Vsc2UgaWYoXCIqXCIhPT1pJiZpIT09Zil7aWYoZz1qW2krXCIgXCIrZl18fGpbXCIqIFwiK2ZdLCFnKWZvcihlIGluIGopaWYoaD1lLnNwbGl0KFwiIFwiKSxoWzFdPT09ZiYmKGc9altpK1wiIFwiK2hbMF1dfHxqW1wiKiBcIitoWzBdXSkpe2c9PT0hMD9nPWpbZV06altlXSE9PSEwJiYoZj1oWzBdLGsudW5zaGlmdChoWzFdKSk7YnJlYWt9aWYoZyE9PSEwKWlmKGcmJmFbXCJ0aHJvd3NcIl0pYj1nKGIpO2Vsc2UgdHJ5e2I9ZyhiKX1jYXRjaChsKXtyZXR1cm57c3RhdGU6XCJwYXJzZXJlcnJvclwiLGVycm9yOmc/bDpcIk5vIGNvbnZlcnNpb24gZnJvbSBcIitpK1wiIHRvIFwiK2Z9fX1yZXR1cm57c3RhdGU6XCJzdWNjZXNzXCIsZGF0YTpifX1vLmV4dGVuZCh7YWN0aXZlOjAsbGFzdE1vZGlmaWVkOnt9LGV0YWc6e30sYWpheFNldHRpbmdzOnt1cmw6ZmMsdHlwZTpcIkdFVFwiLGlzTG9jYWw6amMudGVzdChlY1sxXSksZ2xvYmFsOiEwLHByb2Nlc3NEYXRhOiEwLGFzeW5jOiEwLGNvbnRlbnRUeXBlOlwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04XCIsYWNjZXB0czp7XCIqXCI6cGMsdGV4dDpcInRleHQvcGxhaW5cIixodG1sOlwidGV4dC9odG1sXCIseG1sOlwiYXBwbGljYXRpb24veG1sLCB0ZXh0L3htbFwiLGpzb246XCJhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L2phdmFzY3JpcHRcIn0sY29udGVudHM6e3htbDoveG1sLyxodG1sOi9odG1sLyxqc29uOi9qc29uL30scmVzcG9uc2VGaWVsZHM6e3htbDpcInJlc3BvbnNlWE1MXCIsdGV4dDpcInJlc3BvbnNlVGV4dFwiLGpzb246XCJyZXNwb25zZUpTT05cIn0sY29udmVydGVyczp7XCIqIHRleHRcIjpTdHJpbmcsXCJ0ZXh0IGh0bWxcIjohMCxcInRleHQganNvblwiOm8ucGFyc2VKU09OLFwidGV4dCB4bWxcIjpvLnBhcnNlWE1MfSxmbGF0T3B0aW9uczp7dXJsOiEwLGNvbnRleHQ6ITB9fSxhamF4U2V0dXA6ZnVuY3Rpb24oYSxiKXtyZXR1cm4gYj90Yyh0YyhhLG8uYWpheFNldHRpbmdzKSxiKTp0YyhvLmFqYXhTZXR0aW5ncyxhKX0sYWpheFByZWZpbHRlcjpyYyhuYyksYWpheFRyYW5zcG9ydDpyYyhvYyksYWpheDpmdW5jdGlvbihhLGIpe1wib2JqZWN0XCI9PXR5cGVvZiBhJiYoYj1hLGE9dm9pZCAwKSxiPWJ8fHt9O3ZhciBjLGQsZSxmLGcsaCxpLGosaz1vLmFqYXhTZXR1cCh7fSxiKSxsPWsuY29udGV4dHx8ayxtPWsuY29udGV4dCYmKGwubm9kZVR5cGV8fGwuanF1ZXJ5KT9vKGwpOm8uZXZlbnQsbj1vLkRlZmVycmVkKCkscD1vLkNhbGxiYWNrcyhcIm9uY2UgbWVtb3J5XCIpLHE9ay5zdGF0dXNDb2RlfHx7fSxyPXt9LHM9e30sdD0wLHU9XCJjYW5jZWxlZFwiLHY9e3JlYWR5U3RhdGU6MCxnZXRSZXNwb25zZUhlYWRlcjpmdW5jdGlvbihhKXt2YXIgYjtpZigyPT09dCl7aWYoIWYpe2Y9e307d2hpbGUoYj1pYy5leGVjKGUpKWZbYlsxXS50b0xvd2VyQ2FzZSgpXT1iWzJdfWI9ZlthLnRvTG93ZXJDYXNlKCldfXJldHVybiBudWxsPT1iP251bGw6Yn0sZ2V0QWxsUmVzcG9uc2VIZWFkZXJzOmZ1bmN0aW9uKCl7cmV0dXJuIDI9PT10P2U6bnVsbH0sc2V0UmVxdWVzdEhlYWRlcjpmdW5jdGlvbihhLGIpe3ZhciBjPWEudG9Mb3dlckNhc2UoKTtyZXR1cm4gdHx8KGE9c1tjXT1zW2NdfHxhLHJbYV09YiksdGhpc30sb3ZlcnJpZGVNaW1lVHlwZTpmdW5jdGlvbihhKXtyZXR1cm4gdHx8KGsubWltZVR5cGU9YSksdGhpc30sc3RhdHVzQ29kZTpmdW5jdGlvbihhKXt2YXIgYjtpZihhKWlmKDI+dClmb3IoYiBpbiBhKXFbYl09W3FbYl0sYVtiXV07ZWxzZSB2LmFsd2F5cyhhW3Yuc3RhdHVzXSk7cmV0dXJuIHRoaXN9LGFib3J0OmZ1bmN0aW9uKGEpe3ZhciBiPWF8fHU7cmV0dXJuIGMmJmMuYWJvcnQoYikseCgwLGIpLHRoaXN9fTtpZihuLnByb21pc2UodikuY29tcGxldGU9cC5hZGQsdi5zdWNjZXNzPXYuZG9uZSx2LmVycm9yPXYuZmFpbCxrLnVybD0oKGF8fGsudXJsfHxmYykrXCJcIikucmVwbGFjZShnYyxcIlwiKS5yZXBsYWNlKGxjLGVjWzFdK1wiLy9cIiksay50eXBlPWIubWV0aG9kfHxiLnR5cGV8fGsubWV0aG9kfHxrLnR5cGUsay5kYXRhVHlwZXM9by50cmltKGsuZGF0YVR5cGV8fFwiKlwiKS50b0xvd2VyQ2FzZSgpLm1hdGNoKEUpfHxbXCJcIl0sbnVsbD09ay5jcm9zc0RvbWFpbiYmKGg9bWMuZXhlYyhrLnVybC50b0xvd2VyQ2FzZSgpKSxrLmNyb3NzRG9tYWluPSEoIWh8fGhbMV09PT1lY1sxXSYmaFsyXT09PWVjWzJdJiYoaFszXXx8KFwiaHR0cDpcIj09PWhbMV0/XCI4MFwiOlwiNDQzXCIpKT09PShlY1szXXx8KFwiaHR0cDpcIj09PWVjWzFdP1wiODBcIjpcIjQ0M1wiKSkpKSxrLmRhdGEmJmsucHJvY2Vzc0RhdGEmJlwic3RyaW5nXCIhPXR5cGVvZiBrLmRhdGEmJihrLmRhdGE9by5wYXJhbShrLmRhdGEsay50cmFkaXRpb25hbCkpLHNjKG5jLGssYix2KSwyPT09dClyZXR1cm4gdjtpPWsuZ2xvYmFsLGkmJjA9PT1vLmFjdGl2ZSsrJiZvLmV2ZW50LnRyaWdnZXIoXCJhamF4U3RhcnRcIiksay50eXBlPWsudHlwZS50b1VwcGVyQ2FzZSgpLGsuaGFzQ29udGVudD0ha2MudGVzdChrLnR5cGUpLGQ9ay51cmwsay5oYXNDb250ZW50fHwoay5kYXRhJiYoZD1rLnVybCs9KGRjLnRlc3QoZCk/XCImXCI6XCI/XCIpK2suZGF0YSxkZWxldGUgay5kYXRhKSxrLmNhY2hlPT09ITEmJihrLnVybD1oYy50ZXN0KGQpP2QucmVwbGFjZShoYyxcIiQxXz1cIitjYysrKTpkKyhkYy50ZXN0KGQpP1wiJlwiOlwiP1wiKStcIl89XCIrY2MrKykpLGsuaWZNb2RpZmllZCYmKG8ubGFzdE1vZGlmaWVkW2RdJiZ2LnNldFJlcXVlc3RIZWFkZXIoXCJJZi1Nb2RpZmllZC1TaW5jZVwiLG8ubGFzdE1vZGlmaWVkW2RdKSxvLmV0YWdbZF0mJnYuc2V0UmVxdWVzdEhlYWRlcihcIklmLU5vbmUtTWF0Y2hcIixvLmV0YWdbZF0pKSwoay5kYXRhJiZrLmhhc0NvbnRlbnQmJmsuY29udGVudFR5cGUhPT0hMXx8Yi5jb250ZW50VHlwZSkmJnYuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLGsuY29udGVudFR5cGUpLHYuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2VwdFwiLGsuZGF0YVR5cGVzWzBdJiZrLmFjY2VwdHNbay5kYXRhVHlwZXNbMF1dP2suYWNjZXB0c1trLmRhdGFUeXBlc1swXV0rKFwiKlwiIT09ay5kYXRhVHlwZXNbMF0/XCIsIFwiK3BjK1wiOyBxPTAuMDFcIjpcIlwiKTprLmFjY2VwdHNbXCIqXCJdKTtmb3IoaiBpbiBrLmhlYWRlcnMpdi5zZXRSZXF1ZXN0SGVhZGVyKGosay5oZWFkZXJzW2pdKTtpZihrLmJlZm9yZVNlbmQmJihrLmJlZm9yZVNlbmQuY2FsbChsLHYsayk9PT0hMXx8Mj09PXQpKXJldHVybiB2LmFib3J0KCk7dT1cImFib3J0XCI7Zm9yKGogaW57c3VjY2VzczoxLGVycm9yOjEsY29tcGxldGU6MX0pdltqXShrW2pdKTtpZihjPXNjKG9jLGssYix2KSl7di5yZWFkeVN0YXRlPTEsaSYmbS50cmlnZ2VyKFwiYWpheFNlbmRcIixbdixrXSksay5hc3luYyYmay50aW1lb3V0PjAmJihnPXNldFRpbWVvdXQoZnVuY3Rpb24oKXt2LmFib3J0KFwidGltZW91dFwiKX0say50aW1lb3V0KSk7dHJ5e3Q9MSxjLnNlbmQocix4KX1jYXRjaCh3KXtpZighKDI+dCkpdGhyb3cgdzt4KC0xLHcpfX1lbHNlIHgoLTEsXCJObyBUcmFuc3BvcnRcIik7ZnVuY3Rpb24geChhLGIsZixoKXt2YXIgaixyLHMsdSx3LHg9YjsyIT09dCYmKHQ9MixnJiZjbGVhclRpbWVvdXQoZyksYz12b2lkIDAsZT1ofHxcIlwiLHYucmVhZHlTdGF0ZT1hPjA/NDowLGo9YT49MjAwJiYzMDA+YXx8MzA0PT09YSxmJiYodT11YyhrLHYsZikpLHU9dmMoayx1LHYsaiksaj8oay5pZk1vZGlmaWVkJiYodz12LmdldFJlc3BvbnNlSGVhZGVyKFwiTGFzdC1Nb2RpZmllZFwiKSx3JiYoby5sYXN0TW9kaWZpZWRbZF09dyksdz12LmdldFJlc3BvbnNlSGVhZGVyKFwiZXRhZ1wiKSx3JiYoby5ldGFnW2RdPXcpKSwyMDQ9PT1hfHxcIkhFQURcIj09PWsudHlwZT94PVwibm9jb250ZW50XCI6MzA0PT09YT94PVwibm90bW9kaWZpZWRcIjooeD11LnN0YXRlLHI9dS5kYXRhLHM9dS5lcnJvcixqPSFzKSk6KHM9eCwoYXx8IXgpJiYoeD1cImVycm9yXCIsMD5hJiYoYT0wKSkpLHYuc3RhdHVzPWEsdi5zdGF0dXNUZXh0PShifHx4KStcIlwiLGo/bi5yZXNvbHZlV2l0aChsLFtyLHgsdl0pOm4ucmVqZWN0V2l0aChsLFt2LHgsc10pLHYuc3RhdHVzQ29kZShxKSxxPXZvaWQgMCxpJiZtLnRyaWdnZXIoaj9cImFqYXhTdWNjZXNzXCI6XCJhamF4RXJyb3JcIixbdixrLGo/cjpzXSkscC5maXJlV2l0aChsLFt2LHhdKSxpJiYobS50cmlnZ2VyKFwiYWpheENvbXBsZXRlXCIsW3Ysa10pLC0tby5hY3RpdmV8fG8uZXZlbnQudHJpZ2dlcihcImFqYXhTdG9wXCIpKSl9cmV0dXJuIHZ9LGdldEpTT046ZnVuY3Rpb24oYSxiLGMpe3JldHVybiBvLmdldChhLGIsYyxcImpzb25cIil9LGdldFNjcmlwdDpmdW5jdGlvbihhLGIpe3JldHVybiBvLmdldChhLHZvaWQgMCxiLFwic2NyaXB0XCIpfX0pLG8uZWFjaChbXCJnZXRcIixcInBvc3RcIl0sZnVuY3Rpb24oYSxiKXtvW2JdPWZ1bmN0aW9uKGEsYyxkLGUpe3JldHVybiBvLmlzRnVuY3Rpb24oYykmJihlPWV8fGQsZD1jLGM9dm9pZCAwKSxvLmFqYXgoe3VybDphLHR5cGU6YixkYXRhVHlwZTplLGRhdGE6YyxzdWNjZXNzOmR9KX19KSxvLmVhY2goW1wiYWpheFN0YXJ0XCIsXCJhamF4U3RvcFwiLFwiYWpheENvbXBsZXRlXCIsXCJhamF4RXJyb3JcIixcImFqYXhTdWNjZXNzXCIsXCJhamF4U2VuZFwiXSxmdW5jdGlvbihhLGIpe28uZm5bYl09ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMub24oYixhKX19KSxvLl9ldmFsVXJsPWZ1bmN0aW9uKGEpe3JldHVybiBvLmFqYXgoe3VybDphLHR5cGU6XCJHRVRcIixkYXRhVHlwZTpcInNjcmlwdFwiLGFzeW5jOiExLGdsb2JhbDohMSxcInRocm93c1wiOiEwfSl9LG8uZm4uZXh0ZW5kKHt3cmFwQWxsOmZ1bmN0aW9uKGEpe3ZhciBiO3JldHVybiBvLmlzRnVuY3Rpb24oYSk/dGhpcy5lYWNoKGZ1bmN0aW9uKGIpe28odGhpcykud3JhcEFsbChhLmNhbGwodGhpcyxiKSl9KToodGhpc1swXSYmKGI9byhhLHRoaXNbMF0ub3duZXJEb2N1bWVudCkuZXEoMCkuY2xvbmUoITApLHRoaXNbMF0ucGFyZW50Tm9kZSYmYi5pbnNlcnRCZWZvcmUodGhpc1swXSksYi5tYXAoZnVuY3Rpb24oKXt2YXIgYT10aGlzO3doaWxlKGEuZmlyc3RFbGVtZW50Q2hpbGQpYT1hLmZpcnN0RWxlbWVudENoaWxkO3JldHVybiBhfSkuYXBwZW5kKHRoaXMpKSx0aGlzKX0sd3JhcElubmVyOmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLmVhY2goby5pc0Z1bmN0aW9uKGEpP2Z1bmN0aW9uKGIpe28odGhpcykud3JhcElubmVyKGEuY2FsbCh0aGlzLGIpKX06ZnVuY3Rpb24oKXt2YXIgYj1vKHRoaXMpLGM9Yi5jb250ZW50cygpO2MubGVuZ3RoP2Mud3JhcEFsbChhKTpiLmFwcGVuZChhKX0pfSx3cmFwOmZ1bmN0aW9uKGEpe3ZhciBiPW8uaXNGdW5jdGlvbihhKTtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGMpe28odGhpcykud3JhcEFsbChiP2EuY2FsbCh0aGlzLGMpOmEpfSl9LHVud3JhcDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnBhcmVudCgpLmVhY2goZnVuY3Rpb24oKXtvLm5vZGVOYW1lKHRoaXMsXCJib2R5XCIpfHxvKHRoaXMpLnJlcGxhY2VXaXRoKHRoaXMuY2hpbGROb2Rlcyl9KS5lbmQoKX19KSxvLmV4cHIuZmlsdGVycy5oaWRkZW49ZnVuY3Rpb24oYSl7cmV0dXJuIGEub2Zmc2V0V2lkdGg8PTAmJmEub2Zmc2V0SGVpZ2h0PD0wfSxvLmV4cHIuZmlsdGVycy52aXNpYmxlPWZ1bmN0aW9uKGEpe3JldHVybiFvLmV4cHIuZmlsdGVycy5oaWRkZW4oYSl9O3ZhciB3Yz0vJTIwL2cseGM9L1xcW1xcXSQvLHljPS9cXHI/XFxuL2csemM9L14oPzpzdWJtaXR8YnV0dG9ufGltYWdlfHJlc2V0fGZpbGUpJC9pLEFjPS9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGtleWdlbikvaTtmdW5jdGlvbiBCYyhhLGIsYyxkKXt2YXIgZTtpZihvLmlzQXJyYXkoYikpby5lYWNoKGIsZnVuY3Rpb24oYixlKXtjfHx4Yy50ZXN0KGEpP2QoYSxlKTpCYyhhK1wiW1wiKyhcIm9iamVjdFwiPT10eXBlb2YgZT9iOlwiXCIpK1wiXVwiLGUsYyxkKX0pO2Vsc2UgaWYoY3x8XCJvYmplY3RcIiE9PW8udHlwZShiKSlkKGEsYik7ZWxzZSBmb3IoZSBpbiBiKUJjKGErXCJbXCIrZStcIl1cIixiW2VdLGMsZCl9by5wYXJhbT1mdW5jdGlvbihhLGIpe3ZhciBjLGQ9W10sZT1mdW5jdGlvbihhLGIpe2I9by5pc0Z1bmN0aW9uKGIpP2IoKTpudWxsPT1iP1wiXCI6YixkW2QubGVuZ3RoXT1lbmNvZGVVUklDb21wb25lbnQoYSkrXCI9XCIrZW5jb2RlVVJJQ29tcG9uZW50KGIpfTtpZih2b2lkIDA9PT1iJiYoYj1vLmFqYXhTZXR0aW5ncyYmby5hamF4U2V0dGluZ3MudHJhZGl0aW9uYWwpLG8uaXNBcnJheShhKXx8YS5qcXVlcnkmJiFvLmlzUGxhaW5PYmplY3QoYSkpby5lYWNoKGEsZnVuY3Rpb24oKXtlKHRoaXMubmFtZSx0aGlzLnZhbHVlKX0pO2Vsc2UgZm9yKGMgaW4gYSlCYyhjLGFbY10sYixlKTtyZXR1cm4gZC5qb2luKFwiJlwiKS5yZXBsYWNlKHdjLFwiK1wiKX0sby5mbi5leHRlbmQoe3NlcmlhbGl6ZTpmdW5jdGlvbigpe3JldHVybiBvLnBhcmFtKHRoaXMuc2VyaWFsaXplQXJyYXkoKSl9LHNlcmlhbGl6ZUFycmF5OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCl7dmFyIGE9by5wcm9wKHRoaXMsXCJlbGVtZW50c1wiKTtyZXR1cm4gYT9vLm1ha2VBcnJheShhKTp0aGlzfSkuZmlsdGVyKGZ1bmN0aW9uKCl7dmFyIGE9dGhpcy50eXBlO3JldHVybiB0aGlzLm5hbWUmJiFvKHRoaXMpLmlzKFwiOmRpc2FibGVkXCIpJiZBYy50ZXN0KHRoaXMubm9kZU5hbWUpJiYhemMudGVzdChhKSYmKHRoaXMuY2hlY2tlZHx8IVQudGVzdChhKSl9KS5tYXAoZnVuY3Rpb24oYSxiKXt2YXIgYz1vKHRoaXMpLnZhbCgpO3JldHVybiBudWxsPT1jP251bGw6by5pc0FycmF5KGMpP28ubWFwKGMsZnVuY3Rpb24oYSl7cmV0dXJue25hbWU6Yi5uYW1lLHZhbHVlOmEucmVwbGFjZSh5YyxcIlxcclxcblwiKX19KTp7bmFtZTpiLm5hbWUsdmFsdWU6Yy5yZXBsYWNlKHljLFwiXFxyXFxuXCIpfX0pLmdldCgpfX0pLG8uYWpheFNldHRpbmdzLnhocj1mdW5jdGlvbigpe3RyeXtyZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0fWNhdGNoKGEpe319O3ZhciBDYz0wLERjPXt9LEVjPXswOjIwMCwxMjIzOjIwNH0sRmM9by5hamF4U2V0dGluZ3MueGhyKCk7YS5BY3RpdmVYT2JqZWN0JiZvKGEpLm9uKFwidW5sb2FkXCIsZnVuY3Rpb24oKXtmb3IodmFyIGEgaW4gRGMpRGNbYV0oKX0pLGwuY29ycz0hIUZjJiZcIndpdGhDcmVkZW50aWFsc1wiaW4gRmMsbC5hamF4PUZjPSEhRmMsby5hamF4VHJhbnNwb3J0KGZ1bmN0aW9uKGEpe3ZhciBiO3JldHVybiBsLmNvcnN8fEZjJiYhYS5jcm9zc0RvbWFpbj97c2VuZDpmdW5jdGlvbihjLGQpe3ZhciBlLGY9YS54aHIoKSxnPSsrQ2M7aWYoZi5vcGVuKGEudHlwZSxhLnVybCxhLmFzeW5jLGEudXNlcm5hbWUsYS5wYXNzd29yZCksYS54aHJGaWVsZHMpZm9yKGUgaW4gYS54aHJGaWVsZHMpZltlXT1hLnhockZpZWxkc1tlXTthLm1pbWVUeXBlJiZmLm92ZXJyaWRlTWltZVR5cGUmJmYub3ZlcnJpZGVNaW1lVHlwZShhLm1pbWVUeXBlKSxhLmNyb3NzRG9tYWlufHxjW1wiWC1SZXF1ZXN0ZWQtV2l0aFwiXXx8KGNbXCJYLVJlcXVlc3RlZC1XaXRoXCJdPVwiWE1MSHR0cFJlcXVlc3RcIik7Zm9yKGUgaW4gYylmLnNldFJlcXVlc3RIZWFkZXIoZSxjW2VdKTtiPWZ1bmN0aW9uKGEpe3JldHVybiBmdW5jdGlvbigpe2ImJihkZWxldGUgRGNbZ10sYj1mLm9ubG9hZD1mLm9uZXJyb3I9bnVsbCxcImFib3J0XCI9PT1hP2YuYWJvcnQoKTpcImVycm9yXCI9PT1hP2QoZi5zdGF0dXMsZi5zdGF0dXNUZXh0KTpkKEVjW2Yuc3RhdHVzXXx8Zi5zdGF0dXMsZi5zdGF0dXNUZXh0LFwic3RyaW5nXCI9PXR5cGVvZiBmLnJlc3BvbnNlVGV4dD97dGV4dDpmLnJlc3BvbnNlVGV4dH06dm9pZCAwLGYuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpKX19LGYub25sb2FkPWIoKSxmLm9uZXJyb3I9YihcImVycm9yXCIpLGI9RGNbZ109YihcImFib3J0XCIpLGYuc2VuZChhLmhhc0NvbnRlbnQmJmEuZGF0YXx8bnVsbCl9LGFib3J0OmZ1bmN0aW9uKCl7YiYmYigpfX06dm9pZCAwfSksby5hamF4U2V0dXAoe2FjY2VwdHM6e3NjcmlwdDpcInRleHQvamF2YXNjcmlwdCwgYXBwbGljYXRpb24vamF2YXNjcmlwdCwgYXBwbGljYXRpb24vZWNtYXNjcmlwdCwgYXBwbGljYXRpb24veC1lY21hc2NyaXB0XCJ9LGNvbnRlbnRzOntzY3JpcHQ6Lyg/OmphdmF8ZWNtYSlzY3JpcHQvfSxjb252ZXJ0ZXJzOntcInRleHQgc2NyaXB0XCI6ZnVuY3Rpb24oYSl7cmV0dXJuIG8uZ2xvYmFsRXZhbChhKSxhfX19KSxvLmFqYXhQcmVmaWx0ZXIoXCJzY3JpcHRcIixmdW5jdGlvbihhKXt2b2lkIDA9PT1hLmNhY2hlJiYoYS5jYWNoZT0hMSksYS5jcm9zc0RvbWFpbiYmKGEudHlwZT1cIkdFVFwiKX0pLG8uYWpheFRyYW5zcG9ydChcInNjcmlwdFwiLGZ1bmN0aW9uKGEpe2lmKGEuY3Jvc3NEb21haW4pe3ZhciBiLGM7cmV0dXJue3NlbmQ6ZnVuY3Rpb24oZCxlKXtiPW8oXCI8c2NyaXB0PlwiKS5wcm9wKHthc3luYzohMCxjaGFyc2V0OmEuc2NyaXB0Q2hhcnNldCxzcmM6YS51cmx9KS5vbihcImxvYWQgZXJyb3JcIixjPWZ1bmN0aW9uKGEpe2IucmVtb3ZlKCksYz1udWxsLGEmJmUoXCJlcnJvclwiPT09YS50eXBlPzQwNDoyMDAsYS50eXBlKX0pLG0uaGVhZC5hcHBlbmRDaGlsZChiWzBdKX0sYWJvcnQ6ZnVuY3Rpb24oKXtjJiZjKCl9fX19KTt2YXIgR2M9W10sSGM9Lyg9KVxcPyg/PSZ8JCl8XFw/XFw/LztvLmFqYXhTZXR1cCh7anNvbnA6XCJjYWxsYmFja1wiLGpzb25wQ2FsbGJhY2s6ZnVuY3Rpb24oKXt2YXIgYT1HYy5wb3AoKXx8by5leHBhbmRvK1wiX1wiK2NjKys7cmV0dXJuIHRoaXNbYV09ITAsYX19KSxvLmFqYXhQcmVmaWx0ZXIoXCJqc29uIGpzb25wXCIsZnVuY3Rpb24oYixjLGQpe3ZhciBlLGYsZyxoPWIuanNvbnAhPT0hMSYmKEhjLnRlc3QoYi51cmwpP1widXJsXCI6XCJzdHJpbmdcIj09dHlwZW9mIGIuZGF0YSYmIShiLmNvbnRlbnRUeXBlfHxcIlwiKS5pbmRleE9mKFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpJiZIYy50ZXN0KGIuZGF0YSkmJlwiZGF0YVwiKTtyZXR1cm4gaHx8XCJqc29ucFwiPT09Yi5kYXRhVHlwZXNbMF0/KGU9Yi5qc29ucENhbGxiYWNrPW8uaXNGdW5jdGlvbihiLmpzb25wQ2FsbGJhY2spP2IuanNvbnBDYWxsYmFjaygpOmIuanNvbnBDYWxsYmFjayxoP2JbaF09YltoXS5yZXBsYWNlKEhjLFwiJDFcIitlKTpiLmpzb25wIT09ITEmJihiLnVybCs9KGRjLnRlc3QoYi51cmwpP1wiJlwiOlwiP1wiKStiLmpzb25wK1wiPVwiK2UpLGIuY29udmVydGVyc1tcInNjcmlwdCBqc29uXCJdPWZ1bmN0aW9uKCl7cmV0dXJuIGd8fG8uZXJyb3IoZStcIiB3YXMgbm90IGNhbGxlZFwiKSxnWzBdfSxiLmRhdGFUeXBlc1swXT1cImpzb25cIixmPWFbZV0sYVtlXT1mdW5jdGlvbigpe2c9YXJndW1lbnRzfSxkLmFsd2F5cyhmdW5jdGlvbigpe2FbZV09ZixiW2VdJiYoYi5qc29ucENhbGxiYWNrPWMuanNvbnBDYWxsYmFjayxHYy5wdXNoKGUpKSxnJiZvLmlzRnVuY3Rpb24oZikmJmYoZ1swXSksZz1mPXZvaWQgMH0pLFwic2NyaXB0XCIpOnZvaWQgMH0pLG8ucGFyc2VIVE1MPWZ1bmN0aW9uKGEsYixjKXtpZighYXx8XCJzdHJpbmdcIiE9dHlwZW9mIGEpcmV0dXJuIG51bGw7XCJib29sZWFuXCI9PXR5cGVvZiBiJiYoYz1iLGI9ITEpLGI9Ynx8bTt2YXIgZD12LmV4ZWMoYSksZT0hYyYmW107cmV0dXJuIGQ/W2IuY3JlYXRlRWxlbWVudChkWzFdKV06KGQ9by5idWlsZEZyYWdtZW50KFthXSxiLGUpLGUmJmUubGVuZ3RoJiZvKGUpLnJlbW92ZSgpLG8ubWVyZ2UoW10sZC5jaGlsZE5vZGVzKSl9O3ZhciBJYz1vLmZuLmxvYWQ7by5mbi5sb2FkPWZ1bmN0aW9uKGEsYixjKXtpZihcInN0cmluZ1wiIT10eXBlb2YgYSYmSWMpcmV0dXJuIEljLmFwcGx5KHRoaXMsYXJndW1lbnRzKTt2YXIgZCxlLGYsZz10aGlzLGg9YS5pbmRleE9mKFwiIFwiKTtyZXR1cm4gaD49MCYmKGQ9YS5zbGljZShoKSxhPWEuc2xpY2UoMCxoKSksby5pc0Z1bmN0aW9uKGIpPyhjPWIsYj12b2lkIDApOmImJlwib2JqZWN0XCI9PXR5cGVvZiBiJiYoZT1cIlBPU1RcIiksZy5sZW5ndGg+MCYmby5hamF4KHt1cmw6YSx0eXBlOmUsZGF0YVR5cGU6XCJodG1sXCIsZGF0YTpifSkuZG9uZShmdW5jdGlvbihhKXtmPWFyZ3VtZW50cyxnLmh0bWwoZD9vKFwiPGRpdj5cIikuYXBwZW5kKG8ucGFyc2VIVE1MKGEpKS5maW5kKGQpOmEpfSkuY29tcGxldGUoYyYmZnVuY3Rpb24oYSxiKXtnLmVhY2goYyxmfHxbYS5yZXNwb25zZVRleHQsYixhXSl9KSx0aGlzfSxvLmV4cHIuZmlsdGVycy5hbmltYXRlZD1mdW5jdGlvbihhKXtyZXR1cm4gby5ncmVwKG8udGltZXJzLGZ1bmN0aW9uKGIpe3JldHVybiBhPT09Yi5lbGVtfSkubGVuZ3RofTt2YXIgSmM9YS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7ZnVuY3Rpb24gS2MoYSl7cmV0dXJuIG8uaXNXaW5kb3coYSk/YTo5PT09YS5ub2RlVHlwZSYmYS5kZWZhdWx0Vmlld31vLm9mZnNldD17c2V0T2Zmc2V0OmZ1bmN0aW9uKGEsYixjKXt2YXIgZCxlLGYsZyxoLGksaixrPW8uY3NzKGEsXCJwb3NpdGlvblwiKSxsPW8oYSksbT17fTtcInN0YXRpY1wiPT09ayYmKGEuc3R5bGUucG9zaXRpb249XCJyZWxhdGl2ZVwiKSxoPWwub2Zmc2V0KCksZj1vLmNzcyhhLFwidG9wXCIpLGk9by5jc3MoYSxcImxlZnRcIiksaj0oXCJhYnNvbHV0ZVwiPT09a3x8XCJmaXhlZFwiPT09aykmJihmK2kpLmluZGV4T2YoXCJhdXRvXCIpPi0xLGo/KGQ9bC5wb3NpdGlvbigpLGc9ZC50b3AsZT1kLmxlZnQpOihnPXBhcnNlRmxvYXQoZil8fDAsZT1wYXJzZUZsb2F0KGkpfHwwKSxvLmlzRnVuY3Rpb24oYikmJihiPWIuY2FsbChhLGMsaCkpLG51bGwhPWIudG9wJiYobS50b3A9Yi50b3AtaC50b3ArZyksbnVsbCE9Yi5sZWZ0JiYobS5sZWZ0PWIubGVmdC1oLmxlZnQrZSksXCJ1c2luZ1wiaW4gYj9iLnVzaW5nLmNhbGwoYSxtKTpsLmNzcyhtKX19LG8uZm4uZXh0ZW5kKHtvZmZzZXQ6ZnVuY3Rpb24oYSl7aWYoYXJndW1lbnRzLmxlbmd0aClyZXR1cm4gdm9pZCAwPT09YT90aGlzOnRoaXMuZWFjaChmdW5jdGlvbihiKXtvLm9mZnNldC5zZXRPZmZzZXQodGhpcyxhLGIpfSk7dmFyIGIsYyxkPXRoaXNbMF0sZT17dG9wOjAsbGVmdDowfSxmPWQmJmQub3duZXJEb2N1bWVudDtpZihmKXJldHVybiBiPWYuZG9jdW1lbnRFbGVtZW50LG8uY29udGFpbnMoYixkKT8odHlwZW9mIGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0IT09VSYmKGU9ZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSksYz1LYyhmKSx7dG9wOmUudG9wK2MucGFnZVlPZmZzZXQtYi5jbGllbnRUb3AsbGVmdDplLmxlZnQrYy5wYWdlWE9mZnNldC1iLmNsaWVudExlZnR9KTplfSxwb3NpdGlvbjpmdW5jdGlvbigpe2lmKHRoaXNbMF0pe3ZhciBhLGIsYz10aGlzWzBdLGQ9e3RvcDowLGxlZnQ6MH07cmV0dXJuXCJmaXhlZFwiPT09by5jc3MoYyxcInBvc2l0aW9uXCIpP2I9Yy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTooYT10aGlzLm9mZnNldFBhcmVudCgpLGI9dGhpcy5vZmZzZXQoKSxvLm5vZGVOYW1lKGFbMF0sXCJodG1sXCIpfHwoZD1hLm9mZnNldCgpKSxkLnRvcCs9by5jc3MoYVswXSxcImJvcmRlclRvcFdpZHRoXCIsITApLGQubGVmdCs9by5jc3MoYVswXSxcImJvcmRlckxlZnRXaWR0aFwiLCEwKSkse3RvcDpiLnRvcC1kLnRvcC1vLmNzcyhjLFwibWFyZ2luVG9wXCIsITApLGxlZnQ6Yi5sZWZ0LWQubGVmdC1vLmNzcyhjLFwibWFyZ2luTGVmdFwiLCEwKX19fSxvZmZzZXRQYXJlbnQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKXt2YXIgYT10aGlzLm9mZnNldFBhcmVudHx8SmM7d2hpbGUoYSYmIW8ubm9kZU5hbWUoYSxcImh0bWxcIikmJlwic3RhdGljXCI9PT1vLmNzcyhhLFwicG9zaXRpb25cIikpYT1hLm9mZnNldFBhcmVudDtyZXR1cm4gYXx8SmN9KX19KSxvLmVhY2goe3Njcm9sbExlZnQ6XCJwYWdlWE9mZnNldFwiLHNjcm9sbFRvcDpcInBhZ2VZT2Zmc2V0XCJ9LGZ1bmN0aW9uKGIsYyl7dmFyIGQ9XCJwYWdlWU9mZnNldFwiPT09YztvLmZuW2JdPWZ1bmN0aW9uKGUpe3JldHVybiBKKHRoaXMsZnVuY3Rpb24oYixlLGYpe3ZhciBnPUtjKGIpO3JldHVybiB2b2lkIDA9PT1mP2c/Z1tjXTpiW2VdOnZvaWQoZz9nLnNjcm9sbFRvKGQ/YS5wYWdlWE9mZnNldDpmLGQ/ZjphLnBhZ2VZT2Zmc2V0KTpiW2VdPWYpfSxiLGUsYXJndW1lbnRzLmxlbmd0aCxudWxsKX19KSxvLmVhY2goW1widG9wXCIsXCJsZWZ0XCJdLGZ1bmN0aW9uKGEsYil7by5jc3NIb29rc1tiXT15YihsLnBpeGVsUG9zaXRpb24sZnVuY3Rpb24oYSxjKXtyZXR1cm4gYz8oYz14YihhLGIpLHZiLnRlc3QoYyk/byhhKS5wb3NpdGlvbigpW2JdK1wicHhcIjpjKTp2b2lkIDB9KX0pLG8uZWFjaCh7SGVpZ2h0OlwiaGVpZ2h0XCIsV2lkdGg6XCJ3aWR0aFwifSxmdW5jdGlvbihhLGIpe28uZWFjaCh7cGFkZGluZzpcImlubmVyXCIrYSxjb250ZW50OmIsXCJcIjpcIm91dGVyXCIrYX0sZnVuY3Rpb24oYyxkKXtvLmZuW2RdPWZ1bmN0aW9uKGQsZSl7dmFyIGY9YXJndW1lbnRzLmxlbmd0aCYmKGN8fFwiYm9vbGVhblwiIT10eXBlb2YgZCksZz1jfHwoZD09PSEwfHxlPT09ITA/XCJtYXJnaW5cIjpcImJvcmRlclwiKTtyZXR1cm4gSih0aGlzLGZ1bmN0aW9uKGIsYyxkKXt2YXIgZTtyZXR1cm4gby5pc1dpbmRvdyhiKT9iLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudFtcImNsaWVudFwiK2FdOjk9PT1iLm5vZGVUeXBlPyhlPWIuZG9jdW1lbnRFbGVtZW50LE1hdGgubWF4KGIuYm9keVtcInNjcm9sbFwiK2FdLGVbXCJzY3JvbGxcIithXSxiLmJvZHlbXCJvZmZzZXRcIithXSxlW1wib2Zmc2V0XCIrYV0sZVtcImNsaWVudFwiK2FdKSk6dm9pZCAwPT09ZD9vLmNzcyhiLGMsZyk6by5zdHlsZShiLGMsZCxnKX0sYixmP2Q6dm9pZCAwLGYsbnVsbCl9fSl9KSxvLmZuLnNpemU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5sZW5ndGh9LG8uZm4uYW5kU2VsZj1vLmZuLmFkZEJhY2ssXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kJiZkZWZpbmUoXCJqcXVlcnlcIixbXSxmdW5jdGlvbigpe3JldHVybiBvfSk7dmFyIExjPWEualF1ZXJ5LE1jPWEuJDtyZXR1cm4gby5ub0NvbmZsaWN0PWZ1bmN0aW9uKGIpe3JldHVybiBhLiQ9PT1vJiYoYS4kPU1jKSxiJiZhLmpRdWVyeT09PW8mJihhLmpRdWVyeT1MYyksb30sdHlwZW9mIGI9PT1VJiYoYS5qUXVlcnk9YS4kPW8pLG99KTtcblxuOyBicm93c2VyaWZ5X3NoaW1fX2RlZmluZV9fbW9kdWxlX19leHBvcnRfXyh0eXBlb2YgJCAhPSBcInVuZGVmaW5lZFwiID8gJCA6IHdpbmRvdy4kKTtcblxufSkuY2FsbChnbG9iYWwsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGZ1bmN0aW9uIGRlZmluZUV4cG9ydChleCkgeyBtb2R1bGUuZXhwb3J0cyA9IGV4OyB9KTtcbiIsInZhciB1cmwgPSByZXF1aXJlKCd1cmwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihyb3V0ZXIpIHtcbiAgcmV0dXJuIHtcbiAgICBzZXR1cDogZnVuY3Rpb24oKXtcbiAgICAgICQoJy5uYXYtdGFicyBhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGljaycpXG4gICAgICAgIHZhciBocmVmID0gdXJsLnBhcnNlKHRoaXMuaHJlZik7XG4gICAgICAgIGlmICghJCh0aGlzKS5wYXJlbnQoKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICByb3V0ZXIuc2V0Um91dGUoMiwgaHJlZi5oYXNoLnN1YnN0cigxKSlcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGluZGV4OiBmdW5jdGlvbihpZCwgcmVzb3VyY2UsIGFjdGlvbikge1xuICAgICAgY29uc29sZS5sb2coJ1JPT1QnLCBpZCwgaWQgPT09IHVuZGVmaW5lZClcbiAgICAgIGlmIChpZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICQoJyNsaXN0Jykuc2xpZGVEb3duKCk7XG4gICAgICAgICQoJyNzaG93Jykuc2xpZGVVcCgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBzaG93OiBmdW5jdGlvbiAoaWQsIHJlc291cmNlLCBhY3Rpb24pIHtcbiAgICAgIGNvbnNvbGUubG9nKCduZXR3b3JrU2hvdycpXG4gICAgICAkKCcjbGlzdCcpLnNsaWRlVXAoKTtcbiAgICAgICQoJyNzaG93Jykuc2xpZGVEb3duKCk7XG5cbiAgICAgICQoJ2gyLnRleHQtbXV0ZWQnKS50ZXh0KCdTaG93aW5nIG5ldHdvcmsgJytpZClcblxuICAgICAgaWYgKCFyZXNvdXJjZSlcbiAgICAgICAgJCgnLm5hdi10YWJzIGE6Zmlyc3QnKS50YWIoJ3Nob3cnKVxuXG4gICAgfSxcblxuICAgIHJlc291cmNlOiBmdW5jdGlvbihuZXR3b3JrSWQsIHJlc291cmNlLCBhY3Rpb24pIHtcbiAgICAgIGNvbnNvbGUubG9nKCdyZXNvdXJjZVNob3cnKVxuICAgICAgJCgnLm5hdi10YWJzIGFbaHJlZj1cIiMnK3Jlc291cmNlKydcIl0nKS50YWIoJ3Nob3cnKVxuICAgIH0sXG5cbiAgICByZXNvdXJjZUFjdGlvbjogZnVuY3Rpb24obmV0d29ya0lkLCByZXNvdXJjZSwgYWN0aW9uKSB7XG4gICAgICBjb25zb2xlLmxvZygncmVzb3VyY2VBY3Rpb24nKVxuICAgICAgJCgnIycrcmVzb3VyY2UrJyBzdHJvbmcnKS50ZXh0KGFjdGlvbilcbiAgICB9XG4gIH1cbn1cbiIsInZhciBnbG9iYWw9dHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9Oy8qISBodHRwOi8vbXRocy5iZS9wdW55Y29kZSB2MS4yLjMgYnkgQG1hdGhpYXMgKi9cbjsoZnVuY3Rpb24ocm9vdCkge1xuXG5cdC8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZXMgKi9cblx0dmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cztcblx0dmFyIGZyZWVNb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJlxuXHRcdG1vZHVsZS5leHBvcnRzID09IGZyZWVFeHBvcnRzICYmIG1vZHVsZTtcblx0dmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtcblx0aWYgKGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsIHx8IGZyZWVHbG9iYWwud2luZG93ID09PSBmcmVlR2xvYmFsKSB7XG5cdFx0cm9vdCA9IGZyZWVHbG9iYWw7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGBwdW55Y29kZWAgb2JqZWN0LlxuXHQgKiBAbmFtZSBwdW55Y29kZVxuXHQgKiBAdHlwZSBPYmplY3Rcblx0ICovXG5cdHZhciBwdW55Y29kZSxcblxuXHQvKiogSGlnaGVzdCBwb3NpdGl2ZSBzaWduZWQgMzItYml0IGZsb2F0IHZhbHVlICovXG5cdG1heEludCA9IDIxNDc0ODM2NDcsIC8vIGFrYS4gMHg3RkZGRkZGRiBvciAyXjMxLTFcblxuXHQvKiogQm9vdHN0cmluZyBwYXJhbWV0ZXJzICovXG5cdGJhc2UgPSAzNixcblx0dE1pbiA9IDEsXG5cdHRNYXggPSAyNixcblx0c2tldyA9IDM4LFxuXHRkYW1wID0gNzAwLFxuXHRpbml0aWFsQmlhcyA9IDcyLFxuXHRpbml0aWFsTiA9IDEyOCwgLy8gMHg4MFxuXHRkZWxpbWl0ZXIgPSAnLScsIC8vICdcXHgyRCdcblxuXHQvKiogUmVndWxhciBleHByZXNzaW9ucyAqL1xuXHRyZWdleFB1bnljb2RlID0gL154bi0tLyxcblx0cmVnZXhOb25BU0NJSSA9IC9bXiAtfl0vLCAvLyB1bnByaW50YWJsZSBBU0NJSSBjaGFycyArIG5vbi1BU0NJSSBjaGFyc1xuXHRyZWdleFNlcGFyYXRvcnMgPSAvXFx4MkV8XFx1MzAwMnxcXHVGRjBFfFxcdUZGNjEvZywgLy8gUkZDIDM0OTAgc2VwYXJhdG9yc1xuXG5cdC8qKiBFcnJvciBtZXNzYWdlcyAqL1xuXHRlcnJvcnMgPSB7XG5cdFx0J292ZXJmbG93JzogJ092ZXJmbG93OiBpbnB1dCBuZWVkcyB3aWRlciBpbnRlZ2VycyB0byBwcm9jZXNzJyxcblx0XHQnbm90LWJhc2ljJzogJ0lsbGVnYWwgaW5wdXQgPj0gMHg4MCAobm90IGEgYmFzaWMgY29kZSBwb2ludCknLFxuXHRcdCdpbnZhbGlkLWlucHV0JzogJ0ludmFsaWQgaW5wdXQnXG5cdH0sXG5cblx0LyoqIENvbnZlbmllbmNlIHNob3J0Y3V0cyAqL1xuXHRiYXNlTWludXNUTWluID0gYmFzZSAtIHRNaW4sXG5cdGZsb29yID0gTWF0aC5mbG9vcixcblx0c3RyaW5nRnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZSxcblxuXHQvKiogVGVtcG9yYXJ5IHZhcmlhYmxlICovXG5cdGtleTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICogQSBnZW5lcmljIGVycm9yIHV0aWxpdHkgZnVuY3Rpb24uXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIFRoZSBlcnJvciB0eXBlLlxuXHQgKiBAcmV0dXJucyB7RXJyb3J9IFRocm93cyBhIGBSYW5nZUVycm9yYCB3aXRoIHRoZSBhcHBsaWNhYmxlIGVycm9yIG1lc3NhZ2UuXG5cdCAqL1xuXHRmdW5jdGlvbiBlcnJvcih0eXBlKSB7XG5cdFx0dGhyb3cgUmFuZ2VFcnJvcihlcnJvcnNbdHlwZV0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgZ2VuZXJpYyBgQXJyYXkjbWFwYCB1dGlsaXR5IGZ1bmN0aW9uLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnkgYXJyYXlcblx0ICogaXRlbS5cblx0ICogQHJldHVybnMge0FycmF5fSBBIG5ldyBhcnJheSBvZiB2YWx1ZXMgcmV0dXJuZWQgYnkgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuXHQgKi9cblx0ZnVuY3Rpb24gbWFwKGFycmF5LCBmbikge1xuXHRcdHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cdFx0d2hpbGUgKGxlbmd0aC0tKSB7XG5cdFx0XHRhcnJheVtsZW5ndGhdID0gZm4oYXJyYXlbbGVuZ3RoXSk7XG5cdFx0fVxuXHRcdHJldHVybiBhcnJheTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHNpbXBsZSBgQXJyYXkjbWFwYC1saWtlIHdyYXBwZXIgdG8gd29yayB3aXRoIGRvbWFpbiBuYW1lIHN0cmluZ3MuXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBkb21haW4gVGhlIGRvbWFpbiBuYW1lLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnlcblx0ICogY2hhcmFjdGVyLlxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IEEgbmV3IHN0cmluZyBvZiBjaGFyYWN0ZXJzIHJldHVybmVkIGJ5IHRoZSBjYWxsYmFja1xuXHQgKiBmdW5jdGlvbi5cblx0ICovXG5cdGZ1bmN0aW9uIG1hcERvbWFpbihzdHJpbmcsIGZuKSB7XG5cdFx0cmV0dXJuIG1hcChzdHJpbmcuc3BsaXQocmVnZXhTZXBhcmF0b3JzKSwgZm4pLmpvaW4oJy4nKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIG51bWVyaWMgY29kZSBwb2ludHMgb2YgZWFjaCBVbmljb2RlXG5cdCAqIGNoYXJhY3RlciBpbiB0aGUgc3RyaW5nLiBXaGlsZSBKYXZhU2NyaXB0IHVzZXMgVUNTLTIgaW50ZXJuYWxseSxcblx0ICogdGhpcyBmdW5jdGlvbiB3aWxsIGNvbnZlcnQgYSBwYWlyIG9mIHN1cnJvZ2F0ZSBoYWx2ZXMgKGVhY2ggb2Ygd2hpY2hcblx0ICogVUNTLTIgZXhwb3NlcyBhcyBzZXBhcmF0ZSBjaGFyYWN0ZXJzKSBpbnRvIGEgc2luZ2xlIGNvZGUgcG9pbnQsXG5cdCAqIG1hdGNoaW5nIFVURi0xNi5cblx0ICogQHNlZSBgcHVueWNvZGUudWNzMi5lbmNvZGVgXG5cdCAqIEBzZWUgPGh0dHA6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmc+XG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZS51Y3MyXG5cdCAqIEBuYW1lIGRlY29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBVbmljb2RlIGlucHV0IHN0cmluZyAoVUNTLTIpLlxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IFRoZSBuZXcgYXJyYXkgb2YgY29kZSBwb2ludHMuXG5cdCAqL1xuXHRmdW5jdGlvbiB1Y3MyZGVjb2RlKHN0cmluZykge1xuXHRcdHZhciBvdXRwdXQgPSBbXSxcblx0XHQgICAgY291bnRlciA9IDAsXG5cdFx0ICAgIGxlbmd0aCA9IHN0cmluZy5sZW5ndGgsXG5cdFx0ICAgIHZhbHVlLFxuXHRcdCAgICBleHRyYTtcblx0XHR3aGlsZSAoY291bnRlciA8IGxlbmd0aCkge1xuXHRcdFx0dmFsdWUgPSBzdHJpbmcuY2hhckNvZGVBdChjb3VudGVyKyspO1xuXHRcdFx0aWYgKHZhbHVlID49IDB4RDgwMCAmJiB2YWx1ZSA8PSAweERCRkYgJiYgY291bnRlciA8IGxlbmd0aCkge1xuXHRcdFx0XHQvLyBoaWdoIHN1cnJvZ2F0ZSwgYW5kIHRoZXJlIGlzIGEgbmV4dCBjaGFyYWN0ZXJcblx0XHRcdFx0ZXh0cmEgPSBzdHJpbmcuY2hhckNvZGVBdChjb3VudGVyKyspO1xuXHRcdFx0XHRpZiAoKGV4dHJhICYgMHhGQzAwKSA9PSAweERDMDApIHsgLy8gbG93IHN1cnJvZ2F0ZVxuXHRcdFx0XHRcdG91dHB1dC5wdXNoKCgodmFsdWUgJiAweDNGRikgPDwgMTApICsgKGV4dHJhICYgMHgzRkYpICsgMHgxMDAwMCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gdW5tYXRjaGVkIHN1cnJvZ2F0ZTsgb25seSBhcHBlbmQgdGhpcyBjb2RlIHVuaXQsIGluIGNhc2UgdGhlIG5leHRcblx0XHRcdFx0XHQvLyBjb2RlIHVuaXQgaXMgdGhlIGhpZ2ggc3Vycm9nYXRlIG9mIGEgc3Vycm9nYXRlIHBhaXJcblx0XHRcdFx0XHRvdXRwdXQucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdFx0Y291bnRlci0tO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvdXRwdXQucHVzaCh2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIHN0cmluZyBiYXNlZCBvbiBhbiBhcnJheSBvZiBudW1lcmljIGNvZGUgcG9pbnRzLlxuXHQgKiBAc2VlIGBwdW55Y29kZS51Y3MyLmRlY29kZWBcblx0ICogQG1lbWJlck9mIHB1bnljb2RlLnVjczJcblx0ICogQG5hbWUgZW5jb2RlXG5cdCAqIEBwYXJhbSB7QXJyYXl9IGNvZGVQb2ludHMgVGhlIGFycmF5IG9mIG51bWVyaWMgY29kZSBwb2ludHMuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBuZXcgVW5pY29kZSBzdHJpbmcgKFVDUy0yKS5cblx0ICovXG5cdGZ1bmN0aW9uIHVjczJlbmNvZGUoYXJyYXkpIHtcblx0XHRyZXR1cm4gbWFwKGFycmF5LCBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0dmFyIG91dHB1dCA9ICcnO1xuXHRcdFx0aWYgKHZhbHVlID4gMHhGRkZGKSB7XG5cdFx0XHRcdHZhbHVlIC09IDB4MTAwMDA7XG5cdFx0XHRcdG91dHB1dCArPSBzdHJpbmdGcm9tQ2hhckNvZGUodmFsdWUgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApO1xuXHRcdFx0XHR2YWx1ZSA9IDB4REMwMCB8IHZhbHVlICYgMHgzRkY7XG5cdFx0XHR9XG5cdFx0XHRvdXRwdXQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKHZhbHVlKTtcblx0XHRcdHJldHVybiBvdXRwdXQ7XG5cdFx0fSkuam9pbignJyk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBiYXNpYyBjb2RlIHBvaW50IGludG8gYSBkaWdpdC9pbnRlZ2VyLlxuXHQgKiBAc2VlIGBkaWdpdFRvQmFzaWMoKWBcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGNvZGVQb2ludCBUaGUgYmFzaWMgbnVtZXJpYyBjb2RlIHBvaW50IHZhbHVlLlxuXHQgKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgbnVtZXJpYyB2YWx1ZSBvZiBhIGJhc2ljIGNvZGUgcG9pbnQgKGZvciB1c2UgaW5cblx0ICogcmVwcmVzZW50aW5nIGludGVnZXJzKSBpbiB0aGUgcmFuZ2UgYDBgIHRvIGBiYXNlIC0gMWAsIG9yIGBiYXNlYCBpZlxuXHQgKiB0aGUgY29kZSBwb2ludCBkb2VzIG5vdCByZXByZXNlbnQgYSB2YWx1ZS5cblx0ICovXG5cdGZ1bmN0aW9uIGJhc2ljVG9EaWdpdChjb2RlUG9pbnQpIHtcblx0XHRpZiAoY29kZVBvaW50IC0gNDggPCAxMCkge1xuXHRcdFx0cmV0dXJuIGNvZGVQb2ludCAtIDIyO1xuXHRcdH1cblx0XHRpZiAoY29kZVBvaW50IC0gNjUgPCAyNikge1xuXHRcdFx0cmV0dXJuIGNvZGVQb2ludCAtIDY1O1xuXHRcdH1cblx0XHRpZiAoY29kZVBvaW50IC0gOTcgPCAyNikge1xuXHRcdFx0cmV0dXJuIGNvZGVQb2ludCAtIDk3O1xuXHRcdH1cblx0XHRyZXR1cm4gYmFzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIGRpZ2l0L2ludGVnZXIgaW50byBhIGJhc2ljIGNvZGUgcG9pbnQuXG5cdCAqIEBzZWUgYGJhc2ljVG9EaWdpdCgpYFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gZGlnaXQgVGhlIG51bWVyaWMgdmFsdWUgb2YgYSBiYXNpYyBjb2RlIHBvaW50LlxuXHQgKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgYmFzaWMgY29kZSBwb2ludCB3aG9zZSB2YWx1ZSAod2hlbiB1c2VkIGZvclxuXHQgKiByZXByZXNlbnRpbmcgaW50ZWdlcnMpIGlzIGBkaWdpdGAsIHdoaWNoIG5lZWRzIHRvIGJlIGluIHRoZSByYW5nZVxuXHQgKiBgMGAgdG8gYGJhc2UgLSAxYC4gSWYgYGZsYWdgIGlzIG5vbi16ZXJvLCB0aGUgdXBwZXJjYXNlIGZvcm0gaXNcblx0ICogdXNlZDsgZWxzZSwgdGhlIGxvd2VyY2FzZSBmb3JtIGlzIHVzZWQuIFRoZSBiZWhhdmlvciBpcyB1bmRlZmluZWRcblx0ICogaWYgYGZsYWdgIGlzIG5vbi16ZXJvIGFuZCBgZGlnaXRgIGhhcyBubyB1cHBlcmNhc2UgZm9ybS5cblx0ICovXG5cdGZ1bmN0aW9uIGRpZ2l0VG9CYXNpYyhkaWdpdCwgZmxhZykge1xuXHRcdC8vICAwLi4yNSBtYXAgdG8gQVNDSUkgYS4ueiBvciBBLi5aXG5cdFx0Ly8gMjYuLjM1IG1hcCB0byBBU0NJSSAwLi45XG5cdFx0cmV0dXJuIGRpZ2l0ICsgMjIgKyA3NSAqIChkaWdpdCA8IDI2KSAtICgoZmxhZyAhPSAwKSA8PCA1KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBCaWFzIGFkYXB0YXRpb24gZnVuY3Rpb24gYXMgcGVyIHNlY3Rpb24gMy40IG9mIFJGQyAzNDkyLlxuXHQgKiBodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzNDkyI3NlY3Rpb24tMy40XG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRmdW5jdGlvbiBhZGFwdChkZWx0YSwgbnVtUG9pbnRzLCBmaXJzdFRpbWUpIHtcblx0XHR2YXIgayA9IDA7XG5cdFx0ZGVsdGEgPSBmaXJzdFRpbWUgPyBmbG9vcihkZWx0YSAvIGRhbXApIDogZGVsdGEgPj4gMTtcblx0XHRkZWx0YSArPSBmbG9vcihkZWx0YSAvIG51bVBvaW50cyk7XG5cdFx0Zm9yICgvKiBubyBpbml0aWFsaXphdGlvbiAqLzsgZGVsdGEgPiBiYXNlTWludXNUTWluICogdE1heCA+PiAxOyBrICs9IGJhc2UpIHtcblx0XHRcdGRlbHRhID0gZmxvb3IoZGVsdGEgLyBiYXNlTWludXNUTWluKTtcblx0XHR9XG5cdFx0cmV0dXJuIGZsb29yKGsgKyAoYmFzZU1pbnVzVE1pbiArIDEpICogZGVsdGEgLyAoZGVsdGEgKyBza2V3KSk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzIHRvIGEgc3RyaW5nIG9mIFVuaWNvZGVcblx0ICogc3ltYm9scy5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIHJlc3VsdGluZyBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzLlxuXHQgKi9cblx0ZnVuY3Rpb24gZGVjb2RlKGlucHV0KSB7XG5cdFx0Ly8gRG9uJ3QgdXNlIFVDUy0yXG5cdFx0dmFyIG91dHB1dCA9IFtdLFxuXHRcdCAgICBpbnB1dExlbmd0aCA9IGlucHV0Lmxlbmd0aCxcblx0XHQgICAgb3V0LFxuXHRcdCAgICBpID0gMCxcblx0XHQgICAgbiA9IGluaXRpYWxOLFxuXHRcdCAgICBiaWFzID0gaW5pdGlhbEJpYXMsXG5cdFx0ICAgIGJhc2ljLFxuXHRcdCAgICBqLFxuXHRcdCAgICBpbmRleCxcblx0XHQgICAgb2xkaSxcblx0XHQgICAgdyxcblx0XHQgICAgayxcblx0XHQgICAgZGlnaXQsXG5cdFx0ICAgIHQsXG5cdFx0ICAgIGxlbmd0aCxcblx0XHQgICAgLyoqIENhY2hlZCBjYWxjdWxhdGlvbiByZXN1bHRzICovXG5cdFx0ICAgIGJhc2VNaW51c1Q7XG5cblx0XHQvLyBIYW5kbGUgdGhlIGJhc2ljIGNvZGUgcG9pbnRzOiBsZXQgYGJhc2ljYCBiZSB0aGUgbnVtYmVyIG9mIGlucHV0IGNvZGVcblx0XHQvLyBwb2ludHMgYmVmb3JlIHRoZSBsYXN0IGRlbGltaXRlciwgb3IgYDBgIGlmIHRoZXJlIGlzIG5vbmUsIHRoZW4gY29weVxuXHRcdC8vIHRoZSBmaXJzdCBiYXNpYyBjb2RlIHBvaW50cyB0byB0aGUgb3V0cHV0LlxuXG5cdFx0YmFzaWMgPSBpbnB1dC5sYXN0SW5kZXhPZihkZWxpbWl0ZXIpO1xuXHRcdGlmIChiYXNpYyA8IDApIHtcblx0XHRcdGJhc2ljID0gMDtcblx0XHR9XG5cblx0XHRmb3IgKGogPSAwOyBqIDwgYmFzaWM7ICsraikge1xuXHRcdFx0Ly8gaWYgaXQncyBub3QgYSBiYXNpYyBjb2RlIHBvaW50XG5cdFx0XHRpZiAoaW5wdXQuY2hhckNvZGVBdChqKSA+PSAweDgwKSB7XG5cdFx0XHRcdGVycm9yKCdub3QtYmFzaWMnKTtcblx0XHRcdH1cblx0XHRcdG91dHB1dC5wdXNoKGlucHV0LmNoYXJDb2RlQXQoaikpO1xuXHRcdH1cblxuXHRcdC8vIE1haW4gZGVjb2RpbmcgbG9vcDogc3RhcnQganVzdCBhZnRlciB0aGUgbGFzdCBkZWxpbWl0ZXIgaWYgYW55IGJhc2ljIGNvZGVcblx0XHQvLyBwb2ludHMgd2VyZSBjb3BpZWQ7IHN0YXJ0IGF0IHRoZSBiZWdpbm5pbmcgb3RoZXJ3aXNlLlxuXG5cdFx0Zm9yIChpbmRleCA9IGJhc2ljID4gMCA/IGJhc2ljICsgMSA6IDA7IGluZGV4IDwgaW5wdXRMZW5ndGg7IC8qIG5vIGZpbmFsIGV4cHJlc3Npb24gKi8pIHtcblxuXHRcdFx0Ly8gYGluZGV4YCBpcyB0aGUgaW5kZXggb2YgdGhlIG5leHQgY2hhcmFjdGVyIHRvIGJlIGNvbnN1bWVkLlxuXHRcdFx0Ly8gRGVjb2RlIGEgZ2VuZXJhbGl6ZWQgdmFyaWFibGUtbGVuZ3RoIGludGVnZXIgaW50byBgZGVsdGFgLFxuXHRcdFx0Ly8gd2hpY2ggZ2V0cyBhZGRlZCB0byBgaWAuIFRoZSBvdmVyZmxvdyBjaGVja2luZyBpcyBlYXNpZXJcblx0XHRcdC8vIGlmIHdlIGluY3JlYXNlIGBpYCBhcyB3ZSBnbywgdGhlbiBzdWJ0cmFjdCBvZmYgaXRzIHN0YXJ0aW5nXG5cdFx0XHQvLyB2YWx1ZSBhdCB0aGUgZW5kIHRvIG9idGFpbiBgZGVsdGFgLlxuXHRcdFx0Zm9yIChvbGRpID0gaSwgdyA9IDEsIGsgPSBiYXNlOyAvKiBubyBjb25kaXRpb24gKi87IGsgKz0gYmFzZSkge1xuXG5cdFx0XHRcdGlmIChpbmRleCA+PSBpbnB1dExlbmd0aCkge1xuXHRcdFx0XHRcdGVycm9yKCdpbnZhbGlkLWlucHV0Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkaWdpdCA9IGJhc2ljVG9EaWdpdChpbnB1dC5jaGFyQ29kZUF0KGluZGV4KyspKTtcblxuXHRcdFx0XHRpZiAoZGlnaXQgPj0gYmFzZSB8fCBkaWdpdCA+IGZsb29yKChtYXhJbnQgLSBpKSAvIHcpKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpICs9IGRpZ2l0ICogdztcblx0XHRcdFx0dCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG5cblx0XHRcdFx0aWYgKGRpZ2l0IDwgdCkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YmFzZU1pbnVzVCA9IGJhc2UgLSB0O1xuXHRcdFx0XHRpZiAodyA+IGZsb29yKG1heEludCAvIGJhc2VNaW51c1QpKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR3ICo9IGJhc2VNaW51c1Q7XG5cblx0XHRcdH1cblxuXHRcdFx0b3V0ID0gb3V0cHV0Lmxlbmd0aCArIDE7XG5cdFx0XHRiaWFzID0gYWRhcHQoaSAtIG9sZGksIG91dCwgb2xkaSA9PSAwKTtcblxuXHRcdFx0Ly8gYGlgIHdhcyBzdXBwb3NlZCB0byB3cmFwIGFyb3VuZCBmcm9tIGBvdXRgIHRvIGAwYCxcblx0XHRcdC8vIGluY3JlbWVudGluZyBgbmAgZWFjaCB0aW1lLCBzbyB3ZSdsbCBmaXggdGhhdCBub3c6XG5cdFx0XHRpZiAoZmxvb3IoaSAvIG91dCkgPiBtYXhJbnQgLSBuKSB7XG5cdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRuICs9IGZsb29yKGkgLyBvdXQpO1xuXHRcdFx0aSAlPSBvdXQ7XG5cblx0XHRcdC8vIEluc2VydCBgbmAgYXQgcG9zaXRpb24gYGlgIG9mIHRoZSBvdXRwdXRcblx0XHRcdG91dHB1dC5zcGxpY2UoaSsrLCAwLCBuKTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB1Y3MyZW5jb2RlKG91dHB1dCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzIHRvIGEgUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHlcblx0ICogc3ltYm9scy5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIHJlc3VsdGluZyBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKi9cblx0ZnVuY3Rpb24gZW5jb2RlKGlucHV0KSB7XG5cdFx0dmFyIG4sXG5cdFx0ICAgIGRlbHRhLFxuXHRcdCAgICBoYW5kbGVkQ1BDb3VudCxcblx0XHQgICAgYmFzaWNMZW5ndGgsXG5cdFx0ICAgIGJpYXMsXG5cdFx0ICAgIGosXG5cdFx0ICAgIG0sXG5cdFx0ICAgIHEsXG5cdFx0ICAgIGssXG5cdFx0ICAgIHQsXG5cdFx0ICAgIGN1cnJlbnRWYWx1ZSxcblx0XHQgICAgb3V0cHV0ID0gW10sXG5cdFx0ICAgIC8qKiBgaW5wdXRMZW5ndGhgIHdpbGwgaG9sZCB0aGUgbnVtYmVyIG9mIGNvZGUgcG9pbnRzIGluIGBpbnB1dGAuICovXG5cdFx0ICAgIGlucHV0TGVuZ3RoLFxuXHRcdCAgICAvKiogQ2FjaGVkIGNhbGN1bGF0aW9uIHJlc3VsdHMgKi9cblx0XHQgICAgaGFuZGxlZENQQ291bnRQbHVzT25lLFxuXHRcdCAgICBiYXNlTWludXNULFxuXHRcdCAgICBxTWludXNUO1xuXG5cdFx0Ly8gQ29udmVydCB0aGUgaW5wdXQgaW4gVUNTLTIgdG8gVW5pY29kZVxuXHRcdGlucHV0ID0gdWNzMmRlY29kZShpbnB1dCk7XG5cblx0XHQvLyBDYWNoZSB0aGUgbGVuZ3RoXG5cdFx0aW5wdXRMZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cblx0XHQvLyBJbml0aWFsaXplIHRoZSBzdGF0ZVxuXHRcdG4gPSBpbml0aWFsTjtcblx0XHRkZWx0YSA9IDA7XG5cdFx0YmlhcyA9IGluaXRpYWxCaWFzO1xuXG5cdFx0Ly8gSGFuZGxlIHRoZSBiYXNpYyBjb2RlIHBvaW50c1xuXHRcdGZvciAoaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRjdXJyZW50VmFsdWUgPSBpbnB1dFtqXTtcblx0XHRcdGlmIChjdXJyZW50VmFsdWUgPCAweDgwKSB7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZShjdXJyZW50VmFsdWUpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRoYW5kbGVkQ1BDb3VudCA9IGJhc2ljTGVuZ3RoID0gb3V0cHV0Lmxlbmd0aDtcblxuXHRcdC8vIGBoYW5kbGVkQ1BDb3VudGAgaXMgdGhlIG51bWJlciBvZiBjb2RlIHBvaW50cyB0aGF0IGhhdmUgYmVlbiBoYW5kbGVkO1xuXHRcdC8vIGBiYXNpY0xlbmd0aGAgaXMgdGhlIG51bWJlciBvZiBiYXNpYyBjb2RlIHBvaW50cy5cblxuXHRcdC8vIEZpbmlzaCB0aGUgYmFzaWMgc3RyaW5nIC0gaWYgaXQgaXMgbm90IGVtcHR5IC0gd2l0aCBhIGRlbGltaXRlclxuXHRcdGlmIChiYXNpY0xlbmd0aCkge1xuXHRcdFx0b3V0cHV0LnB1c2goZGVsaW1pdGVyKTtcblx0XHR9XG5cblx0XHQvLyBNYWluIGVuY29kaW5nIGxvb3A6XG5cdFx0d2hpbGUgKGhhbmRsZWRDUENvdW50IDwgaW5wdXRMZW5ndGgpIHtcblxuXHRcdFx0Ly8gQWxsIG5vbi1iYXNpYyBjb2RlIHBvaW50cyA8IG4gaGF2ZSBiZWVuIGhhbmRsZWQgYWxyZWFkeS4gRmluZCB0aGUgbmV4dFxuXHRcdFx0Ly8gbGFyZ2VyIG9uZTpcblx0XHRcdGZvciAobSA9IG1heEludCwgaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlID49IG4gJiYgY3VycmVudFZhbHVlIDwgbSkge1xuXHRcdFx0XHRcdG0gPSBjdXJyZW50VmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gSW5jcmVhc2UgYGRlbHRhYCBlbm91Z2ggdG8gYWR2YW5jZSB0aGUgZGVjb2RlcidzIDxuLGk+IHN0YXRlIHRvIDxtLDA+LFxuXHRcdFx0Ly8gYnV0IGd1YXJkIGFnYWluc3Qgb3ZlcmZsb3dcblx0XHRcdGhhbmRsZWRDUENvdW50UGx1c09uZSA9IGhhbmRsZWRDUENvdW50ICsgMTtcblx0XHRcdGlmIChtIC0gbiA+IGZsb29yKChtYXhJbnQgLSBkZWx0YSkgLyBoYW5kbGVkQ1BDb3VudFBsdXNPbmUpKSB7XG5cdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRkZWx0YSArPSAobSAtIG4pICogaGFuZGxlZENQQ291bnRQbHVzT25lO1xuXHRcdFx0biA9IG07XG5cblx0XHRcdGZvciAoaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPCBuICYmICsrZGVsdGEgPiBtYXhJbnQpIHtcblx0XHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPT0gbikge1xuXHRcdFx0XHRcdC8vIFJlcHJlc2VudCBkZWx0YSBhcyBhIGdlbmVyYWxpemVkIHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyXG5cdFx0XHRcdFx0Zm9yIChxID0gZGVsdGEsIGsgPSBiYXNlOyAvKiBubyBjb25kaXRpb24gKi87IGsgKz0gYmFzZSkge1xuXHRcdFx0XHRcdFx0dCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG5cdFx0XHRcdFx0XHRpZiAocSA8IHQpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRxTWludXNUID0gcSAtIHQ7XG5cdFx0XHRcdFx0XHRiYXNlTWludXNUID0gYmFzZSAtIHQ7XG5cdFx0XHRcdFx0XHRvdXRwdXQucHVzaChcblx0XHRcdFx0XHRcdFx0c3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyh0ICsgcU1pbnVzVCAlIGJhc2VNaW51c1QsIDApKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHEgPSBmbG9vcihxTWludXNUIC8gYmFzZU1pbnVzVCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyhxLCAwKSkpO1xuXHRcdFx0XHRcdGJpYXMgPSBhZGFwdChkZWx0YSwgaGFuZGxlZENQQ291bnRQbHVzT25lLCBoYW5kbGVkQ1BDb3VudCA9PSBiYXNpY0xlbmd0aCk7XG5cdFx0XHRcdFx0ZGVsdGEgPSAwO1xuXHRcdFx0XHRcdCsraGFuZGxlZENQQ291bnQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0KytkZWx0YTtcblx0XHRcdCsrbjtcblxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0LmpvaW4oJycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgUHVueWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIHRvIFVuaWNvZGUuIE9ubHkgdGhlXG5cdCAqIFB1bnljb2RlZCBwYXJ0cyBvZiB0aGUgZG9tYWluIG5hbWUgd2lsbCBiZSBjb252ZXJ0ZWQsIGkuZS4gaXQgZG9lc24ndFxuXHQgKiBtYXR0ZXIgaWYgeW91IGNhbGwgaXQgb24gYSBzdHJpbmcgdGhhdCBoYXMgYWxyZWFkeSBiZWVuIGNvbnZlcnRlZCB0b1xuXHQgKiBVbmljb2RlLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGRvbWFpbiBUaGUgUHVueWNvZGUgZG9tYWluIG5hbWUgdG8gY29udmVydCB0byBVbmljb2RlLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgVW5pY29kZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gUHVueWNvZGVcblx0ICogc3RyaW5nLlxuXHQgKi9cblx0ZnVuY3Rpb24gdG9Vbmljb2RlKGRvbWFpbikge1xuXHRcdHJldHVybiBtYXBEb21haW4oZG9tYWluLCBmdW5jdGlvbihzdHJpbmcpIHtcblx0XHRcdHJldHVybiByZWdleFB1bnljb2RlLnRlc3Qoc3RyaW5nKVxuXHRcdFx0XHQ/IGRlY29kZShzdHJpbmcuc2xpY2UoNCkudG9Mb3dlckNhc2UoKSlcblx0XHRcdFx0OiBzdHJpbmc7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBVbmljb2RlIHN0cmluZyByZXByZXNlbnRpbmcgYSBkb21haW4gbmFtZSB0byBQdW55Y29kZS4gT25seSB0aGVcblx0ICogbm9uLUFTQ0lJIHBhcnRzIG9mIHRoZSBkb21haW4gbmFtZSB3aWxsIGJlIGNvbnZlcnRlZCwgaS5lLiBpdCBkb2Vzbid0XG5cdCAqIG1hdHRlciBpZiB5b3UgY2FsbCBpdCB3aXRoIGEgZG9tYWluIHRoYXQncyBhbHJlYWR5IGluIEFTQ0lJLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGRvbWFpbiBUaGUgZG9tYWluIG5hbWUgdG8gY29udmVydCwgYXMgYSBVbmljb2RlIHN0cmluZy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIFB1bnljb2RlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBnaXZlbiBkb21haW4gbmFtZS5cblx0ICovXG5cdGZ1bmN0aW9uIHRvQVNDSUkoZG9tYWluKSB7XG5cdFx0cmV0dXJuIG1hcERvbWFpbihkb21haW4sIGZ1bmN0aW9uKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIHJlZ2V4Tm9uQVNDSUkudGVzdChzdHJpbmcpXG5cdFx0XHRcdD8gJ3huLS0nICsgZW5jb2RlKHN0cmluZylcblx0XHRcdFx0OiBzdHJpbmc7XG5cdFx0fSk7XG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKiogRGVmaW5lIHRoZSBwdWJsaWMgQVBJICovXG5cdHB1bnljb2RlID0ge1xuXHRcdC8qKlxuXHRcdCAqIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgY3VycmVudCBQdW55Y29kZS5qcyB2ZXJzaW9uIG51bWJlci5cblx0XHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0XHQgKiBAdHlwZSBTdHJpbmdcblx0XHQgKi9cblx0XHQndmVyc2lvbic6ICcxLjIuMycsXG5cdFx0LyoqXG5cdFx0ICogQW4gb2JqZWN0IG9mIG1ldGhvZHMgdG8gY29udmVydCBmcm9tIEphdmFTY3JpcHQncyBpbnRlcm5hbCBjaGFyYWN0ZXJcblx0XHQgKiByZXByZXNlbnRhdGlvbiAoVUNTLTIpIHRvIFVuaWNvZGUgY29kZSBwb2ludHMsIGFuZCBiYWNrLlxuXHRcdCAqIEBzZWUgPGh0dHA6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmc+XG5cdFx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdFx0ICogQHR5cGUgT2JqZWN0XG5cdFx0ICovXG5cdFx0J3VjczInOiB7XG5cdFx0XHQnZGVjb2RlJzogdWNzMmRlY29kZSxcblx0XHRcdCdlbmNvZGUnOiB1Y3MyZW5jb2RlXG5cdFx0fSxcblx0XHQnZGVjb2RlJzogZGVjb2RlLFxuXHRcdCdlbmNvZGUnOiBlbmNvZGUsXG5cdFx0J3RvQVNDSUknOiB0b0FTQ0lJLFxuXHRcdCd0b1VuaWNvZGUnOiB0b1VuaWNvZGVcblx0fTtcblxuXHQvKiogRXhwb3NlIGBwdW55Y29kZWAgKi9cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gcHVueWNvZGU7XG5cdFx0fSk7XG5cdH1cdGVsc2UgaWYgKGZyZWVFeHBvcnRzICYmICFmcmVlRXhwb3J0cy5ub2RlVHlwZSkge1xuXHRcdGlmIChmcmVlTW9kdWxlKSB7IC8vIGluIE5vZGUuanMgb3IgUmluZ29KUyB2MC44LjArXG5cdFx0XHRmcmVlTW9kdWxlLmV4cG9ydHMgPSBwdW55Y29kZTtcblx0XHR9IGVsc2UgeyAvLyBpbiBOYXJ3aGFsIG9yIFJpbmdvSlMgdjAuNy4wLVxuXHRcdFx0Zm9yIChrZXkgaW4gcHVueWNvZGUpIHtcblx0XHRcdFx0cHVueWNvZGUuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAoZnJlZUV4cG9ydHNba2V5XSA9IHB1bnljb2RlW2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHsgLy8gaW4gUmhpbm8gb3IgYSB3ZWIgYnJvd3NlclxuXHRcdHJvb3QucHVueWNvZGUgPSBwdW55Y29kZTtcblx0fVxuXG59KHRoaXMpKTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbi8vIElmIG9iai5oYXNPd25Qcm9wZXJ0eSBoYXMgYmVlbiBvdmVycmlkZGVuLCB0aGVuIGNhbGxpbmdcbi8vIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSB3aWxsIGJyZWFrLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vam95ZW50L25vZGUvaXNzdWVzLzE3MDdcbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocXMsIHNlcCwgZXEsIG9wdGlvbnMpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIHZhciBvYmogPSB7fTtcblxuICBpZiAodHlwZW9mIHFzICE9PSAnc3RyaW5nJyB8fCBxcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgdmFyIHJlZ2V4cCA9IC9cXCsvZztcbiAgcXMgPSBxcy5zcGxpdChzZXApO1xuXG4gIHZhciBtYXhLZXlzID0gMTAwMDtcbiAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMubWF4S2V5cyA9PT0gJ251bWJlcicpIHtcbiAgICBtYXhLZXlzID0gb3B0aW9ucy5tYXhLZXlzO1xuICB9XG5cbiAgdmFyIGxlbiA9IHFzLmxlbmd0aDtcbiAgLy8gbWF4S2V5cyA8PSAwIG1lYW5zIHRoYXQgd2Ugc2hvdWxkIG5vdCBsaW1pdCBrZXlzIGNvdW50XG4gIGlmIChtYXhLZXlzID4gMCAmJiBsZW4gPiBtYXhLZXlzKSB7XG4gICAgbGVuID0gbWF4S2V5cztcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICB2YXIgeCA9IHFzW2ldLnJlcGxhY2UocmVnZXhwLCAnJTIwJyksXG4gICAgICAgIGlkeCA9IHguaW5kZXhPZihlcSksXG4gICAgICAgIGtzdHIsIHZzdHIsIGssIHY7XG5cbiAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgIGtzdHIgPSB4LnN1YnN0cigwLCBpZHgpO1xuICAgICAgdnN0ciA9IHguc3Vic3RyKGlkeCArIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBrc3RyID0geDtcbiAgICAgIHZzdHIgPSAnJztcbiAgICB9XG5cbiAgICBrID0gZGVjb2RlVVJJQ29tcG9uZW50KGtzdHIpO1xuICAgIHYgPSBkZWNvZGVVUklDb21wb25lbnQodnN0cik7XG5cbiAgICBpZiAoIWhhc093blByb3BlcnR5KG9iaiwgaykpIHtcbiAgICAgIG9ialtrXSA9IHY7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KG9ialtrXSkpIHtcbiAgICAgIG9ialtrXS5wdXNoKHYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpba10gPSBbb2JqW2tdLCB2XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uICh4cykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHhzKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5naWZ5UHJpbWl0aXZlID0gZnVuY3Rpb24odikge1xuICBzd2l0Y2ggKHR5cGVvZiB2KSB7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHJldHVybiB2O1xuXG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICByZXR1cm4gdiA/ICd0cnVlJyA6ICdmYWxzZSc7XG5cbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgcmV0dXJuIGlzRmluaXRlKHYpID8gdiA6ICcnO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnJztcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmosIHNlcCwgZXEsIG5hbWUpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIGlmIChvYmogPT09IG51bGwpIHtcbiAgICBvYmogPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gbWFwKG9iamVjdEtleXMob2JqKSwgZnVuY3Rpb24oaykge1xuICAgICAgdmFyIGtzID0gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShrKSkgKyBlcTtcbiAgICAgIGlmIChpc0FycmF5KG9ialtrXSkpIHtcbiAgICAgICAgcmV0dXJuIG9ialtrXS5tYXAoZnVuY3Rpb24odikge1xuICAgICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUodikpO1xuICAgICAgICB9KS5qb2luKHNlcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ga3MgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG9ialtrXSkpO1xuICAgICAgfVxuICAgIH0pLmpvaW4oc2VwKTtcblxuICB9XG5cbiAgaWYgKCFuYW1lKSByZXR1cm4gJyc7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG5hbWUpKSArIGVxICtcbiAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqKSk7XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHhzKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeHMpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxuZnVuY3Rpb24gbWFwICh4cywgZikge1xuICBpZiAoeHMubWFwKSByZXR1cm4geHMubWFwKGYpO1xuICB2YXIgcmVzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcbiAgICByZXMucHVzaChmKHhzW2ldLCBpKSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxudmFyIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSByZXMucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmRlY29kZSA9IGV4cG9ydHMucGFyc2UgPSByZXF1aXJlKCcuL2RlY29kZScpO1xuZXhwb3J0cy5lbmNvZGUgPSBleHBvcnRzLnN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vZW5jb2RlJyk7XG4iLCIvKmpzaGludCBzdHJpY3Q6dHJ1ZSBub2RlOnRydWUgZXM1OnRydWUgb25ldmFyOnRydWUgbGF4Y29tbWE6dHJ1ZSBsYXhicmVhazp0cnVlIGVxZXFlcTp0cnVlIGltbWVkOnRydWUgbGF0ZWRlZjp0cnVlKi9cbihmdW5jdGlvbiAoKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4vLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxudmFyIHB1bnljb2RlID0gcmVxdWlyZSgncHVueWNvZGUnKTtcblxuZXhwb3J0cy5wYXJzZSA9IHVybFBhcnNlO1xuZXhwb3J0cy5yZXNvbHZlID0gdXJsUmVzb2x2ZTtcbmV4cG9ydHMucmVzb2x2ZU9iamVjdCA9IHVybFJlc29sdmVPYmplY3Q7XG5leHBvcnRzLmZvcm1hdCA9IHVybEZvcm1hdDtcblxuLy8gUmVmZXJlbmNlOiBSRkMgMzk4NiwgUkZDIDE4MDgsIFJGQyAyMzk2XG5cbi8vIGRlZmluZSB0aGVzZSBoZXJlIHNvIGF0IGxlYXN0IHRoZXkgb25seSBoYXZlIHRvIGJlXG4vLyBjb21waWxlZCBvbmNlIG9uIHRoZSBmaXJzdCBtb2R1bGUgbG9hZC5cbnZhciBwcm90b2NvbFBhdHRlcm4gPSAvXihbYS16MC05ListXSs6KS9pLFxuICAgIHBvcnRQYXR0ZXJuID0gLzpbMC05XSokLyxcblxuICAgIC8vIFJGQyAyMzk2OiBjaGFyYWN0ZXJzIHJlc2VydmVkIGZvciBkZWxpbWl0aW5nIFVSTHMuXG4gICAgLy8gV2UgYWN0dWFsbHkganVzdCBhdXRvLWVzY2FwZSB0aGVzZS5cbiAgICBkZWxpbXMgPSBbJzwnLCAnPicsICdcIicsICdgJywgJyAnLCAnXFxyJywgJ1xcbicsICdcXHQnXSxcblxuICAgIC8vIFJGQyAyMzk2OiBjaGFyYWN0ZXJzIG5vdCBhbGxvd2VkIGZvciB2YXJpb3VzIHJlYXNvbnMuXG4gICAgdW53aXNlID0gWyd7JywgJ30nLCAnfCcsICdcXFxcJywgJ14nLCAnficsICdgJ10uY29uY2F0KGRlbGltcyksXG5cbiAgICAvLyBBbGxvd2VkIGJ5IFJGQ3MsIGJ1dCBjYXVzZSBvZiBYU1MgYXR0YWNrcy4gIEFsd2F5cyBlc2NhcGUgdGhlc2UuXG4gICAgYXV0b0VzY2FwZSA9IFsnXFwnJ10uY29uY2F0KGRlbGltcyksXG4gICAgLy8gQ2hhcmFjdGVycyB0aGF0IGFyZSBuZXZlciBldmVyIGFsbG93ZWQgaW4gYSBob3N0bmFtZS5cbiAgICAvLyBOb3RlIHRoYXQgYW55IGludmFsaWQgY2hhcnMgYXJlIGFsc28gaGFuZGxlZCwgYnV0IHRoZXNlXG4gICAgLy8gYXJlIHRoZSBvbmVzIHRoYXQgYXJlICpleHBlY3RlZCogdG8gYmUgc2Vlbiwgc28gd2UgZmFzdC1wYXRoXG4gICAgLy8gdGhlbS5cbiAgICBub25Ib3N0Q2hhcnMgPSBbJyUnLCAnLycsICc/JywgJzsnLCAnIyddXG4gICAgICAuY29uY2F0KHVud2lzZSkuY29uY2F0KGF1dG9Fc2NhcGUpLFxuICAgIG5vbkF1dGhDaGFycyA9IFsnLycsICdAJywgJz8nLCAnIyddLmNvbmNhdChkZWxpbXMpLFxuICAgIGhvc3RuYW1lTWF4TGVuID0gMjU1LFxuICAgIGhvc3RuYW1lUGFydFBhdHRlcm4gPSAvXlthLXpBLVowLTldW2EtejAtOUEtWl8tXXswLDYyfSQvLFxuICAgIGhvc3RuYW1lUGFydFN0YXJ0ID0gL14oW2EtekEtWjAtOV1bYS16MC05QS1aXy1dezAsNjJ9KSguKikkLyxcbiAgICAvLyBwcm90b2NvbHMgdGhhdCBjYW4gYWxsb3cgXCJ1bnNhZmVcIiBhbmQgXCJ1bndpc2VcIiBjaGFycy5cbiAgICB1bnNhZmVQcm90b2NvbCA9IHtcbiAgICAgICdqYXZhc2NyaXB0JzogdHJ1ZSxcbiAgICAgICdqYXZhc2NyaXB0Oic6IHRydWVcbiAgICB9LFxuICAgIC8vIHByb3RvY29scyB0aGF0IG5ldmVyIGhhdmUgYSBob3N0bmFtZS5cbiAgICBob3N0bGVzc1Byb3RvY29sID0ge1xuICAgICAgJ2phdmFzY3JpcHQnOiB0cnVlLFxuICAgICAgJ2phdmFzY3JpcHQ6JzogdHJ1ZVxuICAgIH0sXG4gICAgLy8gcHJvdG9jb2xzIHRoYXQgYWx3YXlzIGhhdmUgYSBwYXRoIGNvbXBvbmVudC5cbiAgICBwYXRoZWRQcm90b2NvbCA9IHtcbiAgICAgICdodHRwJzogdHJ1ZSxcbiAgICAgICdodHRwcyc6IHRydWUsXG4gICAgICAnZnRwJzogdHJ1ZSxcbiAgICAgICdnb3BoZXInOiB0cnVlLFxuICAgICAgJ2ZpbGUnOiB0cnVlLFxuICAgICAgJ2h0dHA6JzogdHJ1ZSxcbiAgICAgICdmdHA6JzogdHJ1ZSxcbiAgICAgICdnb3BoZXI6JzogdHJ1ZSxcbiAgICAgICdmaWxlOic6IHRydWVcbiAgICB9LFxuICAgIC8vIHByb3RvY29scyB0aGF0IGFsd2F5cyBjb250YWluIGEgLy8gYml0LlxuICAgIHNsYXNoZWRQcm90b2NvbCA9IHtcbiAgICAgICdodHRwJzogdHJ1ZSxcbiAgICAgICdodHRwcyc6IHRydWUsXG4gICAgICAnZnRwJzogdHJ1ZSxcbiAgICAgICdnb3BoZXInOiB0cnVlLFxuICAgICAgJ2ZpbGUnOiB0cnVlLFxuICAgICAgJ2h0dHA6JzogdHJ1ZSxcbiAgICAgICdodHRwczonOiB0cnVlLFxuICAgICAgJ2Z0cDonOiB0cnVlLFxuICAgICAgJ2dvcGhlcjonOiB0cnVlLFxuICAgICAgJ2ZpbGU6JzogdHJ1ZVxuICAgIH0sXG4gICAgcXVlcnlzdHJpbmcgPSByZXF1aXJlKCdxdWVyeXN0cmluZycpO1xuXG5mdW5jdGlvbiB1cmxQYXJzZSh1cmwsIHBhcnNlUXVlcnlTdHJpbmcsIHNsYXNoZXNEZW5vdGVIb3N0KSB7XG4gIGlmICh1cmwgJiYgdHlwZW9mKHVybCkgPT09ICdvYmplY3QnICYmIHVybC5ocmVmKSByZXR1cm4gdXJsO1xuXG4gIGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQYXJhbWV0ZXIgJ3VybCcgbXVzdCBiZSBhIHN0cmluZywgbm90IFwiICsgdHlwZW9mIHVybCk7XG4gIH1cblxuICB2YXIgb3V0ID0ge30sXG4gICAgICByZXN0ID0gdXJsO1xuXG4gIC8vIHRyaW0gYmVmb3JlIHByb2NlZWRpbmcuXG4gIC8vIFRoaXMgaXMgdG8gc3VwcG9ydCBwYXJzZSBzdHVmZiBsaWtlIFwiICBodHRwOi8vZm9vLmNvbSAgXFxuXCJcbiAgcmVzdCA9IHJlc3QudHJpbSgpO1xuXG4gIHZhciBwcm90byA9IHByb3RvY29sUGF0dGVybi5leGVjKHJlc3QpO1xuICBpZiAocHJvdG8pIHtcbiAgICBwcm90byA9IHByb3RvWzBdO1xuICAgIHZhciBsb3dlclByb3RvID0gcHJvdG8udG9Mb3dlckNhc2UoKTtcbiAgICBvdXQucHJvdG9jb2wgPSBsb3dlclByb3RvO1xuICAgIHJlc3QgPSByZXN0LnN1YnN0cihwcm90by5sZW5ndGgpO1xuICB9XG5cbiAgLy8gZmlndXJlIG91dCBpZiBpdCdzIGdvdCBhIGhvc3RcbiAgLy8gdXNlckBzZXJ2ZXIgaXMgKmFsd2F5cyogaW50ZXJwcmV0ZWQgYXMgYSBob3N0bmFtZSwgYW5kIHVybFxuICAvLyByZXNvbHV0aW9uIHdpbGwgdHJlYXQgLy9mb28vYmFyIGFzIGhvc3Q9Zm9vLHBhdGg9YmFyIGJlY2F1c2UgdGhhdCdzXG4gIC8vIGhvdyB0aGUgYnJvd3NlciByZXNvbHZlcyByZWxhdGl2ZSBVUkxzLlxuICBpZiAoc2xhc2hlc0Rlbm90ZUhvc3QgfHwgcHJvdG8gfHwgcmVzdC5tYXRjaCgvXlxcL1xcL1teQFxcL10rQFteQFxcL10rLykpIHtcbiAgICB2YXIgc2xhc2hlcyA9IHJlc3Quc3Vic3RyKDAsIDIpID09PSAnLy8nO1xuICAgIGlmIChzbGFzaGVzICYmICEocHJvdG8gJiYgaG9zdGxlc3NQcm90b2NvbFtwcm90b10pKSB7XG4gICAgICByZXN0ID0gcmVzdC5zdWJzdHIoMik7XG4gICAgICBvdXQuc2xhc2hlcyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFob3N0bGVzc1Byb3RvY29sW3Byb3RvXSAmJlxuICAgICAgKHNsYXNoZXMgfHwgKHByb3RvICYmICFzbGFzaGVkUHJvdG9jb2xbcHJvdG9dKSkpIHtcbiAgICAvLyB0aGVyZSdzIGEgaG9zdG5hbWUuXG4gICAgLy8gdGhlIGZpcnN0IGluc3RhbmNlIG9mIC8sID8sIDssIG9yICMgZW5kcyB0aGUgaG9zdC5cbiAgICAvLyBkb24ndCBlbmZvcmNlIGZ1bGwgUkZDIGNvcnJlY3RuZXNzLCBqdXN0IGJlIHVuc3R1cGlkIGFib3V0IGl0LlxuXG4gICAgLy8gSWYgdGhlcmUgaXMgYW4gQCBpbiB0aGUgaG9zdG5hbWUsIHRoZW4gbm9uLWhvc3QgY2hhcnMgKmFyZSogYWxsb3dlZFxuICAgIC8vIHRvIHRoZSBsZWZ0IG9mIHRoZSBmaXJzdCBAIHNpZ24sIHVubGVzcyBzb21lIG5vbi1hdXRoIGNoYXJhY3RlclxuICAgIC8vIGNvbWVzICpiZWZvcmUqIHRoZSBALXNpZ24uXG4gICAgLy8gVVJMcyBhcmUgb2Jub3hpb3VzLlxuICAgIHZhciBhdFNpZ24gPSByZXN0LmluZGV4T2YoJ0AnKTtcbiAgICBpZiAoYXRTaWduICE9PSAtMSkge1xuICAgICAgdmFyIGF1dGggPSByZXN0LnNsaWNlKDAsIGF0U2lnbik7XG5cbiAgICAgIC8vIHRoZXJlICptYXkgYmUqIGFuIGF1dGhcbiAgICAgIHZhciBoYXNBdXRoID0gdHJ1ZTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbm9uQXV0aENoYXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoYXV0aC5pbmRleE9mKG5vbkF1dGhDaGFyc1tpXSkgIT09IC0xKSB7XG4gICAgICAgICAgLy8gbm90IGEgdmFsaWQgYXV0aC4gIFNvbWV0aGluZyBsaWtlIGh0dHA6Ly9mb28uY29tL2JhckBiYXovXG4gICAgICAgICAgaGFzQXV0aCA9IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChoYXNBdXRoKSB7XG4gICAgICAgIC8vIHBsdWNrIG9mZiB0aGUgYXV0aCBwb3J0aW9uLlxuICAgICAgICBvdXQuYXV0aCA9IGRlY29kZVVSSUNvbXBvbmVudChhdXRoKTtcbiAgICAgICAgcmVzdCA9IHJlc3Quc3Vic3RyKGF0U2lnbiArIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBmaXJzdE5vbkhvc3QgPSAtMTtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG5vbkhvc3RDaGFycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBpbmRleCA9IHJlc3QuaW5kZXhPZihub25Ib3N0Q2hhcnNbaV0pO1xuICAgICAgaWYgKGluZGV4ICE9PSAtMSAmJlxuICAgICAgICAgIChmaXJzdE5vbkhvc3QgPCAwIHx8IGluZGV4IDwgZmlyc3ROb25Ib3N0KSkgZmlyc3ROb25Ib3N0ID0gaW5kZXg7XG4gICAgfVxuXG4gICAgaWYgKGZpcnN0Tm9uSG9zdCAhPT0gLTEpIHtcbiAgICAgIG91dC5ob3N0ID0gcmVzdC5zdWJzdHIoMCwgZmlyc3ROb25Ib3N0KTtcbiAgICAgIHJlc3QgPSByZXN0LnN1YnN0cihmaXJzdE5vbkhvc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXQuaG9zdCA9IHJlc3Q7XG4gICAgICByZXN0ID0gJyc7XG4gICAgfVxuXG4gICAgLy8gcHVsbCBvdXQgcG9ydC5cbiAgICB2YXIgcCA9IHBhcnNlSG9zdChvdXQuaG9zdCk7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhwKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgIG91dFtrZXldID0gcFtrZXldO1xuICAgIH1cblxuICAgIC8vIHdlJ3ZlIGluZGljYXRlZCB0aGF0IHRoZXJlIGlzIGEgaG9zdG5hbWUsXG4gICAgLy8gc28gZXZlbiBpZiBpdCdzIGVtcHR5LCBpdCBoYXMgdG8gYmUgcHJlc2VudC5cbiAgICBvdXQuaG9zdG5hbWUgPSBvdXQuaG9zdG5hbWUgfHwgJyc7XG5cbiAgICAvLyBpZiBob3N0bmFtZSBiZWdpbnMgd2l0aCBbIGFuZCBlbmRzIHdpdGggXVxuICAgIC8vIGFzc3VtZSB0aGF0IGl0J3MgYW4gSVB2NiBhZGRyZXNzLlxuICAgIHZhciBpcHY2SG9zdG5hbWUgPSBvdXQuaG9zdG5hbWVbMF0gPT09ICdbJyAmJlxuICAgICAgICBvdXQuaG9zdG5hbWVbb3V0Lmhvc3RuYW1lLmxlbmd0aCAtIDFdID09PSAnXSc7XG5cbiAgICAvLyB2YWxpZGF0ZSBhIGxpdHRsZS5cbiAgICBpZiAob3V0Lmhvc3RuYW1lLmxlbmd0aCA+IGhvc3RuYW1lTWF4TGVuKSB7XG4gICAgICBvdXQuaG9zdG5hbWUgPSAnJztcbiAgICB9IGVsc2UgaWYgKCFpcHY2SG9zdG5hbWUpIHtcbiAgICAgIHZhciBob3N0cGFydHMgPSBvdXQuaG9zdG5hbWUuc3BsaXQoL1xcLi8pO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBob3N0cGFydHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBwYXJ0ID0gaG9zdHBhcnRzW2ldO1xuICAgICAgICBpZiAoIXBhcnQpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoIXBhcnQubWF0Y2goaG9zdG5hbWVQYXJ0UGF0dGVybikpIHtcbiAgICAgICAgICB2YXIgbmV3cGFydCA9ICcnO1xuICAgICAgICAgIGZvciAodmFyIGogPSAwLCBrID0gcGFydC5sZW5ndGg7IGogPCBrOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChwYXJ0LmNoYXJDb2RlQXQoaikgPiAxMjcpIHtcbiAgICAgICAgICAgICAgLy8gd2UgcmVwbGFjZSBub24tQVNDSUkgY2hhciB3aXRoIGEgdGVtcG9yYXJ5IHBsYWNlaG9sZGVyXG4gICAgICAgICAgICAgIC8vIHdlIG5lZWQgdGhpcyB0byBtYWtlIHN1cmUgc2l6ZSBvZiBob3N0bmFtZSBpcyBub3RcbiAgICAgICAgICAgICAgLy8gYnJva2VuIGJ5IHJlcGxhY2luZyBub24tQVNDSUkgYnkgbm90aGluZ1xuICAgICAgICAgICAgICBuZXdwYXJ0ICs9ICd4JztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG5ld3BhcnQgKz0gcGFydFtqXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gd2UgdGVzdCBhZ2FpbiB3aXRoIEFTQ0lJIGNoYXIgb25seVxuICAgICAgICAgIGlmICghbmV3cGFydC5tYXRjaChob3N0bmFtZVBhcnRQYXR0ZXJuKSkge1xuICAgICAgICAgICAgdmFyIHZhbGlkUGFydHMgPSBob3N0cGFydHMuc2xpY2UoMCwgaSk7XG4gICAgICAgICAgICB2YXIgbm90SG9zdCA9IGhvc3RwYXJ0cy5zbGljZShpICsgMSk7XG4gICAgICAgICAgICB2YXIgYml0ID0gcGFydC5tYXRjaChob3N0bmFtZVBhcnRTdGFydCk7XG4gICAgICAgICAgICBpZiAoYml0KSB7XG4gICAgICAgICAgICAgIHZhbGlkUGFydHMucHVzaChiaXRbMV0pO1xuICAgICAgICAgICAgICBub3RIb3N0LnVuc2hpZnQoYml0WzJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub3RIb3N0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICByZXN0ID0gJy8nICsgbm90SG9zdC5qb2luKCcuJykgKyByZXN0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0Lmhvc3RuYW1lID0gdmFsaWRQYXJ0cy5qb2luKCcuJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBob3N0bmFtZXMgYXJlIGFsd2F5cyBsb3dlciBjYXNlLlxuICAgIG91dC5ob3N0bmFtZSA9IG91dC5ob3N0bmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKCFpcHY2SG9zdG5hbWUpIHtcbiAgICAgIC8vIElETkEgU3VwcG9ydDogUmV0dXJucyBhIHB1bnkgY29kZWQgcmVwcmVzZW50YXRpb24gb2YgXCJkb21haW5cIi5cbiAgICAgIC8vIEl0IG9ubHkgY29udmVydHMgdGhlIHBhcnQgb2YgdGhlIGRvbWFpbiBuYW1lIHRoYXRcbiAgICAgIC8vIGhhcyBub24gQVNDSUkgY2hhcmFjdGVycy4gSS5lLiBpdCBkb3NlbnQgbWF0dGVyIGlmXG4gICAgICAvLyB5b3UgY2FsbCBpdCB3aXRoIGEgZG9tYWluIHRoYXQgYWxyZWFkeSBpcyBpbiBBU0NJSS5cbiAgICAgIHZhciBkb21haW5BcnJheSA9IG91dC5ob3N0bmFtZS5zcGxpdCgnLicpO1xuICAgICAgdmFyIG5ld091dCA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkb21haW5BcnJheS5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgcyA9IGRvbWFpbkFycmF5W2ldO1xuICAgICAgICBuZXdPdXQucHVzaChzLm1hdGNoKC9bXkEtWmEtejAtOV8tXS8pID9cbiAgICAgICAgICAgICd4bi0tJyArIHB1bnljb2RlLmVuY29kZShzKSA6IHMpO1xuICAgICAgfVxuICAgICAgb3V0Lmhvc3RuYW1lID0gbmV3T3V0LmpvaW4oJy4nKTtcbiAgICB9XG5cbiAgICBvdXQuaG9zdCA9IChvdXQuaG9zdG5hbWUgfHwgJycpICtcbiAgICAgICAgKChvdXQucG9ydCkgPyAnOicgKyBvdXQucG9ydCA6ICcnKTtcbiAgICBvdXQuaHJlZiArPSBvdXQuaG9zdDtcblxuICAgIC8vIHN0cmlwIFsgYW5kIF0gZnJvbSB0aGUgaG9zdG5hbWVcbiAgICBpZiAoaXB2Nkhvc3RuYW1lKSB7XG4gICAgICBvdXQuaG9zdG5hbWUgPSBvdXQuaG9zdG5hbWUuc3Vic3RyKDEsIG91dC5ob3N0bmFtZS5sZW5ndGggLSAyKTtcbiAgICAgIGlmIChyZXN0WzBdICE9PSAnLycpIHtcbiAgICAgICAgcmVzdCA9ICcvJyArIHJlc3Q7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gbm93IHJlc3QgaXMgc2V0IHRvIHRoZSBwb3N0LWhvc3Qgc3R1ZmYuXG4gIC8vIGNob3Agb2ZmIGFueSBkZWxpbSBjaGFycy5cbiAgaWYgKCF1bnNhZmVQcm90b2NvbFtsb3dlclByb3RvXSkge1xuXG4gICAgLy8gRmlyc3QsIG1ha2UgMTAwJSBzdXJlIHRoYXQgYW55IFwiYXV0b0VzY2FwZVwiIGNoYXJzIGdldFxuICAgIC8vIGVzY2FwZWQsIGV2ZW4gaWYgZW5jb2RlVVJJQ29tcG9uZW50IGRvZXNuJ3QgdGhpbmsgdGhleVxuICAgIC8vIG5lZWQgdG8gYmUuXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBhdXRvRXNjYXBlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgdmFyIGFlID0gYXV0b0VzY2FwZVtpXTtcbiAgICAgIHZhciBlc2MgPSBlbmNvZGVVUklDb21wb25lbnQoYWUpO1xuICAgICAgaWYgKGVzYyA9PT0gYWUpIHtcbiAgICAgICAgZXNjID0gZXNjYXBlKGFlKTtcbiAgICAgIH1cbiAgICAgIHJlc3QgPSByZXN0LnNwbGl0KGFlKS5qb2luKGVzYyk7XG4gICAgfVxuICB9XG5cblxuICAvLyBjaG9wIG9mZiBmcm9tIHRoZSB0YWlsIGZpcnN0LlxuICB2YXIgaGFzaCA9IHJlc3QuaW5kZXhPZignIycpO1xuICBpZiAoaGFzaCAhPT0gLTEpIHtcbiAgICAvLyBnb3QgYSBmcmFnbWVudCBzdHJpbmcuXG4gICAgb3V0Lmhhc2ggPSByZXN0LnN1YnN0cihoYXNoKTtcbiAgICByZXN0ID0gcmVzdC5zbGljZSgwLCBoYXNoKTtcbiAgfVxuICB2YXIgcW0gPSByZXN0LmluZGV4T2YoJz8nKTtcbiAgaWYgKHFtICE9PSAtMSkge1xuICAgIG91dC5zZWFyY2ggPSByZXN0LnN1YnN0cihxbSk7XG4gICAgb3V0LnF1ZXJ5ID0gcmVzdC5zdWJzdHIocW0gKyAxKTtcbiAgICBpZiAocGFyc2VRdWVyeVN0cmluZykge1xuICAgICAgb3V0LnF1ZXJ5ID0gcXVlcnlzdHJpbmcucGFyc2Uob3V0LnF1ZXJ5KTtcbiAgICB9XG4gICAgcmVzdCA9IHJlc3Quc2xpY2UoMCwgcW0pO1xuICB9IGVsc2UgaWYgKHBhcnNlUXVlcnlTdHJpbmcpIHtcbiAgICAvLyBubyBxdWVyeSBzdHJpbmcsIGJ1dCBwYXJzZVF1ZXJ5U3RyaW5nIHN0aWxsIHJlcXVlc3RlZFxuICAgIG91dC5zZWFyY2ggPSAnJztcbiAgICBvdXQucXVlcnkgPSB7fTtcbiAgfVxuICBpZiAocmVzdCkgb3V0LnBhdGhuYW1lID0gcmVzdDtcbiAgaWYgKHNsYXNoZWRQcm90b2NvbFtwcm90b10gJiZcbiAgICAgIG91dC5ob3N0bmFtZSAmJiAhb3V0LnBhdGhuYW1lKSB7XG4gICAgb3V0LnBhdGhuYW1lID0gJy8nO1xuICB9XG5cbiAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICBpZiAob3V0LnBhdGhuYW1lIHx8IG91dC5zZWFyY2gpIHtcbiAgICBvdXQucGF0aCA9IChvdXQucGF0aG5hbWUgPyBvdXQucGF0aG5hbWUgOiAnJykgK1xuICAgICAgICAgICAgICAgKG91dC5zZWFyY2ggPyBvdXQuc2VhcmNoIDogJycpO1xuICB9XG5cbiAgLy8gZmluYWxseSwgcmVjb25zdHJ1Y3QgdGhlIGhyZWYgYmFzZWQgb24gd2hhdCBoYXMgYmVlbiB2YWxpZGF0ZWQuXG4gIG91dC5ocmVmID0gdXJsRm9ybWF0KG91dCk7XG4gIHJldHVybiBvdXQ7XG59XG5cbi8vIGZvcm1hdCBhIHBhcnNlZCBvYmplY3QgaW50byBhIHVybCBzdHJpbmdcbmZ1bmN0aW9uIHVybEZvcm1hdChvYmopIHtcbiAgLy8gZW5zdXJlIGl0J3MgYW4gb2JqZWN0LCBhbmQgbm90IGEgc3RyaW5nIHVybC5cbiAgLy8gSWYgaXQncyBhbiBvYmosIHRoaXMgaXMgYSBuby1vcC5cbiAgLy8gdGhpcyB3YXksIHlvdSBjYW4gY2FsbCB1cmxfZm9ybWF0KCkgb24gc3RyaW5nc1xuICAvLyB0byBjbGVhbiB1cCBwb3RlbnRpYWxseSB3b25reSB1cmxzLlxuICBpZiAodHlwZW9mKG9iaikgPT09ICdzdHJpbmcnKSBvYmogPSB1cmxQYXJzZShvYmopO1xuXG4gIHZhciBhdXRoID0gb2JqLmF1dGggfHwgJyc7XG4gIGlmIChhdXRoKSB7XG4gICAgYXV0aCA9IGVuY29kZVVSSUNvbXBvbmVudChhdXRoKTtcbiAgICBhdXRoID0gYXV0aC5yZXBsYWNlKC8lM0EvaSwgJzonKTtcbiAgICBhdXRoICs9ICdAJztcbiAgfVxuXG4gIHZhciBwcm90b2NvbCA9IG9iai5wcm90b2NvbCB8fCAnJyxcbiAgICAgIHBhdGhuYW1lID0gb2JqLnBhdGhuYW1lIHx8ICcnLFxuICAgICAgaGFzaCA9IG9iai5oYXNoIHx8ICcnLFxuICAgICAgaG9zdCA9IGZhbHNlLFxuICAgICAgcXVlcnkgPSAnJztcblxuICBpZiAob2JqLmhvc3QgIT09IHVuZGVmaW5lZCkge1xuICAgIGhvc3QgPSBhdXRoICsgb2JqLmhvc3Q7XG4gIH0gZWxzZSBpZiAob2JqLmhvc3RuYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICBob3N0ID0gYXV0aCArIChvYmouaG9zdG5hbWUuaW5kZXhPZignOicpID09PSAtMSA/XG4gICAgICAgIG9iai5ob3N0bmFtZSA6XG4gICAgICAgICdbJyArIG9iai5ob3N0bmFtZSArICddJyk7XG4gICAgaWYgKG9iai5wb3J0KSB7XG4gICAgICBob3N0ICs9ICc6JyArIG9iai5wb3J0O1xuICAgIH1cbiAgfVxuXG4gIGlmIChvYmoucXVlcnkgJiYgdHlwZW9mIG9iai5xdWVyeSA9PT0gJ29iamVjdCcgJiZcbiAgICAgIE9iamVjdC5rZXlzKG9iai5xdWVyeSkubGVuZ3RoKSB7XG4gICAgcXVlcnkgPSBxdWVyeXN0cmluZy5zdHJpbmdpZnkob2JqLnF1ZXJ5KTtcbiAgfVxuXG4gIHZhciBzZWFyY2ggPSBvYmouc2VhcmNoIHx8IChxdWVyeSAmJiAoJz8nICsgcXVlcnkpKSB8fCAnJztcblxuICBpZiAocHJvdG9jb2wgJiYgcHJvdG9jb2wuc3Vic3RyKC0xKSAhPT0gJzonKSBwcm90b2NvbCArPSAnOic7XG5cbiAgLy8gb25seSB0aGUgc2xhc2hlZFByb3RvY29scyBnZXQgdGhlIC8vLiAgTm90IG1haWx0bzosIHhtcHA6LCBldGMuXG4gIC8vIHVubGVzcyB0aGV5IGhhZCB0aGVtIHRvIGJlZ2luIHdpdGguXG4gIGlmIChvYmouc2xhc2hlcyB8fFxuICAgICAgKCFwcm90b2NvbCB8fCBzbGFzaGVkUHJvdG9jb2xbcHJvdG9jb2xdKSAmJiBob3N0ICE9PSBmYWxzZSkge1xuICAgIGhvc3QgPSAnLy8nICsgKGhvc3QgfHwgJycpO1xuICAgIGlmIChwYXRobmFtZSAmJiBwYXRobmFtZS5jaGFyQXQoMCkgIT09ICcvJykgcGF0aG5hbWUgPSAnLycgKyBwYXRobmFtZTtcbiAgfSBlbHNlIGlmICghaG9zdCkge1xuICAgIGhvc3QgPSAnJztcbiAgfVxuXG4gIGlmIChoYXNoICYmIGhhc2guY2hhckF0KDApICE9PSAnIycpIGhhc2ggPSAnIycgKyBoYXNoO1xuICBpZiAoc2VhcmNoICYmIHNlYXJjaC5jaGFyQXQoMCkgIT09ICc/Jykgc2VhcmNoID0gJz8nICsgc2VhcmNoO1xuXG4gIHJldHVybiBwcm90b2NvbCArIGhvc3QgKyBwYXRobmFtZSArIHNlYXJjaCArIGhhc2g7XG59XG5cbmZ1bmN0aW9uIHVybFJlc29sdmUoc291cmNlLCByZWxhdGl2ZSkge1xuICByZXR1cm4gdXJsRm9ybWF0KHVybFJlc29sdmVPYmplY3Qoc291cmNlLCByZWxhdGl2ZSkpO1xufVxuXG5mdW5jdGlvbiB1cmxSZXNvbHZlT2JqZWN0KHNvdXJjZSwgcmVsYXRpdmUpIHtcbiAgaWYgKCFzb3VyY2UpIHJldHVybiByZWxhdGl2ZTtcblxuICBzb3VyY2UgPSB1cmxQYXJzZSh1cmxGb3JtYXQoc291cmNlKSwgZmFsc2UsIHRydWUpO1xuICByZWxhdGl2ZSA9IHVybFBhcnNlKHVybEZvcm1hdChyZWxhdGl2ZSksIGZhbHNlLCB0cnVlKTtcblxuICAvLyBoYXNoIGlzIGFsd2F5cyBvdmVycmlkZGVuLCBubyBtYXR0ZXIgd2hhdC5cbiAgc291cmNlLmhhc2ggPSByZWxhdGl2ZS5oYXNoO1xuXG4gIGlmIChyZWxhdGl2ZS5ocmVmID09PSAnJykge1xuICAgIHNvdXJjZS5ocmVmID0gdXJsRm9ybWF0KHNvdXJjZSk7XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIC8vIGhyZWZzIGxpa2UgLy9mb28vYmFyIGFsd2F5cyBjdXQgdG8gdGhlIHByb3RvY29sLlxuICBpZiAocmVsYXRpdmUuc2xhc2hlcyAmJiAhcmVsYXRpdmUucHJvdG9jb2wpIHtcbiAgICByZWxhdGl2ZS5wcm90b2NvbCA9IHNvdXJjZS5wcm90b2NvbDtcbiAgICAvL3VybFBhcnNlIGFwcGVuZHMgdHJhaWxpbmcgLyB0byB1cmxzIGxpa2UgaHR0cDovL3d3dy5leGFtcGxlLmNvbVxuICAgIGlmIChzbGFzaGVkUHJvdG9jb2xbcmVsYXRpdmUucHJvdG9jb2xdICYmXG4gICAgICAgIHJlbGF0aXZlLmhvc3RuYW1lICYmICFyZWxhdGl2ZS5wYXRobmFtZSkge1xuICAgICAgcmVsYXRpdmUucGF0aCA9IHJlbGF0aXZlLnBhdGhuYW1lID0gJy8nO1xuICAgIH1cbiAgICByZWxhdGl2ZS5ocmVmID0gdXJsRm9ybWF0KHJlbGF0aXZlKTtcbiAgICByZXR1cm4gcmVsYXRpdmU7XG4gIH1cblxuICBpZiAocmVsYXRpdmUucHJvdG9jb2wgJiYgcmVsYXRpdmUucHJvdG9jb2wgIT09IHNvdXJjZS5wcm90b2NvbCkge1xuICAgIC8vIGlmIGl0J3MgYSBrbm93biB1cmwgcHJvdG9jb2wsIHRoZW4gY2hhbmdpbmdcbiAgICAvLyB0aGUgcHJvdG9jb2wgZG9lcyB3ZWlyZCB0aGluZ3NcbiAgICAvLyBmaXJzdCwgaWYgaXQncyBub3QgZmlsZTosIHRoZW4gd2UgTVVTVCBoYXZlIGEgaG9zdCxcbiAgICAvLyBhbmQgaWYgdGhlcmUgd2FzIGEgcGF0aFxuICAgIC8vIHRvIGJlZ2luIHdpdGgsIHRoZW4gd2UgTVVTVCBoYXZlIGEgcGF0aC5cbiAgICAvLyBpZiBpdCBpcyBmaWxlOiwgdGhlbiB0aGUgaG9zdCBpcyBkcm9wcGVkLFxuICAgIC8vIGJlY2F1c2UgdGhhdCdzIGtub3duIHRvIGJlIGhvc3RsZXNzLlxuICAgIC8vIGFueXRoaW5nIGVsc2UgaXMgYXNzdW1lZCB0byBiZSBhYnNvbHV0ZS5cbiAgICBpZiAoIXNsYXNoZWRQcm90b2NvbFtyZWxhdGl2ZS5wcm90b2NvbF0pIHtcbiAgICAgIHJlbGF0aXZlLmhyZWYgPSB1cmxGb3JtYXQocmVsYXRpdmUpO1xuICAgICAgcmV0dXJuIHJlbGF0aXZlO1xuICAgIH1cbiAgICBzb3VyY2UucHJvdG9jb2wgPSByZWxhdGl2ZS5wcm90b2NvbDtcbiAgICBpZiAoIXJlbGF0aXZlLmhvc3QgJiYgIWhvc3RsZXNzUHJvdG9jb2xbcmVsYXRpdmUucHJvdG9jb2xdKSB7XG4gICAgICB2YXIgcmVsUGF0aCA9IChyZWxhdGl2ZS5wYXRobmFtZSB8fCAnJykuc3BsaXQoJy8nKTtcbiAgICAgIHdoaWxlIChyZWxQYXRoLmxlbmd0aCAmJiAhKHJlbGF0aXZlLmhvc3QgPSByZWxQYXRoLnNoaWZ0KCkpKTtcbiAgICAgIGlmICghcmVsYXRpdmUuaG9zdCkgcmVsYXRpdmUuaG9zdCA9ICcnO1xuICAgICAgaWYgKCFyZWxhdGl2ZS5ob3N0bmFtZSkgcmVsYXRpdmUuaG9zdG5hbWUgPSAnJztcbiAgICAgIGlmIChyZWxQYXRoWzBdICE9PSAnJykgcmVsUGF0aC51bnNoaWZ0KCcnKTtcbiAgICAgIGlmIChyZWxQYXRoLmxlbmd0aCA8IDIpIHJlbFBhdGgudW5zaGlmdCgnJyk7XG4gICAgICByZWxhdGl2ZS5wYXRobmFtZSA9IHJlbFBhdGguam9pbignLycpO1xuICAgIH1cbiAgICBzb3VyY2UucGF0aG5hbWUgPSByZWxhdGl2ZS5wYXRobmFtZTtcbiAgICBzb3VyY2Uuc2VhcmNoID0gcmVsYXRpdmUuc2VhcmNoO1xuICAgIHNvdXJjZS5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICAgIHNvdXJjZS5ob3N0ID0gcmVsYXRpdmUuaG9zdCB8fCAnJztcbiAgICBzb3VyY2UuYXV0aCA9IHJlbGF0aXZlLmF1dGg7XG4gICAgc291cmNlLmhvc3RuYW1lID0gcmVsYXRpdmUuaG9zdG5hbWUgfHwgcmVsYXRpdmUuaG9zdDtcbiAgICBzb3VyY2UucG9ydCA9IHJlbGF0aXZlLnBvcnQ7XG4gICAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICAgIGlmIChzb3VyY2UucGF0aG5hbWUgIT09IHVuZGVmaW5lZCB8fCBzb3VyY2Uuc2VhcmNoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNvdXJjZS5wYXRoID0gKHNvdXJjZS5wYXRobmFtZSA/IHNvdXJjZS5wYXRobmFtZSA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAgIChzb3VyY2Uuc2VhcmNoID8gc291cmNlLnNlYXJjaCA6ICcnKTtcbiAgICB9XG4gICAgc291cmNlLnNsYXNoZXMgPSBzb3VyY2Uuc2xhc2hlcyB8fCByZWxhdGl2ZS5zbGFzaGVzO1xuICAgIHNvdXJjZS5ocmVmID0gdXJsRm9ybWF0KHNvdXJjZSk7XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIHZhciBpc1NvdXJjZUFicyA9IChzb3VyY2UucGF0aG5hbWUgJiYgc291cmNlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSxcbiAgICAgIGlzUmVsQWJzID0gKFxuICAgICAgICAgIHJlbGF0aXZlLmhvc3QgIT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgIHJlbGF0aXZlLnBhdGhuYW1lICYmIHJlbGF0aXZlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nXG4gICAgICApLFxuICAgICAgbXVzdEVuZEFicyA9IChpc1JlbEFicyB8fCBpc1NvdXJjZUFicyB8fFxuICAgICAgICAgICAgICAgICAgICAoc291cmNlLmhvc3QgJiYgcmVsYXRpdmUucGF0aG5hbWUpKSxcbiAgICAgIHJlbW92ZUFsbERvdHMgPSBtdXN0RW5kQWJzLFxuICAgICAgc3JjUGF0aCA9IHNvdXJjZS5wYXRobmFtZSAmJiBzb3VyY2UucGF0aG5hbWUuc3BsaXQoJy8nKSB8fCBbXSxcbiAgICAgIHJlbFBhdGggPSByZWxhdGl2ZS5wYXRobmFtZSAmJiByZWxhdGl2ZS5wYXRobmFtZS5zcGxpdCgnLycpIHx8IFtdLFxuICAgICAgcHN5Y2hvdGljID0gc291cmNlLnByb3RvY29sICYmXG4gICAgICAgICAgIXNsYXNoZWRQcm90b2NvbFtzb3VyY2UucHJvdG9jb2xdO1xuXG4gIC8vIGlmIHRoZSB1cmwgaXMgYSBub24tc2xhc2hlZCB1cmwsIHRoZW4gcmVsYXRpdmVcbiAgLy8gbGlua3MgbGlrZSAuLi8uLiBzaG91bGQgYmUgYWJsZVxuICAvLyB0byBjcmF3bCB1cCB0byB0aGUgaG9zdG5hbWUsIGFzIHdlbGwuICBUaGlzIGlzIHN0cmFuZ2UuXG4gIC8vIHNvdXJjZS5wcm90b2NvbCBoYXMgYWxyZWFkeSBiZWVuIHNldCBieSBub3cuXG4gIC8vIExhdGVyIG9uLCBwdXQgdGhlIGZpcnN0IHBhdGggcGFydCBpbnRvIHRoZSBob3N0IGZpZWxkLlxuICBpZiAocHN5Y2hvdGljKSB7XG5cbiAgICBkZWxldGUgc291cmNlLmhvc3RuYW1lO1xuICAgIGRlbGV0ZSBzb3VyY2UucG9ydDtcbiAgICBpZiAoc291cmNlLmhvc3QpIHtcbiAgICAgIGlmIChzcmNQYXRoWzBdID09PSAnJykgc3JjUGF0aFswXSA9IHNvdXJjZS5ob3N0O1xuICAgICAgZWxzZSBzcmNQYXRoLnVuc2hpZnQoc291cmNlLmhvc3QpO1xuICAgIH1cbiAgICBkZWxldGUgc291cmNlLmhvc3Q7XG4gICAgaWYgKHJlbGF0aXZlLnByb3RvY29sKSB7XG4gICAgICBkZWxldGUgcmVsYXRpdmUuaG9zdG5hbWU7XG4gICAgICBkZWxldGUgcmVsYXRpdmUucG9ydDtcbiAgICAgIGlmIChyZWxhdGl2ZS5ob3N0KSB7XG4gICAgICAgIGlmIChyZWxQYXRoWzBdID09PSAnJykgcmVsUGF0aFswXSA9IHJlbGF0aXZlLmhvc3Q7XG4gICAgICAgIGVsc2UgcmVsUGF0aC51bnNoaWZ0KHJlbGF0aXZlLmhvc3QpO1xuICAgICAgfVxuICAgICAgZGVsZXRlIHJlbGF0aXZlLmhvc3Q7XG4gICAgfVxuICAgIG11c3RFbmRBYnMgPSBtdXN0RW5kQWJzICYmIChyZWxQYXRoWzBdID09PSAnJyB8fCBzcmNQYXRoWzBdID09PSAnJyk7XG4gIH1cblxuICBpZiAoaXNSZWxBYnMpIHtcbiAgICAvLyBpdCdzIGFic29sdXRlLlxuICAgIHNvdXJjZS5ob3N0ID0gKHJlbGF0aXZlLmhvc3QgfHwgcmVsYXRpdmUuaG9zdCA9PT0gJycpID9cbiAgICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZS5ob3N0IDogc291cmNlLmhvc3Q7XG4gICAgc291cmNlLmhvc3RuYW1lID0gKHJlbGF0aXZlLmhvc3RuYW1lIHx8IHJlbGF0aXZlLmhvc3RuYW1lID09PSAnJykgP1xuICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlLmhvc3RuYW1lIDogc291cmNlLmhvc3RuYW1lO1xuICAgIHNvdXJjZS5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgc291cmNlLnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgc3JjUGF0aCA9IHJlbFBhdGg7XG4gICAgLy8gZmFsbCB0aHJvdWdoIHRvIHRoZSBkb3QtaGFuZGxpbmcgYmVsb3cuXG4gIH0gZWxzZSBpZiAocmVsUGF0aC5sZW5ndGgpIHtcbiAgICAvLyBpdCdzIHJlbGF0aXZlXG4gICAgLy8gdGhyb3cgYXdheSB0aGUgZXhpc3RpbmcgZmlsZSwgYW5kIHRha2UgdGhlIG5ldyBwYXRoIGluc3RlYWQuXG4gICAgaWYgKCFzcmNQYXRoKSBzcmNQYXRoID0gW107XG4gICAgc3JjUGF0aC5wb3AoKTtcbiAgICBzcmNQYXRoID0gc3JjUGF0aC5jb25jYXQocmVsUGF0aCk7XG4gICAgc291cmNlLnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICBzb3VyY2UucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgfSBlbHNlIGlmICgnc2VhcmNoJyBpbiByZWxhdGl2ZSkge1xuICAgIC8vIGp1c3QgcHVsbCBvdXQgdGhlIHNlYXJjaC5cbiAgICAvLyBsaWtlIGhyZWY9Jz9mb28nLlxuICAgIC8vIFB1dCB0aGlzIGFmdGVyIHRoZSBvdGhlciB0d28gY2FzZXMgYmVjYXVzZSBpdCBzaW1wbGlmaWVzIHRoZSBib29sZWFuc1xuICAgIGlmIChwc3ljaG90aWMpIHtcbiAgICAgIHNvdXJjZS5ob3N0bmFtZSA9IHNvdXJjZS5ob3N0ID0gc3JjUGF0aC5zaGlmdCgpO1xuICAgICAgLy9vY2NhdGlvbmFseSB0aGUgYXV0aCBjYW4gZ2V0IHN0dWNrIG9ubHkgaW4gaG9zdFxuICAgICAgLy90aGlzIGVzcGVjaWFseSBoYXBwZW5zIGluIGNhc2VzIGxpa2VcbiAgICAgIC8vdXJsLnJlc29sdmVPYmplY3QoJ21haWx0bzpsb2NhbDFAZG9tYWluMScsICdsb2NhbDJAZG9tYWluMicpXG4gICAgICB2YXIgYXV0aEluSG9zdCA9IHNvdXJjZS5ob3N0ICYmIHNvdXJjZS5ob3N0LmluZGV4T2YoJ0AnKSA+IDAgP1xuICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2UuaG9zdC5zcGxpdCgnQCcpIDogZmFsc2U7XG4gICAgICBpZiAoYXV0aEluSG9zdCkge1xuICAgICAgICBzb3VyY2UuYXV0aCA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICAgICAgc291cmNlLmhvc3QgPSBzb3VyY2UuaG9zdG5hbWUgPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgICB9XG4gICAgfVxuICAgIHNvdXJjZS5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgc291cmNlLnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICAgIGlmIChzb3VyY2UucGF0aG5hbWUgIT09IHVuZGVmaW5lZCB8fCBzb3VyY2Uuc2VhcmNoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNvdXJjZS5wYXRoID0gKHNvdXJjZS5wYXRobmFtZSA/IHNvdXJjZS5wYXRobmFtZSA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAgIChzb3VyY2Uuc2VhcmNoID8gc291cmNlLnNlYXJjaCA6ICcnKTtcbiAgICB9XG4gICAgc291cmNlLmhyZWYgPSB1cmxGb3JtYXQoc291cmNlKTtcbiAgICByZXR1cm4gc291cmNlO1xuICB9XG4gIGlmICghc3JjUGF0aC5sZW5ndGgpIHtcbiAgICAvLyBubyBwYXRoIGF0IGFsbC4gIGVhc3kuXG4gICAgLy8gd2UndmUgYWxyZWFkeSBoYW5kbGVkIHRoZSBvdGhlciBzdHVmZiBhYm92ZS5cbiAgICBkZWxldGUgc291cmNlLnBhdGhuYW1lO1xuICAgIC8vdG8gc3VwcG9ydCBodHRwLnJlcXVlc3RcbiAgICBpZiAoIXNvdXJjZS5zZWFyY2gpIHtcbiAgICAgIHNvdXJjZS5wYXRoID0gJy8nICsgc291cmNlLnNlYXJjaDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHNvdXJjZS5wYXRoO1xuICAgIH1cbiAgICBzb3VyY2UuaHJlZiA9IHVybEZvcm1hdChzb3VyY2UpO1xuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cbiAgLy8gaWYgYSB1cmwgRU5EcyBpbiAuIG9yIC4uLCB0aGVuIGl0IG11c3QgZ2V0IGEgdHJhaWxpbmcgc2xhc2guXG4gIC8vIGhvd2V2ZXIsIGlmIGl0IGVuZHMgaW4gYW55dGhpbmcgZWxzZSBub24tc2xhc2h5LFxuICAvLyB0aGVuIGl0IG11c3QgTk9UIGdldCBhIHRyYWlsaW5nIHNsYXNoLlxuICB2YXIgbGFzdCA9IHNyY1BhdGguc2xpY2UoLTEpWzBdO1xuICB2YXIgaGFzVHJhaWxpbmdTbGFzaCA9IChcbiAgICAgIChzb3VyY2UuaG9zdCB8fCByZWxhdGl2ZS5ob3N0KSAmJiAobGFzdCA9PT0gJy4nIHx8IGxhc3QgPT09ICcuLicpIHx8XG4gICAgICBsYXN0ID09PSAnJyk7XG5cbiAgLy8gc3RyaXAgc2luZ2xlIGRvdHMsIHJlc29sdmUgZG91YmxlIGRvdHMgdG8gcGFyZW50IGRpclxuICAvLyBpZiB0aGUgcGF0aCB0cmllcyB0byBnbyBhYm92ZSB0aGUgcm9vdCwgYHVwYCBlbmRzIHVwID4gMFxuICB2YXIgdXAgPSAwO1xuICBmb3IgKHZhciBpID0gc3JjUGF0aC5sZW5ndGg7IGkgPj0gMDsgaS0tKSB7XG4gICAgbGFzdCA9IHNyY1BhdGhbaV07XG4gICAgaWYgKGxhc3QgPT0gJy4nKSB7XG4gICAgICBzcmNQYXRoLnNwbGljZShpLCAxKTtcbiAgICB9IGVsc2UgaWYgKGxhc3QgPT09ICcuLicpIHtcbiAgICAgIHNyY1BhdGguc3BsaWNlKGksIDEpO1xuICAgICAgdXArKztcbiAgICB9IGVsc2UgaWYgKHVwKSB7XG4gICAgICBzcmNQYXRoLnNwbGljZShpLCAxKTtcbiAgICAgIHVwLS07XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgdGhlIHBhdGggaXMgYWxsb3dlZCB0byBnbyBhYm92ZSB0aGUgcm9vdCwgcmVzdG9yZSBsZWFkaW5nIC4uc1xuICBpZiAoIW11c3RFbmRBYnMgJiYgIXJlbW92ZUFsbERvdHMpIHtcbiAgICBmb3IgKDsgdXAtLTsgdXApIHtcbiAgICAgIHNyY1BhdGgudW5zaGlmdCgnLi4nKTtcbiAgICB9XG4gIH1cblxuICBpZiAobXVzdEVuZEFicyAmJiBzcmNQYXRoWzBdICE9PSAnJyAmJlxuICAgICAgKCFzcmNQYXRoWzBdIHx8IHNyY1BhdGhbMF0uY2hhckF0KDApICE9PSAnLycpKSB7XG4gICAgc3JjUGF0aC51bnNoaWZ0KCcnKTtcbiAgfVxuXG4gIGlmIChoYXNUcmFpbGluZ1NsYXNoICYmIChzcmNQYXRoLmpvaW4oJy8nKS5zdWJzdHIoLTEpICE9PSAnLycpKSB7XG4gICAgc3JjUGF0aC5wdXNoKCcnKTtcbiAgfVxuXG4gIHZhciBpc0Fic29sdXRlID0gc3JjUGF0aFswXSA9PT0gJycgfHxcbiAgICAgIChzcmNQYXRoWzBdICYmIHNyY1BhdGhbMF0uY2hhckF0KDApID09PSAnLycpO1xuXG4gIC8vIHB1dCB0aGUgaG9zdCBiYWNrXG4gIGlmIChwc3ljaG90aWMpIHtcbiAgICBzb3VyY2UuaG9zdG5hbWUgPSBzb3VyY2UuaG9zdCA9IGlzQWJzb2x1dGUgPyAnJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmNQYXRoLmxlbmd0aCA/IHNyY1BhdGguc2hpZnQoKSA6ICcnO1xuICAgIC8vb2NjYXRpb25hbHkgdGhlIGF1dGggY2FuIGdldCBzdHVjayBvbmx5IGluIGhvc3RcbiAgICAvL3RoaXMgZXNwZWNpYWx5IGhhcHBlbnMgaW4gY2FzZXMgbGlrZVxuICAgIC8vdXJsLnJlc29sdmVPYmplY3QoJ21haWx0bzpsb2NhbDFAZG9tYWluMScsICdsb2NhbDJAZG9tYWluMicpXG4gICAgdmFyIGF1dGhJbkhvc3QgPSBzb3VyY2UuaG9zdCAmJiBzb3VyY2UuaG9zdC5pbmRleE9mKCdAJykgPiAwID9cbiAgICAgICAgICAgICAgICAgICAgIHNvdXJjZS5ob3N0LnNwbGl0KCdAJykgOiBmYWxzZTtcbiAgICBpZiAoYXV0aEluSG9zdCkge1xuICAgICAgc291cmNlLmF1dGggPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgICBzb3VyY2UuaG9zdCA9IHNvdXJjZS5ob3N0bmFtZSA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICB9XG4gIH1cblxuICBtdXN0RW5kQWJzID0gbXVzdEVuZEFicyB8fCAoc291cmNlLmhvc3QgJiYgc3JjUGF0aC5sZW5ndGgpO1xuXG4gIGlmIChtdXN0RW5kQWJzICYmICFpc0Fic29sdXRlKSB7XG4gICAgc3JjUGF0aC51bnNoaWZ0KCcnKTtcbiAgfVxuXG4gIHNvdXJjZS5wYXRobmFtZSA9IHNyY1BhdGguam9pbignLycpO1xuICAvL3RvIHN1cHBvcnQgcmVxdWVzdC5odHRwXG4gIGlmIChzb3VyY2UucGF0aG5hbWUgIT09IHVuZGVmaW5lZCB8fCBzb3VyY2Uuc2VhcmNoICE9PSB1bmRlZmluZWQpIHtcbiAgICBzb3VyY2UucGF0aCA9IChzb3VyY2UucGF0aG5hbWUgPyBzb3VyY2UucGF0aG5hbWUgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHNvdXJjZS5zZWFyY2ggPyBzb3VyY2Uuc2VhcmNoIDogJycpO1xuICB9XG4gIHNvdXJjZS5hdXRoID0gcmVsYXRpdmUuYXV0aCB8fCBzb3VyY2UuYXV0aDtcbiAgc291cmNlLnNsYXNoZXMgPSBzb3VyY2Uuc2xhc2hlcyB8fCByZWxhdGl2ZS5zbGFzaGVzO1xuICBzb3VyY2UuaHJlZiA9IHVybEZvcm1hdChzb3VyY2UpO1xuICByZXR1cm4gc291cmNlO1xufVxuXG5mdW5jdGlvbiBwYXJzZUhvc3QoaG9zdCkge1xuICB2YXIgb3V0ID0ge307XG4gIHZhciBwb3J0ID0gcG9ydFBhdHRlcm4uZXhlYyhob3N0KTtcbiAgaWYgKHBvcnQpIHtcbiAgICBwb3J0ID0gcG9ydFswXTtcbiAgICBpZiAocG9ydCAhPT0gJzonKSB7XG4gICAgICBvdXQucG9ydCA9IHBvcnQuc3Vic3RyKDEpO1xuICAgIH1cbiAgICBob3N0ID0gaG9zdC5zdWJzdHIoMCwgaG9zdC5sZW5ndGggLSBwb3J0Lmxlbmd0aCk7XG4gIH1cbiAgaWYgKGhvc3QpIG91dC5ob3N0bmFtZSA9IGhvc3Q7XG4gIHJldHVybiBvdXQ7XG59XG5cbn0oKSk7XG4iLCJcblxuLy9cbi8vIEdlbmVyYXRlZCBvbiBTdW4gSmFuIDI2IDIwMTQgMjE6NTg6MTIgR01ULTA1MDAgKEVTVCkgYnkgTm9kZWppdHN1LCBJbmMgKFVzaW5nIENvZGVzdXJnZW9uKS5cbi8vIFZlcnNpb24gMS4yLjJcbi8vXG5cbihmdW5jdGlvbiAoZXhwb3J0cykge1xuXG4vKlxuICogYnJvd3Nlci5qczogQnJvd3NlciBzcGVjaWZpYyBmdW5jdGlvbmFsaXR5IGZvciBkaXJlY3Rvci5cbiAqXG4gKiAoQykgMjAxMSwgTm9kZWppdHN1IEluYy5cbiAqIE1JVCBMSUNFTlNFXG4gKlxuICovXG5cbmlmICghQXJyYXkucHJvdG90eXBlLmZpbHRlcikge1xuICBBcnJheS5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24oZmlsdGVyLCB0aGF0KSB7XG4gICAgdmFyIG90aGVyID0gW10sIHY7XG4gICAgZm9yICh2YXIgaSA9IDAsIG4gPSB0aGlzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgaWYgKGkgaW4gdGhpcyAmJiBmaWx0ZXIuY2FsbCh0aGF0LCB2ID0gdGhpc1tpXSwgaSwgdGhpcykpIHtcbiAgICAgICAgb3RoZXIucHVzaCh2KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG90aGVyO1xuICB9O1xufVxuXG5pZiAoIUFycmF5LmlzQXJyYXkpe1xuICBBcnJheS5pc0FycmF5ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9O1xufVxuXG52YXIgZGxvYyA9IGRvY3VtZW50LmxvY2F0aW9uO1xuXG5mdW5jdGlvbiBkbG9jSGFzaEVtcHR5KCkge1xuICAvLyBOb24tSUUgYnJvd3NlcnMgcmV0dXJuICcnIHdoZW4gdGhlIGFkZHJlc3MgYmFyIHNob3dzICcjJzsgRGlyZWN0b3IncyBsb2dpY1xuICAvLyBhc3N1bWVzIGJvdGggbWVhbiBlbXB0eS5cbiAgcmV0dXJuIGRsb2MuaGFzaCA9PT0gJycgfHwgZGxvYy5oYXNoID09PSAnIyc7XG59XG5cbnZhciBsaXN0ZW5lciA9IHtcbiAgbW9kZTogJ21vZGVybicsXG4gIGhhc2g6IGRsb2MuaGFzaCxcbiAgaGlzdG9yeTogZmFsc2UsXG5cbiAgY2hlY2s6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaCA9IGRsb2MuaGFzaDtcbiAgICBpZiAoaCAhPSB0aGlzLmhhc2gpIHtcbiAgICAgIHRoaXMuaGFzaCA9IGg7XG4gICAgICB0aGlzLm9uSGFzaENoYW5nZWQoKTtcbiAgICB9XG4gIH0sXG5cbiAgZmlyZTogZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLm1vZGUgPT09ICdtb2Rlcm4nKSB7XG4gICAgICB0aGlzLmhpc3RvcnkgPT09IHRydWUgPyB3aW5kb3cub25wb3BzdGF0ZSgpIDogd2luZG93Lm9uaGFzaGNoYW5nZSgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMub25IYXNoQ2hhbmdlZCgpO1xuICAgIH1cbiAgfSxcblxuICBpbml0OiBmdW5jdGlvbiAoZm4sIGhpc3RvcnkpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5oaXN0b3J5ID0gaGlzdG9yeTtcblxuICAgIGlmICghUm91dGVyLmxpc3RlbmVycykge1xuICAgICAgUm91dGVyLmxpc3RlbmVycyA9IFtdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uY2hhbmdlKG9uQ2hhbmdlRXZlbnQpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gUm91dGVyLmxpc3RlbmVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgUm91dGVyLmxpc3RlbmVyc1tpXShvbkNoYW5nZUV2ZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL25vdGUgSUU4IGlzIGJlaW5nIGNvdW50ZWQgYXMgJ21vZGVybicgYmVjYXVzZSBpdCBoYXMgdGhlIGhhc2hjaGFuZ2UgZXZlbnRcbiAgICBpZiAoJ29uaGFzaGNoYW5nZScgaW4gd2luZG93ICYmIChkb2N1bWVudC5kb2N1bWVudE1vZGUgPT09IHVuZGVmaW5lZFxuICAgICAgfHwgZG9jdW1lbnQuZG9jdW1lbnRNb2RlID4gNykpIHtcbiAgICAgIC8vIEF0IGxlYXN0IGZvciBub3cgSFRNTDUgaGlzdG9yeSBpcyBhdmFpbGFibGUgZm9yICdtb2Rlcm4nIGJyb3dzZXJzIG9ubHlcbiAgICAgIGlmICh0aGlzLmhpc3RvcnkgPT09IHRydWUpIHtcbiAgICAgICAgLy8gVGhlcmUgaXMgYW4gb2xkIGJ1ZyBpbiBDaHJvbWUgdGhhdCBjYXVzZXMgb25wb3BzdGF0ZSB0byBmaXJlIGV2ZW5cbiAgICAgICAgLy8gdXBvbiBpbml0aWFsIHBhZ2UgbG9hZC4gU2luY2UgdGhlIGhhbmRsZXIgaXMgcnVuIG1hbnVhbGx5IGluIGluaXQoKSxcbiAgICAgICAgLy8gdGhpcyB3b3VsZCBjYXVzZSBDaHJvbWUgdG8gcnVuIGl0IHR3aXNlLiBDdXJyZW50bHkgdGhlIG9ubHlcbiAgICAgICAgLy8gd29ya2Fyb3VuZCBzZWVtcyB0byBiZSB0byBzZXQgdGhlIGhhbmRsZXIgYWZ0ZXIgdGhlIGluaXRpYWwgcGFnZSBsb2FkXG4gICAgICAgIC8vIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTYzMDQwXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgd2luZG93Lm9ucG9wc3RhdGUgPSBvbmNoYW5nZTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB3aW5kb3cub25oYXNoY2hhbmdlID0gb25jaGFuZ2U7XG4gICAgICB9XG4gICAgICB0aGlzLm1vZGUgPSAnbW9kZXJuJztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAvL1xuICAgICAgLy8gSUUgc3VwcG9ydCwgYmFzZWQgb24gYSBjb25jZXB0IGJ5IEVyaWsgQXJ2aWRzb24gLi4uXG4gICAgICAvL1xuICAgICAgdmFyIGZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICBmcmFtZS5pZCA9ICdzdGF0ZS1mcmFtZSc7XG4gICAgICBmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmcmFtZSk7XG4gICAgICB0aGlzLndyaXRlRnJhbWUoJycpO1xuXG4gICAgICBpZiAoJ29ucHJvcGVydHljaGFuZ2UnIGluIGRvY3VtZW50ICYmICdhdHRhY2hFdmVudCcgaW4gZG9jdW1lbnQpIHtcbiAgICAgICAgZG9jdW1lbnQuYXR0YWNoRXZlbnQoJ29ucHJvcGVydHljaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKGV2ZW50LnByb3BlcnR5TmFtZSA9PT0gJ2xvY2F0aW9uJykge1xuICAgICAgICAgICAgc2VsZi5jaGVjaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHdpbmRvdy5zZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7IHNlbGYuY2hlY2soKTsgfSwgNTApO1xuXG4gICAgICB0aGlzLm9uSGFzaENoYW5nZWQgPSBvbmNoYW5nZTtcbiAgICAgIHRoaXMubW9kZSA9ICdsZWdhY3knO1xuICAgIH1cblxuICAgIFJvdXRlci5saXN0ZW5lcnMucHVzaChmbik7XG5cbiAgICByZXR1cm4gdGhpcy5tb2RlO1xuICB9LFxuXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uIChmbikge1xuICAgIGlmICghUm91dGVyIHx8ICFSb3V0ZXIubGlzdGVuZXJzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGxpc3RlbmVycyA9IFJvdXRlci5saXN0ZW5lcnM7XG5cbiAgICBmb3IgKHZhciBpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBpZiAobGlzdGVuZXJzW2ldID09PSBmbikge1xuICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBzZXRIYXNoOiBmdW5jdGlvbiAocykge1xuICAgIC8vIE1vemlsbGEgYWx3YXlzIGFkZHMgYW4gZW50cnkgdG8gdGhlIGhpc3RvcnlcbiAgICBpZiAodGhpcy5tb2RlID09PSAnbGVnYWN5Jykge1xuICAgICAgdGhpcy53cml0ZUZyYW1lKHMpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhpc3RvcnkgPT09IHRydWUpIHtcbiAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7fSwgZG9jdW1lbnQudGl0bGUsIHMpO1xuICAgICAgLy8gRmlyZSBhbiBvbnBvcHN0YXRlIGV2ZW50IG1hbnVhbGx5IHNpbmNlIHB1c2hpbmcgZG9lcyBub3Qgb2J2aW91c2x5XG4gICAgICAvLyB0cmlnZ2VyIHRoZSBwb3AgZXZlbnQuXG4gICAgICB0aGlzLmZpcmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGxvYy5oYXNoID0gKHNbMF0gPT09ICcvJykgPyBzIDogJy8nICsgcztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgd3JpdGVGcmFtZTogZnVuY3Rpb24gKHMpIHtcbiAgICAvLyBJRSBzdXBwb3J0Li4uXG4gICAgdmFyIGYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhdGUtZnJhbWUnKTtcbiAgICB2YXIgZCA9IGYuY29udGVudERvY3VtZW50IHx8IGYuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgICBkLm9wZW4oKTtcbiAgICBkLndyaXRlKFwiPHNjcmlwdD5faGFzaCA9ICdcIiArIHMgKyBcIic7IG9ubG9hZCA9IHBhcmVudC5saXN0ZW5lci5zeW5jSGFzaDs8c2NyaXB0PlwiKTtcbiAgICBkLmNsb3NlKCk7XG4gIH0sXG5cbiAgc3luY0hhc2g6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBJRSBzdXBwb3J0Li4uXG4gICAgdmFyIHMgPSB0aGlzLl9oYXNoO1xuICAgIGlmIChzICE9IGRsb2MuaGFzaCkge1xuICAgICAgZGxvYy5oYXNoID0gcztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgb25IYXNoQ2hhbmdlZDogZnVuY3Rpb24gKCkge31cbn07XG5cbnZhciBSb3V0ZXIgPSBleHBvcnRzLlJvdXRlciA9IGZ1bmN0aW9uIChyb3V0ZXMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJvdXRlcikpIHJldHVybiBuZXcgUm91dGVyKHJvdXRlcyk7XG5cbiAgdGhpcy5wYXJhbXMgICA9IHt9O1xuICB0aGlzLnJvdXRlcyAgID0ge307XG4gIHRoaXMubWV0aG9kcyAgPSBbJ29uJywgJ29uY2UnLCAnYWZ0ZXInLCAnYmVmb3JlJ107XG4gIHRoaXMuc2NvcGUgICAgPSBbXTtcbiAgdGhpcy5fbWV0aG9kcyA9IHt9O1xuXG4gIHRoaXMuX2luc2VydCA9IHRoaXMuaW5zZXJ0O1xuICB0aGlzLmluc2VydCA9IHRoaXMuaW5zZXJ0RXg7XG5cbiAgdGhpcy5oaXN0b3J5U3VwcG9ydCA9ICh3aW5kb3cuaGlzdG9yeSAhPSBudWxsID8gd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlIDogbnVsbCkgIT0gbnVsbFxuXG4gIHRoaXMuY29uZmlndXJlKCk7XG4gIHRoaXMubW91bnQocm91dGVzIHx8IHt9KTtcbn07XG5cblJvdXRlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChyKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5oYW5kbGVyID0gZnVuY3Rpb24ob25DaGFuZ2VFdmVudCkge1xuICAgIHZhciBuZXdVUkwgPSBvbkNoYW5nZUV2ZW50ICYmIG9uQ2hhbmdlRXZlbnQubmV3VVJMIHx8IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuICAgIHZhciB1cmwgPSBzZWxmLmhpc3RvcnkgPT09IHRydWUgPyBzZWxmLmdldFBhdGgoKSA6IG5ld1VSTC5yZXBsYWNlKC8uKiMvLCAnJyk7XG4gICAgc2VsZi5kaXNwYXRjaCgnb24nLCB1cmwuY2hhckF0KDApID09PSAnLycgPyB1cmwgOiAnLycgKyB1cmwpO1xuICB9O1xuXG4gIGxpc3RlbmVyLmluaXQodGhpcy5oYW5kbGVyLCB0aGlzLmhpc3RvcnkpO1xuXG4gIGlmICh0aGlzLmhpc3RvcnkgPT09IGZhbHNlKSB7XG4gICAgaWYgKGRsb2NIYXNoRW1wdHkoKSAmJiByKSB7XG4gICAgICBkbG9jLmhhc2ggPSByO1xuICAgIH0gZWxzZSBpZiAoIWRsb2NIYXNoRW1wdHkoKSkge1xuICAgICAgc2VsZi5kaXNwYXRjaCgnb24nLCAnLycgKyBkbG9jLmhhc2gucmVwbGFjZSgvXigjXFwvfCN8XFwvKS8sICcnKSk7XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIHZhciByb3V0ZVRvID0gZGxvY0hhc2hFbXB0eSgpICYmIHIgPyByIDogIWRsb2NIYXNoRW1wdHkoKSA/IGRsb2MuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6IG51bGw7XG4gICAgaWYgKHJvdXRlVG8pIHtcbiAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgZG9jdW1lbnQudGl0bGUsIHJvdXRlVG8pO1xuICAgIH1cblxuICAgIC8vIFJvdXRlciBoYXMgYmVlbiBpbml0aWFsaXplZCwgYnV0IGR1ZSB0byB0aGUgY2hyb21lIGJ1ZyBpdCB3aWxsIG5vdFxuICAgIC8vIHlldCBhY3R1YWxseSByb3V0ZSBIVE1MNSBoaXN0b3J5IHN0YXRlIGNoYW5nZXMuIFRodXMsIGRlY2lkZSBpZiBzaG91bGQgcm91dGUuXG4gICAgaWYgKHJvdXRlVG8gfHwgdGhpcy5ydW5faW5faW5pdCA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5oYW5kbGVyKCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5Sb3V0ZXIucHJvdG90eXBlLmV4cGxvZGUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB2ID0gdGhpcy5oaXN0b3J5ID09PSB0cnVlID8gdGhpcy5nZXRQYXRoKCkgOiBkbG9jLmhhc2g7XG4gIGlmICh2LmNoYXJBdCgxKSA9PT0gJy8nKSB7IHY9di5zbGljZSgxKSB9XG4gIHJldHVybiB2LnNsaWNlKDEsIHYubGVuZ3RoKS5zcGxpdChcIi9cIik7XG59O1xuXG5Sb3V0ZXIucHJvdG90eXBlLnNldFJvdXRlID0gZnVuY3Rpb24gKGksIHYsIHZhbCkge1xuICB2YXIgdXJsID0gdGhpcy5leHBsb2RlKCk7XG5cbiAgaWYgKHR5cGVvZiBpID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgdiA9PT0gJ3N0cmluZycpIHtcbiAgICB1cmxbaV0gPSB2O1xuICB9XG4gIGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgdXJsLnNwbGljZShpLCB2LCBzKTtcbiAgfVxuICBlbHNlIHtcbiAgICB1cmwgPSBbaV07XG4gIH1cblxuICBsaXN0ZW5lci5zZXRIYXNoKHVybC5qb2luKCcvJykpO1xuICByZXR1cm4gdXJsO1xufTtcblxuLy9cbi8vICMjIyBmdW5jdGlvbiBpbnNlcnRFeChtZXRob2QsIHBhdGgsIHJvdXRlLCBwYXJlbnQpXG4vLyAjIyMjIEBtZXRob2Qge3N0cmluZ30gTWV0aG9kIHRvIGluc2VydCB0aGUgc3BlY2lmaWMgYHJvdXRlYC5cbi8vICMjIyMgQHBhdGgge0FycmF5fSBQYXJzZWQgcGF0aCB0byBpbnNlcnQgdGhlIGByb3V0ZWAgYXQuXG4vLyAjIyMjIEByb3V0ZSB7QXJyYXl8ZnVuY3Rpb259IFJvdXRlIGhhbmRsZXJzIHRvIGluc2VydC5cbi8vICMjIyMgQHBhcmVudCB7T2JqZWN0fSAqKk9wdGlvbmFsKiogUGFyZW50IFwicm91dGVzXCIgdG8gaW5zZXJ0IGludG8uXG4vLyBpbnNlcnQgYSBjYWxsYmFjayB0aGF0IHdpbGwgb25seSBvY2N1ciBvbmNlIHBlciB0aGUgbWF0Y2hlZCByb3V0ZS5cbi8vXG5Sb3V0ZXIucHJvdG90eXBlLmluc2VydEV4ID0gZnVuY3Rpb24obWV0aG9kLCBwYXRoLCByb3V0ZSwgcGFyZW50KSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgaWYgKG1ldGhvZCA9PT0gXCJvbmNlXCIpIHtcbiAgICBtZXRob2QgPSBcIm9uXCI7XG4gICAgcm91dGUgPSBmdW5jdGlvbihyb3V0ZSkge1xuICAgICAgdmFyIG9uY2UgPSBmYWxzZTtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKG9uY2UpIHJldHVybjtcbiAgICAgICAgb25jZSA9IHRydWU7XG4gICAgICAgIGlmIChzZWxmLnJlc291cmNlICYmIHR5cGVvZiByb3V0ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICByZXR1cm4gc2VsZi5yZXNvdXJjZVtyb3V0ZV0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcm91dGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KHJvdXRlKTtcbiAgfVxuICByZXR1cm4gdGhpcy5faW5zZXJ0KG1ldGhvZCwgcGF0aCwgcm91dGUsIHBhcmVudCk7XG59O1xuXG5Sb3V0ZXIucHJvdG90eXBlLmdldFJvdXRlID0gZnVuY3Rpb24gKHYpIHtcbiAgdmFyIHJldCA9IHY7XG5cbiAgaWYgKHR5cGVvZiB2ID09PSBcIm51bWJlclwiKSB7XG4gICAgcmV0ID0gdGhpcy5leHBsb2RlKClbdl07XG4gIH1cbiAgZWxzZSBpZiAodHlwZW9mIHYgPT09IFwic3RyaW5nXCIpe1xuICAgIHZhciBoID0gdGhpcy5leHBsb2RlKCk7XG4gICAgcmV0ID0gaC5pbmRleE9mKHYpO1xuICB9XG4gIGVsc2Uge1xuICAgIHJldCA9IHRoaXMuZXhwbG9kZSgpO1xuICB9XG5cbiAgcmV0dXJuIHJldDtcbn07XG5cblJvdXRlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgbGlzdGVuZXIuZGVzdHJveSh0aGlzLmhhbmRsZXIpO1xuICByZXR1cm4gdGhpcztcbn07XG5cblJvdXRlci5wcm90b3R5cGUuZ2V0UGF0aCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHBhdGggPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gIGlmIChwYXRoLnN1YnN0cigwLCAxKSAhPT0gJy8nKSB7XG4gICAgcGF0aCA9ICcvJyArIHBhdGg7XG4gIH1cbiAgcmV0dXJuIHBhdGg7XG59O1xuZnVuY3Rpb24gX2V2ZXJ5KGFyciwgaXRlcmF0b3IpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAoaXRlcmF0b3IoYXJyW2ldLCBpLCBhcnIpID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBfZmxhdHRlbihhcnIpIHtcbiAgdmFyIGZsYXQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIG4gPSBhcnIubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgZmxhdCA9IGZsYXQuY29uY2F0KGFycltpXSk7XG4gIH1cbiAgcmV0dXJuIGZsYXQ7XG59XG5cbmZ1bmN0aW9uIF9hc3luY0V2ZXJ5U2VyaWVzKGFyciwgaXRlcmF0b3IsIGNhbGxiYWNrKSB7XG4gIGlmICghYXJyLmxlbmd0aCkge1xuICAgIHJldHVybiBjYWxsYmFjaygpO1xuICB9XG4gIHZhciBjb21wbGV0ZWQgPSAwO1xuICAoZnVuY3Rpb24gaXRlcmF0ZSgpIHtcbiAgICBpdGVyYXRvcihhcnJbY29tcGxldGVkXSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICBpZiAoZXJyIHx8IGVyciA9PT0gZmFsc2UpIHtcbiAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29tcGxldGVkICs9IDE7XG4gICAgICAgIGlmIChjb21wbGV0ZWQgPT09IGFyci5sZW5ndGgpIHtcbiAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZXJhdGUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KSgpO1xufVxuXG5mdW5jdGlvbiBwYXJhbWlmeVN0cmluZyhzdHIsIHBhcmFtcywgbW9kKSB7XG4gIG1vZCA9IHN0cjtcbiAgZm9yICh2YXIgcGFyYW0gaW4gcGFyYW1zKSB7XG4gICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShwYXJhbSkpIHtcbiAgICAgIG1vZCA9IHBhcmFtc1twYXJhbV0oc3RyKTtcbiAgICAgIGlmIChtb2QgIT09IHN0cikge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1vZCA9PT0gc3RyID8gXCIoWy5fYS16QS1aMC05LV0rKVwiIDogbW9kO1xufVxuXG5mdW5jdGlvbiByZWdpZnlTdHJpbmcoc3RyLCBwYXJhbXMpIHtcbiAgdmFyIG1hdGNoZXMsIGxhc3QgPSAwLCBvdXQgPSBcIlwiO1xuICB3aGlsZSAobWF0Y2hlcyA9IHN0ci5zdWJzdHIobGFzdCkubWF0Y2goL1teXFx3XFxkXFwtICVAJl0qXFwqW15cXHdcXGRcXC0gJUAmXSovKSkge1xuICAgIGxhc3QgPSBtYXRjaGVzLmluZGV4ICsgbWF0Y2hlc1swXS5sZW5ndGg7XG4gICAgbWF0Y2hlc1swXSA9IG1hdGNoZXNbMF0ucmVwbGFjZSgvXlxcKi8sIFwiKFtfLigpIVxcXFwgJUAmYS16QS1aMC05LV0rKVwiKTtcbiAgICBvdXQgKz0gc3RyLnN1YnN0cigwLCBtYXRjaGVzLmluZGV4KSArIG1hdGNoZXNbMF07XG4gIH1cbiAgc3RyID0gb3V0ICs9IHN0ci5zdWJzdHIobGFzdCk7XG4gIHZhciBjYXB0dXJlcyA9IHN0ci5tYXRjaCgvOihbXlxcL10rKS9pZyksIGNhcHR1cmUsIGxlbmd0aDtcbiAgaWYgKGNhcHR1cmVzKSB7XG4gICAgbGVuZ3RoID0gY2FwdHVyZXMubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGNhcHR1cmUgPSBjYXB0dXJlc1tpXTtcbiAgICAgIGlmIChjYXB0dXJlLnNsaWNlKDAsIDIpID09PSBcIjo6XCIpIHtcbiAgICAgICAgc3RyID0gY2FwdHVyZS5zbGljZSgxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKGNhcHR1cmUsIHBhcmFtaWZ5U3RyaW5nKGNhcHR1cmUsIHBhcmFtcykpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3RyO1xufVxuXG5mdW5jdGlvbiB0ZXJtaW5hdG9yKHJvdXRlcywgZGVsaW1pdGVyLCBzdGFydCwgc3RvcCkge1xuICB2YXIgbGFzdCA9IDAsIGxlZnQgPSAwLCByaWdodCA9IDAsIHN0YXJ0ID0gKHN0YXJ0IHx8IFwiKFwiKS50b1N0cmluZygpLCBzdG9wID0gKHN0b3AgfHwgXCIpXCIpLnRvU3RyaW5nKCksIGk7XG4gIGZvciAoaSA9IDA7IGkgPCByb3V0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgY2h1bmsgPSByb3V0ZXNbaV07XG4gICAgaWYgKGNodW5rLmluZGV4T2Yoc3RhcnQsIGxhc3QpID4gY2h1bmsuaW5kZXhPZihzdG9wLCBsYXN0KSB8fCB+Y2h1bmsuaW5kZXhPZihzdGFydCwgbGFzdCkgJiYgIX5jaHVuay5pbmRleE9mKHN0b3AsIGxhc3QpIHx8ICF+Y2h1bmsuaW5kZXhPZihzdGFydCwgbGFzdCkgJiYgfmNodW5rLmluZGV4T2Yoc3RvcCwgbGFzdCkpIHtcbiAgICAgIGxlZnQgPSBjaHVuay5pbmRleE9mKHN0YXJ0LCBsYXN0KTtcbiAgICAgIHJpZ2h0ID0gY2h1bmsuaW5kZXhPZihzdG9wLCBsYXN0KTtcbiAgICAgIGlmICh+bGVmdCAmJiAhfnJpZ2h0IHx8ICF+bGVmdCAmJiB+cmlnaHQpIHtcbiAgICAgICAgdmFyIHRtcCA9IHJvdXRlcy5zbGljZSgwLCAoaSB8fCAxKSArIDEpLmpvaW4oZGVsaW1pdGVyKTtcbiAgICAgICAgcm91dGVzID0gWyB0bXAgXS5jb25jYXQocm91dGVzLnNsaWNlKChpIHx8IDEpICsgMSkpO1xuICAgICAgfVxuICAgICAgbGFzdCA9IChyaWdodCA+IGxlZnQgPyByaWdodCA6IGxlZnQpICsgMTtcbiAgICAgIGkgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0ID0gMDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJvdXRlcztcbn1cblxuUm91dGVyLnByb3RvdHlwZS5jb25maWd1cmUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubWV0aG9kcy5sZW5ndGg7IGkrKykge1xuICAgIHRoaXMuX21ldGhvZHNbdGhpcy5tZXRob2RzW2ldXSA9IHRydWU7XG4gIH1cbiAgdGhpcy5yZWN1cnNlID0gb3B0aW9ucy5yZWN1cnNlIHx8IHRoaXMucmVjdXJzZSB8fCBmYWxzZTtcbiAgdGhpcy5hc3luYyA9IG9wdGlvbnMuYXN5bmMgfHwgZmFsc2U7XG4gIHRoaXMuZGVsaW1pdGVyID0gb3B0aW9ucy5kZWxpbWl0ZXIgfHwgXCIvXCI7XG4gIHRoaXMuc3RyaWN0ID0gdHlwZW9mIG9wdGlvbnMuc3RyaWN0ID09PSBcInVuZGVmaW5lZFwiID8gdHJ1ZSA6IG9wdGlvbnMuc3RyaWN0O1xuICB0aGlzLm5vdGZvdW5kID0gb3B0aW9ucy5ub3Rmb3VuZDtcbiAgdGhpcy5yZXNvdXJjZSA9IG9wdGlvbnMucmVzb3VyY2U7XG4gIHRoaXMuaGlzdG9yeSA9IG9wdGlvbnMuaHRtbDVoaXN0b3J5ICYmIHRoaXMuaGlzdG9yeVN1cHBvcnQgfHwgZmFsc2U7XG4gIHRoaXMucnVuX2luX2luaXQgPSB0aGlzLmhpc3RvcnkgPT09IHRydWUgJiYgb3B0aW9ucy5ydW5faGFuZGxlcl9pbl9pbml0ICE9PSBmYWxzZTtcbiAgdGhpcy5ldmVyeSA9IHtcbiAgICBhZnRlcjogb3B0aW9ucy5hZnRlciB8fCBudWxsLFxuICAgIGJlZm9yZTogb3B0aW9ucy5iZWZvcmUgfHwgbnVsbCxcbiAgICBvbjogb3B0aW9ucy5vbiB8fCBudWxsXG4gIH07XG4gIHJldHVybiB0aGlzO1xufTtcblxuUm91dGVyLnByb3RvdHlwZS5wYXJhbSA9IGZ1bmN0aW9uKHRva2VuLCBtYXRjaGVyKSB7XG4gIGlmICh0b2tlblswXSAhPT0gXCI6XCIpIHtcbiAgICB0b2tlbiA9IFwiOlwiICsgdG9rZW47XG4gIH1cbiAgdmFyIGNvbXBpbGVkID0gbmV3IFJlZ0V4cCh0b2tlbiwgXCJnXCIpO1xuICB0aGlzLnBhcmFtc1t0b2tlbl0gPSBmdW5jdGlvbihzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoY29tcGlsZWQsIG1hdGNoZXIuc291cmNlIHx8IG1hdGNoZXIpO1xuICB9O1xufTtcblxuUm91dGVyLnByb3RvdHlwZS5vbiA9IFJvdXRlci5wcm90b3R5cGUucm91dGUgPSBmdW5jdGlvbihtZXRob2QsIHBhdGgsIHJvdXRlKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgaWYgKCFyb3V0ZSAmJiB0eXBlb2YgcGF0aCA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByb3V0ZSA9IHBhdGg7XG4gICAgcGF0aCA9IG1ldGhvZDtcbiAgICBtZXRob2QgPSBcIm9uXCI7XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkocGF0aCkpIHtcbiAgICByZXR1cm4gcGF0aC5mb3JFYWNoKGZ1bmN0aW9uKHApIHtcbiAgICAgIHNlbGYub24obWV0aG9kLCBwLCByb3V0ZSk7XG4gICAgfSk7XG4gIH1cbiAgaWYgKHBhdGguc291cmNlKSB7XG4gICAgcGF0aCA9IHBhdGguc291cmNlLnJlcGxhY2UoL1xcXFxcXC8vaWcsIFwiL1wiKTtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShtZXRob2QpKSB7XG4gICAgcmV0dXJuIG1ldGhvZC5mb3JFYWNoKGZ1bmN0aW9uKG0pIHtcbiAgICAgIHNlbGYub24obS50b0xvd2VyQ2FzZSgpLCBwYXRoLCByb3V0ZSk7XG4gICAgfSk7XG4gIH1cbiAgcGF0aCA9IHBhdGguc3BsaXQobmV3IFJlZ0V4cCh0aGlzLmRlbGltaXRlcikpO1xuICBwYXRoID0gdGVybWluYXRvcihwYXRoLCB0aGlzLmRlbGltaXRlcik7XG4gIHRoaXMuaW5zZXJ0KG1ldGhvZCwgdGhpcy5zY29wZS5jb25jYXQocGF0aCksIHJvdXRlKTtcbn07XG5cblJvdXRlci5wcm90b3R5cGUuZGlzcGF0Y2ggPSBmdW5jdGlvbihtZXRob2QsIHBhdGgsIGNhbGxiYWNrKSB7XG4gIHZhciBzZWxmID0gdGhpcywgZm5zID0gdGhpcy50cmF2ZXJzZShtZXRob2QsIHBhdGgsIHRoaXMucm91dGVzLCBcIlwiKSwgaW52b2tlZCA9IHRoaXMuX2ludm9rZWQsIGFmdGVyO1xuICB0aGlzLl9pbnZva2VkID0gdHJ1ZTtcbiAgaWYgKCFmbnMgfHwgZm5zLmxlbmd0aCA9PT0gMCkge1xuICAgIHRoaXMubGFzdCA9IFtdO1xuICAgIGlmICh0eXBlb2YgdGhpcy5ub3Rmb3VuZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB0aGlzLmludm9rZShbIHRoaXMubm90Zm91bmQgXSwge1xuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgcGF0aDogcGF0aFxuICAgICAgfSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHRoaXMucmVjdXJzZSA9PT0gXCJmb3J3YXJkXCIpIHtcbiAgICBmbnMgPSBmbnMucmV2ZXJzZSgpO1xuICB9XG4gIGZ1bmN0aW9uIHVwZGF0ZUFuZEludm9rZSgpIHtcbiAgICBzZWxmLmxhc3QgPSBmbnMuYWZ0ZXI7XG4gICAgc2VsZi5pbnZva2Uoc2VsZi5ydW5saXN0KGZucyksIHNlbGYsIGNhbGxiYWNrKTtcbiAgfVxuICBhZnRlciA9IHRoaXMuZXZlcnkgJiYgdGhpcy5ldmVyeS5hZnRlciA/IFsgdGhpcy5ldmVyeS5hZnRlciBdLmNvbmNhdCh0aGlzLmxhc3QpIDogWyB0aGlzLmxhc3QgXTtcbiAgaWYgKGFmdGVyICYmIGFmdGVyLmxlbmd0aCA+IDAgJiYgaW52b2tlZCkge1xuICAgIGlmICh0aGlzLmFzeW5jKSB7XG4gICAgICB0aGlzLmludm9rZShhZnRlciwgdGhpcywgdXBkYXRlQW5kSW52b2tlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbnZva2UoYWZ0ZXIsIHRoaXMpO1xuICAgICAgdXBkYXRlQW5kSW52b2tlKCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHVwZGF0ZUFuZEludm9rZSgpO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cblJvdXRlci5wcm90b3R5cGUuaW52b2tlID0gZnVuY3Rpb24oZm5zLCB0aGlzQXJnLCBjYWxsYmFjaykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBhcHBseTtcbiAgaWYgKHRoaXMuYXN5bmMpIHtcbiAgICBhcHBseSA9IGZ1bmN0aW9uKGZuLCBuZXh0KSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShmbikpIHtcbiAgICAgICAgcmV0dXJuIF9hc3luY0V2ZXJ5U2VyaWVzKGZuLCBhcHBseSwgbmV4dCk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBmbiA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgZm4uYXBwbHkodGhpc0FyZywgZm5zLmNhcHR1cmVzLmNvbmNhdChuZXh0KSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBfYXN5bmNFdmVyeVNlcmllcyhmbnMsIGFwcGx5LCBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjay5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGFwcGx5ID0gZnVuY3Rpb24oZm4pIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGZuKSkge1xuICAgICAgICByZXR1cm4gX2V2ZXJ5KGZuLCBhcHBseSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBmbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBmbnMuY2FwdHVyZXMgfHwgW10pO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZm4gPT09IFwic3RyaW5nXCIgJiYgc2VsZi5yZXNvdXJjZSkge1xuICAgICAgICBzZWxmLnJlc291cmNlW2ZuXS5hcHBseSh0aGlzQXJnLCBmbnMuY2FwdHVyZXMgfHwgW10pO1xuICAgICAgfVxuICAgIH07XG4gICAgX2V2ZXJ5KGZucywgYXBwbHkpO1xuICB9XG59O1xuXG5Sb3V0ZXIucHJvdG90eXBlLnRyYXZlcnNlID0gZnVuY3Rpb24obWV0aG9kLCBwYXRoLCByb3V0ZXMsIHJlZ2V4cCwgZmlsdGVyKSB7XG4gIHZhciBmbnMgPSBbXSwgY3VycmVudCwgZXhhY3QsIG1hdGNoLCBuZXh0LCB0aGF0O1xuICBmdW5jdGlvbiBmaWx0ZXJSb3V0ZXMocm91dGVzKSB7XG4gICAgaWYgKCFmaWx0ZXIpIHtcbiAgICAgIHJldHVybiByb3V0ZXM7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRlZXBDb3B5KHNvdXJjZSkge1xuICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0W2ldID0gQXJyYXkuaXNBcnJheShzb3VyY2VbaV0pID8gZGVlcENvcHkoc291cmNlW2ldKSA6IHNvdXJjZVtpXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFwcGx5RmlsdGVyKGZucykge1xuICAgICAgZm9yICh2YXIgaSA9IGZucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShmbnNbaV0pKSB7XG4gICAgICAgICAgYXBwbHlGaWx0ZXIoZm5zW2ldKTtcbiAgICAgICAgICBpZiAoZm5zW2ldLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZm5zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCFmaWx0ZXIoZm5zW2ldKSkge1xuICAgICAgICAgICAgZm5zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIG5ld1JvdXRlcyA9IGRlZXBDb3B5KHJvdXRlcyk7XG4gICAgbmV3Um91dGVzLm1hdGNoZWQgPSByb3V0ZXMubWF0Y2hlZDtcbiAgICBuZXdSb3V0ZXMuY2FwdHVyZXMgPSByb3V0ZXMuY2FwdHVyZXM7XG4gICAgbmV3Um91dGVzLmFmdGVyID0gcm91dGVzLmFmdGVyLmZpbHRlcihmaWx0ZXIpO1xuICAgIGFwcGx5RmlsdGVyKG5ld1JvdXRlcyk7XG4gICAgcmV0dXJuIG5ld1JvdXRlcztcbiAgfVxuICBpZiAocGF0aCA9PT0gdGhpcy5kZWxpbWl0ZXIgJiYgcm91dGVzW21ldGhvZF0pIHtcbiAgICBuZXh0ID0gWyBbIHJvdXRlcy5iZWZvcmUsIHJvdXRlc1ttZXRob2RdIF0uZmlsdGVyKEJvb2xlYW4pIF07XG4gICAgbmV4dC5hZnRlciA9IFsgcm91dGVzLmFmdGVyIF0uZmlsdGVyKEJvb2xlYW4pO1xuICAgIG5leHQubWF0Y2hlZCA9IHRydWU7XG4gICAgbmV4dC5jYXB0dXJlcyA9IFtdO1xuICAgIHJldHVybiBmaWx0ZXJSb3V0ZXMobmV4dCk7XG4gIH1cbiAgZm9yICh2YXIgciBpbiByb3V0ZXMpIHtcbiAgICBpZiAocm91dGVzLmhhc093blByb3BlcnR5KHIpICYmICghdGhpcy5fbWV0aG9kc1tyXSB8fCB0aGlzLl9tZXRob2RzW3JdICYmIHR5cGVvZiByb3V0ZXNbcl0gPT09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkocm91dGVzW3JdKSkpIHtcbiAgICAgIGN1cnJlbnQgPSBleGFjdCA9IHJlZ2V4cCArIHRoaXMuZGVsaW1pdGVyICsgcjtcbiAgICAgIGlmICghdGhpcy5zdHJpY3QpIHtcbiAgICAgICAgZXhhY3QgKz0gXCJbXCIgKyB0aGlzLmRlbGltaXRlciArIFwiXT9cIjtcbiAgICAgIH1cbiAgICAgIG1hdGNoID0gcGF0aC5tYXRjaChuZXcgUmVnRXhwKFwiXlwiICsgZXhhY3QpKTtcbiAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAobWF0Y2hbMF0gJiYgbWF0Y2hbMF0gPT0gcGF0aCAmJiByb3V0ZXNbcl1bbWV0aG9kXSkge1xuICAgICAgICBuZXh0ID0gWyBbIHJvdXRlc1tyXS5iZWZvcmUsIHJvdXRlc1tyXVttZXRob2RdIF0uZmlsdGVyKEJvb2xlYW4pIF07XG4gICAgICAgIG5leHQuYWZ0ZXIgPSBbIHJvdXRlc1tyXS5hZnRlciBdLmZpbHRlcihCb29sZWFuKTtcbiAgICAgICAgbmV4dC5tYXRjaGVkID0gdHJ1ZTtcbiAgICAgICAgbmV4dC5jYXB0dXJlcyA9IG1hdGNoLnNsaWNlKDEpO1xuICAgICAgICBpZiAodGhpcy5yZWN1cnNlICYmIHJvdXRlcyA9PT0gdGhpcy5yb3V0ZXMpIHtcbiAgICAgICAgICBuZXh0LnB1c2goWyByb3V0ZXMuYmVmb3JlLCByb3V0ZXMub24gXS5maWx0ZXIoQm9vbGVhbikpO1xuICAgICAgICAgIG5leHQuYWZ0ZXIgPSBuZXh0LmFmdGVyLmNvbmNhdChbIHJvdXRlcy5hZnRlciBdLmZpbHRlcihCb29sZWFuKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpbHRlclJvdXRlcyhuZXh0KTtcbiAgICAgIH1cbiAgICAgIG5leHQgPSB0aGlzLnRyYXZlcnNlKG1ldGhvZCwgcGF0aCwgcm91dGVzW3JdLCBjdXJyZW50KTtcbiAgICAgIGlmIChuZXh0Lm1hdGNoZWQpIHtcbiAgICAgICAgaWYgKG5leHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGZucyA9IGZucy5jb25jYXQobmV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucmVjdXJzZSkge1xuICAgICAgICAgIGZucy5wdXNoKFsgcm91dGVzW3JdLmJlZm9yZSwgcm91dGVzW3JdLm9uIF0uZmlsdGVyKEJvb2xlYW4pKTtcbiAgICAgICAgICBuZXh0LmFmdGVyID0gbmV4dC5hZnRlci5jb25jYXQoWyByb3V0ZXNbcl0uYWZ0ZXIgXS5maWx0ZXIoQm9vbGVhbikpO1xuICAgICAgICAgIGlmIChyb3V0ZXMgPT09IHRoaXMucm91dGVzKSB7XG4gICAgICAgICAgICBmbnMucHVzaChbIHJvdXRlc1tcImJlZm9yZVwiXSwgcm91dGVzW1wib25cIl0gXS5maWx0ZXIoQm9vbGVhbikpO1xuICAgICAgICAgICAgbmV4dC5hZnRlciA9IG5leHQuYWZ0ZXIuY29uY2F0KFsgcm91dGVzW1wiYWZ0ZXJcIl0gXS5maWx0ZXIoQm9vbGVhbikpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmbnMubWF0Y2hlZCA9IHRydWU7XG4gICAgICAgIGZucy5jYXB0dXJlcyA9IG5leHQuY2FwdHVyZXM7XG4gICAgICAgIGZucy5hZnRlciA9IG5leHQuYWZ0ZXI7XG4gICAgICAgIHJldHVybiBmaWx0ZXJSb3V0ZXMoZm5zKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuUm91dGVyLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbihtZXRob2QsIHBhdGgsIHJvdXRlLCBwYXJlbnQpIHtcbiAgdmFyIG1ldGhvZFR5cGUsIHBhcmVudFR5cGUsIGlzQXJyYXksIG5lc3RlZCwgcGFydDtcbiAgcGF0aCA9IHBhdGguZmlsdGVyKGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gcCAmJiBwLmxlbmd0aCA+IDA7XG4gIH0pO1xuICBwYXJlbnQgPSBwYXJlbnQgfHwgdGhpcy5yb3V0ZXM7XG4gIHBhcnQgPSBwYXRoLnNoaWZ0KCk7XG4gIGlmICgvXFw6fFxcKi8udGVzdChwYXJ0KSAmJiAhL1xcXFxkfFxcXFx3Ly50ZXN0KHBhcnQpKSB7XG4gICAgcGFydCA9IHJlZ2lmeVN0cmluZyhwYXJ0LCB0aGlzLnBhcmFtcyk7XG4gIH1cbiAgaWYgKHBhdGgubGVuZ3RoID4gMCkge1xuICAgIHBhcmVudFtwYXJ0XSA9IHBhcmVudFtwYXJ0XSB8fCB7fTtcbiAgICByZXR1cm4gdGhpcy5pbnNlcnQobWV0aG9kLCBwYXRoLCByb3V0ZSwgcGFyZW50W3BhcnRdKTtcbiAgfVxuICBpZiAoIXBhcnQgJiYgIXBhdGgubGVuZ3RoICYmIHBhcmVudCA9PT0gdGhpcy5yb3V0ZXMpIHtcbiAgICBtZXRob2RUeXBlID0gdHlwZW9mIHBhcmVudFttZXRob2RdO1xuICAgIHN3aXRjaCAobWV0aG9kVHlwZSkge1xuICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgIHBhcmVudFttZXRob2RdID0gWyBwYXJlbnRbbWV0aG9kXSwgcm91dGUgXTtcbiAgICAgIHJldHVybjtcbiAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgcGFyZW50W21ldGhvZF0ucHVzaChyb3V0ZSk7XG4gICAgICByZXR1cm47XG4gICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgIHBhcmVudFttZXRob2RdID0gcm91dGU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBwYXJlbnRUeXBlID0gdHlwZW9mIHBhcmVudFtwYXJ0XTtcbiAgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkocGFyZW50W3BhcnRdKTtcbiAgaWYgKHBhcmVudFtwYXJ0XSAmJiAhaXNBcnJheSAmJiBwYXJlbnRUeXBlID09IFwib2JqZWN0XCIpIHtcbiAgICBtZXRob2RUeXBlID0gdHlwZW9mIHBhcmVudFtwYXJ0XVttZXRob2RdO1xuICAgIHN3aXRjaCAobWV0aG9kVHlwZSkge1xuICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgIHBhcmVudFtwYXJ0XVttZXRob2RdID0gWyBwYXJlbnRbcGFydF1bbWV0aG9kXSwgcm91dGUgXTtcbiAgICAgIHJldHVybjtcbiAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgcGFyZW50W3BhcnRdW21ldGhvZF0ucHVzaChyb3V0ZSk7XG4gICAgICByZXR1cm47XG4gICAgIGNhc2UgXCJ1bmRlZmluZWRcIjpcbiAgICAgIHBhcmVudFtwYXJ0XVttZXRob2RdID0gcm91dGU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9IGVsc2UgaWYgKHBhcmVudFR5cGUgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIG5lc3RlZCA9IHt9O1xuICAgIG5lc3RlZFttZXRob2RdID0gcm91dGU7XG4gICAgcGFyZW50W3BhcnRdID0gbmVzdGVkO1xuICAgIHJldHVybjtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHJvdXRlIGNvbnRleHQ6IFwiICsgcGFyZW50VHlwZSk7XG59O1xuXG5cblxuUm91dGVyLnByb3RvdHlwZS5leHRlbmQgPSBmdW5jdGlvbihtZXRob2RzKSB7XG4gIHZhciBzZWxmID0gdGhpcywgbGVuID0gbWV0aG9kcy5sZW5ndGgsIGk7XG4gIGZ1bmN0aW9uIGV4dGVuZChtZXRob2QpIHtcbiAgICBzZWxmLl9tZXRob2RzW21ldGhvZF0gPSB0cnVlO1xuICAgIHNlbGZbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGV4dHJhID0gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IFsgbWV0aG9kLCBcIlwiIF0gOiBbIG1ldGhvZCBdO1xuICAgICAgc2VsZi5vbi5hcHBseShzZWxmLCBleHRyYS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgIH07XG4gIH1cbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgZXh0ZW5kKG1ldGhvZHNbaV0pO1xuICB9XG59O1xuXG5Sb3V0ZXIucHJvdG90eXBlLnJ1bmxpc3QgPSBmdW5jdGlvbihmbnMpIHtcbiAgdmFyIHJ1bmxpc3QgPSB0aGlzLmV2ZXJ5ICYmIHRoaXMuZXZlcnkuYmVmb3JlID8gWyB0aGlzLmV2ZXJ5LmJlZm9yZSBdLmNvbmNhdChfZmxhdHRlbihmbnMpKSA6IF9mbGF0dGVuKGZucyk7XG4gIGlmICh0aGlzLmV2ZXJ5ICYmIHRoaXMuZXZlcnkub24pIHtcbiAgICBydW5saXN0LnB1c2godGhpcy5ldmVyeS5vbik7XG4gIH1cbiAgcnVubGlzdC5jYXB0dXJlcyA9IGZucy5jYXB0dXJlcztcbiAgcnVubGlzdC5zb3VyY2UgPSBmbnMuc291cmNlO1xuICByZXR1cm4gcnVubGlzdDtcbn07XG5cblJvdXRlci5wcm90b3R5cGUubW91bnQgPSBmdW5jdGlvbihyb3V0ZXMsIHBhdGgpIHtcbiAgaWYgKCFyb3V0ZXMgfHwgdHlwZW9mIHJvdXRlcyAhPT0gXCJvYmplY3RcIiB8fCBBcnJheS5pc0FycmF5KHJvdXRlcykpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBwYXRoID0gcGF0aCB8fCBbXTtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHBhdGgpKSB7XG4gICAgcGF0aCA9IHBhdGguc3BsaXQoc2VsZi5kZWxpbWl0ZXIpO1xuICB9XG4gIGZ1bmN0aW9uIGluc2VydE9yTW91bnQocm91dGUsIGxvY2FsKSB7XG4gICAgdmFyIHJlbmFtZSA9IHJvdXRlLCBwYXJ0cyA9IHJvdXRlLnNwbGl0KHNlbGYuZGVsaW1pdGVyKSwgcm91dGVUeXBlID0gdHlwZW9mIHJvdXRlc1tyb3V0ZV0sIGlzUm91dGUgPSBwYXJ0c1swXSA9PT0gXCJcIiB8fCAhc2VsZi5fbWV0aG9kc1twYXJ0c1swXV0sIGV2ZW50ID0gaXNSb3V0ZSA/IFwib25cIiA6IHJlbmFtZTtcbiAgICBpZiAoaXNSb3V0ZSkge1xuICAgICAgcmVuYW1lID0gcmVuYW1lLnNsaWNlKChyZW5hbWUubWF0Y2gobmV3IFJlZ0V4cChcIl5cIiArIHNlbGYuZGVsaW1pdGVyKSkgfHwgWyBcIlwiIF0pWzBdLmxlbmd0aCk7XG4gICAgICBwYXJ0cy5zaGlmdCgpO1xuICAgIH1cbiAgICBpZiAoaXNSb3V0ZSAmJiByb3V0ZVR5cGUgPT09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkocm91dGVzW3JvdXRlXSkpIHtcbiAgICAgIGxvY2FsID0gbG9jYWwuY29uY2F0KHBhcnRzKTtcbiAgICAgIHNlbGYubW91bnQocm91dGVzW3JvdXRlXSwgbG9jYWwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaXNSb3V0ZSkge1xuICAgICAgbG9jYWwgPSBsb2NhbC5jb25jYXQocmVuYW1lLnNwbGl0KHNlbGYuZGVsaW1pdGVyKSk7XG4gICAgICBsb2NhbCA9IHRlcm1pbmF0b3IobG9jYWwsIHNlbGYuZGVsaW1pdGVyKTtcbiAgICB9XG4gICAgc2VsZi5pbnNlcnQoZXZlbnQsIGxvY2FsLCByb3V0ZXNbcm91dGVdKTtcbiAgfVxuICBmb3IgKHZhciByb3V0ZSBpbiByb3V0ZXMpIHtcbiAgICBpZiAocm91dGVzLmhhc093blByb3BlcnR5KHJvdXRlKSkge1xuICAgICAgaW5zZXJ0T3JNb3VudChyb3V0ZSwgcGF0aC5zbGljZSgwKSk7XG4gICAgfVxuICB9XG59O1xuXG5cblxufSh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIiA/IGV4cG9ydHMgOiB3aW5kb3cpKTsiXX0=
