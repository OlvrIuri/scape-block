// script.js — versão corrigida e comentada

const selecionados = document.getElementsByClassName('selecionado');

const gameBlocks = document.getElementsByClassName('game-block');
const blocks = document.querySelectorAll('.block1, .block2, .block3, .block4, .block5, .redblock1, .redblock2');
const buttonUp = document.getElementById('btnUp');
const buttonDown = document.getElementById('btnDown');
const buttonLeft = document.getElementById('btnLeft');
const buttonRight = document.getElementById('btnRight');

const buttonNextLvl = document.getElementById('btnNextLvl');

const pMoviments = document.getElementById('mov');

const pSelected = document.getElementById('selec');

// Tamanho da grade (5x5)
const GRID_ROWS = 5;
const GRID_COLS = 5;

let moves = 0

/*
  Nota de convenção:
  - rStart, cStart são inclusivos (linha/coluna inicial)
  - rEnd, cEnd são exclusivos (um a mais da última linha/coluna ocupada)
  Ex: rStart=3, rEnd=5 ocupa linhas 3 e 4 (duas linhas)
*/

// blocos de obstáculos (exemplo)
let blocksObs = [
    { id: 'block1', rStart: 1, rEnd: 2, cStart: 1, cEnd: 3 }, 
    { id: 'block2', rStart: 2, rEnd: 4, cStart: 3, cEnd: 4 }, 
    { id: 'block3', rStart: 4, rEnd: 6, cStart: 1, cEnd: 2 }, 
    { id: 'block4', rStart: 4, rEnd: 5, cStart: 2, cEnd: 4 },
    { id: 'block5', rStart: 3, rEnd: 5, cStart: 4, cEnd: 5}
];

// blocos vermelhos (alvo)
let redBlocksObj = [
    { id: 'redblock1', rStart: 3, rEnd: 4, cStart: 2, cEnd: 3 }, 
    { id: 'redblock2', rStart: 3, rEnd: 4, cStart: 5, cEnd: 6 }  
];

// atualiza estilos CSS para red blocks
const makeRedBlocks = () => {
    redBlocksObj.forEach(block => {
        const el = document.querySelector(`.${block.id}`);
        if (el) {
            // grid-area usa: row-start / col-start / row-end / col-end
            el.style.gridArea = `${block.rStart} / ${block.cStart} / ${block.rEnd} / ${block.cEnd}`;
        }
    });
};
makeRedBlocks();

// atualiza estilos CSS para obstáculos
const makeObsBlock = () => {
    blocksObs.forEach(block => {
        const el = document.querySelector(`.${block.id}`);
        if (el) {
            el.style.gridArea = `${block.rStart} / ${block.cStart} / ${block.rEnd} / ${block.cEnd}`;
        }
    });
};
makeObsBlock();

// seleção por clique (remove de todos e adiciona ao clicado)
blocks.forEach(block => {
    block.addEventListener('click', () => {
        blocks.forEach(b => b.classList.remove('selecionado'));
        block.classList.add('selecionado');
        checkBlockSelect();
    });
});

// função auxiliar: verifica se as coordenadas estão dentro dos limites da grade
// OBS: rEnd/cEnd podem ser = GRID + 1 para permitir blocos que ocupam até a última linha/col
const isInsideGrid = (rStart, rEnd, cStart, cEnd) => {
    return (
        rStart >= 1 &&
        cStart >= 1 &&
        rEnd <= GRID_ROWS + 1 &&
        cEnd <= GRID_COLS + 1 &&
        rStart < rEnd &&
        cStart < cEnd
    );
};

// função de colisão correta (considerando rEnd/cEnd exclusivos)
// colisão existe se há interseção em linhas E colunas
// função de colisão — permite que redblock1 e redblock2 se encontrem
const hasCollision = (rStart, rEnd, cStart, cEnd, currentId, allBlocks) => {
    for (let b of allBlocks) {
        if (b.id === currentId) continue; // ignora o próprio bloco

        const isRedCollision =
            (currentId.includes("redblock") && b.id.includes("redblock"));

        if (isRedCollision) continue;

        // checagem de sobreposição (intervalos)
        const rowsOverlap = (rStart < b.rEnd) && (rEnd > b.rStart);
        const colsOverlap = (cStart < b.cEnd) && (cEnd > b.cStart);

        if (rowsOverlap && colsOverlap) {
            return true;
        }
    }
    return false;
};


// retorna uma lista combinada atual (cópias dos objetos) usada para checagens
const getAllBlocks = () => {
    return [...blocksObs, ...redBlocksObj];
};

// função genérica para mover blocos (procura por elemento com .selecionado)
function moveBlock(blockArray, direction) {
    // iteramos pelos blocos do array (blocksObs e redBlocksObj)
    blockArray.forEach(block => {
        const el = document.querySelector(`.${block.id}`);
        if (!el) return;
        if (!el.classList.contains('selecionado')) return;

        // valores temporários para testar movimentação
        let newRStart = block.rStart;
        let newREnd = block.rEnd;
        let newCStart = block.cStart;
        let newCEnd = block.cEnd;

        if (direction === 'up') {
            newRStart = block.rStart - 1;
            newREnd = block.rEnd - 1;
        } else if (direction === 'down') {
            newRStart = block.rStart + 1;
            newREnd = block.rEnd + 1;
        } else if (direction === 'left') {
            newCStart = block.cStart - 1;
            newCEnd = block.cEnd - 1;
        } else if (direction === 'right') {
            newCStart = block.cStart + 1;
            newCEnd = block.cEnd + 1;
        }
        

        // checar limites e colisão com outros blocos
        const all = getAllBlocks();
        if (
            isInsideGrid(newRStart, newREnd, newCStart, newCEnd) &&
            !hasCollision(newRStart, newREnd, newCStart, newCEnd, block.id, all)
        ) {
            block.rStart = newRStart;
            block.rEnd = newREnd;
            block.cStart = newCStart;
            block.cEnd = newCEnd;
            moves = moves+1
        }
    });

    // depois de todos os possíveis movimentos, atualiza
    makeObsBlock();
    makeRedBlocks();

    //Atualiza movimentos
    attMoviments();

    // Check win
    winCondition();
}
// Função de vitória — detecta quando os dois blocos vermelhos se encontram
const winCondition = () => {
    const [r1, r2] = redBlocksObj;

    // Verifica se há sobreposição entre redblock1 e redblock2
    const rowsOverlap = (r1.rStart < r2.rEnd) && (r1.rEnd > r2.rStart);
    const colsOverlap = (r1.cStart < r2.cEnd) && (r1.cEnd > r2.cStart);

    if (rowsOverlap && colsOverlap) {
        // Mostra mensagem de vitória
        buttonNextLvl.style.display = 'block';
        return true;
    }
    return false;
};

const attMoviments = () =>{
    pMoviments.innerHTML = `Movimentos:${moves}`
}
const checkBlockSelect = () => {
    let found = false;

    // Checa blocos cinza (obstáculos)
    blocksObs.forEach(block => {
        const el = document.querySelector(`.${block.id}`);
        if (el && el.classList.contains('selecionado')) {
            pSelected.innerHTML = 'Selecionado: Cinza';
            found = true;
        }
    });

    // Checa blocos vermelhos
    redBlocksObj.forEach(block => {
        const el = document.querySelector(`.${block.id}`);
        if (!found && el && el.classList.contains('selecionado')) {
            pSelected.innerHTML = 'Selecionado: Vermelho';
            found = true;
        }
    });

    // Se nenhum bloco selecionado, limpa o texto
    if (!found) {
        pSelected.innerHTML = 'Selecionado: Nenhum';
    }
};

const loadNextLevel = () =>{
    window.location.href='fase03.html';
}


// listeners dos botões — usamos o array combinado para permitir mover qualquer bloco
buttonUp.addEventListener('click', () => moveBlock([...blocksObs, ...redBlocksObj], 'up'));
buttonDown.addEventListener('click', () => moveBlock([...blocksObs, ...redBlocksObj], 'down'));
buttonLeft.addEventListener('click', () => moveBlock([...blocksObs, ...redBlocksObj], 'left'));
buttonRight.addEventListener('click', () => moveBlock([...blocksObs, ...redBlocksObj], 'right'));
buttonNextLvl.addEventListener('click', () => loadNextLevel())
