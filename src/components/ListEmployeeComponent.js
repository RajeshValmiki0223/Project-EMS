import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';
import { Link } from 'react-router-dom';
export default class ListEmployeeComponent extends Component {

     constructor(props)
     {
        super(props);

        this.state={
            employees:[]
        }
     }

     componentDidMount()
        {
            EmployeeService.getEmployees().then((res)=>
            {
                this.setState({employees:res.data})
            })
        }

        deleteEmployee=(employeeId)=>
            {
                EmployeeService.deleteEmployee(employeeId).then(res=>
                    {
                        EmployeeService.getEmployees().then((res)=>
                        {
                            this.setState({employees:res.data})
                        })
                    }).catch(error=>
                        {
                            console.log(error);
                        } )
            }

  render() {
    return (
      <div>

           <h2 className='text-center mt-5'> Employee List </h2>
           <div className='row'>

           <Link to="/add-employee" className='btn btn-primary my-4'> Add Employee</Link>    

            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>FIRSTNAME</th>
                        <th>LASTNAME</th>
                        <th>EMAIL</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                 <tbody>
                    {
                        this.state.employees.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                    <Link to={`/update-employee/${employee.id}`} className='btn btn-info'> update </Link>                

                    <button className='btn btn-danger' style={{marginLeft:"15px"}}
                    onClick={()=> this.deleteEmployee(employee.id)}> delete </button>      



                          </td>
                        </tr>)
                    }
                 </tbody>
            </table>
           </div>

      </div>
    )
  }
}