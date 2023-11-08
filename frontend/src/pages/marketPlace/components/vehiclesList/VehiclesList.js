import NoItems from "../noItems/NoItems";
import { Grid } from "@mui/material";
import VehicleCard from "../vehicleCard/VehicleCard";

const VehiclesList = ({
  searchVehiclesResults,
  fetchAgainVehicles,
  setFetchAgainVehicles,
}) => {
  return (
    <>
      {searchVehiclesResults.length === 0 && (
        <div
          className="noItemsContainer"
          style={{
            margin: "auto",
          }}
        >
          <NoItems type="Vehicles" />
        </div>
      )}

      <Grid container spacing={2}>
        {searchVehiclesResults.map((vehicle, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <VehicleCard
              vehicle={vehicle}
              fetchAgainVehicles={fetchAgainVehicles}
              setFetchAgainVehicles={setFetchAgainVehicles}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default VehiclesList;
