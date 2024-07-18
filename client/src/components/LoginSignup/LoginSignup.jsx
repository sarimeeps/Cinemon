import './LoginSignup.css'
import {useState, useEffect} from 'react'
import logo from '../Assets/smile.png'

export const LoginSignup = () => {

    const [toggleState, setToggleState] = useState(0);
    var [toggleTitle, setToggleTitle] = useState(window.innerWidth);

    const toggleTab = (index) => {
        setToggleState(index);
    }

    // console.log(window.innerWidth);
    console.log(toggleTitle);
    setToggleTitle = window.innerWidth;

    return(
        <>
            <div className="container">
            <div className={toggleTitle >= 1200 ? "cinemon-title" : "cinemon-title-2"}>
                <p className='title'>Cinemon</p>
                <p className='subtitle'>insert super sweet slogan here</p>
            </div>
            <div className='form-container'>
                <div className="header">
                    <div className={toggleState === 0 ? "header-btn active-tab" : "header-btn"} 
                    onClick={() => toggleTab(0)}>
                        <button>Register</button>
                    </div>
                    <div className={toggleState === 1 ? "header-btn active-tab" : "header-btn"}
                    onClick={() => toggleTab(1)}>
                        <button>Sign in</button>
                    </div>
                </div>
                <div className="form-holder">
                    <div className='logo'>
                        <img src={logo} alt="logo" />
                    </div>
                    <form className={toggleState === 0 ? "content active-form" : "content"} action="">
                        <input type="text" className='email' placeholder="Email" />
                        <input type="text" className='username' placeholder="Username"/>
                        <input type="text" className='password' placeholder="Password"/>
                        <input type="text" className='cpassword' placeholder="Confirm Password"/>
                        <button type="submit" className='register-submit-btn'>Register</button>
                    </form>
                    <form className={toggleState === 1 ? "content active-form-2" : "content" } action="">
                        <input type="text" className="username" placeholder='Username' />
                        <input type="text" className="password" placeholder='Password'/>
                        <button type='submit' className='signin-btn'>Sign in</button>
                        <a href="">Forgot password?</a>
                    </form>
                    <div className="google-container">
                        <button className="google-btn">Sign in with Google</button>
                    </div>
                </div>
            </div>
            </div>    
        </>
    )
}