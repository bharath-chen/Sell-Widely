interface AudioProps {
  audioUrl: string;
  controls?: boolean;
}

const Audio = ({ audioUrl, controls = true }: AudioProps) => {
  return (
    <div className="audio-player">
      <audio id="audio-player" controls={controls}>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Audio;
