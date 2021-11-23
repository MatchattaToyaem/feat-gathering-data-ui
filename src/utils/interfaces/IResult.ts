import { IAnkleSprain } from "./footComponents/AnkleSprain";
import { IApex5 } from "./footComponents/Apex5";
import { IForeFoot } from "./footComponents/ForeFoot";
import { IHeel } from "./footComponents/Heel";
import { IMetatarsalgia } from "./footComponents/Metatarsalgia";
import { IMiddleFoot } from "./footComponents/MiddleFoot";
import { IManualElementValue, IManualValue } from "./IManualElementValue";

export interface IResults {
  id: number
  idFromNSTDA: number
  collectorEmail: string;
  gender: string;
  shoeSize: number;
  manualMeasurement: {
    left: IManualValue;
    right: IManualValue;
  };
  rawData: {
    left: {
      soles: ISoleFoot[];
      sides: ISideFoot[];
    };
    right: {
      soles: ISoleFoot[];
      sides: ISideFoot[];
    };
  };
  created: string;
}

interface ISoleFoot {
  image: string;
  fore: IForeFoot;
  metatarsalgia: IMetatarsalgia;
  middle: IMiddleFoot;
  heel: IHeel;
  apex5: IApex5;
}

interface ISideFoot {
  image: string;
  ankleSprain: IAnkleSprain;
}
