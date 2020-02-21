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

const drawTableHead = (tab) => {
    let tHead = document.querySelector('thead');
    let tr = document.createElement('tr'), th;
    let keysTab = Object.keys(tab[0]);
    let gradesTab = Object.keys(tab[0].grades);

    th = document.createElement('th');
    th.innerText = `${keysTab[0]}`.toUpperCase();
    tr.appendChild(th);

    gradesTab.map(item => {
        th = document.createElement('th');
        th.innerText = `${item}`.toUpperCase();
        tr.appendChild(th);
    });

    tHead.appendChild(tr);
}

const drawTableBody = (tab) => {
    let tBody = document.querySelector('tbody');
    let tr, td;

    tab.map((item) => {
        tr = document.createElement('tr');
        td = document.createElement('td');
        let {name, grades} = item;

        td.innerText = `${name}`;
        tr.appendChild(td);

        for (let key in grades) {
            td = document.createElement('td');
            td.innerText = `${grades[key]}`;
            tr.appendChild(td);
        }

        (grades['avg'] < 2) ? tr.classList.add('wrong') : false;
        (grades['avg'] > 4.75) ? tr.classList.add('good') : false;

        tBody.appendChild(tr);
    });
}

class Grades{
    constructor(math, bio, eng, his, phy, che, pe){
        this.math = math;
        this.bio = bio;
        this.eng = eng;
        this.his = his;
        this.phy = phy;
        this.che = che;
        this.pe = pe;
        this.avg = 0;
    }

    countAvg(Grades){
        let numbers = Object.values(Grades);
        this.avg = 0;

        for(let i=0; i<(numbers.length-1); i++){
            this.avg += numbers[i];
        }

        this.avg = (Math.round((this.avg/(numbers.length-1)) * 100) / 100).toFixed(2);
    }
}

class Student{
    constructor(name, phone, email, grades){
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.grades = grades;
    }
}

window.onload = () => {
    const studentsTab = [];

    getData().then((data) => {
        data.map((item) => {
            let values = Object.values(item.grades);

            let grades = new Grades(values[0], values[1], values[2], values[3], values[4], values[5], values[6]);
            grades.countAvg(grades);

            let student = new Student(item.name, item.phone, item.email, grades);
            studentsTab.push(student);
        });

        drawTableHead(studentsTab);
        drawTableBody(studentsTab);
    });
};