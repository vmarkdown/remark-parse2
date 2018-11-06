import { TInlineToken, TTokenTypeInline, TTokenizer } from './types';
declare const createRegexTokenizer: <T extends TInlineToken>(type: TTokenTypeInline, reg: RegExp, childrenMatchIndex: number) => TTokenizer<T>;
export default createRegexTokenizer;
