import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { ref, remove } from 'firebase/database';
import { db } from '../firebase/Config';

export default function EliminarScreen() {
  const [codigo, setcodigo] = useState("")

function eliminar() {
  Alert.alert(
    "¿Eliminar?",
    `Deseas eliminar Usuario: ${codigo}`,
    [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        onPress: () => {
          remove(ref(db, 'usuario/' + codigo));
          Alert.alert( "Usuario eliminado exitosamente.");
          setcodigo("");
        },
        style: "destructive"
      }
    ]
  );
}
  return (
    <View>
      <Text>Eliminar</Text>
     
      <TextInput
      placeholder='ingresar Codigo'
      style={{fontSize:30}}
      onChangeText={(texto)=> setcodigo(texto)}
      value={codigo}
      />
      <Button title="Eliminar"  color={'red'} onPress={()=> eliminar()} />
       
    </View>
  )
}

const styles = StyleSheet.create({})