import { Icons } from "../Icons";
import { Input } from "../ui/input";
import InboxList from "./InboxList";

export default function LeftSide({dictionary}: {dictionary: any}) {
  return (
    <div className="flex flex-col border-r gap-4">
      <div className="px-4 pt-4">
        <div className="gap-2 items-center lg:flex border border-neutral-400 px-4 py-2 rounded-full hidden">
          <Input
            placeholder="Search users..."
            className="border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-auto"
          />
          <Icons.search className="h-5 w-5" />
        </div>
      </div>
      <InboxList />
    </div>
  );
}
