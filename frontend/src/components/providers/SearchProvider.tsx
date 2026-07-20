import {
  createContext,
  useCallback,
  useContext,
  useDeferredValue,
  useEffect,
  useState,
} from 'react';
import { useUserInfo } from '#/components/providers/UserInfoProvider';

interface SearchContextValue {
  searchTerm: string;
  activeSearchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export function useSearch(): SearchContextValue {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }

  return context;
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const { userInfo } = useUserInfo();
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const activeSearchTerm = searchTerm.trim() ? deferredSearchTerm.trim() : '';

  const clearSearch = useCallback((): void => setSearchTerm(''), []);

  useEffect(() => {
    if (!userInfo) {
      setSearchTerm('');
    }
  }, [userInfo]);

  return (
    <SearchContext.Provider value={{ searchTerm, activeSearchTerm, setSearchTerm, clearSearch }}>
      {children}
    </SearchContext.Provider>
  );
}
