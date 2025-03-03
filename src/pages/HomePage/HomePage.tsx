import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPowerOff,
  faChartLine,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { homeManagementPaths } from "src/constants/path";

const HomePage = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-100 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-[#00B4D8]">Smart Home System</h1>
        <p className="text-gray-600 mt-2">
          Manage home energy usage smartly and efficiently.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="p-6 shadow-lg bg-white rounded-2xl flex flex-col items-center">
          <FontAwesomeIcon
            icon={faPowerOff}
            className="text-[#00B4D8] text-5xl mb-4"
          />
          <h2 className="text-xl font-semibold">Energy Saving</h2>
          <p className="text-gray-500 text-center mt-2">
            Monitor and control devices to optimize energy consumption.
          </p>
        </div>

        <div className="p-6 shadow-lg bg-white rounded-2xl flex flex-col items-center">
          <FontAwesomeIcon
            icon={faChartLine}
            className="text-[#00B4D8] text-5xl mb-4"
          />
          <h2 className="text-xl font-semibold">Consumption Analysis</h2>
          <p className="text-gray-500 text-center mt-2">
            Track energy usage data in real-time.
          </p>
        </div>

        <div className="p-6 shadow-lg bg-white rounded-2xl flex flex-col items-center">
          <FontAwesomeIcon
            icon={faSlidersH}
            className="text-[#00B4D8] text-5xl mb-4"
          />
          <h2 className="text-xl font-semibold">Smart Customization</h2>
          <p className="text-gray-500 text-center mt-2">
            Set up automation rules to suit your needs.
          </p>
        </div>
      </div>

      <Link
        to={homeManagementPaths.homes}
        className="mt-10 bg-[#00B4D8] text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-[#0090A8] transition"
      >
        Explore Now
      </Link>
    </div>
  );
};

export default HomePage;
