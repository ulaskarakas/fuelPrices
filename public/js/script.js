function search() {
  const brandSelect = document.getElementById("brandSelect");
  const citySelect = document.getElementById("citySelect");
  const districtSelect = document.getElementById("districtSelect");
  const selectedBrand = brandSelect.value;
  const selectedCity = citySelect.value;
  //const selectedDistrict = districtSelect.value;

  if (selectedCity && brandSelect) {
    fetch("/api/gasPrice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city: selectedCity, /*district: selectedDistrict,*/ brand: selectedBrand}),
    })
      .then((response) => {
        // Yanıt başarılı mı kontrol et
        if (!response.ok) {
          throw new Error("Ağ yanıtında bir sorun var.");
        }
        return response.json(); // Yanıtı JSON formatında döndür
      })
      .then((data) => {
        console.log("Sunucudan gelen veri:", data);
        document.getElementById("table").style.visibility = "visible";
        const fiyatlar = data.fiyatlar;
        let n = document.getElementById("tbody").rows.length;
        if (n != 0) {
          for (let j = 0; j < n; j++) {
            document.getElementById("tbody").deleteRow(fiyatlar[j]);
          }
        }

        for (let i = 0; i < fiyatlar.length; i++) {
          let c = document.getElementById("city");
          c.innerText = selectedCity;
          let b = document.getElementById("brand");
          b.innerText = selectedBrand;
          let bImage = document.getElementById("brand-image");
          switch (selectedBrand) {
            case "Petrol Ofisi": bImage.src = "img/po-logo.svg"; break;
            case "Opet": bImage.src = "img/opet-logo.svg"; break;
            case "Alpet": bImage.src = "img/alpet-logo.svg"; break;
            case "Sunpet": bImage.src = "img/sunpet-logo.svg"; break;
            case "Türkiye Petrolleri": bImage.src = "img/tp-logo.svg"; break;
          }
          // satır eklemek istediğin tablo bölümünü belirt
          let table = document.getElementById("tbody");
          // insertRow() methodunu kullanarak row oluştur
          // Row eklemek istediğiniz index'i belirt
          let row = table.insertRow(-1); // en sona ekle
          // Tablo hücrelerini ekle
          let c1 = row.insertCell(0);
          let c2 = row.insertCell(1);
          let c3 = row.insertCell(2);
          let c4 = row.insertCell(3);
          // Hücrelere verileri ekle
          c1.innerText = fiyatlar[i].ilce
          c2.innerText = fiyatlar[i].benzin + "₺"
          c3.innerText = fiyatlar[i].mazot + "₺"
          c4.innerText = fiyatlar[i].lpg + "₺"
        }
        n = document.getElementById("tbody").rows.length;
      })
      .catch((error) => {
        console.error("Veri gönderme hatası:", error);
      });
  } else {
    alert("Lütfen bir şehir ve firma seçin");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/cities")
    .then((response) => response.json())
    .then((data) => {
      const citySelect = document.getElementById("citySelect");
      //const districtSelect = document.getElementById("districtSelect");

      data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.city;
        option.textContent = item.city;
        citySelect.appendChild(option);
      });
      /*
      citySelect.addEventListener("change", function () {
        districtSelect.innerHTML = '<option value="">İlçe seçin</option>';

        const selectedCity = this.value;
        if (selectedCity) {
          const districts = data.find(
            (item) => item.city === selectedCity
          ).districts;
          districts.forEach((district) => {
            const option = document.createElement("option");
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
          });
        }
      });*/
    })
    .catch((error) => console.error("Veri çekme hatası:", error));
});
