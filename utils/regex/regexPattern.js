const urlRegex = /(https?:\/\/(([\w-]+\.)+)+([\w])+((\/[a-z_0-9\-:~\\.%\\/?#[\]@!$&'\\(\\)*+,;=]+)+)?)/i;
const ruNameMovie = /((?<digits>\d+)|(?<punctuation>\p{P}+)|(?<roman>\bM{0,4}(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})\b)|(?<literal>[\W]+))/i;
const enNameMovie = /((?<digits>\d+)|(?<punctuation>\p{P}+)|(?<roman>\bM{0,4}(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})\b)|(?<literal>[\w]+))/i;

module.exports = {
  urlRegex,
  ruNameMovie,
  enNameMovie,
};
