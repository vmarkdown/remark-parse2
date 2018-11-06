import './definitions';
import * as RemarkParse from 'remark-parse';
import transformer from './transformer';
declare function attacher(this: RemarkParse): typeof transformer;
export = attacher;
