import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import axios from 'axios';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config/Config';
import { useNavigate, useParams } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';

const { Title } = Typography;

function WatchlistPage() {
  const navigate = useNavigate();
  const instance = axios.create({ baseURL: 'http://localhost:5000' });
  const [watchlist, setWatchlist] = useState([]);

  const { id } = useParams();
  let variable = { userFrom: id };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = () => {
    instance
      .post('/api/watchlist/getWatchlistedMovie', variable)
      .then((response) => {
        if (response.data.success) {
          setWatchlist(response.data.watchlisted);
        } else {
          alert('Failed to get Watchlist');
        }
      });
  };

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId: movieId,
      userFrom: userFrom,
    };

    instance
      .post('/api/watchlist/removeFromWatchlist', variables)
      .then((response) => {
        if (response.data.success) {
          fetchWatchlist();
        } else {
          alert('Failed to Remove From Watchlist');
        }
      });
  };

  return (
    <div className="wrapper">
      <div style={{ width: '85%', margin: '3rem auto' }}>
        <Title level={2}> My Watchlist </Title>

        {watchlist.map((item, index) => {
          return (
            <tr key={index}>
              <p style={{ display: 'flex', paddingTop: '20px' }}>
                {item.movieTitle}
              </p>
              <div
                style={{
                  marginTop: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {item.moviePoster ? (
                  <img
                    onClick={() => {
                      navigate(`/movie/${item.movieId}`);
                    }}
                    style={{ width: '15%' }}
                    src={`${IMAGE_BASE_URL}${POSTER_SIZE}${item.moviePoster}`}
                  />
                ) : (
                  'no image available'
                )}

                {<p className="ovw">{item.movieOverview}</p>}

                <span>
                  {id === localStorage.getItem('userid') ? (
                    <CloseOutlined
                      className="removebtn"
                      style={{ alignItems: 'center' }}
                      onClick={() => onClickDelete(item.movieId, item.userFrom)}
                    />
                  ) : null}
                </span>
              </div>
            </tr>
          );
        })}
      </div>
    </div>
  );
}

export default WatchlistPage;
