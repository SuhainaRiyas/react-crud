import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Pagination from "./Pagination";

const UserList = () => {
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [recordsPerPage] = useState(10)

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = () => {
        fetch('http://localhost:8080/users').then((result) => {
            return result.json()
        }).then((response) => {
            setUsers(response)
        }).catch((err) => {
            console.log(err.message)
        })
    }

    const deleteUser = (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this user?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('http://localhost:8080/users/' + userId, {
                    method: 'DELETE'
                }).then((result) => {
                    return result.json()
                }).then((response) => {
                    getUsers()
                })
            }
        })

    }

    const indexOfLastRecord = currentPage * recordsPerPage
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
    const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord)
    const nPages = Math.ceil(users.length / recordsPerPage)

    return (
        <div className="container">
            <div className="card" >
                <div className="card-title">
                    <h4 style={{marginTop:'10px'}}>User's List</h4>
                    <Link to='/user/create' className="btn btn-success" style={{ float: 'right', marginRight: '16px' }}>Add User</Link>
                </div>
                <div className="card-body">


                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead className="bg-dark text-white">
                                <tr>
                                    <th>S.No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone No</th>
                                    <th>Gender</th>
                                    <th>Programming languages</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentRecords && currentRecords.map((item, index) => (
                                        <tr key={index}>
                                            <td>{(currentPage - 1) * recordsPerPage + index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.gender}</td>
                                            <td>
                                                {
                                                    item.languages && Object.keys(item.languages).filter(key => item.languages[key]).join(', ').toUpperCase()
                                                }
                                            </td>
                                            <td>
                                                <Link to={`/user/${item.id}`} className="btn btn-sm btn-primary"><i className="fa fa-edit" /></Link>
                                                <button className="btn btn-sm btn-danger" onClick={() => deleteUser(item.id)}><i className="fa fa-trash" /></button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        {
                            nPages ? <Pagination
                                nPages={nPages}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage} /> : null
                        }
                    </div>
                </div>


            </div>

        </div>
    )
}

export default UserList;