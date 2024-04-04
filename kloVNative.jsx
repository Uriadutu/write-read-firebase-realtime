import React, { useEffect, useState } from "react";
import { db } from "../Config/Firebase";
import { ref, onValue, set } from "firebase/database";
import { View, TextInput, Button, Text } from "react-native";

const Uji = () => {
  const [ppm, setPpm] = useState("");
  const [suhuUdara, setSuhuUdara] = useState([]);
  const [suhuAir, setSuhuAir] = useState([]);
  const [kelembapan, setKelemapan] = useState([]);
  const [nutrisi, setNutrisi] = useState([]);

  const nilaiPPM = (value) => {
    setPpm(value);
  };

  // Fungsi untuk membaca data dari Firebase
  useEffect(() => {
    const fetchData = () => {
      const getSuhuUdara = ref(db, "/sensor/sensor1");
      const getKelembapan = ref(db, "/sensor/sensor2");
      const getSuhuAir = ref(db, "/sensor/sensor3");
      const getNutrisi = ref(db, "/sensor/sensor4");

      onValue(getSuhuUdara, (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          const response = Object.values(data);
          setSuhuUdara(response);
        }
      });

      onValue(getKelembapan, (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          const response = Object.values(data);
          setKelemapan(response);
        }
      });

      onValue(getSuhuAir, (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          const response = Object.values(data);
          setSuhuAir(response);
        }
      });

      onValue(getNutrisi, (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          const response = Object.values(data);
          setNutrisi(response);
        }
      });
    };

    fetchData(); 
  }, []);

  const createPPM = () => {
    // Simpan nilai PPM ke Firebase
    set(ref(db, `/ppm`), {
      ppm: ppm,
    });
    setPpm("");
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text>PPM</Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: "black", flex: 1 }}
          value={ppm}
          onChangeText={nilaiPPM}
        />
        <Button title="Kirim" onPress={createPPM} />
      </View>
      <View style={{ paddingVertical: 20 }}>
        <Text>Monitoring</Text>
        <View style={{ flexDirection: "row" }}>
          <Text>Suhu Udara :</Text>
          {suhuUdara.map((value, index) => (
            <Text key={index}>{value}</Text>
          ))}
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>Suhu Air :</Text>
          {suhuAir.map((value, index) => (
            <Text key={index}>{value}</Text>
          ))}
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>Kelembapan :</Text>
          {kelembapan.map((value, index) => (
            <Text key={index}>{value}</Text>
          ))}
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>Nutiris :</Text>
          {nutrisi.map((value, index) => (
            <Text key={index}>{value}</Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Uji;
