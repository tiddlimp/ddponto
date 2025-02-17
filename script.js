let dadosColaboradores = []; // Variável global para armazenar os dados dos colaboradores

// Função para determinar o status baseado no saldo
function determinarStatus(saldo) {
    return saldo.toString().startsWith("-") ? "Negativo" : "Positivo";
}

// Função para exibir os dados na tabela e atualizar os cards
function exibirDados(colaboradores, filtro = "todos") {
    const tbody = document.querySelector("#tabelaColaboradores tbody");
    tbody.innerHTML = ""; // Limpa a tabela antes de preencher

    let totalColaboradores = 0;
    let colaboradoresPositivos = 0;
    let colaboradoresNegativos = 0;

    colaboradores.forEach((colab) => {
        let saldoBruto = colab.saldo;
        let saldoFormatado = saldoBruto; // Mantém o valor original do Excel sem conversões
        
        // Determinar status baseado no valor original
        const status = determinarStatus(saldoFormatado);

        // Atualizar contagem de colaboradores positivos e negativos
        totalColaboradores++;
        if (status === "Positivo") {
            colaboradoresPositivos++;
        } else {
            colaboradoresNegativos++;
        }

        // Aplicar filtro
        if (
            filtro === "todos" ||
            (filtro === "positivos" && status === "Positivo") ||
            (filtro === "negativos" && status === "Negativo")
        ) {
            // Adiciona linha na tabela
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${colab.matricula}</td>
                <td>${colab.nome}</td>
                <td>${saldoFormatado} horas</td>
                <td class="${status === "Positivo" ? "status-positivo" : "status-negativo"}">
                    ${status}
                </td>
            `;
            tbody.appendChild(row);
        }
    });

    // Atualiza os cards
    document.getElementById("totalColaboradores").textContent = totalColaboradores;
    document.getElementById("colaboradoresPositivos").textContent = colaboradoresPositivos;
    document.getElementById("colaboradoresNegativos").textContent = colaboradoresNegativos;
}

// Função para processar o arquivo Excel
function processarArquivoExcel(arquivo) {
    const leitor = new FileReader();
    leitor.onload = function (e) {
        const dados = new Uint8Array(e.target.result);
        const workbook = XLSX.read(dados, { type: "array" });

        // Supondo que os dados estão na primeira planilha
        const primeiraPlanilha = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(primeiraPlanilha, { header: 1, raw: false });

        // Converter os dados para o formato esperado
        dadosColaboradores = json.slice(1).map((linha) => {
            return {
                matricula: linha[0], // Coluna A: Matrícula
                nome: linha[1], // Coluna B: Funcionário
                saldo: linha[2] ? linha[2].toString() : "00:00" // Coluna C: Saldo no Período mantendo o formato
            };
        });

        // Exibir os dados na tabela (sem filtro inicial)
        exibirDados(dadosColaboradores);
    };
    leitor.readAsArrayBuffer(arquivo);
}

// Função para ordenar os dados
function ordenarDados(ordem) {
    if (ordem === "maiorParaMenor") {
        dadosColaboradores.sort((a, b) => {
            const saldoA = parseFloat(a.saldo.replace(":", "."));
            const saldoB = parseFloat(b.saldo.replace(":", "."));
            return saldoB - saldoA;
        });
    } else if (ordem === "menorParaMaior") {
        dadosColaboradores.sort((a, b) => {
            const saldoA = parseFloat(a.saldo.replace(":", "."));
            const saldoB = parseFloat(b.saldo.replace(":", "."));
            return saldoA - saldoB;
        });
    }
    exibirDados(dadosColaboradores);
}

// Evento para importar o arquivo Excel
document.getElementById("arquivoExcel").addEventListener("change", function (e) {
    const arquivo = e.target.files[0];
    if (arquivo) {
        processarArquivoExcel(arquivo);
    }
});

// Evento para aplicar o filtro
document.getElementById("filtro").addEventListener("change", function (e) {
    const filtro = e.target.value; // Obtém o valor selecionado no dropdown
    exibirDados(dadosColaboradores, filtro); // Aplica o filtro
});

// Evento para mostrar/ocultar o menu de ordenação
document.getElementById("botaoOrdenacao").addEventListener("click", function (e) {
    e.stopPropagation(); // Evita que o clique feche o menu imediatamente
    const menu = document.getElementById("menuOrdenacao");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// Evento para fechar o menu de ordenação ao clicar fora
document.addEventListener("click", function () {
    const menu = document.getElementById("menuOrdenacao");
    menu.style.display = "none";
});

// Evento para ordenar ao selecionar uma opção
document.querySelectorAll(".opcao-ordenacao").forEach((opcao) => {
    opcao.addEventListener("click", function () {
        const ordem = this.getAttribute("data-ordem");
        ordenarDados(ordem);
    });
});

// Função para imprimir a tabela
document.getElementById("botaoImprimir").addEventListener("click", function () {
    window.print(); // Abre a janela de impressão do navegador
});

// Função para exportar a tabela para PDF
document.getElementById("botaoExportarPDF").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Adicionando título ao PDF
    doc.setFontSize(18);
    doc.text("Relatório de Colaboradores", 14, 15);

    // Coletando dados da tabela
    const headers = [["Matrícula", "Funcionário", "Saldo no Período", "Status"]];
    const rows = [];

    document.querySelectorAll("#tabelaColaboradores tbody tr").forEach((row) => {
        const rowData = [];
        row.querySelectorAll("td").forEach((cell) => {
            rowData.push(cell.innerText);
        });
        rows.push(rowData);
    });

    // Adicionando tabela ao PDF
    doc.autoTable({
        head: headers,
        body: rows,
        startY: 25, // Ajuste para não sobrepor o título
        theme: "grid",
        styles: {
            fontSize: 10,
            cellPadding: 3
        },
        headStyles: {
            fillColor: [41, 128, 185], // Cor do cabeçalho azul
            textColor: [255, 255, 255]
        }
    });

    // Salvar o PDF com nome personalizado
    doc.save(`Relatorio_Colaboradores_${new Date().toLocaleDateString()}.pdf`);
});

function filtrarColaboradores() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let tabela = document.getElementById("tabelaColaboradores");
    let linhas = tabela.getElementsByTagName("tr");

    for (let i = 1; i < linhas.length; i++) { // Ignora cabeçalho
        let colunas = linhas[i].getElementsByTagName("td");
        
        if (colunas.length > 1) { // Garante que há células na linha
            let nomeFuncionario = colunas[1].textContent || colunas[1].innerText; // 2ª coluna (índice 1)

            if (nomeFuncionario.toLowerCase().includes(input)) {
                linhas[i].style.display = "";
            } else {
                linhas[i].style.display = "none";

                
            }
        }
    }
}

document.getElementById("searchInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Impede que o formulário seja enviado (caso esteja dentro de um form)
        filtrarColaboradores();
    }
});
