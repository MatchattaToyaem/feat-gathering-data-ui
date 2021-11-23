import {
  IManualValue,
} from "../utils/interfaces/IManualElementValue";
import { ISideFoot } from "../utils/interfaces/ISideFoot";
import { ISoleFoot } from "../utils/interfaces/ISoleFoot";
import { TransformData } from "../utils/TransformData";

export const UpdateVolunteer = (
  id: number,
  idFromNSTDA: number,
  collectorEmail: string,
  manualMeasurement: { left: IManualValue; right: IManualValue },
  gender: string,
  shoeSize: number,
  left: { soles: ISoleFoot[]; sides: ISideFoot[] },
  right: { soles: ISoleFoot[]; sides: ISideFoot[] }
) => {
  const rawData = TransformData(left, right);
  return {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
      idFromNSTDA: idFromNSTDA,
      collectorEmail: collectorEmail,
      gender: gender,
      shoeSize: shoeSize,
      manualMeasurement: {
        left: manualMeasurement.left,
        right: manualMeasurement.right,
      },
      rawData: rawData,
    }),
  };
};
