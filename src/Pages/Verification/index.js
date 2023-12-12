import React, { useEffect, useState } from "react";
import Wrapper from "../../routes/Wrapper";
import UserProfile from "../../components/userProfile";
import axios  from "axios";

const Verification = (props) => {
  const [img, setImg] = useState('');
  const [status, set_status] = useState();

// let count=0;



const [preview ,setPreview] = useState()

if(img){
  const reader = new FileReader()
   reader.readAsDataURL(img)
  reader.onload = () =>{
      setPreview(reader.result)
  }
}

  async function upload()
  {
  console.log(preview);
    const res0 =await axios.get("https://duapi-production.up.railway.app/getdatabyaddress?"+ new URLSearchParams({userAddress: props.regAddress,}));
  
    if(res0.data[0]!=undefined)
    { 
      if(res0.data[0].verified=="undefined")
      {
        const data={userAddress: res0.data[0].userAddress.toLowerCase(),
          FName:res0.data[0].FName,LName:res0.data[0].LName,Email:res0.data[0].Email,password:res0.data[0].password,Country:res0.data[0].Country,Phone:res0.data[0].Phone,Ref_address:res0.data[0].Ref_address,verified:"underApproval",Image:preview};

        const res =await axios.patch("https://duapi-production.up.railway.app/user/"+ res0.data[0]._id,data);
          if(res.data="its done")
          {
            alert("Your request is sent")
            check()

          }
          console.log(res)
      }

    }
    // else{
    //   const data={userAddress:address, Name: name,image:preview}
  
    //   const res =await axios.post("https://duapi-production.up.railway.app/getdatabymail",data)
    //   alert("Profile is updated")
  
    // }
  
  
  
  }

  async function check()
  {
    const res0 =await axios.get("https://duapi-production.up.railway.app/getdatabyaddress?"+ new URLSearchParams({userAddress: props.regAddress.toLowerCase(),}));

    console.log("hello check "+res0.data[0].verified);
    if(res0.data[0].Image=="null" && res0.data[0].verified=="undefined"  )
    {
      set_status(0)
    }
    else if(res0.data[0].Image!="null" && res0.data[0].verified== "underApproval" )
    {
      set_status(1)
    }
    else if(res0.data[0].Image!="null" && res0.data[0].verified== "verified" )
    {
      set_status(2)
    }
    else if(res0.data[0].Image!="null" && res0.data[0].verified== "decline" )
    {

      set_status(3)
    }

    
  }

useEffect(()=>{
  if(props.regAddress )
  {
    check();

  }
},[props.regAddress])




  return (
    <Wrapper>
      <div className="Verification-page ">
        <div className="wrap wrapWidth flex">
          <div className="Verification-box">
            <div className="Verification-header items-center justify-between gap-3">
              <h1 className="heading">KYC Verification</h1>
              <UserProfile />
            </div>
            <hr class="w-full border-black mt-4 p-0 max-md:hidden" />
            {status==0?

            <div className="flex flex-col justify-center mt-12 verify max">
              <h2 className="veri-heading">KYC Verification</h2>
              <p className="veri-desc ">
                Please take a selfie with your document so that it’s clearly
                visible and does cover your face.
              </p>
              <div className="veri-img flex justify-center gap-10 max-md:gap-5 max-md:mt-5 mt-10">
                <div
                  className="img-box flex flex-col items-center justify-center"
                  onClick={() => document.getElementById("upload_img").click()}
                >
                  {img ? (
                    <img src={URL.createObjectURL(img)} className="img" />
                  ) : (
                    <>
                      {/* <GalleryIcon /> */}
                      <img src="/images/cloud.png" className="i-img" />
                      <div className="u-lbl">Choose file to upload</div>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    title=""
                    name="image"
                    id="upload_img"
                    className="select-file cleanbtn"
                    onChange={(e) => {
                      setImg(e.target.files[0]);
                    }}
                  />
                </div>
                <div className="img-box flex justify-center items-center">
                  <img src="../images/idcardimg.png" alt="" className="img" />
                </div>
              </div>
              <div className="flex btns justify-center items-center gap-6 mt-7 max-md:gap-4">
                <button className="can">Cancel</button>
                <button className="sub"  onClick={upload} >Submit</button>
              </div>
            </div>
                      :status==1?
                    
                      <div className="Verification-box">

                        <div className="flex flex-col justify-center mt-20 verify max">
                          <h2 className="veri-heading">KYC Verification</h2>
                          <p className="veri-desc ">
                                  Your Request is under processing, you will get the response in next 2 business days 
                          </p>
            
                        </div>
                      </div>:status==2?
                                
                                <div className="Verification-box">

                                  <div className="flex flex-col justify-center mt-20 verify max">
                                    <h2 className="veri-heading" style={{ color:"#EB8C55" }}>Congratulations, You are a part of (DU) Community !</h2>
                                    <p className="veri-desc " style={{ color:"green" }}>
                                            Your Request has been approved, you can now stake $DU and can earn Reward.
                                    </p>
                      
                                  </div>
                                </div>:status==3?
                                
                                <div className="Verification-box">

                                  <div className="flex flex-col justify-center mt-20 verify max">
                                    <h2 className="veri-heading" style={{ color:"red" }}>We are Sorry to inform that Your request has been declined!</h2>

                      
                                  </div>
                                </div>:null
            
            
                    }
          </div>

          
        </div>
      </div>
    </Wrapper>
  );
};

export default Verification;
