import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';
import './App.css';


const initialState = {
  input : '',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: '',
    joined: '',
    pet: '',
    age: ''
  }
}


const particlesOptions = {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 2000
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({ ...this.state.user, user: {
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined,
    pet: data.pet,
    age: data.age
    }
  })
  }

  onRouteChange = (route) => {
    if(route === 'signin') {
      this.setState(initialState);
      this.setState({ isSignedIn: false});
    }else if(route === 'home') {
      this.setState({ isSignedIn: true})
    }
    this.setState({ route: route })
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen}))
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return {
      leftCol: clarifaiFace.left_col * width ,
      topRow: clarifaiFace.top_row * height ,
      rightCol: width - (clarifaiFace.right_col * width) ,
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  
  displayFaceBox = (box) => {
    this.setState({ box: box })
    
  }


  onUserInput = (event) => {
    this.setState({ input: event.target.value });

  }

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
      fetch('https://enigmatic-brushlands-54426.herokuapp.com/imageurl', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if(response){
          fetch('https://enigmatic-brushlands-54426.herokuapp.com/image', {
            method: 'put',
            headers: { "Content-Type" : "Application/Json" },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })  
          .then(resp => resp.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(err => console.log(err))
        }
        this.displayFaceBox(this.calculateFaceLocation(response))})
        .catch(err => console.log(err));
  }

  render() {
    const { imageURL, box, isSignedIn, route, user, isProfileOpen} = this.state;
    return (
      <div className="App">
        <Particles className= "particles"
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} 
        toggleModal={this.toggleModal}/>
        {
        isProfileOpen && 
        <Modal>
          <Profile isProfileOpen={isProfileOpen} 
          toggleModal={this.toggleModal} 
          user={user}
          loadUser={this.loadUser}
          />
        </Modal>
      }
        { route === 'home' ?
          <div> 
            <Logo /> 
            <Rank user={user}/>
            <ImageLinkForm 
              onUserInput={this.onUserInput}
              onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={box} imageURL={imageURL}/>
          </div> 
          : 
            (  route === 'signin' ?
              <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/> 
              :
              <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/> 
            )
        }
        
      </div>
    );
  }
}

export default App;
