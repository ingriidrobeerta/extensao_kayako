/*function playSong(){
    audio.playSong();
}
*/
$(document).ready(function() {	
	
	/*
	function audioS(){
		$("body").append('<audio id = "audio" ><source src="http://rmlocareceptivos.localhoost.com/MSN.mp3" type="audio/mpeg"> Your browser does not support the audio tag. </audio> <a id = "play" href="#" onclick="play()">Play</a>');
	}
	audioS();
	function reproduzir_audio(){
		audio = document.getElementById('audio');
		audio.playSong();
	}
	$("#play").click(function(){
		reproduzir_audio();
	});
	
	reproduzir_audio();*/
	function tempo(){
		// Obtém a data/hora atual
		var data = new Date();
		// Guarda cada pedaço em uma variável
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

		// Mostra o resultado
	}
	//var nome = "";
	function getMessage(){
		$("span[title]").each(function(){
			var spanText = $(this).html();
			if(spanText === "1m") {
				nome =  $(this).parent().parent().find("> div").html();
				
			}
		});
	}
	
	function trim(str) {
		return str.replace(/^\s+|\s+$/g,"");
	}
	
	function notify(nome) {
		var cliente = "Ramon";
		var email = "r.ranieri@netmake.com.br";
		var msg = "Olá";
		var id = "1";
		var str;

		Notification.requestPermission(function() {
			str = "Você tem um novo chat do cliente: "+nome+"\nE-mail: "+email+"\nMensagem: "+msg;
			var notification = new Notification("Chat", {
				icon: 'https://pbs.twimg.com/profile_images/750249380515553280/4DETfHJf_400x400.jpg',
				body: str
			});
			notification.onclick = function() {
				//window.focus();
				notification.close();
				$("span").each(function(){
					if($(this).text() == "1m"){
						$(this).click();
					}
				});
			}
		});
	} 
	setInterval(function(){
		$("span").each(function(){
			if($(this).text() == "1m"){
				if($(this).attr("id") != '1'){
					var cliente = $(this).parent().parent().find("> div").html();
					cliente = trim(cliente);
					notify(cliente);
				}
				$(this).attr("id",'1');
			}
		});
	},1000);
});
