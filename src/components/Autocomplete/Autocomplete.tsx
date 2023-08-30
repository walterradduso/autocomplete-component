import { ChangeEvent, ReactElement, useEffect, useRef, useState } from 'react';

import useDebounce from '../../hooks/useDebounce';
import type { Character } from '../../types';
import { CharacterList } from '../CharacterList';

import { CHARACTERS_URL } from '../../constants';
import './styles.css';

function Autocomplete(): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);

  const [characters, setCharacters] = useState<Character[]>([]);
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const debouncedInputValue = useDebounce(inputValue, 500);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setInputValue(event.target.value);

    if (!event.target.value) {
      setCharacters([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Get characters from API
    const getCharacters = async () => {
      try {
        const response = await fetch(`${CHARACTERS_URL}?name=${debouncedInputValue}`);
        const data = await response.json();

        // Get only the name and id of each character
        const characterNames = data?.results?.map((item: Character) => ({
          name: item.name,
          id: item.id,
        }));

        setCharacters(characterNames || []);

        setLoading(false);
      } catch (error) {
        setCharacters([]);
        console.error(error);
      }
    };

    if (debouncedInputValue) {
      getCharacters();
    }
  }, [debouncedInputValue]);

  return (
    <div className="autocomplete">
      <input
        className="input"
        onBlur={() => setFocused(false)}
        onChange={handleInput}
        onFocus={() => setFocused(true)}
        ref={inputRef}
        type="text"
        value={inputValue}
      />

      {focused && (
        <div className="list">
          {loading ? (
            <div className="spinnerContainer">
              <div className="spinner" />
            </div>
          ) : (
            <CharacterList inputValue={inputValue} characters={characters} />
          )}
        </div>
      )}
    </div>
  );
}

export default Autocomplete;
