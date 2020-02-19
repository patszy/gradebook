const baseUrl = 'https://my-json-server.typicode.com/patszy/gradebook/students';

const getData = async () => {
    try {
        const response = await fetch(baseUrl);
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};


window.onload = () => {
    getData().then((data) => {
        data.map(student => {
            let tableBody = document.querySelector('tbody');
            let tr = document.createElement('tr'), td = document.createElement('td');

            let {name, grades} = student;

            td.innerText = `${name}`;
            tr.appendChild(td);

            let avg = 0;

            for (let key in grades) {
                avg += grades[key];

                console.log(`${key}: ${grades[key]}`);

                td = document.createElement('td');
                td.innerText = `${grades[key]}`;
                tr.appendChild(td);
            }

            avg = (Math.round((avg / Object.keys(grades).length) * 100) / 100).toFixed(2);

            td = document.createElement('td');
            td.innerText = `${avg}`;

            (avg<2) ? td.classList.add('wrong') : false;
            (avg>4.75) ? td.classList.add('good') : false;

            tr.appendChild(td);

            tableBody.appendChild(tr);
        });
    });
};