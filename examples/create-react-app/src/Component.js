import { useProjectOwner, useProjectMetadataContent } from 'juice-hooks';

const PROJECT_ID = 2;

export default function Component() {
  const { data: cid } = useProjectMetadataContent({
    projectId: PROJECT_ID,
    domain: 0,
  });
  const { data: owner } = useProjectOwner({ projectId: PROJECT_ID });

  return (
    <div>
      <h1>Project {PROJECT_ID}</h1>
      <span>
        Metadata content id: {cid ?? '...'}
        <br />
        project owner: {owner ?? '...'}
      </span>
    </div>
  );
}
