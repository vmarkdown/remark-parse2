import { IParser, TEat, ILink, IImage } from '../types';
declare const link: () => (this: IParser, eat: TEat<ILink | IImage>, value: string) => ILink | IImage | undefined;
export default link;
