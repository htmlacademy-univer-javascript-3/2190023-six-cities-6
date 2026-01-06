import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FavoritesList } from "./favorites-list";
import { AuthorizationStatus } from "../store/auth-slice";

const mockFavOffers = [
  {
    "id": "caa8de63-ec63-499c-9d33-531461e865f6",
    "title": "Canal View Prinsengracht",
    "type": "hotel",
    "price": 232,
    "previewImage": "https://14.design.htmlacademy.pro/static/hotel/20.jpg",
    "city": {
      "name": "Paris",
      "location": {
        "latitude": 48.85661,
        "longitude": 2.351499,
        "zoom": 13
      }
    },
    "location": {
      "latitude": 48.858610000000006,
      "longitude": 2.330499,
      "zoom": 16
    },
    "isFavorite": true,
    "isPremium": false,
    "rating": 3.9
  },
  {
    "id": "904510b5-8770-4fed-9ee5-4fe529a4eee1",
    "title": "House in countryside",
    "type": "hotel",
    "price": 454,
    "previewImage": "https://14.design.htmlacademy.pro/static/hotel/18.jpg",
    "city": {
      "name": "Paris",
      "location": {
        "latitude": 48.85661,
        "longitude": 2.351499,
        "zoom": 13
      }
    },
    "location": {
      "latitude": 48.85761,
      "longitude": 2.358499,
      "zoom": 16
    },
    "isFavorite": true,
    "isPremium": true,
    "rating": 3.6
  },
  {
    "id": "711e1c27-53a0-4bb4-be3f-756d1b079c20",
    "title": "Wood and stone place",
    "type": "hotel",
    "price": 254,
    "previewImage": "https://14.design.htmlacademy.pro/static/hotel/17.jpg",
    "city": {
      "name": "Brussels",
      "location": {
        "latitude": 50.846557,
        "longitude": 4.351697,
        "zoom": 13
      }
    },
    "location": {
      "latitude": 50.827557,
      "longitude": 4.336697,
      "zoom": 16
    },
    "isFavorite": true,
    "isPremium": true,
    "rating": 3
  }
]

vi.mock('../store/redux', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: () => AuthorizationStatus.Authorized,
}));

vi.mock('react-router', () => ({
  Link: ({ children, to }: { children: React.ReactNode, to: string }) => <a href={to}>{children}</a>,
  useNavigate: () => vi.fn(),
}));

describe('FavoritesList', () => {
  it('should render favorites list', () => {
    render(<FavoritesList offers={mockFavOffers} />);

    expect(screen.getByText(/Canal View Prinsengracht/i)).toBeInTheDocument();
    expect(screen.getByText(/454/i)).toBeInTheDocument();
    expect(screen.getAllByText(/hotel/i)).toHaveLength(3);
  })
});