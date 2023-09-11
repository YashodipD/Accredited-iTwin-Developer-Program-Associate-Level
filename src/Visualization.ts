import { QueryRowFormat } from "@itwin/core-common";
import { IModelConnection, ScreenViewport } from "@itwin/core-frontend";

export class Visualization {
  public static toggleWall: boolean = false;

  public static hideHouseExterior = async (vp: ScreenViewport, toggle: boolean = false) => {
    const categoryIds = await Visualization.getCategoryIds(vp.iModel);
    vp.changeCategoryDisplay(categoryIds, toggle);
    Visualization.toggleWall = !Visualization.toggleWall;
  };
  private static getCategoryIds = async (iModel: IModelConnection) => {
    const categoryToHide = [
      "'Callouts'",
      "'Dry Wall 2nd'",
      "'WINDOWS 2ND'",
      "'Wall 2nd'",
      "'Brick Exterior'",
      "'Dry Wall 1st'",
      "'Wall 1st'",
      "'WINDOWS 1ST'",
      "'light fixture'",
      "'WINDOWS 2ND'",
      "'Roof'",
      "'Ceiling 1st'",
      "'Ceiling 2nd'",
    ];
    const query = `select ECInstanceId from BisCore.Category where CodeValue IN (${categoryToHide.toString()})`;
    const result = iModel.createQueryReader(query, undefined, { rowFormat: QueryRowFormat.UseJsPropertyNames });
    return (await result.toArray()).map((element) => element.id);
  };
}
