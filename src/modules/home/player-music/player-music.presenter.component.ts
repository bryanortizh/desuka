import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Icons } from 'src/core/enum/icons.enum';
import { IconsSVG } from 'src/core/enum/images-svg.enum';
import { Track } from 'src/core/interface/tracker.interface';
import { CapacitorFunctionService } from 'src/services/capacitorFunction.service';
import { ImageService } from 'src/services/imageBg.service';

@Component({
    selector: 'app-player-music-presenter',
    template: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class PlayerMusicPresenterComponent {

    playlist: Track[] = [];
    modalCtrl!: ModalController
    skipNextIcon = Icons.skipNext;
    skipPreviousIcon = Icons.skipPrevious;
    playIcon = IconsSVG.playSVG;
    pauseIcon = IconsSVG.pauseSVG;
    isLikedIcon = IconsSVG.coffeLikeSVG;
    shareIcon = IconsSVG.shareSVG;
    gradientStyle: string = '';
    audio = new Audio();
    isPlaying = false;
    currentTime = 0;
    duration = 0;
    currentTrackIndex = 0;

    constructor(public imageService: ImageService, public capacitorService: CapacitorFunctionService) {
    }

    async loadTrack(playlist: Track[]) {
        this.playlist = playlist;
        const fileUrl = await this.capacitorService.getFileUrl(this.currentTrack.cover);

        this.imageService.getDominantColorsFromImage(this.currentTrack.cover).then((gradient) => {
            this.gradientStyle = gradient;
            this.audio.src = this.currentTrack.src;
            this.audio.load();
            this.isPlaying = true
            if (this.isPlaying) this.audio.play()
        });
    }

    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play();
        }
        this.isPlaying = !this.isPlaying;
        this.capacitorService.barNotificationMusic(this.currentTrack);
    }

    onSeek(event: any) {
        this.audio.currentTime = event.target.value;
    }

    nextTrack() {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
        this.capacitorService.barNotificationMusic(this.currentTrack);
        this.loadTrack(this.playlist);
    }

    previousTrack() {
        this.currentTrackIndex =
            (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
        this.capacitorService.barNotificationMusic(this.currentTrack);
        this.loadTrack(this.playlist);
    }



    formatTime(time: number): string {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }
    toggleLike() {
    }

    minimizeMusic() {
        var modalMusic = document.querySelector('ion-modal');
        if (modalMusic) {
            modalMusic.dismiss();
        } 
    }

    get currentTrack(): Track {
        return this.playlist[this.currentTrackIndex];
    }
}