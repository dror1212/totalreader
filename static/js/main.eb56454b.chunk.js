(this.webpackJsonptotalreader=this.webpackJsonptotalreader||[]).push([[0],{216:function(e,t,a){e.exports=a(384)},221:function(e,t,a){},241:function(e,t,a){},384:function(e,t,a){"use strict";a.r(t);var n,r,s,l=a(0),i=a.n(l),o=a(38),c=a.n(o),u=(a(221),a(44)),f=a.n(u),m=a(88),h=a(61),p=a(185),d=a(205),v=a(203),y=a(398),k=a(397),g=a(43),b=a(385),w=a(395),E=a(394),N=a(399),I=a(89),x=a(113),S=a.n(x),j=(a(240),a(241),[0,9,18,27,35,"??","??","??","??","??","??","??"]),O=[0,.5,1,1.5,2,2.5,3,3.5,4,4.5,5],q=function e(t,a){Object(h.a)(this,e),this.position=void 0,this.level=void 0,this.position=t,this.level=a};function P(e){var t=-.5;return j.forEach((function(a){"??"===a||e>=a&&(t+=.5)})),t}!function(e){e.age="data-age",e.name='name="',e.dataId='data-id="',e.dataPosition="data-positions=",e.title="<title>"}(n||(n={})),function(e){e.filter="Filter",e.mark="Mark"}(r||(r={})),function(e){e.player="player",e.team="team",e.squad="squad",e.pageSquad="/squad/",e.all="All"}(s||(s={}));var H=function(e){Object(d.a)(a,e);var t=Object(v.a)(a);function a(e){var n;return Object(h.a)(this,a),(n=t.call(this,e)).state={link:"",stats:{},chose:-1,filter:!1},n}return Object(p.a)(a,[{key:"try",value:function(){var e=Object(m.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=1;case 1:if(!(t<1945)){e.next=14;break}return e.prev=2,e.next=5,this.readTeam("https://www.total-football.org/team/".concat(t,"/squad/"));case 5:e.next=11;break;case 7:return e.prev=7,e.t0=e.catch(2),console.log(t),e.abrupt("break",14);case 11:t+=1,e.next=1;break;case 14:case"end":return e.stop()}}),e,this,[[2,7]])})));return function(){return e.apply(this,arguments)}}()},{key:"findInHtml",value:function(e,t,a,n){for(var r=0,s="",l=n||'"';a<t.length;){if(t[a]===e[r]?r++:r=0,r===e.length){for(a+=1;t[a]!==l;)s+=t[a],a++;break}a++}return{newInfo:s,counter:a}}},{key:"getPositionsInfo",value:function(e,t,a){for(var n="",r="",s=!0;'"'!==e[t];)":"===e[t]?s=!1:","===e[t]?(s=!0,a.push(new q(r,n)),n="",r=""):s?r+=e[t]:n+=e[t],t++;return t}},{key:"readTeam",value:function(){var e=Object(m.a)(f.a.mark((function e(t){var a,r=this;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t||this.state.link,e.next=3,S.a.get("https://cors-anywhere.herokuapp.com/"+a).then((function(e){for(var t,a=e.data,s=0,l=0,i=[],o=r.state.stats;s<a.length;){if(a[s]===n.age[l]?l++:l=0,l+1===n.age.length){for(s-=10+n.age.length;'"'!==a[s];)s-=1;s+=1;var c,u="";s=r.getPositionsInfo(a,s,i),u=(t=r.findInHtml(n.name,a,s)).newInfo+" ",s=t.counter,u+=(t=r.findInHtml(n.name,a,s)).newInfo,s=t.counter,c=(t=r.findInHtml(n.dataId,a,s)).newInfo,s=t.counter,l=0,o[c]?console.log(u+" is already exist"):o[c]={playerName:u,info:i},i=[]}s+=1}r.setState({link:"",stats:o})}));case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"readPage",value:function(){var e=Object(m.a)(f.a.mark((function e(){var t,a,r=this;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this.state.link.split("player/")[1].split("/"[0]).join(""),(a=this.state.stats)[t]){e.next=7;break}return e.next=5,S.a.get("https://cors-anywhere.herokuapp.com/"+this.state.link).then((function(e){var s,l,i=e.data,o=0,c=[];s=(l=r.findInHtml(n.title,i,o,"<")).newInfo,o=l.counter,o=(l=r.findInHtml(n.dataPosition,i,o)).counter+1,o=r.getPositionsInfo(i,o,c),a[t]={playerName:s,info:c}}));case 5:e.next=8;break;case 7:console.log(this.state.stats[t].playerName+" is already exist");case 8:this.setState({stats:a,link:""});case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"my-total-reader"},i.a.createElement(y.a,{className:"my-header",size:"huge"},"Total Reader"),i.a.createElement(k.a,{hoverable:!0,basic:!0,trigger:i.a.createElement(g.a,{className:"my-popup",name:"info"})},"The numbers you will see after the players position are the value of this player in this position, each value represent how many stars the player deserve.",i.a.createElement("br",null),function(){var e="";return O.forEach((function(t,a){e+="\n ".concat(j[a],"-").concat(j[a+1]," : ").concat(t,"  , ")})),e=e.slice(0,e.length-4)}()),i.a.createElement(b.a,{onClick:function(){e.setState({stats:{},chose:-1})}},"Delete All"),i.a.createElement(w.a,{onSubmit:function(){if(e.state.link.length>0){var t=e.state.link.split("/");t[t.length-2]===s.player||t[t.length-3]===s.player?e.readPage():t[t.length-2]===s.squad||t[t.length-1]===s.squad?e.readTeam():t[t.length-2]===s.team||t[t.length-3]===s.team?e.readTeam(e.state.link+s.pageSquad):e.state.link===s.all&&e.try(),console.log(t)}}},i.a.createElement(w.a.Field,{className:"my-field"},i.a.createElement(b.a,{color:"twitter",type:"submit"},"Submit"),i.a.createElement(E.a,{className:"my-input",value:this.state.link,placeholder:"Link to a player/team...",onChange:function(t){e.setState({link:t.target.value})}}))),i.a.createElement(b.a,{onClick:function(){e.setState({filter:!e.state.filter})}},this.state.filter?r.filter:r.mark),O.map((function(t){return i.a.createElement(b.a,{key:t,className:"my-button",color:e.state.chose===t?"yellow":"red",onClick:function(){e.setState({chose:e.state.chose===t?-1:t})}},t)})),i.a.createElement("div",{className:"player-info"},Object.entries(this.state.stats).map((function(t){return!e.state.filter||P(Number(t[1].info[0].level))>=e.state.chose?i.a.createElement(N.a,{className:"my-card"},i.a.createElement("a",{href:"https://www.total-football.org/player/".concat(t[0],"/")},i.a.createElement(y.a,{textAlign:"center",className:"info-name",size:"small"},t[1].playerName)),t[1].info.map((function(a){return!e.state.filter||P(Number(a.level))>=e.state.chose?i.a.createElement(I.a,{key:a.position+t[0],className:e.state.filter||e.state.chose!==P(Number(a.level))?"info-header":"info-header-mark"},a.position," : ",a.level,", stars:"," ",P(Number(a.level))):null}))):null}))))}}]),a}(l.Component);c.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(H,null)),document.getElementById("root"))}},[[216,1,2]]]);
//# sourceMappingURL=main.eb56454b.chunk.js.map