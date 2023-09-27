import {TouchableOpacity} from 'react-native';
import {Base} from './Base';
import {SvgXml} from 'react-native-svg';
import {arrowRight} from '@libs/svgs';
import {goBack, navigate} from '@stacks/helper';
import theme from '@libs/theme';
import {Text} from './Text';

interface IScreenHeader {
  label: string;
  toHome?: boolean;
}
const ScreenHeader: React.FC<IScreenHeader> = ({label, toHome}) => {
  return (
    <Base.Row
      pb={'16px'}
      px={'20px'}
      pt={'60px'}
      backgroundColor={theme.colors.white}
      borderBottomWidth={'1px'}
      borderBottomColor={theme.colors.neutral03}
      justifyContent={'flex-start'}
      alignItems={'center'}>
      <TouchableOpacity onPress={() => (toHome ? navigate('Home') : goBack())}>
        <SvgXml xml={arrowRight} />
      </TouchableOpacity>
      <Text.Medium
        mx={'auto'}
        flex={'1'}
        fontFamily={'700'}
        textAlign={'center'}>
        {label}
      </Text.Medium>
      <Base.View width={'10%'} />
    </Base.Row>
  );
};

export default ScreenHeader;
