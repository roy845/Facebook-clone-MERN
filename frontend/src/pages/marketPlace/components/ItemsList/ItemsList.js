import NoItems from "../noItems/NoItems";
import { Grid } from "@mui/material";
import ItemCard from "../itemCard/ItemCard";

const ItemsList = ({ searchItemsResults, fetchAgain, setFetchAgain }) => {
  return (
    <>
      {searchItemsResults.length === 0 && (
        <div
          className="noItemsContainer"
          style={{
            margin: "auto",
          }}
        >
          <NoItems type="Items" />
        </div>
      )}
      <Grid container spacing={2}>
        {searchItemsResults.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ItemCard
              item={item}
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ItemsList;
