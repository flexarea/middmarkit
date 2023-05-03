import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";

export default function ItemCard({ item, handleClick, page, sold }) {
  const markAsSold = () => {
    const getData = async () => {
      const newItem = { ...item };
      newItem.isAvailable = false;
      const response = await fetch(`/api/items/${item.id}`, {
        method: "PUT",
        body: JSON.stringify(newItem),
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      });
      if (!response.ok) {
        console.log("error");
        throw new Error(response.statusText);
      }
    };
    getData();
  };

  const bottomtext = () => {
    if (!sold) {
      return (
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {item.name}
          </Typography>
          <Typography>${item.price}</Typography>
          <Typography>{item.description}</Typography>
        </CardContent>
      );
    } else {
      return (
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h3" component="h2" align="center">
            SOLD
          </Typography>
        </CardContent>
      );
    }
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      style={{ backgroundColor: sold ? "#CECFD0" : "#FFFFFF" }}
    >
      <CardMedia
        component="img"
        sx={{
          // 16:9
          pt: "56.25%",
        }}
        image={item.images}
        alt="random"
      />
      {/* <CardContent sx={{ flexGrow: 1 }}> 
        <Typography gutterBottom variant="h5" component="h2">
          {item.name}
        </Typography>
        <Typography>${item.price}</Typography>
        <Typography>{item.description}</Typography>
      </CardContent> */}
      {bottomtext()}
      <CardActions>
        {!sold && (
          <Button
            size="small"
            onClick={() => {
              handleClick("View item", item.id);
            }}
          >
            View item
          </Button>
        )}
        {page === "user" && !sold && (
          <Button
            size="small"
            onClick={() => {
              markAsSold();
            }}
          >
            Mark as sold
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
