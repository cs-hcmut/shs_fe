export const createFileFromAudioBlob = (
  audioBlob: Blob,
  filename: string = "recording"
): File => {
  return new File([audioBlob], filename, { type: "audio/wav" });
};

export const fixAudioMetadata = (audioBlob: Blob): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    // Tạo một đối tượng AudioContext
    const audioContext = new (window.AudioContext ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).webkitAudioContext)();

    // Đọc file âm thanh
    const fileReader = new FileReader();
    fileReader.onload = async (event) => {
      try {
        if (!event.target?.result) {
          throw new Error("Failed to read audio file");
        }

        // Giải mã audio data
        const audioData = await audioContext.decodeAudioData(
          event.target.result as ArrayBuffer
        );

        // Tạo destination để chứa dữ liệu âm thanh đã sửa
        const offlineAudioContext = new OfflineAudioContext(
          audioData.numberOfChannels,
          audioData.length,
          audioData.sampleRate
        );

        // Tạo source và kết nối vào destination
        const source = offlineAudioContext.createBufferSource();
        source.buffer = audioData;
        source.connect(offlineAudioContext.destination);
        source.start(0);

        // Render dữ liệu
        const renderedBuffer = await offlineAudioContext.startRendering();

        // Chuyển đổi buffer thành WAV với metadata đúng
        const wavBlob = audioBufferToWav(renderedBuffer);

        resolve(wavBlob);
      } catch (error) {
        console.error("Error fixing audio metadata:", error);
        reject(error);
      } finally {
        // Đóng AudioContext
        if (audioContext.state !== "closed") {
          audioContext.close();
        }
      }
    };

    fileReader.onerror = () => {
      reject(new Error("Error reading audio file"));
    };

    fileReader.readAsArrayBuffer(audioBlob);
  });
};

// Hàm chuyển đổi AudioBuffer thành WAV blob với metadata đúng
export const audioBufferToWav = (buffer: AudioBuffer): Blob => {
  const numberOfChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const length = buffer.length;

  // Tính toán kích thước của WAV file
  const dataLength = length * numberOfChannels * 2; // 2 bytes per sample (16-bit)
  const bufferLength = 44 + dataLength; // 44 bytes for WAV header

  // Tạo ArrayBuffer để chứa WAV file
  const arrayBuffer = new ArrayBuffer(bufferLength);
  const view = new DataView(arrayBuffer);

  // Write WAV header
  // "RIFF" chunk descriptor
  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + dataLength, true); // RIFF chunk size
  writeString(view, 8, "WAVE");

  // "fmt " sub-chunk
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true); // fmt chunk size
  view.setUint16(20, 1, true); // Audio format (1 for PCM)
  view.setUint16(22, numberOfChannels, true); // Number of channels
  view.setUint32(24, sampleRate, true); // Sample rate
  view.setUint32(28, sampleRate * numberOfChannels * 2, true); // Byte rate
  view.setUint16(32, numberOfChannels * 2, true); // Block align
  view.setUint16(34, 16, true); // Bits per sample

  // "data" sub-chunk
  writeString(view, 36, "data");
  view.setUint32(40, dataLength, true); // data chunk size

  // Write audio data
  let offset = 44;
  for (let i = 0; i < length; i++) {
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const sample = Math.max(
        -1,
        Math.min(1, buffer.getChannelData(channel)[i])
      );
      // Chuyển từ -1..1 (float) sang -32768..32767 (16-bit PCM)
      const value = sample < 0 ? sample * 32768 : sample * 32767;
      view.setInt16(offset, value, true);
      offset += 2;
    }
  }

  // Tạo Blob từ ArrayBuffer
  return new Blob([arrayBuffer], { type: "audio/wav" });
};

function writeString(view: DataView, offset: number, string: string): void {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

export const downloadAudioFile = (audioFile: File): void => {
  // Tạo URL tạm thời từ File
  const audioUrl = URL.createObjectURL(audioFile);

  // Tạo element a để tải xuống
  const downloadLink = document.createElement("a");
  downloadLink.href = audioUrl;
  downloadLink.download = audioFile.name;

  // Thêm vào DOM, kích hoạt sự kiện click và xóa
  document.body.appendChild(downloadLink);
  downloadLink.click();

  // Dọn dẹp
  document.body.removeChild(downloadLink);

  // Giải phóng URL để tránh rò rỉ bộ nhớ
  setTimeout(() => {
    URL.revokeObjectURL(audioUrl);
  }, 100);
};
