import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { ref, set } from "firebase/database";
import { db } from '../firebase/Config';

export default function GuardarScreen() {
  const [cedula, setcedula] = useState("");
  const [nombre, setnombre] = useState("");
  const [precio, setprecio] = useState("");
  const [cantidad, setcantidad] = useState("");
  const [categoria, setcategoria] = useState("");
  const [stock, setstock] = useState("");
  const [total, settotal] = useState("");
  const [descuento, setdescuento] = useState("");

  function totalPagar(precio: number, cantidad: number) {
    const tpagar = precio * cantidad;
    const des = tpagar * 0.1;
    const pagarConDescuento = tpagar - des;
    return {
      total: tpagar,
      descuento: pagarConDescuento
    };
  }

  function guardar() {
    set(ref(db, 'usuarios/' + cedula), {
      nombre: nombre,
      precio: precio,
      cantidad: cantidad,
      categoria: categoria,
      stock: stock,
      total: total,
      descuento: descuento
    })
    Alert.alert("Usuario Guardado");

    setcedula("");
    setnombre("");
    setprecio("");
    setcantidad("");
    setcategoria("");
    setstock("");
    settotal("");
    setdescuento("");
  }

  return (
    <View>
      <Text>Guardar</Text>
      <TextInput
        placeholder='Ingresar cedula '
        onChangeText={texto => setcedula(texto)}
        style={styles.input}
        value={cedula}
      />
      <TextInput
        placeholder='Ingresar nombre'
        onChangeText={texto => setnombre(texto)}
        style={styles.input}
        value={nombre}
      />
      <TextInput
        placeholder='Ingresar precio'
        onChangeText={texto => setprecio(texto)}
        style={styles.input}
        value={precio}
        keyboardType='numeric'
      />
      <TextInput
        placeholder='Ingresar cantidad'
        onChangeText={texto => setcantidad(texto)}
        style={styles.input}
        value={cantidad}
        keyboardType='numeric'
      />
      <TextInput
        placeholder='Ingresar categoria'
        onChangeText={texto => setcategoria(texto)}
        style={styles.input}
        value={categoria}
      />
      <TextInput
        placeholder='Ingresar Stock'
        onChangeText={texto => setstock(texto)}
        style={styles.input}
        value={stock}
        keyboardType='numeric'
      />
      <TextInput
        placeholder='Total a Pagar'
        value={total}
        editable={false}
        style={styles.input}
      />
      <TextInput
        placeholder='Total con descuento'
        value={descuento}
        editable={false}
        style={styles.input}
      />

      <Button
        title='Calcular'
        onPress={() => {
          const p = parseFloat(precio);
          const c = parseInt(cantidad);
          if (!isNaN(p) && !isNaN(c)) {
            const { total, descuento } = totalPagar(p, c);
            settotal(total.toString());
            setdescuento(descuento.toString());
          }
        }}
      />

      <Button title='Guardar' onPress={guardar} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 25,
    backgroundColor: "#9999",
    margin: 6,
    width: "80%"
  }
});
