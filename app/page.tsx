import Map from "./components/Map";
import { ReportDialog } from "./components/report-dialog";

export default function Page() {
  return (
    <main>
      <div className="relative">
        <Map longitude={-73.6921033} latitude={3.9147878} zoom={12} />
        <ReportDialog />
      </div>
    </main>
  );
}
