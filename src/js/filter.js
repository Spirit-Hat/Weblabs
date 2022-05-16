/* eslint-disable */
class FilterTeachers {

    static onChange(event, input, selector,iput_t_number) {
        event.preventDefault();
        const result = {};
        [...input].forEach(el => {
            console.log(el.checked);
            result[el.name] = el.checked;
        });
        [...selector].forEach(el => {
            console.log(el.value);
            result[el.name] = el.value;
        });
        [...iput_t_number].forEach(el => {
            console.log(el.checked);
            result[el.name] = el.value;
        });
        return result;
    }

    constructor() {
        this.filerForm = document.getElementById("filterForm");
        this.input = this.filerForm.querySelectorAll('input[type="checkbox"]');
        this.selector = this.filerForm.querySelectorAll('select');
        this.input_n = this.filerForm.querySelectorAll('input[type="number"]');
    }

    start(callback) {
        this.filerForm.onchange = (event) => {
            const result = FilterTeachers.onChange(event, this.input, this.selector,this.input_n);
            callback && callback(result);
        };
    }

}

module.exports = FilterTeachers;
