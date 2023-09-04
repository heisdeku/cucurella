import CustomBottomTab from '@components/CustomBottomTab';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@screens/Home';
import ProductScreen from '@screens/Product';
import AddCard from '@screens/AddCard';
import ProfileDetails from '@screens/ProfileDetails';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTab {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Wallet"
        options={{
          tabBarLabel: 'Wallet',
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Orders"
        options={{
          tabBarLabel: 'Orders',
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Account"
        options={{
          tabBarLabel: 'Account',
        }}
        component={HomeScreen}
      />
    </Tab.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={MainTab} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
