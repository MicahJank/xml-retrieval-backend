
const inputLabel = document.getElementById('fileLabel');
const form = document.getElementById('submit-form');
const input = document.getElementById('fileUpload');
let file;

const convertData = () => {
    
    // fetch('http://localhost:5000', {
    //     method: "POST",
    //     body: {"hello": "there"},
    //     headers: {
    //         "Content-Type": "multipart/form-data"
    //     }
    // })
    // .then(res => {
    //     console.log(res);
    // })
    // .catch(err => {
    //     console.log(err)
    // }) 
}


input.addEventListener('change', (e) => {
    console.log(inputLabel)
    console.log(e.target.files[0])
    file = e.target.files[0];
    inputLabel.textContent = e.target.files[0].name;
})

form.onsubmit = convertData;
form.addEventListener('submit', e => {
    e.preventDefault();
    console.log(file)
})
