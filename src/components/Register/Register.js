import React from 'react';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            registerName: '',
            registerEmail: '',
            registerPassword: ''
        }
    }
    onNameInputChange = (event)  => {
        event.preventDefault();
        this.setState({ ...this.state,
            registerName: event.target.value
        })
    }  
    

    onEmailInputChange = (event)  => {
        event.preventDefault();
        this.setState({ ...this.state,
            registerEmail: event.target.value
        })
    }  
    
    onPasswordInputChange = (event)  => {
        event.preventDefault();
        this.setState({ ...this.state,
            registerPassword: event.target.value
        })
    }  

    setAuthTokenInSessions = (token) => {
        return window.sessionStorage.setItem('token', token)
    }
    
    onSubmitRegister = () => {
        fetch('https://enigmatic-brushlands-54426.herokuapp.com/register', {
            method: 'post',
            headers: { "Content-Type" : "Application/Json" },
            body: JSON.stringify({
                name: this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.userId && data.success === 'true' ) {
                
                this.setAuthTokenInSessions(data.token)
                fetch(`https://enigmatic-brushlands-54426.herokuapp.com/profile/${data.userId}`, {
                method: 'get',
                headers: { 
                "Content-Type" : "Application/Json",
                "Authorization" : data.token
                }
            })
                .then(resp => resp.json())
                .then(user => {
                    if(user.id && user.email ){
                        
                        this.props.loadUser(user)
                        this.props.onRouteChange('home')
                    }
                })
                .catch(console.log);
            }
        })
        .catch(err => console.log(err))
    }     

    render () {
        
        return (
            <div className='center'>
                 <article className="br3 ba b--black-10 shadow-5 mv4 w-100 w-50-m w-25-l mw6 center">
                 <main className="pa4 black-80">
                         <div className="measure">
                             <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                 <legend className="f1 fw6 ph0 mh0">Register</legend>
                                 <div className="mt3">
                                     <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                     <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                     type="text" 
                                     name="name"  
                                     id="name" 
                                     onChange={this.onNameInputChange}    
                                     />
                                 </div>
                                 <div className="mt3">
                                     <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                     <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                     type="email" 
                                     name="email-address"  
                                     id="email-address" 
                                     onChange={this.onEmailInputChange}     
                                     />
                                 </div>
                                 <div className="mv3">
                                     <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                     <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                     type="password" 
                                     name="password"  
                                     id="password" 
                                     onChange={this.onPasswordInputChange}     
                                     />
                                 </div>
                         
                             </fieldset>
                             <div className="">
                             <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                             type="submit" 
                             value="Register"
                             onClick={ () => this.onSubmitRegister() } />
                             </div>
                         </div>
                     </main>
                 </article> 
            </div>
         );
    }
}

export default Register;