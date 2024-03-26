import React, { useState } from 'react'

export default function MaterialInWall() {

    const [length, setLength] = useState('');
    const [breadth, setBreadth] = useState('');
    const [height, setHeight] = useState('');
    const [numberOfBricks, setNumberOfBricks] = useState(null);
    const [quaOfCementInMo, setquaOfCementInMo] = useState(null);
    const [quaOfSandInMo, setquaOfSandInMo] = useState(null);

  const [showresult, setShowresult] = useState(false);

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
        setquaOfSandInMo(parseFloat(fullSand.toFixed(3), 10));
        // setquaOfSandInMo(fullSand);

        setShowresult(true)

    };

    return (
        <div className='p-4'>

            <div align="center"  >
                <figure className="figure" >
                    {/* <img src={pic} className="bg-opacity-25 figure-img img-fluid rounded" alt="..." /> */}
                    <figcaption className="figure-caption" >
                        <div className='  p-2 my-4 text-primary-emphasis bg-table-info bg-light border border-primary rounded-3' >
                            <h2 className='p-2' align='center'>Calculation of Number of Bricks</h2>

                            <form className='align-center'  >
                                <div className="row mb-3">
                                    <div className='col-sm-2'></div>
                                    <label htmlFor="inputEmail3" className="col-sm-3 fs-5 col-form-label">Wall Name:</label>
                                    <div className="col-sm-5">
                                        <input type="text" className="form-control" id="length" placeholder="Enter W1,W2,....." />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className='col-sm-2'></div>
                                    <label htmlFor="inputEmail3" className="col-sm-3 fs-5 col-form-label">Length:</label>
                                    <div className="col-sm-5">
                                        {/* <input type="number" className="form-control" id="length" placeholder="Enter in Meter" value={material.length} onChange={(e) => change(e)} required /> */}
                                        <input type="number" className="form-control" id="length"
                                            inputMode="decimal"
                                            placeholder="Enter Length of the Wall in meter"
                                            value={length}
                                            onChange={(e) => setLength(e.target.value)}
                                            required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className='col-sm-2'></div>
                                    <label htmlFor="inputEmail3" className="col-sm-3 fs-5 col-form-label">Breadth:</label>
                                    <div className="col-sm-5">
                                        {/* <input type="number" className="form-control" id="length" placeholder="Enter in Meter" value={material.length} onChange={(e) => change(e)} required /> */}
                                        <input type="number" className="form-control"
                                            inputMode="decimal"
                                            placeholder="Enter Breadth of the Wall in meter"
                                            value={breadth}
                                            onChange={(e) => setBreadth(e.target.value)}
                                            required />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className='col-sm-2'></div>
                                    <label htmlFor="inputEmail3" className="col-sm-3 fs-5 col-form-label">Thickness:</label>
                                    <div className="col-sm-5">
                                        {/* <input type="number" className="form-control" id="length" placeholder="Enter in Meter" value={material.length} onChange={(e) => change(e)} required /> */}
                                        <input type="number" className="form-control"
                                            inputMode="decimal"
                                            placeholder="Enter Height of the Wall in meter"
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                            required />
                                    </div>
                                </div>

                                <div align='center' className="align-content-center">
                                    <button type="submit" className="btn btn-outline-primary fw-bolder p-2 border-2    fs-5" onClick={calculateBricks}>Calculate Material Needed</button>
                                    {showresult && (
                                        <div id="textField" className='fs-4' >
                                            <div className='fs-4 mt-2'>
                                                <p>No. of Bricks needed: {numberOfBricks !== null ? numberOfBricks : ''}</p>
                                                <p>No. of Cement bags: {quaOfCementInMo !== null ? quaOfCementInMo : ''}</p>
                                                <p>Volume of Sand (Cubic feet): {quaOfSandInMo !== null ? quaOfSandInMo : ''} ({quaOfSandInMo / 100} brass)</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </figcaption>
                </figure>
            </div>


            
        </div>
        // </div >
    )
}



