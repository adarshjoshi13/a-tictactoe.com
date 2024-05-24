'use client'

import React from 'react';

const Box = React.forwardRef((props, ref) => {
    const handleClick = (e) => {
        props.passFunction(e);
    };

    return (
        <div id={props.id} ref={ref} className='box' onClick={(e)=> {handleClick(e)}}>
            {/* Content of the box */}
        </div>
    );
});

export default Box;
