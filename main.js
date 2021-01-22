const container = document.getElementById('container-id');
const preloader = document.getElementById('preloader');
const paragraphs = document.querySelectorAll('p');


const enableInfiniteScroll = () => {
    const removeItem = (event) => {
        event.currentTarget.style.animationPlayState = 'running';
        event.currentTarget.addEventListener('animationend', event => {
            console.log('ended');
            event.currentTarget.remove();
        })
    };

    paragraphs.forEach(paragraph => paragraph.addEventListener('click', removeItem));

    let block_request = false;

    container.addEventListener('scroll', event => {
        const { scrollTop, clientHeight, scrollHeight } = container;
        if (scrollTop + clientHeight >= scrollHeight && block_request == false) {
            block_request = true;
            preloader.style.display = 'block';
            // Simulate AJAX request to the server 
            setTimeout(() => {
                const paragraph = document.createElement('p');
                paragraph.textContent = 'NEW PARAGRAPH';
                paragraph.addEventListener('click', removeItem);
                container.insertBefore(paragraph, preloader);
                preloader.style.display = 'none';
                block_request = false;
            }, 2000)
        }
    })
};


enableInfiniteScroll();

