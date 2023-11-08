import NoItems from "../noItems/NoItems";
import PropertyCard from "../propertyCard/PropertyCard";
import { Grid } from "@mui/material";

const PropertiesList = ({
  searchPropertiesResults,
  fetchAgainProperties,
  setFetchAgainProperties,
}) => {
  return (
    <>
      {searchPropertiesResults.length === 0 && (
        <div
          className="noItemsContainer"
          style={{
            margin: "auto",
          }}
        >
          <NoItems type="Properties" />
        </div>
      )}
      <Grid container spacing={2}>
        {searchPropertiesResults.map((property, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <PropertyCard
              property={property}
              fetchAgainProperties={fetchAgainProperties}
              setFetchAgainProperties={setFetchAgainProperties}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PropertiesList;
