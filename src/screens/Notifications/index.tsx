import {Base} from '@components/Base';
import Container from '@components/Container';
import ScreenHeader from '@components/ScreenHeader';
import {Text} from '@components/Text';
import {windowHeight} from '@libs/constant';
import theme from '@libs/theme';
import {TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

interface INotificationItem {
  label: string;
  text: string;
}

const NotificationItem = ({label, text}: INotificationItem) => {
  return (
    <Base.View
      borderBottomWidth={'1px'}
      borderBottomColor={theme.colors.neutral03}
      mb="11px">
      <TouchableOpacity activeOpacity={0.65}>
        <Base.Row
          justifyContent={'flex-start'}
          alignItems={'flex-start'}
          pt={'8px'}
          pb={'10px'}>
          <Base.View
            width={'8px'}
            height="8px"
            backgroundColor={theme.colors.green06}
            borderRadius={100}
            marginRight={'8px'}
          />
          <Base.View mt={'-3px'} maxWidth="85%">
            <Text.Medium fontSize={'14px'} lineHeight="15px">
              {label}
            </Text.Medium>
            <Text.General
              mt={'4px'}
              color={theme.colors.neutral07}
              lineHeight={'16.2px'}
              fontSize="13px">
              {text}
            </Text.General>
          </Base.View>
        </Base.Row>
      </TouchableOpacity>
    </Base.View>
  );
};

const Notifications = () => {
  return (
    <Base.View>
      <ScreenHeader label="Notifications" />
      <ScrollView>
        <Container
          pt={'16px'}
          minHeight={windowHeight}
          backgroundColor={'white'}>
          <NotificationItem
            label="Your order has been confirmed"
            text="This notification is to confirm that your order has been confirmed"
          />
          <NotificationItem
            label="Your order Is processing"
            text="This notification is to confirm that your is now processing"
          />
          <NotificationItem
            label="Your order has been packed"
            text="This notification is to confirm that your has now been packed"
          />
          <NotificationItem
            label="Your order has been shipped"
            text="This notification is to confirm that your order has been picked up by a rider and is on the way to you"
          />
        </Container>
      </ScrollView>
    </Base.View>
  );
};

export default Notifications;
