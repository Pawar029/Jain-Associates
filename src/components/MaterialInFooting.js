import React, { useState } from 'react'

export default function MaterialInFooting() {

  const [material, setMaterial] = useState({
    length: "",
    breadth: "",
    thickness: "",
    long_dia: "",
    short_dia: "",
    spac_long: "",
    spac_short: "",
    con_cov: ""
     
  })


  const length = parseFloat(material.length);
  const breadth = parseFloat(material.breadth);
  const thickness = parseFloat(material.thickness);
  const long_dia = parseFloat(material.long_dia);
  const short_dia = parseFloat(material.short_dia);
  const spac_long = parseFloat(material.spac_long);
  const spac_short = parseFloat(material.spac_short);
  const con_cov = parseFloat(material.con_cov);
  



  const [No_of_cement_bags, setNo_of_cement_bags] = useState("");
  const [Vol_of_sand, setVol_of_sand] = useState("");
  const [Vol_of_Aggregate, setVol_of_Aggregate] = useState("");
  const [longBarWeight, setLongBarWeight] = useState("");
  const [shortBarWeight, setShortBarWeight] = useState("");

  const [showresult, setShowresult] = useState(false);


  const submit = (e) => {

    e.preventDefault();


    const wet_vol = length * breadth * thickness;
    // console.log(wet_vol);
    const dry_vol = wet_vol * 1.54;
    const total_ratio = 1 + 1.5 + 3;  //ratio 1 : 1.5 : 3
    const vol_cement = (1 / total_ratio) * dry_vol;
    setNo_of_cement_bags(Math.ceil(vol_cement / 0.03539));  // volumne of each cement bag in cubic feet is 1.25

    const vol_sand = (1.5 / total_ratio) * dry_vol;
    setVol_of_sand((vol_sand));


    const vol_Aggregate = (3 / total_ratio) * dry_vol;
    setVol_of_Aggregate((vol_Aggregate));


    // Calculation of Steel
    const no_long_bar = ((breadth - (2 * con_cov))/spac_long) +1;
    const no_short_bar = ((length - (2 * con_cov))/spac_short) +1;
    const len_long_bar = (length - (2 * con_cov)) + (2 * (12*long_dia))/1000;       //Hock length is 12*long_dia = 12D
    const total_len_long_bar = len_long_bar * no_long_bar;
    const len_short_bar = (breadth - (2 * con_cov)) + (2 * (12*short_dia))/1000 ;       //Hock length is 12*short_dia = 12D
    const total_len_short_bar = len_short_bar * no_short_bar;
    const wei_long_bar = (long_dia * long_dia * total_len_long_bar) / 162 ;
    const wei_short_bar = (short_dia * short_dia * total_len_short_bar) / 162 ;

    setLongBarWeight(parseFloat(wei_long_bar.toFixed(3), 10));
    setShortBarWeight(parseFloat(wei_short_bar.toFixed(3), 10));



    


    setShowresult(true)


  }

  const change = e => {
    const newdata = { ...material }
    newdata[e.target.id] = e.target.value
    setMaterial(newdata)
  }

//   const [tcement, setTcement] = useState(0);
//   const [tsand, setTsand] = useState(0);
//   const [taggregate, setTaggregate] = useState(0);
//   const [tlongsteel, setTlongsteel] = useState(0);
//   const [tstirsteel, setTstirsteel] = useState(0);
//   const [posts, setPosts] = useState([]);

//   const addTask = () => {

//     console.log("addtask invoked")
//     setTcement(tcement + No_of_cement_bags);
//     setTsand(tsand + Vol_of_sand);
//     setTaggregate(taggregate + Vol_of_Aggregate);
//     setTlongsteel(tlongsteel + longitudinalBarWeight);
//     setTstirsteel(tstirsteel + stirrupsWeight);
//     setPosts([...posts, {
//       length: length, breadth: breadth, height: height, cement: No_of_cement_bags, sand: Vol_of_sand, aggregate: Vol_of_Aggregate, longsteel: longitudinalBarWeight, stirsteel: stirrupsWeight
//     }]);

//   };

//   const Print = () => {
//     console.log('print');
//     const printContents = document.getElementById('printablediv').innerHTML;


//     // // Create a new window for printing
//     let printWindow = window.open('', '_blank');

//     // Set the content of the new window to the printable content
//     // printWindow.document.write('<html><head><title>Jain & Associates</title></head><body>');
//     printWindow.document.body.innerHTML = printContents;
//     // printWindow.document.write(printContents);
//     // printWindow.document.write('</body></html>');

//     // Print the contents
//     printWindow.print();

//     // Close the new window
//     printWindow.close();

//     // let originalContents = document.body.innerHTML;
//     // document.body.innerHTML = printContents;
//     // // let printWindow = window.open('', '_blank');
//     // // printWindow.document.body.innerHTML = printContents ;
//     // // printWindow.document.body.write(printContents);
//     // // printWindow.print();
//     // window.print();
//     // document.body.innerHTML = originalContents;
//   }




  return (
    <div className='p-4'>

      <div align="center"  >
        <figure className="figure" >
          {/* <img src={pic} className="bg-opacity-25 figure-img img-fluid rounded" alt="..." /> */}
          <figcaption className="figure-caption" >
            <div className='  p-2 my-4 text-primary-emphasis bg-light border border-primary rounded-3' >
              <h2 className='p-2' align='center'>Material Needed for Footing</h2>
              <form className='align-center'  >
                {/* <div className="row mb-3">
                  <div className='col-sm-2'></div>
                  <label htmlFor="inputEmail3" className="col-sm-3 fs-5 col-form-label">Column Name:</label>
                  <div className="col-sm-5">
                    <input type="text" className="form-control" id="length" placeholder="Enter C1,C2,....." />
                  </div>
                </div> */}

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
                <div className="row mb-3">
                  <div className='col-sm-2'></div>
                  <label htmlFor="inputEmail3" className="col-sm-3 fs-5 col-form-label">Thickness:</label>
                  <div className="col-sm-5">
                    <input type="number" className="form-control" id="thickness" placeholder="Enter in Meter" value={material.thickness} onChange={(e) => change(e)} required />
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
                  <label htmlFor="inputEmail3" className="col-sm-5 fs-5 col-form-label">Diameter of Short Bar :</label>
                  <div className="col-sm-5">
                    <input type="number" className="form-control" id="short_dia" placeholder="Enter in MM" value={material.short_dia} onChange={(e) => change(e)} required />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className='col-sm-0'></div>
                  <label htmlFor="inputEmail3" className="col-sm-5 fs-5 col-form-label">Spacing Between long bars :</label>
                  <div className="col-sm-5">
                    <input type="number" className="form-control" id="spac_long" placeholder="Enter in Meter" value={material.spac_long} onChange={(e) => change(e)} required />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className='col-sm-0'></div>
                  <label htmlFor="inputEmail3" className="col-sm-5 fs-5 col-form-label">Spacing Between short bars :</label>
                  <div className="col-sm-5">
                    <input type="number" className="form-control" id="spac_short" placeholder="Enter in Meter" value={material.spac_short} onChange={(e) => change(e)} required />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className='col-sm-0'></div>
                  <label htmlFor="inputEmail3" className="col-sm-5 fs-5 col-form-label">Concrete Cover :</label>
                  <div className="col-sm-5">
                    <input type="number" className="form-control" id="con_cov" placeholder="Enter in Meter" value={material.con_cov} onChange={(e) => change(e)} required />
                  </div>
                </div>
               
                <div align='center' className="align-content-center">
                  <button type="submit" className="btn btn-outline-primary fw-bolder p-2 border-2    fs-5" onClick={submit}>Calculate Material Needed</button>
                  {showresult && (
                    <div id="textField" className='fs-4' >
                      <p>Number of Cement Bags Needed are : {No_of_cement_bags}</p>
                      <p>Sand Needed is : {Vol_of_sand} Cubic feet ({Vol_of_sand / 100} brass)</p>
                      <p>Aggregate Needed is : {Vol_of_Aggregate} Cubic feet ({Vol_of_Aggregate / 100} brass)</p>
                      <p>Weight of Long Bars Needed is : {longBarWeight}  kg</p>
                      <p>Weight of Short Bars Needed is : {shortBarWeight}  kg</p>

                    </div>
                  )}
                </div>




              </form>
            </div>
          </figcaption>
        </figure>

      </div>
      {/* <div className="mt-5" id='printablediv'>
        <h1 className="text-center mb-4">List</h1>
        <div id="create-task" className="mb-3">
          <div className="input-group">

            <button className="btn btn-primary" onClick={addTask}>
              Add
            </button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Length</th>
              <th>Depth</th>
              <th>Width</th>
              <th>No. of Cement bags</th>
              <th>Sand</th>
              <th>Aggregate</th>
              <th>Weight Long Bar</th>
              <th>Weight Stirrups Bar</th>


            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (

              <tr  >
                <td>{post.length}</td>
                <td>{post.breadth}</td>
                <td>{post.height}</td>
                <td>{post.cement}</td>
                <td>{post.sand}</td>
                <td>{post.aggregate}</td>
                <td>{post.longsteel}</td>
                <td>{post.stirsteel}</td>

              </tr>

            ))}
            <tr>
              <th>Total </th>
              <td> </td>
              <td> </td>
              <th>{tcement}</th>
              <th>{tsand}</th>
              <th>{taggregate}</th>
              <th>{tlongsteel}</th>
              <th>{tstirsteel}</th>
            </tr>
          </tbody>

        </table>
        <button className='btn bg-info fw-bolder text-light p-2 border-2 ' onClick={Print} >Print Page</button>
      </div> */}
    </div>
  )
}