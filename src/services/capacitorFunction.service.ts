import { Injectable } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';
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
    const platform = Capacitor.getPlatform();

    if (platform === 'web') {
      this.setupMediaSession(currentTrack);
      return;
    }

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

  setupMediaSession(currentTrack: Track) {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist,
        album: currentTrack.title,
        artwork: [
          {
            src: currentTrack.coverImage,
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      });
    }
  }

  updateMediaSessionPlaybackState(isPlaying: boolean) {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
    }
  }

  async shareTrack(currentTrack: Track) {
    try {
      const platform = Capacitor && (Capacitor.getPlatform ? Capacitor.getPlatform() : 'web');
      const relativePath = `images/${currentTrack.title.replace(/\s+/g, '_')}.png`;

      // Si estamos en web, intentamos compartir la imagen directamente sin guardarla
      if (platform === 'web') {
        try {
          const resp = await fetch(currentTrack.coverImage);
          const blob = await resp.blob();
          const fileName = `${currentTrack.title.replace(/\s+/g, '_')}.png`;
          const file = new File([blob], fileName, { type: blob.type || 'image/png' });

          const shareText = `Escucha a ${currentTrack.title} - ${currentTrack.artist} y únete a la comunidad de DesukaApp`;
          // Si el navegador soporta compartir archivos
          if ((navigator as any).share) {
            const canShareFiles = (navigator as any).canShare ? (navigator as any).canShare({ files: [file] }) : false;
            if (canShareFiles) {
              await (navigator as any).share({
                title: 'DesukaApp Lofi Song Radio',
                text: shareText,
                files: [file],
              });
              return;
            }
            // Fallback: intentar compartir texto + url
            try {
              await (navigator as any).share({
                title: 'DesukaApp Lofi Song Radio',
                text: shareText,
                url: currentTrack.coverImage,
              });
              return;
            } catch (err) {
              // Último recurso: abrir la imagen en una nueva pestaña
              window.open(currentTrack.coverImage, '_blank');
              return;
            }
          } else {
            // No existe navigator.share: abrir imagen en nueva pestaña
            window.open(currentTrack.coverImage, '_blank');
            return;
          }
        } catch (err) {
          console.error('Error al compartir en web:', err);
          return;
        }
      }

      // Comportamiento nativo (Android/iOS): convertir, guardar y compartir archivo
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
