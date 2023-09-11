import { QueryRowFormat } from "@itwin/core-common";
import { DecorateContext, Decorator, Marker, ScreenViewport } from "@itwin/core-frontend";
import { SmartDeviceMarker } from "../markers/SmartDeviceMarker";
import { SmartDeviceAPI } from "../../SmartDeviceAPI";
import { UiFramework } from "@itwin/appui-react";
export class SmartDeviceDecorator implements Decorator {
    private _iModel;
    private _markerSet: Marker[];

    constructor(vp: ScreenViewport) {
        this._iModel = vp.iModel;
        this._markerSet = [];
        this.addMarkers();
    }

    public static async getSmartDeviceData() {
        const query = "select SmartDeviceId, ECInstanceId, SmartDeviceType, Origin from DgnCustomItemTypes_HouseSchema.SmartDevice where Origin IS NOT Null";
        const results = UiFramework.getIModelConnection()!.createQueryReader(query, undefined, { rowFormat: QueryRowFormat.UseJsPropertyNames })
        return (await results.toArray()).map((element) => element);

        //chapter 6 lesson 1 is broken
        /*  const values = [];
         for await (const row of results) {
             values.push(row);
         }
         return values; */
    }

    private async addMarkers() {
        const values = await SmartDeviceDecorator.getSmartDeviceData();
        const cloudData = await SmartDeviceAPI.getData();
        console.log(values);

        values.forEach((value) => {
            const smartDeviceMarker = new SmartDeviceMarker(
                { x: value.origin.x, y: value.origin.y, z: value.origin.z }, { x: 50, y: 50 },
                value.smartDeviceId,
                value.smartDeviceType,
                cloudData[value.smartDeviceId],
                value.id);
            this._markerSet.push(smartDeviceMarker);
        })
    }

    public decorate(context: DecorateContext) {
        this._markerSet.forEach(marker => {
            marker.addDecoration(context)
        })
    }
}