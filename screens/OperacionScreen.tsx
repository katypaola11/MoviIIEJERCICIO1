import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ref, onValue } from "firebase/database";
import { db } from '../firebase/Config';

export default function OperacionScreen() {
    const [datos, setdatos] = useState([]);
    const [totalInv, setTotalInv] = useState(0);

    function leer() {
        const dato = ref(db, 'usuarios/');
        onValue(dato, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const arreglo = Object.keys(data).map(key => ({
                    id: key,
                    codigo: key,
                    ...data[key]
                }));
                setdatos(arreglo as any);

                
                const total = arreglo.reduce((total, item) => total + (item.precio * item.stock * 0.9), 0);
                setTotalInv(total);
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
            <Text style={styles.title}>Total Acumulado</Text>
            <Text style={styles.total}>Total Inventario con Descuento: ${totalInv}</Text>

            <FlatList
                data={datos}
                renderItem={({ item }: { item: Usuario }) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.nombre}</Text>
                        <Text style={styles.info}>Categoría: <Text style={styles.value}>{item.categoria}</Text></Text>
                        <Text style={styles.info}>Stock: <Text style={styles.value}>{item.stock}</Text></Text>
                        <Text style={styles.info}>Precio: <Text style={styles.value}>${item.precio}</Text></Text>
                        <Text style={styles.info}>Precio con Descuento: <Text style={styles.value}>${item.descuento}</Text></Text>
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
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    card: {
        backgroundColor: '#f2f2f2',
        padding: 15,
        borderRadius: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    info: {
        fontSize: 14,
        marginTop: 4,
    },
    value: {
        fontWeight: 'bold',
    },
    separator: {
        height: 10,
    },
});
