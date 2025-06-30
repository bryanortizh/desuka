import { Injectable } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { CapacitorMusicControls } from 'capacitor-music-controls-plugin';
import { Track } from 'src/core/interface/tracker.interface';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Injectable({
  providedIn: 'root',
})
export class CapacitorFunctionService {
  async setupMusicControls(
    onPlay: () => void,
    onPause: () => void,
    onNext: () => void,
    onPrevious: () => void
  ) {
    CapacitorMusicControls.addListener('music-controls-play', () => {
      onPlay();
    });

    CapacitorMusicControls.addListener('music-controls-pause', () => {
      onPause();
    });

    CapacitorMusicControls.addListener('music-controls-next', () => {
      onNext();
    });

    CapacitorMusicControls.addListener('music-controls-previous', () => {
      onPrevious();
    });

    CapacitorMusicControls.addListener('music-controls-destroy', () => {});
  }

  async saveAndGetFileUrl(
    relativePath: string,
    imageData: string
  ): Promise<string> {
    await Filesystem.writeFile({
      path: relativePath,
      data: imageData,
      directory: Directory.Cache,
      recursive: true,
    });

    const filePath = await Filesystem.getUri({
      path: relativePath,
      directory: Directory.Cache,
    });

    return filePath.uri;
  }

  async convertImageToBase64(imageUrl: string): Promise<string> {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  async barNotificationMusic(currentTrack: Track) {
    const relativePath = `images/${currentTrack.title.replace(
      /\s+/g,
      '_'
    )}.png`;
    const imageData = await this.convertImageToBase64(currentTrack.coverImage);
    const coverUri = await this.saveAndGetFileUrl(relativePath, imageData);
    const fileExists = await Filesystem.stat({
      path: relativePath,
      directory: Directory.Cache,
    }).catch(() => null);

    if (!fileExists) {
      console.error('El archivo no se guardó correctamente.');
      return;
    }

    CapacitorMusicControls.create({
      track: currentTrack.title,
      artist: currentTrack.artist,
      album: currentTrack.title,
      cover: coverUri,
      hasPrev: true,
      hasNext: true,
      hasClose: true,
      hasScrubbing: true,
      isPlaying: true,
      dismissable: true,
      playIcon: 'media_play',
      pauseIcon: 'media_pause',
      nextIcon: 'media_next',
      prevIcon: 'media_prev',
      duration: 122,
      closeIcon: 'media_close',
      notificationIcon: 'notification',
    })
      .then(() => {})
      .catch((e) => {});
  }

  async shareTrack(currentTrack: Track) {
    try {
      const relativePath = `images/${currentTrack.title.replace(
        /\s+/g,
        '_'
      )}.png`;

      const imageData = await this.convertImageToBase64(
        currentTrack.coverImage
      );

      const coverUri = await this.saveAndGetFileUrl(relativePath, imageData);

      const fileExists = await Filesystem.stat({
        path: relativePath,
        directory: Directory.Cache,
      }).catch(() => null);

      if (!fileExists) {
        console.error('El archivo no se guardó correctamente.');
        return;
      }

      await Share.share({
        title: 'DesukaApp Lofi Song Radio',
        text: `Escucha a ${currentTrack.title} - ${currentTrack.artist} y únete a la comunidad de DesukaApp`,
        dialogTitle: 'Compartir canción',
        files: [coverUri],
        url: 'https://vm.tiktok.com/ZMBohYqv2/',
      });
    } catch (error) {
      console.error('Error al compartir el archivo:', error);
    }
  }

async scanQRCode() {
    try {
      // Solicita permiso y abre la cámara para escanear
      const result = await BarcodeScanner.scan();
      if (result.barcodes && result.barcodes.length > 0) {
        // Devuelve el valor del primer código QR detectado
        const qrValue = result.barcodes[0].rawValue;
        console.log('QR escaneado:', qrValue);
        // Aquí puedes hacer lo que necesites con el valor del QR
        return qrValue;
      } else {
        console.log('No se detectó ningún código QR.');
        return null;
      }
    } catch (error) {
      console.error('Error al escanear QR:', error);
      return null;
    }
  }
}
