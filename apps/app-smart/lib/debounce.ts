// Define a generic async function type that accepts an AbortSignal and additional arguments.
type AsyncFunc<T, Args extends any[]> = (
  signal: AbortSignal,
  ...args: Args
) => Promise<T>;

export function createDebounce<T, Args extends any[]>(
  asyncFunc: AsyncFunc<T, Args>,
  delay: number = 1000
): (...args: Args) => Promise<T> {
  /**
   * @description Debounce an async function.
   * @param asyncFunc The async function to debounce.
   * @param delay The delay in milliseconds.
   * @returns A debounced version of the async function.
   * @example
   * const debouncedSearch = createDebounce(searchWrapper);
   * const debouncedFetchData = createDebounce(fetchData);
    // Define the necessary variables for debouncing.
    // `timeoutId` will store the ID of the current timeout.
    // `currentController` will store the AbortController for the current API call.
    // The AbortController is used to abort any in-flight API calls when the debounced function is called again.
    // The AbortSignal is passed to the async function and used to abort the in-flight API call.
   * @date 2025-03-08
   * @author Ed Ancerys
   */
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let currentController: AbortController | null = null;

  return (...args: Args): Promise<T> => {
    // Clear any existing timeout.
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // Abort any in-flight API call.
    if (currentController) {
      currentController.abort();
    }
    // Create a new AbortController for this call.
    currentController = new AbortController();

    return new Promise<T>((resolve, reject) => {
      timeoutId = setTimeout(async () => {
        try {
          // Call the async function with the AbortSignal and forwarded arguments.
          const result = await asyncFunc(currentController!.signal, ...args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
}
