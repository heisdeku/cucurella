import {TextInputProps, TextStyle} from 'react-native';
import theme from './theme';

export const readOnlyInput = (
  size: number,
  isCodeInvalid: boolean,
): TextStyle => {
  return {
    color: theme.colors.black,
    backgroundColor: !isCodeInvalid
      ? theme.colors.neutral01
      : theme.colors.green01,
    fontSize: 25,
    borderWidth: 1,
    borderColor: !isCodeInvalid ? theme.colors.stroke : theme.colors.green07,
    fontFamily: theme.fonts[500],
    height: 54,
    width: 52,
    textAlign: 'center',
    borderRadius: 8,
  };
};

export const readableInputProps: TextInputProps = {
  editable: false,
  autoCapitalize: 'none',
  keyboardType: 'number-pad',
  selectionColor: 'transparent',
  maxLength: 4,
};

export function calculateCountdown(startDate: Date, endDate: Date) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const timeDiff = end - start;

  if (timeDiff <= 0) return 'Expired';

  const seconds = Math.floor((timeDiff / 1000) % 60);
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
  const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4);

  if (months > 0) return `${months}mo : ${weeks % 4}w`;
  if (weeks > 0) return `${weeks}w : ${days % 7}d`;
  if (days > 0) return `${days}d : ${hours}h : ${minutes}min : ${seconds}s`;

  return `${hours}h : ${minutes}min : ${seconds}s`;
}

export function formatMonetaryAmount(number: number) {
  if (typeof number !== 'number') {
    throw new Error('Input must be a number');
  }

  const formattedValue = number.toLocaleString('en-US');
  const decimalValue = number.toFixed(2);

  const result = {
    formattedValue: formattedValue.split('.')[0],
    decimalValue: decimalValue.split('.')[1],
    figure: `${formattedValue.split('.')[0]}.${decimalValue.split('.')[1]}`,
  };

  return result;
}

export const getCardType = (cardNumber: string): string | null => {
  // Regular expressions for card patterns
  const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const mastercardPattern = /^5[1-5][0-9]{14}$/;
  const vervePattern =
    /^(506(0|1)|507(8|9)|6500|6504|6505|6507|6509|6512|6513|6514|6515|6516|6550|6556)[0-9]{12}$/;

  // Remove non-digit characters from the card number
  const cleanedCardNumber = cardNumber.replace(/\D/g, '');

  // Check the card number against the patterns
  if (visaPattern.test(cleanedCardNumber)) {
    return 'visa';
  } else if (mastercardPattern.test(cleanedCardNumber)) {
    return 'mastercard';
  } else if (vervePattern.test(cleanedCardNumber)) {
    return 'verve';
  } else {
    return null;
  }
};
