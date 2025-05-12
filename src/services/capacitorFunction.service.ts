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
            track: currentTrack.title, // optional, default : ''
            artist: currentTrack.artist, // optional, default : ''
            album: currentTrack.title, // optional, default: ''
            cover: 'https://img001.prntscr.com/file/img001/zvUpJWbnQJOb39O8dLKCgg.png', // optional, default : nothing
            hasPrev: false, // show previous button, optional, default: true
            hasNext: false, // show next button, optional, default: true
            hasClose: true, // show close button, optional, default: false
            hasScrubbing: true, // default: false. Enable scrubbing from control center progress bar
            isPlaying: true, // default : true
            dismissable: true, // default : false
            playIcon: "media_play",
            pauseIcon: "media_pause",
            closeIcon: "media_close",
            notificationIcon: "notification",
        })
            .then(() => {
            })
            .catch((e) => {
                console.log(e);
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