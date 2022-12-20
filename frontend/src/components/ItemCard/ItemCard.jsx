import React, { useContext, useState } from "react";
import "./ItemCard.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { imgsBucketUrl } from "../../Lib/config";
import { authContext } from "../../context/authContext";
import { toastContext } from "../../context/toastContext";
import { CurrencyContext } from "../../context/currencyContext";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { updateProductAmountInCartService } from "../../services/itemsApiCalls";

export default function ItemCard(props) {
  const { isUser, user } = useContext(authContext);
  const { openToast } = useContext(toastContext);
  const { currPrice } = useContext(CurrencyContext);
  const [editMode, setEditMode] = useState(false);
  const [editedAmount, setEditedAmount] = useState(props.data.quantity);

  const edit = async (currAmount) => {
    setEditMode(!editMode);
    if (!editMode) return;
    try {
      await updateProductAmountInCartService(
        user._id,
        props.data._id,
        editedAmount,
        props.setItems
      );
      openToast("Amount updated successfully");
    } catch (err) {
      openToast(err.message);
    }
  };

  return (
    <Card
      sx={{ display: "flex", justifyContent: "space-around" }}
      elevation={10}
      className="petCard"
    >
      <CardMedia
        component="img"
        height="180"
        className="imageCon"
        image={imgsBucketUrl + props.data.img}
        alt="item image"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.data.title}
          </Typography>
          {props.showStatus && (
            <Typography gutterBottom variant="h6" component="div">
              {currPrice(props.data.price)}
            </Typography>
          )}
          {props.showStatus && props.amountEditable && (
            <div className="amountCon">
              <Typography gutterBottom variant="h6" component="div">
                amount:
              </Typography>
              {editMode ? (
                <TextField
                  type="number"
                  value={editedAmount}
                  onChange={(e) => setEditedAmount(e.target.value)}
                />
              ) : (
                <Typography gutterBottom variant="h6" component="span">
                  {editedAmount}
                </Typography>
              )}
            </div>
          )}
        </CardContent>
        <CardActions>
          {isUser && props.showStatus && (
            <>
              {props.amountEditable && (
                <Button
                  onClick={() => edit(props.data.quantity)}
                  className="adpBtn"
                  variant="outlined"
                  size="small"
                >
                  {editMode ? "Save" : "Edit"}
                </Button>
              )}

              <Button
                onClick={() =>
                  props.itemPositionChangeCallback(
                    props.isAddable ? editedAmount : props.data._id
                  )
                }
                className="adpBtn"
                variant="outlined"
                size="small"
              >
                {props.isAddable ? "Add to cart" : "Remove"}
              </Button>
            </>
          )}

          <Button
            onClick={() => props.redirectCallback(props.data._id)}
            className="linkSeeMoreBtn"
            variant="text"
            size="small"
          >
            See more
          </Button>

          {props.anotherButton}
        </CardActions>
      </Box>
    </Card>
  );
}
