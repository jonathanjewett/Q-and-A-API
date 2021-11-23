import http from 'ky/http';
import { sleep } from 'k6';
export const options = {
    discardResponseBodies: true,
    scenarios: {
        contacts: {
            executor: 'constant-arrival-rate',
            rate: 1000,
            duration: '30s',
            preAllocatedVUs: 1000,
            maxVUs: 10000
        }
    }
}

export default function () {
    let randi = Math.floor(Math.random() * 1000000 + 900000);
    const url = 'http://localhost:3000/qa/questions?product_id=${randi}';
    const res = http.get(url);
}