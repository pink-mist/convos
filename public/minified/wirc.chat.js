(function(f){var g,a,p;var h=f('<li class="notice"><div class="question">Do you want notifications? <a href="#!yes" class="button yes">Yes</a> <a href="#!no" class="button confirm no">No</a></div></li>');var c=f("<div/>");var i=new sortedSet();var j=[];var l=["/help","/join #","/query ","/msg ","/me ","/nick ","/close","/part ","/names ","/topic ","/reconnect","/whois "];i.add=function(w,x){if(x!==c.data("nick")){this.set[x]=w}this.length++;return this};f.fn.appendToMessages=function(){var z=c.children("li:last");var B=z.data("sender")||"";if(this.hasClass("message")&&z.hasClass("message")){if(B==this.data("sender")){this.addClass("same-nick").children("h3, .avatar, .timestamp").remove()}}else{if(this.hasClass("nick-change")){var A,x,y=this.find(".old").text(),w=this.find(".nick").text();i.rem(y).add(w);if(y==c.data("nick")){A=new RegExp("\\b"+y+"\\b","i");x=a.attr("placeholder").replace(A,w);a.attr("placeholder",x).attr("title",x);c.data("nick",w)}}else{if(this.hasClass("nick-joined")){i.add(0,this.find(".nick").text());t(f("<div/>"))}else{if(this.hasClass("nick-parted")){i.rem(0,this.find(".nick").text());t(f("<div/>"))}else{if(this.hasClass("nicks")){t(this);return}else{if(this.data("sender")){i.add(new Date().getTime(),this.data("sender"))}}}}}}c.append(this.fadeIn("fast"))};f.fn.cidAndTarget=function(w){if(w){return this.attr("data-cid",w.data("cid")).attr("data-target",w.data("target")).data("cid",w.data("cid")).data("target",w.data("target"))}else{return{cid:this.data("cid"),cid:this.data("target")}}};var r=function(){c=f("div.messages ul");c.start_time=parseFloat(c.data("start-time")||0);f("body").loadingIndicator("hide");f("div.nicks-container ul").html("");i.clear();if(c.data("target").indexOf("#")===0){a.send("/names",0).send("/topic",0);f(".without-nick-list").addClass("with-nick-list").removeClass("without-nick-list")}else{f(".with-nick-list").addClass("without-nick-list").removeClass("with-nick-list")}if(location.href.indexOf("from=")>0){c.end_time=parseFloat(c.data("end-time")||0);p.scrollTo(0);u();v()}else{a.focusSoon();p.data("at_bottom",true)}if(!Object.equals(a.cidAndTarget(),c.cidAndTarget())){m({})}a.cidAndTarget(c);e()};var b=function(y){var w=f("ul.conversations li, div.conversations-container li");var B=f("div.conversations-container ul");var z=f("nav ul.conversations");var D=f("nav").width()-f("nav .right").outerWidth()-f("nav a.settings").outerWidth();var C=0,x,A;if(y){A=w.find('a[href="'+f.url_for(y.data("cid"),y.data("target"))+'"]');x=parseInt(A.attr("data-unread"))+1;A.attr("data-unread",x).addClass("unread").attr("title",x+" unread messages in "+y.data("target"))}w.each(function(){var E=f(this);if(!E.parent("ul").is(".conversations")){z.append(E)}C+=E.find("a").outerWidth();if(C<D){return}B.prepend(E)});if(C>=D){f("nav a.conversations-toggler").show()}else{f("nav a.conversations-toggler").trigger("deactivate").hide()}};var e=function(){b();f("a[data-toggle]").filter(".active").trigger("activate");if(p.width()>700){f("a.nicks-toggler").trigger("deactivate");f("div.nicks-container").css({left:"",height:"",display:"block"})}else{if(f("a.nicks-toggler").is(".active")){f("div.nicks-container").css({display:"block"})}else{f("div.nicks-container").css({display:"none"})}}if(p.data("at_bottom")){p.scrollTo("bottom")}};var u=function(){var x=f(document).data("height_from");g[p.scrollTop()+p.height()<x.height()-200?"show":"hide"]();if(c.start_time&&p.scrollTop()==0){var w=c.end_time;f.get(location.href.replace(/\?.*/,""),{to:c.start_time},function(B){var z=f(B);var C=z.children("li:lt(-1)");var A=x.height();c.end_time=w;if(!C.length){return}c.start_time=parseFloat(z.data("start-time"));c.prepend(C);p.scrollTop(x.height()-A)});c.start_time=c.end_time=0}else{if(c.end_time&&p.data("at_bottom")){var y=c.start_time;f.get(location.href.replace(/\?.*/,""),{from:c.end_time},function(A){var z=f(A);var B=z.children("li:gt(0)");c.start_time=y;if(!B.length){return}c.end_time=parseFloat(z.data("end-time"));B.each(function(){f(this).appendToMessages()})});c.start_time=c.end_time=0}}};var q=function(){var y="";var w,A,z,x;f.get(f.url_for(["command-history"]),function(B){a.history=B;a.history_i=a.history.length});a.bind("keydown",function(B){if(B.keyCode!==9){w=false}});a.bind("keydown","tab",function(B){A=a.val();z=A.lastIndexOf(" ")+1;w=w||{i:0,prefix:A.substr(0,z),list:f.map(f.grep(i.revrange(0,-1).concat(j).concat(l).unique(),function(C,D){x=x||new RegExp("^"+RegExp.escape(A.substr(z)),"i");return z&&C.indexOf("/")===0?false:x.test(C)?true:false}),function(C,D){return z?C+" ":C.indexOf("/")===0?C:C+": "}).concat(A.substr(z))};a.val(w.prefix+w.list[w.i++]);if(w.i==w.list.length){w.i=0}return false});a.bind("keydown","up",function(B){B.preventDefault();if(a.history_i==0){return}if(a.history_i==a.history.length){y=a.val()}a.val(a.history[--a.history_i])});a.bind("keydown","down",function(B){B.preventDefault();if(++a.history_i==a.history.length){return a.val(y)}if(a.history_i>a.history.length){return a.history_i=a.history.length}a.val(a.history[a.history_i])});a.closest("form").submit(function(B){B.preventDefault();a.send(a.val(),1).val("")})};var n=function(){if(Notification.permission==="granted"){return}if(Notification.permission==="unsupported"){return}if(Notification.permission==="denied"){return}h.appendToMessages();h.find("a.yes").click(function(){Notification.requestPermission();f(this).closest("li").fadeOut()});h.find("a.no").click(function(){f(this).closest("li").fadeOut()})};var s=function(){f(document).on("pjax:timeout",function(w){w.preventDefault()});f(document).pjax("nav a.conversation","div.messages");f(document).pjax("div.conversations-container a","div.messages");f(document).pjax("div.notifications-container a","div.messages");f(document).pjax("div.nicks-container a","div.messages");f("div.messages").on("pjax:end",r);f("div.messages").on("pjax:start",function(x,w){f("body").loadingIndicator("show")})};var d=function(){a.history=[];a.history_i=0;a.socket=window.ws(a.closest("form").data("socket-url"));a.socket.onmessage=k;a.send=function(w,x){if(w.length==0){return a}a.socket.send(f("<div/>").cidAndTarget(c).attr("data-history",x).text(w).prop("outerHTML"));a.addClass("sending");if(x){a.history.push(w)}a.history_i=a.history.length;return a};setInterval(function(){a.socket.send("K")},30*1000)};var o=function(){f("body").bind("keydown","esc",function(x){x.preventDefault();var w=f("a[data-toggle]").filter(".active");if(!w.length){return true}w.trigger("deactivate").focus()});f("body, input").bind("keydown","shift+return",function(w){w.preventDefault();f("a[data-toggle]").trigger("deactivate");if(document.activeElement==a.get(0)){f("nav ul.conversations a").slice(0,2).eq(-1).focus()}else{a.focus()}});f("div.conversations-container, div.notifications-container").bind("keydown","up",function(w){f(document.activeElement).closest("li").prev().find("a").focus();return false}).bind("keydown","down",function(w){f(document.activeElement).closest("li").next().find("a").focus();return false})};var t=function(x){var w=x.find("[data-nick]");var z=c.data("cid");var y={};if(w.length){c.find("li[data-sender]").each(function(A){y[f(this).data("sender")]=A});w.each(function(){var A=f(this);var B=A.data("nick");i.add(y[B]||1,B)})}if(i.length){f("div.nicks-container ul").html(f.map(i.revrange(0,-1).sortCaseInsensitive(),function(B,A){return'<li><a href="'+f.url_for(z,B)+'">'+B+"</a></li>"}).join(""));f("div.nicks-container").nanoScroller()}};var k=function(B){var x=f(B.data);var z=p.data("at_bottom");var w;a.removeClass("sending");if(x.data("target")==="any"){x.data("target",c.data("target")).data("cid",c.data("cid"))}w=Object.equals(x.cidAndTarget(),c.cidAndTarget());if(x.hasClass("highlight")){var y=x.data("sender");var A=x.data("target").indexOf("#")===0?"mentioned you in "+x.data("target"):"sent you a message";f.notify([y,A].join(" "),x.find(".content").text(),x.find("img").attr("src"));if(!w){v()}}if(x.hasClass("remove-conversation")){m({goto_current:w})}else{if(x.hasClass("add-conversation")){m({goto_current:true})}else{if(w){x.appendToMessages()}else{b(x)}}}if(z){p.scrollTo("bottom");x.find("img").one("load",function(){p.scrollTo("bottom")})}};var m=function(x){var w=x.goto_current;f.get(f.url_for("conversations"),function(y){f("ul.conversations").replaceWith(y);f("div.conversations-container ul").html("");if(w){f("ul.conversations li:first a").click()}j=f("ul.conversations a").map(function(){return f(this).text()}).get();b()})};var v=function(y){var w=f("div.notifications-container");var x=f("a.notifications-toggler");var z;f.get(f.url_for("notifications"),function(A){w.html(A);z=parseInt(w.children("ul").data("notifications"),10);x.children("b").text(z);if(w.find("li").length){x.removeClass("hidden")}x[z?"addClass":"removeClass"]("alert")})};f(document).ready(function(){if(f("div.messages").length===0){return}g=f("div.goto-bottom a");a=f('footer form input[name="message"]');p=f(window);j=f("ul.conversations a").map(function(){return f(this).text()}).get();o();d();s();q();f("nav a.notifications-toggler").on("activate",function(){f.post(f.url_for("notifications/clear"));f(this).removeClass("alert").children("b").text(0)});f("div.messages").on("mousedown touchstart",".message h3 a",function(w){this.href="#!"+this.href;a.val(f(this).text()+": ").focusSoon()});f("div.messages").on("mousedown touchstart",".close",function(w){f(this).closest("li").remove()});f("nav a").filter(".conversations-toggler, .notifications-toggler, .nicks-toggler").initDropDown();f("nav, div.conversations-container, div.notifications-container, div.goto-bottom").fastButton();f("nav a.help").click(function(w){a.send("/help",0);return false});f("nav a.settings").click(function(w){location.href=this.href});f("div.messages").on("click",".message h3 a",function(w){a.val(f(this).text()+": ").focusSoon();p.scrollTo("bottom")});g.click(function(w){w.preventDefault();p.scrollTo("bottom")});p.on("scroll",u).on("resize",e)});f(window).load(function(){if(f("div.messages").length===0){return}n();r()})})(jQuery);