import { useRef, useState, useEffect, useMemo } from "react";
import {
  AiOutlinePlayCircle,
  AiOutlinePauseCircle,
  AiFillFastForward,
  AiFillBackward,
} from "react-icons/ai";
import { AiOutlineLoading } from "react-icons/ai";
import {
  BsVolumeMuteFill,
  BsVolumeDownFill,
  BsVolumeUpFill,
  BsFullscreen,
  BsFullscreenExit,
} from "react-icons/bs";
import { RiSpeedLine } from "react-icons/ri";

import "./VideoComponenteReact.css";

const initState = {
  volume: 5,
  percentSeen: 50,
};

function VideoComponenteReact(props) {
  const { videoUrl, params } = props;
  const refVideo = useRef(null);
  const refContainerVideo = useRef(null);
  const [isLoadDataVideo, setIsLoadDataVideo] = useState(false);
  const btnIconSize = 30;
  const refPercentageSeen = useRef(null);
  const refTimeVideo = useRef(null);
  const refPBVideo = useRef(null);
  const [isMouseOverVideo, setIsMouseOverVideo] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [volumePercentage, setVolumePercentage] = useState(initState.volume);
  const [lastVolumePercentage, setLastVolumePercentage] = useState(
    initState.volume
  );
  const [playbackRateVideo, setPlayackRateVideo] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPlayed, setIsPlayed] = useState(false);
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);
  function onFullScreen() {
    try {
      if (isFullScreen) {
        if (document.exitFullscreen) {
          document
            .exitFullscreen()
            .then(() => setIsFullScreen(false))
            .catch(() => {
              if (refContainerVideo.current) {
                refContainerVideo.current
                  .requestFullscreen()
                  .then(() => setIsFullScreen(true))
                  .catch((error) => console.error(error));
              }
            });
        }
      } else {
        if (refContainerVideo.current) {
          refContainerVideo.current
            .requestFullscreen()
            .then(() => setIsFullScreen(true))
            .catch((error) => console.error(error));
        }
      }
    } catch (error) {}
  }
  function onLoadVideo() {
    console.log("onLoadVideo");
  }
  /**
   * Cuando se le da click al buton de volumen
   */
  function onClickVolumeBtn() {
    const equalsZero = [volumePercentage, lastVolumePercentage].every(
      (item) => item === 0
    );
    if (equalsZero) {
      setLastVolumePercentage(0);
      setVolumePercentage(100);
      return;
    }
    if (volumePercentage > 0) {
      setLastVolumePercentage(volumePercentage);
      setVolumePercentage(0);
    } else {
      setLastVolumePercentage(0);
      setVolumePercentage(lastVolumePercentage);
    }
  }
  function onClickPlayackRateVideo() {
    if (refVideo.current && refVideo.current.playbackRate) {
      const playbackRate = refVideo.current.playbackRate;
      let newValue = 0;
      switch (playbackRate) {
        case 0.25:
          newValue = 0.5;
          break;
        case 0.5:
          newValue = 0.75;
          break;
        case 0.75:
          newValue = 1;
          break;
        case 1:
          newValue = 1.25;
          break;
        case 1.25:
          newValue = 1.5;
          break;
        case 1.5:
          newValue = 1.75;
          break;
        case 1.75:
          newValue = 2;
          break;
        case 2:
          newValue = 0.25;
          break;
        default:
          newValue = 1;
          break;
      }

      refVideo.current.playbackRate = newValue;

      setPlayackRateVideo(refVideo.current.playbackRate);
    }
  }
  /**
   * Para retrocede el tiempo del video
   */
  function onBackTimeVideo() {
    if (refVideo.current)
      refVideo.current.currentTime = refVideo.current.currentTime - 10;
  }
  /**
   * Para adelantar el tiempo del video
   */
  function onForwarTimeVideo() {
    if (refVideo.current)
      refVideo.current.currentTime = refVideo.current.currentTime + 10;
  }
  function onChangePBVideo(e) {
    setIsLoadingVideo(true);
    if (refVideo.current) refVideo.current.currentTime = Number(e.target.value);
  }
  function onMouseOverContainerVideo() {
    setIsMouseOverVideo((prev) => prev + 1);
  }
  function onPlayPauseVideo() {
    if (refVideo && refVideo.current) {
      setIsPlayed((prev) => !prev);
    }
  }
  /**
   * Para cuando el volumen cambia
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  function onChangeRangeVolume(e) {
    window.localStorage.setItem("react-video-volume", e.target.value);
    setVolumePercentage(parseInt(e.target.value));
  }
  /**
   * Maneja el rango del volumen
   * @param {String} operation Suma o resta volumen
   * @param {Number} steep Paso que hace
   */
  function manageVolumeRange(operation, steep = 10) {
    setVolumePercentage((prev) => {
      const currentRangeVolume = prev;
      const residuo = currentRangeVolume % steep;
      let prevRangeVolume = prev;
      let newVolumen = 0;
      switch (operation) {
        case "+":
          newVolumen = currentRangeVolume - residuo + steep;
          break;
        case "-":
          newVolumen = currentRangeVolume - residuo - steep;
          break;
        default:
      }
      if (newVolumen > 99) prevRangeVolume = 100;
      if (newVolumen < 1) prevRangeVolume = 0;
      if (newVolumen > 100) newVolumen = 100;
      if (newVolumen < 0) newVolumen = 0;
      window.localStorage.setItem("react-video-volume", newVolumen.toString());
      return newVolumen;
    });
  }
  /**
   * Cuando una tecla es precionada desde el container del video
   * @param {React.KeyboardEvent<HTMLDivElement> | any} e
   */
  function onKeyDownContainerVideo(e) {
    console.log({ key: e.key.toLocaleLowerCase() });
    switch (e.key.toLocaleLowerCase()) {
      case " ":
        e.preventDefault();
        onPlayPauseVideo();
        break;
      case "m":
        e.preventDefault();
        onClickVolumeBtn();
        break;
      case "escape":
        e.preventDefault();
        onFullScreen();
        break;
      case "f":
        e.preventDefault();
        onFullScreen();
        break;
      case "arrowleft":
        onBackTimeVideo();
        break;
      case "arrowright":
        onForwarTimeVideo();
        break;
      case "arrowdown":
        manageVolumeRange("-");
        break;
      case "arrowup":
        manageVolumeRange("+");
        break;
      default:
    }
  }
  function onProgress() {
    console.log("onProgress");
  }
  function onCanPlayThrough() {
    setIsLoadingVideo(false);
    onTimeUpdatatedVideo();
  }
  /**
   * Cuando se carga por primera vez la data del video
   */
  function onLoadedData() {
    setIsLoadDataVideo(true);
    onTimeUpdatatedVideo();
    if (refVideo && refVideo.current) {
      refVideo.current.currentTime = 1;
      const totalDuration = refVideo.current.duration;
      const percentSeen = params.percentSeen;
      if (percentSeen > 0 && percentSeen < 100) {
        const prevTime = getSecondsOfPercentage(percentSeen, totalDuration);
        const prevSecond = getSeconds(prevTime);
        const prevMinute = getMinutes(prevTime);
        const prevHour = getHour(prevTime);
        const strTime = `${formatTime(prevHour)}:${formatTime(
          prevMinute
        )}:${formatTime(prevSecond)} `;
        let continuar = confirm(
          `Anteriormente llevabas un ${percentSeen}% visto del video, deseas continuar viendolo en ${strTime}  `
        );
        if (continuar) {
          refVideo.current.currentTime = prevTime;
        }
      }
    }
  }
  /**
   * Cuando el tiempo actual de reproducción cambia
   */
  function onTimeUpdatatedVideo() {
    if (refVideo && refVideo.current) {
      if (!refVideo.current.currentTime) return;
      if (!refVideo.current.duration) return;
      const totalDuration = refVideo.current.duration;
      const totalHours = getHour(totalDuration);
      const totlaMinutes = getMinutes(totalDuration);
      const totalSeconds = getSeconds(totalDuration);
      const currentDuration = refVideo.current.currentTime;
      const currentHour = getHour(currentDuration);
      const currentMinute = getMinutes(currentDuration);
      const currentSecond = getSeconds(currentDuration);
      const leftDuration = totalDuration - currentDuration;
      const leftHour = getHour(leftDuration);
      const leftMinute = getMinutes(leftDuration);
      const leftSecond = getSeconds(leftDuration);
      const strTotalTime = formatTimeStr(
        totalHours,
        totlaMinutes,
        totalSeconds
      );
      const strLeftTime = formatTimeStr(leftHour, leftMinute, leftSecond);
      const strCurrentTime = formatTimeStr(
        currentHour,
        currentMinute,
        currentSecond
      );
      if (refTimeVideo && refTimeVideo.current) {
        refTimeVideo.current.innerText = `${strCurrentTime} / ${strLeftTime}  `;
      }
      const percentageSeeOfVideo = getPercentageSeen(
        currentDuration,
        totalDuration
      );
      if (refPercentageSeen && refPercentageSeen.current) {
        refPercentageSeen.current.innerHTML = `See a ${percentageSeeOfVideo}%`;
      }
      if (refPBVideo && refPBVideo.current) {
        refPBVideo.current.setAttribute("max", `${totalDuration}`);
        refPBVideo.current.setAttribute("min", "0");
        refPBVideo.current.value = `${currentDuration}`;
      }
    }
  }
  const IconVolumenMemo = useMemo(() => {
    if (refVideo.current) {
      refVideo.current.volume = (volumePercentage / 100) * 1;
    }
    if (volumePercentage === 0) return <BsVolumeMuteFill size={btnIconSize} />;
    if (volumePercentage < 50) return <BsVolumeDownFill size={btnIconSize} />;
    return <BsVolumeUpFill size={btnIconSize} />;
  }, [volumePercentage]);
  useEffect(() => {
    document.addEventListener("keydown", onKeyDownContainerVideo);
    return () => {
      document.removeEventListener("keydown", onKeyDownContainerVideo);
    };
  }, [
    //isMouseOverVideo,
    showControls,
    volumePercentage,
    lastVolumePercentage,
    playbackRateVideo,
    isFullScreen,
    isPlayed,
    isLoadingVideo,
  ]);
  useEffect(() => {
    const prevIsMouseOverVideo = isMouseOverVideo;
    setShowControls(true);
    const idTimeOut = setTimeout(() => {
      if (prevIsMouseOverVideo === isMouseOverVideo && isPlayed)
        setShowControls(false);
    }, 2000);
    return () => {
      clearTimeout(idTimeOut);
    };
  }, [isMouseOverVideo]);
  useEffect(() => {
    if (refVideo && refVideo.current) {
      if (!isPlayed) refVideo.current.pause();
      else refVideo.current.play();
    }
  }, [isPlayed]);
  return (
    <>
      <div
        className="container-video"
        onMouseMove={onMouseOverContainerVideo}
        ref={refContainerVideo}
      >
        <div className={`video-loading ${isLoadingVideo ? "show" : ""}`}>
          <div className="container-icons">
            <AiOutlineLoading size={btnIconSize * 2} color="black" />
            <AiOutlineLoading size={btnIconSize * 2} color="white" />
            <AiOutlineLoading size={btnIconSize * 2} color="gray" />
          </div>
        </div>

        <video
          ref={refVideo}
          onClick={onPlayPauseVideo}
          onDoubleClick={onFullScreen}
          onLoadedData={onLoadedData}
          onTimeUpdate={onTimeUpdatatedVideo}
          onProgress={onProgress}
          onCanPlayThrough={onCanPlayThrough}
          onLoad={onLoadVideo}
          id="videoUpload"
          src={videoUrl}
        ></video>

        <div className={`controls-video ${showControls ? "show" : ""}`}>
          <div className="progress-video">
            <input ref={refPBVideo} type="range" onChange={onChangePBVideo} />
          </div>

          <div className="manage-time-video">
            {/* Arrow ForBack Video*/}
            <button id="btnBackTimedVideo" onClick={onBackTimeVideo}>
              <AiFillBackward size={btnIconSize} />
            </button>

            {/* Button Play/Pausa Video */}
            <div className="play-pause-video">
              <button onClick={onPlayPauseVideo}>
                {isPlayed ? (
                  <AiOutlinePauseCircle size={btnIconSize} />
                ) : (
                  <AiOutlinePlayCircle size={btnIconSize} />
                )}
              </button>
            </div>

            {/* Arrow ForWard Video */}
            <button id="btnForwardTimeVideo" onClick={onForwarTimeVideo}>
              <AiFillFastForward size={btnIconSize} />
            </button>

            {/* Time of video */}
            <span ref={refTimeVideo}></span>

            {/* Speed of video */}
            <button className="speed-video" onClick={onClickPlayackRateVideo}>
              <RiSpeedLine size={btnIconSize} />
              <span> {playbackRateVideo} </span>
            </button>
          </div>

          {/* Volume Controls */}
          <div
            className="volume-video"
            onWheel={(e) => manageVolumeRange(e.deltaY > 0 ? "-" : "+", 5)}
          >
            <button onClick={onClickVolumeBtn}>{IconVolumenMemo}</button>

            <span>{volumePercentage}%</span>
            <input
              type="range"
              min={0}
              max={100}
              value={volumePercentage}
              onChange={onChangeRangeVolume}
            />
          </div>

          <div className="video-percentage-see">
            <span id="percentageSee" ref={refPercentageSeen}></span>
            <button onClick={onFullScreen}>
              {isFullScreen ? (
                <BsFullscreenExit size={btnIconSize} />
              ) : (
                <BsFullscreen size={btnIconSize} />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default VideoComponenteReact;
function getPercentageSeen(currentTime, totalDuration) {
  return parseInt(`${(currentTime / totalDuration) * 100}`);
}
function getSecondsOfPercentage(percentage, totalSeconds) {
  return (totalSeconds / 100) * percentage;
}
const formatTimeStr = (h, m, s) =>
  `${formatTime(h)}:${formatTime(m)}:${formatTime(s)}`;
function formatTime(time) {
  return `${time}`.length === 2 ? `${time}` : `0${time}`;
}
function getHour(totalDuration) {
  return 0; //
}
function getMinutes(totalDuration) {
  return parseInt(`${totalDuration / 60}`);
}
function getSeconds(totalDuration) {
  return parseInt(`${totalDuration % 60}`);
}
