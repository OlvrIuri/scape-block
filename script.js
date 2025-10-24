const selecionados = document.getElementsByClassName('selecionado')

const gameBlocks = document.getElementsByClassName('game-block')
const blocks = document.querySelectorAll('.block1, .block2, .block3, .block4, .redblock1, .redblock2');
const redBlocks = document.querySelectorAll('.redBlock1, .redBlock2')
const buttonUp = document.getElementById('btnUp')
const buttonDown = document.getElementById('btnDown')
const buttonLeft = document.getElementById('btnLeft')
const buttonRight = document.getElementById('btnRight')

const GRID_ROWS = 7;
const GRID_COLS = 7;

let blocksObs = [
    { id: 'block1', rStart: 1, rEnd: 1, cStart : 1, cEnd: 3},
    { id: 'block2', rStart: 4, rEnd: 6, cStart: 1, cEnd: 1},
    { id: 'block3', rStart: 2, rEnd: 4, cStart: 3, cEnd: 3},
    { id: 'block4', rStart: 4, rEnd: 4, cStart: 4, cEnd: 6}
]
let redBlocksObj = [
    {id: 'redblock1', rStart:3, rEnd:4, cStart:2, cEnd:3 },
    {id: 'redblock2', rStart:3, rEnd:4, cStart:5, cEnd:6 }
]

const makeRedBlocks = () => {
    redBlocksObj.forEach(block => {
        const el = document.querySelector(`.${block.id}`)
        if (el){
            el.style.gridArea = `${block.rStart} / ${block.cStart} / ${block.rEnd} / ${block.cEnd}`
        }
    })
}
makeRedBlocks();

const makeObsBlock = () => {
    blocksObs.forEach(block => {
        const el = document.querySelector(`.${block.id}`)
        if (el){
            el.style.gridArea = `${block.rStart} / ${block.cStart} / ${block.rEnd} / ${block.cEnd}`
        }
    })
}

makeObsBlock();


blocks.forEach(block => {
    block.addEventListener('click', () => {
        // remove a classe "selecionado" de todos
        blocks.forEach(b => b.classList.remove('selecionado'));

        // adiciona a classe apenas ao clicado
        block.classList.add('selecionado');
    });
});


// Funções auxiliares
const isInsideGrid = (rStart, rEnd, cStart, cEnd) => {
    return rStart >= 1 && cStart >= 1 && rEnd <= GRID_ROWS && cEnd <= GRID_COLS;
}

const hasCollision = (rStart, rEnd, cStart, cEnd, currentId, allBlocks) => {
    for (let block of allBlocks) {
        if (block.id !== currentId) {
            if (!(rEnd < block.rStart || rStart > block.rEnd || cEnd < block.cStart || cStart > block.cEnd)) {
                return true;
            }
        }
    }
    return false;
}

// Funções para blocos normais
const moveBlockUp = () => {
    blocksObs.forEach(block => {
        blocks.forEach(gameblock => {
            if (gameblock.classList.contains('selecionado') && gameblock.classList.contains(block.id)) {
                const newRStart = block.rStart - 1;
                const newREnd = block.rEnd - 1;
                if (isInsideGrid(newRStart, newREnd, block.cStart, block.cEnd) &&
                    !hasCollision(newRStart, newREnd, block.cStart, block.cEnd, block.id, [...blocksObs, ...redBlocksObj])) {
                    block.rStart = newRStart;
                    block.rEnd = newREnd;
                }
            }
        });
    });
    makeObsBlock();
}

const moveBlockDown = () => {
    blocksObs.forEach(block => {
        blocks.forEach(gameblock => {
            if (gameblock.classList.contains('selecionado') && gameblock.classList.contains(block.id)) {
                const newRStart = block.rStart + 1;
                const newREnd = block.rEnd + 1;
                if (isInsideGrid(newRStart, newREnd, block.cStart, block.cEnd) &&
                    !hasCollision(newRStart, newREnd, block.cStart, block.cEnd, block.id, [...blocksObs, ...redBlocksObj])) {
                    block.rStart = newRStart;
                    block.rEnd = newREnd;
                }
            }
        });
    });
    makeObsBlock();
}

const moveBlockLeft = () => {
    blocksObs.forEach(block => {
        blocks.forEach(gameblock => {
            if (gameblock.classList.contains('selecionado') && gameblock.classList.contains(block.id)) {
                const newCStart = block.cStart - 1;
                const newCEnd = block.cEnd - 1;
                if (isInsideGrid(block.rStart, block.rEnd, newCStart, newCEnd) &&
                    !hasCollision(block.rStart, block.rEnd, newCStart, newCEnd, block.id, [...blocksObs, ...redBlocksObj])) {
                    block.cStart = newCStart;
                    block.cEnd = newCEnd;
                }
            }
        });
    });
    makeObsBlock();
}

const moveBlockRight = () => {
    blocksObs.forEach(block => {
        blocks.forEach(gameblock => {
            if (gameblock.classList.contains('selecionado') && gameblock.classList.contains(block.id)) {
                const newCStart = block.cStart + 1;
                const newCEnd = block.cEnd + 1;
                if (isInsideGrid(block.rStart, block.rEnd, newCStart, newCEnd) &&
                    !hasCollision(block.rStart, block.rEnd, newCStart, newCEnd, block.id, [...blocksObs, ...redBlocksObj])) {
                    block.cStart = newCStart;
                    block.cEnd = newCEnd;
                }
            }
        });
    });
    makeObsBlock();
}

// Funções para blocos vermelhos
const moveRedBlockUp = () => {
    redBlocksObj.forEach(block => {
        const el = document.querySelector(`.${block.id}`);
        if (el && el.classList.contains('selecionado')) {
            const newRStart = block.rStart - 1;
            const newREnd = block.rEnd - 1;
            if (isInsideGrid(newRStart, newREnd, block.cStart, block.cEnd) &&
                !hasCollision(newRStart, newREnd, block.cStart, block.cEnd, block.id, [...blocksObs, ...redBlocksObj])) {
                block.rStart = newRStart;
                block.rEnd = newREnd;
            }
        }
    });
    makeRedBlocks();
}

const moveRedBlockDown = () => {
    redBlocksObj.forEach(block => {
        const el = document.querySelector(`.${block.id}`);
        if (el && el.classList.contains('selecionado')) {
            const newRStart = block.rStart + 1;
            const newREnd = block.rEnd + 1;
            if (isInsideGrid(newRStart, newREnd, block.cStart, block.cEnd) &&
                !hasCollision(newRStart, newREnd, block.cStart, block.cEnd, block.id, [...blocksObs, ...redBlocksObj])) {
                block.rStart = newRStart;
                block.rEnd = newREnd;
            }
        }
    });
    makeRedBlocks();
}

const moveRedBlockLeft = () => {
    redBlocksObj.forEach(block => {
        const el = document.querySelector(`.${block.id}`);
        if (el && el.classList.contains('selecionado')) {
            const newCStart = block.cStart - 1;
            const newCEnd = block.cEnd - 1;
            if (isInsideGrid(block.rStart, block.rEnd, newCStart, newCEnd) &&
                !hasCollision(block.rStart, block.rEnd, newCStart, newCEnd, block.id, [...blocksObs, ...redBlocksObj])) {
                block.cStart = newCStart;
                block.cEnd = newCEnd;
            }
        }
    });
    makeRedBlocks();
}

const moveRedBlockRight = () => {
    redBlocksObj.forEach(block => {
        const el = document.querySelector(`.${block.id}`);
        if (el && el.classList.contains('selecionado')) {
            const newCStart = block.cStart + 1;
            const newCEnd = block.cEnd + 1;
            if (isInsideGrid(block.rStart, block.rEnd, newCStart, newCEnd) &&
                !hasCollision(block.rStart, block.rEnd, newCStart, newCEnd, block.id, [...blocksObs, ...redBlocksObj])) {
                block.cStart = newCStart;
                block.cEnd = newCEnd;
            }
        }
    });
    makeRedBlocks();
}


buttonUp.addEventListener('click', () =>{
    moveBlockUp();
    moveRedBlockUp();
})
buttonDown.addEventListener('click', () => {
    moveBlockDown();
    moveRedBlockDown();
})
buttonLeft.addEventListener('click', () => {
    moveBlockLeft();
    moveRedBlockLeft();
})
buttonRight.addEventListener('click', () => {
    moveBlockRight();
    moveRedBlockRight();
})