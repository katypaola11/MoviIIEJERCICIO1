import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { db } from '../firebase/Config';

export default function EliminarScreen() {

  const [datos, setdatos] = useState<any[]>([]);

  // Leer usuarios de Firebase
  function leer() {
    const dbRef = getDatabase();
    const dato = ref(dbRef, 'usuarios/');
    onValue(dato, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arreglo = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setdatos(arreglo);
      } else {
        setdatos([]);
      }
    });
  }

  useEffect(() => {
    leer();
  }, []);

  // Eliminar por ID
  function eliminarPorId(id: string, nombre: string) {
    Alert.alert(
      "Eliminar usuario",
      `¿Estás seguro de eliminar a ${nombre}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            remove(ref(db, 'usuarios/' + id))
              .then(() => {
                Alert.alert("Eliminado correctamente");
              })
              .catch((error) => {
                Alert.alert("Error al eliminar", error.message);
              });
          }
        }
      ]
    );
  }

  type Usuario = {
    id: string;
    nombre: string;
    precio: number;
    cantidad: number;
    stock: number;
    total: number;
    descuento: number;
    categoria: string;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Clientes</Text>

      <FlatList
        data={datos}
        renderItem={({ item }: { item: Usuario }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nombre}</Text>
            <Text style={styles.info}>Categoría: {item.categoria}</Text>
            <Text style={styles.info}>Stock: {item.stock}</Text>
            <Text style={styles.info}>Precio: {item.precio}</Text>
            <Text style={styles.info}>Cantidad: {item.cantidad}</Text>
            <Text style={styles.info}>Descuento: {item.descuento}</Text>

            <TouchableOpacity
              onPress={() => eliminarPorId(item.id, item.nombre)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    padding: 15,
    backgroundColor: '#f1f1f1',
    marginVertical: 8,
    borderRadius: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 16,
  },
  deleteButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ff4d4d',
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});
