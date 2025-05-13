import { Component, Input, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { statusPlayer } from 'src/core/enum/statusPlayer.enum';
import { TimeOut } from 'src/core/enum/timeout.enum';
import { Track } from 'src/core/interface/tracker.interface';

@Component({
    selector: 'app-home-list-presenter',
    template: '',
    standalone: false,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeListPresenterComponent implements OnInit {

    playlist: Track[] = [];
    showCompleteMusic: boolean = false;
    statusPlayer = '';
    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit() { }

    showHideMusicBar() {
        const musicBar = document.querySelector('.music-bar');
        if (musicBar) {
            musicBar.classList.toggle('show');
        }
    }

    sendTrackPlayer() {
        this.destroyMusicModal();
        this.playlist = [
            {
                title: 'Chrono',
                artist: 'Monma',
                src: 'assets/music/test.mp3',
                cover: 'assets/img/test.png'
            },
            {
                title: 'Evening Vibes',
                artist: 'Lofigirl',
                src: 'assets/music/test2.mp3',
                cover: 'assets/img/test3.png'
            },
        ]
        this.cdr.detectChanges();
        this.showCompleteMusic = true;
        setTimeout(() => {
            this.showMusicModal();
        }, TimeOut.VERY_SHORT);
    }


    sendTrackPlayer2() {
        this.destroyMusicModal();
        this.playlist = [
            {
                title: 'Chrono',
                artist: 'Monma',
                src: 'assets/music/test2.mp3',
                cover: 'assets/img/test3.png'
            },
            {
                title: 'Evening Vibes',
                artist: 'Lofigirl',
                src: 'assets/music/test.mp3',
                cover: 'assets/img/test.png'
            },
        ]
        this.cdr.detectChanges();
        this.showCompleteMusic = true;
        setTimeout(() => {
            this.showMusicModal();
        }, TimeOut.VERY_SHORT);
    }

    showMusicModal() {
        var modalMusic = document.querySelector('ion-modal');
        if (modalMusic) {
            modalMusic.keepContentsMounted = true;
            modalMusic.present();
            this.cdr.detectChanges();
        }
    }

    destroyMusicModal() {
        this.showCompleteMusic = false;
        var modalMusic = document.querySelector('ion-modal');
        if (modalMusic) {
            modalMusic.keepContentsMounted = false;
            modalMusic.dismiss();
            this.cdr.detectChanges();
        }
    }

    closeMusicComplete(event: Event) {
        this.statusPlayer = statusPlayer.MINIMIZED;
    }
}