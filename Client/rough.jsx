import React, { useMemo, useState } from 'react'


function Home (){
    const [formData, setFormData] = useState({
        'email' : "",
        'password': ""
    })
const handleChange = (e) =>{
    const {name , password} = e.target
    setFormData((prevData) =>({
...[prevData] ,

[name] :value
    }))
}

    return(
        <div>
            <form>
                <div>
                    <h1>email</h1>
                    <input 
                    name='email'
                    type='text'
                    onChange={handleChange}
                    required
                    />
    
                </div>
                <div>
                <h1>password</h1>
                    <input 
                    name='password'
                    type='password'
                    onChange={handleChange}
                    required
                    />

                </div>
            </form>
        </div>

    )
}

export default Home