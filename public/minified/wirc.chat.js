(function(f){var g,a,q;var h=f('<li class="notice"><div class="question">Do you want notifications? <a href="#!yes" class="button yes">Yes</a> <a href="#!no" class="button confirm no">No</a></div></li>');var c=f("<div/>");var i=new sortedSet();var j=[];var p=700;var l=["/help","/join #","/query ","/msg ","/me ","/nick ","/close","/part ","/names ","/topic ","/reconnect","/whois "];i.add=function(x,y){if(y!==c.data("nick")){this.set[y]=x}this.length++;return this};f.fn.attachEventsToMessage=function(){this.find("h3 a").each(function(){this.href="#"+this.href}).click(function(){var x=f(this).text();a.val(a.val()?a.val()+" "+x+" ":x+": ").focusSoon()});this.find(".close").click(function(){f(this).closest("li").remove()})};f.fn.appendToMessages=function(){var A=c.children("li:last");var C=A.data("sender")||"";this.attachEventsToMessage();if(this.hasClass("message")&&A.hasClass("message")){if(C==this.data("sender")){this.addClass("same-nick").children("h3, .avatar, .timestamp").remove()}}else{if(this.hasClass("nick-change")){var B,y,z=this.find(".old").text(),x=this.find(".nick").text();i.add(i.score(z),x).rem(z);if(z==c.data("nick")){B=new RegExp("\\b"+z+"\\b","i");y=a.attr("placeholder").replace(B,x);a.attr("placeholder",y).attr("title",y);c.data("nick",x)}}else{if(this.hasClass("nick-joined")){i.add(0,this.find(".nick").text());u(f("<div/>"))}else{if(this.hasClass("nick-parted")){i.rem(this.find(".nick").text());u(f("<div/>"))}else{if(this.hasClass("nicks")){u(this);return}else{if(this.data("sender")){i.add(new Date().getTime(),this.data("sender"))}}}}}}c.append(this.fadeIn("fast"))};f.fn.cidAndTarget=function(x){if(x){return this.attr("data-cid",x.data("cid")).attr("data-target",x.data("target")).data("cid",x.data("cid")).data("target",x.data("target"))}else{return{cid:this.data("cid"),cid:this.data("target")}}};var s=function(){c=f("div.messages ul");c.start_time=parseFloat(c.data("start-time")||0);f("body").loadingIndicator("hide");f("div.nicks.container ul").html("");c.find("li").attachEventsToMessage();i.clear();if(c.data("target").indexOf("#")===0){a.send("/names",0).send("/topic",0);f(".without-nick-list").addClass("with-nick-list").removeClass("without-nick-list")}else{f(".with-nick-list").addClass("without-nick-list").removeClass("with-nick-list")}if(location.href.indexOf("from=")>0){c.end_time=parseFloat(c.data("end-time")||0);q.scrollTo(0);v();w()}else{a.focusSoon();q.data("at_bottom",true)}if(!Object.equals(a.cidAndTarget(),c.cidAndTarget())){m({})}a.cidAndTarget(c);e()};var b=function(z){var x=f("ul.conversations li, div.conversations.container li");var C=f("div.conversations.container ul");var A=f("nav ul.conversations");var E=f("nav").width()-f("nav .right").outerWidth()-f("nav a.settings").outerWidth();var D=0,y,B;if(z){B=x.find('a[href="'+f.url_for(z.data("cid"),z.data("target"))+'"]');y=parseInt(B.attr("data-unread"))+1;B.attr("data-unread",y).attr("title",y+" unread messages in "+z.data("target"));B.closest("li").addClass("unread")}x.each(function(){var F=f(this);if(!F.parent("ul").is(".conversations")){A.append(F)}D+=F.find("a").outerWidth();if(D<E){return}C.prepend(F)});if(D>=E){f("nav a.conversations.toggler").show()}else{f("nav a.conversations.toggler").trigger("deactivate").hide()}};var e=function(){b();f("a[data-toggle]").filter(".active").trigger("activate");if(f(".without-nick-list").length){f("div.nicks.container").css({left:"",height:"",display:"none"})}else{if(q.width()>p){f("a.nicks.toggler").trigger("deactivate");f("div.nicks.container").css({left:"",height:"",display:"block"})}else{if(f("a.nicks.toggler").is(".active")){f("div.nicks.container").css({display:"block"})}else{f("div.nicks.container").css({display:"none"})}}}if(q.data("at_bottom")){q.scrollTo("bottom")}};var v=function(){var y=f(document).data("height_from");g[q.scrollTop()+q.height()<y.height()-200?"show":"hide"]();if(c.start_time&&q.scrollTop()==0){var x=c.end_time;f.get(location.href.replace(/\?.*/,""),{to:c.start_time},function(C){var A=f(C);var D=A.children("li:lt(-1)");var B=y.height();c.end_time=x;if(!D.length){return}c.start_time=parseFloat(A.data("start-time"));c.prepend(D);q.scrollTop(y.height()-B)});c.start_time=c.end_time=0}else{if(c.end_time&&q.data("at_bottom")){var z=c.start_time;f.get(location.href.replace(/\?.*/,""),{from:c.end_time},function(B){var A=f(B);var C=A.children("li:gt(0)");c.start_time=z;if(!C.length){return}c.end_time=parseFloat(A.data("end-time"));C.each(function(){f(this).appendToMessages()})});c.start_time=c.end_time=0}}};var r=function(){var A="";var x,C,B,y;var z=function(E){var G=a.val();var F=G.lastIndexOf(" ")+1;var D=new RegExp("^"+RegExp.escape(G.substr(F)),"i");x=x||{i:0,prefix:G.substr(0,F),list:f.map(f.grep(i.revrange(0,-1).concat(j).concat(l).unique(),function(H,I){return F&&H.indexOf("/")===0?false:D.test(H)?true:false}),function(H,I){return F?H+" ":H.indexOf("/")===0?H:H+": "}).concat(G.substr(F))};a.val(x.prefix+x.list[x.i++]);if(x.i==x.list.length){x.i=0}return false};f.get(f.url_for(["command-history"]),function(D){a.history=D;a.history_i=a.history.length});a.doubletap(z);a.bind("keydown",function(D){if(D.keyCode!==9){x=false}});a.bind("keydown","tab",z);a.bind("keydown","up",function(D){D.preventDefault();if(a.history_i==0){return}if(a.history_i==a.history.length){A=a.val()}a.val(a.history[--a.history_i])});a.bind("keydown","down",function(D){D.preventDefault();if(++a.history_i==a.history.length){return a.val(A)}if(a.history_i>a.history.length){return a.history_i=a.history.length}a.val(a.history[a.history_i])});a.closest("form").submit(function(D){D.preventDefault();a.send(a.val(),1).val("")})};var n=function(){if(Notification.permission==="granted"){return}if(Notification.permission==="unsupported"){return}if(Notification.permission==="denied"){return}h.appendToMessages();h.find("a.yes").click(function(){Notification.requestPermission();f(this).closest("li").fadeOut()});h.find("a.no").click(function(){f(this).closest("li").fadeOut()})};var t=function(){f(document).on("pjax:timeout",function(x){x.preventDefault()});f(document).pjax("nav a.conversation","div.messages");f(document).pjax("div.container a","div.messages");f("div.messages").on("pjax:end",s);f("div.messages").on("pjax:start",function(y,x){f("body").loadingIndicator("show")})};var d=function(){a.history=[];a.history_i=0;a.socket=window.ws(a.closest("form").data("socket-url"));a.socket.onmessage=k;a.socket.onopen=function(){a.removeClass("disabled")};a.socket.onclose=function(){a.addClass("disabled")};a.send=function(x,y){if(x.length==0){return a}a.socket.send(f("<div/>").cidAndTarget(c).attr("data-history",y).text(x).prop("outerHTML"));a.addClass("sending").siblings(".menu").hide();if(y){a.history.push(x)}a.history_i=a.history.length;return a}};var o=function(){f("body").bind("keydown","esc",function(z){z.preventDefault();var y=f("a[data-toggle]").filter(".active");if(!y.length){return true}y.trigger("deactivate").focus()});f("body, input").bind("keydown","shift+return",function(y){y.preventDefault();f("a[data-toggle]").not(q.width()<p?"whatever":".nicks.toggler").trigger("deactivate");if(document.activeElement==a.get(0)){f("nav ul.conversations a").slice(0,2).eq(-1).focus()}else{a.focus()}});var x=function(B,A){var y,z;return function(C){y=f(document.activeElement).closest("li");if(y.length===0){return true}z=A?parseInt(y.closest("div.container").height()/y.height())+1:0;y=y[B]();if(y.length<=z){z=y.length-1}y.eq(z).find("a").focus();return false}};f("body").bind("keydown","up",x("prevAll",0));f("body").bind("keydown","pageup",x("prevAll",1));f("body").bind("keydown","down",x("nextAll",0));f("body").bind("keydown","pagedown",x("nextAll",1))};var u=function(y){var x=y.find("[data-nick]");var A=c.data("cid");var z={};if(x.length){c.find("li[data-sender]").each(function(B){z[f(this).data("sender")]=B});x.each(function(){var B=f(this);var C=B.data("nick");i.add(z[C]||1,C)})}if(i.length){f("div.nicks.container ul").html(f.map(i.revrange(0,-1).sortCaseInsensitive(),function(C,B){return'<li><a href="'+f.url_for(A,C)+'">'+C+"</a></li>"}).join(""));f("div.nicks.container").nanoScroller()}};var k=function(C){var y=f(C.data);var A=q.data("at_bottom");var x;a.removeClass("sending").siblings(".menu").show();if(y.data("target")==="any"){y.data("target",c.data("target")).data("cid",c.data("cid"))}x=Object.equals(y.cidAndTarget(),c.cidAndTarget());if(y.hasClass("highlight")){var z=y.data("sender");var B=y.data("target").indexOf("#")===0?"mentioned you in "+y.data("target"):"sent you a message";f.notify([z,B].join(" "),y.find(".content").text(),y.find("img").attr("src"));if(!x){w()}}if(y.hasClass("remove-conversation")){m({goto_current:x})}else{if(y.hasClass("add-conversation")){m({goto_current:true})}else{if(x){y.appendToMessages()}else{if(y.hasClass("message")){b(y)}}}}if(A){q.scrollTo("bottom");y.find("img").one("load",function(){q.scrollTo("bottom")})}};var m=function(y){var x=y.goto_current;f.get(f.url_for("conversations"),function(z){f("ul.conversations").replaceWith(z);f("div.conversations.container ul").html("");if(x){f("ul.conversations li:first a").click()}j=f("ul.conversations a").map(function(){return f(this).text()}).get();b()})};var w=function(z){var x=f("div.notifications.container");var y=f("a.notifications.toggler");var A;f.get(f.url_for("notifications"),function(B){x.html(B);A=parseInt(x.children("ul").data("notifications"),10);y.children("b").text(A);if(x.find("li").length){y.removeClass("hidden")}y[A?"addClass":"removeClass"]("alert")})};f(document).ready(function(){if(f("div.messages").length===0){return}g=f("div.goto-bottom a");a=f('footer form input[name="message"]');q=f(window);j=f("ul.conversations a").map(function(){return f(this).text()}).get();o();d();t();r();f("nav a.notifications.toggler").on("activate",function(){f.post(f.url_for("notifications/clear"));f(this).removeClass("alert").children("b").text(0)});f("nav a.toggler").initDropDown();f("nav, div.container, div.goto-bottom").fastButton();f("nav a.settings").click(function(x){location.href=this.href});f("footer a.help").click(function(x){a.send("/help",0);return false});g.click(function(x){x.preventDefault();q.scrollTo("bottom")});q.on("scroll",v).on("resize",e)});f(window).load(function(){if(f("div.messages").length===0){return}n();s()})})(jQuery);