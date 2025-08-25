import React from 'react'
import { useSelector } from 'react-redux'

const ShareLinks = (props) => {
    return (
        <a
            style={{transition: 'transform .5s ease'}}
            title={props.icon}
            id={`${props.type}-quote`}
            href={`https://${props.link}`}
            target="_blank"
            rel="noopener"
        >
            <i className={`bi bi-${props.icon} ${props.color}`}></i>
        </a>
    )
}

const Share = (props) => {
    
    const {color} = useSelector(state => state.quotes);
    const encoded = encodeURIComponent(props.text);

    return (
        <div 
            style={{
                bottom:'-3rem', 
                color: color, 
                transition:'color 3s ease'
            }}
            className='
                align-content-center 
                d-flex justify-content-center 
                gap-4 position-absolute
            '
        >
            <strong>Share on : </strong>
            <div className="d-flex justify-content-around gap-3">
                <ShareLinks 
                    type="tweet" icon="twitter-x" color="text-dark" 
                    link={`twitter.com/intent/tweet?hashtags=quotes&text=${encoded}`}
                />
                <ShareLinks 
                    type="mastodon" icon="mastodon"
                    link={`mastodon.social/share?text=${encoded}`}
                />
                <ShareLinks 
                    type="blueSky" icon="bluesky" color="text-primary"
                    link={`bsky.app/intent/compose?text=${encoded}`}
                />
            </div>
        </div>
    )
}

export default Share
