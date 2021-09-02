//add-spinner
const syncSpinner = displayStyle => {
    document.getElementById('loading').style.display = displayStyle
}

//add-search-result
const synceSearchResult = displayStyle => {
    document.getElementById('display').style.display = displayStyle
}

//add-search-result-found
const synceSearchResultFound = displayStyle => {
    document.getElementById('show-result').style.display = displayStyle
}

//after press button
const btnClick = () => {
    const inputField = document.getElementById('input');
    const inputText = inputField.value;
    inputField.value = '';

    //error clear
    const errorClear = document.getElementById('error');
    errorClear.textContent = '';

    //catch error
    if (inputText == '') {
        const p = document.createElement('p');
        p.innerHTML = `<p class="fw-bold text-center text-danger fs-1">Please Write Some Book Name!</p>`
        errorClear.appendChild(p);

        //show-spinner
        syncSpinner('none');

        //hide-search-result
        synceSearchResult('none');

        //hide-search-result-found
        synceSearchResultFound('none');
    }
    else {
        //show-spinner
        syncSpinner('block');

        //hide-search-result
        synceSearchResult('none');

        //hide-search-result-found
        synceSearchResultFound('none');
        const url = `http://openlibrary.org/search.json?q=${inputText}`;

        // result found
        fetch(url)
            .then(res => res.json())
            .then(data => displayFoundResult(data.numFound))

        // books found    
        fetch(url)
            .then(res => res.json())
            .then(data => displayBooks(data.docs))
        // .then(data => console.log(data.docs.length))


    }

}
//display found result
const displayFoundResult = result => {
    //error clear
    const errorClear = document.getElementById('error');
    errorClear.textContent = '';
    if (typeof (result) !== 'number') {
        //show-spinner
        syncSpinner('none');

        //hide-search-result
        synceSearchResult('none');

        //hide-search-result-found
        synceSearchResultFound('none');

        const p3 = document.createElement('p');
        p3.innerHTML = `<p class="fw-bold text-center text-danger fs-1">No Book Found!</p>`
        errorClear.appendChild(p3);
        //clear
        foundResult.textContent = '';
    }
    else {
        const foundResult = document.getElementById('show-result');
        foundResult.textContent = '';
        const h1 = document.createElement('h1');
        h1.classList.add('text-secondary');
        h1.innerHTML = `Books Found! ${result}
    `;
        foundResult.appendChild(h1);
        //show-search-result-found
        synceSearchResultFound('block');
    }
}

//display found books
const displayBooks = books => {
    //error clear
    const errorClear = document.getElementById('error');
    errorClear.textContent = '';

    if (books.length == 0) {
        //show-spinner
        syncSpinner('none');

        //hide-search-result
        synceSearchResult('none');

        //hide-search-result-found
        synceSearchResultFound('none');

        const p2 = document.createElement('p');
        p2.innerHTML = `<p class="fw-bold text-center text-danger fs-1">No Book Found!</p>`
        errorClear.appendChild(p2);
        //clear
        displayResult.textContent = '';
    }
    else {
        const displayResult = document.getElementById('display');
        displayResult.textContent = '';
        books.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
         <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h2 class="card-title">${book.title}</h2> 
                <p class="card-text fw-bold">Author: <span class="fst-italic">${book.author_name}</span>.</p>
                <p class="card-text fw-bold">First Published: ${book.first_publish_year}.</p>
                <p class="card-text fw-bold">Publisher: ${book.publisher}.</p>
            </div>
        </div>
         `;
            displayResult.appendChild(div);
        });
    }
    //hide-spinner
    syncSpinner('none');
    //show-search-result
    synceSearchResult('flex');
}

