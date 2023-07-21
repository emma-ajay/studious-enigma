import { Link } from "react-router-dom";

export interface IDraft {
  draftId: number;
  userId: number;
  content: string;
  lastModifiedDate: string;
  createdBy: string;
}

type Props = {
  number: number;
  draft: IDraft;
};

export const Draft = ({ number, draft }: Props) => {
  return (
    <div className="bg-gray-500 mt-3">
      <Link to={`/edit/${draft.draftId}`}>
        Draft {number} ({draft.lastModifiedDate})
      </Link>
    </div>
  );
};
