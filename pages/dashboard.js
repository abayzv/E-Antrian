import Container from "../components/Container";
import Layout from "../components/Layout";
import { BiTimer, BiUser } from "react-icons/bi";
import { BsTools, BsReceipt } from "react-icons/bs";
import CardWidget from "../components/CardWidget";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Dashboard() {
  const chartData = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  };

  return (
    <Layout middleware="auth" title="Dashboard">
      <Container>
        <div className="flex flex-wrap">
          <div className="w-1/4 p-2">
            <CardWidget title="Antrian Hari Ini" count="0">
              <BiTimer size={55} />
            </CardWidget>
          </div>
          <div className="w-1/4 p-2">
            <CardWidget title="Total Customer" count="52">
              <BiUser size={50} />
            </CardWidget>
          </div>
          <div className="w-1/4 p-2">
            <CardWidget title="Mekanik Ready" count="5">
              <BsTools size={40} />
            </CardWidget>
          </div>
          <div className="w-1/4 p-2">
            <CardWidget title="Total Transaksi" count="41">
              <BsReceipt size={40} />
            </CardWidget>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-4/6 p-2">
            <div className="bg-white shadow-md w-full h-72 rounded p-5">
              <div className="text-gray-500">Data Transaksi Bulan Ini</div>
              <Chart
                options={chartData.options}
                series={chartData.series}
                height="90%"
                type="bar"
              />
            </div>
          </div>
          <div className="w-2/6 p-2">
            <div className="bg-white shadow-md w-full h-72 p-5 rounded">
              <div className="text-gray-500 mb-4">Transaksi Terakhir</div>
              <hr />
              <div className="flex justify-between items-center py-4">
                <div className="text-gray-500 font-bold text-sm">
                  Vixion 2016
                </div>
                <div className="text-red-300 font-semibold text-sm">
                  Ganti Oli
                </div>
              </div>
              <hr />
              <div className="flex justify-between items-center py-4">
                <div className="text-gray-500 font-bold text-sm">
                  Vario 2014
                </div>
                <div className="text-red-300 font-semibold text-sm">
                  Servis Ringan
                </div>
              </div>
              <hr />
              <div className="flex justify-between items-center py-4">
                <div className="text-gray-500 font-bold text-sm">
                  Beat Street
                </div>
                <div className="text-red-300 font-semibold text-sm">
                  Ganti Cakram
                </div>
              </div>
              <hr />
              <div className="flex justify-between items-center py-4">
                <div className="text-gray-500 font-bold text-sm">CBR 2021</div>
                <div className="text-red-300 font-semibold text-sm">
                  Ganti Motor
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
