import React from 'react'
import { useSelector} from 'react-redux';



const BioCard = (props) =>{
    const {authorBio} = useSelector(state => state.authorInfo);
    
    return(
        <div 
            style={{
                backgroundColor:'antiquewhite',
                right:'-7rem', bottom:'0', 
                width:'10rem',
                transition:'.3s ease-in', 
                opacity:`${props.show ? '1' : '0'}`, 
                visibility:`${props.show ? 'visible': 'hidden'}`
            }} 
            className="
                card position-absolute z-1 
                slide-in-left border-dark
            "
        >
            <img 
                className="card-img-top"
                src={authorBio.img} 
                alt={props.author}
            />
            <div className="card-body">
                <strong style={{fontSize:'.7em'}}>
                    {props.author}
                </strong>
                <p style={{fontSize:'.6em'}}>
                    {authorBio.bio}
                </p>
            </div>
        </div>
    )
}

export default BioCard;