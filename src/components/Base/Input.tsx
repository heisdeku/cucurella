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
  setValue?: (value: any) => void | any;
  hasCountryCode?: false;
  suffix?: React.ReactElement;
}

const Input = ({
  label,
  placeholder,
  value,
  setValue,
  hasCountryCode,
  suffix,
  ...props
}: IInputProps) => {
  const phoneInput = useRef(null);
  return (
    <InputContainer>
      <Base.View>
        <Base.View>
          <Text.General fontSize={'14px'} fontWeight={'500'} mb={'8px'}>
            {label}
          </Text.General>
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
            <Base.Row>
              <InputField
                value={value}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.neutral07}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                onChangeText={(text: string) => setValue?.(text)}
                {...props}
              />
              {suffix}
            </Base.Row>
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
  font-size: 13px;
  font-weight: 400;
  line-height: 15px;
  color: ${theme.colors.black};
`;

const InputContainer = styled.View`
  flex: 1;
`;

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
    color: theme.colors.black,
    fontWeight: '300',
    lineHeight: 15,
  },
  codeText: {
    fontSize: 12,
    display: 'none',
  },
});

export default Input;
