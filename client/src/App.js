import { useRef, useState, useEffect, useCallback } from 'react'
import Timeline from 'https://unpkg.com/wavesurfer.js@beta/dist/plugins/timeline.js'
import WaveSurferPlayer from './components/WaveSurfer'
import playButton from './assets/play-button.svg'
import "./App.css"

// Another React component that will render two wavesurfers
const App = () => {
  const urls = ['/example.mp3']
  const [audioUrl, setAudioUrl] = useState(urls[0])

  // Swap the audio URL
  const onUrlChange = useCallback(() => {
    urls.reverse()
    setAudioUrl(urls[0])
  }, [])

  // Render the wavesurfer component
  // and a button to load a different audio file
  return (
    <div className='wrapper'>
      <div className='container'>
        <div className='left'>
          <img className='play-button' src={playButton} alt=""></img>
        </div>
        <div className='right'>
        <WaveSurferPlayer
        height={100}
        waveColor="rgb(200, 0, 200)"
        progressColor="rgb(100, 0, 100)"
        url={audioUrl}
        plugins={[Timeline.create()]}
      />
        </div>
      
      </div>
    </div>
  )
}

// Create a React root and render the app
export default App
