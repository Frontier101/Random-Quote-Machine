import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setOrder } from '../../features/filtersSlice';

const orderFilters = ['Random', 'Same Author', 'Favorites'];
const categoryFilters = ['All', 'Motivation', 'Philosophy', 'Science'];


const FilterType = (props) => {
    const {quotesList} = useSelector(state => state.quotes);
    const dispatch = useDispatch();
    const [checkedArr, setCheckedArr] = useState(
        props.array.map((_, i) => i==0 ? true : false)
    );

    const reducer = props.type == 'Category' ? setCategory : setOrder;
    
    function handleChange(item, i){
        setCheckedArr(props.array.map(
            ((_, j) => j==i ? true : false)
        ));
        dispatch(reducer({
            filter : item, author: quotesList.author
        }))
    }

    return(
        <div>
            <ul className='d-flex gap-3 list-unstyled flex-wrap'>
                <strong>{props.type} : </strong>
                {props.array.map((item, i) => (
                    <li 
                        key={item} 
                        className='align-content-center me-3'
                    >
                        <input
                            checked={checkedArr[i]}
                            onChange={() => 
                                handleChange(item, i)
                            }
                            role='button' className='me-1' 
                            type='radio' name={props.type}
                        />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
        
    )
}

const Filter = () => {
    
    const {color} = useSelector(state => state.quotes);
    const [checked, setChecked] = useState(false);

    return (
        <div style={{
                width:'100vw', 
                backgroundColor: color, 
                transition:'background-color 3s ease'
            }}
        >
        <div 
            id="filters-container" 
            className="
                d-flex flex-wrap 
                align-items-center p-3
            "
        >
            <div 
                style={{width:'10rem'}} 
                className="form-switch form-check "
            >
                {/* <input
                    data-bs-toggle ="collapse"
                    data-bs-target ="#filters"
                    role='button' 
                    className="form-check-input" 
                    type="checkbox"
                    checked= {checked}
                    onChange={()=> 
                        setChecked(state => !state)
                    } 
                />
                {checked ?'Hide':'Show'} filters */}
                <label
                    className="form-check-label"
                    htmlFor="filterSwitch"
                    role="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#filters"
                    aria-expanded={checked}
                    aria-controls="filters"
                    onClick={() => setChecked(state => !state)}
                    >
                    <input
                        id="filterSwitch"
                        role="button"
                        className="form-check-input me-2"
                        type="checkbox"
                        checked={checked}
                        readOnly
                    />
                    {checked ? 'Hide' : 'Show'} filters
                </label>
            </div>
            <div 
                id="filters"
                className=" p-3 collapse"
            >
                <FilterType 
                    type="Category" 
                    array={categoryFilters}
                />
                <FilterType 
                    type="Order" 
                    array={orderFilters}
                />
            </div>
        </div>
        </div>
    )
}

export default Filter