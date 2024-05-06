import React from 'react'
import { Link } from 'react-router-dom'
import Login from '../Login'

export default function dashbord(props) {
  return (
   <>
     <div class="">
        {/* <!-- Content Header (Page header) --> */}
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">Dashboard</h1>
                    </div>
                    {/* <!-- /.col --> */}
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="">Home</a></li>
                        </ol>
                    </div>
                    {/* <!-- /.col --> */}
                </div>
                {/* <!-- /.row --> */}
            </div>
             
          
        </div>
       
        <section class="content">

            <div class="container-fluid">
                {/* <!-- Small boxes (Stat box) --> */}
                <div class="row">
                    <div class="col-lg-3 col-6">
                        {/* <!-- small box --> */}
                        <div class="small-box bg-info">

                            <div class="inner">
                                <h3> {props.firstName}</h3>

                                <p>Students</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-bag"></i>
                            </div>
                            <Link to="" class="small-box-footer">More info <i
                                    class="fas fa-arrow-circle-right"></i></Link>
                        </div>
                    </div>
                    
                    {/* <!-- ./col --> */}
              
                    <div class="col-lg-3 col-6">
                        {/* <!-- small box --> */}
                        <div class="small-box btn-danger">

                            <div class="inner">
                                <h3> {props.firstName}</h3>

                                <p >Attendance</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-bag"></i>
                            </div>
                            <Link to="/attendance" class="small-box-footer">More info <i
                                    class="fas fa-arrow-circle-right"></i></Link>
                        </div>
                    </div>

                    {/* <!-- ./col --> */}
                    <div class="col-lg-3 col-6">
                        {/* <!-- small box --> */}
                        <div class="small-box bg-warning">

                            <div class="inner">
                                <h3> {props.firstName}</h3>

                                <p>Class</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-bag"></i>
                            </div>
                            <Link to="" class="small-box-footer">More info <i
                                    class="fas fa-arrow-circle-right"></i></Link>
                        </div>
                    </div>
                    {/* <div class="col-lg-3 col-6">
                       
                        <div class="small-box bg-secondary">
                            <div class="inner">
                                <h3></h3>

                                <p>Total Standards</p>
                            </div>
                            <div class="icon">
                                <i class="ion ion-person-add"></i>
                            </div>
                            <a href="" class="small-box-footer">More info <i
                                    class="fas fa-arrow-circle-right"></i></a>
                        </div>
                    </div> */}


                    {/* <!-- /.row (main row) --> */}
                </div>
                </div>  
                {/* <!-- /.container-fluid --> */}
        </section>
        {/* <!-- /.content --> */}
    </div>
   
   
   </>
  )
}
