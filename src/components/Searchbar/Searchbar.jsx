// import { Component } from 'react';

import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { FaSearchengin } from 'react-icons/fa';

import css from './Searchbar.module.css';

// const initialState = {
//   inputValue: '',
// };

const Searchbar = ({ onSubmit }) => {
  const [state, setState] = useState({ inputValue: '' });
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(state);
    // setState({ inputValue: '' });
  };

  const { inputValue } = state;

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>
            <FaSearchengin style={{ width: 25, height: 25 }} />
          </span>
        </button>

        <input
          className={css.SearchFormInput}
          value={inputValue}
          name="inputValue"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          required
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// class Searchbar extends Component {
//   state = {
//     inputValue: '',
//   };

//   handleChange = event => {
//     const { name, value } = event.currentTarget;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     const { onSubmit } = this.props;
//     onSubmit({ ...this.state });
//     // this.reset();
//   };

//   // reset() {
//   //   this.setState({
//   //     inputValue: '',
//   //   });
//   // }

//   render() {
//     const { inputValue } = this.state;
//     const { handleChange, handleSubmit } = this;

//     return (
//       <header className={css.Searchbar}>
//         <form className={css.SearchForm} onSubmit={handleSubmit}>
//           <button type="submit" className={css.SearchFormButton}>
//             <span className={css.SearchFormButtonLabel}>
//               <FaSearchengin style={{ width: 25, height: 25 }} />
//             </span>
//           </button>

//           <input
//             className={css.SearchFormInput}
//             value={inputValue}
//             name="inputValue"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             onChange={handleChange}
//             required
//           />
//         </form>
//       </header>
//     );
//   }
// }
