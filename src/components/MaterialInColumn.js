import React, { useState } from 'react'

export default function MaterialInColumn() {

  const [material, setMaterial] = useState({
    name:"",
    length: "",
    breadth: "",
    height: "",
    long_dia: "",
    no_long_bar: "",
    stir_dia: "",
    spac_stir: "",
    leg_len: "",
    col_cov: "",
    diameter: ""
  })

  const name = material.name;
  const length = parseFloat(material.length);
  const breadth = parseFloat(material.breadth);
  const height = parseFloat(material.height);
  const long_dia = parseFloat(material.long_dia);
  const no_long_bar = parseFloat(material.no_long_bar);
  const stir_dia = parseFloat(material.stir_dia);
  const spac_stir = parseFloat(material.spac_stir);
  const leg_len = parseFloat(material.leg_len);
  const col_cov = parseFloat(material.col_cov);
  const diameter = parseFloat(material.diameter);

  

  const [No_of_cement_bags, setNo_of_cement_bags] = useState("");
  const [Vol_of_sand, setVol_of_sand] = useState("");
  const [Vol_of_Aggregate, setVol_of_Aggregate] = useState("");
  const [longitudinalBarWeight, setLongitudinalBarWeight] = useState("");
  const [stirrupsWeight, setStirrupsWeight] = useState("");

  const [showresult, setShowresult] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const submit = (e) => {

    e.preventDefault();





    // Calculation of Steel
    if (selectedOption === "circular") {

      const wet_vol = (3.14 * diameter * diameter * height) / 4;
      // console.log(wet_vol);
      const dry_vol = wet_vol * 1.54;
      const total_ratio = 1 + 1.5 + 3;  //ratio 1 : 1.5 : 3
      const vol_cement = (1 / total_ratio) * dry_vol;
      setNo_of_cement_bags(Math.ceil(vol_cement / 0.03539));  // volumne of each cement bag in cubic feet is 1.25

      const vol_sand = (1.5 / total_ratio) * dry_vol;
      setVol_of_sand(parseFloat(vol_sand.toFixed(3), 10));


      const vol_Aggregate = (3 / total_ratio) * dry_vol;
      setVol_of_Aggregate(parseFloat(vol_Aggregate.toFixed(3), 10));

      const len_long_bar = height + leg_len;
      const total_len_long_bar = no_long_bar * len_long_bar;
      const wei_long_bar = (total_len_long_bar * long_dia * long_dia) / 162.2;

      const dia_ring = diameter - 2 * col_cov;
      const len_one_ring = (2 * 3.14 * (dia_ring / 2)) + 2 * 10 * (stir_dia / 1000) - 2 * 2 * (stir_dia / 1000);
      const total_no_of_rings = height / spac_stir + 1;
      const total_len_ring = total_no_of_rings * len_one_ring;
      const wei_ring_bar = (total_len_ring * stir_dia * stir_dia) / 162.2;
      setLongitudinalBarWeight(parseFloat(wei_long_bar.toFixed(3), 10));
      setStirrupsWeight(parseFloat(wei_ring_bar.toFixed(3), 10));


    }
    else {

      const wet_vol = length * breadth * height;
      // console.log(wet_vol);
      const dry_vol = wet_vol * 1.54;
      const total_ratio = 1 + 1.5 + 3;  //ratio 1 : 1.5 : 3
      const vol_cement = (1 / total_ratio) * dry_vol;
      setNo_of_cement_bags(Math.ceil(vol_cement / 0.03539));  // volumne of each cement bag in cubic feet is 1.25

      const vol_sand = (1.5 / total_ratio) * dry_vol;
      setVol_of_sand(parseFloat(vol_sand.toFixed(3), 10));


      const vol_Aggregate = (3 / total_ratio) * dry_vol;
      setVol_of_Aggregate(parseFloat(vol_Aggregate.toFixed(3), 10));


      const len_one_bar = height + leg_len;
      const total_len_long_bar = no_long_bar * len_one_bar;
      const len_one_ring = (((length + breadth) - (4 * col_cov)) * 2) + (2 * 0.075); //Hock length is 0.075 m
      console.log(len_one_ring);
      console.log(((length + breadth) - (4 * col_cov)));
      const total_no_of_rings = height / spac_stir;
      const total_len_ring = total_no_of_rings * len_one_ring;

      const wei_long_bar = (total_len_long_bar * long_dia * long_dia) / 162.2;
      const wei_ring_bar = (total_len_ring * stir_dia * stir_dia) / 162.2;

      setLongitudinalBarWeight(parseFloat(wei_long_bar.toFixed(3), 10));
      setStirrupsWeight(parseFloat(wei_ring_bar.toFixed(3), 10));

    }



    setShowresult(true)


  }

  const change = e => {
    const newdata = { ...material }
    newdata[e.target.id] = e.target.value
    setMaterial(newdata)
  }

  const [tcement, setTcement] = useState(0);
  const [tsand, setTsand] = useState(0);
  const [taggregate, setTaggregate] = useState(0);
  const [tlongsteel, setTlongsteel] = useState(0);
  const [tstirsteel, setTstirsteel] = useState(0);
  const [posts, setPosts] = useState([]);
  // State to store the Map
  const [myMap, setMyMap] = useState(new Map());

  const addTask = () => {

    console.log("addtask invoked")
    setTcement(tcement + No_of_cement_bags);
    setTsand(tsand + Vol_of_sand);
    setTaggregate(taggregate + Vol_of_Aggregate);
    setTlongsteel(tlongsteel + longitudinalBarWeight);
    setTstirsteel(tstirsteel + stirrupsWeight);
    setPosts([...posts, {
      name: name, length: length, breadth: breadth, height: height, cement: No_of_cement_bags, sand: Vol_of_sand, aggregate: Vol_of_Aggregate, longsteel: longitudinalBarWeight, stirsteel: stirrupsWeight
    }]);

    // Check if the same main_dia exists
    if (myMap.has(long_dia)) {
      myMap.set(long_dia, myMap.get(long_dia) + longitudinalBarWeight);
    } else {
      myMap.set(long_dia, longitudinalBarWeight);
    }

    setMyMap(myMap);

    // Check if the same dist_dia exists
    if (myMap.has(stir_dia)) {
      myMap.set(stir_dia, myMap.get(stir_dia) + stirrupsWeight);
    } else {
      myMap.set(stir_dia, stirrupsWeight);
    }
    // Update the state with the new Map
    setMyMap(myMap);

    console.log("here is the map values");
    console.log(myMap)
  };



  const Print = () => {
    console.log('print');
    const printContents = document.getElementById('printablediv').innerHTML;


    // // Create a new window for printing
    let printWindow = window.open('', '_blank');

    // Set the content of the new window to the printable content
    // printWindow.document.write('<html><head><title>Jain & Associates</title></head><body>');
    printWindow.document.body.innerHTML = printContents;
    // printWindow.document.write(printContents);
    // printWindow.document.write('</body></html>');

    // Print the contents
    printWindow.print();

    // Close the new window
    printWindow.close();

    // let originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents;
    // // let printWindow = window.open('', '_blank');
    // // printWindow.document.body.innerHTML = printContents ;
    // // printWindow.document.body.write(printContents);
    // // printWindow.print();
    // window.print();
    // document.body.innerHTML = originalContents;

    
  }




  return (
    // <div className='p-4'>

    <div align="center"  >
      <figure className="figure" >
        {/* <img src={pic} className="bg-opacity-25 figure-img img-fluid rounded" alt="..." /> */}
        <figcaption className="figure-caption" >
          <div className='  p-2 my-4 text-primary-emphasis bg-light border border-primary rounded-3' >
            <h2 className='p-2' align='center'>Material Needed for Column</h2>
            <form className='align-center'  >
              <div className="row mb-3">
                <div className='col-sm-2'></div>
                <label htmlFor="inputEmail3" className="col-sm-3 fs-5 col-form-label">Column Name:</label>
                <div className="col-sm-5">
                  <input type="text" className="form-control" id="name" placeholder="Enter C1,C2,....." value={material.name} onChange={(e) => change(e)} required/>
                </div>
              </div>
              <div className="input-group row mb-3">
                <div className='col-sm-2'></div>
                {/* <div className="input-group-prepend"> */}
                <label className="col-sm-3 fs-5 col-form-label" htmlFor="inputGroupSelect01">Type Of Column:</label>
                {/* </div> */}
                <div className="col-sm-5">
                  <select className="custom-select form-control" id="inputGroupSelect01" value={selectedOption !== null ? selectedOption : ''} onChange={handleOptionChange}>
                    <option selected>Simple Column</option>
                    {/* <option value="simple"  >Simple Column</option> */}
                    <option value="circular"  >Circular Collumn</option>
                  </select>
                </div>
              </div>

              {
                (selectedOption === "circular") ? (
                  <div className="row mb-3">
                    <div className='col-sm-2'></div>
                    <label htmlFor="inputEmail3" className="col-sm-3 fs-5 col-form-label">Diameter of column:</label>
                    <div className="col-sm-5">
                      <input type="number" className="form-control" id="diameter" placeholder="Enter in Meter" value={material.diameter} onChange={(e) => change(e)} required />
                    </div>
                  </div>
                ) :

                  (
                    <div>
                      <div className="row mb-3">
                        <div className='col-sm-2'></div>
                        <label htmlFor="inputEmail3" className="col-sm-3 fs-5 col-form-label">Length:</label>
                        <div className="col-sm-5">
                          <input type="number" className="form-control" id="length" placeholder="Enter in Meter" value={material.length} onChange={(e) => change(e)} required />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className='col-sm-2'></div>
                        <label htmlFor="inputEmail3" className="col-sm-3 fs-5 col-form-label">Breadth:</label>
                        <div className="col-sm-5">
                          <input type="number" className="form-control" id="breadth" placeholder="Enter in Meter" value={material.breadth} onChange={(e) => change(e)} required />
                        </div>
                      </div>
                    </div>
                  )}


              <div className="row mb-3">
                <div className='col-sm-2'></div>
                <label htmlFor="inputEmail3" className="col-sm-3 fs-5 col-form-label">Height:</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="height" placeholder="Enter in Meter" value={material.height} onChange={(e) => change(e)} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className='col-sm-0'></div>
                <label htmlFor="inputEmail3" className="col-sm-5 fs-5 col-form-label">Diameter of Long Bar :</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="long_dia" placeholder="Enter in MM" value={material.long_dia} onChange={(e) => change(e)} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className='col-sm-0'></div>
                <label htmlFor="inputEmail3" className="col-sm-5 fs-5 col-form-label">No. Of Long Bars:</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="no_long_bar" placeholder="Enter Number of bars" value={material.no_long_bar} onChange={(e) => change(e)} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className='col-sm-0'></div>
                <label htmlFor="inputEmail3" className="col-sm-5 fs-5 col-form-label">Diameter of Stirrups :</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="stir_dia" placeholder="Enter in MM" value={material.stir_dia} onChange={(e) => change(e)} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className='col-sm-0'></div>
                <label htmlFor="inputEmail3" className="col-sm-5 fs-5 col-form-label">Spacing Between Stirrups :</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="spac_stir" placeholder="Enter in Meter" value={material.spac_stir} onChange={(e) => change(e)} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className='col-sm-0'></div>
                <label htmlFor="inputEmail3" className="col-sm-5 fs-5 col-form-label">Leg Length :</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="leg_len" placeholder="Enter in Meter" value={material.leg_len} onChange={(e) => change(e)} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className='col-sm-0'></div>
                <label htmlFor="inputEmail3" className="col-sm-5 fs-5 col-form-label">Size of Column Cover :</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="col_cov" placeholder="Enter in Meter" value={material.col_cov} onChange={(e) => change(e)} required />
                </div>
              </div>
              <div align='center' className="align-content-center">
                <button type="submit" className="btn btn-outline-primary fw-bolder p-2 border-2    fs-5" onClick={submit}>Calculate Material Needed</button>
                {showresult && (
                  <div id="textField" className='fs-4' >
                    <p>Number of Cement Bags Needed are : {No_of_cement_bags}</p>
                    <p>Sand Needed is : {Vol_of_sand} Cubic feet ({Vol_of_sand * 0.353} brass)</p>
                    <p>Aggregate Needed is : {Vol_of_Aggregate} Cubic feet ({Vol_of_Aggregate * 0.353} brass)</p>
                    <p>Weight of Longitudinal Bars Needed is : {longitudinalBarWeight}  kg</p>
                    <p>Weight of Stirrups Needed is : {stirrupsWeight}  kg</p>

                  </div>
                )}
              </div>




            </form>
          </div>
        </figcaption>
      </figure>


      <div className="m-3" id='printablediv'>
        <h1 className="text-center mb-4">List</h1>
        <div id="create-task" className="mb-3">
          <div className="input-group">

            <button className="btn btn-outline-primary fw-bolder p-2 border-2" onClick={addTask}>
              Add
            </button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Length</th>
              <th>Depth</th>
              <th>Width</th>
              <th>Cement</th>
              <th>Sand</th>
              <th>Aggregate</th>
              {/* <th>Weight Long Bar</th>
              <th>Weight Stirrups Bar</th> */}


            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (

              <tr  >
                <td>{post.name}</td>
                <td>{post.length}</td>
                <td>{post.breadth}</td>
                <td>{post.height}</td>
                <td>{post.cement}</td>
                <td>{post.sand}</td>
                <td>{post.aggregate}</td>
                {/* <td>{post.longsteel}</td>
                <td>{post.stirsteel}</td> */}

              </tr>

            ))}
            <tr>
              <th>Total </th>
              <td> </td>
              <td> </td>
              <td> </td>
              <th>{tcement}</th>
              <th>{tsand}</th>
              <th>{taggregate}</th>
              {/* <th>{tlongsteel}</th>
              <th>{tstirsteel}</th> */}
            </tr>
          </tbody>

        </table>
        
        <div>
        <h3 className='mt-3'>Overall Steel Needed:</h3>
        <div>
          <table className="table">
            <thead>
              <tr>
              <th>Diameter</th>
              <th>Total</th>
              <th>Wastage of 10%</th>
              <th>Overall Total</th>
              <th>Order Place</th>
              </tr>
            </thead>
            <tbody>

              {Array.from(myMap.entries()).map(([key, value]) => (
                < tr>
                  <td >{key} MM</td>
                  {/* <td >{value} KG</td> */}
                  <td >{parseFloat((value).toFixed(3), 10)} KG</td>
                  <td >{parseFloat((0.1 * value).toFixed(3), 10)} KG</td>
                  <td >{parseFloat(((0.1 * value) + value).toFixed(3), 10)} KG</td>
                  <td >{parseFloat((((0.1 * value) + value + 200)/1000).toFixed(3), 10)} Tone</td>
                  {/* <td >{((0.1 * value) + value)} KG</td> */}
                  {/* <td >{(((0.1 * value) + value + 200)/1000)} Tone</td> */}
                  </tr>
                ))}

              

            </tbody>
          </table>
        </div>
        </div>
        <button className='btn btn-outline-primary fw-bolder p-2 border-2 ' onClick={Print} >Print Page</button>
      </div>
    </div>
  )
}