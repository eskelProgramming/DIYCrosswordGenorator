function seperateWords() {
    // grab the words from the form
    const words = document.getElementById('words').value.toUpperCase().split('\n').filter(word => word.trim() !== '');

    // find the longest word to be the grid size
    const gridSize = words.reduce((max, word) => Math.max(max, word.length), 0);

    // generate the crossword
    const crossword = generateCrossword(words, gridSize);

    // render the crossword
    renderCrossword(crossword);
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generateCrossword(words, gridSize) {
    const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(' '));
    const middle = Math.floor(gridSize / 2);

    function canPlaceWord(word, x, y, direction) {
        if (direction === 'horizontal' && x + word.length > gridSize) return false;
        if (direction === 'vertical' && y + word.length > gridSize) return false;

        for (let i = 0; i < word.length; i++) {
            const nx = direction === 'horizontal' ? x + i : x;
            const ny = direction === 'horizontal' ? y : y + i;
            if (grid[ny][nx] !== ' ' && grid[ny][nx] !== word[i]) return false;
        }

        return true;
    }

    function placeWord(word, x, y, direction) {
        for (let i = 0; i < word.length; i++) {
            const nx = direction === 'horizontal' ? x + i : x;
            const ny = direction === 'horizontal' ? y : y + i;
            grid[ny][nx] = word[i];
        }
    }

    function findPlacement(word) {
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                for (const dir of ['horizontal', 'vertical']) {
                    if (canPlaceWord(word, x, y, dir)) {
                        placeWord(word, x, y, dir);
                        return true;
                    }
                }
            }
        }
        return false;
    }

    grid[middle][middle] = words[0][0];
    placeWord(words[0], middle, middle, 'horizontal');

    for (let i = 1; i < words.length; i++) {
        if (!findPlacement(words[i])) {
            return null;
        }
    }

    return grid;
}

function renderCrossword(grid) {
    const crosswordContainer = document.getElementById('crossword');
    crosswordContainer.innerHTML = '';

    if (!grid) {
        crosswordContainer.innerText = 'Failed to generate crossword';
        return;
    }

    const gridSize = grid.length;
    crosswordContainer.style.gridTemplateColumns = `repeat(${gridSize}, 50px)`;
    crosswordContainer.style.gridTemplateRows = `repeat(${gridSize}, 50px)`;

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const letter = grid[y][x];
            const letterDiv = document.createElement('div');
            letterDiv.className = 'letter';
            letterDiv.textContent = letter !== ' ' ? letter : '';
            crosswordContainer.appendChild(letterDiv);
        }
    }
}

const words = ['CAT', 'ART', 'CART'];
const gridSize = 10;
const crossword = generateCrossword(words, gridSize);
renderCrossword(crossword);
