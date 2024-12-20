import Navbar from "./../../components/navbar/Navbar";
import Header from "./../../components/header/Header";
import Featured from "./../../components/Featured/featured";
import Box from "@mui/material/Box";
import PropertyList from "./../../components/propertylist/PropertyList";
import Footer from "./../../components/footer/Footer";
import FeaturedProperties from "./../../components/featuredProperties/FeaturedProperties";
const Home = () => {
  return (
  <Box>
    <Navbar/><Header/><Featured/><PropertyList/><FeaturedProperties/><Footer/>

  </Box>
  );
};

export default Home;