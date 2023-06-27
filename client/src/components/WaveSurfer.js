import WaveSurfer from 'https://unpkg.com/wavesurfer.js@beta'
import React from 'react'

const { useRef, useState, useEffect, useCallback } = React

const useWavesurfer = (containerRef, options) => {
  const [wavesurfer, setWavesurfer] = useState(null)
  useEffect(() => {
    if (!containerRef.current) return

    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current,
      barWidth: 10,
      barGap: 10,
      barRadius: 5,
    })

    setWavesurfer(ws)

    return () => {
      ws.destroy()
    }
  }, [options, containerRef])

  return wavesurfer
}

const WaveSurferPlayer = (props) => {
  const containerRef = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const wavesurfer = useWavesurfer(containerRef, props)
  const onPlayClick = useCallback(() => {
    wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play()
  }, [wavesurfer])

  useEffect(() => {
    if (!wavesurfer) return

    setCurrentTime(0)
    setIsPlaying(false)

    const subscriptions = [
      wavesurfer.on('play', () => setIsPlaying(true)),
      wavesurfer.on('pause', () => setIsPlaying(false)),
      wavesurfer.on('timeupdate', (currentTime) => setCurrentTime(currentTime)),
    ]

    return () => {
      subscriptions.forEach((unsub) => unsub())
    }
  }, [wavesurfer])

  return (
    <>
      <div className='wave-container' ref={containerRef} style={{ minHeight: '120px' }} />

      <div className='rest-wrapper'>
      <button onClick={onPlayClick} style={{ marginTop: '1em' }}>
        {isPlaying ? '일시정지' : '시작'}
      </button>
      <p className='wave-timer'>경과 시간: {Math.round(currentTime * 100)/100}</p>
      </div>
    </>
  )
}

export default WaveSurferPlayer