"use strict";
class Crossword {
    constructor(size) {
        this.size = size;
        this.grid = Array.from({ length: size }, () => Array(size).fill(' '));
    }
    addWord(word) {
        const { text, x, y, direction } = word;
        if (direction === 'horizontal') {
            if (x + text.length > this.size)
                return false;
            for (let i = 0; i < text.length; i++) {
                if (this.grid[y][x + i] !== ' ' && this.grid[y][x + i] !== text[i])
                    return false;
            }
            for (let i = 0; i < text.length; i++) {
                this.grid[y][x + i] = text[i];
            }
        }
        else {
            if (y + text.length > this.size)
                return false;
            for (let i = 0; i < text.length; i++) {
                if (this.grid[y + i][x] !== ' ' && this.grid[y + i][x] !== text[i])
                    return false;
            }
            for (let i = 0; i < text.length; i++) {
                this.grid[y + i][x] = text[i];
            }
        }
        return true;
    }
    findPlacement(word) {
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                if (this.canPlaceWord(word, x, y, 'horizontal')) {
                    return { text: word, x, y, direction: 'horizontal' };
                }
                if (this.canPlaceWord(word, x, y, 'vertical')) {
                    return { text: word, x, y, direction: 'vertical' };
                }
            }
        }
        return null;
    }
    canPlaceWord(word, x, y, direction) {
        if (direction === 'horizontal') {
            if (x + word.length > this.size)
                return false;
            for (let i = 0; i < word.length; i++) {
                if (this.grid[y][x + i] !== ' ' && this.grid[y][x + i] !== word[i])
                    return false;
                if (this.grid[y][x + i] === word[i] && !this.isValidIntersection(word, x, y, i, direction))
                    return false;
            }
        }
        else {
            if (y + word.length > this.size)
                return false;
            for (let i = 0; i < word.length; i++) {
                if (this.grid[y + i][x] !== ' ' && this.grid[y + i][x] !== word[i])
                    return false;
                if (this.grid[y + i][x] === word[i] && !this.isValidIntersection(word, x, y, i, direction))
                    return false;
            }
        }
        return true;
    }
    isValidIntersection(word, x, y, index, direction) {
        if (direction === 'horizontal') {
            return (y === 0 || this.grid[y - 1][x + index] === ' ') && (y === this.size - 1 || this.grid[y + 1][x + index] === ' ');
        }
        else {
            return (x === 0 || this.grid[y + index][x - 1] === ' ') && (x === this.size - 1 || this.grid[y + index][x + 1] === ' ');
        }
    }
    toString() {
        return this.grid.map(row => row.join('')).join('\n');
    }
}
