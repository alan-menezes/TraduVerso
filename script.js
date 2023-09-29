document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formularioUpload").addEventListener("submit", function(evento) {
        evento.preventDefault();
        const entradaArquivo = evento.target.querySelector("input[type='file']");

        if (entradaArquivo.files.length > 0) {
            const arquivo = entradaArquivo.files[0];
            const leitor = new FileReader();

            leitor.onload = function(e) {
                const conteudoArquivo = e.target.result;
                const linhas = conteudoArquivo.split("\n");
                const containerLinhas = document.getElementById("containerLinhas");

                containerLinhas.innerHTML = "";

                linhas.forEach((linha) => {
                    if (linha.trim() !== "") {
                        const divLinha = document.createElement("div");
                        divLinha.classList.add("item-linha");

                        const conteudoLinha = document.createElement("div");
                        conteudoLinha.textContent = linha;
                        conteudoLinha.classList.add("conteudo-linha");
                        divLinha.appendChild(conteudoLinha);

                        const entradaTraducao = document.createElement("input");
                        entradaTraducao.type = "text";
                        entradaTraducao.placeholder = "Tradução...";
                        entradaTraducao.classList.add("entrada-traducao");
                        divLinha.appendChild(entradaTraducao);

                        containerLinhas.appendChild(divLinha);
                    }
                });

                document.getElementById("paginaTraducao").style.display = "block";
            };

            leitor.readAsText(arquivo);
        }
    });

    document.getElementById("botaoPrevisualizacao").addEventListener("click", function() {
        document.getElementById("paginaTraducao").style.display = "none";
        document.getElementById("paginaPrevisualizacao").style.display = "block";

        const divsLinhas = document.querySelectorAll(".item-linha");
        const traducoes = [];

        divsLinhas.forEach((divLinha) => {
            const entradaTraducao = divLinha.querySelector(".entrada-traducao");
            traducoes.push(entradaTraducao.value);
        });

        const containerPrevisualizacao = document.getElementById("containerPrevisualizacao");
        containerPrevisualizacao.innerHTML = "<h2>Prévia da Tradução</h2>";
        traducoes.forEach((traducao, indice) => {
            containerPrevisualizacao.innerHTML += `<p>Linha ${indice + 1}: ${traducao}</p>`;
        });
    });
    //este botao nao esta funcionando (ainda estou investigando o porque)
    document.getElementById("exportarDocx").addEventListener("click", function() {
        alert("funcionalidade ainda em desenvolvimento")
        // Implementação da exportação como .docx
        const divsLinhas = document.querySelectorAll(".item-linha");
        const traducoes = [];

        divsLinhas.forEach((divLinha) => {
            const entradaTraducao = divLinha.querySelector(".entrada-traducao");
            traducoes.push(entradaTraducao.value);
        });

        const doc = new docx.Document();

        traducoes.forEach((traducao, indice) => {
            doc.addParagraph(`Linha ${indice + 1}: ${traducao}`);
        });

        const blob = docx.Packer.toBlob(doc);

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "traducao.docx";

        link.click();
    });

    document.getElementById("exportarPdf").addEventListener("click", function() {
        // Implementação da exportação como .pdf
        const divsLinhas = document.querySelectorAll(".item-linha");
        const traducoes = [];

        divsLinhas.forEach((divLinha) => {
            const entradaTraducao = divLinha.querySelector(".entrada-traducao");
            traducoes.push(entradaTraducao.value);
        });

        const pdf = new jsPDF();

        traducoes.forEach((traducao, indice) => {
            pdf.text(`Linha ${indice + 1}: ${traducao}`, 10, 10 + indice * 10);
        });

        pdf.save("traducao.pdf");
    });

    document.getElementById("exportarTxt").addEventListener("click", function() {
        // Implementação da exportação como .txt
        const divsLinhas = document.querySelectorAll(".item-linha");
        const traducoes = [];

        divsLinhas.forEach((divLinha) => {
            const entradaTraducao = divLinha.querySelector(".entrada-traducao");
            traducoes.push(entradaTraducao.value);
        });

        const texto = traducoes.join("\n");

        const blob = new Blob([texto], { type: "text/plain" });

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "traducao.txt";

        link.click();
    });
});
