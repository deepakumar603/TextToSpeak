import { Component, ViewChild,ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styles:['home.scss']
})
export class HomePage {

  textToSpeak: string;
  @ViewChild('input') myInput;

  constructor(public navCtrl: NavController, private tts: TextToSpeech,private element:ElementRef, private storage: Storage) {
    this.element = element;
  }

  ionViewLoaded() {
    setTimeout(() => {
      this.myInput.setFocus();
    }, 150);
  }
  ngAfterViewInit(){
    this.element.nativeElement.querySelector("textarea").style.height = "100%";
  }
  speakText() {
    this.myInput.setFocus();
    this.tts.speak(this.textToSpeak)
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
  }

  refreshText() {
    this.textToSpeak = "";
    this.myInput.setFocus();
  }
  makeFocus() {
    this.myInput.setFocus();
  }
  saveText() {
    if (this.textToSpeak != "" || this.textToSpeak != null) {
      this.storage.set('textForSpeaking', this.textToSpeak);
    }
  }
  getText() {
    this.storage.get('textForSpeaking').then((val) => {
      console.log('Textis--->', val);
    });
  }
}
