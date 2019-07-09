import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export class profileicon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        }
    }
    
    toggle = () => {
        this.setState(prevState => ({
            ...prevState,
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    render() {
        return (
            <div className="pa4 pr6 tc">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle
                tag="span"
                data-toggle="dropdown"
                aria-expanded={this.state.dropdownOpen}
                >
                    <img
                        src="http://tachyons.io/img/logo.jpg"
                        className="br-100 ba h3 w3 dib" alt="avatar" />
               
                </DropdownToggle>
                <DropdownMenu 
                right 
                className="b--transparent shadow-5" 
                style={{marginTop:'2px', 
                        backgroundColor:'rgba(255, 255, 255, 0.5)'}}>
                    <DropdownItem onClick={this.props.toggleModal}>View Profile</DropdownItem>
                    <DropdownItem onClick={() => this.props.onRouteChange('signin')}>Sign Out</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        )
    }
}

export default profileicon
