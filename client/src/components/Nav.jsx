
import styled from 'styled-components'
import Logo from '../assets/images/logo.png'
import { Link } from 'react-router-dom'



const Wrapper = styled.nav `
  .container
  {
    width: 100vw;
    display: flex;
    align-items:center;
    justify-content: center;
    padding: 0;
  }


 img{
    width:650px;

 }
`

const NavBar = () => {
  return (
    
    <Wrapper>

                <nav className='container'>
                    <Link to='/' className='container' draggable="false">
                      <img draggable="false" src={Logo} alt='logo'/>
                    </Link>

                    
                </nav>

    </Wrapper>

  )
}

export default NavBar