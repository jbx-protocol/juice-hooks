import React, { useContext } from "react";

import { getJBProjects } from "juice-sdk";
import { JuiceContext } from "../contexts/JuiceContext";

export default function useProjectOwner({ projectId }: { projectId: string }) {
  const { provider } = useContext(JuiceContext);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>();
  const [error, setError] = React.useState<any>();

  async function getOwner(projectId: string) {
    const owner = await getJBProjects(provider).ownerOf(projectId);
    return owner;
  }

  React.useEffect(() => {
    setLoading(true);

    getOwner(projectId)
      .then((owner) => {
        setLoading(false);
        setData(owner);
      })
      .catch((e) => {
        setError(e);
      });
  }, []);

  return { loading, data, error };
}
