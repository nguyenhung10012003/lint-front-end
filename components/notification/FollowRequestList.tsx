export default function FollowRequestList() {
  return (
    <>
      {/* {followRequests.map((request) => (
        <div className="flex gap-4 mt-4" key={request.id}>
          <ProfileAvatar
            src={request.user.avatar}
            alt={request.user.alias}
            profileId={request.user.id}
            variant="link"
            className="self-start w-10 h-10 md:w-10 md:h-10"
          />
          <div className="flex w-full pb-2 border-b justify-between md:flex-row flex-col gap-2">
            <div>
              <ProfileHoverCard user={request.user}></ProfileHoverCard>
              <span className="ml-2 text-gray-600 dark:text-gray-400 text-sm">
                {formatTimeDifference(new Date(request.createdAt))}
              </span>
              <p className="text-sm text-gray-500">{`${request.user.name} has sent you a request`}</p>
            </div>
            <div className="flex gap-2 w-full max-w-[200px]">
              <Button className="text-white flex-1 font-semibold">
                Confirm
              </Button>
              <Button variant={"outline"} className="flex-1 font-semibold">
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))} */}
    </>
  );
}
