import { Link, useNavigate } from "react-router-dom";



import logo from './assets/images/logo.jpg';
import React, { useState } from 'react';
function Login(onLogin ) {
   
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
  
     
   
    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform authentication logic here (e.g., API call or simple validation)
        if (email === 'admin@admin.com' && password === 'admin') {
          // Call the onLogin callback to inform the parent component that login is successful
         
          navigate('/dashbord');
        // <Navigate to="/dashbord"/>
          // onLogin();
        } else {
          alert('Invalid username or password');
        }
      };


    const divStyle = {
        backgroundColor: '#D2D6DE'
      };
  return (
    <>

    
    <body class="hold-transition login-page" style={divStyle}>

     <div class="login-box">
        <div class="login-logo">
            <Link href="">
                <img width="200px" height="200px" src={logo}
                    class="mx-auto d-block rounded-circle" alt=""/>

            </Link>

        </div>
        
        <div class="card">
            <div class="card-header text-center">
                <h3>
                   Students
                </h3>
            </div>



            <div class="card-body login-card-body">

                <h5 class=" text-center">
                    Log In
                </h5>
                <br/>



                <form onSubmit={handleSubmit}>
                    <div class="input-group mb-3">
                        <input type="email" name="email" onChange={(e) => setemail(e.target.value)} class="form-control" placeholder="Email"/>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} class="form-control" placeholder="Password"/>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row text-center">
                      
                        <div class="col-lg-12 text-center">

                            <button type="submit" class="btn btn-primary btn-block">Log In</button>
                        </div>
                       
                    </div>
                    <br></br>
                    <div class="row">
                        <div class="col-lg-5 "></div>
                        <div class="col-lg-7 "> <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/register"
                        class="link-danger">Register</Link></p></div>
                    </div>
                  
                    
                
                    {/* <div class="login-details text-left mb-1">
                        <div class='alert alert-danger'>
                      
                        </div>
                    </div> */}

                 
                </form>

            </div>
          
        </div>
    </div>
</body>


    </>
  )
}

export default Login;
