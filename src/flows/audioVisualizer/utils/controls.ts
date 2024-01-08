import p5, { p5InstanceExtensions } from "p5";

export const handlePlayback = (
  soundFile: p5.SoundFile,
  context: p5InstanceExtensions
) => {
  if (soundFile.isPlaying()) {
    soundFile.pause();
    context.noLoop(); // stops the draw method to run
  } else {
    soundFile.play();
    context.loop(); // resumes the draw method to run
  }
};
