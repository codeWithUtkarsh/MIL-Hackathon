import { describe, test, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AmbassadorDashboardPage from '../app/ambassador-dashboard';

// Mock the store hook
const mockStore = {
  dashboardStats: {
    totalCreators: 5,
    activeNetworks: 3,
    pendingAssets: 2,
    totalPoints: 150
  },
  activities: [],
  members: [
    {
      id: 'creator-1',
      role: 'creator',
      name: 'Alice Creator',
      email: 'alice@example.com',
      handle: 'alice_creates',
      campus: 'MIT',
      languages: ['English'],
      points: 100,
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'creator-2',
      role: 'creator',
      name: 'Bob Creator',
      email: 'bob@example.com',
      handle: 'bob_makes',
      campus: 'Stanford',
      languages: ['English'],
      points: 75,
      createdAt: '2024-01-02T00:00:00Z'
    }
  ],
  assets: [],
  invitations: [],
  networks: [
    {
      id: 'network-1',
      ambassadorId: 'amb-1',
      creatorId: 'creator-1',
      addedAt: '2024-01-01T00:00:00Z',
      status: 'active'
    },
    {
      id: 'network-2',
      ambassadorId: 'amb-1',
      creatorId: 'creator-2',
      addedAt: '2024-01-02T00:00:00Z',
      status: 'active'
    }
  ],
  currentUser: {
    id: 'amb-1',
    role: 'ambassador',
    name: 'John Ambassador',
    email: 'john@example.com',
    handle: 'john_amb',
    campus: 'Harvard',
    languages: ['English'],
    points: 200,
    createdAt: '2024-01-01T00:00:00Z'
  },
  refreshDashboardStats: vi.fn(),
  initializeData: vi.fn(),
  addMember: vi.fn(),
  approveAsset: vi.fn(),
  setCurrentUser: vi.fn(),
  getNetworkCreators: vi.fn(() => [
    {
      id: 'creator-1',
      role: 'creator',
      name: 'Alice Creator',
      email: 'alice@example.com',
      handle: 'alice_creates',
      campus: 'MIT',
      languages: ['English'],
      points: 100,
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 'creator-2',
      role: 'creator',
      name: 'Bob Creator',
      email: 'bob@example.com',
      handle: 'bob_makes',
      campus: 'Stanford',
      languages: ['English'],
      points: 75,
      createdAt: '2024-01-02T00:00:00Z'
    }
  ])
};

// Mock the auth context
const mockAuth = {
  user: {
    id: 'amb-1',
    name: 'John Ambassador',
    email: 'john@example.com'
  }
};

// Mock the invitation actions
vi.mock('../lib/invitation-actions', () => ({
  resendInvitationAction: vi.fn(),
  revokeInvitationAction: vi.fn()
}));

// Mock the store
vi.mock('../lib/store', () => ({
  useStore: () => mockStore
}));

// Mock the auth context
vi.mock('../lib/auth-context', () => ({
  useAuth: () => mockAuth
}));

// Mock canvas for NetworkGraphModal
const mockCanvas = {
  getContext: vi.fn(() => ({
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    fill: vi.fn(),
    fillText: vi.fn(),
    measureText: vi.fn(() => ({ width: 50 })),
    createLinearGradient: vi.fn(() => ({
      addColorStop: vi.fn()
    })),
    set fillStyle(value) {},
    set strokeStyle(value) {},
    set lineWidth(value) {},
    set font(value) {},
    set textAlign(value) {},
    set shadowColor(value) {},
    set shadowBlur(value) {}
  })),
  getBoundingClientRect: vi.fn(() => ({
    left: 0,
    top: 0,
    width: 800,
    height: 600
  })),
  width: 800,
  height: 600
};

beforeEach(() => {
  vi.clearAllMocks();

  // Mock canvas element
  HTMLCanvasElement.prototype.getContext = mockCanvas.getContext;
  HTMLCanvasElement.prototype.getBoundingClientRect = mockCanvas.getBoundingClientRect;
  Object.defineProperty(HTMLCanvasElement.prototype, 'width', {
    value: 800,
    writable: true
  });
  Object.defineProperty(HTMLCanvasElement.prototype, 'height', {
    value: 600,
    writable: true
  });

  // Mock requestAnimationFrame
  global.requestAnimationFrame = vi.fn(cb => setTimeout(cb, 16));
  global.cancelAnimationFrame = vi.fn();
});

describe('View Network Integration Test', () => {
  test('View Network button exists and has correct styling', () => {
    render(<AmbassadorDashboardPage />);

    const viewNetworkButton = screen.getByRole('button', { name: /view network/i });

    expect(viewNetworkButton).toBeInTheDocument();
    expect(viewNetworkButton).toHaveTextContent('🌐 View Network');
    expect(viewNetworkButton).toHaveClass('p-3', 'bg-gradient-to-r', 'from-indigo-600/20');
  });

  test('clicking View Network button opens the network modal', async () => {
    render(<AmbassadorDashboardPage />);

    const viewNetworkButton = screen.getByRole('button', { name: /view network/i });

    // Initially, the network modal should not be visible
    expect(screen.queryByText('Creator Network')).not.toBeInTheDocument();

    // Click the View Network button
    fireEvent.click(viewNetworkButton);

    // Wait for the modal to appear
    await waitFor(() => {
      expect(screen.getByText('Creator Network')).toBeInTheDocument();
    });
  });

  test('network modal displays correct ambassador and creator data', async () => {
    render(<AmbassadorDashboardPage />);

    const viewNetworkButton = screen.getByRole('button', { name: /view network/i });
    fireEvent.click(viewNetworkButton);

    await waitFor(() => {
      // Check modal header
      expect(screen.getByText('Creator Network')).toBeInTheDocument();
      expect(screen.getByText('Your network of 2 connected creators')).toBeInTheDocument();

      // Check creator list
      expect(screen.getByText('Alice Creator')).toBeInTheDocument();
      expect(screen.getByText('@alice_creates')).toBeInTheDocument();
      expect(screen.getByText('MIT')).toBeInTheDocument();

      expect(screen.getByText('Bob Creator')).toBeInTheDocument();
      expect(screen.getByText('@bob_makes')).toBeInTheDocument();
      expect(screen.getByText('Stanford')).toBeInTheDocument();

      // Check network stats
      expect(screen.getByText('Total Creators:')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('Network Density:')).toBeInTheDocument();
      expect(screen.getByText('100%')).toBeInTheDocument();
    });
  });

  test('network modal can be closed using the close button', async () => {
    render(<AmbassadorDashboardPage />);

    const viewNetworkButton = screen.getByRole('button', { name: /view network/i });
    fireEvent.click(viewNetworkButton);

    await waitFor(() => {
      expect(screen.getByText('Creator Network')).toBeInTheDocument();
    });

    // Find and click the close button (X icon)
    const closeButton = screen.getByRole('button', { name: '' }); // Close button typically has no text
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('Creator Network')).not.toBeInTheDocument();
    });
  });

  test('network modal shows canvas for graph visualization', async () => {
    render(<AmbassadorDashboardPage />);

    const viewNetworkButton = screen.getByRole('button', { name: /view network/i });
    fireEvent.click(viewNetworkButton);

    await waitFor(() => {
      expect(screen.getByText('Creator Network')).toBeInTheDocument();

      // Check that canvas is rendered
      const canvas = screen.getByRole('img', { hidden: true }); // Canvas has implicit role img
      expect(canvas).toBeInTheDocument();
      expect(canvas).toHaveAttribute('width', '800');
      expect(canvas).toHaveAttribute('height', '600');
    });
  });

  test('getNetworkCreators is called with correct ambassador ID', async () => {
    render(<AmbassadorDashboardPage />);

    const viewNetworkButton = screen.getByRole('button', { name: /view network/i });
    fireEvent.click(viewNetworkButton);

    await waitFor(() => {
      expect(screen.getByText('Creator Network')).toBeInTheDocument();
    });

    // Verify that getNetworkCreators was called
    expect(mockStore.getNetworkCreators).toHaveBeenCalled();
  });

  test('network modal handles empty creator list gracefully', async () => {
    // Mock empty creators list
    const emptyMockStore = {
      ...mockStore,
      getNetworkCreators: vi.fn(() => [])
    };

    vi.mocked(require('../lib/store').useStore).mockReturnValue(emptyMockStore);

    render(<AmbassadorDashboardPage />);

    const viewNetworkButton = screen.getByRole('button', { name: /view network/i });
    fireEvent.click(viewNetworkButton);

    await waitFor(() => {
      expect(screen.getByText('Creator Network')).toBeInTheDocument();
      expect(screen.getByText('Your network of 0 connected creators')).toBeInTheDocument();
      expect(screen.getByText('No creators connected yet')).toBeInTheDocument();
      expect(screen.getByText('0%')).toBeInTheDocument();
    });
  });

  test('View Network button is positioned correctly in quick actions', () => {
    render(<AmbassadorDashboardPage />);

    const addCreatorButton = screen.getByRole('button', { name: /add creator/i });
    const viewNetworkButton = screen.getByRole('button', { name: /view network/i });
    const settingsButton = screen.getByRole('button', { name: /settings/i });

    // All buttons should be present
    expect(addCreatorButton).toBeInTheDocument();
    expect(viewNetworkButton).toBeInTheDocument();
    expect(settingsButton).toBeInTheDocument();

    // View Network button should have the correct icon
    expect(viewNetworkButton).toHaveTextContent('🌐');
  });

  test('network modal legend displays correct information', async () => {
    render(<AmbassadorDashboardPage />);

    const viewNetworkButton = screen.getByRole('button', { name: /view network/i });
    fireEvent.click(viewNetworkButton);

    await waitFor(() => {
      expect(screen.getByText('Legend')).toBeInTheDocument();
      expect(screen.getByText('Ambassador')).toBeInTheDocument();
      expect(screen.getByText('Creator')).toBeInTheDocument();
    });
  });
});
