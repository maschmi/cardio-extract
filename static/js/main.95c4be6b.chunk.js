(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{113:function(e,t,n){},127:function(e,t,n){},134:function(e,t){},136:function(e,t){},146:function(e,t){},148:function(e,t){},175:function(e,t){},176:function(e,t){},181:function(e,t){},183:function(e,t){},190:function(e,t){},209:function(e,t){},226:function(e,t,n){"use strict";n.r(t);var r=n(10),a=n.n(r),i=n(114),c=n.n(i),s=n(21),u=n(121),o=(n(127),n(58)),l=n.n(o),d=n(115),m=n(28),f=n(116),v=n(117),b=n(122),h=n(120),j=(n(59),n(118)),p=n.n(j),g=n(119),x=n(2),O=function(e){Object(b.a)(n,e);var t=Object(h.a)(n);function n(e){var r;return Object(f.a)(this,n),(r=t.call(this,e)).state=void 0,r.state={selectedFile:"",measurements:[]},r}return Object(v.a)(n,[{key:"buttonText",value:function(){return""!==this.state.selectedFile?this.state.selectedFile:"No file selected"}},{key:"render",value:function(){var e=this;return Object(x.jsxs)("div",{className:"flex flex-col rounded shadow p-2 bg-gray-50 border",children:[Object(x.jsx)("p",{className:"text-center mt-2",children:"Please select the database to load"}),Object(x.jsxs)("label",{className:"rounded p-2 my-2 text-center hover:bg-blue-500 bg-blue-200",children:[Object(x.jsx)("span",{className:"bg-green",children:this.buttonText()}),Object(x.jsx)("input",{className:"hidden",type:"file",name:"file",onChange:function(t){return e.changeHandler(t)}})]}),Object(x.jsxs)("div",{className:"text-center",children:["Loaded ",this.state.measurements.length," measurements"]})]})}},{key:"changeHandler",value:function(e){var t,n,r=this;this.setState(Object(m.a)(Object(m.a)({},this.state),{},{selectedFile:e.target.value}));var a=null===e||void 0===e||null===(t=e.target)||void 0===t||null===(n=t.files)||void 0===n?void 0:n.item(0);null===a||void 0===a||a.arrayBuffer().then((function(e){return r.readFromDB(new Uint8Array(e)).then((function(e){return r.setState(Object(m.a)(Object(m.a)({},r.state),{},{measurements:e}))})).then((function(){return r.props.publish(r.state.measurements)}))}))}},{key:"readFromDB",value:function(){var e=Object(d.a)(l.a.mark((function e(t){var n,r,a,i,c=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p()({locateFile:function(){return g.a}});case 2:return n=e.sent,r=new n.Database(t),"SELECT value FROM serverCache",a=r.exec("SELECT value FROM serverCache"),i=a.flatMap((function(e){return e.values.flatMap((function(e){return c.mapToModel(e.map((function(e){return e})))}))})),e.abrupt("return",i.filter((function(e){return!isNaN(null===e||void 0===e?void 0:e.measurement_time)})));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"mapToModel",value:function(e){var t=e[0],n=String.fromCodePoint.apply(String,Object(s.a)(t));try{return JSON.parse(n)}catch(r){return{}}}}]),n}(a.a.Component);n(113);function y(e){var t=Object(s.a)(e.input).filter((function(e){return!isNaN(null===e||void 0===e?void 0:e.measurement_time)})).sort((function(e,t){return e.measurement_time-t.measurement_time})),n=function(e){var t,n,r=void 0!==e[0]?new Date:void 0,a=void 0!==e[e.length-1]?new Date:void 0;return null===r||void 0===r||r.setTime(null===(t=e[0])||void 0===t?void 0:t.measurement_time),null===a||void 0===a||a.setTime(null===(n=e[e.length-1])||void 0===n?void 0:n.measurement_time),{firstMeasurementTime:r,lastMeasurementTime:a}}(t),r=n.firstMeasurementTime,a=n.lastMeasurementTime,i=function(e){var t=e.length;return{avgDia:e.map((function(e){return e.diastolic})).reduce((function(e,t){return e+t}),-1)/t,avgSys:e.map((function(e){return e.systolic})).reduce((function(e,t){return e+t}),-1)/t}}(t),c=i.avgDia,u=i.avgSys;return Object(x.jsxs)("div",{className:"rounded shadow p-2 border bg-gray-50 flex flex-col",children:[Object(x.jsxs)("div",{className:"grid grid-cols-2 gap-2",children:[Object(x.jsxs)("div",{children:["First measurement ",null===r||void 0===r?void 0:r.toLocaleString()]}),Object(x.jsxs)("div",{children:["Last measurement ",null===a||void 0===a?void 0:a.toLocaleString()]})]}),Object(x.jsxs)("div",{className:"grid grid-cols-2 gap-2",children:[Object(x.jsxs)("div",{children:["Average Diastolic ",c.toFixed(2)," mmHg"]}),Object(x.jsxs)("div",{children:["Average Systolic ",u.toFixed(2)," mmHg"]})]})]})}function N(e){var t=function(e){return e.map((function(e){var t=new Date;return t.setTime(e.measurement_time),{date:t.toLocaleDateString(),time:t.toLocaleTimeString(),diastolic:e.diastolic,systolic:e.systolic,pulse:e.pulse,comment:e.comment,health:e.health,arm:e.arm,arrhythmia:e.arrhythmia}}))}(e),n=Object.keys(t[0]),r=t.map((function(e){return n.map((function(t){return JSON.stringify(e[t],(function(e,t){return function(e,t){return null===t?"":t}(0,t)}))})).join(",")}));r.unshift(n.join(","));var a=new Blob([r.join("\n")],{type:"text/csv"}),i=window.URL.createObjectURL(a),c=document.createElement("a");c.href=i,c.setAttribute("download","measurements.csv"),c.click(),c.remove()}function S(e){return Object(x.jsx)("div",{className:"rounded shadow border bg-gray-50 inline-flex justify-center",children:Object(x.jsx)("button",{className:"rounded p-2 my-2 text-center hover:bg-blue-500 bg-blue-200",disabled:0===e.data.length,onClick:function(){return N(e.data)},children:"Export as CSV"})})}var w=function(){var e=Object(r.useState)([]),t=Object(u.a)(e,2),n=t[0],a=t[1];return Object(x.jsxs)("div",{className:"flex space-y-3 mr-auto ml-auto flex-col w-4/5",children:[Object(x.jsx)("h1",{className:"text-center font-bold",children:"Measurement extractor"}),Object(x.jsx)(O,{publish:function(e){return a(Object(s.a)(e))}}),Object(x.jsx)(y,{input:n}),Object(x.jsx)(S,{data:n})]})},F=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,227)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),r(e),a(e),i(e),c(e)}))};c.a.render(Object(x.jsx)(a.a.StrictMode,{children:Object(x.jsx)(w,{})}),document.getElementById("root")),F()},59:function(e,t,n){}},[[226,1,2]]]);
//# sourceMappingURL=main.95c4be6b.chunk.js.map