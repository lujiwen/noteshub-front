import React from 'react'


const SheetTypeIcon = ({instrument}) => {
    return (
        <img width="40" height="30" src={"./"+ instrument +".svg"}/>
    )
}
// rgb(160, 207, 255) "background-color": "#A0CFFF"
export default SheetTypeIcon