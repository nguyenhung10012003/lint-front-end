import {
  ArrowTopRightOnSquareIcon as ArrowTopRightOnSquareIconOutline,
  BellIcon as BellIconOutline,
  BellSlashIcon as BellSlashIconOutline,
  BookmarkIcon as BookmarkIconOutline,
  ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconOutline,
  ExclamationCircleIcon as ExclamationCircleIconOutline,
  EyeSlashIcon as EyeSlashIconOutline,
  FaceSmileIcon as FaceSmileIconOutline,
  GifIcon as GifIconOutline,
  GlobeAsiaAustraliaIcon as GlobeAsiaAustraliaIconOutline,
  HashtagIcon as HashtagIconOutline,
  HeartIcon as HeartIconOutline,
  HomeIcon as HomeIconOutline,
  LockClosedIcon as LockClosedIconOutline,
  MagnifyingGlassIcon as MagnifyingGlassIconOutline,
  MicrophoneIcon as MicrophoneIconOutline,
  MusicalNoteIcon as MusicalNoteIconOutline,
  NoSymbolIcon as NoSymbolIconOutline,
  PaperAirplaneIcon as PaperAirplaneIconOutline,
  PencilIcon as PencilIconOutline,
  PencilSquareIcon as PencilSquareIconOutline,
  PhotoIcon as PhotoIconOutline,
  PlusCircleIcon as PlusCircleIconOutline,
  ShareIcon as ShareIconOutline,
  TagIcon as TagIconOutline,
  TrashIcon as TrashIconOutline,
  UserIcon as UserIconOutline,
  VideoCameraIcon as VideoCameraIconOutline,
} from "@heroicons/react/24/outline";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
  BellIcon,
  BellSlashIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  ExclamationCircleIcon,
  EyeSlashIcon,
  FaceSmileIcon,
  GifIcon,
  GlobeAsiaAustraliaIcon,
  HashtagIcon,
  HeartIcon,
  HomeIcon,
  LockClosedIcon,
  MicrophoneIcon,
  MusicalNoteIcon,
  NoSymbolIcon,
  PaperAirplaneIcon,
  PencilIcon,
  PencilSquareIcon,
  PhotoIcon,
  PlusCircleIcon,
  ShareIcon,
  TagIcon,
  TrashIcon,
  UserIcon,
  VideoCameraIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import {
  CircleHelp,
  LogOut,
  Menu,
  MessageSquareWarning,
  Reply,
  Settings,
} from "lucide-react";

type IconProps = React.HTMLAttributes<SVGElement> & {
  variant?: "outline" | "solid";
};
export const Icons = {
  google: (props: IconProps) => (
    <svg viewBox="0 0 128 128" {...props}>
      <path
        fill="#fff"
        d="M44.59 4.21a63.28 63.28 0 004.33 120.9 67.6 67.6 0 0032.36.35 57.13 57.13 0 0025.9-13.46 57.44 57.44 0 0016-26.26 74.33 74.33 0 001.61-33.58H65.27v24.69h34.47a29.72 29.72 0 01-12.66 19.52 36.16 36.16 0 01-13.93 5.5 41.29 41.29 0 01-15.1 0A37.16 37.16 0 0144 95.74a39.3 39.3 0 01-14.5-19.42 38.31 38.31 0 010-24.63 39.25 39.25 0 019.18-14.91A37.17 37.17 0 0176.13 27a34.28 34.28 0 0113.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0087.2 4.59a64 64 0 00-42.61-.38z"
      ></path>
      <path
        fill="#e33629"
        d="M44.59 4.21a64 64 0 0142.61.37 61.22 61.22 0 0120.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 00-13.64-8 37.17 37.17 0 00-37.46 9.74 39.25 39.25 0 00-9.18 14.91L8.76 35.6A63.53 63.53 0 0144.59 4.21z"
      ></path>
      <path
        fill="#f8bd00"
        d="M3.26 51.5a62.93 62.93 0 015.5-15.9l20.73 16.09a38.31 38.31 0 000 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 01-5.5-40.9z"
      ></path>
      <path
        fill="#587dbd"
        d="M65.27 52.15h59.52a74.33 74.33 0 01-1.61 33.58 57.44 57.44 0 01-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0012.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z"
      ></path>
      <path
        fill="#319f43"
        d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0044 95.74a37.16 37.16 0 0014.08 6.08 41.29 41.29 0 0015.1 0 36.16 36.16 0 0013.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 01-25.9 13.47 67.6 67.6 0 01-32.36-.35 63 63 0 01-23-11.59A63.73 63.73 0 018.75 92.4z"
      ></path>
    </svg>
  ),

  facebook: (props: IconProps) => (
    <svg viewBox="0 0 128 128" {...props}>
      <rect
        fill="#3d5a98"
        x="4.83"
        y="4.83"
        width="118.35"
        height="118.35"
        rx="6.53"
        ry="6.53"
      ></rect>
      <path
        fill="#fff"
        d="M86.48 123.17V77.34h15.38l2.3-17.86H86.48v-11.4c0-5.17 1.44-8.7 8.85-8.7h9.46v-16A126.56 126.56 0 0091 22.7c-13.62 0-23 8.3-23 23.61v13.17H52.62v17.86H68v45.83z"
      ></path>
    </svg>
  ),

  home: (props: IconProps) =>
    props.variant === "solid" ? (
      <HomeIcon {...props} />
    ) : (
      <HomeIconOutline {...props} />
    ),

  message: (props: IconProps) =>
    props.variant === "solid" ? (
      <ChatBubbleOvalLeftIcon {...props} />
    ) : (
      <ChatBubbleOvalLeftIconOutline {...props} />
    ),

  search: (props: IconProps) =>
    props.variant === "solid" ? (
      <MagnifyingGlassIconOutline strokeWidth={2.5} {...props} />
    ) : (
      <MagnifyingGlassIconOutline {...props} />
    ),

  notification: (props: IconProps) =>
    props.variant === "solid" ? (
      <BellIcon {...props} />
    ) : (
      <BellIconOutline {...props} />
    ),

  menu: (props: IconProps) => <Menu {...props} />,

  setting: (props: IconProps) => <Settings {...props} />,

  profile: (props: IconProps) =>
    props.variant === "solid" ? (
      <UserIcon {...props} />
    ) : (
      <UserIconOutline {...props} />
    ),

  logout: (props: IconProps) => <LogOut {...props} />,

  reportIssue: (props: IconProps) => <MessageSquareWarning {...props} />,

  help: (props: IconProps) => <CircleHelp {...props} />,

  more: (props: IconProps) => <EllipsisHorizontalIcon {...props} />,

  heart: (props: IconProps) =>
    props.variant === "solid" ? (
      <HeartIcon {...props} />
    ) : (
      <HeartIconOutline {...props} />
    ),

  save: (props: IconProps) =>
    props.variant === "solid" ? (
      <BookmarkIcon {...props} />
    ) : (
      <BookmarkIconOutline {...props} />
    ),

  report: (props: IconProps) =>
    props.variant === "solid" ? (
      <ExclamationCircleIcon {...props} />
    ) : (
      <ExclamationCircleIconOutline {...props} />
    ),

  hide: (props: IconProps) =>
    props.variant === "solid" ? (
      <EyeSlashIcon {...props} />
    ) : (
      <EyeSlashIconOutline {...props} />
    ),

  turnOffNotification: (props: IconProps) =>
    props.variant === "solid" ? (
      <BellSlashIcon {...props} />
    ) : (
      <BellSlashIconOutline {...props} />
    ),

  share: (props: IconProps) =>
    props.variant === "solid" ? (
      <ShareIcon {...props} />
    ) : (
      <ShareIconOutline {...props} />
    ),

  create: (props: IconProps) =>
    props.variant === "solid" ? (
      <PencilSquareIcon {...props} />
    ) : (
      <PencilSquareIconOutline {...props} />
    ),

  music: (props: IconProps) =>
    props.variant === "solid" ? (
      <MusicalNoteIcon {...props} />
    ) : (
      <MusicalNoteIconOutline {...props} />
    ),

  tag: (props: IconProps) =>
    props.variant === "solid" ? (
      <TagIcon {...props} />
    ) : (
      <TagIconOutline {...props} />
    ),

  hashTag: (props: IconProps) =>
    props.variant === "solid" ? (
      <HashtagIcon {...props} />
    ) : (
      <HashtagIconOutline {...props} />
    ),

  gif: (props: IconProps) =>
    props.variant === "solid" ? (
      <GifIcon {...props} />
    ) : (
      <GifIconOutline {...props} />
    ),

  image: (props: IconProps) =>
    props.variant === "solid" ? (
      <PhotoIcon {...props} />
    ) : (
      <PhotoIconOutline {...props} />
    ),

  video: (props: IconProps) =>
    props.variant === "solid" ? (
      <VideoCameraIcon {...props} />
    ) : (
      <VideoCameraIconOutline {...props} />
    ),

  send: (props: IconProps) =>
    props.variant === "solid" ? (
      <PaperAirplaneIcon {...props} />
    ) : (
      <PaperAirplaneIconOutline {...props} />
    ),

  chevronLeft: (props: IconProps) => <ChevronLeftIcon {...props} />,
  chevronRight: (props: IconProps) => <ChevronRightIcon {...props} />,
  close: (props: IconProps) => <XMarkIcon {...props} />,

  emoji: (props: IconProps) =>
    props.variant === "solid" ? (
      <FaceSmileIcon {...props} />
    ) : (
      <FaceSmileIconOutline {...props} />
    ),

  lock: (props: IconProps) =>
    props.variant === "solid" ? (
      <LockClosedIcon {...props} />
    ) : (
      <LockClosedIconOutline {...props} />
    ),

  block: (props: IconProps) =>
    props.variant === "solid" ? (
      <NoSymbolIcon {...props} />
    ) : (
      <NoSymbolIconOutline {...props} />
    ),

  popup: (props: IconProps) =>
    props.variant === "solid" ? (
      <ArrowTopRightOnSquareIcon {...props} />
    ) : (
      <ArrowTopRightOnSquareIconOutline {...props} />
    ),

  arrowRight: (props: IconProps) => <ArrowRightIcon {...props} />,
  arrowLeft: (props: IconProps) => <ArrowLeftIcon {...props} />,

  edit: (props: IconProps) =>
    props.variant === "solid" ? (
      <PencilIcon {...props} />
    ) : (
      <PencilIconOutline {...props} />
    ),

  delete: (props: IconProps) =>
    props.variant === "solid" ? (
      <TrashIcon {...props} />
    ) : (
      <TrashIconOutline {...props} />
    ),

  global: (props: IconProps) =>
    props.variant === "solid" ? (
      <GlobeAsiaAustraliaIcon {...props} />
    ) : (
      <GlobeAsiaAustraliaIconOutline {...props} />
    ),

  reply: (props: IconProps) => <Reply {...props} />,

  plusCircle: (props: IconProps) =>
    props.variant === "solid" ? (
      <PlusCircleIcon {...props} />
    ) : (
      <PlusCircleIconOutline {...props} />
    ),

  microphone: (props: IconProps) =>
    props.variant === "solid" ? (
      <MicrophoneIcon {...props} />
    ) : (
      <MicrophoneIconOutline {...props} />
    ),
};
