"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var REG = /^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/;
var splitCells = function (tableRow, count) {
    var cells = tableRow.replace(/([^\\])\|/g, '$1 |').split(/ +\| */);
    if (count !== void 0) {
        if (cells.length > count) {
            cells.splice(count);
        }
        else {
            while (cells.length < count) {
                cells.push('');
            }
        }
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i] = cells[i].replace(/\\\|/g, '|');
    }
    return cells;
};
// tslint:disable only-arrow-functions, no-invalid-this
var table = function (eat, value) {
    var _this = this;
    var matches = value.match(REG);
    if (!matches) {
        return;
    }
    var subvalue = matches[0];
    var header = matches[1];
    var align = matches[2]
        .replace(/^ *|\| *$/g, '')
        .split(/ *\| */)
        .map(function (spec) {
        // tslint:disable-next-line no-parameter-reassignment
        spec = spec.trim();
        return spec[0] === ':'
            ? spec[spec.length - 1] === ':'
                ? 'center'
                : 'left'
            : spec[spec.length - 1] === ':'
                ? 'right'
                : null;
    });
    var rows = matches[3] ? matches[3].replace(/(?: *\| *)?\n$/, '').split('\n') : [];
    var children = [];
    var headers = splitCells(header.replace(/^ *| *\| *$/g, '')).map(function (headerText) { return ({
        type: 'tableCell',
        children: _this.tokenizeInline(headerText),
    }); });
    children.push({
        type: 'tableRow',
        children: headers,
    });
    if (rows && rows.length) {
        // tslint:disable-next-line prefer-for-of
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var cells = splitCells(row.replace(/^ *\| *| *\| *$/g, ''), headers.length);
            children.push({
                type: 'tableRow',
                children: cells.map(function (cellRawValue) { return ({
                    type: 'tableCell',
                    children: _this.tokenizeInline(cellRawValue),
                }); }),
            });
        }
    }
    return eat(subvalue, 'table', children, { align: align });
};
exports.default = table;
