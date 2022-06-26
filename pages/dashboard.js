import Container from "../components/Container";
import Layout from "../components/Layout";
import { BiTimer, BiUser } from "react-icons/bi";
import { BsTools, BsReceipt } from "react-icons/bs";
import CardWidget from "../components/CardWidget";
import dynamic from "next/dynamic";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Dashboard() {
  const [dataAdmin, setDataAdmin] = useState([]);

  const getDataAdmin = async () => {
    const response = await axios.get("/api/admin");
    if (response) {
      setDataAdmin(response.data);
      console.log(dataAdmin);
    }
  };

  const addChartDataToSeries = () => {
    const data = [];
    for (let i = 0; i <= 30; i++) {
      dataAdmin?.chart?.map((item) => {
        if (!data[i]) {
          if (i == item.date) {
            // return item.views;
            data[i] = item.views;
          } else {
            data[i] = 0;
          }
        }
      });
    }
    return data;
  };

  const isReady = (id) => {
    const curentMecha = dataAdmin?.mechanic?.filter((item) => {
      const result = item.id == id && item;
      return result.data;
    });
    let numberOfProcess = 0;
    const ready = curentMecha?.filter((item2) => {
      const process = item2.data.map((item3) => {
        if (item3.status == "process") {
          numberOfProcess = numberOfProcess + 1;
        }
      });
    });
    if (numberOfProcess > 0) {
      return false;
    } else {
      return true;
    }
  };

  const mechanicReady = () => {
    let ready = 0;
    dataAdmin?.mechanic?.map((item) => {
      if (isReady(item.id)) {
        ready = ready + 1;
      }
    });

    return ready;
  };

  const chartData = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: addChartDataToSeries().map((item, key) => {
          return key;
        }),
      },
    },
    series: [
      {
        name: "series-1",
        data: addChartDataToSeries().map((item, key) => {
          return item;
        }),
      },
    ],
  };

  useEffect(() => {
    getDataAdmin();
  }, []);

  return (
    <Layout middleware="auth" title="Dashboard">
      <Container>
        <div className="flex flex-wrap">
          <div className="w-1/4 p-2">
            <CardWidget title="Antrian Hari Ini" count={dataAdmin?.queue_today}>
              <BiTimer size={55} />
            </CardWidget>
          </div>
          <div className="w-1/4 p-2">
            <CardWidget
              title="Total Customer"
              count={dataAdmin?.total_customer}
            >
              <BiUser size={50} />
            </CardWidget>
          </div>
          <div className="w-1/4 p-2">
            <CardWidget title="Mekanik Ready" count={mechanicReady()}>
              <BsTools size={40} />
            </CardWidget>
          </div>
          <div className="w-1/4 p-2">
            <CardWidget title="Total Servis" count={dataAdmin?.total_queue}>
              <BsReceipt size={40} />
            </CardWidget>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-4/6 p-2">
            <div className="bg-white shadow-md w-full h-72 rounded p-5">
              <div className="text-gray-500">Data Pelanggan Bulan Ini</div>
              {Object.keys(dataAdmin).length > 0 && (
                <Chart
                  options={chartData.options}
                  series={chartData.series}
                  height="90%"
                  type="bar"
                />
              )}
            </div>
          </div>
          <div className="w-2/6 p-2">
            <div className="bg-white shadow-md w-full h-72 p-5 rounded">
              <div className="text-gray-500 mb-4">Servis Terakhir</div>
              {dataAdmin?.last_servis?.map((item) => (
                <>
                  <hr />
                  <div className="flex justify-between items-center py-4">
                    <div className="text-gray-500 font-bold text-sm">
                      {item.vehicle.name}
                    </div>
                    <div className="text-red-300 font-semibold text-sm">
                      {item.service_type.name}
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
