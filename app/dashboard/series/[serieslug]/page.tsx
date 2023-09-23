import ViewPage from "@/components/roles/View";
import Layout from "@/components/layouts/Layout";
import ViewSeriesForm from "@/components/dashboard/series/ViewSeriesForm";
import { getSingleSeries } from "@/components/actions/Series";
import Abort from "@/components/errors/Abort";
async function getSeries({ context }: any) {
  const res = await getSingleSeries(context);

  if (res.status === 404) {
    return res;
  } 
  const data = await res.json();
  return data;
}

export default async function ViewSeries({
  params,
}: {
  params: { serieslug: string };
}) {
  const context = {
    params: params,
  };
  const series = await getSeries({ context });
  if (series.status === 404) {
    return <Abort message={`Series ${params.serieslug} not found`} />;
  }
  const RolesView = process.env.ROLES_PUBLISHER;
  return (
    <>
      <ViewPage RolesView={RolesView}>
        <Layout classSidebar="grid">
          <ViewSeriesForm seriesdata={series} />
        </Layout>
      </ViewPage>
    </>
  );
}
