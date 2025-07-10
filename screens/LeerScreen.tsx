import { useEffect, useState } from 'react';
import {  FlatList, StyleSheet, Text, View } from 'react-native';
import { ref, onValue , remove } from "firebase/database";
import { db } from '../firebase/Config';

export default function LeerScreen() {

  const [codigo, setcodigo] = useState("")
  const [datos, setdatos] = useState([])

  function leer() {
    const dato = ref(db, 'usuarios/');
    onValue(dato, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arreglo = Object.keys(data).map(key => ({
          id: key,
          codigo:key,
          ...data[key]
        }));
        setdatos(arreglo as any);
      } else {
        setdatos([]);
      }
    });
  }

  useEffect(() => {
    leer();
  }, []);


  type Usuario = {
    codigo: string;
    nombre: string;
    precio: number;
    stock: number;
    total: number;
    descuento: number;
    categoria: string;
    descripcion: string;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Productos</Text>

      <FlatList
        data={datos}
        renderItem={({ item }: { item: Usuario }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nombre}</Text>
            <Text style={styles.info}>Categoría: <Text style={styles.value}>{item.categoria}</Text></Text>
            <Text style={styles.info}>Stock: <Text style={styles.value}>{item.stock}</Text></Text>
            <Text style={styles.info}>Precio: <Text style={styles.value}>${item.precio}</Text></Text>
            <Text style={styles.info}>Total con Descuento: <Text style={styles.value}>${item.descuento}</Text></Text>
          
            
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f2f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  value: {
    color: '#000',
    fontWeight: '500',
  },
  separator: {
    height: 12,
  },
});
