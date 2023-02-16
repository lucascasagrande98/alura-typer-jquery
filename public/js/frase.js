$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria() {
	$("#spinner").toggle();

	$.get("http://localhost:3000/frases", trocarFraseAleatoria)
		.fail(() => {
			$("#erro").toggle();
			setTimeout(() => {
				$("#erro").toggle();
			}, 1500);
		})
		.always(() => {
			$("#spinner").toggle();
		});
}

function trocarFraseAleatoria(data) {
	var frase = $(".frase");
	var numeroAleatorio = Math.floor(Math.random() * data.length);

	frase.text(data[numeroAleatorio].texto);
	atualizaTamanhoFrase();
	atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function buscaFrase() {
	$("#spinner").toggle();
	var fraseId = $("#frase-id").val();
	var dados = { id: fraseId };

	$.get("http://localhost:3000/frases", dados, trocaFrase)
		.fail(() => {
			$("#erro").toggle();
			setTimeout(() => {
				$("#erro").toggle();
			}, 2000);
		})
		.always(() => {
			$("#spinner").toggle();
		});
}

function trocaFrase(data) {
	console.log(data);
	var frase = $(".frase");
	frase.text(data.texto);
	atualizaTamanhoFrase();
	atualizaTempoInicial(data.tempo);
}
