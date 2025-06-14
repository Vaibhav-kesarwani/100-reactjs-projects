import React, { useState } from 'react'
import coinImage from '../assets/coin.jpg'
import './Home.css'

const Home = () => {
  const values = ['Tails', 'Heads']
  const [tails, setTails] = useState(0)
  const [heads, setHeads] = useState(0)

  const [clicked, setClicked] = useState(false)

  const handleFlip = () => {
    setClicked(true)
    const idx = Math.floor(Math.random() * 2)
    if(values[idx] === 'Tails'){
        setTails(tails + 1)
    }
    else{
        setHeads(heads + 1)
    }
  }

  return (
    <div className='main-container'>
        <h2>Welcome to the coin game</h2>
        <img src={coinImage} alt="" />
        <button onClick={handleFlip}>Flip</button>
        {clicked &&
        <h4> Hey you have got {tails} tails and {heads} heads. Hihi</h4>
        }
    </div>
  )
}

export default Home