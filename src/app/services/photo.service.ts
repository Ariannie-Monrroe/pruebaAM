import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

@Injectable({
  providedIn: 'root'
})


export class PhotoService {
  constructor() { }

  public photo: UserPhoto | undefined
  private PHOTO_STORAGE: string = 'photos';

  public async addNewToGallery() {
    if ((await Camera.checkPermissions()).camera == 'granted') {
      const capturedPhoto = await Camera.getPhoto(
        {
          resultType: CameraResultType.Uri,
          quality: 100,
          source: CameraSource.Camera,
        }
      );

      const savedImageFile = await this.savePicture(capturedPhoto);
      this.photo = savedImageFile;

      Preferences.set({
        key: this.PHOTO_STORAGE,
        value: JSON.stringify(this.photo),
      });
    }
  }
  private async savePicture(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);

    const fileName = Date.now() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    return {
      filepath: fileName,
      webviewPath: photo.webPath
    };
  }

  private async readAsBase64(photo: Photo) {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  public async loadSaved(): Promise<UserPhoto | undefined> {
    const { value } = await Preferences.get({ key: this.PHOTO_STORAGE });
    const savedPhoto = value ? JSON.parse(value) : undefined;

    if (savedPhoto) {
      const readFile = await Filesystem.readFile({
        path: savedPhoto.filepath,
        directory: Directory.Data,
      });

      savedPhoto.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      return savedPhoto;
    }

    return undefined;
  }

}
export interface UserPhoto {
  filepath: string;
  webviewPath?: string;

}
