const router = require("express").Router();

const {
  createItemController,
  searchItemsController,
  getItemController,
  deleteItemController,
  updateItemController,
} = require("../controllers/itemsController");

//Create item || METHOD POST
router.post("/", createItemController);
//Search items || METHOD GET
router.get("/", searchItemsController);
//Get item || METHOD GET
router.get("/:itemId", getItemController);
//Delete item || METHOD DELETE
router.delete("/:itemId", deleteItemController);
//Update item || METHOD PUT
router.put("/:itemId", updateItemController);

module.exports = router;
