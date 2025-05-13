import { Injectable } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { CapacitorMusicControls } from 'capacitor-music-controls-plugin';
import { Track } from 'src/core/interface/tracker.interface';

@Injectable({
    providedIn: 'root',
})
export class CapacitorFunctionService {
    constructor() { }

    async getFileUrl(relativePath: string): Promise<string> {
        const filePath = await Filesystem.getUri({
            path: relativePath,
            directory: Directory.Cache,
        });

        return filePath.uri;
    }

    async barNotificationMusic(currentTrack: Track) {
        CapacitorMusicControls.create({
            track: currentTrack.title,
            artist: currentTrack.artist,
            album: currentTrack.title,
            cover: 'https://img001.prntscr.com/file/img001/zvUpJWbnQJOb39O8dLKCgg.png',
            hasPrev: false,
            hasNext: false,
            hasClose: true,
            hasScrubbing: true,
            isPlaying: true,
            dismissable: true,
            playIcon: "media_play",
            pauseIcon: "media_pause",
            closeIcon: "media_close",
            notificationIcon: "notification",
        })
            .then(() => {
            })
            .catch((e) => {
            });
    }

    async shareTrack(currentTrack: Track) {
        await Share.share({
            title: 'DesukaApp Lofi Song Radio',
            text: `Escucha a ${currentTrack.title} - ${currentTrack.artist} y unete a la comunidad de DesukaApp`,
            dialogTitle: 'Compartir canción',
            url: 'https://vm.tiktok.com/ZMBohYqv2/',
        });
    }
}