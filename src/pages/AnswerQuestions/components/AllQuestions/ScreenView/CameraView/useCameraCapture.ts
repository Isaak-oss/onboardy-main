import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

type useCameraCaptureProps = {
  onError: () => void;
};

export const useCameraCapture = ({ onError }: useCameraCaptureProps) => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [seconds, setSeconds] = useState(0);

  const handleDataAvailable = useCallback((event: BlobEvent) => {
    if (event.data.size > 0) {
      setRecordedChunks((prev) => prev.concat(event.data));
    }
  }, []);

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    const stream = webcamRef.current?.stream;
    if (!stream) return;

    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });

    mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
    mediaRecorderRef.current.start();
  }, [setCapturing, handleDataAvailable]);

  async function checkCameraPermission() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      stream.getTracks().forEach((track) => track.stop());
      handleStartCaptureClick();
      return true;
    } catch (err) {
      onError();
      console.log(err);
      return false;
    }
  }

  useEffect(() => {
    checkCameraPermission();
  }, [handleStartCaptureClick]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (capturing) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [capturing]);

  const handleStopCaptureClick = React.useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }
  }, []);

  // const handleDownload = React.useCallback(() => {
  //   if (recordedChunks.length) {
  //     const blob = new Blob(recordedChunks, {
  //       type: "video/webm",
  //     });
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     document.body.appendChild(a);
  //     a.style = "display: none";
  //     a.href = url;
  //     a.download = "react-webcam-stream-capture.webm";
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //     setRecordedChunks([]);
  //   }
  // }, [recordedChunks]);

  return {
    handleStopCaptureClick,
    recordedChunks,
    capturing,
    webcamRef,
    seconds
  };
};
