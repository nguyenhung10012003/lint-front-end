import { getDictionary } from "@/app/dictionaries";
import FollowRequestList from "@/components/notification/FollowRequestList";
import NotificationList from "@/components/notification/NotificationList";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Notification({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  const dictionary = await getDictionary(params.lang);
  const tabs = [
    {
      label: dictionary.notification.tab.notification,
      id: "notification",
      content: <NotificationList />,
    },
    {
      label: dictionary.notification.tab.followRequest,
      id: "follow-request",
      content: <FollowRequestList />,
    },
  ];
  return (
    <div className="p-4 sm:p-8 flex w-full justify-center">
      <Card className="w-full max-w-[550px] mt-2">
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
                className="mt-4 sm:min-h-[75vh] min-h-[70vh]"
              >
                {tab.content}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
