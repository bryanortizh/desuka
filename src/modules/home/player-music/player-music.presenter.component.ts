import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CapacitorMusicControls } from 'capacitor-music-controls-plugin';
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

    ngAfterViewInit() {
        CapacitorMusicControls.addListener('controlsNotification', (info: any) => {
            console.log('listener', info.message);
            this.handleControlsEvent(info);
        });
    }


    handleControlsEvent(action:any) {
        const message = action.message;
    
        console.log("message: " + message)
    
        switch (message) {
            case 'music-controls-next':
                //do something           
                console.log('Next track');    
                break;
            case 'music-controls-previous':
                //do something
                console.log('Previous track');
                break;
            case 'music-controls-pause':
                this.isPlaying = false;
                break;
            case 'music-controls-play':
    
                this.isPlaying = true;
                break;
            case 'music-controls-destroy':
                CapacitorMusicControls.destroy();
                console.log('destroyed', message);
                break;
            // External controls (iOS only)
            case 'music-controls-toggle-play-pause':
                // do something
                break;
            case 'music-controls-seek-to':
                // do something
                break;
            case 'music-controls-skip-forward':
                // Do something
                break;
            case 'music-controls-skip-backward':
                // Do something
                break;
            // Headset events (Android only)
            // All media button events are listed below
            case 'music-controls-media-button':
                this.togglePlay();
                break;
            case 'music-controls-headset-unplugged':
                // Do something
                break;
            case 'music-controls-headset-plugged':
                this.togglePlay();
                break;
            default:
                break;
        }
    }

    async loadTrack(playlist: Track[]) {
        this.playlist = playlist;
        this.imageService.getDominantColorsFromImage(this.currentTrack.cover).then((gradient) => {
            this.gradientStyle = gradient;
            this.audio.src = this.currentTrack.src;
            this.audio.load();
            this.isPlaying = true
            this.capacitorService.barNotificationMusic(this.currentTrack);
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
       
    }

    onSeek(event: any) {
        this.audio.currentTime = event.target.value;
    }

    nextTrack() {
        this.audio.src = '';
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
        this.capacitorService.barNotificationMusic(this.currentTrack);
        this.loadTrack(this.playlist);
    }

    previousTrack() {
        this.audio.src = '';
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