var i = 0;
var usuario = "Ramon Ranieri";

function trim(str) {
    return str.replace(/^\s+|\s+$/g, "");
}

function song() {
    var obj = document.createElement("audio");
    //obj.src="http://rmlocareceptivos.localhoost.com/MSN.mp3";
    obj.src = "https://assets.kayako.com/messenger/send.mp3";
    obj.autoPlay = false;
    obj.preLoad = true;
    obj.play();
}

function notify(cliente, assunto, mensagem, value) {
    var str;
    song();
    Notification.requestPermission(function () {
        str = "Cliente: " + cliente + "\nAssunto: " + assunto + "\nMensagem: " + mensagem;
        var notification = new Notification("Chat", {
            icon: 'https://pbs.twimg.com/profile_images/750249380515553280/4DETfHJf_400x400.jpg',
            body: str
        });
        notification.onclick = function () {
            notification.close();
            window.focus();
            $("span").each(function () {
                if ($(this).attr("value") == "true_" + value) {
                    $(this).click();
                }
            });
        }
    });
}

function cores(objeto,cor,cor_texto){
    objeto.css({
        "background-color": cor,
        "color": cor_texto
    });
    objeto.next().css({
        "background-color": cor,
        "color": cor_texto
    });
    objeto.next().next().css({
        "background-color": cor,
        "color": cor_texto
    });
    objeto.next().next().next().css({
        "background-color": cor,
        "color": cor_texto
    });
    objeto.next().next().next().next().css({
        "background-color": cor,
        "color": cor_texto
    });
}

function alerta() {
    $(".ko-cases-list_column_conversation__ago_dioq2i").css("color", "black");
    var i = 0;
    $("div").each(function () {
        objeto = $(this).parent().parent().parent().parent();
        if (($(this).text() == "New" && i > 0) && objeto.attr("class") != "ko-tab-strip__tabs_1nzeqt") {
            user = $(this).parent().parent().parent().parent().next().next().next().next().find("div").text();
            user = trim(user);
            if (user != usuario) {
                cores(objeto,"#fe3f32","white");
            }
            else if (user != "") {
                cores(objeto,"#4a98e0","white");
            }
        }
        if($(this).text() == "Need to test"){
            $(this).text("Em teste");
            user = $(this).parent().parent().parent().parent().next().next().next().next().find("div").text();
            user = trim(user);
            if (user != usuario) {
                cores(objeto,"#fe3f32","white");
            }
            else {
                cores(objeto,"#f49c07","white");
            }
        }
        if ($(this).text() == "Em Análise") {
            if(objeto.attr("class") != "session_agent_cases_index__index_1qjm74"){
                cores(objeto,"#e9ec80","black");
            }
        }
        if ($(this).text() == "Aguardando Correção") {
            if(objeto.attr("class") != "session_agent_cases_index__index_1qjm74") {
                cores(objeto,"#4d394b","white");
            }
        }
        if ($(this).text() == "Completed") {
            if(objeto.attr("class") != "session_agent_cases_index__index_1qjm74") {
                cores(objeto,"#36a148","white");
            }
        }
        if ($(this).text() == "Open") {
            user = $(this).parent().parent().parent().parent().next().next().next().next().find("div").text();
            user = trim(user);
            if (user != usuario) {
                cores(objeto,"#fe3f32","white");
            }
            else {
                cores(objeto,"#4a98e0","white");
            }
        }
        i++;
    });
}


function notificacao() {
    $("span").each(function () {
        user = $(this).parent().parent().parent().parent().parent().parent().next().next().next().next().next().find("div").text();
        user = trim(user);
        if ($(this).text() == "1m" && user != usuario) {
            if ($(this).attr("id") != '1') {
                var cliente = $(this).parent().parent().find("div").html();
                var assunto = $(this).parent().parent().next().find("span").first().text();
                var mensagem = $(this).parent().parent().next().find("span").last().text();
                if (assunto == " ") {
                    assunto = $(this).parent().parent().next().find("span").first().next().text();
                }
                assunto = trim(assunto);
                mensagem = trim(mensagem);
                cliente = trim(cliente);
                i++;
                $(this).attr("value", "true_" + i);
                notify(cliente, assunto, mensagem, i);
            }
            $(this).attr("id", '1');
        }
        else {
            $(this).removeAttr("id");
        }
    });
}

$(document).ready(function () {
    setInterval(function () {
        alerta();
        notificacao();
    }, 1000);
});
