export interface IManualElementValue {
  idFromNSTDA: number | undefined
  shoeSize : number | undefined;
  gender: string | undefined;
  left: IManualValue | undefined;
  right: IManualValue | undefined;
}

export interface IManualValue {
  footArchHeight: number | undefined;
  foreWidth: number | undefined;
  middleWidth: number | undefined;
  heelWidth: number | undefined;
  heelToFore: number | undefined;
  heelToMiddle: number | undefined;
  heelToMetatarsalgia: number | undefined;
}
