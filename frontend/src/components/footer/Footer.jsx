import React from "react";
import { Box, Container, Grid, Typography, Divider, Link } from "@mui/material";
import { styled } from "@mui/system";

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: "#1a1a1a",
  color: "#ffffff",
  padding: "40px 0",
  position: "relative",
  overflow: "hidden",
  textAlign: "center",
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: "#ffffff",
  marginBottom: "8px",
  cursor: "pointer",
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#4dabf5",
  },
}));

const MemberLink = styled(Link)(({ theme }) => ({
  color: "#ffffff",
  marginBottom: "8px",
  display: "block",
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#4dabf5",
  },
}));

const Footer = () => {
  return (
    <StyledFooter component="footer">
      <Container maxWidth="lg">
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Our Group Project: CSE470 - Software Engineering Course
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Hotel and Tour Booking System | Tech Stack: MERN, MUI
        </Typography>

        <Divider sx={{ my: 3, backgroundColor: "#ffffff", opacity: 0.2 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Documentation
            </Typography>
            <FooterLink href="https://github.com/lililiyabbayx/Hotel-Booking-System" target="_blank">
              GitHub Repo
            </FooterLink>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
             Team Members
            </Typography>
            <MemberLink href="https://github.com/lililiyabbayx" target="_blank">
              1
            </MemberLink>
            <MemberLink href="https://github.com/member2" target="_blank">
              2
            </MemberLink>
            <MemberLink href="https://github.com/member3" target="_blank">
              3
            </MemberLink>
            <MemberLink href="https://github.com/member4" target="_blank">
              4
            </MemberLink>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Divider sx={{ backgroundColor: "#ffffff", opacity: 0.2 }} />
          <Typography variant="body2" sx={{ mt: 2, color: "rgba(255, 255, 255, 0.6)" }}>
            © {new Date().getFullYear()} Hotel and Tour Booking System. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
