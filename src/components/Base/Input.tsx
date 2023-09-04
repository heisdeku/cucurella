import {styled} from 'styled-components/native';
import {Base} from '.';
import {useRef} from 'react';
import PhoneInput from 'react-native-phone-number-input';
import {Text} from '@components/Text';
import theme from '@libs/theme';
import {SvgXml} from 'react-native-svg';
import {input_dropdown} from '@libs/svgs';
import {StyleSheet, TextInputProps} from 'react-native';

interface IInputProps extends Omit<TextInputProps, 'value'> {
  label: string;
  placeholder: string;
  value?: string;
  setValue?: () => void | any;
  hasCountryCode?: false;
}

const Input = ({
  label,
  placeholder,
  value,
  setValue,
  hasCountryCode,
}: IInputProps) => {
  const phoneInput = useRef(null);
  return (
    <InputContainer>
      <Base.View>
        <Base.View>
          <Text.Small fontWeight={'500'} mb={'8px'}>
            {label}
          </Text.Small>
          {hasCountryCode && (
            <PhoneInput
              ref={phoneInput}
              defaultCode="NG"
              layout="first"
              withShadow={false}
              textInputProps={{maxLength: 12}}
              onChangeFormattedText={text => {
                console.log(text);
              }}
              placeholder={placeholder}
              flagButtonStyle={styles.flagButton}
              textContainerStyle={styles.textContainer}
              textInputStyle={styles.textInput}
              codeTextStyle={styles.codeText}
              containerStyle={{
                width: '100%',
              }}
              renderDropdownImage={<SvgXml xml={input_dropdown} />}
            />
          )}
          {!hasCountryCode && (
            <InputField placeholder={placeholder} keyboardType="phone-pad" />
          )}
        </Base.View>
      </Base.View>
    </InputContainer>
  );
};

const InputField = styled.TextInput`
  background-color: ${theme.colors.neutral01};
  padding: 19px 16px;
  border: 1px solid ${theme.colors.stroke};
  border-radius: 8px;
  width: 100%;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: 15px;
  color: ${theme.colors.neutral07};
`;

const InputContainer = styled.View``;

const styles = StyleSheet.create({
  flagButton: {
    borderWidth: 1,
    borderColor: theme.colors.stroke,
    borderRadius: 8,
    height: 50,
    backgroundColor: theme.colors.neutral01,
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.stroke,
    borderRadius: 8,
    height: 50,
    backgroundColor: theme.colors.neutral01,
  },
  textInput: {
    fontSize: 12,
    color: theme.colors.neutral07,
    fontWeight: '300',
    lineHeight: 15,
  },
  codeText: {
    fontSize: 12,
    display: 'none',
  },
});

export default Input;