import styled from 'styled-components';
import { Ancient, Dust, Anubis, inferno, nuke, overpass, mirage, train, office, vertigo } from '../assets/images/Images.js';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext.jsx';
import Nav from '../components/Nav'

const Maps = () => {

  const { 
    dust_,
    ancient_,
    anubis_,
    inferno_,
    nuke_,
    office_,
    overpass_,
    mirage_, 
    train_,
    vertigo_,
  } = useAppContext()

  return (
    <Color>
        <div className='under-color'>
          <div className='main-color'>
            <Nav />
            <Wrapper>
              <main>
                <div>
                  <h2>Select A Map</h2>
                </div>
                <div className='grid-container'>
                  <div className='1'>
                    {/* Wrap all the images with a common Link to the /Strat route */}
                    <Link to="/Strat" onClick={dust_} draggable="false">
                      <img draggable="false" src={Dust} alt="Dust" />
                    </Link>
                  </div>
                  <div className='2'>
                    <Link to="/Strat" onClick={ancient_} draggable="false">
                      <img draggable="false" src={Ancient} alt="Ancient" />
                    </Link>
                  </div>
                  <div className='3'>
                    <Link to="/Strat" onClick={anubis_} draggable="false">
                      <img draggable="false" src={Anubis} alt="Anubis" />
                    </Link>
                  </div>
                  <div className='4'>
                    <Link to="/Strat" onClick={inferno_} draggable="false">
                      <img draggable="false" src={inferno} alt="Inferno" />
                    </Link>
                  </div>
                  <div className='5'>
                    <Link to="/Strat" onClick={nuke_}draggable="false" >
                      <img draggable="false" src={nuke} alt="Nuke" />
                    </Link>
                  </div>
                  <div className='6'>
                    <Link to="/Strat" onClick={office_} draggable="false" >
                      <img draggable="false" src={office} alt="Office" />
                    </Link>
                  </div>
                  <div className='7'>
                    <Link to="/Strat" onClick={overpass_} draggable="false" >
                      <img draggable="false" src={overpass} alt="Overpass" />
                    </Link>
                  </div>
                  <div className='8'>
                    <Link to="/Strat" onClick={mirage_} draggable="false" >
                      <img draggable="false" src={mirage} alt="Mirage" />
                    </Link>
                  </div>
                  <div className='9'>
                    <Link to="/Strat" onClick={train_} draggable="false" >
                      <img draggable="false" src={train} alt="Train" />
                    </Link>
                  </div>
                  <div className='10'>
                    <Link to="/Strat" onClick={vertigo_} draggable="false">
                      <img draggable="false" src={vertigo} alt="Vertigo" />
                    </Link>
                  </div>
                </div>
              </main>
            </Wrapper>
          </div>
        </div>
      </Color>
  )
}
const Color = styled.div`

.under-color {
    background-color: #FF4C29;
    width: 100vw;
    height: 100vh;
  }

.main-color{
  position: absolute;
  width: calc(100vw - 10px);
  height: calc(100vh - 10px);
  background: linear-gradient(#3c4c5a, #0a1924);
  inset:0px 10px;
}

`
const Wrapper = styled.div`

.under-color {
    background-color: #FF4C29;
    width: 100vw;
    height: 100vh;
  }

.main-color{
  position: absolute;
  width: calc(100vw - 10px);
  height: calc(100vh - 10px);
  inset:0px 10px;
}

  main{
    height: calc(100vh - 200px);
    overflow-y: hidden;


  }
  div {
    font-family: var(--main-font);
    align-items: center;
    width: 100%;
    
  }

  h2 {
    text-align: center;
    font-size: 60px;
    font-family: var(--main-font);
    color: white;
    text-shadow: 2px 5px 2px black;
  }

  img {
    height: 250px;
    width: 250px;
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    user-select: none;
    border-radius: 80px;
    padding: 10px;
    margin-top: 50px;

    
 
  }

  img:hover {
    transform: scale(1.10);
  }

  .grid-container {
    display: grid;
    justify-content: center;
    height: calc(100vh - 400px);
    width: 100vw;
    grid-template-columns: repeat(5, 250px);
    grid-template-rows: minmax(250px, auto);
    gap: 40px;
    
  }
`

export default Maps
