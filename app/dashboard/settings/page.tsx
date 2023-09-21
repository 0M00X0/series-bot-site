import { getAllSettings } from "@/components/actions/settings/getSettings";
import Abort from "@/components/errors/Abort";
async function getSetting() {
  const res = await getAllSettings();

  if (res.status === 404) {
    return res;
  }

  if (res.ok) {
    console.log("res.ok");
  }

  const data = await res.json();
  return data;
}

export default async function SingleSettingPage() {
  const settings = await getSetting();
  console.log("settings", settings);

  return (
    <>
      {settings.map((setting: any) => (
        <div key={setting.id}>
          <h1>{setting.slug}</h1>
          <p>{setting.value}</p>
          <br />
        </div>
      ))}
    </>
  );
}
