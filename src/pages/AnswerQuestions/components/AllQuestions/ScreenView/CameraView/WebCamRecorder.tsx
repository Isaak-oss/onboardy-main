import React from "react";
import Webcam from "react-webcam";

const formatTime = (s: number) => {
  const m = Math.floor(s / 60)
    .toString()
    .padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
};

const WebCamRecorder = ({
  webcamRef,
  seconds,
  duration,
}: {
  webcamRef: any;
  seconds: number;
  duration: number;
}) => {
  return (
    <div className="relative flex-1">
      <div className="absolute top-0 left-0 h-[80vh] w-[100%]">
        <Webcam audio={true} ref={webcamRef} className="h-[100%]" />
        <div>
          {formatTime(seconds)}/{formatTime(duration * 60)}
        </div>
      </div>
    </div>
  );
};

export default WebCamRecorder;
