"use client";
import {Icons} from "./Icons";
import {Button} from "./ui/button";
import UserListModal from "./user/UserListModal";

export default function BlacklistModal() {
  const blacklist: any[] = [];
  return (
    <UserListModal
      trigger={
        <div className="text-md flex items-center w-full text-lg cursor-pointer">
          <Icons.block className="w-6 h-6 mr-2"/>
          <span className="w-full">Black list</span>
          <Icons.popup className="w-6 h-6 self-end"/>
        </div>
      }
      triggerAschild={true}
      title="Blacklist"
      items={blacklist}
      actionBtn={
        <Button className="rounded-xl" variant="secondary">
          Remove
        </Button>
      }
    />
  );
}
