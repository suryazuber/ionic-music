import { Component } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media';

import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the MusicPlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-music-player',
  templateUrl: 'music-player.html',
})
export class MusicPlayerPage {
    public music={};
    private songMedia:MediaObject = null;
    private isMusicPaused = false;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private Media: Media
        )
    {

    }

    ionViewDidLoad() {
      this.music = this.navParams.get("music");
    }

    playTrack()
    {
        if(this.songMedia === null)
        {
            console.log(this.music['music_url']);
            this.songMedia = this.Media.create(this.music['music_url']);
            this.songMedia.play();
        }
        else if(this.isMusicPaused)
        {
            this.songMedia.play();
            this.isMusicPaused = false;
        }
    }
    pauseTrack()
    {
        if(this.songMedia !== null)
        {
            this.songMedia.pause();
        }
    }
    stopTrack()
    {
        if(this.songMedia !== null)
        {
            this.songMedia.stop();
            this.songMedia.release();
            this.songMedia = null;
        }

    }

}
