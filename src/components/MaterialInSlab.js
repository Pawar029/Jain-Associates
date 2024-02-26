import React, { useState } from 'react'
// import pic from './Images/backgroundimage.jpg'

export default function MaterialInSlab() {

  const [material, setMaterial] = useState({
    length: "",
    bredth: "",
    thick: "",
    main_dia: "",
    dist_dia: "",
    spac_main: "",
    spac_dist: "",
    cover_slab:"",
    top_ex_bar:"",
    spac_ex_bar:"",
    widt_b1:"",
    widt_b2:"",
    beam_cov:""


  })

  const length = parseFloat(material.length);
  const bredth = parseFloat(material.bredth);
  const thick = parseFloat(material.thick);
  const main_dia = parseFloat(material.main_dia);
  const dist_dia = parseFloat(material.dist_dia);
  const spac_main = parseFloat(material.spac_main);
  const spac_dist = parseFloat(material.spac_dist);
  const cover_slab = parseFloat(material.cover_slab);
  // const top_ex_bar = parseFloat(material.top_ex_bar);
  const spac_ex_bar = parseFloat(material.spac_ex_bar);
  const widt_b1 = parseFloat(material.widt_b1);
  const widt_b2 = parseFloat(material.widt_b2);
  const beam_cov = parseFloat(material.beam_cov);


  const [No_of_cement_bags, setNo_of_cement_bags] = useState(0);
  const [Vol_of_sand, setVol_of_sand] = useState(0);
  const [Vol_of_Aggregate, setVol_of_Aggregate] = useState(0);
  const [Weight_mb, setWeight_mb] = useState(0);
  const [Weight_db, setWeight_db] = useState(0);
  const [Weight_tb, setWeight_tb] = useState(0);  // it used for one way

  const [showresult, setShowresult] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };



  const submit = (e) => {

    e.preventDefault();
    console.log(length);
    console.log(typeof(length));
    console.log(bredth);
    console.log(typeof(bredth));
    console.log(thick);
    console.log(typeof(thick));
    console.log("long dia", main_dia);
    console.log("short dia", dist_dia);

    const wet_vol = length * bredth * thick;
    // console.log(wet_vol);
    const dry_vol = wet_vol * 1.54;
    const total_ratio = 1 + 1.5 + 3;  //ratio 1 : 1.5 : 3
    const vol_cement = (1 / total_ratio) * dry_vol;
    setNo_of_cement_bags(Math.ceil(vol_cement / 0.03539));  // volumne of each cement bag in cubic feet is 1.25 , and in cubic meter is 0.03539

    const vol_sand = (1.5 / total_ratio) * dry_vol;
    setVol_of_sand(Math.ceil(vol_sand));


    const vol_Aggregate = (3 / total_ratio) * dry_vol;
    setVol_of_Aggregate(Math.ceil(vol_Aggregate));

    //  Steel Calculation of for Simple Slab
    if (selectedOption === 'simple') {
      const No_of_mb = (length / spac_main) + 1;   //For Main Bars we use spacing as 0.984 feet (0.984 feet = 300 mm)
      const No_of_db = (bredth / spac_dist) + 1;   //For Distributed Bars we use spacing as 1.476 feet (1.476 feet = 450 mm)

      const weight_mainbar = ((main_dia * main_dia) * bredth * No_of_mb) / 162.2;   //((D^2) x total length of bars)/162 -----Diameter(D) is in mm
      const weight_distbar = ((dist_dia * dist_dia) * length * No_of_db) / 162.2;   //((D^2) x total length of bars)/162 -----Diameter(D) is in mm
      setWeight_mb(parseFloat(weight_mainbar.toFixed(3), 10));
      setWeight_db(parseFloat(weight_distbar.toFixed(3), 10));
    }
    // Steel Calculation of for One-Way Slab
    else if(selectedOption === 'oneway'){
      const No_of_mb = (length / spac_main) + 1;
      const No_of_db = (bredth / spac_dist) + 1;
      console.log("main bar ",No_of_mb);
      const d = thick - (2*cover_slab) - (main_dia/1000); 
      const bend = main_dia/1000;
      const a =  (widt_b1 + widt_b2 - (beam_cov * 2));
      const cut_len_main = bredth + a + (0.42*d) - bend*2 ;
      const cut_len_dist = length - (beam_cov * 2);
      const top_ext_bar = bredth / 4;
      const No_top_ext_bar = ((top_ext_bar / spac_ex_bar) + 1 ) * 2;
      const cut_len_top_ext = cut_len_dist ;
      const wei_main = cut_len_main * 0.52 * No_of_mb;
      const wei_dist = cut_len_dist * 0.40 * No_of_db;
      const wei_top_ext_bar = cut_len_top_ext * 0.40 * No_top_ext_bar;
      
       
      setWeight_mb(parseFloat(wei_main.toFixed(3), 10));
      setWeight_db(parseFloat(wei_dist.toFixed(3), 10));
      setWeight_tb(parseFloat(wei_top_ext_bar.toFixed(3), 10)); //tb- top extra bar
    }

    setShowresult(true)




  }


   


  const change = e => {
    const newdata = { ...material }
    newdata[e.target.id] = e.target.value
    setMaterial(newdata)
    // setlength(event.target.length)


  }


  const [tcement, setTcement] = useState(0);
  const [tsand, setTsand] = useState(0);
  const [taggregate, setTaggregate] = useState(0);
  const [tmainsteel, setTmainsteel] = useState(0);
  const [tdiststeel, setTdiststeel] = useState(0);
  const [posts, setPosts] = useState([]);

  const addTask = () => {
    // if (taskText.trim() !== '') {
    // setPosts([...posts, { title: taskText, id: Math.random(), length: length, bredth:bredth}]);

    // let t =  total+No_of_cement_bags;
    console.log("addtask invoked")
    setTcement(tcement + No_of_cement_bags);
    setTsand(tsand + Vol_of_sand);
    setTaggregate(taggregate + Vol_of_Aggregate);
    // let mb = (tmainsteel + Weight_mb);
    // let db = (tmainsteel + Weight_mb);
    setTmainsteel(tmainsteel + Weight_mb);
    setTdiststeel(tdiststeel + Weight_db);
    setPosts([...posts, {
      length: length, bredth: bredth, thickness: thick, main_diameter: main_dia, dist_diameter: dist_dia,
      cement: No_of_cement_bags, sand: Vol_of_sand, aggregate: Vol_of_Aggregate, mainsteel: Weight_mb, diststeel: Weight_db
    }]);
    // setTaskText('');
    // }
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
          <div className='container    p-2 my-4 text-primary-emphasis bg-table-info bg-light borde border-primary rounded-3' >
            <h2 className='p-2' align='center'>Material Needed for Slab</h2>
            <form className='align-center'  >
              <div className="row mb-3">
                <div className='col-sm-2'></div>
                <label for="inputEmail3" className="col-sm-3 fs-5 col-form-label">Slab Name:</label>
                <div className="col-sm-5">
                  <input type="text" className="form-control" id="length" placeholder="Enter S1,S2,....."  />
                </div>
              </div>
              <div className="input-group row mb-3">
                <div className='col-sm-0'></div>
                {/* <div className="input-group-prepend"> */}
                <label className="col-sm-5 fs-5 col-form-label" for="inputGroupSelect01">Type Of Slab:</label>
                {/* </div> */}
                <div className="col-sm-5">
                  <select className="custom-select form-control" id="inputGroupSelect01" value={selectedOption} onChange={handleOptionChange}>
                    <option selected>Choose Slab</option>
                    <option value="simple"  >Simple Slab</option>
                    <option value="oneway"  >One-Way Slab</option>
                    <option value="twoway"  >Two-Way Slab</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className='col-sm-2'></div>
                <label for="inputEmail3" className="col-sm-3 fs-5 col-form-label">Length:</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="length" placeholder="Enter in Meter" value={material.length} onChange={(e) => change(e)} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className='col-sm-2'></div>
                <label for="inputEmail3" className="col-sm-3 fs-5 col-form-label">Breadth:</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="bredth" placeholder="Enter in Meter" value={material.bredth} onChange={(e) => change(e)} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className='col-sm-2'></div>
                <label for="inputEmail3" className="col-sm-3 fs-5 col-form-label">Thickness:</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="thick" placeholder="Enter in Meter" value={material.thick} onChange={(e) => change(e)} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className='col-sm-0'></div>
                <label for="inputEmail3" className="col-sm-5 fs-5 col-form-label">Diameter of Main Bars :</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="main_dia" placeholder="Enter in MM" value={material.main_dia} onChange={(e) => change(e)} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className='col-sm-0'></div>
                <label for="inputEmail3" className="col-sm-5 fs-5 col-form-label">Diameter of Distribution Bar :</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="dist_dia" placeholder="Enter in MM" value={material.dist_dia} onChange={(e) => change(e)} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className='col-sm-0'></div>
                <label for="inputEmail3" className="col-sm-5 fs-5 col-form-label">Spacing Between Main bar :</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="spac_main" placeholder="Enter in Meter" value={material.spac_main} onChange={(e) => change(e)} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className='col-sm-0'></div>
                <label for="inputEmail3" className="col-sm-5 fs-5 col-form-label">Spacing Between Distribution bar :</label>
                <div className="col-sm-5">
                  <input type="number" className="form-control" id="spac_dist" placeholder="Enter in Meter" value={material.spac_dist} onChange={(e) => change(e)} required />
                </div>
              </div>

              {selectedOption === 'oneway' && (
                <div>
                  <div className="row mb-3">
                    <div className='col-sm-0'></div>
                    <label for="inputEmail3" className="col-sm-5 fs-5 col-form-label">Clear Cover Of Slab :</label>
                    <div className="col-sm-5">
                      <input type="number" className="form-control" id="cover_slab" placeholder="Enter in Meter" value={material.cover_slab} onChange={(e) => change(e)} required />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className='col-sm-0'></div>
                    <label for="inputEmail3" className="col-sm-5 fs-5 col-form-label">Diameter Top Extra Bar :</label>
                    <div className="col-sm-5">
                      <input type="number" className="form-control" id="top_ex_bar" placeholder="Enter in Meter" value={material.top_ex_bar} onChange={(e) => change(e)} required />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className='col-sm-0'></div>
                    <label for="inputEmail3" className="col-sm-5 fs-5 col-form-label">Spacing of Top Extra Bar :</label>
                    <div className="col-sm-5">
                      <input type="number" className="form-control" id="spac_ex_bar" placeholder="Enter in Meter" value={material.spac_ex_bar} onChange={(e) => change(e)} required />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className='col-sm-0'></div>
                    <label for="inputEmail3" className="col-sm-5 fs-5 col-form-label">Width of beam1 :</label>
                    <div className="col-sm-5">
                      <input type="number" className="form-control" id="widt_b1" placeholder="Enter in Meter" value={material.widt_b1} onChange={(e) => change(e)} required />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className='col-sm-0'></div>
                    <label for="inputEmail3" className="col-sm-5 fs-5 col-form-label">Width of beam2 :</label>
                    <div className="col-sm-5">
                      <input type="number" className="form-control" id="widt_b2" placeholder="Enter in Meter" value={material.widt_b2} onChange={(e) => change(e)} required />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className='col-sm-0'></div>
                    <label for="inputEmail3" className="col-sm-5 fs-5 col-form-label">Beam Cover :</label>
                    <div className="col-sm-5">
                      <input type="number" className="form-control" id="beam_cov" placeholder="Enter in Meter" value={material.beam_cov} onChange={(e) => change(e)} required />
                    </div>
                  </div>
                </div>
              )}
              {selectedOption === 'twoway' && (
                <div>
                  <h1>Content for Option 2</h1>
                  {/* Additional content for Option 1 */}
                </div>
              )}
              {selectedOption === 'simple' && (
                <div>
                  <h1>Content for Option 3</h1>
                  {/* Additional content for Option 1 */}
                </div>
              )}



              <div align='center' className="align-content-center">
                <button type="submit" className="btn bg-info fw-bolder text-light p-2 border-2    fs-5" onClick={submit}>Calculate Material Needed</button>
                {showresult && (
                  <div id="textField" className='fs-4' >
                    <p>Number of Cement Bags Needed are : {No_of_cement_bags}</p>
                    <p>Sand Needed is : {Vol_of_sand} Cubic feet ({Vol_of_sand / 100} brass)</p>
                    <p>Aggregate Needed is : {Vol_of_Aggregate} Cubic feet ({Vol_of_Aggregate / 100} brass)</p>
                    <p>Weight of Main Bars Needed is : {Weight_mb}  kg</p>
                    <p>Weight of Distribution Bars Needed is : {Weight_db}  kg</p>
                    <p>Weight of Top Extra Bars Needed is : {Weight_tb}  kg</p>
                  </div>
                )}
              </div>




            </form>
          </div>
        </figcaption>
      </figure>


      <div className="container mt-5" id='printablediv'>
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
              <th>Breadth</th>
              <th>Thickness</th>
              <th>Main Diameter</th>
              <th>Dist. Diameter</th>
              <th>No. of Cement bags</th>
              <th>Sand</th>
              <th>Aggregate</th>
              <th>Weight Main Bar</th>
              <th>Weight Dis. Bar</th>


            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (

              <tr  >
                <td>{post.length}</td>
                <td>{post.bredth}</td>
                <td>{post.thickness}</td>
                <td>{post.main_diameter}</td>
                <td>{post.dist_diameter}</td>
                <td>{post.cement}</td>
                <td>{post.sand}</td>
                <td>{post.aggregate}</td>
                <td>{post.mainsteel}</td>
                <td>{post.diststeel}</td>
              </tr>

            ))}
            <tr>
              <th>Total </th>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <th>{tcement}</th>
              <th>{tsand}</th>
              <th>{taggregate}</th>
              <th>{tmainsteel}</th>
              <th>{tdiststeel}</th>
            </tr>
          </tbody>

        </table>
        <button className='btn bg-info fw-bolder text-light p-2 border-2 ' onClick={Print} >Print Page</button>
      </div>

    </div>
  )
}

