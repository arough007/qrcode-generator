import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useDebounce } from '../useDebounce';

// Mock timers
vi.useFakeTimers();

describe('useDebounce', () => {
  afterEach(() => {
    vi.clearAllTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('calls the callback after the default delay', () => {
    const mockCallback = vi.fn();
    const deps = ['test'];

    renderHook(() => useDebounce(mockCallback, deps));

    // Initially, callback should not be called
    expect(mockCallback).not.toHaveBeenCalled();

    // Fast-forward time by 500ms (default delay)
    vi.advanceTimersByTime(500);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('calls the callback after custom delay', () => {
    const mockCallback = vi.fn();
    const deps = ['test'];
    const customDelay = 1000;

    renderHook(() => useDebounce(mockCallback, deps, customDelay));

    expect(mockCallback).not.toHaveBeenCalled();

    // Fast-forward by less than custom delay
    vi.advanceTimersByTime(500);
    expect(mockCallback).not.toHaveBeenCalled();

    // Fast-forward to reach custom delay
    vi.advanceTimersByTime(500);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('debounces multiple rapid changes', () => {
    const mockCallback = vi.fn();
    let deps = ['initial'];

    const { rerender } = renderHook(() => useDebounce(mockCallback, deps));

    // Change deps multiple times rapidly
    deps = ['change1'];
    rerender();
    deps = ['change2'];
    rerender();
    deps = ['change3'];
    rerender();

    // Fast-forward by 300ms (less than default delay)
    vi.advanceTimersByTime(300);
    expect(mockCallback).not.toHaveBeenCalled();

    // Fast-forward to complete the delay
    vi.advanceTimersByTime(200);
    
    // Should only be called once despite multiple changes
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('resets timer when dependencies change', () => {
    const mockCallback = vi.fn();
    let deps = ['initial'];

    const { rerender } = renderHook(() => useDebounce(mockCallback, deps));

    // Fast-forward partway through delay
    vi.advanceTimersByTime(300);
    expect(mockCallback).not.toHaveBeenCalled();

    // Change dependencies
    deps = ['changed'];
    rerender();

    // Fast-forward another 300ms (600ms total, but timer was reset)
    vi.advanceTimersByTime(300);
    expect(mockCallback).not.toHaveBeenCalled();

    // Fast-forward to complete the new delay period
    vi.advanceTimersByTime(200);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('does not call callback if component unmounts before delay', () => {
    const mockCallback = vi.fn();
    const deps = ['test'];

    const { unmount } = renderHook(() => useDebounce(mockCallback, deps));

    // Fast-forward partway through delay
    vi.advanceTimersByTime(300);
    
    // Unmount component
    unmount();

    // Fast-forward past the delay
    vi.advanceTimersByTime(300);

    expect(mockCallback).not.toHaveBeenCalled();
  });
}); 