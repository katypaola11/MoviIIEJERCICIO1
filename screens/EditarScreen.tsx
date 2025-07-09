import { useState, useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { ref, set } from "firebase/database";
import { db } from '../firebase/Config';

export default function EditarScreen() {
  const [codigo, setcodigo] = useState("");
  const [nombre, setnombre] = useState("");
  const [precio, setprecio] = useState("");
  const [categoria, setcategoria] = useState("");
  const [stock, setstock] = useState("");
  const [total, settotal] = useState("");
  const [descuento, setdescuento] = useState("");

  function totalPagar(precio: number, stock: number) {
    const tpagar = precio * stock;
    const des = tpagar * 0.1;
    const pagarConDescuento = tpagar - des;
    return {
      total: tpagar,
      descuento: pagarConDescuento
    };
  }

  useEffect(() => {
    let p = parseFloat(precio);
    let c = parseInt(stock);
    
    if (!isNaN(p) && !isNaN(c) && p > 0 && c > 0) {
      const { total, descuento } = totalPagar(p, c);
      settotal(total.toString());
      setdescuento(descuento.toString());
    } else {
      settotal("");
      setdescuento("");
    }
  }, [precio, stock]);

  function editar() {
    set(ref(db, 'usuarios/' + codigo), {
      nombre: nombre,
      precio: precio,
      categoria: categoria,
      stock: stock,
      total: total,
      descuento: descuento
    });

    Alert.alert("Producto actualizado");

    setcodigo("");
    setnombre("");
    setprecio("");
    setcategoria("");
    setstock("");
    settotal("");
    setdescuento("");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Producto</Text>

      <TextInput
        placeholder='Código'
        value={codigo}
        style={styles.input}
        onChangeText={setcodigo}
      />
      <TextInput
        placeholder='Nombre (no editable)'
        value={nombre}
        style={styles.input}
        onChangeText={setnombre}
      />
      <TextInput
        placeholder='Categoría (no editable)'
        value={categoria}
        style={styles.input}
        onChangeText={setcategoria}
      />
      <TextInput
        placeholder='Precio'
        value={precio}
        style={styles.input}
        onChangeText={setprecio}
        keyboardType='numeric'
      />
      <TextInput
        placeholder='Stock'
        value={stock}
        style={styles.input}
        onChangeText={setstock}
        keyboardType='numeric'
      />
      <TextInput
        placeholder='Total a Pagar'
        value={total}
        editable={false}
        style={[styles.input, styles.readOnly]}
      />
      <TextInput
        placeholder='Total con Descuento'
        value={descuento}
        editable={false}
        style={[styles.input, styles.readOnly]}
      />

      <View style={styles.buttonContainer}>
        <Button title='Actualizar' onPress={editar} color="#007BFF" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#f2f2f2',
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    fontSize: 16,
  },
  readOnly: {
    backgroundColor: '#e9ecef',
    color: '#6c757d',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
