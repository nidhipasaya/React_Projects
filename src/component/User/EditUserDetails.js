import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import Dropdown from '../dropdown'

const EditUserDetails = () => {

    let history = useHistory()
    const [userData, setUserData] = useState({
        name: "",
        birthdate: "",
        address: "",
        gender: "",
        college: null,
        hobbies: []
    })
    const { id } = useParams();
    const [collegeData, setcollegeData] = useState([])
    const [value, setValue] = useState(null)
    const [isOtherSelected, setIsOtherSelected] = useState(false)
    const [otherValue, setOtherValue] = useState("")
    const { name, birthdate, address } = userData
    const current = new Date().toISOString().split("T")[0];
    const [hobbiesData, setHobbiesData] = useState([
        { title: "Reading", isSelected: false },
        { title: "Gaming", isSelected: false },
        { title: "Traveling", isSelected: false },
        { title: "Drawing", isSelected: false },
        { title: "Other", isSelected: false }])

    useEffect(() => {
        console.log("in useEffect")
        loadUsers()
        loadCollegeData()
    }, [])

    const loadUsers = async () => {
        try {
            const result = await axios.get(`http://localhost:3002/users/${id}`);
            setUserData(result.data)
        }
        catch (e) {
            console.log("Error Message ::", e);
        }
    }

    const loadCollegeData = async () => {
        try {
            const result = await axios.get('http://universities.hipolabs.com/search')
            setcollegeData(result.data);
        }
        catch (e) {
            console.log("Error Message ::", e);
        }

    }

    const handleData = (e) => {
        console.log("e.target.name ::", e.target.name)
        console.log("e.target.value ::", e.target.value)
        setUserData({ ...userData, [e.target.name]: e.target.value })
        console.log(userData);
    }

    const handleCheckBoxData = (index) => {
        let tempData = hobbiesData;
        let temp = userData;
        tempData[index].isSelected = !tempData[index].isSelected
        setHobbiesData([...tempData]);
        if (tempData[index].title === 'Other') {
            setIsOtherSelected(tempData[index].isSelected)
        }
        else {
            temp.hobbies = tempData.filter(data => data.isSelected);
            setUserData({ ...temp })
        }
    }

    const onSubmitData = async (e) => {
        e.preventDefault();
        let temp = userData;
        temp.hobbies.push({ title: otherValue })
        setUserData({ ...temp })
        console.log("temp.hobbies :::", temp.hobbies)
        await axios.put(`http://localhost:3002/users/${id}`, temp)
        history.push("/")
    }

    return (<div className="container">
        <div className="w-75 p-5 mx-auto shadow">
            <form onSubmit={(e) => onSubmitData(e)}>
                <div className="form-group">
                    <h2 className="text-center mb-4 ">Update User Details</h2>
                </div >

                <div className="form-group mb-3">
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => handleData(e)}
                        className="form-control form-control-mg"
                        placeholder="Enter your Name" 
                        required/>
                </div>

                <div className="form-group mb-3" name="birthdate" >
                    <h5><b>Select Birth Date:</b></h5>
                    <input
                        type="date"
                        value={birthdate}
                        onChange={(e) => handleData(e)}
                        name="birthdate"
                        max={current}
                        placeholder="Enter your Birth date" 
                        required/>
                </div>

                <div className="form-group mb-3" onChange={(e) => handleData(e)}>
                    <h5><b>Select Gender:</b></h5>
                    &nbsp; &nbsp; &nbsp;
                    <input
                        type="radio"
                        value="Male"
                        name="gender" /> Male
                    &nbsp; &nbsp; &nbsp;
                    <input
                        type="radio"
                        value="Female"
                        name="gender" /> Female
                    &nbsp; &nbsp; &nbsp;
                    <input
                        type="radio"
                        value="Other"
                        name="gender" /> Other
                </div>

                <div className="form-group mb-3">
                    <h5><b>Select Hobbies:</b></h5>
                    {hobbiesData.map((hobbie, index) => (
                        <>
                            &nbsp; &nbsp; &nbsp;
                            <input
                                key={index}
                                name={hobbie.title}
                                type="checkbox"
                                checked={hobbie.isSelected}
                                value={hobbie.title}
                                onChange={() => handleCheckBoxData(index)} />

                            <label>{hobbie.title}</label>
                        </>
                    ))}
                    {isOtherSelected ?
                        <input
                            type="text"
                            value={otherValue}
                            onChange={(e) => setOtherValue(e.target.value)}
                            placeholder="Enter your Hobbies" />
                        : null}

                </div>

                <div className="form-group mb-2" >
                    <Dropdown
                        options={collegeData}
                        id='id'
                        name='name'
                        prompt='Select College Name'
                        value={value}
                        onChange={(e) => {
                            setValue(e)
                            let temp = userData;
                            temp.college = e.name;
                            setUserData({ ...temp })
                        }}>
                    </Dropdown>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        name="address"
                        value={address}
                        onChange={(e) => handleData(e)}
                        className="form-control form-control-lg row-3"
                        placeholder="Enter your Address" 
                        required/>
                </div>

                <button type="submit" className="btn btn-warning form-control">Update User</button>
            </form>
        </div>
    </div>)
}
export default EditUserDetails;