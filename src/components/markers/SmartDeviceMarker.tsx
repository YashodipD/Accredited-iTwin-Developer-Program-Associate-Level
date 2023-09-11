import { BeButtonEvent, IModelApp, Marker, StandardViewId } from "@itwin/core-frontend";
import { XAndY, XYAndZ } from "@itwin/core-geometry";

export class SmartDeviceMarker extends Marker {
    private _smartDeviceId: string;
    private _smartDeviceType: string;
    private _elementId: string;
    constructor(location: XYAndZ, size: XAndY, smartDeviceId: string, smartDeviceType: string,
        cloudData: any, elementId: string) {
        super(location, size);
        this._smartDeviceId = smartDeviceId;
        this._smartDeviceType = smartDeviceType;
        this.setImageUrl(`/${this._smartDeviceType}.png`);
        this.title = this.populateTitle(cloudData);
        this._elementId = elementId;
    }
    private populateTitle(cloudData: any) {
        let smartTable = "";

        for (const [key, value] of Object.entries(cloudData)) {
            smartTable += `
            <tr>
            <td>${key}</td>
            <td>${value}</td>
            </tr>`
        }
        const smartTableDiv = document.createElement("div");
        smartTableDiv.className = "smart-table";
        smartTableDiv.innerHTML = `
        <h3>${this._smartDeviceId}</h3>
        <table>
        ${smartTable}
        </table>`;
        return smartTableDiv;
    }

    public onMouseButton(_ev: BeButtonEvent) {
        if (_ev.isDown) return true;
        IModelApp.viewManager.selectedView?.zoomToElements(this._elementId, { animateFrustumChange: true, standardViewId: StandardViewId.RightIso });
        return true;
    }
}