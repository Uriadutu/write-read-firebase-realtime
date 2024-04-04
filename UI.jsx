import React, { useEffect, useState } from "react";
import { db } from "../Config/Firebase";
import { set, ref, onValue } from "firebase/database";

const Uji = () => {
  const [ppm, setPpm] = useState("");
  const [suhuUdara, setSuhuUdara] = useState([]);
  const [suhuAir, setSuhuAir] = useState([]);
  const [kelembapan, setKelemapan] = useState([]);
  const [nutrisi, setNutrisi] = useState([]);
  

  const nilaiPPM = (e) => {
    setPpm(e.target.value);
  };

  // Fungsi untuk membaca data dari Firebase
  useEffect(() => {
    const fetchData = () => {
      const getSuhuUdara = ref(db, '/sensor/sensor1');
      const getKelembapan = ref(db, '/sensor/sensor2'); 
      const getSuhuAir = ref(db, '/sensor/sensor3');
      const getNutrisi = ref(db, '/sensor/sensor4');

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
    <div>
      <div className="flex items-center h-10 intro-y p-3 mt-9">
        <p>PPM</p>
        <input
          className="input"
          type="text"
          value={ppm}
          onChange={nilaiPPM}
          style={{ border: "1px solid black" }}
        />
        <button className="bg-green-300 p-2" onClick={createPPM}>
          Kirim
        </button>
      </div>
      <div className="p-5 mt-4">

        <h3>Monitoring</h3>
        <div className="flex">
            <p>suhu Udara :</p>
        {suhuUdara.map((value, index) => (
          <p key={index}>{value}</p>
        ))}

        </div>
        <div className="flex">
            <p>suhu Air :</p>
        {suhuAir.map((value, index) => (
          <p key={index}>{value}</p>
        ))}

        </div>
        <div className="flex">
            <p>Kelembapan :</p>
        {kelembapan.map((value, index) => (
          <p key={index}>{value}</p>
        ))}

        </div>
        <div className="flex">
            <p>Nutiris :</p>
        {nutrisi.map((value, index) => (
          <p key={index}>{value}</p> 
        ))}

        </div>
      </div>
    </div>
  );
};

export default Uji;
