function search() {

    const citySelect = document.getElementById('citySelect');
    const districtSelect = document.getElementById('districtSelect');
    const selectedCity = citySelect.value;
    const selectedDistrict = districtSelect.value;
    
    if (selectedCity) {
        fetch('/api/gasPrice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ city: selectedCity, district: selectedDistrict })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Sunucudan gelen veri:', data);
        })
        .catch(error => {
            console.error('Veri gönderme hatası:', error);
        });
    } else {
        alert('Lütfen bir şehir seçin');
    }
    
}
    
    document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/cities')
    .then(response => response.json())
    .then(data => {
        const citySelect = document.getElementById('citySelect');
        const districtSelect = document.getElementById('districtSelect');
    
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item.city;
            option.textContent = item.city;
            citySelect.appendChild(option);
        });
    
        citySelect.addEventListener('change', function() {
            districtSelect.innerHTML = '<option value="">İlçe seçin</option>';
    
            const selectedCity = this.value;
            if (selectedCity) {
                const districts = data.find(item => item.city === selectedCity).districts;
                districts.forEach(district => {
                    const option = document.createElement('option');
                    option.value = district;
                    option.textContent = district;
                    districtSelect.appendChild(option);
                });
            }
        });
    })
    .catch(error => console.error('Veri çekme hatası:', error));
    
});