import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  MenuItem,
  Select,
  Button,
  InputAdornment,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function HospitalSearch() {
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [formData, setFormData] = useState({ state: "", city: "" });
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await axios.get("https://meddata-backend.onrender.com/states");
        setStates(res.data);
      } catch (error) {
        console.error("Error fetching states", error);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get(
          `https://meddata-backend.onrender.com/cities/${formData.state}`
        );
        setCities(res.data);
      } catch (error) {
        console.error("Error fetching cities", error);
      }
    };

    if (formData.state !== "") {
      fetchCities();
    }
  }, [formData.state]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await axios.get(
          `https://meddata-backend.onrender.com/hospitals/${formData.state}/${formData.city}`
        );
        setHospitals(res.data);
      } catch (error) {
        console.error("Error fetching hospitals", error);
      }
    };

    if (formData.state && formData.city) {
      fetchHospitals();
    }
  }, [formData.state, formData.city]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigation removed; hospitals already fetched automatically
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 4,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Select
          displayEmpty
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          required
          sx={{ minWidth: 200, width: "100%" }}
        >
          <MenuItem value="" disabled>
            State
          </MenuItem>
          {states.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>

        <Select
          displayEmpty
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          required
          sx={{ minWidth: 200, width: "100%" }}
        >
          <MenuItem value="" disabled>
            City
          </MenuItem>
          {cities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>

        <Button
          type="submit"
          variant="contained"
          size="large"
          startIcon={<SearchIcon />}
          sx={{ py: "15px", px: 8, flexShrink: 0 }}
          disableElevation
        >
          Search
        </Button>
      </Box>

      <Box mt={4}>
        {hospitals.map((hospital, idx) => (
          <Box
            key={idx}
            sx={{
              p: 2,
              border: "1px solid #ccc",
              borderRadius: 2,
              mb: 2,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="h6">{hospital.name}</Typography>
            <Typography variant="body2">{hospital.address}</Typography>
          </Box>
        ))}
      </Box>
    </>
  );
}
