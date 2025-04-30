import { DataTable } from "@/components/data-table";
import { listBookings } from "@/http/apis/booking/list-bookings";
import { columns } from "./_components/columns";

export default async function page() {
  const data = await listBookings();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>
      <DataTable data={data} columns={columns} />
    </div>
  );
}

