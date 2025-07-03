import { setDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { db } from '../firebase/Config';

export default function GuardarScreen() {

  const [cedula, setcedula] = useState("")
  const [nombre, setnombre] = useState("")
  const [precio, setprecio] = useState("")
  const [cantidad, setcantidad] = useState("")
  const [categoria, setcategoria] = useState("")
  const [stock, setstock] = useState("")
  const [total, settotal] = useState("")



  function totalPagar(precio:number, cantidad: number) {
    let tpagar
    tpagar = precio * cantidad
    return tpagar;
  }

   async function guardar() {
    await setDoc(doc(db, "clientes", cedula), {
      cedula: cedula,
      nombre: nombre,
      precio: precio,
      cantidad: cantidad,
      categoria: categoria,
      stock: stock,
      total: total
     
    });
    //console.log("Document written with ID: ", docRef.id);
  }



  

  return (
       <View>
      <Text>Guardar</Text>
      <TextInput
        placeholder='Ingresar cedula '
        onChangeText={(texto) => setcedula(texto)}
        style={styles.input}
      />

      <TextInput
        placeholder='Ingresar nombre'
        onChangeText={(texto) => setnombre(texto)}
        style={styles.input}
      />

      <TextInput
        placeholder='Ingresar precio'
        onChangeText={(texto) => setprecio(texto)}
        style={styles.input}
      />

      <TextInput
        placeholder='Ingresar cantidad'
        onChangeText={(texto) => setcantidad(texto)}
        style={styles.input}
      />

      <TextInput
        placeholder='Ingresar categoria'
        onChangeText={(texto) => setcategoria(texto)}
        style={styles.input}
      />

       <TextInput
        placeholder='Ingresar Stock'
        onChangeText={(texto) => setstock(texto)}
        style={styles.input}
      />

       <TextInput
        placeholder='Total a Pagar'
        value={total}
        editable={false}
        style={styles.input}
      />

      <Button title='Calcular' onPress={() => {
        const p = parseFloat(precio)
        const c = parseInt(cantidad)
        if (!isNaN(p) && !isNaN(c)) {
          const resultado = totalPagar(p, c)
          settotal(resultado.toString())
        } else {
          settotal("Datos inválidos")
        }
      }} />

      <Button title='Guardar' onPress={() => guardar()} />




      
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    fontSize: 25,
    backgroundColor: "#9999",
    margin: 6,
    width: "80%"
  }
})