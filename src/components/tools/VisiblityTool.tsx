/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import React from "react";
import { IModelApp, Tool } from "@itwin/core-frontend";
import { ToolbarActionItem, ToolbarItemUtilities } from "@itwin/appui-react";
import { SvgVisibilityEmphasize } from "@itwin/itwinui-icons-react";
import { Visualization } from "./../../Visualization";

/**
 * This tools acts as an immediate tool and hides walls whenever runs. For more information about Immediate Tools and why you should used them,
 * see this learning page - https://www.itwinjs.org/learning/frontend/tools/#immediate-tools
*/
export class VisibilityTool extends Tool {
    public static override toolId = "VisibilityTool";
    public override async run(): Promise<boolean> {
        // perform action her behalf of user 
        Visualization.hideHouseExterior(IModelApp.viewManager.selectedView!, !Visualization.toggleWall)
        return true;
    }

    /** Returns definition of toolbar action button related to tool */
    public static getActionButtonDef(itemPriority: number, groupPriority?: number): ToolbarActionItem {
        const overrides = undefined !== groupPriority ? { groupPriority } : {};
        return ToolbarItemUtilities.createActionItem(
            VisibilityTool.toolId,
            itemPriority,
            <SvgVisibilityEmphasize />,
            VisibilityTool.toolId,
            async () => {
                await IModelApp.tools.run(VisibilityTool.toolId);
            },
            overrides);
    }
}
