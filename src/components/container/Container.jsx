import React,{ useState, useEffect } from 'react'

import ChangeQuote from './ChangeQuote'
import BioCard from './BioCard'
import Share from './Share'

import { useDispatch, useSelector } from 'react-redux'
import {fetchQuotes, getLastQuote, getRandomFavorite} from '../../features/quotesSlice'
import { fetchAuthorInfo } from '../../features/authorInfoSlice'
import { addToFavorites, removeFromFavorites } from '../../features/favoritesSlice'
import { addQuote, removeLastQuote, clear } from '../../features/previousQSlice'


const Container = () => {
    // local states
    const [show, setShow] = useState(false);
    const [fade, setFade] = useState(false);
    const [currQuote, setCurrQuote] = useState({});

    // global states
    const {quotesList, status, color} = useSelector(state => state.quotes);
    const {category, order} = useSelector(state => state.filters);
    const myFavorites = useSelector(state => state.favorites);
    const prevQuotes = useSelector(state => state.previousQuotes);

    const dispatch = useDispatch();

    // 
    const FLEX_CENTERED = 'd-flex align-items-center justify-content-center';
    const FADE_SHOW = `fade ${fade ? 'show' : ''}`;

    const isFavorited = myFavorites.some(
        obj => obj.quote == currQuote.quote
    );

    function delayedQuote(){
        setFade(false);
        setShow(false);
        setTimeout(()=>{
            setCurrQuote(quotesList);
            setFade(true);
        }, 1000);
    }

    // get the next quotes based on filters
    function handleNextQuote(){
        if(order == 'Favorites'){
            dispatch(getRandomFavorite({
                listOfQuotes: myFavorites, category}
            ));
            delayedQuote();
        }else{
            dispatch(fetchQuotes({
                category, author: order
            }));
        }
    }

    function handleFavoriteClick(){
        !myFavorites.some(obj => obj.quote == currQuote.quote)
            ? dispatch(addToFavorites(currQuote))
            : dispatch(removeFromFavorites(currQuote.quote))
    }

    function handleAuthorClick(){
        if(currQuote.author){
            dispatch(fetchAuthorInfo(quotesList.author))
            setShow(state => !state)
        }
    }

    // useEffects
    useEffect(()=>{
        dispatch(clear());
        handleNextQuote();
    },[category, order]);

    useEffect(()=>{
        if(status == 'succeeded'){
            delayedQuote();
            return () =>
                clearTimeout(delayedQuote());
        }
    }, [status, quotesList]);
    
    // render
    return (
        <div 
            id="container" 
            className={`flex-grow-1 ${FLEX_CENTERED}`}
        >
            <div
                id="quote-box"
                style={{
                    backgroundColor: color, 
                    transition:'background-color 3s ease'
                }}
                className = {`
                    ${FLEX_CENTERED} flex-column 
                    rounded-3
                    position-relative
                `}
            >
                
                <ChangeQuote
                    visible={prevQuotes.length ? false : true}
                    callback={()=>{
                        dispatch(getLastQuote(prevQuotes))
                        dispatch(removeLastQuote());
                        delayedQuote();
                    }} 
                    direction="left"
                />

                <h3 
                    id="text" 
                    className={`text-center ${FADE_SHOW}`}
                >
                    <span className="bi bi-quote me-2"></span> 
                    {currQuote.quote}
                    
                </h3>
                <div 
                    className ="
                        w-100 d-flex 
                        justify-content-between 
                        align-items-center
                    "
                >
                    <i
                        id="favorite-icon"
                        style={{
                            opacity:`${
                                currQuote.quote ? '1' : '0'
                            }`, 
                            visibility:`${
                                currQuote.quote ? 'visible': 'hidden'
                            }`
                        }}
                        role="button"
                        onClick={handleFavoriteClick}
                        title={`${isFavorited ? "Remove from" : "Add to"} Favorites`}
                        className={`
                            ${FADE_SHOW}
                            bi bi-bookmark${isFavorited ? '-fill' : ''}
                        `}
                    >
                    </i>
                    <p
                        id="author" role="button"
                        title={`Click to ${show ? "hide" : "check"} bio`}
                        className={`mt-3 ${FADE_SHOW}`}
                        onClick={handleAuthorClick}
                    >
                        {'- '+currQuote.author}
                    </p>
                    <BioCard show={show} author={currQuote.author}/>
                </div>
                
                <ChangeQuote
                    id="new-quote" direction="right"
                    visible={currQuote.quote ? false : true}
                    callback={()=>{
                        handleNextQuote();
                        if(currQuote.quote){ 
                            dispatch(addQuote(currQuote));
                        }
                    }}
                />
                <Share text={`
                    "${currQuote.quote}"${currQuote.author}
                `}/>
            </div>
        </div>
        
    )
}

export default Container;
