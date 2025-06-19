import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Helper function to render App with Router
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

describe('App Component', () => {
  test('renders navbar with correct title', () => {
    renderWithRouter(<App />);
    const titleElement = screen.getByText(/WizzText/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders text form on home page', () => {
    renderWithRouter(<App />);
    expect(screen.getByText(/Enter the text to analyse/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('dark mode toggle changes theme', () => {
    renderWithRouter(<App />);
    const toggleButton = screen.getByRole('button', { name: /dark/i });
    
    // Initial light mode
    expect(document.body).toHaveStyle('background-color: white');
    
    // Click toggle
    fireEvent.click(toggleButton);
    expect(document.body).toHaveStyle('background-color: rgb(5, 24, 44)');
    expect(screen.getByText(/Dark mode enabled/i)).toBeInTheDocument();
    
    // Click again
    fireEvent.click(toggleButton);
    expect(document.body).toHaveStyle('background-color: white');
    expect(screen.getByText(/Light mode enabled/i)).toBeInTheDocument();
  });

  test('navigates to about page', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/about/i));
    expect(screen.getByText(/About us/i)).toBeInTheDocument();
  });

  test('navigates to markdown editor', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/markdown/i));
    expect(screen.getByText(/Markdown Editor/i)).toBeInTheDocument();
  });

  test('shows and hides alerts', () => {
    jest.useFakeTimers();
    renderWithRouter(<App />);
    
    // Trigger alert via dark mode toggle
    fireEvent.click(screen.getByRole('button', { name: /dark/i }));
    expect(screen.getByText(/Dark mode enabled/i)).toBeInTheDocument();
    
    // Advance timers to hide alert
    jest.advanceTimersByTime(1500);
    expect(screen.queryByText(/Dark mode enabled/i)).not.toBeInTheDocument();
    
    jest.useRealTimers();
  });
});