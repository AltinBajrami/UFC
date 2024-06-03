import React from 'react'
import styled from 'styled-components'
import aboutImg from '../assets/theguy.png'
import ringImg from '../assets/ring.jpg'
const About = () => {
    return (
        <Wrapper>
            <div className="about-container">
                <div className="about-content">
                    <div className="about-image">
                        <img src={aboutImg} alt="About UFC" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div className="about-text">
                            <h2>ABOUT UFC</h2>
                            <p>stands as a premium global sports brand, media content company and the largest Pay-Per-View (PPV) event provider in the world</p>
                        </div>
                    </div>
                    <div className="about-links">
                        <a href="#soprt.html">THE SPORT</a>
                        <a href="#index.html">THE BRAND</a>
                        <a href="#foundation">THE UFC FOUNDATION</a>
                    </div>
                    <div className="about-details">
                        <div className="about-video">
                            <iframe width="170" height="100"
                                src={`https://www.youtube.com/embed/-81YoMl9BlM`} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ width: '100%', height: '50%' }}></iframe>
                        </div>
                        <div className="about-history">
                            <img src={ringImg} alt="History of UFC" style={{ width: '100%', height: '50%' }} />
                            <h3>HISTORY OF UFC</h3>
                            <p>Starting in 1993 as a professional mixed martial arts (MMA) organization, UFC® has revolutionized the fight business and today stands as a premium global sports brand, media content company and the largest Pay-Per-View (PPV) event provider in the world.</p>
                            <button>Read more</button>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
.about-container {
    text-align: center;
    font-family: Arial, sans-serif;
    color: #fff;
}

.about-header h1 {
    font-size: 48px;
    margin: 20px 0;
}

.about-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.about-image {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.about-text {
    position: absolute;
    text-align: center;
}

.about-text h2 {
    font-size: 32px;
    color: #fff;
}

.about-text p {
    font-size: 22px;
    color: #fff;
}

.about-links {
    margin: 20px 0;
    display: flex;
    justify-content: center;
    gap: 20px;
}

.about-links a {
    font-size: 28px;
    color: #1C1C1C;
    text-decoration: none;
}

.about-details {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 20px 0;
}

.about-video iframe {
    width: 170px;
    height: 100px;
}

.about-history {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.about-history img {
    width: 80px;
    height: 60px;
}

.about-history h3 {
    font-size: 28px;
    color: #1C1C1C;
    margin: 10px 0;
}

.about-history p {
    font-size: 18px;
    color: #808080;
    text-align: center;
    max-width: 400px;
}

.about-history button {
    font-size: 20px;
    padding: 10px 20px;
    margin-top: 10px;
    cursor: pointer;
}
`
export default About