import FollowRequestList from "@/components/notification/FollowRequestList";
import NotificationList from "@/components/notification/NotificationList";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Notification({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  const tabs = [
    {
      label: "Notification",
      id: "notification",
      content: <NotificationList />,
    },
    {
      label: "Follow Request",
      id: "follow-request",
      content: <FollowRequestList />,
    },
  ];
  return (
    <Card className="p-0 w-full max-w-[550px] mt-2">
      <CardContent className="w-full justify-center flex pt-4 rounded-lg">
        <Tabs defaultValue={tabs[0].id} className="w-full">
          <TabsList className="flex w-full h-auto rounded-lg">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="w-full flex text-md font-semibold"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent
              key={tab.id}
              value={tab.id}
              className="mt-4 min-h-[80vh]"
            >
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
