import { useRecoilValueLoadable } from "recoil";
import Container from "../../components/Container";
import Layout from "../../components/Layout";
import { getService } from "../../store/service";
import DataTable from "react-data-table-component";

export default function Home() {
  const { contents } = useRecoilValueLoadable(getService);
  const columns = [
    {
      name: "NAMA",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "JUMLAH SERVIS",
      selector: (row) => row.data?.length,
      sortable: true,
    },
    {
      name: "AKSI",
      cell: (row) => (
        <button
          className="bg-red-500 text-white rounded hover:bg-blue-300 text-xs p-2 px-3"
          id={row.id}
          onClick={() => {
            alert(row.id);
          }}
        >
          Hapus
        </button>
      ),
    },
  ];
  return (
    <Layout middleware="auth" title="Service">
      <Container>
        <div className="p-3 shadow-md bg-white rounded mb-5">
          <div className="px-3 flex font-semibold items-center justify-between w-full">
            <h1>Daftar Servis</h1>
            <button className="text-sm bg-blue-400 hover:bg-blue-200 p-2 px-2 text-white rounded">
              Tambah Servis
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
