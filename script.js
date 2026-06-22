// 1. MAPEAMENTO DE ELEMENTOS (Captura de elementos da tela do HTML)
const expressionDisplay=document.getElementById('expression');
const resultDisplay=document.getElementById('result');
const themeToggleBtn=document.getElementById('themeToggle');
const historyList=document.getElementById('historyList');

// Variável interna para guardar a sequência de caracteres digitada
let currentExpression='';

// 2. FUNÇÃO INSERIR CARACTERES (Chamada pelo 'onclick="insert(...)"')
function insert(value){
currentExpression += value;
updateDisplay();
}

// Função auxiliar para atualizar o visor com símbolos amigáveis
function updateDisplay(){
let visual = currentExpression
.replace(/Math.PI/g, 'π')
.replace(/Math.E/g, 'e')
.replace(/Math.sqrt\(/g, '√(')
.replace(/Math.sin\(/g, 'sin(')
.replace(/Math.cos\(/g, 'cos(')
.replace(/Math.tan\(/g, 'tan(')
.replace(/Math.log10\(/g, 'log(')
.replace(/\*/g, '×')
.replace(/\//g, '÷');
expressionDisplay.innerText = visual;
}

// 3. FUNÇÃO LIMPAR TUDO (Chamada pelo botão AC)
function clearAll(){
currentExpression='';
expressionDisplay.innerText='';
resultDisplay.innerText='0';
}

// 4. FUNÇÃO APAGAR ÚLTIMO CARACTERE (Botão de Backspace)
function backspace(){
currentExpression=currentExpression.slice(0,-1);
updateDisplay();
}

// 5. FUNÇÃO CALCULAR RESULTADO FINAL (O Coração Matemático)
function calculate(){
try{
let result=eval(currentExpression);

resultDisplay.innerText=result;

const li=document.createElement('li');
li.innerText=`${expressionDisplay.innerText} = ${result}`;
historyList.prepend(li);

currentExpression= result.toString();

} catch (error) {
resultDisplay.innerText='Erro';
currentExpression='';
}
}

// 6. CONTROLADOR DE TEMA ESCURO / CLARO (Troca de Variáveis CSS)
themeToggleBtn.addEventListener('click',()=>{
document.body.classList.toggle('light');

if(document.body.classList.contains('light')){
themeToggleBtn.innerText='☀️';
}else{
themeToggleBtn.innerText='🌙';
}
});

// 7. SUPORTE AO TECLADO (Event Listener para capturar teclas)
document.addEventListener('keydown', (event) => {
const key = event.key;

// Mapeamento de números, operadores, parênteses e pontos
if (/[0-9]/.test(key) || ['+', '-', '*', '/', '(', ')', '%', '.'].includes(key)) {
insert(key);
} else if (key === ',') {
insert('.'); // Mapeia a vírgula do teclado para o ponto decimal
} else if (key === 'Enter' || key === '=') {
event.preventDefault(); // Evita o comportamento padrão do Enter
calculate();
} else if (key === 'Backspace') {
backspace();
} else if (key === 'Escape') {
clearAll();
}
});
