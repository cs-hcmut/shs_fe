export const createFileFromAudioBlob = (
  audioBlob: Blob,
  filename: string = "recording"
): File => {
  return new File([audioBlob], filename, { type: "audio/wav" });
};
