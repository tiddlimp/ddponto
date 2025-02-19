let dadosColaboradores = []; // Variável global para armazenar os dados dos colaboradores

// Lista de colaboradores da equipe Administrativo
const colaboradoresAdministrativo = [
    "GUILHERME BELIZARIO PEREIRA",
    "KAIO VIANA CAVALCANTE",
    "VITOR DE SOUZA COSTA",
    "JULIANA MOURA DE ARRUDA MARCHETTE",
    "NATALIA CRISTINA PEDROSO MACEDO",
    "NATHALIA DE GODOI DOS SANTOS",
    "CRISTINA SILVA DE OLIVEIRA",
    "YARA SANTOS DA SILVA",
    "LUIZ FELLIPE PRESS",
    "DEBORA ESPINDOLA DA SILVA",
    "ALINE MARIA DO NASCIMENTO",
    "FRANCIANE DA SILVA BARBOSA",
    "IASMIN VIEIRA DE BARROS",
    "DIANA MIRANDA",
    "ANDREZA RISCALLI SIQUEIRA"
];

// Lista de colaboradores da EQUIPE BG
const colaboradoresEquipeBG = [
    "EDSON LOURENCO DA SILVA",
    "EDMILSON DE LIMA MATOS",
    "MICHAEL DE JESUS MOTA",
    "MAFALDO ALEXANDRE PEREIRA",
    "GIUSEPPE DOS SANTOS PUPO",
    "MARCELO VALERIO DE MEDEIROS",
    "MANOEL MESSIAS DOS SANTOS",
    "ANDRE SILVA RODRIGUES COSTA",
    "KAUE ALVES CUNHA",
    "THIAGO DOS SANTOS GUEDES",
    "ARTHUR FAGUNDES FERREIRA",
    "LEANDRO SOARES TINOCO DE ARAUJO",
    "MAYCON FIGUEIREDO DOS SANTOS",
    "MARCIEL APARECIDO RAMIRES",
    "JEREMIAS MARCELINO DA SILVA",
    "RICARDO PAGLIARI SILVA",
    "ENEAS ALMEIDA DOS REIS SANTOS",
    "GABRIEL LUIS DE OLIVEIRA RODRIGUES",
    "ATAIDE DANTAS DOS SANTOS",
    "ERICK FELIPE DOS SANTOS SILVA",
    "AIRTON LUIZ ROCHA FIGUEROA",
    "EVERTON DOS SANTOS PEREIRA",
    "LEANDRO GODE VICENTE",
    "WAGNER ALVES DO NASCIMENTO",
    "IVANILDO TAVARES DA SILVA",
    "CAIQUE JOSE DOS REIS",
    "HELIO BORGES DOS SANTOS JUNIOR"
];

// Lista de colaboradores da EQUIPE DDLIMP
const colaboradoresEquipeDDLIMP = [
    "MARCOS MUNIZ JACOB",
    "DAVI TINOCO DE SOUZA",
    "FABIO HENRIQUE DOMINGOS DA SILVA",
    "KLEIDSON AGOSTINHO DA SILVA",
    "EBNER SILVA JESUS FREITAS",
    "WILLIAM CAVALCANTE SILVA",
    "KELVIN DOS SANTOS COSTA",
    "VALDEMIR PEREIRA DE HOLANDA",
    "RENAN BOLLI BARBOZA",
    "JILVAN VIEIRA SANTOS",
    "FERNANDO DE LIMA BARBOSA",
    "NILTON SILVA JESUS FREITAS",
    "RONALDY BRASIL REBOUÇAS",
    "PAULO BATISTA BEZERRA"
];

// Lista de colaboradores da EQUIPE JATEAMENTO
const colaboradoresEquipeJateamento = [
    "CLEBER GONCALVES DE SOUZA",
    "FELIPE CATARINO PEREIRA",
    "WILLIAN PEDRO MOTA DA SILVA",
    "JORGE LUIZ DE JESUS SANTOS",
    "JOSÉ ROBERTO CARDOSO JUNIOR",
    "JOSIMAR ZUCA DE LIMA",
    "EMERSON DE SANTANA PEREIRA",
    "GABRIEL HENRIQUE DE FREITAS SOUZA",
    "RONAN MIRANDA DOMINGOS",
    "FABIO ALLAN SILVA ZAVASKI",
    "REGINALDO APARECIDO DONATI",
    "JUAN MARTIN CAPRA MACRINO",
    "GIVANILDO GOMES DOS SANTOS",
    "DIEGO LIMA DA SILVA",
    "DANIEL TELES DA SILVA",
    "RODRIGO SANTOS DA SILVA",
    "JERONIMO CASSIO DOS SANTOS",
    "ANDRE SILVA RODRIGUES COSTA",
    "MANOEL MESSIAS DOS SANTOS",
    "WLADEMIR DA MOTA MILLON",
    "GABRIEL DOS SANTOS LISBOA"
];

// Lista de colaboradores da EQUIPE PREFEITURA
const colaboradoresEquipePrefeitura = [
    "MARCIO LUIZ BRAZ",
    "WALTER LUIZ DE OLIVEIRA SOUZA",
    "AIRTON LUIZ ROCHA FIGUEROA",
    "LUCAS DA SILVA SA RODRIGUES",
    "CLAUDIO SOUSA AVÊDO",
    "ODAIR JOSE PEREIRA FILHO",
    "JOSUE RODOLFO GOMES",
    "FELLIPE APARECIDO SANTANA SANTOS",
    "LUCAS RODRIGUES GAMA",
    "MARCELO ROBERTO MORETI",
    "LUCAS RAFAEL BENTO ROSA",
    "RENE JOEL CHIEZA",
    "WILSON SOUZA SILVA",
    "WENDELL DOMINGOS DOS SANTOS",
    "JOSE ISRAEL OLIVEIRA DOS REIS",
    "ROGERIO LUCAS DE FRANÇA",
    "RAFAEL CORTEZ",
    "WAGNER DA SILVA CRUZ GOMES",
    "ANTONIO SIDNEI PINHEIRO",
    "ALLYSON PEREIRA RODRIGUES",
    "ANTONIO DONATO SILVA DE SOUZA",
    "JEFFERSON CAVALCANTE DOS SANTOS",
    "JOSE JAILSON PEREIRA DA SILVA",
    "JOSE APARECIDO DOS SANTOS SILVA"
];

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

        // Verificar se o colaborador passa no filtro
        let passaFiltro = false;

        if (filtro === "todos") {
            passaFiltro = true;
        } else if (filtro === "positivos" && status === "Positivo") {
            passaFiltro = true;
        } else if (filtro === "negativos" && status === "Negativo") {
            passaFiltro = true;
        } else if (filtro === "administrativo" && colaboradoresAdministrativo.includes(colab.nome.toUpperCase())) {
            passaFiltro = true;
        } else if (filtro === "bg" && colaboradoresEquipeBG.includes(colab.nome.toUpperCase())) {
            passaFiltro = true;
        } else if (filtro === "ddlimp" && colaboradoresEquipeDDLIMP.includes(colab.nome.toUpperCase())) {
            passaFiltro = true;
        } else if (filtro === "jateamento" && colaboradoresEquipeJateamento.includes(colab.nome.toUpperCase())) {
            passaFiltro = true;
        } else if (filtro === "prefeitura" && colaboradoresEquipePrefeitura.includes(colab.nome.toUpperCase())) {
            passaFiltro = true;
        }

        // Se o colaborador passar no filtro, adicionar à tabela e atualizar os cards
        if (passaFiltro) {
            totalColaboradores++;
            if (status === "Positivo") {
                colaboradoresPositivos++;
            } else {
                colaboradoresNegativos++;
            }

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

// Restante do código permanece o mesmo...

// Restante do código permanece o mesmo...

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

    // Obtendo a largura da página
const pageWidth = doc.internal.pageSize.getWidth();

// Definindo o título
const titulo = "Relatório de Colaboradores";

// Obtendo a largura do texto
const textWidth = doc.getTextWidth(titulo);

// Calculando a posição X centralizada
const x = (pageWidth - textWidth) / 2;

// Adicionando título ao PDF no centro da página
doc.setFontSize(18);
doc.text(titulo, x, 15);


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