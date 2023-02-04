// import { Component } from 'react';

import { useState, useEffect } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from 'shared/components/Modal';

import searchPicts from '../shared/services/ImgAPI';

import css from './App.module.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pickedLargeImageURL, setPickedLargeImageURL] = useState('');
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (!search) return;
    const fetchPicts = () => {
      setLoading(true);
      searchPicts(search, page)
        .then(({ hits, totalHits }) => {
          const totalPages = Math.round(totalHits / 15);
          if (page === totalPages) {
            alert('You have reached the end of the search');
          }
          setItems(prevItems => [...prevItems, ...hits]);
          setTotal(totalHits);
        })
        .catch(error => {
          setError(error.message);
        })
        .finally(() => setLoading(false));
    };
    fetchPicts();
  }, [search, page, setLoading, setItems, setTotal, setError]);

  const showLargePict = url => {
    setShowModal(true);
    setPickedLargeImageURL(url);
  };

  const toggleModal = () => {
    setPickedLargeImageURL(null);
    setShowModal(false);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const searchImg = ({ inputValue }) => {
    if (inputValue === search) return;
    setSearch(inputValue);
    setItems([]);
    setPage(1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={searchImg} isLoading={loading} />
      <ImageGallery items={items} onClick={showLargePict} />
      {error && <p>Something goes wrong. Please try again later.</p>}
      {loading && <Loader />}
      {Boolean(items.length) && items.length < total && (
        <Button onLoadMore={loadMore} />
      )}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={pickedLargeImageURL} alt="pict" />
        </Modal>
      )}
    </div>
  );
};

export default App;

// class App extends Component {
//   state = {
//     search: '',
//     items: [],
//     page: 1,
//     loading: false,
//     showModal: false,
//     pickedLargeImageURL: '',
//     error: null,
//     total: null,
//   };

//   showModal = url => {
//     this.setState({
//       pickedLargeImageURL: url,
//       showModal: true,
//     });
//   };

//   toggleModal = () => {
//     this.setState(() => ({
//       pickedLargeImageURL: null,
//       showModal: false,
//     }));
//   };

//   searchImg = ({ inputValue }) => {
//     if (inputValue === this.state.search) return;
//     this.setState({ search: inputValue, items: [], page: 1 });
//   };

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { search, page } = this.state;
//     if (prevState.search !== search || prevState.page !== page) {
//       this.fetchPicts();
//     }
//   }

//   fetchPicts = () => {
//     const { search, page } = this.state;

//     this.setState({ loading: true });

//     searchPicts(search, page)
//       .then(({ hits, totalHits }) => {
//         const totalPages = Math.round(totalHits / 12);
//         if (page === totalPages) {
//           alert('No more pictures or photos for you');
//         }

//         this.setState(({ items }) => ({
//           items: [...items, ...hits],
//           total: totalHits,
//         }));
//       })
//       .catch(error => {
//         this.setState({ error: error.message });
//       })
//       .finally(() => this.setState({ loading: false }));
//   };

//   render() {
//     const { items, pickedLargeImageURL, loading, error, total } = this.state;
//     const { searchImg, loadMore, showModal, toggleModal } = this;
//     return (
//       <div className={css.App}>
//         <Searchbar onSubmit={searchImg} isLoading={loading} />
//         <ImageGallery items={items} onClick={showModal} />
//         {error && <p>Something goes wrong. Please try again later.</p>}
//         {loading && <Loader />}
//         {Boolean(items.length) && items.length < total && (
//           <Button onLoadMore={loadMore} />
//         )}

//         {pickedLargeImageURL && (
//           <Modal onClose={toggleModal}>
//             <img src={pickedLargeImageURL} alt="pict" />
//           </Modal>
//         )}
//       </div>
//     );
//   }
// }

// export default App;
