import React, { useContext } from "react";

import { getJBProjects } from "juice-sdk";
import { JuiceContext } from "../contexts/JuiceContext";

export default function useProjectMetadataContent({
  projectId,
}: {
  projectId: string;
}) {
  const { provider } = useContext(JuiceContext);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>();
  const [error, setError] = React.useState<any>();

  async function getMetadataContent(projectId: string) {
    const owner = await getJBProjects(provider).metadataContentOf(
      projectId,
      "0"
    );
    return owner;
  }

  React.useEffect(() => {
    setLoading(true);

    getMetadataContent(projectId)
      .then((cid) => {
        setLoading(false);
        setData(cid);
      })
      .catch((e) => {
        setError(e);
      });
  }, []);

  return { loading, data, error };
}
