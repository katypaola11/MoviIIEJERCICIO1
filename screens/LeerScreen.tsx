import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { getDatabase, ref, onValue } from "firebase/database";

export default function LeerScreen() {

  const [datos, setdatos] = useState([])

  function leer() {
    const db = getDatabase();
    const dato = ref(db, 'usuarios/');
    onValue(dato, (snapshot) => {
      const data = snapshot.val();
      if (data) {
       
        const arreglo = Object.keys(data).map(key => ({
          id: key,
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
    id?: string;
    cedula: string;
    nombre: string;
    precio: number;
    cantidad: number;
    stock: number;
    total: number;
    descuento: number;
    categoria: string;
    descripcion: string;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Clientes</Text>

      <FlatList
        data={datos}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }: { item: Usuario }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nombre}</Text>
            <Text style={styles.info}>Categoria: {item.categoria}</Text>
            <Text style={styles.info}>Stock: {item.stock}</Text>
            <Text style={styles.info}>Precio: {item.precio}</Text>
            <Text style={styles.info}>Cantidad: {item.cantidad}</Text>
            <Text style={styles.info}>Total Descuento: {item.descuento}</Text>
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    marginBottom: 3,
  },
});