import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { Ct, T } from '../assets/images/Images.js'
import { useAppContext } from '../context/appContext.jsx';
import Nav from '../components/Nav'

const Home = () => {
  const { selectTeamT, selectTeamCT } = useAppContext()


  return (
      <div className='under-color'>
        <div className='main-color'>
          <Wrapper>
            <div className='main'>
              <Nav />
              <div className='heading-text'>
                <H1>Starting Side</H1>
              </div>
                <div className='grid-container'>
                  <Link className='ct' to='/map' onClick={selectTeamCT}>
                    <img  className='ct-img'src={Ct} alt='CT Logo' />
                  </Link>
                  <Link className='t' to='/map'  onClick={selectTeamT}  >
                    <img  className='t-img'src={T} alt='T Logo'/>
                  </Link>
                </div>
              </div>
          </Wrapper>
        </div>
      </div>

    

  );
};





const Wrapper = styled.div`



  .main {
    height: 100vh;
    width: 100vw;
    margin: 0;
  }

  .heading-text {
    text-align: center;
    font-size: 60px;
    font-family: var(--main-font);
    color: #D3D3D3;
    text-shadow: 4px 4px black;

  }

  .grid-container {
    display: grid;
    justify-content: center;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 25px;
    grid-template-columns: 1fr;
    grid-template-rows: 2fr;
    padding: 3rem;
    gap: 40px;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      min-height: 550px;
      max-height: 550px;
      min-width: 550px;
      max-width: 1150px;
    }
  }

  .ct,
  .t {
    background: linear-gradient(#697e92, #3e444b);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    margin: 10px;
    box-shadow: 0px 5px 20px black;

    @media (min-width: 768px) {
      margin: 0;
    }
  }

  .t {
    background: linear-gradient(#b8a872, #434037);
  }

  .ct:hover,
  .t:hover {
    transform: scale(1.05);
  }

  .ct-img,
  .t-img {

    border-radius: 80px;
    box-shadow: 0px 5px 20px black;

  }

  button {
    border: 0px;
  }
`;

const H1 = styled.h1`
  text-align: center;
  font-size: 60px;
  font-family: var(--main-font);
`;

export default Home;
