import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { ref, set } from "firebase/database";
import { db } from '../firebase/Config';

export default function EditarScreen() {
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

  function recalcular(precioStr: string) {
    setprecio(precioStr);
    const p = parseFloat(precioStr);
    const c = parseInt(cantidad);
    if (!isNaN(p) && !isNaN(c)) {
      const { total, descuento } = totalPagar(p, c);
      settotal(total.toString());
      setdescuento(descuento.toString());
    }
  }

  function editar() {
    set(ref(db, 'usuarios/' + cedula), {
      nombre: nombre,
      precio: precio,
      cantidad: cantidad,
      categoria: categoria,
      stock: stock,
      total: total,
      descuento: descuento
    });

    Alert.alert("Producto actualizado");

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
      <Text>Editar producto</Text>

      <TextInput
        placeholder='Cédula '
        value={cedula}
        style={styles.input}
        onChangeText={(texto) => setcedula(texto)}
      />
      <TextInput
        placeholder='Nombre (no editable)'
        value={nombre}
        style={styles.input}
        onChangeText={(texto) => setnombre(texto)}
      />
      <TextInput
        placeholder='Cantidad (no editable)'
        value={cantidad}
        style={styles.input}
        onChangeText={(texto) => setcantidad(texto)}
      />
      <TextInput
        placeholder='Categoría (no editable)'
        value={categoria}
        style={styles.input}
        onChangeText={(texto) => setcategoria(texto)}
      />

      <TextInput
        placeholder='Nuevo precio'
        value={precio}
        style={styles.input}
        onChangeText={recalcular}
        keyboardType='numeric'
      />

      <TextInput
        placeholder='Nuevo stock'
        value={stock}
        style={styles.input}
        onChangeText={(texto) => setstock(texto)}
        keyboardType='numeric'
      />

      <TextInput
        placeholder='Total a Pagar'
        value={total}
        onChangeText={(texto) => settotal(texto)}
        style={styles.input}
      />
      <TextInput
        placeholder='Total con descuento'
        value={descuento}
        onChangeText={(texto) => setdescuento(texto)}
        style={styles.input}
      />

      <Button title='Actualizar' onPress={editar} />
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
