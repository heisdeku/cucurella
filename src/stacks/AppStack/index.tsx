import CustomBottomTab from '@components/CustomBottomTab';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

// main activity screens
import HomeScreen from '@screens/Home';
import Deals from '@screens/Deals';
import ProductScreen from '@screens/Product';

//Orders Screen
import OrdersScreen from '@screens/Orders';
import Checkout from '@screens/Orders/Checkout';
import ConfirmOrderDetails from '@screens/Orders/ConfirmOrder';
import OrderDetails from '@screens/Orders/Details';
import TrackOrder from '@screens/Orders/Track';
// wallet screens
import WalletScreen from '@screens/Wallet';
import WalletTransactions from '@screens/Wallet/Transactions';
import WalletTransactionDetails from '@screens/Wallet/TransactionDetails';
// profile screens
import Account from '@screens/Profile';
import ProfileDetails from '@screens/Profile/Details';
import SavedPlaces from '@screens/Profile/SavedPlaces';
// generic screens
import AddCard from '@screens/AddCard';
import Success from '@screens/Success';
import {AddAddressManual, AddAddressSearch} from '@screens/AddAddress';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTab {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Orders"
        options={{
          tabBarLabel: 'Orders',
        }}
        component={OrdersScreen}
      />
      <Tab.Screen
        name="Wallet"
        options={{
          tabBarLabel: 'Wallet',
        }}
        component={WalletScreen}
      />
      <Tab.Screen
        name="Account"
        options={{
          tabBarLabel: 'Account',
        }}
        component={Account}
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
      <Stack.Screen name="Deals" component={Deals} />
      <Stack.Screen name="Product" component={ProductScreen} />

      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="OrderCheckout" component={Checkout} />
      <Stack.Screen name="ConfirmDetails" component={ConfirmOrderDetails} />
      <Stack.Screen name="TrackOrder" component={TrackOrder} />

      <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
      <Stack.Screen name="SavedPlaces" component={SavedPlaces} />

      <Stack.Screen name="WalletTransactions" component={WalletTransactions} />
      <Stack.Screen
        name="WalletTransactionDetails"
        component={WalletTransactionDetails}
      />

      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="AddAddressManual" component={AddAddressManual} />
      <Stack.Screen name="AddAddressSearch" component={AddAddressSearch} />
      <Stack.Screen name="Success" component={Success} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
