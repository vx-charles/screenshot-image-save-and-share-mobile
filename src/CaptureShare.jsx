import React, { useState, useRef } from "react";
import { Text, View, Image, Button, StyleSheet } from "react-native";

import ViewShot, { captureRef } from 'react-native-view-shot';
import CameraRoll from "@react-native-community/cameraroll";
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

const styles = StyleSheet.create({
    image: {
      width: 300,
      height: 300,
      marginBottom: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
});

export function CaptureShareScreen (props) {

    const viewShotRef = useRef();
    const [getImage, setGetImage] = useState("")

    const saveImageDevice = () => {
        CameraRoll.save(getImage, 'photo') // salva a imagem no dispositivo dentro da pasta images do android
    }    

    const takeSnapshot = async () => {
        if (viewShotRef.current) {

            const capture = await captureRef(viewShotRef, {
                format: 'jpg',
                quality: 0.8,
            })
            
            setGetImage(capture)

            const codifyImage = await RNFS.readFile(capture, 'base64') // codifica iamgem em base64 para o Share exibir a imagem
            
            const shareOptions = {
                title: 'Compartilhar imagem',
                message: "Imagem capturada com sucesso.",
                url: "data:image/jpeg;base64," + codifyImage,
                type: 'image/jpg',
            }
                    
            await Share.open(shareOptions); // exibe a funcionalidade do android ou IOS de compartilhar
        }
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Funcionalidade para capturar a imagem e salvar no dispositivo</Text>
            
          <ViewShot ref={viewShotRef}>
              <Image
                  source={ require('./images/paisagemImage.jpg') }
                  resizeMode={'contain'}
                  style={styles.image}
              />
          </ViewShot>

          <Button title="Capture Screen" onPress={takeSnapshot} />
          <Button disabled={getImage === ""} title="Save Device Screenshot" onPress={saveImageDevice} />
      </View>
    )
}
