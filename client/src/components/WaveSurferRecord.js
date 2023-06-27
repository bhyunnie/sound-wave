import React, { useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import MicrophonePlugin from 'wavesurfer.js/src/plugin/microphone';

const WaveSurferRecord = () => {
  const wavesurferRef = useRef(null);

  useEffect(() => {
    // Wavesurfer 초기화
    const wavesurfer = WaveSurfer.create({
      container: wavesurferRef.current,
      plugins: [MicrophonePlugin.create()],
    });

    // 마이크 플러그인 사용 설정
    wavesurfer.microphone.init({
      bufferSize: 4096,
    });

    // 마이크 플러그인 이벤트 리스너 설정
    wavesurfer.microphone.on('deviceReady', () => {
      console.log('마이크가 준비되었습니다.');
    });

    // 컴포넌트 언마운트 시 Wavesurfer 및 마이크 플러그인 정리
    return () => {
      wavesurfer.destroy();
      wavesurfer.microphone.destroy();
    };
  }, []);

  return (
    <div>
      <div ref={wavesurferRef}></div>
    </div>
  );
};

export default WaveSurferRecord