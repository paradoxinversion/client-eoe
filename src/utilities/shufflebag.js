/**
 *
 * @param {*} frequencyMap - a key/value map of options and their frequencies
 */
export const Shufflebag = frequencyMap => {
  const getValueSet = frequencyMap => {
    let valueSet = [];
    for (let entry in frequencyMap) {
      for (let y = 0; y < frequencyMap[entry]; y++) {
        valueSet.push(entry);
      }
    }
    return valueSet;
  };

  const fmap = frequencyMap;
  let values = getValueSet(fmap);
  return {
    /**
     * Get the next value in the shufflebag.
     */
    next() {
      const selectedValue = Math.floor(Math.random() * values.length);
      const selection = values[selectedValue];
      values.splice(selectedValue, 1);
      if (values.length === 0) values = getValueSet(fmap);
      return selection;
    }
  };
};