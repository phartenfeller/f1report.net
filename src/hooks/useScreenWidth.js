const useScreenWidth = () => {
  const getScreenWidth = () => {
    if (typeof window === 'undefined') {
      return null;
    }
    return window.innerWidth;
  };

  return getScreenWidth();
};

export default useScreenWidth;
