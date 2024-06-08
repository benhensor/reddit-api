export function getProfileStyle() {

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function getRandomInitials() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const firstInitial = alphabet[Math.floor(Math.random() * alphabet.length)];
    const secondInitial = alphabet[Math.floor(Math.random() * alphabet.length)];
    return `${firstInitial}${secondInitial}`;
  }

  const backgroundColor = getRandomColor();
  const initials = getRandomInitials();

  return {
    backgroundColor: backgroundColor,
    initials: initials
  }
}