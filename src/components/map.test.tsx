import { render } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from "vitest";
import { Map } from "./map";

// Mock leaflet
vi.mock('leaflet', () => {
  const mockMarker = {
    addTo: vi.fn().mockReturnThis(),
  };

  const mockLayerGroup = {
    addTo: vi.fn().mockReturnThis(),
    clearLayers: vi.fn(),
  };

  const mockTileLayer = {
    addTo: vi.fn().mockReturnThis(),
  };

  const mockMap = {
    setView: vi.fn(),
    remove: vi.fn(),
  };

  const mockIcon = vi.fn((options) => options);

  return {
    default: {
      map: vi.fn(() => mockMap),
      tileLayer: vi.fn(() => mockTileLayer),
      icon: mockIcon,
      marker: vi.fn(() => mockMarker),
      layerGroup: vi.fn(() => mockLayerGroup),
    },
    map: vi.fn(() => mockMap),
    tileLayer: vi.fn(() => mockTileLayer),
    icon: mockIcon,
    marker: vi.fn(() => mockMarker),
    layerGroup: vi.fn(() => mockLayerGroup),
  };
});

const mockOffers = [
  {
    "id": "1",
    "title": "Beautiful apartment",
    "type": "apartment",
    "price": 120,
    "previewImage": "img1.jpg",
    "city": {
      "name": "Paris",
      "location": {
        "latitude": 48.85661,
        "longitude": 2.351499,
        "zoom": 13
      }
    },
    "location": {
      "latitude": 48.85661,
      "longitude": 2.351499,
      "zoom": 16
    },
    "isFavorite": false,
    "isPremium": true,
    "rating": 4.5
  },
  {
    "id": "2",
    "title": "Nice house",
    "type": "house",
    "price": 200,
    "previewImage": "img2.jpg",
    "city": {
      "name": "Paris",
      "location": {
        "latitude": 48.85661,
        "longitude": 2.351499,
        "zoom": 13
      }
    },
    "location": {
      "latitude": 48.86661,
      "longitude": 2.361499,
      "zoom": 16
    },
    "isFavorite": true,
    "isPremium": false,
    "rating": 3.8
  }
];

describe('Map', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render map container', () => {
    const { container } = render(
      <Map
        offers={mockOffers}
        center={[48.85661, 2.351499]}
        cityChanged={false}
      />
    );

    expect(container.querySelector('#cities__leaflet-map-wrapper')).toBeInTheDocument();
  });

  it('should render map with empty offers', () => {
    const { container } = render(
      <Map
        offers={[]}
        center={[48.85661, 2.351499]}
        cityChanged={false}
      />
    );

    expect(container.querySelector('#cities__leaflet-map-wrapper')).toBeInTheDocument();
  });

  it('should render map with active offer', () => {
    const { container } = render(
      <Map
        offers={mockOffers}
        activeOfferId="1"
        center={[48.85661, 2.351499]}
        cityChanged={false}
      />
    );

    expect(container.querySelector('#cities__leaflet-map-wrapper')).toBeInTheDocument();
  });

  it('should render map when city changed', () => {
    const { container } = render(
      <Map
        offers={mockOffers}
        center={[52.370216, 4.895168]}
        cityChanged={true}
      />
    );

    expect(container.querySelector('#cities__leaflet-map-wrapper')).toBeInTheDocument();
  });
});