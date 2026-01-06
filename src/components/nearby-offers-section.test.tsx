import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from "vitest";
import { NearbyOffersSection } from "./nearby-offers-section";
import { AuthorizationStatus } from "../store/auth-slice";
import { useAppSelector } from '../store/redux';

// Mock Redux
vi.mock('../store/redux', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: vi.fn(),
}));

// Mock react-router
vi.mock('react-router', () => ({
  Link: ({ children, to }: { children: React.ReactNode, to: string }) => <a href={to}>{children}</a>,
  useNavigate: () => vi.fn(),
}));

// Mock Map component
vi.mock('./map', () => ({
  Map: () => <div data-testid="map">Map Component</div>,
}));

const mockNearbyOffers = [
  {
    "id": "8005824e-c222-40f0-be1f-dca96f24ac45",
    "title": "Waterfront with extraordinary view",
    "type": "room",
    "price": 173,
    "previewImage": "https://14.design.htmlacademy.pro/static/hotel/16.jpg",
    "city": {
      "name": "Cologne",
      "location": {
        "latitude": 50.938361,
        "longitude": 6.959974,
        "zoom": 13
      }
    },
    "location": {
      "latitude": 50.950361,
      "longitude": 6.961974,
      "zoom": 16
    },
    "isFavorite": false,
    "isPremium": true,
    "rating": 4.9
  },
  {
    "id": "2650673c-6306-4aae-8a24-3881efed6bc1",
    "title": "Beautiful & luxurious apartment at great location",
    "type": "house",
    "price": 240,
    "previewImage": "https://14.design.htmlacademy.pro/static/hotel/17.jpg",
    "city": {
      "name": "Cologne",
      "location": {
        "latitude": 50.938361,
        "longitude": 6.959974,
        "zoom": 13
      }
    },
    "location": {
      "latitude": 50.934361,
      "longitude": 6.943974,
      "zoom": 16
    },
    "isFavorite": false,
    "isPremium": true,
    "rating": 3.5
  },
  {
    "id": "614c1727-b7df-4774-8d6b-6ea723654e13",
    "title": "Tile House",
    "type": "apartment",
    "price": 194,
    "previewImage": "https://14.design.htmlacademy.pro/static/hotel/10.jpg",
    "city": {
      "name": "Cologne",
      "location": {
        "latitude": 50.938361,
        "longitude": 6.959974,
        "zoom": 13
      }
    },
    "location": {
      "latitude": 50.947361,
      "longitude": 6.9799739999999995,
      "zoom": 16
    },
    "isFavorite": false,
    "isPremium": false,
    "rating": 2.9
  },
  {
    "id": "1aee14e8-49d8-48f3-b356-949c122e8693",
    "title": "Beautiful & luxurious apartment at great location",
    "type": "room",
    "price": 219,
    "previewImage": "https://14.design.htmlacademy.pro/static/hotel/5.jpg",
    "city": {
      "name": "Cologne",
      "location": {
        "latitude": 50.938361,
        "longitude": 6.959974,
        "zoom": 13
      }
    },
    "location": {
      "latitude": 50.960361,
      "longitude": 6.967974,
      "zoom": 16
    },
    "isFavorite": false,
    "isPremium": false,
    "rating": 3.5
  }
];

const mockCurrentOffer = {
  "id": "be345722-ff63-46f4-83a7-42af9ad3f8ed",
  "title": "House in countryside",
  "type": "hotel",
  "price": 268,
  "previewImage": "https://14.design.htmlacademy.pro/static/hotel/20.jpg",
  "city": {
    "name": "Cologne",
    "location": {
      "latitude": 50.938361,
      "longitude": 6.959974,
      "zoom": 13
    }
  },
  "location": {
    "latitude": 50.932361,
    "longitude": 6.937974,
    "zoom": 16
  },
  "isFavorite": false,
  "isPremium": false,
  "rating": 3.5
};

describe('NearbyOffersSection', () => {
  it('should render nearby offers section with offers and map', () => {
    // First call: nearbyOffers, Second call: currentOffer
    vi.mocked(useAppSelector)
      .mockReturnValueOnce(mockNearbyOffers)
      .mockReturnValueOnce(mockCurrentOffer)
      .mockReturnValue(AuthorizationStatus.Authorized);

    render(<NearbyOffersSection />);

    expect(screen.getByText('Waterfront with extraordinary view')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('should render empty section when no nearby offers', () => {
    // First call: nearbyOffers (empty), Second call: currentOffer
    vi.mocked(useAppSelector)
      .mockReturnValueOnce([])
      .mockReturnValueOnce(mockCurrentOffer)
      .mockReturnValue(AuthorizationStatus.Authorized);

    render(<NearbyOffersSection />);

    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.queryByText('Waterfront with extraordinary view')).not.toBeInTheDocument();
  });
});