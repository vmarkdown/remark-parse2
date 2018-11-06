"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createRegexTokenizer_1 = __importDefault(require("../createRegexTokenizer"));
var REG = /^\+\+(?=\S)([\s\S]*?\S)\+\+/;
var underline = createRegexTokenizer_1.default('underline', REG, 1);
exports.default = underline;