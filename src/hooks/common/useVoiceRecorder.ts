/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Hook states for voice recording functionality
 */
interface UseVoiceRecorderReturn {
  isRecording: boolean;
  audioBlob: Blob | null;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  resetRecording: () => void;
  saveRecording: (filename?: string) => void;
  playRecording: () => void;
  pausePlayback: () => void;
  isPlaying: boolean;
  recordingTime: number;
  currentPlaybackTime: number;
  error: string | null;
}

/**
 * Custom hook to handle voice recording functionality
 * Avoids creating blob URLs for playback to prevent "ERR_REQUEST_RANGE_NOT_SATISFIABLE" error
 * @returns {UseVoiceRecorderReturn} Object containing recording state and methods
 */
export const useVoiceRecorder = (): UseVoiceRecorderReturn => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState<number>(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const playbackTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup function
  useEffect(() => {
    return () => {
      stopAllMedia();
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current.src = "";
      }
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
      }
    };
  }, []);

  // Helper function to stop all media and timers
  const stopAllMedia = () => {
    if (mediaRecorderRef.current && isRecording) {
      try {
        mediaRecorderRef.current.stop();
      } catch (err) {
        console.error("Error stopping media recorder:", err);
      }
    }

    if (streamRef.current) {
      try {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      } catch (err) {
        console.error("Error stopping media tracks:", err);
      }
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setIsRecording(false);
  };

  // Start recording function
  const startRecording = useCallback(async () => {
    try {
      // Reset states
      setError(null);
      setAudioBlob(null);
      audioChunksRef.current = [];
      setRecordingTime(0);

      // Stop any previous recording session
      stopAllMedia();

      // Stop any playing audio
      pausePlayback();

      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      streamRef.current = stream;

      // Create new MediaRecorder with specific MIME type and bitrate
      const options = {
        mimeType: "audio/webm;codecs=opus",
        audioBitsPerSecond: 128000,
      };

      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;

      // Set up event handlers
      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        try {
          // Create WAV blob
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/wav",
          });
          setAudioBlob(audioBlob);
          setIsRecording(false);

          // Stop all tracks
          if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
          }

          // Clear timer
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        } catch (err) {
          console.error("Error processing recorded data:", err);
          setError("Lỗi khi xử lý bản ghi âm");
        }
      };

      mediaRecorder.onerror = (event) => {
        console.error("MediaRecorder error:", event);
        setError("Lỗi trình ghi âm");
        stopAllMedia();
      };

      // Start recording with 10ms timeslice to get frequent ondataavailable events
      mediaRecorder.start(10);
      setIsRecording(true);

      // Set up timer to track recording duration
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Error starting recording:", err);
      setError(
        err instanceof Error ? err.message : "Có lỗi khi bắt đầu ghi âm"
      );
      stopAllMedia();
    }
  }, []);

  // Stop recording function
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      try {
        mediaRecorderRef.current.stop();
      } catch (err) {
        console.error("Error stopping recording:", err);
        setError("Lỗi khi dừng ghi âm");
        stopAllMedia();
      }
    }
  }, [isRecording]);

  // Reset recording function
  const resetRecording = useCallback(() => {
    stopAllMedia();
    pausePlayback();
    setAudioBlob(null);
    setRecordingTime(0);
    setCurrentPlaybackTime(0);
    setError(null);
    audioChunksRef.current = [];
  }, []);

  // Save recording as .wav file
  const saveRecording = useCallback(
    (filename: string = "voice_record") => {
      if (!audioBlob) {
        setError("Không có bản ghi âm để lưu");
        return;
      }

      try {
        // Create and use a temporary URL to initiate download
        const url = window.URL.createObjectURL(audioBlob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = filename;

        // Append to body, click and remove
        document.body.appendChild(a);
        a.click();

        // Quick cleanup
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 100);
      } catch (err) {
        console.error("Error saving recording:", err);
        setError(
          err instanceof Error ? err.message : "Có lỗi khi lưu bản ghi âm"
        );
      }
    },
    [audioBlob]
  );

  // Play recording function
  const playRecording = useCallback(() => {
    if (!audioBlob) {
      setError("Không có bản ghi âm để phát");
      return;
    }

    try {
      // Stop any previous playback
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }

      // Clear any existing playback timer
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
        playbackTimerRef.current = null;
      }

      // Create a temporary audio element if it doesn't exist
      if (!audioPlayerRef.current) {
        audioPlayerRef.current = new Audio();
      }

      // Create a blob URL for the audio
      const audioUrl = window.URL.createObjectURL(audioBlob);

      // Set up audio player
      audioPlayerRef.current.src = audioUrl;
      audioPlayerRef.current.onloadedmetadata = () => {
        if (audioPlayerRef.current) {
          audioPlayerRef.current.play().catch((err) => {
            console.error("Error playing audio:", err);
            setError("Lỗi khi phát bản ghi âm");
            setIsPlaying(false);
          });
        }
      };

      // Set up event listeners
      audioPlayerRef.current.onplay = () => {
        setIsPlaying(true);
        // Start a timer to update current playback time
        playbackTimerRef.current = setInterval(() => {
          if (audioPlayerRef.current) {
            setCurrentPlaybackTime(
              Math.floor(audioPlayerRef.current.currentTime)
            );
          }
        }, 1000);
      };

      audioPlayerRef.current.onpause = () => {
        setIsPlaying(false);
        if (playbackTimerRef.current) {
          clearInterval(playbackTimerRef.current);
          playbackTimerRef.current = null;
        }
      };

      audioPlayerRef.current.onended = () => {
        setIsPlaying(false);
        setCurrentPlaybackTime(0);
        // Revoke the URL to free up memory
        window.URL.revokeObjectURL(audioUrl);
        if (playbackTimerRef.current) {
          clearInterval(playbackTimerRef.current);
          playbackTimerRef.current = null;
        }
      };

      audioPlayerRef.current.onerror = (event) => {
        console.error("Audio playback error:", event);
        setError("Lỗi khi phát bản ghi âm");
        setIsPlaying(false);
        window.URL.revokeObjectURL(audioUrl);
        if (playbackTimerRef.current) {
          clearInterval(playbackTimerRef.current);
          playbackTimerRef.current = null;
        }
      };
    } catch (err) {
      console.error("Error setting up audio playback:", err);
      setError(
        err instanceof Error ? err.message : "Có lỗi khi phát bản ghi âm"
      );
    }
  }, [audioBlob]);

  // Pause playback function
  const pausePlayback = useCallback(() => {
    if (audioPlayerRef.current && isPlaying) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);

      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
        playbackTimerRef.current = null;
      }
    }
  }, [isPlaying]);

  return {
    isRecording,
    audioBlob,
    startRecording,
    stopRecording,
    resetRecording,
    saveRecording,
    playRecording,
    pausePlayback,
    isPlaying,
    recordingTime,
    currentPlaybackTime,
    error,
  };
};
