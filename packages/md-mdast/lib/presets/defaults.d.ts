import { TTokenizer, TBlockToken, TInlineToken } from '../types';
declare const preset: {
    block: TTokenizer<TBlockToken>[];
    inline: TTokenizer<TInlineToken>[];
};
export default preset;
