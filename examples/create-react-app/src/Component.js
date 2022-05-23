import { useProjectOwner, useProjectMetadataContent } from "juice-hooks";

export default function Component() {
  const { data: owner } = useProjectOwner({ projectId: "2" });
  const { data: cid } = useProjectMetadataContent({ projectId: "2" });

  return (
    <span>
      {cid}
      <br />
      {owner}
    </span>
  );
}
