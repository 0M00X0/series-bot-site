
import { getSingleSetting } from "@/components/actions/settings/getSettings";
import Abort from "@/components/errors/Abort";
async function getSetting({ context }: any) {
  const res = await getSingleSetting(context);

  if (res.status === 404) {
    return res;
  }

  if (res.ok) {
    console.log("res.ok");
  }

  const data = await res.json();
  return data;
}

export default async function SingleSettingPage({
  params,
}: {
  params: { settingslug: string };
}) {
  const context = {
    params: params,
  };
  const setting = await getSetting({ context });
  if (setting.status === 404) {
    return <Abort message={`Setting ${params.settingslug} not found`} />;
  }

  return (
    <>
      <h1>{setting.slug}</h1>
      <p>{setting.value}</p>
    </>
  );
}
