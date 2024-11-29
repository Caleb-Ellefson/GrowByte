import React from 'react'
import { NavBar, Strat } from '../components/Index.js'
import styled from 'styled-components'
import { useAllStratsContext } from '../pages/Admin'

const StratContainer = () => {


    //data passed down from loader
   const { data } = useAllStratsContext()
   const { strat } = data

   if (strat.length === 0 ){
    return(
        <Wrapper>
            <NavBar />
            <h2>There are no Strats to display...</h2>
        </Wrapper>
    )
   }
  return (
    <Wrapper>
      <NavBar />
        <div className='jobs'>

            {strat.map((strats)=>{
                return <Strat key={strats._id} {...strats}/>
            })}
        </div>
    </Wrapper>
  )
}


const Wrapper = styled.section`
    
 margin-top: .5rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;

  }
  @media (min-width: 1120px) {
    .jobs {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`

export default StratContainer