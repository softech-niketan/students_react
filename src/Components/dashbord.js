import React from 'react'
import { Link } from 'react-router-dom'
import Login from '../Login'

export default function dashbord(props) {
  return (
   <>
     <div className="">
        {/* <!-- Content Header (Page header) --> */}
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0 text-dark">Dashboard</h1>
                    </div>
                    {/* <!-- /.col --> */}
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="">Home</a></li>
                        </ol>
                    </div>
                    {/* <!-- /.col --> */}
                </div>
                {/* <!-- /.row --> */}
            </div>
             
          
        </div>
       
        <section className="content">

            <div className="container-fluid">
                {/* <!-- Small boxes (Stat box) --> */}
                <div className="row">
                    <div className="col-lg-3 col-6">
                        {/* <!-- small box --> */}
                        <div className="small-box bg-info">

                            <div className="inner">
                                <h3> {props.firstName}</h3>

                                <p>Students</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-bag"></i>
                            </div>
                            <Link to="" className="small-box-footer">More info <i
                                    className="fas fa-arrow-circle-right"></i></Link>
                        </div>
                    </div>
                    
                    {/* <!-- ./col --> */}
              
                    <div className="col-lg-3 col-6">
                        {/* <!-- small box --> */}
                        <div className="small-box btn-danger">

                            <div className="inner">
                                <h3> {props.firstName}</h3>

                                <p >Attendance</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-bag"></i>
                            </div>
                            <Link to="/attendance" className="small-box-footer">More info <i
                                    className="fas fa-arrow-circle-right"></i></Link>
                        </div>
                    </div>

                    {/* <!-- ./col --> */}
                    <div className="col-lg-3 col-6">
                        {/* <!-- small box --> */}
                        <div className="small-box bg-warning">

                            <div className="inner">
                                <h3> {props.firstName}</h3>

                                <p>Class</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-bag"></i>
                            </div>
                            <Link to="" className="small-box-footer">More info <i
                                    className="fas fa-arrow-circle-right"></i></Link>
                        </div>
                    </div>
                    {/* <div className="col-lg-3 col-6">
                       
                        <div className="small-box bg-secondary">
                            <div className="inner">
                                <h3></h3>

                                <p>Total Standards</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-person-add"></i>
                            </div>
                            <a href="" className="small-box-footer">More info <i
                                    className="fas fa-arrow-circle-right"></i></a>
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
