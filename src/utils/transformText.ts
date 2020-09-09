const transformText = (string: string) =>
  string.charAt(0).toUpperCase() + string.substring(1).replace(/_/g, ' ');

export default transformText;
