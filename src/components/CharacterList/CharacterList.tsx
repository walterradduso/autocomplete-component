import { ReactElement } from 'react';
import type { Character } from '../../types';

interface Props {
  inputValue: string;
  characters: Character[];
}

// It renders a list of characters that match the inputValue.
// I use a regular expression to highlight the matching characters.
// I separate the CharacterList component from the Autocomplete component because it makes the code easier to read and maintain.
function CharacterList({ inputValue, characters }: Props): ReactElement {
  return (
    <>
      {!inputValue && <div className="item">Type something to search...</div>}

      {inputValue && !characters?.length && <div className="item">No results found</div>}

      {characters?.map(({ id, name }: Character) => {
        return (
          <div key={`character-${id}`} className="item">
            {name.split(new RegExp(`(${inputValue})`, 'gi')).map((seg, i) => (i % 2 === 0 ? seg : <mark key={`match-${i}`}>{seg}</mark>))}
          </div>
        );
      })}
    </>
  );
}

export default CharacterList;
