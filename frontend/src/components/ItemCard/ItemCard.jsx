import React, { useContext, useState } from "react";
import "./ItemCard.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { imagesBaseUrl } from "../../Lib/config";
import { adoptPetService } from "../../services/petsApiCalls";
import { authContext } from "../../context/authContext";
import { toastContext } from "../../context/toastContext";
import { CurrencyContext } from "../../context/currencyContext";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";

export default function ItemCard(props) {
  const { isUser } = useContext(authContext);
  const { openToast } = useContext(toastContext);
  const {currPrice} = useContext(CurrencyContext);
  const [editMode, setEditMode] = useState(false);
  const [editedAmount, setEditedAmount] = useState(0);
  const navigate = useNavigate();
  const remove = async () => {
    try {
      await adoptPetService(props.data._id, true, (s) => console.log(s));
      openToast("Pet adopted", "success");
      navigate("/search/" + props.data._id);
    } catch (error) {
      openToast(error.message, "error");
    }
  };

  const edit =async (currAmount) => {
   setEditMode(!editMode);
   setEditedAmount(currAmount);
  };
  return (
    <Card  sx={{ display: 'flex', justifyContent: 'space-around' }} elevation={10} className="petCard">
      <CardMedia
        component="img"
        height="180"
        className="imageCon"
        src= {props.data.pic}
        alt="pet image"
      />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.data.name}
        </Typography>
        {props.showStatus && (
          <Typography gutterBottom variant="h7" component="div">
            {currPrice(props.data.price)}
          </Typography>
        )}
          {props.showStatus && props.amountEditable && (
            <div className="amountCon">
            <Typography gutterBottom variant="h7" component="div">
              amount:
            </Typography>
            {
            editMode ? <TextField  type="number" value={editedAmount} onChange={e=>setEditedAmount(e.target.value)} />
            :
          <Typography gutterBottom variant="h7" component="span">
           {props.data.amount}
          </Typography>
          }
          </div>
        )}
      </CardContent>
      <CardActions>
        {isUser && props.showStatus && (
          <>
       {props.amountEditable && 
                <Button
                  onClick={()=>edit(props.data.amount)}
                  className="adpBtn"
                  variant="outlined"
                  size="small"
                >
                 {editMode ? "Save" : "Edit"}
                </Button>
              
}
          
              <Button
                onClick={()=>props.removeCallback(props.data.id)}
                className="adpBtn"
                variant="outlined"
                size="small"
              >
                Remove
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
