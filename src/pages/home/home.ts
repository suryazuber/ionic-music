import { Component } from '@angular/core';
import { NavController,LoadingController,ActionSheetController } from 'ionic-angular';

import { MusicsProvider } from '../../providers/musics/musics';
import { SocialSharing } from '@ionic-native/social-sharing';

import { MusicPlayerPage } from '../music-player/music-player';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    public allMusic = [];

  constructor(
      public navCtrl: NavController,
      private MusicsProvider:MusicsProvider,
      private LoadingController:LoadingController,
      private ActionSheetController:ActionSheetController,
      private SocialSharing:SocialSharing
      ) 
  {

  }
    ionViewDidLoad()
    {      
        let allMusicLoadingController = this.LoadingController.create({
            content: "Loading your music"
        });
        allMusicLoadingController.present();
        this.MusicsProvider.getMusic()
            .subscribe((musiclist) => 
                {
                    this.allMusic = musiclist as any;
                    allMusicLoadingController.dismiss();
                }
            );
    }     
    shareSong(music)
    {
        let actionSheet = this.ActionSheetController.create({
        title: 'Share this song on',
        buttons: 
        [
            {
              text: 'Facebok',
              icon:"logo-facebook", 
              handler: () => {
                  this.SocialSharing.shareViaFacebook(music.name,music.image,music.music_url);
              }
            },
            {
              text: 'Twitter',
              icon:"logo-twitter",
              handler: () => {
                this.SocialSharing.shareViaTwitter(music.name,music.image,music.music_url);
              }
            },
            {
              text: 'Share',
              icon:"share",
              handler: () => {
                  this.SocialSharing.share(music.name,"",music.image,music.music_url);
              }
            },
            {
              text: 'Cancel',
              role: 'destructive',
              icon:"destructive",
              handler: () => {
                console.log('Cancel clicked');
              }
            }
        ]
        });
        actionSheet.present();
    }   
    goToMusic(music)
    {
        this.navCtrl.push(MusicPlayerPage,{
            music:music
        });
    }

}
