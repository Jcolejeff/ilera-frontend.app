import toast from 'react-hot-toast';
export default toast;
export function firstCharsOfWords(str: string) {
  const words = str.split(' ');

  if (words.length === 1 && words[0].length > 1) {
    const word = words[0];
    return word[0] + word[word.length - 1];
  }

  return words.map((word) => word[0]).join('');
}
export const copyToClipboard = (text: string, alert: any) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success(alert);
    })
    .catch(() => {
      toast.error(`An Error occurred while copying`);
    });
};

interface nullTextCheckerInterfac {
  text?: any;
  returnValue?: 'n/a' | 'empty';
}

export const nullTextChecker = ({ text, returnValue = 'n/a' }: nullTextCheckerInterfac) => {
  if (text) {
    return text;
  } else {
    return returnValue === 'n/a' ? 'n/a' : '';
  }
};

export const ensureIsNumber = (i: any) => {
  return isNaN(i) || !i ? 0 : parseInt(`${i}`);
};

export const undefinedNumberChecker = (i?: number) => {
  if (i) {
    return i;
  } else {
    return 0;
  }
};

export const shortNumber = (i: string, withDecimal?: boolean) => {
  if (i) {
    const num = parseFloat?.(i);
    if (num >= 1000000) {
      return withDecimal ? `${(num / 1000000).toFixed(2)}M` : `${num / 1000000}M`;
    } else if (num >= 1000) {
      return withDecimal ? `${(num / 1000).toFixed(2)}K` : `${num / 1000}K`;
    } else {
      return withDecimal ? num.toFixed(2) : num;
    }
  }
};

export const checkIfEmail = (str: string) => {
  const regexExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

  return regexExp.test(str);
};

export function filterStringsContainingDoc(strings: string[]): string[] {
  return strings?.filter((str) => str?.includes('.doc'));
}

export function filterStringsContainingImageExtensions(strings: string[]): string[] {
  return strings?.filter((str) => str?.includes('.png') || str.includes('.jpg'));
}
