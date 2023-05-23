import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserCreate = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [languages, setLanguages] = useState([])
    const [emailError,setEmailError] = useState('')

    const navigate = useNavigate()

    const handleLanguage = (e) => {
        e.persist();
        setLanguages({ ...languages, [e.target.name]: e.target.checked })
    }

    const checkEmail = (response,email) => {
        const user = response.find(users => users.email === email)
        return user
    }


    const createUser = async (e) => {
        e.preventDefault()
        const userData = { name, email, phone, gender, languages }

       const emailUnique = await fetch('http://localhost:8080/users').then((result) => {
            return result.json()
        }).then((response) => checkEmail(response,email))
        
        if (!emailUnique) {
            setEmailError('')
            fetch('http://localhost:8080/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(userData)
            }).then((result) => {
                return result.json()
            }).then((response) => {
                Swal.fire({
                    title: 'User created successfully !',
                    icon: 'success'
                });
                navigate('/')
            }).catch((err) => {
                console.log(err)
            })
        }else{
            setEmailError('Email Id is already registered')
        }

    }

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <div className="container">
                        <div className="card" >
                            <div className="card-body">
                                <h5>Add User</h5>
                                <form className="user-form" onSubmit={createUser}>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-control" required name="name" value={name} onChange={e => setName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control" required name="email" value={email} onChange={e => setEmail(e.target.value)} />
                                        <span className="text-danger">{emailError}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Phone</label>
                                        <input type="text" className="form-control" required name="phone" value={phone} onChange={e => setPhone(e.target.value)} />
                                        {phone && !(phone.match(/^[6-9]\d{9}$/)) ? <span className="text-danger">Enter valid phone number</span> : null}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Gender</label><br />
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="gender" value='Male' onChange={e => setGender(e.target.value)} />
                                            <label className="form-check-label">Male</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="gender" value='Female' onChange={e => setGender(e.target.value)} />
                                            <label className="form-check-label" >Female</label>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Programming languages known</label><br></br>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="php" defaultChecked={languages.php ? true : false} onChange={handleLanguage} />
                                            <label className="form-check-label">PHP</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="react" defaultChecked={languages.react ? true : false} onChange={handleLanguage} />
                                            <label className="form-check-label">React</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="laravel" defaultChecked={languages.laravel ? true : false} onChange={handleLanguage} />
                                            <label className="form-check-label">Laravel</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="angular" defaultChecked={languages.angular ? true : false} onChange={handleLanguage} />
                                            <label className="form-check-label">Angular</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="nodejs" defaultChecked={languages.nodejs ? true : false} onChange={handleLanguage} />
                                            <label className="form-check-label">Node JS</label>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-success">Submit</button>
                                    <Link to="/" className="btn btn-danger">Cancel</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCreate;