"use client"; // クライアント側で動作するコードであることを指定しています。
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import Link from "next/link";
import Header from "@/components/header.jsx";
import Footer from "@/components/footer.jsx";
import { Box, Typography, Button, Divider, TextField } from "@mui/material";

export default function PetManagementPage() {
  const [theme, setTheme] = useState("light");
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [updateData, setUpdateData] = useState({
    petname: "",
    breed: "",
    birthdate: "",
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data from Supabase...");

      try {
        const { data, error } = await supabase.from("petinformation").select(`
          petid,
          petname,
          breed,
          birthdate,
          users:userid (
            userid,
            user_name
          )
        `);

        if (error) {
          console.error("Error fetching data: ", error);
          setError("データの取得に失敗しました");
        } else {
          console.log("Data fetched successfully:", data);
          setPets(data);
        }
      } catch (fetchError) {
        console.error("Fetch error: ", fetchError);
        setError("データの取得中にエラーが発生しました");
      }
    };

    fetchData();
  }, []);

  const handleUpdatePet = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("petinformation")
        .update(updateData)
        .eq("petid", selectedPet.petid);

      if (error) {
        console.error("Error updating data: ", error);
        setError("データの更新に失敗しました");
      } else {
        console.log("Data updated successfully:", data);
        const updatedPets = pets.map((pet) =>
          pet.petid === selectedPet.petid ? { ...pet, ...updateData } : pet
        );
        setPets(updatedPets);
        setSelectedPet(null);
        setUpdateData({
          petname: "",
          breed: "",
          birthdate: "",
        });
      }
    } catch (updateError) {
      console.error("Update error: ", updateError);
      setError("データの更新中にエラーが発生しました");
    }
  };

  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div style={{ paddingTop: "60px" }}></div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "600px",
          margin: "0 auto",
          padding: "16px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          ペット管理
        </Typography>
        <Divider sx={{ width: "100%", marginBottom: "16px" }} />

        {error && <p style={{ color: "red" }}>{error}</p>}
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                ペットの名前
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                種類
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                誕生日
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                飼い主
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {pet.petname}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {pet.breed}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {pet.birthdate}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {pet.users.username}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setSelectedPet(pet);
                      setUpdateData({
                        petname: pet.petname,
                        breed: pet.breed,
                        birthdate: pet.birthdate,
                      });
                    }}
                  >
                    編集
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedPet && (
          <Box
            component="form"
            onSubmit={handleUpdatePet}
            sx={{
              marginTop: "16px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <TextField
              label="ペットの名前"
              value={updateData.petname}
              onChange={(e) =>
                setUpdateData({ ...updateData, petname: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="種類"
              value={updateData.breed}
              onChange={(e) =>
                setUpdateData({ ...updateData, breed: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="誕生日"
              value={updateData.birthdate}
              onChange={(e) =>
                setUpdateData({ ...updateData, birthdate: e.target.value })
              }
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: "16px" }}
            >
              更新
            </Button>
          </Box>
        )}

        <Link href="/management/pets/pet" passHref>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "16px", width: "100%" }}
          >
            + 新規登録
          </Button>
        </Link>
        <Link href="/management" passHref>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "16px", width: "100%" }}
          >
            戻る
          </Button>
        </Link>
      </Box>

      <Footer theme={theme} />
    </>
  );
}
