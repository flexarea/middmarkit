import { useSession } from "next-auth/react";
import * as React from "react";

// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import ItemCard from "@/components/ItemCard";

function Copyright() {
  const newLocal = "https://mui.com/";
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href={newLocal}>
        middmarkit.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Album({}) {
  const router = useRouter();
  // const [currentItem,setCurrentItem] = useState();
  const [items, setItems] = useState([]);
  const { data: session } = useSession();
  const [isReviewer, setIsReviewer] = useState(false);

  console.log("is reviewer");
  console.log(isReviewer);

  useEffect(() => {
    if (session) {
      if (session.user) {
        const getData = async () => {
          const response = await fetch(`/api/users/${session.user.id}`, {
            method: "GET",
          });
          if (!response.ok) {
            console.log("error");
            throw new Error(response.statusText);
          }
          const data = await response.json();
          setIsReviewer(data.reviewerStatus);
        };
        getData();
      }
    }
  }, [session]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/items", { method: "GET" });
      if (!response.ok) {
        console.log("error");
        throw new Error(response.statusText);
      }
      const data = await response.json();
      const newData = data.filter(
        (item) => !item.adminRemoved && !!item.isAvailable
      );
      setItems(newData);
    };
    getData();
  }, []);

  const handleClick = (button, id) => {
    if (button === "View item") {
      router.push(`/items/${id}`);
    }

    if (button === "sell") {
      router.push("/items/new");
    }
  };

  const complete = (removedItem) => {
    const getData = async () => {
      const response = await fetch("/api/items", { method: "GET" });
      if (!response.ok) {
        console.log("error");
        throw new Error(response.statusText);
      }
      const data = await response.json();
      const newData = data.filter(
        (item) => !item.adminRemoved && !!item.isAvailable
      );
      setItems(newData);
    };
    getData();
    const newItems = items.map((item) => {
      return item.id === removedItem.id ? removedItem : item;
    });
    setItems(newItems);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <AppBar position="relative">
        <Toolbar>
          <LoginWidgetComponent />

        </Toolbar>
      </AppBar> */}
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Welcome to MiddMarkit! This is a web application where you can buy
              and sell items on the Middlebury Campus
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }}>
          {/* End hero unit */}
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 12, sm: 12, md: 12 }}
          >
            {items.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4} minWidth={100}>
                <ItemCard
                  item={item}
                  handleClick={handleClick}
                  complete={complete}
                  isReviewer={isReviewer}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Midd Markit
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
