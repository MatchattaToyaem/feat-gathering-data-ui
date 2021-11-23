import { IForeFoot } from "./footComponents/ForeFoot";
import { IMetatarsalgia } from "./footComponents/Metatarsalgia";
import { IMiddleFoot } from "./footComponents/MiddleFoot";
import { IHeel } from "./footComponents/Heel";
import { IAnkleSprain } from "./footComponents/AnkleSprain";
import { IApex5 } from "./footComponents/Apex5";

export interface ISoleFoot {
  image: {original: string, croped: string};
  fore: IForeFoot;
  metatarsalgia: IMetatarsalgia;
  middle: IMiddleFoot;
  heel: IHeel;
  apex5: IApex5;
}
