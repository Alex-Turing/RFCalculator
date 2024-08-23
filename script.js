function selectMeasurement(type) {
    document.getElementById('button-container').classList.add('d-none');
    document.getElementById('input-container').classList.remove('d-none');
    generateInputFields(type);
}

function generateInputFields(type) {
    const form = document.getElementById('measurement-form');
    form.innerHTML = '';

    if (type === 'SNR') {
        form.innerHTML += createInputField('Signal Power (dBm)', 'signal-power');
        form.innerHTML += createInputField('Noise Power (dBm)', 'noise-power');
    } else if (type === '-3dB Bandwidth') {
        form.innerHTML += createInputField('Frequency High (MHz)', 'frequency-high');
        form.innerHTML += createInputField('Frequency Low (MHz)', 'frequency-low');
    } else if (type === 'Insertion Loss') {
        form.innerHTML += createInputField('Input Power (dBm)', 'input-power');
        form.innerHTML += createInputField('Output Power (dBm)', 'output-power');
    } else if (type === 'Noise Figure') {
        form.innerHTML += createInputField('Input SNR (dB)', 'input-snr');
        form.innerHTML += createInputField('Output SNR (dB)', 'output-snr');
    } else if (type === 'Return Loss') {
        form.innerHTML += createInputField('Incident Power (dBm)', 'incident-power');
        form.innerHTML += createInputField('Reflected Power (dBm)', 'reflected-power');
    }

    form.innerHTML += `<button type="button" class="btn btn-success" onclick="calculateResult('${type}')">Calculate</button>`;
}

function createInputField(label, id) {
    return `
        <div class="mb-3">
            <label class="form-label">${label}</label>
            <input type="number" class="form-control" id="${id}" required>
        </div>
    `;
}

function calculateResult(type) {
    let result = 0;
    if (type === 'SNR') {
        const signalPower = parseFloat(document.getElementById('signal-power').value);
        const noisePower = parseFloat(document.getElementById('noise-power').value);
        result = signalPower - noisePower;
    } else if (type === '-3dB Bandwidth') {
        const freqHigh = parseFloat(document.getElementById('frequency-high').value);
        const freqLow = parseFloat(document.getElementById('frequency-low').value);
        result = freqHigh - freqLow;
    } else if (type === 'Insertion Loss') {
        const inputPower = parseFloat(document.getElementById('input-power').value);
        const outputPower = parseFloat(document.getElementById('output-power').value);
        result = inputPower - outputPower;
    } else if (type === 'Noise Figure') {
        const inputSNR = parseFloat(document.getElementById('input-snr').value);
        const outputSNR = parseFloat(document.getElementById('output-snr').value);
        result = inputSNR - outputSNR;
    } else if (type === 'Return Loss') {
        const incidentPower = parseFloat(document.getElementById('incident-power').value);
        const reflectedPower = parseFloat(document.getElementById('reflected-power').value);
        result = incidentPower - reflectedPower;
    }

    document.getElementById('result-display').textContent = result.toFixed(2);
}

function goBack() {
    document.getElementById('button-container').classList.remove('d-none');
    document.getElementById('input-container').classList.add('d-none');
    document.getElementById('result-display').textContent = '0.00';
}
