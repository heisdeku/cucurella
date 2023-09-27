import {Base} from '@components/Base';
import {Text} from '@components/Text';
import {useIsFirstTime} from '@hooks/useIsFirstTime';
import theme from '@libs/theme';
import {navigate} from '@stacks/helper';
import {handleContinueAsGuest} from '@store/UserStore';
import {ImageBackground, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

const Onboarding = () => {
  const insets = useSafeAreaInsets();
  const [_, setIsFirstTime] = useIsFirstTime();
  return (
    <Base.View minHeight={'100%'}>
      <ImageBackground
        source={require('../../../assets/images/onboarding.png')}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: '100%',
        }}
      />
      <Base.View flex={1} pt={insets.top + 34} justifyContent={'space-between'}>
        <Base.View marginLeft={'auto'} marginRight={'auto'} width={'380px'}>
          <Text.Medium
            fontWeight={'700'}
            lineHeight={'40.64px'}
            color={theme.colors.white}
            textAlign={'center'}
            fontSize={'32px'}>
            Get groceries easily delivered at your door
          </Text.Medium>
        </Base.View>
        <OnboardingImage
          resizeMode="contain"
          source={require('../../../assets/images/onboarding-stock.png')}
        />
        <Base.View px={'20px'} pb={insets.bottom + 16}>
          <Base.View>
            <Base.Button
              title="Sign up"
              onPress={() => {
                setIsFirstTime(false);
                return navigate('Authentication');
              }}
            />
            <Base.Row justifyContent={'center'} mt={'13px'}>
              <TouchableOpacity
                onPress={() => {
                  setIsFirstTime(false);
                  return handleContinueAsGuest();
                }}>
                <Text.Small fontFamily="500">Continue as a guest</Text.Small>
              </TouchableOpacity>
            </Base.Row>
          </Base.View>
        </Base.View>
      </Base.View>
    </Base.View>
  );
};

const OnboardingImage = styled.Image`
  width: 418.789px;
  height: 322.661px;
  margin-left: 5%;
  flex: 0.9;
`;

export default Onboarding;
