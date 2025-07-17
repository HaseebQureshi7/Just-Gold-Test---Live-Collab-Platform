import { useQuery } from "@tanstack/react-query";
import { fetchLatestCanvas } from "../api/canvas/FetchLatestCanvas";

function useFetchLatestCanvas(canvasId: string) {
  const query = useQuery({
    queryKey: ["canvas", canvasId],
    queryFn: () => fetchLatestCanvas(canvasId),
    enabled: !!canvasId,
    retry: false,
    select: (data) => data.data.data,
  });

  return { ...query, refetch: query.refetch }; // Return refetch function
}

export default useFetchLatestCanvas;
