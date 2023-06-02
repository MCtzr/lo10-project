import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { BsFillMicFill } from "react-icons/bs";


function Dictaphone(props) {
    
    const {
      transcript,
      interimTranscript,
      finalTranscript,
      resetTranscript,
      listening,
    } = useSpeechRecognition();
   
    useEffect(() => {
      if (finalTranscript !== '') {
        console.log('Le résultat', finalTranscript);
      }
      
      props.onSpeech(transcript);
      props.searchFunction()

    }, [interimTranscript, finalTranscript]);
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return null;
    }
   
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      console.log('Votre navigateur ne supporte pas le logiciel de reconnaissance vocale ! Essaye Chrome desktop, peut-être ?');
    }
    const listenContinuously = () => {
      SpeechRecognition.startListening({
        continuous: false,
        language: 'fr-FR',
      });
    };
    
    return (
      <button
        className='speechrecognition'
        onTouchStart={listenContinuously}
        onMouseDown={listenContinuously}
        onTouchEnd={SpeechRecognition.stopListening}
        onMouseUp={SpeechRecognition.stopListening}
      ><BsFillMicFill/></button>
      );
   };
   
   export default Dictaphone;