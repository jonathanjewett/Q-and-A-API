import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
    discardResponseBodies: true,
    scenarios: {
        contacts: {
            executor: 'constant-arrival-rate',
            rate: 100,
            duration: '30s',
            preAllocatedVUs: 100,
            maxVUs: 10000
        }
    }
}

export default function () {
    let randi = Math.floor(Math.random() * 1000000 + 900000);
    const url = `http://localhost:3000/qa/questions?product_id=${randi}`;
    const res = http.get(url);
}