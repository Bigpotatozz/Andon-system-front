/// <reference types="vite/client" />

interface MediaDevices {
  selectAudioOutput?(): Promise<MediaDeviceInfo>;
}
