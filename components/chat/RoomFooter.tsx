import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Icons } from "../Icons";
import { AutoResizeTextarea } from "../ui/auto-resize-textarea";
import { Input } from "../ui/input";

export default function RoomFooter() {
  return (
    <div className="flex items-center space-x-2 p-2 rounded-lg">
      <div className="flex space-x-2">
        <Label className="p-1.5 hover:cursor-pointer hover:bg-accent rounded-full">
          <Icons.plusCircle className="w-6 h-6" variant="solid" />
          <Input type="file" className="hidden" />
        </Label>
        <Label className="p-1.5 hover:cursor-pointer hover:bg-accent rounded-full">
          <Icons.image className="w-6 h-6" variant="solid" />
          <Input type="file" className="hidden" />
        </Label>
        <Label className="p-1.5 hover:cursor-pointer hover:bg-accent rounded-full">
          <Icons.microphone className="w-6 h-6" variant="solid" />
          <Input type="file" className="hidden" />
        </Label>
      </div>
      <AutoResizeTextarea rows={1} className="rounded-2xl w-full" />
      <div className="flex">
        <Button variant="ghost" size="icon">
          <SmileIcon className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <ThumbsUpIcon className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}

function SmileIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}

function ThumbsUpIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}
