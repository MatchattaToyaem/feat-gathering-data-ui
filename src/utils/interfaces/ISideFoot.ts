import { IAnkleSprain } from "./footComponents/AnkleSprain";

export interface ISideFoot{
    ankleSprain: IAnkleSprain;
    image: {original: string, croped: string}
}