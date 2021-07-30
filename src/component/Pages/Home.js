/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react'
import axios from "axios"
import "bootstrap/dist/css/bootstrap.css"
import { Link } from 'react-router-dom'


const Home = () => {

    const [users, setUser] = useState([])

    useEffect(() => {
        console.log("in useEffect")
        loadUsers()
    }, [])

    const loadUsers = async () => {
        try {
            const result = await axios.get('http://localhost:3002/users')
            console.log(result);
            setUser(result.data.reverse());
            console.log(users);
        }
        catch (e) {
            console.log("Error Message ::", e);
        }
    }

    const deleteUser = async (id) => {
        var res = confirm("Are you want to delete ?")
            if(res === true) {
            await axios.delete(`http://localhost:3002/users/${id}`)
            loadUsers()
        }

    }

    return (<div className="container">
        <div className="py-4">
            <table className="table border shadow">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Birth Date</th>
                        <th scope="col">Gender</th>
                        <th scope="col">College</th>
                        <th scope="col">Hobbies</th>
                        <th scope="col">Address</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((data, index) => (
                            <tr key={index}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    {data.name}
                                </td>
                                <td>
                                    {data.birthdate}
                                </td>

                                <td>
                                    {data.gender}
                                </td>
                                <td>
                                    {data.college}
                                </td>
                                <td>
                                    {data.hobbies.map((hobbie, index) => <span>{hobbie.title}{" "}</span>)}
                                </td>
                                <td>
                                    {data.address}
                                </td>
                                <td>
                                    <Link class="btn btn-outline-primary m-1" to={`/users/editusers/${data.id}`}>Edit</Link>
                                    <Link class="btn btn-danger m-1" onClick={() => deleteUser(data.id)}>Delete</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    </div>)
}
export default Home;