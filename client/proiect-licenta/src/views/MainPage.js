import { API_KEY, API_URL, IMAGE_BASE_URL, IMAGE_SIZE } from '../config/Config';
import React, { useEffect } from 'react';
import SimpleImageSlider from 'react-simple-image-slider';

import '../views/poster.css';

function MainPage() {
  let images = [{ url: '' }];
  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = async (endpoint) => {
    const response = await fetch(endpoint);
    const data = await response.json();

    data.results.map((each, index) => {
      images[index] = {
        url: `${IMAGE_BASE_URL}${IMAGE_SIZE}` + each.backdrop_path,
      };
    });
  };
  const images1 = [
    { url: 'http://image.tmdb.org/t/p/w1280/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg' },
    { url: 'http://image.tmdb.org/t/p/w1280/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg' },
    { url: 'http://image.tmdb.org/t/p/w1280/loRmRzQXZeqG78TqZuyvSlEQfZb.jpg' },
    { url: 'http://image.tmdb.org/t/p/w1280/poec6RqOKY9iSiIUmfyfPfiLtvB.jpg' },
    { url: 'http://image.tmdb.org/t/p/w1280/6fA9nie4ROlkyZAUlgKNjGNCbHG.jpg' },
  ];
  const images2 = [
    { url: 'http://image.tmdb.org/t/p/w1280/p1F51Lvj3sMopG948F5HsBbl43C.jpg' },
    { url: 'http://image.tmdb.org/t/p/w1280/znUdSyO9ZUopUfmr6DH5YT5D5Cs.jpg' },
    { url: 'http://image.tmdb.org/t/p/w1280/jwz9LW0hIsQ6v7DJXgRLtWZOmzX.jpg' },
    { url: 'http://image.tmdb.org/t/p/w1280/54PmeEzQMvpojpJBku61ZGQnWUX.jpg' },
    { url: 'http://image.tmdb.org/t/p/w1280/p8XnVA7zWZu7ZJsM1Cm9l7S9IH8.jpg' },
  ];

  return (
    <React.Fragment>
      <div className="homepage">
        <main>
          <section className="hero">
            <div className="hero__bg__image__container">
              <img
                src="poster.jpg"
                alt="BG hero image"
                className="hero__bg__image"
              />
            </div>

            <div className="hero__bg__overlay"></div>
            <div>
              <nav className="navbar"></nav>
            </div>
            <div className="hero__card">
              <h1 className="hero__title">
                Over 700,000 movies,
                <br />
                <br />
                <br />
                Don't miss out
              </h1>
              <br />
              <p className="hero__subtitle">Search every movie and more.</p>
            </div>
          </section>

          <div className="slidershow">
            <SimpleImageSlider
              width={800}
              height={404}
              images={images1}
              showBullets={true}
              showNavs={true}
              slideDuration={1}
              startIndex={0}
            />
            <div className="popularmovies">
              Checkout some of
              <br />
              <br />
              <br />
              the most popular movies
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <hr />
          <br />
          <br />
          <br />
          <br />
          <div className="slidershow">
            <div className="populartvseries">
              Checkout the movies
              <br />
              <br />
              <br />
              coming to Cinema soon
            </div>
            <SimpleImageSlider
              width={800}
              height={404}
              images={images2}
              showBullets={true}
              showNavs={true}
              slideDuration={1}
              startIndex={0}
            />
          </div>
        </main>
      </div>
    </React.Fragment>
  );
}

export default MainPage;
