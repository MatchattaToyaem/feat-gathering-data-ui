import { IManualElementValue } from "../utils/interfaces/IManualElementValue";
import { ISideFoot } from "../utils/interfaces/ISideFoot";
import { ISoleFoot } from "../utils/interfaces/ISoleFoot";
import { TransformData } from "../utils/TransformData";

export const CreateVolunteersOptions = (
  manualMeasurement: IManualElementValue,
  left: { soles: ISoleFoot[]; sides: ISideFoot[] },
  right: { soles: ISoleFoot[]; sides: ISideFoot[] },
  collectorEmail: string
) => {
  const rawData = TransformData(left, right)
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      collectorEmail: collectorEmail,
      idFromNSTDA: manualMeasurement.idFromNSTDA,
      gender: manualMeasurement.gender,
      shoeSize: manualMeasurement.shoeSize,
      manualMeasurement: {
        left: manualMeasurement.left,
        right: manualMeasurement.right,
      },
      rawData: rawData,
    }),
  };
};
