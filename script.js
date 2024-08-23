function selectMeasurement(type) {
    document.getElementById('button-container').classList.add('d-none');
    document.getElementById('input-container').classList.remove('d-none');
    generateInputFields(type);
}

function generateInputFields(type) {
    const form = document.getElementById('measurement-form');
    form.innerHTML = '';

    if (type === 'SNR') {
        form.innerHTML += createInputField('Signal Power (dBm)', 'signal-power', 'Signal Power');
        form.innerHTML += createInputField('Noise Power (dBm)', 'noise-power', 'Noise Power');
    } else if (type === '-3dB Bandwidth') {
        form.innerHTML += createInputField('Frequency High (MHz)', 'frequency-high', 'High Frequency');
        form.innerHTML += createInputField('Frequency Low (MHz)', 'frequency-low', 'Low Frequency');
    } else if (type === 'Insertion Loss') {
        form.innerHTML += createInputField('Input Power (dBm)', 'input-power', 'Input Power');
        form.innerHTML += createInputField('Output Power (dBm)', 'output-power', 'Output Power');
    } else if (type === 'Noise Figure') {
        form.innerHTML += createInputField('Input SNR (dB)', 'input-snr', 'Input Signal-to-Noise Ratio');
        form.innerHTML += createInputField('Output SNR (dB)', 'output-snr', 'Output Signal-to-Noise Ratio');
    } else if (type === 'Return Loss') {
        form.innerHTML += createInputField('Incident Power (dBm)', 'incident-power', 'Incident Power');
        form.innerHTML += createInputField('Reflected Power (dBm)', 'reflected-power', 'Reflected Power');
    } else if (type === 'System Noise Figure') {
        form.innerHTML += createInputField('Input Noise Figure (dB)', 'input-nf', 'Input Noise Figure');
        form.innerHTML += createInputField('Gain (dB)', 'gain', 'System Gain');
    } else if (type === 'VSWR') {
        form.innerHTML += createInputField('Reflection Coefficient', 'reflection-coefficient', 'Reflection Coefficient');
    } else if (type === 'IMD3') {
        form.innerHTML += createInputField('IM3 Coefficient (dBm)', 'im3-coefficient', 'Intermodulation Coefficient');
        form.innerHTML += createInputField('Fundamental Power (dBm)', 'fundamental-power', 'Fundamental Power');
    }

    form.innerHTML += `<button type="button" class="btn btn-success" onclick="calculateResult('${type}')">Calculate</button>`;
}

function createInputField(label, id, tooltip) {
    return `
        <div class="mb-3">
            <label class="form-label" title="${tooltip}">${label}</label>
            <input type="number" class="form-control" id="${id}" required>
        </div>
    `;
}

function calculateResult(type) {
    resetDisplay();
    let result = 0;
    let units = '';
    if (type === 'SNR') {
        const signalPower = parseFloat(document.getElementById('signal-power').value);
        const noisePower = parseFloat(document.getElementById('noise-power').value);
        result = signalPower - noisePower;
        units = 'dB';
    } else if (type === '-3dB Bandwidth') {
        const freqHigh = parseFloat(document.getElementById('frequency-high').value);
        const freqLow = parseFloat(document.getElementById('frequency-low').value);
        result = freqHigh - freqLow;
        units = 'Mhz';
    } else if (type === 'Insertion Loss') {
        const inputPower = parseFloat(document.getElementById('input-power').value);
        const outputPower = parseFloat(document.getElementById('output-power').value);
        result = inputPower - outputPower;
        units = 'dB';
    } else if (type === 'Noise Figure') {
        const inputSNR = parseFloat(document.getElementById('input-snr').value);
        const outputSNR = parseFloat(document.getElementById('output-snr').value);
        result = inputSNR - outputSNR;
        units = 'dB';
    } else if (type === 'Return Loss') {
        const incidentPower = parseFloat(document.getElementById('incident-power').value);
        const reflectedPower = parseFloat(document.getElementById('reflected-power').value);
        result = incidentPower - reflectedPower;
        units = 'dB';
    } else if (type === 'System Noise Figure') {
        const nf1 = parseFloat(document.getElementById('nf1').value);
        const g1 = parseFloat(document.getElementById('g1').value);
        const nf2 = parseFloat(document.getElementById('nf2').value);
        result = nf1 + (nf2 - 1) / g1;
        units = 'dB';
    } else if (type === 'VSWR') {
        const gamma = parseFloat(document.getElementById('gamma').value);
        result = (1 + gamma) / (1 - gamma);
    } else if (type === 'IMD3') {
        const p1 = parseFloat(document.getElementById('p1').value);
        const im3 = parseFloat(document.getElementById('im3').value);
        result = (2 * p1) - im3;
        units = 'dBc';
    }
    document.getElementById('result-display').innerText = `${result.toFixed(2)} ${units}`;
}

function goBack() {
    resetDisplay();
    document.getElementById('button-container').classList.remove('d-none');
    document.getElementById('input-container').classList.add('d-none');
}

function resetDisplay() {
    document.getElementById('result-display').textContent = '0.00';
}