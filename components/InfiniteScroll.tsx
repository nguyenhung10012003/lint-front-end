import React, { ReactNode, useCallback, useRef } from "react";

interface InfiniteScrollProps {
  loadMore: () => void;
  hasMore: boolean;
  children: ReactNode;
  loadMoreBtn?: ReactNode;
  loadingUI?: ReactNode;
  className?: string;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  loadMore,
  hasMore,
  children,
  loadMoreBtn,
  loadingUI,
  className,
}) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: Element | null) => {
      if (loadMoreBtn) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loadMore, loadMoreBtn]
  );

  return (
    <div className={className}>
      {children}
      {!loadMoreBtn && <div ref={lastElementRef} style={{ height: 1 }}></div>}
      {!loadMoreBtn && hasMore && loadingUI}
      {loadMoreBtn && hasMore && (
        <div
          onClick={loadMore}
          style={{ display: "block", margin: "20px auto", cursor: "pointer" }}
        >
          {loadMoreBtn}
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;
