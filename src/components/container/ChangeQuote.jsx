import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const ChangeQuote = (props) =>{
    const {color} = useSelector(state => state.quotes);
    const[isHovered, setIsHovered] = useState(false)
    // link translates with the passed direction
    const transObj = {
        right:'translateX(5px)',
        left:'translateX(-5px)',
    }
    const stylesheets = {
        color: color,
        transition:"transform .5s ease ,color 3s ease",
        transform: isHovered ? transObj[props.direction] : "none",
        opacity:`${!props.visible ? '1' : '0'}`, 
        visibility:`${!props.visible ? 'visible': 'hidden'}`
    }
    stylesheets[props.direction] = '-15vw';
    return(
            <i 
                id={props.id}
                style={stylesheets}
                title={props.direction == 'left' ? 'Previous' : 'Next'}
                role="button"
                onClick={() => {
                    props.callback()
                }}
                className = {`
                    position-absolute
                    bi bi-arrow-${props.direction}-short change-quote
                `}
                onMouseEnter={()=>{setIsHovered(true);}}
                onMouseLeave={() => {setIsHovered(false)}}
            >
            </i>
    )
}

export default ChangeQuote;