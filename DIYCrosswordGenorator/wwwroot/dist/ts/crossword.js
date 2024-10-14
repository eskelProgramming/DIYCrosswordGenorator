"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Crossword_1_1 = require("./Crossword.1");
// Example usage
const crossword = new Crossword_1_1.Crossword(10);
crossword.addWord({ text: 'hello', x: 0, y: 0, direction: 'horizontal' });
crossword.addWord({ text: 'world', x: 0, y: 1, direction: 'horizontal' });
console.log(crossword.toString());
