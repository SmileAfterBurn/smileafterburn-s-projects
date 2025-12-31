import { useRef, useEffect, useCallback } from 'react';

const SAMPLE_RATE = 24000;

/**
 * Custom hook for managing audio playback with Web Audio API
 * Handles AudioContext creation, audio buffer management, and cleanup
 */
export const useAudioPlayback = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  /**
   * Ensures AudioContext is initialized
   */
  const ensureAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (
        window.AudioContext || (window as any).webkitAudioContext
      )({ sampleRate: SAMPLE_RATE });
    }
    return audioContextRef.current;
  }, []);

  /**
   * Stops the currently playing audio
   */
  const stopAudio = useCallback(() => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch (e) {
        // Ignore errors if already stopped
      }
      sourceNodeRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudio();
      audioContextRef.current?.close();
    };
  }, [stopAudio]);

  /**
   * Decodes raw PCM audio data (Int16Array) into an AudioBuffer
   * @param data - Raw audio data as ArrayBuffer
   * @param sampleRate - Sample rate of the audio (default: 24000)
   * @returns Promise<AudioBuffer>
   */
  const decodeAudioData = useCallback(async (
    data: ArrayBuffer,
    sampleRate: number = SAMPLE_RATE
  ): Promise<AudioBuffer> => {
    const ctx = ensureAudioContext();

    const dataInt16 = new Int16Array(data);
    const buffer = ctx.createBuffer(1, dataInt16.length, sampleRate);
    const channelData = buffer.getChannelData(0);

    // Convert Int16 to Float32 normalized audio samples
    for (let i = 0; i < dataInt16.length; i++) {
      channelData[i] = dataInt16[i] / 32768.0;
    }

    return buffer;
  }, [ensureAudioContext]);

  /**
   * Plays an audio buffer
   * @param buffer - AudioBuffer to play
   * @param onEnded - Optional callback when playback ends
   */
  const playAudioBuffer = useCallback((
    buffer: AudioBuffer,
    onEnded?: () => void
  ) => {
    stopAudio(); // Stop any currently playing audio

    const ctx = ensureAudioContext();

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);

    if (onEnded) {
      source.onended = onEnded;
    }

    source.start(0);
    sourceNodeRef.current = source;
  }, [stopAudio, ensureAudioContext]);

  return {
    stopAudio,
    decodeAudioData,
    playAudioBuffer,
  };
};
