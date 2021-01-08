var i=0;
function tempo(){
		var data = new Date();
		var dia     = data.getDate();           // 1-31
		var dia_sem = data.getDay();            // 0-6 (zero=domingo)
		var mes     = data.getMonth();          // 0-11 (zero=janeiro)
		var ano2    = data.getYear();           // 2 dígitos
		var ano4    = data.getFullYear();       // 4 dígitos
		var hora    = data.getHours();          // 0-23
		var min     = data.getMinutes();        // 0-59
		var seg     = data.getSeconds();        // 0-59
		var mseg    = data.getMilliseconds();   // 0-999
		var tz      = data.getTimezoneOffset(); // em minutos
}
	
function mes(){
	var data = new Date();
	var mes = data.getMonth();
	var strMes;
	if(data == 1){
		strMes = "jan";
	}
	else if(data == 2){
		strMes = "fev";
	}
	else if(data == 3){
		strMes = "mar";
	}
	else if(data == 4){
		strMes = "abr";
	}
	else if(data == 5){
		strMes = "mai";
	}
	else if(data == 6){
		strMes = "jun";
	}
	else if(data == 7){
		strMes = "jul";
	}
	else if(data == 8){
		strMes = "ago";
	}
	else if(data == 9){
		strMes = "set";
	}
	else if(data == 10){
		strMes = "out";
	}
	else if(data == 11){
		strMes = "nov";
	}
	else{
		strMes = "dez";
	}
	return strMes;
}

function trim(str) {
	return str.replace(/^\s+|\s+$/g,"");
}

function song(){
	var obj = document.createElement("audio");
	//obj.src="http://rmlocareceptivos.localhoost.com/MSN.mp3";
	obj.src = "https://assets.kayako.com/messenger/send.mp3";
	obj.autoPlay=false;
	obj.preLoad=true;       
	obj.play();
}

function notify(cliente,assunto,mensagem,value) {
	var str;
	song();
	Notification.requestPermission(function() {
		str = "Cliente: "+cliente+"\nAssunto: "+assunto+"\nMensagem: "+mensagem;
		var notification = new Notification("Chat", {
			icon: 'https://pbs.twimg.com/profile_images/750249380515553280/4DETfHJf_400x400.jpg',
			body: str
		});
		notification.onclick = function() {
			notification.close();
			window.focus();
			$("span").each(function(){
				if($(this).attr("value") == "true_"+value){
					$(this).click();
				}
			});
		}
	});
} 

function alerta(){
	$(".ko-cases-list_column_conversation__ago_dioq2i").css("color","black");
	$("div").each(function(){
		if($(this).text() == "Respondido"){
			$(this).parent().parent().parent().parent().parent().css({
				"background-color":"#4a98e0",
				"color":"white"
			});
		}
		if($(this).text() == "Aguardando Resposta"){
			$(this).parent().parent().parent().parent().parent().css({
				"background-color":"#fe3f32",
				"color":"white"
			});
		}
		if($(this).text() == "Em Análise"){
			$(this).parent().parent().parent().parent().parent().css({
				"background-color":"#ffff05",
				"color":"black"
			});
		}
		if($(this).text() == "Aguardando Correção"){
			$(this).parent().parent().parent().parent().parent().css({
				"background-color":"#4d394b",
				"color":"white"
			});
		}
		if($(this).text() == "Fechado"){
			$(this).parent().parent().parent().parent().parent().css({
				"background-color":"#616469",
				"color":"white"
			});
		}
		if($(this).text() == "Aberto"){
			$(this).parent().parent().parent().parent().parent().css({
				"background-color":"#837616",
				"color":"white"
			});
		}
	});
}


function notificacao(){
	$("span").each(function(){
		if($(this).text() == "1m"){
			if($(this).attr("id") != '1'){
				var cliente = $(this).parent().parent().find("div").html();
				var assunto = $(this).parent().parent().next().find("span").first().text();
				var mensagem = $(this).parent().parent().next().find("span").last().text();
				if(assunto == " "){
					 assunto = $(this).parent().parent().next().find("span").first().next().text();
				}
				assunto = trim(assunto);
				mensagem = trim(mensagem);
				cliente = trim(cliente);
				i++;
				$(this).attr("value","true_"+i);
				notify(cliente,assunto,mensagem,i);
			}
			$(this).attr("id",'1');
		}
		else{
			$(this).removeAttr("id");
		}
	});
}


$(document).ready(function() {	
	setInterval(function(){
		alerta();
		notificacao();
		if($("#notificacao").prop("checked") == true){
			//alert($("#notificacao").prop("checked"));
			//notificacao();
			notify("Ramon","teste","teste",1);
		}
		
	},1000);
});

