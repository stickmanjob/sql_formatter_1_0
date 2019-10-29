(function(t){function e(e){for(var a,s,u=e[0],i=e[1],l=e[2],d=0,c=[];d<u.length;d++)s=u[d],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&c.push(n[s][0]),n[s]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a]);p&&p(e);while(c.length)c.shift()();return o.push.apply(o,l||[]),r()}function r(){for(var t,e=0;e<o.length;e++){for(var r=o[e],a=!0,u=1;u<r.length;u++){var i=r[u];0!==n[i]&&(a=!1)}a&&(o.splice(e--,1),t=s(s.s=r[0]))}return t}var a={},n={app:0},o=[];function s(e){if(a[e])return a[e].exports;var r=a[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=a,s.d=function(t,e,r){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(r,a,function(e){return t[e]}.bind(null,a));return r},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],i=u.push.bind(u);u.push=e,u=u.slice();for(var l=0;l<u.length;l++)e(u[l]);var p=i;o.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"56d7":function(t,e,r){"use strict";r.r(e);r("cadf"),r("551c"),r("f751"),r("097d");var a=r("2b0e"),n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("sql-input"),r("sql-output")],1)},o=[],s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.sqlInputData,expression:"sqlInputData"}],domProps:{value:t.sqlInputData},on:{input:function(e){e.target.composing||(t.sqlInputData=e.target.value)}}})])},u=[],i={name:"SqlInput",computed:{sqlInputData:{get:function(){return this.$store.state.sqlInputData},set:function(t){this.$store.commit("updateSqlInputData",t)}}}},l=i,p=r("2877"),d=Object(p["a"])(l,s,u,!1,null,"6156f233",null),c=d.exports,f=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.sqlOutputData,expression:"sqlOutputData"}],domProps:{value:t.sqlOutputData},on:{input:function(e){e.target.composing||(t.sqlOutputData=e.target.value)}}})])},$=[],v=(r("456d"),r("ac6a"),r("28a5"),r("a481"),{name:"SqlOutput",methods:{preFormatting:function(t){return t.replace(/\r?\n+/g," ").replace(/\t/g,"").replace(/\s{2,}/g," ")},mainFormatting:function(t){var e="",r="",a="",n="",o=[""],s=0,u=!0,i=!1,l={operator:{value:/^([=+<>\-%!]{1,2}|LIKE)$/i,noBreakWords:/^.*$/i,spacedWords:/^(?!.*)$/i},openParentheses:{value:/^\($/i,noBreakWords:/^(?!.*)$/i,spacedWords:/^(?!.*)$/i},closeParentheses:{value:/^\)$/i,noBreakWords:/^AS$/i,spacedWords:/^(?!.*)$/i},in:{value:/^IN$/i,noBreakWords:/^.*$/i,spacedWords:/^(?!.*)$/i},as:{value:/^AS$/i,noBreakWords:/^.*$/i,spacedWords:/^(?!.*)$/i},join:{value:/^JOIN$/i,noBreakWords:/^[^()]*$/i,spacedWords:/^(?!.*)$/i},AggregateFnc:{value:/^(MAX|AVG|COUNT|MIN|SUM)$/i,noBreakWords:/^.*$/i,spacedWords:/^(?!.*)$/i},select:{value:/^SELECT$/i,noBreakWords:/^(TOP|DISTINCT)$/i,spacedWords:/^(UNION|ALL)$/i},from:{value:/^FROM$/i,noBreakWords:/^(?!.*)$/i,spacedWords:/^.*$/i},where:{value:/^WHERE$/i,noBreakWords:/^(?!.*)$/i,spacedWords:/^.*$/i},order:{value:/^ORDER$/i,noBreakWords:/^BY$/i,spacedWords:/^.*$/i},inner:{value:/^INNER$/i,noBreakWords:/^JOIN$/i,spacedWords:/^.*$/i},left:{value:/^LEFT$/i,noBreakWords:/^(OUTER|JOIN)$/i,spacedWords:/^.*$/i},outer:{value:/^OUTER$/i,noBreakWords:/^JOIN$/i,spacedWords:/^(?!.*)$/i},top:{value:/^TOP$/i,noBreakWords:/^.*$/i,spacedWords:/^(?!.*)$/i},union:{value:/^UNION$/i,noBreakWords:/^ALL$/i,spacedWords:/^.*$/i},full:{value:/^FULL$/i,noBreakWords:/^(OUTER|JOIN)$/i,spacedWords:/^.*$/i},case2:{value:/^(WHEN|ELSE|THEN)/i,noBreakWords:/^.*/i,spacedWords:/^(?!.*)$/i},others:{value:/.*$/i,noBreakWords:/^([=,+,<,>,-,%,!]+|IN|BETWEEN|AS|ASC|DESC|THEN|LIKE)$/i,spacedWords:/^(?!.*)$/i}};return e=t.split(" "),e.forEach((function(t,n){u=!0,i=!1,r=e[n-1],a=e[n+1];for(var p=0,d=Object.keys(l);p<d.length;p++){var c=d[p];if(l[c].value.test(t)&&(l[c].spacedWords.test(r)&&(i=!0),l[c].noBreakWords.test(a)&&(t+=" ",u=!1),!0===i||!1===u))break}i&&(s++,o[s]=""),o[s]=o[s]+t,u&&(s++,o[s]="")})),n=o.join("\n"),n},indentFormatting:function(t){var e,r,a=0;return r=t.split("\n"),e=r.map((function(t){/^(\)\s*|END)/i.test(t)&&a--,console.log(a);for(var e=0;e<a;e++)t="\t"+t;return/(\($|CASE)/i.test(t)&&a++,t})),e=e.join("\n"),e}},computed:{sqlOutputData:{get:function(){var t,e=this.$store.state.sqlInputData;return t=this.preFormatting(e),t=this.mainFormatting(t),t=this.indentFormatting(t),t},set:function(t){this.$store.commit("sqlOutputData",t)}}}}),m=v,W=Object(p["a"])(m,f,$,!1,null,"2372015f",null),O=W.exports,g={name:"app",components:{"sql-input":c,"sql-output":O}},h=g,q=Object(p["a"])(h,n,o,!1,null,null,null),I=q.exports,D=r("2f62");a["a"].use(D["a"]);var E=new D["a"].Store({state:{sqlInputData:"",sqlOutputData:""},mutations:{updateSqlInputData:function(t,e){t.sqlInputData=e},updateSqlOutputData:function(t,e){t.sqlOutputData=e}},getters:{getSqlInputData:function(t){return t.sqlInputData},getSqlOutputData:function(t){return t.sqlOutputData}}});a["a"].config.productionTip=!1,new a["a"]({render:function(t){return t(I)},store:E}).$mount("#app")}});
//# sourceMappingURL=app.41e52d15.js.map