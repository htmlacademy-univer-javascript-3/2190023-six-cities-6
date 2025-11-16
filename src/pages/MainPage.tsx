import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/index';
import { Map } from '../components/Map';
import { OffersList } from '../components/OffersList';
import { CitiesList } from '../components/CitiesList';
import { changeCity } from '../store/action';
import { SortOptions } from '../components/SortOptions';
import type { SortType } from '../components/SortOptions';
import { Spinner } from '../components/Spinner';
import { Header } from '../components/Header';

const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];


export const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const city = useSelector((state: RootState) => state.city);
  const offers = useSelector((state: RootState) => state.offers.items);
  const isLoading = useSelector((state: RootState) => state.offers.isOffersLoading);
  const error = useSelector((state: RootState) => state.offers.error);

  const [sort, setSort] = useState<SortType>('Popular');
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const filteredOffers = useMemo(
    () => offers.filter((offer) => offer.city.name === city),
    [offers, city]
  );

  const sortedOffers = useMemo(() => {
    switch (sort) {
      case 'Price: low to high':
        return [...filteredOffers].sort((a, b) => a.price - b.price);
      case 'Price: high to low':
        return [...filteredOffers].sort((a, b) => b.price - a.price);
      case 'Top rated first':
        return [...filteredOffers].sort((a, b) => b.rating - a.rating);
      default:
        return filteredOffers;
    }
  }, [filteredOffers, sort]);

  const handleCityClick = (selectedCity: string) => {
    dispatch(changeCity(selectedCity));
  };

  const [fakeLoading, setFakeLoading] = useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => setFakeLoading(false), 5000000);
      return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="page page--gray page--main">

        <Header />

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <CitiesList 
                cities={CITIES}
                activeCity={city}
                onCityClick={handleCityClick}
              />
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{filteredOffers.length} places to stay in {city}</b>
                <SortOptions activeSort={sort} onSortChange={setSort} />

                {isLoading /*|| fakeLoading */ ? (
                  <div><Spinner /></div>
                ) : error ? (
                  <div>{error}</div>
                ) : (
                  <OffersList offers={sortedOffers} onCardHover={setActiveOfferId} />
                )}
                
              </section>
              <section className="cities__map map" style={{ width: '45%'}}>
                <Map offers={filteredOffers} activeOfferId={activeOfferId} />
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};