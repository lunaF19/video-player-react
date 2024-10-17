import VideoComponenteReact from "./Components/VideoComponenteReact";
import "./App.css";

function App() {
  const volumePromp = 50;
  const percentSeenPromp = 30;

  return (
    <>
      <div className="container">
        <VideoComponenteReact
          videoUrl={
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          }
          params={{ volume: volumePromp, percentSeen: percentSeenPromp }}
        />
      </div>
    </>
  );
}

export default App;
