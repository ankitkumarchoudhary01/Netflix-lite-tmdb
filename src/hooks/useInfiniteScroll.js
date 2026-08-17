import { useEffect } from "react";

function useInfiniteScroll({
    targetRef,
    onLoadMore,
    hasMore,
    loading,
}) {
    useEffect(() => {
        const target = targetRef.current;

        // console.log("Infinite Scroll Effect:", {
        //     target,
        //     hasMore,
        //     loading,
        // });

        if (!target || !hasMore || loading) {
            // console.log("Observer NOT created");
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];

                // console.log("Observer fired:", {
                //     isIntersecting: entry.isIntersecting,
                // });

                if (entry.isIntersecting) {
                    // console.log("Loading next page...");
                    onLoadMore();
                }
            },
            {
                root: null,
                rootMargin: "300px",
                threshold: 0,
            }
        );

        observer.observe(target);

        // console.log("Observer CREATED");

        return () => {
            // console.log("Observer CLEANUP");
            observer.disconnect();
        };
    }, [targetRef, onLoadMore, hasMore, loading]);
}

export default useInfiniteScroll;