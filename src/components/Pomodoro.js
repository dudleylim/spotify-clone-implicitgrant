import React, { useContext, useState, useEffect } from 'react'
import Context from './ContextApi'
import ContextPomo from './ContextApiPomo'

const Pomodoro = () => {
    const contextApi = useContext(Context);
    const contextApiPomo = useContext(ContextPomo);

    return (
        <section className={`flex flex-col items-center gap-6 bg-slate-300 transition-colors duration-500 justify-between h-full
            ${contextApiPomo.isWorking ? 'bg-red-200' : (contextApiPomo.isRestingShort ? 'bg-green-200' : 'bg-blue-200')}
        `}>
            <div className='flex flex-row w-full'>
                <button className={`p-2 flex-grow transition-colors duration-300 font-semibold ${contextApiPomo.isWorking ? 'bg-black/40 text-white' : 'bg-black/10'} active:bg-black/25`} onClick={() => {contextApiPomo.switchTab('work')}}>WORK</button>
                <button className={`p-2 flex-grow border-x border-black/10 transition-colors duration-300 font-semibold ${contextApiPomo.isRestingShort ? 'bg-black/40 text-white' : 'bg-black/10'} active:bg-black/25`} onClick={() => {contextApiPomo.switchTab('restShort')}}>SHORT BREAK</button>
                <button className={`p-2 flex-grow transition-colors duration-300 font-semibold ${contextApiPomo.isRestingLong ? 'bg-black/40 text-white' : 'bg-black/10'} active:bg-black/25`} onClick={() => {contextApiPomo.switchTab('restLong')}}>LONG BREAK</button>
            </div>

            <div style={{backgroundImage: `conic-gradient(rgb(77, 77, 255) ${contextApiPomo.progress}%, rgb(199, 199, 255) 0%)`}} className='circle'>
                <div className="progress">
                    <p className='text-6xl inline-block'>{contextApiPomo.minutes < 10 ? '0' + contextApiPomo.minutes : contextApiPomo.minutes}:{contextApiPomo.seconds < 10 ? '0' + contextApiPomo.seconds : contextApiPomo.seconds}</p>
                    <p className="text-2xl text-gray-500">Pomo #{contextApiPomo.pomoCounter}</p>
                </div>
            </div>

            <div className='flex flex-row w-full'>
                <button className={`p-2 flex-grow basis-1 text-lg font-semibold text-black transition-colors duration-300 active:bg-black/25 ${contextApiPomo.isTimerStarted ? 'bg-black/20 text-white' : 'bg-black/10'} border-r border-black/20`} onClick={() => {contextApiPomo.toggleTimer()}}>{contextApiPomo.isTimerStarted ? 'STOP' : 'START'}</button>
                <button className='bg-black/10 p-2 flex-grow basis-1 text-lg font-semibold text-black transition-colors duration-300 active:bg-black/25' onClick={() => {contextApiPomo.skip()}}>SKIP</button>
            </div>
        </section>
    )
}

export default Pomodoro