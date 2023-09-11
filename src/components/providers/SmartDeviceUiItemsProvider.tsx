/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { StagePanelLocation, StagePanelSection, StageUsage, ToolbarItem, ToolbarOrientation, ToolbarUsage, UiItemsProvider, Widget } from "@itwin/appui-react";
import { VisibilityTool } from "./../tools/VisiblityTool";
import { SmartDeviceListWidgetComponent } from "../widgets/SmartDeviceListWidgetComponent"
export interface SmartDeviceUiItemsProviderProps {
    VisibilityTool?: { itemPriority?: number, groupPriority?: number };
}

/**  Creating a buttons on top left corner to start tool and clear geometry. */
export class SmartDeviceUiItemsProvider implements UiItemsProvider {
    public readonly id = "SmartDeviceUiItemsProvider";
    constructor(localizationNamespace: string, public props?: SmartDeviceUiItemsProviderProps) {
        // Register tools that will be returned via this provider
        VisibilityTool.register(localizationNamespace);
    }

    public provideToolbarItems(
        _stageId: string,
        stageUsage: string,
        toolbarUsage: ToolbarUsage,
        toolbarOrientation: ToolbarOrientation
    ): ToolbarItem[] {
        const toolbarItems: ToolbarItem[] = [];
        if (
            stageUsage === StageUsage.General &&
            toolbarUsage === ToolbarUsage.ContentManipulation &&
            toolbarOrientation === ToolbarOrientation.Vertical
        ) {
            toolbarItems.push(VisibilityTool.getActionButtonDef(this.props?.VisibilityTool?.itemPriority ?? 1000, this.props?.VisibilityTool?.groupPriority ?? 1000));
            return toolbarItems;
        }
        return [];
    }
    public provideWidgets(
        _stageId: string,
        _stageUsage: string,
        location: StagePanelLocation,
        _section?: StagePanelSection
    ): readonly Widget[] {
        const widgets: Widget[] = [];
        if (location === StagePanelLocation.Right) {
            widgets.push({
                id: "SmartDeviceListWidgetComponent",
                label: "Smart Device List ",
                content: <SmartDeviceListWidgetComponent></SmartDeviceListWidgetComponent>,
            });
        }
        return widgets;
    }


}
