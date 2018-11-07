import { IIcon, IParser, TEat } from '../types';
declare const icon: (maxLength?: number) => (this: IParser, eat: TEat<IIcon>, value: string) => IIcon | undefined;
export default icon;
