"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var escape_1 = __importDefault(require("../tokenizer/escape"));
var icon_1 = __importDefault(require("../tokenizer/icon"));
var link_1 = __importDefault(require("../tokenizer/link"));
var text_1 = __importDefault(require("../tokenizer/text"));
var mark_1 = __importDefault(require("../tokenizer/mark"));
var inlineCode_1 = __importDefault(require("../tokenizer/inlineCode"));
var emphasis_1 = __importDefault(require("../tokenizer/emphasis"));
var strong_1 = __importDefault(require("../tokenizer/strong"));
var delete_1 = __importDefault(require("../tokenizer/delete"));
var inlineMath_1 = __importDefault(require("../tokenizer/inlineMath"));
var footnoteReference_1 = __importDefault(require("../tokenizer/footnoteReference"));
var reference_1 = __importDefault(require("../tokenizer/reference"));
var inlineLink_1 = __importDefault(require("../tokenizer/inlineLink"));
var sup_1 = __importDefault(require("../tokenizer/sup"));
var sub_1 = __importDefault(require("../tokenizer/sub"));
var handle_1 = __importDefault(require("../tokenizer/handle"));
var underline_1 = __importDefault(require("../tokenizer/underline"));
var break_1 = __importDefault(require("../tokenizer/break"));
var code_1 = __importDefault(require("../tokenizer/code"));
var newline_1 = __importDefault(require("../tokenizer/newline"));
var fences_1 = __importDefault(require("../tokenizer/fences"));
var math_1 = __importDefault(require("../tokenizer/math"));
var thematicBreak_1 = __importDefault(require("../tokenizer/thematicBreak"));
var heading_1 = __importDefault(require("../tokenizer/heading"));
var blockquote_1 = __importDefault(require("../tokenizer/blockquote"));
var paragraph_1 = __importDefault(require("../tokenizer/paragraph"));
var definition_1 = __importDefault(require("../tokenizer/definition"));
var footnoteDefinition_1 = __importDefault(require("../tokenizer/footnoteDefinition"));
var list_1 = __importDefault(require("../tokenizer/list"));
var table_1 = __importDefault(require("../tokenizer/table"));
var html_1 = __importDefault(require("../tokenizer/html"));
var preset = {
    block: [
        newline_1.default,
        code_1.default,
        fences_1.default,
        math_1.default,
        thematicBreak_1.default,
        heading_1.default,
        blockquote_1.default,
        list_1.default,
        html_1.default,
        table_1.default,
        footnoteDefinition_1.default,
        definition_1.default,
        paragraph_1.default,
    ],
    inline: [
        escape_1.default,
        inlineCode_1.default(),
        strong_1.default,
        emphasis_1.default,
        delete_1.default(),
        inlineMath_1.default(),
        footnoteReference_1.default,
        link_1.default(),
        reference_1.default,
        inlineLink_1.default,
        sup_1.default,
        sub_1.default,
        mark_1.default,
        handle_1.default,
        underline_1.default,
        break_1.default,
        icon_1.default(32),
        text_1.default(),
    ],
};
exports.default = preset;
