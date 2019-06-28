import React from 'react';

class Signin extends React.Component {
    constructor() {
        super();
        this.state = {
            loginEmail: '',
            loginPassword: ''
        }
    }
onEmailInputChange = (event)  => {
    event.preventDefault();
    this.setState({ ...this.state,
        loginEmail: event.target.value
    })
}  

onPasswordInputChange = (event)  => {
    event.preventDefault();
    this.setState({ ...this.state,
        loginPassword: event.target.value
    })
}  

onSubmitSignin = () => {
    fetch('http://localhost:3000/signin', {
        method: 'post',
        headers: { "Content-Type" : "Application/Json" },
        body: JSON.stringify({
            email: this.state.loginEmail,
            password: this.state.loginPassword
        })
    })
    .then(resp => resp.json())
    .then(user => {
        if(user.id && user.email ) {
            this.props.loadUser(user)
            this.props.onRouteChange('home')
        }
        })
    .catch(err => console.log(err))
}     
    render() {
        const { onRouteChange } = this.props;
        return (
            <div className='center'>
                 <article className="br3 ba b--black-10 shadow-5 mv4 w-100 w-50-m w-25-l mw6 center">
                 <main className="pa4 black-80">
                         <div className="measure">
                             <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                 <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                                 <div className="mt3">
                                     <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                     <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                     type="email" 
                                     name="email-address"  
                                     id="email-address" 
                                     onChange = {this.onEmailInputChange}
                                     />
                                 </div>
                                 <div className="mv3">
                                     <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                     <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                     type="password" 
                                     name="password"  
                                     id="password"
                                     onChange = {this.onPasswordInputChange}
                                      />
                                 </div>
                         
                             </fieldset>
                             <div className="">
                             <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                             type="submit" 
                             value="Sign in"
                             onClick={ () => this.onSubmitSignin() } />
                             </div>
                             <div className="lh-copy mt3">
                             <p onClick={ () => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                             </div>
                         </div>
                     </main>
                 </article> 
            </div>
         );
    }
    
}

export default Signin;