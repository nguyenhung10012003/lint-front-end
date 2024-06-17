import {getDictionary} from "@/app/[lang]/dictionaries";

export default async function Welcome({params}: {
  params: {
    lang: string
  },
}) {
  const {welcome} = await getDictionary(params.lang);
  return (
    <>Welcome page</>
  )
}