import { IApex5 } from "./interfaces/footComponents/Apex5";
import { IResults } from "./interfaces/IResult";
import { ISideFoot } from "./interfaces/ISideFoot";
import { ISoleFoot } from "./interfaces/ISoleFoot";

export const TransformData = (
  left: { soles: ISoleFoot[]; sides: ISideFoot[] },
  right: { soles: ISoleFoot[]; sides: ISideFoot[] }
) => {
  const rawData: any = {};
  const leftSide: any[] = [];
  const leftSole: any[] = [];
  const rightSide: any[] = [];
  const rightSole: any[] = [];
  left.sides.forEach((value) => {
    const side = {
      image: value.image.croped,
      ankleSprain: value.ankleSprain,
    };
    leftSide.push(side);
  });
  left.soles.forEach((value) => {
    const sole = {
      image: value.image.croped,
      fore: value.fore,
      middle: value.middle,
      metatarsalgia: value.metatarsalgia,
      heel: value.heel,
      apex5: value.apex5
    };
    leftSole.push(sole);
  });
  right.sides.forEach((value) => {
    const side = {
      image: value.image.croped,
      ankleSprain: value.ankleSprain,
    };
    rightSide.push(side);
  });
  right.soles.forEach((value) => {
    const sole = {
      image: value.image.croped,
      fore: value.fore,
      middle: value.middle,
      metatarsalgia: value.metatarsalgia,
      heel: value.heel,
      apex5: value.apex5
    };
    rightSole.push(sole);
  });
  rawData.left = { soles: leftSole, sides: leftSide };
  rawData.right = { soles: rightSole, sides: rightSide };
  return rawData;
};

export const APIToReact = (result: IResults) => {
  if (!result) {
    return undefined;
  }
  const { rawData } = result;
  const transformedData: {
    left: {
      soles: ISoleFoot[];
      sides: ISideFoot[];
    };
    right: {
      soles: ISoleFoot[];
      sides: ISideFoot[];
    };
  } = {
    left: {
      soles: [],
      sides: [],
    },
    right: {
      soles: [],
      sides: [],
    },
  };

  Object.entries(rawData).forEach(([key, value]) => {
    const sides: ISideFoot[] = [];
    const soles: ISoleFoot[] = [];
    value.sides.forEach((value, index) => {
      const side: ISideFoot = {
        image: {
          original: value.image,
          croped: value.image,
        },
        ankleSprain: value.ankleSprain,
      };
      sides.push(side);
    });
    const needTodelete: IApex5 = value.soles[0].apex5 ? value.soles[0].apex5 : { x: 0, y: 0 }
    value.soles.forEach((rawSole, index) => {
      const { image, fore, middle, metatarsalgia, heel } = rawSole;
      const sole: ISoleFoot = {
        image: {
          croped: image,
          original: image,
        },
        fore: fore,
        middle: middle,
        metatarsalgia: metatarsalgia,
        heel: heel,
        apex5: needTodelete
      };
      soles.push(sole);
    });
    (transformedData as any)[key]["sides"] = sides;
    (transformedData as any)[key]["soles"] = soles;
  });
  return transformedData;
};
