// ============================================
// PROJETO AGRINHO 2026 - SCRIPT.JS
// Funcionalidades: Quiz ambiental + Acessibilidade
// ============================================

// ============================================
// 1. QUESTOES DO QUIZ
// ============================================
const questoes = [
    {
        texto: "1. O que são agrotóxicos?",
        alternativas: [
            "A) Fertilizantes naturais usados na agricultura",
            "B) Produtos químicos usados para combater pragas e doenças nas plantações",
            "C) Máquinas agrícolas modernas"
        ],
        correta: 1 // índice 1 (começa em 0)
    },
    {
        texto: "2. Qual é um dos principais impactos do uso excessivo de agrotóxicos no meio ambiente?",
        alternativas: [
            "A) Aumento da biodiversidade",
            "B) Contaminação do solo e da água",
            "C) Melhora da qualidade do ar"
        ],
        correta: 1
    },
    {
        texto: "3. Quem são os mais afetados diretamente pela aplicação de agrotóxicos sem proteção?",
        alternativas: [
            "A) Os consumidores nas cidades",
            "B) Os agricultores que aplicam os produtos",
            "C) Os pássaros apenas"
        ],
        correta: 1
    },
    {
        texto: "4. Qual alternativa é considerada uma prática sustentável para reduzir o uso de agrotóxicos?",
        alternativas: [
            "A) Aumentar a quantidade de agrotóxicos",
            "B) Usar controle biológico de pragas (inimigos naturais)",
            "C) Plantar sempre a mesma cultura"
        ],
        correta: 1
    },
    {
        texto: "5. O tema do Concurso Agrinho 2026 é:",
        alternativas: [
            "A) Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente",
            "B) Tecnologia no campo sem limites",
            "C) Agrotóxicos sempre necessários"
        ],
        correta: 0
    }
];

// ============================================
// 2. FUNÇÃO PARA EXIBIR O QUIZ NA PÁGINA
// ============================================
function carregarQuiz() {
    const container = document.getElementById("quizContainer");
    if (!container) return;

    let html = "";
    
    for (let i = 0; i < questoes.length; i++) {
        const q = questoes[i];
        html += `<div class="pergunta" data-pergunta="${i}">`;
        html += `<p>${q.texto}</p>`;
        
        for (let j = 0; j < q.alternativas.length; j++) {
            html += `
                <label>
                    <input type="radio" name="pergunta${i}" value="${j}">
                    ${q.alternativas[j]}
                </label>
            `;
        }
        html += `</div>`;
    }
    
    container.innerHTML = html;
}

// ============================================
// 3. FUNÇÃO PARA CORRIGIR O QUIZ
// ============================================
function corrigirQuiz() {
    let acertos = 0;
    const total = questoes.length;
    const respostasUsuario = [];
    
    for (let i = 0; i < total; i++) {
        const radios = document.querySelectorAll(`input[name="pergunta${i}"]`);
        let selecionado = null;
        
        for (let j = 0; j < radios.length; j++) {
            if (radios[j].checked) {
                selecionado = parseInt(radios[j].value);
                break;
            }
        }
        
        respostasUsuario.push(selecionado);
        
        if (selecionado === questoes[i].correta) {
            acertos++;
        }
    }
    
    // Verificar se todas foram respondidas
    const todasRespondidas = respostasUsuario.every(r => r !== null);
    
    const resultadoDiv = document.getElementById("resultadoQuiz");
    
    if (!todasRespondidas) {
        resultadoDiv.innerHTML = "⚠️ Por favor, responda todas as 5 perguntas antes de verificar!";
        resultadoDiv.className = "resultado resultado-erro";
        return;
    }
    
    const percentual = (acertos / total) * 100;
    let mensagem = "";
    
    if (percentual === 100) {
        mensagem = "🌿 Parabéns! Você entende a importância de um agronegócio sustentável! Compartilhe esse conhecimento!";
    } else if (percentual >= 60) {
        mensagem = "👍 Bom trabalho! Continue aprendendo sobre práticas sustentáveis no campo.";
    } else {
        mensagem = "📚 Que tal revisar o conteúdo do site? Reduzir agrotóxicos é essencial para o futuro sustentável!";
    }
    
    resultadoDiv.innerHTML = `✅ Você acertou ${acertos} de ${total} perguntas (${Math.round(percentual)}%)<br><br>${mensagem}`;
    resultadoDiv.className = "resultado resultado-acerto";
}

// ============================================
// 4. FUNÇÃO PARA REINICIAR O QUIZ
// ============================================
function reiniciarQuiz() {
    // Limpar todos os radios selecionados
    const todosRadios = document.querySelectorAll('input[type="radio"]');
    todosRadios.forEach(radio => {
        radio.checked = false;
    });
    
    // Limpar resultado
    const resultadoDiv = document.getElementById("resultadoQuiz");
    resultadoDiv.innerHTML = "";
    resultadoDiv.className = "resultado";
}

// ============================================
// 5. FUNCIONALIDADES DE ACESSIBILIDADE
// ============================================
let tamanhoFonteAtual = 100; // porcentagem

function aumentarFonte() {
    if (tamanhoFonteAtual < 140) {
        tamanhoFonteAtual += 10;
        document.body.style.fontSize = tamanhoFonteAtual + "%";
    }
}

function diminuirFonte() {
    if (tamanhoFonteAtual > 70) {
        tamanhoFonteAtual -= 10;
        document.body.style.fontSize = tamanhoFonteAtual + "%";
    }
}

function ativarAltoContraste() {
    document.body.classList.toggle("alto-contraste");
}

// ============================================
// 6. CONFIGURAR PAINEL DE ACESSIBILIDADE
// ============================================
function configurarAcessibilidade() {
    const btnAcessibilidade = document.getElementById("acessibilidadeBtn");
    const painel = document.getElementById("acessibilidadePainel");
    
    // Mostrar/esconder painel
    btnAcessibilidade.addEventListener("click", () => {
        if (painel.style.display === "flex") {
            painel.style.display = "none";
        } else {
            painel.style.display = "flex";
        }
    });
    
    // Configurar botões do painel
    document.getElementById("aumentarFonte").addEventListener("click", aumentarFonte);
    document.getElementById("diminuirFonte").addEventListener("click", diminuirFonte);
    document.getElementById("altoContraste").addEventListener("click", ativarAltoContraste);
}

// ============================================
// 7. INICIALIZAÇÃO DA PÁGINA
// ============================================
document.addEventListener("DOMContentLoaded", function() {
    // Carregar o quiz
    carregarQuiz();
    
    // Configurar acessibilidade
    configurarAcessibilidade();
    
    // Adicionar eventos dos botões do quiz
    const btnEnviar = document.getElementById("enviarQuiz");
    const btnReiniciar = document.getElementById("reiniciarQuiz");
    
    if (btnEnviar) {
        btnEnviar.addEventListener("click", corrigirQuiz);
    }
    
    if (btnReiniciar) {
        btnReiniciar.addEventListener("click", reiniciarQuiz);
    }
});
