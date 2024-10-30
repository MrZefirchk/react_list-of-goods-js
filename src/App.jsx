import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';
const DEFAULT_SORT_FIELD = '';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const [sortField, setSortField] = useState(DEFAULT_SORT_FIELD);
  const [reversed, setReversed] = useState(false);

  let visibileGoods = [...goodsFromServer];

  if (sortField) {
    visibileGoods = visibileGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1[sortField] - good2[sortField];

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    visibileGoods = visibileGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SORT_FIELD_ALPHABETICALLY || 'is-light'}`}
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SORT_FIELD_LENGTH || 'is-light'}`}
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed || 'is-light'}`}
          onClick={() => {
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {(sortField !== DEFAULT_SORT_FIELD || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(DEFAULT_SORT_FIELD);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibileGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
