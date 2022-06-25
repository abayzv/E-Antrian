import { useRecoilValueLoadable } from "recoil";
import Container from "../../components/Container";
import Layout from "../../components/Layout";
import { getVehicle } from "../../store/vehicle";
import DataTable from "react-data-table-component";

export default function Home() {
  const { contents } = useRecoilValueLoadable(getVehicle);

  const columns = [
    {
      name: "NAMA",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "TAHUN",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "AKSI",
      cell: (row) => (
        <button
          className="bg-blue-100 hover:bg-blue-300 text-xs p-2 px-3"
          id={row.id}
          onClick={() => {
            alert(row.id);
          }}
        >
          Lihat
        </button>
      ),
    },
  ];

  return (
    <Layout middleware="auth" title="Kendaraan">
      <Container>
        <div className="p-3 shadow-md bg-white rounded mb-5">
          <div className="px-3 flex font-semibold items-center justify-between w-full">
            <h1>Daftar Kendaraan</h1>
            <button className="text-sm bg-blue-400 hover:bg-blue-200 p-2 px-2 text-white rounded">
              Tambah Kendaraan
            </button>
          </div>
        </div>
        <div className="bg-white shadow-md p-2 rounded">
          <DataTable columns={columns} data={contents} />
        </div>
      </Container>
    </Layout>
  );
}
