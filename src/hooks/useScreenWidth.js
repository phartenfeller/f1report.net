const useScreenWidth = () => {
  const getScreenWidth = () => {
    if (!window) {
      return null;
    }
    return window.innerWidth;
  };

  return getScreenWidth();
};

export default useScreenWidth;
