import { HomeModel } from "../../types/home/home.type";
import HM_HomeCard from "./_children/HM_HomeCard";

const homeMockData: HomeModel[] = [
  {
    id: "1",
    name: "Home 1",
    addressLine: "974/32 Dong Khoi",
    city: "Bien Hoa",
    state: "Dong Nai",
    country: "Vietnam",
    imgUrl: "",
  },
  {
    id: "2",
    name: "Home 2",
    addressLine: "1073/4 Nguyen Ai Quoc",
    city: "Bien Hoa",
    state: "Dong Nai",
    country: "Vietnam",
    imgUrl: "",
  },
  {
    id: "3",
    name: "Apartment 1504",
    addressLine: "BCONS Bee",
    city: "Di An",
    state: "Binh Duong",
    country: "Vietnam",
    imgUrl: "",
  },
];

export default function HomeManagement() {
  return (
    <div className="container">
      <div className="w-full flex flex-col gap-6 p-8 text">
        <h2 className="font-semibold">Your homes</h2>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
          {homeMockData.map((home) => (
            <HM_HomeCard key={home.id} home={home} />
          ))}
        </div>
      </div>
    </div>
  );
}
