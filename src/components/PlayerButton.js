import React from 'react'

const PlayerButton = ({functionArg, iconArg}) => {
    return (
        <button onClick={functionArg}>
            {iconArg}
        </button>
    )
}

export default PlayerButton