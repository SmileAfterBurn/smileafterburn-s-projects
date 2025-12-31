import { useRef, useEffect } from 'react';

/**
 * Custom hook for managing audio playback with Web Audio API
 * Handles AudioContext creation, audio buffer management, and cleanup
 */
export const useAudioPlayback = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudio();
      audioContextRef.current?.close();
    };
  }, []);

  /**
   * Stops the currently playing audio
   */
  const stopAudio = () => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch (e) {
        // Ignore errors if already stopped
      }
      sourceNodeRef.current = null;
    }
  };

  /**
   * Decodes raw PCM audio data (Int16Array) into an AudioBuffer
   * @param data - Raw audio data as ArrayBuffer
   * @param sampleRate - Sample rate of the audio (default: 24000)
   * @returns Promise<AudioBuffer>
   */
  const decodeAudioData = async (
    data: ArrayBuffer,
    sampleRate: number = 24000
  ): Promise<AudioBuffer> => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (
        window.AudioContext || (window as any).webkitAudioContext
      )({ sampleRate });
    }

    const dataInt16 = new Int16Array(data);
    const buffer = audioContextRef.current.createBuffer(
      1,
      dataInt16.length,
      sampleRate
    );
    const channelData = buffer.getChannelData(0);

    // Convert Int16 to Float32 normalized audio samples
    for (let i = 0; i < dataInt16.length; i++) {
      channelData[i] = dataInt16[i] / 32768.0;
    }

    return buffer;
  };

  /**
   * Plays an audio buffer
   * @param buffer - AudioBuffer to play
   * @param onEnded - Optional callback when playback ends
   */
  const playAudioBuffer = (
    buffer: AudioBuffer,
    onEnded?: () => void
  ) => {
    stopAudio(); // Stop any currently playing audio

    if (!audioContextRef.current) {
      audioContextRef.current = new (
        window.AudioContext || (window as any).webkitAudioContext
      )({ sampleRate: 24000 });
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContextRef.current.destination);

    if (onEnded) {
      source.onended = onEnded;
    }

    source.start(0);
    sourceNodeRef.current = source;
  };

  return {
    stopAudio,
    decodeAudioData,
    playAudioBuffer,
  };
};
