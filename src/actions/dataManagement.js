export const saveGame = (gameData) => {
  const data = JSON.stringify(gameData);
  localStorage.setItem("eoe-save", data);
}