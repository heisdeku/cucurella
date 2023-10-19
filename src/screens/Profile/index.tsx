import {Alert, ScrollView, TouchableOpacity} from 'react-native';
import {Base} from '@components/Base';
import {styled} from 'styled-components/native';
import theme from '@libs/theme';
import {Text} from '@components/Text';
import {SvgXml} from 'react-native-svg';
import {navigate} from '@stacks/helper';
import {
  person_icon,
  location_icon,
  heart_icon,
  support_icon,
  chevron_icon,
  chat_icon,
  report_icon,
  launch_icon,
  pentagon_icon,
} from '@libs/svgs';
import updateStatusBar from '@hooks/updateStatusBar';
import {useUserStore} from '@store/UserStore';
import {onLogout} from '@api/common/logout';
import {IS_IOS} from '@libs/constant';

interface ListItemProps {
  text: string;
  icon: React.ReactNode;
  chevron: React.ReactNode;
  seperator?: React.ReactNode;
  onPress?: () => void;
}

const ListItem: React.FC<ListItemProps> = ({
  chevron,
  text,
  icon,
  seperator,
  onPress,
}) => (
  <>
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <Base.Row
        justifyContent={'flex-start'}
        height={'47px'}
        alignItems={'center'}
        mt={'10px'}>
        <Base.View marginRight={'10px'}>{icon}</Base.View>
        <Text.General
          color={theme.colors.neutral07}
          fontSize={'14px'}
          lineHeight={'18.9px'}>
          {text}
        </Text.General>
        <Base.View ml={'auto'}>{chevron}</Base.View>
      </Base.Row>
    </TouchableOpacity>
    {seperator}
  </>
);

const ListItemSeperator = () => (
  <Base.View
    width={'100%'}
    height={'0.5px'}
    background={theme.colors.neutral03}
  />
);

const Account: React.FC = (): JSX.Element => {
  IS_IOS ? updateStatusBar('light-content') : updateStatusBar('dark-content');
  const [userFirstName, userLastName, userEmail, userImage] = useUserStore(
    state => [
      state.user.firstName,
      state.user.lastName,
      state.user.email,
      state.user.image,
    ],
  );

  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <Base.View>
        <Container>
          {userImage && <UserImage source={{uri: userImage}} />}
          {!userImage && (
            <Avatar>
              <Text.Medium
                isCapitalize
                lineHeight={'52.381px'}
                fontSize={'41.905px'}>
                {userFirstName.split('')[0]}
                {userLastName.split('')[0]}
              </Text.Medium>
            </Avatar>
          )}
          <Text.Medium
            fontSize={'20px'}
            color={theme.colors.white}
            lineHeight={'25px'}
            mb={'2px'}
            textAlign={'center'}>
            {userFirstName} {userLastName}
          </Text.Medium>
          <Text.General
            fontFamily="400"
            fontSize={'14px'}
            color={theme.colors.neutral03}>
            {userEmail}
          </Text.General>
        </Container>
        <Section>
          <Text.Medium
            color={theme.colors.dark}
            fontSize={'20px'}
            fontWeight={'500'}>
            Personal
          </Text.Medium>
          <ListItem
            chevron={<SvgXml xml={chevron_icon} />}
            icon={<SvgXml xml={person_icon} />}
            onPress={() => navigate('ProfileDetails')}
            text="Profile details"
            seperator={<ListItemSeperator />}
          />
          <ListItem
            chevron={<SvgXml xml={chevron_icon} />}
            icon={<SvgXml xml={location_icon} />}
            onPress={() => navigate('SavedPlaces')}
            text="Saved places"
            seperator={<ListItemSeperator />}
          />
          <ListItem
            chevron={<SvgXml xml={chevron_icon} />}
            icon={<SvgXml xml={heart_icon} />}
            text="Favorite item"
            seperator={<ListItemSeperator />}
          />
          <ListItem
            chevron={<SvgXml xml={chevron_icon} />}
            icon={<SvgXml xml={support_icon} />}
            text="Support"
          />
        </Section>
        <Section>
          <Text.Medium fontSize={'20px'} fontWeight={'500'}>
            About us
          </Text.Medium>
          <ListItem
            chevron={<SvgXml xml={chevron_icon} />}
            icon={<SvgXml xml={chat_icon} />}
            text="FAQ's"
            seperator={<ListItemSeperator />}
          />
          <ListItem
            chevron={<SvgXml xml={chevron_icon} />}
            icon={<SvgXml xml={report_icon} />}
            text="What's new"
            seperator={<ListItemSeperator />}
          />
          <ListItem
            chevron={<SvgXml xml={launch_icon} />}
            icon={<SvgXml xml={support_icon} />}
            text="Follow us"
          />
        </Section>
        <Section>
          <Text.Medium fontSize={'20px'} fontWeight={'500'}>
            Legal
          </Text.Medium>
          <ListItem
            chevron={<SvgXml xml={launch_icon} />}
            icon={<SvgXml xml={pentagon_icon} />}
            text="Privacy policy"
            seperator={<ListItemSeperator />}
          />

          <ListItem
            chevron={<SvgXml xml={launch_icon} />}
            icon={<SvgXml xml={support_icon} />}
            text="Follow us"
          />
        </Section>
        <Section>
          <Text.Medium fontSize={'20px'} fontWeight={'500'}>
            Misc
          </Text.Medium>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() =>
              Alert.alert('Logout?', 'Are you sure you want to logout?', [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {text: 'Yes', onPress: () => onLogout(), style: 'destructive'},
              ])
            }>
            <Base.Row
              justifyContent={'flex-start'}
              height={'47px'}
              alignItems={'center'}
              my={'10px'}>
              <Text.Medium
                fontSize={'16px'}
                color={theme.colors.orange07}
                textAlign={'center'}>
                Logout
              </Text.Medium>
              <Base.View ml={'auto'}>
                <SvgXml xml={launch_icon} />
              </Base.View>
            </Base.Row>
          </TouchableOpacity>
        </Section>
        <Text.General
          fontSize={'14px'}
          color={theme.colors.neutral07}
          textAlign={'center'}
          mb={'20px'}>
          Version 0.0.1
        </Text.General>
      </Base.View>
    </ScrollView>
  );
};

const Section = styled.View`
  background-color: ${theme.colors.white};
  padding: 24px 16px 0;
  margin-bottom: 16px;
`;

const Container = styled.View`
  background-color: #063418;
  width: 100%;
  padding-bottom: 46px;
  padding-top: 78px;
  align-items: center;
`;

const Avatar = styled.View`
  width: 100px;
  height: 100px;
  margin-bottom: 8px;
  border-radius: 50px;
  background-color: #d2ffe4;
  justify-content: center;
  align-items: center;
`;

const UserImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 8px;
  border-radius: 50px;
  background-color: #d2ffe4;
  justify-content: center;
  align-items: center;
`;

export default Account;
