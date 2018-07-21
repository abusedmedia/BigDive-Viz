"use strict";!function(){var t={AF:"Afghanistan",AX:"Aland Islands",AL:"Albania",DZ:"Algeria",AS:"American Samoa",AD:"Andorra",AO:"Angola",AI:"Anguilla",AQ:"Antarctica",AG:"Antigua And Barbuda",AR:"Argentina",AM:"Armenia",AW:"Aruba",AU:"Australia",AT:"Austria",AZ:"Azerbaijan",BS:"Bahamas",BH:"Bahrain",BD:"Bangladesh",BB:"Barbados",BY:"Belarus",BE:"Belgium",BZ:"Belize",BJ:"Benin",BM:"Bermuda",BT:"Bhutan",BO:"Bolivia",BA:"Bosnia And Herzegovina",BW:"Botswana",BV:"Bouvet Island",BR:"Brazil",IO:"British Indian Ocean Territory",BN:"Brunei Darussalam",BG:"Bulgaria",BF:"Burkina Faso",BI:"Burundi",KH:"Cambodia",CM:"Cameroon",CA:"Canada",CV:"Cape Verde",KY:"Cayman Islands",CF:"Central African Republic",TD:"Chad",CL:"Chile",CN:"China",CX:"Christmas Island",CC:"Cocos (Keeling) Islands",CO:"Colombia",KM:"Comoros",CG:"Congo",CD:"Congo, Democratic Republic",CK:"Cook Islands",CR:"Costa Rica",CI:"Cote D'Ivoire",HR:"Croatia",CU:"Cuba",CY:"Cyprus",CZ:"Czech Republic",DK:"Denmark",DJ:"Djibouti",DM:"Dominica",DO:"Dominican Republic",EC:"Ecuador",EG:"Egypt",SV:"El Salvador",GQ:"Equatorial Guinea",ER:"Eritrea",EE:"Estonia",ET:"Ethiopia",FK:"Falkland Islands (Malvinas)",FO:"Faroe Islands",FJ:"Fiji",FI:"Finland",FR:"France",GF:"French Guiana",PF:"French Polynesia",TF:"French Southern Territories",GA:"Gabon",GM:"Gambia",GE:"Georgia",DE:"Germany",GH:"Ghana",GI:"Gibraltar",GR:"Greece",GL:"Greenland",GD:"Grenada",GP:"Guadeloupe",GU:"Guam",GT:"Guatemala",GG:"Guernsey",GN:"Guinea",GW:"Guinea-Bissau",GY:"Guyana",HT:"Haiti",HM:"Heard Island & Mcdonald Islands",VA:"Holy See (Vatican City State)",HN:"Honduras",HK:"Hong Kong",HU:"Hungary",IS:"Iceland",IN:"India",ID:"Indonesia",IR:"Iran, Islamic Republic Of",IQ:"Iraq",IE:"Ireland",IM:"Isle Of Man",IL:"Israel",IT:"Italy",JM:"Jamaica",JP:"Japan",JE:"Jersey",JO:"Jordan",KZ:"Kazakhstan",KE:"Kenya",KI:"Kiribati",KR:"Korea",KW:"Kuwait",KG:"Kyrgyzstan",LA:"Lao People's Democratic Republic",LV:"Latvia",LB:"Lebanon",LS:"Lesotho",LR:"Liberia",LY:"Libyan Arab Jamahiriya",LI:"Liechtenstein",LT:"Lithuania",LU:"Luxembourg",MO:"Macao",MK:"Macedonia",MG:"Madagascar",MW:"Malawi",MY:"Malaysia",MV:"Maldives",ML:"Mali",MT:"Malta",MH:"Marshall Islands",MQ:"Martinique",MR:"Mauritania",MU:"Mauritius",YT:"Mayotte",MX:"Mexico",FM:"Micronesia, Federated States Of",MD:"Moldova",MC:"Monaco",MN:"Mongolia",ME:"Montenegro",MS:"Montserrat",MA:"Morocco",MZ:"Mozambique",MM:"Myanmar",NA:"Namibia",NR:"Nauru",NP:"Nepal",NL:"Netherlands",AN:"Netherlands Antilles",NC:"New Caledonia",NZ:"New Zealand",NI:"Nicaragua",NE:"Niger",NG:"Nigeria",NU:"Niue",NF:"Norfolk Island",MP:"Northern Mariana Islands",NO:"Norway",OM:"Oman",PK:"Pakistan",PW:"Palau",PS:"Palestinian Territory, Occupied",PA:"Panama",PG:"Papua New Guinea",PY:"Paraguay",PE:"Peru",PH:"Philippines",PN:"Pitcairn",PL:"Poland",PT:"Portugal",PR:"Puerto Rico",QA:"Qatar",RE:"Reunion",RO:"Romania",RU:"Russian Federation",RW:"Rwanda",BL:"Saint Barthelemy",SH:"Saint Helena",KN:"Saint Kitts And Nevis",LC:"Saint Lucia",MF:"Saint Martin",PM:"Saint Pierre And Miquelon",VC:"Saint Vincent And Grenadines",WS:"Samoa",SM:"San Marino",ST:"Sao Tome And Principe",SA:"Saudi Arabia",SN:"Senegal",RS:"Serbia",SC:"Seychelles",SL:"Sierra Leone",SG:"Singapore",SK:"Slovakia",SI:"Slovenia",SB:"Solomon Islands",SO:"Somalia",ZA:"South Africa",GS:"South Georgia And Sandwich Isl.",ES:"Spain",LK:"Sri Lanka",SD:"Sudan",SR:"Suriname",SJ:"Svalbard And Jan Mayen",SZ:"Swaziland",SE:"Sweden",CH:"Switzerland",SY:"Syrian Arab Republic",TW:"Taiwan",TJ:"Tajikistan",TZ:"Tanzania",TH:"Thailand",TL:"Timor-Leste",TG:"Togo",TK:"Tokelau",TO:"Tonga",TT:"Trinidad And Tobago",TN:"Tunisia",TR:"Turkey",TM:"Turkmenistan",TC:"Turks And Caicos Islands",TV:"Tuvalu",UG:"Uganda",UA:"Ukraine",AE:"United Arab Emirates",GB:"United Kingdom",US:"United States",UM:"United States Outlying Islands",UY:"Uruguay",UZ:"Uzbekistan",VU:"Vanuatu",VE:"Venezuela",VN:"Viet Nam",VG:"Virgin Islands, British",VI:"Virgin Islands, U.S.",WF:"Wallis And Futuna",EH:"Western Sahara",YE:"Yemen",ZM:"Zambia",ZW:"Zimbabwe"};window.getCountryName=function(e){var n=e.toUpperCase();return t.hasOwnProperty(n)?t[n]:e}}(),function(e,n){window.APP={};var t=["#DFC5B4","#C8AB95","#668597","#416783","#819593","#767570","#C54443","#A73835","#9B4321","#4F332B","#754F3C","#F1A353","#F28C53","#F7C195","#F6B692"];window.APP.countryPalette=e.shuffle(t),window.APP.genderPalette={M:"#46BDB7",F:"#F3675D"},window.APP.vsPalette=["IndianRed","steelblue"],window.APP.editionPalette=e.shuffle(t),window.APP.faces=["1f61f","1f62a","1f62b","1f62c","1f62d","1f62e","1f62f","1f63a","1f63b","1f63c","1f63d","1f63e","1f63f","1f617","1f618","1f619","1f620","1f621","1f622","1f623","1f624","1f625","1f626","1f627","1f628","1f629","1f630","1f631","1f632","1f633","1f634","1f635","1f636","1f637","1f638","1f639","1f640"],n(document).ready(function(){e.csv("assets/BigDive - divers.csv?v="+window.build).then(function(e){console.log(e),e.forEach(function(e){return e.num=10*Math.random()+20}),e.forEach(function(e){return e.id=slugify(e.first_name+" "+e.last_name).toLowerCase()});APP.all_divers(e);APP.edition_labels(e),APP.by_divers(e),APP.by_countries(e),APP.by_vs_country(e),APP.by_gender(e),APP.by_age(e)})})}(window.d3,window.jQuery),function(x){window.APP.all_divers=function(s){var c,d,f=550,g=300,y=x.nest().key(function(e){return e.country}).entries(s),h=x.nest().key(function(e){return e.gender}).entries(s),p=x.nest().key(function(e){return e.edition}).entries(s),v=x.select("#all_divers svg").attr("viewBox","0 0 "+f+" "+g),m=v.append("g");v.selectAll("#breads rect").attr("opacity",.2);var A,w=x.pack().size([f,275]).padding(3),P=["intro","diver","country","gender","age"],M=0;function e(){var t=P[M],e=x.hierarchy({root:"r",children:s}).sort(function(e,n){return x.ascending(e.data[t],n.data[t])}).sum(function(e){return e.num}),n=w(e);switch(t){case"intro":b("Explore BigDive through the participants");break;case"diver":b("There are "+s.length+" divers over "+p.length+" editions");break;case"country":b("From "+y.length+" different countries");break;case"gender":var a=100*h[1].values.length/s.length;b(parseInt(a)+"% are ladies");break;case"age":b("Age range: "+(i=x.min(s,function(e){return""!==e.age?+e.age:100}))+" - "+(l=x.max(s,function(e){return+e.age})));break;case"edition":b("edition")}var r=(c=m.selectAll(".elements").data(n.children,function(e){return e.data.id})).enter().append("g").classed("elements",!0).attr("transform","translate("+f/2+", "+g/2+")");r.append("circle").attr("r",function(e){return e.r}).classed("intro",!0).attr("display","none").style("fill","#768797"),r.append("image").classed("diver",!0).attr("xlink:href",function(e){var n=parseInt(Math.random()*APP.faces.length);return"assets/faces/"+APP.faces[n]+".png"}).attr("width",function(e){return 2*e.r}).attr("height",function(e){return 2*e.r}).attr("x",function(e){return-e.r}).attr("y",function(e){return-e.r}).attr("display","none"),r.append("image").classed("country",!0).attr("xlink:href",function(e){return"assets/flag/svg/"+getCountryName(e.data.country).toLowerCase().replace(/ /g,"-")+".svg"}).attr("width",function(e){return 2*e.r}).attr("height",function(e){return 2*e.r}).attr("x",function(e){return-e.r}).attr("y",function(e){return-e.r}).attr("display","none"),r.append("circle").attr("r",function(e){return e.r}).classed("gender",!0).style("fill",function(e){return window.APP.genderPalette[e.data.gender]}).attr("display","none");var i=x.min(s,function(e){return""!==e.age?+e.age:100}),l=x.max(s,function(e){return+e.age}),o=x.scaleLinear().domain([i,l]).range(["#D80F0C","#000"]);if(r.append("circle").attr("r",function(e){return e.r}).classed("age",!0).style("fill",function(e,n){return o(e.data.age)}).attr("display","none"),c.merge(r).attr("transform",function(e){return"translate("+e.x+", "+e.y+")"}),A){c.merge(r).selectAll("."+A).attr("display","none");var u=P.indexOf(A);v.selectAll("#breads rect:nth-child("+(u+1)+")").transition().attr("opacity",.2)}A=t,v.selectAll("#breads rect:nth-child("+(M+1)+")").transition().attr("opacity",1),c.merge(r).selectAll("."+t).attr("transform","scale(.01)").attr("display","block").transition().delay(function(e,n){return 500*Math.random()}).duration(750).ease(x.easeExpInOut).attr("transform","scale(1)"),c.on("mouseenter",function(e){var n=e.data.first_name+" "+e.data.last_name;"country"===t&&(n=getCountryName(e.data.country)),"age"===t&&(n=e.data.age),d.select("text").text(n),d.attr("transform","translate("+e.x+", "+(e.y-35)+")").attr("opacity",1)}).on("mouseleave",function(e){d.attr("opacity",0)})}function b(e){TweenMax.to("#subtitle",1,{scrambleText:{text:e,chars:"1234567890",speed:.5},delay:.75,ease:Linear.easeNone})}return e(),(d=v.append("g").attr("id","tooltip").attr("opacity",0)).append("rect").attr("width",100).attr("height",20).attr("x",-50).attr("y",0).style("fill","black"),d.append("polygon").attr("points","0 0 14 0 7 6").style("fill","black").attr("transform","translate(-7, 19)"),d.append("text").style("fill","white").style("text-anchor","middle").style("font-size","10").attr("y",14).text("Fabio Franchino"),v.select("#right").on("click",function(){++M>=P.length&&(M=0),e()}),v.select("#left").on("click",function(){--M<0&&(M=P.length-1),e()}),this.select=function(a){c.each(function(e,n){var t="#fff";e.data.country===a&&(t="black"),x.select(this).style("fill",t)})},this.deselect=function(){c.style("fill",null)},this}}(window.d3),function(t){window.APP.edition_labels=function(e){var n=t.nest().key(function(e){return e.edition}).sortKeys(t.ascending).entries(e);t.select("#edition_labels").selectAll("div").data(n).enter().append("div").append("p").text(function(e){return"BigDive #"+e.key})}}(window.d3),function(o){window.APP.by_divers=function(e){var n=o.nest().key(function(e){return e.edition}).sortKeys(o.ascending).entries(e),t=500/n.length,a=o.max(n,function(e){return e.values.length}),r=o.scaleLinear().domain([0,a]).range([0,76]),i=t-48,l=o.select("#by_divers").attr("viewBox","0 0 500 100").append("g").selectAll("g").data(n).enter().append("g").attr("transform",function(e,n){return"translate("+t*n+",0)"});l.filter(function(e,n){return 0<n}).append("line").attr("y1",0).attr("y2",100).style("stroke","#fff"),l.append("rect").attr("width",i-1).attr("height",function(e){return r(e.values.length)}).attr("x",24).attr("y",function(e){return 100-r(e.values.length)}).style("fill","#768797"),l.append("text").text(function(e){return e.values.length}).attr("y",function(e){return 100-r(e.values.length)+12}).attr("x",25).style("font-size",12).style("fill","#fff")}}(window.d3),function(c){window.APP.by_countries=function(e){var n=c.nest().key(function(e){return e.edition}).sortKeys(c.ascending).key(function(e){return e.country}).entries(e);n.forEach(function(e){e.values.sort(function(e,n){return c.descending(e.values.length,n.values.length)})}),console.log(n);var t=500/n.length,a=c.max(n,function(e){return c.max(e.values,function(e){return e.values.length})}),r=c.scaleLinear().domain([0,a]).range([0,68]),i=c.max(n,function(e){return e.values.length}),l=(t-16)/i,o=c.select("#by_countries").attr("viewBox","0 0 500 100").append("g").selectAll("g").data(n).enter().append("g").attr("transform",function(e,n){return"translate("+t*n+",0)"});o.filter(function(e,n){return 0<n}).append("line").attr("y1",0).attr("y2",100).style("stroke","#fff");var u=o.append("g").attr("transform",function(e){return"translate("+(i-e.values.length)*l/2+",0)"}),s=u.selectAll("rect").data(function(e){return e.values}).enter().append("rect").attr("width",l-1).attr("height",function(e){return r(e.values.length)}).attr("x",function(e,n){return 8+n*l}).attr("y",function(e){return 100-r(e.values.length)-8-2}).style("fill","#768797");u.selectAll("image").data(function(e){return e.values}).enter().append("image").attr("xlink:href",function(e){return"assets/flags/1x1/"+e.key.toLowerCase()+".svg"}).attr("x",function(e,n){return 8+n*l}).attr("width",l-1).attr("height",l-1).attr("y",function(e){return 100-l}),u.selectAll("text").data(function(e){return e.values}).enter().append("text").text(function(e){return e.values.length}).attr("y",function(e){return 100-r(e.values.length)-8-4}).attr("x",function(e,n){return 8+n*l}).style("font-size",7).style("fill","#000"),s.on("mouseenter",function(n){s.style("fill","#fff"),s.each(function(e){e.key===n.key&&c.select(this).style("fill","#D80F0C")})}),s.on("mouseleave",function(){s.style("fill","#768797")})}}(window.d3),function(c){window.APP.by_vs_country=function(e){var n=c.nest().key(function(e){return e.edition}).sortKeys(c.ascending).rollup(function(e){return[c.sum(e,function(e){return"IT"===e.country?1:0}),c.sum(e,function(e){return"IT"!==e.country?1:0})]}).entries(e);console.log(n);var t=500/n.length,a=c.max(n,function(e){return c.max(e.value,function(e){return e})}),r=c.scaleLinear().domain([0,a]).range([0,76]),i=c.max(n,function(e){return e.value.length}),l=(t-48)/i,o=c.select("#by_vs_country").attr("viewBox","0 0 500 100"),u=c.scaleOrdinal(c.schemeCategory10),s=o.append("g").selectAll("g").data(n).enter().append("g").attr("transform",function(e,n){return"translate("+t*n+",0)"});s.filter(function(e,n){return 0<n}).append("line").attr("y1",0).attr("y2",100).style("stroke","#fff"),s.selectAll("rect").data(function(e){return e.value}).enter().append("rect").attr("width",l-1).attr("height",function(e){return r(e)}).attr("x",function(e,n){return 24+n*l}).attr("y",function(e){return 100-r(e)}).style("fill",function(e,n){return u(n)}),s.selectAll("text").data(function(e){return e.value}).enter().append("text").text(function(e){return e}).attr("y",function(e){return 100-r(e)-2}).attr("x",function(e,n){return 24+n*l+1}).style("font-size",7).style("fill","#000")}}(window.d3),function(u){window.APP.by_gender=function(e){var n=u.nest().key(function(e){return e.edition}).sortKeys(u.ascending).key(function(e){return e.gender}).entries(e);n.forEach(function(e){e.values.sort(function(e,n){return u.descending(e.values.length,n.values.length)})});var t=500/n.length,a=u.max(n,function(e){return u.max(e.values,function(e){return e.values.length})}),r=u.scaleLinear().domain([0,a]).range([0,76]),i=u.max(n,function(e){return e.values.length}),l=(t-48)/i,o=u.select("#by_gender").attr("viewBox","0 0 500 100").append("g").selectAll("g").data(n).enter().append("g").attr("transform",function(e,n){return"translate("+t*n+",0)"});o.filter(function(e,n){return 0<n}).append("line").attr("y1",0).attr("y2",100).style("stroke","#fff"),o.selectAll("rect").data(function(e){return e.values}).enter().append("rect").attr("width",l-1).attr("height",function(e){return r(e.values.length)}).attr("x",function(e,n){return 24+n*l}).attr("y",function(e){return 100-r(e.values.length)}).style("fill",function(e){return window.APP.genderPalette[e.key]}),o.selectAll("text").data(function(e){return e.values}).enter().append("text").text(function(e){return e.values.length}).attr("y",function(e){return 100-r(e.values.length)-2}).attr("x",function(e,n){return 24+n*l+1}).style("font-size",7).style("fill","#000")}}(window.d3),function(s){window.APP.by_age=function(e){var n=s.nest().key(function(e){return e.edition}).sortKeys(s.ascending).key(function(e){return e.age}).sortKeys(s.ascending).entries(e);n.forEach(function(t){t.values.forEach(function(e,n){""===e.key&&t.values.splice(n,1)})}),n.forEach(function(e){var a=null,r=[];e.values.forEach(function(e,n){if(a){var t=+e.key-a-1;if(0<t)for(n=0;n<t;++n)r.push({key:a+n+1+"",values:[]})}a=+e.key}),e.values=e.values.concat(r),e.values.sort(function(e,n){return s.ascending(e.key,n.key)})}),console.log(n);var t=s.min(n,function(e){return s.min(e.values,function(e){return+e.key})})-2,a=s.max(n,function(e){return s.max(e.values,function(e){return+e.key})})+2;console.log(t,a);var r=500/n.length,i=s.max(n,function(e){return s.max(e.values,function(e){return e.values.length})}),l=(s.scaleLinear().domain([0,i]).range([0,76]),s.max(n,function(e){return e.values.length}),s.select("#by_age").attr("viewBox","0 0 500 100").append("g").selectAll("g").data(n).enter().append("g").attr("transform",function(e,n){return"translate("+r*n+",0)"}));l.filter(function(e,n){return 0<n}).append("line").attr("y1",0).attr("y2",100).style("stroke","#fff");var o=s.scaleLinear().domain([0,i]).range([0,85]),u=s.scaleLinear().domain([t,a]).range([10,r-10]);l.append("path").attr("d",function(e){var n=s.min(e.values,function(e){return+e.key}),t=s.max(e.values,function(e){return+e.key});return console.log(n,t),s.area().x(function(e){return u(+e.key)}).y1(function(e){return 85-o(e.values.length)}).y0(85).curve(s.curveBasis)(e.values)}).style("stroke","none").style("fill","#768797"),l.append("g").attr("transform","translate(0,87)").classed("ax",!0).each(function(e){s.min(e.values,function(e){return+e.key}),s.max(e.values,function(e){return+e.key});var n=s.axisBottom(u).tickValues([t,a]);s.select(this).call(n)})}}(window.d3),function(l){window.APP.all_countries=function(e){var n=l.nest().key(function(e){return e.country}).sortKeys(l.ascending).entries(e);n.sort(function(e,n){return l.descending(e.values.length,n.values.length)}),console.log(n);var t=10*n.length+10,a=(l.scaleOrdinal(l.schemeSet3),l.select("#all_countries").attr("viewBox","0 0 500 "+t).append("g").selectAll("g").data(n).enter().append("g").attr("transform",function(e,n){return"translate(0,"+10*n+")"})),r=l.max(n,function(e){return e.values.length}),i=l.scaleLinear().domain([0,r]).range([0,490]);a.append("rect").attr("width",function(e){return i(e.values.length)}).attr("height",9).attr("x",5).attr("y",5)}}(window.d3);