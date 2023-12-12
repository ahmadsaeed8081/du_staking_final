import { useEffect, useState } from "react";
import { EyeIcon, SmsIcon } from "../../assets/Icons";
import Axios  from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../store/reducers/authReducer";
import Web3 from "web3";
import { useLocation } from 'react-router-dom';
import { cont_address,token_Address,cont_abi,token_abi } from "../../components/config";

const Registration = () => {
  let count=0;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const temp_address = params.get("ref");

  


  const [fname, set_fname] = useState("");
  const [lname, set_lname] = useState("");
  const [email, set_email] = useState("");
  const [phone, set_phone] = useState("");
  const [country, set_country] = useState("");
  const [ref, set_ref] = useState("");
  const [address, set_address] = useState("");
  const [password, set_password] = useState("");
  const [confirmpassword, set_confirmpassword] = useState("");

  const [passwordShow, setPasswordShow] = useState(false);

  const isValidAddress = (adr) => {
    try {
      const web3 = new Web3()
      web3.utils.toChecksumAddress(adr)
      return true
    } catch (e) {
      return false
    }
  }

  async function handleRegister(event) {

    event.preventDefault(); // prevent the form from submitting

    const web3= new Web3(new Web3.providers.HttpProvider("https://endpoints.omniatech.io/v1/bsc/testnet/public	"));
    const contract=new web3.eth.Contract(cont_abi,cont_address);
    let response;
    try{
       response=await Axios.get("https://duapi-production.up.railway.app/getdatabymail?"+ new URLSearchParams({
        Email: email,})
      )
    }catch(e){
    }
      if(response.data.length>0)
        {
          alert("Email is already Registered")
          return;
        }
    let userData;
    try{

       userData= await Axios.get("https://duapi-production.up.railway.app/getdatabyaddress?"+ new URLSearchParams({userAddress: address.toLowerCase(),}))
    }catch(e){
    }
    if(userData.data.length>0)
    {
      alert("Your Wallet Address is already Registered")
      return;
    }
    if(password.length<8)
    {
      alert("Password length cannot be less than 8 characters")
      return;
    }
    if(confirmpassword!=password)
    {
      alert("Password doesn't match")
      return;
    }
    if(country=="Select Counttry")
    {
      alert("Kindly select the country")
      return;
    }
    if(!isValidAddress(address))
    {
      alert("'Your Wallet Address' doesn't look like an address")
      return
    }
    if(ref!="" && ref!=null && ref!="0x0000000000000000000000000000000000000000")
    {
      if(!isValidAddress(ref))
      {
        alert("'Referral Address' doesn't look like an address")
        return
      }
      let userData1;
      try{

        userData1= await Axios.get("https://duapi-production.up.railway.app/getdatabyaddress?"+ new URLSearchParams({userAddress: ref.toLowerCase(),}))
      }
      catch(e){}  
      if(userData1.data.length>0)
      {
        if(userData1.data[0].verified!="verified")
        {
          alert("'Referral Address' is not registered")
          return
        }

      } 
      else
      {
        alert("'Referral Address' is not registered")
        return
      }  
      
    }else{
      set_ref("0x0000000000000000000000000000000000000000");
    }
   

    

    try{
      await Axios.post("https://duapi-production.up.railway.app/register",{ userAddress: address.toLowerCase(),
      FName:fname,LName:lname,Email:email,password:password,Country:country,Phone:phone,Ref_address:ref,verified:"undefined",Image:"null"}
      ).then((response)=>{
        navigate("/");
        // dispatch(setUserToken(true));
        console.log("user is reg");
        
      })

    }catch(e){
    }

  }

useEffect(()=>{
  if(count==0)
  if(temp_address!=null)
  {
    set_ref(temp_address);

  }
  else{
    set_ref("0x0000000000000000000000000000000000000000");

  }
  count++;
},[temp_address])


  return (
    <div className="sign-up-page bg-themeColor relative ">
      <div className="shade absolute"></div>
      <div className="bg-right absolute top-0 bottom-0 right-0"></div>
      <div className="wrap wrapWidth flex justify-center">
        <form className="form-block flex flex-col w-full" onSubmit={handleRegister}>
          <div className="page-header flex flex-col gap-6 justify-center">
            <img src="/images/logo.svg" className="p-logo" />
            <h1 className="title text-center">Registration</h1>
          </div>
          <div className="row2 w-full">
            <div className="input-field flex flex-col gap-3">
              <h1 className="input-lbl">First Name</h1>
              <div className="input-box flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Enter First Name"
                  className="txt cleanbtn w-full"
                  value={fname}
                  required
                  onChange={(e) => {
                    set_fname(e.target.value);
                }}
                />
              </div>
            </div>
            <div className="input-field flex flex-col gap-3">
              <h1 className="input-lbl">Last Name</h1>
              <div className="input-box flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  className="txt cleanbtn w-full"
                  value={lname}
                  required
                  onChange={(e) => {
                    set_lname(e.target.value);
                }}
                />
              </div>
            </div>
            <div className="input-field flex flex-col gap-3">
              <h1 className="input-lbl">Email</h1>
              <div className="input-box flex items-center gap-3">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="txt cleanbtn w-full"
                  value={email}
                  required
                  onChange={(e) => {
                    set_email(e.target.value);
                }}
                />
              </div>
            </div>
            <div className="input-field flex flex-col gap-3">
              <h1 className="input-lbl">Password</h1>
              <div className="input-box flex items-center gap-3">
                <input
                  type={passwordShow ? "text" : "password"}
                  placeholder="Enter Your Password"
                  className="txt cleanbtn w-full"
                  value={password}
                  required
                  onChange={(e) => {
                    set_password(e.target.value);
                }}
                />
                <div className="Icon"
                  onClick={(e) => setPasswordShow(!passwordShow)}>
                  <EyeIcon />
                </div>
              </div>
            </div>
            <div className="input-field flex flex-col gap-3">
              <h1 className="input-lbl">Password</h1>
              <div className="input-box flex items-center gap-3">
                <input
                  type={passwordShow ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="txt cleanbtn w-full"
                  value={confirmpassword}
                  required
                  onChange={(e) => {
                    set_confirmpassword(e.target.value);
                }}
                />
                <div className="Icon"
                  onClick={(e) => setPasswordShow(!passwordShow)}>
                  <EyeIcon />
                </div>
              </div>
            </div>
            <div className="input-field flex flex-col gap-3">
              <h1 className="input-lbl">Phone Number</h1>
              <div className="input-box flex items-center gap-3">
                <div className="Icon">
                  <SmsIcon />
                </div>
                <input
                  type="tel"
                  placeholder="Enter Your Number"
                  className="txt cleanbtn w-full"
                  value={phone}
                  required
                  onChange={(e) => {
                    set_phone(e.target.value);
                }}
                />
              </div>
            </div>
            <div className="input-field flex flex-col gap-3">
              <h1 className="input-lbl">Country </h1>
              <select id="country" name="country" onChange={(e)=>set_country(e.target.value)} class="form-control" style={{ color:"white",background:"transparent", border:"1px solid #E069E4", borderRadius:8}}>
              <option value="Select Counttry">Select Counttry</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Åland Islands">Åland Islands</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="American Samoa">American Samoa</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Anguilla">Anguilla</option>
                <option value="Antarctica">Antarctica</option>
                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Aruba">Aruba</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bermuda">Bermuda</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                <option value="Botswana">Botswana</option>
                <option value="Bouvet Island">Bouvet Island</option>
                <option value="Brazil">Brazil</option>
                <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                <option value="Brunei Darussalam">Brunei Darussalam</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Cayman Islands">Cayman Islands</option>
                <option value="Central African Republic">Central African Republic</option>
                <option value="Chad">Chad</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Christmas Island">Christmas Island</option>
                <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo">Congo</option>
                <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                <option value="Cook Islands">Cook Islands</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Cote D'ivoire">Cote D'ivoire</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                <option value="Faroe Islands">Faroe Islands</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="French Guiana">French Guiana</option>
                <option value="French Polynesia">French Polynesia</option>
                <option value="French Southern Territories">French Southern Territories</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Gibraltar">Gibraltar</option>
                <option value="Greece">Greece</option>
                <option value="Greenland">Greenland</option>
                <option value="Grenada">Grenada</option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Guam">Guam</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guernsey">Guernsey</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea-bissau">Guinea-bissau</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                <option value="Honduras">Honduras</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Isle of Man">Isle of Man</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jersey">Jersey</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                <option value="Korea, Republic of">Korea, Republic of</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Macao">Macao</option>
                <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Martinique">Martinique</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mayotte">Mayotte</option>
                <option value="Mexico">Mexico</option>
                <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                <option value="Moldova, Republic of">Moldova, Republic of</option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montenegro">Montenegro</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Namibia">Namibia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Netherlands Antilles">Netherlands Antilles</option>
                <option value="New Caledonia">New Caledonia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Niue">Niue</option>
                <option value="Norfolk Island">Norfolk Island</option>
                <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau">Palau</option>
                <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Philippines">Philippines</option>
                <option value="Pitcairn">Pitcairn</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Qatar">Qatar</option>
                <option value="Reunion">Reunion</option>
                <option value="Romania">Romania</option>
                <option value="Russian Federation">Russian Federation</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Saint Helena">Saint Helena</option>
                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                <option value="Saint Lucia">Saint Lucia</option>
                <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                <option value="Samoa">Samoa</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Serbia">Serbia</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                <option value="Swaziland">Swaziland</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                <option value="Taiwan">Taiwan</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                <option value="Thailand">Thailand</option>
                <option value="Timor-leste">Timor-leste</option>
                <option value="Togo">Togo</option>
                <option value="Tokelau">Tokelau</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Viet Nam">Viet Nam</option>
                <option value="Virgin Islands, British">Virgin Islands, British</option>
                <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                <option value="Wallis and Futuna">Wallis and Futuna</option>
                <option value="Western Sahara">Western Sahara</option>
                <option value="Yemen">Yemen</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
            </select>
            </div>
            <div className="input-field flex flex-col gap-3">
              <h1 className="input-lbl">Your Wallet Address</h1>
              <div className="input-box flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="txt cleanbtn w-full"
                  value={address}
                  required
                  onChange={(e) => {
                    set_address(e.target.value);
                }}
                />
              </div>


            </div>
            <div className="input-field flex flex-col gap-3">
              <h1 className="input-lbl">Referral address (Optional)</h1>
              <div className="input-box flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Enter your referral address"
                  className="txt cleanbtn w-full"
                  value={ref}
                  onChange={(e) => {
                    set_ref(e.target.value);
                }}
                />
              </div>


            </div>
            <div className="input-field flex flex-col gap-3 justify-end">
              <button className="btn-register button" >Register Now</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
