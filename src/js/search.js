/* eslint-disable */
class Search {

    static onSubmit(form, event) {
        event.preventDefault();
        const formData = new FormData(form);
        return Object.fromEntries(formData.entries()).search;
    }

    constructor() {
        this.searchData = document.getElementById("serchvalue");

        this.searchForm = document.getElementById("searchForm");
    }

    start(callback) {
        this.searchForm.onclick = (event) => {
            event.preventDefault()
            const result = this.searchData.value
            callback && callback(result);
            // this.searchForm.reset();
        };
    }
}

module.exports = Search;
