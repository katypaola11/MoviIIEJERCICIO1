import { createDrawerNavigator } from '@react-navigation/drawer';

import GuardarScreen from '../screens/GuardarScreen';
import EditarScreen from '../screens/EditarScreen';
import LeerScreen from '../screens/LeerScreen';

import { NavigationContainer } from '@react-navigation/native';
import EliminarScreen from '../screens/EliminarScreen';
import OperacionScreen from '../screens/OperacionScreen';

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Guardar" component={GuardarScreen} />
            <Drawer.Screen name="Editar" component={EditarScreen} />
            <Drawer.Screen name="Leer" component={LeerScreen} />
            <Drawer.Screen name="Eliminar" component={EliminarScreen} />
            <Drawer.Screen name="Operacion" component={OperacionScreen} />

        </Drawer.Navigator>
    );
}

export default function NavegadorPrincipal() {
    return (
        <NavigationContainer>
            <MyDrawer />
        </NavigationContainer>
    )
}