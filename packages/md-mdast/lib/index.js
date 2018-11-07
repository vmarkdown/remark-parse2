"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createParser_1 = __importDefault(require("./createParser"));
var defaults_1 = __importDefault(require("./presets/defaults"));
exports.create = function () { return createParser_1.default(defaults_1.default); };
