import { Text, View,Share, Button } from "react-native";
import React, { useEffect } from 'react'
import * as Location from "expo-location";


export default function Index() {


  const [location, setLocation] = React.useState(null);
  const [errMsg, setErrMsg] = React.useState(null);
  let latitude=null;
  let longitude=null;
  let altitude=null;
  let text="en attente"




   async function MyLocation(){
  
          const {status}=await Location.requestForegroundPermissionsAsync();
  
          if(status !== "granted"){
              console.log("Permission to access location was denied");
              setErrMsg("Permission to access location was denied");
              return;
          }
         
  
          let getGps=await Location.getCurrentPositionAsync({});
          setLocation(getGps);
  
          console.log(getGps);       
  
      }
      useEffect(()=>{
              MyLocation();
      },[])

   
    
    async function SharePosition(){
        try {
            await Share.share({
            message:'Au secours je suis en danger à la latitude'+
            '\nlatitude: '+latitude+
            '\nlongitude: '+longitude+
            '\naltitude: '+altitude+
            '\nhttps://www.google.com/maps/search/?api=1&query='+latitude+'%2C'+longitude
          });
           
          
        } catch (error) {
              console.error(error);       
        }
    }

    if(errMsg){
      text=errMsg;
    }else if(location){
      latitude=location.coords.latitude;
      longitude=location.coords.longitude;
      altitude=location.coords.altitude;
      text="latitude: "+latitude+"\nlongitude: "+longitude+"\naltitude: "+altitude;
    }


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Text>{text}</Text>
        <Button title="Get Location" onPress={MyLocation} />
        <Button title="Share Location" onPress={SharePosition} />
      </View>
    </View>
  );
}
