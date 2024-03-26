import React, { useState } from 'react'

export default function MaterialInBeam() {

  const [material, setMaterial] = useState({
    name: "",
    length: "",
    depth: "",
    width: "",
    top_dia: "",
    bott_dia: "",
    no_top_bar: "",
    no_bott_bar: "",
    stir_dia: "",
    spac_stir: "",
    top_ex_dia: "",
    bott_ex_dia: "",
    no_top_ex: "",
    no_bott_ex: "",
    cov_top_bott: "",
    cov_side: ""
  })

  const name = material.name;
  const length = parseFloat(material.length);
  const depth = parseFloat(material.depth);
  const width = parseFloat(material.width);
  const top_dia = parseFloat(material.top_dia);
  const bott_dia = parseFloat(material.bott_dia);
  const no_top_bar = parseFloat(material.no_top_bar);
  const no_bott_bar = parseFloat(material.no_bott_bar);
  const stir_dia = parseFloat(material.stir_dia);
  const spac_stir = parseFloat(material.spac_stir);
  const top_ex_dia = parseFloat(material.top_ex_dia);
  const bott_ex_dia = parseFloat(material.bott_ex_dia);
  const no_top_ex = parseFloat(material.no_top_ex);
  const no_bott_ex = parseFloat(material.no_bott_ex);
  const cov_top_bott = parseFloat(material.cov_top_bott);
  const cov_side = parseFloat(material.cov_side);


  const [No_of_cement_bags, setNo_of_cement_bags] = useState("");
  const [Vol_of_sand, setVol_of_sand] = useState("");
  const [Vol_of_Aggregate, setVol_of_Aggregate] = useState("");
  const [Weight_tb, setWeight_tb] = useState("");
  const [Weight_bb, setWeight_bb] = useState("");
  const [Weight_st, setWeight_st] = useState("");
  const [Weight_top_ex, setWeight_top_ex] = useState("");
  const [Weight_bott_ex, setWeight_bott_ex] = useState("");

  const [showresult, setShowresult] = useState(false);

  const submit = (e) => {

    e.preventDefault();


    const wet_vol = length * depth * width;
    // console.log(wet_vol);
    const dry_vol = wet_vol * 1.54;
    const total_ratio = 1 + 1.5 + 3;  //ratio 1 : 1.5 : 3
    const vol_cement = (1 / total_ratio) * dry_vol;
    setNo_of_cement_bags(Math.ceil(vol_cement / 0.03539));  // volumne of each cement bag in cubic feet is 1.25

    const vol_sand = (1.5 / total_ratio) * dry_vol;
    setVol_of_sand(parseFloat(vol_sand.toFixed(3), 10));


    const vol_Aggregate = (3 / total_ratio) * dry_vol;
    setVol_of_Aggregate(parseFloat(vol_Aggregate.toFixed(3), 10));

    // Calculation for Steel
    const len_bott_bar = length + (2 * 50 * (bott_dia / 1000));
    const len_top_bar = length + (2 * 50 * (top_dia / 1000));
    const no_of_stir = Math.ceil((length / spac_stir) + 1);
    const len_stir = 2 * ((depth - (2 * cov_top_bott)) + (width - (2 * cov_side))) + (2 * 10 * (stir_dia / 1000));

    const wei_bott_bar = (no_bott_bar * len_bott_bar * bott_dia * bott_dia) / 162.2;
    const wei_top_bar = (no_top_bar * len_top_bar * top_dia * top_dia) / 162.2;
    const wei_stir = (no_of_stir * len_stir * stir_dia * stir_dia) / 162.2;

    setWeight_bb(parseFloat(wei_bott_bar.toFixed(3), 10));
    setWeight_tb(parseFloat(wei_top_bar.toFixed(3), 10));
    setWeight_st(parseFloat(wei_stir.toFixed(3), 10));

    // For Top Extra Bar
    const len_top_ext_bar = 0.3 * len_top_bar;          // Total extra bars from both side should be given by user
    const wei_top_ext_bar = (no_top_ex * len_top_ext_bar * top_ex_dia * top_ex_dia) / 162.2;
    setWeight_top_ex(parseFloat(wei_top_ext_bar.toFixed(3), 10));

    // For Bottom Extra Bar
    const a = 0.2 * len_bott_bar;
    const len_bott_ext_bar = len_bott_bar - (2 * a)
    const wei_bott_ext_bar = (no_bott_ex * len_bott_ext_bar * bott_ex_dia * bott_ex_dia) / 162.2;
    setWeight_bott_ex(parseFloat(wei_bott_ext_bar.toFixed(3), 10));





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

  const [ttopsteel, setTtopsteel] = useState(0);
  const [tbottsteel, setTbottsteel] = useState(0);
  const [tstirsteel, setTstirsteel] = useState(0);
  const [ttopexsteel, setTtopexsteel] = useState(0);
  const [tbottexsteel, setTbottexsteel] = useState(0);

  const [posts, setPosts] = useState([]);

  // State to store the Map
  const [myMap, setMyMap] = useState(new Map());

  const addTask = () => {
    // if (taskText.trim() !== '') {
    // setPosts([...posts, { title: taskText, id: Math.random(), length: length, bredth:bredth}]);

    // let t =  total+No_of_cement_bags;
    console.log("addtask invoked")
    setTcement(tcement + No_of_cement_bags);
    setTsand(tsand + Vol_of_sand);
    setTaggregate(taggregate + Vol_of_Aggregate);

    setTtopsteel(ttopsteel + Weight_tb);
    setTbottsteel(tbottsteel + Weight_bb);
    setTstirsteel(tstirsteel + Weight_st);
    setTtopexsteel(ttopexsteel + Weight_top_ex);
    setTbottexsteel(tbottexsteel + Weight_bott_ex);
    setPosts([...posts, {
      name: name, length: length, depth: depth, width: width, cement: No_of_cement_bags, sand: Vol_of_sand, aggregate: Vol_of_Aggregate, topsteel: Weight_tb, bottsteel: Weight_bb, stirrups: Weight_st, top_ext: Weight_top_ex, bott_ext: Weight_bott_ex
    }]);
    

    // Check if the same top_dia exists
    if (myMap.has(top_dia)) {
      myMap.set(top_dia, myMap.get(top_dia) + Weight_tb);
    } else {
      myMap.set(top_dia, Weight_tb);
    }

    setMyMap(myMap);

    // Check if the same bott_dia exists
    if (myMap.has(bott_dia)) {
      myMap.set(bott_dia, myMap.get(bott_dia) + Weight_bb);
    } else {
      myMap.set(bott_dia, Weight_bb);
    }
    // Update the state with the new Map
    setMyMap(myMap);


    // Check if the same stir_dia exists
    if (myMap.has(stir_dia)) {
      myMap.set(stir_dia, myMap.get(stir_dia) + Weight_st);
    } else {
      myMap.set(stir_dia, Weight_st);
    }
    // Update the state with the new Map
    setMyMap(myMap);


    // Check if the same top_ex_dia exists
    if (myMap.has(top_ex_dia)) {
      myMap.set(top_ex_dia, myMap.get(top_ex_dia) + Weight_top_ex);
    } else {
      myMap.set(top_ex_dia, Weight_top_ex);
    }
    // Update the state with the new Map
    setMyMap(myMap);


    // Check if the same dist_dia exists
    if (myMap.has(bott_ex_dia)) {
      myMap.set(bott_ex_dia, myMap.get(bott_ex_dia) + Weight_bott_ex);
    } else {
      myMap.set(bott_ex_dia, Weight_bott_ex);
    }
    // Update the state with the new Map
    setMyMap(myMap);

  };

  const Print = () => {
    console.log('print');
    let printContents = document.getElementById('printablediv').innerHTML;

    // Create a new window for printing
    // let printWindow = window.open('', '_blank');

    // // Set the content of the new window to the printable content
    // // printWindow.document.write('<html><head><title>Jain & Associates</title></head><body>');
    // printWindow.document.innerHTML = printContents ;
    // // printWindow.document.write(printContents);
    // // printWindow.document.write('</body></html>');

    // // Print the contents
    // printWindow.print();

    // // Close the new window
    // printWindow.close();

    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    // let printWindow = window.open('', '_blank');
    // printWindow.document.body.innerHTML = printContents ;
    // printWindow.document.body.write(printContents);
    // printWindow.print();
    window.print();
    document.body.innerHTML = originalContents;
  }

  return (

    <div align="center"  >
      <figure className="figure" >
        {/* <img src={pic} className="bg-opacity-25 figure-img img-fluid rounded" alt="..." /> */}
        <figcaption className="figure-caption" >
          <div className='  p-2 my-4 text-primary-emphasis bg-light border border-primary rounded-3' >
            <h2 className='p-2' align='center'>Material Needed for Beam</h2>
            <form className='align-center'  >
              <div className="row mb-3">
                <div className='col-sm-2'></div>
                <label htmlFor="inputEmail3" className="col-sm-3 fs-5 col-form-label">Beam Name:</label>
                <div className="col-sm-5">
                  <input type="text" className="form-control" id="name" placeholder="Enter B1,B2,....." value={material.name} onChange={(e) => change(e)} required/>
                </div>
              </div>

              <div className="row mb-3">
                <div className='col-sm-2'></div>
                <label htmlFor="inputEmail3" className="col-sm-3 fs-5 col-form-label">Length:</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="length" placeholder="Enter in Meter" value={material.length} onChange={(e) => change(e)} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className='col-sm-2'></div>
                <label htmlFor="inputEmail3" className="col-sm-3 fs-5 col-form-label">Depth:</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="depth" placeholder="Enter in Meter" value={material.depth} onChange={(e) => change(e)} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className='col-sm-2'></div>
                <label htmlFor="inputEmail3" className="col-sm-3 fs-5 col-form-label">Width:</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="width" placeholder="Enter in Meter" value={material.width} onChange={(e) => change(e)} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className='col-sm-0'></div>
                <label htmlFor="inputEmail3" className="col-sm-5 fs-5 col-form-label">Diameter of Top Bars :</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="top_dia" placeholder="Enter in MM" value={material.top_dia} onChange={(e) => change(e)} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className='col-sm-0'></div>
                <label htmlFor="inputEmail3" className="col-sm-5 fs-5 col-form-label">Diameter of Bottom Bar :</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="bott_dia" placeholder="Enter in MM" value={material.bott_dia} onChange={(e) => change(e)} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className='col-sm-0'></div>
                <label htmlFor="inputEmail3" className="col-sm-5 fs-5 col-form-label">No. of Top Bars :</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="no_top_bar" placeholder="Enter Number of Bars" value={material.no_top_bar} onChange={(e) => change(e)} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className='col-sm-0'></div>
                <label htmlFor="inputEmail3" className="col-sm-5 fs-5 col-form-label">No. of Bottom Bar :</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="no_bott_bar" placeholder="Enter Number of Bars" value={material.no_bott_bar} onChange={(e) => change(e)} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className='col-sm-0'></div>
                <label htmlFor="inputEmail3" className="col-sm-5 fs-5 col-form-label">Diameter of Stirrups Bar :</label>
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
                <label htmlFor="inputEmail3" className="col-sm-5 fs-5 col-form-label">Diameter of Top Extra Bar :</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="top_ex_dia" placeholder="Enter in MM" value={material.top_ex_dia} onChange={(e) => change(e)} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className='col-sm-0'></div>
                <label htmlFor="inputEmail3" className="col-sm-5 fs-5 col-form-label">Diameter of Bottom Extra Bar :</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="bott_ex_dia" placeholder="Enter in MM" value={material.bott_ex_dia} onChange={(e) => change(e)} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className='col-sm-0'></div>
                <label htmlFor="inputEmail3" className="col-sm-5 fs-5 col-form-label">No. of Top Extra Bar :</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="no_top_ex" placeholder="Enter Number of Bars" value={material.no_top_ex} onChange={(e) => change(e)} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className='col-sm-0'></div>
                <label htmlFor="inputEmail3" className="col-sm-5 fs-5 col-form-label">No. of Bottom Extra Bar :</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="no_bott_ex" placeholder="Enter Number of Bars" value={material.no_bott_ex} onChange={(e) => change(e)} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className='col-sm-0'></div>
                <label htmlFor="inputEmail3" className="col-sm-5 fs-5 col-form-label">Covering of Top & Bottom :</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="cov_top_bott" placeholder="Enter in Meter" value={material.cov_top_bott} onChange={(e) => change(e)} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className='col-sm-0'></div>
                <label htmlFor="inputEmail3" className="col-sm-5 fs-5 col-form-label">Covering of Side :</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="cov_side" placeholder="Enter in Meter" value={material.cov_side} onChange={(e) => change(e)} required />
                </div>
              </div>





              <div align='center' className="align-content-center">
                <button type="submit" className="btn btn-outline-primary fw-bolder p-2 border-2  fs-5" onClick={submit}>Calculate Material Needed</button>
                {showresult && (
                  <div id="textField" className='fs-4' >
                    <p>Number of Cement Bags Needed are : {No_of_cement_bags}</p>
                    <p>Sand Needed is : {Vol_of_sand} Cubic feet ({Vol_of_sand * 0.353} brass)</p>
                    <p>Aggregate Needed is : {Vol_of_Aggregate} Cubic feet ({Vol_of_Aggregate * 0.353} brass)</p>
                    <p>Weight of Top Bars Needed is : {Weight_tb}  kg</p>
                    <p>Weight of Bottom Bars Needed is : {Weight_bb}  kg</p>
                    <p>Weight of Stirrups Needed is : {Weight_st}  kg</p>
                    <p>Weight of Top Extra Bar Needed is : {Weight_top_ex}  kg</p>
                    <p>Weight of Bottom Extra Bar Needed is : {Weight_bott_ex}  kg</p>
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
              <th>No. of Cement bags</th>
              <th>Sand</th>
              <th>Aggregate</th>
              {/* <th>Weight Top Bar</th>
              <th>Weight Bottom Bar</th>
              <th>Weight Stirrups Bar</th>
              <th>Weight Top Extra Bar</th>
              <th>Weight Bottom Extra Bar</th> */}


            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (

              <tr  >
                <td>{post.name}</td>
                <td>{post.length}</td>
                <td>{post.depth}</td>
                <td>{post.width}</td>
                <td>{post.cement}</td>
                <td>{post.sand}</td>
                <td>{post.aggregate}</td>
                {/* <td>{post.topsteel}</td>
                <td>{post.bottsteel}</td>
                <td>{post.stirrups}</td>
                <td>{post.top_ext}</td>
                <td>{post.bott_ext}</td> */}
              </tr>

            ))}
            <tr>
              <th>Total </th>
              <td> </td>
              <td> </td>
              <td> </td>
              <th>{parseFloat(tcement.toFixed(3), 10)}</th>
              <th>{parseFloat(tsand.toFixed(3), 10)}</th>
              <th>{parseFloat(taggregate.toFixed(3), 10)}</th>
             
              
              {/* <th>{ttopsteel}</th>
              <th>{tbottsteel}</th>
              <th>{tstirsteel}</th>
              <th>{ttopexsteel}</th>
              <th>{tbottexsteel}</th> */}
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
        <button className='btn btn-outline-primary fw-bolder p-2 border-2' onClick={Print} >Print Page</button>
      </div>
    </div>
  )
}
