import React from 'react'
import BuildControl from './BuildControl/BuildControl'

import classes from './BuildControls.css'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]


const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong> {props.price.toFixed(2)}</strong></p>
        {controls.map((ctrl) => {
           return  <BuildControl
               added={() => props.ingredientAdded(ctrl.type)}
               removed={() => props.ingredientDeducted(ctrl.type)}
               disabled={props.disabled[ctrl.type]}
               key={ctrl.label}
               label={ctrl.label}

           />

        })}

        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
        onClick={props.ordered}>{props.isAuth ?  "ORDER NOW" : 'SIGN UP TO ORDER'}</button>
    </div>
)

export default buildControls