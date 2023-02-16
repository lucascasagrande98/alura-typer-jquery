var campo = $(".campo-digitacao");
var tempoInicial = $("#tempo-digitacao").text();

$(() => {
	atualizaTamanhoFrase();
	inicializaContadores();
	inicializaCronometro();
	inicializaMarcadores();
	$("#botao-reiniciar").click(reiniciaJogo);
	atualizaPlacar();
	$("#usuarios").selectize({
		create: true,
		sortField: "text",
	});
	$(".tooltip").tooltipster({
		trigger: "custom",
	});
});

function atualizaTamanhoFrase() {
	var frase = $(".frase").text();
	var numPalavras = frase.split(" ").length;
	var tamanhoFrase = $("#tamanho-frase");
	tamanhoFrase.text(numPalavras);
}

function atualizaTempoInicial(tempo) {
	tempoInicial = tempo;
	$("#tempo-digitacao").text(tempo);
}

function inicializaContadores() {
	campo.on("input", () => {
		var conteudo = campo.val();
		var conteudoSemEspaco = conteudo.replace(/\s+/g, "");

		var qtdPalavras = conteudo.split(/\S+/).length - 1;
		$("#contador-palavras").text(qtdPalavras);

		var qtdCaracteres = conteudoSemEspaco.length;
		$("#contador-caracteres").text(qtdCaracteres);
	});
}

function inicializaCronometro() {
	campo.one("focus", () => {
		var tempoRestante = $("#tempo-digitacao").text();
		$("#botao-reiniciar").attr("disabled", true);
		var cronometroID = setInterval(() => {
			tempoRestante--;
			$("#tempo-digitacao").text(tempoRestante);

			if (tempoRestante < 1) {
				clearInterval(cronometroID);
				$("#botao-reiniciar").attr("disabled", false);
				finalizaJogo();
			}
		}, 1000);
	});
}

function finalizaJogo() {
	campo.attr("disabled", true);
	campo.addClass("campo-desativado");
	inserePlacar();
}

function inicializaMarcadores() {
	campo.on("input", () => {
		var frase = $(".frase").text();
		var digitado = campo.val();
		//var comparavel = frase.substr(0, digitado.length); if (digitado == comparavel)
		//var comparavel = frase.startsWith(digitado);

		if (frase.startsWith(digitado)) {
			campo.addClass("borda-verde");
			campo.removeClass("borda-vermelha");
		} else {
			campo.addClass("borda-vermelha");
			campo.removeClass("borda-verde");
		}
	});
}

function reiniciaJogo() {
	campo.attr("disabled", false);
	campo.val("");
	$("#contador-palavras").text("0");
	$("#contador-caracteres").text("0");
	$("#tempo-digitacao").text(tempoInicial);
	campo.removeClass("campo-desativado");
	campo.removeClass("borda-vermelha");
	campo.removeClass("borda-verde");
	inicializaCronometro();
}
