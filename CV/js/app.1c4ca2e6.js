(function(t){function e(e){for(var s,o,r=e[0],l=e[1],c=e[2],u=0,_=[];u<r.length;u++)o=r[u],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&_.push(a[o][0]),a[o]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(t[s]=l[s]);d&&d(e);while(_.length)_.shift()();return n.push.apply(n,c||[]),i()}function i(){for(var t,e=0;e<n.length;e++){for(var i=n[e],s=!0,r=1;r<i.length;r++){var l=i[r];0!==a[l]&&(s=!1)}s&&(n.splice(e--,1),t=o(o.s=i[0]))}return t}var s={},a={app:0},n=[];function o(e){if(s[e])return s[e].exports;var i=s[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=t,o.c=s,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(i,s,function(e){return t[e]}.bind(null,s));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var d=l;n.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"034f":function(t,e,i){"use strict";var s=i("64a9"),a=i.n(s);a.a},"56d7":function(t,e,i){"use strict";i.r(e);i("cadf"),i("551c"),i("f751"),i("097d");var s=i("2b0e"),a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{"overflow-x":"hidden"}},[i("header",{staticClass:"header"},[i("div",{staticClass:"container header__inner"},[i("div",{staticClass:"header__left"},[t._m(0),i("div",{staticClass:"header__content hor-center"},[i("h1",[t._v(t._s(t.name))]),i("div",{staticClass:"key-value"},[i("div",[t._v(t._s(t.portfolioTitle))]),i("a",{staticClass:"marked",attrs:{href:t.portfolioUrl}},[t._v(t._s(t.portfolioName))])])])]),i("div",{staticClass:"header__information"},[i("table",{staticClass:"fancy condensed"},[i("tr",[i("td",[t._v("address")]),i("td",[t._v(t._s(t.address))])]),i("tr",[i("td",[t._v("Email")]),i("td",[t._v(t._s(t.email))])]),i("tr",[i("td",[t._v("Phone")]),i("td",[t._v(t._s(t.phone))])]),i("tr",[i("td",[t._v("Date of birth")]),i("td",[t._v(t._s(t.birth))])])])])])]),i("section",{attrs:{id:"about"}},[i("div",{staticClass:"container small"},[i("h1",{staticClass:"line-left"},[t._v(t._s(t.aboutTitle))]),i("div",{staticClass:"text-container"},t._l(t.aboutText,function(e){return i("p",[t._v(t._s(e))])}),0)])]),i("section",{staticClass:"bg-dark",attrs:{id:"studies"}},[i("div",{staticClass:"container"},[i("h1",{staticClass:"section-title"},[t._v(t._s(t.studiesTitle))]),i("div",{staticClass:"timeline"},[i("div",{staticClass:"timeline__items"},t._l(t.studies,function(e){return i("div",{staticClass:"timeline__item"},[i("header",{staticClass:"timeline__item__header"},[i("div",{staticClass:"timeline__item__title"},[t._v(t._s(e.title))]),i("div",{staticClass:"timeline__item__date"},[t._v(t._s(e.date))])]),i("table",{staticClass:"timeline__item__content"},t._l(e.fields,function(e){return i("tr",[i("td",[t._v(t._s(e.key))]),i("td",[t._v(t._s(e.value))])])}),0)])}),0)])])]),i("section",{staticClass:"bg-dark",attrs:{id:"studies"}},[i("div",{staticClass:"container"},[i("h1",{staticClass:"section-title"},[t._v(t._s(t.workTitle))]),i("div",{staticClass:"timeline"},[i("div",{staticClass:"timeline__items"},t._l(t.work,function(e){return i("div",{staticClass:"timeline__item"},[i("header",{staticClass:"timeline__item__header"},[i("div",{staticClass:"timeline__item__title"},[t._v(t._s(e.title))]),i("div",{staticClass:"timeline__item__date"},[t._v(t._s(e.date))])]),i("table",{staticClass:"timeline__item__content"},t._l(e.fields,function(e){return i("tr",[i("td",[t._v(t._s(e.key))]),i("td",[t._v(t._s(e.value))])])}),0)])}),0)])])]),i("section",[i("div",{staticClass:"container"},[i("div",{staticClass:"row"},[i("div",{staticClass:"stretch",attrs:{id:"skills"}},[i("h1",{staticClass:"line-left"},[t._v(t._s(t.skillsTitle))]),i("div",{staticClass:"skills-container"},t._l(t.skills,function(e){return i("div",{staticClass:"skill-table"},[i("div",{staticClass:"skill-table__title"},[t._v(t._s(e.title))]),i("div",{staticClass:"skill-table__content"},t._l(e.fields,function(e){return i("div",{staticClass:"skill-table__row"},[i("div",[t._v(t._s(e.name))]),i("div",{staticClass:"rating",attrs:{value:e.rating}},t._l(parseInt(e.rating),function(t){return i("i",{key:t,staticClass:"fa fa-star"})}),0),i("div",[t._v(t._s(e.description))])])}),0)])}),0)]),i("div",{staticClass:"small"},[i("div",{attrs:{id:"qualities"}},[i("h1",{staticClass:"line-right"},[t._v(t._s(t.qualitiesTitle))]),i("div",{staticClass:"qualities"},t._l(t.qualities,function(e){return i("div",{staticClass:"qualities__row"},[i("i",{class:"fa fa-"+e.icon}),i("div",[t._v(t._s(e.text))])])}),0)]),i("div",{attrs:{id:"interests"}},[i("h1",{staticClass:"line-right"},[t._v(t._s(t.interestsTitle))]),i("div",{staticClass:"interests-container"},t._l(t.interests,function(e){return i("div",{staticClass:"marked"},[t._v(t._s(e))])}),0)])])])])]),i("footer",{staticClass:"bg-dark"},[i("div",{staticClass:"container"},[i("p",[t._v(t._s(t.footerText))])])])])},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"header__photo"},[s("img",{attrs:{src:i("8311"),alt:"Joost Hobma"}})])}],o={name:"Home",data:function(){return{name:"Joost Hobma",portfolioTitle:"Portfolio:",portfolioName:"jossafossa.nl",portfolioUrl:"https://www.jossafossa.nl",adress:"Groningen",email:"joosthobma@gmail.com",phone:"+31 612631823",birth:"13 october 1996",aboutTitle:"About me",aboutText:["A young creator with 4 years of experience in web development and media production both within companies and as an independent creator. Skilled in PHP, HTML, CSS, SASS, JS, jQuery, SQL and experience with the creation of user-friendly custom WordPress templates. A curious and ambitious mindset will result in a unique and clean website or application. By creating a lot of projects at home without using libraries I have learnt how web development works on a low level. All those projects can be found on my website: jossafossa.nl"],studiesTitle:"Education",studies:[{title:"HBO-ICT",date:"sep ’17 - now",fields:[{key:"school",value:"Hanzehogeschool"},{key:"Location",value:"Groningen"},{key:"specialization",value:"Software engineering"}]},{title:"Mediavormgeving",date:"Feb ’14 - Juli ’17",fields:[{key:"school",value:"Friesland College"},{key:"Location",value:"Heerenveen"}]},{title:"VMBO-T",date:"Aug ’11 - jun ’13",fields:[{key:"school",value:"CSG Gaasterland"},{key:"location",value:"Balk"},{key:"profile",value:"Natuur en techniek"}]}],workTitle:"Work Experience",work:[{title:"Nordique",date:"Sep ’19 - Mar ’20",fields:[{key:"Type of company",value:"webdesign"},{key:"Location",value:"Groningen"},{key:"Function",value:"Front-End Web developer"}]},{title:"Mediasoep",date:"Aug ’16 - Jan ’17",fields:[{key:"Type of company",value:"webdesign"},{key:"Location",value:"Joure"},{key:"Function",value:"Webdesigner"}]},{title:"Joost Hobma",date:"Feb ’14 - now",fields:[{key:"work",value:"webdesign & graphic design"}]}],skillsTitle:"Skills",skills:[{title:"General",fields:[{name:"webdevelopment",rating:5,description:"advanced"},{name:"graphicsdesign",rating:4,description:"good"},{name:"video",rating:4,description:"good"}]},{title:"Programming",fields:[{name:"HTML",rating:5,description:"advanced"},{name:"CSS/SCSS",rating:5,description:"advanced"},{name:"JavaScript / jQuery",rating:4,description:"good"},{name:"PHP",rating:4,description:"good"},{name:"SQL",rating:4,description:"moderate"},{name:"Vue, Angular",rating:3,description:"moderate"},{name:"Python",rating:3,description:"moderate"}]},{title:"Tools",fields:[{name:"Illustrator",rating:5,description:"advanced"},{name:"After effects",rating:4,description:"good"},{name:"Premiere Pro",rating:3,description:"moderate"},{name:"Photoshop",rating:3,description:"moderate"}]},{title:"Languages",fields:[{name:"Dutch",rating:5,description:"Native"},{name:"English",rating:4,description:"good"},{name:"Frysk",rating:2,description:"limited"}]}],qualitiesTitle:"Qualities",qualities:[{text:"Creative",icon:"paint-brush"},{text:"Optimistic",icon:"smile"},{text:"Enthusiastic",icon:"graduation-cap"},{text:"Indipendent",icon:"user-check"},{text:"Versatile",icon:"calendar-check"},{text:"Perfectionistic",icon:"star"},{text:"Innovation driven",icon:"lightbulb"}],interestsTitle:"Interests",interests:["Webdevelopment","Design","Music","Audio equipment","Bass, guitar & drum"],footerText:"Copyright 2020 - Joost Hobma"}}},r=o,l=(i("034f"),i("2877")),c=Object(l["a"])(r,a,n,!1,null,null,null),d=c.exports;s["a"].config.productionTip=!1,new s["a"]({render:function(t){return t(d)}}).$mount("#app")},"64a9":function(t,e,i){},8311:function(t,e,i){t.exports=i.p+"img/photo.1567ca1e.jpg"}});
//# sourceMappingURL=app.1c4ca2e6.js.map