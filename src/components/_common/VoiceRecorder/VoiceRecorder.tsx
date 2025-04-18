"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faStop,
  faTrash,
  faSave,
  faSpinner,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../CustomButton";
import MuiStyles from "../../../styles";
import { useVoiceRecorder } from "src/hooks/common/useVoiceRecorder";

interface VoiceRecorderProps {
  onSave?: (blob: Blob) => void;
  className?: string;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  onSave,
  className = "",
}) => {
  const {
    isRecording,
    audioBlob,
    startRecording,
    stopRecording,
    resetRecording,
    // saveRecording,
    recordingTime,
    error,
    playRecording,
    pausePlayback,
    isPlaying,
    currentPlaybackTime,
  } = useVoiceRecorder();

  const [filename, setFilename] = useState<string>("recording.wav");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Format recording time as MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Handle save with optional callback
  const handleSave = async () => {
    if (!audioBlob) return;

    setIsSaving(true);
    try {
      // saveRecording(filename);

      if (onSave) {
        // Clone the blob to make sure it's not affected by any operations
        // const blobCopy = audioBlob.slice(0, audioBlob.size, audioBlob.type);
        onSave(audioBlob);
      }
    } catch (err) {
      console.error("Error handling save:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle recording start with error handling
  const handleStartRecording = async () => {
    try {
      await startRecording();
    } catch (err) {
      console.error("Could not start recording:", err);
    }
  };

  // Handle playback toggle
  const handlePlaybackToggle = () => {
    if (isPlaying) {
      pausePlayback();
    } else {
      playRecording();
    }
  };

  return (
    <div className={`voice-recorder ${className}`}>
      <div className="recorder-container p-4 border rounded-lg shadow-sm">
        <p className="text-xl font-medium mb-4 uppercase ">Control by voice</p>

        {error && (
          <div className="error-message bg-red-50 text-red-600 p-2 rounded mb-4">
            {error}
          </div>
        )}

        <div className="controls flex flex-wrap justify-center items-center gap-2 mb-4">
          {!isRecording ? (
            <CustomButton
              variant="contained"
              onClick={handleStartRecording}
              disabled={isRecording}
              sx={MuiStyles.buttonStyles.bluePrimaryBg}
              className="!text-white flex !items-center !gap-1 !rounded-lg !py-2 !px-3"
            >
              <FontAwesomeIcon icon={faMicrophone} />
              <span>Start recording</span>
            </CustomButton>
          ) : (
            <CustomButton
              variant="contained"
              onClick={stopRecording}
              sx={MuiStyles.buttonStyles.contained.dangerActionBg}
              className="!text-white flex !items-center !gap-1 !rounded-lg !py-2 !px-3"
            >
              <FontAwesomeIcon icon={faStop} />
              <span>Stop recording</span>
            </CustomButton>
          )}

          {audioBlob && (
            <>
              <CustomButton
                variant="outlined"
                onClick={resetRecording}
                className="flex !items-center !gap-1 !border-red-600 !text-red-500 !rounded-lg !py-2 !px-3"
              >
                <FontAwesomeIcon icon={faTrash} />
                <span>Cancel</span>
              </CustomButton>

              <CustomButton
                variant="contained"
                onClick={handleSave}
                disabled={isSaving}
                className="!text-white flex !items-center !gap-1 !rounded-lg !py-2 !px-3"
              >
                <FontAwesomeIcon
                  icon={isSaving ? faSpinner : faSave}
                  className={isSaving ? "animate-spin" : ""}
                />
                <span>{isSaving ? "Uploading..." : "Confirm"}</span>
              </CustomButton>

              <CustomButton
                variant="outlined"
                onClick={handlePlaybackToggle}
                disabled={!audioBlob}
                className="flex !items-center !gap-1 !border-blue-600 !text-blue-500 !rounded-lg !py-2 !px-3"
              >
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                <span>{isPlaying ? "Pause" : "Play"}</span>
              </CustomButton>
            </>
          )}
        </div>

        {isRecording && (
          <div className="recording-status flex items-center gap-2 py-2 px-3 bg-red-50 rounded-lg">
            <div className="record-indicator w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            <span className="font-medium">
              Recording: {formatTime(recordingTime)}
            </span>
          </div>
        )}

        {isPlaying && (
          <div className="playback-status flex items-center gap-2 py-2 px-3 bg-blue-50 rounded-lg mt-2">
            <div className="play-indicator w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
            <span className="font-medium">
              Playing: {formatTime(currentPlaybackTime)} /{" "}
              {formatTime(recordingTime)}
            </span>
          </div>
        )}

        {audioBlob && !isRecording && (
          <div className="audio-info mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="mb-2 font-medium">The record is ready</p>
            <p className="text-sm text-gray-500">
              Size: {(audioBlob.size / 1024).toFixed(2)} KB | Length:{" "}
              {formatTime(recordingTime)}
            </p>

            {/* Audio playback progress bar */}
            {audioBlob && (
              <div className="playback-progress mt-3">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{
                      width: `${recordingTime > 0 ? (currentPlaybackTime / recordingTime) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}

            <div className="filename-input mt-4">
              <label htmlFor="filename" className="block text-sm mb-1">
                File name:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="filename"
                  value={filename}
                  onChange={(e) =>
                    setFilename(
                      e.target.value.endsWith(".wav")
                        ? e.target.value
                        : e.target.value
                    )
                  }
                  className="flex-1 px-3 py-2 border rounded"
                />
                {!filename.endsWith(".wav") && (
                  <span className="py-2 text-gray-500">.wav</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;
