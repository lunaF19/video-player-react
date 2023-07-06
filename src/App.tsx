// import { useRef, useState, useEffect, useMemo } from "react";
// import {
//   AiOutlinePlayCircle,
//   AiOutlinePauseCircle,
//   AiFillFastForward,
//   AiFillBackward,
// } from "react-icons/ai";
// import {
//   // BsVolumeOffFill,
//   BsVolumeMuteFill,
//   BsVolumeDownFill,
//   BsVolumeUpFill,
//   BsFullscreen,
//   BsFullscreenExit,
// } from "react-icons/bs";

import VideoComponenteReact from "./Components/VideoComponenteReact"
import "./App.css";

function App() {

  // const volumePromp = parseInt(prompt("Ingresa el % de volumen") || "0")
  // const percentSeenPromp = parseInt(prompt("Ingresa el % de video") || "0")
   const volumePromp = 50
   const percentSeenPromp = 30
  
  return (
    <>

    <div className="container">

      <VideoComponenteReact
        videoUrl={
          "https://ia800300.us.archive.org/17/items/BigBuckBunsny_124/Content/big_buck_bunny_720p_surround.mp4"
        }
        params={{ volume: volumePromp, percentSeen: percentSeenPromp }}
        />
    </div>
    </>
  );
}

export default App

// interface IControlsVideoParams {
//   volume: number;
//   percentSeen: number;
// }

// // interface IControlsVideo {
// //   refVideo: HTMLVideoElement;
// //   refContainerVideo: HTMLDivElement;
// //   params: IControlsVideoParams;
// // }

// interface IPropsVideoComponenteReact {
//   videoUrl: string;
//   params: IControlsVideoParams;
// }
// function VideoComponenteReact2(props: IPropsVideoComponenteReact) {
//   const { videoUrl, params } = props;
//   const refVideo = useRef<HTMLVideoElement>(null);
//   const refContainerVideo = useRef<HTMLDivElement>(null);
 
//   const btnIconSize = 30;
//   const refPercentageSeen = useRef<HTMLSpanElement>(null); 
//   const refTimeVideo = useRef<HTMLDivElement>(null);
//   const refPBVideo = useRef<HTMLInputElement>(null);

//   const [isMouseOverVideo, setIsMouseOverVideo] = useState(0);

//   const [showControls, setShowControls] = useState(false);
//   const [volumePercentage, setVolumePercentage] = useState(initState.volume);
//   const [lastVolumePercentage, setLastVolumePercentage] = useState(
//     initState.volume
//   );

//   const [isFullScreen, setFullScreen] = useState(false);
//   const [isPlayed, setIsPlayed] = useState(false);

//   function onFullScreen() {
//     try {
//       if (isFullScreen) {
//         if (document.exitFullscreen) {
//           document
//             .exitFullscreen()
//             .then(() => setFullScreen(false))
//             .catch(() => {
//               if (refContainerVideo.current) {
//                 refContainerVideo.current
//                   .requestFullscreen()
//                   .then(() => setFullScreen(true))
//                   .catch((error: Error) => console.error(error));
//               }
//             });
//         }
//       } else {
//         if (refContainerVideo.current) {
//           refContainerVideo.current
//             .requestFullscreen()
//             .then(() => setFullScreen(true))
//             .catch((error: Error) => console.error(error));
//         }
//       }
//     } catch (error) {}
//   }

//   function onClickVolumeBtn() {
//     if (volumePercentage > 0) {
//       setLastVolumePercentage(volumePercentage);
//       setVolumePercentage(0);
//     } else {
//       setLastVolumePercentage(0);
//       setVolumePercentage(lastVolumePercentage);
//     }
//   }

//   function onBackTimeVideo() {
//     if (refVideo.current)
//       refVideo.current.currentTime = refVideo.current.currentTime - 10;
//   }
//   function onForwarTimeVideo() {
//     if (refVideo.current)
//       refVideo.current.currentTime = refVideo.current.currentTime + 10;
//   }
//   function onChangePBVideo(e: React.ChangeEvent<HTMLInputElement>) {
//     if (refVideo.current) refVideo.current.currentTime = Number(e.target.value);
//   }

//   function onMouseOverContainerVideo() {
//     setIsMouseOverVideo((prev) => prev + 1);
//   }

//   function onPlayPauseVideo() {
//     // if (!iCanPlay) return;
//     if (refVideo.current) {
//       if (isPlayed) refVideo.current.pause();
//       else refVideo.current.play();
//     }
//   }

//   function onChangeRangeVolume(e: React.ChangeEvent<HTMLInputElement>) {
//     setVolumePercentage(parseInt(e.target.value));
//   }

//   function manageVolumeRange(operation: string, steep: number = 10) {
//     setVolumePercentage((prev) => {
//       let prevRangeVolume = prev;
//       switch (operation) {
//         case "+":
//           prevRangeVolume = prevRangeVolume + steep;
//           break;
//         case "-":
//           prevRangeVolume = prevRangeVolume - steep;
//           break;
//         default:
//       }

//       if (prevRangeVolume > 99) prevRangeVolume = 100;
//       if (prevRangeVolume < 1) prevRangeVolume = 0;
//       return prevRangeVolume;
//     });
//   }

//   function onKeyDownContainerVideo(
//     e: React.KeyboardEvent<HTMLDivElement> | any
//   ) {
//     // console.log({ key: e.key, isFullScreen });

//     switch (e.key.toLocaleLowerCase()) {
//       case "escape":
//         e.preventDefault();
//         onFullScreen();
//         break;
//       case "f":
//         e.preventDefault();
//         onFullScreen();
//         break;

//       case "arrowleft":
//         onBackTimeVideo();
//         break;
//       case "arrowright":
//         onForwarTimeVideo();
//         break;
//       case "arrowdown":
//         manageVolumeRange("-");
//         break;
//       case "arrowup":
//         manageVolumeRange("+");
//         break;
//       default:
//     }
//   }

//   function onLoadedData() {
//     onTimeUpdatatedVideo();
//     if (refVideo && refVideo.current) {
//       refVideo.current.currentTime = 1;
//       const totalDuration = refVideo.current.duration;
//       const percentSeen = params.percentSeen;

//       if (percentSeen > 0 && percentSeen < 100) {
//         const prevTime = getSecondsOfPercentage(percentSeen, totalDuration);
//         const prevSecond = getSeconds(prevTime);
//         const prevMinute = getMinutes(prevTime);
//         const prevHour = getHour(prevTime);

//         const strTime = `${formatTime(prevHour)}:${formatTime(
//           prevMinute
//         )}:${formatTime(prevSecond)} `;
//         let continuar = confirm(
//           `Anteriormente llevabas un ${percentSeen}% visto del video, deseas continuar viendolo en ${strTime}  `
//         );
//         if (continuar) {
//           refVideo.current.currentTime = prevTime;
//         }
//       }
//     }
//   }

//   function onTimeUpdatatedVideo() {
//     if (refVideo && refVideo.current) {
//       if (!refVideo.current.currentTime) return;

//       const totalDuration = refVideo.current.duration;
//       const totalHours: number = getHour(totalDuration);
//       const totlaMinutes: number = getMinutes(totalDuration);
//       const totalSeconds: number = getSeconds(totalDuration);

//       const hours = getHour(refVideo.current.currentTime);
//       const minutes = getMinutes(refVideo.current.currentTime);
//       const seconds = getSeconds(refVideo.current.currentTime);

//       const totalTime = `${formatTime(totalHours)}:${formatTime(
//         totlaMinutes
//       )}:${formatTime(totalSeconds)}`;
//       const currentTime = `${formatTime(hours)}:${formatTime(
//         minutes
//       )}:${formatTime(seconds)}`;

//       if (refTimeVideo && refTimeVideo.current) {
//         refTimeVideo.current.innerText = `${currentTime} / ${totalTime}`;
//       }
//       const percentageSeeOfVideo = getPercentageSeen(
//         refVideo.current.currentTime,
//         totalDuration
//       );

//       if (refPercentageSeen && refPercentageSeen.current) {
//         refPercentageSeen.current.innerHTML = `See a ${percentageSeeOfVideo}%`;
//       }

//       if (refPBVideo && refPBVideo.current) {
//         refPBVideo.current.setAttribute("max", `${totalDuration}`);
//         refPBVideo.current.setAttribute("min", "0");
//         refPBVideo.current.value = `${refVideo.current.currentTime}`;
//       }
//     }
//   }

//   useEffect(() => {
//     if (refVideo && refVideo.current) {
//       // refVideo.current.addEventListener("play", function () {
//       //   setIsPlayed(true);
//       //   // btnPlayPause.innerHTML = `<box-icon name='pause-circle'></box-icon>`;
//       // });
//       // refVideo.current.addEventListener("pause", function () {
//       //   setIsPlayed(false);
//       // });
//       // refVideo.current.addEventListener("timeupdate", onTimeUpdatatedVideo);
//       // refVideo.current.addEventListener("dblclick", onFullScreen);
//       // refVideo.current.addEventListener("loadeddata", onLoadedData);
//       // refVideo.current.addEventListener("exitfullscreen", function () {
//       //   alert();
//       // });
//       // refContainerVideo.addEventListener("keydown", onKeyDownContainerVideo);
//       // refContainerVideo.addEventListener(
//       //   "mousemove",
//       //   onMouseOverContainerVideo
//       // );
//     }
//     return () => {};
//   }, []);

//   useEffect(() => {
//     const prevIsMouseOverVideo = isMouseOverVideo;
//     setShowControls(true);
//     const idTimeOut = setTimeout(() => {
//       if (prevIsMouseOverVideo === isMouseOverVideo && isPlayed)
//         setShowControls(false);
//     }, 2000);

//     return () => {
//       clearTimeout(idTimeOut);
//     };
//   }, [isMouseOverVideo]);

//   const IconVolumenMemo = useMemo(() => {
//     if (refVideo.current) {
//       refVideo.current.volume = (volumePercentage / 100) * 1;
//     }

//     if (volumePercentage === 0) return <BsVolumeMuteFill size={btnIconSize} />;
//     if (volumePercentage < 50) return <BsVolumeDownFill size={btnIconSize} />;
//     return <BsVolumeUpFill size={btnIconSize} />;
//   }, [volumePercentage]);

//   return (
//     <div className="container">
//       {/* <BsArrowsFullscreen/> */}
//       <div className="container-video" ref={refContainerVideo}>
//         <video
//           ref={refVideo}
//           onPlay={e=> setIsPlayed(true)}
//           onPause={e=> setIsPlayed(false)}
//           onDoubleClick={onFullScreen}
//           onLoadedData={onLoadedData}
//           onTimeUpdate={onTimeUpdatatedVideo}
//           onMouseMove={onMouseOverContainerVideo}
//           onKeyDown={onKeyDownContainerVideo}
//           // onExitFullScreen

//           // poster={"https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"}
//           id="videoUpload"
//           src={videoUrl}
//         ></video>

//         <div className={`controls-video ${showControls && "show"}`}>
//           <div className="progress-video">
//             <input ref={refPBVideo} type="range" onChange={onChangePBVideo} />
//           </div>

//           <div className="forwar-back-video">
//             <button id="btnBackTimedVideo" onClick={onBackTimeVideo}>
//               <AiFillBackward size={btnIconSize} />
//             </button>

//             <div className="play-pause-video">
//               <button id="btnPlayPause" onClick={onPlayPauseVideo}>
//                 {isPlayed ? (
//                   <AiOutlinePauseCircle size={btnIconSize} />
//                 ) : (
//                   <AiOutlinePlayCircle size={btnIconSize} />
//                 )}
//               </button>
//             </div>
//             <button id="btnForwardTimeVideo" onClick={onForwarTimeVideo}>
//               <AiFillFastForward size={btnIconSize} />
//             </button>
//             <span ref={refTimeVideo}></span>
//           </div>

//           <div className="volume-video">
//             <button onClick={onClickVolumeBtn}>{IconVolumenMemo}</button>

//             <span>{volumePercentage}%</span>
//             <input
//               type="range"
//               min={0}
//               max={100}
//               value={volumePercentage}
//               onChange={onChangeRangeVolume}
//             />
//           </div>

//           <div className="video-percentage-see">
//             <span id="percentageSee" ref={refPercentageSeen}></span>
//             <button onClick={onFullScreen}>
//               {/* {JSON.stringify({ isFullScreen })} */}
//               {isFullScreen ? (
//                 <BsFullscreenExit size={btnIconSize} />
//               ) : (
//                 <BsFullscreen size={btnIconSize} />
//               )}
//             </button>
//           </div>
//         </div>

       
//       </div>
//     </div>
//   );
// }

// export default App;

// function getPercentageSeen(currentTime: number, totalDuration: number) {
//   return parseInt(`${(currentTime / totalDuration) * 100}`);
// }
// function getSecondsOfPercentage(percentage: number, totalSeconds: number) {
//   return (totalSeconds / 100) * percentage;
// }

// function formatTime(time: number) {
//   return `${time}`.length === 2 ? `${time}` : `0${time}`;
// }

// function getHour(totalDuration: number) {
//   return 0; //
// }

// function getMinutes(totalDuration: number) {
//   return parseInt(`${totalDuration / 60}`);
// }

// function getSeconds(totalDuration: number) {
//   return parseInt(`${totalDuration % 60}`);
// }

// const initState = {
//   volume: 5,
//   percentSeen: 50,
// };

// // function ControlsVideo(props: IControlsVideo) {
// //   const { refVideo, refContainerVideo, params } = props;
// //   const btnIconSize = 30;
// //   const refPercentageSeen = useRef<HTMLSpanElement>(null);
// //   // const spanVolumeVideoPercentage = useRef<HTMLSpanElement>(null);
// //   const refTimeVideo = useRef<HTMLDivElement>(null);
// //   const refPBVideo = useRef<HTMLInputElement>(null);
// //   // const refVolumenRange = useRef<HTMLInputElement>(null);

// //   const [isMouseOverVideo, setIsMouseOverVideo] = useState(0);

// //   const [showControls, setShowControls] = useState(false);
// //   const [volumePercentage, setVolumePercentage] = useState(initState.volume);
// //   const [lastVolumePercentage, setLastVolumePercentage] = useState(
// //     initState.volume
// //   );

// //   const [isFullScreen, setFullScreen] = useState(false);
// //   const [isPlayed, setIsPlayed] = useState(false);

// //   function onFullScreen() {
// //     try {
// //       if (isFullScreen) {
// //         if (document.exitFullscreen) {
// //           document
// //             .exitFullscreen()
// //             .then(() => setFullScreen(false))
// //             .catch(() => {
// //               refContainerVideo
// //                 .requestFullscreen()
// //                 .then(() => setFullScreen(true))
// //                 .catch((error: Error) => console.error(error));
// //             });
// //         }
// //       } else {
// //         if (refContainerVideo.requestFullscreen) {
// //           refContainerVideo
// //             .requestFullscreen()
// //             .then(() => setFullScreen(true))
// //             .catch((error: Error) => console.error(error));
// //         }
// //       }
// //     } catch (error) {}
// //   }

// //   function onClickVolumeBtn() {
// //     if (volumePercentage > 0) {
// //       setLastVolumePercentage(volumePercentage);
// //       setVolumePercentage(0);
// //     } else {
// //       setLastVolumePercentage(0);
// //       setVolumePercentage(lastVolumePercentage);
// //     }
// //   }

// //   function onBackTimeVideo() {
// //     refVideo.current.currentTime = refVideo.current.currentTime - 10;
// //   }
// //   function onForwarTimeVideo() {
// //     refVideo.current.currentTime = refVideo.current.currentTime + 10;
// //   }
// //   function onChangePBVideo(e: React.ChangeEvent<HTMLInputElement>) {
// //     refVideo.current.currentTime = Number(e.target.value);
// //   }

// //   function onMouseOverContainerVideo() {
// //     setIsMouseOverVideo((prev) => prev + 1);
// //   }

// //   function onPlayPauseVideo() {
// //     // if (!iCanPlay) return;
// //     if (isPlayed) refVideo.current.pause();
// //     else refVideo.current.play();
// //   }

// //   function onChangeRangeVolume(e: React.ChangeEvent<HTMLInputElement>) {
// //     setVolumePercentage(parseInt(e.target.value));
// //   }

// //   function manageVolumeRange(operation: string, steep: number = 10) {
// //     setVolumePercentage((prev) => {
// //       let prevRangeVolume = prev;
// //       switch (operation) {
// //         case "+":
// //           prevRangeVolume = prevRangeVolume + steep;
// //           break;
// //         case "-":
// //           prevRangeVolume = prevRangeVolume - steep;
// //           break;
// //         default:
// //       }

// //       if (prevRangeVolume > 99) prevRangeVolume = 100;
// //       if (prevRangeVolume < 1) prevRangeVolume = 0;
// //       return prevRangeVolume;
// //     });
// //   }

// //   function onKeyDownContainerVideo(
// //     e: React.KeyboardEvent<HTMLDivElement> | any
// //   ) {
// //     // console.log({ key: e.key, isFullScreen });

// //     switch (e.key.toLocaleLowerCase()) {
// //       case "escape":
// //         e.preventDefault();
// //         onFullScreen();
// //         break;
// //       case "f":
// //         e.preventDefault();
// //         onFullScreen();
// //         break;

// //       case "arrowleft":
// //         onBackTimeVideo();
// //         break;
// //       case "arrowright":
// //         onForwarTimeVideo();
// //         break;
// //       case "arrowdown":
// //         manageVolumeRange("-");
// //         break;
// //       case "arrowup":
// //         manageVolumeRange("+");
// //         break;
// //       default:
// //     }
// //   }

// //   function onLoadedData() {
// //     onTimeUpdatatedVideo();
// //     refVideo.current.currentTime = 1;
// //     const totalDuration = refVideo.current.duration;
// //     const percentSeen = params.percentSeen;

// //     if (percentSeen > 0 && percentSeen < 100) {
// //       const prevTime = getSecondsOfPercentage(percentSeen, totalDuration);
// //       const prevSecond = getSeconds(prevTime);
// //       const prevMinute = getMinutes(prevTime);
// //       const prevHour = getHour(prevTime);

// //       const strTime = `${formatTime(prevHour)}:${formatTime(
// //         prevMinute
// //       )}:${formatTime(prevSecond)} `;
// //       let continuar = confirm(
// //         `Anteriormente llevabas un ${percentSeen}% visto del video, deseas continuar viendolo en ${strTime}  `
// //       );
// //       if (continuar) {
// //         refVideo.current.currentTime = prevTime;
// //       }
// //     }
// //   }

// //   function onTimeUpdatatedVideo() {
// //     if (!refVideo.current.currentTime) return;

// //     const totalDuration = refVideo.current.duration;
// //     const totalHours: number = getHour(totalDuration);
// //     const totlaMinutes: number = getMinutes(totalDuration);
// //     const totalSeconds: number = getSeconds(totalDuration);

// //     const hours = getHour(refVideo.current.currentTime);
// //     const minutes = getMinutes(refVideo.current.currentTime);
// //     const seconds = getSeconds(refVideo.current.currentTime);

// //     const totalTime = `${formatTime(totalHours)}:${formatTime(
// //       totlaMinutes
// //     )}:${formatTime(totalSeconds)}`;
// //     const currentTime = `${formatTime(hours)}:${formatTime(
// //       minutes
// //     )}:${formatTime(seconds)}`;

// //     if (refTimeVideo && refTimeVideo.current) {
// //       refTimeVideo.current.innerText = `${currentTime} / ${totalTime}`;
// //     }
// //     const percentageSeeOfVideo = getPercentageSeen(
// //       refVideo.current.currentTime,
// //       totalDuration
// //     );

// //     if (refPercentageSeen && refPercentageSeen.current) {
// //       refPercentageSeen.current.innerHTML = `See a ${percentageSeeOfVideo}%`;
// //     }

// //     if (refPBVideo && refPBVideo.current) {
// //       refPBVideo.current.setAttribute("max", `${totalDuration}`);
// //       refPBVideo.current.setAttribute("min", "0");
// //       refPBVideo.current.value = `${refVideo.current.currentTime}`;
// //     }
// //   }

// //   useEffect(() => {
// //     refVideo.current.addEventListener("play", function () {
// //       setIsPlayed(true);

// //       // btnPlayPause.innerHTML = `<box-icon name='pause-circle'></box-icon>`;
// //     });
// //     refVideo.current.addEventListener("pause", function () {
// //       setIsPlayed(false);
// //     });

// //     refVideo.current.addEventListener("timeupdate", onTimeUpdatatedVideo);

// //     refVideo.current.addEventListener("dblclick", onFullScreen);
// //     refVideo.current.addEventListener("loadeddata", onLoadedData);
// //     refVideo.current.addEventListener("exitfullscreen", function () {
// //       alert();
// //     });

// //     refContainerVideo.addEventListener("keydown", onKeyDownContainerVideo);
// //     refContainerVideo.addEventListener("mousemove", onMouseOverContainerVideo);

// //     return () => {};
// //   }, []);

// //   useEffect(() => {
// //     const prevIsMouseOverVideo = isMouseOverVideo;
// //     setShowControls(true);
// //     const idTimeOut = setTimeout(() => {
// //       if (prevIsMouseOverVideo === isMouseOverVideo && isPlayed)
// //         setShowControls(false);
// //     }, 2000);

// //     return () => {
// //       clearTimeout(idTimeOut);
// //     };
// //   }, [isMouseOverVideo]);

// //   const IconVolumenMemo = useMemo(() => {
// //     if (refVideo) refVideo.current.volume = (volumePercentage / 100) * 1;

// //     if (volumePercentage === 0) return <BsVolumeMuteFill size={btnIconSize} />;
// //     if (volumePercentage < 50) return <BsVolumeDownFill size={btnIconSize} />;
// //     return <BsVolumeUpFill size={btnIconSize} />;
// //   }, [volumePercentage]);

// //   return (
// //     <div className={`controls-video ${showControls && "show"}`}>
// //       <div className="progress-video">
// //         <input ref={refPBVideo} type="range" onChange={onChangePBVideo} />
// //       </div>

// //       <div className="forwar-back-video">
// //         <button id="btnBackTimedVideo" onClick={onBackTimeVideo}>
// //           <AiFillBackward size={btnIconSize} />
// //         </button>

// //         <div className="play-pause-video">
// //           <button id="btnPlayPause" onClick={onPlayPauseVideo}>
// //             {isPlayed ? (
// //               <AiOutlinePauseCircle size={btnIconSize} />
// //             ) : (
// //               <AiOutlinePlayCircle size={btnIconSize} />
// //             )}
// //           </button>
// //         </div>
// //         <button id="btnForwardTimeVideo" onClick={onForwarTimeVideo}>
// //           <AiFillFastForward size={btnIconSize} />
// //         </button>
// //         <span ref={refTimeVideo}></span>
// //       </div>

// //       <div className="volume-video">
// //         <button onClick={onClickVolumeBtn}>{IconVolumenMemo}</button>

// //         <span>{volumePercentage}%</span>
// //         <input
// //           type="range"
// //           min={0}
// //           max={100}
// //           value={volumePercentage}
// //           onChange={onChangeRangeVolume}
// //         />
// //       </div>

// //       <div className="video-percentage-see">
// //         <span id="percentageSee" ref={refPercentageSeen}></span>
// //         <button onClick={onFullScreen}>
// //           {/* {JSON.stringify({ isFullScreen })} */}
// //           {isFullScreen ? (
// //             <BsFullscreenExit size={btnIconSize} />
// //           ) : (
// //             <BsFullscreen size={btnIconSize} />
// //           )}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }
