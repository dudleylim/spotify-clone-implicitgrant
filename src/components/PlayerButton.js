import React from 'react'

const PlayerButton = ({functionArg, iconArg}) => {
    return (
        <button onClick={functionArg} className='hover:bg-gray-100 active:bg-gray-200 rounded-full border border-black p-1'>
            {iconArg}
        </button>
    )
}

export default PlayerButton