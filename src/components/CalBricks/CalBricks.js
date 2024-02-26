// import React from 'react'
// import './CalBricks.css'
// const CalBricks = () => {
//   return (
//     <div>
//          <div class="wrapper">
//     <h2>Calculation of Number of Bricks</h2>
//     <form action="#">
//       <div class="input-box">
//         <input type="number" inputmode="decimal" placeholder="Enter Length of the Wall" required/>
//       </div>
//       <div class="input-box">
//         <input type="number" inputmode="decimal" placeholder="Enter Bredth of the Wall" required/>
//       </div>
//       <div class="input-box">
//         <input type="number" inputmode="decimal" placeholder="Enter Height of the Wall" required/>
//       </div>
       
//       <div class="input-box button">
//         <input type="Submit" value="Calculate No. of Bricks"/>
//       </div>

//       <div>
//         <p>No. of Bricks is : {}</p>
//       </div>
//     </form>
//   </div>
//     </div>
//   )
// }

// export default CalBricks


import React, { useState } from 'react';
import './CalBricks.css';

const CalBricks = () => {
  const [length, setLength] = useState('');
  const [breadth, setBreadth] = useState('');
  const [height, setHeight] = useState('');
  const [numberOfBricks, setNumberOfBricks] = useState(null);

  const calculateBricks = (e) => {
    e.preventDefault();
    const volume = length * breadth * height;
    // Assuming standard brick dimensions
    const brickVolume = 0.2 * 0.1 * 0.1; // Length * Breadth * Height of a brick
    const bricksNeeded = Math.ceil(volume / brickVolume);
    setNumberOfBricks(bricksNeeded);
  };

  return (
    <div className='sggs'>
      <div className="wrapper">
        <h2>Calculation of Number of Bricks</h2>
        <form onSubmit={calculateBricks}>
          <div className="input-box">
            <input
              type="number"
              inputMode="decimal"
              placeholder="Enter Length of the Wall"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="number"
              inputMode="decimal"
              placeholder="Enter Breadth of the Wall"
              value={breadth}
              onChange={(e) => setBreadth(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="number"
              inputMode="decimal"
              placeholder="Enter Height of the Wall"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
          </div>
{/* 
          <div className="input-box button">
            <button type="submit">Calculate No. of Bricks</button>
          </div> */}

          <div class="input-box button">
        <input type="Submit" value="Calculate No. of Bricks"/>
       </div>

          <div>
            <h2>No. of Bricks needed: {numberOfBricks !== null ? numberOfBricks : ''}</h2>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CalBricks;