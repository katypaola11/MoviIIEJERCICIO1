import { useState, useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { ref, set } from "firebase/database";
import { db } from '../firebase/Config';

export default function GuardarScreen() {
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
    const pagar = tpagar - des;
    return {
      total: tpagar,
      descuento: pagar
    };
  }

  useEffect(() => {
    let p = parseFloat(precio);
    let c = parseInt(stock);

    if (!isNaN(p) && !isNaN(c) ) {
      const { total, descuento } = totalPagar(p, c);
      settotal(total.toString());
      setdescuento(descuento.toString());
    } 
  }, [precio, stock]);

  function guardar() {
    set(ref(db, 'usuarios/' + codigo), {
      nombre: nombre,
      precio: precio,
      categoria: categoria,
      stock: stock,
      total: total,
      descuento: descuento
    })
    Alert.alert("Usuario Guardado");

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
      <Text style={styles.title}>Guardar Producto</Text>

      <TextInput
        placeholder='Código'
        onChangeText={texto => setcodigo(texto)}
        style={styles.input}
        value={codigo}
      />
      <TextInput
        placeholder='Nombre'
        onChangeText={texto => setnombre(texto)}
        style={styles.input}
        value={nombre}
      />
      <TextInput
        placeholder='Precio'
        onChangeText={texto => setprecio(texto)}
        style={styles.input}
        value={precio}
        keyboardType='numeric'
      />
      <TextInput
        placeholder='Categoría'
        onChangeText={texto => setcategoria(texto)}
        style={styles.input}
        value={categoria}
      />
      <TextInput
        placeholder='Stock'
        onChangeText={texto => setstock(texto)}
        style={styles.input}
        value={stock}
        keyboardType='numeric'
      />
      <TextInput
        placeholder='Total a Pagar'
        value={total}
        editable={false}
        style={[styles.input, styles.readonly]}
      />
      <TextInput
        placeholder='Total con Descuento'
        value={descuento}
        editable={false}
        style={[styles.input, styles.readonly]}
      />

      <View style={styles.buttonContainer}>
        <Button title='Guardar' onPress={guardar} color="#007BFF" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    fontSize: 18,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  readonly: {
    backgroundColor: '#e6e6e6',
    color: '#555',
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
  },
});
