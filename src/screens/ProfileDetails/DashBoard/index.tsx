import {View, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {Base} from '@components/Base';
import {styled} from 'styled-components/native';
import theme from '@libs/theme';
import {Text} from '@components/Text';
import {SvgXml} from 'react-native-svg';
import {navigate} from '@stacks/helper';
import ProfileDetails from '@screens/ProfileDetails/ProfileDetails';
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

interface Props {
  name?: string;
  discription?: string;
  email?: string;
}
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
    <TouchableOpacity onPress={onPress}>
      <Base.Row justifyContent={'flex-start'} padding={'15px 0'}>
        <Base.View marginRight={'10px'}>{icon}</Base.View>
        <Text.General
          color={theme.colors.neutral07}
          fontSize={'16px'}
          lineHeight={'18.9px'}
          width={'85%'}>
          {text}
        </Text.General>
        <Base.View>{chevron}</Base.View>
      </Base.Row>
    </TouchableOpacity>
    {seperator}
  </>
);

const ListItemSeperator = () => (
  <Base.View
    width={'100%'}
    height={'1px'}
    background={theme.colors.neutral03}
  />
);

const DashBoard: React.FC = ({
  name = 'Jane Doe',
  discription = 'JD',
  email = 'Jonedoe@gmail.com',
}: Props): JSX.Element => {
  const goToProfileDetails = () => {
    return navigate('ProfileDetails');
  };
  return (
    <ScrollView>
      <Base.View>
        <Container>
          <Base.View margin={'auto'}>
            <Avatar>
              <Text.Medium
                margin={'auto'}
                lineHeight={'37.2px'}
                fontSize={'40px'}>
                {discription}
              </Text.Medium>
            </Avatar>
            <Text.Medium
              fontSize={'18px'}
              color={theme.colors.white}
              lineHeight={'20px'}
              margin={'5px 0'}
              textAlign={'center'}>
              {name}
            </Text.Medium>
            <Text.General fontFamily="400" color={theme.colors.white}>
              {email}
            </Text.General>
          </Base.View>
        </Container>
        <Base.View
          background={theme.colors.white}
          padding={'10px'}
          marginBottom={'20px'}>
          <Text.Medium
            fontSize={'20px'}
            fontWeight={'500'}
            marginBottom={'20px'}>
            Personal
          </Text.Medium>
          <ListItem
            chevron={<SvgXml xml={chevron_icon} />}
            icon={<SvgXml xml={person_icon} />}
            onPress={goToProfileDetails}
            text="Profile details"
            seperator={<ListItemSeperator />}
          />
          <ListItem
            chevron={<SvgXml xml={chevron_icon} />}
            icon={<SvgXml xml={location_icon} />}
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
        </Base.View>
        <Base.View
          background={theme.colors.white}
          padding={'10px'}
          marginBottom={'20px'}>
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
        </Base.View>
        <Base.View background={theme.colors.white} padding={'10px'}>
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
        </Base.View>
      </Base.View>
    </ScrollView>
  );
};

const Container = styled.View`
  background-color: #063418;
  width: 100%;
  height: 279px;
`;

const Avatar = styled.View`
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 50px;
  background-color: #d2ffe4;
`;

export default DashBoard;
