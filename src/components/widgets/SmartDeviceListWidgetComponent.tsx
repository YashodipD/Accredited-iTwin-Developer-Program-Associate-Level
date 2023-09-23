import React, { useEffect, useState } from 'react'
import { SmartDeviceDecorator } from '../decorators/SmartDeviceDecorator'
import { IModelApp, StandardViewId } from '@itwin/core-frontend'

export function SmartDeviceListWidgetComponent() {
    const [smartTable, setsmartTable] = useState<JSX.Element[]>([])

    useEffect(() => {
        (async () => {
            const values = await SmartDeviceDecorator.getSmartDeviceData();
            const tabelList: JSX.Element[] = [];
            values.forEach((value, i) => {
                tabelList.push(
                    <tr key={i} onClick={() => {
                        IModelApp.viewManager.selectedView?.zoomToElements(value.id, { animateFrustumChange: true, standardViewId: StandardViewId.RightIso });
                    }}>
                        <td>{value.smartDeviceType}</td>
                        <td>{value.smartDeviceId}</td>
                    </tr>
                )
            })
            setsmartTable(tabelList);
        })()
    }, [])


    return (
        <table className='smart-table'>
            <tbody>
                <tr>
                    <th>SmartDeviceType</th>
                    <th>SmartDeviceId</th>
                </tr>
                {smartTable}
            </tbody>
        </table>
    )
}


