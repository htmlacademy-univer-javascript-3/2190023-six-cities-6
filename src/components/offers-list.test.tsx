import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from "vitest";
import { OffersList } from "./offers-list";
import { AuthorizationStatus } from "../store/auth-slice";

// Mock Redux
vi.mock('../store/redux', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: () => AuthorizationStatus.Authorized,
}));

// Mock react-router
vi.mock('react-router', () => ({
  Link: ({ children, to }: { children: React.ReactNode, to: string }) => <a href={to}>{children}</a>,
  useNavigate: () => vi.fn(),
}));

const mockOffers = [
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
  }
];

describe('OffersList', () => {
  it('should render list of offers', () => {
    render(<OffersList offers={mockOffers} />);

    expect(screen.getByText('Waterfront with extraordinary view')).toBeInTheDocument();
    expect(screen.getByText(/173/i)).toBeInTheDocument();
    expect(screen.getByText('room')).toBeInTheDocument();
  });

  it('should render empty list when no offers provided', () => {
    const { container } = render(<OffersList offers={[]} />);

    expect(container.querySelector('.cities__places-list')).toBeEmptyDOMElement();
  });
});