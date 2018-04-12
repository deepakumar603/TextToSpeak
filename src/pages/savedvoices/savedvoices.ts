import { Component, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'saved-voices',
  templateUrl: 'savedvoices.html',
  styles:['savedvoices.scss']
})
export class SavedVoices {
    savedVoices=new Array();
    constructor(public navCtrl: NavController,private tts: TextToSpeech, private element:ElementRef, private storage: Storage){
        this.element = element;
    }

    ngOnInit(){
        this.getVoiceList();
    }

    getVoiceList(){
        this.storage.get('textForSpeaking').then((val) => {
            this.savedVoices=val;
            console.log('Textis--->', val);
        });
    }
    tapEvent(voice){
        console.log(voice);
        this.tts.speak(voice)
            .then(() => console.log('Success'))
            .catch((reason: any) => console.log(reason));
    }
}