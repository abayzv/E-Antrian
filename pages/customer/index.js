import { useRecoilValueLoadable } from "recoil";
import Container from "../../components/Container";
import Layout from "../../components/Layout";
import { getCustomer } from "../../store/customer";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "NAMA",
    cell: (row) => (
      <>
        <img
          class="rounded-full w-6 h-6"
          src="https://www.gravatar.com/avatar/64e1b8d34f425d19e1ee2ea7236d3028?d=mm&amp;s=150"
          alt="Admin"
        ></img>
        <span className="ml-2">{row.name}</span>
      </>
    ),
    selector: "name",
    sortable: true,
  },
  {
    name: "NOMOR HANDPHONE",
    selector: (row) => row.phone,
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

export default function Home() {
  const { contents } = useRecoilValueLoadable(getCustomer);

  return (
    <Layout middleware="auth" title="Customer">
      <Container>
        <div className="p-3 shadow-md bg-white rounded mb-5">
          <div className="px-3 flex font-semibold items-center justify-between w-full">
            <h1>Daftar Customer</h1>
            <button className="text-sm bg-blue-400 hover:bg-blue-200 p-2 px-2 text-white rounded">
              Tambah Customer
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
