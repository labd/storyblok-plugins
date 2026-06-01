import { ReactNode } from "react";
import { useInstantSearch } from "react-instantsearch";

type Props = {
  children: ReactNode;
  fallback: ReactNode;
};

export const NoResultsBoundary = ({ children, fallback }: Props) => {
  const { results } = useInstantSearch();

  if (!results.__isArtificial && results.nbHits === 0) {
    return <>{fallback}</>
  };

  return <>{children}</>;
};