import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { actionTypes } from "../../../reducer";
import { useStateValue } from "../../../StateProvider";
const labels = {
  0.5: "嬰兒",
  1: "木牌",
  1.5: "鐵牌",
  2: "銅牌",
  2.5: "銀牌",
  3: "金牌",
  3.5: "白金",
  4: "鑽石",
  4.5: "大師",
  5: "特級大師",
};
export default function RecipeRating() {
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [{ newRecipeData,updateRecipeData, isUpdated }, dispatch] = useStateValue();

  const handleRating = (value) => {
    setValue(value);
    if (isUpdated){
      dispatch({
        type: actionTypes.SET_UPDATE_RECIPE_DATA,
        updateRecipeData: { ...updateRecipeData, rating: value },
      });
    }else{
    dispatch({
      type: actionTypes.SET_NEWRECIPEDATA,
      newRecipeData: { ...newRecipeData, rating: value },
    });
    }
  };

  useEffect(() => {
    if (newRecipeData.rating) {
      setValue(newRecipeData.rating);
    }
  }, []);
  return (
    <Box
      sx={{
        // width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="hover-feedback"
        size="large"
        value={isUpdated?updateRecipeData?.rating:value}
        precision={0.5}
        onChange={(event, newValue) => {
          handleRating(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : isUpdated?updateRecipeData?.rating:value]}</Box>
      )}
    </Box>
  );
}
