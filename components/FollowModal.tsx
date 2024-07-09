"use client";
import follows from "@/mocks/follow.json";
import { Button } from "./ui/button";

import UserListModal from "./UserListModal";

export function FollowersModal({ includeAction }: { includeAction?: boolean }) {
  return (
    <UserListModal
      trigger="0 Followings"
      title="Followers"
      items={follows}
      actionBtn={
        <Button className="rounded-xl" variant="secondary">
          Delete
        </Button>
      }
      includeAction={includeAction}
    />
  );
}

export function FollowingsModal({
  includeAction,
}: {
  includeAction?: boolean;
}) {
  return (
    <UserListModal
      trigger="0 Followings"
      title="Followings"
      items={follows}
      actionBtn={
        <Button className="rounded-xl" variant="secondary">
          Unfollow
        </Button>
      }
      includeAction={includeAction}
    />
  );
}
