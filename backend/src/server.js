const app = require("./app");

app.listen(3000, (error) => {
	if (error) return console.log("Erro na inicialização do servidor.", error);

	console.log("Servidor inicializado.");
});
