import React, { useState } from 'react'

export default function MaterialInColumn() {

    const [material, setMaterial] = useState({
        length: "",
        breadth: "",
        height: "",
        diameter: "",
        stdiameter: "",
        lbars: ""
    })


    const [No_of_cement_bags, setNo_of_cement_bags] = useState("");
    const [Vol_of_sand, setVol_of_sand] = useState("");
    const [Vol_of_Aggregate, setVol_of_Aggregate] = useState("");
    const [longitudinalBarWeight, setLongitudinalBarWeight] = useState("");
    const [stirrupsWeight, setStirrupsWeight] = useState("");

    const submit = (e) => {

        e.preventDefault();
        console.log(material.length);
        console.log(material.breadth);
        console.log(material.height);

        const wet_vol = material.length * material.breadth * material.height;
        // console.log(wet_vol);
        const dry_vol = wet_vol * 1.54;
        const total_ratio = 1 + 1.5 + 3;  //ratio 1 : 1.5 : 3
        const vol_cement = (1 / total_ratio) * dry_vol;
        setNo_of_cement_bags(Math.ceil(vol_cement / 1.25));  // volumne of each cement bag in cubic feet is 1.25

        const vol_sand = (1.5 / total_ratio) * dry_vol;
        setVol_of_sand(Math.ceil(vol_sand));


        const vol_Aggregate = (3 / total_ratio) * dry_vol;
        setVol_of_Aggregate(Math.ceil(vol_Aggregate));

        // const No_of_mb = (material.length/0.15) + 1;   //For Main Bars we use spacing as 0.984 feet (0.984 feet = 300 mm)
        // const No_of_db = (material.breadth/0.15) + 1;   //For Distributed Bars we use spacing as 1.476 feet (1.476 feet = 450 mm)
        // const total_len_bars = (material.breadth*No_of_mb) + (material.length*No_of_db); //calculate total length for both main bars and distributed bars
        // console.log("total length",total_len_bars);
        // const weight = ((material.diameter * material.diameter) * total_len_bars) / 162;   //((D^2) x total length of bars)/162 -----Diameter(D) is in mm
        // settotal_bars(weight);

        // Calculate Variables a and b
        const a = material.length - 2 * 0.040 - material.stdiameter;
        const b = material.breadth - 2 * 0.040 - material.stdiameter;

        // Calculate Length of Longitudinal Bars
        // const longitudinalBarLength = (2 * (9 * diameter))+height;
        const longitudinalBarLength = 2 * (9 * material.diameter) + parseFloat(material.height);
        // Calculate Total Length of Longitudinal Bars
        const totalLongitudinalBarLength = material.lbars * longitudinalBarLength;
        console.log("len ", totalLongitudinalBarLength);
        // Calculate Weight of Longitudinal Bars
        const longitudinalBarWeight = (material.diameter * 1000 * material.diameter * 1000 * totalLongitudinalBarLength) / 162;
        setLongitudinalBarWeight(longitudinalBarWeight);

        // Calculate Length of Stirrups
        const stirrupsLength = 2 * (a + b) + 2 * 9 * material.stdiameter;

        // Calculate No. of Stirrups
        const numStirrups = material.height / 0.150;

        // Calculate Total Length of Stirrups
        const totalStirrupsLength = numStirrups * stirrupsLength;

        // Calculate Weight of Stirrups
        const stirrupsWeight = (material.stdiameter * 1000 * material.stdiameter * 1000 * totalStirrupsLength) / 162;
        setStirrupsWeight(stirrupsWeight);
    }

    const change = e => {
        const newdata = { ...material }
        newdata[e.target.id] = e.target.value
        setMaterial(newdata)
    }

    return (
        <div className='p-4'>
            <h2 className='p-2'>Material Needed for Beam</h2>
            <form>
                <div class="row mb-3">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Length :</label>
                    <div class="col-sm-4">
                        <input type="number" class="form-control" id="length" placeholder="Enter in Meter" value={material.length} onChange={(e) => change(e)} />
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Breadth :</label>
                    <div class="col-sm-4">
                        <input type="number" class="form-control" id="breadth" placeholder="Enter in Meter" value={material.breadth} onChange={(e) => change(e)} />
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Height :</label>
                    <div class="col-sm-4">
                        <input type="number" class="form-control" id="height" placeholder="Enter in Meter" value={material.height} onChange={(e) => change(e)} />
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Diameter of Long Bars :</label>
                    <div class="col-sm-4">
                        <input type="number" class="form-control" id="diameter" placeholder="Enter in MM" value={material.diameter} onChange={(e) => change(e)} />
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Diameter of Stirrups Bars :</label>
                    <div class="col-sm-4">
                        <input type="number" class="form-control" id="stdiameter" placeholder="Enter in MM" value={material.stdiameter} onChange={(e) => change(e)} />
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">No. of Long Bars :</label>
                    <div class="col-sm-4">
                        <input type="number" class="form-control" id="lbars" placeholder="Enter in MM" value={material.lbars} onChange={(e) => change(e)} />
                    </div>
                </div>



                <button type="submit" class="btn btn-primary" onClick={submit}>Calculate Material Needed</button>
                <div className='fs-4'>
                    <p>Number of Cement Bags Needed are : {No_of_cement_bags}</p>
                    <p>Sand Needed is : {Vol_of_sand} Cubic feet ({Vol_of_sand / 100} brass)</p>
                    <p>Aggregate Needed is : {Vol_of_Aggregate} Cubic feet ({Vol_of_Aggregate / 100} brass)</p>
                    <p>Weight of Longitudinal Bars (kg): {longitudinalBarWeight}</p>
                    <p>Weight of Stirrups (kg): {stirrupsWeight}</p>
                </div>
            </form>
        </div>
    )
}