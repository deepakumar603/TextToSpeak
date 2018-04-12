import { Component, ViewChild,ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Storage } from '@ionic/storage';
import { SavedVoices } from '../savedvoices/savedvoices';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styles:['home.scss']
})
export class HomePage {

  textToSpeak: string;
  textToSpeakList=new Array();
  @ViewChild('input') myInput;

  constructor(public navCtrl: NavController, private tts: TextToSpeech,private element:ElementRef, private storage: Storage) {
    this.element = element;
    console.log(screen.availHeight);
  }

  ionViewLoaded() {
    setTimeout(() => {
      this.myInput.setFocus();
    }, 150);
  }
  ngAfterViewInit(){
    this.element.nativeElement.querySelector("textarea").style.height = document.getElementsByClassName('myDiv').length+"px";
  }
  ngOninit(){
    this.textToSpeak="";
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
    if (this.textToSpeak != undefined && this.textToSpeak != "" && this.textToSpeak != null) {
      this.textToSpeakList.push(this.textToSpeak);
      this.storage.set('textForSpeaking', this.textToSpeakList);
    }
  }
  getText() {
    this.navCtrl.push(SavedVoices);
  }
}
