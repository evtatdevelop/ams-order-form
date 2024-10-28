
export const layoutSwitch = string => {
  const dataKeys = {
    "й" : "q","ц" : "w","у" : "e","к" : "r","е" : "t","н" : "y","г" : "u","ш" : "i","щ" : "o","з" : "p","х" : "[","ъ" : "]",
    "ф" : "a","ы" : "s","в" : "d","а" : "f","п" : "g","р" : "h","о" : "j","л" : "k","д" : "l","ж" : ";","э" : "'",
    "я" : "z","ч" : "x","с" : "c","м" : "v","и" : "b","т" : "n","ь" : "m","б" : ",","ю" : ".",
    "Й" : "Q","Ц" : "W","У" : "E","К" : "R","Е" : "T","Н" : "Y","Г" : "U","Ш" : "I","Щ" : "O","З" : "P","Х" : "{","Ъ" : "}",
    "Ф" : "A","Ы" : "S","В" : "D","А" : "F","П" : "G","Р" : "H","О" : "J","Л" : "K","Д" : "L","Ж" : ":","Э" : '"', 
    "Я" : "Z","Ч" : "X","С" : "C","М" : "V","И" : "B","Т" : "N","Ь" : "M","Б" : "<","Ю" : ">",
    "q" : "й","w" : "ц","e" : "у","r" : "к","t" : "е","y" : "н","u" : "г","i" : "ш","o" : "щ","p" : "з","[" : "х","]" : "ъ",
    "a" : "ф","s" : "ы","d" : "в","f" : "а","g" : "п","h" : "р","j" : "о","k" : "л","l" : "д",";" : "ж","'" : "э",
    "z" : "я","x" : "ч","c" : "с","v" : "м","b" : "и","n" : "т","m" : "ь","," : "б","." : "ю",
    "Q" : "Й","W" : "Ц","E" : "У","R" : "К","T" : "Е","Y" : "Н","U" : "Г","I" : "Ш","O" : "Щ","P" : "З","{" : "Х","}" : "Ъ",
    "A" : "Ф","S" : "Ы","D" : "В","F" : "А","G" : "П","H" : "Р","J" : "О","K" : "Л","L" : "Д",":" : "Ж",'"' : "Э",
    "Z" : "Я","X" : "Ч","C" : "С","V" : "М","B" : "И","N" : "Т","M" : "Ь","<" : "Б",">" : "Ю"
  };
  const result = Array.from(string).map(char => {
    const swichedChar = dataKeys[char];
    return swichedChar ?? char;
  }).join('');
  // console.log(result);
  return result
}

export const upperFirst = str => str && typeof(str) === 'string' 
  ? str[0].toUpperCase() + str.slice(1)
  : str;

export const strToStrDate = (str, lang) => {
  const date = new Date(Date.parse(str))
  if ( !date ) return '';
  const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
  const mm = date.getMonth()+1 > 9 ? date.getMonth()+1 : `0${date.getMonth()+1}`
  return lang.toUpperCase() === 'RU' ? `${dd}.${mm}.${date.getFullYear()}` : `${dd}-${mm}-${date.getFullYear()}`;
}
