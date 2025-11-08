// script.js

function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const regex = /([^&=]+)=([^&]*)/g;
    let m;
    while (m = regex.exec(queryString)) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    return params;
}
const urlParams = getQueryParams();

// When the page loads, pre-fill the form fields
document.addEventListener('DOMContentLoaded', () => {
    const originField = document.getElementById('origin');
    const destinationField = document.getElementById('destination');
    
    if (urlParams.origin) {
        originField.value = `${urlParams.origin}`;
    }
    if (urlParams.destination) {
        destinationField.value = `${urlParams.destination}`;
    }
    
    // Optional: Auto-submit the form if both coordinates are present
    if (urlParams.origin && urlParams.destination) {
        document.getElementById('route-form').dispatchEvent(new Event('submit'));
    }
});


// --- PARTNER'S WORK AREA: CALCULATION LOGIC ---
function calculateRouteData(origin, destination, time) {
    // This is the MOCK DATA. Replace this with your actual calculation logic!
    const mockData = {
        drive_route: { co2_g: 1500, time_min: 25, pollution_risk: "High" },
        eco_route: { co2_g: 250, time_min: 32, pollution_risk: "Low" },
        
        friction_score: "5.5/10 (Moderate)",
        savings_co2_kg: "1.25 kg",
        sky_offset_days: "3 Days", 
    };
    
    return mockData;
}
// --- END OF PARTNER'S WORK AREA ---


// --- YOUR FRONTEND LOGIC (The Glue) ---

document.getElementById('route-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const time = document.getElementById('time').value;

    const results = calculateRouteData(origin, destination, time);

    document.getElementById('drive-time').textContent = results.drive_route.time_min + ' min';
    document.getElementById('drive-co2').textContent = results.drive_route.co2_g + ' g';
    document.getElementById('drive-risk').textContent = results.drive_route.pollution_risk;

    document.getElementById('eco-time').textContent = results.eco_route.time_min + ' min';
    document.getElementById('eco-co2').textContent = results.eco_route.co2_g + ' g';
    document.getElementById('friction-score').textContent = results.friction_score;

    document.getElementById('savings-co2').textContent = results.savings_co2_kg;
    document.getElementById('sky-offset').textContent = results.sky_offset_days;

    document.getElementById('results-area').style.display = 'grid';
});