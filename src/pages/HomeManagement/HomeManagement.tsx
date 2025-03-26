import EstateServices from "src/services/estates.service";
import HM_HomeCard from "./_children/HM_HomeCard";

export default function HomeManagement() {
  // ! get houses
  const { data: estateData } = EstateServices.queries.useListEstatesOfUser();

  const estateList = estateData?.data || [];

  return (
    <div className="container">
      <div className="w-full flex flex-col gap-6 p-8 text">
        <h2 className="font-semibold">Your homes</h2>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
          {estateList.map((estate) => (
            <HM_HomeCard key={estate.id} estate={estate} />
          ))}
        </div>
      </div>
    </div>
  );
}
