import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Dropdown from '../dropdown'

const AddUserDetails = () => {

    let history = useHistory()
    const [userData, setUserData] = useState({
        name: "",
        birthdate: "",
        address: "",
        gender: "",
        college: null,
        hobbies: []
    })
    const current = new Date().toISOString().split("T")[0];
    const [collegeData, setcollegeData] = useState([])
    const [value, setValue] = useState(null)
    const [isOtherSelected, setIsOtherSelected] = useState(false)
    const [otherValue, setOtherValue] = useState("")
    const [hobbiesData, setHobbiesData] = useState([
        { title: "Reading", isSelected: false },
        { title: "Gaming", isSelected: false },
        { title: "Traveling", isSelected: false },
        { title: "Drawing", isSelected: false },
        { title: "Other", isSelected: false }])


    useEffect(() => {
        loadCollegeData()
    }, [])

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
        setUserData({ ...userData, [e.target.name]: e.target.value })
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
        if (temp.gender === "" || temp.gender === undefined || temp.gender === null) {
            alert("Please Select Gender...")
        }
        else {
            let data = temp.hobbies;
            console.log(data.some((hobbie) => hobbie.isSelected === true))
            let len = data.some((hobbie) => hobbie.isSelected === true)
            if ((temp.hobbies[temp.hobbies.length - 1].title !== "" && !len) || (len && temp.hobbies[temp.hobbies.length - 1].title === "")||(len && temp.hobbies[temp.hobbies.length - 1].title !== "")){
                if (temp.college === null) {
                    alert("Please Select College from DropDown...")
                }
                else {
                    await axios.post('http://localhost:3002/users', temp)
                    history.push("/")
                }
            }
                else {
                    alert("Please Select at least one Hobbie...")                  
                }
        }
    }

    const { name, birthdate, address } = userData

    return (<div className="container">
        <div className="w-75 p-5 mx-auto shadow">
            <form onSubmit={(e) => onSubmitData(e)} className="needs-validation">
                <div className="form-group">
                    <h2 className="text-center mb-4 ">Add User Details</h2>
                </div >

                <div className="form-group mb-3">
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => handleData(e)}
                        className="form-control form-control-mg"
                        placeholder="Enter your Name"
                        required />
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
                        required />
                </div>

                <div className="form-group mb-3" onChange={(e) => handleData(e)} required>

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
                        required />
                </div>

                <button type="submit" className="btn btn-primary form-control">AddUser</button>
            </form>
        </div>
    </div>)
}
export default AddUserDetails;