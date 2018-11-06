"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var REG = /^\[\^([a-zA-Z0-9\-_]+)\]: *([^\n]*(\n?((  ([^\n]*)\n?)|\n(?!\n))*)?)/;
// tslint:disable only-arrow-functions, no-invalid-this
var footnoteDefinition = function (eat, value) {
    var matches = value.match(REG);
    if (!matches) {
        return void 0;
    }
    var subvalue = matches[0];
    var identifier = matches[1];
    var outdented = matches[2].replace(/^ {1,4}/gm, '');
    var children = this.tokenizeChildBlock(outdented);
    return eat(subvalue, 'footnoteDefinition', children, { identifier: identifier });
};
exports.default = footnoteDefinition;
