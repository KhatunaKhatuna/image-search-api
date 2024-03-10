import React, { useEffect } from "react";

const InfiniteScroll = ({ loadMore, isLoading, hasMore, children }: any) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 10 && // Near bottom
        !isLoading &&
        hasMore
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore, loadMore]);

  return <>{children}</>;
};

export default InfiniteScroll;
