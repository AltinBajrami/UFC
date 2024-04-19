import React from 'react';
import styled from 'styled-components';


const YouTubeVideo = ({ videoId, title }) => {

    if (!videoId) {
        return null;
    }
    return (
        <Wrapper className="page" style={{ display: 'grid', placeItems: 'center' }}>
            <div className="title">
                <h2 >{title}</h2>
                <div className="title-underline"></div>
            </div>
            <iframe
                width="200"
                height="215"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className='video'

            ></iframe>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: grid;
    gap: 2rem;
    h2{
        letter-spacing: 5px;
        text-transform: uppercase;
    }

    .video{
        transition: var(--transition);
        box-shadow: var(--shadow-4);
    }
    @media (min-width : 450px){
        .video{
            height: 350px;
            width: 350px;
        }
    }
    @media (min-width : 750px){
        .video{
            height: 400px;
            width: 600px;
        }
    }

    @media (min-width : 950px){
        .video{
            height: 400px;
            width: 800px;
        }
    } 
     @media (min-width : 1100px){
        .video{
            width: 1000px;

        }
    }
`

export default YouTubeVideo;
