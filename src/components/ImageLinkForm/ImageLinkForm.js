import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onUserInput, onButtonSubmit }) => {
    return (
        <div>
           <p className="f3">
               {'This Magic Brain will detect faces in your pictures. Give it a try.'}
           </p>
           <p className="f4">
               {'Simply copy and paste any image URL and watch the magic.'}
           </p>
           <div className='center'>
                <div className="form center pa4 br2 shadow-5">
                    <input className='f4 pa2 w-70 center' type='text' onChange={onUserInput} />
                    <button className='f4 w-30 grow link ph3 pv2 dib white bg-light-purple pointer' 
                        onClick={onButtonSubmit}>Detect</button>
                </div>
           </div>
           <div className="center">
                    <p className="f5 white center ma2">
                        {'Created By: MANOL SHARMA'}
                    </p>
            </div>
        </div>
    );
}

export default ImageLinkForm;