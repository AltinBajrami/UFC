import React from 'react'
import styled from 'styled-components'
import Hero from '../components/Hero'
import YouTubeVideo from '../components/YouTubeVideo'

const Landing = () => {
    return <Wrapper>
        <Hero />
        <YouTubeVideo videoId={'0OswAJOEXn8'} title={'UFC History'} />
    </Wrapper>
}

const Wrapper = styled.section`
 
`

export default Landing