import React, { useState } from 'react'

export default function MaterialInWall() {

    const [length, setLength] = useState('');
    const [breadth, setBreadth] = useState('');
    const [height, setHeight] = useState('');
    const [numberOfBricks, setNumberOfBricks] = useState(null);
    const [quaOfCementInMo, setquaOfCementInMo] = useState(null);
    const [quaOfSandInMo, setquaOfSandInMo] = useState(null);

    const calculateBricks = (e) => {
        e.preventDefault();
        const volume = length * breadth * height;
        // Assuming standard brick dimensions
        const brickVolume = 0.2 * 0.1 * 0.1; // Length * Breadth * Height of a brick
        const bricksNeeded = Math.ceil(volume / brickVolume);
        setNumberOfBricks(bricksNeeded);
        console.log(numberOfBricks);
        const wet_volume = (volume * 35.3147) - (bricksNeeded * 0.05434);
        const total_ratio = 1 + 3;   //ratio for motar
        const dry_volume = wet_volume * 1.54;   //conversion from wet vol to dry vol constant is 1.54
        const volumeOfCement = (1 / total_ratio) * dry_volume;

        const volumeOfSand = (3 / total_ratio) * dry_volume;

        //for plastering

        const wet_vol = length * breadth * 0.0127;
        const dry_vol = (wet_vol * 35.3147) * 1.33;
        const tot_ratio = 1 + 5; // ratio of plaster
        const cement_req = (1 / tot_ratio) * dry_vol;
        const fullCement = volumeOfCement + cement_req;
        const noOfbags = Math.ceil(fullCement / 1.25);
        setquaOfCementInMo(noOfbags);
        const sand_req = (5 / tot_ratio) * dry_vol;
        const fullSand = volumeOfSand + sand_req;
        setquaOfSandInMo(fullSand);

    };

    return (
        <div>
            <div className='p-5'>
            <h2>Material Needed for Wall</h2>
                <form onSubmit={calculateBricks}>
                    <div class="row mb-3">
                        <label for="inputEmail3" class="col-sm-2 col-form-label">Length :</label>
                        <div class="col-sm-4">
                            <input type="number" class="form-control" id="length"
                                inputMode="decimal"
                                placeholder="Enter Length of the Wall in meter"
                                value={length}
                                onChange={(e) => setLength(e.target.value)}
                                required />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputEmail3" class="col-sm-2 col-form-label">Bredth :</label>
                        <div class="col-sm-4">
                            <input type="number" class="form-control"
                                inputMode="decimal"
                                placeholder="Enter Breadth of the Wall in meter"
                                value={breadth}
                                onChange={(e) => setBreadth(e.target.value)}
                                required />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputEmail3" class="col-sm-2 col-form-label">Thickness :</label>
                        <div class="col-sm-4">
                            <input type="number" class="form-control"
                                inputMode="decimal"
                                placeholder="Enter Height of the Wall in meter"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                required />
                        </div>
                    </div>


                     
                        {/* <input type="submit" value="Calculate No. of Bricks" /> */}
                    <button type="submit" class="btn btn-primary "  >Calculate Material Needed</button>
                  

                    <div className='fs-4 mt-2'>
                        <p>No. of Bricks needed: {numberOfBricks !== null ? numberOfBricks : ''}</p>
                        <p>No. of Cement bags: {quaOfCementInMo !== null ? quaOfCementInMo : ''}</p>
                        <p>Volume of Sand (Cubic feet): {quaOfSandInMo !== null ? quaOfSandInMo : ''} ({quaOfSandInMo / 100} brass)</p>
                    </div>
{/* 
                    <div className='fs-3'>
                        <p>Number of Cement Bags Needed are : {No_of_cement_bags}</p>
                        <p>Sand Needed is : {Vol_of_sand} Cubic feet ({Vol_of_sand / 100} brass)</p>
                        <p>Aggregate Needed is : {Vol_of_Aggregate} Cubic feet ({Vol_of_Aggregate / 100} brass)</p>
                        <p>Steel/Bars Needed is : {total_bars}  kg</p>
                    </div> */}
                </form>
            </div>
        </div>
    )
}



// import React, { useState } from 'react';
// import './CalBricks.css';

// const CalBricks = () => {
//     const [length, setLength] = useState('');
//     const [breadth, setBreadth] = useState('');
//     const [height, setHeight] = useState('');
//     const [numberOfBricks, setNumberOfBricks] = useState(null);
//     const [quaOfCementInMo, setquaOfCementInMo] = useState(null);
//     const [quaOfSandInMo, setquaOfSandInMo] = useState(null);

//     const calculateBricks = (e) => {
//         e.preventDefault();
//         const volume = length * breadth * height;
//         // Assuming standard brick dimensions
//         const brickVolume = 0.2 * 0.1 * 0.1; // Length * Breadth * Height of a brick
//         const bricksNeeded = Math.ceil(volume / brickVolume);
//         setNumberOfBricks(bricksNeeded);

//         const wet_volume = (volume * 35.3147) - (bricksNeeded * 0.05434);
//         const total_ratio = 1 + 3;   //ratio for motar
//         const dry_volume = wet_volume * 1.33;
//         const volumeOfCement = (1 / total_ratio) * dry_volume;

//         const volumeOfSand = (3 / total_ratio) * dry_volume;

//         //for plastering

//         const wet_vol = length * breadth * 0.0127;
//         const dry_vol = (wet_vol * 35.3147) * 1.33;
//         const tot_ratio = 1 + 5; // ratio of plaster
//         const cement_req = (1 / tot_ratio) * dry_vol;
//         const fullCement = volumeOfCement + cement_req;
//         const noOfbags = Math.ceil(fullCement / 1.25);
//         setquaOfCementInMo(noOfbags);
//         const sand_req = (5 / tot_ratio) * dry_vol;
//         const fullSand = volumeOfSand + sand_req;
//         setquaOfSandInMo(fullSand);

//     };

//     return (
//         <div className='sggs'>
//             <div className="wrapper">
//                 <h2>Material Needed for Wall</h2>
//                 <form onSubmit={calculateBricks}>
//                     <div className="input-box">
//                         <input
//                             type="number"
//                             inputMode="decimal"
//                             placeholder="Enter Length of the Wall in meter"
//                             value={length}
//                             onChange={(e) => setLength(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="input-box">
//                         <input
//                             type="number"
//                             inputMode="decimal"
//                             placeholder="Enter Breadth of the Wall in meter"
//                             value={breadth}
//                             onChange={(e) => setBreadth(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="input-box">
//                         <input
//                             type="number"
//                             inputMode="decimal"
//                             placeholder="Enter Height of the Wall in meter"
//                             value={height}
//                             onChange={(e) => setHeight(e.target.value)}
//                             required
//                         />
//                     </div>

//                     <div className="input-box button">
//                         <input type="submit" value="Calculate No. of Bricks" />
//                     </div>

//                     <div>
//                         <p>No. of Bricks needed: {numberOfBricks !== null ? numberOfBricks : ''}</p>
//                         <p>No. of Cement bags: {quaOfCementInMo !== null ? quaOfCementInMo : ''}</p>
//                         <p>Volume of Sand (Cubic feet): {quaOfSandInMo !== null ? quaOfSandInMo : ''} ({quaOfSandInMo / 100} Baras)</p>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CalBricks;