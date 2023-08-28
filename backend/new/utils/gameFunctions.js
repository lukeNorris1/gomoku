export function indexOfTile(value, state) {
    return state.moves.indexOf(value);
  }
  
export function gameFinishCheck(state) {
    if (state.moves.length < 9) return;
    const base = state.moves[state.moves.length - 1];
    if (
      checkWinBlock(base, 1, state) ||
      checkWinBlock(base, state.size, state) ||
      checkWinBlock(base, state.size + 1, state) ||
      checkWinBlock(base, state.size - 1, state)
    ) {
      //if Winner is found choose black or white
      if (state.moves.length % 2 == 0){
        return "White"
      } else if (state.moves.length % 2 == 1){
        return "Black"
      }
    }
    if (state.moves.length === state.size * state.size) {
      //if game is full change to draw
      return "Draw"
    }
  }
  
  export function checkWinBlock(baseCase, tileDiff, state) {
    if (!baseCase) return;
    var counter = 1;
    var iterator = tileDiff;
    for (var i = 1; i < 5; i++) {
      if (
        state.moves.includes(baseCase - iterator) &&
        baseCase - iterator >= 0
      ) {
        if (
          (indexOfTile(baseCase, state) % 2 === 0) ===
          (indexOfTile(baseCase - iterator, state) % 2 === 0)
        ) {
          counter += 1;
          iterator += tileDiff;
        }
      } else break;
    }
    iterator = tileDiff;
    for (i = 1; i < 5; i++) {
      if (
        state.moves.includes(baseCase + iterator) &&
        baseCase + iterator >= 0
      ) {
        if (
          (indexOfTile(baseCase, state) % 2 === 0) ===
          (indexOfTile(baseCase + iterator, state) % 2 === 0)
        ) {
          counter += 1;
          iterator += tileDiff;
        }
      } else break;
    }
    if (counter >= 5) {
      return true;
    }
  }
  