(this.webpackJsonptotalreader=this.webpackJsonptotalreader||[]).push([[0],{180:function(e,t,a){e.exports=a(326)},185:function(e,t,a){},204:function(e,t,a){},326:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(36),s=a.n(r),i=(a(185),a(149)),o=a(150),c=a(169),m=a(168),u=a(340),h=a(337),f=a(327),p=a(336),d=a(339),v=a(93),g=a.n(v),k=(a(203),a(204),[0,18,27,35]),y=function(e){Object(c.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={link:"",stats:[],name:[]},n}return Object(o.a)(a,[{key:"readTeam",value:function(){var e=this;g.a.get("https://cors-anywhere.herokuapp.com/"+this.state.link).then((function(t){for(var a=t.data,n=0,l=0,r="data-age",s=[],i=[];n<a.length;){if(a[n]===r[l]?l++:l=0,l+1===r.length){for(n-=10+r.length;'"'!==a[n];)n-=1;n+=1;for(var o="",c="",m=!0;'"'!==a[n];)":"===a[n]?m=!1:","===a[n]?(m=!0,s.push({name:c,level:o}),o="",c=""):m?c+=a[n]:o+=a[n],n++;for(l=0,c="";n<a.length;){if(a[n]==='name="'[l]?l++:l=0,l==='name="'.length){for(n+=1;'"'!==a[n];)c+=a[n],n++;break}n++}for(l=0,c+=" ";n<a.length;){if(a[n]==='name="'[l]?l++:l=0,l==='name="'.length){for(n+=1;'"'!==a[n];)c+=a[n],n++;break}n++}l=0,i.push(c)}n+=1}e.setState({link:"",stats:s,name:i})}))}},{key:"readPage",value:function(){var e=this;g.a.get("https://cors-anywhere.herokuapp.com/"+this.state.link).then((function(t){for(var a=t.data,n=0,l="data-positions=",r=0,s=0,i="";n<a.length&&r+1!==l.length;)if(a[n]===l[r]?r++:r=0,i||a[n]!=="<title>"[s]?s=0:s++,n+=1,s+1==="<title>".length)for(;"<"!==a[++n];)i+=a[n];var o=[];if((n+=2)<a.length-1)for(var c="",m="",u=!0;'"'!==a[n];)":"===a[n]?u=!1:","===a[n]?(u=!0,o.push({name:m,level:c}),c="",m=""):u?m+=a[n]:c+=a[n],n++;e.setState({stats:o,link:"",name:[i]})}))}},{key:"calculateStars",value:function(e){var t=0;return k.forEach((function(a){e>=a&&(t+=.5)})),t}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"my-total-reader"},l.a.createElement(u.a,{className:"my-header",size:"huge"},"Total Reader"),l.a.createElement(h.a,{onSubmit:function(){if(e.state.link.length>0){var t=e.state.link.split("/");t[t.length-1]="";var a=t.join("/");"https://www.total-football.org/player/"===a||"www.total-football.org/player/"===a?e.readPage():"squad"===t[t.length-2]&&e.readTeam()}}},l.a.createElement(h.a.Field,{className:"my-field"},l.a.createElement(f.a,{color:"twitter",type:"submit"},"Submit"),l.a.createElement(p.a,{className:"my-input",value:this.state.link,placeholder:"Link to the player...",onChange:function(t){e.setState({link:t.target.value})}}))),l.a.createElement("div",{className:"player-info"},this.state.name.map((function(t,a){return l.a.createElement(d.a,{className:"my-card"},l.a.createElement("div",null,l.a.createElement(u.a,{textAlign:"center",className:"info-name",size:"small"},t)),e.state.stats.map((function(t,n){return 15*(a+1)>n&&15*a<=n?l.a.createElement(u.a,{key:t.name,className:"info-header",size:"small"},t.name," : ",t.level,", stars:"," ",e.calculateStars(Number(t.level))):null})))}))))}}]),a}(n.Component);s.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(y,null)),document.getElementById("root"))}},[[180,1,2]]]);
//# sourceMappingURL=main.931283d9.chunk.js.map