(this.webpackJsonpscheduler=this.webpackJsonpscheduler||[]).push([[0],{15:function(e,t,n){e.exports=n(42)},20:function(e,t,n){},39:function(e,t,n){},40:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(13),c=n.n(r),s=(n(20),n(1));function o(e,t){return t&&Object(s.a)(Object(s.a)({},t),{},{interviewer:e.interviewers[t.interviewer]})}var l=n(6),m=n(3),u=n.n(m),d=n(4);function p(e,t){switch(t.type){case"SET_DAY":return Object(s.a)(Object(s.a)({},e),{},{day:t.day});case"SET_APPLICATION_DATA":return Object(s.a)(Object(s.a)({},e),{},{days:t.days,appointments:t.appointments,interviewers:t.interviewers});case"SET_INTERVIEW":var n=Object(s.a)(Object(s.a)({},e.appointments[t.id]),{},{interview:t.interview&&Object(s.a)({},t.interview)}),a=Object(s.a)(Object(s.a)({},e.appointments),{},Object(d.a)({},t.id,n)),i=function(e){return e.appointments.length-e.appointments.reduce((function(e,t){return a[t].interview?e+1:e}),0)},r=e.days.map((function(e){return e.appointments.includes(t.id)?Object(s.a)(Object(s.a)({},e),{},{spots:i(e)}):e}));return Object(s.a)(Object(s.a)({},e),{},{appointments:a,days:r});default:throw new Error("Tried to reduce with unsupported action type: ".concat(t.type))}}function E(){var e=Object(a.useReducer)(p,{day:"Monday",days:[],appointments:{},interviewers:{}}),t=Object(l.a)(e,2),n=t[0],i=t[1];return Object(a.useEffect)((function(){Promise.all([u.a.get("/api/days"),u.a.get("/api/appointments"),u.a.get("/api/interviewers")]).then((function(e){var t=Object(l.a)(e,3),n=t[0].data,a=t[1].data,r=t[2].data;return i({type:"SET_APPLICATION_DATA",days:n,appointments:a,interviewers:r})}))}),[]),function(e){Object(a.useEffect)((function(){var t=new WebSocket("ws://localhost:8001");return t.onmessage=function(t){var n=JSON.parse(t.data);"object"===typeof n&&"SET_INTERVIEW"===n.type&&e(n)},function(){t.close()}}),[e])}(i),{state:n,setDay:function(e){return i({type:"SET_DAY",day:e})},bookInterview:function(e,t){return u.a.put("/api/appointments/".concat(e),{interview:t}).then((function(){i({type:"SET_INTERVIEW",id:e,interview:t})}))},cancelInterview:function(e){return u.a.delete("/api/appointments/".concat(e)).then((function(){i({type:"SET_INTERVIEW",id:e,interview:null})}))}}}n(39);var _=n(14),v=n.n(_);n(40);function f(e){var t,n=v()("day-list__item",{"day-list__item--selected":e.selected,"day-list__item--full":0===e.spots});return i.a.createElement("li",{className:n,onClick:function(){return e.setDay(e.name)},"data-testid":"day"},i.a.createElement("h2",{className:"text--regular"},e.name),i.a.createElement("h3",{className:"text--light"},0===(t=e.spots)?"no spots remaining":1===t?"1 spot remaining":"".concat(t," spots remaining")))}function y(e){var t=e.days.map((function(t){return i.a.createElement(f,{key:t.id,name:t.name,spots:t.spots,selected:t.name===e.day,setDay:e.setDay})}));return i.a.createElement("ul",null,t)}n(41);function w(e){return i.a.createElement("header",{className:"appointment__time"},i.a.createElement("h4",{className:"text--semi-bold"},e.time),i.a.createElement("hr",{className:"appointment__separator"}))}function b(e){return i.a.createElement("main",{className:"appointment__add"},i.a.createElement("img",{className:"appointment__add-button",src:"images/add.png",alt:"Add",onClick:e.onAdd}))}function O(e){return i.a.createElement("main",{className:"appointment__card appointment__card--show"},i.a.createElement("section",{className:"appointment__card-left"},i.a.createElement("h2",{className:"text--regular"},e.student),i.a.createElement("section",{className:"interviewer"},i.a.createElement("h4",{className:"text--light"},"Interviewer"),i.a.createElement("h3",{className:"text--regular"},e.interviewer&&e.interviewer.name))),i.a.createElement("section",{className:"appointment__card-right"},i.a.createElement("section",{className:"appointment__actions"},i.a.createElement("img",{className:"appointment__actions-button",src:"images/edit.png",alt:"Edit",onClick:e.onEdit}),i.a.createElement("img",{className:"appointment__actions-button",src:"images/trash.png",alt:"Delete",onClick:e.onDelete}))))}function g(e){return i.a.createElement("article",{className:"appointment","data-testid":"appointment"},i.a.createElement(w,{time:e.time}),e.interview?i.a.createElement(O,{student:e.interview.student,interviewer:e.interview.interviewer,onDelete:function(){return console.log("CONFIRM")},onEdit:function(){return console.log("EDIT")}}):i.a.createElement(b,{onAdd:function(){return console.log("CREATE")}}))}function N(e){var t=E(),n=t.state,a=t.setDay,r=t.bookInterview,c=t.cancelInterview,s=function(e,t){var n=e.days.find((function(e){return t===e.name}));return 0===e.days.length||void 0===n?[]:n.interviewers.map((function(t){return e.interviewers[t]}))}(n,n.day),l=function(e,t){var n=e.days.find((function(e){return t===e.name}));return 0===e.days.length||void 0===n?[]:n.appointments.map((function(t){return e.appointments[t]}))}(n,n.day).map((function(e){return i.a.createElement(g,Object.assign({key:e.id},e,{interview:o(n,e.interview),interviewers:s,bookInterview:r,cancelInterview:c}))}));return i.a.createElement("main",{className:"layout"},i.a.createElement("section",{className:"sidebar"},i.a.createElement("img",{className:"sidebar--centered",src:"images/logo.png",alt:"Interview Scheduler"}),i.a.createElement("hr",{className:"sidebar__separator sidebar--centered"}),i.a.createElement("nav",{className:"sidebar__menu"},i.a.createElement(y,{days:n.days,day:n.day,setDay:a})),i.a.createElement("img",{className:"sidebar__lhl sidebar--centered",src:"images/lhl.png",alt:"Lighthouse Labs"})),i.a.createElement("section",{className:"schedule"},l,i.a.createElement(g,{key:"last",time:"5pm"})))}Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,REACT_APP_WEBSOCKET_URL:"ws://localhost:8001"}).REACT_APP_API_BASE_URL&&(u.a.defaults.baseURL=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,REACT_APP_WEBSOCKET_URL:"ws://localhost:8001"}).REACT_APP_API_BASE_URL),c.a.render(i.a.createElement(N,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.8a563ad8.chunk.js.map